'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { THEMES } from './games-data';

interface Adivinanza {
  id: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  explicacion: string;
}

interface AdivinanzasProps {
  themeId?: number;
  onBack: () => void;
}

const RIDDLES_BY_THEME: Record<number, Adivinanza[]> = {
  1: [
    {
      id: 1,
      pregunta: 'De qué color era la mariposa?',
      opciones: ['Roja', 'Azul', 'Verde', 'Amarilla'],
      respuestaCorrecta: 1,
      explicacion: ' La mariposa era azul como el cielo.',
    },
    {
      id: 2,
      pregunta: 'Dónde volaba la mariposa?',
      opciones: ['En la montaña', 'En la pradera', 'En el cielo', 'En el bosque'],
      respuestaCorrecta: 1,
      explicacion: ' Volaba en la hermosa pradera mágica.',
    },
    {
      id: 3,
      pregunta: 'Qué había en la pradera?',
      opciones: ['Flores', 'Árboles', 'Rocas', 'Nieve'],
      respuestaCorrecta: 0,
      explicacion: ' La pradera estaba llena de flores hermosas.',
    },
    {
      id: 4,
      pregunta: 'La mariposa era...?',
      opciones: ['Triste', 'Mágica', 'Ordinaria', 'Muda'],
      respuestaCorrecta: 1,
      explicacion: ' Era una mariposa completamente mágica.',
    },
  ],
  2: [
    {
      id: 1,
      pregunta: 'Qué perdió el león?',
      opciones: ['Su melena', 'Su rugido', 'Sus garras', 'Su coraje'],
      respuestaCorrecta: 1,
      explicacion: ' El león perdió su poderoso rugido.',
    },
    {
      id: 2,
      pregunta: 'Dónde vivía el león?',
      opciones: ['En la selva', 'En la sabana', 'En la montaña', 'En el desierto'],
      respuestaCorrecta: 1,
      explicacion: ' Vivía en la hermosa sabana dorada.',
    },
    {
      id: 3,
      pregunta: 'Cómo se sentía el león?',
      opciones: ['Feliz', 'Asustado', 'Confundido', 'Todos'],
      respuestaCorrecta: 3,
      explicacion: ' El león sentía una mezcla de emociones.',
    },
    {
      id: 4,
      pregunta: 'El rugido del león era...?',
      opciones: ['Silencioso', 'Muy fuerte', 'Estridente', 'Débil'],
      respuestaCorrecta: 1,
      explicacion: 'Su rugido era famoso por ser muy fuerte.',
    },
  ],
  3: [
    {
      id: 1,
      pregunta: 'Qué se perdió en la ciudad?',
      opciones: ['Las casas', 'Los colores', 'La gente', 'El camino'],
      respuestaCorrecta: 1,
      explicacion: 'Los colores desaparecieron de la ciudad.',
    },
    {
      id: 2,
      pregunta: 'Cómo era la ciudad sin colores?',
      opciones: ['Hermosa', 'Triste', 'Brillante', 'Colorida'],
      respuestaCorrecta: 1,
      explicacion: 'Era un lugar triste y gris.',
    },
    {
      id: 3,
      pregunta: 'Qué hacía la gente en la ciudad?',
      opciones: ['Reír', 'Llorar', 'Buscar los colores', 'Bailar'],
      respuestaCorrecta: 2,
      explicacion: ' Todos buscaban los colores perdidos.',
    },
    {
      id: 4,
      pregunta: 'La ciudad era...?',
      opciones: ['Pequeña', 'Grande', 'Mágica', 'Normal'],
      respuestaCorrecta: 2,
      explicacion: ' Era una ciudad completamente mágica.',
    },
  ],
  4: [
    {
      id: 1,
      pregunta: 'Qué no quería hacer el tren?',
      opciones: ['Ir rápido', 'Parar', 'Sonar la campana', 'Llevar pasajeros'],
      respuestaCorrecta: 1,
      explicacion: ' El tren no quería parar nunca.',
    },
    {
      id: 2,
      pregunta: 'Por dónde viajaba el tren?',
      opciones: ['Por la montaña', 'Por el bosque', 'Por un paisaje mágico', 'Por el desierto'],
      respuestaCorrecta: 2,
      explicacion: ' Viajaba por un paisaje completamente mágico.',
    },
    {
      id: 3,
      pregunta: 'Cómo era el tren?',
      opciones: ['Viejo', 'Nuevo', 'Mágico', 'Ordinario'],
      respuestaCorrecta: 2,
      explicacion: ' Era un tren muy mágico y especial.',
    },
    {
      id: 4,
      pregunta: 'Quién lo tripulaba?',
      opciones: ['Un maquinista', 'Un conductor', 'Personajes mágicos', 'Robots'],
      respuestaCorrecta: 2,
      explicacion: ' Personajes mágicos lo tripulaban.',
    },
  ],
  5: [
    {
      id: 1,
      pregunta: 'Dónde estaba el faro?',
      opciones: ['En la montaña', 'En una isla', 'En la ciudad', 'En el bosque'],
      respuestaCorrecta: 1,
      explicacion: 'El faro estaba en una isla solitaria.',
    },
    {
      id: 2,
      pregunta: 'Cómo era el faro?',
      opciones: ['Pequeño', 'Oscuro', 'Solitario', 'Ruidoso'],
      respuestaCorrecta: 2,
      explicacion: 'Era un faro muy solitario y único.',
    },
    {
      id: 3,
      pregunta: 'Qué rodeaba la isla?',
      opciones: ['Montañas', 'Olas', 'Árboles', 'Rocas'],
      respuestaCorrecta: 1,
      explicacion: 'Hermosas olas rodeaban la isla.',
    },
    {
      id: 4,
      pregunta: 'El faro brillaba...?',
      opciones: ['De noche', 'De día', 'Siempre', 'Nunca'],
      respuestaCorrecta: 0,
      explicacion: 'Brillaba especialmente de noche.',
    },
  ],
  6: [
    {
      id: 1,
      pregunta: 'Qué había en el reino?',
      opciones: ['Dragones', 'Castillos', 'Magia', 'Todo'],
      respuestaCorrecta: 3,
      explicacion: ' El reino tenía dragones, castillos y magia.',
    },
    {
      id: 2,
      pregunta: 'Cómo era el reino?',
      opciones: ['Triste', 'Encantado', 'Vacío', 'Normal'],
      respuestaCorrecta: 1,
      explicacion: 'Era un reino completamente encantado.',
    },
    {
      id: 3,
      pregunta: 'Quiénes vivían allí?',
      opciones: ['Personas normales', 'Criaturas mágicas', 'Solo dragones', 'Fantasmas'],
      respuestaCorrecta: 1,
      explicacion: ' Criaturas mágicas vivían en el reino.',
    },
    {
      id: 4,
      pregunta: 'El castillo era...?',
      opciones: ['De piedra', 'De oro', 'Mágico', 'Subterráneo'],
      respuestaCorrecta: 2,
      explicacion: ' El castillo era completamente mágico.',
    },
  ],
  7: [
    {
      id: 1,
      pregunta: 'Qué hacía el árbol?',
      opciones: ['Crecía', 'Concedía deseos', 'Hablaba', 'Dormía'],
      respuestaCorrecta: 1,
      explicacion: 'El árbol concedía todos los deseos.',
    },
    {
      id: 2,
      pregunta: 'Cómo era el árbol?',
      opciones: ['Pequeño', 'Viejo', 'Mágico', 'Marchito'],
      respuestaCorrecta: 2,
      explicacion: ' Era un árbol increíblemente mágico.',
    },
    {
      id: 3,
      pregunta: 'Qué había alrededor del árbol?',
      opciones: ['Flores', 'Rocas', 'Luces', 'Nada'],
      respuestaCorrecta: 2,
      explicacion: 'Luces mágicas rodeaban el árbol.',
    },
    {
      id: 4,
      pregunta: 'Quiénes visitaban el árbol?',
      opciones: ['Animales', 'Personas', 'Nadie', 'Seres mágicos'],
      respuestaCorrecta: 3,
      explicacion: 'Seres mágicos lo visitaban.',
    },
  ],
  8: [
    {
      id: 1,
      pregunta: 'Qué había en la cueva?',
      opciones: ['Agua', 'Cristales', 'Oro', 'Oscuridad'],
      respuestaCorrecta: 1,
      explicacion: 'La cueva estaba llena de cristales brillantes.',
    },
    {
      id: 2,
      pregunta: 'Cómo brillaba la cueva?',
      opciones: ['Con fuego', 'Con luz', 'Con magia', 'Con linterna'],
      respuestaCorrecta: 2,
      explicacion: ' Brillaba con una luz mágica especial.',
    },
    {
      id: 3,
      pregunta: 'Qué gemstones había?',
      opciones: ['Rubíes', 'Diamantes', 'Zafiros', 'Todos'],
      respuestaCorrecta: 3,
      explicacion: ' Todos los gemstones estaban allí.',
    },
    {
      id: 4,
      pregunta: 'La cueva era...?',
      opciones: ['Peligrosa', 'Hermosa', 'Vacía', 'Mojada'],
      respuestaCorrecta: 1,
      explicacion: ' Era una cueva hermosa y mágica.',
    },
  ],
  9: [
    {
      id: 1,
      pregunta: 'Cómo era el dragón?',
      opciones: ['Malo', 'Amigable', 'Furioso', 'Tímido'],
      respuestaCorrecta: 1,
      explicacion: ' El dragón era muy amigable y gentil.',
    },
    {
      id: 2,
      pregunta: 'De qué color era?',
      opciones: ['Rojo', 'Azul', 'Colorido', 'Negro'],
      respuestaCorrecta: 2,
      explicacion: ' Era un dragón con muchos colores hermosos.',
    },
    {
      id: 3,
      pregunta: 'Dónde volaba?',
      opciones: ['En la montaña', 'En el cielo', 'En la cueva', 'En el mar'],
      respuestaCorrecta: 1,
      explicacion: ' Volaba libremente en el cielo.',
    },
    {
      id: 4,
      pregunta: 'Qué hacía el dragón?',
      opciones: ['Atacaba', 'Ayudaba', 'Dormía', 'Viajaba'],
      respuestaCorrecta: 1,
      explicacion: ' Siempre ayudaba a quienes lo necesitaban.',
    },
  ],
  10: [
    {
      id: 1,
      pregunta: 'Qué había en el bosque?',
      opciones: ['Árboles', 'Criaturas mágicas', 'Magia', 'Todo'],
      respuestaCorrecta: 3,
      explicacion: ' El bosque tenía árboles, criaturas y magia.',
    },
    {
      id: 2,
      pregunta: 'Cómo era el bosque?',
      opciones: ['Oscuro', 'Encantado', 'Silencioso', 'Ruidoso'],
      respuestaCorrecta: 1,
      explicacion: ' Era un bosque completamente encantado.',
    },
    {
      id: 3,
      pregunta: 'Quiénes vivían allí?',
      opciones: ['Humanos', 'Hadas', 'Criaturas mágicas', 'Nada'],
      respuestaCorrecta: 2,
      explicacion: ' Criaturas mágicas vivían en el bosque.',
    },
    {
      id: 4,
      pregunta: 'El bosque era...?',
      opciones: ['Peligroso', 'Hermoso', 'Vacío', 'Ordinario'],
      respuestaCorrecta: 1,
      explicacion: ' Era un bosque hermoso y mágico.',
    },
  ],
};

