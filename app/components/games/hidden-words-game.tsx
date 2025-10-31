"use client"

import { useState, useEffect } from "react"
import { Card } from "@/app/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface Word {
  word: string
  hint: string
  found: boolean
}

const storyWords: Record<string, Word[]> = {
  caperucita: [
    { word: "LOBO", hint: "Animal peligroso del bosque", found: false },
    { word: "BOSQUE", hint: "Lugar donde vive el lobo", found: false },
    { word: "ABUELA", hint: "Pariente de Caperucita", found: false },
    { word: "CAPERUZA", hint: "Prenda roja que usa", found: false },
    { word: "CANASTA", hint: "Lleva comida para la abuela", found: false },
  ],
  patito: [
    { word: "CISNE", hint: "En lo que se convierte", found: false },
    { word: "GRANJA", hint: "Donde nace el patito", found: false },
    { word: "HERMOSO", hint: "Lo que descubre que es", found: false },
    { word: "INVIERNO", hint: "Estación difícil", found: false },
    { word: "RECHAZO", hint: "Lo que sufre al principio", found: false },
  ],
  cenicienta: [
    { word: "ZAPATILLA", hint: "De cristal, la pierde", found: false },
    { word: "PRINCIPE", hint: "Con quien baila", found: false },
    { word: "HADA", hint: "Madrina que la ayuda", found: false },
    { word: "CALABAZA", hint: "Se convierte en carruaje", found: false },
    { word: "MEDIANOCHE", hint: "Hora en que termina la magia", found: false },
  ],
}

export default function HiddenWordsGame({
  storyId,
  onBack,
}: {
  storyId: string
  onBack: () => void
}) {
  const [words, setWords] = useState<Word[]>([])
  const [input, setInput] = useState("")
  const [currentHint, setCurrentHint] = useState("")
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const gameWords = storyWords[storyId] || storyWords.caperucita
    setWords(gameWords)
    if (gameWords.length > 0) {
      setCurrentHint(gameWords[0].hint)
    }
  }, [storyId])

  const handleSubmit = () => {
    const upperInput = input.toUpperCase().trim()
    const wordIndex = words.findIndex((w) => w.word === upperInput && !w.found)

    if (wordIndex !== -1) {
      const newWords = [...words]
      newWords[wordIndex].found = true
      setWords(newWords)
      setInput("")

      const nextUnfound = newWords.find((w) => !w.found)
      if (nextUnfound) {
        setCurrentHint(nextUnfound.hint)
      } else {
        setCompleted(true)
        setScore(100)
      }
    } else {
      alert("Esa no es la palabra correcta. ¡Intenta de nuevo!")
      setInput("")
    }
  }

  const foundCount = words.filter((w) => w.found).length

  if (completed) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¡Encontraste todas!</h2>
          <p className="text-2xl text-gray-600 mb-8">
            Obtuviste <span className="font-bold text-purple-600">{score}</span> puntos
          </p>
          <button
            onClick={onBack}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver a Juegos
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Palabras Ocultas</h2>
        <div className="text-2xl font-bold text-purple-600">
          {foundCount}/{words.length}
        </div>
      </div>

      <Card className="bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg p-8 rounded-2xl mb-8">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 mb-4">Pista:</p>
          <p className="text-2xl font-bold text-purple-600">{currentHint}</p>
        </div>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Escribe la palabra..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-lg"
            autoFocus
          />
          <button
            onClick={handleSubmit}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
          >
            Enviar
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {words.map((word, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-center font-bold transition-all ${
                word.found ? "bg-green-400 text-white" : "bg-gray-300 text-gray-500"
              }`}
            >
              {word.found ? word.word : "?".repeat(word.word.length)}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
