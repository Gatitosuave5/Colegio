"use client";
import React from "react";
import { Plus, Minus, X, Ruler, Triangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MatematicasPage() {
  const router = useRouter();

  const juegos = [
    {
      id: "suma",
      titulo: "Sumas hasta 20",
      descripcion: "Suma números del 1 al 20",
      color: "#10B981", // verde
      icono: <Plus size={38} strokeWidth={3} color="#7C3AED" />,
      enlace: "/juegos/sumas", // 👈 ruta o enlace del juego
    },
    {
      id: "resta",
      titulo: "Restas hasta 20",
      descripcion: "Resta números del 1 al 20",
      color: "#EC4899", // rosado
      icono: <Minus size={38} strokeWidth={3} color="#7C3AED" />,
      enlace: "/juegos/restas",
    },
    {
      id: "multiplicacion",
      titulo: "Introducción a la Multiplicación",
      descripcion: "Primeros pasos en multiplicación",
      color: "#F59E0B", // amarillo
      icono: <X size={38} strokeWidth={3} color="#7C3AED" />,
      enlace: "/juegos/multiplicacion",
    },
    {
      id: "figuras",
      titulo: "Figuras 2D",
      descripcion: "Aprende sobre polígonos",
      color: "#A855F7", // morado
      icono: <Triangle size={38} strokeWidth={2.5} color="#D4D4D8" />,
      enlace: "/juegos/figuras",
    },
    {
      id: "medidas",
      titulo: "Medidas",
      descripcion: "Largo, ancho y altura",
      color: "#6366F1", // azul
      icono: <Ruler size={38} strokeWidth={2.5} color="#D4D4D8" />,
      enlace: "/juegos/medidas",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7faff] flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Matemáticas Interactivas 🧮
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl w-full">
        {juegos.map((juego) => (
          <div
            key={juego.id}
            className="rounded-xl p-6 flex flex-col justify-center shadow-md cursor-pointer transform transition hover:scale-[1.03] hover:shadow-lg"
            style={{ backgroundColor: juego.color }}
            onClick={() => router.push(juego.enlace)}
          >
            <div className="flex items-start gap-3">
              <div>{juego.icono}</div>
            </div>
            <h2 className="text-white text-xl font-bold mt-4 mb-1">
              {juego.titulo}
            </h2>
            <p className="text-white/80 text-sm">{juego.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
