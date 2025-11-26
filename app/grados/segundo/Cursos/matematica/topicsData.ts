

export type Example = {
  title: string;
  operation: string;
  explanation: string;
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
};

export type MathTopic = {
  id: string;
  title: string;
  icon: string;
  explanation: string;
  examples: Example[];
  quiz: QuizQuestion[];
  background: string;
  image: string;
  gameId: "memory" | "order" | "fast";
};

// -------------------------------------------
// BASE DE DATOS COMPLETA (CORREGIDA)
// -------------------------------------------

export const topicsData2: Record<string, MathTopic> = {

  // --------------------------------------------------
  // 1) SUMAS DEL 1 AL 10 — MEMORY
  // --------------------------------------------------
  "sumas-1-20-2do": {
    id: "sumas-1-20-2do",
    title: "Sumas del 1 al 20",
    icon: "➕",
    gameId: "memory",

    background: "https://img.freepik.com/fondo-colorido",
    image: "https://i.imgur.com/SLJvFWA.jpeg",

    explanation: `
La suma en segundo grado avanza hasta el 20.
Recordamos:
1. Iniciamos en el primer número.
2. Avanzamos hacia adelante el segundo número.
3. El último número es el resultado.
`,

    examples: [
      { title: "Ejemplo 1", operation: "12 + 5 = ?", explanation: "12,13,14,15,16,17 → 17" },
      { title: "Ejemplo 2", operation: "7 + 9 = ?", explanation: "7,8,9,10,11,12,13,14,15,16 → 16" },
    ],

    quiz: [
      { question: "8 + 7 = ?", options: ["13", "14", "15"], correct: 0 },
      { question: "10 + 5 = ?", options: ["14", "15", "16"], correct: 1 },
      { question: "9 + 8 = ?", options: ["16", "17", "18"], correct: 1 },
      { question: "12 + 6 = ?", options: ["17", "18"], correct: 1 },
      { question: "4 + 15 = ?", options: ["18", "19", "20"], correct: 1 },
    ],
  },

  // --------------------------------------------------
  // 2) RESTAS DEL 1 AL 10 — ORDER
  // --------------------------------------------------
  "restas-1-20-2do": {
    id: "restas-1-20-2do",
    title: "Restas del 1 al 20",
    icon: "➖",
    gameId: "order",

    background: "https://i.imgur.com/9F8FiTb.jpeg",
    image: "https://i.imgur.com/4geqJc6.jpeg",

    explanation: `
Restamos cantidades dentro del rango del 1 al 20.
1. Empezamos en el número mayor.
2. Retrocedemos la cantidad restada.
3. El número final es la respuesta.
`,

    examples: [
      { title: "Ejemplo 1", operation: "15 - 6 = ?", explanation: "15→14→13→12→11→10→9 → 9" },
      { title: "Ejemplo 2", operation: "18 - 9 = ?", explanation: "18→9 → resultado 9" },
    ],

    quiz: [
      { question: "14 - 5 = ?", options: ["8", "9", "10"], correct: 1 },
      { question: "20 - 7 = ?", options: ["12", "13", "14"], correct: 1 },
      { question: "11 - 6 = ?", options: ["4", "5", "6"], correct: 1 },
      { question: "17 - 8 = ?", options: ["8", "9", "10"], correct: 1 },
      { question: "19 - 9 = ?", options: ["9", "10"], correct: 0 },
    ],
  },

  // --------------------------------------------------
  // 3) SUMAS CON LLEVADA — FAST
  // --------------------------------------------------
  "sumas-llevada-2do": {
    id: "sumas-llevada-2do",
    title: "Sumas con llevada",
    icon: "🧮",
    gameId: "fast",

    background: "https://i.imgur.com/G9cQeDg.jpeg",
    image: "https://i.imgur.com/Y6Smu5b.jpeg",

    explanation: `
La llevada ocurre cuando la suma de unidades supera 10.
Ejemplo:
  8 + 7 = 15 → escribimos 5 y llevamos 1.
`,

    examples: [
      { title: "Ejemplo 1", operation: "8 + 7", explanation: "8+7=15 → se lleva 1." },
      { title: "Ejemplo 2", operation: "9 + 6", explanation: "9+6=15 → se lleva 1." },
    ],

    quiz: [
      { question: "8 + 7 = ?", options: ["14", "15", "16"], correct: 1 },
      { question: "9 + 8 = ?", options: ["15", "16", "17"], correct: 1 },
      { question: "7 + 6 = ?", options: ["13", "14"], correct: 0 },
      { question: "5 + 9 = ?", options: ["13", "14", "15"], correct: 1 },
      { question: "6 + 7 = ?", options: ["12", "13", "14"], correct: 1 },
    ],
  },

  // --------------------------------------------------
  // 4) RESTAS CON LLEVADA — MEMORY
  // --------------------------------------------------
  "restas-llevada-2do": {
    id: "restas-llevada-2do",
    title: "Restas con llevada",
    icon: "📉",
    gameId: "memory",

    background: "https://i.imgur.com/YIjhMD8.jpeg",
    image: "https://i.imgur.com/GOnfvZ1.jpeg",

    explanation: `
Para restar con llevada:
Si el número de arriba es menor que el de abajo, se pide 1 decena prestada.
`,

    examples: [
      { title: "Ejemplo 1", operation: "14 - 7", explanation: "10+4 → 14, 14-7=7" },
      { title: "Ejemplo 2", operation: "13 - 9", explanation: "10+3 → 13, 13-9=4" },
    ],

    quiz: [
      { question: "14 - 8 = ?", options: ["5", "6", "7"], correct: 1 },
      { question: "13 - 7 = ?", options: ["6", "7", "8"], correct: 0 },
      { question: "15 - 9 = ?", options: ["5", "6"], correct: 1 },
      { question: "12 - 8 = ?", options: ["3", "4"], correct: 1 },
      { question: "18 - 9 = ?", options: ["8", "9"], correct: 1 },
    ],
  },

  // --------------------------------------------------
  // 5) TABLAS DEL 2 Y 3 — FAST
  // --------------------------------------------------
  "tablas-2-3-2do": {
    id: "tablas-2-3-2do",
    title: "Tablas del 2 y 3",
    icon: "✖️",
    gameId: "fast",

    background: "https://i.imgur.com/P5pBOA8.jpeg",
    image: "https://i.imgur.com/wJc1Yv3.jpeg",

    explanation: `
Las tablas son sumas repetidas:
2 × 3 = 2+2+2
3 × 4 = 3+3+3+3
`,

    examples: [
      { title: "Ejemplo 1", operation: "2×4", explanation: "2+2+2+2=8" },
      { title: "Ejemplo 2", operation: "3×3", explanation: "3+3+3=9" },
    ],

    quiz: [
      { question: "2×3 = ?", options: ["5", "6", "7"], correct: 1 },
      { question: "3×3 = ?", options: ["6", "8", "9"], correct: 2 },
      { question: "2×5 = ?", options: ["8", "9", "10"], correct: 2 },
      { question: "3×4 = ?", options: ["10", "11", "12"], correct: 2 },
      { question: "2×7 = ?", options: ["12", "13", "14"], correct: 2 },
    ],
  },

  // --------------------------------------------------
  // 6) FIGURAS GEOMÉTRICAS 2D — MEMORY
  // --------------------------------------------------
  "figuras-2d-2do": {
    id: "figuras-2d-2do",
    title: "Figuras geométricas 2D",
    icon: "🔶",
    gameId: "memory",

    background: "https://i.imgur.com/kqE2K4C.jpeg",
    image: "https://i.imgur.com/vFf2jpJ.jpeg",

    explanation: `
Las figuras en 2D tienen largo y ancho.
Triángulo, cuadrado, rectángulo, pentágono, hexágono.
`,

    examples: [
      { title: "Ejemplo 1", operation: "Señal de alto", explanation: "Es un octágono." },
      { title: "Ejemplo 2", operation: "Ventana", explanation: "Suele ser un rectángulo." },
    ],

    quiz: [
      { question: "Figura con 5 lados", options: ["Pentágono", "Hexágono", "Triángulo"], correct: 0 },
      { question: "¿Cuál tiene 6 lados?", options: ["Hexágono", "Pentágono"], correct: 0 },
      { question: "¿Cuál es redonda?", options: ["Círculo", "Cuadrado"], correct: 0 },
      { question: "¿Cuál tiene 3 lados?", options: ["Triángulo", "Hexágono"], correct: 0 },
      { question: "Figura con 8 lados", options: ["Octágono", "Pentágono"], correct: 0 },
    ],
  },

  // --------------------------------------------------
  // 7) SIMETRÍA — ORDER
  // --------------------------------------------------
  "simetria-2do": {
    id: "simetria-2do",
    title: "Simetría básica",
    icon: "🪞",
    gameId: "order",

    background: "https://i.imgur.com/H1OH4cF.jpeg",
    image: "https://i.imgur.com/IfKXr2W.jpeg",

    explanation: `
La simetría es cuando una figura puede dividirse en dos partes iguales.
`,

    examples: [
      { title: "Ejemplo 1", operation: "Mariposa", explanation: "Tiene simetría vertical." },
      { title: "Ejemplo 2", operation: "Corazón", explanation: "También tiene simetría vertical." },
    ],

    quiz: [
      { question: "¿Qué figura es simétrica?", options: ["Corazón", "Letra F"], correct: 0 },
      { question: "¿Cuál tiene simetría?", options: ["Mariposa", "Silla"], correct: 0 },
      { question: "¿Cuál NO es simétrica?", options: ["Triángulo equilátero", "Letra G"], correct: 1 },
      { question: "Objeto simétrico", options: ["Rostro humano", "Martillo"], correct: 0 },
      { question: "Figura con simetría vertical", options: ["Mariposa", "Zigzag"], correct: 0 },
    ],
  },

  // --------------------------------------------------
  // 8) PROBLEMAS DE SUMA Y RESTA — FAST
  // --------------------------------------------------
  "problemas-sr-2do": {
    id: "problemas-sr-2do",
    title: "Problemas de suma y resta",
    icon: "📝",
    gameId: "fast",

    background: "https://i.imgur.com/yoMGlaA.jpeg",
    image: "https://i.imgur.com/qpSk94r.jpeg",

    explanation: `
Los problemas combinan historias donde se agrega o se quita.
`,

    examples: [
      { title: "Ejemplo 1", operation: "Tenía 12 y me dan 5", explanation: "12+5 = 17" },
      { title: "Ejemplo 2", operation: "Tenía 18 y regalo 7", explanation: "18-7 = 11" },
    ],

    quiz: [
      { question: "María tenía 14 dulces y come 4. ¿Cuántos quedan?", options: ["8", "9", "10"], correct: 1 },
      { question: "Pedro tenía 10 canicas y gana 6 más", options: ["15", "16", "17"], correct: 1 },
      { question: "Había 18 niños y se fueron 8", options: ["10", "11", "12"], correct: 1 },
      { question: "En una caja hay 9 lápices y agregan 7", options: ["15", "16"], correct: 1 },
      { question: "Tenía 20 globos y explotaron 9", options: ["10", "11"], correct: 1 },
    ],
  },

  // --------------------------------------------------
  // 9) NÚMEROS HASTA 200 — MEMORY
  // --------------------------------------------------
  "numeros-200-2do": {
    id: "numeros-200-2do",
    title: "Números hasta 200",
    icon: "🔢",
    gameId: "memory",

    background: "https://i.imgur.com/gWXq7d3.jpeg",
    image: "https://i.imgur.com/Ovd6QCt.jpeg",

    explanation: `
En segundo grado ampliamos los números hasta el 200.
`,

    examples: [
      { title: "Ejemplo 1", operation: "Después de 145", explanation: "Sigue 146" },
      { title: "Ejemplo 2", operation: "Antes de 80", explanation: "Es 79" },
    ],

    quiz: [
      { question: "¿Cuál es mayor?", options: ["145", "167"], correct: 1 },
      { question: "¿Cuál es menor?", options: ["123", "98"], correct: 1 },
      { question: "Después de 178", options: ["179", "180"], correct: 0 },
      { question: "Antes de 100", options: ["98", "99"], correct: 1 },
      { question: "Número entre 110 y 112", options: ["111", "113"], correct: 0 },
    ],
  },

  // --------------------------------------------------
  // 10) PATRONES Y SECUENCIAS — ORDER
  // --------------------------------------------------
  "patrones-2do": {
    id: "patrones-2do",
    title: "Patrones y secuencias",
    icon: "📊",
    gameId: "order",

    background: "https://i.imgur.com/BVbFgmR.jpeg",
    image: "https://i.imgur.com/Q4y6p7D.jpeg",

    explanation: `
Un patrón es una repetición o una regla que se sigue.
`,

    examples: [
      { title: "Ejemplo 1", operation: "2,4,6,8,_", explanation: "Suma de 2 → 10" },
      { title: "Ejemplo 2", operation: "5,10,15,_", explanation: "Suma de 5 → 20" },
    ],

    quiz: [
      { question: "1,3,5,__", options: ["6", "7", "8"], correct: 1 },
      { question: "10,20,30,__", options: ["35", "40"], correct: 1 },
      { question: "2,5,8,__", options: ["10", "11"], correct: 0 },
      { question: "9,7,5,__", options: ["3", "4"], correct: 0 },
      { question: "4,8,12,__", options: ["15", "16"], correct: 1 },
    ],
  },

};
