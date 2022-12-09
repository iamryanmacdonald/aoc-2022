import * as fs from "fs";

fs.readFile("input.txt", "utf8", (err, data) => {
  // Priority list, with the index being (priority-1) for that letter
  const priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let sum = 0;

  // Create an array of rucksack strings
  const rucksacks = data.split("\n");

  rucksacks.forEach((rucksack) => {
    const size = rucksack.length / 2;

    // Create compartment strings based on rucksack length
    const compartment_1 = rucksack.slice(0, size);
    const compartment_2 = rucksack.slice(size);

    let itemFound = false;

    // Iterate through items in the first compartment
    compartment_1.split("").forEach((item) => {
      if (compartment_2.includes(item) && !itemFound) {
        // Found item in both rucksacks, add priority to the sum and set itemFound to true
        sum += priority.indexOf(item) + 1;
        itemFound = true;
      }
    });
  });

  console.log("The sum of priorities is", sum);
});
