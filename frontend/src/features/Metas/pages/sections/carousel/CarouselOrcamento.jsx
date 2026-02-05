import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  const fmtMoney = (v) =>
    `R$ ${Number(v).toLocaleString("pt-BR")}`.replace(/\s/g, "\u00A0");

  return (
    // largura fixa em desktop para bater com o mock; o pai alinha à direita
    <div className="w-full md:w-[860px] Wrapper-Mobile">
      {/* ================= MOBILE ================= */}
      <div className="block md:hidden">
        <div className="relative bg-white rounded-[1.25rem] shadow-xl px-5 py-6 max-w-md mx-auto overflow-hidden box-border">
          <div className="flex items-end gap-3 pl-1">
            <h3
              className="uppercase text-[var(--color-navy)]"
              style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 20 }}
            >
              Visão geral
            </h3>
            <div className="h-[2px] flex-1 bg-slate-300" />
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-around w-full">
            <div>
              <div className="text-[var(--color-navy)] leading-none"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 96,
                  lineHeight: 0.9
                }}
              >
                {eixo.totalMetas}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Total de metas deste Programa
              </div>
            </div>

            <div className="min-w-[150px]">
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Anterior"
                  className="h-8 w-8 grid place-items-center rounded-md border border-slate-300 shadow-sm hover:bg-slate-100 active:scale-95 transition"
                >
                  <ChevronLeft size={18} />
                </button>

                <div
                  className="rounded-2xl px-5 py-3 text-center w-full max-w-[200px] overflow-hidden"
                  style={{ backgroundColor: eixo.corPrincipal }}
                >
                  <div className="text-[10px] uppercase opacity-90 text-white/95">
                    Metas por eixo
                  </div>
                  <div
                    className="leading-none mt-1 text-white"
                    style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: 44
                    }}
                  >
                    {eixo.metasPorEixo}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Próximo"
                  className="h-8 w-8 grid place-items-center rounded-md border border-slate-300 shadow-sm hover:bg-slate-100 active:scale-95 transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="mt-2 w-full text-center">
                <div
                  className="h-[2px] w-full"
                  style={{ backgroundColor: eixo.corPrincipal }}
                />
                <div
                  className="uppercase font-semibold text-[12px] py-1"
                  style={{ color: eixo.corPrincipal }}
                >
                  {eixo.titulo}
                </div>
                <div
                  className="h-[2px] w-full"
                  style={{ backgroundColor: eixo.corPrincipal }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-end gap-3 pl-1">
              <h3
                className="uppercase text-[var(--color-navy)]"
                style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 20 }}
              >
                Orçamento
              </h3>
              <div className="h-[2px] flex-1 bg-slate-300" />
            </div>

            <div className="mt-4 text-center">
              <div
                className="leading-none max-md:!text-2xl"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 40,
                  color: eixo.corPrincipal
                }}
              >
                {fmtMoney(eixo.orcamento)}
              </div>
              <div
                className="mt-2 text-[13px] font-semibold"
                style={{ color: eixo.corPrincipal }}
              >
                Para o eixo {eixo.titulo.toUpperCase()}
              </div>
            </div>

            <div className="mt-5 text-center text-[12px] tracking-wide uppercase text-[var(--color-navy)]">
              Orçamento total: {fmtMoney(eixo.orcamentoTotal)}
            </div>
          </div>
        </div>
      </div>
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        {/* Wrapper que empurra o conjunto para a direita */}
        <div className="md:ml-auto md:w-[1040px] lg:w-[1160px] xl:w-[962px] wrapper-container-mobile">
          <div className="grid grid-cols-2 gap-6 items-stretch ">
            {/* VISÃO GERAL (card maior) */}
            <div className="bg-white rounded-[20px] shadow-[0_12px_30px_rgba(0,0,0,.12)] px-8 py-7 min-h-[260px] flex flex-col gap-4 xl:w-[29rem]">
              <div className="flex items-end gap-3 pl-1">
                <h3 className="uppercase text-[var(--color-navy)] tracking-wide text-lg" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                  Visão geral
                </h3>
                <div className="h-[2px] flex-1 bg-slate-200" />
              </div>

              <div className="mt-5 grid grid-cols-[190px_minmax(0,1fr)] gap-2 items-center">
                {/* número total (maior) */}
                <div>
                  <div className="text-[var(--color-navy)] leading-none text-9xl" style={{ fontFamily: '"Bebas Neue", sans-serif',lineHeight: 0.88}}>
                    {eixo.totalMetas}
                  </div>
                  <div className="text-[13px] text-slate-500 mt-1">
                    Total de metas deste Programa
                  </div>
                </div>

                {/* badge + setas */}
                <div className="min-w-0 flex flex-col items-center justify-center gap-2">
                  <div className="text-[13px] uppercase relative left-5 flex justify-start flex-row items-center w-full text-[var(--color-navy)]">
                    Metas por eixo
                  </div>
                    <div className="flex flex-row items-center w-full gap-2">
                        <button onClick={handlePrev} aria-label="Anterior" className="relative top-3 right-3 -translate-y-1/2 h-8 w-2 grid place-items-center" style={{ borderColor: eixo.corPrincipal, color: eixo.corPrincipal }}>
                            <ChevronLeft size={18} />
                        </button>
                        <div className="rounded-xl px-7 py-3 text-center w-full"style={{ backgroundColor: eixo.corPrincipal }}>
                            <div className="leading-none text-white" style={{ fontFamily: '"Bebas Neue", sans-serif',fontSize: 80}}>
                                {eixo.metasPorEixo}
                            </div>
                        </div>
                        <button onClick={handleNext} aria-label="Próximo" className="relative top-3 -translate-y-1/2 h-8 w-2 grid place-items-center" style={{ borderColor: eixo.corPrincipal,color: eixo.corPrincipal }}>
                            <ChevronRight size={18} />
                        </button>
                    </div>

                  <div className="mt-3 w-40">
                    <div className="h-[2px]" style={{ backgroundColor: eixo.corPrincipal }}/>
                    <div className="text-center uppercase font-semibold text-[18px] py-1" style={{ color: eixo.corPrincipal }}>
                      {eixo.titulo}
                    </div>
                    <div className="h-[2px]" style={{ backgroundColor: eixo.corPrincipal }}/>
                  </div>
                </div>
              </div>
            </div>

            {/* ORÇAMENTO POR EIXO (card maior) */}
            <div className="bg-white rounded-[20px] shadow-[0_12px_30px_rgba(0,0,0,.12)] px-8 py-7 min-h-[300px] w-full xl:w-[29rem] flex flex-col gap-4">
              <div className="flex items-end gap-3 pl-1">
                <h3 className="uppercase text-[var(--color-navy)] tracking-wide text-lg" style={{ fontFamily: '"Bebas Neue", sans-serif'}}>
                  Orçamento por eixo
                </h3>
                <div className="h-[2px] flex-1 bg-slate-200" />
              </div>
              <div className="mt-6 flex flex-col items-center gap-4">
                <div className="leading-none text-center" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 60, color: eixo.corPrincipal}}>
                  {fmtMoney(eixo.orcamento)}
                </div>
                <div className="w-[260px]">
                  <div className="h-[2px]" style={{ backgroundColor: eixo.corPrincipal }}/>
                  <div className="text-center uppercase font-semibold text-3xl py-1" style={{ color: eixo.corPrincipal }}>
                    {eixo.titulo}
                  </div>
                  <div className="h-[2px]" style={{ backgroundColor: eixo.corPrincipal }}/>
                </div>
              </div>
              <div className="mt-auto pt-3 text-base font-bold tracking-wide uppercase text-[var(--color-navy)] text-center flex flex-col justify-center mx-4">
                <div className="h-[2px] bg-[var(--color-navy)]"/>
                    Orçamento total: {fmtMoney(eixo.orcamentoTotal)}
                <div className="h-[2px] bg-[var(--color-navy)]"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
