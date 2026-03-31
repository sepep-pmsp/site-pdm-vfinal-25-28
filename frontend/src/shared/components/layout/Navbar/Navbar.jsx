import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WindowsTilesGrid from "./WindowsTilesGrid";
import Vector_Sobre from "../../../assets/svg/Vector-sobre.svg";
import Vector from "../../../assets/svg/Vector.svg";
import Universo_SP from "../../../assets/svg/universo_sp.svg";
import Viver_SP from "../../../assets/svg/viver_sao_paulo.svg";
import Capital_Futuro from "../../../assets/svg/capital_do_futuro.svg";
import Logo_PDM_fPreto from "../../../assets/svg/logo-pdm-black.svg";
import Cidade_Empreendedora from "../../../assets/svg/cidade_empreendedora.svg";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [animacao, setAnimacao] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1281);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1269);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setAnimacao("slide-down");
    setIsOpen(true);
    document.body.classList.add("menu-aberto");
  };

  const closeMenu = () => {
    setAnimacao("slide-up");
    setTimeout(() => {
      document.activeElement?.blur();
      setIsOpen(false);
      document.body.classList.remove("menu-aberto");
    }, 500);
  };

  const navigate = useNavigate();
  const goToEixo = (nomeEixo) => {
    navigate("/", { state: { eixo: nomeEixo } });
    closeMenu();
  };
  const goTo = (path) => {
    navigate(path);
    closeMenu();
  };

  const columnsConfig = [
    // Coluna 1: Mapped from left column of Grid_menu_navbar
    [
      { // 1.1 sobre o pdm
        height: '1/2', // from original config
        bgColor: 'bg-[var(--color-navy)] rounded-tr-[3rem] overflow-auto',
        content: () => (
          <div className="text-white w-full h-full flex flex-col items-start justify-start text-2xl p-4 cursor-pointer slide-bottom-in">
            <h2 className="z-2 slide-bottom-in-item">sobre o pdm</h2>
            <img className="max-md:absolute max-md:left-[2.7rem] max-md:w-36 md:absolute left-0 bottom-0 select-none pointer-events-none" src={Vector_Sobre} />
          </div>
        ),
        action: () => goTo("/sobre"),
      },
      { // 1.2 histórico
        height: '1/3', // from original config
        bgColor: 'bg-[var(--color-navy)] rounded-bl-[3rem] overflow-auto',
        content: () => (
          <div className="text-white w-full h-full flex flex-col-reverse items-start justify-center px-6 py-4 text-2xl cursor-pointer slide-top-in overflow-auto">
            <h2 className="absolute bottom-4 z-2 slide-top-in-item">histórico</h2>
            <img className="max-md:absolute max-md:left-[2.7rem] max-md:w-36 md:absolute w-[16.5rem] left-0 top-0 select-none pointer-events-none" src={Vector} />
          </div>
        ),
        action: () => goTo("/historico"),
      },
      { // 1.3 inicio e sair
        height: '1/6', // from original config
        bgColor: '',
        content: () => (
          <div className="flex flex-col w-full h-full text-white text-2xl gap-1 md:gap-3">
            <div onClick={(e) => { e.stopPropagation(); goTo('/'); }} className="h-[45%] flex items-center p-4 rounded-tr-[2rem] cursor-pointer slide-right-in bg-[var(--color-cyan-medium)]">
              <h2 className="slide-right-in-item relative">início</h2>
            </div>
            <div onClick={(e) => { e.stopPropagation(); closeMenu(); }} className="h-[45%] flex items-center p-4 rounded-bl-[2rem] cursor-pointer slide-right-in bg-[var(--color-cyan-medium)]">
              <h2 className="slide-right-in-item relative">sair</h2>
            </div>
          </div>
        ),
        action: () => {},
      },
    ],
    // Coluna 2: universo sp, capital do futuro
    [
      { // 2.1 universo sp
        height: '1/3', // from original config
        bgColor: 'bg-[var(--color-green)] rounded-tl-[2rem] menu-tile-before',
        content: () => (
          <div className="flex items-start justify-start flex-row p-6 w-full h-full cursor-pointer slide-right-in-img">
            <img className="w-36 slide-right-in-item-img" src={Universo_SP} alt="" />
          </div>
        ),
        action: () => goToEixo("universo"),
      },
      { // 2.2 capital do futuro
        height: '2/3', // from original config
        bgColor: 'bg-[var(--color-purple-red)] rounded-br-[0rem] md:rounded-br-[2rem]',
        content: () => (
          <div className="flex items-end justify-start p-6 w-full h-full cursor-pointer slide-top-in-img">
            <img className="w-36 slide-top-in-item-img" src={Capital_Futuro} alt="" />
          </div>
        ),
        action: () => goToEixo("capital"),
      },
    ],
    // Coluna 3: conheca as metas
    [
      { height: '[33.3333%]', bgColor: 'bg-[var(--color-green)] ', content:  () => (<span></span>), leakColor: '#ef4444' },
      { // 3.2 conheca as metas
        height: '[31.5%]',
        bgColor: 'bg-indigo-950',
        content: () => (
          <div className="cursor-pointer flex flex-col flex-nowrap justify-between items-start slide-right-in-logo h-full w-full">
              <img className="w-20 md:w-32 p-4 invert-[1] slide-right-in-item-logo" src={Logo_PDM_fPreto} alt="" />
              <h2 className="text-2xl text-white w-32 absolute bottom-4 right-2 text-start invisible md:visible">
                conheça as metas
              </h2>
          </div>
        ),
        action: () => goTo("/metas"),
      },
      { height: '[33.3333%]', bgColor: 'bg-[var(--color-blue)] menu-tile-before-blue', content:  () => (<span></span>), leakColor: '#b91c1b' },
    ],
    // Coluna 4: viver sp, cidade empreendedora
    [
      { // 4.1 viver sao paulo
        height: '[66.6666%]', // approx 69%
        bgColor: 'bg-[var(--color-orange-red)] rounded-tr-[2rem]',
        content: () => (
          <div className="flex flex-col justify-start items-end p-6 w-full h-full slide-bottom-in-img cursor-pointer">
            <img className="w-36 slide-bottom-in-item-img" src={Viver_SP} alt="" />
          </div>
        ),
        action: () => goToEixo("viver"),
      },
      { // 4.3 cidade empreendedora
        height: '[33.3333%]',
        bgColor: 'bg-[var(--color-blue)] rounded-br-[0rem] md:rounded-br-[2rem] slide-left-in-img menu-tile-right',
        content: () => (
          <div className="flex justify-end items-end p-6 w-full h-full cursor-pointer">
            <img className="w-32 slide-left-in-item-img" src={Cidade_Empreendedora} alt="" />
          </div>
        ),
        action: () => goToEixo("cidade"),
      },
    ],
    // Coluna 5 (unmapped items from Grid_menu_navbar)
    [
        { // regionalização
          height: '1/2',
          bgColor: 'bg-[var(--color-cyan-dark)] rounded-tl-[2rem]',
          content: () => (
              <div className="text-white p-4 flex items-end justify-center cursor-pointer h-full w-full slide-top-in-2">
                  <h2 className="text-start w-full cursor-pointer text-1xl md:text-2xl slide-top-in-item-2">regionalização</h2>
              </div>
          ),
          action: () => goTo("/regionalizacao"),
        },
        { // transparência e monitoramento
          bgColor: 'bg-[var(--color-cyan-dark)]',
          height: '1/4',
          content: () => (
              <div className="text-white p-4 flex items-end cursor-pointer h-full w-full slide-top-in-3">
                  <h2 className="text-start w-full cursor-pointer text-1xl md:text-2xl slide-top-in-item-3">transparência e monitoramento</h2>
              </div>
          ),
          action: () => goTo("/transparencia"),
        },
        { // participação social
          bgColor: 'bg-[var(--color-cyan-dark)] rounded-br-[2rem]',
          height: '1/4',
          content: () => (
              <div className="text-white text-start p-4 cursor-pointer flex justify-start items-end h-full w-full slide-top-in-3">
                  <h2 className="w-10 slide-top-in-item-3 md:text-2xl">participação social</h2>
              </div>
          ),
          action: () => goTo("/participacao-social"),
        }
    ],
  ];

  return (
    <div className="fixed p-2 bg-white z-30 w-full navbar-container">
      <div className="flex flex-row justify-between gap-8 items-center p-2 px-32 display-navbar">
        <a href="/">
            <div>
                <span className="text-4xl roboto-light navbar_span">
                    PREFEITURA DE SÃO PAULO |{" "}
                    <span>
                    <strong className="font-bebas-regular">PROGRAMA DE METAS</strong>
                    </span>
                </span>
            </div>
        </a>
        <div className="z-50 relative btn-menu-navbar">
          <button
            className="z-50 relative"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="main-menu"
          >
            <h2 className="text-4xl">
              <strong>menu</strong>
            </h2>
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          id="main-menu"
          role="dialog"
          className={`${animacao} fixed inset-0 bg-white z-50`}
        >
          <WindowsTilesGrid columnsConfig={columnsConfig} onClose={closeMenu} />
        </div>
      )}
    </div>
  );
}
