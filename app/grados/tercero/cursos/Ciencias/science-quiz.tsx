"use client"

import { useState, useEffect } from "react"
import { Card } from "@/app/components/ui/card"
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

async function agregarPuntos(puntos: number, lessonId: string | number) {
  const idAlumno = sessionStorage.getItem("idAlumno");   // ID real del alumno
  const codigoSalon = localStorage.getItem("codigoSalon");

  if (!idAlumno || !codigoSalon || !lessonId) return;

  lessonId = lessonId.toString();

  //  Clave única por salón + contenido + alumno
  const key = `puntaje-guardado-${codigoSalon}-${lessonId}-${idAlumno}`;

  console.log("🔎 Key generada:", key);

  //  Evitar doble envío POR alumno (no global)
  if (localStorage.getItem(key) === "true") {
    console.log(`⚠ Puntaje ya registrado para contenido ${lessonId} (Alumno ${idAlumno})`);
    return;
  }

  //  Enviar puntaje directamente al backend usando ID
  await fetch("https://http://localhost:3001/api/alumnos_temporales/puntaje", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: idAlumno,
      puntaje: puntos,
    }),
  });

  // Guardar bloqueo
  localStorage.setItem(key, "true");
  console.log("✔ Puntaje registrado y bloqueado:", key);
}





