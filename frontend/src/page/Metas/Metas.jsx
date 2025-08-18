import React, { useEffect, useState } from "react";
import { getMetasData } from "@/services/metas/getMetasData";
import logo from "@/assets/svg/logo-pdm.svg";
import CarouselOrcamento from "@/components/CarouselOrcamento/CarouselOrcamento";
import FiltroMeta from "@/components/Meta/FiltroMeta";
import ListaMetas from "@/components/Meta/ListaMetas";
import CardMetas from "@/components/Meta/CardMetas";

export default function Metas() {
  const [metas, setMetas] = useState([]);
  const [selectedMeta, setSelectedMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMetasData()
      .then((data) => {
        setMetas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;

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

      <div className="flex items-center justify-center flex-row flex-nowrap gap-1 pt-10 h-[90rem]">
        <div className="relative h-full right-35 top-32">
          <FiltroMeta onCardsUpdate={setMetas} /> {/* ← conexão feita aqui */}
        </div>

        <div className="flex w-[35rem] h-[85em] flex-col flex-nowrap justify-start items-center px-0 py-8 shadow-[0px_5px_40px_grey] rounded-3xl relative top-7">
          <div className="overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 no-scrollbar-arrows">
            <ListaMetas metas={metas} onSelectMeta={setSelectedMeta} />
          </div>
        </div>
      </div>

      {selectedMeta && (
        <CardMetas meta={selectedMeta} onClose={() => setSelectedMeta(null)} />
      )}
    </div>
  );
}
