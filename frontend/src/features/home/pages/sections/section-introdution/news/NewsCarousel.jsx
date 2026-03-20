import React, { useEffect, useState } from "react";
import { getNewsData } from "../../../../services/getNewsData";
import "@/style/pages/NewsCarousel.css";

export default function NewsCarousel() {
  const [current, setCurrent] = useState(0);
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    getNewsData()
      .then((newsData) => {
        const sorted = newsData.sort((a, b) => {
          if (a.prioridade !== b.prioridade) {
            return a.prioridade - b.prioridade; 
          }
          const [diaA, mesA, anoA] = a.data.split("/");
          const [diaB, mesB, anoB] = b.data.split("/");
          
          return new Date(`${anoB}-${mesB}-${diaB}`) - new Date(`${anoA}-${mesA}-${diaA}`);
        });
        
        setNewsList(sorted);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    if (newsList.length === 0) return;
    const currentNews = newsList[current];
    // Se a prioridade for 1, deixamos 12 segundos (12000ms). Se não, os 4 segundos normais (4000ms).
    const tempoDeExibicao = currentNews?.prioridade === 1 ? 12000 : 4000;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % newsList.length);
    }, tempoDeExibicao);
    return () => clearTimeout(timer);
  }, [current, newsList]); 
  const handleSelect = (index) => {
    setCurrent(index);
  };

  return (
    <div className="flex justify-center flex-nowrap">
      <section className="relative bg-[color:var(--color-white)] shadow-[1px_1px_20px_#00000045] w-full h-32 rounded-[3rem] bottom-16 p-4 z-10 max-w-container">
        <div className="flex flex-row justify-around items-center flex-wrap h-full news_navbar_text">
          <div className="w-auto">
            <h2 className="text-[var(--color-cyan-medium)] text-3xl xl:text-5xl">na<br /> mídia</h2>
          </div>
          <div className="w-9/12 pt-5 flex flex-col items-center h-full news-nabvar-text max-md:relative max-md:-left-10">
            <div className="xl:text-2xl texto-carrosel relative w-full text-sm">
              {newsList.map((newsItem, index) => (
                <a key={index} href={newsItem.link}target="_blank"rel="noopener noreferrer"className={`truncate-link absolute transition-all text-center duration-700 ease-in-out underline roboto-regular ${index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>{newsItem.titulo}</a>
              ))}
              <div className="relative left-[47%] top-[1.6rem] w-80 max-md:w-full news-mobile-carousel">
                {newsList.map((_, index) => (
                  <button key={index} onClick={() => handleSelect(index)} className={`m-1_2 w-2 h-2 rounded-full ${index === current ? "bg-black" : "bg-gray-400" } focus:outline-none`}aria-label={`Ir para notícia ${index + 1}`}></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}