import React from "react";
import Like from "@/shared/assets/svg/like.svg";
import Commit from "@/shared/assets/svg/commit.svg";
import Agrupar2 from "@/shared/assets/svg/agrupar_2.svg";
import Modal from "@/shared/components/ui/Modal";

export default function ModalDetalhe({ selecionado, onClose }) {
  if (!selecionado) return null;

  const detalhe = selecionado.detalhe || {};

  const tipoMap = {
    proposta: "Proposta",
    fala_audiencia: "Fala em\n audiência",
    sugestao_alteracao: "Sugestão de\n alteração",
    Participe_Mais: "Proposta no\n Participe+"
  };

  return (
    <Modal isOpen={!!selecionado} onClose={onClose}>
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="max-xl:bg-white max-xl:rounded-none max-xl:min-w-screen max-xl:min-h-screen lg:bg-white rounded-xl w-[75%] h-[80vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="max-xl:fixed max-xl:top-0 max-xl:left-0 lg:relative flex items-start justify-center flex-nowrap flex-row top-0 left-[80rem] cursor-pointer z-20 w-16 bg-white"
          >
            <i className="fa-solid fa-xmark text-black text-2xl"></i>
          </button>
          <div className="max-xl:bg-white max-xl:fixed max-xl:rounded-none max-xl:h-12 max-xl:left-0 max-xl:top-0 max-xl:w-full lg:hidden"></div>
          <div className="h-1 w-[70%] xl:w-[90%] relative top-16 left-16 bg-[var(--color-navy)]"></div>
          <div>
            <div className="mx-md:min-h-full lg:mx-5 pt-20 pb-5 max-h-full">
              <div className="max-xl:flex max-xl:flex-col max-xl:my-8 tirar-margin lg:flex justify-around items-center gap-4 mx-24">
                <div className="flex flex-col items-center justify-around gap-8 w-full">
                  <div
                    className="flex flex-col-reverse items-center justify-center flex-wrap content-center gap-4 rounded-2xl w-full"
                    style={{ border: "2px solid var(--color-navy)" }}
                  >
                    <h3 className="text-lg pb-4">canal</h3>
                    <p className="text-sm font-semibold bg-[var(--color-navy)] w-full p-6 text-white rounded-t-xl text-center">
                      {selecionado.canal}
                    </p>
                  </div>
                  <div
                    className="flex flex-row flex-nowrap items-center justify-center gap-8 rounded-2xl w-full"
                    style={{ border: "2px solid var(--color-navy)" }}
                  >
                    <h3 className="text-sm pl-2">nome</h3>
                    <h2 className="text-sm font-semibold bg-[var(--color-navy)] w-full py-5 px-2 text-white rounded-r-xl text-center">
                      {selecionado.nome}
                    </h2>
                  </div>
                </div>
                <div
                  className="flex flex-col-reverse items-center justify-center h-full flex-nowrap content-center gap-4 rounded-2xl w-full"
                  style={{ border: "2px solid var(--color-navy)" }}
                >
                  <h3 className="text-lg pb-4">subprefeitura</h3>
                  <div className="flex gap-4 h-full flex-wrap bg-[var(--color-navy)] py-5 px-2 rounded-t-xl w-full">
                    {selecionado?.subprefeituras?.map((sub, index) => (
                      <span
                        key={index}
                        className="p-1 bg-[var(--color-cyan-dark)] text-white rounded text-sm"
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
                        className="text-lg p-2 bg-[var(--color-cyan-dark)] text-white rounded text-2xl"
                      >
                        {tema}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="max-xl:w-full max-xl:h-1 max-xl:left-0 lg:h-1 w-[90%] relative left-16 bg-[var(--color-navy)]"></div>
            <div className="mt-6"></div>
            <h2 className="max-xl:text-2xl tirar-padding lg:text-5xl text-[var(--color-navy)] pl-24 pb-4">
              contribuição
            </h2>
            {detalhe.tipo && (
              <>
                <div className="max-xl:w-60 max-xl:relative max-xl:left-0 max-xl:top-0 max-lg:min-w-full max-xl:max-w-full lg:relative top-[-5.5rem] left-[55rem] max-w-md bg-[var(--color-cyan-dark)] z-[1] flex items-center justify-center break-all rounded-b-4xl h-auto">
                  <p
                    className="BebasNeue max-xl:text-3xl lg:text-6xl text-white px-8 whitespace-normal"
                    dangerouslySetInnerHTML={{
                        __html: (tipoMap[detalhe.tipo] || detalhe.tipo).replace(/\n/g, "<br />")
                    }}
                    ></p>
                </div>
                <div className="max-xl:w-full max-xl:h-1 max-xl:left-0 max-xl:bottom-15 lg:h-1 w-[90%] relative left-16 bottom-28 bg-[var(--color-navy)]"></div>
              </>
            )}
            {detalhe.titulo && detalhe.titulo !== "None" && (
              <div className="max-xl:left-2 max-xl:bottom-50 max-xl:w-[20rem] lg:flex items-center justify-start gap-8 relative left-[30rem] bottom-16 w-[55rem]">
                <div className="lg:bg-[var(--color-cyan-medium)] w-1 h-60"></div>
                <div className="max-xl:w-[20rem] lg:flex flex-col items-start justify-center gap-4 w-[57rem]">
                  <h2 className="max-xl:text-2xl max-xl:break-all lg:text-4xl font-bold mb-2 text-[var(--color-cyan-medium)]">
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
            <div className="flex flex-col flex-nowrap items-start justify-center gap-4 lg:relative lg:left-20 lg:bottom-80 lg:w-40 max-xl:fixed max-xl:bottom-3 max-xl:left-4 max-xl:w-[20rem] max-xl:flex max-xl:flex-row z-20">
              {detalhe.apoios > 0 && (
                <p className="flex items-center gap-2 text-[var(--color-navy)] shadow-[0px_0px_2px_gray] p-2 rounded-3xl w-40 max-xl:hidden">
                  <img src={Like} alt="Apoios" />
                  <strong>{detalhe.apoios}</strong> Apoios
                </p>
              )}
              {detalhe.comentarios > 0 && (
                <p className="flex items-center gap-2 text-[var(--color-navy)] shadow-[0px_0px_2px_gray] p-2 rounded-3xl w-40 max-xl:hidden">
                  <img src={Commit} alt="Comentários" />
                  <strong>{detalhe.comentarios}</strong> Comentários
                </p>
              )}
            </div>
            {Array.isArray(detalhe.conteudo) ? (
              detalhe.conteudo.map((paragrafo, index) => (
                <div className="max-xl:left-0 max-xl:w-full max-xl:break-all lg:flex flex-col gap-4 relative left-[35rem] bottom-0 w-[54rem]">
                  <p key={index}>{paragrafo}</p>
                </div>
              ))
            ) : (
              <div className="max-xl:left-0 max-xl:w-[20rem] max-xl:top-8 lg:flex flex-col gap-4 relative left-[35rem] bottom-0 w-[54rem] pb-10">
                <p className="max-xl:w-80 max-xl:text-sm max-xl:left-6 max-xl:break-all max-xl:relative max-xl:top-0 lg:flex items-start justify-start gap-8 w-[45rem] text-xl">
                  {detalhe.conteudo}
                </p>
              </div>
            )}
            {detalhe.respostas?.length > 0 && (
              <>
                <div>
                  <div className="max-xl:w-full max-xl:h-1 max-xl:left-0 lg:h-1 w-[90%] relative left-16 bg-[var(--color-cyan-dark)]"></div>
                  <h3 className="text-4xl text-[var(--color-cyan-dark)] pl-24 py-4">
                    Respostas:
                  </h3>
                  <div className="max-xl:w-full max-xl:h-1 max-xl:left-0 lg:h-1 w-[90%] relative left-16 bg-[var(--color-cyan-dark)]"></div>
                </div>
                <ul className="list-disc list-inside py-8 flex flex-col flex-nowrap items-start justify-center gap-8 w-full pb-24">
                  {detalhe.respostas.map((r, i) => (
                    <li className="lg:pl-24 w-full" key={i}>
                      <div className="max-xl:flex max-xl:flex-col max-xl:items-start max-xl:gap-8 lg:flex justify-start items-center gap-64 p-4">
                        <strong className="text-xl text-[var(--color-cyan-dark)] shadow-[0px_0px_2px_gray] p-2 rounded-3xl w-60">
                          {r.orgao}
                        </strong>
                        <p className="max-xl:w-full max-xl:text-sm  max-xl:break-all lg:h-full w-[55rem] text-xl">
                          {r.texto}
                        </p>
                      </div>
                      <div className="max-xl:h-px max-xl:max-w-full lg:h-0.5 w-full right-8 relative bg-[var(--color-cyan-dark)] my-4"></div>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <img className="max-xl:hidden" src={Agrupar2} alt="" />
          </div>
        </div>
      </div>
    </Modal>
  );
}