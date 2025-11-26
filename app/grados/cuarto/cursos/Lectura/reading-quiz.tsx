"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { Card } from "@/app/components/ui/card"

interface Story {
  id: string
  title: string
  content: string
  questions: string[]
}

interface Question {
  question: string
  options: string[]
  correctAnswerIndex: number
}

async function agregarPuntos(puntos: number, lessonId: string | number) {
  const idAlumno = sessionStorage.getItem("idAlumno");   // ✔ alumno real en sesión
  const codigoSalon = localStorage.getItem("codigoSalon");

  if (!idAlumno || !codigoSalon || !lessonId) return;

  lessonId = lessonId.toString();

  //  Llave única por alumno + salón + contenido real
  const key = `puntaje-guardado-${codigoSalon}-${lessonId}-${idAlumno}`;
  console.log("🔎 Key generada:", key);

  //  Evitar doble registro
  if (localStorage.getItem(key) === "true") {
    console.log(`⚠ Ya se registró antes (Alumno: ${idAlumno} / Contenido: ${lessonId})`);
    return;
  }

  //  Registrar sin buscar por nombre
  await fetch("http://localhost:3001/api/alumnos_temporales/puntaje", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: idAlumno,
      puntaje: puntos
    })
  });

  //  Bloquear envío
  localStorage.setItem(key, "true");

  console.log("✔ Puntaje registrado y bloqueado:", key);
}



const quizQuestions: Record<string, Question[]> = {
 "story-2do-1": [
  { question: "¿Cómo se llamaba la mariposa?", options: ["Lila", "Mia", "Ana"], correctAnswerIndex: 0 },
  { question: "¿Por qué volaba siempre bajito?", options: ["Tenía miedo", "Estaba cansada", "Era pequeña"], correctAnswerIndex: 0 },
  { question: "¿Qué apareció en lo alto del árbol?", options: ["Una flor brillante", "Un pájaro", "Una nube"], correctAnswerIndex: 0 },
  { question: "¿Qué decidió hacer Lila?", options: ["Intentar subir", "Dormir", "Irse"], correctAnswerIndex: 0 },
  { question: "¿Qué vio cuando llegó arriba?", options: ["El jardín completo", "Un río", "Una montaña"], correctAnswerIndex: 0 },
  { question: "¿Qué enseñanza deja el cuento?", options: ["Que atreverse da grandes recompensas", "Que es mejor no intentar", "Que no debes subir alto"], correctAnswerIndex: 0 }
],
  "story-2do-2": [
  { question: "¿Qué practicaba Leo todos los días?", options: ["Su rugido", "Correr", "Cazar"], correctAnswerIndex: 0 },
  { question: "¿Qué le pasó después del viento frío?", options: ["Perdió la voz", "Se enfermó", "Se durmió"], correctAnswerIndex: 0 },
  { question: "¿A quién fue a buscar?", options: ["Al viento", "A otro león", "A su mamá"], correctAnswerIndex: 0 },
  { question: "¿Qué consejo le dio el viento?", options: ["Descansar", "Correr más", "Gritar"], correctAnswerIndex: 0 },
  { question: "¿Cómo recuperó su rugido?", options: ["Durmiendo", "Corriendo", "Comiendo"], correctAnswerIndex: 0 },
  { question: "¿Qué aprendió Leo?", options: ["Que cuidarse también es ser fuerte", "Que rugir no importa", "Que el viento manda"], correctAnswerIndex: 0 }
],

  "story-2do-3": [
  { question: "¿Cómo se llamaba la ciudad?", options: ["Gotitas", "Colores", "Lluvia"], correctAnswerIndex: 0 },
  { question: "¿Qué usaban todos?", options: ["Paraguas", "Sombreros", "Botas"], correctAnswerIndex: 0 },
  { question: "¿Qué pasó cuando llovió demasiado?", options: ["Los paraguas salieron volando", "Se inundó", "Se rompieron"], correctAnswerIndex: 0 },
  { question: "¿Qué hizo Mia?", options: ["Reparó los paraguas", "Se escondió", "Los vendió"], correctAnswerIndex: 0 },
  { question: "¿Cómo se sintieron los vecinos?", options: ["Felices", "Tristes", "Enojados"], correctAnswerIndex: 0 },
  { question: "¿Qué enseñanza deja el cuento?", options: ["Ayudar hace mejor a la comunidad", "Es mejor guardar tus cosas", "La lluvia es mala"], correctAnswerIndex: 0 }
],

 "story-2do-4": [
  { question: "¿Cómo se llamaba el tren?", options: ["Tito", "Trueno", "Rayo"], correctAnswerIndex: 0 },
  { question: "¿Qué problema tenía?", options: ["Siempre tenía sueño", "Iba muy rápido", "Se perdía"], correctAnswerIndex: 0 },
  { question: "¿Quién habló con él?", options: ["Ana", "Lila", "Tomás"], correctAnswerIndex: 0 },
  { question: "¿Qué consejo le dio Ana?", options: ["Dormir bien", "Comer más", "Correr rápido"], correctAnswerIndex: 0 },
  { question: "¿Cómo cambió Tito?", options: ["Se despertó temprano", "Corrió más", "Dejó de trabajar"], correctAnswerIndex: 0 },
  { question: "¿Qué enseñanza deja la historia?", options: ["Dormir bien es importante", "No hay que trabajar", "La velocidad es todo"], correctAnswerIndex: 0 }
],

"story-2do-5": [
  { question: "¿Dónde estaba el faro?", options: ["Playa Rocas Claras", "Isla Azul", "Costa Brillante"], correctAnswerIndex: 0 },
  { question: "¿Por qué encendía su luz tarde?", options: ["Creía que nadie lo necesitaba", "Estaba roto", "Tenía miedo"], correctAnswerIndex: 0 },
  { question: "¿Qué pasó una noche?", options: ["Un barco no veía nada", "Llegó una tormenta", "Se apagó el sol"], correctAnswerIndex: 0 },
  { question: "¿Cómo ayudó al barco?", options: ["Encendió su luz a tiempo", "Gritó", "Llamó a otros faros"], correctAnswerIndex: 0 },
  { question: "¿Qué decidió hacer después?", options: ["Encender siempre a tiempo", "Apagarse", "Mudarse"], correctAnswerIndex: 0 },
  { question: "¿Qué enseñanza deja el cuento?", options: ["Aunque seas pequeño, puedes hacer cosas grandes", "Ser pequeño es malo", "Los faros no sirven"], correctAnswerIndex: 0 }
],

 "story-2do-6": [
  { question: "¿Cómo se llamaba el niño?", options: ["Tomás", "Leo", "Tito"], correctAnswerIndex: 0 },
  { question: "¿Qué encontró bajo la hoja gigante?", options: ["Una llave dorada", "Un mapa", "Una flor"], correctAnswerIndex: 0 },
  { question: "¿A dónde lo llevó la llave?", options: ["A una puerta escondida", "A un castillo", "A un lago"], correctAnswerIndex: 0 },
  { question: "¿Qué había detrás de la puerta?", options: ["Un jardín mágico", "Un bosque oscuro", "Una casa"], correctAnswerIndex: 0 },
  { question: "¿Qué decidió hacer Tomás?", options: ["Ser el cuidador del reino", "Cerrar la puerta", "Perder la llave"], correctAnswerIndex: 0 },
  { question: "¿Qué enseñanza tiene el cuento?", options: ["Cuidar la naturaleza es una responsabilidad", "Las llaves son mágicas", "Los jardines se cuidan solos"], correctAnswerIndex: 0 }
]

}



