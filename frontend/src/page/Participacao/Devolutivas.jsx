import React, { useState } from "react";
import CustomButton from "@/components/Button/Button";
import ModalParticipacaoSocial from "@/components/ModalParticipacaoSocial/ModalParticipacaoSocial";
import { corrigirUrlImagem } from "@/utils/imageUtils";
import SafeSVG from "@/components/SafeSVG/SafeSVG";

export default function Devolutivas({ devolutivas, apresentacao }) {
  const [showModal, setShowModal] = useState(false);

  if (!devolutivas) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="py-8">
      <div className="bg-[var(--color-cyan-dark)] w-[27rem] h-44 right-[104rem] top-[55.3rem] rotate-[270deg] absolute flex items-center flex-col justify-end p-4 rounded-br-4xl rounded-bl-4xl shadow-[-4px_2px_20px_0px_gray] z-1 banner-participacao-mobile">
        <h1 className="max-md:text-white max-md:left-2 max-md:bottom-0 lg:text-white text-7xl px-6 relative left-5 bottom-4">
          Devolutivas
        </h1>
      </div>
      <section className="relative w-full overflow-hidden max-md:min-h-screen max-md:bottom-28">
        {devolutivas.imagem_fundo && (
          <div className="relative w-full max-h-screen">
            <SafeSVG
              src={corrigirUrlImagem(devolutivas.imagem_fundo)}
              className="max-md:min-h-[91vh] max-md:w-full lg:w-full min-h-[73vh] object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-[var(--color-blue-light)] bg-opacity-40 z-0 pointer-events-none"></div>
          </div>
        )}
        <div className="absolute inset-0 z-1 mx-0 flex flex-col items-start justify-start flex-nowrap md:flex-row md:justify-evenly md:items-center">
          <div className="max-md:w-80 lg:flex flex-col items-start w-[60rem] justify-center gap-8 p-8 text-white relative left-12">
            <h2 className="max-md:text-3xl lg:text-6xl">{devolutivas.subtitulo}</h2>
            <p className="max-md:text-xl lg:text-2xl">{devolutivas.paragrafos}</p>
          </div>
          <div className="flex items-center bg-opacity-80 rounded-lg p-8">
            <CustomButton
              type="modal"
              onClick={() => setShowModal(true)}
              className="h-20 w-50 shadow-[0px_9px_20px_1px_#00000052] flex items-center justify-center flex-nowrap flex-col transition-all duration-[0.3s] ease-[ease-in-out] text-[var(--color-white)] cursor-pointer bg-[var(--color-cyan-medium)] p-8 rounded-2xl hover:-translate-y-2.5"
            >
              <p className="roboto-regular uppercase text-3xl">Saiba +</p>
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