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

async function agregarPuntos(puntos: number, storyId: string) {

  const nombreAlumno = localStorage.getItem("nombreAlumno");
  const codigoSalon = localStorage.getItem("codigoSalon");

  if (!nombreAlumno || !codigoSalon) return;

  //  Evitar enviar puntos si YA se envió antes
  const yaEnviado = localStorage.getItem(`puntos-enviados-${storyId}`)
  if (yaEnviado === "true") return;

  // 1. Traer el ID del alumno temporal
  const res = await fetch(`http://34.130.57.30/api/login/api/alumnos_temporales?codigo=${codigoSalon}`);
  const data = await res.json();
  const alumno = data.alumnos.find(a => a.nombre === nombreAlumno);

  if (!alumno) return;

  // 2. Enviar puntos
  await fetch("http://34.130.57.30/api/login/api/alumnos_temporales/puntaje", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: alumno.id,
      puntaje: puntos
    })
  });

  // ❗ Marcar que ya se enviaron los puntos
  localStorage.setItem(`puntos-enviados-${storyId}`, "true");
}


const quizQuestions: Record<string, Question[]> = {
  "story-1": [
    {
      question: "¿Qué escuchó Azulina que despertó su curiosidad?",
      options: [
        "Escuchó a dos abejorros hablar sobre luces que bailan de noche en la pradera del este",
        "Escuchó a pájaros hablar sobre un árbol mágico",
        "Escuchó el viento llamando desde la montaña"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Quién decidió acompañarla en el viaje?",
      options: [
        "Tico, un saltamontes verde",
        "Gigi, una jirafa alta",
        "Tambo, un elefante sabio"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué dificultad tuvieron durante el camino?",
      options: [
        "Una tormenta con viento fuerte que empujó a Azulina",
        "Un río que no podían cruzar",
        "Animales salvajes que los perseguían"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué eran las luces que vio en la pradera?",
      options: [
        "Eran lucíernagas que brillaban encendiendo y apagando su luz",
        "Eran estrellas muy bajas del cielo",
        "Eran faroles encendidos por los habitantes"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué aprendió Azulina al final del viaje?",
      options: [
        "Los viajes nos sirven para ver cosas nuevas y para compartirlas",
        "Que nunca debes aventurarte fuera de casa",
        "Que el miedo es más importante que la curiosidad"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Por qué quiso regresar para contar su historia?",
      options: [
        "Porque quería que otras mariposas conocieran sobre las hermosas luces",
        "Porque estaba cansada de viajar",
        "Porque perdió el camino de regreso"
      ],
      correctAnswerIndex: 0
    }
  ],
  "story-2": [
    {
      question: "¿Qué problema tuvo Leo al despertar?",
      options: [
        "No tenía voz, solo salía un pequeño susurro",
        "Sus ojos se pusieron verdes",
        "Sus garras desaparecieron"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué le dijo Gigi la jirafa?",
      options: [
        "Que tal vez estaba resfriado y que debería descansar",
        "Que debería comer más frutas",
        "Que nunca volvería a rugir"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué consejo le dio Tambo el elefante?",
      options: [
        "Que el rugido estaba en su corazón y que cuando tuviera calma volvería",
        "Que nunca volvería a rugir",
        "Que debería gritar más fuerte"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué intentó enseñarle Kiko?",
      options: [
        "A cantar con sonidos graciosos",
        "A trepar árboles",
        "A nadar en el río"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Cuándo volvió su rugido?",
      options: [
        "Cuando dejó de desesperarse, respiró hondo y escuchó su interior",
        "Después de comer carne",
        "Cuando escuchó el rugido de otros leones"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué enseñanza deja la historia?",
      options: [
        "Que la verdadera fuerza viene de tener calma y escuchar nuestro interior",
        "Que la fuerza viene de rugir más fuerte",
        "Que siempre debes esconder tus emociones"
      ],
      correctAnswerIndex: 0
    }
  ],
  "story-3": [
    {
      question: "¿Qué descubrió Emma al despertar?",
      options: [
        "Que todo estaba en blanco y negro",
        "Que era una reina",
        "Que podía volar"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿A quién fue a visitar primero?",
      options: [
        "Al taller del señor Pincelón",
        "Al alcalde del pueblo",
        "A la biblioteca mágica"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué estaba haciendo la nube gris?",
      options: [
        "Absorbía los colores de todas las cosas porque la gente dejó de valorar lo que tenía",
        "Estaba jugando con los niños",
        "Traía lluvia para limpiar el pueblo"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué había pasado en el pueblo para que se vayan los colores?",
      options: [
        "La gente había dejado de valorar lo que tenía, no sonreían ni ayudaban",
        "Una bruja lanzó un hechizo",
        "El pintor se fue del pueblo"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué hicieron los habitantes para recuperarlos?",
      options: [
        "Ayudaron a los ancianos, limpiaron la plaza, compartieron frutas y pintaron murales",
        "Pidieron magia al cielo",
        "Plantaron flores en todas partes"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué enseñanza deja la historia?",
      options: [
        "Que los colores no están solo en las pinturas, sino en la forma de vivir con alegría",
        "Que los colores son solo decoración",
        "Que debemos pintar todo de colores"
      ],
      correctAnswerIndex: 0
    }
  ],
  "story-4": [
    {
      question: "¿Qué quería hacer Trueno?",
      options: [
        "Correr rápido sin detenerse",
        "Viajar lentamente",
        "Ayudar a todos los pasajeros"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué ocurrió en el primer pueblo?",
      options: [
        "La gente quedó triste porque no pudo subir",
        "Todos celebraron su velocidad",
        "Trueno se detuvo a saludar"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué esperaba el anciano en el segundo pueblo?",
      options: [
        "Esperaba medicinas",
        "Esperaba dulces",
        "Esperaba un abrazo"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué le dijo el conductor al final?",
      options: [
        "Que su velocidad es inútil si no ayuda a quienes lo necesitan",
        "Que debería ser más rápido",
        "Que está bien solo ayudarse a sí mismo"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué decidió hacer Trueno al día siguiente?",
      options: [
        "Decidió parar en cada estación para ayudar a las personas",
        "Siguió corriendo sin parar",
        "Se retiró del trabajo"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué enseñanza deja el cuento?",
      options: [
        "Que detenerse también es avanzar cuando es para ayudar a otros",
        "Que siempre debes correr",
        "Que ayudar a otros nos retrasa"
      ],
      correctAnswerIndex: 0
    }
  ],
  "story-5": [
    {
      question: "¿Qué hacía Lía con su abuelo todas las noches?",
      options: [
        "Encendía el faro todas las noches para guiar a los barcos",
        "Limpiaba la casa",
        "Contaban historias de miedo"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué problema surgió una noche?",
      options: [
        "Su abuelo enfermó y ella tuvo que encender el faro sola",
        "Se apagó todas las luces",
        "Llegó una tormenta imposible"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué sintió Lía al tener que encender el faro sola?",
      options: [
        "Sintió miedo y temblor, pero pensaba en los marineros",
        "Sintió felicidad",
        "No sintió nada especial"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué dificultad encontró al subir?",
      options: [
        "El mecanismo del faro estaba atascado",
        "Los escalones eran muy altos",
        "Encontró a un intruso"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Cómo logró encender la luz?",
      options: [
        "Respiró hondo, recordó las enseñanzas de su abuelo y giró las piezas con paciencia",
        "Llamó para pedir ayuda",
        "Esperó a que llegara su abuelo"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué enseñanza deja la historia?",
      options: [
        "Que el valor no es no tener miedo, sino actuar aunque lo tengas",
        "Que nunca debes enfrentar tus miedos",
        "Que es mejor dejar todo para después"
      ],
      correctAnswerIndex: 0
    }
  ],
  "story-6": [
    {
      question: "¿Qué buscaba Sofia en el reino mágico?",
      options: [
        "Buscaba el cristal dorado para devolver paz y armonía al reino",
        "Buscaba un tesoro de monedas",
        "Buscaba a su familia perdida"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Quién fue el primer amigo que conoció en su viaje?",
      options: [
        "Theo, un búho muy inteligente",
        "Un dragón amigable",
        "Una bruja sabia"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Cuáles fueron los tres lugares que atravesó Sofia?",
      options: [
        "El Bosque de las Voces, el Río de la Sabiduría y la Montaña de los Ecos",
        "El Castillo del Rey, la Cueva Oscura y el Volcán Rojo",
        "El Lago Azul, el Desierto Dorado y la Ciudad Perdida"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué guardaba el cristal dorado?",
      options: [
        "Un dragón de fuego lo guardaba",
        "Un guardián invisible",
        "Una princesa dormida"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Cómo logró Sofia obtener el cristal?",
      options: [
        "Se acercó al dragón con respeto y bravura, lo cual conmovió al dragón",
        "Luchó contra el dragón",
        "Usó magia para atraparlo"
      ],
      correctAnswerIndex: 0
    },
    {
      question: "¿Qué enseñanza deja la historia?",
      options: [
        "Que la verdadera magia está en el coraje, la compasión y la determinación",
        "Que la magia viene de los cristales brillantes",
        "Que debemos nunca confiar en otros"
      ],
      correctAnswerIndex: 0
    }
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
