import React, { useEffect, useState } from 'react'
import { getOrcamentoData } from "../../../services/getOrcamentoData";

export default function CarouselOrcamento() {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const response = await getOrcamentoData();
            const valores = response.orcamentos_por_eixo.map((eixo) => ({
                titulo: eixo.nome,
                corPrincipal: eixo.cor_principal,
                metasPorEixo: eixo.qtd_metas,
                totalMetas: response.total_metas,
                orcamento: eixo.orcamento,
                orcamentoTotal: response.orcamento_total
            }));
            setData(valores);
        }
        fetchData();
    }, []);

    const handlePrev = () =>
        setCurrentIndex((p) => (p === 0 ? data.length - 1 : p - 1));
    const handleNext = () =>
        setCurrentIndex((p) => (p === data.length - 1 ? 0 : p + 1));

    if (!data.length) return null;
    const eixo = data[currentIndex];

    const fmtCompactBRL = (value) => {
        if (!value) return "";

        const numeric = Number(value);

        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: 1
        }).format(numeric);
    };

    return (
        <div className='bg-white w-full p-4 shadow-md flex flex-col justify-center items-center gap-8 rounded-2xl'>
            <section className='!flex flex-col lg:flex-row w-full'>
                <div className='w-full h-full p-4 rounded-lg flex flex-col justify-center items-center gap-4'>
                    <span className='w-full flex flex-row flex-nowrap items-center justify-center gap-4'>
                        <h2 className='text-2xl font-bold uppercase'>Total de metas</h2>
                        <span className='w-25 h-0.5 bg-black'></span>
                    </span>
                    <div className='w-full 2xl:w-70'>
                        <h1 className='text-[var(--color-navy)] text-7xl lg:text-9xl'>{eixo.totalMetas}</h1>
                        <p className='text-[var(--color-navy)] !text-base'>Metas divididas em <strong className='underline'>4 diferentes eixos</strong></p>
                    </div>
                </div>
                <div className='w-full h-full p-4 rounded-lg flex flex-col justify-center items-center gap-4'>
                    <span className='w-full flex flex-row flex-nowrap items-center justify-center gap-4'>
                        <h2 className='text-2xl font-bold uppercase w-30'>Metas Por Eixo</h2>
                        <span className='w-30 h-0.5 bg-black'></span>
                    </span>
                    <div className='w-full h-full p-4 rounded-lg flex flex-col justify-center items-center gap-4 xl:w-71' style={{ backgroundColor: eixo.corPrincipal }}>
                        <div className='w-full flex flex-col'>
                            <span className='w-auto h-px bg-white' />
                            <p className='text-white text-center uppercase text-sm'>{eixo.titulo}</p>
                            <span className='w-auto h-px bg-white' />
                        </div>
                        <div className='flex flex-row items-center justify-around gap-18'>
                            <button onClick={handlePrev} aria-label="Anterior"><i className="fa-solid fa-chevron-left text-white" /></button>
                            <h3 className='text-white text-center uppercase text-6xl'>{eixo.metasPorEixo}</h3>
                            <button onClick={handleNext} aria-label="Próximo"><i className="fa-solid fa-chevron-right text-white" /></button>
                        </div>
                        <div className='bg-white w-full py-1 px-4 rounded-full'>
                            <p className='text-bold text-base text-center' style={{ color: eixo.corPrincipal }}> <strong>Orçamento por eixo:</strong> {fmtCompactBRL(eixo.orcamento)}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='!flex flex-col items-center justify-center gap-8'>
                <div className='bg-white w-full !border-2 !border-[var(--color-navy)] rounded-full py-2 px-8 text-[var(--color-navy)]'>
                    <p className='text-center'><strong>Orçamento total:</strong> {fmtCompactBRL(eixo.orcamentoTotal)}</p>
                </div>
                <div className='bg-[var(--color-navy)] w-full rounded-2xl py-2 px-8 text-white flex flex-col lg:flex-row items-center justify-center gap-2'>
                    <h2 className='text-6xl w-30'>13 bi</h2>
                    <p className='text-xl'>De <strong>recursos empenhados</strong> até o momento</p>
                </div>
            </section>
        </div>
    )
}