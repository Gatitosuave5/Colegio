"use client";

import { useState } from "react";

export default function TeacherPanel() {
  const contenidosPorGrado: Record<number, any[]> = {
    1: [
      { id: 1, categoria: "Matemática", titulo: "Sumas del 1 al 10" },
      { id: 2, categoria: "Matemática", titulo: "Restas del 1 al 10" },
      { id: 3, categoria: "Matemática", titulo: "Números del 1 al 100" },
      { id: 4, categoria: "Matemática", titulo: "Figuras geométricas básicas" },
      { id: 5, categoria: "Matemática", titulo: "Clasificación de objetos" },
      { id: 6, categoria: "Matemática", titulo: "Problemas simples de suma" },
      { id: 7, categoria: "Matemática", titulo: "Mayor / Menor" },
      { id: 8, categoria: "Matemática", titulo: "Conteo de objetos" },
      { id: 9, categoria: "Matemática", titulo: "Series numéricas simples" },
      { id: 10, categoria: "Matemática", titulo: "Ordenar números" },
    ],
    2: [
      { id: 11, categoria: "Matemática", titulo: "Sumas con llevadas" },
      { id: 12, categoria: "Matemática", titulo: "Restas con llevadas" },
      { id: 13, categoria: "Matemática", titulo: "Figuras y lados" },
      { id: 14, categoria: "Matemática", titulo: "Medidas básicas" },
      { id: 15, categoria: "Matemática", titulo: "Mitad y doble" },
      { id: 16, categoria: "Matemática", titulo: "Problemas con dinero" },
      { id: 17, categoria: "Matemática", titulo: "Series avanzadas" },
      { id: 18, categoria: "Matemática", titulo: "Horas y minutos" },
      { id: 19, categoria: "Matemática", titulo: "Tablas del 1 al 5" },
      { id: 20, categoria: "Matemática", titulo: "Pares e impares" },
    ],
    3: [
      { id: 21, categoria: "Matemática", titulo: "Multiplicación (1–10)" },
      { id: 22, categoria: "Matemática", titulo: "División básica" },
      { id: 23, categoria: "Matemática", titulo: "Perímetro de figuras" },
      { id: 24, categoria: "Matemática", titulo: "Ángulos básicos" },
      { id: 25, categoria: "Matemática", titulo: "Gráficos de barras" },
      { id: 26, categoria: "Matemática", titulo: "Fracciones simples" },
      { id: 27, categoria: "Matemática", titulo: "Romanos hasta 100" },
      { id: 28, categoria: "Matemática", titulo: "Múltiplos y divisores" },
      { id: 29, categoria: "Matemática", titulo: "Problemas con dinero" },
      { id: 30, categoria: "Matemática", titulo: "Orden hasta 1000" },
    ],
    4: [
      { id: 31, categoria: "Matemática", titulo: "Mínimo común múltiplo" },
      { id: 32, categoria: "Matemática", titulo: "Máximo común divisor" },
      { id: 33, categoria: "Matemática", titulo: "Fracciones avanzadas" },
      { id: 34, categoria: "Matemática", titulo: "Decimales básicos" },
      { id: 35, categoria: "Matemática", titulo: "Área cuadrado/rectángulo" },
      { id: 36, categoria: "Matemática", titulo: "Romanos hasta 1000+" },
      { id: 37, categoria: "Matemática", titulo: "Perímetro y área" },
      { id: 38, categoria: "Matemática", titulo: "Gráficos y tablas" },
      { id: 39, categoria: "Matemática", titulo: "Dinero y cambio" },
      { id: 40, categoria: "Matemática", titulo: "Problemas complejos" },
    ],
    5: [
      { id: 41, categoria: "Matemática", titulo: "Operaciones con decimales" },
      { id: 42, categoria: "Matemática", titulo: "Fracciones avanzadas" },
      { id: 43, categoria: "Matemática", titulo: "Razones y proporciones" },
      { id: 44, categoria: "Matemática", titulo: "Área del triángulo" },
      { id: 45, categoria: "Matemática", titulo: "Volumen de prismas" },
      { id: 46, categoria: "Matemática", titulo: "Potencias" },
      { id: 47, categoria: "Matemática", titulo: "Raíz cuadrada básica" },
      { id: 48, categoria: "Matemática", titulo: "Ecuaciones simples" },
      { id: 49, categoria: "Matemática", titulo: "Probabilidad" },
      { id: 50, categoria: "Matemática", titulo: "Porcentajes" },
    ],
    6: [
      { id: 51, categoria: "Matemática", titulo: "Coordenadas" },
      { id: 52, categoria: "Matemática", titulo: "Ecuaciones con incógnita" },
      { id: 53, categoria: "Matemática", titulo: "Polígonos y ángulos" },
      { id: 54, categoria: "Matemática", titulo: "Área avanzada" },
      { id: 55, categoria: "Matemática", titulo: "Volumen 3D" },
      { id: 56, categoria: "Matemática", titulo: "Porcentajes reales" },
      { id: 57, categoria: "Matemática", titulo: "Unidades de medida" },
      { id: 58, categoria: "Matemática", titulo: "Media, moda y mediana" },
      { id: 59, categoria: "Matemática", titulo: "Gráficos circulares" },
      { id: 60, categoria: "Matemática", titulo: "Problemas combinados" },
    ],
  };

  const [gradoActivo, setGradoActivo] = useState<number | null>(null);
  const [contenidos, setContenidos] = useState<any[]>([]);
  const [categoriaAbierta, setCategoriaAbierta] = useState<string | null>(null);

  const cambiarGrado = (grado: number) => {
    setGradoActivo(grado);
    setContenidos(contenidosPorGrado[grado]);
    setCategoriaAbierta(null);
  };

  const toggleContenido = (id: number) => {
    setContenidos(prev =>
      prev.map(c => (c.id === id ? { ...c, activo: !c.activo } : c))
    );
  };

  const categorias = Array.from(new Set(contenidos.map(c => c.categoria)));

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">HOLA Panel del Profesor</h1>

      <div className="flex gap-3 mb-6 flex-wrap">
        {[1, 2, 3, 4, 5, 6].map(grado => (
          <button
            key={grado}
            onClick={() => cambiarGrado(grado)}
            className={`px-6 py-2 rounded-lg font-semibold border transition ${
              gradoActivo === grado
                ? "bg-blue-600 text-white"
                : "bg-white border-blue-600 text-blue-600 hover:bg-blue-50"
            }`}
          >
            {grado}° Grado
          </button>
        ))}
      </div>

      {gradoActivo ? (
        categorias.map(cat => (
          <div key={cat} className="bg-white shadow-md rounded-lg mb-5 overflow-hidden">

            {/*Texto oscuro aquí */}
            <button
              onClick={() => setCategoriaAbierta(categoriaAbierta === cat ? null : cat)}
              className="w-full text-left p-5 font-semibold text-lg flex justify-between items-center bg-blue-100 hover:bg-blue-200 text-gray-800"
            >
             {cat}
              <span>{categoriaAbierta === cat ? "▲" : "▼"}</span>
            </button>

            {categoriaAbierta === cat && (
              <div className="p-4 max-h-64 overflow-y-auto border-t">
                {contenidos
                  .filter(c => c.categoria === cat)
                  .map(item => (
                    <div
                      key={item.id}
                      className={`flex justify-between items-center p-3 mb-2 rounded border cursor-pointer ${
                        item.activo ? "bg-green-100 border-green-400" : "bg-gray-100"
                      }`}
                      onClick={() => toggleContenido(item.id)}
                    >
                     
                      <span className="text-gray-800 font-medium">{item.titulo}</span>
                      <input
                        type="checkbox"
                        checked={item.activo || false}
                        onChange={() => toggleContenido(item.id)}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-lg">Selecciona un grado para iniciar ✅</p>
      )}
    </div>
  );
}
