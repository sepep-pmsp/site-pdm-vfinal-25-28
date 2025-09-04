import React from "react";
import logo_prefeitura from "@/assets/svg/logo_PrefSP_com_fundo_horizontal_preto_monocromatico.svg";
import logo_pdm from "@/assets/svg/logo_pdm_fundo_branco.svg";
import facebookIcon from "@/assets/social/facebook.svg";
import twitterIcon from "@/assets/social/twitter.svg";
import instagramIcon from "@/assets/social/instagram.svg";
import youtubeIcon from "@/assets/social/youtube.svg";
import LocalizacaoIcon from "@/assets/svg/localizacao.svg";
import TelefoneIcon from "@/assets/svg/telefone.svg";

export default function FooterMobile() {
  return (
    <div className="bg-[var(--color-navy)] h-full w-full py-8 px-4 text-white">
      <footer className="flex justify-center pl-20 box-footer-mobile">
        <div className="imgs-footer-mobile flex items-center flex-row flex-nowrap justify-start gap-20 w-full">
          <img className="w-36" src={logo_pdm} alt="" />
          <img className="w-36" src={logo_prefeitura} alt="" />
        </div>
        <div className="box-imgs-footer-mobile">
          <div className="p-2 flex flex-col items-start gap-4 relative top-8">
            <div className="flex flex-col items-start gap-4 w-full">
              <p className="text-[23px] text-start w-60">
                Siga a Prefeitura de SP nas redes sociais:{" "}
              </p>
              <div>
                <button>
                  <a target="blank" href="https://www.facebook.com/PrefSP">
                    <img src={facebookIcon} alt="Facebook" />
                  </a>
                </button>
                <button>
                  <a target="blank" href="https://x.com/prefsp">
                    <img src={twitterIcon} alt="Twitter" />
                  </a>
                </button>
                <button>
                  <a target="blank" href="https://www.instagram.com/prefsp/">
                    <img src={instagramIcon} alt="Instagram" />
                  </a>
                </button>
                <button>
                  <a
                    target="blank"
                    href="https://www.youtube.com/prefeiturasaopaulo"
                  >
                    <img src={youtubeIcon} alt="Youtube" />
                  </a>
                </button>
              </div>
            </div>
            <div>
              <p className="text-[var(--color-orange)] text-xl font-bold">
                Prefeitura de SP: Aqui o trabalho não para
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-8">
            <div>
              <p className="text-[23px]">Contatos:</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 w-80">
                <img src={LocalizacaoIcon} alt="" />
                <p>
                  Viaduto do Chá, 15 - Centro Histórico de São Paulo - SP,
                  01007-040
                </p>
              </div>
              <div className="flex items-center gap-4 w-80">
                <img src={TelefoneIcon} alt="" />
                <p>0800-123456</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-start items-center pt-12">
          <h2 className="text-xl">
            O Programa de Metas é uma elaboração da Secretaria de Informações e
            Monitoramento Estratégicos | SIME.
          </h2>
          <p className="text-xl">
            Para conhecer outros produtos da secretaria acesse o nosso site:{" "}
            <a
              className="underline"
              href="https://prefeitura.sp.gov.br/web/planejamento/"
              target="blank"
            >
              prefeitura.sp.gov.br
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
