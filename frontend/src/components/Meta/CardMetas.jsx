import React, { useEffect, useState } from "react";

export default function CardMetas({ meta, onClose }) {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
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

  if (!visible) return null;

  return (
    <div
      className="bg-white fixed inset-0 flex items-start justify-center z-50"
      onClick={handleClose}
    >
      <div
        className={`relative flex flex-col justify-between overflow-y-auto h-screen w-[211vh] shadow-lg transition-all
          ${closing ? "slide-out-bottom" : "animate-slide-up"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarColor: `${meta.cor_principal_eixo} transparent` }}
      >
        <div
          className="absolute font-bebas-bold select-none pointer-events-none"
          style={{
            fontSize: "60rem",
            bottom: "-1.5rem",
            left: 0,
            zIndex: -1,
            color: `${hexToRgba(meta.cor_principal_eixo, 0.15)}`,
            lineHeight: 1
          }}
        >
          {meta.numeroMeta}
        </div>
        <div
          style={{ backgroundColor: meta.cor_principal_eixo }}
          className="w-full h-auto"
        >
          {/* Botão X */}
          <button
            className="relative top-0 left-[115rem] text-4xl font-bold cursor-pointer"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark text-white"></i>
          </button>
        </div>

        <div className="flex flex-col items-center gap-12 px-20">
          <div className="flex justify-center items-start flex-col py-10 px-20">
            <div>
              <h2
                className="text-5xl "
                dangerouslySetInnerHTML={{ __html: meta.tituloCard }}
                style={{ color: meta.cor_principal_eixo }}
              />
              <p
                className="text-5xl font-bebas-book uppercase font-light"
                dangerouslySetInnerHTML={{ __html: meta.contunuacaoTituloCard }}
                style={{ color: meta.cor_principal_eixo }}
              />
            </div>
          </div>

          <div>
            <div className="px-20 flex flex-col gap-10">
              <div>
                {meta.projecao && (
                  <div className="flex flex-row justify-start items-start flex-nowrap gap-12">
                    <h3
                      style={{ color: meta.cor_principal_eixo }}
                      className="text-4xl text-end w-40"
                    >
                      {meta.projecao.titulo}
                    </h3>
                    <p className="text-xl roboto-regular">{meta.projecao.descricao}</p>
                  </div>
                )}
              </div>
              <div>
                {meta.acoesEstrategicas && (
                  <div className="flex flex-row justify-start items-start flex-nowrap gap-16">
                    <h3
                      style={{ color: meta.cor_principal_eixo }}
                      className="text-4xl text-end w-40"
                    >
                      {meta.acoesEstrategicas.titulo_acoesEstrategicas_eixo}
                    </h3>
                    <ul className="list-disc list-inside listCard w-[45rem] roboto-regular">
                      {meta.acoesEstrategicas.itens.map((acao, idx) => (
                        <li className="text-xl itemListCard pb-2" key={idx}>
                          {acao}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                {meta.indicador && (
                  <div className="flex items-end gap-12 flex-row justify-start flex-nowrap">
                    <h3
                      style={{ color: meta.cor_principal_eixo }}
                      className="text-4xl font-semibold text-end w-40"
                    >
                      {meta.indicador.titulo_indicador_eixo}
                    </h3>
                    <p className="text-xl roboto-regular">{meta.indicador.descricao}</p>
                  </div>
                )}
              </div>
              <div>
                {meta.orgaosResponsaveis && (
                  <div className="flex items-end gap-12 flex-row justify-start flex-nowrap ">
                    <h3
                      style={{ color: meta.cor_principal_eixo }}
                      className="text-4xl font-bebas-bold text-end w-40"
                    >
                      Órgãos Responsáveis
                    </h3>
                    <p
                      style={{ color: meta.cor_principal_eixo }}
                      className="text-8xl font-bebas-book"
                    >
                      {meta.orgaosResponsaveis.join(" • ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {meta.regionalizacao && (
              <div className="flex flex-col items-center justify-center ">
                <div
                  className="w-[100rem] h-2 "
                  style={{ backgroundColor: meta.cor_principal_eixo }}
                ></div>
                <div className="flex flex-row flex-nowrap items-start justify-around gap-60 py-12 shadow-[1px_8px_20px_#00000080] m-8 p-8 rounded-[2rem] border-solid w-[75rem] bg-white">
                  <div className="flex flex-col flex-nowrap items-start justify-center gap-12">
                    <h3
                      style={{ color: meta.cor_principal_eixo }}
                      className="text-4xl font-semibold"
                    >
                      {meta.regionalizacao.titulo_regionalizacao_eixo}
                    </h3>
                    <p className="font-bold text-lg">
                      {meta.regionalizacao.subtitulo_regionalização_eixo}
                    </p>
                    <p className="text-lg">{meta.regionalizacao.descricao}</p>
                    <p className="font-bold text-lg">
                      {meta.regionalizacao.nota}
                    </p>
                  </div>
                  <div
                    style={{
                      border: `3px solid ${meta.cor_principal_eixo}`,
                      padding: `2rem 1rem`,
                      borderRadius: `2rem`,
                      width: `40rem`,
                      height: `25rem`
                    }}
                    className="flex items-center justify-center"
                  >
                    {meta.regionalizacao.imagem && (
                      <img
                        src={meta.regionalizacao.imagem}
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
          style={{ backgroundColor: meta.cor_principal_eixo }}
        >
          {meta.rodape_eixo && (
            <div className="pt-2 flex flex-nowrap items-center justify-evenly">
              <div
                style={{ backgroundColor: meta.cor_secundaria_eixo }}
                className="buttom_meta w-60 h-25 text-white"
              >
                <h4 className="text-3xl">{meta.eixo}</h4>
              </div>
              <div>
                <h3 className="text-4xl roboto-bold text-white">
                  {meta.rodape_eixo.titulo_rodape_eixo}
                </h3>
                <p className="text-xl w-130 roboto-regular text-white">
                  {meta.rodape_eixo.descricao_rodape_eixo}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
