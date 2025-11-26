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

export const topicsData5: Record<string, MathTopic> = {

  // --------------------------------------------------
  // 1) SUMAS DEL 1 AL 10 — MEMORY
  // --------------------------------------------------
"sumas-restas-5to": {
  id: "sumas-restas-5to",
  title: "Sumas y restas hasta 100 000",
  icon: "➕➖",
  gameId: "memory",
  background: "https://img.freepik.com/vector-premium/fondo-matematicas-numeros_23-2148148628.jpg",
  image: "https://static.wixstatic.com/media/3e1d47_7cd5f719059b4fdcb71cbb18ce87140e~mv2.png",

  explanation: `
En quinto grado trabajamos sumas y restas con números grandes
hasta 100 mil.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "45 500 + 32 250", explanation: "→ 77 750" },
    { title: "Ejemplo 2", operation: "90 000 - 28 500", explanation: "→ 61 500" }
  ],

  quiz: [
    { question: "50 000 + 25 000 = ?", options: ["65 000", "75 000", "85 000"], correct: 1 },
    { question: "100 000 - 40 000 = ?", options: ["60 000", "50 000", "70 000"], correct: 0 },
  ],
},

  // --------------------------------------------------
  // 2) RESTAS DEL 1 AL 10 — ORDER
  // --------------------------------------------------
"multiplicacion-5to": {
  id: "multiplicacion-5to",
  title: "Multiplicación hasta 3 cifras",
  icon: "✖️",
  gameId: "fast",
  background: "https://img.freepik.com/vector-premium/fondo-educativo_23-2149071360.jpg",
  image: "https://static.wixstatic.com/media/5f14ab_69e6f27bb1b44c15bc7bf0c8d10c9730~mv2.png",

  explanation: `
Multiplicamos números de 2 y 3 cifras.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "125 × 12", explanation: "→ 1 500" },
    { title: "Ejemplo 2", operation: "340 × 25", explanation: "→ 8 500" }
  ],

  quiz: [
    { question: "120 × 10 = ?", options: ["1200", "1400"], correct: 0 },
    { question: "250 × 12 = ?", options: ["3000", "3500"], correct: 0 },
  ],
},

  // --------------------------------------------------
  // 3) NÚMEROS HASTA 100 — FAST
  // --------------------------------------------------
 "division-5to": {
  id: "division-5to",
  title: "División por 1 y 2 cifras",
  icon: "➗",
  gameId: "order",
  background: "https://i.imgur.com/0hpQeIq.jpeg",
  image: "https://www.smartick.es/imagenes/blog/mi-division.png",

  explanation: `
Divisiones largas con números grandes.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "450 ÷ 15", explanation: "→ 30" },
    { title: "Ejemplo 2", operation: "900 ÷ 25", explanation: "→ 36" }
  ],

  quiz: [
    { question: "600 ÷ 12 = ?", options: ["50", "60"], correct: 0 },
    { question: "800 ÷ 25 = ?", options: ["32", "30"], correct: 0 },
  ],
},



  // --------------------------------------------------
  // 4) FIGURAS GEOMÉTRICAS — MEMORY
  // --------------------------------------------------
 "fracciones-5to": {
  id: "fracciones-5to",
  title: "Fracciones y equivalencias",
  icon: "🧮",
  gameId: "memory",
  background: "https://i.imgur.com/8Y6zGXi.jpeg",
  image: "https://i.imgur.com/2XWflhn.png",

  explanation: `
Aprendemos fracciones equivalentes, simplificación y suma/resta básica.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "1/2 = 2/4", explanation: "Fracciones equivalentes." },
    { title: "Ejemplo 2", operation: "1/3 + 1/3", explanation: "→ 2/3" },
  ],

  quiz: [
    { question: "¿Cuál es equivalente a 1/2?", options: ["2/4", "3/5"], correct: 0 },
    { question: "1/4 + 1/4 =", options: ["1/2", "2/4"], correct: 0 },
  ],
},


  // --------------------------------------------------
  // 5) CLASIFICACIÓN — ORDER
  // --------------------------------------------------
 "decimales-5to": {
  id: "decimales-5to",
  title: "Decimales básicos",
  icon: "🔢",
  gameId: "fast",
  background: "https://i.imgur.com/w6jgJq4.jpeg",
  image: "https://i.imgur.com/1Uy8aK3.png",

  explanation: `
Leemos, comparamos y ordenamos décimas y centésimas.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "0.5 es mayor que 0.3", explanation: "→ 0.5 > 0.3" },
    { title: "Ejemplo 2", operation: "Ordenar: 0.1, 0.9, 0.5", explanation: "→ 0.1, 0.5, 0.9" }
  ],

  quiz: [
    { question: "¿Cuál es mayor?", options: ["0.45", "0.5"], correct: 1 },
    { question: "¿Cuál es menor?", options: ["0.9", "0.12"], correct: 1 },
  ],
},



  // --------------------------------------------------
  // 6) PROBLEMAS DE SUMA — FAST
  // --------------------------------------------------
 "area-5to": {
  id: "area-5to",
  title: "Área y perímetro avanzado",
  icon: "📐",
  gameId: "order",
  background: "https://i.imgur.com/FP7tLUF.jpeg",
  image: "https://i.imgur.com/np8F94O.png",

  explanation: `
Calculamos áreas y perímetros de figuras compuestas.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "Rectángulo 5×8", explanation: "Área: 40 u²" },
    { title: "Ejemplo 2", operation: "Triángulo base 6, altura 4", explanation: "Área: 12 u²" }
  ],

  quiz: [
    { question: "Área de 10×4", options: ["40", "50"], correct: 0 },
    { question: "Perímetro de cuadrado de 6", options: ["24", "18"], correct: 0 },
  ],
},



  // --------------------------------------------------
  // 7) MAYOR / MENOR — ORDER
  // --------------------------------------------------
  "graficos-5to": {
  id: "graficos-5to",
  title: "Gráficos y datos",
  icon: "📊",
  gameId: "memory",
  background: "https://i.imgur.com/vClSZ8d.jpeg",
  image: "https://i.imgur.com/VFnIPLa.png",

  explanation: `
Interpretamos gráficos de barras y pictogramas.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "Gráfico de frutas", explanation: "La columna más alta → más cantidad." },
    { title: "Ejemplo 2", operation: "Pictograma de alumnos", explanation: "Cada dibujo vale una cantidad." }
  ],

  quiz: [
    { question: "Si una barra es más alta…", options: ["Representa más", "Representa menos"], correct: 0 },
    { question: "¿Qué gráfico usa dibujitos?", options: ["Pictograma", "Línea"], correct: 0 },
  ],
},

  // --------------------------------------------------
  // 8) CONTEO — MEMORY
  // --------------------------------------------------
 "patrones-5to": {
  id: "patrones-5to",
  title: "Patrones numéricos",
  icon: "🔢",
  gameId: "fast",
  background: "https://i.imgur.com/9oJtVhN.jpeg",
  image: "https://i.imgur.com/C7e0GfM.png",

  explanation: `
Series avanzadas: de 3 en 3, 5 en 5, multiplicativas…
  `,

  examples: [
    { title: "Ejemplo 1", operation: "2, 5, 8, 11, _", explanation: "→ 14" },
    { title: "Ejemplo 2", operation: "3, 6, 12, 24, _", explanation: "→ 48" },
  ],

  quiz: [
    { question: "10, 20, 30, __", options: ["35", "40"], correct: 1 },
    { question: "5, 10, 20, __", options: ["30", "40"], correct: 1 },
  ],
},


  // --------------------------------------------------
  // 9) SERIES NUMÉRICAS — FAST
  // --------------------------------------------------
 "problemas-5to": {
  id: "problemas-5to",
  title: "Problemas de dos operaciones",
  icon: "📝",
  gameId: "order",
  background: "https://i.imgur.com/PrJUKSU.jpeg",
  image: "https://i.imgur.com/Lz9ikPY.png",

  explanation: `
Resolución de problemas con 2 pasos: suma + multiplicación, resta + división, etc.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "Compro 3 cajas de 12", explanation: "3×12 → 36" },
    { title: "Ejemplo 2", operation: "Tengo 40 y regalo 12", explanation: "40−12 → 28" }
  ],

  quiz: [
    { question: "Compro 4 bolsas de 10", options: ["40", "50"], correct: 0 },
    { question: "Tengo 60 y gasto 15", options: ["45", "55"], correct: 0 },
  ],
},

  // --------------------------------------------------
  // 10) ORDENAR NÚMEROS — ORDER
  // --------------------------------------------------
 "ordenar-5to": {
  id: "ordenar-5to",
  title: "Ordenar números hasta 100 000",
  icon: "📈",
  gameId: "order",
  background: "https://i.imgur.com/oAPdyQI.jpeg",
  image: "https://cdn0.unprofesor.com/es/posts/5/2/0/ordenar_numeros_25_orig.jpg",

  explanation: `
Ordenamos números grandes de menor a mayor y viceversa.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "55 000, 12 000, 89 000", explanation: "→ 12 000, 55 000, 89 000" },
    { title: "Ejemplo 2", operation: "40 200, 40 150, 40 300", explanation: "→ 40 150, 40 200, 40 300" }
  ],

  quiz: [
    { question: "Ordena: 12 000, 5 000, 20 000", options: ["5k,12k,20k", "20k,12k,5k"], correct: 0 },
    { question: "Número mayor: 45 600, 44 900, 45 550", options: ["45 600", "45 550"], correct: 0 },
  ],
},

}; // <-- cierre correcto del objeto
