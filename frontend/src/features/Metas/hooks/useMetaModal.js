import { useEffect, useRef, useState } from "react";

export function useMetaModal() {
  const contentRef = useRef(null);
  const [closing, setClosing] = useState(false);
  const [needsScroll, setNeedsScroll] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const checkScroll = () => {
      if (!contentRef.current) return;
      setNeedsScroll(
        contentRef.current.scrollHeight > window.innerHeight
      );
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const close = (cb) => {
    setClosing(true);
    setTimeout(cb, 400);
  };

  return {
    contentRef,
    closing,
    needsScroll,
    close,
  };
}
