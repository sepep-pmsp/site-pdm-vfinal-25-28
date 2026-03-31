import React, { useEffect, useState } from 'react';
import { useEixosMetas } from '../../../hooks/useMetasIndicadores';
import { getConhecaMetasData } from "../../../services/getOrcamentoData";

export default function CardAndamentoMetas() {
    const [indicadoresBackend, setIndicadoresBackend] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getConhecaMetasData();
                setIndicadoresBackend(response);
            } catch (error) {
                console.error("Erro ao buscar indicadores das metas:", error);
            }
        }
        fetchData();
    }, []);

    const indicadores = useEixosMetas({
        usarBackend: true,
        indicadoresBackend,
    });

    return (
        <div className='bg-white w-full p-4 shadow-md flex flex-col justify-center items-center gap-8 rounded-2xl h-full xl:!h-[29.4rem]'>
            <span className='w-full flex flex-row flex-nowrap items-center justify-start gap-4'>
                <h2 className='text-2xl font-bold uppercase'>andamento das metas</h2>
                <span className='w-30 h-0.5 bg-black'></span>
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 xl:grid xl:justify-items-center xl:items-center xl:justify-center xl:content-center xl:grid-cols-[200px_200px]">
                {indicadores.map((item) => (
                    <div key={item.id} className="text-white text-center bg-[var(--color-navy)] rounded-3xl p-4 w-full h-full flex flex-col items-center justify-around">
                        <h2 className="text-4xl lg:text-6xl font-bold">{item.valor}</h2>
                        <p className="!text-base mt-2">{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}