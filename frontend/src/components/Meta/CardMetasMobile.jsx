import React, { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { corrigirUrlImagem } from "@/utils/imageUtils";
import SafeSVG from "../SafeSVG/SafeSVG";

export default function CardMetas({ meta, onClose }) {
    const [visible, setVisible] = useState(true);
    const [closing, setClosing] = useState(false);
    const contentRef = useRef(null);
    const [needsScroll, setNeedsScroll] = useState(false);
    const isMobile = useIsMobile(768);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const calculateScroll = () => {
            if (contentRef.current) {
                setNeedsScroll(contentRef.current.scrollHeight > window.innerHeight);
            }
        };
        calculateScroll();
        window.addEventListener("resize", calculateScroll);
        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("resize", calculateScroll);
        };
    }, []);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setVisible(false);
            onClose();
        }, 400);
    };

    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    if (!visible || !meta?.listing || !meta?.card) return null;

    const tituloHtml = meta.listing.titulo || "";
    const regex = /<strong>(.*?)<\/strong>(.*)/;
    const match = tituloHtml.match(regex);
    const strongText = match ? match[1] : tituloHtml;
    const normalText = match ? match[2] : "";
    const scrollClass = needsScroll ? "overflow-y-auto" : "";

    return (
        <div
            className="bg-white fixed inset-0 flex items-start md:items-center justify-center z-50 md:p-0"
            onClick={handleClose}
        >
            <div
                ref={contentRef}
                className={`relative flex flex-col h-screen md:h-auto w-full md:w-[60rem] lg:w-[80rem] xl:w-[90rem] 
        shadow-lg transition-all ${closing ? "slide-out-bottom" : "animate-slide-up"
                    } ${scrollClass} 
        md:rounded-3xl overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
                style={{
                    scrollbarColor: `${meta.card.eixo_cor_principal} transparent`,
                    height: isMobile ? "100vh" : "auto"
                }}
            >
                {/* Número gigante no fundo (visível apenas em desktop) */}
                <div
                    className="md:block absolute font-bebas-bold select-none pointer-events-none"
                    style={{
                        fontSize: "22rem",
                        bottom: "19rem",
                        left: 0,
                        zIndex: -1,
                        color: `${hexToRgba(meta.card.eixo_cor_principal, 0.15)}`,
                        lineHeight: 1
                    }}
                >
                    {meta.card.numero}
                </div>

                {/* Header */}
                <div
                    style={{ backgroundColor: meta.card.eixo_cor_principal }}
                    className="w-full flex justify-end p-4 md:py-6 md:px-8"
                >
                    <button
                        className="text-4xl md:text-3xl font-bold cursor-pointer text-white"
                        onClick={handleClose}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col items-start gap-8 p-4 max-md:w-80 md:p-8">
                    <div className="w-full">
                        <h1
                            className="text-3xl md:text-5xl BebasNeue"
                            style={{ color: meta.listing.eixo_cor_principal }}
                        >
                            {strongText}
                        </h1>
                        <p
                            className="text-3xl md:text-5xl font-bebas-book uppercase font-light"
                            style={{ color: meta.listing.eixo_cor_principal }}
                        >
                            {normalText}
                        </p>
                    </div>

                    {/* Seções de conteúdo */}
                    <div className="flex flex-col gap-4 w-full md:w-3/4">
                        {/* Projeção */}
                        {meta.card.projecao && (
                            <div className="flex flex-col md:flex-row gap-2 md:gap-12">
                                <h3
                                    style={{ color: meta.card.eixo_cor_principal }}
                                    className="text-3xl md:text-4xl font-bold md:text-end md:w-40"
                                >
                                    {meta.card.projecao.titulo}
                                </h3>
                                <p className="text-sm md:text-xl roboto-regular w-full md:w-[50rem]">
                                    {meta.card.projecao.valor}
                                </p>
                            </div>
                        )}

                        {/* Ações Estratégicas */}
                        {meta.card.acoes_estrategicas?.valor?.length > 0 && (
                            <div className="flex flex-col md:flex-row gap-2 md:gap-16">
                                <h3
                                    style={{ color: meta.card.eixo_cor_principal }}
                                    className="text-3xl md:text-4xl font-bold md:text-end md:w-40"
                                >
                                    {meta.card.acoes_estrategicas.titulo}
                                </h3>
                                <ul className="list-disc list-inside w-full md:w-[45rem] roboto-regular">
                                    {meta.card.acoes_estrategicas.valor.map((acao, idx) => (
                                        <li className="text-sm md:text-sm pb-2" key={idx}>
                                            {acao}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Indicador */}
                        {meta.card.indicador && (
                            <div className="flex flex-col md:flex-row gap-2 md:gap-12">
                                <h3
                                    style={{ color: meta.card.eixo_cor_principal }}
                                    className="text-2xl md:text-4xl font-bold md:text-end md:w-40"
                                >
                                    {meta.card.indicador.titulo}
                                </h3>
                                <p className="text-sm md:text-xl roboto-regular">
                                    {meta.card.indicador.valor}
                                </p>
                            </div>
                        )}

                        {/* Órgãos Responsáveis */}
                        {meta.card.orgaos_responsaveis && (
                            <div className="flex flex-col md:flex-row gap-2 md:gap-12">
                                <h3
                                    style={{ color: meta.card.eixo_cor_principal }}
                                    className="text-3xl md:text-4xl font-bold md:text-end md:w-40"
                                >
                                    Órgãos Responsáveis
                                </h3>
                                <p
                                    className="text-5xl md:text-8xl font-bebas-book"
                                    style={{ color: meta.card.eixo_cor_principal }}
                                >
                                    {meta.card.orgaos_responsaveis.valor.join(" • ")}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Regionalização */}
                    {meta.card.regionalizacao &&
                        (() => {
                            const reg = meta.card.regionalizacao;
                            const normalize = (s) =>
                                (s || "")
                                    .normalize("NFD")
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .toLowerCase()
                                    .trim();

                            const status = normalize(reg.status_regionalizacao);
                            const legenda = reg.map_legenda || reg.indicador_legenda || null;
                            const rodape = reg.map_rodape || reg.nota_rodape || null;
                            const isNaoRegionalizavel =
                                status === "nao regionalizavel" ||
                                status === "nao regionalizavel" ||
                                status === "nao regionalizavel";
                            const imagemUrl =
                                reg.imagem ||
                                reg.mapa_file ||
                                reg.map_image ||
                                reg.mapa_file ||
                                null;

                            return (
                                <div className="flex flex-col w-full items-center justify-center mt-8 h-full">
                                    <div
                                        className="w-full md:w-full h-1"
                                        style={{ backgroundColor: meta.card.eixo_cor_principal }}
                                    />
                                    <div className="flex flex-col md:flex-row items-center md:items-start justify-around gap-4 md:gap-60 py-4 md:py-12 shadow-[1px_8px_20px_#00000080] m-4 md:m-8 p-4 md:p-8 rounded-[2rem] border-solid w-full md:w-[75rem] bg-white">
                                        <div className="flex flex-col items-start justify-center gap-4 md:gap-12">
                                            <h3
                                                style={{ color: meta.card.eixo_cor_principal }}
                                                className="text-3xl md:text-4xl font-bold"
                                            >
                                                Regionalização
                                            </h3>
                                            {isNaoRegionalizavel && (
                                                <p className="font-bold text-lg capitalize">
                                                    {meta.card.regionalizacao.status_regionalizacao}
                                                </p>
                                            )}
                                            {meta.card.regionalizacao.nota_regionalizacao && (
                                                <p className="font-bold text-lg">
                                                    {meta.card.regionalizacao.nota_regionalizacao}
                                                </p>
                                            )}
                                            {legenda && (
                                                <figcaption className="text-2xl text-center underline" aria-hidden="true">
                                                    {legenda}
                                                </figcaption>
                                            )}
                                        </div>
                                        {imagemUrl && (
                                            <div
                                                style={{
                                                    border: `3px solid ${meta.card.eixo_cor_principal}`,
                                                    padding: `1rem`,
                                                    borderRadius: `2rem`,
                                                    width: `auto`,
                                                    height: `auto`,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                                className="flex items-center justify-center"
                                            >
                                                <SafeSVG
                                                    src={corrigirUrlImagem(imagemUrl)}
                                                    alt="Mapa da regionalização"
                                                    className="mt-4 rounded-xl w-full h-auto"
                                                />
                                            </div>
                                        )}
                                        {rodape && (
                                                <div className="text-xl mt-2 text-justify italic" style={{ color: "#444" }}>
                                                    {">> "}{rodape}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            );
                        })()}
                </div>

                {/* Footer */}
                {meta.card.eixo_frase && (
                    <div
                        className="py-4 md:py-8 flex flex-col md:flex-row gap-2 items-center text-center w-full"
                        style={{ backgroundColor: meta.card.eixo_cor_principal }}
                    >
                        <div
                            style={{ backgroundColor: meta.card.eixo_cor_secundaria }}
                            className="px-4 py-2 rounded-md text-white text-lg md:text-3xl"
                        >
                            <h4 className="text-white text-sm md:text-lg">
                                {meta.card.eixo_nome}
                            </h4>
                        </div>
                        <div className="flex flex-col text-white max-md:w-90">
                            <h3 className="text-xl md:text-4xl font-bold">
                                {meta.card.eixo_frase[0]}
                            </h3>
                            <p className="text-sm md:text-xl">{meta.card.eixo_frase[1]}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
