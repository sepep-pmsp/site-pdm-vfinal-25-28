import React from "react";
import CustomButton from "@/components/Button/Button";

export default function DocumentPanel({ itens, onClose }) {
  if (!itens || itens.length === 0) return null;

  return (
    <div className="absolute inset-0 transition-opacity duration-500 opacity-100 pointer-events-auto px-6 py-6 overflow-y-auto">
      <div className="absolute left-[19rem]">
        <button onClick={onClose} className="text-2xl font-bold cursor-pointer">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="space-y-4 pr-1 flex flex-col items-start justify-start gap-8">
        {itens.map((item, idx) => (
          <div key={idx} className="w-full">
            {item.subitens ? (
              <>
                <p className="font-bold mb-1 text-lg">{item.texto}</p>
                <div className="grid grid-cols-2 gap-x-4 text-lg">
                  {item.subitens.map((sub, i) => (
                    <CustomButton
                      key={i}
                      type="download"
                      target={sub.link}
                      className="text-white underline text-left w-full cursor-pointer"
                    >
                      {sub.texto}
                    </CustomButton>
                  ))}
                </div>
              </>
            ) : item.link ? (
              <CustomButton
                type="download"
                target={item.link}
                className="text-white underline text-lg block cursor-pointer"
              >
                {item.texto}
              </CustomButton>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
