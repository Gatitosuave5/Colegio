"use client";

import { useRouter } from "next/navigation";

interface Recurso {
  id: string;
  titulo: string;
  tipo: string; // Ej: 'PDF', 'Video', 'Link'
  descripcion: string;
  enlace?: string;
}

interface Modulo {
  id: string;
  titulo: string;
  descripcion: string;
  recursos: Recurso[];
}

interface Curso {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  modulos: Modulo[];
}

export default function CursoPage({ curso }: { curso: Curso }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      {/* 🟡 Botón volver */}
      <button
        onClick={() => router.push("/grados/primero")}
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg mb-6 hover:bg-yellow-600 transition"
      >
        ← Volver a Mis Cursos
      </button>

      {/* 📘 Encabezado del curso */}
      <div className="flex items-center space-x-4 mb-10">
        <img src={curso.icono} alt={curso.nombre} className="w-20" />
        <div>
          <h1 className="text-3xl font-bold text-blue-800">{curso.nombre}</h1>
          <p className="text-gray-700">{curso.descripcion}</p>
        </div>
      </div>

      {/* 🧾 Lista de módulos */}
      <div className="space-y-6">
        {curso.modulos.map((modulo, index) => (
          <div
            key={modulo.id}
            className="bg-[#1E293B] text-white rounded-xl overflow-hidden shadow-lg"
          >
            <div className="bg-[#0F172A] px-6 py-3 flex items-center space-x-3">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-white">
                {index + 1}
              </div>
              <div>
                <h2 className="font-semibold text-lg">{modulo.titulo}</h2>
                <p className="text-sm text-gray-300">{modulo.descripcion}</p>
              </div>
            </div>

            <div className="p-4">
              {modulo.recursos.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No hay recursos disponibles todavía
                </p>
              ) : (
                <div className="space-y-3">
                  {modulo.recursos.map((recurso) => (
                    <div
                      key={recurso.id}
                      className="bg-[#0F172A] rounded-lg p-3 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{recurso.titulo}</p>
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full mr-2">
                          {recurso.tipo}
                        </span>
                        <p className="text-gray-400 text-sm">
                          {recurso.descripcion}
                        </p>
                      </div>
                      {recurso.enlace && (
                        <a
                          href={recurso.enlace}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          ↗
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
