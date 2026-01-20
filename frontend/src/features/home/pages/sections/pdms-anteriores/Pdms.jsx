import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/shared/components/ui/Button";

export default function Pdms() {
  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };
  return (
    <div className="py-12">
      <section>
        <div className="flex flex-col items-center justify-center gap-4 xl:flex xl:items-center xl:justify-center xl:flex-row xl:flex-nowrap xl:gap-28">
          <div className="flex flex-col items-center justify-center gap-4 xl:flex xl:flex-row xl:justify-center xl:gap-4">
            <p className="text-2xl uppercase text-[var(--color-navy)]">
              e mais:{" "}
            </p>
            <h2 className="text-2xl text-[var(--color-navy)] max-xl:w-3xs max-xl:text-center xl:text-4xl xl:w-[28rem]">
              Conheça todos os outros Programas de Metas já criados para São
              Paulo!
            </h2>
          </div>
          <div>
            <CustomButton
              onClick={() => goTo("/historico")}
              type="link"
              target="#/historico"
              className="all_buttons uppercase"
            >
              <p className="p-2">
                histórico <strong>pdm</strong>
              </p>
            </CustomButton>
          </div>
        </div>
      </section>
    </div>
  );
}
