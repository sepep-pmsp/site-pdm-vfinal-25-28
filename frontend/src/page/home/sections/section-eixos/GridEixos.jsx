import React, { useState, useEffect, useRef } from "react";
import CardEixos from "./CardEixos";
import { getEixosData } from "@/services/home/getEixosData";
import Universo_SP from "@/assets/svg/universo_sp.svg";
import Viver_SP from "@/assets/svg/viver_sao_paulo.svg";
import Capital_Futuro from "@/assets/svg/capital_do_futuro.svg";
import Cidade_Empreendedora from "@/assets/svg/cidade_empreendedora.svg";
import Universo_SP_colorido from "@/assets/svg/universo_sp_colorido.svg";
import Viver_SP_colorido from "@/assets/svg/viver_sp_colorido.svg";
import Capital_Futuro_colorido from "@/assets/svg/capital_futuro_colorido.svg";
import Cidade_Empreendedora_colorido from "@/assets/svg/cidade_empreendedora_colorido.svg";

export default function GridEixos({ eixoSelecionadoDoMenu }) {
  const [selectedEixo, setSelectedEixo] = useState(null);
  const [hovered, setHovered] = useState("");
  const [eixosTematicos, setEixosTematicos] = useState([]);
  const sectionRef = useRef(null);

  React.useEffect(() => {
    getEixosData().then((data) => {
      setEixosTematicos(data);
    });
  }, []);

  useEffect(() => {
    if (!eixoSelecionadoDoMenu || eixosTematicos.length === 0) return;

    const eixo = eixosTematicos.find((e) =>
      e.nome.toLowerCase().includes(eixoSelecionadoDoMenu.toLowerCase())
    );

    if (eixo) {
      setSelectedEixo(eixo);
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [eixoSelecionadoDoMenu, eixosTematicos]);

  const handleClick = (nomeChave, event) => {
    const eixoSelecionado = eixosTematicos.find((eixo) =>
      eixo.nome.toLowerCase().includes(nomeChave)
    );
    setSelectedEixo(eixoSelecionado);
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    setSelectedEixo({
      ...eixoSelecionado,
      origin: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }
    });
  };
  return (
    <div
      ref={sectionRef}
      id="eixos"
      className="flex items-center h-[42rem] justify-center pl-36"
    >
      <div className=" grid grid-cols-[repeat(2,1fr)] items-center h-[40rem] content-center justify-center p-2 w-[85rem] gap-8">
        <div
          className="flex items-center justify-center bg-[var(--color-green)] transition-all duration-[0.3s] ease-in-out card-hover card-hover-green h-70 rounded-tl-[2.5rem] gap-38"
          onMouseEnter={() => setHovered("universo")}
          onMouseLeave={() => setHovered("")}
          onClick={(e) => handleClick("universo", e)}
        >
          <img
            src={hovered === "universo" ? Universo_SP_colorido : Universo_SP}
            alt=""
            className="relative right-40"
          />
          <p className="w-38 text-3xl uppercase text-white text-hover-green absolute left-[52rem] top-[138rem]">
            {
              eixosTematicos.find((eixo) =>
                eixo.nome.toLowerCase().includes("universo")
              )?.titulo
            }
          </p>
        </div>
        <div
          className="flex items-center justify-center bg-[var(--color-blue)] card-hover card-hover-blue h-70 rounded-tr-[2.5rem] gap-38"
          onMouseEnter={() => setHovered("cidade")}
          onMouseLeave={() => setHovered("")}
          onClick={(e) => handleClick("cidade", e)}
        >
          <img
            src={
              hovered === "cidade"
                ? Cidade_Empreendedora_colorido
                : Cidade_Empreendedora
            }
            alt=""
            className="relative right-31"
          />
          <p className="w-45 text-3xl uppercase text-white text-hover-blue absolute left-[92rem] top-[138rem]">
            {
              eixosTematicos.find((eixo) =>
                eixo.nome.toLowerCase().includes("cidade")
              )?.titulo
            }
          </p>
        </div>
        <div
          className="flex items-center justify-center bg-[var(--color-orange-red)] card-hover card-hover-purple h-70 rounded-bl-[2.5rem] gap-38"
          onMouseEnter={() => setHovered("viver")}
          onMouseLeave={() => setHovered("")}
          onClick={(e) => handleClick("viver", e)}
        >
          <img
            src={hovered === "viver" ? Viver_SP_colorido : Viver_SP}
            alt=""
            className="relative right-40"
          />
          <p className="w-40 text-3xl uppercase text-white text-hover-orange absolute left-[51rem] top-[158rem]">
            {
              eixosTematicos.find((eixo) =>
                eixo.nome.toLowerCase().includes("viver")
              )?.titulo
            }
          </p>
        </div>
        <div
          className="flex items-center justify-center bg-[var(--color-purple-red)] card-hover card-hover-orange h-70 rounded-br-[2.5rem] gap-38"
          onMouseEnter={() => setHovered("capital")}
          onMouseLeave={() => setHovered("")}
          onClick={(e) => handleClick("capital", e)}
        >
          <img
            src={
              hovered === "capital" ? Capital_Futuro_colorido : Capital_Futuro
            }
            alt=""
            className="relative right-35"
          />
          <p className="w-38 text-3xl uppercase text-white absolute left-[92rem] top-[158rem] text-hover-purple ">
            {
              eixosTematicos.find((eixo) =>
                eixo.nome.toLowerCase().includes("capital")
              )?.titulo
            }
          </p>
        </div>
        {selectedEixo && (
          <div
            className="absolute inset-0 z-10"
            
          >
            <CardEixos
              eixo={selectedEixo}
              onClose={() => setSelectedEixo(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
