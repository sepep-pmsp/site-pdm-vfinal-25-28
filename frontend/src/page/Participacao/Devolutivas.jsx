import React, { useEffect, useState } from "react";
import { getParticipacaoData } from "@/services/Participacao/getParticipacaoData";
import CustomButton from "@/components/Button/Button";
import ModalParticipacaoSocial from "@/components/ModalParticipacaoSocial/ModalParticipacaoSocial";

export default function Devolutivas() {
  const [devolutivas, setDevolutivas] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [apresentacao, setPpresentacao] = useState(null);

  useEffect(() => {
    getParticipacaoData()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDevolutivas(data[0].devolutivas);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getParticipacaoData()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPpresentacao(data[0].apresentacao);
        }
      })
      .catch(console.error);
  }, []);


  if (!devolutivas) return <div>Carregando...</div>;
  return (
    <div className="py-8">
      <div className="bg-[var(--color-cyan-dark)] w-[40rem] h-44 right-[95rem] top-[55.3rem] rotate-[270deg] absolute flex items-center flex-col justify-end p-4 rounded-br-4xl rounded-bl-4xl shadow-[-4px_2px_20px_0px_gray] z-1">
        <h1 className="text-white text-7xl px-6 relative left-28 bottom-4">
          Devolutivas
        </h1>
      </div>
      <section className="relative w-full overflow-hidden">
        {devolutivas.imagem_fundo && (
          <div>
            <img src={devolutivas.imagem_fundo} alt="" />
            <div className="absolute top-0 left-0 w-full h-full bg-[var(--color-Filter-blue)] bg-opacity-40 z-0 pointer-events-none"></div>
          </div>
        )}
        <div className="absolute inset-0 flex flex-row flex-nowrap justify-evenly items-center z-1">
          <div className="flex flex-col items-start w-[60rem] justify-center gap-8 p-8 text-white">
            <h2 className="text-6xl">{devolutivas.subtitulo}</h2>
            <p className="text-2xl">{devolutivas.paragrafos}</p>
          </div>
          <div className="flex items-center bg-opacity-80 rounded-lg p-8">
            <CustomButton
              type="modal"
              onClick={() => setShowModal(true)}
              className="h-20 w-50 shadow-[0px_9px_20px_1px_#00000052] flex items-center justify-center flex-nowrap flex-col transition-all duration-[0.3s] ease-[ease-in-out] text-[var(--color-white)] cursor-pointer bg-[var(--color-cyan-medium)] p-8 rounded-2xl hover:-translate-y-2.5"
            >
              <p className="roboto-regular text-3xl">
                Saiba +
              </p>
            </CustomButton>
          </div>
          <div className="z-40">
            <ModalParticipacaoSocial
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              apresentacao={apresentacao}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
