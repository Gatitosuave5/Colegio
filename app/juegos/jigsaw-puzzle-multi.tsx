'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { THEMES } from './games-data';

interface PuzzlePiece {
  id: number;
  row: number;
  col: number;
  x: number;
  y: number;
  correctRow: number;
  correctCol: number;
}

const GRID_ROWS = 4;
const GRID_COLS = 4;
const PIECE_SIZE = 80;
const SNAP_DISTANCE = 15;
const CONTAINER_WIDTH = 400;
const CONTAINER_HEIGHT = 400;

interface JigsawPuzzleMultiProps {
  themeId?: number;
}

function PuzzleGame({ themeId }: { themeId: number }) {
  const theme = THEMES[themeId - 1];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [won, setWon] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = theme.image;
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
      initializePuzzle();
    };
  }, [theme.image]);

  const initializePuzzle = () => {
    const newPieces: PuzzlePiece[] = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const id = row * GRID_COLS + col;
        newPieces.push({
          id,
          row,
          col,
          x: Math.random() * (CONTAINER_WIDTH - PIECE_SIZE),
          y: Math.random() * (CONTAINER_HEIGHT - PIECE_SIZE - 100),
          correctRow: row,
          correctCol: col,
        });
      }
    }
    setPieces(newPieces.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    if (!imageLoaded || !canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = GRID_COLS * PIECE_SIZE;
    canvas.height = GRID_ROWS * PIECE_SIZE;

    ctx.fillStyle = '#E0F2FE';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#0EA5E9';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        ctx.strokeRect(col * PIECE_SIZE, row * PIECE_SIZE, PIECE_SIZE, PIECE_SIZE);
      }
    }
    ctx.setLineDash([]);
  }, [imageLoaded]);

  const handleMouseDown = (pieceId: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const piece = pieces.find(p => p.id === pieceId);
    if (!piece) return;

    offsetRef.current = {
      x: e.clientX - rect.left - piece.x,
      y: e.clientY - rect.top - piece.y,
    };

    setDraggingId(pieceId);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingId === null || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left - offsetRef.current.x;
    let y = e.clientY - rect.top - offsetRef.current.y;

    x = Math.max(0, Math.min(x, CONTAINER_WIDTH - PIECE_SIZE));
    y = Math.max(0, Math.min(y, CONTAINER_HEIGHT - PIECE_SIZE));

    setPieces(pieces.map(piece =>
      piece.id === draggingId
        ? { ...piece, x, y }
        : piece
    ));
  };

  const handleMouseUp = () => {
    if (draggingId === null) return;

    setPieces(prevPieces =>
      prevPieces.map(piece => {
        if (piece.id !== draggingId) return piece;

        const correctX = piece.correctCol * PIECE_SIZE;
        const correctY = piece.correctRow * PIECE_SIZE;

        if (
          Math.abs(piece.x - correctX) < SNAP_DISTANCE &&
          Math.abs(piece.y - correctY) < SNAP_DISTANCE
        ) {
          return { ...piece, x: correctX, y: correctY };
        }
        return piece;
      })
    );

    setDraggingId(null);

    setTimeout(() => {
      setPieces(prevPieces => {
        const allCorrect = prevPieces.every(
          piece =>
            Math.abs(piece.x - piece.correctCol * PIECE_SIZE) < SNAP_DISTANCE &&
            Math.abs(piece.y - piece.correctRow * PIECE_SIZE) < SNAP_DISTANCE
        );
        if (allCorrect) {
          setWon(true);
        }
        return prevPieces;
      });
    }, 50);
  };

  useEffect(() => {
    if (draggingId === null) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId, pieces]);

  const handleReset = () => {
    setWon(false);
    initializePuzzle();
  };

  return (
    <Card className="w-full border-4 border-cyan-300 shadow-lg">
      <CardHeader className={`bg-gradient-to-r ${theme.color} text-white rounded-t-lg`}>
        <CardTitle className="text-2xl text-center">{theme.title} - Jigsaw Puzzle</CardTitle>
      </CardHeader>
      <CardContent className="pt-8">
        <p className="text-lg mb-6 text-center text-blue-700 font-semibold">
          Arrastra las piezas para reconstruir la imagen
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex justify-center">
            <div className="bg-gradient-to-b from-sky-100 to-sky-50 p-4 rounded-lg border-4 border-sky-300">
              <canvas
                ref={canvasRef}
                className="border-4 border-blue-400 rounded-lg"
              />
              <p className="text-sm text-center text-gray-600 mt-2">Aquí va la imagen completa</p>
            </div>
          </div>

          <div className="flex-1">
            <div
              ref={containerRef}
              className="relative bg-gradient-to-b from-yellow-100 to-orange-50 rounded-lg border-4 border-dashed border-orange-300 overflow-hidden"
              style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
            >
              {pieces.map(piece => (
                <div
                  key={piece.id}
                  onMouseDown={(e) => handleMouseDown(piece.id, e)}
                  className={`absolute transition-shadow cursor-grab active:cursor-grabbing border-2 flex items-center justify-center font-bold select-none ${
                    draggingId === piece.id
                      ? 'border-yellow-500 shadow-2xl z-50 ring-4 ring-yellow-300'
                      : 'border-gray-300 shadow-md hover:shadow-lg'
                  }`}
                  style={{
                    left: `${piece.x}px`,
                    top: `${piece.y}px`,
                    width: `${PIECE_SIZE}px`,
                    height: `${PIECE_SIZE}px`,
                    backgroundColor:
                      Math.abs(piece.x - piece.correctCol * PIECE_SIZE) < SNAP_DISTANCE &&
                      Math.abs(piece.y - piece.correctRow * PIECE_SIZE) < SNAP_DISTANCE
                        ? '#C7F0D8'
                        : '#FED7AA',
                    backgroundImage: imageLoaded && imageRef.current
                      ? `url('${imageRef.current.src}')`
                      : 'none',
                    backgroundPosition: `${-piece.correctCol * PIECE_SIZE}px ${-piece.correctRow * PIECE_SIZE}px`,
                    backgroundSize: `${GRID_COLS * PIECE_SIZE}px ${GRID_ROWS * PIECE_SIZE}px`,
                    backgroundRepeat: 'no-repeat',
                    opacity: draggingId === piece.id ? 0.9 : 0.85,
                  }}
                >
                  <span className="text-lg font-bold text-white drop-shadow-lg">
                    {piece.id + 1}
                  </span>
                </div>
              ))}

              {won && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <div className="bg-white p-6 rounded-2xl text-center shadow-2xl">
                    <div className="text-5xl mb-3">¡GANASTE!</div>
                    <p className="text-2xl font-bold text-blue-600">¡GANASTE!</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Completaste el puzzle correctamente
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center mt-6">
              <Button
                onClick={handleReset}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg px-8 py-3 rounded-lg shadow-lg"
              >
                Reintentar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function JigsawPuzzleMulti({ themeId = 1 }: JigsawPuzzleMultiProps) {
  return <PuzzleGame themeId={themeId} />;
}
