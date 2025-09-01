import React, { useEffect, useRef, useState } from "react";

export default function CardMetas({ meta, onClose }) {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const contentRef = useRef(null);
  const [needsScroll, setNeedsScroll] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const calculateScroll = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const viewportHeight = window.innerHeight;
        setNeedsScroll(contentHeight > viewportHeight);
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

  const tituloHtml = meta.listing.titulo;

  // extrai o conteúdo do <strong>
  const regex = /<strong>(.*?)<\/strong>(.*)/;
  const match = tituloHtml.match(regex);

  const strongText = match ? match[1] : tituloHtml;
  const normalText = match ? match[2] : "";

  if (!visible || !meta) return null;
  const scrollClass = needsScroll ? "overflow-y-auto" : "";

  return (
    <div
      className="bg-white fixed inset-0 flex items-start justify-center z-50"
      onClick={handleClose}
    >
      <div
        className={`relative flex flex-col justify-between overflow-y-auto h-screen w-[211vh] shadow-lg transition-all
          ${closing ? "slide-out-bottom" : "animate-slide-up"}  ${scrollClass}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarColor: `${meta.card.eixo_cor_principal} transparent`
        }}
      >
        <div
          className="absolute font-bebas-bold select-none pointer-events-none"
          style={{
            fontSize: "60rem",
            bottom: "-1.5rem",
            left: 0,
            zIndex: -1,
            color: `${hexToRgba(meta.card.eixo_cor_principal, 0.15)}`,
            lineHeight: 1
          }}
        >
          {meta.card.numero}
        </div>
        <div
          style={{ backgroundColor: meta.card.eixo_cor_principal }}
          className="w-full h-auto"
        >
          <button
            className="relative top-0 left-[115rem] text-4xl font-bold cursor-pointer"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark text-white"></i>
          </button>
        </div>

        <div className="flex flex-col items-center gap-12 px-20 h-[510vh]">
          <div className="flex justify-center items-start flex-col py-10 px-20">
            <div className="w-[59rem]">
              <span
                className="text-5xl BebasNeue"
                style={{ color: meta.listing.eixo_cor_principal }}
              >
                {strongText}
              </span>
              <span
                style={{ color: meta.listing.eixo_cor_principal }}
                className="text-5xl font-bebas-book uppercase font-light"
              >
                {normalText}
              </span>
            </div>
          </div>

          <div>
            <div className="px-20 flex flex-col gap-10 my-20">
              <div>
                {meta.card.projecao && (
                  <div className="flex flex-row justify-start items-start flex-nowrap gap-12">
                    <h3
                      style={{ color: meta.card.eixo_cor_principal }}
                      className="text-4xl text-end w-40"
                    >
                      {meta.card.projecao.titulo}
                    </h3>
                    <p className="text-xl roboto-regular w-[50rem]">
                      {meta.card.projecao.valor}
                    </p>
                  </div>
                )}
              </div>
              <div>
                {meta.card.acoes_estrategicas && (
                  <div className="flex flex-row justify-start items-start flex-nowrap gap-16">
                    <h3
                      style={{ color: meta.card.eixo_cor_principal }}
                      className="text-4xl text-end w-40"
                    >
                      {meta.card.acoes_estrategicas.titulo}
                    </h3>
                    <ul className="list-disc list-inside listCard w-[45rem] roboto-regular">
                      {meta.card.acoes_estrategicas.valor.map((acao, idx) => (
                        <li className="text-xl itemListCard pb-2" key={idx}>
                          {acao}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                {meta.card.indicador && (
                  <div className="flex items-end gap-12 flex-row justify-start flex-nowrap">
                    <h3
                      style={{ color: meta.card.eixo_cor_principal }}
                      className="text-4xl font-semibold text-end w-40"
                    >
                      {meta.card.indicador.titulo}
                    </h3>
                    <p className="text-xl roboto-regular">
                      {meta.card.indicador.valor}
                    </p>
                  </div>
                )}
              </div>
              <div>
                {meta.card.orgaos_responsaveis && (
                  <div className="flex items-end gap-12 flex-row justify-start flex-nowrap ">
                    <h3
                      style={{ color: meta.card.eixo_cor_principal }}
                      className="text-4xl font-bebas-bold text-end w-40"
                    >
                      Órgãos Responsáveis
                    </h3>
                    <p
                      style={{ color: meta.card.eixo_cor_principal }}
                      className="text-8xl font-bebas-book"
                    >
                      {meta.card.orgaos_responsaveis.valor.join(" • ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {meta.card.regionalizacao && (
              <div className="flex flex-col items-center justify-center ">
                <div
                  className="w-[100rem] h-2 "
                  style={{ backgroundColor: meta.card.eixo_cor_principal }}
                ></div>
                <div className="flex flex-row flex-nowrap items-start justify-around gap-60 py-12 shadow-[1px_8px_20px_#00000080] m-8 p-8 rounded-[2rem] border-solid w-[75rem] bg-white">
                  <div className="flex flex-col flex-nowrap items-start justify-center gap-12">
                    <h3
                      style={{ color: meta.card.eixo_cor_principal }}
                      className="text-4xl font-semibold"
                    >
                      {meta.card.regionalizacao.titulo}
                    </h3>
                    <p className="font-bold text-lg">
                      {meta.card.regionalizacao.subtitulo}
                    </p>
                    <p className="text-lg">
                      {meta.card.regionalizacao.descricao}
                    </p>
                    <p className="font-bold text-lg">
                      {meta.card.regionalizacao.nota}
                    </p>
                  </div>
                  <div
                    style={{
                      border: `3px solid ${meta.card.eixo_cor_principal}`,
                      padding: `2rem 1rem`,
                      borderRadius: `2rem`,
                      width: `40rem`,
                      height: `25rem`
                    }}
                    className="flex items-center justify-center"
                  >
                    {meta.card.regionalizacao.imagem && (
                      <img
                        src={meta.card.regionalizacao.imagem}
                        alt="Mapa da regionalização"
                        className="mt-4 rounded-xl"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="h-[11.44rem] py-8"
          style={{ backgroundColor: meta.card.eixo_cor_principal }}
        >
          {meta.card.eixo_frase && (
            <div className="pt-2 flex flex-nowrap items-center justify-evenly">
              <div
                style={{ backgroundColor: meta.card.eixo_cor_secundaria }}
                className="buttom_meta w-60 h-25 text-white"
              >
                <h4 className="text-3xl">{meta.card.eixo_nome}</h4>
              </div>
              <div>
                <h3 className="text-4xl roboto-bold text-white">
                  {meta.card.eixo_frase[0]}
                </h3>
                <p className="text-xl w-130 roboto-regular text-white">
                  {meta.card.eixo_frase[1]}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
