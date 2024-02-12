import React, { useState, useEffect } from "react";

const BufferBox = ({ gameData, setGameData }) => {
  const [selectedNumber, setSelectedNumber] = useState(4);

  useEffect(() => {
    setSelectedNumber(gameData.buffer_size);
  }, [gameData]);
  const handleNumberChange = (e) => {
    setSelectedNumber(parseInt(e.target.value));
    setGameData({ ...gameData, buffer_size: parseInt(e.target.value) });
    // console.log(e.target.value);
  };

  const renderOptions = () => {
    return [...Array(16)].map((_, index) => (
      <option key={index} value={index + 1}>
        {index + 1}
      </option>
    ));
  };

  const renderBox = (number) => {
    return [...Array(number)].map((_, index) => (
      <div
        key={index}
        className="h-[3rem] w-[3rem] border border-dashed border-[#505050] m-[5px]"
        style={{ borderWidth: "3px" }}
      ></div>
    ));
  };

  return (
    <div className="h-[16rem] w-[39rem]">
      <div className="bg-[#13131b] border-2 border-[#D0ED57] w-full h-full flex flex-col items-center">
        <div className="w-full h-[2.5rem] bg-[#D0ED57] text-black flex items-center mb-[0.5rem]">
          <div className="flex items-center justify-center border-2 border-[#D0ED57] -ml-[2rem] mr-[1rem] bg-black h-[4rem] w-[4rem]">
            <p className="text-[#D0ED57] font-semibold text-3xl">1</p>
          </div>
          <p className="ml-[2rem]">SPECIFY BUFFER SIZE</p>
        </div>
        <div className=" w-full h-[10rem]">
          <div className=" flex justify-center mt-4">
            <select
              id="buffer-size"
              className="text-[#D0ED57] text-center w-[30rem] h-[3rem] bg-black border rounded-sm border-[#D0ED57] focus:border-[#D0ED57] text-2xl"
              value={selectedNumber}
              onChange={handleNumberChange}
            >
              {renderOptions()}
            </select>
          </div>
          <div className="h-[9rem] w-fit py-2 px-[3rem] flex flex-wrap justify-items-start">
            {renderBox(selectedNumber)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BufferBox;
