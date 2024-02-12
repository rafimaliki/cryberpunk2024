import React, { useState, useEffect } from "react";

const MatrixBox = ({ gameData, setGameData }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(gameData.matrix.map((row) => row.join(" ")).join("\n"));
  }, [gameData]);

  const handleChange = (event) => {
    let matrix = event.target.value.toUpperCase().split(/\r?\n/);
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = matrix[i].split(" ");
    }

    setGameData({
      ...gameData,
      matrix: matrix,
      matrix_height: matrix.length,
      matrix_width: matrix[0].length,
    });
    setInputValue(event.target.value.toUpperCase());
    // console.log(matrix);
  };

  return (
    <div className="h-[24rem] w-[39rem]">
      <div className=" w-full h-full flex flex-col items-center">
        <div className="w-full h-[2.5rem] bg-[#D0ED57] text-black flex items-center">
          <div className="z-10 flex items-center justify-center border-2 border-[#D0ED57] -ml-[2rem] mr-[1rem] bg-black h-[4rem] w-[4rem]">
            <p className="text-[#D0ED57] font-semibold text-3xl">2</p>
          </div>
          <p className=" ml-[2rem]">ENTER CODE MATRIX</p>
        </div>
        <div className=" w-full h-[21.5rem] flex items-center justify-center">
          <textarea
            id="matrix"
            className="font-consolas text-[#D0ED57] border-2 border-[#D0ED57] border-t-0 focus:border-white focus:border-t-0 py-[2rem] px-[3rem] text-2xl w-full h-full bg-black focus:outline-none resize-none truncate"
            value={inputValue}
            onChange={handleChange}
            spellCheck={false}
            rows="5"
            placeholder="7A 55 E9 E9 1C 55"
          />
        </div>
      </div>
    </div>
  );
};

export default MatrixBox;
