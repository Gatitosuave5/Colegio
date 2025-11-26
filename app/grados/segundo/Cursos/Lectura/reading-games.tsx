"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, RotateCcw, LogOut, Lightbulb } from 'lucide-react'
import { Card } from "@/app/components/ui/card"

interface Story {
  id: string
  title: string
  content: string
  questions: string[]
}

interface MemoryCard {
  id: string
  word: string
  matchId: string
  flipped: boolean
  matched: boolean
}

interface RiddleGame {
  riddle: string
  answer: string
  hint: string
}

interface SequenceEvent {
  id: string
  text: string
  position: number
}

const gameData: Record<string, { memory: MemoryCard[], riddles: RiddleGame[], sequences: SequenceEvent[] }> = {
  "story-1": {
    memory: [
      { id: "1", word: "Mariposa", matchId: "m1", flipped: false, matched: false },
      { id: "2", word: "Mariposa", matchId: "m1", flipped: false, matched: false },
      { id: "3", word: "Luciérnaga", matchId: "m2", flipped: false, matched: false },
      { id: "4", word: "Luciérnaga", matchId: "m2", flipped: false, matched: false },
      { id: "5", word: "Saltamontes", matchId: "m3", flipped: false, matched: false },
      { id: "6", word: "Saltamontes", matchId: "m3", flipped: false, matched: false },
      { id: "7", word: "Pradera", matchId: "m4", flipped: false, matched: false },
      { id: "8", word: "Pradera", matchId: "m4", flipped: false, matched: false },
      { id: "9", word: "Tico", matchId: "m5", flipped: false, matched: false },
      { id: "10", word: "Tico", matchId: "m5", flipped: false, matched: false },
      { id: "11", word: "Viaje", matchId: "m6", flipped: false, matched: false },
      { id: "12", word: "Viaje", matchId: "m6", flipped: false, matched: false },
    ],
    riddles: [
      { riddle: "Tengo alas pero no voy al cielo, vuelo en el jardín. ¿Qué soy?", answer: "mariposa", hint: "Soy un insecto colorido" },
      { riddle: "Salgo de noche y brillo en la oscuridad, guío caminos. ¿Qué soy?", answer: "luciérnaga", hint: "Soy un insecto que emite luz" },
      { riddle: "Soy verde, salto muy alto y hago ruido. ¿Qué soy?", answer: "saltamontes", hint: "Soy un insecto que salta" },
      { riddle: "Tengo muchas flores de colores, soy grande y hermosa. ¿Qué soy?", answer: "pradera", hint: "Soy un lugar con plantas" },
      { riddle: "Avanzo hacia adelante, a veces me dan miedo, pero puedo ser hermoso. ¿Qué soy?", answer: "viaje", hint: "Es una aventura" },
      { riddle: "Hablo sin voz y camino sin pies, la madrugada es mi reino. ¿Qué soy?", answer: "curiosidad", hint: "Es lo que impulsa el deseo de conocer" },
    ],
    sequences: [
      { id: "1", text: "Azulina escucha a los abejorros hablar de las luces mágicas", position: 1 },
      { id: "2", text: "Azulina quiere ir pero tiene miedo del camino desconocido", position: 2 },
      { id: "3", text: "Una tormenta fuerte intenta detener su viaje", position: 3 },
      { id: "4", text: "Azulina llega a la pradera y ve las hermosas lucíernagas brillar", position: 4 },
    ]
  },
  "story-2": {
    memory: [
      { id: "1", word: "León", matchId: "m1", flipped: false, matched: false },
      { id: "2", word: "León", matchId: "m1", flipped: false, matched: false },
      { id: "3", word: "Rugido", matchId: "m2", flipped: false, matched: false },
      { id: "4", word: "Rugido", matchId: "m2", flipped: false, matched: false },
      { id: "5", word: "Jirafa", matchId: "m3", flipped: false, matched: false },
      { id: "6", word: "Jirafa", matchId: "m3", flipped: false, matched: false },
      { id: "7", word: "Calma", matchId: "m4", flipped: false, matched: false },
      { id: "8", word: "Calma", matchId: "m4", flipped: false, matched: false },
      { id: "9", word: "Lluvia", matchId: "m5", flipped: false, matched: false },
      { id: "10", word: "Lluvia", matchId: "m5", flipped: false, matched: false },
      { id: "11", word: "Amistad", matchId: "m6", flipped: false, matched: false },
      { id: "12", word: "Amistad", matchId: "m6", flipped: false, matched: false },
    ],
    riddles: [
      { riddle: "Soy el rey de la selva y tengo una melena grande. ¿Qué soy?", answer: "león", hint: "Soy un felino poderoso" },
      { riddle: "Soy sonoro y fuerte, vengo del pecho. ¿Qué soy?", answer: "rugido", hint: "Es lo que hace el león" },
      { riddle: "Soy muy alta y como de los árboles. ¿Qué soy?", answer: "jirafa", hint: "Soy el animal más alto" },
      { riddle: "Cuando me tienes, todo está bien. Cuando me pierdes, te desesperas. ¿Qué soy?", answer: "calma", hint: "Es el estado de paz interior" },
      { riddle: "Caigo del cielo y limpio todo lo que toco. ¿Qué soy?", answer: "lluvia", hint: "Viene del cielo" },
      { riddle: "Nos une sin cadenas, nos alegra, nos consuela. ¿Qué somos?", answer: "amistad", hint: "Es lo que vence los miedos" },
    ],
    sequences: [
      { id: "1", text: "Leo despierta sin poder rugir después de la lluvia", position: 1 },
      { id: "2", text: "Leo busca ayuda con Gigi, Tambo y otros animales", position: 2 },
      { id: "3", text: "Leo se siente desesperado y solo en una roca", position: 3 },
      { id: "4", text: "Al tener paz interior, su rugido regresa más fuerte que nunca", position: 4 },
    ]
  },
  "story-3": {
    memory: [
      { id: "1", word: "Color", matchId: "m1", flipped: false, matched: false },
      { id: "2", word: "Color", matchId: "m1", flipped: false, matched: false },
      { id: "3", word: "Nube", matchId: "m2", flipped: false, matched: false },
      { id: "4", word: "Nube", matchId: "m2", flipped: false, matched: false },
      { id: "5", word: "Pintor", matchId: "m3", flipped: false, matched: false },
      { id: "6", word: "Pintor", matchId: "m3", flipped: false, matched: false },
      { id: "7", word: "Alegría", matchId: "m4", flipped: false, matched: false },
      { id: "8", word: "Alegría", matchId: "m4", flipped: false, matched: false },
      { id: "9", word: "Emma", matchId: "m5", flipped: false, matched: false },
      { id: "10", word: "Emma", matchId: "m5", flipped: false, matched: false },
      { id: "11", word: "Ayuda", matchId: "m6", flipped: false, matched: false },
      { id: "12", word: "Ayuda", matchId: "m6", flipped: false, matched: false },
    ],
    riddles: [
      { riddle: "Soy multicolor, hermosa y paso en el cielo después de la lluvia. ¿Qué soy?", answer: "arcoíris", hint: "Tengo siete colores" },
      { riddle: "Soy gris y floto en el cielo. ¿Qué soy?", answer: "nube", hint: "Traigo lluvia" },
      { riddle: "Tengo pinceles y pinto cuadros hermosos. ¿Qué soy?", answer: "pintor", hint: "Soy un artista" },
      { riddle: "Sin mí no hay vida, soy alegría visible. ¿Qué soy?", answer: "color", hint: "Soy lo opuesto al blanco y negro" },
      { riddle: "Brillo cuando sonríes, desaparezco cuando frunces el ceño. ¿Qué soy?", answer: "sonrisa", hint: "Es una expresión del rostro" },
      { riddle: "Los antiguos la practicaban, el pueblo la necesitaba para traer colores. ¿Qué es?", answer: "bondad", hint: "Es hacer bien a otros" },
    ],
    sequences: [
      { id: "1", text: "Emma despierta en un mundo sin colores, todo es blanco y negro", position: 1 },
      { id: "2", text: "La nube gris explica que los colores desaparecen cuando la gente no valora", position: 2 },
      { id: "3", text: "Emma convence al pueblo para cambiar de actitud y ayudarse", position: 3 },
      { id: "4", text: "Los colores regresan como lluvia brillante cuando el pueblo sonríe", position: 4 },
    ]
  },
  "story-4": {
    memory: [
      { id: "1", word: "Tren", matchId: "m1", flipped: false, matched: false },
      { id: "2", word: "Tren", matchId: "m1", flipped: false, matched: false },
      { id: "3", word: "Velocidad", matchId: "m2", flipped: false, matched: false },
      { id: "4", word: "Velocidad", matchId: "m2", flipped: false, matched: false },
      { id: "5", word: "Estación", matchId: "m3", flipped: false, matched: false },
      { id: "6", word: "Estación", matchId: "m3", flipped: false, matched: false },
      { id: "7", word: "Ayuda", matchId: "m4", flipped: false, matched: false },
      { id: "8", word: "Ayuda", matchId: "m4", flipped: false, matched: false },
      { id: "9", word: "Rieles", matchId: "m5", flipped: false, matched: false },
      { id: "10", word: "Rieles", matchId: "m5", flipped: false, matched: false },
      { id: "11", word: "Parada", matchId: "m6", flipped: false, matched: false },
      { id: "12", word: "Parada", matchId: "m6", flipped: false, matched: false },
    ],
    riddles: [
      { riddle: "Corro por rieles y llevo pasajeros. Hago ruido al avanzar. ¿Qué soy?", answer: "tren", hint: "Soy un transporte sobre vías" },
      { riddle: "Soy lo que persigue el tren, pero puedo ser peligrosa. ¿Qué soy?", answer: "velocidad", hint: "Es poder ir rápido" },
      { riddle: "Subo y bajo personas en mi lugar. ¿Qué soy?", answer: "estación", hint: "Es donde paran los trenes" },
      { riddle: "Cuando me das, cambias vidas. ¿Qué soy?", answer: "ayuda", hint: "Es lo que otros necesitan" },
      { riddle: "Sigo líneas y guío hacia adelante. ¿Qué soy?", answer: "riel", hint: "Es la vía del tren" },
      { riddle: "Cuando me hago, das oportunidad a otros. ¿Qué soy?", answer: "parada", hint: "Es detenerse" },
    ],
    sequences: [
      { id: "1", text: "Trueno el tren quiere correr rápido sin parar en las estaciones", position: 1 },
      { id: "2", text: "Trueno no para y las personas que necesitan ayuda se quedan tristes", position: 2 },
      { id: "3", text: "El conductor le explica que la velocidad sin ayuda no tiene valor", position: 3 },
      { id: "4", text: "Trueno se convierte en el Tren Amigo parando en cada estación", position: 4 },
    ]
  },
  "story-5": {
    memory: [
      { id: "1", word: "Faro", matchId: "m1", flipped: false, matched: false },
      { id: "2", word: "Faro", matchId: "m1", flipped: false, matched: false },
      { id: "3", word: "Luz", matchId: "m2", flipped: false, matched: false },
      { id: "4", word: "Luz", matchId: "m2", flipped: false, matched: false },
      { id: "5", word: "Isla", matchId: "m3", flipped: false, matched: false },
      { id: "6", word: "Isla", matchId: "m3", flipped: false, matched: false },
      { id: "7", word: "Coraje", matchId: "m4", flipped: false, matched: false },
      { id: "8", word: "Coraje", matchId: "m4", flipped: false, matched: false },
      { id: "9", word: "Marinero", matchId: "m5", flipped: false, matched: false },
      { id: "10", word: "Marinero", matchId: "m5", flipped: false, matched: false },
      { id: "11", word: "Miedo", matchId: "m6", flipped: false, matched: false },
      { id: "12", word: "Miedo", matchId: "m6", flipped: false, matched: false },
    ],
    riddles: [
      { riddle: "Soy alto, brillo en la noche y guío barcos. ¿Qué soy?", answer: "faro", hint: "Tengo una luz en la cima" },
      { riddle: "Soy rodeada de agua, pequeña pero importante. ¿Qué soy?", answer: "isla", hint: "Es tierra en el mar" },
      { riddle: "Soy lo que nos ayuda a vencer el miedo cuando hacemos lo correcto. ¿Qué soy?", answer: "coraje", hint: "Es valentía interior" },
      { riddle: "Viajo por el mar buscando puerto. ¿Qué soy?", answer: "marinero", hint: "Trabalenguas del mar" },
      { riddle: "Soy compañero de la noche, te paralizo pero también proteges. ¿Qué soy?", answer: "miedo", hint: "Es una emoción" },
      { riddle: "En la cima están mis luces, en mi base están las historias. ¿Qué soy?", answer: "historia", hint: "Es un relato" },
    ],
    sequences: [
      { id: "1", text: "Lía y su abuelo encienden juntos el faro cada noche", position: 1 },
      { id: "2", text: "El abuelo enferma y Lía debe encender el faro sola en una noche tormentosa", position: 2 },
      { id: "3", text: "Lía siente miedo pero el mecanismo está atascado y debe actuar", position: 3 },
      { id: "4", text: "Lía logra encender la luz con paciencia y los marineros se salvan", position: 4 },
    ]
  },
  "story-6": {
    memory: [
      { id: "1", word: "Sofia", matchId: "m1", flipped: false, matched: false },
      { id: "2", word: "Sofia", matchId: "m1", flipped: false, matched: false },
      { id: "3", word: "Cristal", matchId: "m2", flipped: false, matched: false },
      { id: "4", word: "Cristal", matchId: "m2", flipped: false, matched: false },
      { id: "5", word: "Búho", matchId: "m3", flipped: false, matched: false },
      { id: "6", word: "Búho", matchId: "m3", flipped: false, matched: false },
      { id: "7", word: "Dragón", matchId: "m4", flipped: false, matched: false },
      { id: "8", word: "Dragón", matchId: "m4", flipped: false, matched: false },
      { id: "9", word: "Magia", matchId: "m5", flipped: false, matched: false },
      { id: "10", word: "Magia", matchId: "m5", flipped: false, matched: false },
      { id: "11", word: "Corazón", matchId: "m6", flipped: false, matched: false },
      { id: "12", word: "Corazón", matchId: "m6", flipped: false, matched: false },
    ],
    riddles: [
      { riddle: "Brillo como el oro, traigo paz al reino. Me escondieron bien. ¿Qué soy?", answer: "cristal", hint: "Soy dorado y mágico" },
      { riddle: "Vuela de noche, soy muy sabio y veo todo. ¿Qué soy?", answer: "búho", hint: "Soy un pájaro nocturno" },
      { riddle: "Soy enorme, tengo fuego en mi vientre, pero puedo ser bondadoso. ¿Qué soy?", answer: "dragón", hint: "Soy una criatura mítica" },
      { riddle: "No estoy en objetos, estoy en tu pecho. Soy la verdadera magia. ¿Qué soy?", answer: "corazón", hint: "Soy lo que define a las personas" },
      { riddle: "Atravieso bosques, ríos y montañas para cumplir mi misión. ¿Qué soy?", answer: "viajero", hint: "Es quien viaja" },
      { riddle: "Soy invisible pero poderosa, creo milagros cuando crees. ¿Qué soy?", answer: "fe", hint: "Es creer sin ver" },
    ],
    sequences: [
      { id: "1", text: "Sofia decide buscar el cristal dorado perdido hace mil años", position: 1 },
      { id: "2", text: "Sofia atraviesa el Bosque de las Voces, el Río de Sabiduría y conoce a Theo", position: 2 },
      { id: "3", text: "Sofia encuentra el dragón de fuego guardando el cristal en la montaña", position: 3 },
      { id: "4", text: "Sofia trata al dragón con respeto y recibe el cristal, trayendo paz al reino", position: 4 },
    ]
  }
}

