import React, { useEffect, useState } from "react";
import { getTransparenciaData } from "@/features/Transparencia/services/getTransparenciaData";
import CustomButton from "@/shared/components/ui/Button";

export default function TransparenciaMonitoramento() {
  const [transparencia, setTransparencia] = useState(null);

  useEffect(() => {
    getTransparenciaData().then(setTransparencia).catch(console.error);
  }, []);

  if (!transparencia) return <div>Carregando...</div>;

  return (
    <div className="py-20 px-4 h-auto" style={{ maxWidth: "1458px", height: "auto", margin: "0 auto" }}>
      <div className="flex items-start justify-center flex-col flex-nowrap w-[90%]">
        <h1 className="text-[5rem] text-[var(--color-navy)] title-mobile ">
          {transparencia.titulo}
        </h1>
        <div className="h-1 w-full bg-[color:var(--color-navy)]"></div>
      </div>
      <div className="flex flex-col lg:flex-row pt-10 gap-8 justify-between items-start">
        {transparencia.recursos.map((item, index) => (
          <div key={index} className="flex flex-col gap-6 flex-1 max-w-[30rem]">
            <h3 className="text-2xl min-h-[4rem]">
              {item.subtitulo}
            </h3>
            <p className="text-sm text-[17px] leading-relaxed"dangerouslySetInnerHTML={{ __html: item.paragrafo }}/>
            <div className="mt-4 custom-btn-mobile">
              {item.link && item.link.trim() !== "" ? (
                <section className="h-20 w-[17rem]">
                  <CustomButton
                    onClick={() => window.open(item.link, "_blank")}
                    type="link"
                    className="all_buttons capitalize"
                  >
                    <p className="text-xl font-black p-custom-btn-mobile">
                      {item.nome_btn}
                    </p>
                  </CustomButton>
                </section>
              ) : (
                null
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute text-transparent img-fundo"></div>
    </div>
  );
}