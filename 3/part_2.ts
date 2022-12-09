import * as fs from "fs";

fs.readFile("input.txt", "utf8", (err, data) => {
  // Priority list, with the index being (priority-1) for that letter
  const priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let sum = 0;

  // Create an array of rucksack strings
  const rucksacks = data.split("\n");

  // ITerate through rucksacks, taking 3 at a time
  for (let i = 0; i < rucksacks.length; i += 3) {
    let badgeFound = false;

    // Obtain 3 different rucksacks for that group
    const rucksack_1 = rucksacks[i];
    const rucksack_2 = rucksacks[i + 1];
    const rucksack_3 = rucksacks[i + 2];

    let common_items = "";

    // Create a string of items that are common between rucksacks 1 and 2
    rucksack_2.split("").forEach((item) => {
      if (rucksack_1.includes(item)) common_items += item;
    });

    // Iterate through rucksack 3, and check commonality with items in common_items (ie items common in rucksacks 1 and 2)
    rucksack_3.split("").forEach((item) => {
      if (common_items.includes(item) && !badgeFound) {
        // Found an item in all 3 rucksacks, add priority to sum and set badgeFound to true
        sum += priority.indexOf(item) + 1;
        badgeFound = true;
      }
    });
  }

  console.log("The sum of badge priorities is", sum);
});
