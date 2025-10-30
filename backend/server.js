import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

/* ✅ CONEXIÓN A BD */
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/* ✅ LOGIN PROFESOR */
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

/* ✅ REGISTRO PROFESORES */
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

/* ✅ GET - LISTAR SALONES o BUSCAR POR CÓDIGO */
app.get("/api/salones", async (req, res) => {
  try {
    const { codigo } = req.query;

    // ✅ Buscar por código
    if (codigo) {
      const [rows] = await db.execute(
        "SELECT * FROM salones WHERE codigo = ? LIMIT 1",
        [codigo]
      );

      return res.json({ salon: rows[0] || null });
    }

    // ✅ Listar todos
    const [rows] = await db.execute("SELECT * FROM salones ORDER BY id DESC");
    res.json({ success: true, salones: rows });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo salones" });
  }
});

/* ✅ POST - CREAR SALÓN */
app.post("/api/salones", async (req, res) => {
  try {
    const { grado } = req.body;
    if (!grado) return res.status(400).json({ error: "Grado requerido" });

    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    for (let i = 0; i < 5; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    const aula = `Aula ${Math.floor(Math.random() * 50) + 1}`;

    await db.execute(
      "INSERT INTO salones (codigo, grado, aula) VALUES (?, ?, ?)",
      [codigo, grado, aula]
    );

    res.json({
      success: true,
      codigo,
      grado,
      aula,
      mensaje: `Salón creado para ${grado}° grado`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear salón" });
  }
});

/* ✅ PUT - EDITAR SALÓN */
app.put("/api/salones", async (req, res) => {
  try {
    const { id, aula } = req.body;
    if (!id || !aula)
      return res.status(400).json({ error: "Datos incompletos" });

    await db.execute("UPDATE salones SET aula = ? WHERE id = ?", [aula, id]);

    res.json({ success: true, mensaje: "Salón actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al editar salón" });
  }
});

/* ✅ DELETE - ELIMINAR SALÓN */
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

/* ✅ INICIAR SERVIDOR */
app.listen(3001, () => {
  console.log("✅ Servidor backend corriendo en http://localhost:3001");
});



