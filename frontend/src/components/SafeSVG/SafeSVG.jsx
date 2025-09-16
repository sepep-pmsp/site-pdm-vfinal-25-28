import React, { useEffect, useState } from "react";

function SafeSVG({ src, className = "", ...props }) {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    if (!src) return;

    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const svg = doc.querySelector("svg");

        if (!svg) return;

        // Adiciona classe diretamente no <svg>
        if (className) {
          svg.setAttribute("class", className);
        }

        // Converte cada atributo para JSX (opcional, mas garante compatibilidade)
        setSvgContent(svg.outerHTML);
      })
      .catch(console.error);
  }, [src, className]);

  if (!svgContent) return null;

  // Aqui retornamos apenas o SVG puro sem div
  return (
    <svg
      {...props}
      dangerouslySetInnerHTML={{ __html: svgContent.replace(/<svg[^>]*>|<\/svg>/g, "") }}
      className={className}
    />
  );
}

export default SafeSVG;
