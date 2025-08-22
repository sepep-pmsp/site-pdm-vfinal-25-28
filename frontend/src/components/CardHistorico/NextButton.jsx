import React from "react";

export default function NextButton({ onClick }) {
  return (
    <div className="w-32 absolute left-[26rem] top-[17rem]">
      <button onClick={onClick} className="cursor-pointer">
        <div className="absolute w-[72px] h-[72px] z-10 bg-black rounded-full left-1/2 -translate-x-1/2 top-[5px] blur-[1px]"></div>
          <label className="group cursor-pointer absolute w-[72px] h-[72px] bg-gradient-to-b from-stone-50 to-stone-100 rounded-full left-1/2 -translate-x-1/2 top-[5px] shadow-[inset_0px_4px_2px_#ffffff,inset_0px_-4px_0px_#848588,0px_0px_2px_rgba(0,0,0,10)] active:shadow-[inset_0px_4px_2px_#c8c8c8,inset_0px_-4px_2px_#848588,0px_0px_2px_rgba(0,0,0,10)] z-20 flex items-center justify-center">
            <div className="w-16 group-active:w-[31px] fill-stone-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)]">
              <i className="fa-solid fa-arrow-right text-5xl"></i>
            </div>
          </label>
      </button>
    </div>
  );
}