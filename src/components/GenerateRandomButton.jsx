import React from "react";

const GenerateRandomButton = ({ setShowGenerateRandomPopUp }) => {
  const handleOpen = () => {
    const scrollPosition = document.documentElement.scrollTop;
    document.body.dataset.scrollY = scrollPosition;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    setShowGenerateRandomPopUp(true);
  };
  return (
    <button
      className="text-md text-center w-[12rem] cursor-pointer border border-[#D0ED57] bg-[#D0ED57] p-2 text-black
      hover:bg-black hover:text-[#D0ED57] transition-all duration-300 ease-in-out"
      onClick={() => handleOpen()}
    >
      GENERATE RANDOM
    </button>
  );
};

export default GenerateRandomButton;
