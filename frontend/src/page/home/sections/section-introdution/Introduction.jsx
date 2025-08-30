import React from "react";
import video from "@/assets/video/video_introdutorio.mp4";
import logo_pdm_fbranco from "@/assets/svg/logo_pdm_fundo_branco.svg";

export default function Introduction() {
  return (
    <div>
      <section className="relative w-full h-[44rem] overflow-hidden">
        /* Video de fundo */
        <div>
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
          >
            <source src={video} type="video/mp4" />
          </video>
          {/* Filtro azul transparente */}
          <div className="absolute top-0 left-0 w-full h-full bg-[var(--color-Filter-blue)] bg-opacity-40 z-0 pointer-events-none"></div>
        </div>
        {/* Container principal com a logo */}
        <div className="absolute inset-0 flex flex-row flex-nowrap justify-evenly items-center z-10">
          <div className="flex items-center bg-opacity-80 rounded-lg p-8">
            <img
              src={logo_pdm_fbranco}
              alt="Logo"
              className="object-contain mr-8"
            />
          </div>
          <div className="flex items-center bg-opacity-80 rounded-lg p-8">
            <div className="bg-[var(--color-blue-light)] w-[40rem] h-[44rem] flex items-end justify-center flex-col flex-nowrap gap-16 p-4">
              <span className="text-white w-[28rem] text-3xl">
                <p className="w-60">
                  Um compromisso público do prefeito com a <strong>gestão eficiente <br></br> e de qualidade</strong>.
                </p>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
