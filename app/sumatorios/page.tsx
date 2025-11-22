"use client";

import { useEffect } from "react";

export default function Home({ salon_codigo, nombreAlumno, onBack }) {

  
  useEffect(() => {
    history.pushState(null, "", window.location.href);

    const handlePop = () => {
      onBack();
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
        <button
            
            className="text-2xl font-bold hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition text-black"
            title="Retroceder"
            onClick={onBack}
          >
            ← Atrás
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-center text-balance">Aprende Sumatorios</h1>
          <p className="text-center text-lg mt-2 opacity-90">Junta números y descubre el poder de la suma</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6 text-balance">¿Qué es un Sumatorio?</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Juntar cosas paso a paso hasta obtener una suma grande. Cuando hacemos sumatorios, lo que buscamos es contar
            todo lo que hay juntando varias cantidades.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 px-4 bg-white bg-opacity-50">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-8 border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">La idea principal</h3>
              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                <span className="font-bold">Juntar cosas paso a paso hasta obtener una suma grande.</span> Cuando
                hacemos sumatorios, lo que buscamos es contar todo lo que hay juntando varias cantidades.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Por ejemplo, imagina que estás juntando <span className="font-bold">puntos en un juego</span>. En el
                primer nivel ganas <span className="text-red-600 font-bold">3 puntos</span>, en el segundo ganas{" "}
                <span className="text-blue-600 font-bold">5 puntos</span>, en el tercero{" "}
                <span className="text-green-600 font-bold">4 puntos</span> y en el cuarto{" "}
                <span className="text-purple-600 font-bold">2 puntos</span>.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-2xl p-8 border-l-4 border-pink-500">
              <h3 className="text-2xl font-bold text-pink-700 mb-4">¿Por qué lo necesitamos?</h3>
              <p className="text-lg text-gray-800 leading-relaxed mb-4">
                Si quieres saber <span className="font-bold">cuántos puntos tienes en total</span>, no dices cada nivel
                por separado, sino que vas sumando todos uno tras otro.
              </p>
              <p className="text-gray-800 font-bold text-lg">
                Eso es un sumatorio:{" "}
                <span className="text-pink-600">
                  sumar todas las cantidades que vamos obteniendo para saber el total.
                </span>
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 border-l-4 border-yellow-500">
              <h3 className="text-2xl font-bold text-orange-700 mb-4">En la vida real</h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                También sirve para cosas de la vida real. Por ejemplo, si en tu salón cada niño trae lápices y quieres
                saber <span className="font-bold">cuántos hay en total</span>, puedes sumar lo que trajo cada uno:
              </p>
              <div className="mt-4 p-4 bg-white rounded-lg">
                <p className="font-bold text-lg text-black">
                  Total de lápices = Lápices de María + Lápices de Juan + Lápices de Ana...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">Ejemplos Visuales</h2>

          <div className="space-y-8">
            {/* Ejemplo 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-red-300">
              <h3 className="text-2xl font-bold text-center text-red-600 mb-6">Ejemplo 1: Suma con Base 10</h3>
              <div className="flex justify-center mb-8">
                <img
                  src="/images/image2.png"
                  alt="Suma con material de base 10"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-lg text-black">
                  <span className="font-bold">Paso 1:</span> Anotar el primer sumando
                </p>
                <p className="text-lg mt-2 text-black">
                  <span className="font-bold">Paso 2:</span> Anotar el segundo sumando
                </p>
                <p className="text-lg mt-2 text-black">
                  <span className="font-bold">Paso 3:</span> Sumar las Unidades
                </p>
                <p className="text-lg mt-2 text-black">
                  <span className="font-bold">Paso 4:</span> Sumar las Decenas
                </p>
                <p className="text-lg mt-2 text-black">
                  <span className="font-bold">Paso 5:</span> Sumar las Centenas
                </p>
              </div>
            </div>

            {/* Ejemplo 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-green-300">
              <h3 className="text-2xl font-bold text-center text-green-600 mb-6">Ejemplo 2: Suma con Tres Cifras</h3>
              <div className="flex justify-center mb-8">
                <img
                  src="/images/image3.jpg"
                  alt="Suma con dos cifras"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-lg p-4 text-center border-2 border-pink-300">
                  <p className="text-lg font-bold text-black">Primer Ejemplo:</p>
                  <p className="text-2xl font-bold text-red-600">224 + 145 = 369</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center border-2 border-orange-300">
                  <p className="text-lg font-bold text-black">Segundo Ejemplo:</p>
                  <p className="text-2xl font-bold text-blue-600">179 + 147 = 326</p>
                </div>
              </div>
            </div>

            {/* Consejo */}
            <div className="bg-gradient-to-r from-purple-200 to-pink-200 rounded-2xl p-8 border-4 border-purple-400">
              <h3 className="text-2xl font-bold mb-4 text-purple-700">Consejo: Práctica Diaria</h3>
              <ul className="space-y-3 text-lg text-gray-800">
                <li> ✔ Practica sumando primero las unidades, luego las decenas</li>
                <li> ✔ Dibuja los números para visualizar mejor el proceso</li>
                <li> ✔ Busca sumatorios en tu vida diaria (puntos, dinero, objetos)</li>
                <li> ✔ No te apresures, tómate tu tiempo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">Aprende Más con un Video</h2>

          <div className="bg-white rounded-2xl shadow-2xl p-8 overflow-hidden border-4 border-blue-400">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/oexd_Dfic_Q"
                title="Tutorial de Sumatorios"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-700 text-lg">
                En este video puedes ver paso a paso cómo funcionan los sumatorios
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">¡Recuerda practicar todos los días!</p>
          <p className="text-sm opacity-90">Las matemáticas son divertidas cuando las entendemos paso a paso</p>
          <div className="mt-4 text-2xl">¡Sigue sumando y convirtiéndote en un experto!</div>
        </div>
      </footer>
    </main>
  )
}