export default function JuegoAdivinanzas({ themeId = 1 , onBack}: AdivinanzasProps) {
  const theme = THEMES[themeId - 1];
  const adivinanzas = RIDDLES_BY_THEME[themeId];

  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const adivinanzaActual = adivinanzas[indiceActual];

  const manejarRespuesta = (indiceOpcion: number) => {
    setRespuestaSeleccionada(indiceOpcion);
    setMostrarResultado(true);

    if (indiceOpcion === adivinanzaActual.respuestaCorrecta) {
      setPuntuacion(puntuacion + 1);
    }
  };

  const siguiente = () => {
    if (indiceActual < adivinanzas.length - 1) {
      setIndiceActual(indiceActual + 1);
      setRespuestaSeleccionada(null);
      setMostrarResultado(false);
    } else {
      setTerminado(true);
    }
  };

  const reiniciar = () => {
    setIndiceActual(0);
    setRespuestaSeleccionada(null);
    setMostrarResultado(false);
    setPuntuacion(0);
    setTerminado(false);
  };

  if (terminado) {
    return (
      <Card className="w-full border-4 border-purple-400">
        <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl">¡Juego Terminado!</CardTitle>
        </CardHeader>
        <CardContent className="pt-8 text-center">
          <div className="mb-6">
            <p className="text-5xl mb-4">¡GANASTE!</p>
            <p className="text-3xl font-bold text-purple-700">
              ¡Obtuviste {puntuacion} de {adivinanzas.length}!
            </p>
          </div>

          {puntuacion === adivinanzas.length && (
            <p className="text-xl text-green-600 font-bold mb-6">¡Eres un maestro de adivinanzas!</p>
          )}
          {puntuacion >= adivinanzas.length - 1 && puntuacion < adivinanzas.length && (
            <p className="text-xl text-yellow-600 font-bold mb-6">¡Muy bien! ¡Casi perfecto!</p>
          )}

          <Button
            onClick={reiniciar}
            className="bg-purple-400 hover:bg-purple-500 text-white font-bold text-lg px-6"
          >
            Jugar de Nuevo
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#f0f9ff] flex justify-center items-start p-6">
      <Card className="w-full border-4 border-purple-400 max-w-4xl">
        <CardHeader className={`bg-gradient-to-r ${theme.color} text-white rounded-t-lg`}>
          <CardTitle className="text-2xl">Adivinanzas Mágicas - {theme.title}</CardTitle>
          <p className="text-sm mt-2">Pregunta {indiceActual + 1} de {adivinanzas.length}</p>
        </CardHeader>
  
        <CardContent className="pt-8">
          <p className="text-2xl font-bold text-center mb-6 text-purple-700">
            {adivinanzaActual.pregunta}
          </p>
  
          <div className="grid grid-cols-1 gap-3 mb-6">
            {adivinanzaActual.opciones.map((opcion, idx) => (
              <Button
                key={idx}
                onClick={() => !mostrarResultado && manejarRespuesta(idx)}
                disabled={mostrarResultado}
                className={`p-4 text-lg h-auto py-3 font-bold ${
                  respuestaSeleccionada === idx
                    ? idx === adivinanzaActual.respuestaCorrecta
                      ? 'bg-green-400 hover:bg-green-400 text-white'
                      : 'bg-red-400 hover:bg-red-400 text-white'
                    : 'bg-purple-200 hover:bg-purple-300 text-purple-900'
                }`}
              >
                {opcion}
              </Button>
            ))}
          </div>
  
          {mostrarResultado && (
            <>
              <div className={`p-4 rounded-lg text-center font-bold mb-6 ${
                respuestaSeleccionada === adivinanzaActual.respuestaCorrecta
                  ? 'bg-green-100 text-green-700 border-2 border-green-400'
                  : 'bg-red-100 text-red-700 border-2 border-red-400'
              }`}>
                {respuestaSeleccionada === adivinanzaActual.respuestaCorrecta ? '✅' : '❌'} {adivinanzaActual.explicacion}
              </div>
  
              <div className="flex justify-center">
                <Button
                  onClick={siguiente}
                  className="bg-purple-400 hover:bg-purple-500 text-white font-bold text-lg px-6"
                >
                  Siguiente →
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
  
  
}
