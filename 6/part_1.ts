import * as fs from "fs";

fs.readFile("input.txt", "utf8", (err, data) => {
  for (let i = 0; i < data.length - 3; i++) {
    // Grab 4 letter substring from the string
    const substr = data.substring(i, i + 4);
    // Create an array from the substring
    const substr_array = substr.split("");
    // Grab duplicates by checking the index of each item vs the index of the first time that item is found in the array
    const substr_duplicates = substr_array.filter(
      (item, idx) => substr_array.indexOf(item) !== idx
    );

    // If there are no duplicates, print value and break the for loop
    if (substr_duplicates.length === 0) {
      console.log(
        i + 4,
        "letters need to be processed before the first start-of-packet marker is detected"
      );
      break;
    }
  }
});
