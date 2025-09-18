import React, { useEffect, useState } from "react";
import { getMetasIniciais } from "@/services/Metas/getMetasData";
import { postFiltrosSelecionados } from "@/services/Metas/getFiltroMetasData";
import CardMetas from "@/components/Meta/CardMetas";
import MetasDesktop from "./MetasDesktop";
import MetasMobile from "./MetasMobile";

export default function Metas() {
  const [metas, setMetas] = useState([]);
  const [selectedMeta, setSelectedMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMetasIniciais()
      .then((data) => {
        setMetas(data.resultados);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const filtrosIniciais = {
      ods: [],
      planos_setoriais: [],
      orgaos: [],
      eixos: [],
      temas: [],
      subprefeituras: [],
      zonas: [],
      termo_busca: "",
    };

    postFiltrosSelecionados(filtrosIniciais)
      .then((res) => {
        setMetas(res.metas);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-center">Carregando...</div>;

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <MetasMobile
          metas={metas}
          setMetas={setMetas}
          onSelectMeta={setSelectedMeta}
        />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <MetasDesktop
          metas={metas}
          setMetas={setMetas}
          onSelectMeta={setSelectedMeta}
        />
      </div>

      {selectedMeta && (
        <CardMetas meta={selectedMeta} onClose={() => setSelectedMeta(null)} />
      )}
    </>
  );
}
