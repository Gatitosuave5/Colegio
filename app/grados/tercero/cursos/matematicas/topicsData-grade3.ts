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

export const topicsData: Record<string, MathTopic> = {
  "multiplicacion": {
    id: "multiplicacion",
    title: "Multiplicación (Tablas 1-10)",
    icon: "✖️",
    gameId: "memory",
    background: "https://scontent.flim15-1.fna.fbcdn.net/v/t1.6435-9/123834617_183647280010460_6640284743810972340_n.png?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=M5K-nHJiNBYQ7kNvwGaIBsM&_nc_oc=AdmAQZF525urfuYWBTLaAQfihNlxHANGDIh5gRkRMgy-p1ndHozbn7fEpwh1Ew2BGeHVBIM8cJx2avHUt5iTGC3H&_nc_zt=23&_nc_ht=scontent.flim15-1.fna&_nc_gid=8_0Yxg4lS5T_PGYxnpOmnA&oh=00_AfgZAY3_TCWXRMCqSuECk7gKrH-GzD4ef79RAjx6DDYWlA&oe=6941806F",
    image: "https://scontent.flim15-2.fna.fbcdn.net/v/t39.30808-6/498176510_1216176250173655_2641542767466117284_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=CByiZPzkqd0Q7kNvwFAuCV4&_nc_oc=AdktgQk_hbEWnkXb5rwSLLFFr6QbiS-KgHkni9YsaBeCWe4Fk1SSA9i5GybCuYvLkT-yQqgx9xOKMH4cjyOyYevR&_nc_zt=23&_nc_ht=scontent.flim15-2.fna&_nc_gid=GdYjw60Ce1A_N79NekQ1YQ&oh=00_Afgbbvi-TvK_7i5ICmBqZ5VzqQBjV_PHrSQhg-uY8UKMRw&oe=691FDD3C",
    explanation: `
La multiplicación es repetir una suma.
- 3 × 4 significa 4 + 4 + 4 = 12
- La tabla de multiplicar va del 1 al 10
- Es importante memorizar estas tablas
`,
    examples: [
      {
        title: "Tabla del 2",
        operation: "2 × 5 = 10",
        explanation: "5 grupos de 2 = 2+2+2+2+2 = 10",
      },
      {
        title: "Tabla del 7",
        operation: "7 × 6 = 42",
        explanation: "6 grupos de 7 = 42",
      },
    ],
    quiz: [
      { question: "¿Cuánto es 6 × 7?", options: ["40", "42", "44"], correct: 1 },
      { question: "¿Cuánto es 8 × 9?", options: ["70", "71", "72"], correct: 2 },
      { question: "¿Cuánto es 9 × 8?", options: ["70", "71", "72"], correct: 2 },
      { question: "¿Cuánto es 7 × 7?", options: ["47", "48", "49"], correct: 2 },
      { question: "¿Cuánto es 10 × 5?", options: ["48", "49", "50"], correct: 2 },
      { question: "¿Cuánto es 6 × 8?", options: ["46", "47", "48"], correct: 2 },
      { question: "¿Cuánto es 9 × 6?", options: ["52", "53", "54"], correct: 2 },
      { question: "¿Cuánto es 7 × 8?", options: ["54", "55", "56"], correct: 2 },
      { question: "¿Cuánto es 8 × 7?", options: ["54", "55", "56"], correct: 2 },
      { question: "¿Cuánto es 10 × 10?", options: ["98", "99", "100"], correct: 2 },
    ],
  },

  "division-basica": {
    id: "division-basica",
    title: "División Básica",
    icon: "÷",
    gameId: "order",
    background: "https://i.ytimg.com/vi/UHXwGxfTJIQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAvPGneY3rhNDC25d-XsROwlgvFIQ",
    image: "https://cdn0.unprofesor.com/es/posts/8/1/7/elementos_de_la_division_6718_orig.jpg",
    explanation: `
La división reparte un número en partes iguales.
- 12 ÷ 3 = 4 (repartir 12 en 3 partes iguales)
- La división tiene dos significados:
  1. Reparto: dividir en grupos iguales
  2. Agrupación: formar grupos del mismo tamaño
`,
    examples: [
      {
        title: "Reparto",
        operation: "15 ÷ 3 = 5",
        explanation: "Repartir 15 entre 3 personas da 5 para cada una",
      },
      {
        title: "Agrupación",
        operation: "20 ÷ 4 = 5",
        explanation: "Formar 5 grupos de 4 elementos cada uno",
      },
    ],
    quiz: [
      { question: "¿Cuánto es 24 ÷ 6?", options: ["3", "4", "5"], correct: 1 },
      { question: "¿Cuánto es 36 ÷ 6?", options: ["5", "6", "7"], correct: 1 },
      { question: "¿Cuánto es 48 ÷ 8?", options: ["5", "6", "7"], correct: 1 },
      { question: "¿Cuánto es 56 ÷ 7?", options: ["7", "8", "9"], correct: 1 },
      { question: "¿Cuánto es 63 ÷ 9?", options: ["6", "7", "8"], correct: 1 },
      { question: "¿Cuánto es 72 ÷ 8?", options: ["8", "9", "10"], correct: 1 },
      { question: "¿Cuánto es 100 ÷ 10?", options: ["8", "9", "10"], correct: 2 },
      { question: "¿Cuánto es 45 ÷ 5?", options: ["8", "9", "10"], correct: 1 },
      { question: "¿Cuánto es 32 ÷ 4?", options: ["6", "7", "8"], correct: 2 },
      { question: "¿Cuánto es 81 ÷ 9?", options: ["8", "9", "10"], correct: 1 },
    ],
  },

  "perimetro": {
    id: "perimetro",
    title: "Perímetro de Figuras",
    icon: "📐",
    gameId: "memory",
    background: "https://s1.significados.com/foto/perimetro-og.jpg?class=ogImageWide",
    image: "https://scontent.flim15-1.fna.fbcdn.net/v/t1.6435-9/169541026_259345102517602_9067751692654872494_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=acw_Z2OcabkQ7kNvwGugLHW&_nc_oc=Adk32OhLeHNSOMpuVT5KKz55BoxngXEy4TCemJo_6cdmeownN0-PTOO703gNvEk_UhaD1eV7EYeSxRxGeSNREzL3&_nc_zt=23&_nc_ht=scontent.flim15-1.fna&_nc_gid=TSgXX0x-AVff7KeMk4D0LQ&oh=00_AfhqPy0_2g-b9v80nZBFQDh4Ce4SA-k-zHIoGCj7DF-R_A&oe=694174F2",
    explanation: `
El perímetro es la suma de todos los lados de una figura.
- Cuadrado: 4 lados iguales
- Rectángulo: 2 lados largos + 2 lados cortos
- Triángulo: suma de sus 3 lados
- La fórmula depende de la figura
`,
    examples: [
      {
        title: "Perímetro del Cuadrado",
        operation: "Lado = 5 cm, Perímetro = ?",
        explanation: "P = 5+5+5+5 = 20 cm",
      },
      {
        title: "Perímetro del Rectángulo",
        operation: "Largo = 8 cm, Ancho = 3 cm",
        explanation: "P = 8+3+8+3 = 22 cm",
      },
    ],
    quiz: [
      { question: "¿Cuál es el perímetro de un cuadrado de lado 6 cm?", options: ["20", "24", "28"], correct: 1 },
      { question: "¿Cuál es el perímetro de un rectángulo de 5 cm x 3 cm?", options: ["15", "16", "17"], correct: 1 },
      { question: "¿Cuál es el perímetro de un rectángulo de 10 cm x 4 cm?", options: ["26", "27", "28"], correct: 2 },
      { question: "¿Cuál es el perímetro de un cuadrado de lado 7 cm?", options: ["26", "27", "28"], correct: 2 },
      { question: "Un triángulo equilátero de lado 5 cm tiene perímetro de:", options: ["14", "15", "16"], correct: 1 },
      { question: "¿Cuál es el perímetro de un rectángulo de 8 cm x 2 cm?", options: ["18", "19", "20"], correct: 2 },
      { question: "¿Cuál es el perímetro de un cuadrado de lado 9 cm?", options: ["34", "35", "36"], correct: 2 },
      { question: "¿Cuál es el perímetro de un rectángulo de 6 cm x 4 cm?", options: ["18", "19", "20"], correct: 2 },
      { question: "Un triángulo con lados de 4, 5 y 6 cm tiene perímetro de:", options: ["14", "15", "16"], correct: 1 },
      { question: "¿Cuál es el perímetro de un cuadrado de lado 12 cm?", options: ["46", "47", "48"], correct: 2 },
    ],
  },

  "partes-division": {
    id: "partes-division",
    title: "Partes de la División",
    icon: "🔣",
    gameId: "order",
    background: "https://image.jimcdn.com/app/cms/image/transf/none/path/s278f5b1e2dab2049/image/ieb29d5d36404a903/version/1609778889/image.jpg",
    image: "https://www.abcfichas.com/wp-content/uploads/2021/05/Partes-de-una-Division.jpg",
    explanation: `
En una división tenemos:
- Dividendo: el número que se divide (arriba o a la izquierda)
- Divisor: el número por el que se divide (abajo o a la derecha)
- Cociente: el resultado de la división
- Resto: lo que sobra después de dividir

Ejemplo: 17 ÷ 3 = 5 resto 2
- Dividendo: 17
- Divisor: 3
- Cociente: 5
- Resto: 2
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "23 ÷ 5 = 4 resto 3",
        explanation: "Dividendo: 23, Divisor: 5, Cociente: 4, Resto: 3",
      },
      {
        title: "Ejemplo 2",
        operation: "30 ÷ 6 = 5 resto 0",
        explanation: "Dividendo: 30, Divisor: 6, Cociente: 5, Resto: 0",
      },
    ],
    quiz: [
      { question: "En 48 ÷ 7, ¿cuál es el dividendo?", options: ["7", "48", "6"], correct: 1 },
      { question: "En 56 ÷ 8 = 7, ¿cuál es el divisor?", options: ["7", "56", "8"], correct: 2 },
      { question: "En 42 ÷ 6 = 7, ¿cuál es el cociente?", options: ["42", "6", "7"], correct: 2 },
      { question: "¿Cuál es el resto de 25 ÷ 4?", options: ["0", "1", "2"], correct: 1 },
      { question: "En 33 ÷ 5 = 6 resto 3, ¿cuál es el dividendo?", options: ["5", "33", "6"], correct: 1 },
      { question: "¿Cuál es el resto de 30 ÷ 7?", options: ["1", "2", "3"], correct: 1 },
      { question: "En 45 ÷ 9 = 5, ¿cuál es el resto?", options: ["0", "1", "2"], correct: 0 },
      { question: "¿Cuál es el resto de 29 ÷ 6?", options: ["4", "5", "6"], correct: 2 },
      { question: "En 58 ÷ 8 = 7 resto 2, ¿cuál es el divisor?", options: ["7", "8", "2"], correct: 1 },
      { question: "¿Cuál es el resto de 50 ÷ 8?", options: ["1", "2", "3"], correct: 1 },
    ],
  },

  "partes-resta": {
    id: "partes-resta",
    title: "Partes de la Resta",
    icon: "➖",
    gameId: "memory",
    background: "https://www.orientacionandujar.es/wp-content/uploads/2024/01/Carteles-didacticos-partes-de-las-operaciones-basicas_page-0012-1024x768.jpg",
    image: "https://cdn0.unprofesor.com/es/posts/0/0/6/cuales_son_las_partes_de_la_resta_6600_orig.jpg",
    explanation: `
En una resta tenemos tres partes:
- Minuendo: el número del que se resta (el número mayor)
- Sustraendo: el número que se resta (el número menor)
- Diferencia: el resultado de la resta

Ejemplo: 15 - 7 = 8
- Minuendo: 15
- Sustraendo: 7
- Diferencia: 8
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "23 - 8 = 15",
        explanation: "Minuendo: 23, Sustraendo: 8, Diferencia: 15",
      },
      {
        title: "Ejemplo 2",
        operation: "50 - 12 = 38",
        explanation: "Minuendo: 50, Sustraendo: 12, Diferencia: 38",
      },
    ],
    quiz: [
      { question: "En 45 - 12 = 33, ¿cuál es el minuendo?", options: ["12", "45", "33"], correct: 1 },
      { question: "En 60 - 18 = 42, ¿cuál es el sustraendo?", options: ["60", "18", "42"], correct: 1 },
      { question: "En 75 - 25 = 50, ¿cuál es la diferencia?", options: ["75", "25", "50"], correct: 2 },
      { question: "En 89 - 35 = ?, ¿cuánto es la diferencia?", options: ["52", "53", "54"], correct: 2 },
      { question: "¿Cuál es el sustraendo de 100 - 35 = 65?", options: ["100", "35", "65"], correct: 1 },
      { question: "¿Cuál es el minuendo de 56 - 23 = 33?", options: ["56", "23", "33"], correct: 0 },
      { question: "¿Cuál es la diferencia de 78 - 42?", options: ["35", "36", "37"], correct: 1 },
      { question: "En 92 - 31 = ?, ¿cuál es la diferencia?", options: ["60", "61", "62"], correct: 1 },
      { question: "¿Cuál es el sustraendo de 70 - 25 = 45?", options: ["70", "25", "45"], correct: 1 },
      { question: "¿Cuál es la diferencia de 88 - 27?", options: ["59", "60", "61"], correct: 2 },
    ],
  },

  "problemas-multdiv": {
    id: "problemas-multdiv",
    title: "Problemas Multiplicación y División",
    icon: "🧮",
    gameId: "fast",
    background: "https://i.ytimg.com/vi/0qgC4wPrWuo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDSdLTFnlZUx6CY3uREKDlnJ46WYA",
    image: "https://i.ytimg.com/vi/xfASMByO8NU/sddefault.jpg",
    explanation: `
Los problemas nos enseñan a aplicar la multiplicación y división en situaciones reales.
- Multiplicación: repetir grupos
- División: repartir en partes iguales

Ejemplo de multiplicación: Si tengo 3 cajas con 8 panes cada una, ¿cuántos panes tengo?
Ejemplo de división: Si tengo 24 manzanas y debo repartirlas entre 6 niños, ¿cuántas le doy a cada uno?
`,
    examples: [
      {
        title: "Problema de Multiplicación",
        operation: "4 cajas con 6 libros cada una",
        explanation: "Total: 4 × 6 = 24 libros",
      },
      {
        title: "Problema de División",
        operation: "36 caramelos entre 9 niños",
        explanation: "Para cada niño: 36 ÷ 9 = 4 caramelos",
      },
    ],
    quiz: [
      { question: "Si tengo 5 cajas con 8 pelotas cada una, ¿cuántas pelotas tengo?", options: ["38", "39", "40"], correct: 2 },
      { question: "Si reparto 48 chocolates entre 6 amigos, ¿cuántos le doy a cada uno?", options: ["7", "8", "9"], correct: 1 },
      { question: "Un agricultor planta 7 filas con 9 plantas cada una. ¿Total de plantas?", options: ["61", "62", "63"], correct: 2 },
      { question: "Si tengo 56 caramelos y los divido entre 8 niños, ¿cuántos para cada uno?", options: ["6", "7", "8"], correct: 1 },
      { question: "Compré 3 paquetes con 12 galletitas cada uno. ¿Total de galletitas?", options: ["35", "36", "37"], correct: 1 },
      { question: "Si debo repartir 72 páginas entre 9 capítulos, ¿páginas por capítulo?", options: ["7", "8", "9"], correct: 1 },
      { question: "Un panadero hace 6 bandejas con 15 panes cada una. ¿Total de panes?", options: ["88", "89", "90"], correct: 2 },
      { question: "Si tengo 60 monedas y las guardo en 10 alcancías, ¿cuántas por alcancía?", options: ["5", "6", "7"], correct: 1 },
      { question: "Un maestro reparte 45 lápices entre 9 estudiantes. ¿Cuántos para cada uno?", options: ["4", "5", "6"], correct: 1 },
      { question: "En una tienda hay 8 estantes con 11 libros cada uno. ¿Total de libros?", options: ["86", "87", "88"], correct: 2 },
    ],
  },

  "figuras-geometricas": {
    id: "figuras-geometricas",
    title: "Figuras Geométricas",
    icon: "🔷",
    gameId: "memory",
    background: "https://marketplace.canva.com/EAGFV7K-jM0/2/0/1600w/canva-v%C3%ADdeo-escolar-figuras-geom%C3%A9tricas-creativo-colorido-akepFaTaehc.jpg",
    image: "https://cdn.slidesharecdn.com/ss_thumbnails/duafigurasgeometricas-240703015846-13b5384c-thumbnail.jpg?width=640&height=640&fit=bounds",
    explanation: `
Las figuras geométricas son formas básicas que encontramos en la naturaleza.
- Cuadrado: 4 lados iguales, 4 ángulos iguales
- Rectángulo: 4 lados, lados opuestos iguales
- Triángulo: 3 lados, 3 ángulos
- Círculo: sin lados, forma redonda

Cada figura tiene características especiales.
`,
    examples: [
      {
        title: "Propiedades del Cuadrado",
        operation: "Cuadrado",
        explanation: "4 lados iguales, 4 ángulos rectos (90°)",
      },
      {
        title: "Propiedades del Triángulo",
        operation: "Triángulo",
        explanation: "3 lados, 3 ángulos, la suma de ángulos es 180°",
      },
    ],
    quiz: [
      { question: "¿Cuántos lados tiene un cuadrado?", options: ["3", "4", "5"], correct: 1 },
      { question: "¿Cuántos lados tiene un triángulo?", options: ["2", "3", "4"], correct: 1 },
      { question: "¿Cuántos lados tiene un rectángulo?", options: ["3", "4", "5"], correct: 1 },
      { question: "¿Cuántos lados tiene un círculo?", options: ["0", "1", "2"], correct: 0 },
      { question: "¿Cuántos ángulos rectos tiene un cuadrado?", options: ["2", "3", "4"], correct: 2 },
      { question: "Un pentágono tiene:", options: ["4 lados", "5 lados", "6 lados"], correct: 1 },
      { question: "Un hexágono tiene:", options: ["4 lados", "5 lados", "6 lados"], correct: 2 },
      { question: "Un octágono tiene:", options: ["6 lados", "7 lados", "8 lados"], correct: 2 },
      { question: "¿Cuántos vértices tiene un triángulo?", options: ["2", "3", "4"], correct: 1 },
      { question: "Un rectángulo tiene lados:", options: ["todos iguales", "opuestos iguales", "ninguno igual"], correct: 1 },
    ],
  },

  "medicion-longitud": {
    id: "medicion-longitud",
    title: "Medición de Longitudes",
    icon: "📏",
    gameId: "order",
    background: "https://i.pinimg.com/736x/1b/be/15/1bbe159beeab73069dc0f9a85fb4f4a7.jpg",
    image: "https://i.ytimg.com/vi/DPNDOEKjuNc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA8Pqz2XaXQ3lXYM6Bk9hFZRMllAQ",
    explanation: `
La longitud mide la distancia entre dos puntos.
- Centímetro (cm): unidad pequeña
- Metro (m): unidad grande
- 1 metro = 100 centímetros

Conversiones:
- 5 m = 500 cm
- 300 cm = 3 m
`,
    examples: [
      {
        title: "Medida en centímetros",
        operation: "Un lápiz mide 20 cm",
        explanation: "20 centímetros es una medida pequeña",
      },
      {
        title: "Medida en metros",
        operation: "El ancho de la clase es 8 m",
        explanation: "8 metros es una medida grande",
      },
    ],
    quiz: [
      { question: "¿Cuántos centímetros tiene 1 metro?", options: ["50", "100", "200"], correct: 1 },
      { question: "¿Cuántos metros son 500 centímetros?", options: ["4", "5", "6"], correct: 1 },
      { question: "¿Cuántos centímetros son 3 metros?", options: ["200", "300", "400"], correct: 1 },
      { question: "Una puerta mide aproximadamente:", options: ["2 cm", "20 cm", "2 m"], correct: 2 },
      { question: "Un lápiz mide aproximadamente:", options: ["20 cm", "20 m", "200 cm"], correct: 0 },
      { question: "¿Cuántos metros son 800 centímetros?", options: ["6", "7", "8"], correct: 2 },
      { question: "¿Cuántos centímetros son 6 metros?", options: ["500", "600", "700"], correct: 1 },
      { question: "La altura de un edificio se mide en:", options: ["centímetros", "metros", "ambas"], correct: 1 },
      { question: "¿Cuántos centímetros son 2 metros?", options: ["100", "200", "300"], correct: 1 },
      { question: "El grosor de un papel se mide en:", options: ["metros", "centímetros", "kilómetros"], correct: 1 },
    ],
  },

  "lectura-numeros": {
    id: "lectura-numeros",
    title: "Lectura y Comparación de Números hasta 10,000",
    icon: "🔢",
    gameId: "fast",
    background: "https://imgv2-2-f.scribdassets.com/img/document/716205085/original/888c412c8b/1?v=1",
    image: "https://www.lucaedu.com/wp-content/uploads/2022/10/escritura_de_numeros_info.jpg",
    explanation: `
Leer números hasta 10,000:
- Unidades (U): 0-9
- Decenas (D): 10-99
- Centenas (C): 100-999
- Unidades de mil (UM): 1,000-9,999

Ejemplo: 5,347
- 5 unidades de mil
- 3 centenas
- 4 decenas
- 7 unidades

Comparación: > (mayor), < (menor), = (igual)
`,
    examples: [
      {
        title: "Lectura",
        operation: "3,456",
        explanation: "Tres mil cuatrocientos cincuenta y seis",
      },
      {
        title: "Comparación",
        operation: "3,456 > 2,789",
        explanation: "3,456 es mayor que 2,789",
      },
    ],
    quiz: [
      { question: "¿Cómo se lee 5,234?", options: ["Cinco mil doscientos treinta y cuatro", "Cincuenta mil...", "Quinientos..."], correct: 0 },
      { question: "¿Cuál es mayor: 3,456 o 3,465?", options: ["3,456", "3,465", "Son iguales"], correct: 1 },
      { question: "¿Cuál es menor: 7,890 o 7,980?", options: ["7,890", "7,980", "Son iguales"], correct: 0 },
      { question: "¿Cómo se escribe 'Dos mil quinientos treinta y uno'?", options: ["2,531", "2,513", "2,315"], correct: 0 },
      { question: "¿Cuál número es mayor: 8,765 o 8,756?", options: ["8,765", "8,756", "Son iguales"], correct: 0 },
      { question: "¿Cómo se lee 9,999?", options: ["Nueve mil novecientos noventa y nueve", "Novecientos...", "Noventa y nueve"], correct: 0 },
      { question: "¿Cuál es el número mayor: 4,321 o 4,231?", options: ["4,321", "4,231", "Son iguales"], correct: 0 },
      { question: "¿Cuántas unidades tiene 5,678?", options: ["8", "7", "8 unidades"], correct: 0 },
      { question: "En 6,543 ¿cuántas centenas hay?", options: ["5", "54", "6"], correct: 0 },
      { question: "¿Cómo se escribe 'Siete mil doscientos cuarenta y tres'?", options: ["7,243", "7,324", "7,234"], correct: 0 },
    ],
  },

  "suma-resta-llevadas": {
    id: "suma-resta-llevadas",
    title: "Suma y Resta con Llevadas",
    icon: "⚙️",
    gameId: "memory",
    background: "https://i.ytimg.com/vi/d_1HDzNwR84/maxresdefault.jpg",
    image: "https://i.ytimg.com/vi/WrUbDgoolsY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCdTfIYyfQDPu9SoMV2aiCAFDDu2w",
    explanation: `
La suma y resta con llevadas se usan con números de 3 y 4 dígitos.
- Suma: si la suma de una columna es ≥ 10, llevamos 1
- Resta: si no podemos restar, pedimos prestado

Pasos para suma: alineamos números, sumamos por columnas de derecha a izquierda
Pasos para resta: alineamos números, si no podemos restar pedimos prestado
`,
    examples: [
      {
        title: "Suma con Llevadas",
        operation: "345 + 287 = ?",
        explanation: "5+7=12 (llevo 1), 4+8+1=13 (llevo 1), 3+2+1=6. Resultado: 632",
      },
      {
        title: "Resta con Llevadas",
        operation: "432 - 156 = ?",
        explanation: "No puedo restar 6 de 2, pido prestado. 12-6=6, 2-5 (pido prestado), 12-5=7, 3-1-1=1. Resultado: 276",
      },
    ],
    quiz: [
      { question: "¿Cuánto es 234 + 178?", options: ["410", "411", "412"], correct: 2 },
      { question: "¿Cuánto es 567 - 234?", options: ["331", "332", "333"], correct: 2 },
      { question: "¿Cuánto es 456 + 345?", options: ["799", "800", "801"], correct: 2 },
      { question: "¿Cuánto es 789 - 456?", options: ["331", "332", "333"], correct: 2 },
      { question: "¿Cuánto es 678 + 234?", options: ["910", "911", "912"], correct: 2 },
      { question: "¿Cuánto es 567 - 189?", options: ["376", "377", "378"], correct: 2 },
      { question: "¿Cuánto es 345 + 267?", options: ["610", "611", "612"], correct: 2 },
      { question: "¿Cuánto es 800 - 345?", options: ["453", "454", "455"], correct: 2 },
      { question: "¿Cuánto es 234 + 456 + 123?", options: ["811", "812", "813"], correct: 2 },
      { question: "¿Cuánto es 1000 - 567?", options: ["432", "433", "434"], correct: 2 },
    ],
  },
};
