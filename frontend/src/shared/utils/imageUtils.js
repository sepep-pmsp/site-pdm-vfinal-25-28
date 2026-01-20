export const corrigirUrlImagem = (url) => {
  if (!url) {
    return "";
  }

  let urlCorrigida = url.replace("http://", "https://");

  if (!urlCorrigida.includes("/backend/api/")) {
    const partes = urlCorrigida.split("/api/");
    if (partes.length > 1) {
      urlCorrigida = `${partes[0]}/backend/api/${partes[1]}`;
    }
  }

  return urlCorrigida;
};