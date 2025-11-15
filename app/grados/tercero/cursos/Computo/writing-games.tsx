"use client"

import { useState, useEffect } from "react"
import { Card } from "@/app/components/ui/card"
import { ArrowLeft } from 'lucide-react'

interface Game {
  id: string
  name: string
  description: string
  icon: string
}

const games: Record<string, Game[]> = {
  typing: [
    {
      id: "press-key",
      name: "Presiona la Tecla Correcta",
      description: "Se muestra una tecla, presionala correctamente",
      icon: "⌨️",
    },
    {
      id: "balloon-words",
      name: "Escribe Antes de Explotar",
      description: "Escribe la palabra antes de que explote el globo",
      icon: "🎈",
    },
    {
      id: "speed-typing",
      name: "Carrera de Velocidad",
      description: "¿Cuán rápido puedes escribir correctamente?",
      icon: "🚀",
    },
  ],
  capitalization: [
    {
      id: "capital-names",
      name: "Corrige Nombres Propios",
      description: "Identifica cuáles deben llevar mayúscula",
      icon: "🔤",
    },
    {
      id: "sentence-start",
      name: "Inicia Oraciones",
      description: "Escribe oraciones con mayúscula inicial correcta",
      icon: "✍️",
    },
    {
      id: "cities-countries",
      name: "Ciudades y Países",
      description: "Practica mayúsculas con lugares",
      icon: "🌍",
    },
  ],
  textcopying: [
    {
      id: "riddles",
      name: "Adivina la Adivinanza",
      description: "Lee y copia adivinanzas, luego adivina",
      icon: "🧩",
    },
    {
      id: "motivational",
      name: "Frases Motivadoras",
      description: "Copia frases positivas y memoriza su significado",
      icon: "💪",
    },
    {
      id: "poems",
      name: "Pequeños Versos",
      description: "Copia y aprende rimas y versos cortos",
      icon: "📖",
    },
  ],
  words: [
    {
      id: "complete-words",
      name: "Completa la Palabra",
      description: "Completa palabras con sílabas faltantes",
      icon: "📝",
    },
    {
      id: "divide-syllables",
      name: "Divide en Sílabas",
      description: "Separa palabras en sus sílabas correctas",
      icon: "✂️",
    },
    {
      id: "order-letters",
      name: "Ordena las Letras",
      description: "Reorganiza letras desordenadas para formar palabras",
      icon: "🔤",
    },
  ],
  numbers: [
    {
      id: "number-series",
      name: "Series Numéricas",
      description: "Completa series numéricas correctamente",
      icon: "🔢",
    },
    {
      id: "copy-operations",
      name: "Copia Operaciones",
      description: "Copia operaciones matemáticas simples",
      icon: "➕",
    },
    {
      id: "math-problems",
      name: "Problemas Cortos",
      description: "Escribe la solución de problemas simples",
      icon: "📊",
    },
  ],
}

export default function WritingGames({
  moduleType,
  onBack,
  quizScore = 0,
}: {
  moduleType: "typing" | "capitalization" | "textcopying" | "words" | "numbers"
  onBack: () => void
  quizScore?: number
}) {
  const moduleGames = games[moduleType] || []
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  if (selectedGame === "press-key" && moduleType === "typing") {
    return <PressKeyGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "balloon-words" && moduleType === "typing") {
    return <BalloonWordsGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "speed-typing" && moduleType === "typing") {
    return <SpeedRacingGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "capital-names" && moduleType === "capitalization") {
    return <CapitalNamesGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "sentence-start" && moduleType === "capitalization") {
    return <InitiateSentencesGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "cities-countries" && moduleType === "capitalization") {
    return <CitiesCountriesGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "riddles" && moduleType === "textcopying") {
    return <RiddlesGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "motivational" && moduleType === "textcopying") {
    return <MotivationalGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "poems" && moduleType === "textcopying") {
    return <PoemsGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "complete-words" && moduleType === "words") {
    return <CompleteWordsGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "divide-syllables" && moduleType === "words") {
    return <DivideSyllablesGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "order-letters" && moduleType === "words") {
    return <OrderLettersGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "number-series" && moduleType === "numbers") {
    return <NumberSeriesGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "copy-operations" && moduleType === "numbers") {
    return <CopyOperationsGame onBack={() => setSelectedGame(null)} />
  }

  if (selectedGame === "math-problems" && moduleType === "numbers") {
    return <MathProblemsGame onBack={() => setSelectedGame(null)} />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Juegos Interactivos</h2>
        <div className="w-10"></div>
      </div>

      <div className="text-center mb-12">
        <p className="text-xl text-gray-600">Elige un juego para practicar y divertirte</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {moduleGames.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGame(game.id)}
            className="group text-left transition-all duration-300 hover:scale-105"
          >
            <Card
              className="text-white border-0 shadow-lg hover:shadow-2xl transition-all h-full p-8 rounded-2xl cursor-pointer bg-gradient-to-br from-indigo-400 to-purple-400"
            >
              <div className="text-6xl mb-4">{game.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
              <p className="text-sm opacity-90">{game.description}</p>
            </Card>
          </button>
        ))}
      </div>
    </div>
  )
}

