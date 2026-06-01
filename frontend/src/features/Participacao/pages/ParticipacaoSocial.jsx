import { useEffect, useState } from "react";
import { FiltroParticipacao, ModalResultados, ModalDetalhe } from "../components";
import Devolutivas from "./Devolutivas";
import Audiencia from "./Audiencia";
import { getParticipacaoData } from "../services/getParticipacaoData";
import { postFiltroParticipacaoData } from "../services/postFiltroParticipacaoData";

export default function ParticipacaoSocial() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selecionado, setSelecionado] = useState(null);
  const [resultados, setResultados] = useState(null);
  const [loadingResultados, setLoadingResultados] = useState(false);
  
  const buscarResultados = (filtrosSelecionados) => {
    setLoadingResultados(true);
    setResultados(null);
    setModalOpen(true);

    postFiltroParticipacaoData(filtrosSelecionados)
      .then((res) => {
        setResultados(res);
      })
      .catch((err) => {
        console.error("Erro ao buscar resultados filtrados:", err);
        setResultados([]);
      })
      .finally(() => {
        setLoadingResultados(false);
      });
  };

  useEffect(() => {
    getParticipacaoData()
      .then((apiData) => {
        if (Array.isArray(apiData) && apiData.length > 0) {
          setData(apiData[0]);
          postFiltroParticipacaoData({})
            .then((res) => {
              setResultados(res);
            })
            .catch((err) => {
              console.error("Erro na busca inicial de resultados:", err);
              setResultados([]);
            });
        } else {
          setData(apiData);
          setResultados([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro no carregamento inicial:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dados.</p>;
  if (!data) return <p>Nenhum dado encontrado.</p>;

  const handleAplicarFiltros = (filtrosSelecionados) => {
    buscarResultados(filtrosSelecionados);
  };

  return (
    <>
      <div className="flex items-start justify-center flex-col w-full pt-24 max-w-container">
        <h1 className="max-xl:text-5xl max-xl:relative max-xl:left-15 max-lg:left-0 lg:text-7xl text-[var(--color-navy)]">Participação Social</h1>
        <div className="w-full h-1  bg-[color:var(--color-navy)]"></div>
      </div>
      <Devolutivas
        devolutivas={data.devolutivas}
        apresentacao={data.apresentacao}
      />
      <FiltroParticipacao filtros={data.filtro} onFiltrar={handleAplicarFiltros} />
      <ModalResultados
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        resultados={resultados}
        onSelecionar={setSelecionado}
        loading={loadingResultados}
      />
      <ModalDetalhe
        isOpen={!!selecionado}
        selecionado={selecionado}
        onClose={() => setSelecionado(null)}
      />
      <Audiencia audiencia={data.audiencia} />
    </>
  );
}