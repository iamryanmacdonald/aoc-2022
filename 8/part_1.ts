import * as fs from "fs";

fs.readFile("input.txt", "utf8", (err, data) => {
  let rows: number[][] = [];
  let cols: number[][] = [];

  // Generate rows and columns from data
  data.split("\n").forEach((row_str) => {
    const row_values = row_str.split("").map((str) => parseInt(str));
    rows.push(row_values);

    row_values.forEach((value, idx) => {
      if (cols.length <= idx) cols.push([]);

      cols[idx].push(value);
    });
  });

  let count = 0;

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < cols.length; col++) {
      if (
        row === 0 ||
        col === 0 ||
        row === rows.length - 1 ||
        col === cols.length - 1
      ) {
        // Add 1 to count for edge trees
        count += 1;
      } else {
        // Get tree size
        const size = rows[row][col];

        // Get rows and cols on either side of the tree
        const row_trees_before = rows[row].slice(0, col);
        const row_trees_after = rows[row].slice(col + 1);
        const col_trees_before = cols[col].slice(0, row);
        const col_trees_after = cols[col].slice(row + 1);

        // Find max tree sizes in each direction
        const max_row_trees_before = Math.max(...row_trees_before);
        const max_row_trees_after = Math.max(...row_trees_after);
        const max_col_trees_before = Math.max(...col_trees_before);
        const max_col_trees_after = Math.max(...col_trees_after);

        // Add 1 to count if any direction max is smaller than current size
        if (
          max_row_trees_before < size ||
          max_row_trees_after < size ||
          max_col_trees_before < size ||
          max_col_trees_after < size
        )
          count += 1;
      }
    }
  }

  console.log("The amount of visible trees is", count);
});
