import React, { useEffect, useState } from "react";

function SafeSVG({ src, className = "", style = {}, ...props }) {
  const [svgContent, setSvgContent] = useState(null);
  const [isImageFallback, setIsImageFallback] = useState(false);
  const [finalSrc, setFinalSrc] = useState(src);

  useEffect(() => {
    if (!src) {
      setSvgContent(null);
      setIsImageFallback(false);
      setFinalSrc(src);
      return;
    }

    let cancelled = false;

    async function fetchSvg() {
      setFinalSrc(src);
      setSvgContent(null);
      setIsImageFallback(false);

      try {
        const resp = await fetch(src, {
          method: "GET",
          mode: "cors",
        });

        if (!resp || !resp.ok) {
          setIsImageFallback(true);
          return;
        }

        const contentType = resp.headers ? resp.headers.get("content-type") : null;
        const text = await resp.text();

        // tenta DOMParser
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, "image/svg+xml");
          const svg = doc.querySelector("svg");
          if (svg && svg.outerHTML) {
            if (className) svg.setAttribute("class", className);
            if (!cancelled) {
              setSvgContent(svg.outerHTML);
              setIsImageFallback(false);
            }
            return;
          }
        // eslint-disable-next-line no-unused-vars
        } catch (e) {
          // silent
        }
        const svgMatch = text.match(/<svg[\s\S]*?<\/svg>/i);
        if (svgMatch && svgMatch[0]) {
          let extracted = svgMatch[0];
          if (className) {
            extracted = extracted.replace(/^<svg/, `<svg class="${className}"`);
          }
          if (!cancelled) {
            setSvgContent(extracted);
            setIsImageFallback(false);
          }
          return;
        }
        if (!contentType || !contentType.includes("svg")) {
          setIsImageFallback(true);
          return;
        }
        setIsImageFallback(true);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        
        setIsImageFallback(true);
      }
    }

    fetchSvg();

    return () => {
      cancelled = true;
    };
  }, [src, className]);

  if (isImageFallback && finalSrc) {
    return (
      <img
        src={finalSrc}
        alt={props.alt || "imagem"}
        className={className}
        style={{ maxWidth: "100%", height: "auto", ...style }}
        crossOrigin="anonymous"
        {...props}
      />
    );
  }

  if (!svgContent) return null;

  return (
    <div
      {...props}
      className={className}
      style={{ display: "inline-block", width: "100%", ...style }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

export default SafeSVG;
