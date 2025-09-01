// src/utils/urlUtils.js

/**
 * Corrige uma URL de imagem da API, garantindo o protocolo HTTPS
 * e o caminho correto para o backend.
 * @param {string} url A URL da imagem a ser corrigida.
 * @returns {string} A URL corrigida.
 */
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