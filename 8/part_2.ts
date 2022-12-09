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

  let score = 0;
  let score_location = [0, 0];

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < cols.length; col++) {
      if (
        row === 0 ||
        col === 0 ||
        row === rows.length - 1 ||
        col === cols.length - 1
      ) {
        continue;
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

        // Set check score
        let check_score = 1;

        if (max_row_trees_before < size) {
          // If all trees are smaller, multiply by the amount of trees
          check_score *= row_trees_before.length;
        } else {
          // Create array, 1 is tree is equal to or bigger, 0 is smaller
          const tree_is_bigger = row_trees_before.map((val) =>
            val >= size ? 1 : 0
          );
          // Find last index of bigger or equal to tree, minus from amount, that's how many trees are seen
          check_score *= tree_is_bigger.length - tree_is_bigger.lastIndexOf(1);
        }

        if (max_row_trees_after < size) {
          // If all trees are smaller, multiply by the amount of trees
          check_score *= row_trees_after.length;
        } else {
          // Create array, 1 is tree is equal to or bigger, 0 is smaller
          const tree_is_bigger = row_trees_after.map((val) =>
            val >= size ? 1 : 0
          );
          // Find index or bigger or equal tree, add 1, that's how many are seen
          check_score *= tree_is_bigger.indexOf(1) + 1;
        }

        if (max_col_trees_before < size) {
          check_score *= col_trees_before.length;
        } else {
          const tree_is_bigger = col_trees_before.map((val) =>
            val >= size ? 1 : 0
          );
          check_score *= tree_is_bigger.length - tree_is_bigger.lastIndexOf(1);
        }

        if (max_col_trees_after < size) {
          check_score *= col_trees_after.length;
        } else {
          const tree_is_bigger = col_trees_after.map((val) =>
            val >= size ? 1 : 0
          );
          check_score *= tree_is_bigger.indexOf(1) + 1;
        }

        if (check_score > score) {
          score = check_score;
          score_location = [row, col];
        }
      }
    }
  }

  console.log(
    "The highest scenic score possible is",
    score,
    "at",
    score_location.map((val) => val + 1)
  );
});
