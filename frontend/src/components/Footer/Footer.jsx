import React, { useState, useEffect } from "react";
import logo_prefeitura from "@/assets/svg/logo_PrefSP_com_fundo_horizontal_preto_monocromatico.svg";
import RedesSociaisFooter from "./RedesSociaisFooter";
import ContatosFooter from "./ContatosFooter";
import Footer_pdm from "./Footer_pdm";
import FooterMobile from "./FooterMobile";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1441);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1441);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <div><FooterMobile/></div>; 
  }

  return (
    <div className="pt-12">
      <footer>
        <div className="bg-[var(--color-navy)] text-white h-[25rem] w-full flex items-center flex-nowrap flex-row">
          <div className="pt-4">
            <div>
              <div className="relative w-[35rem] left-28">
                <img
                  src={logo_prefeitura}
                  alt="Logo oficial da prefeitura de São Paulo"
                />
              </div>

              <div className="flex items-center justify-evenly w-[70rem]">
                <div>
                  <RedesSociaisFooter />
                </div>
                <div>
                  <ContatosFooter />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Footer_pdm />
          </div>
        </div>
      </footer>
    </div>
  );
}
