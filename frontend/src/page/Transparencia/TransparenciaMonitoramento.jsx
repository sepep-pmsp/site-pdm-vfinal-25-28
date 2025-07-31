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

      <div className="flex flex-col pt-10 gap-8">
        <div className="flex flex-row gap-4">
          {transparencia.recursos.map((item, index) => (
            <h3 className="text-2xl w-[30rem]" key={index}>
              {item.subtitulo}
            </h3>
          ))}
        </div>
        <div className="flex flex-row gap-24">
          {transparencia.recursos.map((item, index) => (
            <p
              className="text-sm w-[25rem] text-[17px]"
              key={index}
              dangerouslySetInnerHTML={{ __html: item.paragrafo }}
            ></p>
          ))}
        </div>
        <div className="flex flex-row gap-[17rem]">
          {transparencia.recursos.map((item, index) => (
            <section className="h-20 w-[17rem]" key={index}>
              <CustomButton
                onClick={() => window.open(item.link, "_blank")}
                type="link"
                className="all_buttons capitalize"
              >
                <p className="text-xl font-black">{item.nome_btn}</p>
              </CustomButton>
            </section>
          ))}
        </div>
      </div>
      <div className="absolute text-transparent img-fundo"></div>
    </div>
  );
}
