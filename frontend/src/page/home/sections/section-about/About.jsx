import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Matarazzo from "@/assets/svg/foto_matarazzo.svg";
import CustomButton from "@/components/Button/Button";
import ModalPrefeito from "@/components/ModalPrefeito/ModalPrefeito";
import { getAboutData } from "@/services/home/getAboutData";

export default function About() {
  const [about, setAbout] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };

  useEffect(() => {
    getAboutData().then(setAbout).catch(console.error);
  }, []);

  if (!about) return <div>Carregando...</div>;

  return (
    <div className="my-34 relative">
      <section>
        <div>
          <div className="my-8">
            <h2 className="text-8xl text-[var(--color-navy)]">
              {about.titulo}
            </h2>
            <div className="linha"></div>
          </div>

          <div className="my-4 flex items-center flex-nowrap relative top-8">
            <div className="flex justify-end items-center">
              <img className="w-[85%]" src={Matarazzo} alt="" />
            </div>
            <div className="bg-[color:var(--color-navy)] h-[35rem] w-[45rem] py-4 px-10 rounded-tr-3xl rounded-br-3xl flex items-start flex-col justify-center gap-8">
              <h3 className="text-white text-6xl">{about.subtitulo}</h3>
              <p className="text-white text-3xl">{about.paragrafo}</p>
            </div>
          </div>

          {/* Botão Saiba+ */}
          <div className="w-48 relative h-20 left-[75rem] bottom-[2.5rem]">
            <CustomButton
              type="link"
              className="all_buttons uppercase"
              onClick={() => goTo("/sobre")}
            >
              <p className="btn-about">saiba +</p>
            </CustomButton>
          </div>

          {/* Botão que abre modal */}
          <div className="w-48 relative h-20 left-[57rem] bottom-[7.5rem]">
            <CustomButton
              type="modal"
              onClick={() => setShowModal(true)}
              className="all_buttons uppercase"
            >
              <p>
                palavra do prefeito <br /> <strong>leia aqui!</strong>
              </p>
            </CustomButton>
          </div>
        </div>
        <div className="linha"></div>
      </section>
      <ModalPrefeito
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        carta={about.carta_prefeito}
      />
    </div>
  );
}
