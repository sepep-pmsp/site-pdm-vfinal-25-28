import React from 'react'
import CustomButton from "@/components/Button/Button";
import bgImage from "@/assets/svg/capa-pg-sobre.png";
import logo from "/svg/Logo-pdm-letras.svg"

export default function SectionIntroSobre({sobre, setSelectedButton, selectedButton}) {
  const { banner } = sobre;
  const buttonsData = [
    { label: "o que é?", message: banner.o_que },
    { label: "por quê?", message: banner.por_que },
    { label: "para quem ?", message: banner.para_quem },
  ];

  return (
    <div>
      <section className="relative w-full h-[98vh] overflow-hidden">
        <div>
          <img
            className="absolute top-[-10rem]"
            src={bgImage}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[#120e49d9] z-0 pointer-events-none"></div>
        </div>
        <div className="absolute inset-0 flex items-start justify-between flex-nowrap z-10 px-20 top-50 mx-24">
          <div className="flex flex-col flex-nowrap items-start justify-center gap-20">
            <div className="flex flex-col items-start text-white gap-8">
              <p className="text-4xl">{banner.supertitulo}</p>
              {/* Supondo que logo e logoAlt ainda existam */}
              <img src={logo} />
              <p className="text-3xl break-all w-150">{banner.subtitulo}</p>
            </div>
            <div className="flex flex-col items-start justify-center gap-12">
              <div className="text-white">
                {/* A API não tem 'section_titulo', então você pode usar um texto fixo ou remover */}
                <h3 className="text-4xl">descubra o pdm:</h3>
              </div>
              <div className="flex flex-row gap-11">
                <div className="flex gap-6">
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
                <div className="w-[45rem] text-white absolute text-2xl left-[55rem] top-[25rem]">
                  {selectedButton !== null && (
                    <p
                      key={selectedButton}
                      className="transition-opacity duration-500 ease-in-out opacity-100"
                    >
                      {buttonsData[selectedButton].message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <CustomButton
              type="download"
              // Acessando o novo link do PDF
              target={banner.link_pdf}
              onClick={() => window.open(banner.link_pdf, "_blank")}
              className="h-44 w-72 shadow-[0px_9px_20px_1px_#00000052] flex items-center justify-center flex-nowrap flex-col transition-all duration-[0.3s] ease-[ease-in-out] text-[color:var(--color-white)] cursor-pointer bg-[color:var(--color-cyan-medium)] p-8 rounded-2xl hover:-translate-y-2.5"
            >
              <p className="text-2xl uppercase text-white">
                <b>baixar o pdf</b>
                <br></br> do Programa<br></br>de metas
              </p>
            </CustomButton>
          </div>
        </div>
      </section>
    </div>
  )
}