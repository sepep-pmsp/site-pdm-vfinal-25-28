import React from "react";

export default function ListaMetas({ metas, onSelectMeta }) {
  return (
    <div>
      <div className="flex flex-col flex-nowrap justify-center items-stretch w-[35rem]">
        {metas.map((meta) => (
          <div
            key={meta.id}
            className="cursor-pointer p-6 flex flex-row items-center gap-4 hover:scale-105 transition-transform"
            onClick={() => onSelectMeta(meta)}
          >
            <div>
              <div className="h-[0.5px] bg-[black] w-full"></div>
              <div className="flex items-center justify-start flex-row flex-nowrap gap-12">
                <span
                  className="text-8xl font-light"
                  style={{
                    color:
                      meta.botao?.cor_secundaria_eixo || meta.cor_principal_eixo
                  }}
                >
                  {meta.numeroMeta}
                </span>
                <p
                  className="text-xl leading-snug"
                  dangerouslySetInnerHTML={{ __html: meta.titulo_eixo }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
