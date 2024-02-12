import React, { useState, useEffect } from "react";

const SequenceBox = ({ gameData, setGameData }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(gameData.sequences.map((row) => row.join(" ")).join("\n"));
  }, [gameData]);

  const handleChange = (event) => {
    var sequences = event.target.value.toUpperCase().split(/\r?\n/);
    for (let i = 0; i < sequences.length; i++) {
      sequences[i] = sequences[i].split(" ");
    }
    setGameData({
      ...gameData,
      sequences: sequences,
      number_of_sequences: sequences.length,
    });
    setInputValue(event.target.value.toUpperCase());
    // console.log(sequences);
  };
  return (
    <div className="h-[16rem] w-[19rem]">
      <div className="w-full h-full flex flex-col items-center">
        <div className="w-full h-[2.5rem] bg-[#D0ED57] text-black flex items-center justify-between">
          <p className="ml-[2rem]">ENTER SEQUENCES</p>
          <div className="z-10 flex items-center justify-center border-2 border-[#D0ED57] -mr-[2rem] bg-black h-[4rem] w-[4rem]">
            <p className="text-[#D0ED57] font-semibold text-3xl">3</p>
          </div>
        </div>
        <div className=" w-full h-[21.5rem] flex justify-center items-center">
          <textarea
            id="sequence-box"
            className="font-consolas text-[#D0ED57] border-2 border-[#D0ED57] border-t-0 focus:border-white focus:border-t-0 py-[2rem] px-[2rem] text-2xl w-full h-full bg-black focus:outline-none resize-none truncate"
            value={inputValue}
            onChange={handleChange}
            spellCheck={false}
            placeholder="E9 1C 55"
          />
        </div>
      </div>
    </div>
  );
};

export default SequenceBox;
