
import { useRouter } from "next/navigation";
import { topicsData } from "./topicsData";
import Image from "next/image";

export default function CursoPage() {
  const router = useRouter();
  const topics = Object.values(topicsData);

  const openTopic = (id: string) => {
    router.push(`?topic=${id}`);
  };
  return (
    <div className="min-h-screen bg-[#f4f7ff] p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Matemática
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {topics.map((topic) => (
           <div
            key={topic.id}
            onClick={() => openTopic(topic.id)}
            className="rounded-xl overflow-hidden cursor-pointer shadow-lg hover:scale-[1.03] transition"
          >
            <div className="relative h-40 w-full">
              <Image
                src={topic.background}
                alt={topic.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="p-4 text-center bg-white">
              <div className="text-4xl">{topic.icon}</div>
              <p className="font-semibold">{topic.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
