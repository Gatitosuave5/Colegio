"use client"

import { useState, useEffect } from "react"
import { io, Socket } from "socket.io-client"

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
  }

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
const [socket, setSocket] = useState<Socket | null>(null)

//  SOCKET EFECTO REAL
useEffect(() => {
  const s = io("http://localhost:3001")
  setSocket(s)

  if (salonSeleccionado?.codigo) {
    s.on(`alumnos-${salonSeleccionado.codigo}`, (lista) => {
      console.log(" ACTUALIZACIÓN EN VIVO:", lista)
      setIntegrantes(lista)
    })
  }

  return () => s.disconnect()
}, [salonSeleccionado])

  useEffect(() => {
    obtenerSalones()
  }, [])

  const obtenerSalones = async () => {
    setCargandoSalones(true)
    try {
      const response = await fetch("/api/salones")
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
    await fetch("/api/alumnos_temporales", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    socket?.emit("solicitar-alumnos", codigo)
  }

  const guardarNombreEstudiante = async (id: number, codigo: string) => {
    if (!nuevoNombre.trim()) return

    await fetch("/api/alumnos_temporales", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nombre: nuevoNombre }),
    })

    setEditandoEstudiante(null)
    setNuevoNombre("")
    socket?.emit("solicitar-alumnos", codigo)
  }

  const cambiarGrado = (grado: number) => {
    setGradoActivo(grado)
    setContenidos(contenidosPorGrado[grado])
    setCategoriaAbierta(null)
  }

  const toggleContenido = (id: number) => {
    setContenidos((prev) => prev.map((c) => (c.id === id ? { ...c, activo: !c.activo } : c)))
  }

  const crearSalon = async () => {
    if (!gradoActivo) return

    setCargando(true)
    try {
      const response = await fetch("/api/salones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grado: gradoActivo }),
      })

      if (response.ok) {
        const data = await response.json()
        setCodigoSalon(data.codigo)
        setMostrarModal(true)
        obtenerSalones()
      }
    } catch (error) {
      console.error("Error al crear salón:", error)
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

  const guardarEdicion = async () => {
    if (!salonEditando) return

    try {
      const response = await fetch("/api/salones", {
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
      const response = await fetch("/api/salones", {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-10">
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
          <span>✨</span>
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
                    onClick={() => abrirEditar(salon)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition text-sm"
                  >
                    ✏️ Editar
                  </button>

                  <button
                    onClick={() => eliminarSalon(salon.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold transition text-sm"
                  >
                    🗑️ Eliminar
                  </button>

                  {/* ✅ Ver participantes */}
                  <button
                    onClick={() => abrirIntegrantes(salon)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold text-sm"
                  >
                    👥 Participantes
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL PARTICIPANTES */}
      {mostrarModalIntegrantes && salonSeleccionado && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            <div className="bg-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Participantes – {salonSeleccionado.codigo}</h2>
              <button
                onClick={cerrarIntegrantes}
                className="text-white hover:bg-white/20 rounded-full p-2 transition"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {integrantes.length === 0 ? (
                <p className="text-gray-600 text-center py-6">No hay participantes conectados</p>
              ) : (
                <table className="w-full text-left border">
                  <thead className="bg-purple-50 text-purple-700">
                    <tr>
                      <th className="px-4 py-2">Nombre</th>
                      <th className="px-4 py-2">Última Actividad</th>
                      <th className="px-4 py-2 text-center">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {integrantes.map((est) => (
                      <tr key={est.id} className="border-b">
                        <td className="px-4 py-2">
                          {editandoEstudiante === est.id ? (
                            <input
                              className="border p-1 rounded w-full"
                              value={nuevoNombre}
                              onChange={(e) => setNuevoNombre(e.target.value)}
                            />
                          ) : (
                            est.nombre
                          )}
                        </td>

                        <td className="px-4 py-2 text-gray-600">{est.ultima_actividad}</td>

                        <td className="px-4 py-2 text-center">
                          {editandoEstudiante === est.id ? (
                            <>
                              <button
                                onClick={() => guardarNombreEstudiante(est.id, salonSeleccionado.codigo)}
                                className="bg-green-500 text-white px-2 py-1 rounded"
                              >
                                Guardar
                              </button>

                              <button
                                onClick={() => setEditandoEstudiante(null)}
                                className="ml-2 bg-gray-400 text-white px-2 py-1 rounded"
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditandoEstudiante(est.id)
                                  setNuevoNombre(est.nombre)
                                }}
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                              >
                                Editar
                              </button>

                              <button
                                onClick={() => eliminarEstudiante(est.id, salonSeleccionado.codigo)}
                                className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                              >
                                Eliminar
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="p-4 bg-gray-50 text-right">
              <button
                onClick={cerrarIntegrantes}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold"
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
                      key={item.id}
                      className={`flex justify-between items-center p-3 mb-2 rounded border cursor-pointer transition ${
                        item.activo ? "bg-green-100 border-green-400" : "bg-gray-100"
                      }`}
                      onClick={() => toggleContenido(item.id)}
                    >
                      <span className="text-gray-800 font-medium">{item.titulo}</span>
                      <input type="checkbox" checked={item.activo || false} onChange={() => toggleContenido(item.id)} />
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
  )
}
