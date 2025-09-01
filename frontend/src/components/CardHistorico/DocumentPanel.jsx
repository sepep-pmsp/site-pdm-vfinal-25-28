import React from "react";
import CustomButton from "@/components/Button/Button";

export default function DocumentPanel({ itens, onClose }) {
  // `itens` agora é `card.documentos`
  if (!itens || itens.length === 0) return null;

  return (
    <div className="absolute inset-0 transition-opacity duration-500 opacity-100 pointer-events-auto px-6 py-6 overflow-y-auto">
      <div className="absolute left-[19rem]">
        <button onClick={onClose} className="text-2xl font-bold cursor-pointer">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="space-y-4 pr-1 flex flex-col items-start justify-start gap-8">
        {/* CORREÇÃO: Mapeia sobre o array 'itens' (que é o 'documentos' da API) */}
        {itens.map((item, idx) => (
          <div key={idx} className="w-full">
            {/* CORREÇÃO: A API não tem a propriedade 'subitens' */}
            {/* O bloco de código abaixo é removido porque a estrutura não existe na API real */}
            {/* item.subitens ? (...) : */}
            
            {/* CORREÇÃO: Acessa 'item.nome' e 'item.url' */}
            <CustomButton
              type="download"
              target={item.url} // Usa a propriedade `url` da API
              className="text-white underline text-lg block cursor-pointer"
            >
              {item.nome} {/* Usa a propriedade `nome` da API */}
            </CustomButton>
          </div>
        ))}
      </div>
    </div>
  );
}