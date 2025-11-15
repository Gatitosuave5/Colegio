"use client"

import { Card } from '@/app/components/ui/card'

import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

interface Lesson {
  id: string
  title: string
  content: string[]
}

interface Question {
  id: string
  question: string
  options: { text: string, isCorrect: boolean }[]
  correctAnswer: number
  explanation: string
}

const createShuffledQuestion = (question: Question): Question => {
  const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5)
  const newCorrectAnswer = shuffledOptions.indexOf(question.options[question.correctAnswer])
  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswer
  }
}

const quizzes: Record<string, Question[]> = {
  capitalization: [
    {
      id: "q1",
      question: "¿Cuándo se escribe con mayúscula inicial?",
      options: [
        "Solo en nombres propios",
        "Al inicio de oraciones, nombres propios y abreviaturas",
        "Nunca",
        "Siempre que queramos",
      ],
      correctAnswer: 1,
      explanation: "Las mayúsculas se usan al inicio de oraciones, en nombres propios (personas, lugares) y abreviaturas.",
    },
    {
      id: "q2",
      question: "¿Cuál de estos es un nombre propio?",
      options: [
        "gato",
        "Carlos",
        "hermano",
        "mesa",
      ].sort(() => Math.random() - 0.5).map((opt, idx) => ({
        text: opt,
        isCorrect: opt === "Carlos"
      })),
      correctAnswer: [
        {
          text: "gato",
          isCorrect: false
        },
        {
          text: "Carlos",
          isCorrect: true
        },
        {
          text: "hermano",
          isCorrect: false
        },
        {
          text: "mesa",
          isCorrect: false
        },
      ].sort(() => Math.random() - 0.5).findIndex(opt => opt.isCorrect),
      explanation: "Carlos es un nombre propio de persona y debe escribirse con mayúscula inicial.",
    },
  ].map(createShuffledQuestion),
}

export default function CapitalizationLesson({
  lesson,
  onQuizStart,
  onGamesStart,
  onBack,
  quizScore = 0,
}: {
  lesson: Lesson
  onQuizStart: () => void
  onGamesStart: () => void
  onBack: () => void
  quizScore?: number
}) {
  const colors = [
    "bg-white border-l-4 border-amber-300",
    "bg-amber-50 border-l-4 border-amber-300",
    "bg-yellow-50 border-l-4 border-yellow-300",
  ]

  const isGamesUnlocked = quizScore >= 65

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{lesson.title}</h2>
            <p className="text-gray-600">Domina el uso de mayúsculas</p>
          </div>
        </div>
        <div className="text-5xl">🔤</div>
      </div>

      <Card className="bg-gradient-to-b from-amber-50 to-white border-0 shadow-lg p-8 mb-8 rounded-2xl">
        <div className="mb-8 text-center">
          <Image 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Rz6yaI6yVbDAIK0dXNKsLuTCnjcJP1.png"
            alt="Perrito con gafas estudiando" 
            width={300}
            height={250}
            className="mx-auto rounded-xl"
          />
          <p className="text-sm text-gray-600 mt-4">¡Aprende con Bud! Haz clic en cada sección para comprender mejor.</p>
        </div>

        <div className="space-y-4">
          {lesson.content.map((paragraph, index) => (
            <div key={index} className={`p-6 rounded-xl ${colors[index % colors.length]}`}>
              <p className="text-gray-700 leading-relaxed text-lg">{paragraph}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl border-2 border-amber-300">
          <p className="text-center text-gray-900 font-bold text-lg">✨ ¡Ahora a practicar! ✨</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onQuizStart}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
        >
          Responder Cuestionario
        </button>
        <div className="relative group">
          <button
            onClick={onGamesStart}
            disabled={!isGamesUnlocked}
            className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              isGamesUnlocked
                ? "bg-yellow-500 hover:bg-yellow-600 text-white hover:shadow-lg cursor-pointer"
                : "bg-gray-400 text-white cursor-not-allowed opacity-60"
            }`}
          >
            {isGamesUnlocked ? "🎮 Jugar Juegos" : "🔒 Jugar Juegos"}
          </button>
          {!isGamesUnlocked && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
              Se desbloquea con 65 puntos en el cuestionario
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
