"use client";
import { useCursos } from "../context/CursosContext";

interface Props {
  grado: string;
}

export default function CursosGrado({ grado }: Props) {
  const { cursos } = useCursos();
  const lista = cursos[grado] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        Mis Cursos - {grado}
      </h1>

      {lista.length === 0 ? (
        <p className="text-gray-600">Aún no hay cursos para este grado 📭</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lista.map((curso: any) => (
            <div
              key={curso.id}
              className="bg-[#1E293B] text-white p-6 rounded-xl shadow-xl flex flex-col justify-between"
            >
              <div className="flex flex-col items-center">
                <img
                  src={curso.icono}
                  alt={curso.nombre}
                  className="w-16 mb-4"
                />
                <h2 className="text-xl font-bold">{curso.nombre}</h2>
                <p className="mt-2 text-sm">📚 {curso.modulos} módulos</p>
              </div>
              <button className="bg-blue-500 mt-4 px-4 py-2 rounded-lg hover:bg-blue-600 w-full">
                Entrar al Curso
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
