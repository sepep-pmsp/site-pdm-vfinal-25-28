import React, { useEffect, useState, useRef } from "react";
import Agrupar2 from "@/assets/svg/agrupar_2.svg";

// CORREÇÃO: Recebe 'audiencia' como uma prop
export default function Audiencia({ audiencia }) {
  const [showOverlay, setShowOverlay] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!audiencia) return;
    if (
      !document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      )
    ) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player-destaque", {
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setShowOverlay(false);
            }
          }
        }
      });
    };
  }, [audiencia]);
  if (!audiencia) return <div>Carregando...</div>;

  return (
    <div>
      <img className="relative bottom-[19rem]" src={Agrupar2} alt="" />
      <div className="h-1 w-full bg-[var(--color-navy)] relative bottom-[19.1rem]"></div>
      <div>
        <div className="bg-[var(--color-cyan-dark)] w-[40rem] h-44 right-[95rem] top-[115rem] rotate-[270deg] absolute flex items-center flex-col justify-end p-4 rounded-br-4xl rounded-bl-4xl shadow-[-4px_2px_20px_0px_gray] z-1">
          <h1 className="text-white text-7xl px-6 relative left-28 bottom-4">
            Audiencias
          </h1>
        </div>
      </div>
      <div className="mx-34">
        <div className="gap-24 flex items-center justify-center relative pl-20 bottom-28">
          {/* O texto do subtítulo e parágrafo poderia vir da API, se houver */}
          <h2 className="text-5xl text-[var(--color-navy)]">
            Veja informações sobre as devolutivas.
          </h2>
          <p className="text-3xl text-[var(--color-navy)]">
            O PdM é composto por um conjunto de compromissos organizados em
            quatro eixos estratégicos. Essa divisão ajuda a dar forma à
            complexidade do plano e orientar o olhar de quem lê.
          </p>
        </div>
        <div className="flex items-center justify-center flex-col flex-nowrap gap-20">
          <span className="w-[70rem] h-[40rem] shadow-[0px_0px_12px_grey] p-8 rounded-3xl">
            <div>
              {showOverlay && (
                <>
                  <div
                    className="bg-[var(--color-cyan-light)] absolute w-44 top-[145rem] px-8 py-2 left-[24.9rem] z-20 text-white rounded-r-3xl cursor-pointer"
                    onClick={() => {
                      setShowOverlay(false);
                      playerRef.current?.playVideo();
                    }}
                  >
                    <div></div>
                    Audiência Geral <br /> 25/04/2025
                  </div>
                </>
              )}
            </div>

            <iframe
              className="w-full h-full rounded-3xl"
              id="yt-player-destaque"
              src={`${audiencia.destaque}?enablejsapi=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </span>
          <div className="flex flex-row items-center justify-center gap-20">
            {audiencia.lista?.map((link, i) => (
              <span
                key={i}
                className="shadow-[0px_0px_12px_grey] p-8 rounded-3xl w-[30rem] h-80"
              >
                <iframe
                  key={i}
                  className="w-full h-full rounded-lg"
                  src={`${link}?enablejsapi=1`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </span>
            ))}
          </div>
        </div>
        <div className="py-8">
          <div className="h-1 w-full bg-[var(--color-neutral-400)]"></div>
          <div className="gap-12 flex flex-row flex-nowrap items-center justify-center py-8">
            <div className="flex gap-12 items-center justify-center w-[45rem]">
              <h3 className="text-4xl text-[var(--color-navy)]">SAIBA MAIS:</h3>
              <h2 className="text-5xl text-[var(--color-navy)]">
                Confira todas as Audiências Públicas desse PdM no nosso canal do
                Youtube.
              </h2>
            </div>
            <a
              href={audiencia.botao}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-30 text-7xl shadow-[0px_0px_2px_gray] p-4 rounded-[2.5rem] cursor-pointer"
            >
              <i className="fa-brands fa-youtube text-red-600"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}