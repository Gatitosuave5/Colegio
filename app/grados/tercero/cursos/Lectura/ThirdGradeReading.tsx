"use client"

import { useState } from "react"
import { ArrowLeft, MessageSquare, Gamepad2 } from "lucide-react"
import MemoryGameReading from "./memory-game-reading"
import OrderStoryGameReading from "./order-story-game-reading"
import HiddenWordsGameReading from "./hidden-words-game-reading"

type View = "list" | "reading" | "quiz" | "games"

interface Story {
  id: string
  title: string
  author: string
  emoji: string
  difficulty: string
  content: string[]
  quiz: Array<{
    question: string
    options: string[]
    correct: number
    explanation: string
  }>
}

export default function ThirdGradeReading({ onBack }: { onBack: () => void }) {
  const [currentView, setCurrentView] = useState<View>("list")
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [gameType, setGameType] = useState<string | null>(null)

  const stories: Story[] = [
    {
      id: "el-nino-y-la-ballena",
      title: "El Niño y la Ballena",
      author: "Cuento Moderno",
      emoji: "🐋",
      difficulty: "fácil",
      content: [
        "En un pequeño pueblo costero vivía un niño llamado Marco que amaba el océano. Cada mañana corría a la playa para buscar conchas y observar los barcos.",
        "Un día, mientras jugaba en la arena, escuchó un sonido extraño proveniente del agua...",
        "Era una ballena herida con una red de pesca enredada en su aleta. Marco pidió ayuda y los pescadores del pueblo la liberaron.",
        "Desde entonces, Marco y la ballena se hicieron amigos. Ella lo visitaba cada mañana para saludarlo.",
      ],
      quiz: [
        {
          question: "¿Cómo se llamaba el niño?",
          options: ["Marco", "Luis", "Pedro", "Carlos"],
          correct: 0,
          explanation: "El niño se llamaba Marco.",
        },
        {
          question: "¿Qué tenía la ballena?",
          options: ["Hambre", "Una red de pesca", "Un corte", "Un anzuelo"],
          correct: 1,
          explanation: "Tenía una red de pesca en su aleta.",
        },
      ],
    },
    {
      id: "la-flor-magica",
      title: "La Flor Mágica",
      author: "Cuento Infantil",
      emoji: "🌸",
      difficulty: "fácil",
      content: [
        "En un jardín abandonado dormía una pequeña semilla bajo la tierra.",
        "Cuando llovió, brotó una flor mágica que brillaba cuando alguien necesitaba ayuda.",
        "Una niña llamada Sofía la encontró y descubrió que traía esperanza y alegría.",
      ],
      quiz: [
        {
          question: "¿Dónde estaba la flor?",
          options: ["En un bosque", "En un jardín abandonado", "En una maceta", "En la escuela"],
          correct: 1,
          explanation: "La flor crecía en un jardín abandonado.",
        },
      ],
    },
    {
      id: "el-gato-y-el-raton",
      title: "El Gato y el Ratón Amigos",
      author: "Fábula Clásica",
      emoji: "🐱",
      difficulty: "medio",
      content: [
        "En una vieja casa vivían un gato llamado Tobías y un ratón llamado Rodolfo.",
        "Un día Tobías cayó en una trampa. Rodolfo lo ayudó a escapar, y se hicieron amigos.",
        "Desde entonces, el gato y el ratón compartían comida y aventuras.",
      ],
      quiz: [
        {
          question: "¿Qué le pasó al gato Tobías?",
          options: ["Se perdió", "Cayó en una trampa", "Se enfermó", "Persiguió al ratón"],
          correct: 1,
          explanation: "Tobías cayó en una trampa del granjero.",
        },
      ],
    },
    {
      id: "el-arcoiris-de-colores",
      title: "El Arcoíris de Colores",
      author: "Cuento Imaginativo",
      emoji: "🌈",
      difficulty: "fácil",
      content: [
        "Después de una tormenta, tres niños vieron un hermoso arcoíris.",
        "Decidieron seguirlo y llegaron a un lugar mágico con dulces y unicornios.",
        "Cuando regresaron, tenían un pequeño arcoíris de cristal como recuerdo.",
      ],
      quiz: [
        {
          question: "¿Cuántos niños había?",
          options: ["Uno", "Tres", "Cuatro", "Dos"],
          correct: 1,
          explanation: "Había tres niños: Tim, Elena y David.",
        },
      ],
    },
    {
      id: "la-casa-embrujada",
      title: "La Casa Embrujada (No tan Asustadora)",
      author: "Cuento de Misterio",
      emoji: "👻",
      difficulty: "medio",
      content: [
        "En el borde del pueblo había una casa vieja que todos creían embrujada.",
        "Una niña valiente llamada Laura entró y descubrió que los ruidos provenían de un perro encerrado.",
        "Lo liberó y se convirtió en su mejor amigo.",
      ],
      quiz: [
        {
          question: "¿Qué había en la casa embrujada?",
          options: ["Un fantasma", "Un perro viejo", "Un tesoro", "Nada"],
          correct: 1,
          explanation: "Era un perro viejo atrapado en el sótano.",
        },
      ],
    },
  ]

  const handleStorySelect = (story: Story) => {
    setSelectedStory(story)
    setCurrentView("reading")
  }

  const handleStartQuiz = () => {
    setQuizAnswers([])
    setCurrentView("quiz")
  }

  const handleAnswerQuestion = (qIndex: number, aIndex: number) => {
    const updated = [...quizAnswers]
    updated[qIndex] = aIndex
    setQuizAnswers(updated)
  }

  const handleSubmitQuiz = () => {
    if (!selectedStory) return
    const correct = selectedStory.quiz.filter((q, i) => quizAnswers[i] === q.correct).length
    alert(`¡Respondiste ${correct} de ${selectedStory.quiz.length} correctamente!`)
    setCurrentView("reading")
  }

  const handleStartGame = () => {
    setCurrentView("games")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <button onClick={onBack} className="text-gray-600 hover:text-black flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Volver
          </button>
          <h1 className="text-xl font-bold text-gray-800">Lectura - 3er Grado</h1>
        </div>
      </header>

      <section className="max-w-6xl mx-auto p-6">
        {/* Vista de Lista */}
        {currentView === "list" && (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Nuestros Cuentos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <button
                  key={story.id}
                  onClick={() => handleStorySelect(story)}
                  className="bg-white rounded-2xl p-6 text-left border hover:border-orange-400 hover:shadow-lg transition"
                >
                  <div className="text-5xl mb-3">{story.emoji}</div>
                  <h3 className="font-bold text-lg">{story.title}</h3>
                  <p className="text-gray-600 text-sm">{story.author}</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    {story.difficulty}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Vista de Lectura */}
        {currentView === "reading" && selectedStory && (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <button
              onClick={() => setCurrentView("list")}
              className="text-orange-600 flex items-center gap-2 mb-6 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" /> Volver
            </button>

            <div className="text-6xl mb-3">{selectedStory.emoji}</div>
            <h2 className="text-3xl font-bold mb-1">{selectedStory.title}</h2>
            <p className="text-gray-600 mb-6">Autor: {selectedStory.author}</p>

            <div className="bg-yellow-50 rounded-lg p-6 mb-6 max-h-[300px] overflow-y-auto space-y-3">
              {selectedStory.content.map((p, i) => (
                <p key={i} className="text-gray-700">
                  {p}
                </p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartQuiz}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Responder Cuestionario
              </button>
              <button
                onClick={handleStartGame}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <Gamepad2 className="w-5 h-5" />
                Juegos Interactivos
              </button>
            </div>
          </div>
        )}

        {/* Vista Cuestionario */}
        {currentView === "quiz" && selectedStory && (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <button
              onClick={() => setCurrentView("reading")}
              className="text-orange-600 flex items-center gap-2 mb-6 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" /> Volver
            </button>

            <h2 className="text-2xl font-bold mb-6">Cuestionario: {selectedStory.title}</h2>

            {selectedStory.quiz.map((q, i) => (
              <div key={i} className="mb-6">
                <p className="font-semibold mb-3">
                  {i + 1}. {q.question}
                </p>
                {q.options.map((opt, j) => (
                  <label key={j} className="block mb-2">
                    <input
                      type="radio"
                      name={`q${i}`}
                      checked={quizAnswers[i] === j}
                      onChange={() => handleAnswerQuestion(i, j)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ))}

            <button
              onClick={handleSubmitQuiz}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg"
            >
              Enviar Respuestas
            </button>
          </div>
        )}

        {/* Vista Juegos */}
        {currentView === "games" && selectedStory && (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <button
              onClick={() => setCurrentView("reading")}
              className="text-orange-600 flex items-center gap-2 mb-6 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" /> Volver
            </button>
            <h2 className="text-2xl font-bold mb-6">Juegos Interactivos</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <MemoryGameReading story={selectedStory} />
              <OrderStoryGameReading story={selectedStory} />
              <HiddenWordsGameReading story={selectedStory} />
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
