import Selo from "../../../../shared/assets/svg/selo-atingida.svg";

export default function MetaModalHeader({ meta, onClose }) {
    return (
        <div className="flex flex-col items-end justify-center lg:items-center">
            <div className="w-full h-full py-2 px-4 relative z-10" style={{ backgroundColor: meta.card.eixo_cor_principal }}>
                <section className="max-w-container">
                    <button onClick={(e) => {onClose(e);}} className="text-white text-xl lg:text-3xl flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <i className="fa-solid fa-arrow-left text-white"></i>
                        Voltar
                    </button>
                </section>
            </div>
            <div className="relative bottom-11 pointer-events-none z-10">
                <img src={Selo} alt="icon de bandeira da meta atingida" className="w-full lg:w-30"/>
            </div>
        </div>
    );
}
