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

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });


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

app.listen(3001, () => {
  console.log("Servidor backend corriendo en http://localhost:3001");
});


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
  
