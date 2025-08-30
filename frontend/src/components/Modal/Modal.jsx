import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, children }) {
  const [visible, setVisible] = useState(isOpen);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let timer;

    if (isOpen) {
      setVisible(true);
      setClosing(false);
      document.body.style.overflow = "hidden"; // bloqueia scroll da página
    } else if (visible) {
      setClosing(true);
      document.body.style.overflow = ""; // libera scroll
      timer = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, 400); // tempo do efeito de fechamento, se tiver animação
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = ""; // garante que o scroll volta se o componente desmontar
    };
  }, [isOpen, visible]);

  if (!visible) return null;

  return createPortal(
    <div className={`fixed inset-0 z-50 ${closing ? "fade-out-class" : "fade-in-class"}`}>
      {children}
    </div>,
    document.body
  );
}