const scienceQuizzes: Record<string, Question[]> = {
  living_beings: [
    {
      id: "q1",
      question: "¿Qué es un ser vivo?",
      options: [
        "Algo que se mueve",
        "Un objeto que nace, crece, se reproduce y muere",
        "Una planta",
        "Un objeto de color verde"
      ],
      correctAnswer: 1,
      explanation: "Un ser vivo es un organismo que nace, crece, se reproduce y muere. Incluye plantas, animales y microorganismos."
    },
    {
      id: "q2",
      question: "¿Cuáles son los dos grandes grupos de seres vivos?",
      options: [
        "Grandes y pequeños",
        "Animales y plantas",
        "Rápidos y lentos",
        "Coloreados e incoloros"
      ],
      correctAnswer: 1,
      explanation: "Los dos grandes grupos son animales y plantas. Los animales se mueven y comen, las plantas producen su propio alimento."
    },
    {
      id: "q3",
      question: "¿Qué es un ecosistema?",
      options: [
        "Un lugar con muchos edificios",
        "Un conjunto de seres vivos y su entorno",
        "Una ciudad grande",
        "Un grupo de personas"
      ],
      correctAnswer: 1,
      explanation: "Un ecosistema es una comunidad de seres vivos que interactúan entre sí y con su entorno (aire, agua, tierra)."
    },
    {
      id: "q4",
      question: "¿Qué animales son carnívoros?",
      options: [
        "Los que comen plantas",
        "Los que comen carne",
        "Los que no comen nada",
        "Los que comen frutas"
      ],
      correctAnswer: 1,
      explanation: "Los carnívoros son animales que se alimentan de carne de otros animales. Ejemplos: león, águila, cocodrilo."
    },
    {
      id: "q5",
      question: "¿Para qué sirven los árboles?",
      options: [
        "Solo para verse bonitos",
        "Producen oxígeno, protegen el suelo y dan alimento",
        "Solo para la madera",
        "Para bloquear el sol"
      ],
      correctAnswer: 1,
      explanation: "Los árboles producen oxígeno, purifican el aire, protegen el suelo de erosión y proporcionan alimento y hogar a muchos animales."
    },
    {
      id: "q6",
      question: "¿Cuál es la cadena alimenticia?",
      options: [
        "Una cuerda con comida",
        "La relación entre seres vivos donde unos comen a otros",
        "Un supermercado",
        "Una tienda de alimentos"
      ],
      correctAnswer: 1,
      explanation: "La cadena alimenticia es la relación de alimentación entre seres vivos: plantas → herbívoros → carnívoros."
    },
    {
      id: "q7",
      question: "¿Qué son los insectos?",
      options: [
        "Animales grandes",
        "Animales pequeños con 6 patas",
        "Plantas pequeñas",
        "Bacterias"
      ],
      correctAnswer: 1,
      explanation: "Los insectos son animales pequeños con 6 patas, alas en muchos casos y un cuerpo dividido en tres partes."
    },
    {
      id: "q8",
      question: "¿Cómo se llama el lugar donde viven los animales?",
      options: [
        "Hogar",
        "Hábitat",
        "Casa",
        "Edificio"
      ],
      correctAnswer: 1,
      explanation: "El hábitat es el lugar donde vive un animal, que le proporciona alimento, agua y protección."
    },
    {
      id: "q9",
      question: "¿Qué son los herbívoros?",
      options: [
        "Animales que comen carne",
        "Animales que solo comen plantas",
        "Animales grandes",
        "Animales nocturnos"
      ],
      correctAnswer: 1,
      explanation: "Los herbívoros son animales que se alimentan exclusivamente de plantas. Ejemplos: vaca, conejo, jirafa."
    },
    {
      id: "q10",
      question: "¿Por qué es importante cuidar la naturaleza?",
      options: [
        "No es importante",
        "Porque nos proporciona aire, agua, alimento y hogar",
        "Solo para los científicos",
        "Porque es bonita"
      ],
      correctAnswer: 1,
      explanation: "Es importante cuidar la naturaleza porque nos proporciona todo lo necesario para vivir: aire, agua, alimento y protección."
    }
  ],
  human_body: [
    {
      id: "q1",
      question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
      options: [
        "100 huesos",
        "150 huesos",
        "206 huesos",
        "300 huesos"
      ],
      correctAnswer: 2,
      explanation: "El cuerpo humano adulto tiene 206 huesos. Los bebés nacen con más huesos, pero algunos se fusionan al crecer."
    },
    {
      id: "q2",
      question: "¿Cuál es la función del corazón?",
      options: [
        "Digerir la comida",
        "Bombear sangre a todo el cuerpo",
        "Pensar",
        "Respirar"
      ],
      correctAnswer: 1,
      explanation: "El corazón bombea sangre a todo el cuerpo, transportando oxígeno y nutrientes a todas las células."
    },
    {
      id: "q3",
      question: "¿Para qué sirven los pulmones?",
      options: [
        "Digerir alimentos",
        "Absorber oxígeno del aire",
        "Producir sangre",
        "Pensar y recordar"
      ],
      correctAnswer: 1,
      explanation: "Los pulmones absorben oxígeno del aire que respiramos y liberan dióxido de carbono para exhalar."
    },
    {
      id: "q4",
      question: "¿Cuál es la función del cerebro?",
      options: [
        "Bombear sangre",
        "Controlar pensamientos, emociones y movimientos",
        "Digerir alimentos",
        "Producir oxígeno"
      ],
      correctAnswer: 1,
      explanation: "El cerebro controla todos nuestros pensamientos, emociones, movimientos y funciones vitales del cuerpo."
    },
    {
      id: "q5",
      question: "¿Para qué sirven los músculos?",
      options: [
        "Pensar",
        "Permitir el movimiento del cuerpo",
        "Digerir comida",
        "Absorber oxígeno"
      ],
      correctAnswer: 1,
      explanation: "Los músculos nos permiten movernos. Se contraen y se relajan para mover los huesos y el cuerpo."
    },
    {
      id: "q6",
      question: "¿Cuál es la función del estómago?",
      options: [
        "Respirar",
        "Pensar",
        "Digerir y descomponer los alimentos",
        "Bombear sangre"
      ],
      correctAnswer: 2,
      explanation: "El estómago digiere la comida descomponiéndola en partes más pequeñas para que el cuerpo pueda absorber nutrientes."
    },
    {
      id: "q7",
      question: "¿Para qué sirven los dientes?",
      options: [
        "Pensar",
        "Cortar y masticar alimentos",
        "Respirar",
        "Bombear sangre"
      ],
      correctAnswer: 1,
      explanation: "Los dientes cortan y mastican los alimentos, iniciando el proceso de digestión."
    },
    {
      id: "q8",
      question: "¿Cuál es la función de la piel?",
      options: [
        "Pensar",
        "Proteger el cuerpo de infecciones y regular temperatura",
        "Digerir alimentos",
        "Bombear sangre"
      ],
      correctAnswer: 1,
      explanation: "La piel nos protege de infecciones, ayuda a regular la temperatura corporal y nos permite sentir el tacto."
    },
    {
      id: "q9",
      question: "¿Para qué sirven los ojos?",
      options: [
        "Escuchar",
        "Ver y percibir el mundo",
        "Tocar",
        "Oler"
      ],
      correctAnswer: 1,
      explanation: "Los ojos nos permiten ver y percibir el mundo que nos rodea a través de la luz."
    },
    {
      id: "q10",
      question: "¿Qué debo hacer para mantener mi cuerpo saludable?",
      options: [
        "Nada especial",
        "Comer saludable, ejercitarme y dormir bien",
        "Solo comer dulces",
        "Ver televisión todo el día"
      ],
      correctAnswer: 1,
      explanation: "Para mantener un cuerpo saludable debemos comer alimentos nutritivos, hacer ejercicio regular y descansar adecuadamente."
    }
  ],
  earth_climate: [
    {
      id: "q1",
      question: "¿Cuál es el planeta donde vivimos?",
      options: [
        "Marte",
        "Venus",
        "La Tierra",
        "Júpiter"
      ],
      correctAnswer: 2,
      explanation: "Vivimos en la Tierra, el único planeta conocido donde hay vida con agua, aire respirable y temperatura adecuada."
    },
    {
      id: "q2",
      question: "¿Cuáles son las capas principales de la Tierra?",
      options: [
        "Agua y aire",
        "Corteza, manto y núcleo",
        "Tierra y roca",
        "Lava y gas"
      ],
      correctAnswer: 1,
      explanation: "La Tierra tiene tres capas principales: la corteza (exterior), el manto (intermedia) y el núcleo (interior caliente)."
    },
    {
      id: "q3",
      question: "¿Qué es el clima?",
      options: [
        "La lluvia de hoy",
        "La temperatura del día",
        "El patrón de clima a largo plazo de una región",
        "Una tormenta"
      ],
      correctAnswer: 2,
      explanation: "El clima es el patrón de clima característico de una región durante largo tiempo. Es diferente del tiempo que es diario."
    },
    {
      id: "q4",
      question: "¿Cuáles son los principales recursos naturales?",
      options: [
        "Solo el oro",
        "Agua, aire, minerales, petróleo y bosques",
        "Solo madera",
        "Solo petróleo"
      ],
      correctAnswer: 1,
      explanation: "Los recursos naturales incluyen agua, aire, suelo fértil, minerales, petróleo, gas natural y bosques."
    },
    {
      id: "q5",
      question: "¿Por qué el agua es importante?",
      options: [
        "Solo para beber",
        "Para beber, riego de plantas, industria y vida en general",
        "Solo para bañarse",
        "No es importante"
      ],
      correctAnswer: 1,
      explanation: "El agua es esencial para la vida. La usamos para beber, riego, industria, higiene y es hogar de muchos animales."
    },
    {
      id: "q6",
      question: "¿Qué causa el cambio climático?",
      options: [
        "Nada específico",
        "La emisión de gases que atrapan calor en la atmósfera",
        "El viento",
        "Los océanos"
      ],
      correctAnswer: 1,
      explanation: "El cambio climático es causado principalmente por la emisión de gases de efecto invernadero que atrapan calor en la atmósfera."
    },
    {
      id: "q7",
      question: "¿Cuál es el recurso renovable?",
      options: [
        "El petróleo",
        "El gas natural",
        "La energía solar",
        "El mineral"
      ],
      correctAnswer: 2,
      explanation: "La energía solar es renovable porque el sol continuará brillando. Los combustibles fósiles no se renuevan rápidamente."
    },
    {
      id: "q8",
      question: "¿Por qué debemos cuidar los bosques?",
      options: [
        "No hay razón",
        "Producen oxígeno, protegen animales y evitan erosión",
        "Solo por belleza",
        "No importan"
      ],
      correctAnswer: 1,
      explanation: "Los bosques producen oxígeno, protegen el hogar de muchos animales y previenen la erosión del suelo."
    },
    {
      id: "q9",
      question: "¿Qué es la erosión?",
      options: [
        "Una enfermedad",
        "La desgaste del suelo por agua, viento y actividad humana",
        "Una planta",
        "Un mineral"
      ],
      correctAnswer: 1,
      explanation: "La erosión es el desgaste gradual del suelo causado por agua, viento, lluvia y actividades humanas como deforestación."
    },
    {
      id: "q10",
      question: "¿Cómo puedo ayudar a cuidar el planeta?",
      options: [
        "No puedo hacer nada",
        "Ahorrar agua, usar menos plástico, plantar árboles y reciclar",
        "No importa",
        "Es muy difícil"
      ],
      correctAnswer: 1,
      explanation: "Todos podemos ayudar ahorrando agua, reduciendo plástico, plantando árboles, reciclando y siendo responsables con el ambiente."
    }
  ],
  energy_movement: [
    {
      id: "q1",
      question: "¿Qué es la fuerza?",
      options: [
        "Algo que no existe",
        "Un empujón o tirón que causa movimiento o cambio",
        "Solo el peso",
        "Solo la velocidad"
      ],
      correctAnswer: 1,
      explanation: "La fuerza es un empujón o tirón que causa que algo se mueva, acelere, desacelere o cambie de forma."
    },
    {
      id: "q2",
      question: "¿Qué es el movimiento?",
      options: [
        "Algo quieto",
        "El cambio de posición de un objeto respecto al tiempo",
        "El peso",
        "El color"
      ],
      correctAnswer: 1,
      explanation: "El movimiento es el cambio de posición de un objeto. Un objeto se mueve cuando cambia de lugar."
    },
    {
      id: "q3",
      question: "¿Qué es la energía?",
      options: [
        "Una enfermedad",
        "La capacidad de realizar trabajo o producir cambios",
        "El calor",
        "La fuerza"
      ],
      correctAnswer: 1,
      explanation: "La energía es la capacidad de realizar trabajo. Sin energía, nada en el universo podría moverse o cambiar."
    },
    {
      id: "q4",
      question: "¿Cuáles son los tipos principales de energía?",
      options: [
        "Solo calor",
        "Cinética, potencial, térmica, eléctrica, química, luminosa",
        "Solo luz",
        "Solo movimiento"
      ],
      correctAnswer: 1,
      explanation: "Hay muchos tipos: energía cinética (movimiento), potencial (posición), térmica (calor), eléctrica, química y luminosa (luz)."
    },
    {
      id: "q5",
      question: "¿Qué es la energía cinética?",
      options: [
        "Energía guardada",
        "Energía del movimiento",
        "Energía del calor",
        "Energía del color"
      ],
      correctAnswer: 1,
      explanation: "La energía cinética es la energía que tiene un objeto en movimiento. Cuanto más rápido se mueve, más energía cinética tiene."
    },
    {
      id: "q6",
      question: "¿Qué es la energía potencial?",
      options: [
        "Energía en movimiento",
        "Energía almacenada por posición o composición",
        "Energía del calor",
        "Energía del sonido"
      ],
      correctAnswer: 1,
      explanation: "La energía potencial es la energía almacenada. Ejemplos: una pelota en alto, un resorte estirado, o agua en una presa."
    },
    {
      id: "q7",
      question: "¿Qué es la gravedad?",
      options: [
        "Un color",
        "La fuerza que atrae los objetos hacia la Tierra",
        "Una enfermedad",
        "Un sonido"
      ],
      correctAnswer: 1,
      explanation: "La gravedad es la fuerza invisible que atrae todos los objetos hacia la Tierra, haciendo que caigan hacia abajo."
    },
    {
      id: "q8",
      question: "¿Cómo se transforma la energía?",
      options: [
        "No se transforma",
        "De un tipo a otro, pero nunca se crea ni se destruye",
        "Se crea constantemente",
        "Se desaparece"
      ],
      correctAnswer: 1,
      explanation: "La energía puede transformarse de un tipo a otro (química en cinética en una carrera), pero nunca se crea ni se destruye."
    },
    {
      id: "q9",
      question: "¿Qué es el rozamiento?",
      options: [
        "Un sabor",
        "Una fuerza que se opone al movimiento entre superficies",
        "Una enfermedad",
        "Un color"
      ],
      correctAnswer: 1,
      explanation: "El rozamiento es una fuerza que se opone al movimiento cuando dos superficies se rozan. Causa calor y ralentiza el movimiento."
    },
    {
      id: "q10",
      question: "¿Qué sucede cuando aplicamos fuerza a un objeto?",
      options: [
        "Nada",
        "Se acelera, desacelera o cambia de dirección",
        "Se convierte invisible",
        "Desaparece"
      ],
      correctAnswer: 1,
      explanation: "Según la ley de Newton, cuando aplicamos fuerza a un objeto, este acelera, desacelera o cambia de dirección."
    }
  ]
}

