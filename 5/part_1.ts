import * as fs from "fs";

fs.readFile("input.txt", "utf8", (err, data) => {
  // Split input data into the stacks data, and the moves list
  const [stack_str, moves_str] = data.split("\n\n");

  // Grab column numbers, and each row of data for those columns
  const [columns_str, ...stacks_str] = stack_str.split("\n").reverse();
  // Convert moves list into an array
  const moves = moves_str.split("\n");

  // Convert column_str into actual column numbers. The substring is to remove the space at the start and end of the string
  const columns = columns_str
    .substring(1, columns_str.length - 1)
    .split("   ")
    .map((str) => parseInt(str));
  const columns_number = columns.length;

  // Create object to hold stacks, and initiate using columns
  const stacks_obj: { [key: number]: string[] } = {};
  columns.forEach((column) => (stacks_obj[column] = []));

  // Generate stacks in stacks_obj
  stacks_str.forEach((stack_str) => {
    for (let i = 0; i < columns_number; i++) {
      // Extract piece from the stack string
      const piece = stack_str.slice(i * 4, i * 4 + 3);
      // Check if this is a piece, or '   ' (3 spaces i.e. not a piece)
      const isPiece = !piece.includes(" ");

      if (isPiece) stacks_obj[i + 1] = stacks_obj[i + 1].concat(piece);
    }
  });

  moves.forEach((move) => {
    // Array in the form of ['move', amount, 'from', from_col, 'to', to_col]
    const move_substrs = move.split(" ");
    const amount = parseInt(move_substrs[1]);
    const from_col = parseInt(move_substrs[3]);
    const to_col = parseInt(move_substrs[5]);

    for (let i = 0; i < amount; i++) {
      // Take piece from the top of the from column
      const piece = stacks_obj[from_col].pop();
      // Now add it to the top of the to column
      if (piece) stacks_obj[to_col].push(piece);
    }
  });

  // Create return string by iterating over stacks, and returning the last crate in each array. Substring removes the [] values
  const crates = Object.keys(stacks_obj)
    .map((key) => stacks_obj[parseInt(key)].slice(-1)[0].substring(1, 2))
    .join("");

  console.log("The crates on top of the stacks are", crates);
});
