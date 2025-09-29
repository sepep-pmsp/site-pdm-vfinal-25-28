import React from "react";
import Like from "@/assets/svg/like.svg";
import Commit from "@/assets/svg/commit.svg";
import Agrupar2 from "@/assets/svg/agrupar_2.svg";
import Modal from "../Modal/Modal";

export default function ModalDetalhe({ selecionado, onClose }) {
  if (!selecionado) return null;

  const detalhe = selecionado.detalhe || {};

  const tipoMap = {
    proposta: "Proposta",
    fala_audiencia: "Fala em\n audiência",
    sugestao_alteracao: "Sugestão de\n alteração",
    Participe_Mais: "Proposta\n no Participe+"
  };

  return (
    <Modal isOpen={!!selecionado} onClose={onClose}>
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="max-md:bg-white max-md:rounded-none max-md:min-w-screen max-md:min-h-screen lg:bg-white rounded-xl w-[75%] h-[80vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="max-md:fixed max-md:top-0 max-md:left-0 lg:relative flex items-start justify-center flex-nowrap flex-row top-0 left-[80rem] cursor-pointer z-20 w-16 bg-white"
          >
            <i className="fa-solid fa-xmark text-black text-2xl"></i>
          </button>
          <div className="max-md:bg-white max-md:fixed max-md:rounded-none max-md:h-12 max-md:left-0 max-md:top-0 max-md:w-full lg:hidden"></div>
          <div className="h-1 w-[90%] relative top-16 left-16 bg-[var(--color-navy)]"></div>
          <div>
            <div className="mx-md:min-h-full lg:mx-5 pt-20 pb-5 max-h-full">
              <div className="max-md:flex max-md:flex-col max-md:my-8 tirar-margin lg:flex justify-around items-center gap-4 mx-24">
                <div className="flex flex-col items-center justify-around gap-8 w-full">
                  <div
                    className="flex flex-col-reverse items-center justify-center flex-wrap content-center gap-4 rounded-2xl w-full"
                    style={{ border: "2px solid var(--color-navy)" }}
                  >
                    <h3 className="text-lg pb-4">canal</h3>
                    <p className="text-lg font-semibold bg-[var(--color-navy)] w-full p-6 text-white rounded-t-xl text-center">
                      {selecionado.canal}
                    </p>
                  </div>
                  <div
                    className="flex flex-row flex-nowrap items-center justify-center gap-8 rounded-2xl w-full"
                    style={{ border: "2px solid var(--color-navy)" }}
                  >
                    <h3 className="text-lg pl-8">nome</h3>
                    <h2 className="text-xl font-semibold bg-[var(--color-navy)] w-full p-6 text-white rounded-r-xl text-center">
                      {selecionado.nome}
                    </h2>
                  </div>
                </div>
                <div
                  className="flex flex-col-reverse items-center justify-center h-full flex-nowrap content-center gap-4 rounded-2xl w-full"
                  style={{ border: "2px solid var(--color-navy)" }}
                >
                  <h3 className="text-lg pb-4">subprefeitura</h3>
                  <div className="flex gap-4 h-full flex-wrap bg-[var(--color-navy)] p-6 rounded-t-xl w-full">
                    {selecionado?.subprefeituras?.map((sub, index) => (
                      <span
                        key={index}
                        className="p-1 bg-[var(--color-cyan-dark)] text-white rounded text-2xl"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="flex flex-col-reverse items-center justify-center h-full flex-nowrap content-center gap-4 rounded-2xl w-full"
                  style={{ border: "2px solid var(--color-navy)" }}
                >
                  <h3 className="text-lg pb-4">temas</h3>
                  <div className="flex gap-4 h-full flex-wrap bg-[var(--color-navy)] p-6 rounded-t-xl w-full">
                    {selecionado?.temas?.map((tema, index) => (
                      <span
                        key={index}
                        className="p-2 bg-[var(--color-cyan-dark)] text-white rounded text-2xl"
                      >
                        {tema}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="max-md:w-full max-md:h-1 max-md:left-0 lg:h-1 w-[90%] relative left-16 bg-[var(--color-navy)]"></div>
            <div className="mt-6"></div>
            <h2 className="max-md:text-2xl tirar-padding lg:text-5xl text-[var(--color-navy)] pl-24 pb-4">
              contribuição
            </h2>
            {detalhe.tipo && (
              <>
                <div className="max-md:w-60 max-md:relative max-md:left-40 max-md:top-[-3.5rem] lg:relative top-[-5.5rem] left-[55rem] max-w-md bg-[var(--color-cyan-dark)] z-[1] flex items-center justify-center break-all rounded-b-4xl h-auto">
                  <p
                    className="BebasNeue max-md:text-3xl lg:text-6xl text-white px-8"
                    dangerouslySetInnerHTML={{
                      __html: (tipoMap[detalhe.tipo] || detalhe.tipo).replace(
                        /\n/g,
                        "<br/>"
                      )
                    }}
                  ></p>
                </div>
                <div className="max-md:w-full max-md:h-1 max-md:left-0 max-md:bottom-15 lg:h-1 w-[90%] relative left-16 bottom-28 bg-[var(--color-navy)]"></div>
              </>
            )}
            {detalhe.titulo && detalhe.titulo !== "None" && (
              <div className="max-md:left-2 max-md:bottom-50 max-md:w-[20rem] lg:flex items-center justify-start gap-8 relative left-[30rem] bottom-16 w-[55rem]">
                <div className="lg:bg-[var(--color-cyan-medium)] w-1 h-60"></div>
                <div className="max-md:w-[20rem] lg:flex flex-col items-start justify-center gap-4 w-[57rem]">
                  <h2 className="max-md:text-2xl max-md:break-all lg:text-4xl font-bold mb-2 text-[var(--color-cyan-medium)]">
                    {detalhe.titulo}
                  </h2>
                  {(detalhe.resumo || detalhe.descricao) && (
                    <p className="lg:mb-4 text-2xl text-[var(--color-cyan-medium)]">
                      <strong>Resumo:</strong>{" "}
                      {detalhe.resumo || detalhe.descricao}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col flex-nowrap items-start justify-center gap-4 lg:relative lg:left-20 lg:bottom-80 lg:w-40 max-md:fixed max-md:bottom-3 max-md:left-4 max-md:w-[20rem] max-md:flex max-md:flex-row z-20">
              {detalhe.apoios > 0 && (
                <p className="flex items-center gap-2 text-[var(--color-navy)] shadow-[0px_0px_2px_gray] p-2 rounded-3xl w-40 max-md:hidden">
                  <img src={Like} alt="Apoios" />
                  <strong>{detalhe.apoios}</strong> Apoios
                </p>
              )}
              {detalhe.comentarios > 0 && (
                <p className="flex items-center gap-2 text-[var(--color-navy)] shadow-[0px_0px_2px_gray] p-2 rounded-3xl w-40 max-md:hidden">
                  <img src={Commit} alt="Comentários" />
                  <strong>{detalhe.comentarios}</strong> Comentários
                </p>
              )}
            </div>
            {Array.isArray(detalhe.conteudo) ? (
              detalhe.conteudo.map((paragrafo, index) => (
                <div className="max-md:left-0 max-md:w-full max-md:break-all lg:flex flex-col gap-4 relative left-[35rem] bottom-0 w-[54rem]">
                  <p key={index}>{paragrafo}</p>
                </div>
              ))
            ) : (
              <div className="max-md:left-0 max-md:w-[20rem] lg:flex flex-col gap-4 relative left-[35rem] bottom-0 w-[54rem] pb-10">
                <p className="max-md:w-full max-md:break-all max-md:relative max-md:top-0 lg:flex items-start justify-start gap-8 w-[45rem] text-xl">
                  {detalhe.conteudo}
                </p>
              </div>
            )}
            {detalhe.respostas?.length > 0 && (
              <>
                <div>
                  <div className="max-md:w-full max-md:h-1 max-md:left-0 lg:h-1 w-[90%] relative left-16 bg-[var(--color-cyan-dark)]"></div>
                  <h3 className="text-4xl text-[var(--color-cyan-dark)] pl-24 py-4">
                    Respostas:
                  </h3>
                  <div className="max-md:w-full max-md:h-1 max-md:left-0 lg:h-1 w-[90%] relative left-16 bg-[var(--color-cyan-dark)]"></div>
                </div>
                <ul className="list-disc list-inside py-8 flex flex-col flex-nowrap items-start justify-center gap-8 w-full pb-24">
                  {detalhe.respostas.map((r, i) => (
                    <li className="lg:pl-24 w-full" key={i}>
                      <div className="max-md:flex max-md:flex-col max-md:items-start max-md:gap-8 lg:flex justify-start items-center gap-64 p-4">
                        <strong className="text-xl text-[var(--color-cyan-dark)] shadow-[0px_0px_2px_gray] p-2 rounded-3xl w-60">
                          {r.orgao}
                        </strong>
                        <p className="max-md:w-full max-md:break-all lg:h-full w-[55rem] text-xl">
                          {r.texto}
                        </p>
                      </div>
                      <div className="max-md:h-px max-md:max-w-full lg:h-0.5 w-full right-8 relative bg-[var(--color-cyan-dark)] my-4"></div>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <img className="max-md:hidden" src={Agrupar2} alt="" />
          </div>
        </div>
      </div>
    </Modal>
  );
}