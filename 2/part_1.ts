const played_map: { [key: string]: number } = {
  X: 1,
  Y: 2,
  Z: 3,
};

const versus_map: { [key: string]: number } = {
  AX: 3,
  AY: 6,
  AZ: 0,
  BX: 0,
  BY: 3,
  BZ: 6,
  CX: 6,
  CY: 0,
  CZ: 3,
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
