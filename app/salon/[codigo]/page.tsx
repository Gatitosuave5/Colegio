"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SalonPage() {
  const { codigo } = useParams();
  const router = useRouter();

  const [salon, setSalon] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  const subjects = [
    {
      id: "math",
      title: "Matemática",
      description: "¡Aprende números y operaciones!",
      icon: "📐",
      color: "bg-blue-500",
      textColor: "text-white",
    },
    {
      id: "language",
      title: "Lenguaje",
      description: "¡Lee y escribe historias!",
      icon: "📚",
      color: "bg-pink-500",
      textColor: "text-white",
    },
    {
      id: "science",
      title: "Ciencias",
      description: "¡Explora el mundo!",
      icon: "🔬",
      color: "bg-green-500",
      textColor: "text-white",
    },
    {
      id: "games",
      title: "Juegos",
      description: "¡Diviértete aprendiendo!",
      icon: "🎮",
      color: "bg-yellow-500",
      textColor: "text-white",
    },
  ];

  useEffect(() => {
    const obtenerSalon = async () => {
      try {
        const res = await fetch(`/api/salones?codigo=${codigo}`);
        const data = await res.json();

        setSalon(data.salon || null);
      } catch (error) {
        console.error("Error consultando salón:", error);
        setSalon(null);
      } finally {
        setCargando(false);
      }
    };

    obtenerSalon();
  }, [codigo]);

  if (cargando)
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        Cargando salón...
      </div>
    );

  if (!salon)
    return (
      <div className="text-center mt-20">
        <h1 className="text-red-600 text-3xl font-bold">❌ Código inválido</h1>
        <p className="text-gray-600">Este salón no existe o fue eliminado</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded mt-4 font-bold"
        >
          ← Regresar
        </button>
      </div>
    );

  const nombreAlumno = localStorage.getItem("nombreAlumno") || "Alumno";

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="flex justify-between p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          🎒 Bienvenido {nombreAlumno}
        </h1>
        <button
          onClick={() => router.push("/")}
          className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Salir
        </button>
      </div>

      {/* Info del salón */}
      <section className="text-center mt-4">
        <h2 className="text-xl font-bold text-gray-800">
          Salón: <span className="text-blue-600">{codigo}</span>
        </h2>
        <p className="text-gray-700">
          Grado: <b>{salon.grado}°</b> — Aula: <b>{salon.aula}</b>
        </p>
      </section>

      {/* Pregunta principal */}
      <section className="text-center mt-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          ¿Qué quieres aprender hoy?
        </h2>
        <p className="text-gray-600">
          Elige una materia y comienza tu aventura educativa 📚
        </p>
      </section>

      {/* Subjects */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 px-6">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() =>
              router.push(`/salon/${codigo}/${subject.id}`)
            }
            className={`${subject.color} ${subject.textColor} shadow-lg rounded-xl p-6 text-left hover:scale-105 transition cursor-pointer`}
          >
            <div className="text-5xl">{subject.icon}</div>
            <h3 className="text-2xl font-bold mt-3">{subject.title}</h3>
            <p className="opacity-80">{subject.description}</p>
          </button>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mt-16 p-4">
        © 2025 Proyecto Escolar — Aprender es divertido 🚀
      </footer>
    </main>
  );
}
