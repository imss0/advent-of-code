const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split("\n");

function pushRock(rows) {
  const height = rows.length;
  const width = rows[0].length;
  const clonedRows = rows.map((row) => [...row]);

  let swapped = false;

  do {
    swapped = false;
    for (let i = height - 1; i > 0; i--) {
      for (let j = 0; j < width; j++) {
        if (clonedRows[i][j] === "O" && clonedRows[i - 1][j] === ".") {
          [clonedRows[i][j], clonedRows[i - 1][j]] = [
            clonedRows[i - 1][j],
            clonedRows[i][j],
          ];
          swapped = true;
        }
      }
    }
  } while (swapped);

  return clonedRows
    .map(
      (item, index) =>
        item.filter((item) => item === "O").length * (height - index)
    )
    .reduce((acc, curr) => acc + curr, 0);
}

console.log(pushRock(input));
