export default function MetaModalTitle({ title, color, meta }) {
    return (
        <div className="flex flex-col gap-8 px-3 py-3 w-full lg:w-6/12 lg:relative lg:left-50 lg:bottom-28">
            <p className="uppercase text-white w-27 px-4 text-center rounded-full text-lg" style={{ background: meta.card.eixo_cor_principal }}> meta {meta.card.numero}</p>
            <section className="flex flex-row gap-3 h-auto" style={{ color: color }}>
                <span className="BebasNeue text-xl lg:text-5xl">{title.strongText}</span>
                <span className="font-bebas-book uppercase font-light text-xl lg:text-5xl">{title.normalText}</span>
            </section>
        </div>
    );
}