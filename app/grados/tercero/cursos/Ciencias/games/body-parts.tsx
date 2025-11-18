"use client"

import { useState } from "react"
import { CheckCircle } from 'lucide-react'

const bodyParts = [
  { id: 1, name: "Cabeza 🧠", x: 50, y: 10 },
  { id: 2, name: "Brazo 💪", x: 20, y: 35 },
  { id: 3, name: "Corazón ❤️", x: 50, y: 40 },
  { id: 4, name: "Estómago 🍽️", x: 50, y: 50 },
  { id: 5, name: "Pierna 🦵", x: 45, y: 75 },
]

export function BodyParts({ onComplete }: { onComplete: (score: number) => void }) {
  const [identified, setIdentified] = useState<number[]>([])
  const [shuffledParts] = useState(() =>
    [...bodyParts].sort(() => Math.random() - 0.5)
  )

  const handleIdentify = (id: number) => {
    if (!identified.includes(id)) {
      setIdentified(prev => [...prev, id])
      if (identified.length === bodyParts.length - 1) {
        setTimeout(() => onComplete(100), 800)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-bold text-black">Identifica las partes del cuerpo humano</p>
        <p className="text-sm font-semibold text-gray-800">Identificadas: {identified.length}/{bodyParts.length}</p>
      </div>

      <div className="bg-gradient-to-b from-pink-50 to-rose-50 p-8 rounded-lg">
        <div className="relative w-full h-80 mx-auto max-w-xs">
          {/* Figura humana simplificada */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-60 border-2 border-gray-400 rounded-full top-5 bg-yellow-100"></div>

          {/* Puntos de partes del cuerpo */}
          {bodyParts.map(part => (
            <button
              key={part.id}
              onClick={() => handleIdentify(part.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                identified.includes(part.id)
                  ? "w-12 h-12 bg-green-400 border-2 border-green-600"
                  : "w-10 h-10 bg-red-400 border-2 border-red-600 hover:w-12 hover:h-12"
              } rounded-full cursor-pointer flex items-center justify-center text-xs font-bold`}
              style={{ left: `${part.x}%`, top: `${part.y}%` }}
              title={part.name}
            >
              {identified.includes(part.id) && <CheckCircle className="w-6 h-6 text-white" />}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {shuffledParts.map(part => (
          <div
            key={part.id}
            className={`p-2 rounded-lg text-center font-bold text-black transition-all ${
              identified.includes(part.id)
                ? "bg-green-100 border-2 border-green-500"
                : "bg-gray-100 border-2 border-gray-300"
            }`}
          >
            {part.name}
          </div>
        ))}
      </div>
    </div>
  )
}
