import React, { useEffect, useState } from "react";

export default function ModalPrefeito({ isOpen, onClose, carta }) {
    const [visible, setVisible] = useState(isOpen);
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        let timer;

        if (isOpen) {
            setVisible(true);
            setClosing(false);
            document.body.style.overflow = "hidden";
        } else if (visible) {
            setClosing(true);
            document.body.style.overflow = "";
            timer = setTimeout(() => {
                setVisible(false);
                setClosing(false);
            }, 400);
        }

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
        };
    }, [isOpen, visible]);

    if (!visible) return null;

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${closing ? "opacity-0" : "opacity-100"} bg-black/40`} onClick={onClose}>
            <div className={`bg-[var(--color-navy)] w-full max-h-full overflow-y-auto hide-scroll lg:rounded-3xl px-2 ${closing ? "slide-out-bottom" : "animate-slide-up"}`} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "1726px", margin: "0 auto" }}>
                <div className="flex flex-col flex-nowrap justify-center items-center">
                    <div className="p-4 flex justify-start flex-col items-end flex-nowrap w-full">
                        <button className="cursor-pointer fixed pr-8" onClick={onClose}>
                            <i className="fa-solid fa-xmark text-white text-4xl lg:text-6xl"></i>
                        </button>
                    </div>
                    <div className="flex flex-col flex-nowrap items-start gap-8 p-8">
                        <div>
                            <h2 className="text-6xl font-bold text-white">
                                {carta?.titulo || "Título não disponível"}
                            </h2>
                            <p className="text-white text-2xl"> {carta?.nome_prefeito || "Nome não disponível"} </p>
                        </div>
                        <div className="flex flex-col gap-8 lg:flex-row">
                            {carta?.paragrafos?.map((par, index) => (
                                <p className="text-white text-sm xl:text-lg xl:font-light" key={index} dangerouslySetInnerHTML={{ __html: par }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}