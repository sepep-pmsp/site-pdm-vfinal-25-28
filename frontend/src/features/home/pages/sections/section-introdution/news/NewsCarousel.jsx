import React, { useEffect, useMemo, useState } from "react";
import { getNewsData } from "../../../../services/getNewsData";

const TEMPO_NOTICIA_DESTAQUE = 11000;
const TEMPO_NOTICIA_PADRAO = 4000;

function getDateTimeBR(data) {
  if (!data) return 0;
  const [dia, mes, ano] = data.split("/");
  return new Date(`${ano}-${mes}-${dia}`).getTime();
}

function ordenarNoticias(newsData) {
  return [...newsData].sort((a, b) => {
    const prioridadeA = a?.prioridade ?? 999;
    const prioridadeB = b?.prioridade ?? 999;
    if (prioridadeA !== prioridadeB) {
      return prioridadeA - prioridadeB;
    }
    return getDateTimeBR(b?.data) - getDateTimeBR(a?.data);
  });
}

export default function NewsCarousel() {
  const [current, setCurrent] = useState(0);
  const [newsList, setNewsList] = useState([]);
  const [progressActive, setProgressActive] = useState(false);
  const currentNews = newsList[current];
  const tempoDeExibicao = useMemo(() => {
    return currentNews?.prioridade === 1
      ? TEMPO_NOTICIA_DESTAQUE
      : TEMPO_NOTICIA_PADRAO;
  }, [currentNews]);

  useEffect(() => {
    let isMounted = true;
    getNewsData()
      .then((newsData = []) => {
        if (!isMounted) return;
        const sortedNews = ordenarNoticias(newsData);
        setNewsList(sortedNews);
        setCurrent(0);
      })
      .catch(console.error);
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (newsList.length === 0) return;
    setProgressActive(false);
    const animationFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setProgressActive(true);
      });
    });
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % newsList.length);
    }, tempoDeExibicao);
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [current, newsList.length, tempoDeExibicao]);

  function handleSelect(index) {
    setCurrent(index);
  }

  function handleNext() {
    setCurrent((prev) => (prev + 1) % newsList.length);
  }

  if (newsList.length === 0) {
    return null;
  }

  return (
    <div className="relative z-10 flex w-full h-15 lg:h-auto bg-white rounded-2xl bottom-5 xl:bottom-12 shadow-[0px_0px_14px_1px_grey] max-w-container">
      <section aria-label="Notícias na mídia" className="!flex flex-row items-center gap-5">
        
        <div className="bg-[var(--color-navy)] h-full px-4 rounded-xl flex items-center justify-center">
          <h2 className="text-center font-extrabold uppercase leading-none text-[var(--color-cyan-medium)] lg:text-3xl lg:!p-8">
            NA MÍDIA
          </h2>
        </div>

        <div className="flex flex-col justify-center gap-2 py-2 lg:w-3xl 2xl:w-7xl">
          <a key={`${current}-${currentNews.titulo}`} href={currentNews.link} target="_blank" rel="noopener noreferrer" className="animate-[fadeIn_450ms_ease] break-words transition hover:opacit underline text-xs w-65 md:w-auto text-[var(--color-navy)] xl:w-full lg:text-xl">
            {currentNews.titulo}
          </a>

          <div className="flex w-full gap-1" aria-label="Selecionar notícia">
            {newsList.map((_, index) => {
              const isActive = index === current;

              return (
                <button key={index} type="button" onClick={() => handleSelect(index)} aria-label={`Ir para notícia ${index + 1}`} aria-current={isActive ? "true" : undefined} className="h-[0.42rem] w-full flex-1 overflow-hidden rounded-full bg-zinc-300 p-0 outline-none transition hover:bg-zin">
                  <span className="block h-full rounded-full bg-[var(--color-navy)]"
                    style={{width: isActive && progressActive ? "100%" : isActive  ? "0%" : "0%",transitionProperty: "width",transitionTimingFunction: "linear",transitionDuration: isActive ? `${tempoDeExibicao}ms` : "0ms",}}/>
                </button>
              );
            })}
          </div>
        </div>
        <button type="button" onClick={handleNext} aria-label="Ir para próxima notícia" className="w-7 h-7 2xl:w-12 2xl:h-12 bg-[var(--color-navy)] text-white rounded-full">
          <span aria-hidden="true"><i class="fa-solid fa-arrow-right"></i></span>
        </button>
      </section>
    </div>
  );
}