import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const httpServer = createServer(app);

// WebSockets dentro del mismo servidor Express
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MIDDLEWARE PARA PROTEGER RUTAS
function verificarToken(req, res, next) {
  const header = req.headers["authorization"];

  if (!header) return res.status(401).json({ error: "No token enviado" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}


/* CONEXIÓN A BD */
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/* =====================================================
      SOCKET.IO – ALUMNOS EN TIEMPO REAL
=====================================================*/

io.on("connection", async (socket) => {
  console.log("Usuario conectado:", socket.id);

  /* ======================================
        SOLICITAR LISTA DE ALUMNOS
  ====================================== */
  socket.on("solicitar-alumnos", async (codigo) => {
    const [alumnos] = await db.execute(
      "SELECT * FROM alumnos_temporales WHERE salon_codigo = ?",
      [codigo]
    );
    io.emit(`alumnos-${codigo}`, alumnos);
  });

  /* ======================================
        ALUMNO ENTRA (REGISTRO)
        — SIN usar socket_id —
  ====================================== */
  socket.on("alumno-entra", async ({ nombre, salon, id }) => {
    try {
      socket.data.salon = salon;     // guardar código del salón
      socket.data.idAlumno = id;     // guardar ID desde el frontend

      console.log(`🔵 Alumno ${nombre} (${id}) entró al salón ${salon}`);

      // Actualizar última actividad
      await db.execute(
        "UPDATE alumnos_temporales SET ultima_actividad = NOW() WHERE id = ?",
        [id]
      );

      // Obtener lista actualizada
      const [alumnos] = await db.execute(
        "SELECT * FROM alumnos_temporales WHERE salon_codigo = ?",
        [salon]
      );

      io.emit(`alumnos-${salon}`, alumnos);
    } catch (err) {
      console.log("Error en alumno-entra:", err);
    }
  });

  /* ======================================
        DETECTAR CIERRE DE VENTANA
        (disconnect)
        — ELIMINA AL ALUMNO EN VIVO —
  ====================================== */
  socket.on("disconnect", async () => {
    try {
      const salon = socket.data.salon;
      const idAlumno = socket.data.idAlumno;

      if (!salon || !idAlumno) return;

      console.log(`❌ Alumno desconectado — ID: ${idAlumno}`);

      // Eliminar alumno de la BD
      await db.execute(
        "DELETE FROM alumnos_temporales WHERE id = ?",
        [idAlumno]
      );

      // Lista actualizada
      const [alumnos] = await db.execute(
        "SELECT * FROM alumnos_temporales WHERE salon_codigo = ?",
        [salon]
      );

      // Emitir actualización a todos
      io.emit(`alumnos-${salon}`, alumnos);

    } catch (err) {
      console.log("Error en disconnect:", err);
    }
  });

  console.log("Socket listo");
});


/* =====================================================
  API REST NORMAL
=====================================================*/

/* LOGIN PROFESOR */
app.post("/api/login", async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM profesores WHERE usuario = ?",
      [usuario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const profesor = rows[0];
    const coincide = await bcrypt.compare(contraseña, profesor.contraseña);

    if (!coincide) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: profesor.id_profesor, usuario: profesor.usuario },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, usuario: profesor.usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

/* REGISTRO PROFESORES */
app.post("/api/profesores", async (req, res) => {
  const { nombre, usuario, contraseña } = req.body;

  try {
    const hash = await bcrypt.hash(contraseña, 10);

    await db.execute(
      "INSERT INTO profesores (nombre, usuario, contraseña) VALUES (?, ?, ?)",
      [nombre, usuario, hash]
    );

    res.json({ mensaje: "Profesor registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el profesor" });
  }
});

/* GET - LISTAR SALONES o BUSCAR POR CÓDIGO */
app.get("/api/salones", async (req, res) => {
  try {
    const { codigo } = req.query;

    if (codigo) {
      const [rows] = await db.execute(
        "SELECT * FROM salones WHERE codigo = ? LIMIT 1",
        [codigo]
      );
      return res.json({ salon: rows[0] || null });
    }

    const [rows] = await db.execute("SELECT * FROM salones ORDER BY id DESC");
    res.json({ success: true, salones: rows });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo salones" });
  }
});

/* POST - CREAR SALÓN */


/* PUT - EDITAR SALÓN */
app.put("/api/salones", async (req, res) => {
  try {
    const { id, aula } = req.body;
    if (!id || !aula) return res.status(400).json({ error: "Datos incompletos" });

    await db.execute("UPDATE salones SET aula = ? WHERE id = ?", [aula, id]);

    res.json({ success: true, mensaje: "Salón actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al editar salón" });
  }
});

/* ACTUALIZAR PUNTAJE */
app.post("/api/alumnos_temporales/puntaje", async (req, res) => {
  try {
    const { id, puntaje, codigo } = req.body;

    if (!id) return res.status(400).json({ error: "ID requerido" });

    await db.execute(
      "UPDATE alumnos_temporales SET puntaje = COALESCE(puntaje, 0) + ?, ultima_actividad = NOW() WHERE id = ?",
      [puntaje, id]
    );

    // NUEVO: ENVIAR LISTA ACTUALIZADA AL SOCKET
    if (codigo) {
      const [alumnos] = await db.execute(
        "SELECT * FROM alumnos_temporales WHERE salon_codigo = ?",
        [codigo]
      );

      io.emit(`alumnos-${codigo}`, alumnos);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error actualizando puntaje:", error);
    res.status(500).json({ error: "No se pudo actualizar puntaje" });
  }
});


/* DELETE - ELIMINAR SALÓN */
/* DELETE - ELIMINAR SALÓN */
app.delete("/api/salones", async (req, res) => {
  try {
    const { id } = req.body;

    console.log("🟡 1: DELETE recibido con ID:", id);

    const [rows] = await db.execute(
      "SELECT codigo FROM salones WHERE id = ? LIMIT 1",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Salón no encontrado" });
    }

    const codigoSalon = rows[0].codigo;

   

   
    io.emit(`salon-eliminado-${codigoSalon}`, { eliminado: true });

    await db.execute("DELETE FROM salones WHERE id = ?", [id]);

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar salón" });
  }
});



/* REGISTRAR ALUMNO */

app.post("/api/alumnos_temporales", async (req, res) => {
  const { nombre, salon_codigo } = req.body;

  if (!nombre || !salon_codigo) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const [salon] = await db.execute(
      "SELECT * FROM salones WHERE codigo = ? LIMIT 1",
      [salon_codigo.trim()]
    );

    if (salon.length === 0) {
      return res.status(404).json({ error: "El salón no existe" });
    }

    // 🔥 Insertar alumno y obtener ID
    const [result] = await db.execute(
      "INSERT INTO alumnos_temporales (nombre, salon_codigo, ultima_actividad) VALUES (?, ?, NOW())",
      [nombre, salon_codigo.trim()]
    );

    // 🔥 Devolver el ID al frontend
    res.json({
      success: true,
      id: result.insertId,
    });

  } catch (error) {
    console.error("Error guardando alumno temporal:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

app.get("/api/validar-token", verificarToken, (req, res) => {
  res.json({ ok: true, user: req.user });
});


/* ELIMINAR alumno — compatible con sendBeacon */

app.post("/api/alumnos_temporales/eliminar", async (req, res) => {
     try {
          const { id, salon_codigo } = req.body;

      if (!id) {
        return res.status(400).json({ error: "ID requerido para eliminar alumno" });
      }

      await db.execute(
        "DELETE FROM alumnos_temporales WHERE id = ?",
        [id]
      );

    // Notificar en tiempo real
    const [alumnos] = await db.execute(
      "SELECT * FROM alumnos_temporales WHERE salon_codigo = ?",
      [salon_codigo]
    );

    io.emit(`alumnos-${salon_codigo}`, alumnos);

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ error: "Error al Eliminar alumno" });
  }
});


/* EDITAR NOMBRE DEL ALUMNO */
app.put("/api/alumnos_temporales", async (req, res) => {
  try {
    const { id, nombre } = req.body;

    if (!id || !nombre) {
      return res.status(400).json({ error: "ID y nuevo nombre son requeridos" });
    }

    await db.execute(
      "UPDATE alumnos_temporales SET nombre = ?, ultima_actividad = NOW() WHERE id = ?",
      [nombre.trim(), id]
    );

    res.json({ success: true, mensaje: "Nombre actualizado correctamente" });

  } catch (error) {
    console.error("Error al editar alumno:", error);
    res.status(500).json({ error: "Error al editar alumno" });
  }
});

/* ELIMINAR ALUMNO POR ID */
/* ELIMINAR ALUMNO POR ID */
app.delete("/api/alumnos_temporales", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID requerido" });
    }

    await db.execute(
      "DELETE FROM alumnos_temporales WHERE id = ?",
      [id]
    );

    // 🔥 Emitir evento SOLO para ese alumno
    io.emit(`alumno-eliminado-${id}`, { eliminado: true });

    res.json({ success: true, mensaje: "Alumno eliminado correctamente" });

  } catch (error) {
    console.error("Error al eliminar alumno:", error);
    res.status(500).json({ error: "Error al eliminar alumno" });
  }
});


app.post("/api/salones", async (req, res) => {
  try {
    const { grado, contenidos } = req.body;

    if (!grado) return res.status(400).json({ error: "Grado requerido" });

    const codigo = Math.random().toString(36).substring(2, 7).toUpperCase();
    const aula = `Aula ${Math.floor(Math.random() * 50) + 1}`;

    // Insertar salón
    await db.execute(
      "INSERT INTO salones (codigo, grado, aula) VALUES (?, ?, ?)",
      [codigo, grado, aula]
    );

    // Guardar contenidos seleccionados
    if (Array.isArray(contenidos) && contenidos.length > 0) {
      for (const c of contenidos) {
        await db.execute(
          "INSERT INTO salon_contenidos (salon_codigo, categoria, titulo, storyId, id_contenido) VALUES (?, ?, ?, ?, ?)",
          [
            codigo,
            c.categoria,
            c.titulo,
            c.storyId ?? null,
            c.id_contenido  // ← ESTE ES EL BUENO
          ]
        );
      }
    }

    return res.json({ ok: true, codigo });
  } catch (err) {
    console.log("Error al crear salón:", err);
    return res.status(500).json({ error: "Error al crear salón" });
  }
});





// Obtener contenidos de un salón por su código  ---- PETICION PROTOTIPO
app.get("/api/contenidos", async (req, res) => {    
  const { codigo } = req.query;

  if (!codigo) {
    return res.status(400).json({ error: "Falta el código" });
  }

  try {
    const [rows] = await db.execute(
      `SELECT 
         sc.categoria,
         sc.id_contenido,
         c.titulo,
         c.storyId
       FROM salon_contenidos sc
       LEFT JOIN contenidos c ON sc.id_contenido = c.id_contenido
       WHERE sc.salon_codigo = ?`,
      [codigo.trim()]
    );

    return res.json({ contenidos: rows });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ error: "Error al obtener contenidos" });
  }
});


