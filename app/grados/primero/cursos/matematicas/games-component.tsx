// games-module.tsx
"use client";

import { useRouter } from "next/navigation";

export default function GamesModule({ id }: { id: string }) {
  const router = useRouter();

  const unlocked = typeof window !== "undefined"
    ? localStorage.getItem(`math_pass_${id}`) === "true"
    : false;

  if (!unlocked) {
    return (
      <div className="p-6 text-center">
        <p className="text-xl text-red-600 font-semibold">
          ❌ Debes aprobar el cuestionario (70% o más) para desbloquear los juegos.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🎮 Juegos de {id}</h1>
      <p>Pronto aquí estarán los juegos interactivos.</p>
    </div>
  );
}
