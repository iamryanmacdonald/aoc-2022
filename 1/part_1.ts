import * as fs from "fs";

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) console.error(err);

  // Creates array with a string for each elf, with the string being calorie counts joined by \n
  const elf_data = data.split("\n\n");

  let max_calories = 0;

  elf_data.forEach((calorie_string) => {
    const total_calories = calorie_string
      // Creates array of calorie counts as string
      .split("\n")
      // Parses calorie counts as integer
      .map((str) => parseInt(str))
      // Sums integer value of calorie counts
      .reduce((acc, curr) => acc + curr, 0);

    if (total_calories > max_calories) max_calories = total_calories;
  });

  console.log("The maximum calories is", max_calories);
});
