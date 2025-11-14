export type Example = {
  title: string;
  operation: string;
  explanation: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number; // índice de la opción correcta
};

export type MathTopic = {
  id: string;
  title: string;
  icon: string;
  explanation: string;
  examples: Example[];
  quiz: QuizQuestion[];
  background: string;
};

// -------------------------------------------
//  BASE DE DATOS COMPLETA  (CORREGIDA)
// -------------------------------------------

export const topicsData: Record<string, MathTopic> = {
  // 1) SUMAS DEL 1 AL 10
  "sumas-1-10": {
    id: "sumas-1-10",
    title: "Sumas del 1 al 10",
    icon: "➕",
    background:
      "https://img.freepik.com/foto-gratis/fondo-dibujos-animados-3d-ninos_23-2150473169.jpg",
    explanation: `
La suma es combinar dos o más números para obtener un total.

En primer grado practicamos sumas simples con números del 1 al 10.
Puedes usar tus dedos, tapitas, dibujos u objetos para ayudarte.

Pasos para sumar:
1. Empieza en el primer número.
2. Cuenta hacia adelante tantas veces como indique el segundo número.
3. El número donde terminas es el resultado (la suma).
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "2 + 3 = ?",
        explanation:
          "Comenzamos en 2 y contamos 3 posiciones hacia adelante: (3, 4, 5). El resultado es 5.",
      },
      {
        title: "Ejemplo 2",
        operation: "4 + 5 = ?",
        explanation:
          "Comenzamos en 4 y contamos 5 posiciones más: (5, 6, 7, 8, 9). El resultado es 9.",
      },
    ],
    quiz: [
      {
        question: "¿Cuánto es 1 + 3?",
        options: ["2", "4", "5", "6"],
        correct: 1,
      },
      {
        question: "¿Cuánto es 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1,
      },
      {
        question: "Si tengo 3 caramelos y me dan 2 más, ¿cuántos tengo?",
        options: ["4", "5", "6", "3"],
        correct: 1,
      },
      {
        question: "¿Cuál suma da 7?",
        options: ["3 + 3", "4 + 3", "2 + 2", "1 + 5"],
        correct: 1,
      },
      {
        question: "¿Cuánto es 5 + 4?",
        options: ["8", "9", "10", "7"],
        correct: 1,
      },
      {
        question: "Tengo 1 globo y me regalan 6 más. ¿Qué suma es?",
        options: ["1 + 3", "1 + 4", "1 + 6", "1 + 2"],
        correct: 2,
      },
    ],
  },

  // 2) RESTAS DEL 1 AL 10
  "restas-1-10": {
    id: "restas-1-10",
    title: "Restas del 1 al 10",
    icon: "➖",
    background: "https://i.ytimg.com/vi/42vjqtleG9E/maxresdefault.jpg",
    explanation: `
Restar es quitar o sacar una parte de algo.

Si tienes 7 galletas y te comes 2, estás restando: 7 - 2.

Pasos para restar:
1. Empieza en el número grande.
2. Cuenta hacia atrás tantas veces como indique el número que quitas.
3. El número donde terminas es el resultado (la resta).
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "7 - 2 = ?",
        explanation:
          "Comenzamos en 7 y contamos 2 hacia atrás: (6, 5). El resultado es 5.",
      },
      {
        title: "Ejemplo 2",
        operation: "9 - 4 = ?",
        explanation:
          "Comenzamos en 9 y contamos 4 hacia atrás: (8, 7, 6, 5). El resultado es 5.",
      },
    ],
    quiz: [
      {
        question: "¿Cuánto es 5 - 2?",
        options: ["2", "3", "4", "1"],
        correct: 1,
      },
      {
        question: "Si tengo 8 globos y reviento 3, ¿cuántos quedan?",
        options: ["4", "5", "6", "3"],
        correct: 1,
      },
      {
        question: "¿Cuál resta da 4?",
        options: ["6 - 2", "7 - 4", "5 - 1", "9 - 6"],
        correct: 3,
      },
      {
        question: "¿Cuánto es 10 - 3?",
        options: ["6", "7", "8", "5"],
        correct: 1,
      },
      {
        question: "Tenía 9 caramelos y regalo 5. ¿Cuántos quedan?",
        options: ["4", "3", "5", "2"],
        correct: 0,
      },
      {
        question: "Tenía 6 lápices y perdí 1. ¿Qué operación es?",
        options: ["6 - 1", "6 - 2", "6 + 1", "5 - 1"],
        correct: 0,
      },
    ],
  },

  // 3) NÚMEROS HASTA 100
  "numeros-100": {
    id: "numeros-100",
    title: "Números hasta 100",
    icon: "🔢",
    background: "https://i.ytimg.com/vi/EpiqZsdTW0s/maxresdefault.jpg",
    explanation: `
Los números nos sirven para contar cosas.

En primer grado aprendemos a contar, leer y escribir números del 0 al 100.

Es importante:
- Saber el orden: cuál va antes y cuál después.
- Reconocer si un número es mayor o menor.
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "¿Qué número va después de 29?",
        explanation: "Después de 29 viene 30.",
      },
      {
        title: "Ejemplo 2",
        operation: "¿Qué número va antes de 50?",
        explanation: "Antes de 50 viene 49.",
      },
    ],
    quiz: [
      {
        question: "¿Qué número viene después del 19?",
        options: ["18", "20", "21", "22"],
        correct: 1,
      },
      {
        question: "¿Qué número va antes del 40?",
        options: ["39", "38", "41", "42"],
        correct: 0,
      },
      {
        question: "¿Cuál es el número más grande?",
        options: ["56", "65", "54", "45"],
        correct: 1,
      },
      {
        question: "¿Cuál es el número más pequeño?",
        options: ["80", "70", "90", "100"],
        correct: 1,
      },
      {
        question: "¿Cuál número es mayor que 32 y menor que 34?",
        options: ["31", "32", "33", "35"],
        correct: 2,
      },
      {
        question: "¿Cuál está bien ordenado de menor a mayor?",
        options: ["5,4,6", "2,3,4", "9,8,7", "10,8,9"],
        correct: 1,
      },
    ],
  },

  // 4) FIGURAS
  figuras: {
    id: "figuras",
    title: "Figuras geométricas básicas",
    icon: "🔷",
    background: "https://i.ytimg.com/vi/SkMtFUv0DAI/maxresdefault.jpg",
    explanation: `
Las figuras geométricas son formas que vemos todos los días.

Figuras importantes:
- Círculo: no tiene lados.
- Cuadrado: 4 lados iguales.
- Rectángulo: 4 lados (2 largos y 2 cortos).
- Triángulo: tiene 3 lados.
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "Rueda de bicicleta",
        explanation: "Tiene forma de círculo.",
      },
      {
        title: "Ejemplo 2",
        operation: "Puerta de salón",
        explanation: "Generalmente es un rectángulo.",
      },
    ],
    quiz: [
      {
        question: "¿Qué figura tiene 3 lados?",
        options: ["Cuadrado", "Triángulo", "Rectángulo"],
        correct: 1,
      },
      {
        question: "¿Qué figura no tiene lados?",
        options: ["Círculo", "Cuadrado", "Triángulo"],
        correct: 0,
      },
      {
        question: "¿Cuál tiene 4 lados iguales?",
        options: ["Rectángulo", "Triángulo", "Cuadrado"],
        correct: 2,
      },
      {
        question: "¿Qué figura se parece a una galleta redonda?",
        options: ["Triángulo", "Círculo", "Cuadrado"],
        correct: 1,
      },
      {
        question: "¿Qué figura se parece a una tablet?",
        options: ["Rectángulo", "Círculo", "Triángulo"],
        correct: 0,
      },
      {
        question: "¿Cuál es una figura 2D?",
        options: ["Cubo", "Esfera", "Cuadrado"],
        correct: 2,
      },
    ],
  },

  // 5) CLASIFICACIÓN
  clasificacion: {
    id: "clasificacion",
    title: "Clasificación de objetos",
    icon: "🎨",
    background:
      "https://i.ytimg.com/vi/Fs7tRZgOD70/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDPoHKsl3pDDv-TkyICdXjLe6MaIw",
    explanation: `
Clasificar es agrupar objetos que se parecen.

Podemos clasificar por:
- Color
- Tamaño
- Forma
- Uso
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "Lápices de colores",
        explanation: "Agrupar rojos, azules, verdes...",
      },
      {
        title: "Ejemplo 2",
        operation: "Clasificar juguetes",
        explanation: "Carros, muñecas y pelotas separados.",
      },
    ],
    quiz: [
      {
        question: "¿Qué significa clasificar?",
        options: ["Romper cosas", "Agrupar cosas", "Contar"],
        correct: 1,
      },
      {
        question: "¿Cómo clasificar pelotas, muñecas y carritos?",
        options: ["Todos juntos", "Por color", "Por tipo"],
        correct: 2,
      },
      {
        question: "Separar ropa de verano e invierno es:",
        options: ["Clasificar", "Sumar", "Restar"],
        correct: 0,
      },
      {
        question: "¿Cuál está bien clasificado por color?",
        options: [
          "Pelota roja y azul",
          "Pelota roja y camiseta roja",
          "Pelota roja y cuchara",
        ],
        correct: 1,
      },
      {
        question: "Para clasificar por tamaño observamos:",
        options: ["Color", "Peso", "Grande o pequeño"],
        correct: 2,
      },
      {
        question: "¿Qué grupo está clasificado por forma?",
        options: ["Círculos y cuadrados", "Ropa y comida", "Juguetes y platos"],
        correct: 0,
      },
    ],
  },

  // 6) PROBLEMAS DE SUMA
  "problemas-suma": {
    id: "problemas-suma",
    title: "Problemas simples de suma",
    icon: "📝",
    background:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEwLLNpAjed1g3rOvJySX2sQxrzdbY0S3YV9gTFWKXTtvxjnYPlSPrHlcMVJDWIfFqs4k&usqp=CAU",
    explanation: `
Los problemas de suma son historias donde juntamos cantidades.

Pasos:
1. Lee el problema.
2. Identifica los números.
3. Escribe la operación.
4. Suma.
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "María tiene 3 y recibe 2",
        explanation: "3 + 2 = 5",
      },
      {
        title: "Ejemplo 2",
        operation: "Hay 4 niños y entran 3 más",
        explanation: "4 + 3 = 7",
      },
    ],
    quiz: [
      {
        question: "Luis tiene 2 carros y recibe 3 más",
        options: ["4", "5", "6"],
        correct: 1,
      },
      {
        question: "Hay 5 pelotas y agregan 2",
        options: ["6", "7", "8"],
        correct: 1,
      },
      {
        question: "Hay 1 lápiz y 4 borradores",
        options: ["4", "5", "6"],
        correct: 1,
      },
      {
        question: "Ana tiene 3 stickers y compra 3",
        options: ["5", "6", "7"],
        correct: 1,
      },
      {
        question: "Hay 6 niños y llegan 2 más",
        options: ["7", "8", "9"],
        correct: 1,
      },
      {
        question: "4 pájaros y llega 1 más",
        options: ["4", "5", "6"],
        correct: 1,
      },
    ],
  },

  // 7) MAYOR / MENOR
  "mayor-menor": {
    id: "mayor-menor",
    title: "Mayor / Menor",
    icon: "⚖️",
    background:
      "https://img.freepik.com/vector-gratis/fondo-numeros-coloridos_23-2148157049.jpg",
    explanation: `
Comparar números nos permite saber cuál es mayor o menor.

Símbolos:
> mayor que
< menor que
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "8 > 3",
        explanation: "8 es mayor que 3.",
      },
      {
        title: "Ejemplo 2",
        operation: "2 < 9",
        explanation: "2 es menor que 9.",
      },
    ],
    quiz: [
      {
        question: "¿Cuál es mayor: 7 o 5?",
        options: ["5", "7", "Iguales"],
        correct: 1,
      },
      {
        question: "¿Cuál es menor: 4 o 9?",
        options: ["4", "9", "Iguales"],
        correct: 0,
      },
      { question: "3 __ 6", options: [">", "<", "="], correct: 1 },
      { question: "10 __ 2", options: [">", "<", "="], correct: 0 },
      {
        question: "Número mayor: 12, 21, 11",
        options: ["12", "21", "11"],
        correct: 1,
      },
      {
        question: "Número menor: 18, 13, 20",
        options: ["18", "13", "20"],
        correct: 1,
      },
    ],
  },

  // 8) CONTEO
  conteo: {
    id: "conteo",
    title: "Conteo de objetos",
    icon: "🎁",
    background:
      "https://img.freepik.com/foto-gratis/fondo-colorido-numeros_23-2148150968.jpg",
    explanation: `
Contar es decir números en orden mientras observamos objetos.
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "5 pelotas",
        explanation: "Contamos: 1,2,3,4,5",
      },
      {
        title: "Ejemplo 2",
        operation: "3 sillas",
        explanation: "Contamos: 1,2,3",
      },
    ],
    quiz: [
      { question: "Ves 4 manzanas", options: ["3", "4", "5"], correct: 1 },
      {
        question: "1,2,3,4… ¿Qué sigue?",
        options: ["5", "6", "7"],
        correct: 0,
      },
      { question: "2 pelotas + 1 más", options: ["2", "3", "4"], correct: 1 },
      { question: "Dedos en una mano", options: ["4", "5", "6"], correct: 1 },
      { question: "3 autos + 2 más", options: ["4", "5", "6"], correct: 1 },
      { question: "Ningún juguete es:", options: ["1", "2", "0"], correct: 2 },
    ],
  },

  // 9) SERIES NUMÉRICAS
  series: {
    id: "series",
    title: "Series numéricas simples",
    icon: "📊",
    background:
      "https://img.freepik.com/vector-gratis/fondo-colores-numeros_23-2148176161.jpg",
    explanation: `
Las series siguen un patrón.

Ejemplos:
- 1 en 1
- 2 en 2
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "1,2,3,4,_",
        explanation: "Sigue 1 en 1 → 5",
      },
      {
        title: "Ejemplo 2",
        operation: "2,4,6,8,_",
        explanation: "Sigue 2 en 2 → 10",
      },
    ],
    quiz: [
      { question: "1,2,3,4,__", options: ["5", "6", "7"], correct: 0 },
      { question: "5,6,7,__", options: ["8", "9", "10"], correct: 0 },
      { question: "2,4,6,__", options: ["7", "8", "9"], correct: 1 },
      { question: "10,9,8,__", options: ["7", "6", "5"], correct: 0 },
      { question: "3,5,7,__", options: ["8", "9", "10"], correct: 1 },
      { question: "0,2,4,6,__", options: ["7", "8", "9"], correct: 1 },
    ],
  },

  // 10) ORDENAR NÚMEROS
  ordenar: {
    id: "ordenar",
    title: "Ordenar números",
    icon: "📈",
    background:
      "https://img.freepik.com/foto-gratis/fondo-numeros-coloridos_23-2147836549.jpg",
    explanation: `
Ordenar números es colocarlos de menor a mayor o de mayor a menor.
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "5,2,8",
        explanation: "Menor a mayor → 2,5,8",
      },
      {
        title: "Ejemplo 2",
        operation: "3,7,1",
        explanation: "Mayor a menor → 7,3,1",
      },
    ],
    quiz: [
      {
        question: "Ordena: 3,1,2",
        options: ["3,2,1", "1,2,3", "2,3,1"],
        correct: 1,
      },
      {
        question: "Ordena: 4,6,2",
        options: ["2,4,6", "6,4,2", "4,2,6"],
        correct: 1,
      },
      {
        question: "Número menor en 9,5,7",
        options: ["9", "5", "7"],
        correct: 1,
      },
      {
        question: "Número mayor en 8,3,6",
        options: ["3", "6", "8"],
        correct: 2,
      },
      {
        question: "Ordena: 10,8,9",
        options: ["8,9,10", "10,9,8", "9,10,8"],
        correct: 0,
      },
      {
        question: "Ordena: 1,4,3",
        options: ["1,3,4", "4,3,1", "3,4,1"],
        correct: 1,
      },
    ],
  },
};
