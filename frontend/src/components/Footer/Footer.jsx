import React from "react";
import logo_prefeitura from "@/assets/svg/logo_PrefSP_com_fundo_horizontal_preto_monocromatico.svg";
import RedesSociaisFooter from "./RedesSociaisFooter";
import ContatosFooter from "./ContatosFooter";
import Footer_pdm from "./Footer_pdm";
import FooterMobile from "./FooterMobile";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function Footer() {
  const isMobile = useIsMobile(768);

  if (isMobile) {
    return <FooterMobile />;
  }

  return (
    <div className="text-white h-full w-full flex items-center flex-nowrap flex-row footer">
      <div className="pt-4 bg-[var(--color-navy)] h-[25rem]">
        <div className="relative w-[35rem] left-28">
          <img
            src={logo_prefeitura}
            alt="Logo oficial da prefeitura de São Paulo"
          />
        </div>
        <div className="flex items-center justify-evenly w-[70rem]">
          <RedesSociaisFooter />
          <ContatosFooter />
        </div>
      </div>
      <Footer_pdm />
    </div>
  );
}
