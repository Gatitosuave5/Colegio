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

export const topicsData6: Record<string, MathTopic> = {

  // --------------------------------------------------
  // 1) SUMAS DEL 1 AL 10 — MEMORY
  // --------------------------------------------------
"operaciones-6to": {
  id: "operaciones-6to",
  title: "Operaciones con números hasta 1 000 000",
  icon: "🧮",
  gameId: "memory",
  background: "https://i.ytimg.com/vi/-12_pB7TaWs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDbwivweR6Qyr7qeRLeN3HIvQeE-g",
  image: "https://i.ytimg.com/vi/vP7hxxBkUBs/maxresdefault.jpg",

  explanation: `
En sexto grado resolvemos sumas, restas, multiplicaciones y divisiones 
con números muy grandes, hasta un millón.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "250 000 + 125 000", explanation: "→ 375 000" },
    { title: "Ejemplo 2", operation: "900 000 - 350 000", explanation: "→ 550 000" }
  ],

  quiz: [
    { question: "400 000 + 120 000 = ?", options: ["520 000", "510 000"], correct: 0 },
    { question: "900 000 - 450 000 = ?", options: ["450 000", "400 000"], correct: 0 },
  ],
},


  // --------------------------------------------------
  // 2) RESTAS DEL 1 AL 10 — ORDER
  // --------------------------------------------------
"multiplos-6to": {
  id: "multiplos-6to",
  title: "Múltiplos y divisores",
  icon: "➗",
  gameId: "order",
  background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqhCpTkQ2pBf8RJvW9Xo2oHyLOG4YsFVp5qw&s",
  image: "https://i.ytimg.com/vi/uTa4IiVNUoA/maxresdefault.jpg",

  explanation: `
Aprendemos a identificar múltiplos, divisores y números compuestos y primos.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "Múltiplos de 6", explanation: "6, 12, 18, 24..." },
    { title: "Ejemplo 2", operation: "Divisores de 12", explanation: "1, 2, 3, 4, 6, 12" }
  ],

  quiz: [
    { question: "¿Cuál es múltiplo de 7?", options: ["21", "22"], correct: 0 },
    { question: "¿Cuál es divisor de 20?", options: ["5", "7"], correct: 0 },
  ],
},


  // --------------------------------------------------
  // 3) NÚMEROS HASTA 100 — FAST
  // --------------------------------------------------
 "fracciones-6to": {
  id: "fracciones-6to",
  title: "Fracciones y operaciones",
  icon: "🧩",
  gameId: "memory",
  background: "https://i.ytimg.com/vi/qJb7zc8NX-s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAXsIPvS-O-SBgvIXyzSyluAHz4ow",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKNRbwD6cm_W6ULXVUREC48-WSiGZ_7qa2CA&s",

  explanation: `
Operamos fracciones: suma, resta, multiplicación y división.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "1/2 + 1/3", explanation: "→ 5/6" },
    { title: "Ejemplo 2", operation: "3/4 × 2/3", explanation: "→ 1/2" }
  ],

  quiz: [
    { question: "1/3 + 1/6 =", options: ["1/2", "2/3"], correct: 0 },
    { question: "2/3 × 3/4 =", options: ["1/2", "5/6"], correct: 0 },
  ],
},



  // --------------------------------------------------
  // 4) FIGURAS GEOMÉTRICAS — MEMORY
  // --------------------------------------------------
 "porcentajes-6to": {
  id: "porcentajes-6to",
  title: "Decimales y porcentajes",
  icon: "💯",
  gameId: "fast",
  background: "https://i.ytimg.com/vi/kn5-Yux5cTs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBnClbKBUi5gKnkYZDO-NYGTRIqTg",
  image: "https://image.slidesharecdn.com/porcentajestercerciclo-160116153240/75/Matematicas-5-y-6-Porcentajes-3-2048.jpg",

  explanation: `
Transformamos decimales a porcentajes y resolvemos ejercicios.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "0.25 → %", explanation: "→ 25%" },
    { title: "Ejemplo 2", operation: "40% de 200", explanation: "→ 80" }
  ],

  quiz: [
    { question: "0.5 = ?", options: ["50%", "5%"], correct: 0 },
    { question: "25% de 100", options: ["25", "50"], correct: 0 },
  ],
},


  // --------------------------------------------------
  // 5) CLASIFICACIÓN — ORDER
  // --------------------------------------------------
 "area-6to": {
  id: "area-6to",
  title: "Área y perímetro de figuras complejas",
  icon: "📐",
  gameId: "order",
  background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQd87jPNu_Zj837SjGt5TThGfpfF4OAg-dvM79G1eeA-qLPAqH0APttd5cdT9stF2AT6c&usqp=CAU",
  image: "https://i.ytimg.com/vi/Pa7GPWCcLiY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDKAd-2K7or70DoH5_5wude5ux0FA",

  explanation: `
Calculamos áreas y perímetros de figuras formadas por varias partes.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "Rectángulo 12×8", explanation: "Área: 96 u²" },
    { title: "Ejemplo 2", operation: "Triángulo base 10, altura 6", explanation: "→ 30 u²" }
  ],

  quiz: [
    { question: "Área de 15×4", options: ["60", "50"], correct: 0 },
    { question: "Perímetro de cuadrado de lado 9", options: ["36", "45"], correct: 0 },
  ],
},



  // --------------------------------------------------
  // 6) PROBLEMAS DE SUMA — FAST
  // --------------------------------------------------
 "volumen-6to": {
  id: "volumen-6to",
  title: "Volumen y cuerpos geométricos",
  icon: "📦",
  gameId: "memory",
  background: "https://i.ytimg.com/vi/rjU4Q73PfMc/maxresdefault.jpg",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoXv_N6D4I4ZFf5JCW-1F-b4tYHvSUQ7EduA&s",

  explanation: `
Aprendemos volumen de prismas, cubos y cuerpos simples.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "Cubo 4×4×4", explanation: "Volumen: 64 u³" },
    { title: "Ejemplo 2", operation: "Prisma 5×3×2", explanation: "→ 30 u³" }
  ],

  quiz: [
    { question: "Volumen de cubo de lado 5", options: ["125", "150"], correct: 0 },
    { question: "Volumen de 6×3×2", options: ["36", "30"], correct: 0 },
  ],
},


  // --------------------------------------------------
  // 7) MAYOR / MENOR — ORDER
  // --------------------------------------------------
 "coordenadas-6to": {
  id: "coordenadas-6to",
  title: "Coordenadas en el plano cartesiano",
  icon: "📍",
  gameId: "fast",
  background: "https://i.ytimg.com/vi/U0lErxJJL88/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDziEGmmFRInreVEFaFpn4PyqpN1g",
  image: "https://to2alcole.wordpress.com/wp-content/uploads/2020/10/557e7-a2139-35.jpg",

  explanation: `
Leemos puntos en el plano usando (x, y).
  `,

  examples: [
    { title: "Ejemplo 1", operation: "(3,5)", explanation: "X=3, Y=5" },
    { title: "Ejemplo 2", operation: "(0,4)", explanation: "X=0, Y=4" }
  ],

  quiz: [
    { question: "En (4,2), ¿cuál es Y?", options: ["2", "4"], correct: 0 },
    { question: "(0,7) → X ?", options: ["0", "7"], correct: 0 },
  ],
},

  // --------------------------------------------------
  // 8) CONTEO — MEMORY
  // --------------------------------------------------
 "estadistica-6to": {
  id: "estadistica-6to",
  title: "Gráficos estadísticos",
  icon: "📊",
  gameId: "memory",
  background: "https://www.mundoprimaria.com/wp-content/uploads/2021/10/graficos-y-tablas-elementales-en-primaria-para-ninos.jpg",
  image: "https://i.ytimg.com/vi/v1gjpY59UBE/maxresdefault.jpg",

  explanation: `
Interpretamos gráficos de barras, líneas y circulares.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "Gráfico circular", explanation: "El sector más grande representa mayor cantidad." },
    { title: "Ejemplo 2", operation: "Gráfico de barras", explanation: "Comparación visual." }
  ],

  quiz: [
    { question: "¿Cuál gráfico usa círculos?", options: ["Circular", "Barras"], correct: 0 },
    { question: "Si una barra es baja, representa…", options: ["Menos", "Más"], correct: 0 },
  ],
},


  // --------------------------------------------------
  // 9) SERIES NUMÉRICAS — FAST
  // --------------------------------------------------
"patrones-6to": {
  id: "patrones-6to",
  title: "Patrones numéricos avanzados",
  icon: "♻️",
  gameId: "fast",
  background: "https://i.ytimg.com/vi/Sp_JE7nFNVc/sddefault.jpg",
  image: "https://i.ytimg.com/vi/vYYcAxjkVnI/maxresdefault.jpg",

  explanation: `
Patrones crecientes, decrecientes y multiplicativos avanzados.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "5, 10, 20, 40, _", explanation: "→ 80" },
    { title: "Ejemplo 2", operation: "2, 8, 32, _", explanation: "→ 128" }
  ],

  quiz: [
    { question: "3,6,12,24,__", options: ["48", "36"], correct: 0 },
    { question: "7,14,28,__", options: ["56", "48"], correct: 0 },
  ],
},

  // --------------------------------------------------
  // 10) ORDENAR NÚMEROS — ORDER
  // --------------------------------------------------
"razonamiento-6to": {
  id: "razonamiento-6to",
  title: "Problemas de lógica y razonamiento",
  icon: "🧠",
  gameId: "order",
  background: "https://i.ytimg.com/vi/e9_2JwggZ7I/maxresdefault.jpg",
  image: "https://i.ytimg.com/vi/kkPJjRgWQbU/maxresdefault.jpg",

  explanation: `
Problemas que requieren análisis, estrategias y varios pasos.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "Luis tiene 3 veces lo de Ana…", explanation: "Analizar antes de operar." },
    { title: "Ejemplo 2", operation: "Un objeto vale 20% más…", explanation: "Aplicamos porcentajes." }
  ],

  quiz: [
    { question: "Si Pedro tiene el doble que Ana y Ana tiene 5, Pedro tiene:", options: ["10", "8"], correct: 0 },
    { question: "Si algo aumenta 20% de 100", options: ["120", "110"], correct: 0 },
  ],
},

}; // <-- cierre correcto del objeto
