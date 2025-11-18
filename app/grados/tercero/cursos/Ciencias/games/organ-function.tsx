"use client"

import { useState, useEffect } from "react"
import { CheckCircle } from 'lucide-react'

const organFunctions = [
  { organ: "❤️ Corazón", function: "Bombea sangre" },
  { organ: "🧠 Cerebro", function: "Controla el cuerpo" },
  { organ: "💨 Pulmones", function: "Respiran aire" },
  { organ: "🍽️ Estómago", function: "Digiere comida" },
  { organ: "👀 Ojos", function: "Ven el mundo" },
]

export function OrganFunction({ onComplete }: { onComplete: (score: number) => void }) {
  const [matches, setMatches] = useState<Record<string, boolean>>({})
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null)
  const [shuffledFunctions] = useState(() =>
    [...organFunctions].sort(() => Math.random() - 0.5)
  )

  const handleMatch = (organ: string, func: string) => {
    const isCorrect = organFunctions.find(o => o.organ === organ)?.function === func
    if (isCorrect) {
      setMatches(prev => ({ ...prev, [organ]: true }))
      setSelectedOrgan(null)
    }
  }

  useEffect(() => {
    if (Object.keys(matches).length === organFunctions.length) {
      setTimeout(() => onComplete(100), 800)
    }
  }, [matches, onComplete])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-bold text-gray-900">Relaciona órganos con sus funciones</p>
        <p className="text-sm font-semibold text-gray-800">Relacionados: {Object.keys(matches).length}/{organFunctions.length}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Órganos */}
        <div>
          <p className="font-bold mb-3 text-lg text-gray-900">Órganos:</p>
          <div className="space-y-2">
            {organFunctions.map(item => (
              <button
                key={item.organ}
                onClick={() => !matches[item.organ] && setSelectedOrgan(item.organ)}
                className={`w-full p-3 rounded-lg font-bold transition-all text-left text-gray-900 ${
                  matches[item.organ]
                    ? "bg-green-100 border-2 border-green-500"
                    : selectedOrgan === item.organ
                    ? "bg-blue-200 border-2 border-blue-500"
                    : "bg-blue-100 border-2 border-blue-300 hover:bg-blue-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.organ}</span>
                  {matches[item.organ] && <CheckCircle className="w-5 h-5" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Funciones */}
        <div>
          <p className="font-bold mb-3 text-lg text-gray-900">Funciones:</p>
          <div className="space-y-2">
            {shuffledFunctions.map(item => (
              <button
                key={item.function}
                onClick={() => selectedOrgan && handleMatch(selectedOrgan, item.function)}
                disabled={!selectedOrgan}
                className={`w-full p-3 rounded-lg font-bold transition-all text-gray-900 ${
                  selectedOrgan
                    ? "bg-green-100 border-2 border-green-300 hover:bg-green-200 cursor-pointer"
                    : "bg-gray-100 border-2 border-gray-300 cursor-not-allowed opacity-50"
                }`}
              >
                {item.function}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-sm font-semibold text-gray-800 text-center">
        💡 Selecciona un órgano y luego su función
      </div>
    </div>
  )
}
