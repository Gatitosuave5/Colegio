"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { useState } from "react";
import ClientPagePalabras from "./palabras/client-page";
import ClientPageTildes from "./tildes/client-page";

export default function ClientHomePage({ salon_codigo, nombreAlumno, onBack }: {
  salon_codigo: string;
  nombreAlumno: string;
  
  onBack: () => void;
}) {
  
  const router = useRouter()
  
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    history.pushState(null, "", window.location.href);
  
    const handlePop = (e) => {
      e.preventDefault();
  
      if (selectedSection !== null) {
        
        setSelectedSection(null);
      } else {
        
        onBack();
      }
    };
  
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [selectedSection]);

  if (selectedSection === "palabras") {
    return (
      <ClientPagePalabras
        salon_codigo={salon_codigo}
        nombreAlumno={nombreAlumno}
        onBack={() => setSelectedSection(null)}
      />
    );
  }

  if (selectedSection === "tildes") {
    return (
      <ClientPageTildes
        salon_codigo={salon_codigo}
        nombreAlumno={nombreAlumno}
        onBack={() => setSelectedSection(null)}
      />
    );
  }

  return (

    
    
    
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      
 
  {/* Botón atrás fijo en esquina */}
  <button
    onClick={onBack}
    className="absolute top-6 left-6 text-xl font-bold hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition text-black"
  >
    ← Atrás
  </button>

      <div className="w-full max-w-4xl relative">
  
           {/* Botón atrás en esquina */}
            

            {/* Header centrado */}
            <div className="mb-12 flex items-center justify-start">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Aprende con Nosotros</h1>
              <p className="text-2xl text-gray-600">Elige un tema para comenzar</p>
            </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sumatorios Card */}
         

          {/* Tildes Card */}
          <button
            onClick={() => setSelectedSection("tildes")}
            className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 bg-white"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity" />

            <div className="relative p-8 md:p-12">
              {/* Top Section */}
              <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 rounded-2xl p-8 mb-6 text-white">
                <div className="text-6xl mb-4">´</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Tildes</h2>
                <p className="text-lg opacity-90">Aprende dónde va la fuerza</p>
              </div>

              {/* Description */}
              <div className="text-left space-y-4">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Descubre qué son las tildes y cómo marcan la pronunciación de las palabras.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-2xl"> ✓</span>
                    <span>Concepto de tilde</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-2xl"> ✓</span>
                    <span>Video explicativo</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-2xl"> ✓</span>
                    <span>Ejemplos prácticos</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t-2 border-gray-200">
                  <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-600 text-white px-6 py-2 rounded-full font-bold group-hover:from-yellow-500 group-hover:to-orange-700 transition">
                    Comenzar →
                  </span>
                </div>
              </div>
            </div>
          </button>

          {/* Palabras Card */}
          <button
            onClick={() => setSelectedSection("palabras")}
            className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 bg-white"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 opacity-0 group-hover:opacity-10 transition-opacity" />

            <div className="relative p-8 md:p-12">
              {/* Top Section */}
              <div className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 rounded-2xl p-8 mb-6 text-white">
                <div className="text-6xl mb-4">🔤</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Palabras</h2>
                <p className="text-lg opacity-90">Clasifica y entiende cada palabra</p>
              </div>

              {/* Description */}
              <div className="text-left space-y-4">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Aprende a clasificar palabras: agudas, graves, esdrújulas, hiato y diptongo.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-2xl"> ✓</span>
                    <span>Tipos de palabras</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-2xl"> ✓</span>
                    <span>Video explicativo</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-2xl"> ✓</span>
                    <span>Reglas de acentuación</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t-2 border-gray-200">
                  <span className="inline-block bg-gradient-to-r from-green-400 to-teal-600 text-white px-6 py-2 rounded-full font-bold group-hover:from-green-500 group-hover:to-teal-700 transition">
                    Comenzar →
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600">
          <p className="text-lg">Desarrollado para hacer el aprendizaje divertido e interactivo</p>
        </div>
      </div>
    </main>
  )
}
