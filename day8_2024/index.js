const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString();

const frequencies = new Set();
for (let i = 0; i < input.length; i++) {
  frequencies.add(input[i]);
}

frequencies.delete(".");
frequencies.delete("\n");

const arr = input.split("\n");

function markDistances(grid) {
  const height = grid.length;
  const width = grid[0].length;

  const result = grid.map((row) => row.split(""));

  const collectCoordinates = (char) => {
    const positions = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y][x] === char) positions.push([y, x]);
      }
    }

    return positions;
  };

  frequencies.forEach((char) => {
    const positions = collectCoordinates(char);
    console.log(char, positions);
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [y1, x1] = positions[i];
        const [y2, x2] = positions[j];

        const dy = y2 - y1;
        const dx = x2 - x1;

        let multiplier = 1;

        while (true) {
          let anyMarked = false;

          const markY1 = y1 - dy * multiplier;
          const markX1 = x1 - dx * multiplier;
          if (markY1 >= 0 && markY1 < height && markX1 >= 0 && markX1 < width) {
            result[markY1][markX1] = "#";
            anyMarked = true;
          }

          const markY2 = y2 + dy * multiplier;
          const markX2 = x2 + dx * multiplier;
          if (markY2 >= 0 && markY2 < height && markX2 >= 0 && markX2 < width) {
            result[markY2][markX2] = "#";
            anyMarked = true;
          }

          if (!anyMarked) break;

          multiplier++;
        }
      }
    }
  });

  return result.map((row) => row.join(""));
}

const result = markDistances(arr);

console.log(result);

let cnt = 0;
for (let i = 0; i < result.length; i++) {
  for (let j = 0; j < result[0].length; j++) {
    if (result[i][j] === "#") {
      cnt++;
    }
  }
}

console.log(cnt);
