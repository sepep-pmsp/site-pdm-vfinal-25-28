import React, { useEffect, useState } from "react";
import CardHistorico from "@/components/CardHistorico/CardHistorico";
import { getHistoricoData } from "@/services/Historico/getHistoricoData";

export default function Historico() {
  const [historico, setHistorico] = useState(null);

  useEffect(() => {
    getHistoricoData().then(setHistorico).catch(console.error);
  }, []);

  if (!historico) return <div>Carregando...</div>;
  return (
    <div className="pt-20 px-4 mx-34">
      <div className="flex items-start justify-center flex-col flex-nowrap w-[90%]">
        <h1 className="text-[5rem] text-[var(--color-navy)]">{historico.titulo}</h1>
        <div className="h-1 w-[95rem] bg-[color:var(--color-navy)]"></div>
      </div>

      <div className="flex flex-row items-start flex-nowrap justify-start gap-35">
        <div className="p-8 flex flex-col gap-8">
          <h2 className="text-4xl w-96">{historico.descricao}</h2>
          <p className="text-xl w-[25rem]">{historico.paragrafo}</p>
        </div>
        <div>
          <CardHistorico />
        </div>
      </div>
    </div>
  );
}
