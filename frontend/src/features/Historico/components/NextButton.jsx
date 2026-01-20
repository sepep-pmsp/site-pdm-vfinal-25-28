import React from "react";

export default function NextButton({ onClick }) {
  return (
    <div className="absolute w-16 left-[28rem] top-[17rem]">
      <button onClick={onClick} className="cursor-pointer bg-white border w-16 h-16 rounded-4xl border-solid border-black">
        <i className="fa-solid fa-arrow-right text-3xl"></i>
      </button>
    </div>
  );
}