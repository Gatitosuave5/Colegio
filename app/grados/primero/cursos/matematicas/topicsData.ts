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

export const topicsData: Record<string, MathTopic> = {

  // --------------------------------------------------
  // 1) SUMAS DEL 1 AL 10 — MEMORY
  // --------------------------------------------------
  "sumas-1-10": {
    id: "sumas-1-10",
    title: "Sumas del 1 al 10",
    icon: "➕",
    gameId: "memory",
    background:
      "https://img.freepik.com/foto-gratis/fondo-dibujos-animados-3d-ninos_23-2150473169.jpg",
    image: "https://s1.significados.com/foto/suma-og.jpg",

    explanation: `
La suma es combinar dos o más números para obtener un total.
En primer grado practicamos sumas simples con números del 1 al 10.
Pasos:
1. Empieza en el primer número.
2. Cuenta hacia adelante tantas veces como indique el segundo número.
3. El número donde terminas es el resultado (la suma).
`,

    examples: [
      {
        title: "Ejemplo 1",
        operation: "2 + 3 = ?",
        explanation: "Comenzamos en 2 y contamos 3 posiciones hacia adelante: 3,4,5 → resultado 5.",
      },
      {
        title: "Ejemplo 2",
        operation: "4 + 5 = ?",
        explanation:
          "Comenzamos en 4 y contamos 5 posiciones hacia adelante: 5,6,7,8,9 → resultado 9.",
      },
    ],

    quiz: [
      { question: "¿Cuánto es 1 + 3?", options: ["2", "4", "5", "6"], correct: 1 },
      { question: "¿Cuánto es 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
      {
        question: "Si tengo 3 caramelos y me dan 2 más, ¿cuántos tengo?",
        options: ["4", "5", "6", "3"],
        correct: 1,
      },
      { question: "¿Cuál suma da 7?", options: ["3+3", "4+3", "2+2", "1+5"], correct: 1 },
      { question: "¿Cuánto es 5 + 4?", options: ["8", "9", "10", "7"], correct: 1 },
      {
        question: "Tengo 1 globo y me regalan 6 más. ¿Qué suma es?",
        options: ["1+3", "1+4", "1+6", "1+2"],
        correct: 2,
      },
      { question: "2 + 5 = ?", options: ["6", "7", "8", "9"], correct: 1 },
      { question: "4 + 3 = ?", options: ["6", "7", "8", "9"], correct: 1 },
      { question: "0 + 5 = ?", options: ["4", "5", "6", "0"], correct: 1 },
      { question: "3 + 4 = ?", options: ["6", "7", "8", "5"], correct: 1 },
    ],
  },

  // --------------------------------------------------
  // 2) RESTAS DEL 1 AL 10 — ORDER
  // --------------------------------------------------
  "restas-1-10": {
    id: "restas-1-10",
    title: "Restas del 1 al 10",
    icon: "➖",
    gameId: "order",

    background: "https://i.ytimg.com/vi/42vjqtleG9E/maxresdefault.jpg",
    image: "https://i.ytimg.com/vi/dxBUiU0J9sg/hq720.jpg",

    explanation: `
Restar es quitar o sacar una parte de algo.
Pasos:
1. Empieza en el número grande.
2. Cuenta hacia atrás.
3. El número donde terminas es el resultado.
`,

    examples: [
      {
        title: "Ejemplo 1",
        operation: "7 - 2 = ?",
        explanation: "Desde 7 cuentas dos hacia atrás: 6,5 → resultado 5.",
      },
      {
        title: "Ejemplo 2",
        operation: "9 - 4 = ?",
        explanation: "Desde 9 cuentas hacia atrás 4 veces: 8,7,6,5 → resultado 5.",
      },
    ],

    quiz: [
      { question: "5 - 2 = ?", options: ["2", "3", "4", "5"], correct: 1 },
      { question: "7 - 3 = ?", options: ["3", "4", "5", "6"], correct: 1 },
      {
        question: "Si tengo 8 manzanas y como 2, ¿cuántas quedan?",
        options: ["5", "6", "7", "8"],
        correct: 1,
      },
      { question: "9 - 4 = ?", options: ["4", "5", "6", "3"], correct: 1 },
      { question: "6 - 1 = ?", options: ["4", "5", "6", "7"], correct: 1 },
      { question: "3 - 2 = ?", options: ["0", "1", "2", "3"], correct: 1 },
      { question: "10 - 5 = ?", options: ["4", "5", "6", "3"], correct: 1 },
      { question: "4 - 4 = ?", options: ["0", "1", "2", "3"], correct: 0 },
      { question: "8 - 3 = ?", options: ["4", "5", "6", "3"], correct: 1 },
      { question: "7 - 0 = ?", options: ["6", "7", "8", "0"], correct: 1 },
    ],
  },

  // --------------------------------------------------
  // 3) NÚMEROS HASTA 100 — FAST
  // --------------------------------------------------
  "numeros-100": {
    id: "numeros-100",
    title: "Números hasta 100",
    icon: "🔢",
    gameId: "fast",

    background: "https://i.ytimg.com/vi/EpiqZsdTW0s/maxresdefault.jpg",
    image: "https://matematicasxgrado.com/wp-content/uploads/Portada.-1.jpg",

    explanation: `
Los números nos sirven para contar, comparar y ordenar.
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
      { question: "¿Cuál número es mayor?", options: ["45", "67"], correct: 1 },
      { question: "¿Cuál es menor?", options: ["89", "23"], correct: 1 },
      { question: "¿Qué viene después del 56?", options: ["57", "55"], correct: 0 },
      { question: "¿Qué viene antes del 31?", options: ["30", "32"], correct: 0 },
      { question: "¿Cuál está entre 14 y 16?", options: ["15", "13"], correct: 0 },
      {
        question: "Número más grande: 12, 45, 37, 29",
        options: ["45", "37"],
        correct: 0,
      },
      {
        question: "Número más pequeño: 88, 54, 67, 72",
        options: ["54", "67"],
        correct: 0,
      },
    ],
  },

  // --------------------------------------------------
  // 4) FIGURAS GEOMÉTRICAS — MEMORY
  // --------------------------------------------------
  figuras: {
    id: "figuras",
    title: "Figuras geométricas básicas",
    icon: "🔷",
    gameId: "memory",

    background: "https://i.ytimg.com/vi/SkMtFUv0DAI/maxresdefault.jpg",
    image:
      "https://www.escuelaenlanube.com/wp-content/uploads/2012/10/FIGURAS-GEOMETRICAS.jpg",

    explanation: `
Las figuras geométricas son formas que vemos todos los días.
`,

    examples: [
      { title: "Ejemplo 1", operation: "Rueda de bicicleta", explanation: "Es un círculo." },
      { title: "Ejemplo 2", operation: "Puerta", explanation: "Suele ser un rectángulo." },
    ],

    quiz: [
      { question: "¿Cuál tiene 3 lados?", options: ["Triángulo", "Cuadrado", "Círculo", "Rectángulo"], correct: 0 },
      { question: "¿Cuál es redonda?", options: ["Círculo", "Cuadrado", "Triángulo", "Rectángulo"], correct: 0 },
      { question: "¿Cuál tiene 4 lados iguales?", options: ["Cuadrado", "Rectángulo", "Círculo", "Triángulo"], correct: 0 },
      { question: "¿Cuál tiene lados opuestos iguales?", options: ["Rectángulo", "Triángulo", "Círculo", "Pentágono"], correct: 0 },
      { question: "¿Cuál tiene cinco lados?", options: ["Pentágono", "Hexágono", "Cuadrado", "Triángulo"], correct: 0 },
      { question: "¿Cuál tiene seis lados?", options: ["Hexágono", "Pentágono", "Círculo", "Triángulo"], correct: 0 },
      { question: "¿Cuál tiene ocho lados?", options: ["Octágono", "Pentágono", "Círculo", "Cuadrado"], correct: 0 },
      { question: "¿Cuál no tiene lados?", options: ["Círculo", "Cuadrado", "Triángulo", "Rectángulo"], correct: 0 },
      { question: "¿Qué es un triángulo equilátero?", options: ["Tres lados iguales", "Cuatro lados", "Cinco lados", "Dos lados"], correct: 0 },
      { question: "¿Qué es un cuadrado?", options: ["Cuatro lados iguales", "Tres lados", "Cinco lados", "Redondo"], correct: 0 },
    ],
  },

  // --------------------------------------------------
  // 5) CLASIFICACIÓN — ORDER
  // --------------------------------------------------
  clasificacion: {
    id: "clasificacion",
    title: "Clasificación de objetos",
    icon: "🎨",
    gameId: "order",

    background: "https://i.ytimg.com/vi/Fs7tRZgOD70/hq720.jpg",
    image:
      "https://elmagicomundodelasmatematicas.wordpress.com/wp-content/uploads/2017/06/ejemplo-clasificacion.jpg?w=640",

    explanation: `
Clasificar es agrupar objetos por color, tamaño, forma o uso.
`,

    examples: [
      { title: "Ejemplo 1", operation: "Lápices de colores", explanation: "Agrupamos por color." },
      { title: "Ejemplo 2", operation: "Juguetes", explanation: "Separar carros, pelotas, muñecas." },
    ],

    quiz: [
      { question: "¿Cuál es un animal doméstico?", options: ["Perro", "León", "Tigre", "Elefante"], correct: 0 },
      { question: "¿Cuál vuela?", options: ["Pájaro", "Perro", "Gato", "Elefante"], correct: 0 },
      { question: "¿Cuál nada?", options: ["Pez", "Perro", "Gato", "Vaca"], correct: 0 },
      { question: "¿Cuál es un insecto?", options: ["Mariposa", "León", "Perro", "Tigre"], correct: 0 },
      { question: "¿Cuál es un mamífero?", options: ["Vaca", "Pez", "Gallina", "Cocodrilo"], correct: 0 },
      { question: "¿Cuál es grande y vive en África?", options: ["Elefante", "Gato", "Conejo", "Perro"], correct: 0 },
      { question: "¿Cuál tiene rayas?", options: ["Cebra", "Perro", "Gato", "Pájaro"], correct: 0 },
      { question: "¿Cuál dice 'miau'?", options: ["Gato", "Perro", "Vaca", "Oveja"], correct: 0 },
      { question: "¿Cuál dice 'guau'?", options: ["Perro", "Gato", "Oveja", "Elefante"], correct: 0 },
      { question: "¿Cuál vive en el bosque y come miel?", options: ["Oso", "Perro", "Conejo", "Gato"], correct: 0 },
    ],
  },

  // --------------------------------------------------
  // 6) PROBLEMAS DE SUMA — FAST
  // --------------------------------------------------
  "problemas-suma": {
    id: "problemas-suma",
    title: "Problemas simples de suma",
    icon: "📝",
    gameId: "fast",

    background:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEwLLNpAjed1g3rOvJySX2sQxrzdbY0S3YV9gTFWKXTtvxjnYPlSPrHlcMVJDWIfFqs4k&usqp=CAU",

    image:
      "https://image.slidesharecdn.com/sumasrestas-130116014627-phpapp02/75/Sumas-restas-7-2048.jpg",

    explanation: `
Los problemas de suma son historias donde juntamos cantidades.
`,

    examples: [
      { title: "Ejemplo 1", operation: "María tiene 3 y recibe 2", explanation: "3 + 2 = 5" },
      { title: "Ejemplo 2", operation: "Hay 4 niños y entran 3 más", explanation: "4 + 3 = 7" },
    ],

    quiz: [
      {
        question: "Juan tiene 3 manzanas y María le da 2 más. ¿Cuántas tiene?",
        options: ["4", "5"],
        correct: 1,
      },
      {
        question: "En una canasta hay 7 naranjas y ponen 6 más. ¿Cuántas hay?",
        options: ["12", "13"],
        correct: 1,
      },
      {
        question: "Ana compró 5 caramelos y luego 4 más. ¿Cuántos tiene?",
        options: ["8", "9"],
        correct: 1,
      },
      {
        question: "Pedro tenía 2 lápices y le dieron 3 más. ¿Cuántos tiene ahora?",
        options: ["5", "6"],
        correct: 0,
      },
      {
        question: "En un parque hay 8 palomas y llegan 7 más. ¿Cuántas hay?",
        options: ["14", "15"],
        correct: 1,
      },
      {
        question: "Carla tenía 10 globos y compró 5 más. ¿Cuántos tiene?",
        options: ["14", "15"],
        correct: 1,
      },
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
