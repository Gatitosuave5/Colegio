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
  "sumas-llevadas": {
    id: "sumas-llevadas",
    title: "Sumas con Llevadas",
    icon: "➕",
    gameId: "memory",
    background: "https://i.ytimg.com/vi/Vk0h-26cfFQ/maxresdefault.jpg",
    image: "https://i.ytimg.com/vi/kyJ6I_6F5SA/maxresdefault.jpg",
    explanation: `
Las sumas con llevadas ocurren cuando la suma de dos dígitos es mayor que 9.
Pasos:
1. Suma los dígitos de la derecha (unidades).
2. Si el resultado es 10 o más, escribe la unidad y lleva el 1 a la columna siguiente.
3. Suma los dígitos de la izquierda (decenas) más la llevada.
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "15 + 17 = ?",
        explanation: "Unidades: 5+7=12 (escribo 2 y llevo 1). Decenas: 1+1+1=3. Resultado: 32",
      },
      {
        title: "Ejemplo 2",
        operation: "28 + 14 = ?",
        explanation: "Unidades: 8+4=12 (escribo 2 y llevo 1). Decenas: 2+1+1=4. Resultado: 42",
      },
    ],
    quiz: [
      { question: "¿Cuánto es 18 + 15?", options: ["32", "33", "31", "34"], correct: 1 },
      { question: "¿Cuánto es 27 + 25?", options: ["51", "52", "53", "50"], correct: 1 },
      { question: "¿Cuánto es 19 + 14?", options: ["32", "33", "34", "35"], correct: 1 },
      { question: "¿Cuánto es 26 + 18?", options: ["43", "44", "45", "46"], correct: 1 },
      { question: "¿Cuánto es 17 + 16?", options: ["32", "33", "34", "35"], correct: 1 },
      { question: "¿Cuánto es 28 + 13?", options: ["40", "41", "42", "43"], correct: 1 },
      { question: "¿Cuánto es 19 + 19?", options: ["36", "37", "38", "39"], correct: 1 },
      { question: "¿Cuánto es 24 + 17?", options: ["40", "41", "42", "43"], correct: 1 },
      { question: "¿Cuánto es 15 + 28?", options: ["42", "43", "44", "45"], correct: 1 },
      { question: "¿Cuánto es 29 + 12?", options: ["40", "41", "42", "43"], correct: 0 },
    ],
  },

  "restas-llevadas": {
    id: "restas-llevadas",
    title: "Restas con Llevadas",
    icon: "➖",
    gameId: "order",
    background: "https://i.ytimg.com/vi/uOfj-kBJ-4E/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGEMgZSgUMA8=&rs=AOn4CLAyiZbzLCLvut-kA_SoKao1HsxWdA",
    image: "https://i.pinimg.com/originals/42/00/a1/4200a1fd773b89ea7f384df04d1257c7.jpg",
    explanation: `
Las restas con llevadas ocurren cuando no podemos restar un dígito menor a uno mayor.
Pasos:
1. Si no podemos restar, tomamos 10 prestado de la columna siguiente.
2. Restamos en las unidades.
3. Restamos en las decenas (recordando que prestamos 1).
`,
    examples: [
      {
        title: "Ejemplo 1",
        operation: "32 - 15 = ?",
        explanation: "No podemos restar 5 de 2. Prestamos 1 decena. 12-5=7, 2-1-1=0. Resultado: 17",
      },
      {
        title: "Ejemplo 2",
        operation: "40 - 13 = ?",
        explanation: "No podemos restar 3 de 0. Prestamos 1 decena. 10-3=7, 3-1=2. Resultado: 27",
      },
    ],
    quiz: [
      { question: "¿Cuánto es 32 - 15?", options: ["16", "17", "18", "19"], correct: 1 },
      { question: "¿Cuánto es 40 - 13?", options: ["25", "26", "27", "28"], correct: 1 },
      { question: "¿Cuánto es 52 - 27?", options: ["24", "25", "26", "27"], correct: 1 },
      { question: "¿Cuánto es 43 - 18?", options: ["24", "25", "26", "27"], correct: 1 },
      { question: "¿Cuánto es 30 - 12?", options: ["17", "18", "19", "20"], correct: 1 },
      { question: "¿Cuánto es 55 - 28?", options: ["25", "26", "27", "28"], correct: 1 },
      { question: "¿Cuánto es 60 - 24?", options: ["35", "36", "37", "38"], correct: 1 },
      { question: "¿Cuánto es 41 - 16?", options: ["24", "25", "26", "27"], correct: 1 },
      { question: "¿Cuánto es 50 - 23?", options: ["26", "27", "28", "29"], correct: 1 },
      { question: "¿Cuánto es 35 - 19?", options: ["15", "16", "17", "18"], correct: 1 },
    ],
  },

  "figuras-lados": {
    id: "figuras-lados",
    title: "Figuras y Lados",
    icon: "🔷",
    gameId: "memory",
    background: "https://i.ytimg.com/vi/hduEhwrLJ4U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCKS2UpMgoT1FcEAjJk5fBbcUMI8Q",
    image: "https://i.pinimg.com/736x/50/2d/a8/502da831591181937f5bbaca9f06bce1.jpg",
    explanation: `
Las figuras geométricas tienen características especiales como el número de lados y vértices.
Aprendemos a identificar y contar los lados de cada figura.
`,
    examples: [
      { title: "Ejemplo 1", operation: "Triángulo", explanation: "Tiene 3 lados y 3 vértices" },
      { title: "Ejemplo 2", operation: "Cuadrado", explanation: "Tiene 4 lados iguales y 4 vértices" },
    ],
    quiz: [
      { question: "¿Cuántos lados tiene un triángulo?", options: ["2", "3", "4", "5"], correct: 1 },
      { question: "¿Cuántos lados tiene un cuadrado?", options: ["3", "4", "5", "6"], correct: 1 },
      { question: "¿Cuántos lados tiene un rectángulo?", options: ["3", "4", "5", "6"], correct: 1 },
      { question: "¿Cuántos lados tiene un pentágono?", options: ["3", "4", "5", "6"], correct: 2 },
      { question: "¿Cuántos lados tiene un hexágono?", options: ["4", "5", "6", "7"], correct: 2 },
      { question: "Un círculo tiene:", options: ["0 lados", "1 lado", "2 lados", "3 lados"], correct: 0 },
      { question: "¿Cuántos vértices tiene un cuadrado?", options: ["2", "3", "4", "5"], correct: 2 },
      { question: "¿Cuántos vértices tiene un triángulo?", options: ["2", "3", "4", "5"], correct: 1 },
      { question: "Un octágono tiene:", options: ["6 lados", "7 lados", "8 lados", "9 lados"], correct: 2 },
      { question: "¿Qué figura tiene 4 lados iguales?", options: ["Rectángulo", "Cuadrado", "Triángulo", "Círculo"], correct: 1 },
    ],
  },

  "medidas-basicas": {
    id: "medidas-basicas",
    title: "Medidas Básicas",
    icon: "📏",
    gameId: "fast",
    background: "https://content.gnoss.ws/imagenes/Usuarios/ImagenesCKEditor/e1ccd637-a16e-4fe1-a14c-957c7bdc64e0/f4f40d19-2c00-4e26-969d-7378b40fa2a5.jpg",
    image: "https://elamatematicas5y6.wordpress.com/wp-content/uploads/2016/11/unidades-de-medida.jpg?w=640",
    explanation: `
Las medidas nos ayudan a conocer el tamaño, peso y cantidad de las cosas.
- Metro: para medir distancias y alturas
- Kilogramo: para medir peso
- Litro: para medir cantidad de líquido
`,
    examples: [
      { title: "Ejemplo 1", operation: "Altura", explanation: "Se mide en metros. Una puerta mide aproximadamente 2 metros" },
      { title: "Ejemplo 2", operation: "Peso", explanation: "Se mide en kilogramos. Un niño pesa entre 20 y 30 kilogramos" },
    ],
    quiz: [
      { question: "¿Con qué se mide la altura?", options: ["kilogramos", "metros", "litros"], correct: 1 },
      { question: "¿Con qué se mide el peso?", options: ["metros", "litros", "kilogramos"], correct: 2 },
      { question: "¿Con qué se mide el agua?", options: ["metros", "kilogramos", "litros"], correct: 2 },
      { question: "Un metro tiene:", options: ["10 centímetros", "50 centímetros", "100 centímetros"], correct: 2 },
      { question: "¿Cuántos kilogramos pesan 2 bolsas de 5 kg?", options: ["5", "10", "15"], correct: 1 },
      { question: "¿Cuántos litros hay en 3 botellas de 2 litros?", options: ["5", "6", "7"], correct: 1 },
      { question: "Una manzana pesa aproximadamente:", options: ["100 gramos", "1 kilogramo", "10 kilogramos"], correct: 0 },
      { question: "Una botella de leche contiene:", options: ["5 litros", "1 litro", "10 litros"], correct: 1 },
      { question: "Un escritorio mide aproximadamente:", options: ["1 metro", "10 metros", "100 metros"], correct: 0 },
      { question: "Un vaso de agua contiene aproximadamente:", options: ["1 litro", "250 mililitros", "10 litros"], correct: 1 },
    ],
  },

  "mitad-doble": {
    id: "mitad-doble",
    title: "Mitad y Doble",
    icon: "🔄",
    gameId: "order",
    background: "https://i.ytimg.com/vi/lNwH6Ic7IVo/maxresdefault.jpg",
    image: "https://i.ytimg.com/vi/QnTkGmh7u1Y/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGHIgWSgvMA8=&rs=AOn4CLDgYVJ9rYeIJGnZFiB9iEv0-Ww4og",
    explanation: `
La mitad divide un número entre 2.
El doble multiplica un número por 2.
Ejemplos:
- La mitad de 10 es 5 (10 ÷ 2 = 5)
- El doble de 5 es 10 (5 × 2 = 10)
`,
    examples: [
      { title: "Ejemplo 1", operation: "Mitad de 12", explanation: "12 ÷ 2 = 6" },
      { title: "Ejemplo 2", operation: "Doble de 7", explanation: "7 × 2 = 14" },
    ],
    quiz: [
      { question: "¿Cuál es la mitad de 10?", options: ["4", "5", "6", "7"], correct: 1 },
      { question: "¿Cuál es el doble de 8?", options: ["15", "16", "17", "18"], correct: 1 },
      { question: "¿Cuál es la mitad de 20?", options: ["9", "10", "11", "12"], correct: 1 },
      { question: "¿Cuál es el doble de 9?", options: ["17", "18", "19", "20"], correct: 1 },
      { question: "¿Cuál es la mitad de 16?", options: ["7", "8", "9", "10"], correct: 1 },
      { question: "¿Cuál es el doble de 6?", options: ["11", "12", "13", "14"], correct: 1 },
      { question: "¿Cuál es la mitad de 30?", options: ["14", "15", "16", "17"], correct: 1 },
      { question: "¿Cuál es el doble de 12?", options: ["23", "24", "25", "26"], correct: 1 },
      { question: "¿Cuál es la mitad de 14?", options: ["6", "7", "8", "9"], correct: 1 },
      { question: "¿Cuál es el doble de 15?", options: ["29", "30", "31", "32"], correct: 1 },
    ],
  },

  "problemas-dinero": {
    id: "problemas-dinero",
    title: "Problemas con Dinero",
    icon: "💰",
    gameId: "fast",
    background: "https://circuloeducativo.com/wp-content/uploads/Sistema-Monetario-del-Peru-para-Tercero-de-Primaria.jpg",
    image: "https://i.pinimg.com/1200x/51/7b/f3/517bf3701eb1568360fef5630a47dc8d.jpg",
    explanation: `
Los problemas con dinero nos enseñan a comprar y calcular cambios.
- Identificar el precio
- Calcular cuánto gastar
- Calcular el cambio (dinero que devuelven)
`,
    examples: [
      { title: "Ejemplo 1", operation: "Compra", explanation: "Dulce cuesta 15 pesos, pago con 20. Cambio: 20-15 = 5 pesos" },
      { title: "Ejemplo 2", operation: "Compra múltiple", explanation: "Compro 2 dulces de 10 pesos cada uno. Total: 10+10 = 20 pesos" },
    ],
    quiz: [
      { question: "Un dulce cuesta 10 pesos. ¿Cuánto cuestan 3 dulces?", options: ["20", "30", "40"], correct: 1 },
      { question: "Un juguete cuesta 25 pesos. Pago con 50. ¿Cuánto es el cambio?", options: ["20", "25", "30"], correct: 1 },
      { question: "Compro pan a 8 pesos y leche a 12 pesos. ¿Total?", options: ["18", "19", "20"], correct: 0 },
      { question: "Tengo 40 pesos. Gasto 15. ¿Cuánto me queda?", options: ["23", "24", "25"], correct: 2 },
      { question: "Libro de 30 pesos. Pago con 50. ¿Cambio?", options: ["18", "19", "20"], correct: 2 },
      { question: "3 caramelos de 5 pesos cada uno. ¿Total?", options: ["14", "15", "16"], correct: 1 },
      { question: "Tengo 60 pesos. Compro dos cosas de 20 cada una. ¿Me queda?", options: ["18", "19", "20"], correct: 2 },
      { question: "Un cuaderno cuesta 12 pesos. ¿Cuánto cuestan 4?", options: ["46", "47", "48"], correct: 2 },
      { question: "Pago 100 pesos por algo que cuesta 60. ¿Cambio?", options: ["38", "39", "40"], correct: 2 },
      { question: "Dos helados de 15 pesos cada uno. ¿Total?", options: ["28", "29", "30"], correct: 2 },
    ],
  },

  "series-avanzadas": {
    id: "series-avanzadas",
    title: "Series Avanzadas",
    icon: "📊",
    gameId: "fast",
    background: "https://i.ytimg.com/vi/YkzRtsIjqWI/maxresdefault.jpg",
    image: "https://matemathweb.com/wp-content/uploads/2020/08/image-100.png",
    explanation: `
Las series siguen patrones más complejos.
Pueden aumentar de 3 en 3, de 5 en 5, o tener otros patrones especiales.
`,
    examples: [
      { title: "Ejemplo 1", operation: "3, 6, 9, 12, __", explanation: "Aumenta de 3 en 3 → 15" },
      { title: "Ejemplo 2", operation: "5, 10, 15, 20, __", explanation: "Aumenta de 5 en 5 → 25" },
    ],
    quiz: [
      { question: "¿3, 6, 9, 12, __?", options: ["13", "14", "15"], correct: 2 },
      { question: "¿5, 10, 15, 20, __?", options: ["23", "24", "25"], correct: 2 },
      { question: "¿2, 4, 6, 8, __?", options: ["9", "10", "11"], correct: 1 },
      { question: "¿4, 8, 12, 16, __?", options: ["19", "20", "21"], correct: 1 },
      { question: "¿10, 20, 30, 40, __?", options: ["49", "50", "51"], correct: 1 },
      { question: "¿1, 3, 5, 7, __?", options: ["8", "9", "10"], correct: 1 },
      { question: "¿6, 12, 18, 24, __?", options: ["29", "30", "31"], correct: 1 },
      { question: "¿7, 14, 21, 28, __?", options: ["34", "35", "36"], correct: 1 },
      { question: "¿2, 6, 10, 14, __?", options: ["17", "18", "19"], correct: 1 },
      { question: "¿8, 16, 24, 32, __?", options: ["39", "40", "41"], correct: 1 },
    ],
  },

  "horas-minutos": {
    id: "horas-minutos",
    title: "Horas y Minutos",
    icon: "🕐",
    gameId: "order",
    background: "https://i.ytimg.com/vi/YxR-UDOqutI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBu7H0SCuF_eTIhzyf7zijHtRP6-Q",
    image: "https://i.pinimg.com/736x/db/23/11/db23117e3f85efdf5fdf0bafa986c0e0.jpg",
    explanation: `
Leer la hora es importante para saber qué hora es.
- La aguja corta marca las horas
- La aguja larga marca los minutos
- Una hora tiene 60 minutos
`,
    examples: [
      { title: "Ejemplo 1", operation: "3:00", explanation: "Son las 3 en punto" },
      { title: "Ejemplo 2", operation: "3:30", explanation: "Son las 3 y media (3 horas y 30 minutos)" },
    ],
    quiz: [
      { question: "¿Cuántos minutos tiene una hora?", options: ["30", "60", "100"], correct: 1 },
      { question: "¿Cuántas horas tiene un día?", options: ["12", "24", "48"], correct: 1 },
      { question: "Si son las 2:00, ¿qué hora será en 1 hora?", options: ["2:30", "3:00", "4:00"], correct: 1 },
      { question: "¿Cuántos minutos son 2 horas?", options: ["60", "90", "120"], correct: 2 },
      { question: "Si son las 5:30, ¿cuántos minutos faltan para las 6?", options: ["20", "30", "40"], correct: 1 },
      { question: "¿Qué hora es las 12 + 5 horas?", options: ["4", "5", "6"], correct: 2 },
      { question: "¿Cuántos minutos son 3 horas?", options: ["120", "180", "240"], correct: 1 },
      { question: "Si son las 10:15, ¿qué hora es?", options: ["10 y cuarto", "10 y media", "10 menos cuarto"], correct: 0 },
      { question: "¿Cuántas horas hay entre las 8:00 y las 12:00?", options: ["2", "3", "4"], correct: 2 },
      { question: "Si son las 7:45, ¿cuántos minutos faltan para las 8?", options: ["10", "15", "20"], correct: 1 },
    ],
  },

  "tablas-1-5": {
    id: "tablas-1-5",
    title: "Tablas del 1 al 5",
    icon: "✖️",
    gameId: "memory",
    background: "https://i.ytimg.com/vi/LrZ-Xn56LSg/maxresdefault.jpg",
    image: "https://s1.significados.com/foto/tablas-inicio-4f.jpg?class=article",
    explanation: `
Las tablas de multiplicar nos ayudan a multiplicar números rápidamente.
La multiplicación es una forma rápida de sumar grupos iguales.
Ejemplo: 3 × 2 = 2 + 2 + 2 = 6
`,
    examples: [
      { title: "Ejemplo 1", operation: "3 × 2", explanation: "3 grupos de 2 = 6" },
      { title: "Ejemplo 2", operation: "4 × 3", explanation: "4 grupos de 3 = 12" },
    ],
    quiz: [
      { question: "¿Cuánto es 2 × 3?", options: ["5", "6", "7"], correct: 1 },
      { question: "¿Cuánto es 3 × 4?", options: ["11", "12", "13"], correct: 1 },
      { question: "¿Cuánto es 5 × 2?", options: ["9", "10", "11"], correct: 1 },
      { question: "¿Cuánto es 4 × 2?", options: ["7", "8", "9"], correct: 1 },
      { question: "¿Cuánto es 3 × 3?", options: ["8", "9", "10"], correct: 1 },
      { question: "¿Cuánto es 5 × 3?", options: ["14", "15", "16"], correct: 1 },
      { question: "¿Cuánto es 2 × 4?", options: ["7", "8", "9"], correct: 1 },
      { question: "¿Cuánto es 5 × 4?", options: ["19", "20", "21"], correct: 1 },
      { question: "¿Cuánto es 3 × 5?", options: ["14", "15", "16"], correct: 1 },
      { question: "¿Cuánto es 4 × 4?", options: ["15", "16", "17"], correct: 1 },
    ],
  },

  "pares-impares": {
    id: "pares-impares",
    title: "Pares e Impares",
    icon: "🔢",
    gameId: "order",
    background: "https://i.ytimg.com/vi/ZOip5xSxKsk/maxresdefault.jpg",
    image: "https://www.ecured.cu/images/thumb/3/39/Numeros_p_e_i.JPG/1200px-Numeros_p_e_i.JPG",
    explanation: `
Los números pares se dividen exactamente entre 2 (terminan en 0, 2, 4, 6, 8).
Los números impares no se dividen exactamente entre 2 (terminan en 1, 3, 5, 7, 9).
`,
    examples: [
      { title: "Ejemplo 1", operation: "Números pares", explanation: "2, 4, 6, 8, 10, 12..." },
      { title: "Ejemplo 2", operation: "Números impares", explanation: "1, 3, 5, 7, 9, 11..." },
    ],
    quiz: [
      { question: "¿Es 5 par o impar?", options: ["Par", "Impar"], correct: 1 },
      { question: "¿Es 8 par o impar?", options: ["Par", "Impar"], correct: 0 },
      { question: "¿Es 13 par o impar?", options: ["Par", "Impar"], correct: 1 },
      { question: "¿Es 20 par o impar?", options: ["Par", "Impar"], correct: 0 },
      { question: "¿Es 17 par o impar?", options: ["Par", "Impar"], correct: 1 },
      { question: "¿Es 24 par o impar?", options: ["Par", "Impar"], correct: 0 },
      { question: "¿Es 11 par o impar?", options: ["Par", "Impar"], correct: 1 },
      { question: "¿Es 30 par o impar?", options: ["Par", "Impar"], correct: 0 },
      { question: "¿Es 7 par o impar?", options: ["Par", "Impar"], correct: 1 },
      { question: "¿Es 26 par o impar?", options: ["Par", "Impar"], correct: 0 },
    ],
  },
};
