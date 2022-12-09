import * as fs from "fs";

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) console.error(err);

  // Creates array with a string for each elf, with the string being calorie counts joined by \n
  const elf_data = data.split("\n\n");

  // Array that includes the top 3 calorie counts
  let top_3_calorie_counts: number[] = [];

  elf_data.forEach((calorie_string) => {
    const total_calories = calorie_string
      // Creates array of calorie counts as string
      .split("\n")
      // Parses calorie counts as integer
      .map((str) => parseInt(str))
      // Sums integer value of calorie counts
      .reduce((acc, curr) => acc + curr, 0);

    // Adds total_calories to the top 3 calories array, sorts highest => lowest, then takes the first 3 values
    top_3_calorie_counts = [...top_3_calorie_counts, total_calories]
      .sort((a, b) => b - a)
      .slice(0, 3);
  });

  // The same reduce function is used to find the total value of the top 3 array
  console.log(
    "The combined top 3 calories is",
    top_3_calorie_counts.reduce((acc, curr) => acc + curr, 0)
  );
});
