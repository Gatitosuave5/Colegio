"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "./components/LoginModal";

export default function PaginaInicio() {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [nombre, setNombre] = useState("");
  const [grado, setGrado] = useState("1° Grado");
  const router = useRouter();

  const handleEntrar = () => {
    if (!nombre.trim()) {
      alert("Por favor, escribe tu nombre.");
      return;
    }
    const rutas = {
      "1° Grado": "/grados/primero",
      "2° Grado": "/grados/segundo",
      "3° Grado": "/grados/tercero",
      "4° Grado": "/grados/cuarto",
      "5° Grado": "/grados/quinto",
      "6° Grado": "/grados/sexto",
    };
    router.push((rutas as any)[grado] || "/grados");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center">
      {/* Fondo Marino */}
      <div className="ocean-scene">
        <div className="sun"></div>
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="dolphin"></div>
        <div className="fish fish1"></div>
        <div className="fish fish2"></div>
      </div>

      {/* Botón de Profesores */}
      <button
        onClick={() => setMostrarLogin(true)}
        className="absolute top-6 right-8 bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-gray-100"
      >
        Profesores
      </button>

      {/* Contenedor central */}
      <div className="z-10 flex flex-col items-center justify-center space-y-6 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-md w-11/12">
        <img
          src="https://cdn-icons-png.flaticon.com/512/201/201818.png"
          alt="Estudiante feliz"
          className="w-32 animate-float"
        />
        <h1 className="text-blue-700 text-3xl font-extrabold">
          Mi Escuela Primaria
        </h1>
        <p className="text-gray-700 text-sm">
          Bienvenido a tu plataforma de aprendizaje
        </p>

        {/* Formulario */}
        <div className="w-full text-left space-y-4">
          <div>
            <label className="block text-gray-800 mb-1 text-sm">
              ¿Cómo te llamas?
            </label>
            <input
              type="text"
              placeholder="Escribe tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-800 mb-1 text-sm">
              ¿En qué grado estás?
            </label>
            <select
              value={grado}
              onChange={(e) => setGrado(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>1° Grado</option>
              <option>2° Grado</option>
              <option>3° Grado</option>
              <option>4° Grado</option>
              <option>5° Grado</option>
              <option>6° Grado</option>
            </select>
          </div>

          <button
            onClick={handleEntrar}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
          >
            Entrar
          </button>
        </div>
      </div>

      {mostrarLogin && <LoginModal onClose={() => setMostrarLogin(false)} />}
    </div>
  );
}
