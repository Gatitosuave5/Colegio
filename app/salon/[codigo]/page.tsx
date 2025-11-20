"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import io, { Socket } from "socket.io-client";
import { ChevronRight, Search, Trophy, X } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import StoryList from "@/app/grados/primero/cursos/Lectura/story-list";
import LiteratureModule from "@/app/grados/primero/cursos/Lectura/literature-module";
import WritingModules from "@/app/grados/tercero/cursos/Computo/writing-modules";
import ReadingModules from "@/app/grados/tercero/cursos/Lectura/reading-modules";
import Grade3MathPage from "@/app/grados/tercero/cursos/matematicas/page";
import { v4 as uuidv4 } from "uuid";
import ScienceModules from "@/app/grados/tercero/cursos/Ciencias/science-modules";
import Page from "@/app/juegos/page";

interface Salon {
  grado: number;
  aula: string;
}

interface Alumno {
  nombre: string;
  salon_codigo: string;
  puntaje?: number;
}

interface Story {
  id: string;
  title: string;
  author: string;
  cover: string;
  difficulty: string;
}
export default function SalonPage() {
  const { codigo } = useParams();
  const router = useRouter();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [salon, setSalon] = useState<Salon | null>(null);
  const [cargando, setCargando] = useState(true);
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [miPuntaje, setMiPuntaje] = useState<number | null>(null);
  const registradoRef = useRef(false);
  const [clientId, setClientId] = useState<string | null>(null);
  const [nombreAlumno, setNombreAlumno] = useState("Alumno");
  const [alumnoCargado, setAlumnoCargado] = useState(false);

  const [yaEntro, setYaEntro] = useState(false);

useEffect(() => {
  if (typeof window !== "undefined") {
    const nombre = localStorage.getItem("nombreAlumno");
    if (nombre) setNombreAlumno(nombre);
  }
}, []);

  const salon_codigo = codigo;
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // ✅ Estados que faltaban
const [contenidosActivos, setContenidosActivos] = useState<any[]>([]);

const stories: Story[] = [
  {
    id: "caperucita-roja",
    title: "Caperucita Roja",
    author: "Hermanos Grimm",
    cover: "📕",
    difficulty: "fácil",
  },
  {
    id: "el-patito-feo",
    title: "El Patito Feo",
    author: "Hans Christian Andersen",
    cover: "🦢",
    difficulty: "fácil",
  },
  {
    id: "cenicienta",
    title: "Cenicienta",
    author: "Hermanos Grimm",
    cover: "👠",
    difficulty: "medio",
  },
];

useEffect(() => {
  let stored = localStorage.getItem("clientId");

  if (!stored) {
    stored = crypto.randomUUID();
    localStorage.setItem("clientId", stored);
  }

  setClientId(stored);
}, []);

useEffect(() => {
  const cargarAlumno = async () => {
    const res = await fetch(`http://34.130.57.30/api/login/api/alumno?nombre=${nombreAlumno}&salon=${codigo}`);
    const data = await res.json();

    if (data.alumno) {
      setMiPuntaje(data.alumno.puntaje);
    }

    setAlumnoCargado(true);   
  };

  cargarAlumno();
}, [nombreAlumno, codigo]);

// ✅ Cargar contenidos guardados en el salón
useEffect(() => {
  const cargarContenidos = async () => {
    try {
      const res = await fetch(`http://34.130.57.30/api/login/api/contenidos?codigo=${codigo}`);
      const data = await res.json();

      console.log("✅ Contenidos del salón:", data);
      setContenidosActivos(data.contenidos || []);
    } catch (error) {
      console.log("❌ Error al obtener contenidos:", error);
    }
  };

  cargarContenidos();
}, [codigo]);

// // data = {
//   matematicas: ["mcm", "fracciones"],
//   lectura: ["caperucita-roja"],
//   comunicacion: []
// // }



// 🔥 NUEVO — DETECTOR DE RELOAD vs CIERRE REAL
useEffect(() => {
  let ultimoTiempo = Date.now();
  localStorage.setItem("ultima_actividad", ultimoTiempo.toString());

  const handler = () => {
    const ahora = Date.now();
    const ultima = parseInt(localStorage.getItem("ultima_actividad") || "0");

    const diferencia = ahora - ultima;

    // 🔄 Reload detectado (NO BORRAR)
    if (diferencia < 800) {
      console.log("🔄 Reload detectado — NO borramos alumno");
      return;
    }

    // ❌ Cierre real (SÍ BORRAR)
    console.log("❌ Cierre real — borrando alumno");
    fetch("http://34.130.57.30/api/login/api/alumnos_temporales/eliminar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombreAlumno,
        salon_codigo,
      }),
      keepalive: true,
    });
  };

  window.addEventListener("beforeunload", handler);

  return () => window.removeEventListener("beforeunload", handler);
}, [nombreAlumno, salon_codigo]);



  const API = "http://34.130.57.30/api/login";

  //  Conectar socket
  useEffect(() => {
    const s = io(API);
    setSocket(s);
    return () => s.disconnect();
  }, []);

  //  Obtener salón
  useEffect(() => {
    const obtenerSalon = async () => {
      const res = await fetch(`${API}/api/salones?codigo=${codigo}`);
      const data = await res.json();
      setSalon(data.salon || null);
      setCargando(false);
    };
    obtenerSalon();
  }, [codigo]);


  


  //  Recibir lista

  useEffect(() => {
    if (!socket) return;
  
    const canal = `alumnos-${codigo}`;
  
    socket.on(canal, (lista) => {
      console.log("Lista recibida:", lista);
      setAlumnos(lista);
    });
  
    socket.emit("solicitar-alumnos", codigo); // ← solicitar lista al entrar
  
    return () => socket.off(canal);
  }, [socket, codigo]);

  
  useEffect(() => {
    if (!socket) return;
    if (!clientId) return;
    if (!salon) return;
  
    // 🔥 NUEVO: esperar a cargar alumno de BD
    if (!alumnoCargado) return;
  
    if (registradoRef.current) return;
  
    console.log("🔥 Registrando alumno con clientId:", clientId);
  
    socket.emit("alumno-entra", {
      clientId,
      nombre: nombreAlumno,
      salon: codigo,
    });
  
    registradoRef.current = true;
  
  }, [socket, clientId, salon, alumnoCargado]);
  
  //  sendBeacon para borrar al cerrar

  useEffect(() => {
    localStorage.setItem("codigoSalon", codigo as string);
  }, [codigo]);

  const navCategories = [
    { id: 1, label: "Cuentos", color: "bg-blue-500" },
    { id: 2, label: "Matematica", color: "bg-green-500" },
    { id: 3, label: "Lectura", color: "bg-red-500" },
    { id: 4, label: "Mecanografia", color: "bg-purple-500" },
    { id: 5, label: "Juegos", color: "bg-orange-500" },
    { id: 6, label: "Recursos", color: "bg-pink-500" },
    { id: 7, label: "Otros", color: "bg-indigo-500" },
  ];

  const subjects = [
    {
      id: "math",
      title: "Matemática",
      description: "¡Aprende números y operaciones!",
      icon: "",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ij0fEwE08Kfk6UTtgMPAZWTLUXcGkc.png",
    },
    {
      id: "reading",
      title: "Lectura",
      description: "¡Lee y descubre historias increíbles!",
      icon: "",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kxJ59lX9gd7Eo94Ti2mfB35MKkStu0.png",
    },

    {
      id: "computo",
      title: "Área de Cómputo",
      description: "¡Aprende tecnología e informática!",
      icon: "",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NV0n45YulMMpocVaVCmLrrOTcW2nM1.png",
    },

    {
      id: "science",
      title: "Ciencia y Medio Ambiente",
      description: "¡Explora la naturaleza y los secretos científicos!",
      icon: "",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-q1wtJrp9Fszx3L9k8E9NrjbzxUBu4p.png",
    },

    {
      id: "games",
      title: "Juegos Educativos",
      description: "¡Diviértete mientras aprendes!",
      icon: "",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UeBIfZqCPx3vOmmP8m3xkVhPmsWkoN.png",
    },

  ];

  const resources = [
    { id: 1, title: "Cuentos", emoji: "📖" },
    { id: 2, title: "Cuentos de Miedo", emoji: "👻" },
    { id: 3, title: "Cuentos de Magia", emoji: "✨" },
    { id: 4, title: "Cuentos Clásicos", emoji: "🎭" },
  ];

  if (!clientId) return null;

  if (cargando)
    return (
      <div className="text-center mt-20 text-xl text-gray-600">Cargando salón...</div>
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

  //  Pantalla de cada módulo
  if (selectedSubject === "math") {
    return (
      <Grade3MathPage
        contenidosActivos={contenidosActivos}
        onBack={() => setSelectedSubject(null)}
      />
    );
  }
  
  if (selectedSubject === "reading") {
  
    // Detecta si los cuentos activos pertenecen al módulo EXPLICACIONES (1er grado)
    const cuentos1er = ["caperucita-roja", "el-patito-feo", "cenicienta"];
  
    const usaLiterature = contenidosActivos.some(c =>
      cuentos1er.includes(c.storyId)
    );
  
    // Si son cuentos de 1er grado → LiteratureModule
    if (usaLiterature) {
      return (
        <LiteratureModule 
          onBack={() => setSelectedSubject(null)}
          contenidosActivos={contenidosActivos}
        />
      );
    }
  
    // Si son cuentos de 3er grado → ReadingModules
    return (
      <ReadingModules
        onBack={() => setSelectedSubject(null)}
        contenidosActivos={contenidosActivos}
      />
    );
  }

  if (selectedSubject === "computo") {
    return (
      <WritingModules
        onBack={() => setSelectedSubject(null)}
        contenidosActivos={contenidosActivos}   // ← LE PASAMOS LOS ACTIVOS
      />
    );
  }



  
  if (selectedSubject === "science") {
    return (
      <ScienceModules
        onBack={() => setSelectedSubject(null)}
        contenidosActivos={contenidosActivos}
      />
    );
  }
  
  if (selectedSubject === "games") {
    return (
      <Page
        salon_codigo={salon_codigo as string}
        nombreAlumno={nombreAlumno}
        onBack={() => setSelectedSubject(null)}   
      />
    )
  }


  return (
    <main className="min-h-screen bg-white">

      {/*  NAV CON CATEGORÍAS */}
      <nav className="sticky top-0 z-30 bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 py-3 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-2">
          {navCategories.map((cat) => (
            <button
              key={cat.id}
              className={`${cat.color} text-white px-4 py-2 rounded-lg font-semibold whitespace-nowrap hover:opacity-90 transition text-sm`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

     {/*  NAV CON USUARIO + TABLA */}
<div className="sticky top-16 z-20 bg-teal-700 text-white px-6 py-4 shadow-md">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    
    {/* LOGO + TÍTULO */}
    <div className="flex items-center gap-3">
            <img 
            src="/imagenes/cuba-escudo.png"
            alt="Escudo Cuba"
            className="w-20 h-20 object-contain"
          />
      <div>
        <h1 className="text-2xl font-bold">CubaAprende</h1>
        <p className="text-xs text-teal-100">Aprende y diviértete</p>
      </div>
    </div>

    {/* INFO USUARIO */}
    <div className="flex items-center gap-6">
      <div className="bg-teal-600 px-4 py-2 rounded-lg">
        <p className="text-sm font-semibold text-white">👤 {nombreAlumno}</p>
        <p className="text-lg font-bold text-yellow-300">
          {(alumnos.find(a => a.nombre === nombreAlumno)?.puntaje || 0).toLocaleString()} pts
        </p>
      </div>

      <button
        onClick={() => setShowLeaderboard(true)}
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
      >
        <Trophy className="w-5 h-5" />
        Tabla
      </button>

            <button
        onClick={async () => {
          await fetch("http://34.130.57.30/api/login/api/alumnos_temporales/eliminar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre: nombreAlumno,
              salon_codigo: salon_codigo,
            }),
          });

          router.push("/");
        }}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
      >
        Salir
      </button>
    </div>

  </div>
</div>

      {/*  PANEL DE PUNTAJES */}
      {showLeaderboard && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowLeaderboard(false)}></div>
          <div className="fixed top-24 right-0 h-[calc(100vh-96px)] w-96 bg-white shadow-2xl z-50 flex flex-col">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Trophy className="w-6 h-6" /> Tabla de Puntajes
              </h2>
              <button
                onClick={() => setShowLeaderboard(false)}
                className="text-gray-900 hover:bg-yellow-300 p-2 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <table className="w-full">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-gray-900 text-sm">Pos</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-900 text-sm">Estudiante</th>
                    <th className="px-4 py-3 text-right font-bold text-gray-900 text-sm">Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos
                    .sort((a, b) => (b.puntaje || 0) - (a.puntaje || 0))
                    .map((student, index) => (
                      <tr
                        key={index}
                        className={`border-b transition ${
                          student.nombre === nombreAlumno ? "bg-yellow-100 font-semibold" : "hover:bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-3 text-gray-900 text-center">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}`}
                        </td>
                        <td className="px-4 py-3 text-gray-900 text-sm">{student.nombre}</td>
                        <td className="px-4 py-3 text-right text-gray-900 font-bold">
                          {(student.puntaje || 0).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/*  CONTENIDO PRINCIPAL */}
      <section className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="max-w-5xl mx-auto px-8 py-12">

          {/*  SECCIÓN BIENVENIDA */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Recursos Didácticos Gratuitos</h2>
            <p className="text-gray-600 mb-4">
              Aquí encontrarás materiales educativos diseñados para aprender de forma divertida e interactiva.
            </p>
            <div className="bg-gradient-to-r from-green-300 to-teal-300 rounded-lg p-4 mb-6">
              <p className="text-gray-800 font-semibold">¡Comienza tu aventura educativa hoy!</p>
            </div>

            {/*  BOTONES RÁPIDOS */}
            <div className="flex gap-2 flex-wrap mb-6">
              <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 text-sm">✏️ Sumatorios</button>
              <button className="bg-lime-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-lime-500 text-sm">📝 Fichas Letras</button>
              <button className="bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 text-sm">📖 Fichas Lectura</button>
              <button className="bg-purple-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-500 text-sm">🎥 Videos Cuento</button>
            </div>
          </div>

          {/*  MATERIAS */}
          <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Qué quieres aprender hoy?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className={`
                group text-left transition-all duration-300 hover:scale-105 relative overflow-hidden rounded-3xl
                ${subject.id === "games" ? "md:col-span-2" : ""}
              `}
            >
              <Card
                className="border-0 shadow-lg hover:shadow-2xl h-full p-8 rounded-3xl cursor-pointer relative overflow-hidden"
                style={{
                  backgroundImage: `url(${subject.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
          <div className="absolute inset-0 bg-black opacity-40 rounded-3xl"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-5xl">{subject.icon}</div>
                      <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-2 text-white">{subject.title}</h3>
                    <p className="text-sm opacity-90 mb-6 text-white">{subject.description}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      Explorar <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>


          {/*  CUENTOS */}
          <div className="mb-12">
            <div className="bg-teal-500 text-white px-6 py-3 rounded-lg font-bold mb-6 text-lg">
              📚 CUENTOS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {resources.map((resource) => (
                <Card
                  key={resource.id}
                  className="bg-teal-400 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer hover:scale-105"
                >
                  <div className="text-5xl mb-4 text-center">{resource.emoji}</div>
                  <h3 className="font-bold text-center text-lg">{resource.title}</h3>
                </Card>
              ))}
            </div>
          </div>

          {/*  BUSCAR RECURSOS */}
        

          {/*  DESTACADO DEL MES */}
          <div>
            <Card className="p-6 bg-gradient-to-br from-green-50 to-lime-50 border border-green-200">
              <h3 className="text-lg font-bold text-green-700 mb-4">✨ Destacado del Mes</h3>
              <p className="text-gray-700 mb-4">
                Descubre historias fascinantes y ejercicios matemáticos interactivos diseñados especialmente para tu nivel.
              </p>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">
                Explorar
              </button>
            </Card>
          </div>

        </div>
      </section>

      {/*  FOOTER COMPLETO */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Sobre Nosotros</h4>
              <p className="text-gray-400 text-sm">Plataforma educativa interactiva para estudiantes de primaria.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Materias</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Matemática</a></li>
                <li><a href="#" className="hover:text-white transition">Lectura</a></li>
                <li><a href="#" className="hover:text-white transition">Escritura</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Ayuda</a></li>
                <li><a href="#" className="hover:text-white transition">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition">Términos</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Mundo Primaria. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
