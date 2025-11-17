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
  "numeros-6-cifras": {
    id: "numeros-6-cifras",
    title: "Números Naturales hasta 6 Cifras",
    icon: "🔢",
    gameId: "memory",
    background: "https://i.ytimg.com/vi/GaVGJMxc7qs/maxresdefault.jpg",
    image: "https://tomi-digital-resources.storage.googleapis.com/images/classes/resources/rsc-663220-605a90d0e6c7d.jpeg",
    explanation: `
Los números hasta 6 cifras pueden llegar hasta 999,999.
- Unidades: 0-9
- Decenas: 10-99
- Centenas: 100-999
- Unidades de mil: 1,000-9,999
- Decenas de mil: 10,000-99,999
- Centenas de mil: 100,000-999,999

Ejemplo: 345,678
- 3 centenas de mil
- 4 decenas de mil
- 5 unidades de mil
- 6 centenas
- 7 decenas
- 8 unidades
`,
    examples: [
      {
        title: "Número de 6 cifras",
        operation: "567,890",
        explanation: "Quinientos sesenta y siete mil ochocientos noventa",
      },
      {
        title: "Lectura",
        operation: "234,567",
        explanation: "Doscientos treinta y cuatro mil quinientos sesenta y siete",
      },
    ],
    quiz: [
      { question: "¿Cómo se lee 345,678?", options: ["Trescientos cuarenta y cinco mil...","Treinta y cuatro mil...","Tres mil..."], correct: 0 },
      { question: "¿Cuál es el valor de la posición del 5 en 456,789?", options: ["5 unidades","50 mil","5 centenas"], correct: 1 },
      { question: "¿Cuántas cifras tiene 678,900?", options: ["4 cifras","5 cifras","6 cifras"], correct: 2 },
      { question: "¿Cómo se escribe 'Novecientos noventa y nueve mil novecientos noventa y nueve'?", options: ["999,999","99,999","9,999"], correct: 0 },
      { question: "En 523,456 ¿cuál es la centena de mil?", options: ["5","2","3"], correct: 0 },
      { question: "¿Cómo se lee 100,001?", options: ["Cien mil uno","Un millón","Diez mil uno"], correct: 0 },
      { question: "¿Cuál número es mayor: 789,456 o 789,465?", options: ["789,456","789,465","Son iguales"], correct: 1 },
      { question: "En 654,321 ¿cuántas decenas de mil hay?", options: ["5","54","6"], correct: 0 },
      { question: "¿Cuántas unidades tiene 234,560?", options: ["0","6","60"], correct: 1 },
      { question: "¿Cómo se escribe 'Doscientos mil'?", options: ["200,000","20,000","2,000"], correct: 0 },
    ],
  },

  "suma-resta-grandes": {
    id: "suma-resta-grandes",
    title: "Suma y Resta con Números Grandes",
    icon: "➕➖",
    gameId: "order",
    background: "https://img.freepik.com/foto-gratis/operaciones-grandes_23-2147611704.jpg",
    image: "https://www.wikihow.com/images_en/thumb/c/cc/Add-Large-Numbers-Step-10-Version-3.jpg/v4-460px-Add-Large-Numbers-Step-10-Version-3.jpg",
    explanation: `
Sumar y restar números grandes (hasta 999,999).
- Alinear números por la derecha
- Sumar o restar de derecha a izquierda
- Tener cuidado con las llevadas y préstamos

Suma: 234,567 + 123,456 = 358,023
Resta: 456,789 - 234,567 = 222,222
`,
    examples: [
      {
        title: "Suma grandes",
        operation: "345,678 + 234,567 = 580,245",
        explanation: "Se alinean y se suman columna por columna",
      },
      {
        title: "Resta grandes",
        operation: "567,890 - 234,567 = 333,323",
        explanation: "Se alinean y se restan con préstamos si es necesario",
      },
    ],
    quiz: [
      { question: "¿Cuánto es 234,567 + 123,456?", options: ["357,023","358,023","359,023"], correct: 1 },
      { question: "¿Cuánto es 789,456 - 234,567?", options: ["554,889","554,890","555,890"], correct: 0 },
      { question: "¿Cuánto es 500,000 + 250,000?", options: ["700,000","750,000","800,000"], correct: 1 },
      { question: "¿Cuánto es 999,999 - 111,111?", options: ["888,888","889,888","890,888"], correct: 0 },
      { question: "¿Cuánto es 123,456 + 456,789?", options: ["580,245","579,245","581,245"], correct: 0 },
      { question: "¿Cuánto es 600,000 - 150,000?", options: ["450,000","451,000","449,000"], correct: 0 },
      { question: "¿Cuánto es 345,678 + 345,678?", options: ["691,356","690,356","692,356"], correct: 0 },
      { question: "¿Cuánto es 876,543 - 123,456?", options: ["753,087","752,087","754,087"], correct: 0 },
      { question: "¿Cuánto es 222,222 + 333,333?", options: ["555,555","555,556","555,554"], correct: 0 },
      { question: "¿Cuánto es 500,500 - 200,200?", options: ["300,300","300,299","300,301"], correct: 0 },
    ],
  },

  "multiplicacion-2cifras": {
    id: "multiplicacion-2cifras",
    title: "Multiplicación por Una y Dos Cifras",
    icon: "✖️",
    gameId: "memory",
    background: "https://matemovil.com/wp-content/uploads/2022/12/Multiplicacion-por-2-cifras-AI-productos-parciales-1.png",
    image: "https://matemovil.com/wp-content/uploads/2021/03/Multiplicacion-por-2-cifras-ejercicio-resuelto-4.png",
    explanation: `
Multiplicar por una o dos cifras.

Por una cifra: 234 × 5
- Multiplicar cada dígito por 5
- 234 × 5 = 1,170

Por dos cifras: 234 × 25
- Multiplicar 234 × 5 = 1,170
- Multiplicar 234 × 20 = 4,680
- Sumar: 1,170 + 4,680 = 5,850
`,
    examples: [
      {
        title: "Por una cifra",
        operation: "123 × 4 = 492",
        explanation: "Se multiplica cada dígito y se suman las llevadas",
      },
      {
        title: "Por dos cifras",
        operation: "123 × 12 = 1,476",
        explanation: "Se multiplica por cada cifra y se suman los resultados",
      },
    ],
    quiz: [
      { question: "¿Cuánto es 123 × 4?", options: ["492","493","494"], correct: 0 },
      { question: "¿Cuánto es 234 × 5?", options: ["1,170","1,171","1,169"], correct: 0 },
      { question: "¿Cuánto es 345 × 12?", options: ["4,140","4,141","4,139"], correct: 0 },
      { question: "¿Cuánto es 123 × 25?", options: ["3,075","3,076","3,074"], correct: 0 },
      { question: "¿Cuánto es 456 × 3?", options: ["1,368","1,369","1,367"], correct: 0 },
      { question: "¿Cuánto es 567 × 11?", options: ["6,237","6,238","6,236"], correct: 0 },
      { question: "¿Cuánto es 234 × 23?", options: ["5,382","5,383","5,381"], correct: 0 },
      { question: "¿Cuánto es 789 × 2?", options: ["1,578","1,579","1,577"], correct: 0 },
      { question: "¿Cuánto es 456 × 15?", options: ["6,840","6,841","6,839"], correct: 0 },
      { question: "¿Cuánto es 321 × 31?", options: ["9,951","9,952","9,950"], correct: 0 },
    ],
  },

  "division-exacta-resto": {
    id: "division-exacta-resto",
    title: "División Exacta y con Resto",
    icon: "÷",
    gameId: "order",
    background: "https://i.ytimg.com/vi/rahMSt9Mzxo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCgoiTTeSlXywzbIuEMFE671iBd7w",
    image: "https://image.slidesharecdn.com/tema3divisinexactaydivisininexacta-130304131611-phpapp01/75/Tema-3-division-exacta-y-division-inexacta-1-2048.jpg",
    explanation: `
División exacta: cuando el resto es 0
Ejemplo: 20 ÷ 4 = 5 (resto 0)

División con resto: cuando no es exacta
Ejemplo: 23 ÷ 4 = 5 (resto 3)

Prueba de la división:
(Cociente × Divisor) + Resto = Dividendo
(5 × 4) + 3 = 23 ✓
`,
    examples: [
      {
        title: "División exacta",
        operation: "48 ÷ 6 = 8 (resto 0)",
        explanation: "Es exacta porque no sobra nada",
      },
      {
        title: "División con resto",
        operation: "50 ÷ 6 = 8 (resto 2)",
        explanation: "Quedan 2 elementos que no se pueden dividir",
      },
    ],
    quiz: [
      { question: "¿Cuál es el resto de 25 ÷ 4?", options: ["0","1","3"], correct: 2 },
      { question: "¿Es exacta la división 36 ÷ 9?", options: ["Sí, resto 0","No, resto 1","No, resto 2"], correct: 0 },
      { question: "¿Cuál es el resto de 50 ÷ 7?", options: ["0","1","2"], correct: 2 },
      { question: "¿Cuánto es 45 ÷ 5?", options: ["8","9","10"], correct: 1 },
      { question: "¿Cuál es el resto de 33 ÷ 5?", options: ["2","3","4"], correct: 1 },
      { question: "¿Es exacta 64 ÷ 8?", options: ["Sí, resto 0","No, resto 1","No, resto 2"], correct: 0 },
      { question: "¿Cuál es el resto de 29 ÷ 6?", options: ["4","5","6"], correct: 2 },
      { question: "¿Cuánto es 56 ÷ 7?", options: ["7","8","9"], correct: 1 },
      { question: "¿Cuál es el resto de 100 ÷ 9?", options: ["0","1","2"], correct: 1 },
      { question: "¿Es exacta 72 ÷ 9?", options: ["Sí, resto 0","No, resto 1","No, resto 2"], correct: 0 },
    ],
  },

  "mcm": {
    id: "mcm",
    title: "Mínimo Común Múltiplo (MCM)",
    icon: "🔢",
    gameId: "memory",
    background: "https://i.ytimg.com/vi/1AOaBUBw_gM/maxresdefault.jpg",
    image: "https://matematicascercanas.com/wp-content/uploads/2020/08/MinimoComunM%C3%BAltiplo-1024x1024.jpg",
    explanation: `
El Mínimo Común Múltiplo (MCM) es el menor número que es múltiplo de dos o más números.

Ejemplo: MCM de 4 y 6
- Múltiplos de 4: 4, 8, 12, 16, 20, 24...
- Múltiplos de 6: 6, 12, 18, 24, 30...
- MCM(4,6) = 12

Método: listar los múltiplos y encontrar el más pequeño en común.
`,
    examples: [
      {
        title: "MCM de 3 y 5",
        operation: "MCM(3,5) = 15",
        explanation: "Múltiplos de 3: 3,6,9,12,15... Múltiplos de 5: 5,10,15,20...",
      },
      {
        title: "MCM de 4 y 6",
        operation: "MCM(4,6) = 12",
        explanation: "Múltiplos de 4: 4,8,12,16... Múltiplos de 6: 6,12,18...",
      },
    ],
    quiz: [
      { question: "¿Cuál es el MCM de 3 y 4?", options: ["10","12","14"], correct: 1 },
      { question: "¿Cuál es el MCM de 2 y 5?", options: ["10","12","15"], correct: 0 },
      { question: "¿Cuál es el MCM de 4 y 8?", options: ["8","12","16"], correct: 0 },
      { question: "¿Cuál es el MCM de 3 y 6?", options: ["6","9","12"], correct: 0 },
      { question: "¿Cuál es el MCM de 5 y 7?", options: ["30","35","40"], correct: 1 },
      { question: "¿Cuál es el MCM de 6 y 9?", options: ["18","20","24"], correct: 0 },
      { question: "¿Cuál es el MCM de 2 y 3?", options: ["5","6","8"], correct: 1 },
      { question: "¿Cuál es el MCM de 4 y 6?", options: ["12","14","16"], correct: 0 },
      { question: "¿Cuál es el MCM de 3 y 9?", options: ["9","12","15"], correct: 0 },
      { question: "¿Cuál es el MCM de 5 y 10?", options: ["10","15","20"], correct: 0 },
    ],
  },

  "mcd": {
    id: "mcd",
    title: "Máximo Común Divisor (MCD)",
    icon: "🔍",
    gameId: "memory",
    background: "https://fisymat.com/wp-content/uploads/2023/04/mcd.png",
    image: "https://cdn0.unprofesor.com/es/posts/2/4/1/como_sacar_el_maximo_comun_divisor_1142_orig.jpg",
    explanation: `
El Máximo Común Divisor (MCD) es el mayor número que divide exactamente a dos o más números.

Ejemplo: MCD de 12 y 18
- Divisores de 12: 1, 2, 3, 4, 6, 12
- Divisores de 18: 1, 2, 3, 6, 9, 18
- MCD(12,18) = 6

Método: listar los divisores y encontrar el más grande en común.
`,
    examples: [
      {
        title: "MCD de 12 y 16",
        operation: "MCD(12,16) = 4",
        explanation: "Divisores comunes: 1, 2, 4. El mayor es 4",
      },
      {
        title: "MCD de 15 y 25",
        operation: "MCD(15,25) = 5",
        explanation: "Divisores comunes: 1, 5. El mayor es 5",
      },
    ],
    quiz: [
      { question: "¿Cuál es el MCD de 12 y 18?", options: ["4","5","6"], correct: 2 },
      { question: "¿Cuál es el MCD de 10 y 15?", options: ["3","5","7"], correct: 1 },
      { question: "¿Cuál es el MCD de 16 y 24?", options: ["4","6","8"], correct: 2 },
      { question: "¿Cuál es el MCD de 20 y 30?", options: ["10","5","15"], correct: 0 },
      { question: "¿Cuál es el MCD de 12 y 15?", options: ["2","3","4"], correct: 1 },
      { question: "¿Cuál es el MCD de 18 y 24?", options: ["4","5","6"], correct: 2 },
      { question: "¿Cuál es el MCD de 14 y 21?", options: ["5","7","9"], correct: 1 },
      { question: "¿Cuál es el MCD de 8 y 12?", options: ["2","3","4"], correct: 2 },
      { question: "¿Cuál es el MCD de 9 y 15?", options: ["3","4","5"], correct: 0 },
      { question: "¿Cuál es el MCD de 20 y 25?", options: ["3","5","7"], correct: 1 },
    ],
  },

  "fracciones-basicas": {
    id: "fracciones-basicas",
    title: "Fracciones Básicas: Concepto, Representación y Equivalencias",
    icon: "🥜",
    gameId: "memory",
    background: "https://i.ytimg.com/vi/FUbla-rPt3M/maxresdefault.jpg",
    image: "https://www.matematicatuya.com/NIVELACION/NumerosReales/IF5S.png",
    explanation: `
Una fracción representa una parte de un todo.

Partes de una fracción:
- Numerador (arriba): cuántas partes tomamos
- Denominador (abajo): en cuántas partes se divide el todo

Ejemplo: 3/4 significa 3 partes de 4

Fracciones equivalentes: representan la misma cantidad
- 1/2 = 2/4 = 3/6 = 4/8
- Se multiplica o divide numerador y denominador por el mismo número
`,
    examples: [
      {
        title: "Lectura",
        operation: "3/4 se lee 'tres cuartos'",
        explanation: "3 partes de 4 totales",
      },
      {
        title: "Equivalentes",
        operation: "1/2 = 2/4",
        explanation: "Representan la misma cantidad",
      },
    ],
    quiz: [
      { question: "¿Cómo se lee 2/3?", options: ["Dos tercios","Dos tres","Tres medios"], correct: 0 },
      { question: "¿Cuál es el numerador de 5/8?", options: ["5","8","3"], correct: 0 },
      { question: "¿Cuál es el denominador de 3/7?", options: ["3","7","10"], correct: 1 },
      { question: "¿Cuál fracción es equivalente a 1/2?", options: ["2/4","2/3","1/3"], correct: 0 },
      { question: "¿2/4 es equivalente a?", options: ["1/2","1/4","3/4"], correct: 0 },
      { question: "¿Qué fracción representa 1 de 5 partes?", options: ["1/5","5/1","1/6"], correct: 0 },
      { question: "¿3/6 es equivalente a?", options: ["1/2","1/3","1/6"], correct: 0 },
      { question: "¿Cuántos octavos hay en 1/2?", options: ["2","4","3"], correct: 1 },
      { question: "¿4/8 es equivalente a?", options: ["1/2","1/4","3/4"], correct: 0 },
      { question: "¿Cómo se lee 7/9?", options: ["Siete novenos","Siete nueve","Nueve séptimos"], correct: 0 },
    ],
  },

  "comparacion-fracciones": {
    id: "comparacion-fracciones",
    title: "Comparación y Orden de Fracciones",
    icon: "⚖️",
    gameId: "order",
    background: "https://es.flamath.com/wp-content/uploads/comparar-fracciones-igual-denominador.png",
    image: "https://matematix.org/wp-content/uploads/comparacion-de-fracciones-como-comparamos-y-analizamos.png",
    explanation: `
Comparar fracciones significa determinar cuál es mayor, menor o igual.

Con igual denominador: comparar numeradores
- 3/5 > 2/5 (porque 3 > 2)

Con diferente denominador: buscar común denominador
- 1/2 vs 1/3: convertir a sextos
- 3/6 > 2/6 (1/2 > 1/3)

Símbolos: > (mayor), < (menor), = (igual)
`,
    examples: [
      {
        title: "Igual denominador",
        operation: "4/7 > 2/7",
        explanation: "Comparamos numeradores: 4 > 2",
      },
      {
        title: "Distinto denominador",
        operation: "1/2 > 1/3",
        explanation: "La mitad es mayor que un tercio",
      },
    ],
    quiz: [
      { question: "¿Cuál es mayor: 3/5 o 2/5?", options: ["3/5","2/5","Son iguales"], correct: 0 },
      { question: "¿Cuál es menor: 1/2 o 1/3?", options: ["1/2","1/3","Son iguales"], correct: 1 },
      { question: "¿Cuál es mayor: 2/3 o 2/5?", options: ["2/3","2/5","Son iguales"], correct: 0 },
      { question: "¿Cuál es menor: 3/4 o 3/5?", options: ["3/4","3/5","Son iguales"], correct: 1 },
      { question: "¿1/4 es mayor o menor que 1/2?", options: ["Mayor","Menor","Igual"], correct: 1 },
      { question: "¿Cuál es mayor: 5/6 o 5/8?", options: ["5/6","5/8","Son iguales"], correct: 0 },
      { question: "¿Cuál es menor: 2/4 o 2/3?", options: ["2/4","2/3","Son iguales"], correct: 0 },
      { question: "¿Cuál es mayor: 4/7 o 4/9?", options: ["4/7","4/9","Son iguales"], correct: 0 },
      { question: "¿3/8 es mayor o menor que 3/10?", options: ["Mayor","Menor","Igual"], correct: 0 },
      { question: "¿Cuál es mayor: 1/3 o 1/4?", options: ["1/3","1/4","Son iguales"], correct: 0 },
    ],
  },

  "suma-resta-fracciones": {
    id: "suma-resta-fracciones",
    title: "Suma y Resta de Fracciones con Igual Denominador",
    icon: "➕",
    gameId: "fast",
    background: "https://mialdeatdo.com/wp-content/uploads/2023/08/image-3.png",
    image: "https://i.pinimg.com/736x/c0/4c/bd/c04cbd1a7b58bb6c9ee3b86cd6d77712.jpg",
    explanation: `
Con igual denominador, sumamos o restamos solo los numeradores.

Suma: 2/5 + 1/5 = 3/5
- Sumamos: 2 + 1 = 3
- Mantenemos el denominador: 5

Resta: 4/7 - 2/7 = 2/7
- Restamos: 4 - 2 = 2
- Mantenemos el denominador: 7
`,
    examples: [
      {
        title: "Suma",
        operation: "3/8 + 2/8 = 5/8",
        explanation: "3 + 2 = 5, el denominador es 8",
      },
      {
        title: "Resta",
        operation: "6/9 - 2/9 = 4/9",
        explanation: "6 - 2 = 4, el denominador es 9",
      },
    ],
    quiz: [
      { question: "¿Cuánto es 1/4 + 2/4?", options: ["3/4","2/4","1/2"], correct: 0 },
      { question: "¿Cuánto es 3/5 + 1/5?", options: ["4/5","3/5","2/5"], correct: 0 },
      { question: "¿Cuánto es 5/8 - 2/8?", options: ["2/8","3/8","4/8"], correct: 1 },
      { question: "¿Cuánto es 7/9 - 3/9?", options: ["3/9","4/9","5/9"], correct: 1 },
      { question: "¿Cuánto es 2/6 + 3/6?", options: ["4/6","5/6","6/6"], correct: 1 },
      { question: "¿Cuánto es 4/7 - 1/7?", options: ["2/7","3/7","4/7"], correct: 1 },
      { question: "¿Cuánto es 3/10 + 4/10?", options: ["6/10","7/10","8/10"], correct: 1 },
      { question: "¿Cuánto es 8/12 - 3/12?", options: ["4/12","5/12","6/12"], correct: 1 },
      { question: "¿Cuánto es 2/5 + 2/5?", options: ["3/5","4/5","5/5"], correct: 1 },
      { question: "¿Cuánto es 9/11 - 5/11?", options: ["3/11","4/11","5/11"], correct: 1 },
    ],
  },

  "perimetro-figuras": {
    id: "perimetro-figuras",
    title: "Figuras Geométricas y Cálculo de Perímetros",
    icon: "📐",
    gameId: "memory",
    background: "https://www.todogeometria.com/wp-content/uploads/imagen-de-portada-con-diferentes-figuras-geometricas-regulares-e-irregulares-y-lineas-que-representan-el-calculo-del-perimetro.png",
    image: "https://costarricenses.cr/wp-content/uploads/2025/01/Perimetro-de-figuras-1024x962.png",
    explanation: `
El perímetro es la suma de todos los lados de una figura.

Cuadrado: P = 4 × lado
Rectángulo: P = 2 × (largo + ancho)
Triángulo: P = lado1 + lado2 + lado3
Pentágono regular: P = 5 × lado
Hexágono regular: P = 6 × lado

Ejemplo: Cuadrado de lado 5 cm
P = 4 × 5 = 20 cm
`,
    examples: [
      {
        title: "Cuadrado",
        operation: "Lado 6 cm, P = 24 cm",
        explanation: "P = 4 × 6 = 24 cm",
      },
      {
        title: "Rectángulo",
        operation: "Largo 8 cm, Ancho 4 cm, P = 24 cm",
        explanation: "P = 2 × (8 + 4) = 24 cm",
      },
    ],
    quiz: [
      { question: "¿Cuál es el perímetro de un cuadrado de 5 cm?", options: ["15 cm","20 cm","25 cm"], correct: 1 },
      { question: "¿Cuál es el perímetro de un rectángulo de 7×3 cm?", options: ["18 cm","19 cm","20 cm"], correct: 2 },
      { question: "¿Cuál es el perímetro de un triángulo equilátero de 6 cm?", options: ["16 cm","17 cm","18 cm"], correct: 2 },
      { question: "¿Cuál es el perímetro de un cuadrado de 8 cm?", options: ["30 cm","31 cm","32 cm"], correct: 2 },
      { question: "¿Cuál es el perímetro de un rectángulo de 10×5 cm?", options: ["28 cm","29 cm","30 cm"], correct: 2 },
      { question: "¿Cuál es el perímetro de un pentágono regular de 4 cm?", options: ["18 cm","19 cm","20 cm"], correct: 2 },
      { question: "¿Cuál es el perímetro de un hexágono regular de 3 cm?", options: ["16 cm","17 cm","18 cm"], correct: 2 },
      { question: "¿Cuál es el perímetro de un triángulo con lados 5, 6, 7 cm?", options: ["16 cm","17 cm","18 cm"], correct: 2 },
      { question: "¿Cuál es el perímetro de un rectángulo de 12×4 cm?", options: ["30 cm","31 cm","32 cm"], correct: 2 },
      { question: "¿Cuál es el perímetro de un cuadrado de 10 cm?", options: ["38 cm","39 cm","40 cm"], correct: 2 },
    ],
  },
};
