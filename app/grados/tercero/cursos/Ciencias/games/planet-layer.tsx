"use client"

import { useState } from "react"
import { CheckCircle } from 'lucide-react'

const layers = [
  { name: "Corteza 🪨", description: "Capa exterior sólida", color: "bg-yellow-600" },
  { name: "Manto 🔥", description: "Capa caliente y densa", color: "bg-orange-600" },
  { name: "Núcleo ⚪", description: "Centro muy caliente", color: "bg-red-600" },
]

export function PlanetLayers({ onComplete }: { onComplete: (score: number) => void }) {
  const [ordered, setOrdered] = useState<typeof layers>([])
  const [shuffled] = useState(() =>
    [...layers].sort(() => Math.random() - 0.5)
  )
  const [gameComplete, setGameComplete] = useState(false)
  const [feedback, setFeedback] = useState<string>("")

  const handleAddLayer = (layer: typeof layers[0]) => {
    if (!ordered.find(o => o.name === layer.name)) {
      const newOrdered = [...ordered, layer]
      setOrdered(newOrdered)

      // Check if sequence is correct so far
      const isCorrectSoFar = newOrdered.every((l, idx) => l.name === layers[idx].name)
      
      if (!isCorrectSoFar) {
        setFeedback("❌ No es el orden correcto")
        setTimeout(() => setFeedback(""), 2000)
      } else if (newOrdered.length === 3) {
        setGameComplete(true)
        setFeedback("✅ ¡Correcto!")
        setTimeout(() => onComplete(100), 1500)
      } else {
        setFeedback("✅ ¡Bien!")
        setTimeout(() => setFeedback(""), 1500)
      }
    }
  }

  const handleUndo = () => {
    setOrdered(ordered.slice(0, -1))
    setFeedback("")
  }

  const handleReset = () => {
    setOrdered([])
    setGameComplete(false)
    setFeedback("")
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-bold text-black">Ordena las capas de la Tierra</p>
        <p className="text-sm font-bold text-black">De afuera hacia adentro</p>
      </div>

      {/* Visualización de capas */}
      <div className="bg-gradient-to-b from-sky-100 to-gray-100 p-8 rounded-lg">
        <div className="max-w-xs mx-auto">
          {/* Espacio vacío */}
          <div className="mb-4 text-center text-sm font-bold text-black">Espacio 🌌</div>

          {/* Tierra con capas ordenadas */}
          <div className="relative mx-auto w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white">
            {ordered.length === 0 && (
              <div className="w-full h-full bg-gradient-to-b from-sky-200 to-gray-200 flex items-center justify-center">
                <p className="text-center text-sm font-bold text-black">Haz clic en capas</p>
              </div>
            )}

            {/* Mostrar capas en orden */}
            {ordered.map((layer, index) => {
              const totalLayers = ordered.length
              const outerRadius = (48 * (totalLayers - index)) / totalLayers

              return (
                <div
                  key={layer.name}
                  className={`absolute inset-0 rounded-full ${layer.color} flex items-center justify-center`}
                  style={{
                    width: `${outerRadius * 2}%`,
                    height: `${outerRadius * 2}%`,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {index === ordered.length - 1 && (
                    <p className="text-white font-bold text-xs text-center">{layer.name}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Información de capas ordenadas */}
      {ordered.length > 0 && (
        <div className="space-y-2">
          {ordered.map((layer, index) => (
            <div key={layer.name} className={`p-3 rounded-lg ${layer.color} text-white font-bold`}>
              <p className="font-bold text-black">{index + 1}. {layer.name}</p>
              <p className="text-xs opacity-90 text-black">{layer.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div className="text-center p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
          <p className="font-bold text-black text-lg">{feedback}</p>
        </div>
      )}

      {/* Capas disponibles */}
      <div>
        <p className="font-bold mb-3 text-black text-lg">Capas disponibles:</p>
        <div className="space-y-2">
          {shuffled.map(layer =>
            !ordered.find(o => o.name === layer.name) ? (
              <button
                key={layer.name}
                onClick={() => handleAddLayer(layer)}
                className={`w-full p-3 rounded-lg text-white font-bold hover:opacity-90 transition-all ${layer.color}`}
              >
                {layer.name}
              </button>
            ) : (
              <div
                key={layer.name}
                className={`w-full p-3 rounded-lg text-white font-bold opacity-40 ${layer.color}`}
              >
                <CheckCircle className="w-5 h-5 inline mr-2" />
                {layer.name}
              </div>
            )
          )}
        </div>
      </div>

      {/* Botones de control */}
      <div className="grid grid-cols-2 gap-2">
        {ordered.length > 0 && !gameComplete && (
          <>
            <button
              onClick={handleUndo}
              className="p-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-all"
            >
              ↶ Deshacer
            </button>
            <button
              onClick={handleReset}
              className="p-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all"
            >
              🔄 Reiniciar
            </button>
          </>
        )}
        {gameComplete && (
          <button
            onClick={handleReset}
            className="col-span-2 p-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-all"
          >
            🔄 Jugar de nuevo
          </button>
        )}
      </div>
    </div>
  )
}
