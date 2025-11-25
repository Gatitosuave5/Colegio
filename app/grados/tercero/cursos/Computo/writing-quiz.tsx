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

interface Quiz {
  id: string
  title: string
}

async function agregarPuntos(puntos: number, lessonId: string | number) {
  const idAlumno = sessionStorage.getItem("idAlumno");
  const codigoSalon = localStorage.getItem("codigoSalon");

  if (!idAlumno || !codigoSalon || !lessonId) return;

  lessonId = lessonId.toString(); // asegurar string
  const key = `puntaje-guardado-${codigoSalon}-${lessonId}-${idAlumno}`;

  console.log("🔎 Key generada:", key);

  //  Solo registrar una vez
  if (localStorage.getItem(key) === "true") {
    console.log(`⚠ Puntaje ya registrado para contenido ${lessonId} (Alumno ${idAlumno})`);
    return;
  }

  //  Registrar directamente por ID (sin buscar por nombre)
  await fetch("https://http://localhost:3001/api/alumnos_temporales/puntaje", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: idAlumno,     // ya tienes el ID real del alumno
      puntaje: puntos,
    }),
  });

  // Guardar estado
  localStorage.setItem(key, "true");
  console.log("✔ Puntaje registrado y bloqueado:", key);
}




const quizzes: Record<string, Question[]> = {
  typing: [
    {
      id: "q1",
      question: "¿Cuál es la posición correcta de los dedos en el teclado?",
      options: [
        "Índices en F y J",
        "Índices en A y L",
        "Todos los dedos en fila",
        "Mano izquierda en letras, derecha en números",
      ],
      correctAnswer: 0,
      explanation: "Los dedos índices deben colocarse en las teclas F y J que tienen pequeños salientes como guía.",
    },
    {
      id: "q2",
      question: "¿Para qué sirven los salientes en las teclas F y J?",
      options: [
        "Para decoración",
        "Para servir como guía táctil de posicionamiento",
        "Para hacer el teclado más resistente",
        "Para nada en particular",
      ],
      correctAnswer: 1,
      explanation: "Estos salientes ayudan a los dedos a encontrar la posición correcta sin mirar el teclado.",
    },
    {
      id: "q3",
      question: "¿Cuál es la técnica para escribir sin mirar el teclado?",
      options: [
        "Dactilografía o mecanografía",
        "Escritura mecánica",
        "Tipeo rápido",
        "Presión digital",
      ],
      correctAnswer: 0,
      explanation: "La dactilografía es la técnica de escribir sin ver el teclado, usando la memoria muscular.",
    },
    {
      id: "q4",
      question: "¿Cómo se debe mantener la postura al escribir?",
      options: [
        "Encorvado sobre el teclado",
        "Recta con codos flexionados y pies apoyados",
        "Recostado en la silla",
        "De pie y alejado del teclado",
      ],
      correctAnswer: 1,
      explanation: "Una buena postura ayuda a prevenir lesiones: espalda recta, codos flexionados, pies apoyados.",
    },
    {
      id: "q5",
      question: "¿Cuál es el beneficio principal de la práctica constante de mecanografía?",
      options: [
        "Aprender a dibujar",
        "Mejorar velocidad, precisión y memoria muscular",
        "Aumentar la fuerza de brazos",
        "Cansar menos los ojos",
      ],
      correctAnswer: 1,
      explanation: "La práctica constante desarrolla memoria muscular y permite escribir rápido sin errores.",
    },
    {
      id: "q6",
      question: "¿Cuál es la velocidad promedio de tipeo para un mecanógrafo profesional?",
      options: [
        "10 palabras por minuto",
        "40-60 palabras por minuto",
        "100-150 palabras por minuto",
        "Más de 200 palabras por minuto",
      ],
      correctAnswer: 2,
      explanation: "Un mecanógrafo profesional tipea entre 100-150 palabras por minuto de forma rápida y precisa.",
    },
    {
      id: "q7",
      question: "¿Qué dedo debe presionar la barra espaciadora?",
      options: [
        "Dedo índice",
        "Dedo pulgar",
        "Dedo meñique",
        "Cualquiera de los dedos",
      ],
      correctAnswer: 1,
      explanation: "El dedo pulgar debe presionar la barra espaciadora en ambas manos para alternar.",
    },
    {
      id: "q8",
      question: "¿Cómo se llama la fila de teclas donde descansan tus dedos?",
      options: [
        "Fila de inicio",
        "Fila de descanso",
        "Fila de inicio (home row)",
        "Fila central",
      ],
      correctAnswer: 2,
      explanation: "La fila de inicio (home row) es donde descansan los dedos: ASDF y JKL;",
    },
    {
      id: "q9",
      question: "¿Cuál es el mejor método para mejorar tu velocidad de escritura?",
      options: [
        "Escribir lentamente",
        "Mirar el teclado constantemente",
        "Practicar diariamente con ejercicios progresivos",
        "Escribir sin ninguna estructura",
      ],
      correctAnswer: 2,
      explanation: "La práctica diaria con ejercicios progresivos es la mejor forma de mejorar velocidad y precisión.",
    },
    {
      id: "q10",
      question: "¿Qué es más importante: velocidad o precisión?",
      options: [
        "Solo velocidad",
        "Solo precisión",
        "Ambas son igualmente importantes",
        "Ninguna importa",
      ],
      correctAnswer: 2,
      explanation: "Ambas son importantes: la velocidad sin errores es el objetivo ideal de la mecanografía.",
    },
  ],
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
      options: ["gato", "Carlos", "hermano", "mesa"],
      correctAnswer: 1,
      explanation: "Carlos es un nombre propio de persona y debe escribirse con mayúscula inicial.",
    },
    {
      id: "q3",
      question: "¿Cómo se escribe correctamente?",
      options: [
        "el gato come pescado",
        "El gato come pescado",
        "EL GATO COME PESCADO",
        "El Gato Come Pescado",
      ],
      correctAnswer: 1,
      explanation: "Solo la primera letra de la oración debe ser mayúscula. El resto debe ser minúscula.",
    },
    {
      id: "q4",
      question: "¿Qué tipos de nombres siempre llevan mayúscula?",
      options: [
        "Solo nombres de personas",
        "Personas, lugares y días especiales",
        "Solo nombres de ciudades",
        "Ninguno, todos en minúscula",
      ],
      correctAnswer: 1,
      explanation: "Los nombres propios (personas, lugares, días festivos) siempre llevan mayúscula inicial.",
    },
    {
      id: "q5",
      question: "¿Cuál es la forma correcta de escribir después de un punto?",
      options: [
        "Continuamos con minúscula",
        "La siguiente letra debe ser mayúscula",
        "Utilizamos signos especiales",
        "No importa, puede ser cualquiera",
      ],
      correctAnswer: 1,
      explanation: "Después de un punto, la primera letra de la nueva oración debe ser mayúscula.",
    },
    {
      id: "q6",
      question: "¿Cómo se escribe el nombre de una ciudad?",
      options: [
        "lima",
        "Lima",
        "LIMA",
        "LiMa",
      ],
      correctAnswer: 1,
      explanation: "Los nombres de ciudades son nombres propios y se escriben con mayúscula inicial: Lima, Madrid, París.",
    },
    {
      id: "q7",
      question: "¿Qué oración está escrita correctamente?",
      options: [
        "mi Amiga María vive en españa",
        "Mi amiga María vive en España",
        "Mi amiga maria vive en españa",
        "Mi Amiga maria Vive En España",
      ],
      correctAnswer: 1,
      explanation: "Inicio de oración en mayúscula, nombres propios con mayúscula inicial: María, España.",
    },
    {
      id: "q8",
      question: "¿Cómo se escriben los días de la semana en español?",
      options: [
        "Siempre en mayúscula (LUNES)",
        "En minúscula (lunes)",
        "Depende del contexto",
        "Con mayúscula inicial (Lunes)",
      ],
      correctAnswer: 1,
      explanation: "En español, los días de la semana se escriben en minúscula: lunes, martes, miércoles.",
    },
    {
      id: "q9",
      question: "¿Cuál es la regla para escribir después de signos como ? y !?",
      options: [
        "Seguimos con minúscula",
        "Escribimos con mayúscula",
        "Depende de la oración",
        "No hay regla",
      ],
      correctAnswer: 1,
      explanation: "Después de ? y !, si empieza una oración nueva, debe llevar mayúscula inicial.",
    },
    {
      id: "q10",
      question: "¿Cómo se escriben correctamente los meses?",
      options: [
        "ENERO, FEBRERO, MARZO",
        "enero, febrero, marzo",
        "Enero, Febrero, Marzo",
        "EnEro, FeBrero, MarZo",
      ],
      correctAnswer: 1,
      explanation: "Los meses en español se escriben en minúscula: enero, febrero, marzo.",
    },
  ],
  textcopying: [
    {
      id: "q1",
      question: "¿Qué es una adivinanza?",
      options: [
        "Un juego de palabras que describe algo de forma misteriosa",
        "Una frase muy larga",
        "Un cuento corto",
        "Una rima obligatoria",
      ],
      correctAnswer: 0,
      explanation: "Una adivinanza es un juego de palabras que describe algo de forma misteriosa para que otro adivine.",
    },
    {
      id: "q2",
      question: "¿Qué son las rimas?",
      options: [
        "Palabras que suenan igual en su final",
        "Palabras de colores",
        "Palabras muy largas",
        "Palabras escritas al revés",
      ],
      correctAnswer: 0,
      explanation: "Las rimas son palabras que tienen sonidos similares al final, como 'sol' y 'color'.",
    },
    {
      id: "q3",
      question: "¿Cuál es la finalidad de copiar textos?",
      options: [
        "Perder tiempo",
        "Practicar escritura, mejorar la concentración y memorizar",
        "Molestar a otros",
        "Hacer trampas en pruebas",
      ],
      correctAnswer: 1,
      explanation: "Copiar textos ayuda a practicar la escritura, mejorar concentración y memorización.",
    },
    {
      id: "q4",
      question: "¿Cómo ayudan las frases motivadoras?",
      options: [
        "No ayudan en nada",
        "Inspiran, motivan y mejoran el ánimo",
        "Solo sirven para leer",
        "Son completamente inútiles",
      ],
      correctAnswer: 1,
      explanation: "Las frases motivadoras nos inspiran, motivan y nos ayudan a reflexionar sobre mensajes positivos.",
    },
    {
      id: "q5",
      question: "¿Por qué practicar versos y rimas?",
      options: [
        "No hay razón para hacerlo",
        "Mejora pronunciación, memorización y apreciación del lenguaje",
        "Es aburrido",
        "Solo sirve para poetas",
      ],
      correctAnswer: 1,
      explanation: "Los versos y rimas mejoran pronunciación, memorización y la apreciación del lenguaje español.",
    },
    {
      id: "q6",
      question: "¿Cuál es la estructura básica de una adivinanza?",
      options: [
        "Pregunta y respuesta",
        "Solo descripción misteriosa",
        "Descripción misteriosa para adivinar",
        "Una historia larga",
      ],
      correctAnswer: 2,
      explanation: "Una adivinanza es una descripción misteriosa de algo para que otro intente adivinar qué es.",
    },
    {
      id: "q7",
      question: "¿Cómo te ayuda copiar versos?",
      options: [
        "A olvidar palabras",
        "A mejorar escritura y memorizar cadencias",
        "A dormir",
        "No ayuda",
      ],
      correctAnswer: 1,
      explanation: "Copiar versos ayuda a mejorar la escritura y a memorizar las cadencias y ritmos del lenguaje.",
    },
    {
      id: "q8",
      question: "¿Qué es una rima consonante?",
      options: [
        "Palabras que suenan igual en la vocal",
        "Palabras con sonidos iguales desde la última vocal",
        "Palabras sin relación",
        "Palabras muy largas",
      ],
      correctAnswer: 1,
      explanation: "Una rima consonante es cuando dos palabras tienen sonidos iguales desde la última vocal acentuada.",
    },
    {
      id: "q9",
      question: "¿Cuál es el objetivo principal de una frase motivadora?",
      options: [
        "Hacer perder tiempo",
        "Inspirar reflexión y ánimo positivo",
        "Confundir",
        "Complicar la vida",
      ],
      correctAnswer: 1,
      explanation: "El objetivo es inspirar reflexión profunda y crear un ánimo positivo en quien la lee.",
    },
    {
      id: "q10",
      question: "¿Cómo se beneficia tu escritura al copiar textos regularmente?",
      options: [
        "No se beneficia",
        "Mejora velocidad, precisión y memoria muscular",
        "Solo aprende palabras",
        "Es una pérdida de tiempo",
      ],
      correctAnswer: 1,
      explanation: "La copia regular mejora velocidad, precisión, memoria muscular y retención de vocabulario.",
    },
  ],
  words: [
    {
      id: "q1",
      question: "¿Qué es una sílaba?",
      options: [
        "Una palabra completa",
        "Una parte pequeña de una palabra que se pronuncia junta",
        "Una letra",
        "Una oración",
      ],
      correctAnswer: 1,
      explanation: "Una sílaba es una unidad de pronunciación de una palabra. Cada palabra tiene una o más sílabas.",
    },
    {
      id: "q2",
      question: "¿Cuántas sílabas tiene la palabra 'mariposa'?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "La palabra 'mariposa' se divide en: ma-ri-po-sa, que son 4 sílabas.",
    },
    {
      id: "q3",
      question: "¿Cuántas sílabas tiene 'gato'?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 1,
      explanation: "La palabra 'gato' tiene 2 sílabas: ga-to.",
    },
    {
      id: "q4",
      question: "¿Cuántas sílabas tiene 'escuela'?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      explanation: "La palabra 'escuela' tiene 3 sílabas: es-cue-la.",
    },
    {
      id: "q5",
      question: "¿Cuántas sílabas tiene 'elefante'?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "La palabra 'elefante' tiene 4 sílabas: e-le-fan-te.",
    },
    {
      id: "q6",
      question: "¿Cuál palabra tiene 2 sílabas?",
      options: ["Computadora", "Libro", "Televisión", "Refrigerador"],
      correctAnswer: 1,
      explanation: "La palabra 'libro' tiene 2 sílabas: li-bro. Las otras tienen más sílabas.",
    },
    {
      id: "q7",
      question: "¿Para qué sirve dividir las palabras en sílabas?",
      options: [
        "Para perder tiempo",
        "Para mejorar lectura, escritura y pronunciación",
        "Solo es un juego",
        "Para confundir",
      ],
      correctAnswer: 1,
      explanation: "Dividir en sílabas ayuda a mejorar la lectura, escritura, pronunciación y ortografía.",
    },
    {
      id: "q8",
      question: "¿Cuántas sílabas tiene 'sol'?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 0,
      explanation: "La palabra 'sol' tiene 1 sílaba. Es una palabra monosílaba.",
    },
    {
      id: "q9",
      question: "¿Cuántas sílabas tiene 'cocodrilo'?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      explanation: "La palabra 'cocodrilo' tiene 4 sílabas: co-co-dri-lo.",
    },
    {
      id: "q10",
      question: "¿Cuántas sílabas tiene 'abeja'?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
      explanation: "La palabra 'abeja' tiene 3 sílabas: a-be-ja.",
    },
  ],
  numbers: [
    {
      id: "q1",
      question: "¿Cuál es el símbolo de suma?",
      options: ["-", "+", "×", "÷"],
      correctAnswer: 1,
      explanation: "El símbolo + representa suma u operación de adición.",
    },
    {
      id: "q2",
      question: "¿Cuál es el símbolo de resta?",
      options: ["+", "-", "×", "÷"],
      correctAnswer: 1,
      explanation: "El símbolo - representa resta u operación de sustracción.",
    },
    {
      id: "q3",
      question: "¿Cuál es el símbolo de multiplicación?",
      options: ["+", "-", "×", "÷"],
      correctAnswer: 2,
      explanation: "El símbolo × representa multiplicación u operación de producto.",
    },
    {
      id: "q4",
      question: "¿Cuál es el símbolo de división?",
      options: ["+", "-", "×", "÷"],
      correctAnswer: 3,
      explanation: "El símbolo ÷ representa división u operación de cociente.",
    },
    {
      id: "q5",
      question: "¿Cuánto es 5 + 3?",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "5 + 3 = 8. Se suman los números para obtener el resultado.",
    },
    {
      id: "q6",
      question: "¿Cuánto es 10 - 4?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
      explanation: "10 - 4 = 6. Se restan los números para obtener el resultado.",
    },
    {
      id: "q7",
      question: "¿Cuánto es 3 × 4?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      explanation: "3 × 4 = 12. Se multiplican los números para obtener el resultado.",
    },
    {
      id: "q8",
      question: "¿Cuánto es 12 ÷ 3?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      explanation: "12 ÷ 3 = 4. Se divide 12 entre 3 para obtener el resultado.",
    },
    {
      id: "q9",
      question: "¿Para qué sirve practicar con números?",
      options: [
        "Solo para perder tiempo",
        "Para mejorar la comprensión matemática",
        "Para confundir",
        "No sirve para nada",
      ],
      correctAnswer: 1,
      explanation: "Practicar con números mejora tu velocidad en mecanografía y tu comprensión de operaciones matemáticas.",
    },
    {
      id: "q10",
      question: "¿Dónde está el teclado numérico en el computador?",
      options: [
        "A la izquierda del teclado",
        "En la parte inferior del teclado",
        "A la derecha del teclado principal",
        "En el medio del teclado",
      ],
      correctAnswer: 2,
      explanation: "El teclado numérico se encuentra a la derecha del teclado principal en la mayoría de computadoras.",
    },
  ],
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

