import React, { useState, useEffect } from "react";

const GenerateRandomPopUp = ({
  isOpen,
  handleClose,
  gameData,
  setGameData,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [randomSeed, setRandomSeed] = useState({
    unique_tokens: 0,
    tokens: [],
    buffer_size: 0,
    matrix_width: 0,
    matrix_height: 0,
    number_of_sequences: 0,
    sequence_max_length: 0,
  });

  //   useEffect(() => {
  //     console.log(randomSeed);
  //   }, [randomSeed]);

  const handleChange = (event) => {
    let matrix = event.target.value.toUpperCase().split(/\r?\n/);
    let unique_tokens;
    let tokens;
    let buffer_size;
    let matrix_size;
    let matrix_width;
    let matrix_height;
    let number_of_sequences;
    let sequence_max_length;

    for (let i = 0; i < matrix.length; i++) {
      try {
        if (i === 0) {
          unique_tokens = parseInt(matrix[i]);
        } else if (i === 1) {
          tokens = matrix[i].trim().split(" ");
          tokens.length = unique_tokens;
        } else if (i === 2) {
          buffer_size = parseInt(matrix[i]);
        } else if (i === 3) {
          matrix_size = matrix[i].trim().split(" ");
          matrix_width = parseInt(matrix_size[0]);
          matrix_height = parseInt(matrix_size[1]);
        } else if (i === 4) {
          number_of_sequences = parseInt(matrix[i]);
        } else if (i === 5) {
          sequence_max_length = parseInt(matrix[i]);

          setRandomSeed({
            unique_tokens: unique_tokens,
            tokens: tokens,
            buffer_size: buffer_size,
            matrix_width: matrix_width,
            matrix_height: matrix_height,
            number_of_sequences: number_of_sequences,
            sequence_max_length: sequence_max_length,
          });
        }
      } catch (error) {
        console.log("Error!");
      }
    }
    setInputValue(event.target.value.toUpperCase());
    // console.log(matrix);
  };

  const handleGenerateRandom = () => {
    console.log("Generating..");

    // const [gameData, setGameData] = useState({
    //     buffer_size: 4,
    //     matrix_width: 0,
    //     matrix_height: 0,
    //     matrix: [],
    //     number_of_sequences: 0,
    //     sequences: [],
    //     sequences_reward: [],
    //     max_score: 0,
    //   });

    var newMatrix = [];
    for (let i = 0; i < randomSeed.matrix_height; i++) {
      var row = [];
      for (let j = 0; j < randomSeed.matrix_width; j++) {
        row.push(
          randomSeed.tokens[
            Math.floor(Math.random() * randomSeed.unique_tokens)
          ]
        );
      }
      newMatrix.push(row);
    }

    var new_sequences = [];
    for (let i = 0; i < randomSeed.number_of_sequences; i++) {
      var sequence = [];
      const length =
        Math.floor(Math.random() * randomSeed.sequence_max_length) + 1;
      for (let j = 0; j < length; j++) {
        sequence.push(
          randomSeed.tokens[
            Math.floor(Math.random() * randomSeed.unique_tokens)
          ]
        );
      }
      new_sequences.push(sequence);
    }

    var new_sequences_reward = [];
    for (let i = 0; i < randomSeed.number_of_sequences; i++) {
      new_sequences_reward.push(Math.floor(Math.random() * 100));
    }

    setGameData({
      ...gameData,
      buffer_size: randomSeed.buffer_size || 4,
      matrix_width: randomSeed.matrix_width,
      matrix_height: randomSeed.matrix_height,
      matrix: newMatrix,
      number_of_sequences: randomSeed.number_of_sequences,
      sequences: new_sequences,
      sequences_reward: new_sequences_reward,
      max_score: 0,
    });
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
            INPUT DATA FOR RANDOM GENERATION
          </div>
          <div className="flex mx-[2rem] my-[1rem]">
            <div className=" w-fit">
              <p>Number of unique tokens :</p>
              <p>Tokens :</p>
              <p>Buffer size :</p>
              <p>Matrix size :</p>
              <p>Number of sequences :</p>
              <p>Sequence max length :</p>
            </div>
            <div className=" ">
              <textarea
                id="matrix"
                className="h-full font-consolas text-[#D0ED57]  pl-[1rem] pt-[3px] text-xl bg-black focus:outline-none resize-none truncate"
                value={inputValue}
                onChange={handleChange}
                spellCheck={false}
                rows="5"
              />
            </div>
          </div>
          <div className="flex justify-between w-full border border-b-0 border-r-0 border-l-0 border-[#D0ED57]">
            <div className="flex items-center">
              {/* <div className="flex items-center text-red-400 px-[1rem]">
                Error!
              </div>
              <div className="flex items-center text-green-500 px-[1rem]">
                Success!
              </div> */}
              <div className="pl-[2rem] text-center text-sm text-gray-200">
                Press enter to write on next line
              </div>
            </div>
            <div>
              <button
                className="text-sm text-center w-fit cursor-pointer border border-[#D0ED57] bg-[#D0ED57] m-2 px-2 text-black font-semibold
                hover:bg-black hover:text-[#D0ED57] transition-all duration-300 ease-in-out"
                onClick={handleGenerateRandom}
              >
                GENERATE
              </button>
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
    </div>
  );
};

export default GenerateRandomPopUp;
