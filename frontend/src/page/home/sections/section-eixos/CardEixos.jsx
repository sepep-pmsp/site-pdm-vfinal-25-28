import React, { useEffect, useState } from "react";
import CustomButton from "@/components/Button/Button";
import SafeSVG from "@/components/SafeSVG/SafeSVG";
import { corrigirUrlImagem } from "@/utils/imageUtils";
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
        navigate("/metas", { state: { eixoIdFiltro: eixoId } });
    };

    useEffect(() => {
        if (isExiting) {
            const t = setTimeout(() => onClose(), 500);
            return () => clearTimeout(t);
        }
    }, [isExiting, onClose]);

    return (
        <div
            className={`p-8 text-white card-eixos ${isExiting ? animationSet.out : animationSet.in}`}
            style={{ bgStyle: colorBackground, ...bgStyle }}
        >
            <button
                onClick={() => setIsExiting(true)}
                className="absolute top-4 right-4 text-white text-2xl"
            >
                <i className="fa-solid fa-xmark text-6xl"></i>
            </button>
            <div className="grid gap-4 items-start p-4 conteudo-eixos grid-cols-1 md:grid-cols-2">
                <div className="p-4 w-full md:w-[25rem] flex flex-col gap-4 container-eixos-mobile order-1 md:order-none">
                    <section>
                        <SafeSVG src={corrigirUrlImagem(eixo.imagem)} className="w-auto h-28"/>
                    </section>
                    <section className="p-4">
                        <ul className="listCard">
                            {eixo.lista.map((item, i) => (
                                <li key={i} className="itemListCard py-1">
                                    <p className="text-xl capitalize">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
                <div className="order-2 md:order-none md:col-start-2 md:row-start-1">
                    <section className="flex flex-col items-center md:items-start relative md:right-8 max-md:text-sm 2xl:min-h-full 2xl:flex 2xl:items-center 2xl:justify-center 2xl:gap-12">
                        {eixo.texto.map((paragrafo, i) => (
                            <p className="py-2" key={i}>
                                {paragrafo}
                            </p>
                        ))}
                    </section>
                </div>
                <section className="order-3 md:order-none md:col-start-1 md:row-start-2">
                    <CustomButton
                        onClick={() => goToMetas(eixo.id)}
                        type="link"
                        style={{ color: eixo.cor_principal }}
                        className="buttons_metas bg-[var(--color-white)] h-28 text-3xl uppercase font-family cursor-pointer w-full md:w-auto"
                    >
                        veja as metas
                    </CustomButton>
                </section>
            </div>
        </div>
    );
}