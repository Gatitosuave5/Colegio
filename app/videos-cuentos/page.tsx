'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Play, X, ArrowLeft } from 'lucide-react';


interface Story {
  id: string;
  title: string;
  videoId: string;
  synopsis: string;
  thumbnail: string;
}
export default function ClientPageCuentos({
    salon_codigo,
    nombreAlumno,
    onBack,
  }: {
    salon_codigo: string;
    nombreAlumno: string;
    onBack: () => void;
  }) {
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  
    useEffect(() => {
        history.pushState(null, "", window.location.href);
      
        const handlePop = () => onBack();
      
        window.addEventListener("popstate", handlePop);
        return () => window.removeEventListener("popstate", handlePop);
      }, []);
  


const stories: Story[] = [
  {
    id: '1',
    title: 'El Conejo Berrinchudo',
    videoId: 'euo8Ao0KWQo',
    synopsis: 'En un bosque encantado vivía un conejito llamado Benji. Benji era conocido por ser muy tierno, pero también por sus berrinches. Si algo no salía como él quería, pataleaba y lloraba hasta que todos le prestaban atención.',
    thumbnail: `https://img.youtube.com/vi/euo8Ao0KWQo/maxresdefault.jpg`,
  },
  {
    id: '2',
    title: 'La Ardilla Criticona',
    videoId: 'cdko3O5C6M4',
    synopsis: 'En lo alto de un viejo roble del Bosque Saltarín vivía una pequeña ardilla llamada Lila. Era ágil, simpática… ¡y muy criticona!',
    thumbnail: `https://img.youtube.com/vi/cdko3O5C6M4/maxresdefault.jpg`,
  },
  {
    id: '3',
    title: 'Aprende a Escuchar',
    videoId: '9rIwFS1EIJY',
    synopsis: 'En el bosque de las ramas vivía una familia de monitos muy traviesos y alegres. Entre todos, había uno que destacaba por ser el más curioso y pegado a la televisión: Chispas.',
    thumbnail: `https://img.youtube.com/vi/9rIwFS1EIJY/maxresdefault.jpg`,
  },
  {
    id: '4',
    title: 'El Zorrito Demorón',
    videoId: 'paSi4FzGAGk',
    synopsis: 'Había una vez en el Bosque un pequeño zorrito llamado Bruno… ¡pero todos le decían “Demorón”! ¿Por qué? Porque para TODO llegaba tarde.',
    thumbnail: `https://img.youtube.com/vi/paSi4FzGAGk/maxresdefault.jpg`,
  },
  {
    id: '5',
    title: 'La Ranita Imprudente',
    videoId: 'ut1Y2SeMDzM',
    synopsis: 'En un charquito escondido entre los árboles, vivía Rina, una ranita pequeña, verde y muy traviesa. Pero Rina tenía un gran problema… ¡hacía todo sin pensar!',
    thumbnail: `https://img.youtube.com/vi/ut1Y2SeMDzM/maxresdefault.jpg`,
  },
  {
    id: '6',
    title: 'No Toques Eso',
    videoId: 'b2vC8zYZj1o',
    synopsis: 'En lo alto de la selva, donde las lianas bailan con el viento, vivía Mauro, un monito muy simpático… y muy curioso. Tenía los ojos brillantes, las manos inquietas y la frase favorita: ¿Y si lo toco?',
    thumbnail: `https://img.youtube.com/vi/b2vC8zYZj1o/maxresdefault.jpg`,
  },
  {
    id: '7',
    title: 'El Ratoncito Que No Sabía Saludar',
    videoId: 'g3pj7bhjXsA',
    synopsis: 'En una esquina tranquila del bosque vivía un pequeño ratoncito llamado Remi. Era simpático, curioso y siempre andaba de prisa… pero había algo que no sabía hacer: saludar.',
    thumbnail: `https://img.youtube.com/vi/g3pj7bhjXsA/maxresdefault.jpg`,
  },
  {
    id: '8',
    title: 'El Búho Sabelotodo',
    videoId: 'FtPeKbWX5gE',
    synopsis: 'En lo alto del gran roble del Bosque Susurrante vivía Bubo, un pequeño búho que decía saberlo todo. Si alguien no entendía algo, ahí estaba Bubo para dar la respuesta… pero siempre acompañado de una risita burlona.',
    thumbnail: `https://img.youtube.com/vi/FtPeKbWX5gE/maxresdefault.jpg`,
  },
  {
    id: '9',
    title: 'Donny y la fábrica de hechizos',
    videoId: 'AywiTqq3B90',
    synopsis: 'El hijo de un constructor sueña con ser mago. Con ese objetivo en mente, consigue un trabajo en una fábrica de hechizos. Sin embargo, la situación se le escapa de las manos...',
    thumbnail: `https://img.youtube.com/vi/AywiTqq3B90/maxresdefault.jpg`,
  },
  {
    id: '10',
    title: 'La Ardilla Bromista',
    videoId: 'rjqzsVAcICA',
    synopsis: 'Bruno, una ardilla traviesa, adoraba hacer bromas a sus amigos. Su bromita favorita era esconder cosas, y aunque a él le parecía gracioso, sus amigos no estaban tan contentos.',
    thumbnail: `https://img.youtube.com/vi/rjqzsVAcICA/maxresdefault.jpg`,
  },
  {
    id: '11',
    title: '¡Problemas de Minero! ',
    videoId: 'm66a820YwYo',
    synopsis: 'Un rompemuros atormentado conoce nuevos amigos, mientras tanto los Mineros están atrapados bajo una épica avalancha que ellos mismos han causado, y un diminuto Gigante mira a la vida desde una nueva perspectiva.',
    thumbnail: `https://img.youtube.com/vi/m66a820YwYo/maxresdefault.jpg`,
  },
  {
    id: '12',
    title: 'El Gato Salvaje Y La Princesa Ratón',
    videoId: 'aiNautZ39eY',
    synopsis: 'Después de un ataque sorpresa a la Princesa ratón, la ingeniosa familia de ratones pone en marcha un plan para mantenerse a salvo de Milo, un gato gordito y salvaje que los acecha por la casa. ',
    thumbnail: `https://img.youtube.com/vi/aiNautZ39eY/maxresdefault.jpg`,
  },
];


 

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <button
  onClick={() => window.history.back()}
  className="fixed top-4 left-4 z-50 bg-white text-purple-700 p-3 rounded-full shadow-lg hover:bg-purple-100 transition"
  title="Regresar"
>
  <ArrowLeft className="w-6 h-6" />
</button>
      <div className="container mx-auto px-4 py-8">
        
        <div className="mb-8 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 p-8">
            
          <h1 className="text-4xl font-bold text-white flex items-center gap-3 justify-center">
            
            <BookOpen className="w-10 h-10" />
            Videos Cuento
          </h1>
          <p className="text-center text-purple-100 text-lg mt-2">
            Descubre maravillosas historias para toda la familia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl hover:scale-105 duration-300 group"
              onClick={() => setSelectedStory(story)}
            >
              <div className="relative">
                <img
                  src={story.thumbnail}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-xl mb-1">{story.title}</h3>
                  <span className="inline-block bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Cuento
                  </span>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-4">
                    <Play className="w-8 h-8 text-purple-600 fill-purple-600" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 line-clamp-3">{story.synopsis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedStory && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                {selectedStory.title}
              </h2>
              
              <div className="aspect-video w-full mb-4">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedStory.videoId}`}
                  title={selectedStory.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
              
              <p className="text-base text-gray-700 leading-relaxed">
                {selectedStory.synopsis}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

 