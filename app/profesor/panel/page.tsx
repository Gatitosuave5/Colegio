"use client"

import { useState, useEffect } from "react"
import io from "socket.io-client";
import type { Socket } from "socket.io-client";
import { useRouter } from "next/navigation";



interface Salon {
  id: string
  codigo: string
  grado: number
  aula: string
  createdAt: string
}

interface Estudiante {
  id: number
  nombre: string
  ultima_actividad: string
  salon_codigo: string
}



export default function TeacherPanel() {
  const router = useRouter();
  
  const [gradoActivo, setGradoActivo] = useState<number | null>(null)
  const [contenidos, setContenidos] = useState<any[]>([])
  const [categoriaAbierta, setCategoriaAbierta] = useState<string | null>(null)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [codigoSalon, setCodigoSalon] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  const [salones, setSalones] = useState<Salon[]>([])
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false)
  const [salonEditando, setSalonEditando] = useState<Salon | null>(null)
  const [aulaInput, setAulaInput] = useState("")
  const [cargandoSalones, setCargandoSalones] = useState(false)

  //  PARTICIPANTES
  const [mostrarModalIntegrantes, setMostrarModalIntegrantes] = useState(false)
const [salonSeleccionado, setSalonSeleccionado] = useState<Salon | null>(null)
const [integrantes, setIntegrantes] = useState<Estudiante[]>([])
const [editandoEstudiante, setEditandoEstudiante] = useState<number | null>(null)
const [nuevoNombre, setNuevoNombre] = useState("")

//  FALTABA ESTO
const [socket, setSocket] = useState<any>(null)


  const [verificando, setVerificando] = useState(true);

 const API = "http://localhost:3001"

 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
    return;
  }

  // Validar token con backend
  fetch("http://localhost:3001/api/validar-token", {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => {
      if (!res.ok) {
        localStorage.removeItem("token");
        window.location.href = "/";
        return;
      }

      //  TOKEN VÁLIDO → permitir renderizar el panel
      setVerificando(false);

      
    })
    .catch(() => {
      localStorage.removeItem("token");
      window.location.href = "/";
    });
}, []);


useEffect(() => {
  const handler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  window.addEventListener("beforeunload", handler);
  return () => window.removeEventListener("beforeunload", handler);
}, []);


useEffect(() => {
  obtenerSalones()
}, [])


