export default function MetaModalTitle({ title, color }) {
  return (
    <div className="flex flex-col px-3 py-3 w-full">
      <span className="text-xl md:text-5xl" style={{ color: color }}>
          <span className="BebasNeue">{title.strongText}</span> <span className="font-bebas-book uppercase font-light">{title.normalText}</span>
        </span>
    </div>
  );
}