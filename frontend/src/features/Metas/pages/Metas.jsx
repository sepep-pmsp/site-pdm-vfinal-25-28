import React, { useEffect, useState } from "react";
import { getMetasIniciais } from "../services/getMetasData";
import { useIsMobile } from "../../../shared/hooks/useIsMobile";
import { CardMetas, CardMetasMobile } from "../components";
import MetasDesktop from "./MetasDesktop";
import MetasMobile from "./MetasMobile";

export default function Metas() {
  const [metas, setMetas] = useState([]);
  const [selectedMeta, setSelectedMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile(1281);

  useEffect(() => {
    getMetasIniciais()
      .then((data) => {
        setMetas(data.resultados);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-center">Carregando...</div>;

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden metas-mobile-wrapper">
        <MetasMobile
          metas={metas}
          setMetas={setMetas}
          onSelectMeta={setSelectedMeta}
        />
      </div>

      {/* Desktop */}
      <div className="hidden md:block metas-mobile-wrapper-desktop">
        <MetasDesktop
          metas={metas}
          setMetas={setMetas}
          onSelectMeta={setSelectedMeta}
        />
      </div>

      {selectedMeta &&
        (isMobile ? (
          <CardMetasMobile
            meta={selectedMeta}
            onClose={() => setSelectedMeta(null)}
          />
        ) : (
          <CardMetas
            meta={selectedMeta}
            onClose={() => setSelectedMeta(null)}
          />
        ))}
    </>
  );
}