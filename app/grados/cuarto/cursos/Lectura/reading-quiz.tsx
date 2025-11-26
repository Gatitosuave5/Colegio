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
 "story-4to-1": [
  { question: "¿Cómo se llamaba el zorro del cuento?", options: ["Rilan", "Dario", "Tomas"], correctAnswerIndex: 0 },
  { question: "¿Dónde vivía Rilan?", options: ["Cerca del Bosque Brumoso", "En una ciudad grande", "En una isla"], correctAnswerIndex: 0 },
  { question: "¿Qué criatura encontró herida?", options: ["Una sombra del bosque", "Un lobo gigante", "Un ave dorada"], correctAnswerIndex: 0 },
  { question: "¿Qué sonido extraño escuchaban por las noches?", options: ["Susurros del bosque", "Truenos", "Risas"], correctAnswerIndex: 0 },
  { question: "¿Qué hacía Rilan para proteger al bosque?", options: ["Vigilaba desde el árbol viejo", "Encendía una fogata", "Recogía flores"], correctAnswerIndex: 0 },
  { question: "¿Qué decidió finalmente Rilan?", options: ["Convertirse en guardián del Bosque Brumoso", "Irse del pueblo", "No volver al bosque"], correctAnswerIndex: 0 }
],

"story-4to-2": [
  { question: "¿Cómo se llamaba la protagonista?", options: ["Maya", "Tara", "Sofia"], correctAnswerIndex: 0 },
  { question: "¿Qué objeto encontró Maya en el ático?", options: ["Un reloj antiguo", "Un mapa", "Una brújula"], correctAnswerIndex: 0 },
  { question: "¿Qué le pasaba al reloj?", options: ["No marcaba ninguna hora", "Giraba muy rápido", "Estaba roto en pedazos"], correctAnswerIndex: 0 },
  { question: "¿Quién le contó a Maya la historia del reloj?", options: ["Su abuela", "Su tío", "El bibliotecario"], correctAnswerIndex: 0 },
  { question: "¿Qué debía hacer Maya para restaurar el tiempo perdido?", options: ["Recordar un momento especial de su familia", "Buscar una llave oculta", "Romper el reloj"], correctAnswerIndex: 0 },
  { question: "¿Qué aprendió Maya?", options: ["Que los recuerdos mantienen unida a la familia", "Que los relojes son mágicos", "Que el tiempo se puede detener"], correctAnswerIndex: 0 }
],

"story-4to-3": [
  { question: "¿Cómo se llamaba la ciudad subterránea?", options: ["Lumen", "Aurora", "Brillán"], correctAnswerIndex: 0 },
  { question: "¿Qué hacía especial a esa ciudad?", options: ["Era iluminada por cristales brillantes", "Vivía bajo el mar", "Las casas eran de metal"], correctAnswerIndex: 0 },
  { question: "¿Qué problema apareció en la ciudad?", options: ["Los cristales empezaron a apagarse", "Hubo un terremoto", "Los túneles se inundaron"], correctAnswerIndex: 0 },
  { question: "¿Quién era la protagonista?", options: ["Tara", "Maya", "Lía"], correctAnswerIndex: 0 },
  { question: "¿Qué hizo Tara para ayudar?", options: ["Siguió las pistas de los cristales apagados", "Se escondió", "Abandonó la ciudad"], correctAnswerIndex: 0 },
  { question: "¿Qué enseñanza deja el cuento?", options: ["La valentía puede salvar incluso a una ciudad entera", "Los túneles son peligrosos", "La oscuridad es imposible de vencer"], correctAnswerIndex: 0 }
],

"story-4to-4": [
  { question: "¿Cómo se llamaba el protagonista?", options: ["Sergio", "Rilan", "Tomas"], correctAnswerIndex: 0 },
  { question: "¿Qué lugar misterioso decidió visitar?", options: ["El Puente de los Ecos", "La Cueva Brillante", "El Valle Silencioso"], correctAnswerIndex: 0 },
  { question: "¿Qué se decía del puente?", options: ["Repetía lo que sentías, no lo que decías", "Estaba embrujado", "Cambiaba de color"], correctAnswerIndex: 0 },
  { question: "¿Qué emoción escuchó Sergio repetir el puente?", options: ["Su tristeza", "Su felicidad", "Su enojo"], correctAnswerIndex: 0 },
  { question: "¿Qué entendió al final Sergio?", options: ["Que sus emociones también necesitan ser escuchadas", "Que nunca debía volver", "Que el puente hablaba con magia"], correctAnswerIndex: 0 },
  { question: "¿Qué enseñanza deja la historia?", options: ["Es importante reconocer lo que sentimos", "Los puentes son peligrosos", "Los ecos son engañosos"], correctAnswerIndex: 0 }
],

"story-4to-5": [
  { question: "¿Cómo se llamaba el protagonista?", options: ["Lorenzo", "Marco", "Gabriel"], correctAnswerIndex: 0 },
  { question: "¿Qué encontró en la biblioteca?", options: ["Un libro que escribía las historias por sí mismo", "Un cofre cerrado", "Una lámpara antigua"], correctAnswerIndex: 0 },
  { question: "¿Cuál era su problema principal?", options: ["No terminaba lo que comenzaba", "Se quedaba dormido", "Perdía sus libros"], correctAnswerIndex: 0 },
  { question: "¿Qué hacía el libro cuando Lorenzo dejaba algo sin terminar?", options: ["Lo mostraba incompleto y apagado", "Lo borraba", "Lo rompía"], correctAnswerIndex: 0 },
  { question: "¿Qué sucedió cuando terminó una historia por primera vez?", options: ["El libro brilló y cobró vida", "Se cerró para siempre", "Desapareció"], correctAnswerIndex: 0 },
  { question: "¿Qué aprendió Lorenzo?", options: ["Que terminar algo trae satisfacción y aprendizaje", "Que los libros son mágicos", "Que hacer tareas es aburrido"], correctAnswerIndex: 0 }
],

"story-4to-6": [
  { question: "¿Cómo se llamaba el protagonista?", options: ["Gabriel", "Tomas", "Rilan"], correctAnswerIndex: 0 },
  { question: "¿Qué le gustaba construir?", options: ["Barcos de papel", "Cohetes", "Cometas"], correctAnswerIndex: 0 },
  { question: "¿Qué sucedió una tarde?", options: ["Un remolino se llevó su barco", "Perdió todos sus papeles", "Se cayó al agua"], correctAnswerIndex: 0 },
  { question: "¿A dónde viajó el barco?", options: ["Por ríos, charcos y corrientes", "A una laguna gigante", "Al mar abierto"], correctAnswerIndex: 0 },
  { question: "¿Qué encontró el barco en su aventura?", options: ["Animales, barcos y un pequeño molino", "Un pez gigante", "Una isla"], correctAnswerIndex: 0 },
  { question: "¿Qué ocurrió al final?", options: ["El barco regresó a Gabriel lleno de recuerdos", "El barco se perdió para siempre", "Se rompió al volver"], correctAnswerIndex: 0 }
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
