import React, { useEffect, useState } from "react";
import CardHistorico from "@/components/CardHistorico/CardHistorico";
import { getHistoricoData } from "@/services/Historico/getHistoricoData";
import { useIsMobile } from "@/hooks/useIsMobile";
import CarrosselHistoricoMobile from "@/components/CardHistorico/CarrosselHistoricoMobile";

export default function Historico() {
    const isMobile = useIsMobile(850);
  const [historico, setHistorico] = useState(null);

  useEffect(() => {
    getHistoricoData().then(setHistorico).catch(console.error);
  }, []);

  if (!historico) return <div>Carregando...</div>;
  return (
    <div className="max-lg:h-auto max-xl:h-[75vh] xl:pt-20 px-4 historico-container h-[54rem] bg-white" style={{ maxWidth: "1358px", height:"auto", margin: "0 auto" }}>
      <div className="max-md:w-80 max-md:flex max-md:items-center lg:flex items-start justify-center flex-col flex-nowrap w-[90%] pt-20">
        <h1 className="max-xl:text-4xl xl:text-[5rem] text-[var(--color-navy)]">{historico.titulo}</h1>
        <div className="max-md:w-full h-1 max-md:left-0 max-2xl:left-2 max-2xl:hidden lg:h-1 w-[89rem] left-0 relative bg-[var(--color-navy)]"></div>
      </div>

      <div className="flex flex-row items-start flex-nowrap justify-start gap-35 container-historico-mobile">
        <div className="max-md:w-80 max-md:flex max-md:items-center lg:p-8 flex flex-col gap-8 div-conteudo-mobile">
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
