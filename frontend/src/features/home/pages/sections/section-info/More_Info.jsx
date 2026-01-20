import React, { useEffect, useState } from "react";
import { getInfoData } from "../../../services/getInfoData";
import agrupar1 from "@/shared/assets/svg/agrupar_1.png";
import agrupar2 from "@/shared/assets/svg/agrupar_2.svg";

export default function More_Info() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInfoData()
      .then((data) => {
        setInfo(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Erro ao buscar info:", err);
        setInfo([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (!info.length) return <div>Nenhuma informação encontrada.</div>;

  return (
    <div className="h-full">
        <div className="w-full bg-[var(--color-navy)] h-2 xl:relative xl:hidden"></div>
      <span className="flex flex-col justify-start items-center flex-nowrap">
        <div className="relative z-[-1] w-full">
          <img className="w-full" src={agrupar1} alt="" />
        </div>
        <div className="w-full bg-[var(--color-navy)] h-2 xl:relative xl:bottom-[13.5rem] max-xl:hidden"></div>
      </span>

      <div className="flex flex-col items-center justify-center flex-nowrap gap-20 h-full pb-10" style={{ maxWidth: "1435px", margin: "0 auto" }}>
        <div className="xl:bg-[color:var(--color-cyan-dark)] xl:h-40 xl:rotate-[270deg] xl:absolute xl:flex xl:items-end xl:flex-col xl:justify-end xl:p-4 xl:rounded-br-3xl xl:rounded-bl-3xl xl:w-[54rem] xl:-left-96 xl:top-[195rem] xl:shadow-[-4px_2px_20px_0px_gray]">
          <h1 className="uppercase text-4xl xl:text-white xl:text-7xl xl:px-6 xl:relative xl:right-12 xl:bottom-4">
            mais informações
          </h1>
        </div>
        <div className="flex flex-col flex-nowrap items-center justify-center gap-16 xl:flex xl:items-start xl:justify-center xl:flex-row xl:flex-nowrap xl:gap-40 xl:h-full xl:relative xl:w-full xl:pt-20 more-info-mobile-section">
          {info.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center flex-col gap-8 xl:flex xl:items-start xl:justify-center xl:gap-8"
            >
              <div className="p-4 shadow-[0px_1px_20px_1px_#000000ab] rounded-[3rem] group groupy relative w-fit overflow-hidden">
                <div className="relative">
                  <img
                    src={`/${item.image}`}
                    alt={item.title}
                    className="h-[22rem] w-full object-cover transform transition-transform rounded-4xl duration-300 group-hover:scale-[0.93]"
                  />
                  <div className="rounded-3xl absolute top-0 left-0 w-full h-full bg-[var(--color-Filter-blue-shadowns)] bg-opacity-40 mix-blend-multiply pointer-events-none transform transition-transform z-20 duration-300 group-hover:scale-[0.93]"></div>
                </div>
              </div>

              <a href={item.link_page} className="hover:underline">
                <h2 className="title-mobile-info flex flex-col items-center justify-center text-6xl w-[21rem]">
                  {item.title}
                </h2>
              </a>

              {/* classe dinâmica para cada descrição */}
              <p
                className={`text-mobile-info text-mobile-info-${index} flex flex-col items-center justify-center w-[23rem] text-xl`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <span className="flex flex-col justify-start items-center flex-nowrap xl:relative xl:bottom-20">
        <div className="relative z-[-1] w-full">
          <img className="w-full" src={agrupar2} alt="" />
        </div>
        <div className="w-full bg-[var(--color-navy)] h-2"></div>
      </span>
    </div>
  );
}

