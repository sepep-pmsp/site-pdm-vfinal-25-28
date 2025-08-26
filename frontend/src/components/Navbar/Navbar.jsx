import React, { useState } from "react";
import Grid_menu_navbar from "./Grid_menu_navbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [animacao, setAnimacao] = useState("");

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

  return (
    <div className="fixed w-full p-2 bg-white z-30">
      <div className="flex flex-row justify-around gap-56 items-center p-2">
        <div>
          <span className="text-4xl roboto-light">
            PREFEITURA DE SÃO PAULO |{" "}
            <span>
              <strong className="font-bebas-regular">PROGRAMA DE METAS</strong>
            </span>
          </span>
        </div>
        <div className="z-50 relative">
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
          <Grid_menu_navbar onClose={closeMenu} />
        </div>
      )}
    </div>
  );
}