function PressKeyGame({ onBack }: { onBack: () => void }) {
  const keys = ["A", "S", "D", "F", "J", "K", "L", "Ñ"]
  const [currentKey, setCurrentKey] = useState(keys[0])
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [failed, setFailed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(20)
  const [gameActive, setGameActive] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const savedRecord = localStorage.getItem("pressKeyRecord")
    if (savedRecord) {
      setRecord(parseInt(savedRecord))
    }
  }, [])

  useEffect(() => {
    if (record > 0) {
      localStorage.setItem("pressKeyRecord", record.toString())
    }
  }, [record])

  useEffect(() => {
    if (!gameActive || failed) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          if (score > record) {
            setRecord(score)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, failed, score, record])

  useEffect(() => {
    if (failed || !gameActive) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toUpperCase() === currentKey) {
        setScore(score + 1)
        setFeedback("¡Correcto!")
        const newKey = keys[Math.floor(Math.random() * keys.length)]
        setTimeout(() => {
          setCurrentKey(newKey)
          setFeedback("")
        }, 500)
      } else {
        setFailed(true)
        setGameActive(false)
        setScore(0)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentKey, score, failed, gameActive, keys])

  const handleRetry = () => {
    setFailed(false)
    setGameStarted(false)
    setGameActive(false)
    setScore(0)
    setTimeLeft(20)
  }

  const handleStart = () => {
    setGameStarted(true)
    setGameActive(true)
    setTimeLeft(20)
    setScore(0)
    setFailed(false)
    setFeedback("")
    setCurrentKey(keys[Math.floor(Math.random() * keys.length)])
  }

  if (!gameStarted && !failed) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-blue-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Presiona la Tecla Correcta</h2>
          <div className="bg-blue-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-3xl font-bold text-blue-600">{record}</p>
          </div>
          <button
            onClick={handleStart}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Empezar Juego
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  if (failed) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-red-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-red-600 mb-8">¡Fallaste! Intenta de nuevo</h2>
          <p className="text-2xl text-gray-600 mb-8">Puntuación: {score}</p>
          <button
            onClick={handleRetry}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Intentar de Nuevo
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-blue-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-2xl font-bold text-blue-600">{record}</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Presiona la Tecla Correcta</h2>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Tiempo</p>
            <p className="text-2xl font-bold text-blue-600">{timeLeft}s</p>
          </div>
        </div>
        <div className="text-8xl font-bold text-blue-600 mb-8 p-6 bg-blue-100 rounded-2xl">
          {currentKey}
        </div>
        <p className="text-2xl text-gray-600 mb-8">Puntuación: {score}</p>
        {feedback && <p className={`text-xl font-bold mb-4 ${feedback.includes("Correcto") ? "text-green-600" : "text-red-600"}`}>{feedback}</p>}

        <button
          onClick={onBack}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Volver
        </button>
      </Card>
    </div>
  )
}

