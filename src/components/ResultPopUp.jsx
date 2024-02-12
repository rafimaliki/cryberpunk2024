import React from "react";

const ResultPopUp = ({ isOpen, handleClose, output, gameData }) => {
  const idxPathVertical = [];
  const idxPathHorizontal = [];
  const idxPathVerticalSmall = [];
  const idxPathHorizontalSmall = [];

  if (!(output === null || output[1] === "No sollution")) {
    var idxArr = [];
    for (let i = 2; i < output.length - 1; i++) {
      try {
        idxArr.push(output[i].split(", "));
      } catch (error) {
        return;
      }
    }

    idxArr = idxArr.map((idx) => [parseInt(idx[1]) - 1, parseInt(idx[0]) - 1]);

    for (let i = 0; i < idxArr.length - 1; i++) {
      if (i % 2 === 0) {
        if (idxArr[i][0] < idxArr[i + 1][0]) {
          for (let j = idxArr[i][0] + 1; j < idxArr[i + 1][0]; j++) {
            idxPathVertical.push([j, idxArr[i][1]]);
            idxPathVerticalSmall.push([j, idxArr[i][1]]);
          }
          idxPathVerticalSmall.push([idxArr[i + 1][0], idxArr[i][1]]);
        } else {
          for (let j = idxArr[i + 1][0] + 1; j < idxArr[i][0]; j++) {
            idxPathVertical.push([j, idxArr[i][1]]);
            idxPathVerticalSmall.push([j, idxArr[i][1]]);
          }
          idxPathVerticalSmall.push([idxArr[i][0], idxArr[i][1]]);
        }
      } else {
        if (idxArr[i][1] < idxArr[i + 1][1]) {
          for (let j = idxArr[i][1] + 1; j < idxArr[i + 1][1]; j++) {
            idxPathHorizontal.push([idxArr[i][0], j]);
            idxPathHorizontalSmall.push([idxArr[i][0], j]);
          }
          idxPathHorizontalSmall.push([idxArr[i][0], idxArr[i + 1][1]]);
        } else {
          for (let j = idxArr[i + 1][1] + 1; j < idxArr[i][1]; j++) {
            idxPathHorizontal.push([idxArr[i][0], j]);
            idxPathHorizontalSmall.push([idxArr[i][0], j]);
          }
          idxPathHorizontalSmall.push([idxArr[i][0], idxArr[i][1]]);
        }
      }
    }
    // console.log(idxArr.length);
    // console.log(idxPathVeritical);
    // console.log(idxPathHorizontal);
    // console.log(idxArr);
  }

  const renderCols = (row) => {
    const cols = [];
    for (let i = 0; i < gameData.matrix_width; i++) {
      // console.log([row, i]);
      // console.log(idxArr.includes([row, i]));
      cols.push(
        <div key={i} className="flex flex-col items-center justify-center">
          <div
            className={`z-50 w-[0.5rem] h-[1rem]  ml-[1rem] ${
              idxPathVerticalSmall.some(
                (arr) => JSON.stringify(arr) === JSON.stringify([row, i])
              )
                ? "bg-[#67d7f4]"
                : "bg-black"
            }`}
          ></div>
          <div className="flex items-center">
            <div
              className={`z-60 w-[1rem] h-[0.5rem]  ${
                idxPathHorizontalSmall.some(
                  (arr) => JSON.stringify(arr) === JSON.stringify([row, i])
                )
                  ? "bg-[#67d7f4]"
                  : "bg-black"
              } `}
            ></div>
            <div
              key={i}
              className={` ${
                idxArr.some(
                  (arr) => JSON.stringify(arr) === JSON.stringify([row, i])
                )
                  ? "ring ring-[#67d7f4] ring-inset"
                  : ""
              } w-[3rem] h-[3rem] flex items-center justify-center text-center`}
            >
              <div
                className={`absolute z-60 w-[3rem] h-[0.5rem] bg-[#67d7f4] ${
                  idxPathHorizontal.some(
                    (arr) => JSON.stringify(arr) === JSON.stringify([row, i])
                  )
                    ? ""
                    : "hidden"
                } `}
              ></div>
              <div
                className={`absolute z-50 w-[0.5rem] h-[3.5rem] bg-[#67d7f4] ${
                  idxPathVertical.some(
                    (arr) => JSON.stringify(arr) === JSON.stringify([row, i])
                  )
                    ? ""
                    : "hidden"
                } `}
              ></div>
              <p className=" font-consolas text-3xl">
                {gameData.matrix[row][i]}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return cols;
  };
  const renderRows = () => {
    const rows = [];

    for (let i = 0; i < gameData.matrix_height; i++) {
      rows.push(
        <div key={i} className="flex">
          {renderCols(i)}
        </div>
      );
    }

    return rows;
  };

  const renderOutput = () => {
    if (output === null) {
      return <p className="font-sans">Result is not available</p>;
    } else if (output[1] === "No sollution") {
      return (
        <p className="text-[#67d7f4] text-2xl font-semibold mb-2">
          No sollution found!
        </p>
      );
    } else {
      return (
        <div className="w-fit pr-[1rem] ">
          <p className="text-[#67d7f4] text-2xl font-sans mb-2">
            Sollution Found!
          </p>
          <p className="font-sans">Sequence : {output[1]}</p>
          <p className="font-sans">Score : {output[0]}</p>
          <p className="font-sans">Time : {output[output.length - 1]}</p>
          {renderRows()}
        </div>
      );
    }
  };
  return (
    <div
      className={`z-20 fixed inset-0 flex items-center justify-center bg-blend-overlay bg-black bg-opacity-80 ${
        isOpen ? "visible animate-fade-in" : "hidden"
      }`}
    >
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          isOpen ? "visible animate-slide-down" : "hidden"
        }`}
      >
        <div className="bg-black shadow-md text-[#D0ED57] border border-[#D0ED57] text-xl">
          <div className="bg-[#D0ED57] text-black font-semibold font-xl px-[2rem] h-[2.5rem] flex items-center ">
            SOLLUTION
          </div>
          <div className="p-[2rem] font-consolas ">{renderOutput()}</div>
          <div className="flex justify-end w-full border border-b-0 border-r-0 border-l-0 border-[#D0ED57]">
            <button
              className="text-sm text-center w-fit cursor-pointer border border-[#D0ED57] bg-[#D0ED57] m-2 px-2 text-black font-semibold
              hover:bg-black hover:text-[#D0ED57] transition-all duration-300 ease-in-out"
              onClick={handleClose}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPopUp;
