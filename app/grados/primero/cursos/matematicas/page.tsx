"use client";

import { useRouter } from "next/navigation";
import { topicsData } from "./topicsData";

export default function Page() {
  const router = useRouter();
  const topics = Object.values(topicsData);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
        Temas de Matemática – Grado 1
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Elige un tema y comienza a aprender
      </p>

      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="
              relative rounded-2xl shadow-lg cursor-pointer overflow-hidden
              group transition-all duration-500 ease-out
              hover:scale-[1.02]
            "
            onClick={() =>
              router.push(`/grados/primero/cursos/matematicas/${topic.id}`)
            }
          >
            {/* Fondo */}
            <div
              className="
                absolute inset-0 bg-cover bg-center 
                brightness-75
                transition-all duration-500 
                group-hover:brightness-110
                group-hover:scale-105
              "
              style={{ backgroundImage: `url(${topic.background})` }}
            />

            {/* Contenido */}
            <div className="relative h-48 p-6 flex items-start justify-between">
              <div className="flex flex-col gap-1 text-white drop-shadow-lg">
                <h2 className="text-2xl font-bold">
                  {topic.icon} {topic.title}
                </h2>
                <p className="text-sm opacity-90">
                  Haz clic para aprender este tema
                </p>
              </div>

              {/* Botón decorativo */}
              <button
                className="
                  w-12 h-6 bg-white/90 rounded-full shadow-lg
                  transition-all duration-500
                  group-hover:scale-150
                  group-hover:bg-white
                "
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
