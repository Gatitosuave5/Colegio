// Shared data for all games with 10 themes

export const THEMES = [
  {
    id: 1,
    title: 'La Mariposa Azul',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beautiful-blue-butterfly-in-magical-meadow-with-fl-vI0CPseysQY4iycxmB4jvDQG7UdFcT.jpg',
    color: 'from-blue-400 to-cyan-400',
    emoji: '🦋',
  },
  {
    id: 2,
    title: 'El León que Perdió su Rugido',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/majestic-golden-lion-in-savanna-u84Vb8qZjzsEcDGY1u5k7uzs6WfvrZ.jpg',
    color: 'from-yellow-400 to-orange-400',
    emoji: '🦁',
  },
  {
    id: 3,
    title: 'La Ciudad de los Colores Perdidos',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/colorful-magical-city-with-rainbow-buildings-TDwY2Ex1UoKBWiqSLpiEUsRFShloi6.jpg',
    color: 'from-purple-400 to-pink-400',
    emoji: '🎨',
  },
  {
    id: 4,
    title: 'El Tren que No Quería Parar',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/magical-train-traveling-through-fantasy-landscape-uJlGGNbwdDDetwbHXCWdXOyvWAyrz8.jpg',
    color: 'from-red-400 to-orange-400',
    emoji: '🚂',
  },
  {
    id: 5,
    title: 'La Isla del Faro Solitario',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lonely-lighthouse-on-island-with-ocean-waves-jmQDWtLpETiA1Croz1MutepmHTdz4f.jpg',
    color: 'from-teal-400 to-blue-400',
    emoji: '🗼',
  },
  {
    id: 6,
    title: 'Las Aventuras del Reino Encantado',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/magical-enchanted-castle-kingdom-with-dragons-m9SJ2yYzIr2OUn6jIrsc7uH6uKJcaY.jpg',
    color: 'from-indigo-400 to-purple-400',
    emoji: '🏰',
  },
  {
    id: 7,
    title: 'El Árbol de los Deseos',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/magical-wishing-tree-with-glowing-lights-RRybQV7wZcb6Okwx8PynxWwTvEg01l.jpg',
    color: 'from-green-400 to-emerald-400',
    emoji: '🌳',
  },
  {
    id: 8,
    title: 'La Mariposa del Bosque Encantado',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-butterfly-in-magical-meadow-with-flowers-and--gsZPTwDb9zcgfHoAQtvJAKOhlUp4PB.jpg',
    color: 'from-cyan-400 to-blue-400',
    emoji: '🌸',
  },
  {
    id: 9,
    title: 'El Dragón Amigable',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/friendly-colorful-dragon-flying-over-mountains-KATcNqplUBiM8QXeaFcUzH7JgosG05.jpg',
    color: 'from-pink-400 to-red-400',
    emoji: '🐉',
  },
  {
    id: 10,
    title: 'El Bosque Mágico',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/enchanted-forest-magical-creatures-Ae9dWgQ4o0fhCLK9H73pR1ZBJ066Pf.png',
    color: 'from-green-400 to-blue-400',
    emoji: '🌲',
  },
];

export type GameMode = 'puzzle' | 'adivinanzas' | 'memoria' | 'ordenamiento';

export interface GameState {
  mode: GameMode | null;
  themeId: number | null;
}
