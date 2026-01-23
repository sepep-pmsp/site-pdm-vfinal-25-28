import React, { useEffect, useRef, useState } from "react";
import { getMetasIniciais } from "../services/getMetasData";
import logo from "@/shared/assets/svg/logo-pdm.svg";
import { postFiltrosSelecionados } from "../services/getFiltroMetasData";
import { useIsMobile } from "@/shared/hooks/useIsMobile";
import {
  CardMetas,
  CarouselOrcamento,
  ListaMetas,
  FiltroMeta,
} from "../components";
import { useLocation } from "react-router-dom";

export default function MetasDesktop() {
  const [metas, setMetas] = useState([]);
  const [selectedMeta, setSelectedMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile(725);
  
  const location = useLocation();
  const eixoIdFiltro = location.state?.eixoIdFiltro;
  
  const scrollRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    const carregarMetas = async () => {
      try {
        if (eixoIdFiltro) {
          const filtrosIniciais = {
            ods: [],
            planos_setoriais: [],
            orgaos: [],
            eixos: [Number(eixoIdFiltro)], 
            temas: [],
            subprefeituras: [],
            zonas: [],
            termo_busca: "",
          };
          const res = await postFiltrosSelecionados(filtrosIniciais);
          setMetas(res.metas);
        } else {
          // Se entrou direto na página, carrega tudo
          const data = await getMetasIniciais();
          setMetas(data.resultados);
        }
      } catch (err) {
        console.error("Erro ao carregar metas:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarMetas();
  }, [eixoIdFiltro]);
  useEffect(() => {
    if (!loading && eixoIdFiltro && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300); 
    }
  }, [loading, eixoIdFiltro]);

  if (loading) return <div className="p-10 text-center">Carregando...</div>;

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
                Neste painel você pode ver a lista completa de metas,
              </strong>{" "}
              visualizá-las por eixo estratégico ou pelos subtemas a que se
              referem.
            </p>
            <p className="w-80">
              Clique na meta para ver suas informações completas!
            </p>
          </div>
          <div className="flex relative left-[-11rem] bottom-24 carousel-ormacento-container-mobile">
            <CarouselOrcamento />
          </div>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex items-center justify-center flex-row flex-nowrap gap-1 pt-10 h-[95rem] container-lista-metas-mobile scroll-mt-24"
      >
        <div className="relative w-full h-full top-32 lista-metas-mobile lg:w-6/12">
          <FiltroMeta
            onCardsUpdate={(res) => setMetas(res.metas)}
            eixoIdFromNav={eixoIdFiltro}
          />
        </div>

        <div className="flex min-w-lg h-[1360px] flex-col flex-nowrap justify-start items-center px-0 py-8 rounded-3xl relative top-7 container-lista-metas-mobileee">
          <div className="overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 no-scrollbar-arrows">
            <ListaMetas metas={metas} onSelectMeta={setSelectedMeta} />
          </div>
        </div>
      </div>

      {selectedMeta &&
        (isMobile ? (
          <CardMetasMobile
            meta={selectedMeta}
            onClose={() => setSelectedMeta(null)}
          />
        ) : (
          <CardMetas
            meta={selectedMeta}
            onClose={() => setSelectedMeta(null)}
          />
        ))}
    </div>
  );
}