import React from "react";

const ExportButton = ({ output }) => {
  const handleClick = () => {
    console.log(output);
    const text = output.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className="text-md text-center w-[12rem] cursor-pointer border border-[#D0ED57] bg-[#D0ED57] p-2 text-black
        hover:bg-black hover:text-[#D0ED57] transition-all duration-300 ease-in-out"
      onClick={() => handleClick()}
    >
      EXPORT RESULT
    </button>
  );
};

export default ExportButton;
