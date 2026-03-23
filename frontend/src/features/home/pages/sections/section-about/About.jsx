import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Matarazzo from "@/shared/assets/svg/foto_matarazzo.svg";
import CustomButton from "@/shared/components/ui/Button";
import ModalPrefeito from "../../../components/ModalPrefeito";
import { getAboutData } from "../../../services/getAboutData";

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
    <div className="px-4 max-w-container">
      <div className="flex flex-col items-start justify-start gap-6 my-2 w-full">
        <div className="w-full flex flex-col items-start">
          <h2 className="text-4xl w-60 text-[var(--color-navy)] lg:w-full lg:text-8xl lg:relative lg:left-8">
            {about.titulo}
          </h2>
          <div className="h-1 w-full bg-[var(--color-navy)] my-2"></div>
        </div>
        <div className="flex flex-col items-start justify-start w-full md:flex md:flex-row md:items-center md:justify-center md:flex-nowrap">
          <img
            className="w-xs md:w-sm lg:w-lg xl:w-xl"
            src={Matarazzo}
            alt=""
          />
          <div
            className="bg-[color:var(--color-navy)] text-white w-40 rounded-e-3xl max-sm:w-xs max-sm:relative max-sm:-top-16 lg:w-md xl:w-xl xl:h-126 2xl:flex 2xl:flex-col 2xl:items-center 2xl:justify-center">
            <h3 className="py-2 px-6 text-xl w-xs md:text-3xl xl:text-4xl lg:w-md xl:w-xlw-lg">
              {about.subtitulo}
            </h3>
            <p className="py-2 roboto-regular text-sm w-xs px-6 lg:text-xl lg:w-md xl:w-xlw-lg xl:text-2xl">
              {about.paragrafo}
            </p>
            <div className="flex flex-row items-start justify-start gap-4 w-full max-sm:justify-start max-sm:gap-8 max-sm:relative max-sm:top-10 md:justify-center md:relative md:top-10 xl:top-15">
              <div className="w-28 h-20 md:w-38 lg:w-48">
                <CustomButton
                  type="link"
                  className="all_buttons uppercase"
                  onClick={() => goTo("/sobre")}
                >
                  <p className="btn-about">saiba +</p>
                </CustomButton>
              </div>

              {/* Botão que abre modal */}
              <div className="w-28 h-20 md:w-38 lg:w-48">
                <CustomButton type="modal" onClick={() => setShowModal(true)} className="all_buttons uppercase">
                  <p className="roboto-regular">
                    palavra do prefeito <br />{" "}
                    <strong className="roboto-black">leia aqui!</strong>
                  </p>
                </CustomButton>
              </div>
              {about.link_pdf_about && (
                <div className="w-28 h-20 md:w-38 lg:w-48">
                    <CustomButton
                    type="link"
                    className="all_buttons uppercase"
                    onClick={() => window.open(about.link_pdf_about, "_blank")}
                    >
                    <p className="roboto-black">Balanço<br/>2025</p>
                    </CustomButton>
                </div>
                )}
            </div>
          </div>
        </div>
        <ModalPrefeito isOpen={showModal} onClose={() => setShowModal(false)} carta={about.carta_prefeito}/>
        <div className="h-1 w-full bg-[var(--color-navy)] my-2 md:relative md:top-5"></div>
      </div>
    </div>
  );
}