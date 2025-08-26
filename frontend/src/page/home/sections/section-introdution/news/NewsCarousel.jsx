import React, { useEffect, useState } from "react";
import { getNewsData } from "@/services/home/getNewsData";

export default function NewsCarousel() {
const [current, setCurrent] = useState(0);
const [news, setNews] = useState([]);

useEffect(() => {
    getNewsData()
        .then((newsData) => {
            const sorted = newsData.sort((a, b) => {
                if (a.priority !== b.priority) {
                    return a.priority === 1 ? -1 : 1;
                }
                return new Date(b.date) - new Date(a.date);
            });
            setNews(sorted);
        })
        .catch(console.error);
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % news.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [news.length]);

  const handleSelect = (index) => {
    setCurrent(index);
  };

return (
    <div className="flex justify-center flex-nowrap">
        <section className="relative bg-[color:var(--color-white)] shadow-[1px_1px_20px_#00000045] w-[100rem] h-32 rounded-[3rem] bottom-16 p-4 z-10">
            <div className="flex flex-row justify-center items-center flex-nowrap h-full">
                <div>
                    <h2 className="text-[var(--color-cyan-medium)] text-5xl">na mídia</h2>
                </div>
                <div className="w-[69%] flex flex-col justify-center items-center gap-8 h-full">
                    <div className="text-2xl texto-carrosel relative w-full left-36 top-[0.6rem]">
                        {news.map((news, index) => (
                            <a
                                key={index}
                                href={news.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`absolute transition-all duration-700 ease-in-out underline roboto-regular ${
                                    index === current
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-2 pointer-events-none"
                                }`}
                            >
                                {news.titulo}
                            </a>
                        ))}
                    </div>
                    <div className="relative top-[0.9rem]">
                        {news.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelect(index)}
                                className={`m-1_2 w-2 h-2 rounded-full ${
                                    index === current ? "bg-black" : "bg-gray-400"
                                } focus:outline-none`}
                                aria-label={`Ir para notícia ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </div>
);
}
