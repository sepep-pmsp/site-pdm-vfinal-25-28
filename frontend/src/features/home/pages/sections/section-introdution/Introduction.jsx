import React from "react";
import video from "@/shared/assets/video/video_introdutorio.mp4";
import logo_pdm_fbranco from "@/shared/assets/svg/logo_pdm_fundo_branco.svg";

export default function Introduction() {
  return (
    <div>
      <section className="relative w-full h-[44rem] overflow-hidden">
        <div>
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0 select-none pointer-events-none"
            autoPlay
            loop
            muted
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
        {/* Container principal com a logo */}
        <div className="absolute inset-0 flex flex-row flex-nowrap justify-evenly items-center z-10 introducao-mobile" style={{ maxWidth: "1458px", margin: "0 auto" }}>
          <div className="flex items-center bg-opacity-80 rounded-lg p-8 intro-mobile-banner-img">
            <img
              src={logo_pdm_fbranco}
              alt="Logo"
              className="object-contain mr-8 introducao-mobile-banner-img"
            />
          </div>
          <div className="flex items-center bg-opacity-80 rounded-lg p-8 introducao-mobile-banner">
            <div className="bg-[var(--color-blue-light)] xl:w-[40rem] h-[44rem] flex items-end justify-center flex-col flex-nowrap gap-16 p-4 introducao-mobile-banner-fundo">
              <span className="text-white w-[25rem] text-3xl">
                <p className="w-60 introducao-mobile-p">
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
