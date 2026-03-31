export const parseNumeroBR = (valor) => {
    if (valor === null || valor === undefined) return null;
    if (typeof valor === "number") {return isNaN(valor) ? null : valor; }
    if (typeof valor === "string") {
        let v = valor.trim();
        if (!v) return null;
        v = v.replace(/[^\d.,-]/g, "");
        if (v.includes(",")) {v = v.replace(/\./g, "").replace(",", ".");}
        const numero = Number(v);
        return isNaN(numero) ? null : numero;
    }
    const numero = Number(valor);
    return isNaN(numero) ? null : numero;
};