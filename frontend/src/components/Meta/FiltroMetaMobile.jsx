import React, { useEffect, useRef, useState } from "react";
import { corrigirUrlImagem } from "@/utils/imageUtils";
import { useFiltrosMetas } from "../../hooks/useFiltrosMetas";
import SafeSVG from "@/components/SafeSVG/SafeSVG";

export default function FiltroMetaMobile({
  onCardsUpdate,
  regionalizacao,
  zonas,
  orgaos,
  planosSetoriais,
  eixos,
  ods,
  eixoIdFromNav
}) {
  const { data, filtrosSelecionados, toggleSelecionado, limparFiltros } =
    useFiltrosMetas(onCardsUpdate);

  const [open, setOpen] = useState(false);
  const [eixoAberto, setEixoAberto] = useState(null);
  const [subprefOpen, setSubprefOpen] = useState(false);
  const [planosOpen, setPlanosOpen] = useState(false);
  const [orgaoOpen, setOrgaoOpen] = useState(false);
  const [zonaSelecionada, setZonaSelecionada] = useState(null);

  const panelRef = useRef(null);

  const stripHtml = (s = "") =>
    s
      .toString()
      .replace(/<[^>]*>/g, "")
      .trim();
  const norm = (s = "") =>
    stripHtml(s)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .trim();

  // Atualização do pai (debounce) — sempre antes de qualquer return
  const debounceRef = useRef(null);
  const buildPayload = () => ({
    eixos: filtrosSelecionados?.eixos ?? [],
    subeixos: filtrosSelecionados?.subeixos ?? [],
    orgaos: filtrosSelecionados?.orgaos ?? [],
    planos_vinculados: filtrosSelecionados?.planos_vinculados ?? [],
    subprefeituras: filtrosSelecionados?.subprefeituras ?? [],
    ods: filtrosSelecionados?.ods ?? [],
    zona: regionalizacaoArr
      .filter((r) => filtrosSelecionados.zonas.includes(r.id))
      .map((r) => norm(r.nome))
  });
  useEffect(() => {
    if (!onCardsUpdate) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onCardsUpdate(buildPayload()), 200);
    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    zonaSelecionada,
    JSON.stringify(filtrosSelecionados?.eixos || []),
    JSON.stringify(filtrosSelecionados?.subeixos || []),
    JSON.stringify(filtrosSelecionados?.orgaos || []),
    JSON.stringify(filtrosSelecionados?.planos_vinculados || []),
    JSON.stringify(filtrosSelecionados?.subprefeituras || []),
    JSON.stringify(filtrosSelecionados?.ods || [])
  ]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const [initialFilterApplied, setInitialFilterApplied] = useState(false);

  useEffect(() => {
    if (eixoIdFromNav && !initialFilterApplied) {
      setEixoAberto(eixoIdFromNav);

      if (!filtrosSelecionados.eixos.includes(eixoIdFromNav)) {
        toggleSelecionado("eixos", eixoIdFromNav);
      }
      setInitialFilterApplied(true);
    }
  }, [
    eixoIdFromNav,
    filtrosSelecionados.eixos,
    toggleSelecionado,
    initialFilterApplied
  ]);

  const regionalizacaoArr = Array.isArray(regionalizacao)
    ? regionalizacao
    : Array.isArray(data?.regionalizacao)
    ? data.regionalizacao
    : [];

  const orgaosList = Array.isArray(orgaos) ? orgaos : data?.orgaos ?? [];
  const planosList = Array.isArray(planosSetoriais)
    ? planosSetoriais
    : data?.planos_setoriais ?? [];
  const eixosList = Array.isArray(eixos) ? eixos : data?.eixos ?? [];
  const odsList = Array.isArray(ods) ? ods : data?.ods ?? [];

  function rMatchZoneName(sp, regs) {
    const owner = regs.find((r) =>
      (r?.subprefeituras ?? r?.subprefeituras_correspondentes ?? []).some(
        (s) =>
          (s?.id ?? s?.codigo ?? s?.value) ===
          (sp?.id ?? sp?.codigo ?? sp?.value)
      )
    );
    return owner?.zona?.nome || owner?.zona_nome || owner?.zona || "";
  }

  const subprefListAll = regionalizacaoArr
    .flatMap(
      (r) => r?.subprefeituras ?? r?.subprefeituras_correspondentes ?? []
    )
    .map((sp) => ({
      id: sp?.id ?? sp?.codigo ?? sp?.value,
      nome: stripHtml(sp?.nome ?? sp?.label ?? sp?.title ?? ""),
      zona:
        norm(sp?.zona?.nome) ||
        norm(sp?.zona_nome) ||
        norm(sp?.zona) ||
        norm(rMatchZoneName(sp, regionalizacaoArr))
    }))
    .filter((sp) => sp.id && sp.nome);

  const zonasArrPayload =
    (Array.isArray(zonas) && zonas.length
      ? zonas
      : Array.isArray(data?.zonas)
      ? data.zonas
      : Array.isArray(data?.regioes_zona)
      ? data.regioes_zona
      : []) || [];

  const labelZona = (raw = "") => {
    const up = norm(raw);
    if (!up) return "";
    if (up === "CENTRO") return "CENTRO";
    const lado = up.replace(/^ZONA\s+/, "").trim();
    return `ZONA ${lado}`;
  };

  const extractZoneLabelFromRegion = (r = {}) =>
    labelZona(
      r?.zona?.nome ??
        r?.zona_nome ??
        r?.zona ??
        (/ZONA|CENTRO/i.test(r?.nome || "") ? r?.nome : "")
    );

  const zonasFromPayload = zonasArrPayload
    .map((z) => labelZona(z?.nome ?? z?.label ?? z?.title ?? ""))
    .filter(Boolean);

  const zonasFromRegions = (
    Array.isArray(regionalizacaoArr) ? regionalizacaoArr : []
  )
    .map(extractZoneLabelFromRegion)
    .filter(Boolean);

  const zonasFromSubprefs = Array.from(
    new Set(
      (regionalizacaoArr ?? [])
        .flatMap(
          (r) => r?.subprefeituras ?? r?.subprefeituras_correspondentes ?? []
        )
        .map((sp) =>
          labelZona(
            sp?.zona?.nome ??
              sp?.zona_nome ??
              sp?.zona ??
              rMatchZoneName(sp, regionalizacaoArr)
          )
        )
    )
  ).filter(Boolean);

  let zonasLabelsBase = [
    ...new Set([
      ...(zonasFromPayload || []),
      ...(zonasFromRegions || []),
      ...(zonasFromSubprefs || [])
    ])
  ];

  if (!zonasLabelsBase.length) {
    zonasLabelsBase = [
      "ZONA OESTE",
      "ZONA NORTE",
      "CENTRO",
      "ZONA SUL",
      "ZONA LESTE"
    ];
  }

  const ordemPreferida = [
    "ZONA OESTE",
    "ZONA NORTE",
    "CENTRO",
    "ZONA SUL",
    "ZONA LESTE"
  ];
  const setZ = new Set(zonasLabelsBase);
  const zonasOrdenadas = [
    ...ordemPreferida.filter((z) => setZ.has(z)),
    ...Array.from(setZ)
      .filter((z) => !ordemPreferida.includes(z))
      .sort()
  ];

  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    requestAnimationFrame(() => {
      if (next && panelRef.current) panelRef.current.scrollTop = 0;
    });
  };

  const CheckSvg = ({ checked, stroke = "#000" }) => (
    <svg viewBox="0 0 24 24" className="block h-6 w-6">
      <rect
        x="1.5"
        y="1.5"
        width="21"
        height="21"
        rx="4"
        ry="4"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
      />
      {checked && (
        <polyline
          points="20 6 9 17 4 12"
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );

  const subprefsFiltradas = zonaSelecionada
    ? (
        regionalizacaoArr.find((r) => r.id === zonaSelecionada)
          ?.subprefeituras || []
      )
        .map((sp) => ({
          id: sp?.id ?? sp?.codigo ?? sp?.value,
          nome: stripHtml(sp?.nome ?? sp?.label ?? sp?.title ?? "")
        }))
        .sort((a, b) =>
          a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" })
        )
    : subprefListAll.sort((a, b) =>
        a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" })
      );

  const isLoading = !data;

  return (
    <>
      <div className="xxl:hidden bg-[var(--color-navy,#0A2540)] text-white">
        <div className="max-xxl:min-w-sm xxl:w-screen">
          <button
            type="button"
            onClick={toggleOpen}
            aria-expanded={open}
            className="w-full"
          >
            <div
              className="bg-[#46C0CC] text-white font-extrabold uppercase tracking-wide px-6 flex items-center justify-center text-center min-h-[140px]"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 26,
                letterSpacing: "1px"
              }}
            >
              <span className="leading-tight">Clique para ver os filtros</span>
            </div>
          </button>
          <div className="h-3 bg-white w-full" />
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1000] xxl:hidden"
        >
          <div className="absolute inset-0 bg-white" />
          <div
            ref={panelRef}
            className="relative z-[1001] h-full w-full bg-white text-[var(--color-navy,#0A2540)] flex flex-col"
          >
            <button
              type="button"
              onClick={toggleOpen}
              className="w-full text-left"
            >
              <div
                className="bg-[#46C0CC] text-white text-center uppercase tracking-wide px-4 py-3"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: "28px",
                  letterSpacing: "1px"
                }}
              >
                Filtrar
              </div>
            </button>
            <div className="h-3 bg-white" />

            <div className="flex-1 overflow-y-auto px-4 pt-2 pb-28 space-y-5">
              {isLoading ? (
                <p className="p-4 text-sm">Carregando filtros...</p>
              ) : (
                <>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        limparFiltros();
                        setZonaSelecionada(null);
                      }}
                      className="h-12 px-8 w-60 rounded-xl border-2 border-slate-800 text-slate-800 font-normal uppercase text-xl tracking-[0.12em]"
                      style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                    >
                      Limpar tudo
                    </button>
                  </div>

                  <section className="mt-8">
                    <h3 className="text-center text-[14px] font-semibold uppercase text-slate-800">
                      Filtre por eixos e subtemas
                    </h3>

                    {!eixoAberto && (
                      <div className="mt-3 grid grid-cols-2 gap-3 px-2">
                        {(() => {
                          const byName = Object.fromEntries(
                            (eixosList ?? []).map((e) => [norm(e.nome), e])
                          );
                          const order = [
                            "UNIVERSO SP",
                            "VIVER SAO PAULO",
                            "CIDADE EMPREENDEDORA",
                            "CAPITAL DO FUTURO"
                          ];
                          const ordered = order
                            .map((n) => byName[n])
                            .filter(Boolean);
                          return ordered.map((e) => {
                            const active = filtrosSelecionados.eixos.includes(
                              e.id
                            );
                            const N = norm(e.nome);
                            const lines = N.includes("UNIVERSO SP")
                              ? ["UNIVERSO", "SP"]
                              : N.includes("VIVER SAO PAULO")
                              ? ["VIVER", "SÃO PAULO"]
                              : N.includes("CIDADE EMPREENDEDORA")
                              ? ["CIDADE", "EMPREENDEDORA"]
                              : N.includes("CAPITAL DO FUTURO")
                              ? ["CAPITAL", "DO FUTURO"]
                              : [e.nome];
                            return (
                              <button
                                key={e.id}
                                type="button"
                                onClick={() => {
                                  toggleSelecionado("eixos", e.id);
                                  setEixoAberto(e.id);
                                }}
                                className={`rounded-2xl px-3 py-4 text-left shadow ${
                                  active
                                    ? "ring-2 ring-offset-2 ring-slate-900 ring-offset-white"
                                    : ""
                                }`}
                                style={{ backgroundColor: e.cor }}
                              >
                                <span
                                  className="block text-white leading-[1.05]"
                                  style={{
                                    fontFamily: '"Bebas Neue", sans-serif',
                                    fontSize: "22px",
                                    letterSpacing: "0.02em",
                                    textTransform: "uppercase",
                                    fontWeight: 700
                                  }}
                                >
                                  {lines.map((p, i) => (
                                    <span
                                      key={i}
                                      className={i === 0 ? "" : "block"}
                                    >
                                      {p}
                                    </span>
                                  ))}
                                </span>
                              </button>
                            );
                          });
                        })()}
                      </div>
                    )}

                    {eixoAberto &&
                      (() => {
                        const eixoSel = (eixosList ?? []).find(
                          (e) => e.id === eixoAberto
                        );
                        const temas = eixoSel?.temas ?? [];
                        const bg = eixoSel?.cor || "#2FB157";
                        return (
                          <div
                            className="mt-3 mx-2 rounded-2xl shadow relative overflow-hidden"
                            style={{ backgroundColor: bg }}
                          >
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setEixoAberto(null)}
                                aria-label="Fechar"
                                className="absolute right-1 top-0 h-9 w-9 grid place-items-center text-white"
                                style={{ zIndex: 1 }}
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  className="h-6 w-6"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                              </button>
                              <div className="px-3 pt-8 pb-1">
                                <div
                                  className="h-px w-full"
                                  style={{
                                    background: "rgba(255,255,255,.85)"
                                  }}
                                />
                              </div>
                            </div>
                            <ul className="px-3 pb-3">
                              {temas.map((sub, idx) => {
                                const checked =
                                  filtrosSelecionados.subeixos.includes(sub.id);
                                return (
                                  <li key={sub.id} className="py-2">
                                    {idx > 0 && (
                                      <div
                                        className="h-px w-full mb-2"
                                        style={{
                                          background: "rgba(255,255,255,.55)"
                                        }}
                                      />
                                    )}
                                    <button
                                      type="button"
                                      role="checkbox"
                                      aria-checked={checked}
                                      onClick={() =>
                                        toggleSelecionado("subeixos", sub.id)
                                      }
                                      className="w-full flex items-center justify-between gap-3 py-1 text-left"
                                    >
                                      <span className="text-white text-[14px] leading-5 flex-1">
                                        {sub.nome}
                                      </span>
                                      <span className="shrink-0">
                                        <CheckSvg
                                          checked={checked}
                                          stroke="#FFFFFF"
                                        />
                                      </span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })()}
                  </section>

                  <section className="space-y-3 mt-8 text-center">
                    <h3 className="text-[16px] font-semibold uppercase tracking-wide text-slate-700">
                      Selecione a região desejada e as subprefeituras que fazem
                      parte dela.
                    </h3>

                    <div className="mt-2 grid grid-cols-3 gap-3">
                      {zonasOrdenadas.map((name) => {
                        const isCentro = name === "CENTRO";
                        const isActive =
                          zonaSelecionada &&
                          norm(zonaSelecionada) === norm(name);
                        return (
                          <button
                            key={name}
                            onClick={() => {
                              const zonaObj = regionalizacaoArr.find(
                                (r) => norm(r?.nome) === norm(name)
                              );

                              if (zonaObj?.id) {
                                toggleSelecionado("zonas", zonaObj.id); // cards
                                setZonaSelecionada(zonaObj.id); // agora salva o ID
                              }

                              setSubprefOpen(true);
                            }}
                            className={[
                              "h-16 w-full grid place-items-center rounded-xl border-2 transition",
                              isActive
                                ? "bg-black text-white border-black"
                                : "bg-white text-slate-900 border-black"
                            ].join(" ")}
                          >
                            {isCentro ? (
                              <span
                                className="text-[13px] font-bold uppercase tracking-wide"
                                style={{
                                  fontFamily: '"Bebas Neue", sans-serif'
                                }}
                              >
                                CENTRO
                              </span>
                            ) : (
                              <span className="leading-tight text-center">
                                <span className="block text-[10px] uppercase tracking-wide opacity-70">
                                  ZONA
                                </span>
                                <span
                                  className="block text-[13px] font-bold uppercase tracking-wide"
                                  style={{
                                    fontFamily: '"Bebas Neue", sans-serif'
                                  }}
                                >
                                  {name.split(" ").pop()}
                                </span>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 text-left">
                      <button
                        type="button"
                        onClick={() => setSubprefOpen((v) => !v)}
                        className="w-full h-10 rounded-xl border-2 border-black text-black grid grid-cols-[1fr_auto] items-center px-4"
                        aria-expanded={subprefOpen}
                      >
                        <span
                          className="justify-self-center text-[14px] font-bold uppercase tracking-wide"
                          style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                        >
                          Subprefeitura
                        </span>
                        <span className="justify-self-end">
                          {subprefOpen ? "▴" : "▾"}
                        </span>
                      </button>

                      {subprefOpen && (
                        <ul className="mt-3 max-h-64 overflow-y-auto">
                          {subprefsFiltradas.map((sub, idx) => {
                            const checked = (
                              filtrosSelecionados?.subprefeituras || []
                            ).includes(sub.id);
                            return (
                              <li key={sub.id} className="py-2">
                                {idx > 0 && (
                                  <div
                                    className="h-px w-full mb-2"
                                    style={{ background: "rgba(0,0,0,.2)" }}
                                  />
                                )}
                                <button
                                  type="button"
                                  role="checkbox"
                                  aria-checked={checked}
                                  onClick={() =>
                                    toggleSelecionado("subprefeituras", sub.id)
                                  }
                                  className="w-full flex items-center justify-between gap-3 py-1 text-left"
                                >
                                  <span className="text-[14px] leading-5 text-slate-900 flex-1">
                                    {sub.nome}
                                  </span>
                                  <span className="shrink-0">
                                    <CheckSvg checked={checked} stroke="#000" />
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                          {subprefsFiltradas.length === 0 && (
                            <li className="py-3 text-center text-sm text-slate-500">
                              Nenhuma subprefeitura encontrada
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </section>

                  <hr className="border-slate-200 mt-6" />

                  <section className="space-y-3 mt-8 text-left">
                    <h3 className="text-[16px] font-semibold uppercase tracking-wide text-slate-700 text-center">
                      Pesquise por órgão responsável!
                    </h3>

                    <button
                      type="button"
                      onClick={() => setOrgaoOpen((v) => !v)}
                      className="w-full h-10 rounded-xl border-2 border-black text-black grid grid-cols-[1fr_auto] items-center px-4"
                      aria-expanded={orgaoOpen}
                    >
                      <span
                        className="justify-self-center text-[14px] font-bold uppercase tracking-wide"
                        style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                      >
                        Órgão
                      </span>
                      <span className="justify-self-end">
                        {orgaoOpen ? "▴" : "▾"}
                      </span>
                    </button>

                    {orgaoOpen && (
                      <div className="mt-3 rounded-xl border border-black/10 shadow-sm">
                        <div className="p-2">
                          <button
                            type="button"
                            onClick={() => {
                              const selected = new Set(
                                (filtrosSelecionados?.orgaos || []).map(String)
                              );
                              const allIds = orgaosList.map((o) =>
                                String(o.id)
                              );
                              const hasMissing = allIds.some(
                                (id) => !selected.has(id)
                              );
                              if (hasMissing) {
                                orgaosList.forEach((o) => {
                                  if (!selected.has(String(o.id)))
                                    toggleSelecionado("orgaos", o.id);
                                });
                              } else {
                                orgaosList.forEach((o) => {
                                  if (selected.has(String(o.id)))
                                    toggleSelecionado("orgaos", o.id);
                                });
                              }
                            }}
                            className="w-full h-9 rounded-lg border border-black/50 text-black text-[12px] font-semibold"
                          >
                            Selecionar tudo
                          </button>
                        </div>

                        <ul className="max-h-64 overflow-y-auto px-2 pb-2">
                          {[...orgaosList]
                            .sort((a, b) =>
                              (a?.nome || "").localeCompare(
                                b?.nome || "",
                                "pt",
                                { sensitivity: "base" }
                              )
                            )
                            .map((org, idx) => {
                              const checked = new Set(
                                (filtrosSelecionados?.orgaos || []).map(String)
                              ).has(String(org.id));
                              return (
                                <li key={org.id} className="py-2">
                                  {idx > 0 && (
                                    <div className="h-px w-full mb-2 bg-black/20" />
                                  )}
                                  <button
                                    type="button"
                                    role="checkbox"
                                    aria-checked={checked}
                                    onClick={() =>
                                      toggleSelecionado("orgaos", org.id)
                                    }
                                    className="w-full flex items-center justify-between gap-3 py-1 text-left"
                                  >
                                    <span className="text-[14px] leading-5 text-slate-900 flex-1">
                                      {org.nome}
                                    </span>
                                    <span className="shrink-0">
                                      <CheckSvg
                                        checked={checked}
                                        stroke="#000"
                                      />
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    )}
                  </section>

                  <hr className="border-slate-200 mt-6" />

                  <section className="space-y-3 mt-8 text-left">
                    <h3 className="text-[16px] font-semibold uppercase tracking-wide text-slate-700 text-center">
                      Pesquise pela relação com outros planos municipais!
                    </h3>

                    <button
                      type="button"
                      onClick={() => setPlanosOpen((v) => !v)}
                      className="w-full h-10 rounded-xl border-2 border-black text-black grid grid-cols-[1fr_auto] items-center px-4"
                      aria-expanded={planosOpen}
                    >
                      <span
                        className="justify-self-center text-[12px] font-bold uppercase tracking-wide"
                        style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                      >
                        Planos vinculados
                      </span>
                      <span className="justify-self-end">
                        {planosOpen ? "▴" : "▾"}
                      </span>
                    </button>

                    {planosOpen && (
                      <div className="mt-3 rounded-xl border border-black/10 shadow-sm">
                        <div className="p-2">
                          <button
                            type="button"
                            onClick={() => {
                              const selected = new Set(
                                (
                                  filtrosSelecionados?.planos_vinculados || []
                                ).map(String)
                              );
                              const allIds = planosList.map((p) =>
                                String(p.id)
                              );
                              const hasMissing = allIds.some(
                                (id) => !selected.has(id)
                              );
                              if (hasMissing) {
                                planosList.forEach((p) => {
                                  if (!selected.has(String(p.id)))
                                    toggleSelecionado(
                                      "planos_vinculados",
                                      p.id
                                    );
                                });
                              } else {
                                planosList.forEach((p) => {
                                  if (selected.has(String(p.id)))
                                    toggleSelecionado(
                                      "planos_vinculados",
                                      p.id
                                    );
                                });
                              }
                            }}
                            className="w-full h-9 rounded-lg border border-black/50 text-black text-[12px] font-semibold"
                          >
                            Selecionar tudo
                          </button>
                        </div>

                        <ul className="max-h-64 overflow-y-auto px-2 pb-2">
                          {[...planosList]
                            .sort((a, b) =>
                              (a?.nome || "").localeCompare(
                                b?.nome || "",
                                "pt",
                                { sensitivity: "base" }
                              )
                            )
                            .map((plano, idx) => {
                              const checked = new Set(
                                (
                                  filtrosSelecionados?.planos_vinculados || []
                                ).map(String)
                              ).has(String(plano.id));
                              return (
                                <li key={plano.id} className="py-2">
                                  {idx > 0 && (
                                    <div className="h-px w-full mb-2 bg-black/20" />
                                  )}
                                  <button
                                    type="button"
                                    role="checkbox"
                                    aria-checked={checked}
                                    onClick={() =>
                                      toggleSelecionado(
                                        "planos_vinculados",
                                        plano.id
                                      )
                                    }
                                    className="w-full flex items-center justify-between gap-3 py-1 text-left"
                                  >
                                    <span className="text-[14px] leading-5 text-slate-900 flex-1">
                                      {plano.nome}
                                    </span>
                                    <span className="shrink-0">
                                      <CheckSvg
                                        checked={checked}
                                        stroke="#000"
                                      />
                                    </span>
                                  </button>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    )}
                  </section>

                  <hr className="border-slate-700 mt-6" />

                  <section className="space-y-2">
                    <h3 className="text-[16px] font-semibold uppercase tracking-wide text-slate-700 text-center">
                      Filtre de acordo com os Objetivos de Desenvolvimento
                      Sustentável — ODS
                    </h3>

                    <div className="grid grid-cols-3 gap-2">
                      {(odsList ?? []).map((odsItem) => {
                        const active = filtrosSelecionados.ods.includes(
                          odsItem.id
                        );
                        return (
                          <button
                            key={odsItem.id}
                            type="button"
                            onClick={() => toggleSelecionado("ods", odsItem.id)}
                            className={[
                              "rounded-lg p-2 border text-center transition-all duration-200 overflow-hidden",
                              active
                                ? "ring-2 ring-slate-800 border-slate-800"
                                : "border-slate-200"
                            ].join(" ")}
                            style={{
                              backgroundColor: odsItem?.cor || "transparent"
                            }}
                            aria-pressed={active}
                            title={odsItem.nome}
                          >
                            <SafeSVG
                              src={corrigirUrlImagem(odsItem.icone)}
                              alt={odsItem.nome}
                              className="w-12 h-12 mx-auto"
                            />
                            <div className="mt-1 text-white text-[12px] font-semibold leading-4">
                              {odsItem.nome}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