export default function ReadingGames({
  story,
  moduleId,
  onBack,
}: {
  story: Story
  moduleId: string
  onBack: () => void
}) {
  const [currentGame, setCurrentGame] = useState<"memory" | "riddle" | "sequence" | null>(null)
  const [timeLeft, setTimeLeft] = useState(180)
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [showQuitModal, setShowQuitModal] = useState(false)

  // Memory game state
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<string[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)

  // Riddle game state
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0)
  const [riddleAnswer, setRiddleAnswer] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [riddleMessage, setRiddleMessage] = useState("")
  const [riddleScore, setRiddleScore] = useState(0)

  // Sequence game state
  const [sequenceEvents, setSequenceEvents] = useState<SequenceEvent[]>([])
  const [sequenceOrder, setSequenceOrder] = useState<SequenceEvent[]>([])
  const [sequenceMessage, setSequenceMessage] = useState("")

  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [gameActive, timeLeft])

  const handleStartGame = (game: "memory" | "riddle" | "sequence") => {
    setCurrentGame(game)
    setTimeLeft(180)
    setScore(0)
    setRiddleScore(0)
    setGameActive(true)
    setShowHint(false)
    setRiddleAnswer("")
    setRiddleMessage("")
    setFlippedCards([])
    setMatchedPairs(0)
    setCurrentRiddleIndex(0)
    setSequenceOrder([])
    setSequenceMessage("")

    if (game === "memory") {
      const data = gameData[story.id]?.memory || []
      const shuffled = [...data].sort(() => Math.random() - 0.5)
      setMemoryCards(shuffled.map(card => ({...card, flipped: false, matched: false})))
    } else if (game === "sequence") {
      const data = gameData[story.id]?.sequences || []
      const shuffled = [...data].sort(() => Math.random() - 0.5)
      setSequenceEvents(shuffled)
    }
  }

  const handleQuitGame = () => {
    setShowQuitModal(true)
  }

  const confirmQuit = () => {
    setCurrentGame(null)
    setGameActive(false)
    setShowQuitModal(false)
  }

  const handleMemoryCardClick = (id: string) => {
    if (flippedCards.includes(id) || flippedCards.length >= 2 || memoryCards.find(c => c.id === id)?.matched) return

    const newFlipped = [...flippedCards, id]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      const card1 = memoryCards.find(c => c.id === newFlipped[0])
      const card2 = memoryCards.find(c => c.id === newFlipped[1])

      if (card1?.matchId === card2?.matchId && card1?.matchId) {
        setMemoryCards(prev => prev.map(c => 
          c.id === newFlipped[0] || c.id === newFlipped[1] ? {...c, matched: true, flipped: true} : c
        ))
        setMatchedPairs(matchedPairs + 1)
        setScore(score + 10)
        setFlippedCards([])
      } else {
        setTimeout(() => setFlippedCards([]), 1000)
      }
    }
  }

  const handleRiddleSubmit = () => {
    const riddles = gameData[story.id]?.riddles || []
    const currentRiddle = riddles[currentRiddleIndex]
    
    if (riddleAnswer.toLowerCase().trim() === currentRiddle.answer.toLowerCase()) {
      setRiddleMessage("¡Correcto!")
      setRiddleScore(riddleScore + 1)
      setTimeout(() => {
        if (currentRiddleIndex < riddles.length - 1) {
          setCurrentRiddleIndex(currentRiddleIndex + 1)
          setRiddleAnswer("")
          setShowHint(false)
          setRiddleMessage("")
        } else {
          // Show final message based on score
          const finalScore = riddleScore + 1
          if (finalScore > 4) {
            setRiddleMessage("¡Bien hecho! 🌟 Eres muy inteligente")
          } else {
            setRiddleMessage("Puedes mejorar 💪 Intenta de nuevo")
          }
          setTimeout(() => setGameActive(false), 2000)
        }
      }, 1500)
    } else {
      setRiddleMessage(`Incorrecto. La respuesta correcta es: ${currentRiddle.answer}`)
      setTimeout(() => {
        if (currentRiddleIndex < riddles.length - 1) {
          setCurrentRiddleIndex(currentRiddleIndex + 1)
          setRiddleAnswer("")
          setShowHint(false)
          setRiddleMessage("")
        } else {
          // Show final message based on score
          const finalScore = riddleScore
          if (finalScore > 4) {
            setRiddleMessage("¡Bien hecho! 🌟 Eres muy inteligente")
          } else {
            setRiddleMessage("Puedes mejorar 💪 Intenta de nuevo")
          }
          setTimeout(() => setGameActive(false), 2000)
        }
      }, 2500)
    }
  }

  const handleSequenceDrop = (index: number, event: SequenceEvent) => {
    const newOrder = [...sequenceOrder]
    newOrder[index] = event
    setSequenceOrder(newOrder)
  }

  const handleSubmitSequence = () => {
    const correct = sequenceOrder.every((event, index) => event?.position === index + 1)
    
    if (correct) {
      setScore(score + 20)
      setSequenceMessage("¡Bien hecho eres un buen lector! 🎉")
      setGameActive(false)
    } else {
      setSequenceMessage("Secuencia incorrecta. Intenta de nuevo.")
      setTimeout(() => {
        setSequenceOrder([])
        const data = gameData[story.id]?.sequences || []
        const shuffled = [...data].sort(() => Math.random() - 0.5)
        setSequenceEvents(shuffled)
        setSequenceMessage("")
      }, 1500)
    }
  }

  if (!currentGame) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">🎮 Juegos Interactivos</h2>
              <p className="text-gray-600">Elige un juego para jugar</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 bg-gradient-to-br from-green-50 to-white border-2 border-green-300 rounded-xl cursor-pointer hover:shadow-lg transition-all" onClick={() => handleStartGame("memory")}>
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Memoria</h3>
            <p className="text-gray-600 mb-4">Memoriza y encuentra parejas de palabras iguales</p>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
              Jugar →
            </button>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-300 rounded-xl cursor-pointer hover:shadow-lg transition-all" onClick={() => handleStartGame("riddle")}>
            <div className="text-5xl mb-4">🔮</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Adivinanzas</h3>
            <p className="text-gray-600 mb-4">Resuelve 6 adivinanzas con pistas disponibles</p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
              Jugar →
            </button>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-300 rounded-xl cursor-pointer hover:shadow-lg transition-all" onClick={() => handleStartGame("sequence")}>
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Secuencia</h3>
            <p className="text-gray-600 mb-4">Ordena: Inicio, Conflicto, Clímax, Resolución</p>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg">
              Jugar →
            </button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div>
      {showQuitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg">
          <Card className="bg-white p-8 rounded-2xl max-w-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Abandonar juego?</h3>
            <p className="text-gray-600 mb-6">Perderás tu progreso actual. ¿Estás seguro?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowQuitModal(false)}
                className="flex-1 p-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={confirmQuit}
                className="flex-1 p-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg"
              >
                Abandonar
              </button>
            </div>
          </Card>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={handleQuitGame} className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600">
            <LogOut className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {currentGame === "memory" && "🧠 Juego de Memoria"}
              {currentGame === "riddle" && "🔮 Adivinanzas"}
              {currentGame === "sequence" && "📊 Secuencia de Eventos"}
            </h2>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-purple-600">{timeLeft}s</div>
          <div className="text-2xl font-bold text-gray-900">Puntos: {score}</div>
        </div>
      </div>

      <Card className="bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg p-10 rounded-2xl mb-8 min-h-96">
        {currentGame === "memory" && (
          <div className="w-full">
            <h3 className="text-2xl font-bold mb-6 text-center text-black">Encuentra las parejas de palabras idénticas</h3>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {memoryCards.map(card => (
                <button
                  key={card.id}
                  onClick={() => handleMemoryCardClick(card.id)}
                  disabled={card.matched || flippedCards.includes(card.id)}
                  className={`p-6 font-bold rounded-lg text-center h-24 transition-all flex items-center justify-center ${
                    card.matched ? "bg-green-500 text-white opacity-100 cursor-default" :
                    flippedCards.includes(card.id) ? "bg-blue-400 text-white" :
                    "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {card.matched || flippedCards.includes(card.id) ? card.word : "?"}
                </button>
              ))}
            </div>
            <p className="text-center text-gray-600 font-semibold">Parejas encontradas: {matchedPairs}/{Math.ceil(memoryCards.length / 2)}</p>
          </div>
        )}

        {currentGame === "riddle" && (
          <div className="text-center w-full">
            <h3 className="text-2xl font-bold mb-6 text-green-500">Adivinanza {currentRiddleIndex + 1} de {gameData[story.id]?.riddles.length}</h3>
            <div className="bg-blue-100 p-6 rounded-lg mb-6">
              <p className="text-xl font-semibold text-gray-800">{gameData[story.id]?.riddles[currentRiddleIndex]?.riddle}</p>
            </div>
            {showHint && (
              <div className="bg-yellow-100 p-4 rounded-lg mb-6 border-2 border-yellow-300">
                <p className="text-sm text-gray-800">💡 Pista: {gameData[story.id]?.riddles[currentRiddleIndex]?.hint}</p>
              </div>
            )}
            {riddleMessage && (
              <div className={`p-4 rounded-lg mb-6 font-semibold text-lg ${
                riddleMessage.includes("¡Correcto!") || riddleMessage.includes("Bien hecho") ? "bg-green-100 text-green-800" : 
                riddleMessage.includes("Puedes mejorar") ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }`}>
                {riddleMessage}
              </div>
            )}
            <input
              type="text"
              value={riddleAnswer}
              onChange={(e) => setRiddleAnswer(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !riddleMessage.includes("Bien hecho") && !riddleMessage.includes("Puedes mejorar") && handleRiddleSubmit()}
              placeholder="Escribe tu respuesta..."
              className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4 text-lg text-black text-center"
              disabled={riddleMessage.includes("Bien hecho") || riddleMessage.includes("Puedes mejorar")}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowHint(true)}
                disabled={showHint || riddleMessage !== ""}
                className="flex-1 p-3 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white font-bold rounded-lg flex items-center justify-center gap-2"
              >
                <Lightbulb className="w-5 h-5" /> Pista
              </button>
              <button
                onClick={handleRiddleSubmit}
                disabled={riddleMessage !== ""}
                className="flex-1 p-3 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold rounded-lg"
              >
                ✅ Verificar
              </button>
            </div>
          </div>
        )}

        {currentGame === "sequence" && (
          <div className="text-center w-full">
            <h3 className="text-2xl font-bold mb-6 text-blue-600">Ordena los eventos del cuento correctamente</h3>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-bold mb-3 text-gray-700 text-lg">Eventos por ordenar:</h4>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {sequenceEvents.filter(e => !sequenceOrder.includes(e)).map(event => (
                    <div
                      key={event.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify(event))}
                      className="p-3 bg-gray-100 rounded-lg cursor-move hover:bg-gray-200 text-sm text-gray-800 font-semibold"
                    >
                      {event.text}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-3 text-gray-700 text-lg">Orden correcto:</h4>
                <div className="space-y-2">
                  {["Inicio", "Conflicto", "Clímax", "Resolución"].map((label, idx) => (
                    <div
                      key={idx}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault()
                        const event = JSON.parse(e.dataTransfer.getData("text/plain"))
                        handleSequenceDrop(idx, event)
                      }}
                      className="p-4 bg-blue-100 rounded-lg border-2 border-dashed border-blue-400 min-h-24 flex flex-col justify-center items-center hover:bg-blue-50"
                    >
                      <div className="text-sm font-bold text-blue-600 mb-2">{label} ({idx + 1})</div>
                      {sequenceOrder[idx] ? (
                        <div className="text-sm text-gray-800 font-semibold text-center">{sequenceOrder[idx].text}</div>
                      ) : (
                        <div className="text-xs text-gray-500">Arrastra aquí</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {sequenceMessage && (
              <div className={`p-4 rounded-lg mb-6 font-semibold text-lg ${
                sequenceMessage.includes("¡Bien hecho") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {sequenceMessage}
              </div>
            )}
            <button
              onClick={handleSubmitSequence}
              disabled={sequenceOrder.length < 4}
              className="w-full p-4 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg"
            >
              ✅ Enviar Orden
            </button>
          </div>
        )}
      </Card>

      <div className="flex gap-4">
        <button
          onClick={() => handleStartGame(currentGame)}
          className="flex-1 p-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" /> Reintentar
        </button>
        <button
          onClick={handleQuitGame}
          className="flex-1 p-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" /> Abandonar
        </button>
      </div>
    </div>
  )
}