//  SOCKET EFECTO REAL
useEffect(() => {
  const s = io("http://localhost:3001");
  setSocket(s);

  if (salonSeleccionado?.codigo) {
    s.on(`alumnos-${salonSeleccionado.codigo}`, (lista) => {
      console.log("ACTUALIZACIÓN EN VIVO:", lista);
      setIntegrantes(lista);
    });
  }

  return () => {
    s.disconnect(); 
  };
}, [salonSeleccionado]);





  const contenidosPorGrado: Record<number, any[]> = {
    1: [

      { id_contenido: 1, categoria: "Matemática", titulo: "Sumas del 1 al 10", storyId: "sumas-1-al-10", activo: false },
      { id_contenido: 2, categoria: "Matemática", titulo: "Restas del 1 al 10", storyId: "restas-1-al-10", activo: false },
      { id_contenido: 3, categoria: "Matemática", titulo: "Números hasta 100", storyId: "numeros-100", activo: false },
      { id_contenido: 4, categoria: "Matemática", titulo: "Figuras geométricas básicas", storyId: "figuras", activo: false },
      { id_contenido: 5, categoria: "Matemática", titulo: "Clasificación de objetos", storyId: "clasificacion", activo: false },
      { id_contenido: 6, categoria: "Matemática", titulo: "Problemas simples de suma", storyId: "problemas-suma", activo: false },
      { id_contenido: 7, categoria: "Matemática", titulo: "Mayor / Menor", storyId: "mayor-menor", activo: false },
      { id_contenido: 8, categoria: "Matemática", titulo: "Conteo de objetos", storyId: "conteo", activo: false },
      { id_contenido: 9, categoria: "Matemática", titulo: "Series numéricas simples", storyId: "series", activo: false },
      { id_contenido: 10, categoria: "Matemática", titulo: "Ordenar números", storyId: "ordenar", activo: false },
      

      { id_contenido: 61, categoria: "Lectura", titulo: "Caperucita Roja", storyId: "caperucita-roja", activo: false },
      { id_contenido: 62, categoria: "Lectura", titulo: "El Patito Feo", storyId: "el-patito-feo", activo: false },
      { id_contenido: 63, categoria: "Lectura", titulo: "Cenicienta", storyId: "cenicienta", activo: false },
    ],
    2: [
      { id_contenido: 11, categoria: "Matemática", titulo: "Sumas del 1 al 20" },
      { id_contenido: 12, categoria: "Matemática", titulo: "Restas del 1 al 20" },
      { id_contenido: 13, categoria: "Matemática", titulo: "Sumas con llevada" },
      { id_contenido: 14, categoria: "Matemática", titulo: "Restas con llevada" },
      { id_contenido: 15, categoria: "Matemática", titulo: "Tablas del 2 y 3" },
      { id_contenido: 16, categoria: "Matemática", titulo: "Figuras geométricas 2D" },
      { id_contenido: 17, categoria: "Matemática", titulo: "Simetría básica" },
      { id_contenido: 18, categoria: "Matemática", titulo: "Problemas de suma y resta" },
      { id_contenido: 19, categoria: "Matemática", titulo: "Números hasta 200" },
      { id_contenido: 20, categoria: "Matemática", titulo: "Patrones y secuencias" },


      { id_contenido: 101, categoria: "Lectura", titulo: "La Mariposa Valiente", storyId: "story-2do-1", activo: 0 },
      { id_contenido: 102, categoria: "Lectura", titulo: "El León y el Viento", storyId: "story-2do-2", activo: 0 },
      { id_contenido: 103, categoria: "Lectura", titulo: "La Ciudad de los Paraguas", storyId: "story-2do-3", activo: 0 },
      { id_contenido: 104, categoria: "Lectura", titulo: "El Tren Dormilón", storyId: "story-2do-4", activo: 0 },
      { id_contenido: 105, categoria: "Lectura", titulo: "La Luz del Faro Pequeño", storyId: "story-2do-5", activo: 0 },
      { id_contenido: 106, categoria: "Lectura", titulo: "La Llave del Reino Verde", storyId: "story-2do-6", activo: 0 },
      
   
    ],
    3: [


      { id_contenido: 64, categoria: "Área de computo", titulo: "Mecanografia", storyId: "mecanografia", activo: false },
      { id_contenido: 65, categoria: "Área de computo", titulo: "Uso de Mayúsculas", storyId: "Uso-de-mayusculas", activo: false },
      { id_contenido: 66, categoria: "Área de computo", titulo: "Copiado de Textos", storyId: "copiado-de-textos", activo: false },
      { id_contenido: 67, categoria: "Área de computo", titulo: "Palabras y Sílabas", storyId: "palabras-y-silabas", activo: false },
      { id_contenido: 68, categoria: "Área de computo", titulo: "Números y Operaciones", storyId: "numeros-y-operaciones", activo: false },

      { id_contenido: 69, categoria: "Lectura", titulo: "La Mariposa Azul y la Pradera de las Luces", 
        storyId: "La-Mariposa-Azul-y-la-Pradera-de-las-Luces", activo: false },
      
      { id_contenido: 70, categoria: "Lectura", titulo: "El León que Perdió su Rugido", 
        storyId: "El-León-que-Perdió-su-Rugido", activo: false },
      
      { id_contenido: 71, categoria: "Lectura", titulo: "La Ciudad de los Colores Perdidos", 
        storyId: "La-Ciudad-de-los-Colores-Perdidos", activo: false },
      
      { id_contenido: 72, categoria: "Lectura", titulo: "El Tren que No Quería Parar", 
        storyId: "El-Tren-que-No-Quería-Parar", activo: false },
      
      { id_contenido: 73, categoria: "Lectura", titulo: "La Isla del Faro Solitario", 
          storyId: "La-Isla-del-Faro-Solitario", activo: false },
      
      { id_contenido: 74, categoria: "Lectura", titulo: "Las Aventuras del Reino Encantado", 
        storyId: "Las-Aventuras-del-Reino-Encantado", activo: false },

        { id_contenido: 75, categoria: "Matemática", titulo: "Multiplicación (Tablas 1–10)", 
          storyId: "multiplicacion-tablas-1-10", activo: false },
        
        { id_contenido: 76, categoria: "Matemática", titulo: "División Básica", 
          storyId: "division-basica", activo: false },
        
        { id_contenido: 77, categoria: "Matemática", titulo: "Perímetro de Figuras", 
          storyId: "perimetro-de-figuras", activo: false },
        
        { id_contenido: 78, categoria: "Matemática", titulo: "Partes de la División", 
          storyId: "partes-de-la-division", activo: false },
        
        { id_contenido: 79, categoria: "Matemática", titulo: "Partes de la Resta", 
          storyId: "partes-de-la-resta", activo: false },
        
        { id_contenido: 80, categoria: "Matemática", titulo: "Problemas Multiplicación y División", 
          storyId: "problemas-multiplicacion-division", activo: false },
        
        { id_contenido: 81, categoria: "Matemática", titulo: "Figuras Geométricas", 
          storyId: "figuras-geometricas", activo: false },
        
        { id_contenido: 82, categoria: "Matemática", titulo: "Medición de Longitudes", 
          storyId: "medicion-de-longitudes", activo: false },
        
        { id_contenido: 83, categoria: "Matemática", titulo: "Lectura y Comparación de Números hasta 10,000", 
          storyId: "lectura-comparacion-numeros-10000", activo: false },
        
        { id_contenido: 84, categoria: "Matemática", titulo: "Suma y Resta con Llevadas", 
          storyId: "suma-resta-con-llevadas", activo: false },

        { id_contenido: 85, categoria: "Ciencias", titulo: "Seres vivos y su entorno",
            storyId: "seres-vivos-entorno", activo: false },
          
        { id_contenido: 86, categoria: "Ciencias", titulo: "El cuerpo humano",
            storyId: "cuerpo-humano", activo: false },
          
        { id_contenido: 87, categoria: "Ciencias", titulo: "Tierra, clima y recursos naturales",
            storyId: "tierra-clima-recursos", activo: false },
          
        { id_contenido: 88, categoria: "Ciencias", titulo: "Fuerza, movimiento y energía",
            storyId: "fuerza-movimiento-energia", activo: false },
      

    ],
    4: [
      { id_contenido: 31, categoria: "Matemática", titulo: "Mínimo común múltiplo" },
      { id_contenido: 32, categoria: "Matemática", titulo: "Máximo común divisor" },
      { id_contenido: 33, categoria: "Matemática", titulo: "Fracciones avanzadas" },

    ],
    5: [
      { id_contenido: 41, categoria: "Matemática", titulo: "Operaciones con decimales" },
      { id_contenido: 42, categoria: "Matemática", titulo: "Fracciones avanzadas" },
      { id_contenido: 43, categoria: "Matemática", titulo: "Razones y proporciones" },

    ],
    6: [
      { id_contenido: 51, categoria: "Matemática", titulo: "Coordenadas" },
      { id_contenido: 52, categoria: "Matemática", titulo: "Ecuaciones con incógnita" },
      { id_contenido: 53, categoria: "Matemática", titulo: "Polígonos y ángulos" },
 
    ],
  }




  const obtenerSalones = async () => {
    setCargandoSalones(true)
    try {
      const response = await fetch(`${API}/api/salones`)
      if (response.ok) {
        const data = await response.json()
        setSalones(data.salones || [])
      }
    } catch (error) {
      console.error("Error al obtener salones:", error)
    } finally {
      setCargandoSalones(false)
    }
  }

  const abrirIntegrantes = async (salon: Salon) => {
    setSalonSeleccionado(salon)
    setMostrarModalIntegrantes(true)
  
    try {
      const res = await fetch(`http://localhost:3001/api/alumnos_temporales?codigo=${encodeURIComponent(salon.codigo.trim())}`)
  
      const texto = await res.text()
      console.log("Respuesta del backend:", texto)
  
      const data = JSON.parse(texto)   // Convertimos manualmente
  
      setIntegrantes(data.alumnos || [])
    } catch (error) {
      console.error("Error cargando alumnos:", error)
      setIntegrantes([])
    }
  }
  

  const cerrarIntegrantes = () => {
    setMostrarModalIntegrantes(false)
    setSalonSeleccionado(null)
    setIntegrantes([])
  }

  const eliminarEstudiante = async (id: number, codigo: string) => {
    await fetch(`${API}/api/alumnos_temporales`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, codigo }),
    })
  
    socket?.emit("solicitar-alumnos", codigo)
  }

  const guardarNombreEstudiante = async (id: number, codigo: string) => {
    if (!nuevoNombre.trim()) return
  
    await fetch(`${API}/api/alumnos_temporales`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nombre: nuevoNombre, codigo }),
    })
  
    setEditandoEstudiante(null)
    setNuevoNombre("")
    socket?.emit("solicitar-alumnos", codigo)
  }
  

  const cambiarGrado = (grado: number) => {
    setGradoActivo(grado)
    setContenidos(
      contenidosPorGrado[grado].map(c => ({ ...c, activo: false }))
    )
    setCategoriaAbierta(null)
  }

  const toggleContenido = (id: number) => {
    setContenidos(prev =>
      prev.map(c =>
        (c.id === id || c.id_contenido === id)
          ? { ...c, activo: !c.activo }
          : c
      )
    );
  };

  const crearSalon = async () => {
    if (!gradoActivo) return
  
    const contenidosSeleccionados = contenidos
      .filter(c => c.activo)
      .map(c => ({
        id_contenido: c.id_contenido ?? c.id,  // ← DEBE EXISTIR
        categoria: c.categoria,
        titulo: c.titulo,
        storyId: c.storyId ?? null      // ← NUNCA undefined
      }));
      
  
    setCargando(true)
    try {
      const response = await fetch(`${API}/api/salones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grado: gradoActivo,
          contenidos: contenidosSeleccionados   // ✅ AHORA SÍ SE ENVÍAN
        }),
      })
  
      if (response.ok) {
        const data = await response.json()
        setCodigoSalon(data.codigo)
        setMostrarModal(true)
        obtenerSalones()
      }
    } catch (error) {
      console.error(" Error al crear salón:", error)
    } finally {
      setCargando(false)
    }
  }
  

    const copiarCodigo = () => {
    if (codigoSalon) {
      navigator.clipboard.writeText(codigoSalon)
      alert("¡Código copiado al portapapeles!")
    }
    }

  const abrirEditar = (salon: Salon) => {
    setSalonEditando(salon)
    setAulaInput(salon.aula)
    setMostrarModalEditar(true)
  }

  const resetearPuntaje = async (id: number, codigo: string) => {
    await fetch(`${API}/api/alumnos_temporales/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, codigo }),
    });
  
    socket?.emit("solicitar-alumnos", codigo);
  };
  

  const guardarEdicion = async () => {
    if (!salonEditando) return

    try {
      const response = await fetch(`${API}/api/salones`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: salonEditando.id,
          aula: aulaInput,
        }),
      })

      if (response.ok) {
        setMostrarModalEditar(false)
        setSalonEditando(null)
        setAulaInput("")
        obtenerSalones()
        alert("Salón actualizado correctamente")
      }
    } catch (error) {
      console.error("Error al editar salón:", error)
    }
  }

  const eliminarSalon = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este salón?")) return

    try {
      const response = await fetch(`${API}/api/salones`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        obtenerSalones()
        alert("Salón eliminado correctamente")
      }
    } catch (error) {
      console.error("Error al eliminar salón:", error)
    }
  }



  const categorias = Array.from(new Set(contenidos.map((c) => c.categoria)))

  if (verificando) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-10">
      {/* BOTÓN DE SALIDA ARRIBA A LA DERECHA */}
