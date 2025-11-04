import React, { useEffect, useState, useRef } from "react";
import Agrupar2 from "@/assets/svg/agrupar_2.svg";

export default function Audiencia({ audiencia }) {
    const [showOverlay, setShowOverlay] = useState(true);
    const playerRef = useRef(null);

    const messageData = [
        <>
            AUDIÊNCIA TEMÁTICA
            <br />
            <b>EIXO UNIVERSO</b>
        </>,
        <>
            AUDIÊNCIA TEMÁTICA
            <br />
            <b>EIXO VIVER SÃO PAULO</b>
        </>,
        <>
            AUDIÊNCIA TEMÁTICA
            <br />
            <b>
                EIXO CIDADE EMPREENDEDORA
                <br /> E CAPITAL DO FUTURO
            </b>
        </>
    ];
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
            <img className="xl:relative xl:bottom-[19rem]" src={Agrupar2} alt="" />
            <div className="h-1 w-full bg-[var(--color-navy)] xl:relative xl:bottom-[19.1rem]"></div>
            <div>
                <div className="bg-[var(--color-cyan-dark)] w-[40rem] h-44 right-[95rem] top-[115rem] rotate-[270deg] absolute flex items-center flex-col justify-end p-4 rounded-br-4xl rounded-bl-4xl shadow-[-4px_2px_20px_0px_gray] z-1">
                    <h1 className="text-white text-7xl px-6 relative left-28 bottom-4">
                        Audiências
                    </h1>
                </div>
            </div>
            <div className="xl:relative xl:bottom-50">
                <div className="flex flex-col items-start justify-center gap-8 p-4 bottom-0 xl:gap-24 xl:flex xl:flex-row xl:items-center xl:flex-nowrap xl:justify-center xl:relative xl:pl-20 xl:bottom-20" style={{ maxWidth: "1427px", height: "auto", margin: "0 auto" }}>
                    <h2 className="text-5xl text-[var(--color-navy)]">
                        "São Paulo quer ouvir você"
                    </h2>
                    <p className="text-3xl text-[var(--color-navy)] xl:w-[85rem]">
                        Veja como foram as audiências públicas realizadas – setoriais e em
                        cada uma das 32 subprefeituras – ao longo do ciclo participativo do
                        PdM 2025-2028.
                    </p>
                </div>
                <div className="flex items-center justify-center flex-col flex-nowrap gap-20 max-sm:relative max-sm:top-40">
                    <span className="w-auto shadow-[0px_0px_12px_grey] p-8 rounded-3xl max-lg:h-auto xl:w-[70rem] xl:h-[40rem]">
                        <div>
                            {showOverlay && (
                                <>
                                    <div
                                        className="bg-[var(--color-cyan-light)] absolute w-44 top-[30rem] px-8 py-2 left-[24.5rem] z-20 text-white rounded-r-3xl cursor-pointer max-xl:top-[122rem] max-xl:left-0 max-md:top-[-8rem] max-md:left-0"
                                        onClick={() => {
                                            setShowOverlay(false);
                                            playerRef.current?.playVideo();
                                        }}
                                    >
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
                    <div
                        className="flex flex-col items-center gap-8 px-8"
                        style={{ maxWidth: "1427px", margin: "0 auto" }}>
                        <div className="w-full flex flex-col items-center gap-8 xl:flex-row xl:items-start xl:justify-center xl:gap-12">
                            {audiencia.lista?.map((link, i) => (
                                <figure
                                    key={i}
                                    className="w-full max-w-[25rem] rounded-3xl p-0 bg-transparent"
                                    style={{ minWidth: 0 }}
                                >
                                    <div className="shadow-[0px_0px_12px_gray] rounded-3xl p-4 overflow-hidden">
                                        <div className="w-full aspect-video rounded-lg overflow-hidden">
                                            <iframe
                                                className="w-full h-full"
                                                src={`${link}?enablejsapi=1`}
                                                title={`Vídeo ${i + 1}`}
                                                frameBorder="0"
                                                allow="autoplay; encrypted-media"
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                    <figcaption className="mt-4 text-[var(--color-navy)] xl:text-base text-sm">
                                        {messageData[i] || null}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="py-8 max-md:relative top-40">
                    <div className="h-1 w-full bg-[var(--color-neutral-400)] mb-8"></div>
                    <div className="flex flex-col flex-wrap items-center justify-center w-auto px-8 py-0 gap-12 max-md:h-[50rem] max-xl:h-auto xl:flex xl:flex-row xl:justify-center xl:items-center xl:py-8 xl:relative xl:top-25">
                        <div className="flex flex-col flex-wrap items-center justify-center w-auto px-8 py-0 h-auto xl:flex xl:flex-row gap-12 xl:items-center xl:flex-nowrap xl:justify-center xl:w-[45rem]">
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
                            className="max-md:z-0 lg:relative z-30 text-7xl shadow-[0px_0px_2px_gray] p-4 rounded-[2.5rem] cursor-pointer"
                        >
                            <i className="fa-brands fa-youtube text-red-600"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
