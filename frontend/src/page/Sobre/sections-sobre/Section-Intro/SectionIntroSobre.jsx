import React from "react";
import CustomButton from "@/components/Button/Button";
import bgImage from "@/assets/svg/capa-pg-sobre.png";
import logo from "/svg/Logo-pdm-letras.svg";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function SectionIntroSobre({
  sobre,
  setSelectedButton,
  selectedButton
}) {
  const isMobile = useIsMobile(1026);
  const { banner } = sobre;
  const buttonsData = [
    { label: "o que é?", message: banner.o_que },
    { label: "por quê?", message: banner.por_que },
    { label: "para quem?", message: banner.para_quem }
  ];

  return (
    <div>
      <section className={`relative w-full flex min-h-full overflow-hidden transition-all duration-500 section-mobile-about ${selectedButton !== null ? "max-lg:h-[175vh]" : "max-lg:h-[140vh]"} xl:h-[87vh] lg:h-[75vh]`}>
        <div>
          <img
            className="max-xl:hidden xl:absolute top-[-10rem] object-cover object-top"
            src={bgImage}
          />
          {isMobile ? (
            <div className="absolute top-0 left-0 w-full h-full bg-[#292561] z-0 pointer-events-none"></div>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-[#04003bda] z-0 pointer-events-none"></div>
          )}
        </div>
        <div className="absolute inset-0 z-10 top-20 flex flex-row justify-center items-start gap-8 max-md:flex-col max-md:items-center max-md:justify-evenly max-lg:flex-row max-lg:items-center max-xl:items-center max-xl:justify-start max-xl:gap-2 max-xl:top-2 max-md:left-8" style={{ maxWidth: "1415px", height:"auto", margin: "0 auto" }}>
          <div className="flex flex-col flex-nowrap items-start justify-center gap-20">
            <div className="flex flex-col items-start text-white gap-8">
              <p className="text-4xl">{banner.supertitulo}</p>
              <img
                className="max-md:w-60 max-xl:w-full max-xl:max-w-[25rem] max-xl:h-auto"
                src={logo}
              />
              <p className="text-3xl break-all pr-10 max-xl:text-lg max-xl:w-full max-xl:max-w-xs max-xl:leading-normal max-xl:text-left xl:w-[57rem]">
                {banner.subtitulo}
              </p>
            </div>
            <div className="flex flex-col items-start justify-center gap-12 max-xl:flex max-xl:flex-col max-xl:gap-6 max-xl:items-start max-xl:flex-wrap max-xl:mt-12">
              <div className="text-white">
                <h3 className="text-4xl">descubra o pdm:</h3>
              </div>
              <div className="flex flex-row gap-11 max-xl:flex max-xl:flex-col max-xl:gap-4 max-xl:w-[62%] max-xl:items-center">
                <div className="flex gap-6 max-xl:flex max-xl:flex-col max-xl:flex-wrap max-xl:items-center max-xl:justify-center">
                  {buttonsData.map((btn, index) => {
                    const isSelected = selectedButton === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedButton(index)}
                        className={`text-2xl border-2 rounded-4xl py-2 px-4 uppercase font-bold transition-colors duration-300`}
                        style={{
                          width: "200px",
                          height: "60px",
                          backgroundColor: isSelected
                            ? "#0E7BA8"
                            : "transparent",
                          color: "#fff",
                          borderColor: "#fff"
                        }}
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </div>
                <div className="w-[45rem] text-white absolute text-2xl left-[59rem] top-[25rem] max-xl:relative max-xl:w-80 max-xl:left-12 max-xl:top-0 max-2xl:left-[44rem]">
                  {selectedButton !== null && (
                    <p
                      key={selectedButton}
                      className="transition-opacity duration-500 ease-in-out opacity-100 xl:w-[30rem]"
                    >
                      {buttonsData[selectedButton].message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="max-xl:w-full max-xl:max-w-xs max-xl:h-auto max-xl:text-xl max-xl:relative max-xl:px-8 max-xl:py-6 max-xl:top-0">
            <CustomButton
              type="download"
              target={banner.link_pdf}
              onClick={() => window.open(banner.link_pdf, "_blank")}
              className="h-24 w-42 shadow-[0px_9px_20px_1px_#00000052] flex items-center justify-center flex-nowrap flex-col transition-all duration-[0.3s] ease-[ease-in-out] text-[color:var(--color-white)] cursor-pointer bg-[color:var(--color-cyan-medium)] p-8 rounded-2xl hover:-translate-y-2.5 md:h-44 md:w-72"
            >
              <p className="text-sm uppercase text-white md:text-2xl ">
                <b>baixar o pdf</b>
                <br></br> do Programa<br></br>de metas
              </p>
            </CustomButton>
          </div>
        </div>
      </section>
    </div>
  );
}
