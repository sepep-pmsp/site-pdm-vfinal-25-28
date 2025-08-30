import React from "react";
import Modal from "../Modal/Modal";

export default function ModalResultados({
  isOpen,
  onClose,
  resultados,
  onSelecionar
}) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl w-[82%] h-[80vh] overflow-y-auto scrollbar-thin no-scrollbar-arrows">
          <div>
            <button
              onClick={onClose}
              className="fixed left-[107rem] top-24 cursor-pointer z-20"
            >
              <i className="fa-solid fa-xmark text-black text-2xl"></i>
            </button>
            <div className="bg-white rounded-t-2xl h-20 absolute w-[82.05%] left-[10.8rem] shadow-[0px_5px_20px_gray] top-20 z-10"></div>
          </div>
          <div className="mx-5 py-16 pb-5">
            {resultados.length === 0 ? (
              <p>Nenhum resultado encontrado.</p>
            ) : (
              <ul className="space-y-4">
                {resultados.map((item, index) => (
                  <li
                    key={item.id ?? index}
                    className="flex flex-col items-center justify-center flex-nowrap py-4"
                  >
                    <div
                      className="flex flex-row justify-between gap-10 w-full px-4 py-2 rounded-t-2xl"
                      style={{ border: "2px solid var(--color-navy)" }}
                    >
                      <div>
                        <h3 className="text-lg">nome</h3>
                        <h2 className="text-xl font-semibold">{item.nome}</h2>
                      </div>
                      <div>
                        <h3 className="text-lg">canal</h3>
                        <p className="text-lg font-semibold">{item.canal}</p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <h3 className="text-lg">subprefeitura</h3>
                        <div className="flex gap-4 w-[23rem] h-full flex-wrap">
                          {item?.subprefeituras?.map((sub, index) => (
                            <span
                              key={index}
                              className="p-1 bg-[var(--color-navy)] text-white rounded h-8"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <h3 className="text-lg">temas</h3>
                        <div className="flex gap-4 w-[23rem] h-full flex-wrap ">
                          {item?.temas?.map((sub, index) => (
                            <span
                              key={index}
                              className="p-1 bg-[var(--color-navy)] text-white rounded  h-8"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="w-full text-center rounded-b-2xl bg-[var(--color-navy)]">
                      <button
                        onClick={() => onSelecionar(item)}
                        className="mt-2 text-white pb-2"
                      >
                        Veja mais sobre esta devolutiva
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white rounded-b-2xl h-20 absolute w-[82.05%] left-[10.8rem] shadow-[0px_5px_20px_gray] top-[47rem] z-10"></div>
        </div>
      </div>
    </Modal>
  );
}
