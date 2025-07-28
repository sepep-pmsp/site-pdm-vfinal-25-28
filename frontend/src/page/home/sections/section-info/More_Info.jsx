import React, { useEffect, useState } from "react";
import { getInfoData } from "@/services/home/getInfoData";
import agrupar1 from "@/assets/svg/agrupar_1.svg";
import agrupar2 from "@/assets/svg/agrupar_2.svg";

export default function More_Info() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    getInfoData().then(setInfo).catch(console.error);
  }, []);

  if (!info.length) return <div>Carregando...</div>;

  return (
    <div className="py-20 h-[74rem]">
      <div className="agrupar1">
        <img src={agrupar1} alt="" />
      </div>
      <div className="w-full bg-[var(--color-navy)] h-2"></div>

      <div className="bg-[color:var(--color-cyan-dark)] h-40 rotate-[270deg] relative flex items-end flex-col justify-end p-4 rounded-br-3xl rounded-bl-3xl w-[54rem] right-[22rem] top-[29rem] shadow-[-4px_2px_20px_0px_gray]">
        <h1 className="text-white text-7xl px-6">mais informações</h1>
      </div>

      <section>
        <div className="flex items-start justify-center flex-row flex-nowrap gap-40 h-full relative w-[89rem] left-80 pt-20">
          {info.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-center gap-8"
            >
              <div className="p-4 shadow-[0px_1px_20px_1px_#000000ab] rounded-[3rem] group relative w-fit overflow-hidden">
                <div className="relative">
                  <img
                    src={`/${item.image}`}
                    alt={item.title}
                    className="h-[22rem] w-full object-cover transform transition-transform duration-300 group-hover:scale-[0.93]"
                  />
                  <div className="rounded-3xl absolute top-0 left-0 w-full h-full bg-[var(--color-Filter-blue-shadowns)] bg-opacity-40 mix-blend-multiply pointer-events-none transform transition-transform duration-300 group-hover:scale-[0.93]"></div>
                </div>
              </div>
              <h2 className="flex flex-col items-center justify-center text-6xl w-[21rem]">
                {item.title}
              </h2>
              <p className="flex flex-col items-center justify-center w-[23rem] text-xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <div className="agrupar2">
        <img src={agrupar2} alt="" />
      </div>
      <div className="w-full bg-[var(--color-navy)] h-2 relative top-[12.7rem]"></div>
    </div>
  );
}
