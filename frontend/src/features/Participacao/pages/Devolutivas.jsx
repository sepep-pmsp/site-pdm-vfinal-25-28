import React, { useState } from "react";
import CustomButton from "@/shared/components/ui/Button";
import ModalParticipacaoSocial from "../components/ModalParticipacaoSocial";
import { corrigirUrlImagem } from "@/shared/utils/imageUtils";
import SafeSVG from "@/shared/components/ui/SafeSVG";

export default function Devolutivas({ devolutivas, apresentacao }) {
  const [showModal, setShowModal] = useState(false);

  if (!devolutivas) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="py-8">
      <div className="rotate-[0deg] bg-[var(--color-cyan-dark)] text-white left-[-1rem] relative w-80 h-28 rounded-tr-4xl rounded-br-4xl max-md:top-[40rem] max-lg:top-[30rem] max-xl:top-[41rem] xl:w-[27rem] xl:h-44 xl:-left-40 xl:top-[55.3rem] xl:rotate-[270deg] xl:absolute xl:flex xl:items-center xl:flex-col xl:justify-end xl:rounded-br-4xl xl:rounded-bl-4xl xl:shadow-[-4px_2px_20px_0px_gray] xl:z-1">
        <h1 className="max-md:text-white max-md:left-0 max-md:top-5 max-xl:top-5 max-xl:left-0 lg:text-white text-7xl px-6 relative left-5 bottom-4">
          Devolutivas
        </h1>
      </div>
      <section className="relative w-full overflow-hidden bottom-32 max-md:min-h-screen xl:relative xl:bottom-0">
        {devolutivas.imagem_fundo && (
          <div className="relative w-full max-h-screen">
            <SafeSVG src={corrigirUrlImagem(devolutivas.imagem_fundo)} className="max-md:min-h-[70vh] max-md:w-full max-xl:min-h-[47vh] lg:w-full min-h-[70vh] w-full object-cover max-md:hidden" />
            <div className="absolute top-0 left-0 w-full h-full bg-[var(--color-blue-light)] bg-opacity-40 z-0 pointer-events-none"></div>
          </div>
        )}
        <div className="absolute inset-0 z-1 max-w-container w-full flex flex-col lg:flex-row items-center md:justify-between">
          <div className="max-md:w-80 lg:flex flex-col items-start w-[60rem] justify-center gap-8 p-8 text-white relative left-12 max-md:left-0">
            <h2 className="max-md:text-3xl lg:text-6xl">{devolutivas.subtitulo}</h2>
            <p className="max-md:text-base lg:text-2xl max-md:!pt-8">{devolutivas.paragrafos}</p>
          </div>
          <div className="flex items-center bg-opacity-80 rounded-lg p-8">
            <CustomButton type="modal" onClick={() => setShowModal(true)} className="h-20 w-50 shadow-[0px_9px_20px_1px_#00000052] flex items-center justify-center flex-nowrap flex-col transition-all duration-[0.3s] ease-[ease-in-out] text-[var(--color-white)] cursor-pointer bg-[var(--color-cyan-medium)] p-8 rounded-2xl hover:-translate-y-2.5">
              <p className="roboto-regular uppercase text-3xl">Saiba +</p>
            </CustomButton>
          </div>
          <div className="z-40">
            <ModalParticipacaoSocial isOpen={showModal} onClose={() => setShowModal(false)} apresentacao={apresentacao}/>
          </div>
        </div>
      </section>
    </div>
  );
}