"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function ClientPagePalabras({ salon_codigo, nombreAlumno, onBack }: {
  salon_codigo: string;
  nombreAlumno: string;
  onBack: () => void;
}){
  const router = useRouter()

  useEffect(() => {
    // Bloquea navegación y llama a onBack
    const handlePopState = (e) => {
      e.preventDefault();
      onBack(); 
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-2xl font-bold hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition"
            title="Retroceder"
          >
            ← Atrás
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Aprende Palabras</h1>
            <p className="text-center text-lg mt-2 opacity-90">Clasifica y entiende dónde va la tilde</p>
          </div>

          <div className="w-24"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-green-700 mb-6 text-balance">Tipos de Palabras</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Las palabras se clasifican según dónde está la sílaba más fuerte. Descubre cuáles llevan tilde.
          </p>
        </div>
      </section>

      {/* Palabras Agudas */}
      <section className="py-12 px-4 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-red-400">
            <h3 className="text-3xl font-bold text-red-600 mb-6">1. Palabras Agudas</h3>
            <p className="text-lg text-gray-800 mb-4">
              La fuerza está en la <span className="font-bold">última sílaba</span>.
            </p>
            <div className="mb-8 flex justify-center">
              <img
                src="/images/image4.png"
                alt="Palabras agudas - Regla de acentuación"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="bg-red-50 rounded-lg p-6 border-2 border-red-300">
              <p className="font-bold text-lg mb-4 text-red-700">Llevan tilde si terminan en:</p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded p-4 border-2 border-red-400 text-center">
                  <p className="text-2xl font-bold text-red-600">Vocal</p>
                  <p className="text-gray-800 mt-2">a, e, i, o, u</p>
                </div>
                <div className="bg-white rounded p-4 border-2 border-red-400 text-center">
                  <p className="text-2xl font-bold text-red-600">N</p>
                </div>
                <div className="bg-white rounded p-4 border-2 border-red-400 text-center">
                  <p className="text-2xl font-bold text-red-600">S</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-lg text-gray-800">
                  <span className="font-bold text-red-600">es-pa-ñol</span> (termina en L - NO lleva tilde)
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-bold text-red-600">me-nú</span> (termina en vocal - lleva tilde)
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-bold text-red-600">ra-zón</span> (termina en N - lleva tilde)
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-bold text-red-600">es-tás</span> (termina en S - lleva tilde)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Palabras Graves */}
      <section className="py-12 px-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-green-400">
            <h3 className="text-3xl font-bold text-green-600 mb-6">2. Palabras Graves o Llanas</h3>
            <p className="text-lg text-gray-800 mb-4">
              La fuerza está en la <span className="font-bold">penúltima sílaba</span>.
            </p>
            <div className="bg-green-50 rounded-lg p-6 border-2 border-green-300">
              <p className="font-bold text-lg mb-4 text-green-700">Llevan tilde si NO terminan en:</p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded p-4 border-2 border-green-400 text-center">
                  <p className="text-2xl font-bold text-green-600">Vocal</p>
                  <p className="text-gray-800 mt-2">a, e, i, o, u</p>
                </div>
                <div className="bg-white rounded p-4 border-2 border-green-400 text-center">
                  <p className="text-2xl font-bold text-green-600">N</p>
                </div>
                <div className="bg-white rounded p-4 border-2 border-green-400 text-center">
                  <p className="text-2xl font-bold text-green-600">S</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-lg text-gray-800">
                  <span className="font-bold text-green-600">ár-bol</span> (termina en L - lleva tilde)
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-bold text-green-600">ca-sa</span> (termina en vocal - NO lleva tilde)
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-bold text-green-600">di-fí-cil</span> (termina en L - lleva tilde)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Palabras Esdrújulas */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-blue-400">
            <h3 className="text-3xl font-bold text-blue-600 mb-6">3. Palabras Esdrújulas</h3>
            <p className="text-lg text-gray-800 mb-6">
              La fuerza está en la <span className="font-bold">antepenúltima sílaba</span>.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-300">
              <p className="font-bold text-lg mb-6 text-blue-700 text-center text-2xl">¡Siempre llevan tilde!</p>
              <div className="space-y-3">
                <p className="text-lg text-gray-800">
                  <span className="font-bold text-blue-600">rá-pi-do</span>
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-bold text-blue-600">mú-si-ca</span>
                </p>
                <p className="text-lg text-gray-800">
                  <span className="font-bold text-blue-600">e-léc-tri-co</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diptongo e Hiato */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-700">Diptongo e Hiato</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Diptongo */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-purple-400">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Diptongo</h3>
              <p className="text-lg text-gray-800 mb-4">
                Cuando dos vocales están juntas y suenan en la <span className="font-bold">misma sílaba</span>.
              </p>
              <div className="bg-purple-50 rounded-lg p-4 space-y-3">
                <p className="text-lg font-bold text-gray-800">cie-lo</p>
                <p className="text-lg font-bold text-gray-800">jue-go</p>
                <p className="text-lg font-bold text-gray-800">via-je</p>
              </div>
            </div>

            {/* Hiato */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-pink-400">
              <h3 className="text-2xl font-bold text-pink-600 mb-4">Hiato</h3>
              <p className="text-lg text-gray-800 mb-4">
                Cuando dos vocales están juntas pero se separan en <span className="font-bold">sílabas distintas</span>.
              </p>
              <div className="bg-pink-50 rounded-lg p-4 space-y-3">
                <p className="text-lg font-bold text-gray-800">
                  ma-rí-a <span className="text-red-600 text-base">(la í suena fuerte)</span>
                </p>
                <p className="text-lg font-bold text-gray-800">
                  frí-o <span className="text-red-600 text-base">(la í suena fuerte)</span>
                </p>
                <p className="text-lg font-bold text-gray-800">
                  pa-ís <span className="text-red-600 text-base">(la í suena fuerte)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-green-100 to-emerald-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-700">Aprende Más con un Video</h2>

          <div className="bg-white rounded-2xl shadow-2xl p-8 overflow-hidden border-4 border-green-400">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/dfzlBAMVrBI"
                title="Tutorial de Clasificación de Palabras"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-700 text-lg">
                En este video aprenderás cómo clasificar palabras y dónde van las tildes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">¡Recuerda las reglas de acentuación!</p>
          <p className="text-sm opacity-90">Cada tipo de palabra tiene sus propias reglas</p>
          <div className="mt-4 text-2xl">¡Sigue practicando y dominarás todas las palabras!</div>
        </div>
      </footer>
    </main>
  )
}
