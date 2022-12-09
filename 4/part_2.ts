import * as fs from "fs";

fs.readFile("input.txt", "utf8", (err, data) => {
  // Create an array of section pairs
  const pairs = data.split("\n");

  let count = 0;

  pairs.forEach((pair) => {
    // Create an array of sections for each pair
    const [sections_1, sections_2] = pair.split(",");

    // Obtain start and end section for first set
    const [sections_1_start, sections_1_end] = sections_1
      .split("-")
      .map((str) => parseInt(str));
    // Obtain start and end section for second set
    const [sections_2_start, sections_2_end] = sections_2
      .split("-")
      .map((str) => parseInt(str));

    // First group is to check that sections 1 at least partially overlaps sections 2, the second group is the other way around
    if (
      (sections_1_start <= sections_2_start &&
        sections_1_end >= sections_2_start) ||
      (sections_2_start <= sections_1_start &&
        sections_2_end >= sections_1_start)
    )
      count += 1;
  });

  console.log(count, "section pairs overlap");
});
