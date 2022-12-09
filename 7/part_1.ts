import * as fs from "fs";

type Directory = {
  children: { [key: string]: Directory };
  files: { name: string; size: number }[];
  parent?: Directory;
};

function findDirectoryFileSizes(node: Directory) {
  // Find total size for current directory files
  const file_size = node.files.reduce((arr, curr) => arr + curr.size, 0);

  // Create return array
  let return_value = [file_size];

  Object.keys(node.children).forEach((key) => {
    // Grab file size array for child directory
    const size = findDirectoryFileSizes(node.children[key]);

    // Add child directory file size to size of current directory
    return_value[0] = return_value[0] + size[0];
    // Concatenate child directory file size to return value
    return_value = return_value.concat(size);
  });

  return return_value;
}

fs.readFile("input.txt", "utf8", (err, data) => {
  const lines = data.split("\n");

  // Define current node in file tree, and the root node
  let current: Directory | undefined;
  let root: Directory = { children: {}, files: [] };

  lines.forEach((line) => {
    // Split line into space separated substrings for further processing
    const line_substr = line.split(" ");

    if (line_substr[0] === "$") {
      const [command, ...inputs] = line_substr.slice(1);

      switch (command) {
        // Switch directory, either by accessing a child or parent node
        case "cd":
          if (!current) {
            // Current hasn't been set, we're at the root node
            current = root;
          } else {
            const next = inputs[0];

            if (next === "..") {
              // Move to the parent node
              current = current.parent;
            } else {
              // Move to the specific child node
              current = current.children[next];
            }
          }

          break;
        case "ls":
          break;
      }
    } else {
      const [size, name] = line_substr;

      if (size === "dir") {
        // Create a directory in the children object
        current!.children[name] = { children: {}, files: [], parent: current };
      } else {
        // Create a file in the file array
        current!.files = current!.files.concat({ name, size: parseInt(size) });
      }
    }
  });

  // Create array of directory file sizes
  const directoryFileSizes = findDirectoryFileSizes(root);
  // Sum directory file sizes that are less than 100000
  const sumFileSizes = directoryFileSizes.reduce((arr, curr) => {
    if (curr <= 100000) return arr + curr;
    return arr;
  }, 0);

  console.log(
    "The total sum of directory file sizes less than 100000 is",
    sumFileSizes
  );
});
