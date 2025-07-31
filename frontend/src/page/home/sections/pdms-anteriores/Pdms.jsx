import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/components/Button/Button";

export default function Pdms() {
  const navigate = useNavigate();
  const goTo = (path) => {
    navigate(path);
  };
  return (
    <div className="py-12">
      <section>
        <div className="flex items-center justify-center flex-row flex-nowrap gap-28">
          <div className="flex flex-row justify-center gap-4">
            <p className="text-2xl uppercase text-[var(--color-navy)]">
              e mais:{" "}
            </p>
            <h2 className="text-4xl w-[28rem] text-[var(--color-navy)]">
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
              <p className="btn-about p-2">
                histórico <strong>pdm</strong>
              </p>
            </CustomButton>
          </div>
        </div>
      </section>
    </div>
  );
}
