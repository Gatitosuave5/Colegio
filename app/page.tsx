"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "./components/LoginModal";

export default function PaginaInicio() {
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const router = useRouter();

  const handleEntrar = async () => {
    if (!nombre.trim()) {
      alert("Por favor, escribe tu nombre.");
      return;
    }
    if (!codigo.trim()) {
      alert("Por favor, ingresa el código del salón.");
      return;
    }
  
    
    localStorage.setItem("nombreAlumno", nombre);
    localStorage.setItem("codigoSalon", codigo);
  
   
    await fetch("http://localhost:3001/api/alumnos_temporales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombre,
        salon_codigo: codigo,
      }),
    });
  
    
    router.push(`/salon/${codigo}`);
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
        <div className="boat"></div>
        <div className="fish fish1"></div>
        <div className="fish fish2"></div>
        <div className="bird bird1"></div>
        <div className="bird bird2"></div>
        <div className="bird2-type birdA"></div>
        <div className="bird2-type birdB"></div>
        <div className="shark"></div>

      </div>

      {/* Botón Profesores */}
      <button
        onClick={() => setMostrarLogin(true)}
        className="absolute top-6 right-8 bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-gray-100"
      >
        Profesores
      </button>

      {/* Contenedor principal */}
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
          Ingresa tu nombre y el código del salón
        </p>

        {/* Formulario */}
        <div className="w-full text-left space-y-4">
        <label className="block text-[#2D2D2D] mb-1 text-lg font-semibold">
              ¿Cómo te llamas?
            </label>
            <input
              type="text"
              placeholder="Escribe tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 text-[#1A1A1A] placeholder-gray-500 text-lg outline-none border-2 border-transparent focus:border-blue-400"
            />

            <label className="block text-[#2D2D2D] mb-1 text-lg font-semibold mt-4">
              Código del salón
            </label>
            <input
              type="text"
              placeholder="Ejemplo: AB45X"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 text-[#1A1A1A] placeholder-gray-500 text-lg outline-none border-2 border-transparent focus:border-blue-400 uppercase"
              maxLength={6}
            />

            <button
              onClick={handleEntrar}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-blue-700 transition">
              Entrar
            </button>

        </div>
      </div>

      {mostrarLogin && <LoginModal onClose={() => setMostrarLogin(false)} />}
    </div>
  );
}
