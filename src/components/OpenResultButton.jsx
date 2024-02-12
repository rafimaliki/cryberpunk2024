import React from "react";

const OpenResultButton = ({ output, setShowResult }) => {
  const handleOpenResult = () => {
    const scrollPosition = document.documentElement.scrollTop;
    document.body.dataset.scrollY = scrollPosition;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    setShowResult(true);
  };

  return (
    <button
      className="text-md text-center w-[12rem] cursor-pointer border border-[#D0ED57] bg-[#D0ED57] p-2 text-black
    hover:bg-black hover:text-[#D0ED57] transition-all duration-300 ease-in-out"
      onClick={handleOpenResult}
    >
      OPEN RESULT
    </button>
  );
};

export default OpenResultButton;
