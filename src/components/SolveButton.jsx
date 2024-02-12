import React from "react";

const SolveButton = ({ gameData, setOutput, setShowResult, setInputError }) => {
  const handleClick = () => {
    // console.log(gameData);

    const removeEmptyStrings = (arr) => arr.filter((item) => item !== "");

    var buffer_size = gameData.buffer_size;
    var matrix_width = gameData.matrix_width;
    var matrix_height = gameData.matrix_height;

    var matrix = gameData.matrix.map((element) => removeEmptyStrings(element));
    var sequences = gameData.sequences.map((element) =>
      removeEmptyStrings(element)
    );
    var number_of_sequences = gameData.number_of_sequences;
    var sequences_reward = [];
    for (let i = 0; i < gameData.sequences_reward.length; i++) {
      sequences_reward.push(parseInt(gameData.sequences_reward[i]));
    }

    let max_score = gameData.max_score;
    var max_score_found = 0;

    var sequences_list = [];
    var sequences_idx_list = [];
    var score_list = [];

    var output = [];
    var start_time;

    /* Check if matrix is valid */
    for (let i = 0; i < matrix_height; i++) {
      if (matrix[i].length !== matrix_width) {
        console.log("Matrix error!");
        setInputError(true);
        return;
      }
    }

    // console.log(sequences.length);
    // console.log(sequences_reward.length);

    /* Check if sequences and sequences reward match */
    if (sequences.length !== sequences_reward.length) {
      console.log("Sequences and sequences reward does not match!");
      setInputError(true);
      return;
    }

    setInputError(false);

    /* Check if list1 is sublist of list2 function */
    function IS_SUB_LIST(l1, l2) {
      const len_l1 = l1.length;
      const len_l2 = l2.length;

      if (len_l1 > len_l2) {
        return false;
      }

      for (let i = 0; i < len_l2 - len_l1 + 1; i++) {
        if (l2.slice(i, i + len_l1).join("") === l1.join("")) {
          return true;
        }
      }
      return false;
    }

    /* Score calculation function */
    function CALCULATE_SCORE(sequence) {
      let score = 0;
      for (let i = 0; i < number_of_sequences; i++) {
        if (IS_SUB_LIST(sequences[i], sequence)) {
          score += sequences_reward[i];
        }
      }
      return score;
    }

    /* Loop helper function */
    function LOOP(
      matrix,
      sequence,
      sequence_idx,
      depth,
      row,
      col,
      direction,
      mark
    ) {
      const new_sequence = sequence.concat(matrix[row][col]);
      const new_sequence_idx = sequence_idx.concat([[row, col]]);
      const new_mark = mark.map((row) => [...row]);
      new_mark[row][col] = true;
      RECURSION_LOOP(
        new_sequence,
        new_sequence_idx,
        depth + 1,
        row,
        col,
        direction,
        new_mark
      );
    }

    /* Recursive LOOP function */
    function RECURSION_LOOP(
      sequence,
      sequence_idx,
      depth,
      prev_row,
      prev_col,
      direction,
      mark
    ) {
      /* Base case */
      if (depth === buffer_size) {
        const score = CALCULATE_SCORE(sequence);

        /* Append data to global arrays */
        if (score >= max_score_found) {
          if (
            !sequences_list.some(
              (arr) => JSON.stringify(arr) === JSON.stringify(sequence)
            )
          ) {
            if (score > max_score_found) {
              max_score_found = score;
              sequences_list.splice(0);
              sequences_idx_list.splice(0);
              score_list.splice(0);
            }

            sequences_list.push(sequence);
            sequences_idx_list.push(sequence_idx);
            score_list.push(score);
          }
        }

        /* Recursive case */
      } else if (direction === 0) {
        /* Vertical checking */

        /* Check above */
        for (let i = prev_row - 1; i >= 0; i--) {
          if (!mark[i][prev_col]) {
            LOOP(matrix, sequence, sequence_idx, depth, i, prev_col, 1, mark);
          }
        }
        /* Check below */
        for (let i = prev_row + 1; i < matrix_height; i++) {
          if (!mark[i][prev_col]) {
            LOOP(matrix, sequence, sequence_idx, depth, i, prev_col, 1, mark);
          }
        }
      } else {
        /* Horizontal checking */

        /* Check left */
        for (let i = prev_col - 1; i >= 0; i--) {
          if (!mark[prev_row][i]) {
            LOOP(matrix, sequence, sequence_idx, depth, prev_row, i, 0, mark);
          }
        }

        /* Check right */
        for (let i = prev_col + 1; i < matrix_width; i++) {
          if (!mark[prev_row][i]) {
            LOOP(matrix, sequence, sequence_idx, depth, prev_row, i, 0, mark);
          }
        }
      }
    }

    /* Master function */
    function SEARCH_SEQUENCE() {
      /* Initial LOOP from every element at row 0 */
      for (let i = 0; i < matrix_width; i++) {
        /* Initialize marker matrix for keeping track of visited elements */
        const mark_matrix = Array.from({ length: matrix_height }, () =>
          Array(matrix_width).fill(false)
        );
        mark_matrix[0][i] = true;

        /* Initialize sequence and sequence index matrix*/
        const sequence = [matrix[0][i]];
        const sequence_idx = [[0, i]];
        const prev_row = 0;
        const prev_col = i;
        RECURSION_LOOP(
          sequence.slice(),
          sequence_idx.slice(),
          1,
          prev_row,
          prev_col,
          0,
          mark_matrix.slice()
        );
      }

      if (max_score_found > 0) {
        // console.log(`Score: ${max_score_found}`);
        // console.log("Sequence:", sequences_list[max_score_idx].join(" "));

        var making_efficient = true;

        var new_sequences_list = JSON.parse(JSON.stringify(sequences_list));
        var new_sequences_idx_list = JSON.parse(
          JSON.stringify(sequences_idx_list)
        );

        var new_score = JSON.parse(JSON.stringify(score_list));
        var temp_score = JSON.parse(JSON.stringify(score_list));

        /* While loop for making sequence shorter */
        while (making_efficient) {
          console.log("Making efficient...");
          temp_score = JSON.parse(JSON.stringify(new_score));
          new_score = [];

          let temp_sequences_list = JSON.parse(
            JSON.stringify(new_sequences_list)
          );
          let temp_sequences_idx_list = JSON.parse(
            JSON.stringify(new_sequences_idx_list)
          );
          for (let i = 0; i < new_sequences_list.length; i++) {
            new_sequences_list[i].pop();
            new_sequences_idx_list[i].pop();
            // console.log(new_sequences_list[i]);
            // console.log(CALCULATE_SCORE(new_sequences_list[i]));
            new_score.push(CALCULATE_SCORE(new_sequences_list[i]));
          }
          const max_score = Math.max(...new_score);
          if (max_score < max_score_found) {
            making_efficient = false;
            sequences_list = temp_sequences_list;
            sequences_idx_list = temp_sequences_idx_list;
            score_list = temp_score;
          }
        }

        // console.log(sequences_list);
        // console.log(sequences_idx_list);

        const max_score_idx = score_list.indexOf(max_score_found);
        var new_idx_list = sequences_idx_list[max_score_idx].map((idx) => [
          idx[1] + 1,
          idx[0] + 1,
        ]);

        // console.log(sequences_list);

        /* Output Array Handler */
        output.push(`${max_score_found}`);
        output.push(sequences_list[max_score_idx].join(" "));
        new_idx_list = new_idx_list.map((idx) => {
          output.push(idx.join(", "));
        });
        let end_time = Date.now() - start_time;
        output.push(`${end_time} ms`);
        setOutput(output);

        const scrollPosition = document.documentElement.scrollTop;
        document.body.dataset.scrollY = scrollPosition;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollPosition}px`;
        setShowResult(true);
      } else {
        /* Output Array Handler */
        let end_time = Date.now() - start_time;
        output.push(`${end_time} ms`);
        output.push("No sollution");
        setOutput(output);
        const scrollPosition = document.documentElement.scrollTop;
        document.body.dataset.scrollY = scrollPosition;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollPosition}px`;
        setShowResult(true);
        // console.log("No sequence found");
      }
    }
    console.log("\nSolving...\n");
    start_time = Date.now();
    SEARCH_SEQUENCE();

    // console.log(output);
    // const end_time = Date.now() - start_time;
    // console.log(output);
    // console.log(`\nTime: ${end_time} ms`);
    // console.log(`Matrix size: ${matrix_width}x${matrix_height}`);
    // console.log(`Buffer size: ${buffer_size}`);
    // console.log(`Number of sequences found: ${sequences_list.length}`);
  };
  return (
    <button
      className="text-md text-center w-[12rem] cursor-pointer border border-[#D0ED57] bg-[#D0ED57] p-2 text-black
      hover:bg-black hover:text-[#D0ED57] transition-all duration-300 ease-in-out"
      onClick={() => handleClick()}
    >
      SOLVE
    </button>
  );
};

export default SolveButton;
