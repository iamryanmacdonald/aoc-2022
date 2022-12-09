const played_map: { [key: string]: number } = {
  X: 0,
  Y: 3,
  Z: 6,
};

const versus_map: { [key: string]: number } = {
  AX: 3,
  AY: 1,
  AZ: 2,
  BX: 1,
  BY: 2,
  BZ: 3,
  CX: 2,
  CY: 3,
  CZ: 1,
};

import * as fs from "fs";

fs.readFile("input.txt", "utf8", (err, data) => {
  // Splits input into array of moves, then each move into an array of [opponent, player]
  const moves = data.split("\n").map((move) => move.split(" "));

  let score = 0;

  moves.forEach((move) => {
    const [opponent, player] = move;

    // Adds score for the move the player made
    score += played_map[player];
    // Adds score based on whether or not the player won
    score += versus_map[`${opponent}${player}`];
  });

  console.log("Your final score is", score);
});
