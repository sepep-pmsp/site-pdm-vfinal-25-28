import React from "react";
import logo_pdm from "@/assets/svg/logo_pdm_fundo_branco.svg";

export default function Footer_pdm() {
  return (
    <div className="bg-[var(--color-cyan-dark)] h-[25rem] w-[49rem] z-20">
      <div className="flex flex-col flex-nowrap items-start justify-center gap-8 p-6 w-[42rem] relative left-28 top-4">
        <div>
          <img className=" w-[17rem]" src={logo_pdm} alt="" />
        </div>
        <div className="flex flex-col items-start gap-4 w-[29rem]">
          <h2 className="text-2xl">
            O Programa de Metas é uma elaboração da Secretaria de Informações e
            Monitoramento Estratégicos | SIME.
          </h2>
          <p className="text-xl">
            Para conhecer outros produtos da secretaria acesse o nosso site:{" "}
            <a>prefeitura.com.br</a>
          </p>
        </div>
      </div>
    </div>
  );
}
