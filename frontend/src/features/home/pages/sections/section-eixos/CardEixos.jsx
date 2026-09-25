import React, { useEffect, useState } from "react";
import CustomButton from "@/shared/components/ui/Button";
import SafeSVG from "@/shared/components/ui/SafeSVG";
import { corrigirUrlImagem } from "@/shared/utils/imageUtils";
import { useNavigate } from "react-router-dom";

export default function CardEixos({ eixo, onClose }) {
    const animations = {
        "viver são paulo": { in: "scale-in-bl", out: "scale-out-bl" },
        "universo sp": { in: "scale-in-tl", out: "scale-out-tl" },
        "cidade empreendedora": { in: "scale-in-tr", out: "scale-out-tr" },
        "capital do futuro": { in: "scale-in-br", out: "scale-out-br" },
    };

    const colorBackground = {
        "universo sp": { backgroundColor: "var(--color-green)" },
        "viver são paulo": { backgroundColor: "#F16622" },
        "cidade empreendedora": { backgroundColor: "#0000AB" },
        "capital do futuro": { backgroundColor: "#792D49" },
    };
    const key = eixo?.nome?.toLowerCase?.() || "";
    const bgStyle = colorBackground[key] || { backgroundColor: eixo?.cor_principal || "transparent" };

    const [isExiting, setIsExiting] = useState(false);
    const animationSet = animations[eixo.nome.toLowerCase()] || { in: "", out: "" };

    const navigate = useNavigate();
    const goToMetas = (eixoId) => {
        navigate("/manutencao", { state: { eixoIdFiltro: eixoId } });
    };

    useEffect(() => {
        if (isExiting) {
            const t = setTimeout(() => onClose(), 500);
            return () => clearTimeout(t);
        }
    }, [isExiting, onClose]);

    return (
        <div className={`p-8 text-white card-eixos ${isExiting ? animationSet.out : animationSet.in}`} style={{ bgStyle: colorBackground, ...bgStyle }} >
            <button onClick={() => setIsExiting(true)} className="absolute top-4 right-4 text-white">
                <i className="fa-solid fa-xmark md:text-6xl text-4xl"></i>
            </button>
            <div className="grid gap-4 items-start p-4 conteudo-eixos grid-cols-1 md:grid-cols-2">
                <div className="w-full md:w-[25rem] flex flex-col gap-4 container-eixos-mobile order-1 md:order-none">
                    <section>
                        <SafeSVG src={corrigirUrlImagem(eixo.imagem)} className="w-auto h-28"/>
                    </section>
                    <section className="p-4">
                        <ul className="listCard text-left">
                            {eixo.lista.map((item, i) => (
                                <li key={i} className="itemListCard py-1">
                                    <p className="md:text-xl capitalize">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
                <div className="order-2 md:order-none md:col-start-2 md:row-start-1">
                    <section className="!flex flex-col items-center justify-start md:items-center md:justify-center">
                        {eixo.texto.map((paragrafo, i) => (
                            <p className="py-2 text-left" key={i}>
                                {paragrafo}
                            </p>
                        ))}
                    </section>
                </div>
                <section className="pt-4 order-3 md:order-none md:col-start-1 md:row-start-2 max-md:w-full">
                    <CustomButton onClick={() => goToMetas(eixo.id)} type="link" style={{ color: eixo.cor_principal }} className="buttons_metas bg-[var(--color-white)] h-28 md:text-3xl uppercase font-family cursor-pointer w-full">
                        veja as metas
                    </CustomButton>
                </section>
            </div>
        </div>
    );
}