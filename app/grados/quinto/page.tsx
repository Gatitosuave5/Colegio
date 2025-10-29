"use client";
import { useRouter } from "next/navigation";
import { useCursos } from "../../context/CursosContext";

export default function QuintoGrado() {
  const { cursos } = useCursos();
  const lista = cursos["5° Grado"];
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 p-8 relative">
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 right-6 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Salir
      </button>

      <h1 className="text-3xl font-bold text-pink-800 mb-8">
        Mis Cursos - 5° Grado
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lista.map((curso: any) => (
          <div
            key={curso.id}
            className="bg-[#831843] text-white p-6 rounded-xl shadow-xl flex flex-col justify-between"
          >
            <div className="flex flex-col items-center">
              <img src={curso.icono} alt={curso.nombre} className="w-16 mb-4" />
              <h2 className="text-xl font-bold">{curso.nombre}</h2>
              <p className="mt-2 text-sm">📚 {curso.modulos} módulos</p>
            </div>
            <button className="bg-pink-500 mt-4 px-4 py-2 rounded-lg hover:bg-pink-600 w-full">
              Entrar al Curso
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