function BalloonWordsGame({ onBack }: { onBack: () => void }) {
  const words = ["Programación", "Educación", "Computadora", "Velocidad", "Mecanografía"]
  const [currentWord, setCurrentWord] = useState(words[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [balloonHeight, setBalloonHeight] = useState(20)
  const [balloonBurst, setBalloonBurst] = useState(false)
  const [burstMessage, setBurstMessage] = useState("")
  const [showRestartBtn, setShowRestartBtn] = useState(false)

  useEffect(() => {
    const savedRecord = localStorage.getItem("balloonWordsRecord")
    if (savedRecord) {
      setRecord(parseInt(savedRecord))
    }
  }, [])

  useEffect(() => {
    if (record > 0) {
      localStorage.setItem("balloonWordsRecord", record.toString())
    }
  }, [record])

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  useEffect(() => {
    if (balloonBurst) return

    const interval = setInterval(() => {
      setBalloonHeight((prev) => {
        if (prev >= 100) {
          setBalloonBurst(true)
          setBurstMessage("¡Se reventó el globo! ¡Fallaste! 💥")
          setShowRestartBtn(true)
          if (score > record) {
            setRecord(score)
          }
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [balloonBurst, score, record])

  const handleSubmit = () => {
    if (removeAccents(input.toLowerCase()) === removeAccents(currentWord.toLowerCase())) {
      setScore(score + 1)
      setCurrentWord(words[Math.floor(Math.random() * words.length)])
      setInput("")
      setBalloonHeight(20)
      setBalloonBurst(false)
      setBurstMessage("")
      setShowRestartBtn(false)
    }
  }

  const handleRestart = () => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)])
    setInput("")
    setBalloonHeight(20)
    setBalloonBurst(false)
    setBurstMessage("")
    setShowRestartBtn(false)
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-pink-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-pink-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-2xl font-bold text-pink-600">{record}</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Escribe Antes de Explotar</h2>
          <div className="w-24"></div>
        </div>
        <div className="flex justify-center mb-8 h-64 items-center">
          {!balloonBurst ? (
            <div
              className="bg-gradient-to-b from-pink-300 to-pink-500 rounded-full text-white font-bold flex items-center justify-center transition-all duration-200"
              style={{ width: `${balloonHeight * 2}px`, height: `${balloonHeight * 2}px` }}
            >
              {balloonHeight < 100 && "🎈"}
            </div>
          ) : (
            <div className="text-6xl animate-bounce">💥</div>
          )}
        </div>
        {burstMessage && (
          <p className="text-2xl font-bold text-red-600 mb-4 animate-pulse">{burstMessage}</p>
        )}
        <p className="text-2xl font-bold text-gray-900 mb-6">{currentWord}</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Escribe la palabra..."
          className="w-full px-6 py-3 border-2 border-pink-300 rounded-xl mb-4 text-center text-black"
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />
        <p className="text-2xl text-gray-600 mb-4">Puntuación: {score}</p>
        {showRestartBtn && (
          <button
            onClick={handleRestart}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Reintentar
          </button>
        )}
        <button
          onClick={onBack}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Abandonar Juego
        </button>
      </Card>
    </div>
  )
}

function CapitalNamesGame({ onBack }: { onBack: () => void }) {
  const names = [
    { text: "carlos", correct: "Carlos" },
    { text: "maría", correct: "María" },
    { text: "juan", correct: "Juan" },
    { text: "ana", correct: "Ana" },
    { text: "pedro", correct: "Pedro" },
  ]

  const [currentName, setCurrentName] = useState(names[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [feedbackType, setFeedbackType] = useState<"correct" | "incorrect" | "">("")

  const handleCheck = () => {
    if (input === currentName.correct) {
      setScore(score + 1)
      setFeedback("¡Excelente!")
      setFeedbackType("correct")
    } else {
      setFeedback(`Incorrecto: ${currentName.correct}`)
      setFeedbackType("incorrect")
    }
    setTimeout(() => {
      setCurrentName(names[Math.floor(Math.random() * names.length)])
      setInput("")
      setFeedback("")
      setFeedbackType("")
    }, 1500)
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Corrige Nombres Propios</h2>
        <p className="text-2xl font-bold text-gray-900 mb-8">Escribe con mayúscula correcta:</p>
        <p className="text-4xl font-bold text-purple-600 mb-8 bg-purple-100 p-6 rounded-2xl">
          {currentName.text}
        </p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
          placeholder="Tu respuesta..."
          className="w-full px-6 py-3 border-2 border-purple-300 rounded-xl mb-4 text-center text-lg text-black"
        />
        {feedback && (
          <p className={`text-xl font-bold mb-4 ${feedbackType === "correct" ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}
        <p className="text-2xl text-gray-600 mb-4">Puntuación: {score}</p>
        <button
          onClick={handleCheck}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl mr-2 transition-all duration-300"
        >
          Verificar
        </button>
        <button
          onClick={onBack}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Abandonar Curso
        </button>
      </Card>
    </div>
  )
}

function InitiateSentencesGame({ onBack }: { onBack: () => void }) {
  const sentences = [
    { incomplete: "Hol hola, ¿cómo estás?", correct: "Hola hola, ¿cómo estás?" },
    { incomplete: "La escuela es un lugar importante.", correct: "La escuela es un lugar importante." },
    { incomplete: "El libro está sobre la mesa.", correct: "El libro está sobre la mesa." },
    { incomplete: "Cada día aprendo algo nuevo.", correct: "Cada día aprendo algo nuevo." },
    { incomplete: "Iré al parque después de clases.", correct: "Iré al parque después de clases." },
  ]

  const [currentSentence, setCurrentSentence] = useState(sentences[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [feedbackType, setFeedbackType] = useState<"correct" | "incorrect" | "">("")

  const handleCheck = () => {
    if (input === currentSentence.correct) {
      setScore(score + 1)
      setFeedback("¡Correcto!")
      setFeedbackType("correct")
    } else {
      setFeedback(`Debería ser: ${currentSentence.correct}`)
      setFeedbackType("incorrect")
    }
    setTimeout(() => {
      setCurrentSentence(sentences[Math.floor(Math.random() * sentences.length)])
      setInput("")
      setFeedback("")
      setFeedbackType("")
    }, 1500)
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-amber-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Inicia Oraciones</h2>
        <p className="text-2xl font-bold text-gray-900 mb-8">Completa con mayúscula inicial:</p>
        <p className="text-4xl font-bold text-amber-600 mb-8 bg-amber-100 p-6 rounded-2xl font-mono">
          {currentSentence.incomplete}
        </p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
          placeholder="Tu respuesta..."
          className="w-full px-6 py-3 border-2 border-amber-300 rounded-xl mb-4 text-center text-lg text-black"
        />
        {feedback && (
          <p className={`text-xl font-bold mb-4 ${feedbackType === "correct" ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}
        <p className="text-2xl text-gray-600 mb-4">Puntuación: {score}</p>
        <button
          onClick={handleCheck}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl mr-2 transition-all duration-300"
        >
          Verificar
        </button>
        <button
          onClick={onBack}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Abandonar Curso
        </button>
      </Card>
    </div>
  )
}

function CitiesCountriesGame({ onBack }: { onBack: () => void }) {
  const places = [
    { text: "perú", correct: "Perú" },
    { text: "lima", correct: "Lima" },
    { text: "españa", correct: "España" },
    { text: "madrid", correct: "Madrid" },
    { text: "méxico", correct: "México" },
  ]

  const [currentPlace, setCurrentPlace] = useState(places[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [feedbackType, setFeedbackType] = useState<"correct" | "incorrect" | "">("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [record, setRecord] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const savedRecord = localStorage.getItem("citiesCountriesRecord")
    if (savedRecord) {
      setRecord(parseInt(savedRecord))
    }
  }, [])

  useEffect(() => {
    if (record > 0) {
      localStorage.setItem("citiesCountriesRecord", record.toString())
    }
  }, [record])

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          if (score > record) {
            setRecord(score)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, score, record])

  const handleCheck = () => {
    if (!gameActive) return

    if (input === currentPlace.correct) {
      setScore(score + 1)
      setFeedback("¡Excelente!")
      setFeedbackType("correct")
    } else {
      setIncorrect(incorrect + 1)
      setFeedback(`Incorrecto: ${currentPlace.correct}`)
      setFeedbackType("incorrect")
    }
    setTimeout(() => {
      setCurrentPlace(places[Math.floor(Math.random() * places.length)])
      setInput("")
      setFeedback("")
      setFeedbackType("")
    }, 1500)
  }

  const handleStart = () => {
    setGameStarted(true)
    setGameActive(true)
    setTimeLeft(30)
    setScore(0)
    setIncorrect(0)
    setCurrentPlace(places[Math.floor(Math.random() * places.length)])
  }

  if (!gameStarted && !gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-yellow-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ciudades y Países</h2>
          <div className="bg-yellow-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-3xl font-bold text-yellow-600">{record}</p>
          </div>
          <button
            onClick={handleStart}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Empezar Juego
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  if (!gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-yellow-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">¡Tiempo Terminado!</h2>
          <p className="text-2xl text-gray-600 mb-4">Correctas: {score}</p>
          <p className="text-2xl text-yellow-600 mb-8">Record: {record}</p>
          <button
            onClick={() => {
              setGameStarted(false)
              setScore(0)
              setIncorrect(0)
            }}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Jugar de Nuevo
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-yellow-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-2xl font-bold text-yellow-600">{record}</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Ciudades y Países</h2>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Tiempo</p>
            <p className="text-2xl font-bold text-yellow-600">{timeLeft}s</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Correctas</p>
            <p className="text-2xl font-bold text-green-600">{score}</p>
          </div>
          <div></div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Incorrectas</p>
            <p className="text-2xl font-bold text-red-600">{incorrect}</p>
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-900 mb-8">Escribe con mayúscula correcta:</p>
        <p className="text-4xl font-bold text-yellow-600 mb-8 bg-yellow-100 p-6 rounded-2xl">
          {currentPlace.text}
        </p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
          placeholder="Tu respuesta..."
          className="w-full px-6 py-3 border-2 border-yellow-300 rounded-xl mb-4 text-center text-lg text-black"
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />
        {feedback && (
          <p className={`text-xl font-bold mb-4 ${feedbackType === "correct" ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}
        <button
          onClick={handleCheck}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
        >
          Verificar
        </button>
        <button
          onClick={onBack}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Abandonar Curso
        </button>
      </Card>
    </div>
  )
}

function SpeedRacingGame({ onBack }: { onBack: () => void }) {
  const phrases = [
    "El gato duerme en la casa",
    "Voy al parque después de la escuela",
    "La naturaleza es muy hermosa",
    "Los libros nos ayudan a aprender",
    "Hoy es un día especial",
    "Me encanta jugar con mis amigos",
    "El cielo está azul hoy",
    "Tengo hambre de pizza",
    "Mi familia es lo más importante",
    "Aprender es divertido",
    "El perro corre en el jardín",
    "Comemos frutas todos los días",
  ]

  const [currentPhrase, setCurrentPhrase] = useState(phrases[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameActive, setGameActive] = useState(true)

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  const handleSubmit = () => {
    if (!gameActive) return

    if (input.toLowerCase() === currentPhrase.toLowerCase()) {
      setScore(score + 1)
      setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)])
      setInput("")
    }
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Carrera de Velocidad</h2>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-purple-100 p-6 rounded-xl">
            <p className="text-gray-600 mb-2">Tiempo</p>
            <p className="text-4xl font-bold text-purple-600">{timeLeft}s</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-xl">
            <p className="text-gray-600 mb-2">Palabras</p>
            <p className="text-4xl font-bold text-purple-600">{score}</p>
          </div>
        </div>

        {gameActive ? (
          <>
            <p className="text-2xl font-bold text-gray-900 mb-6 bg-purple-100 p-4 rounded-xl">
              {currentPhrase}
            </p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Escribe la frase y presiona Enter..."
              className="w-full px-6 py-3 border-2 border-purple-300 rounded-xl mb-4 text-center text-lg text-black"
              autoFocus
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
            />
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Enviar
              </button>
              <button
                onClick={onBack}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Abandonar Juego
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-8 rounded-xl">
              <p className="text-gray-600 mb-2">¡JUEGO TERMINADO!</p>
              <p className="text-4xl font-bold text-purple-600">
                {score} palabras escritas
              </p>
              <p className="text-xl text-gray-700 mt-4">¡Excelente velocidad!</p>
            </div>
            <button
              onClick={onBack}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 w-full"
            >
              Volver
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}

function RiddlesGame({ onBack }: { onBack: () => void }) {
  const riddles = [
    { text: "Tengo números pero no tengo letras. ¿Qué soy?", answer: "reloj" },
    { text: "Tengo hojas pero no soy árbol. ¿Qué soy?", answer: "libro" },
    { text: "Brillo en el cielo pero no soy el sol. ¿Qué soy?", answer: "estrella" },
    { text: "Tengo ciudades pero no tengo casas. ¿Qué soy?", answer: "mapa" },
    { text: "Cuanto más quitas, más grande me hago. ¿Qué soy?", answer: "hoyo" },
    { text: "Tengo raíz pero no soy planta. ¿Qué soy?", answer: "número" },
    { text: "Todos me pueden ver, pero no me pueden tocar. ¿Qué soy?", answer: "reflejo" },
    { text: "Hablo sin boca y escucho sin oídos. ¿Quién soy?", answer: "eco" },
    { text: "Subo y bajo pero no me muevo. ¿Qué soy?", answer: "temperatura" },
    { text: "Tengo cuello pero no tengo cabeza. ¿Qué soy?", answer: "botella" },
    { text: "Corro pero nunca camino. ¿Qué soy?", answer: "río" },
    { text: "Tengo cabeza y cola pero no soy animal. ¿Qué soy?", answer: "moneda" },
  ]

  const [currentRiddle, setCurrentRiddle] = useState(riddles[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  const getHint = () => {
    if (currentRiddle.answer.length === 0) return ""
    const first = currentRiddle.answer[0].toUpperCase()
    const last = currentRiddle.answer[currentRiddle.answer.length - 1].toUpperCase()
    return `${first}...${last}`
  }

  const handleSubmit = () => {
    if (removeAccents(input.toLowerCase()) === removeAccents(currentRiddle.answer.toLowerCase())) {
      setScore(score + 1)
      setCurrentRiddle(riddles[Math.floor(Math.random() * riddles.length)])
      setInput("")
      setShowAnswer(false)
      setShowHint(false)
    }
  }

  const handleShowAnswer = () => {
    setShowAnswer(true)
  }

  const handleNextRiddle = () => {
    setCurrentRiddle(riddles[Math.floor(Math.random() * riddles.length)])
    setInput("")
    setShowAnswer(false)
    setShowHint(false)
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-green-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Adivina la Adivinanza</h2>
        <p className="text-2xl text-gray-700 mb-8">{currentRiddle.text}</p>

        {!showAnswer ? (
          <>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Tu respuesta..."
              className="w-full px-6 py-3 border-2 border-green-300 rounded-xl mb-4 text-center text-black"
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
            />
            {showHint && (
              <p className="text-lg text-orange-600 font-bold mb-4">Pista: {getHint()}</p>
            )}
            <div className="flex gap-4 mb-4">
              <button
                onClick={handleSubmit}
                disabled={!input}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Verificar
              </button>
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
              >
                {showHint ? "Ocultar Pista" : "Pista"}
              </button>
              <button
                onClick={handleShowAnswer}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
              >
                Dar Respuesta
              </button>
            </div>
          </>
        ) : (
          <div className="bg-green-100 p-6 rounded-xl mb-4">
            <p className="text-2xl font-bold text-green-700 mb-4">
              La respuesta es: <span className="text-3xl">{currentRiddle.answer}</span>
            </p>
            <button
              onClick={handleNextRiddle}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
            >
              Siguiente Adivinanza
            </button>
          </div>
        )}

        <p className="text-2xl text-gray-600 mb-4">Adivinadas: {score}</p>
        <button
          onClick={onBack}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Abandonar Juego
        </button>
      </Card>
    </div>
  )
}

function MotivationalGame({ onBack }: { onBack: () => void }) {
  const phrases = [
    "Cada día es una nueva oportunidad",
    "El esfuerzo siempre tiene recompensa",
    "Tú puedes lograr lo que te propongas",
    "La práctica hace el maestro",
    "Nunca es tarde para aprender",
  ]

  const [currentPhrase, setCurrentPhrase] = useState(phrases[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    const savedRecord = localStorage.getItem("motivationalRecord")
    if (savedRecord) {
      setRecord(parseInt(savedRecord))
    }
  }, [])

  useEffect(() => {
    if (record > 0) {
      localStorage.setItem("motivationalRecord", record.toString())
    }
  }, [record])

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setFeedback("")
    setIsCorrect(false)

    if (value.length > 0) {
      const expectedChars = currentPhrase.slice(0, value.length)
      if (removeAccents(value) === removeAccents(expectedChars)) {
        if (removeAccents(value) === removeAccents(currentPhrase)) {
          setIsCorrect(true)
          setFeedback("¡Excelente! Frase copiada correctamente")
        }
      } else {
        setFeedback("✗ Mal - La letra no coincide")
        setTimeout(() => {
          setInput("")
          setFeedback("")
          setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)])
        }, 1500)
      }
    }
  }

  const handleSubmit = () => {
    if (isCorrect) {
      const newScore = score + 1
      setScore(newScore)
      if (newScore > record) {
        setRecord(newScore)
      }
      setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)])
      setInput("")
      setFeedback("")
      setIsCorrect(false)
    }
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Frases Motivadoras</h2>
        <div className="bg-purple-100 p-4 rounded-lg mb-6 inline-block">
          <p className="text-gray-600 text-sm">Record</p>
          <p className="text-2xl font-bold text-purple-600">{record}</p>
        </div>
        <p className="text-xl text-purple-700 mb-8 italic font-semibold">{currentPhrase}</p>
        <div className="relative mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Copia la frase aquí..."
            className={`w-full px-6 py-4 border-2 rounded-xl text-lg ${
              feedback.includes("Mal")
                ? "border-red-500 bg-red-50"
                : "border-purple-300"
            }`}
            autoFocus
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
          />
          <div className="absolute right-4 top-4 text-2xl">
            {isCorrect && "✓"}
          </div>
        </div>
        {feedback && (
          <p className={`text-lg font-bold mb-4 ${feedback.includes("Mal") ? "text-red-600" : "text-green-600"}`}>
            {feedback}
          </p>
        )}
        <div className="flex gap-4">
          {isCorrect && (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
            >
              Siguiente Frase
            </button>
          )}
          <button
            onClick={onBack}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Abandonar Juego
          </button>
        </div>
      </Card>
    </div>
  )
}

function PoemsGame({ onBack }: { onBack: () => void }) {
  const poems = [
    {
      text: "Rosas rojas, violetas azules,\nLa vida es un regalo hermoso y profundo",
      hint: "Un poema sobre la vida"
    },
    {
      text: "Mariposas vuelan,\nBajando al jardín,\nDanzando con gracia",
      hint: "Versos sobre mariposas"
    },
    {
      text: "Las estrellas brillan,\nEn la noche oscura,\nIluminan el camino",
      hint: "Versos nocturnos"
    },
    {
      text: "El sol se levanta,\nTrayendo esperanza,\nPara un nuevo día",
      hint: "Versos del amanecer"
    }
  ]

  const [currentPoem, setCurrentPoem] = useState(poems[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    const savedRecord = localStorage.getItem("poemsRecord")
    if (savedRecord) {
      setRecord(parseInt(savedRecord))
    }
  }, [])

  useEffect(() => {
    if (record > 0) {
      localStorage.setItem("poemsRecord", record.toString())
    }
  }, [record])

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setFeedback("")
    setIsCorrect(false)

    if (value.length > 0) {
      const expectedChars = currentPoem.text.slice(0, value.length)
      if (removeAccents(value) === removeAccents(expectedChars)) {
        if (removeAccents(value) === removeAccents(currentPoem.text)) {
          setIsCorrect(true)
          setFeedback("¡Perfecto! Verso copiado correctamente")
        }
      } else {
        setFeedback("✗ Mal - No coincide con el verso")
        setTimeout(() => {
          setInput("")
          setFeedback("")
          setCurrentPoem(poems[Math.floor(Math.random() * poems.length)])
        }, 1500)
      }
    }
  }

  const handleSubmit = () => {
    if (isCorrect) {
      const newScore = score + 1
      setScore(newScore)
      if (newScore > record) {
        setRecord(newScore)
      }
      setCurrentPoem(poems[Math.floor(Math.random() * poems.length)])
      setInput("")
      setFeedback("")
      setIsCorrect(false)
    }
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-indigo-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pequeños Versos</h2>
        <div className="flex gap-4 justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-2xl font-bold text-indigo-600">{record}</p>
          </div>
          <div className="bg-indigo-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Correctos</p>
            <p className="text-2xl font-bold text-indigo-600">{score}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-8 italic">{currentPoem.hint}</p>

        <div className="bg-indigo-100 p-8 rounded-xl mb-8 whitespace-pre-wrap font-mono text-lg text-indigo-900 leading-relaxed">
          {currentPoem.text}
        </div>

        <div className="relative mb-6">
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Copia el verso aquí (incluye saltos de línea)..."
            className={`w-full px-6 py-4 border-2 rounded-xl text-base h-32 resize-none ${
              feedback.includes("Mal")
                ? "border-red-500 bg-red-50"
                : "border-indigo-300"
            }`}
            autoFocus
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
          />
        </div>

        {feedback && (
          <p className={`text-lg font-bold mb-4 ${feedback.includes("Mal") ? "text-red-600" : "text-green-600"}`}>
            {feedback}
          </p>
        )}

        <div className="flex gap-4">
          {isCorrect && (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
            >
              Siguiente Verso
            </button>
          )}

          <button
            onClick={onBack}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Abandonar Juego
          </button>
        </div>
      </Card>
    </div>
  )
}

function CompleteWordsGame({ onBack }: { onBack: () => void }) {
  const words = [
    { incomplete: "ca_a", complete: "casa" },
    { incomplete: "pe_ro", complete: "perro" },
    { incomplete: "ma_iposa", complete: "mariposa" },
    { incomplete: "pa_oma", complete: "paloma" },
    { incomplete: "li_ro", complete: "libro" },
    { incomplete: "es_uela", complete: "escuela" },
    { incomplete: "me_a", complete: "mesa" },
    { incomplete: "so_", complete: "sola" },
    { incomplete: "pla_a", complete: "planta" },
    { incomplete: "ni_o", complete: "niño" },
    { incomplete: "a_ul", complete: "azul" },
    { incomplete: "gat_", complete: "gato" },
  ]

  const [currentWord, setCurrentWord] = useState(words[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const savedRecord = localStorage.getItem("completeWordsRecord")
    if (savedRecord) {
      setRecord(parseInt(savedRecord))
    }
  }, [])

  useEffect(() => {
    if (record > 0) {
      localStorage.setItem("completeWordsRecord", record.toString())
    }
  }, [record])

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          if (score > record) {
            setRecord(score)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, score, record])

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  const handleCheck = () => {
    if (!gameActive) return

    if (removeAccents(input.toLowerCase()) === removeAccents(currentWord.complete.toLowerCase())) {
      setScore(score + 1)
      setFeedback("¡Correcto!")
      setCurrentWord(words[Math.floor(Math.random() * words.length)])
      setInput("")
    } else {
      setFeedback(`Incorrecto: ${currentWord.complete}`)
    }

    setTimeout(() => {
      setFeedback("")
    }, 1500)
  }

  const handleStart = () => {
    setGameStarted(true)
    setGameActive(true)
    setTimeLeft(30)
    setScore(0)
  }

  if (!gameStarted && !gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-cyan-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Completa la Palabra</h2>
          <div className="bg-cyan-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-3xl font-bold text-cyan-600">{record}</p>
          </div>
          <button
            onClick={handleStart}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Empezar Juego
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  if (!gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-cyan-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">¡Tiempo Terminado!</h2>
          <p className="text-2xl text-cyan-600 mb-8">Record: {record}</p>
          <button
            onClick={() => setGameStarted(false)}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Jugar de Nuevo
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-cyan-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-cyan-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-2xl font-bold text-cyan-600">{record}</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Completa la Palabra</h2>
          <div className="bg-cyan-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Tiempo</p>
            <p className="text-2xl font-bold text-cyan-600">{timeLeft}s</p>
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-900 mb-8">Completa la palabra:</p>
        <p className="text-4xl font-bold text-cyan-600 mb-8 bg-cyan-100 p-6 rounded-2xl font-mono">
          {currentWord.incomplete}
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
          placeholder="Tu respuesta..."
          className="w-full px-6 py-3 border-2 border-cyan-300 rounded-xl mb-4 text-center text-lg text-black"
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />

        {feedback && (
          <p className={`text-xl font-bold mb-4 ${feedback.includes("Correcto") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}

        <p className="text-2xl text-gray-600 mb-4">Puntuación: {score}</p>

        <button
          onClick={handleCheck}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
        >
          Verificar
        </button>
        <button
          onClick={onBack}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Abandonar Juego
        </button>
      </Card>
    </div>
  )
}

function DivideSyllablesGame({ onBack }: { onBack: () => void }) {
  const words = [
    { text: "mariposa", correct: "ma-ri-po-sa" },
    { text: "escuela", correct: "es-cue-la" },
    { text: "computadora", correct: "com-pu-ta-do-ra" },
    { text: "libro", correct: "li-bro" },
    { text: "semana", correct: "se-ma-na" },
    { text: "música", correct: "mú-si-ca" },
    { text: "teléfono", correct: "te-lé-fo-no" },
  ]

  const [currentWord, setCurrentWord] = useState(words[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const savedRecord = localStorage.getItem("divideSyllablesRecord")
    if (savedRecord) {
      setRecord(parseInt(savedRecord))
    }
  }, [])

  useEffect(() => {
    if (record > 0) {
      localStorage.setItem("divideSyllablesRecord", record.toString())
    }
  }, [record])

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          if (score > record) {
            setRecord(score)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, score, record])

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  const handleCheck = () => {
    if (!gameActive) return

    if (removeAccents(input.toLowerCase()) === removeAccents(currentWord.correct.toLowerCase())) {
      setScore(score + 1)
      setFeedback("¡Correcto!")
      setCurrentWord(words[Math.floor(Math.random() * words.length)])
      setInput("")
    } else {
      setFeedback(`Incorrecto: ${currentWord.correct}`)
    }

    setTimeout(() => {
      setFeedback("")
    }, 1500)
  }

  const handleStart = () => {
    setGameStarted(true)
    setGameActive(true)
    setTimeLeft(30)
    setScore(0)
  }

  if (!gameStarted && !gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-teal-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Divide en Sílabas</h2>
          <div className="bg-teal-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-3xl font-bold text-teal-600">{record}</p>
          </div>
          <button
            onClick={handleStart}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Empezar Juego
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  if (!gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-teal-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">¡Tiempo Terminado!</h2>
          <p className="text-2xl text-teal-600 mb-8">Record: {record}</p>
          <button
            onClick={() => setGameStarted(false)}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Jugar de Nuevo
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-teal-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-teal-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-2xl font-bold text-teal-600">{record}</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Divide en Sílabas</h2>
          <div className="bg-teal-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Tiempo</p>
            <p className="text-2xl font-bold text-teal-600">{timeLeft}s</p>
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-900 mb-8">Divide en sílabas con guiones:</p>
        <p className="text-4xl font-bold text-teal-600 mb-8 bg-teal-100 p-6 rounded-2xl">
          {currentWord.text}
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
          placeholder="ejemplo: ma-ri-po-sa"
          className="w-full px-6 py-3 border-2 border-teal-300 rounded-xl mb-4 text-center text-lg text-black"
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />

        {feedback && (
          <p className={`text-xl font-bold mb-4 ${feedback.includes("Correcto") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}

        <p className="text-2xl text-gray-600 mb-4">Puntuación: {score}</p>

        <button
          onClick={handleCheck}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
        >
          Verificar
        </button>
        <button
          onClick={onBack}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Abandonar Juego
        </button>
      </Card>
    </div>
  )
}

function OrderLettersGame({ onBack }: { onBack: () => void }) {
  const words = [
    { scrambled: "lapaoms", complete: "palomas" },
    { scrambled: "riblo", complete: "libro" },
    { scrambled: "aasc", complete: "casa" },
    { scrambled: "aroflm", complete: "flamor" },
    { scrambled: "rosif", complete: "friso" },
    { scrambled: "napla", complete: "plana" },
    { scrambled: "gota", complete: "gato" },
    { scrambled: "acifr", complete: "fracas" },
    { scrambled: "telah", complete: "lateh" },
    { scrambled: "norma", complete: "monar" },
  ]

  const [currentWord, setCurrentWord] = useState(words[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const savedRecord = localStorage.getItem("orderLettersRecord")
    if (savedRecord) {
      setRecord(parseInt(savedRecord))
    }
  }, [])

  useEffect(() => {
    if (record > 0) {
      localStorage.setItem("orderLettersRecord", record.toString())
    }
  }, [record])

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          if (score > record) {
            setRecord(score)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, score, record])

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  const handleCheck = () => {
    if (!gameActive) return

    if (removeAccents(input.toLowerCase()) === removeAccents(currentWord.complete.toLowerCase())) {
      setScore(score + 1)
      setFeedback("¡Correcto!")
      setCurrentWord(words[Math.floor(Math.random() * words.length)])
      setInput("")
      setShowHint(false)
    } else {
      setFeedback(`Incorrecto: ${currentWord.complete}`)
    }

    setTimeout(() => {
      setFeedback("")
    }, 1500)
  }

  const handleStart = () => {
    setGameStarted(true)
    setGameActive(true)
    setTimeLeft(30)
    setScore(0)
  }

  const getHint = () => {
    setShowHint(true)
  }

  if (!gameStarted && !gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ordena las Letras</h2>
          <div className="bg-purple-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-3xl font-bold text-purple-600">{record}</p>
          </div>
          <button
            onClick={handleStart}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Empezar Juego
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  if (!gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">¡Tiempo Terminado!</h2>
          <p className="text-2xl text-purple-600 mb-8">Record: {record}</p>
          <button
            onClick={() => setGameStarted(false)}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Jugar de Nuevo
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-2xl font-bold text-purple-600">{record}</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Ordena las Letras</h2>
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Tiempo</p>
            <p className="text-2xl font-bold text-purple-600">{timeLeft}s</p>
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-900 mb-8">Ordena las letras para formar la palabra:</p>
        <p className="text-4xl font-bold text-purple-600 mb-8 bg-purple-100 p-6 rounded-2xl font-mono">
          {currentWord.scrambled}
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
          placeholder="Tu respuesta..."
          className="w-full px-6 py-3 border-2 border-purple-300 rounded-xl mb-4 text-center text-lg text-black"
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />

        {showHint && (
          <p className="text-lg font-bold text-blue-600 mb-4">
            Pista: Comienza con "{currentWord.complete.substring(0, 2)}"
          </p>
        )}

        {feedback && (
          <p className={`text-xl font-bold mb-4 ${feedback.includes("Correcto") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}

        <p className="text-2xl text-gray-600 mb-4">Puntuación: {score}</p>

        <button
          onClick={getHint}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 mb-4"
        >
          Pista
        </button>

        <button
          onClick={handleCheck}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
        >
          Verificar
        </button>
        <button
          onClick={onBack}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Abandonar Juego
        </button>
      </Card>
    </div>
  )
}

function NumberSeriesGame({ onBack }: { onBack: () => void }) {
  const series = [
    { text: "2, 4, 6, __, __, 12", correct: "8, 10" },
    { text: "1, 3, 5, __, __, 11", correct: "7, 9" },
    { text: "10, 20, 30, __, __, 60", correct: "40, 50" },
    { text: "5, 10, 15, __, __, 30", correct: "20, 25" },
    { text: "3, 6, 9, __, __, 18", correct: "12, 15" },
    { text: "100, 90, 80, __, __, 50", correct: "70, 60" },
    { text: "2, 4, 8, __, __, 32", correct: "16, " }, // Corrected: Only one value missing based on pattern
    { text: "1, 4, 9, __, __, 36", correct: "16, 25" },
    { text: "50, 45, 40, __, __, 25", correct: "35, 30" },
    { text: "11, 22, 33, __, __, 66", correct: "44, 55" },
    { text: "15, 30, 45, __, __, 90", correct: "60, 75" },
    { text: "7, 14, 21, __, __, 42", correct: "28, 35" },
    { text: "25, 20, 15, __, __, 0", correct: "10, 5" },
    { text: "6, 12, 18, __, __, 36", correct: "24, 30" },
    { text: "9, 18, 27, __, __, 54", correct: "36, 45" },
  ]

  const [currentSeries, setCurrentSeries] = useState(series[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const savedRecord = localStorage.getItem("numberSeriesRecord")
    if (savedRecord) {
      setRecord(parseInt(savedRecord))
    }
  }, [])

  useEffect(() => {
    if (record > 0) {
      localStorage.setItem("numberSeriesRecord", record.toString())
    }
  }, [record])

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          if (score > record) {
            setRecord(score)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, score, record])

  const handleCheck = () => {
    if (!gameActive) return

    if (input.replace(/\s/g, "") === currentSeries.correct.replace(/\s/g, "")) {
      setScore(score + 1)
      setFeedback("¡Correcto!")
      setCurrentSeries(series[Math.floor(Math.random() * series.length)])
      setInput("")
    } else {
      setFeedback(`Incorrecto: ${currentSeries.correct}`)
    }

    setTimeout(() => {
      setFeedback("")
    }, 1500)
  }

  const handleStart = () => {
    setGameStarted(true)
    setGameActive(true)
    setTimeLeft(30)
    setScore(0)
  }

  if (!gameStarted && !gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-orange-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Series Numéricas</h2>
          <div className="bg-orange-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-3xl font-bold text-orange-600">{record}</p>
          </div>
          <button
            onClick={handleStart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Empezar Juego
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  if (!gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-orange-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">¡Tiempo Terminado!</h2>
          <p className="text-2xl text-orange-600 mb-8">Record: {record}</p>
          <button
            onClick={() => setGameStarted(false)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Jugar de Nuevo
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-orange-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-orange-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-2xl font-bold text-orange-600">{record}</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Series Numéricas</h2>
          <div className="bg-orange-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Tiempo</p>
            <p className="text-2xl font-bold text-orange-600">{timeLeft}s</p>
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-900 mb-8">Completa la serie numérica:</p>
        <p className="text-3xl font-bold text-orange-600 mb-8 bg-orange-100 p-6 rounded-2xl font-mono">
          {currentSeries.text}
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
          placeholder="ejemplo: 8, 10"
          className="w-full px-6 py-3 border-2 border-orange-300 rounded-xl mb-4 text-center text-lg text-black"
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />

        {feedback && (
          <p className={`text-xl font-bold mb-4 ${feedback.includes("Correcto") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}

        <p className="text-2xl text-gray-600 mb-4">Puntuación: {score}</p>

        <button
          onClick={handleCheck}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
        >
          Verificar
        </button>
        <button
          onClick={onBack}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Abandonar Juego
        </button>
      </Card>
    </div>
  )
}

function CopyOperationsGame({ onBack }: { onBack: () => void }) {
  const operations = [
    { text: "7 + 3 = 10" },
    { text: "15 - 5 = 10" },
    { text: "6 × 2 = 12" },
    { text: "20 ÷ 4 = 5" },
    { text: "8 + 6 = 14" },
    { text: "25 - 10 = 15" },
    { text: "5 × 5 = 25" },
    { text: "30 ÷ 5 = 6" },
    { text: "12 + 8 = 20" },
    { text: "100 - 45 = 55" },
    { text: "9 × 3 = 27" },
    { text: "16 ÷ 2 = 8" },
    { text: "11 + 9 = 20" },
    { text: "50 - 25 = 25" },
    { text: "7 × 4 = 28" },
    { text: "36 ÷ 6 = 6" },
    { text: "13 + 7 = 20" },
    { text: "60 - 35 = 25" },
  ]

  const [currentOp, setCurrentOp] = useState(operations[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const savedRecord = localStorage.getItem("copyOperationsRecord")
    if (savedRecord) {
      setRecord(parseInt(savedRecord))
    }
  }, [])

  useEffect(() => {
    if (record > 0) {
      localStorage.setItem("copyOperationsRecord", record.toString())
    }
  }, [record])

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          if (score > record) {
            setRecord(score)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, score, record])

  const handleCheck = () => {
    if (!gameActive) return

    if (input === currentOp.text) {
      setScore(score + 1)
      setFeedback("¡Correcto!")
      setCurrentOp(operations[Math.floor(Math.random() * operations.length)])
      setInput("")
    } else {
      setFeedback(`Incorrecto: ${currentOp.text}`)
    }

    setTimeout(() => {
      setFeedback("")
    }, 1500)
  }

  const handleStart = () => {
    setGameStarted(true)
    setGameActive(true)
    setTimeLeft(30)
    setScore(0)
  }

  if (!gameStarted && !gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-red-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Copia Operaciones</h2>
          <div className="bg-red-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-3xl font-bold text-red-600">{record}</p>
          </div>
          <button
            onClick={handleStart}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Empezar Juego
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  if (!gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-red-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">¡Tiempo Terminado!</h2>
          <p className="text-2xl text-red-600 mb-8">Record: {record}</p>
          <button
            onClick={() => setGameStarted(false)}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Jugar de Nuevo
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-red-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-2xl font-bold text-red-600">{record}</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Copia Operaciones</h2>
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Tiempo</p>
            <p className="text-2xl font-bold text-red-600">{timeLeft}s</p>
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-900 mb-8">Copia la operación matemática:</p>
        <p className="text-4xl font-bold text-red-600 mb-8 bg-red-100 p-6 rounded-2xl font-mono">
          {currentOp.text}
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
          placeholder="Copia aquí..."
          className="w-full px-6 py-3 border-2 border-red-300 rounded-xl mb-4 text-center text-lg text-black"
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />

        {feedback && (
          <p className={`text-xl font-bold mb-4 ${feedback.includes("Correcto") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}

        <p className="text-2xl text-gray-600 mb-4">Puntuación: {score}</p>

        <button
          onClick={handleCheck}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
        >
          Verificar
        </button>
        <button
          onClick={onBack}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Abandonar Juego
        </button>
      </Card>
    </div>
  )
}

function MathProblemsGame({ onBack }: { onBack: () => void }) {
  const problems = [
    { text: "Juan tiene 5 manzanas y María le da 3 más. ¿Cuántas tiene?", answer: "8" },
    { text: "Si tienes 20 caramelos y regalas 5, ¿cuántos te quedan?", answer: "15" },
    { text: "Ana compra 4 bolsas de 2 lápices cada una. ¿Cuántos lápices tiene?", answer: "8" },
    { text: "Hay 12 niños. Si se dividen en 3 grupos, ¿cuántos en cada grupo?", answer: "4" },
    { text: "Un libro cuesta 10 pesos y un bolígrafo 2 pesos. ¿Cuánto cuestan los dos?", answer: "12" },
    { text: "Sara tiene 7 años y su hermano tiene 5 años más. ¿Cuántos años tiene el hermano?", answer: "12" },
    { text: "En una granja hay 24 gallinas. Si se venden la mitad, ¿cuántas quedan?", answer: "12" },
    { text: "Tomás tiene 30 pesos. Gasta 18 en un juego. ¿Cuánto dinero le sobra?", answer: "12" },
    { text: "Si en una caja hay 6 colores y tienes 3 cajas iguales. ¿Cuántos colores tienes?", answer: "18" },
    { text: "Necesitas 8 botones para un uniforme. ¿Cuántos necesitas para 4 uniformes?", answer: "32" },
    { text: "Una tienda vende 15 libros el lunes y 10 el martes. ¿Cuántos en total?", answer: "25" },
    { text: "Hay 40 estudiantes. Si 16 son niños, ¿cuántas son niñas?", answer: "24" },
    { text: "Cada pizza tiene 8 porciones. ¿Cuántas porciones tienen 3 pizzas?", answer: "24" },
    { text: "Un lápiz cuesta 3 pesos. ¿Cuánto cuestan 5 lápices?", answer: "15" },
    { text: "Si tienes 50 pesos y compras algo por 23 pesos, ¿cuánto dinero te quedan?", answer: "27" },
  ]

  const [currentProblem, setCurrentProblem] = useState(problems[0])
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const savedRecord = localStorage.getItem("mathProblemsRecord")
    if (savedRecord) {
      setRecord(parseInt(savedRecord))
    }
  }, [])

  useEffect(() => {
    if (record > 0) {
      localStorage.setItem("mathProblemsRecord", record.toString())
    }
  }, [record])

  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          if (score > record) {
            setRecord(score)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, score, record])

  const handleCheck = () => {
    if (!gameActive) return

    if (input === currentProblem.answer) {
      setScore(score + 1)
      setFeedback("¡Correcto!")
      setCurrentProblem(problems[Math.floor(Math.random() * problems.length)])
      setInput("")
    } else {
      setFeedback(`Incorrecto: ${currentProblem.answer}`)
    }

    setTimeout(() => {
      setFeedback("")
    }, 1500)
  }

  const handleStart = () => {
    setGameStarted(true)
    setGameActive(true)
    setTimeLeft(30)
    setScore(0)
  }

  if (!gameStarted && !gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-indigo-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Problemas Cortos</h2>
          <div className="bg-indigo-100 p-6 rounded-lg mb-8">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-3xl font-bold text-indigo-600">{record}</p>
          </div>
          <button
            onClick={handleStart}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Empezar Juego
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  if (!gameActive) {
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-indigo-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">¡Tiempo Terminado!</h2>
          <p className="text-2xl text-indigo-600 mb-8">Record: {record}</p>
          <button
            onClick={() => setGameStarted(false)}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
          >
            Jugar de Nuevo
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver
          </button>
        </Card>
      </div>
    )
  }

  return (
    <div className="text-center">
      <Card className="bg-gradient-to-b from-indigo-50 to-white border-0 shadow-lg p-12 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="bg-indigo-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Record</p>
            <p className="text-2xl font-bold text-indigo-600">{record}</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Problemas Cortos</h2>
          <div className="bg-indigo-100 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Tiempo</p>
            <p className="text-2xl font-bold text-indigo-600">{timeLeft}s</p>
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-900 mb-8">Resuelve el problema:</p>
        <p className="text-xl text-gray-700 mb-8 bg-indigo-100 p-6 rounded-2xl">
          {currentProblem.text}
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleCheck()}
          placeholder="Tu respuesta..."
          className="w-full px-6 py-3 border-2 border-indigo-300 rounded-xl mb-4 text-center text-lg text-black"
          onPaste={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />

        {feedback && (
          <p className={`text-xl font-bold mb-4 ${feedback.includes("Correcto") ? "text-green-600" : "text-red-600"}`}>
            {feedback}
          </p>
        )}

        <p className="text-2xl text-gray-600 mb-4">Puntuación: {score}</p>

        <button
          onClick={handleCheck}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 mb-4"
        >
          Verificar
        </button>
        <button
          onClick={onBack}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
        >
          Abandonar Juego
        </button>
      </Card>
    </div>
  )
}