function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function ReadingQuiz({
  story,
  onBack,
  onQuizComplete,
}: {
  story: Story
  onBack: () => void
  onQuizComplete: (score: number) => void
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [completed, setCompleted] = useState(false)
  const [feedback, setFeedback] = useState<string>("")
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [shuffledOptions, setShuffledOptions] = useState<Record<number, { text: string; originalIndex: number }[]>>({})
  const [score, setScore] = useState<number | null>(null)
  const questions = quizQuestions[story.id] || []
  const currentQuestion = questions[currentQuestionIndex]
  const correctCount = userAnswers.filter((answer, idx) => answer === questions[idx]?.correctAnswerIndex).length
  const [alreadyUnlocked, setAlreadyUnlocked] = useState(() => {
    return localStorage.getItem(`unlocked-${story.id}`) === "true"
  })
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem(`best-score-${story.id}`)
    return saved ? Number(saved) : 0
  })

  // Guardar mejor puntaje
const previousBest = Number(localStorage.getItem(`best-score-${story.id}`) || 0)
if (score > previousBest) {
  localStorage.setItem(`best-score-${story.id}`, String(score))
  setBestScore(score)
}

  useEffect(() => {
    const unlocked = localStorage.getItem(`unlocked-${story.id}`) === "true"
    if (unlocked) {
      Promise.resolve().then(() => setAlreadyUnlocked(true))
    }
  }, [story.id])
  
  const getShuffledOptions = (questionIndex: number) => {
    if (!shuffledOptions[questionIndex] && currentQuestion) {
      const options = currentQuestion.options.map((text, originalIndex) => ({ text, originalIndex }))
      const shuffled = shuffleArray(options)
      setShuffledOptions(prev => ({ ...prev, [questionIndex]: shuffled }))
      return shuffled
    }
    return shuffledOptions[questionIndex] || []
  }

  
  
  const handleAnswer = (shuffledIndex: number) => {
    const optionsArray = getShuffledOptions(currentQuestionIndex)
    const originalIndex = optionsArray[shuffledIndex]?.originalIndex
    
    setSelectedAnswer(shuffledIndex)
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = originalIndex

    

    const isCorrect = originalIndex === currentQuestion.correctAnswerIndex
    
    if (isCorrect) {
      setFeedback("¡Correcto! 🎉")
    } else {
      setFeedback(`Incorrecto. La respuesta correcta era: ${currentQuestion.options[currentQuestion.correctAnswerIndex]}`)
    }
   
    
    setUserAnswers(newAnswers)

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setFeedback("")
        setSelectedAnswer(null)
      } else {
        const finalScore = Math.round(
          (newAnswers.filter((answer, idx) => answer === questions[idx]?.correctAnswerIndex).length / questions.length) * 100
        )
        setScore(finalScore)
        setCompleted(true) 

        agregarPuntos(finalScore, story.id)

        localStorage.setItem(`completed-quiz-${story.id}`, "true")
        
      }
    }, 1000)
  }

  const optionsArray = getShuffledOptions(currentQuestionIndex)

  const handleBackFromResults = () => {
    if (score !== null) {
  
      const wasUnlocked = localStorage.getItem(`unlocked-${story.id}`) === "true"
  
      // Si ya estaba desbloqueado, nunca se vuelve a bloquear
      if (wasUnlocked) {
        sessionStorage.setItem(`unlocked-${story.id}`, "true")
      } else {
        // Sólo desbloquea si supera el puntaje
        if (score >= 65) {
          localStorage.setItem(`unlocked-${story.id}`, "true")
        }
      }
  
      onQuizComplete(score)
    }
  
    onBack()
  }

  if (completed) {
    const correctAnswers = userAnswers.filter(
      (ans, idx) => ans === questions[idx]?.correctAnswerIndex
    ).length

    const finalScore = score ?? Math.round(
      (correctAnswers / questions.length) * 100
    )

    const message =
      finalScore >= 70
        ? "¡Excelente trabajo! 🌟"
        : finalScore >= 40
        ? "¡Buen intento! Puedes mejorar 💪"
        : "Sigue practicando, ¡tú puedes! 🙌"

    return (
      <div className="text-center mt-12">
        <Card className="bg-gradient-to-b from-green-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Cuestionario Completado!
          </h2>

          <p className="text-2xl font-bold text-gray-800 mb-2">
            Puntaje: {finalScore} / 100
          </p>

          <p className="text-xl text-gray-600 mb-6">{message}</p>

          <p className="text-gray-500 text-sm mb-8">
            Respondiste correctamente {correctAnswers} de {questions.length} preguntas.
          </p>

          <button
            onClick={handleBackFromResults}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver a la lectura
          </button>
        </Card>
      </div>
    )
  }
  

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">📝 Cuestionario</h2>
            <p className="text-gray-600">Pregunta {currentQuestionIndex + 1} de {questions.length}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Respuestas correctas: {correctCount}/{questions.length}</p>
          <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
            <div className="h-full bg-green-500 rounded-full transition-all" style={{width: `${(correctCount / questions.length) * 100}%`}}></div>
          </div>
        </div>
      </div>

      <Card className="bg-gradient-to-b from-purple-50 to-white border-0 shadow-lg p-10 rounded-2xl mb-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">{currentQuestion?.question}</h3>
          
          {feedback && (
            <div className={`p-4 rounded-lg mb-6 text-center font-semibold flex items-center justify-center gap-2 ${
              feedback.includes("¡Correcto!") 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {feedback.includes("¡Correcto!") ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              {feedback}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {optionsArray.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={feedback !== ""}
                className={`p-6 font-semibold rounded-lg transition-all text-left ${
                  selectedAnswer === null ? "bg-blue-500 hover:bg-blue-600 text-white" :
                  selectedAnswer === index && option.originalIndex === currentQuestion.correctAnswerIndex ? "bg-green-500 text-white" :
                  selectedAnswer === index && option.originalIndex !== currentQuestion.correctAnswerIndex ? "bg-red-500 text-white" :
                  "bg-gray-300 text-gray-800 opacity-75"
                } disabled:opacity-75`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
