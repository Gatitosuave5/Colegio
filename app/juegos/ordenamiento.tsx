'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { THEMES } from './games-data';

interface Evento {
  id: number;
  texto: string;
  orden: number;
}

const STORIES_BY_THEME: Record<number, { eventos: Evento[] }> = {
  1: {
    eventos: [
      { id: 1, texto: 'La mariposa despertó en la pradera', orden: 1 },
      { id: 2, texto: 'Voló entre las flores coloridas', orden: 2 },
      { id: 3, texto: 'Bailó con la luz del sol', orden: 3 },
      { id: 4, texto: 'Descubrió su belleza azul', orden: 4 },
    ],
  },
  2: {
    eventos: [
      { id: 1, texto: 'El león rugía al amanecer', orden: 1 },
      { id: 2, texto: 'Perdió su rugido un día', orden: 2 },
      { id: 3, texto: 'Buscó ayuda en la sabana', orden: 3 },
      { id: 4, texto: 'Recuperó su rugido mágico', orden: 4 },
    ],
  },
  3: {
    eventos: [
      { id: 1, texto: 'La ciudad era llena de colores', orden: 1 },
      { id: 2, texto: 'Un día los colores desaparecieron', orden: 2 },
      { id: 3, texto: 'La gente buscó desesperada', orden: 3 },
      { id: 4, texto: 'Los colores regresaron con magia', orden: 4 },
    ],
  },
  4: {
    eventos: [
      { id: 1, texto: 'El tren comenzó su viaje', orden: 1 },
      { id: 2, texto: 'Viajó por montañas y valles', orden: 2 },
      { id: 3, texto: 'Se dio cuenta que no quería parar', orden: 3 },
      { id: 4, texto: 'Descubrió la belleza del camino eterno', orden: 4 },
    ],
  },
  5: {
    eventos: [
      { id: 1, texto: 'El faro se alzaba en la isla', orden: 1 },
      { id: 2, texto: 'Iluminaba el océano cada noche', orden: 2 },
      { id: 3, texto: 'Guiaba a los barcos perdidos', orden: 3 },
      { id: 4, texto: 'Se convirtió en un símbolo de esperanza', orden: 4 },
    ],
  },
  6: {
    eventos: [
      { id: 1, texto: 'El reino encantado existía', orden: 1 },
      { id: 2, texto: 'Dragones y criaturas lo habitaban', orden: 2 },
      { id: 3, texto: 'La magia fluía por todos lados', orden: 3 },
      { id: 4, texto: 'Las aventuras nunca terminaban', orden: 4 },
    ],
  },
  7: {
    eventos: [
      { id: 1, texto: 'El árbol crecía en el bosque', orden: 1 },
      { id: 2, texto: 'Brillaba con luces mágicas', orden: 2 },
      { id: 3, texto: 'Concedía todos los deseos', orden: 3 },
      { id: 4, texto: 'Traía alegría a quien lo visitaba', orden: 4 },
    ],
  },
  8: {
    eventos: [
      { id: 1, texto: 'La cueva estaba escondida', orden: 1 },
      { id: 2, texto: 'Cristales brillaban en las paredes', orden: 2 },
      { id: 3, texto: 'Gemas preciosas decoraban el suelo', orden: 3 },
      { id: 4, texto: 'Era el lugar más hermoso del mundo', orden: 4 },
    ],
  },
  9: {
    eventos: [
      { id: 1, texto: 'El dragón era diferente', orden: 1 },
      { id: 2, texto: 'No atacaba, ayudaba a otros', orden: 2 },
      { id: 3, texto: 'Volaba sobre montañas coloridas', orden: 3 },
      { id: 4, texto: 'Se convirtió en amigo de todos', orden: 4 },
    ],
  },
  10: {
    eventos: [
      { id: 1, texto: 'El bosque era mágico', orden: 1 },
      { id: 2, texto: 'Criaturas fantásticas lo habitaban', orden: 2 },
      { id: 3, texto: 'Cada árbol tenía su propia historia', orden: 3 },
      { id: 4, texto: 'La magia era tangible en el aire', orden: 4 },
    ],
  },
};

interface OrdenimientoProps {
  themeId?: number;
}

export default function JuegoOrdenamiento({ themeId = 1 }: OrdenimientoProps) {
  const theme = THEMES[themeId - 1];
  const historiaActual = STORIES_BY_THEME[themeId];
  const [eventosRevueltos, setEventosRevueltos] = useState<Evento[]>(
    [...historiaActual.eventos].sort(() => Math.random() - 0.5)
  );
  const [orden, setOrden] = useState<number[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [ganado, setGanado] = useState(false);

  const agregarEvento = (evento: Evento) => {
    const nuevoOrden = [...orden, evento.id];
    setOrden(nuevoOrden);
    setMensaje('');

    if (nuevoOrden.length === historiaActual.eventos.length) {
      const esCorrect = nuevoOrden.every((id, idx) =>
        eventosRevueltos.find(e => e.id === id)?.orden === idx + 1
      );

      if (esCorrect) {
        setGanado(true);
        setMensaje('¡Excelente! La historia está correcta!');
      } else {
        setMensaje('Intenta de nuevo');
        setOrden([]);
      }
    }
  };

  const removerEvento = (idx: number) => {
    setOrden(orden.filter((_, i) => i !== idx));
  };

  const reiniciar = () => {
    setEventosRevueltos([...historiaActual.eventos].sort(() => Math.random() - 0.5));
    setOrden([]);
    setMensaje('');
    setGanado(false);
  };

  return (
    <Card className="w-full border-4 border-green-400">
      <CardHeader className={`bg-gradient-to-r ${theme.color} text-white rounded-t-lg`}>
        <CardTitle className="text-2xl">Ordena la Historia - {theme.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-8">
        <p className="text-lg mb-6 text-center text-green-700 font-semibold">
          Ordena los eventos de la historia de forma correcta
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Eventos disponibles */}
          <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <p className="text-sm font-bold text-green-700 mb-3">Eventos:</p>
            <div className="space-y-2">
              {eventosRevueltos
                .filter(e => !orden.includes(e.id))
                .map(evento => (
                  <Button
                    key={evento.id}
                    onClick={() => agregarEvento(evento)}
                    className="w-full bg-green-300 hover:bg-green-400 text-black font-bold text-left justify-start"
                  >
                    {evento.texto}
                  </Button>
                ))}
            </div>
          </div>

          {/* Orden actual */}
          <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
            <p className="text-sm font-bold text-yellow-700 mb-3">Tu orden:</p>
            <div className="space-y-2">
              {orden.length === 0 ? (
                <p className="text-gray-400 italic">Haz clic en los eventos para ordenarlos...</p>
              ) : (
                orden.map((id, idx) => {
                  const evento = eventosRevueltos.find(e => e.id === id);
                  return (
                    <div key={idx} className="flex justify-between items-center p-3 bg-white rounded border-2 border-yellow-300">
                      <div>
                        <span className="font-bold text-yellow-700">{idx + 1}.</span> {evento?.texto}
                      </div>
                      <Button
                        onClick={() => removerEvento(idx)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Mensaje */}
        {mensaje && (
          <div className={`p-4 rounded-lg text-center text-lg font-bold mb-6 ${
            ganado
              ? 'bg-green-100 text-green-700 border-2 border-green-400'
              : 'bg-red-100 text-red-700 border-2 border-red-400'
          }`}>
            {mensaje}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={reiniciar}
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold text-lg px-6"
          >
            Reintentar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
