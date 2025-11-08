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

  socket.on("solicitar-alumnos", async (codigo) => {
    const [alumnos] = await db.execute(
      "SELECT * FROM alumnos_temporales WHERE salon_codigo = ?",
      [codigo]
    );
    io.emit(`alumnos-${codigo}`, alumnos);
  });

  // Alumno entra al salón
  socket.on("alumno-entra", async ({ nombre, salon }) => {
    // Verificar si existe el salón
    const [salonExiste] = await db.execute(
      "SELECT codigo FROM salones WHERE codigo = ? LIMIT 1",
      [salon]
    );
  
    if (salonExiste.length === 0) {
      console.log(` Intento fallido: salón ${salon} no existe`);
      
      return; // NO REGISTRA EN BD
    }
  
    console.log(` ${nombre} entró al salón ${salon}`);
  
    await db.execute(
      "INSERT IGNORE INTO alumnos_temporales (nombre, salon_codigo) VALUES (?, ?)",
      [nombre, salon]
    );
  
    const [alumnos] = await db.execute(
      "SELECT nombre FROM alumnos_temporales WHERE salon_codigo = ?",
      [salon]
    );
  
    io.emit(`alumnos-${salon}`, alumnos);
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
app.post("/api/salones", async (req, res) => {
  try {
    const { grado } = req.body;
    if (!grado) return res.status(400).json({ error: "Grado requerido" });

    const codigos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    for (let i = 0; i < 5; i++) {
      codigo += codigos.charAt(Math.floor(Math.random() * codigos.length));
    }

    const aula = `Aula ${Math.floor(Math.random() * 50) + 1}`;

    await db.execute(
      "INSERT INTO salones (codigo, grado, aula) VALUES (?, ?, ?)",
      [codigo, grado, aula]
    );

    res.json({ success: true, codigo, grado, aula });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear salón" });
  }
});

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
    const { id, puntaje } = req.body;

    if (!id) return res.status(400).json({ error: "ID requerido" });

    await db.execute(
      "UPDATE alumnos_temporales SET puntaje = puntaje + ?, ultima_actividad = NOW() WHERE id = ?",
      [puntaje, id]
    );

    res.json({ success: true });

  } catch (error) {
    console.error("Error actualizando puntaje:", error);
    res.status(500).json({ error: "No se pudo actualizar puntaje" });
  }
});

/* DELETE - ELIMINAR SALÓN */
app.delete("/api/salones", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID requerido" });

    await db.execute("DELETE FROM salones WHERE id = ?", [id]);

    res.json({ success: true, mensaje: "Salón eliminado correctamente" });
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
    // ✅ 1. Verificar si el salón existe
    const [salon] = await db.execute(
      "SELECT * FROM salones WHERE codigo = ? LIMIT 1",
      [salon_codigo.trim()]
    );

    if (salon.length === 0) {
      console.log(` Salon no existe: ${salon_codigo}`);
      return res.status(404).json({ error: "El salón no existe" });
    }

    //  2. Insertar alumno porque el salón existe
    await db.execute(
      "INSERT INTO alumnos_temporales (nombre, salon_codigo, ultima_actividad) VALUES (?, ?, NOW())",
      [nombre, salon_codigo.trim()]
    );

    res.json({ success: true });

  } catch (error) {
    console.error("Error guardando alumno temporal:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});


/* ELIMINAR alumno — compatible con sendBeacon */

app.post("/api/alumnos_temporales/eliminar", async (req, res) => {
  try {
    const { nombre, salon_codigo } = req.body;

    await db.execute(
      "DELETE FROM alumnos_temporales WHERE nombre = ? AND salon_codigo = ?",
      [nombre, salon_codigo]
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

    res.json({ success: true, mensaje: "Alumno eliminado correctamente" });

  } catch (error) {
    console.error("Error al eliminar alumno:", error);
    res.status(500).json({ error: "Error al eliminar alumno" });
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
httpServer.listen(3001, () => {
  console.log("Servidor + WebSockets corriendo en http://localhost:3001");
});
