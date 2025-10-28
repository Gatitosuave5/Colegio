"use client";
import React from "react";

export default function PanelProfesor() {
  const usuario = typeof window !== "undefined"
    ? localStorage.getItem("usuario")
    : null;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-blue-700">Panel del Profesor</h1>
      <p className="mt-2 text-gray-700">Bienvenido, {usuario} ✅</p>

      <div className="mt-6 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-2">📌 Aquí podrás subir contenido:</h2>
        <ul className="text-gray-700 list-disc ml-6">
          <li>Agregar lecturas</li>
          <li>Crear ejercicios</li>
          <li>Mostrar u ocultar contenido a alumnos</li>
        </ul>
      </div>
    </div>
  );
}