<div className="w-full flex justify-end mb-4">
<button
  onClick={() => {
    // 🧹 borrar token
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    // redirigir al login
    window.location.href = "/";
  }}
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition"
>
  Salir
</button>
</div>

      <h1 className="text-4xl font-bold text-blue-700 mb-8">Panel del Profesor</h1>

      <div className="mb-8 flex gap-4 items-center">
        <button
          onClick={crearSalon}
          disabled={!gradoActivo || cargando}
          className={`px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
            gradoActivo && !cargando
              ? "bg-gradient-to-r from-teal-500 to-green-500 text-white hover:shadow-lg hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <span></span>
          {cargando ? "Creando..." : "Crear Salón"}
        </button>
        {gradoActivo && <span className="text-sm text-gray-600">para {gradoActivo}° grado</span>}
      </div>

      {mostrarModal && codigoSalon && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in">
            <div className="text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">¡Salón Creado!</h2>
              <p className="text-gray-700 mb-6">
                Se ha creado un nuevo salón para <span className="font-semibold">{gradoActivo}° grado</span>
              </p>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Código del Salón:</p>
                <p className="text-3xl font-bold text-teal-600 font-mono">{codigoSalon}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copiarCodigo}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-green-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  📋 Copiar Código
                </button>
                <button
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-10 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🏫</span> Mis Salones
        </h2>

        {cargandoSalones ? (
          <p className="text-gray-600">Cargando salones...</p>
        ) : salones.length === 0 ? (
          <p className="text-gray-600">No hay salones creados aún. ¡Crea uno para comenzar!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {salones.map((salon) => (
              <div
                key={salon.id}
                className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg p-5 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Grado</p>
                    <p className="text-2xl font-bold text-blue-600">{salon.grado}°</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Código</p>
                    <p className="text-xl font-mono font-bold text-teal-600">{salon.codigo}</p>
                  </div>
                </div>

                <div className="mb-4 bg-white rounded p-3 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">Aula</p>
                  <p className="text-lg font-semibold text-gray-800">{salon.aula || "Sin asignar"}</p>
                </div>

                <div className="flex gap-2">
                  

                  <button
                    onClick={() => eliminarSalon(salon.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold transition text-sm"
                  >
                     Eliminar
                  </button>

                  {/* ✅ Ver participantes */}
                  <button
                    onClick={() => abrirIntegrantes(salon)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold text-sm"
                  >
                     Participantes
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      
      {/* MODAL PARTICIPANTES - VERSION RANKING */}
      {mostrarModalIntegrantes && salonSeleccionado && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 text-white p-6 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-2">🏆 Ranking</h2>
                <p className="text-purple-100 text-sm mt-1">
                  {salonSeleccionado.aula || `Salón ${salonSeleccionado.codigo}`} • {salonSeleccionado.grado}° Grado • {integrantes.length} estudiantes
                </p>
              </div>
              <button
                onClick={cerrarIntegrantes}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition hover:scale-110"
              >
                ✕
              </button>
            </div>

            {/* LISTA */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-purple-50 to-white">
              {integrantes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No hay participantes registrados aún</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {integrantes
                    .sort((a, b) => (b.puntaje || 0) - (a.puntaje || 0))
                    .map((estudiante, index) => {
                      const getMedal = () => {
                        if (index === 0) return "🥇"
                        if (index === 1) return "🥈"
                        if (index === 2) return "🥉"
                        return "⭐"
                      }

                      const getRankingColor = () => {
                        if (index === 0) return "bg-yellow-50 border-yellow-200"
                        if (index === 1) return "bg-slate-50 border-slate-200"
                        if (index === 2) return "bg-orange-50 border-orange-200"
                        return "bg-white border-gray-200"
                      }

                      return (
                        <div
                          key={estudiante.id}
                          className={`border-2 rounded-xl p-4 transition hover:shadow-lg ${getRankingColor()}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">

                              <div className="flex items-center gap-3 min-w-fit">
                                <div className="text-4xl">{getMedal()}</div>
                                <div>
                                  <p className="text-xs text-gray-600 font-semibold">PUESTO</p>
                                  <p className="text-2xl font-bold text-gray-800">#{index + 1}</p>
                                </div>
                              </div>

                              <div className="flex-1 min-w-0">
                                {editandoEstudiante === estudiante.id ? (
                                  <input
                                    type="text"
                                    value={nuevoNombre}
                                    onChange={(e) => setNuevoNombre(e.target.value)}
                                    className="flex-1 px-2 py-1 border-2 border-purple-400 rounded focus:outline-none w-full"
                                    autoFocus
                                  />
                                ) : (
                                  <p className="font-bold text-gray-800 text-lg truncate">{estudiante.nombre}</p>
                                )}

                                <p className="text-xs text-gray-600 mt-1">
                                  Activo: {estudiante.ultima_actividad}
                                </p>
                              </div>

                              <div className="text-right min-w-fit">
                                <p className="text-xs text-gray-600 font-semibold">PUNTAJE</p>
                                <p className="text-3xl font-black text-purple-600">{(estudiante.puntaje || 0).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>

                          {editandoEstudiante === estudiante.id ? (
                            <div className="flex gap-2 justify-end mt-3 pt-3 border-t">
                              <button
                                onClick={() => guardarNombreEstudiante(estudiante.id, salonSeleccionado.codigo)}
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold transition hover:scale-105"
                              >
                                ✓ Guardar
                              </button>
                              <button
                                onClick={() => {
                                  setEditandoEstudiante(null)
                                  setNuevoNombre("")
                                }}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-semibold transition hover:scale-105"
                              >
                                ✕ Cancelar
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2 justify-end mt-3 pt-3 border-t">
                              <button
                                onClick={() => {
                                  setEditandoEstudiante(estudiante.id)
                                  setNuevoNombre(estudiante.nombre)
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold transition hover:scale-105"
                              >
                                ✏️ Editar
                              </button>

                              <button
                                onClick={() => eliminarEstudiante(estudiante.id, salonSeleccionado.codigo)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition hover:scale-105"
                              >
                                🗑️ Eliminar
                              </button>
                              <button
                                onClick={() => resetearPuntaje(estudiante.id, salonSeleccionado.codigo)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-semibold transition hover:scale-105"
                              >
                                🔄 Reset
                              </button>

                              
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              )}
            </div>

            <div className="bg-gray-50 border-t p-4 flex justify-end">
              <button
                onClick={cerrarIntegrantes}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}


      {/*  BOTONES DE GRADO */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {[1, 2, 3, 4, 5, 6].map((grado) => (
          <button
            key={grado}
            onClick={() => cambiarGrado(grado)}
            className={`px-6 py-2 rounded-lg font-semibold border transition ${
              gradoActivo === grado
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border-blue-300 text-blue-600 hover:bg-blue-50"
            }`}
          >
            {grado}° Grado
          </button>
        ))}
      </div>

      {gradoActivo ? (
        categorias.map((cat) => (
          <div key={cat} className="bg-white shadow-md rounded-lg mb-5 overflow-hidden">
            <button
              onClick={() => setCategoriaAbierta(categoriaAbierta === cat ? null : cat)}
              className="w-full text-left p-5 font-semibold text-lg flex justify-between items-center bg-blue-100 hover:bg-blue-200 text-gray-800 transition"
            >
              {cat}
              <span>{categoriaAbierta === cat ? "▲" : "▼"}</span>
            </button>

            {categoriaAbierta === cat && (
              <div className="p-4 max-h-64 overflow-y-auto border-t">
                {contenidos
                  .filter((c) => c.categoria === cat)
                  .map((item) => (
                    <div
                    key={item.id_contenido ?? item.id}
                      className={`flex justify-between items-center p-3 mb-2 rounded border cursor-pointer transition ${
                        item.activo ? "bg-green-100 border-green-400" : "bg-gray-100"
                      }`}
                      onClick={() => toggleContenido(item.id ?? item.id_contenido)}
                    >
                      <span className="text-gray-800 font-medium">{item.titulo}</span>
                      <input
                            type="checkbox"
                            checked={item.activo || false}
                            onChange={() => toggleContenido(item.id ?? item.id_contenido)}
                          />
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-lg">Selecciona un grado para iniciar </p>
      )}
    </div>
  )
}
