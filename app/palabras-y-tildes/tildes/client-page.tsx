"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function ClientPageTildes({ salon_codigo, nombreAlumno, onBack }: {
  salon_codigo: string;
  nombreAlumno: string;
  onBack: () => void;
}) {
  const router = useRouter()

  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault();
      onBack();
    };
  
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-2xl font-bold hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition"
            title="Retroceder"
          >
            ← Atrás
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Aprende Tildes</h1>
            <p className="text-center text-lg mt-2 opacity-90">Descubre qué son y por qué son importantes</p>
          </div>

          <div className="w-24"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-700 mb-6 text-balance">¿Qué son las Tildes?</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Las tildes son pequeñas rayitas que ponemos encima de algunas letras. Nos ayudan a leer mejor las palabras y
            a saber dónde suena más fuerte cada una.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 px-4 bg-white bg-opacity-50">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-8 border-l-4 border-yellow-600">
              <h3 className="text-2xl font-bold text-yellow-800 mb-4">¿Por qué existen las tildes?</h3>
              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                Cada palabra tiene sílabas, y una de esas sílabas suena más fuerte que las demás. A esa parte le
                llamamos <span className="font-bold text-amber-700">sílaba tónica</span>.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Las tildes nos marcan cuál parte suena más fuerte y nos ayudan a no confundir palabras. Por ejemplo:
              </p>
              <div className="mt-4 p-4 bg-white rounded-lg border-2 border-yellow-300">
                <p className="text-lg font-bold">
                  <span className="text-orange-600">pa</span>
                  <span className="text-red-600">pa</span> (la verdura) vs <span className="text-orange-600">pa</span>
                  <span className="text-red-600">pá</span> (tu padre)
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-8 border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Vocales y Consonantes</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                  <p className="font-bold text-lg text-blue-700">Vocales</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">A E I O U</p>
                  <p className="text-gray-700 mt-2"> Son las que abren la boca y hacen sonidos claros.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-2 border-cyan-300">
                  <p className="font-bold text-lg text-cyan-700">Consonantes</p>
                  <p className="text-gray-700 mt-2">
                    Todas las demás (b, c, d, f, g...) Necesitan estar con una vocal para sonar fuerte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-yellow-100 to-amber-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-amber-700">Aprende Más con un Video</h2>

          <div className="bg-white rounded-2xl shadow-2xl p-8 overflow-hidden border-4 border-amber-400">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/CHCt5iO_sTo"
                title="Tutorial de Tildes"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-700 text-lg">
                En este video puedes ver paso a paso qué son las tildes y cómo funcionan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">¡Las tildes marcan el ritmo!</p>
          <p className="text-sm opacity-90">Son pequeñas pero muy importantes para leer correctamente</p>
          <div className="mt-4 text-2xl">¡Sigue aprendiendo sobre tildes!</div>
        </div>
      </footer>
    </main>
  )
}
