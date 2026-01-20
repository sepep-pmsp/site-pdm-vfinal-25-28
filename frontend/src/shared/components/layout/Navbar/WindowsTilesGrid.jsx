import React from 'react';
import './WindowsTilesGrid.css'; // Arquivo CSS para os estilos (veja abaixo)

const WindowsTilesGrid = ({ columnsConfig }) => {
  // Função para renderizar um único tile
  const renderTile = (tile, key) => {
    const { height, bgColor, content, leakColor, action } = tile;
    let tileClass = `h-${height} ${bgColor} flex items-center justify-center text-white font-bold relative`;

    // Adiciona classe para vazamento se leakColor fornecido
    if (leakColor) {
      if (leakColor === '#22c55f') {
        tileClass += ' relative menu-tile-before';
      } else if (leakColor === '#b91c1b') {
        tileClass += ' relative menu-tile-before-blue';
      } else {
        // Para cores customizadas, usa estilo inline
        tileClass += ' relative menu-tile-before-custom';
      }
    }

    const tileStyle = leakColor && !['#22c55f', '#b91c1b'].includes(leakColor)
      ? { '--before-bg': leakColor }
      : {};

    // const tileContent = typeof content === 'string' ? <span>{content}</span> : content;
    return (
      <div key={key} className={tileClass} style={tileStyle} onClick={action}>
        {content()}
      </div>
    );
  };

  // Função para renderizar uma coluna
  const renderColumn = (column, index) => {
    const elements = [];
    for (let i = 0; i < column.length; i++) {
      const currentTile = column[i];

      // Heurística para estrutura aninhada: um tile de 1/3 seguido por mais dois tiles.
      if (currentTile.height === '1/3' && i + 2 < column.length) {
        const nestedTile1 = column[i + 1];
        const nestedTile2 = column[i + 2];

        // Renderiza o tile do topo
        elements.push(renderTile(currentTile, `${index}-${i}`));

        // Renderiza os tiles aninhados em um container
        elements.push(
          <div key={`${index}-nested-${i}`} className="h-2/3 flex flex-col gap-2 md:gap-4">
            {renderTile(nestedTile1, `${index}-${i + 1}`)}
            {renderTile(nestedTile2, `${index}-${i + 2}`)}
          </div>
        );
        
        i += 2; // Pula os próximos dois tiles, pois já foram renderizados
      } else {
        // Renderiza o tile normalmente
        elements.push(renderTile(currentTile, `${index}-${i}`));
      }
    }

    return (
      <div key={index} className="col-span-1 flex flex-col gap-2 md:gap-4 h-full w-full">
        {elements}
      </div>
    );
  };

  // Mobile: Primeira row - colunas 1,2 (mas no HTML é colunas 2,3,4? Ajuste se necessário; aqui sigo o HTML)
  // No seu HTML mobile: primeira div grid-cols-3 com colunas 2,3,4; segunda grid-cols-2 com 1,5
  const mobileFirstRow = [columnsConfig[1], columnsConfig[2], columnsConfig[3]]; // Colunas 2,3,4
  const mobileSecondRow = [columnsConfig[0], columnsConfig[4]]; // Colunas 1,5

  return (
    <div className="container max-w-7xl mx-auto h-screen grid gap-2 md:gap-4 p-4">
      {/* Mobile */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 md:hidden w-full">
        {mobileFirstRow.map((col, idx) => (
          <React.Fragment key={idx}>{renderColumn(col, idx)}</React.Fragment>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4 md:hidden w-full">
        {mobileSecondRow.map((col, idx) => (
          <React.Fragment key={idx}>{renderColumn(col, idx)}</React.Fragment>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-5 gap-3 md:gap-4 h-full">
        {columnsConfig.map((col, idx) => (
          <React.Fragment key={idx}>{renderColumn(col, idx)}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WindowsTilesGrid;
