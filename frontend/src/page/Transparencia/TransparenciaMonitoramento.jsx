import React, { useEffect, useState } from "react";
import { getTransparenciaData } from "../../services/Transparencia/getTransparenciaData";
import CustomButton from "@/components/Button/Button";

export default function TransparenciaMonitoramento() {
  const [transparencia, setTransparencia] = useState(null);

  useEffect(() => {
    getTransparenciaData().then(setTransparencia).catch(console.error);
  }, []);

  if (!transparencia) return <div>Carregando...</div>;

  return (
    <div className="pt-20 px-4 mx-34">
      <div className="flex items-start justify-center flex-col flex-nowrap w-[90%]">
        <h1 className="text-[5rem] text-[var(--color-navy)]">
          {transparencia.titulo}
        </h1>
        <div className="h-1 w-[95rem] bg-[color:var(--color-navy)]"></div>
      </div>
      <div className="p-8">
        <p className="font-black text-2xl w-[30rem]">
          {transparencia.descricao}
        </p>
      </div>

      <div className="flex justify-start items-center gap-16 relative w-[46rem] left-32">
        <div className="w-80">
          <ul className="flex flex-col gap-8">
            {transparencia.recursos.map((item, index) => (
              <li className="itemListCard text-xl" key={index}>
                {item.texto}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-12">
          {transparencia.recursos.map((item, index) => (
            <section className="h-20 w-[17rem]" key={index}>
              <CustomButton
                onClick={() => window.open(item.link, "_blank")}
                type="link"
                className="all_buttons uppercase"
              >
                <p className="text-xl font-black">{item.nome_btn}</p>
              </CustomButton>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
