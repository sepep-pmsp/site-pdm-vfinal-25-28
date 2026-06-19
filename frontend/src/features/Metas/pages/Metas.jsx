import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "@/shared/assets/svg/logo-pdm.svg";

// Componentes de Seção
import OrcamentoSection from "./sections/carousel/OrcamentoSection";
import ListaMetas from "./sections/lista/ListaMetas";
import CardMetas from "./sections/cards/CardMetas";
import FiltroEixos from "./sections/filtro/FiltroEixos";

// Serviços e Utils
import { getMetasIniciais } from "../services/getMetasData";
import { postFiltrosSelecionados } from "../services/getFiltroMetasData";
import { getMetaSlug } from "../hooks/useMetaSlug";

import { useMediaQuery } from "react-responsive";
import FiltroMetaMobile from "./sections/filtro/FiltroMetaMobile";
import Filtro from "./sections/filtro/Filtro";
import { useFiltrosMetas } from "../hooks/useFiltrosMetas";

export default function Metas() {
    const [metas, setMetas] = useState([]);
    const [loading, setLoading] = useState(true);

    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const scrollRef = useRef(null);

    const eixoIdFiltro = location.state?.eixoIdFiltro;
    const metaAtiva = metas?.find((m) => getMetaSlug(m) === slug);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    const handleCardsUpdate = (res) => { setMetas(res?.metas ?? []); };
    const { data: filtrosData, filtrosSelecionados, toggleSelecionado, limparFiltros, } = useFiltrosMetas(handleCardsUpdate, eixoIdFiltro);

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
            <div className="bg-[var(--color-navy)] px-4 py-8">
                <div className="flex flex-row items-center justify-start gap-8 md:relative max-w-container">
                    <img className="w-24 md:w-32" src={logo} alt="Logo" />
                    <h2 className="text-white text-2xl md:text-4xl uppercase font-bebas-bold">conheça as metas</h2>
                </div>
            </div>
            <div className="bg-gray-50">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-6 max-w-container xl:h-60">
                    <div className="flex flex-col items-start gap-5 text-[1.1rem] md:!text-xl w-full pt-8">
                        <p> <strong>Neste painel você pode conferir todas as metas deste Programa,</strong>{" "}visualizá-las por eixo estratégico ou pelos subtemas a que se referem.</p>
                        <p> Clique na meta para ver suas informações completas!</p>
                    </div>
                    <div className="w-full">
                        <OrcamentoSection />
                    </div>
                </div>
            </div>
            <div ref={scrollRef} className="max-w-container h-full flex flex-col gap-8 py-8">
                <span className="flex flex-col items-start w-full">
                    <h2 className="text-2xl lg:text-5xl text-[var(--color-navy)] w-full lg:w-62">Filtre as Metas</h2>
                    <span className="h-1 bg-[var(--color-navy)] w-full"></span>
                </span>
                <section className="!flex flex-col md:flex-row items-start justify-start gap-8 overflow-hidden rounded-2xl mx-2 shadow-[0px_0px_5px_0px_grey] h-[calc(100vh-5rem)]">
                    <>
                        {!filtrosData ? (<p>Carregando filtros...</p>) : isMobile ? (
                            <FiltroMetaMobile onCardsUpdate={handleCardsUpdate} regionalizacao={filtrosData.regionalizacao} zonas={filtrosData.zonas || filtrosData.regioes_zona} orgaos={filtrosData.orgaos} planosSetoriais={filtrosData.planos_setoriais} eixos={filtrosData.eixos} ods={filtrosData.ods} eixoIdFromNav={eixoIdFiltro} filtrosSelecionados={filtrosSelecionados} toggleSelecionado={toggleSelecionado} limparFiltros={limparFiltros} />
                        ) : (
                            <div className="h-full shrink-0">
                                <Filtro data={filtrosData} filtrosSelecionados={filtrosSelecionados} toggleSelecionado={toggleSelecionado} limparFiltros={limparFiltros} eixoIdFromNav={eixoIdFiltro} />
                            </div>
                        )}
                    </>
                    <div className="relative flex h-full min-h-0 flex-1 flex-col items-start justify-start overflow-visible">
                        <div className="relative hidden md:h-80 lg:h-[15rem] w-full shrink-0 flex-col overflow-visible p-4 pt-8 md:flex">
                            <span className="flex flex-col items-start w-full px-2">
                                <h2 className="text-2xl lg:text-3xl text-[var(--color-navy)] w-full">  Por Eixos </h2>
                                <span className="h-0.5 bg-[var(--color-navy)] w-full"></span>
                            </span>
                            <div className="relative z-10 overflow-visible">
                                <FiltroEixos eixos={filtrosData.eixos} filtrosSelecionados={filtrosSelecionados} toggleSelecionado={toggleSelecionado} eixoIdFromNav={eixoIdFiltro}/>
                            </div>
                        </div>

                        <div className="relative z-0 min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 no-scrollbar-arrows">
                            <ListaMetas metas={metas} onSelectMeta={handleSelectMeta} />
                        </div>
                    </div>
                </section>
            </div>
            {metaAtiva && (<CardMetas meta={metaAtiva} onClose={handleCloseModal} />)}
        </div>
    );
}