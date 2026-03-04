import React, { useEffect, useState } from "react";
import { getRegionalizacaoData } from "@/features/Regionalizacao/services/getRegionalizacaoData";

export default function Regionalizacao() {
  const [regionalizacao, setRegionalizacao] = useState(null);

  useEffect(() => {
    getRegionalizacaoData().then(setRegionalizacao).catch(console.error);
  }, []);

  if (!regionalizacao) return <div>Carregando...</div>;

  return (
    <div className="pt-20 px-4 h-full lg:h-[63rem] max-w-container">
      <div className="lg:flex lg:items-start lg:justify-center lg:flex-col lg:flex-nowrap lg:w-full">
        <h1 className="lg:text-7xl text-5xl text-[var(--color-navy)] ">
          {regionalizacao.titulo}
        </h1>
        <div className="max-md:w-full lg:h-1 lg:w-full lg:bg-[color:var(--color-navy)] mb-8"></div>
        <div className="flex flex-col-reverse flex-nowrap justify-center items-center gap-8 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-8 lg:w-full max-md:relative max-md:top-10 max-sm:h-250">
          <div className="bg-[#EEF3F6] my-8 px-8 py-4 max-sm:w-80 max-sm:h-auto lg:w-[30rem] lg:flex lg:flex-col lg:items-start lg:justify-center lg:flex-nowrap lg:gap-8">
            <div className="max-md:w-60 lg:flex flex-col pt-10 gap-8">
              <div className="lg:flex flex-row gap-4">
                <p className="font-black pb-5 max-md:text-3lg max-md:w-70 lg:text-5xl w-[23rem] pt-4 ">{regionalizacao.subtitulo}</p>
              </div>
              <div className="max-md:w-70 lg:flex flex-row gap-24">
                <p>{regionalizacao.paragrafo}</p>
              </div>
            </div>
            <div className="max-md:w-70 lg:flex flex-col items-center justify-center flex-nowrap gap-8">
              <div className="max-md:tirar-padding lg:pb-12">
                <p className="text-2lg font-black w-[27rem]">
                  {regionalizacao.texto}
                </p>
              </div>
              <div className="hidden">
                {/* <CustomButton
                  type="download"
                  target={regionalizacao.link_arquivo}
                  className="all_buttons capitalize"
                  className="w-60 h-20 absolute top-[55rem] aqui é da div a cima"
                >
                  <p className="text-lg font-black">DOWNLOAD</p>
                </CustomButton> */}
              </div>
            </div>
          </div>
          <div className="pt-8 bg-white shadow-[0px_0px_20px_0px_#00000080] rounded-4xl lg:relative lg:bg-white lg:w-[60rem] lg:h-[38rem] lg:flex lg:items-center lg:justify-center lg:shadow-[0px_0px_20px_0px_#00000080] lg:rounded-4xl  lg:right-12 lg:bottom-0 mb-8">
            <iframe
              src={regionalizacao.link_dashboard}
              allowFullScreen
              loading="lazy"
              className="rounded-4xl lg:w-[95%] lg:h-[95%] lg:rounded-2xl"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
