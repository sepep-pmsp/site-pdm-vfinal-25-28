import React from "react";
import Selo from "@/shared/assets/svg/selo-atingida.svg";

export default function MetaModalHeader({ meta, onClose }) {
    const status = meta?.card?.monitoramento?.toLowerCase() || "";
    const isAtingida = status.includes("atingida");

    return (
        <div className="flex flex-col items-end justify-center lg:items-center relative">
            <div className="w-full h-full py-2 px-4 relative z-10" style={{ backgroundColor: meta.card.eixo_cor_principal }}>
                <section className="max-w-container w-full">
                    <button onClick={(e) => {onClose(e);}} className="text-white text-xl lg:text-3xl flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <i className="fa-solid fa-arrow-left text-white"></i>
                        Voltar
                    </button>
                </section>
            </div>
            {isAtingida && (
                <div className="absolute top-px pointer-events-none z-10">
                    <img src={Selo} alt="Ícone de bandeira da meta atingida" className="w-20 lg:w-30 drop-shadow-md"/>
                </div>
            )}
        </div>
    );
}