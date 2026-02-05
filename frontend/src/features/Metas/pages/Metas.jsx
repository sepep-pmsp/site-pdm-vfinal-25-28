import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "@/shared/assets/svg/logo-pdm.svg";

// Componentes de Seção
import CarouselOrcamento from "./sections/carousel/CarouselOrcamento";
import FiltroMeta from "./sections/filtro/FiltroMeta";
import ListaMetas from "./sections/lista/ListaMetas";
import CardMetas from "./sections/cards/CardMetas";

// Serviços e Utils
import { getMetasIniciais } from "../services/getMetasData";
import { postFiltrosSelecionados } from "../services/getFiltroMetasData";
import { getMetaSlug } from "../hooks/useMetaSlug";

export default function Metas() {
  const [metas, setMetas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef(null);

  const eixoIdFiltro = location.state?.eixoIdFiltro;
  const metaAtiva = metas?.find((m) => getMetaSlug(m) === slug);

  useEffect(() => {
    const carregarMetas = async () => {
      setLoading(true);
      try {
        if (eixoIdFiltro) {
          const filtrosIniciais = {
            eixos: [Number(eixoIdFiltro)],
            ods: [], planos_setoriais: [], orgaos: [], temas: [],
            subprefeituras: [], zonas: [], termo_busca: "",
          };
          const res = await postFiltrosSelecionados(filtrosIniciais);
          setMetas(res.metas);
        } else {
          const data = await getMetasIniciais();
          setMetas(data.resultados);
        }
      } catch (err) {
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    };
    carregarMetas();
  }, [eixoIdFiltro]);

  useEffect(() => {
    if (!loading && eixoIdFiltro && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [loading, eixoIdFiltro]);

  const handleSelectMeta = (meta) => {
    navigate(`/metas/${getMetaSlug(meta)}`, { state: location.state });
  };

  const handleCloseModal = () => {
    navigate("/metas", { state: location.state });
  };

  if (loading) return <div className="p-10 text-center font-bebas-bold text-2xl">Carregando...</div>;

  return (
    <div className="pt-20 bg-white">
      {/* --- HEADER --- */}
      <div className="bg-[var(--color-navy)] px-4 py-8">
        <div className="flex flex-row items-center justify-start gap-8 md:relative max-w-[1200px] mx-auto" style={{ maxWidth: "1427px", height:"auto", margin: "0 auto" }}>
          <img className="w-24 md:w-32" src={logo} alt="Logo" />
          <h2 className="text-white text-2xl md:text-4xl uppercase font-bebas-bold">conheça as metas</h2>
        </div>
      </div>
      <div className="bg-gray-50">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 px-6" style={{ maxWidth: "1427px", height:"auto", margin: "0 auto" }}>
                <div className="flex flex-col items-start gap-5 text-[1.1rem] md:!text-xl w-78">
                    <span>
                        <strong>Neste painel você pode conferir todas as metas deste Programa,</strong>{" "}visualizá-las por eixo estratégico ou pelos subtemas a que se referem.
                    </span>
                    <span>
                        Clique na meta para ver suas informações completas!
                    </span>
                </div>
            <div className="relative lg:bottom-15">
                <CarouselOrcamento />
            </div>
        </div>
      </div>
      <div ref={scrollRef} className="flex flex-col md:flex-row items-center md:items-start justify-center gap-18 px-4 scroll-mt-24 py-10" style={{ maxWidth: "1592px", height:"auto", margin: "0 auto" }}>
            <div className="w-full md:w-6/12 py-8">
                <FiltroMeta onCardsUpdate={(res) => setMetas(res.metas)} eixoIdFromNav={eixoIdFiltro}/>
            </div>
            <div className="overflow-hidden shadow-lg md:shadow-none relative lg:top-8 lg:w-100 flex items-center">
                <div className="h-[100vh] lg:h-[140vh] xl:w-100 w-80 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 no-scrollbar-arrows">
                    <ListaMetas metas={metas} onSelectMeta={handleSelectMeta} />
                </div>
            </div>
      </div>
      {metaAtiva && (
        <CardMetas meta={metaAtiva} onClose={handleCloseModal} />
      )}
    </div>
  );
}