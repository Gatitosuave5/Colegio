"use client"

import { useState } from "react"
import { CheckCircle, Sparkles } from 'lucide-react'

const resources = [
  { id: 1, name: "Agua 💧", category: "Renovable" },
  { id: 2, name: "Petróleo ⛽", category: "No Renovable" },
  { id: 3, name: "Árbol 🌳", category: "Renovable" },
  { id: 4, name: "Oro 💛", category: "No Renovable" },
  { id: 5, name: "Luz Solar ☀️", category: "Renovable" },
  { id: 6, name: "Carbón ⚫", category: "No Renovable" },
]

export function NaturalResources({ onComplete }: { onComplete: (score: number) => void }) {
  const [classified, setClassified] = useState<Record<number, string>>({})
  const [shuffledResources] = useState(() =>
    [...resources].sort(() => Math.random() - 0.5)
  )
  const [correctCount, setCorrectCount] = useState(0)

  const handleClassify = (id: number, category: string) => {
    if (classified[id]) return
    
    const resource = resources.find(r => r.id === id)
    if (resource && resource.category === category) {
      setClassified(prev => ({ ...prev, [id]: category }))
      setCorrectCount(prev => prev + 1)
      
      if (correctCount === resources.length - 1) {
        setTimeout(() => onComplete(100), 800)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-bold text-black">Clasifica los recursos naturales</p>
        <p className="text-sm font-bold text-black">Clasificados: {Object.keys(classified).length}/{resources.length}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Renovables */}
        <div className="bg-green-50 p-6 rounded-lg border-4 border-green-400 shadow-lg">
          <p className="font-bold mb-4 text-xl text-black">♻️ Renovables</p>
          <div className="space-y-3 min-h-40 p-3 bg-white rounded-lg">
            {resources
              .filter(r => r.category === "Renovable" && classified[r.id])
              .map(resource => (
                <div
                  key={resource.id}
                  className="p-3 bg-green-200 border-2 border-green-500 rounded-lg font-bold text-black flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  {resource.name}
                </div>
              ))}
          </div>
        </div>

        {/* No Renovables */}
        <div className="bg-orange-50 p-6 rounded-lg border-4 border-orange-400 shadow-lg">
          <p className="font-bold mb-4 text-xl text-black">⛏️ No Renovables</p>
          <div className="space-y-3 min-h-40 p-3 bg-white rounded-lg">
            {resources
              .filter(r => r.category === "No Renovable" && classified[r.id])
              .map(resource => (
                <div
                  key={resource.id}
                  className="p-3 bg-orange-200 border-2 border-orange-500 rounded-lg font-bold text-black flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  {resource.name}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recursos sin clasificar */}
      <div>
        <p className="font-bold mb-3 text-black text-lg">📦 Por clasificar:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {shuffledResources.map(resource => (
            <div
              key={resource.id}
              className={`p-4 rounded-lg text-center font-bold text-black transition-all ${
                classified[resource.id]
                  ? "bg-gray-100 opacity-40"
                  : "bg-blue-100 border-2 border-blue-400 cursor-pointer hover:bg-blue-200 hover:border-blue-600 hover:shadow-lg"
              }`}
            >
              <button
                onClick={() => {
                  if (!classified[resource.id]) {
                    if (resources.find(r => r.id === resource.id)?.category === "Renovable") {
                      handleClassify(resource.id, "Renovable")
                    } else {
                      handleClassify(resource.id, "No Renovable")
                    }
                  }
                }}
                disabled={classified[resource.id] !== undefined}
                className="w-full"
              >
                {resource.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
        <p className="font-bold text-black flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          Haz clic en cada recurso para clasificarlo
        </p>
      </div>
    </div>
  )
}
