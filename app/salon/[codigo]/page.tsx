"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import io, { Socket } from "socket.io-client";

interface Salon {
  grado: number;
  aula: string;
}

interface Alumno {
  nombre: string;
  salon_codigo: string;
}

export default function SalonPage() {
  const { codigo } = useParams();
  const router = useRouter();

  const [salon, setSalon] = useState<Salon | null>(null);
  const [cargando, setCargando] = useState(true);
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  // Obtener datos del salón
  useEffect(() => {
    const obtenerSalon = async () => {
      const res = await fetch(`/api/salones?codigo=${codigo}`);
      const data = await res.json();
      setSalon(data.salon || null);
      setCargando(false);
    };
    obtenerSalon();
  }, [codigo]);

  // Conectar a SOCKET.IO y escuchar alumnos
  useEffect(() => {
    const socket: Socket = io("http://localhost:3001");

    // Unirse al salón
    socket.emit("unirse-salon", codigo);

    // Recibir la lista actualizada
    socket.on(`alumnos-${codigo}`, (lista: Alumno[]) => {
      setAlumnos(lista);
    });

    //  limpiar conexión al desmontar
    return () => {
      socket.disconnect();
    };
  }, [codigo]);

  // eliminar alumno al cerrar página
  useEffect(() => {
    const nombre = localStorage.getItem("nombreAlumno");
    const codigoSalon = localStorage.getItem("codigoSalon");
  
    const enviarBeacon = () => {
      const payload = JSON.stringify({ nombre, salon_codigo: codigoSalon });
  
      navigator.sendBeacon(
        "/api/alumnos_temporales/eliminar",
        new Blob([payload], { type: "application/json" })
      );
    };
  
    window.addEventListener("beforeunload", enviarBeacon);
  
    return () => window.removeEventListener("beforeunload", enviarBeacon);
  }, []);

  // Pantallas de carga o error
  if (cargando)
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        Cargando salón...
      </div>
    );

  if (!salon)
    return (
      <div className="text-center mt-20">
        <h1 className="text-red-600 text-3xl font-bold">❌ Código inválido</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded mt-4 font-bold"
        >
          ← Regresar
        </button>
      </div>
    );

  const nombreAlumno =
    localStorage.getItem("nombreAlumno") || "Alumno";

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="flex justify-between p-6">
        <h1 className="text-2xl font-bold text-blue-600">
          🎒 Bienvenido {nombreAlumno}
        </h1>
        <button
          onClick={() => router.push("/")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Salir
        </button>
      </div>

      {/* Info del salón */}
      <section className="text-center mt-4">
        <h2 className="text-xl font-bold text-gray-800">
          Salón: <span className="text-blue-600">{codigo}</span>
        </h2>
        <p className="text-gray-700">
          Grado: <b>{salon.grado}°</b> — Aula: <b>{salon.aula}</b>
        </p>
      </section>

      {/* Panel de alumnos en tiempo real */}
      <section className="mt-10 text-center">
        <h2 className="text-2xl font-bold text-green-600">👥 Alumnos Conectados</h2>
        <ul className="mt-4 space-y-2 text-lg">
          {alumnos.length > 0 ? (
            alumnos.map((al, i) => (
              <li key={i} className="text-gray-800">
                ✅ {al.nombre}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No hay alumnos conectados</p>
          )}
        </ul>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mt-16 p-4">
        © 2025 Proyecto Escolar — Aprender es divertido 🚀
      </footer>
    </main>
  );
}