export default function WritingQuiz({
  quiz,
  lessonId,
  onBack,
  onQuizComplete,
}: {
  quiz: { id: string; title: string }
  lessonId: string
  onBack: () => void
  onQuizComplete?: (score: number) => void
}) {
  const [questions] = useState(() => {
    let qs = quizzes[quiz.id] || []
    return qs.map(q => getShuffledQuestion(q))
  })
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)



  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 10)
    } else {
      setScore(prevScore => Math.max(0, prevScore - 2))
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
    agregarPuntos(score, lessonId);
  
    const idAlumno = sessionStorage.getItem("idAlumno");
  
    if (onQuizComplete) {
      // 🔓 Si llegó a 65 o más, marcamos la lección como desbloqueada por ID único
      if (typeof window !== "undefined" && score >= 65 && lessonId && idAlumno) {
        sessionStorage.setItem(`unlocked-${lessonId}-${idAlumno}`, "true");
      }
  
      onQuizComplete(score);
    }
  
    onBack();
  };
  

  if (completed) {
    const message = score < 50 
      ? "¡Felicidades! Tuviste " + score + " puntos"
      : "Puedes mejorar! Tuviste " + score + " puntos"

    return (
      <div className="text-center">
        <Card className="bg-gradient-to-b from-green-50 to-white border-0 shadow-lg p-12 rounded-2xl">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¡Cuestionario Completado!</h2>
          <p className="text-2xl text-gray-600 mb-4">
            {message}
          </p>
          <p className="text-lg text-gray-600 mb-4">de 100 puntos posibles</p>
          <p className="text-sm text-gray-500 mb-8">
            {score >= 65 ? "¡Excelente! Desbloqueaste los juegos 🎮" : "Practica más para desbloquear los juegos"}
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
          <h2 className="text-2xl font-bold text-gray-900">Cuestionario</h2>
          <p className="text-gray-600">
            Pregunta {currentQuestion + 1} de {questions.length}
          </p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
          >
            {currentQuestion === questions.length - 1 ? "Ver Resultados" : "Siguiente Pregunta"}
          </button>
        )}
      </Card>
    </div>
  )
}
