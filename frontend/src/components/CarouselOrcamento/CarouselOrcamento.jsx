import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getOrcamentoData } from "@/services/Metas/getOrcamentoData";

export default function CarouselOrcamento() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await getOrcamentoData();
      const valores = Object.values(response.visaoGeral);
      setData(valores);
    }
    fetchData();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  if (!data.length) return null;

  const eixo = data[currentIndex];

  return (
    <div className="flex justify-center items-center gap-4 transition-all duration-500 ease-in-out">
      <div className="bg-white rounded-xl shadow-md w-[40rem] h-95 px-6 py-10 relative">
        <div className="flex justify-start items-end flex-nowrap flex-row gap-9">
          <h2 className="text-4xl font-semibold text-[var(--color-navy)] uppercase mb-2">
            visão geral
          </h2>
          <div className="bg-[var(--color-navy)] relative h-0.5 w-100 bottom-[1.1rem]"></div>
        </div>
        <div className="flex items-center justify-around relative left-8 top-8">
          <div className="flex flex-col items-start justify-center flex-nowrap">
            <div>
              <h2 className="text-[12rem] relative h-36 right-8 bottom-24 text-[var(--color-navy)]">
                {eixo.totalMetas}
              </h2>
            </div>
            <div className="text-sm text-gray-500 w-31">
              <p>Total de metas deste Programa</p>
            </div>
          </div>
          <div className="h-60 flex flex-col items-center justify-center w-[25rem] gap-8">
            <div className="flex items-center justify-center">
              <div className="cursor-pointer transition-all duration-600 slideLeft" onClick={handlePrev}>
                <ChevronLeft size={28} />
              </div>
              <div
                className="bg-opacity-90 rounded-lg py-2 px-4 font-bold text-xl flex flex-col"
                style={{ backgroundColor: eixo.corPrincipal }}
              >
                <div className="absolute top-[-1.5rem] left-80 font-normal uppercase ">
                  <p className="text-[var(--color-navy)]">meta por eixo</p>
                </div>
                <div className="h-30 w-40 flex items-center justify-center">
                  <p className="text-white text-8xl">{eixo.metasPorEixo}</p>
                </div>
              </div>
              <div className=" cursor-pointer" onClick={handleNext}>
                <ChevronRight size={28} />
              </div>
            </div>
            <div
              className="text-center mt-1 border-y py-1 text-xl font-semibold"
              style={{
                color: eixo.corPrincipal,
                borderColor: eixo.corPrincipal
              }}
            >
              {eixo.titulo.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md w-[40rem] h-95 px-6 py-10 relative flex flex-col gap-8 ">
        <div className="flex justify-start items-end flex-nowrap flex-row gap-5">
          <h2 className="text-4xl font-semibold text-[var(--color-navy)] uppercase mb-2">
            orçamento por eixo
          </h2>
          <div className="bg-[var(--color-navy)] relative h-0.5 w-43 bottom-[1.1rem]"></div>
        </div>
        <div className="flex flex-col flex-nowrap items-center justify-center gap-4">
          <div
            className="text-5xl font-bold text-gray-900"
            style={{ color: eixo.corPrincipal }}
          >
            R${Number(eixo.orcamento).toLocaleString("pt-BR")}
          </div>
          <div
            className="text-center mt-5 border-y py-1 text-xl font-semibold"
            style={{ color: eixo.corPrincipal }}
          >
            {eixo.titulo.toUpperCase()}
          </div>
          <div className="mt-6 border-y py-2 text-xl text-center font-semibold text-[var(--color-navy)] ">
            ORÇAMENTO TOTAL: R$
            {Number(eixo.orcamentoTotal).toLocaleString("pt-BR")}
          </div>
        </div>
      </div>
    </div>
  );
}
