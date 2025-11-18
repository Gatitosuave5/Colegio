'use client'

import { useState, useEffect } from 'react'

export function MotionRace({ onComplete }: { onComplete: (score: number) => void }) {
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(40)

  useEffect(() => {
    if (!gameStarted || gameOver) return

    if (timeLeft <= 0) {
      setGameOver(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameOver, timeLeft])

  const questions = [
    {
      id: 1,
      question: '¿Qué es una fuerza?',
      options: [
        { text: 'Un color que brilla en la oscuridad', correct: false },
        { text: 'Un empujón o tirón que puede mover las cosas', correct: true },
        { text: 'Un tipo de comida', correct: false },
      ],
      emoji: '💪'
    },
    {
      id: 2,
      question: '¿Qué tipo de energía usa un foco encendido?',
      options: [
       { text: 'Energía del agua', correct: false },
       { text: 'Energía del viento', correct: false }, 
       { text: 'Energía luminosa', correct: true },
      ],
      emoji: '💡'
    },
    {
      id: 3,
      question: '¿Cuál es un ejemplo de movimiento rápido?',
      options: [
        { text: 'Una roca en el suelo', correct: false },
        { text: 'Una planta creciendo', correct: false },
        { text: 'Un coche corriendo a toda velocidad', correct: true },
      ],
      emoji: '🏎️'
    },
    {
      id: 4,
      question: '¿Qué fuerza nos mantiene en el suelo?',
      options: [
        { text: 'La gravedad', correct: true },
        { text: 'El viento', correct: false },
        { text: 'La energía solar', correct: false },
      ],
      emoji: '🌍'
    },
    {
      id: 5,
      question: '¿Cuál de estos objetos tiene más energía?',
      options: [
        { text: 'Una pluma en el suelo', correct: false },
        { text: 'Una bola cayendo rápido desde una montaña', correct: true },
        { text: 'Un lápiz quieto en la mesa', correct: false },
      ],
      emoji: '⚡'
    }
  ]

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setCurrentQuestion(0)
    setAnswered(false)
    setSelectedAnswer(null)
    setTimeLeft(40)
  }

  const handleAnswer = (isCorrect: boolean) => {
    setAnswered(true)
    setSelectedAnswer(questions[currentQuestion].options.find(opt => opt.correct === isCorrect)?.text || null)
    
    if (isCorrect) {
      setScore(score + 20)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setAnswered(false)
        setSelectedAnswer(null)
      } else {
        setGameOver(true)
        const finalScore = isCorrect ? score + 20 : score
        setTimeout(() => onComplete(finalScore), 1500)
      }
    }, 1500)
  }

  if (!gameStarted) {
    return (
      <div className="space-y-6 text-center">
        <div className="text-6xl">💪⚡🏎️</div>
        <h2 className="text-2xl font-bold text-black">Fuerza, Movimiento y Energía</h2>
        <p className="text-lg font-semibold text-black">Responde preguntas sobre fuerzas, movimiento y energía</p>
        <p className="text-base text-gray-700 font-semibold">5 preguntas × 20 puntos = 100 puntos</p>
        <button
          onClick={startGame}
          className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg rounded-lg"
        >
          Comenzar Juego
        </button>
      </div>
    )
  }



  const question = questions[currentQuestion]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-300">
          <p className="text-sm font-bold text-black">Pregunta</p>
          <p className="text-3xl font-bold text-blue-700">{currentQuestion + 1}/5</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg border-2 border-purple-300">
          <p className="text-sm font-bold text-black">Puntuación</p>
          <p className="text-3xl font-bold text-purple-700">{score}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
          <p className="text-sm font-bold text-black">Máximo</p>
          <p className="text-3xl font-bold text-green-700">100</p>
        </div>
        <div className={`p-4 rounded-lg border-2 ${timeLeft <= 5 ? 'bg-red-100 border-red-300' : 'bg-yellow-100 border-yellow-300'}`}>
          <p className="text-sm font-bold text-black">Tiempo</p>
          <p className={`text-3xl font-bold ${timeLeft <= 5 ? 'text-red-700' : 'text-yellow-700'}`}>{timeLeft}s</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-lg border-4 border-yellow-400">
        <div className="text-6xl text-center mb-4">{question.emoji}</div>
        <h3 className="text-2xl font-bold text-black text-center">{question.question}</h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !answered && handleAnswer(option.correct)}
            disabled={answered}
            className={`w-full p-4 rounded-lg font-bold text-lg transition-all ${
              answered
                ? option.correct
                  ? 'bg-green-500 text-white'
                  : selectedAnswer === option.text
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-300 text-black'
                : 'bg-cyan-300 hover:bg-cyan-400 text-black'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      {answered && (
        <div className={`text-center text-lg font-bold p-4 rounded-lg ${
          selectedAnswer === question.options.find(opt => opt.correct)?.text
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {selectedAnswer === question.options.find(opt => opt.correct)?.text
            ? '✅ ¡Correcto!'
            : '❌ Respuesta incorrecta'}
        </div>
      )}
    </div>
  )
}
