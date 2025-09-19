import React, { useEffect, useState } from "react";
import { getMetasIniciais } from "@/services/Metas/getMetasData";
import logo from "@/assets/svg/logo-pdm.svg";
import CarouselOrcamento from "@/components/CarouselOrcamento/CarouselOrcamento";
import FiltroMeta from "@/components/Meta/FiltroMeta";
import ListaMetas from "@/components/Meta/ListaMetas";
import CardMetas from "@/components/Meta/CardMetas";
import { postFiltrosSelecionados } from "@/services/Metas/getFiltroMetasData";

export default function MetasDesktop() {
  const [metas, setMetas] = useState([]);
  const [selectedMeta, setSelectedMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMetasIniciais()
      .then((data) => {
        setMetas(data.resultados);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    const filtrosIniciais = {
      ods: [],
      planos_setoriais: [],
      orgaos: [],
      eixos: [],
      temas: [],
      subprefeituras: [],
      zonas: [],
      termo_busca: ""
    };

    postFiltrosSelecionados(filtrosIniciais)
      .then((res) => {
        setMetas(res.metas);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro na busca inicial de metas:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="pt-20">
      <div className="flex flex-col items-stretch flex-nowrap">
        <div className="bg-[var(--color-navy)] h-full flex flex-row items-center px-4 py-8">
          <div className="flex flex-row flex-nowrap items-center justify-start gap-8 relative left-60">
            <img className="w-32" src={logo} alt="Logo" />
            <h2 className="text-white text-4xl">conheça as metas</h2>
          </div>
        </div>
        <div className="bg-gray-50 h-full flex flex-row items-center justify-center gap-40">
          <div className="flex flex-col items-start gap-5 py-5 px-10 text-[1.3rem] texto-inicio-metas-mobile">
            <p className="w-84">
              <strong>
                Neste painel você pode conferir todas as metas deste Programa,
              </strong>{" "}
              ou filtrá-las como preferir.
            </p>
            <p className="w-80">
              Escolha também se deseja visualizar a lista completa ou as metas
              de cada eixo e ainda dividi-las em seus subtemas.{" "}
              <strong>
                Clique na meta para ver suas informações completas
              </strong>
              .
            </p>
          </div>
          <div className="flex relative left-[-11rem] bottom-24 carousel-ormacento-container-mobile">
            <CarouselOrcamento />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center flex-row flex-nowrap gap-1 pt-10 h-[95rem] container-lista-metas-mobile">
        <div className="relative w-full h-full left-12 top-32 lista-metas-mobile">
          <FiltroMeta onCardsUpdate={(res) => setMetas(res.metas)} />
        </div>

        <div className="flex min-w-lg h-[1360px] flex-col flex-nowrap justify-start items-center px-0 py-8 rounded-3xl relative right-60 top-7 container-lista-metas-mobileee">
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
