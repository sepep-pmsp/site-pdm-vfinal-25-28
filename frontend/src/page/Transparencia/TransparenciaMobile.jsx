import React from "react";
import CustomButton from "@/components/Button/Button";

export default function TransparenciaMobile({ transparencia }) {
  return (
    <div>
      <div className="pt-20 px-4 mx-34 transparencia-monitoramento-container-mobile bg-white pb-12">
        <div className="flex items-start justify-center flex-col flex-nowrap w-[90%]">
          <h1 className="text-[5rem] text-[var(--color-navy)] title-mobile">
            {transparencia.titulo}
          </h1>
          <div className="max-md:w-auto h-1 bg-[color:var(--color-navy)]"></div>
        </div>
        <div className="flex flex-col pt-10 gap-8">
          {transparencia.recursos.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h3 className="text-2xl">{item.subtitulo}</h3>
              <p
                className="text-sm text-[17px]"
                dangerouslySetInnerHTML={{ __html: item.paragrafo }}
              />
              {item.link && item.link.trim() !== "" && (
                <section className="h-20 w-[17rem] custom-btn-mobile">
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
              )}
            </div>
          ))}
        </div>
        <div className="absolute text-transparent img-fundo"></div>
      </div>
    </div>
  );
}
