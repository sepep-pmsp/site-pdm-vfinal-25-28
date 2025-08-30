import { useState } from "react";
import { useParticipacaoData } from "@/hooks/useParticipacaoData";
import FiltroParticipacao from "@/components/FiltroParticipacao/FiltroParticipacao";
import ModalResultados from "@/components/ModalResultados/ModalResultados";
import ModalDetalhe from "@/components/ModalDetalhe/ModalDetalhe";
import Devolutivas from "./Devolutivas";
import Audiencia from "./Audiencia";

export default function ParticipacaoSocial() {
  const { data, loading, error, resultados, aplicarFiltros } =
    useParticipacaoData();
  const [modalOpen, setModalOpen] = useState(false);
  const [selecionado, setSelecionado] = useState(null);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dados.</p>;
  if (!data || data.length === 0) return <p>Nenhum dado encontrado.</p>;

  const filtros = data[0]?.filtro || {};

  const handleAplicarFiltros = (filtrosSelecionados) => {
    aplicarFiltros(filtrosSelecionados);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="flex items-start justify-center flex-col w-[80%] pt-24 mx-34">
        <h1 className="text-[5rem] text-[var(--color-navy)]">
          participação social
        </h1>
        <div className="h-1 w-[95rem] bg-[color:var(--color-navy)]"></div>
      </div>
      <Devolutivas />
      <FiltroParticipacao filtros={filtros} onFiltrar={handleAplicarFiltros} />
      <ModalResultados
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        resultados={resultados}
        onSelecionar={setSelecionado}
      />
      <ModalDetalhe
        isOpen={!!selecionado}
        resultados={resultados}
        selecionado={selecionado}
        detalhe={selecionado?.detalhe}
        onClose={() => setSelecionado(null)}
      />
      <Audiencia/>
    </div>
  );
}
