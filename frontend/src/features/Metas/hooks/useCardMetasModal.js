import { useEffect, useRef, useState } from "react";

export function useCardMetasModal(meta, onClose) {
    const [closing, setClosing] = useState(false);
    const contentRef = useRef(null);
    const [needsScroll, setNeedsScroll] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const calculateScroll = () => {
            if (contentRef.current) {
                setNeedsScroll(contentRef.current.scrollHeight > window.innerHeight);
            }
        };
        calculateScroll();
        window.addEventListener("resize", calculateScroll);
        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("resize", calculateScroll);
        };
    }, []);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => onClose(), 400);
    };

    // Lógica do Título extraída para o Hook
    const getParsedTitle = () => {
        const tituloHtml = meta?.listing?.titulo || "";
        const regex = /<strong>(.*?)<\/strong>([,.]?)(.*)/;
        const match = tituloHtml.match(regex);

        if (match) {
            return {
                strongText: (match[1] + match[2]).trim(),
                normalText: match[3].trim()
            };
        }

        return {
            strongText: tituloHtml,
            normalText: ""
        };
    };

    const hexToRgba = (hex, alpha) => {
        if (!hex) return "";
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return { 
        closing, 
        contentRef, 
        needsScroll, 
        handleClose, 
        hexToRgba, 
        parsedTitle: getParsedTitle() 
    };
}