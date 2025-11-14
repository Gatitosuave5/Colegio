// topic-module.tsx
"use client";
import { useRouter } from "next/navigation";
import { topicsData } from "./topicsData";

export default function TopicModule({ id }: { id: string }) {
  const router = useRouter();
  const topic = topicsData[id];

  if (!topic) return <p>Tema no encontrado.</p>;

  return (
    <div className="min-h-screen p-6 bg-white">
      <button
        onClick={() => router.back()}
        className="text-blue-600 mb-4 text-sm"
      >
        ← Volver
      </button>

      <h1 className="text-3xl font-bold flex items-center gap-2">
        {topic.icon} {topic.title}
      </h1>

      <p className="text-gray-500 mb-6">Explicación del tema</p>

      {/* EXPLICACIÓN */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
        <pre className="whitespace-pre-wrap text-gray-700">
          {topic.explanation}
        </pre>
      </div>

      {/* EJEMPLOS */}
      <h2 className="text-2xl font-bold mb-3">Ejemplos</h2>

      <div className="flex flex-col gap-4">
        {topic.examples.map((ex, i) => (
          <div
            key={i}
            className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-lg"
          >
            <h3 className="font-bold">{ex.title}</h3>
            <p className="text-xl font-semibold">{ex.operation}</p>
            <p className="text-gray-700 mt-2">{ex.explanation}</p>
          </div>
        ))}
      </div>

      {/* BOTONES */}
      <div className="flex gap-4 mt-10">
        <button
          onClick={() =>
            router.push(`/grados/primero/cursos/matematicas/${topic.id}/quiz`)
          }
          className="bg-pink-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-pink-700"
        >
          📘 Responder Cuestionario
        </button>

        <button
          onClick={() =>
            router.push(`/grados/primero/cursos/matematicas/${topic.id}/games`)
          }
          className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700"
        >
          🎮 Juegos (Bloqueado)
        </button>
      </div>
    </div>
  );
}
