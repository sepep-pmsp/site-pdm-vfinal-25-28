import React, { useMemo, useState } from "react";
import { normalizarOrgaos } from "@/shared/utils/normalizadores";
import { corrigirUrlImagem } from "@/shared/utils/imageUtils";
import SafeSVG from "@/shared/components/ui/SafeSVG";

const LIMITE_INICIAL = 3;

function getIdForFilter(id) {
  const numberId = Number(id);
  return Number.isNaN(numberId) ? id : numberId;
}

function isSelected(lista = [], id) {
  return Array.isArray(lista) && lista.some((item) => String(item) === String(id));
}

function getNomeZona(nome = "") {
  return nome.replace(/^zona\s+/i, "").trim();
}

export default function Filtro({ data, filtrosSelecionados = {}, toggleSelecionado, limparFiltros,}) {
  const [verMais, setVerMais] = useState({
    subprefeituras: false,
    orgaos: false,
    ods: false,
    planos_setoriais: false,
  });

  const regioes = data?.regionalizacao || [];
  const orgaos = useMemo(() => normalizarOrgaos(data?.orgaos || []), [data?.orgaos]);
  const planosSetoriais = data?.planos_setoriais || [];
  const ods = data?.ods || [];

  const subprefeiturasFiltradas = useMemo(() => {
    const zonasSelecionadas = filtrosSelecionados.zonas || [];

    if (zonasSelecionadas.length > 0) {
      return regioes
        .filter((regiao) => isSelected(zonasSelecionadas, regiao.id))
        .flatMap((regiao) => regiao.subprefeituras || []);
    }

    return regioes.flatMap((regiao) => regiao.subprefeituras || []);
  }, [regioes, filtrosSelecionados.zonas]);

  function toggleVerMais(tipo) {
    setVerMais((prev) => ({
      ...prev,
      [tipo]: !prev[tipo],
    }));
  }

  function getListaVisivel(tipo, lista) {
    if (verMais[tipo]) return lista;
    return lista.slice(0, LIMITE_INICIAL);
  }

  function renderTitulo(titulo) {
    return (
      <span className="flex flex-col items-start w-full">
        <h2 className="text-[var(--color-navy)] text-xl xl:text-3xl uppercase leading-none">
          {titulo}
        </h2>
        <p className="h-0.5 bg-[var(--color-navy)] w-full mt-2 mb-3 !break-words"></p>
      </span>
    );
  }

  function renderVerMais(tipo, lista) {
    if (!Array.isArray(lista) || lista.length <= LIMITE_INICIAL) return null;

    return (
      <button type="button" onClick={() => toggleVerMais(tipo)} className="underline text-[var(--color-navy)] mt-3">
        <p className="!font-semibold">{verMais[tipo] ? "Ver Menos" : "Ver Mais"}</p>
      </button>
    );
  }

  function renderCheckItem(tipo, item) {
    const idForFilter = getIdForFilter(item.id);
    const selecionado = isSelected(filtrosSelecionados[tipo], idForFilter);

  return (
    <button key={item.id ?? idForFilter} type="button" onClick={() => toggleSelecionado(tipo, idForFilter)} className="flex w-full min-w-0 items-start gap-3 text-left text-[0.7rem] leading-tight text-black">
      <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-sm ${ selecionado ? "bg-[#aaa7e8]" : "bg-[#d9d9d9]" }`}>
        {selecionado && ( <i className="fa-solid fa-check text-[var(--color-navy)] text-xs"></i> )}
      </span>

      <p className="w-50 flex-1 !break-words text-sm !font-medium whitespace-normal"> {item.nome} </p>
    </button>
  );
}

  function renderListaComVerMais(titulo, tipo, lista) {
    const listaSegura = Array.isArray(lista) ? lista : [];
    const listaVisivel = getListaVisivel(tipo, listaSegura);

    return (
      <section className="w-full min-w-0">
        <h3>{renderTitulo(titulo)}</h3>

        <div className="flex flex-col gap-2">
          {listaVisivel.length > 0 ? (
            listaVisivel.map((item) => renderCheckItem(tipo, item))
          ) : (
            <p className="text-gray-500">Nenhum item disponível.</p>
          )}
        </div>

        {renderVerMais(tipo, listaSegura)}
      </section>
    );
  }

  function renderODS() {
    const listaVisivel = getListaVisivel("ods", ods);
    return (
      <section className="w-full">
        {renderTitulo("Por ODS")}
        <div className="flex flex-col gap-2">
          {listaVisivel.map((odsItem) => {
            const idForFilter = getIdForFilter(odsItem.id);
            const selecionado = isSelected(filtrosSelecionados.ods, idForFilter);

            return (
              <button key={odsItem.id} type="button" onClick={() => toggleSelecionado("ods", idForFilter)} className="flex items-center gap-3 w-full text-left leading-tight text-black min-w-0" title={odsItem.nome}>
                <span className={`grid h-8 w-8 shrink-0 place-items-center items-center justify-center overflow-hidden border-2 transition rounded-sm ${selecionado ? "!border-2 !border-[var(--color-navy)]" : "border-transparent"}`} style={{ backgroundColor: odsItem.cor }}>
                  <SafeSVG src={corrigirUrlImagem(odsItem.icone)} alt={odsItem.nome} className="h-6 w-6 "/>
                </span>
                <p className="w-50 flex-1 !break-words text-sm !font-medium whitespace-normal">{odsItem.nome}</p>
              </button>
            );
          })}
        </div>
        {renderVerMais("ods", ods)}
      </section>
    );
  }

  if (!data) {
    return <p>Carregando filtros...</p>;
  }

  return (
    <aside className="h-full w-full md:w-60 lg:w-full lg:min-w-0 overflow-hidden rounded-2xl shadow-[inset_0_0_5px_grey]">
    <div className="flex h-full flex-col gap-6 overflow-y-auto overflow-x-hidden p-4 pt-8 scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 no-scrollbar-arrows">
      <section className="w-full">
        {renderTitulo("Por Zonas")}
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-1">
          {regioes.map((regiao) => {
            const idForFilter = getIdForFilter(regiao.id);
            const selecionado = isSelected(filtrosSelecionados.zonas, idForFilter);

            return (
              <button key={regiao.id} type="button" onClick={() => toggleSelecionado("zonas", idForFilter)} className={`border border-[var(--color-navy)] px-1 py-1 transition rounded-sm hover:bg-[#D4D2EE] ${ selecionado ? "bg-[var(--color-navy)] text-white" : "bg-white text-[var(--color-navy)]" }`}>
                <p className="!font-light" dangerouslySetInnerHTML={{   __html: getNomeZona(regiao.nome), }} />
              </button>
            );
          })}
        </div>
      </section>
      {renderListaComVerMais("Por Subprefeitura", "subprefeituras", subprefeiturasFiltradas)}
      {renderListaComVerMais("Por Órgão", "orgaos", orgaos)}
      {renderODS()}
      {renderListaComVerMais("Por Plano Vinculado", "planos_setoriais", planosSetoriais)}
      <button type="button" onClick={limparFiltros} className="w-full rounded-md bg-[#2F7D3F] px-4 py-2 uppercase text-white transition hover:opacity-90">
        <p>Limpar filtros</p>
      </button>
    </div>
  </aside>
  );
}