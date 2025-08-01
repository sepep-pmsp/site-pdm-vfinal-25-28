import React, { useEffect, useState } from "react";
import { getRegionalizacaoData } from "../../services/Regonalizacao/getRegionalizacaoData";
import CustomButton from "@/components/Button/Button";

export default function Regionalizacao() {
  const [regionalizacao, setRegionalizacao] = useState(null);

  useEffect(() => {
    getRegionalizacaoData().then(setRegionalizacao).catch(console.error);
  }, []);

  if (!regionalizacao) return <div>Carregando...</div>;

  return (
    <div className="pt-20 px-4 mx-34">
      <div className="flex items-start justify-center flex-col flex-nowrap w-[90%]">
        <h1 className="text-[5rem] text-[var(--color-navy)]">
          {regionalizacao.titulo}
        </h1>
        <div className="h-1 w-[95rem] bg-[color:var(--color-navy)]"></div>
        <div className="flex flex-row flex-nowrap items-center gap-8 w-[100rem]">
          <div className="w-[35rem] flex flex-col items-start justify-center flex-nowrap gap-8 bg-[#EEF3F6] my-8 px-8 py-4">
            <div className="flex flex-col pt-10 gap-8">
              <div className="flex flex-row gap-4">
                <p className="text-5xl w-[23rem] pt-4 font-bold">{regionalizacao.subtitulo}</p>
              </div>
              <div className="flex flex-row gap-24">
                <p>{regionalizacao.paragrafo}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-nowrap gap-8">
              <div className="pb-12">
                <p className="text-2xl font-black w-[27rem]">
                  {regionalizacao.texto}
                </p>
              </div>
              <div className="w-60 h-20 absolute top-[57.5rem]">
                <CustomButton
                  type="download"
                  target={regionalizacao.download_arquivo}
                  className="all_buttons capitalize"
                >
                  <p className="text-xl font-black">DOWNLOAD</p>
                </CustomButton>
              </div>
            </div>
          </div>
          <div className="relative bg-white w-[70rem] h-[38rem] flex items-center justify-center shadow-[0px_0px_20px_0px_#00000080] rounded-[2rem] right-12 bottom-0">
            <iframe
              src={regionalizacao.link_dashboard}
              allowFullScreen
              loading="lazy"
              className="w-[95%] h-[95%] rounded-2xl"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
