import React, { useEffect, useState } from "react";
import { getMetasData } from "@/services/metas/getMetasData";
import logo from "@/assets/svg/logo-pdm.svg";
import CarouselOrcamento from "../../components/CarouselOrcamento/CarouselOrcamento";
import FiltroMeta from "../../components/Meta/FiltroMeta";
import ListaMetas from "../../components/Meta/ListaMetas";
import CardMetas from "../../components/Meta/CardMetas";


export default function Metas() {
  const [metas, setMetas] = useState([]);
  const [selectedMeta, setSelectedMeta] = useState(null);

  useEffect(() => {
    getMetasData().then(setMetas).catch(console.error);
  }, []);

  if (!metas.length) return <div>Carregando...</div>;

  return (
    <div className="pt-20">
      <div className="bg-[var(--color-navy)] h-35 p-4 flex items-center gap-7">
        <img className="w-25" src={logo} alt="Logo" />
        <h2 className="text-white text-4xl">conheça as metas</h2>
      </div>
      <div className="bg-gray-50 h-90">
        <div className="w-120 flex flex-col items-center gap-5 py-5 px-10 text-[1.3rem]">
          <p>
            <strong>
              Neste painel você pode conferir todas as metas deste Programa,
            </strong>{" "}
            ou filtrá-las como preferir.
          </p>
          <p>
            Escolha também se deseja visualizar a lista completa ou as metas de
            cada eixo e ainda dividi-las em seus subtemas.{" "}
            <strong>Clique na meta para ver suas informações completas</strong>.
          </p>
        </div>
        <div className="relative w-[73rem] left-[40rem] bottom-[25rem]">
          <CarouselOrcamento />
        </div>
      </div>

      <div className="flex flex-row flex-nowrap items-center justify-around gap-3 pt-10 h-[90rem]">
        <div className="relative h-full right-25 top-32">
          <FiltroMeta />
        </div>

        <div className="flex w-[35rem] h-[50rem] flex-col flex-nowrap justify-start items-center px-0 py-8  shadow-[0px_5px_40px_grey] rounded-3xl">
          <div className="overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 no-scrollbar-arrows">
            <ListaMetas
              metas={metas}
              onSelectMeta={(meta) => setSelectedMeta(meta)}
            />
          </div>
        </div>
      </div>

      {selectedMeta && (
        <CardMetas meta={selectedMeta} onClose={() => setSelectedMeta(null)} />
      )}
    </div>
  );
}
