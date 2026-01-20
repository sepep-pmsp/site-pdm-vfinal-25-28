import { useState, useEffect, useRef } from "react";
import { getEixosData } from "@/features/home/services/getEixosData";

export function useEixos(eixoSelecionadoDoMenu) {
  const universoRef = useRef(null);
  const cidadeRef = useRef(null);
  const viverRef = useRef(null);
  const capitalRef = useRef(null);

  const refs = {
    universo: universoRef,
    cidade: cidadeRef,
    viver: viverRef,
    capital: capitalRef,
  };

  const [eixos, setEixos] = useState([]);
  const [selected, setSelected] = useState(null);

  // Busca os dados
  useEffect(() => {
    getEixosData().then((data) => setEixos(data || []));
  }, []);

  // Quando muda o eixo selecionado
  useEffect(() => {
    if (!eixoSelecionadoDoMenu || !eixos.length) return;

    const nome = eixoSelecionadoDoMenu.toLowerCase();
    const eixo = eixos.find((e) => e.nome.toLowerCase().includes(nome));
    if (!eixo) return;

    // ✅ Acessa as refs diretamente
    const refTarget =
      nome === "universo"
        ? universoRef
        : nome === "cidade"
        ? cidadeRef
        : nome === "viver"
        ? viverRef
        : nome === "capital"
        ? capitalRef
        : null;

    refTarget?.current?.scrollIntoView({ behavior: "smooth" });

    setTimeout(
      () =>
        setSelected({
          ...eixo,
          origin: { x: 0, y: 0, width: 0, height: 0 },
        }),
      700
    );
  }, [eixoSelecionadoDoMenu, eixos]);

  const handleSelect = (nome) => {
    const eixo = eixos.find((e) => e.nome.toLowerCase().includes(nome));
    if (eixo) setSelected({ ...eixo, origin: { x: 0, y: 0, width: 0, height: 0 } });
  };

  const getTitulo = (nome) => {
    const titulo = eixos.find((e) => e.nome.toLowerCase().includes(nome))?.titulo ?? "";
    const parts = titulo.split(/\s[eE]\s/);
    return parts.length > 1 ? (
      <>
        {parts[0]} E<br />
        {parts.slice(1).join(" e ")}
      </>
    ) : (
      titulo
    );
  };

  return { refs, selected, setSelected, handleSelect, getTitulo };
}
