import { useEffect, useState } from "react";
import FiltroParticipacao from "@/components/FiltroParticipacao/FiltroParticipacao";
import ModalResultados from "@/components/ModalResultados/ModalResultados";
import ModalDetalhe from "@/components/ModalDetalhe/ModalDetalhe";
import Devolutivas from "./Devolutivas";
import Audiencia from "./Audiencia";
import { getParticipacaoData } from "@/services/Participacao/getParticipacaoData";
import { postFiltroParticipacaoData } from "@/services/Participacao/postFiltroParticipacaoData";

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
        // CORREÇÃO: A API de busca retorna um array diretamente
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
    <div>
      <div className="flex items-start justify-center flex-col w-[80%] pt-24 mx-34">
        <h1 className="text-[5rem] text-[var(--color-navy)]">{data.titulo}</h1>
        <div className="h-1 w-[95rem] bg-[color:var(--color-navy)]"></div>
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
    </div>
  );
}