"use client";
// Juegos: Tetris y Pong (Ping Pong retro de Atari) - Todo en un archivo
import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button'; 
import { ArrowLeft } from 'lucide-react';

type GameScreen = 'menu' | 'tetris' | 'pong';

// Tetris types
type TetrisGrid = (string | null)[][];
type Position = { x: number; y: number };

interface Tetromino {
  shape: number[][];
  color: string;
}

const TETROMINOES: Record<string, Tetromino> = {
  I: { shape: [[1, 1, 1, 1]], color: '#00f0f0' },
  O: { shape: [[1, 1], [1, 1]], color: '#f0f000' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a000f0' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#00f000' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#f00000' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#0000f0' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f0a000' },
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 30;

// Pong constants
const PONG_WIDTH = 600;
const PONG_HEIGHT = 400;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 10;
const INITIAL_BALL_SPEED = 2;

export default function RetroGames({
    salon_codigo,
    nombreAlumno,
    onBack,
  }: {
    salon_codigo: string;
    nombreAlumno: string;
    onBack: () => void;
  }) {

    useEffect(() => {
        // Empuja un estado vacío para que haya historial dentro del módulo
        history.pushState(null, "", window.location.href);
      
        const handlePop = (e: PopStateEvent) => {
          e.preventDefault();
          onBack(); // <- vuelve al salón sin recargar
        };
      
        window.addEventListener("popstate", handlePop);
      
        return () => {
          window.removeEventListener("popstate", handlePop);
        };
      }, []);
      
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');

  // Tetris state
  const [tetrisGrid, setTetrisGrid] = useState<TetrisGrid>(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null))
  );
  const [currentPiece, setCurrentPiece] = useState<Tetromino | null>(null);
  const [currentPos, setCurrentPos] = useState<Position>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const tetrisCanvasRef = useRef<HTMLCanvasElement>(null);
  const tetrisLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Pong state
  const [pongScore, setPongScore] = useState(0);
  const [pongGameOver, setPongGameOver] = useState(false);
  const [playerPaddleY, setPlayerPaddleY] = useState(PONG_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [computerPaddleY, setComputerPaddleY] = useState(PONG_HEIGHT / 2 - PADDLE_HEIGHT / 2);
  const [ballPos, setBallPos] = useState({ x: PONG_WIDTH / 2, y: PONG_HEIGHT / 2 });
  const [ballVel, setBallVel] = useState({ x: INITIAL_BALL_SPEED, y: INITIAL_BALL_SPEED });
  const [ballSpeed, setBallSpeed] = useState(INITIAL_BALL_SPEED);
  const pongCanvasRef = useRef<HTMLCanvasElement>(null);
  const pongAnimationRef = useRef<number | null>(null);
  const keysPressed = useRef<Set<string>>(new Set());

  // Tetris functions
  const getRandomTetromino = (): Tetromino => {
    const keys = Object.keys(TETROMINOES);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return TETROMINOES[randomKey];
  };

  const rotatePiece = (piece: number[][]): number[][] => {
    const rows = piece.length;
    const cols = piece[0].length;
    const rotated: number[][] = [];
    
    for (let i = 0; i < cols; i++) {
      rotated[i] = [];
      for (let j = rows - 1; j >= 0; j--) {
        rotated[i][rows - 1 - j] = piece[j][i];
      }
    }
    return rotated;
  };

  const checkCollision = useCallback((piece: Tetromino, pos: Position, grid: TetrisGrid): boolean => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;

          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return true;
          }

          if (newY >= 0 && grid[newY][newX] !== null) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  const mergePieceToGrid = useCallback((piece: Tetromino, pos: Position, grid: TetrisGrid): TetrisGrid => {
    const newGrid = grid.map(row => [...row]);
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const gridY = pos.y + y;
          const gridX = pos.x + x;
          if (gridY >= 0 && gridY < BOARD_HEIGHT && gridX >= 0 && gridX < BOARD_WIDTH) {
            newGrid[gridY][gridX] = piece.color;
          }
        }
      }
    }
    return newGrid;
  }, []);

  const clearLines = useCallback((grid: TetrisGrid): { newGrid: TetrisGrid; linesCleared: number } => {
    let linesCleared = 0;
    const newGrid = grid.filter(row => {
      const isFull = row.every(cell => cell !== null);
      if (isFull) {
        linesCleared++;
        return false;
      }
      return true;
    });

    while (newGrid.length < BOARD_HEIGHT) {
      newGrid.unshift(Array(BOARD_WIDTH).fill(null));
    }

    return { newGrid, linesCleared };
  }, []);

  const spawnNewPiece = useCallback(() => {
    const piece = getRandomTetromino();
    const startX = Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2);
    const startPos = { x: startX, y: 0 };

    if (checkCollision(piece, startPos, tetrisGrid)) {
      setGameOver(true);
      if (tetrisLoopRef.current) {
        clearInterval(tetrisLoopRef.current);
        tetrisLoopRef.current = null;
      }
      return;
    }

    setCurrentPiece(piece);
    setCurrentPos(startPos);
  }, [tetrisGrid, checkCollision]);

  const movePieceDown = useCallback(() => {
    if (!currentPiece || gameOver) return;

    const newPos = { x: currentPos.x, y: currentPos.y + 1 };

    if (checkCollision(currentPiece, newPos, tetrisGrid)) {
      const mergedGrid = mergePieceToGrid(currentPiece, currentPos, tetrisGrid);
      const { newGrid, linesCleared } = clearLines(mergedGrid);
      
      setTetrisGrid(newGrid);
      setScore(prev => prev + linesCleared * 100);
      setCurrentPiece(null);
      
      setTimeout(() => spawnNewPiece(), 100);
    } else {
      setCurrentPos(newPos);
    }
  }, [currentPiece, currentPos, tetrisGrid, gameOver, checkCollision, mergePieceToGrid, clearLines, spawnNewPiece]);

  const movePiece = useCallback((dx: number) => {
    if (!currentPiece || gameOver) return;

    const newPos = { x: currentPos.x + dx, y: currentPos.y };
    if (!checkCollision(currentPiece, newPos, tetrisGrid)) {
      setCurrentPos(newPos);
    }
  }, [currentPiece, currentPos, tetrisGrid, gameOver, checkCollision]);

  const rotatePieceAction = useCallback(() => {
    if (!currentPiece || gameOver) return;

    const rotated = { ...currentPiece, shape: rotatePiece(currentPiece.shape) };
    if (!checkCollision(rotated, currentPos, tetrisGrid)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, currentPos, tetrisGrid, gameOver, checkCollision]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || gameOver) return;

    let newY = currentPos.y;
    while (!checkCollision(currentPiece, { x: currentPos.x, y: newY + 1 }, tetrisGrid)) {
      newY++;
    }

    const mergedGrid = mergePieceToGrid(currentPiece, { x: currentPos.x, y: newY }, tetrisGrid);
    const { newGrid, linesCleared } = clearLines(mergedGrid);
    
    setTetrisGrid(newGrid);
    setScore(prev => prev + linesCleared * 100);
    setCurrentPiece(null);
    
    setTimeout(() => spawnNewPiece(), 100);
  }, [currentPiece, currentPos, tetrisGrid, gameOver, checkCollision, mergePieceToGrid, clearLines, spawnNewPiece]);

  const drawTetris = useCallback(() => {
    const canvas = tetrisCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    tetrisGrid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          ctx.fillStyle = cell;
          ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          ctx.strokeStyle = '#000';
          ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        }
      });
    });

    if (currentPiece) {
      ctx.fillStyle = currentPiece.color;
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const drawX = (currentPos.x + x) * BLOCK_SIZE;
            const drawY = (currentPos.y + y) * BLOCK_SIZE;
            ctx.fillRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE);
            ctx.strokeStyle = '#000';
            ctx.strokeRect(drawX, drawY, BLOCK_SIZE, BLOCK_SIZE);
          }
        });
      });
    }

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= BOARD_WIDTH; i++) {
      ctx.beginPath();
      ctx.moveTo(i * BLOCK_SIZE, 0);
      ctx.lineTo(i * BLOCK_SIZE, BOARD_HEIGHT * BLOCK_SIZE);
      ctx.stroke();
    }
    for (let i = 0; i <= BOARD_HEIGHT; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * BLOCK_SIZE);
      ctx.lineTo(BOARD_WIDTH * BLOCK_SIZE, i * BLOCK_SIZE);
      ctx.stroke();
    }
  }, [tetrisGrid, currentPiece, currentPos]);

  // Pong game loop with refs to avoid stale closures
  const ballVelRef = useRef(ballVel);
  const playerPaddleYRef = useRef(playerPaddleY);
  const computerPaddleYRef = useRef(computerPaddleY);

  useEffect(() => {
    ballVelRef.current = ballVel;
  }, [ballVel]);

  useEffect(() => {
    playerPaddleYRef.current = playerPaddleY;
  }, [playerPaddleY]);

  useEffect(() => {
    computerPaddleYRef.current = computerPaddleY;
  }, [computerPaddleY]);

  const updatePong = useCallback(() => {
    if (pongGameOver) return;

    // Player paddle movement
    if (keysPressed.current.has('ArrowUp')) {
      setPlayerPaddleY(prev => Math.max(0, prev - 3.1));
    }
    if (keysPressed.current.has('ArrowDown')) {
      setPlayerPaddleY(prev => Math.min(PONG_HEIGHT - PADDLE_HEIGHT, prev + 3.3));
    }

    setBallPos(prev => {
      const currentVel = ballVelRef.current;
      let newX = prev.x + currentVel.x;
      let newY = prev.y + currentVel.y;
      let newVelX = currentVel.x;
      let newVelY = currentVel.y;

      // Top/bottom collision
      if (newY <= 0 || newY >= PONG_HEIGHT - BALL_SIZE) {
        newVelY = -newVelY;
        newY = newY <= 0 ? 0 : PONG_HEIGHT - BALL_SIZE;
      }

      // Player paddle collision (left side)
      if (newX <= PADDLE_WIDTH && 
          prev.x > PADDLE_WIDTH &&
          newY + BALL_SIZE >= playerPaddleYRef.current && 
          newY <= playerPaddleYRef.current + PADDLE_HEIGHT) {
        newVelX = Math.abs(newVelX);
        newX = PADDLE_WIDTH;
        setPongScore(s => s + 1);
        
        // Increase speed
        const newSpeed = Math.abs(newVelX) + 0.1;
        newVelX = newSpeed;
        newVelY = newVelY > 0 ? newSpeed : -newSpeed;
        setBallSpeed(newSpeed);
      }

      // Computer paddle collision (right side)
      if (newX + BALL_SIZE >= PONG_WIDTH - PADDLE_WIDTH && 
          prev.x + BALL_SIZE < PONG_WIDTH - PADDLE_WIDTH &&
          newY + BALL_SIZE >= computerPaddleYRef.current && 
          newY <= computerPaddleYRef.current + PADDLE_HEIGHT) {
        newVelX = -Math.abs(newVelX);
        newX = PONG_WIDTH - PADDLE_WIDTH - BALL_SIZE;
      }

      // Ball out of bounds on left (game over)
      if (newX < 0) {
        setPongGameOver(true);
        return prev;
      }

      // Ball out on right (computer missed - reset ball)
      if (newX + BALL_SIZE > PONG_WIDTH) {
        return {
          x: PONG_WIDTH / 2,
          y: PONG_HEIGHT / 2
        };
      }

      setBallVel({ x: newVelX, y: newVelY });
      return { x: newX, y: newY };
    });

    // AI paddle movement
    setBallPos(currentBall => {
      setComputerPaddleY(prev => {
        const paddleCenter = prev + PADDLE_HEIGHT / 2;
        const ballCenter = currentBall.y + BALL_SIZE / 2;
        const diff = ballCenter - paddleCenter;
        
        if (Math.abs(diff) < 2) return prev;
        
        const speed = 3;
        let newY = prev + (diff > 0 ? speed : -speed);
        newY = Math.max(0, Math.min(PONG_HEIGHT - PADDLE_HEIGHT, newY));
        return newY;
      });
      return currentBall;
    });
  }, [pongGameOver]);

  const drawPong = useCallback(() => {
    const canvas = pongCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, PONG_WIDTH, PONG_HEIGHT);

    // Center line
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(PONG_WIDTH / 2, 0);
    ctx.lineTo(PONG_WIDTH / 2, PONG_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Player paddle (left)
    ctx.fillStyle = '#0ff';
    ctx.fillRect(0, playerPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Computer paddle (right)
    ctx.fillStyle = '#f0f';
    ctx.fillRect(PONG_WIDTH - PADDLE_WIDTH, computerPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Ball
    ctx.fillStyle = '#fff';
    ctx.fillRect(ballPos.x, ballPos.y, BALL_SIZE, BALL_SIZE);
  }, [playerPaddleY, computerPaddleY, ballPos]);

  useEffect(() => {
    if (currentScreen === 'pong' && !pongGameOver) {
      const gameLoop = () => {
        updatePong();
        drawPong();
        pongAnimationRef.current = requestAnimationFrame(gameLoop);
      };
  
      // ✅ En lugar de llamar gameLoop() directo:
      pongAnimationRef.current = requestAnimationFrame(gameLoop);
  
      return () => {
        if (pongAnimationRef.current) {
          cancelAnimationFrame(pongAnimationRef.current);
          pongAnimationRef.current = null;
        }
      };
    }
  }, [currentScreen, pongGameOver, updatePong, drawPong]);

  useEffect(() => {
    if (currentScreen === 'tetris') {
      drawTetris();
    }
  }, [currentScreen, tetrisGrid, currentPiece, currentPos, drawTetris]);

  useEffect(() => {
    if (currentScreen === 'tetris' && !currentPiece && !gameOver) {
      spawnNewPiece();
    }
  }, [currentScreen, currentPiece, gameOver, spawnNewPiece]);

  useEffect(() => {
    if (currentScreen === 'tetris' && !gameOver) {
      tetrisLoopRef.current = setInterval(() => {
        movePieceDown();
      }, 800);

      return () => {
        if (tetrisLoopRef.current) {
          clearInterval(tetrisLoopRef.current);
          tetrisLoopRef.current = null;
        }
      };
    }
  }, [currentScreen, gameOver, movePieceDown]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentScreen === 'pong') {
        keysPressed.current.add(e.key);
      } else if (currentScreen === 'tetris' && !gameOver) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            movePiece(-1);
            break;
          case 'ArrowRight':
            e.preventDefault();
            movePiece(1);
            break;
          case 'ArrowDown':
            e.preventDefault();
            movePieceDown();
            break;
          case 'ArrowUp':
            e.preventDefault();
            rotatePieceAction();
            break;
          case ' ':
            e.preventDefault();
            hardDrop();
            break;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentScreen, gameOver, movePiece, movePieceDown, rotatePieceAction, hardDrop]);

  const startTetris = () => {
    setCurrentScreen('tetris');
    setTetrisGrid(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)));
    setCurrentPiece(null);
    setScore(0);
    setGameOver(false);
  };

  const startPong = () => {
    setCurrentScreen('pong');
    setPongScore(0);
    setPongGameOver(false);
    setPlayerPaddleY(PONG_HEIGHT / 2 - PADDLE_HEIGHT / 2);
    setComputerPaddleY(PONG_HEIGHT / 2 - PADDLE_HEIGHT / 2);
    setBallPos({ x: PONG_WIDTH / 2, y: PONG_HEIGHT / 2 });
    setBallVel({ x: INITIAL_BALL_SPEED, y: INITIAL_BALL_SPEED });
    setBallSpeed(INITIAL_BALL_SPEED);
  };

  const backToMenu = () => {
    setCurrentScreen('menu');
    if (tetrisLoopRef.current) {
      clearInterval(tetrisLoopRef.current);
      tetrisLoopRef.current = null;
    }
    if (pongAnimationRef.current) {
      cancelAnimationFrame(pongAnimationRef.current);
      pongAnimationRef.current = null;
    }
    keysPressed.current.clear();
  };

  return (
    <div
  className="min-h-screen p-8 flex items-center justify-center bg-cover bg-center relative overflow-hidden"
  style={{ backgroundImage: "url('https://previews.123rf.com/images/graphicsview/graphicsview2209/graphicsview220900239/192286466-cute-children-playing-in-the-garden-sky-scene-wallpaper-background-for-3d-living-room-bedroom-tv-3d.jpg')" }}
>
      {/* Animated decorations */}
      
      <div className="absolute top-10 left-10 animate-bounce">
        <div className="text-6xl">🎈</div>
      </div>
      <div className="absolute top-20 right-20 animate-pulse">
        <div className="text-6xl">🌟</div>
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce delay-100">
        <div className="text-6xl">🎈</div>
      </div>
      <div className="absolute bottom-10 right-10 animate-pulse delay-200">
        <div className="text-6xl">⭐</div>
      </div>
      <div className="absolute top-1/2 left-5 animate-bounce delay-300">
        <div className="text-5xl">🎈</div>
      </div>
      <div className="absolute top-1/3 right-5 animate-pulse delay-500">
        <div className="text-5xl">⭐</div>
      </div>
      <div className="absolute bottom-1/3 left-16 animate-bounce delay-700">
        <div className="text-5xl">🎈</div>
      </div>
      <div className="absolute top-2/3 right-16 animate-pulse delay-1000">
        <div className="text-5xl">🌟</div>
      </div>

      {currentScreen === 'menu' && (
        
        <div className="z-10 w-full max-w-4xl">
            
          <div className="text-center mb-8">
          <button
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    onBack();
                }}
                className="fixed top-4 left-4 z-50 bg-white text-purple-700 p-3 rounded-full shadow-lg hover:bg-purple-100 transition"
                title="Regresar"
                >
                <ArrowLeft className="w-6 h-6" />
                </button>

            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Juegos Retro Clásicos
            </h1>
            <p className="text-xl text-gray-700">Elige tu juego favorito</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90 backdrop-blur">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 mb-6 flex items-center justify-center">
                  <div className="text-white text-6xl">🎮</div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Tetris</h2>
                <p className="text-gray-600 mb-4">El clásico juego de bloques</p>
                <div className="space-y-2 mb-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Pensamiento estratégico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Coordinación espacial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Reflexos rápidos</span>
                  </div>
                </div>
                <Button 
                  onClick={startTetris}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-6 text-lg rounded-xl"
                >
                  Jugar Tetris →
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90 backdrop-blur">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-8 mb-6 flex items-center justify-center">
                  <div className="text-white text-6xl">🏓</div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Pong</h2>
                <p className="text-gray-600 mb-4">Ping pong retro </p>
                <div className="space-y-2 mb-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Dificultad progresiva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Velocidad aumenta con el tiempo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Reflexos y precisión</span>
                  </div>
                </div>
                <Button 
                  onClick={startPong}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-6 text-lg rounded-xl"
                >
                  Jugar Pong →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {currentScreen === 'tetris' && (
        <Card className="w-full max-w-md z-10 bg-white/95 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Tetris</CardTitle>
              <div className="text-xl font-bold text-purple-600">Puntos: {score}</div>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <canvas
              ref={tetrisCanvasRef}
              width={BOARD_WIDTH * BLOCK_SIZE}
              height={BOARD_HEIGHT * BLOCK_SIZE}
              className="border-4 border-purple-500 rounded-lg bg-gray-900 shadow-xl"
            />
            
            {gameOver && (
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">¡Game Over!</div>
                <div className="text-lg mb-4">Puntos finales: {score}</div>
                <Button onClick={startTetris} className="bg-gradient-to-r from-purple-500 to-pink-500">
                  Jugar de nuevo
                </Button>
              </div>
            )}

            {!gameOver && (
              <div className="text-sm text-gray-600 text-center bg-purple-50 p-3 rounded-lg">
                <p className="font-medium">← → Mover | ↑ Rotar | ↓ Bajar | Espacio: Drop</p>
              </div>
            )}

            <Button variant="outline" onClick={backToMenu} className="mt-2 w-full">
              ← Volver al Menú
            </Button>
          </CardContent>
        </Card>
      )}

      {currentScreen === 'pong' && (
        <Card className="w-full max-w-2xl z-10 bg-white/95 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-black">Pong - Retro Atari</CardTitle>
              <div className="text-xl font-bold text-cyan-600">Puntos: {pongScore}</div>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center gap-4">
            <canvas
              ref={pongCanvasRef}
              width={PONG_WIDTH}
              height={PONG_HEIGHT}
              className="border-4 border-cyan-500 rounded-lg shadow-2xl"
            />

            {pongGameOver && (
              <div className="text-center bg-red-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-red-600 mb-3">¡Game Over!</div>
                <div className="text-lg mb-2">Puntos finales: {pongScore}</div>
                <div className="text-sm text-gray-600 mb-4">
                  La velocidad era: {ballSpeed.toFixed(1)}x
                </div>
                <Button onClick={startPong} className="bg-gradient-to-r from-cyan-500 to-blue-500">
                  Jugar de nuevo
                </Button>
              </div>
            )}

            {!pongGameOver && (
              <div className="text-sm text-gray-600 text-center bg-cyan-50 p-3 rounded-lg">
                <p className="font-medium">↑ ↓ Mover paleta | La velocidad aumenta cada punto</p>
                
              </div>
            )}

            <Button variant="outline" onClick={backToMenu} className="mt-2 w-full">
              ← Volver al Menú
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}