const getShuffledQuestion = (question: Question): Question => {
  const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5)
  const newCorrectAnswer = shuffledOptions.indexOf(question.options[question.correctAnswer])
  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectAnswer
  }
}

export default function ScienceQuiz({
  quiz,
  onBack,
  onQuizComplete,
}: {
  quiz: { id: string; title: string }
  onBack: () => void
  onQuizComplete?: (score: number) => void
}) {
  const [questions] = useState(() => {
    let qs = scienceQuizzes[quiz.id] || []
    return qs.map(q => getShuffledQuestion(q))
  })
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (completed && onQuizComplete) {
      const timer = setTimeout(() => {
        onQuizComplete(score)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [completed, score, onQuizComplete])

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 10)
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

  const handleBackFromResults = () => {
    console.log("📌 Mandando puntos", score, "para modulo:", quiz.id);
    agregarPuntos(score, quiz.id);
  
    if (onQuizComplete) {
      onQuizComplete(score);
    }
  
    onBack();
  };
  

  if (completed) {
    const isSuccess = score >= 65

    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-green-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <div className="text-6xl mb-6">{isSuccess ? "🎉" : "📚"}</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¡Cuestionario Completado!</h2>
          <p className="text-2xl text-gray-600 mb-4">
            Obtuviste {score} puntos
          </p>
          <p className="text-lg text-gray-600 mb-4">de 100 puntos posibles</p>
          <p className="text-sm text-gray-500 mb-8">
            {isSuccess ? "✨ ¡Excelente! Desbloqueaste los juegos 🎮" : "Sigue practicando para desbloquear los juegos (necesitas 65 puntos)"}
          </p>
          <button
            onClick={handleBackFromResults}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Volver a Lección
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
          <h2 className="text-2xl font-bold text-gray-900">Cuestionario de Ciencias</h2>
          <p className="text-gray-600">
            Pregunta {currentQuestion + 1} de {questions.length}
          </p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <Card className="bg-white border-0 shadow-lg p-8 rounded-2xl mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">{question.question}</h3>

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
                  : "bg-gray-100 border-2 border-gray-200 text-gray-900 hover:border-blue-300"
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

        {isAnswered && (
          <button
            onClick={handleNext}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
          >
            {currentQuestion === questions.length - 1 ? "Ver Resultados" : "Siguiente Pregunta"}
          </button>
        )}
      </Card>
    </div>
  )
}
