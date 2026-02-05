export function getMetaSlug(meta) {
  if (!meta || !meta.card) return "";

  const normalize = (str) =>
    (str || "")
      .replace(/<\/?strong>/gi, "")
      .replace(/<[^>]*>/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const eixo = normalize(meta.card.eixo_nome);
  const numero = meta.card.numero;
  const indicadorValor = normalize(meta.card.indicador?.valor || "");
  
  return `${eixo}-${numero}-${indicadorValor}`;
}