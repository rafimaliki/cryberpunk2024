import React from "react";

const ImportButton = ({ gameData, setGameData }) => {
  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result.split(/\r?\n/);

      let buffer_size;
      let matrix_width;
      let matrix_height;
      let matrix = [];
      let number_of_sequences;
      let sequences = [];
      let sequences_reward = [];
      let max_score = 0;

      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          buffer_size = parseInt(data[i]);
        } else if (i === 1) {
          matrix_width = parseInt(data[i].trim().split(" ")[0]);
          matrix_height = parseInt(data[i].trim().split(" ")[1]);
        } else if (i <= matrix_height + 1) {
          matrix.push(data[i].trim().split(" "));
        } else if (i === matrix_height + 2) {
          number_of_sequences = parseInt(data[i]);

          for (let j = 0; j < number_of_sequences * 2; j = j + 2) {
            sequences.push(data[i + j + 1].trim().split(" "));
            sequences_reward.push(parseInt(data[i + j + 2]));
          }

          sequences_reward.forEach((score) => (max_score += score));
        }
      }

      setGameData({
        ...gameData,
        buffer_size: buffer_size,
        matrix_width: matrix_width,
        matrix_height: matrix_height,
        matrix: matrix,
        number_of_sequences: number_of_sequences,
        sequences: sequences,
        sequences_reward: sequences_reward,
        max_score: max_score,
      });
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-fit w-fit flex justify-center items-center">
      <input
        id="import"
        encType="multipart/form-data"
        type="file"
        accept=".txt"
        onChange={(e) => handleImport(e)}
        className="hidden"
      />
      <label
        htmlFor="import"
        className="text-md text-center w-[12rem] cursor-pointer border border-[#D0ED57] bg-[#D0ED57] p-2 text-black
        hover:bg-black hover:text-[#D0ED57] transition-all duration-300 ease-in-out"
      >
        IMPORT DATA
      </label>
    </div>
  );
};

export default ImportButton;
