import { useState, useEffect } from "react";

/**
 * Hook para detectar se a tela está em modo "mobile"
 * @param {number} breakpoint - largura máxima em px (padrão: 725)
 * @returns {boolean} isMobile
 **/
export function useIsMobile(breakpoint = 1281) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= breakpoint;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}