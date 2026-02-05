export default function MetaModalHeader({ meta, onClose }) {
  return (
    <div style={{ backgroundColor: meta.card.eixo_cor_principal }}>
      <button onClick={onClose} className="text-white text-4xl flex items-center gap-3 p-3">
        <i className="fa-solid fa-arrow-left text-white"></i>
        Voltar
      </button>
    </div>
  );
} 