"use client";
import React, { useEffect, useState } from "react";
import LoginModal from "@/components/LoginModal";




export default function PaginaAlumno() {
  const [contenidos, setContenidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [autenticado, setAutenticado] = useState(false);
  const [credenciales, setCredenciales] = useState({ usuario: "", contraseña: "" });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContenidos([
        {
          id: 1,
          categoria: "Comunicación",
          tipo: "Lectura",
          titulo: "El ratón valiente",
          cuerpo:
            "Había una vez un pequeño ratón que vivía en el bosque. Todos los animales se burlaban de él porque era muy tímido. Pero un día, un gran gato apareció y el ratón, sin pensarlo, salvó a sus amigos demostrando su gran valentía.",
          visible: true,
        },
      ]);
      setCargando(false);
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);

  const visibles = contenidos.filter((c) => c.visible);

  const manejarLogin = (e) => {
    e.preventDefault();
    if (credenciales.usuario === "profesor" && credenciales.contraseña === "1234") {
      setAutenticado(true);
      setMostrarLogin(false);
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-blue-700 font-semibold animate-pulse">
        ⏳ Cargando actividades...
      </div>
    );
  }

  if (autenticado) {
    return (
      <div className="flex items-center justify-center h-screen">
        <iframe
          src="/profesor"
          title="Panel del Profesor"
          className="w-full h-full border-none"
        ></iframe>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-white p-6">
      {/* Botón para abrir login */}
      <button
        onClick={() => setMostrarLogin(true)}
        className="absolute top-3 right-3 text-xs text-gray-600 hover:text-blue-600 border rounded px-2 py-1 bg-white shadow-sm"
      >
        Profesores
      </button>

      <div className="max-w-5xl mx-auto">
        {visibles.length === 0 ? (
          <section className="bg-white p-6 rounded-2xl shadow-md text-center border border-blue-200">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">¡Bienvenido al Portal Escolar! 🏫</h1>
            <p className="text-gray-700 text-lg">
              El profesor aún no ha publicado nuevas actividades. Mientras tanto, disfruta de este contenido divertido.
            </p>

            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 border rounded-lg p-4 text-left">
                <h3 className="font-semibold text-lg text-yellow-700">📖 Lectura destacada: La amistad</h3>
                <p className="text-sm text-gray-700 mt-2">
                  La verdadera amistad es como una flor: crece si la cuidamos con cariño, respeto y alegría.
                </p>
              </div>
              <div className="bg-green-50 border rounded-lg p-4 text-left">
                <h3 className="font-semibold text-lg text-green-700">🧮 Ejercicio: Sumas rápidas</h3>
                <p className="text-sm text-gray-700 mt-2">5 + 7 = ? | 8 + 6 = ? | 10 + 4 = ?</p>
              </div>
            </div>

            <div className="mt-6 bg-pink-50 border rounded-lg p-4">
              <h3 className="text-pink-700 font-semibold mb-2">🎮 Juego educativo</h3>
              <p className="text-gray-700 text-sm">Encuentra las parejas correctas: sol - calor, luna - noche, mar - pez 🌊</p>
            </div>
          </section>
        ) : (
          visibles.map((c) => (
            <section
              key={c.id}
              className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-blue-200 animate-fadeIn"
            >
              <div className="text-xs text-gray-500 mb-1">{c.categoria} • {c.tipo}</div>
              <h2 className="text-2xl font-bold text-blue-700 mb-3">{c.titulo}</h2>
              <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">{c.cuerpo}</p>

              {c.tipo === "Lectura" && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-xl font-semibold text-green-700 mb-2">🧠 Cuestionario</h3>
                  <div className="space-y-2">
                    <div className="bg-green-50 border rounded p-3">
                      <p className="text-sm text-gray-700">1️⃣ ¿Por qué los animales se burlaban del ratón?</p>
                    </div>
                    <div className="bg-green-50 border rounded p-3">
                      <p className="text-sm text-gray-700">2️⃣ ¿Qué hizo el ratón para demostrar su valentía?</p>
                    </div>
                    <div className="bg-green-50 border rounded p-3">
                      <p className="text-sm text-gray-700">3️⃣ ¿Qué enseñanza te deja esta historia?</p>
                    </div>
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold text-pink-700 mb-2">🎮 Juego: Adivina las palabras</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      Busca las palabras escondidas: <strong>valiente</strong>, <strong>ratón</strong>, <strong>amigos</strong> 🐭
                    </p>
                    <div className="bg-pink-50 border rounded p-3">
                      <p className="text-center text-gray-800 font-mono">
                        V A L I E N T E <br />
                        R A T O N X X X <br />
                        A M I G O S X X
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>
          ))
        )}
      </div>

      {/* Modal de login */}
      {mostrarLogin && <LoginModal onClose={() => setMostrarLogin(false)} />}

    </div>
  );
}
