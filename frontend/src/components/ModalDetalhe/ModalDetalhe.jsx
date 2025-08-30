import Like from "@/assets/svg/like.svg";
import Commit from "@/assets/svg/commit.svg";
import Agrupar2 from "@/assets/svg/agrupar_2.svg";
import Modal from "../Modal/Modal";

export default function ModalDetalhe({ selecionado, onClose }) {
  if (!selecionado) return null;
  if (!selecionado) return null;

  const detalhe = selecionado.detalhe || {};
  const tipoMap = {
    proposta: "Proposta",
    fala_audiencia: "Fala em\n audiência",
    sugestao_alteracao: "Sugestão de\n alteração"
  };

  return (
    <Modal isOpen={selecionado} onClose={onClose}>
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl w-[90%] h-[80vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="fixed left-[111rem] top-24 cursor-pointer z-20"
          >
            <i className="fa-solid fa-xmark text-black text-2xl"></i>
          </button>
          <div className="bg-white rounded-t-2xl h-20 absolute w-[90%] shadow-[0px_5px_20px_gray] left-24 top-20 z-10"></div>
          <div className="h-1 w-[90%] relative top-16 left-16 bg-[var(--color-navy)]"></div>
          <div className="mx-5 pt-20 pb-5 h-[27rem]">
            <div className="flex justify-around items-center gap-4 mx-24">
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
          <div className=" h-1 w-[90%] relative left-16 bg-[var(--color-navy)]"></div>
          <div className="mt-6">
            <h2 className="text-5xl text-[var(--color-navy)] pl-24 pb-4">
              contribuição
            </h2>
            {detalhe.tipo && (
              <>
                <div className="relative top-[-5.5rem] left-[76rem] w-80 bg-[var(--color-cyan-dark)] h-28 z-[1] flex items-center justify-center break-all rounded-b-4xl">
                  <p
                    className="BebasNeue text-6xl text-white"
                    dangerouslySetInnerHTML={{
                      __html: (tipoMap[detalhe.tipo] || detalhe.tipo).replace(
                        /\n/g,
                        "<br/>"
                      )
                    }}
                  ></p>
                </div>
                <div className=" h-1 w-[90%] relative left-16 bottom-28 bg-[var(--color-navy)]"></div>
              </>
            )}
            {detalhe.titulo && (
              <div className="flex items-center justify-start gap-8 relative left-[30rem] bottom-16 w-[60rem]">
                <div className="bg-[var(--color-cyan-medium)] w-1 h-60"></div>
                <div className="flex flex-col items-start justify-center gap-4 w-[57rem]">
                  <h2 className="text-4xl font-bold mb-2 text-[var(--color-cyan-medium)]">
                    {detalhe.titulo}
                  </h2>
                  {detalhe.resumo && (
                    <p className="mb-4 text-2xl text-[var(--color-cyan-medium)]">
                      <strong>Resumo:</strong> {detalhe.descricao}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="w-40 flex flex-col flex-nowrap items-start justify-center gap-4 relative left-20 bottom-80">
              {detalhe.apoios > 0 && (
                <p className="flex items-center gap-2 text-[var(--color-navy)] shadow-[0px_0px_2px_gray] p-2 rounded-3xl w-40">
                  <img src={Like} alt="Apoios" />
                  <strong>{detalhe.apoios}</strong> Apoios
                </p>
              )}
              {detalhe.comentarios > 0 && (
                <p className="flex items-center gap-2 text-[var(--color-navy)] shadow-[0px_0px_2px_gray] p-2 rounded-3xl w-40">
                  <img src={Commit} alt="Comentários" />
                  <strong>{detalhe.comentarios}</strong> Comentários
                </p>
              )}
            </div>
            {detalhe.conteudo?.length > 0 && (
              <div className="flex flex-col gap-4 relative left-[32rem] bottom-0 w-[60rem]">
                {detalhe.conteudo.map((par, index) => (
                  <p
                    key={index}
                    className="flex items-start justify-start gap-8 w-[60rem] text-xl"
                  >
                    {par}
                  </p>
                ))}
              </div>
            )}
            {detalhe.respostas?.length > 0 && (
              <>
                <div>
                  <div className=" h-1 w-[90%] relative left-16 bg-[var(--color-cyan-dark)]"></div>
                  <h3 className="text-4xl text-[var(--color-cyan-dark)] pl-24 py-4">
                    Respostas:
                  </h3>
                  <div className=" h-1 w-[90%] relative left-16 bg-[var(--color-cyan-dark)]"></div>
                </div>
                <ul className="list-disc list-inside py-8 flex flex-col flex-nowrap items-start justify-center gap-8 w-full pb-24">
                  {detalhe.respostas.map((r, i) => (
                    <li className="pl-24 w-ful" key={i}>
                      <div className="flex justify-start items-center gap-64 p-4">
                        <strong className="text-xl text-[var(--color-cyan-dark)] shadow-[0px_0px_2px_gray] p-2 rounded-3xl w-60">
                          {r.orgao}
                        </strong>
                        <p className="h-full w-[55rem] text-xl">{r.texto}</p>
                      </div>
                      <div className="h-0.5 w-[94rem] right-8 relative bg-[var(--color-cyan-dark)] my-4"></div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <img src={Agrupar2} alt="" />
        </div>
      </div>
    </Modal>
  );
}