/* RESETEAR PUNTAJE DE UN ALUMNO */
app.post("/api/alumnos_temporales/reset", async (req, res) => {
  try {
    const { id, codigo } = req.body;

    if (!id) return res.status(400).json({ error: "ID requerido" });

    await db.execute(
      "UPDATE alumnos_temporales SET puntaje = 0, ultima_actividad = NOW() WHERE id = ?",
      [id]
    );

    if (codigo) {
      const [alumnos] = await db.execute(
        "SELECT * FROM alumnos_temporales WHERE salon_codigo = ?",
        [codigo]
      );
      io.emit(`alumnos-${codigo}`, alumnos);
    }

    res.json({ success: true });

  } catch (error) {
    console.error("Error al resetear puntaje:", error);
    res.status(500).json({ error: "No se pudo resetear el puntaje" });
  }
});


/* GET - LISTAR ALUMNOS POR SALÓN */
app.get("/api/alumnos_temporales", async (req, res) => {
  try {
    const { codigo } = req.query;

    if (!codigo) {
      return res.json({ alumnos: [] });
    }

    const [rows] = await db.execute(
      "SELECT * FROM alumnos_temporales WHERE salon_codigo = ?",
      [codigo.trim()] // AGREGA ESTO
    );

    res.json({ alumnos: rows });

  } catch (error) {
    console.error("Error obteniendo alumnos:", error);
    res.status(500).json({ error: "Error obteniendo alumnos" });
  }
});

/* INICIAR SERVIDOR */
/* INICIAR SERVIDOR */
httpServer.listen(3001, "0.0.0.0", () => {
  console.log("Servidor + WebSockets corriendo en 0.0.0.0:3001");
});