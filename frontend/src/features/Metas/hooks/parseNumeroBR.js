export const parseNumeroBR = (valor) => {
    if (valor === null || valor === undefined) return null;
    if (typeof valor === "number") return valor;
    if (typeof valor === "string") {
        const normalizado = valor
            .replace(/\./g, "") 
            .replace(",", "."); 
        const numero = Number(normalizado);
        return isNaN(numero) ? null : numero;
    }

    return null;
};