import { useEffect, useState } from "react";

function SafeSVG({ src, ...props }) {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    if (!src) return;
    fetch(src)
      .then((res) => res.text())
      .then((text) => setSvgContent(text))
      .catch(console.error);
  }, [src]);

  if (!svgContent) return null;

  return (
    <div
      {...props}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

export default SafeSVG;
//used like this to replace img tags for SVGs
//<SafeSVG src={eixo.imagem} className="w-32 h-32" />