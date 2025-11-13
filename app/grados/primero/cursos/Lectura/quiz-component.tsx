"use client"

import { useState } from "react"
import { Card } from "@/app/components/ui/card"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"

interface Story {
  id: string
  title: string
}

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}
const storyIdMap: Record<string, string> = {
  "caperucita-roja": "caperucita",
  "el-patito-feo": "patito",
  "cenicienta": "cenicienta"
}

const quizzes: Record<string, Question[]> = {
  caperucita: [
    {
      id: "q1",
      question: "¿Qué color era el vestido que le regaló la abuela a Caperucita?",
      options: ["Azul", "Rojo", "Verde", "Amarillo"],
      correctAnswer: 1,
      explanation: "El vestido era rojo, por eso la llamaban Caperucita Roja.",
    },
    {
      id: "q2",
      question: "¿Qué le advirtió la madre a Caperucita antes de partir?",
      options: [
        "Que no comiera en el camino",
        "Que no hablara con extraños",
        "Que no se detuviera",
        "Que corriera rápido",
      ],
      correctAnswer: 1,
      explanation: "Su madre le advirtió que no hablara con extraños en el camino.",
    },
    {
      id: "q3",
      question: "¿Qué hizo el lobo mientras Caperucita recogía flores?",
      options: ["Se durmió", "Corrió hacia la casa de la abuela", "Volvió al bosque", "Esperó a Caperucita"],
      correctAnswer: 1,
      explanation: "El lobo corrió rápidamente hacia la casa de la abuela.",
    },
    {
      id: "q4",
      question: "¿Quién salvó a Caperucita del lobo?",
      options: ["Su madre", "Un cazador", "Su abuela", "Un príncipe"],
      correctAnswer: 1,
      explanation: "Un cazador que pasaba cerca escuchó los gritos de Caperucita.",
    },
    {
      id: "q5",
      question: "¿Cuál fue la lección que aprendió Caperucita?",
      options: [
        "A no salir de casa",
        "A escuchar los consejos de sus padres y no hablar con extraños",
        "A correr más rápido",
        "A no llevar comida",
      ],
      correctAnswer: 1,
      explanation: "Caperucita aprendió a escuchar los consejos de sus padres y nunca hablar con extraños.",
    },
  ],
  patito: [
    {
      id: "q1",
      question: "¿Cómo era el patito que salió del huevo grande?",
      options: ["Amarillo y pequeño", "Gris, grande y feo", "Blanco", "Marrón"],
      correctAnswer: 1,
      explanation: "El patito era gris, grande y feo, muy diferente a los otros.",
    },
    {
      id: "q2",
      question: "¿Por qué el patito feo decidió huir de la granja?",
      options: [
        "Porque tenía hambre",
        "Porque quería viajar",
        "Porque lo rechazaban por su apariencia",
        "Porque era invierno",
      ],
      correctAnswer: 2,
      explanation: "Se sentía rechazado y triste por su apariencia.",
    },
    {
      id: "q3",
      question: "¿En qué estación del año el patito feo se transformó?",
      options: ["Invierno", "Otoño", "Primavera", "Verano"],
      correctAnswer: 2,
      explanation: "Cuando llegó la primavera, el patito feo se transformó en un hermoso cisne.",
    },
    {
      id: "q4",
      question: "¿En qué se convirtió el patito feo?",
      options: ["En un pato hermoso", "En un cisne blanco", "En un águila", "En un ganso"],
      correctAnswer: 1,
      explanation: "Se convirtió en un hermoso cisne blanco.",
    },
    {
      id: "q5",
      question: "¿Cuál es el mensaje principal del cuento?",
      options: [
        "La belleza física es lo más importante",
        "Todos merecemos ser aceptados tal como somos",
        "Es mejor estar solo",
        "La magia existe",
      ],
      correctAnswer: 1,
      explanation: "El cuento enseña que la verdadera belleza está en el corazón y todos merecemos aceptación.",
    },
  ],
  cenicienta: [
    {
      id: "q1",
      question: "¿Cómo trataban a Cenicienta en su casa?",
      options: ["Como una princesa", "Como una sirvienta", "Como una hermana", "Como una reina"],
      correctAnswer: 1,
      explanation: "La trataban como una sirvienta, obligándola a hacer todos los trabajos.",
    },
    {
      id: "q2",
      question: "¿Por qué el príncipe organizó un baile?",
      options: ["Para celebrar su cumpleaños", "Para encontrar esposa", "Para divertirse", "Para conocer al reino"],
      correctAnswer: 1,
      explanation: "El príncipe organizó el baile para encontrar esposa.",
    },
    {
      id: "q3",
      question: "¿Quién ayudó a Cenicienta a ir al baile?",
      options: ["Su madre", "Su hada madrina", "Su abuela", "Una amiga"],
      correctAnswer: 1,
      explanation: "Su hada madrina la ayudó con magia.",
    },
    {
      id: "q4",
      question: "¿Cuándo debía regresar Cenicienta del baile?",
      options: ["A las 10 de la noche", "A la medianoche", "Al amanecer", "A las 11 de la noche"],
      correctAnswer: 1,
      explanation: "El hechizo se rompería a la medianoche.",
    },
    {
      id: "q5",
      question: "¿Cómo encontró el príncipe a Cenicienta?",
      options: ["Por su nombre", "Por su voz", "Probando la zapatilla de cristal", "Por su vestido"],
      correctAnswer: 2,
      explanation: "El príncipe viajó probando la zapatilla en cada joven del reino.",
    },
  ],
}

export default function QuizComponent({
  story,
  onBack,
}: {
  story: Story
  onBack: () => void
}) {
  const mappedId = storyIdMap[story.id]
  const questions = quizzes[mappedId] || []
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setCompleted(true)
    }
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-green-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¡Cuestionario Completado!</h2>
          <p className="text-2xl text-gray-600 mb-8">
            Obtuviste <span className="font-bold text-green-600">{score}</span> de{" "}
            <span className="font-bold">{questions.length}</span> respuestas correctas
          </p>
          <div className="text-5xl font-bold text-green-600 mb-8">{percentage}%</div>
          <button
            onClick={onBack}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver a Lectura
          </button>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isAnswered = selectedAnswer !== null

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Cuestionario</h2>
          <p className="text-gray-600">
            Pregunta {currentQuestion + 1} de {questions.length}
          </p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-pink-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <Card className="bg-white border-0 shadow-lg p-8 rounded-2xl mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">{question.question}</h3>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !isAnswered && handleAnswer(index)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-xl text-left font-semibold transition-all duration-300 ${
                selectedAnswer === index
                  ? index === question.correctAnswer
                    ? "bg-green-100 border-2 border-green-500 text-green-900"
                    : "bg-red-100 border-2 border-red-500 text-red-900"
                  : "bg-gray-100 border-2 border-gray-200 text-gray-900 hover:border-pink-300"
              } ${isAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedAnswer === index && (
                  <div>
                    {index === question.correctAnswer ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`p-4 rounded-xl mb-8 ${
              selectedAnswer === question.correctAnswer
                ? "bg-green-50 border-l-4 border-green-500"
                : "bg-blue-50 border-l-4 border-blue-500"
            }`}
          >
            <p className="font-semibold text-gray-900 mb-2">Explicación:</p>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <button
            onClick={handleNext}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
          >
            {currentQuestion === questions.length - 1 ? "Ver Resultados" : "Siguiente Pregunta"}
          </button>
        )}
      </Card>
    </div>
  )
}
