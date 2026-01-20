import React from "react";
import logo from "@/shared/assets/svg/logo-pdm.svg";
import CarouselOrcamento from "../components/CarouselOrcamento";
import FiltroMeta from "../components/FiltroMeta";
import ListaMetas from "../components/ListaMetas";

export default function MetasMobile({ metas, setMetas, onSelectMeta }) {


    return (
        <div className="pt-20">
            {/* Barra superior */}
            <div className="bg-[var(--color-navy)] px-4 py-6">
                <div className="max-w-[1200px] mx-auto flex items-center gap-4">
                    <img className="w-24" src={logo} alt="Logo" />
                    <h2 className="text-white text-2xl font-semibold">conheça as metas</h2>
                </div>
            </div>

            {/* Texto + Filtro + Carousel (nessa ordem) */}
            <div className="bg-white">
                <div className="max-w-[1200px] mx-auto px-4 py-4" >
                    <div className="grid grid-cols-1 gap-4">
                        {/* Texto */}
                        <div className="Wrapper-Mobile">
                            <div className="text-base leading-relaxed">
                                <p>
                                    <strong>Neste painel você pode conferir todas as metas deste Programa,</strong>{" "}
                                    ou filtrá-las como preferir.
                                </p>
                                <p className="mt-3">
                                    Escolha também se deseja visualizar a lista completa ou as metas
                                    de cada eixo e ainda dividi-las em seus subtemas.{" "}
                                    <strong>Clique na meta para ver suas informações completas</strong>.
                                </p>
                            </div>

                            {/* Filtro (agora acima do card) */}
                            <div className="mt-1">
                                <FiltroMeta onCardsUpdate={(res) => setMetas(res.metas)} />
                            </div>
                        </div>

                        {/* Carousel (card) */}
                        <div className="w-full relative z-[1] -mt-2">
                            <CarouselOrcamento />
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista (sem filtro aqui) */}
            <section className="max-w-[1200px] mx-auto px-4 mt-2 list-metas-mobile">
                <div className="rounded-3xl shadow-[0px_5px_40px_rgba(128,128,128,0.4)] overflow-hidden">
                    <div className="max-h-[70vh] overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 no-scrollbar-arrows">
                        <ListaMetas metas={metas} onSelectMeta={onSelectMeta} />
                    </div>
                </div>
            </section>
        </div>
    );
}
