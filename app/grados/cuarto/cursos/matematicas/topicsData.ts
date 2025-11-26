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

export const topicsData4: Record<string, MathTopic> = {

  // --------------------------------------------------
  // 1) SUMAS DEL 1 AL 10 — MEMORY
  // --------------------------------------------------
"sumas-4to": {
  id: "sumas-4to",
  title: "Sumas con números hasta 10 000",
  icon: "➕",
  gameId: "memory",
  background: "https://img.freepik.com/vector-premium/fondo-matematicas-numeros_23-2148148628.jpg",
  image: "https://static.wixstatic.com/media/3e1d47_7cd5f719059b4fdcb71cbb18ce87140e~mv2.png",

  explanation: `
En cuarto grado aprendemos a sumar números grandes usando orden de unidades, decenas, centenas y unidades de millar.
Pasos:
1. Alinea los números.
2. Suma columna por columna.
3. Si una columna supera 10, llevas 1 a la siguiente.
  `,

  examples: [
    {
      title: "Ejemplo 1",
      operation: "2450 + 1325 = ?",
      explanation: "Sumamos por columnas → resultado 3775."
    },
    {
      title: "Ejemplo 2",
      operation: "5030 + 2604 = ?",
      explanation: "Sumamos por columnas → resultado 7634."
    }
  ],

  quiz: [
    { question: "2 350 + 1 200 = ?", options: ["3550", "4550", "1230"], correct: 0 },
    { question: "4 500 + 3 200 = ?", options: ["7700", "7500", "6800"], correct: 0 },
    { question: "1 999 + 1 001 = ?", options: ["3000", "2000", "2999"], correct: 0 },
    { question: "3 260 + 540 = ?", options: ["3700", "3800", "4000"], correct: 0 },
    { question: "5 000 + 4 999 = ?", options: ["9999", "9000", "10000"], correct: 0 },
  ],
},


  // --------------------------------------------------
  // 2) RESTAS DEL 1 AL 10 — ORDER
  // --------------------------------------------------
"restas-4to": {
  id: "restas-4to",
  title: "Restas con números hasta 10 000",
  icon: "➖",
  gameId: "order",
  background: "https://st4.depositphotos.com/1156795/39428/i/450/depositphotos_394284600-stock-photo-math-line-icons-seamless-pattern.jpg",
  image: "https://www.smartick.es/imagenes/blog/resta-llevadas.png",

  explanation: `
Para restar números grandes debemos colocar las cifras alineadas y, si falta, pedir prestado.
  `,

  examples: [
    {
      title: "Ejemplo 1",
      operation: "9000 - 2350 = ?",
      explanation: "Restamos columna por columna → 6650."
    },
    {
      title: "Ejemplo 2",
      operation: "7050 - 3890 = ?",
      explanation: "→ 3160."
    }
  ],

  quiz: [
    { question: "4500 - 2300 = ?", options: ["2100", "2200", "2300"], correct: 1 },
    { question: "9000 - 4999 = ?", options: ["4001", "5001", "4500"], correct: 0 },
    { question: "7800 - 300 = ?", options: ["7500", "7600", "7700"], correct: 1 },
    { question: "10000 - 8888 = ?", options: ["1112", "1222", "1000"], correct: 0 },
    { question: "6000 - 2650 = ?", options: ["3450", "3350", "3550"], correct: 0 },
  ],
},

  // --------------------------------------------------
  // 3) NÚMEROS HASTA 100 — FAST
  // --------------------------------------------------
 "multiplicacion-4to": {
  id: "multiplicacion-4to",
  title: "Multiplicación hasta 2 cifras",
  icon: "✖️",
  gameId: "fast",
  background: "https://img.freepik.com/vector-premium/fondo-dibujos-animados-estilo-escuela_23-2149329639.jpg",
  image: "https://static.wixstatic.com/media/5f14ab_69e6f27bb1b44c15bc7bf0c8d10c9730~mv2.png",

  explanation: `
Aprendemos a multiplicar números de 1 o 2 cifras.
La multiplicación es una suma repetida.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "12 × 3", explanation: "12 + 12 + 12 = 36." },
    { title: "Ejemplo 2", operation: "25 × 4", explanation: "→ 100." },
  ],

  quiz: [
    { question: "12 × 2 = ?", options: ["24", "22"], correct: 0 },
    { question: "15 × 3 = ?", options: ["45", "30"], correct: 0 },
    { question: "9 × 6 = ?", options: ["54", "63"], correct: 0 },
    { question: "25 × 4 = ?", options: ["100", "75"], correct: 0 },
    { question: "30 × 3 = ?", options: ["90", "100"], correct: 0 },
  ],
},


  // --------------------------------------------------
  // 4) FIGURAS GEOMÉTRICAS — MEMORY
  // --------------------------------------------------
 "division-4to": {
  id: "division-4to",
  title: "División básica",
  icon: "➗",
  gameId: "fast",
  background: "https://img.freepik.com/vector-gratis/fondo-educativo-dibujado-mano_23-2148814674.jpg",
  image:
    "https://www.smartick.es/imagenes/blog/mi-division.png",

  explanation: `
Dividir es repartir en partes iguales.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "20 ÷ 4 = 5", explanation: "Repartes 20 en 4 grupos → 5." },
    { title: "Ejemplo 2", operation: "45 ÷ 5 = 9", explanation: "→ 9." },
  ],

  quiz: [
    { question: "30 ÷ 5 = ?", options: ["6", "5"], correct: 0 },
    { question: "40 ÷ 8 = ?", options: ["5", "6"], correct: 0 },
    { question: "18 ÷ 2 = ?", options: ["9", "8"], correct: 0 },
    { question: "36 ÷ 6 = ?", options: ["6", "5"], correct: 0 },
    { question: "45 ÷ 9 = ?", options: ["5", "4"], correct: 0 },
  ],
},


  // --------------------------------------------------
  // 5) CLASIFICACIÓN — ORDER
  // --------------------------------------------------
 "figuras-4to": {
  id: "figuras-4to",
  title: "Figuras geométricas avanzadas",
  icon: "🔷",
  gameId: "memory",
  background: "https://i.imgur.com/3Rdv1SP.png",
  image: "https://i.pinimg.com/originals/07/f1/68/07f168481617f9d0611a0d468efa1e32.jpg",

  explanation: `
Aprendemos polígonos: triángulos, cuadriláteros, pentágonos y hexágonos.
  `,

  examples: [
    {
      title: "Ejemplo 1",
      operation: "Pentágono",
      explanation: "Tiene 5 lados."
    },
    {
      title: "Ejemplo 2",
      operation: "Hexágono",
      explanation: "Tiene 6 lados."
    }
  ],

  quiz: [
    { question: "¿Cuántos lados tiene un pentágono?", options: ["5", "6", "7", "4"], correct: 0 },
    { question: "Un octágono tiene:", options: ["8 lados", "7 lados", "5 lados"], correct: 0 },
    { question: "El cuadrado es un:", options: ["Cuadrilátero", "Pentágono"], correct: 0 },
    { question: "Figura de 3 lados:", options: ["Triángulo", "Hexágono"], correct: 0 },
    { question: "Figura de 6 lados:", options: ["Hexágono", "Pentágono"], correct: 0 },
  ],
},


  // --------------------------------------------------
  // 6) PROBLEMAS DE SUMA — FAST
  // --------------------------------------------------
 "clasificacion-4to": {
  id: "clasificacion-4to",
  title: "Clasificación avanzada",
  icon: "🎨",
  gameId: "order",
  background: "https://i.imgur.com/83TyjPF.jpeg",
  image: "https://i.imgur.com/6E98BoJ.png",

  explanation: `
Clasificamos objetos según varias características: uso, origen, material y tamaño.
  `,

  examples: [
    { title: "Ejemplo 1", operation: "Objetos de metal", explanation: "Tijeras, llaves, clavos." },
    { title: "Ejemplo 2", operation: "Objetos de madera", explanation: "Mesa, regla, lápiz." },
  ],

  quiz: [
    { question: "¿Cuál es un objeto de vidrio?", options: ["Vaso", "Mesa"], correct: 0 },
    { question: "¿Cuál es de plástico?", options: ["Botella", "Plato de cerámica"], correct: 0 },
    { question: "¿Cuál viene de un animal?", options: ["Lana", "Metal"], correct: 0 },
    { question: "¿Cuál es un mineral?", options: ["Piedra", "Madera"], correct: 0 },
    { question: "¿Cuál es un objeto tecnológico?", options: ["Celular", "Cuchara"], correct: 0 },
  ],
},


  // --------------------------------------------------
  // 7) MAYOR / MENOR — ORDER
  // --------------------------------------------------
  "mayor-menor": {
    id: "mayor-menor",
    title: "Mayor / Menor",
    icon: "⚖️",
    gameId: "order",

    background:
      "https://i0.wp.com/www.actividadesdeinfantilyprimaria.com/wp-content/uploads/2020/06/Actividad-interactiva-concepto-mayor-menor-en-nu%CC%81meros-.png",

    image: "https://i.ytimg.com/vi/v67X2aonkU4/maxresdefault.jpg",

    explanation: `
Comparar números nos permite saber cuál es mayor y cuál es menor.
> mayor que
< menor que
`,

    examples: [
      { title: "Ejemplo 1", operation: "8 > 3", explanation: "8 es mayor que 3." },
      { title: "Ejemplo 2", operation: "2 < 9", explanation: "2 es menor que 9." },
    ],

    quiz: [
      { question: "¿Cuál es mayor: 7 o 5?", options: ["5", "7", "Iguales"], correct: 1 },
      { question: "¿Cuál es menor: 4 o 9?", options: ["4", "9", "Iguales"], correct: 0 },
      { question: "3 __ 6", options: [">", "<", "="], correct: 1 },
      { question: "10 __ 2", options: [">", "<", "="], correct: 0 },
      { question: "Número mayor: 12, 21, 11", options: ["12", "21", "11"], correct: 1 },
      { question: "Número menor: 18, 13, 20", options: ["18", "13", "20"], correct: 1 },
      { question: "¿Cuál es mayor: 15 o 15?", options: ["15", "15", "Iguales"], correct: 2 },
      { question: "5 __ 9", options: [">", "<", "="], correct: 1 },
      { question: "Número mayor: 7, 3, 10", options: ["7", "3", "10"], correct: 2 },
      { question: "Número menor: 8, 14, 6", options: ["8", "14", "6"], correct: 2 },
    ],
  },

  // --------------------------------------------------
  // 8) CONTEO — MEMORY
  // --------------------------------------------------
  conteo: {
    id: "conteo",
    title: "Conteo de objetos",
    icon: "🎁",
    gameId: "memory",

    background:
      "https://st.depositphotos.com/28960142/51466/v/450/depositphotos_514660806-stock-illustration-how-many-objects-preschool-counting.jpg",

    image:
      "https://content.tinytap.it/10E66D1D-2B60-4E6E-AEC7-033928D3EAE5/coverImage.png?ver=0",

    explanation: `
Contar es decir números en orden mientras observamos objetos.
`,

    examples: [
      { title: "Ejemplo 1", operation: "5 pelotas", explanation: "Contamos 1,2,3,4,5" },
      { title: "Ejemplo 2", operation: "3 sillas", explanation: "Contamos 1,2,3" },
    ],

    quiz: [
      { question: "Ves 4 manzanas", options: ["3", "4", "5"], correct: 1 },
      { question: "1,2,3,4… ¿Qué sigue?", options: ["5", "6", "7"], correct: 0 },
      { question: "2 pelotas + 1 más", options: ["2", "3", "4"], correct: 1 },
      { question: "Dedos en una mano", options: ["4", "5", "6"], correct: 1 },
      { question: "3 autos + 2 más", options: ["4", "5", "6"], correct: 1 },
      { question: "Ningún juguete es:", options: ["1", "2", "0"], correct: 2 },
      { question: "Cuántos ojos tienes", options: ["1", "2", "3"], correct: 1 },
      { question: "Cuántas patas tiene un perro", options: ["2", "3", "4"], correct: 2 },
      { question: "Contar: 6,7,__", options: ["8", "9", "10"], correct: 0 },
      { question: "Contar: 9,10,__", options: ["11", "12", "13"], correct: 0 },
    ],
  },

  // --------------------------------------------------
  // 9) SERIES NUMÉRICAS — FAST
  // --------------------------------------------------
  series: {
    id: "series",
    title: "Series numéricas simples",
    icon: "📊",
    gameId: "fast",

    background: "https://i.ytimg.com/vi/YkzRtsIjqWI/maxresdefault.jpg",

    image: "https://matemathweb.com/wp-content/uploads/2020/08/image-100.png",

    explanation: `
Las series siguen un patrón.
`,

    examples: [
      { title: "Ejemplo 1", operation: "1,2,3,4,_", explanation: "Sigue 1 en 1 → 5" },
      { title: "Ejemplo 2", operation: "2,4,6,8,_", explanation: "Sigue 2 en 2 → 10" },
    ],

    quiz: [
      { question: "1,2,3,4,__", options: ["5", "6", "7"], correct: 0 },
      { question: "5,6,7,__", options: ["8", "9", "10"], correct: 0 },
      { question: "2,4,6,__", options: ["7", "8", "9"], correct: 1 },
      { question: "10,9,8,__", options: ["7", "6", "5"], correct: 0 },
      { question: "3,5,7,__", options: ["8", "9", "10"], correct: 1 },
      { question: "0,2,4,6,__", options: ["7", "8", "9"], correct: 1 },
      { question: "1,3,5,7,__", options: ["8", "9", "10"], correct: 1 },
      { question: "4,8,12,__", options: ["14", "16", "18"], correct: 1 },
      { question: "9,7,5,__", options: ["3", "4", "2"], correct: 0 },
      { question: "2,6,10,__", options: ["12", "14", "15"], correct: 1 },
    ],
  },

  // --------------------------------------------------
  // 10) ORDENAR NÚMEROS — ORDER
  // --------------------------------------------------
  ordenar: {
    id: "ordenar",
    title: "Ordenar números",
    icon: "📈",
    gameId: "order",

    background:
      "https://i0.wp.com/www.recursosep.com/wp-content/uploads/2022/07/portada-ordenar-numeros-verano.jpg",

    image: "https://cdn0.unprofesor.com/es/posts/5/2/0/ordenar_numeros_25_orig.jpg",

    explanation: `
Ordenar números es colocarlos de menor a mayor o de mayor a menor.
`,

    examples: [
      { title: "Ejemplo 1", operation: "5,2,8", explanation: "Menor a mayor → 2,5,8" },
      { title: "Ejemplo 2", operation: "3,7,1", explanation: "Mayor a menor → 7,3,1" },
    ],

    quiz: [
      { question: "Ordena: 3,1,2", options: ["3,2,1", "1,2,3", "2,3,1"], correct: 1 },
      { question: "Ordena: 4,6,2", options: ["2,4,6", "6,4,2", "4,2,6"], correct: 0 },
      { question: "Número menor en 9,5,7", options: ["9", "5", "7"], correct: 1 },
      { question: "Número mayor en 8,3,6", options: ["3", "6", "8"], correct: 2 },
      { question: "Ordena: 10,8,9", options: ["8,9,10", "10,9,8", "9,10,8"], correct: 0 },
      { question: "Ordena: 1,4,3", options: ["1,3,4", "4,3,1", "3,4,1"], correct: 0 },
      { question: "Ordena: 7,2,5", options: ["2,5,7", "7,5,2", "5,7,2"], correct: 0 },
      { question: "Ordena de mayor a menor: 1,9,4", options: ["9,4,1", "1,4,9", "4,1,9"], correct: 0 },
      { question: "Número menor en 6,8,3", options: ["6", "8", "3"], correct: 2 },
      { question: "Número mayor en 2,5,1", options: ["2", "5", "1"], correct: 1 },
    ],
  },

}; // <-- cierre correcto del objeto
