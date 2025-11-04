import React from "react";
import CustomButton from "@/components/Button/Button";

export default function TransparenciaMobile({ transparencia }) {
  return (
    <div>
      <div className="pt-24 px-4 bg-white pb-12 z-50">
        <div className="max-lg:flex max-lg:items-center max-lg:justify-center max-lg:flex-col lg:flex items-start justify-center flex-col flex-nowrap w-[90%]">
          <h1 className="max-md:text-5xl md:text-7xl text-[var(--color-navy)] relative left-10 ">
            {transparencia.titulo}
          </h1>
          <div className="max-md:w-auto h-1 bg-[color:var(--color-navy)]"></div>
        </div>
        <div className="flex flex-col items-center pt-10 gap-8">
          {transparencia.recursos.map((item, index) => (
            <div key={index} className="flex flex-col gap-4 z-10">
              <h3 className="text-2xl w-75">{item.subtitulo}</h3>
              <p
                className="text-sm w-75"
                dangerouslySetInnerHTML={{ __html: item.paragrafo }}
              />
              {item.link && item.link.trim() !== "" && (
                <section className="max-xl:flex max-xl:flex-col max-xl:w-full md:h-20 w-[17rem]">
                  <CustomButton
                    onClick={() => window.open(item.link, "_blank")}
                    type="link"
                    className="all_buttons capitalize"
                  >
                    <p className="text-xl font-black">
                      {item.nome_btn}
                    </p>
                  </CustomButton>
                </section>
              )}
            </div>
          ))}
        </div>
      </div>
        <div className="lg:absolute text-transparent img-fundo"></div>
    </div>
  );
}
