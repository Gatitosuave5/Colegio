"use client";
import { useState } from "react";
import LoginModal from "./components/LoginModal";

export default function PaginaInicio() {
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <div className="min-h-screen bg-blue-400 flex flex-col items-center relative overflow-hidden">

      {/* ---------- BOTÓN PROFESORES ARRIBA DERECHA ---------- */}
      <button
        onClick={() => setMostrarLogin(true)}
        className="absolute top-4 right-6 bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-gray-100"
      >
        Profesores
      </button>

      {/* ---------- LOGO ---------- */}
      <div className="mt-6">
        <h1 className="text-white text-3xl font-extrabold drop-shadow">
          🎓 Mi Biblioteca Escolar
        </h1>
      </div>

      {/* ---------- TITULO PRINCIPAL ---------- */}
      <div className="mt-10 text-center max-w-2xl">
        <h2 className="text-white text-4xl font-extrabold leading-tight">
          La plataforma para fomentar la lectura 📚
        </h2>
        <p className="text-white text-lg font-light mt-3">
          Diseñada para ser usada en el aula y también en casa
        </p>
      </div>

      {/* ---------- ILUSTRACIÓN CENTRAL (GATITO / LIBROS) ---------- */}
      <div className="mt-10">
        <img
          src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
          alt="Gato lector"
          className="w-48 drop-shadow-lg"
        />
      </div>

      {/* ---------- BUSCADOR EN UNA TARJETA ---------- */}
      <div className="bg-white mt-10 p-6 rounded-xl shadow-xl w-11/12 max-w-2xl">
        <h3 className="text-center font-semibold text-gray-700 mb-3">
          Encuentra el libro que buscas
        </h3>

        <div className="flex border rounded-full overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            className="flex-1 px-4 py-2 outline-none text-gray-700"
          />
          <button className="bg-orange-500 text-white px-6 hover:bg-orange-600">
            🔍
          </button>
        </div>
      </div>

      {/* ---------- MODAL LOGIN ---------- */}
      {mostrarLogin && <LoginModal onClose={() => setMostrarLogin(false)} />}
    </div>
  );
}
