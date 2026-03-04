import React, { useEffect, useState } from "react";
import CardHistorico from "../components/CardHistorico";
import { getHistoricoData } from "../services/getHistoricoData";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import CarrosselHistoricoMobile from "../components/CarrosselHistoricoMobile";

export default function Historico() {
    const isMobile = useIsMobile(850);
  const [historico, setHistorico] = useState(null);

  useEffect(() => {
    getHistoricoData().then(setHistorico).catch(console.error);
  }, []);

  if (!historico) return <div>Carregando...</div>;
  return (
    <div className="max-lg:h-auto max-xl:h-[75vh] xl:pt-20 px-4 historico-container h-[54rem] bg-white max-w-container">
      <div className="max-md:w-80 max-md:flex max-md:items-center lg:flex items-start justify-center flex-col flex-nowrap w-full pt-20">
        <h1 className="max-xl:text-4xl xl:text-[5rem] text-[var(--color-navy)]">{historico.titulo}</h1>
        <div className="w-full h-1 bg-[var(--color-navy)]"></div>
      </div>

      <div className="flex flex-row items-start flex-nowrap justify-start gap-35 container-historico-mobile">
        <div className="max-md:w-80 max-md:flex max-md:items-center lg:p-8 flex flex-col gap-8 div-conteudo-mobile w-full">
          <h2 className="text-4xl w-96">{historico.descricao}</h2>
          <p className="text-xl w-[25rem] p-div-historico-mobile">{historico.paragrafo}</p>
        </div>
        <div className="mb-16 h-auto">
            {isMobile ? (<CarrosselHistoricoMobile/>):(<CardHistorico />) }
        </div>
      </div>
    </div>
  );
}
