"use client"

import { useState, useEffect } from "react"
import { Card } from "@/app/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface MemoryCard {
  id: number
  pair: number
  flipped: boolean
  matched: boolean
  content: string
}

const storyCards: Record<string, string[]> = {
  caperucita: ["🐺 Lobo", "👧 Caperucita", "🏠 Casa", "🌲 Bosque", "🧺 Canasta", "👵 Abuela"],
  patito: ["🦆 Patito", "🦢 Cisne", "🌾 Granja", "💔 Triste", "🌸 Primavera", "❄️ Invierno"],
  cenicienta: ["👗 Vestido", "👠 Zapatilla", "🤴 Príncipe", "✨ Hada", "🎃 Calabaza", "⏰ Medianoche"],
}

export default function MemoryGame({
  storyId,
  onBack,
}: {
  storyId: string
  onBack: () => void
}) {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const cardContents = storyCards[storyId] || storyCards.caperucita
    const gameCards: MemoryCard[] = []

    cardContents.forEach((content, index) => {
      gameCards.push({
        id: index * 2,
        pair: index,
        flipped: false,
        matched: false,
        content,
      })
      gameCards.push({
        id: index * 2 + 1,
        pair: index,
        flipped: false,
        matched: false,
        content,
      })
    })

    // Shuffle cards
    gameCards.sort(() => Math.random() - 0.5)
    setCards(gameCards)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setCompleted(false)
  }

  const handleCardClick = (id: number) => {
    if (flipped.includes(id) || matched.includes(id)) return

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      const card1 = cards.find((c) => c.id === newFlipped[0])
      const card2 = cards.find((c) => c.id === newFlipped[1])

      setMoves(moves + 1)

      if (card1?.pair === card2?.pair) {
        setMatched([...matched, newFlipped[0], newFlipped[1]])
        setFlipped([])

        if (matched.length + 2 === cards.length) {
          setCompleted(true)
        }
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  if (completed) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¡Ganaste!</h2>
          <p className="text-2xl text-gray-600 mb-2">
            Completaste el juego en <span className="font-bold text-purple-600">{moves}</span> movimientos
          </p>
          <p className="text-lg text-gray-500 mb-8">
            {moves <= 12 ? "¡Excelente! 🌟" : moves <= 18 ? "¡Muy bien! 👏" : "¡Lo lograste! 💪"}
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
        <h2 className="text-2xl font-bold text-gray-900">Juego de Memoria</h2>
        <div className="text-2xl font-bold text-purple-600">Movimientos: {moves}</div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-xl font-bold text-2xl transition-all duration-300 transform hover:scale-105 ${
              flipped.includes(card.id) || matched.includes(card.id)
                ? "bg-gradient-to-br from-purple-400 to-pink-400 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-400"
            }`}
          >
            {flipped.includes(card.id) || matched.includes(card.id) ? card.content : "?"}
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={initializeGame}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
        >
          Reiniciar Juego
        </button>
      </div>
    </div>
  )
}
