import React, { useState } from 'react'
import Grid_menu_navbar from './Grid_menu_navbar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [animacao, setAnimacao] = useState("");

  const toggleMenu = () => {
    setAnimacao("slide-down");
    setIsOpen(true);
  };

  const closeMenu = () => {
    setAnimacao("slide-up");
    setTimeout(() => {
      document.activeElement?.blur();
      setIsOpen(false);
    }, 500);
  };

  return (
    <div className="fixed w-full p-2 bg-white z-50">
      <div className="flex flex-row flex-nowrap items-center justify-between p-2">
        <div>
            <h1 className='text-4xl'>PREFEITURA DE SÃO PAULO | <strong>PROGRAMA DE METAS</strong></h1>
        </div>
        <div>
          <button
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="main-menu"
          >
            <h2 className='text-4xl'>menu</h2>
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
  )
}
