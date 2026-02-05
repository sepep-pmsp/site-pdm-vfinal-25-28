import React from "react";
import { corrigirUrlImagem } from "@/shared/utils/imageUtils";
import SafeSVG from "@/shared/components/ui/SafeSVG";

export default function MetaModalRegionalizacao({ meta }) {
  if (!meta?.card?.regionalizacao) return null;

  const reg = meta.card.regionalizacao;
  const normalize = (s) =>
    (s || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const status = normalize(reg.status_regionalizacao);
  const isNaoRegionalizavel = 
    status === "nao regionalizavel" || 
    status === "nao regionalizável";

  const imagemUrl = reg.imagem || reg.mapa_file || reg.map_image || null;
  const legenda = reg.map_legenda || reg.indicador_legenda || null;
  const rodape = reg.map_rodape || reg.nota_rodape || null;
  
  const corPrincipal = meta.card.eixo_cor_principal;

  return (
    <div className="flex flex-col items-center justify-center w-full px-2">
      <div className="w-full h-2" style={{ backgroundColor: corPrincipal }}/>
      <div className="flex flex-col flex-nowrap items-start justify-around gap-8 py-12 shadow-[1px_8px_20px_#00000080] m-8 p-8 rounded-[2rem] border-solid w-full bg-white">
        <div className="flex flex-col flex-nowrap items-start justify-center gap-12">
          <h3 style={{ color: corPrincipal }} className="text-4xl font-semibold">
            Regionalização
          </h3>
          
          {isNaoRegionalizavel && (
            <p className="font-bold text-lg capitalize">
              {reg.status_regionalizacao}
            </p>
          )}
          
          {reg.nota_regionalizacao && (
            <p className="font-bold text-lg">
              {reg.nota_regionalizacao}
            </p>
          )}
        </div>

        {legenda && (
          <figcaption className="text-2xl text-center underline" aria-hidden="true">
            {legenda}
          </figcaption>
        )}

        <div className="flex items-center justify-center w-full">
            {imagemUrl && (
            <div style={{ border: `3px solid ${corPrincipal}`,padding: `1rem`,borderRadius: `2rem`,height: `auto`,display: "flex",alignItems: "center",justifyContent: "center",}} className="flex items-center justify-center">
                <SafeSVG
                src={corrigirUrlImagem(imagemUrl)}
                alt="Mapa da regionalização"
                className="mt-4 rounded-xl h-auto "
                />
            </div>
            )}
        </div>

        {rodape && (
          <div className="text-xl mt-2 text-justify italic w-6/12" style={{ color: "#444" }}>
            {">> "}{rodape}
          </div>
        )}
      </div>
    </div>
  );
}