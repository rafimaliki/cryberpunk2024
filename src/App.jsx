import React, { useState, useEffect } from "react";
import BufferBox from "./components/BufferBox";
import MatrixBox from "./components/MatrixBox";
import SequenceBox from "./components/SequenceBox";
import SequenceRewardBox from "./components/SequenceRewardBox";
import ImportButton from "./components/ImportButton";
import GenerateRandomButton from "./components/GenerateRandomButton";
import SolveButton from "./components/SolveButton";
import ExportButton from "./components/ExportButton";
import ResultPopUp from "./components/ResultPopUp";
import OpenResultButton from "./components/OpenResultButton";
import GenerateRandomPopUp from "./components/GenerateRandomPopUp";

function App() {
  document.body.style.overflowX = "hidden";

  const [gameData, setGameData] = useState({
    buffer_size: 4,
    matrix_width: 0,
    matrix_height: 0,
    matrix: [],
    number_of_sequences: 0,
    sequences: [],
    sequences_reward: [],
    max_score: 0,
  });

  const [inputError, setInputError] = useState(false);

  const [output, setOutput] = useState(null);
  useEffect(() => {
    setOutput(null);
  }, [gameData]);

  const [showResult, setShowResult] = useState(false);

  const handleCloseResult = () => {
    const scrollPosition = parseInt(document.body.dataset.scrollY || "0", 10);
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
    setShowResult(false);
  };

  const [showGenerateRandomPopUp, setShowGenerateRandomPopUp] = useState(false);
  const handleCloseGenerateRandomPopUp = () => {
    const scrollPosition = parseInt(document.body.dataset.scrollY || "0", 10);
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
    setShowGenerateRandomPopUp(false);
  };

  return (
    <>
      <div className="min-h-screen w-screen bg-black flex items-center justify-center text-white">
        <div className="min-h-screen w-[60rem] flex flex-col">
          <div className="h-[8rem] w-full my-4">
            <p className="font-sans text-6xl text-[#D0ED57]">
              Cyberpunk 2024 Hacking Minigame Solver
            </p>
          </div>
          <div className="h-[16rem] w-full my-4">
            <div className="text-3xl text-[#D0ED57]">
              INSTANT BREACH PROTOCOL SOLVER - START CRACKING, SAMURAI.
            </div>
            <div className="w-full h-1 bg-[#D0ED57] my-3"></div>
            <div></div>
          </div>
          <div className=" h-fit w-fit my-4 flex">
            <GenerateRandomButton
              setShowGenerateRandomPopUp={setShowGenerateRandomPopUp}
            />
            <GenerateRandomPopUp
              isOpen={showGenerateRandomPopUp}
              handleClose={handleCloseGenerateRandomPopUp}
              gameData={gameData}
              setGameData={setGameData}
            />
            <div className="w-4"></div>
            <ImportButton gameData={gameData} setGameData={setGameData} />
          </div>
          <div className="h-fit w-full flex justify-between my-4">
            <BufferBox gameData={gameData} setGameData={setGameData} />
            <div className="h-[10rem] w-[2rem]"></div>
            <SequenceBox gameData={gameData} setGameData={setGameData} />
          </div>
          <div className="h-fit w-full flex justify-between my-4">
            <MatrixBox gameData={gameData} setGameData={setGameData} />
            <div className="h-[24rem] w-[2rem]"></div>
            <SequenceRewardBox gameData={gameData} setGameData={setGameData} />
          </div>
          <div className="text-red-400 h-[2rem]">
            {inputError
              ? "Input error, please check for white spaces or invalid characters!"
              : ""}
          </div>
          <div className="h-fit w-fit flex my-4">
            <SolveButton
              gameData={gameData}
              setOutput={setOutput}
              setShowResult={setShowResult}
              setInputError={setInputError}
            />
            <div className="w-4"></div>
            {output !== null && (
              <OpenResultButton output={output} setShowResult={setShowResult} />
            )}
            <ResultPopUp
              isOpen={showResult}
              handleClose={handleCloseResult}
              output={output}
              gameData={gameData}
            />
            <div className="w-4"></div>
            {output !== null && <ExportButton output={output} />}
          </div>
          {/* {Keperluan troubleshooting */}
          {/* <div className="flex">
            <button
              className="border w-fit"
              onClick={() => console.log(gameData)}
            >
              console.log(gameData)
            </button>
            <button
              className="border w-fit mx-2"
              onClick={() => console.log(output)}
            >
              console.log(output)
            </button>
          </div> */}
          <div className="flex flex-col border border-x-0 border-b-0 pt-[3rem] mt-[12rem] pb-[5rem] h-fit w-full my-4">
            <div className="flex">
              <p>This page is created based on</p>
              <a
                className="ml-1 hover:text-cyan-300 hover:underline"
                href="https://cyberpunk-hacker.com/"
                target="_blank"
              >
                https://cyberpunk-hacker.com/
              </a>
              <p className="ml-1">
                to fulfill Tugas Kecil 1 IF2211 Strategi Algoritma using
                bruteforce algorithm
              </p>
            </div>
            <div className="w-ful h-fit mt-[2rem] flex justify-between text-gray-400">
              <div>
                <a
                  className="hover:text-cyan-300 hover:underline"
                  href=""
                  target="_blank"
                >
                  GitHub
                </a>
                <a
                  className="ml-[1rem] hover:text-cyan-300 hover:underline"
                  href="https://cyberpunk-hacker.com/"
                  target="_blank"
                >
                  Reference Website
                </a>
              </div>
              <p>13522137</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
