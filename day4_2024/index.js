const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const target = "XMAS";
const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];
let cnt = 0;

function findPattern(grid, target) {
  const rows = grid.length;
  const cols = grid[0].length;

  const isValid = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      for (const [dx, dy] of directions) {
        let found = true;

        for (let k = 0; k < target.length; k++) {
          const nx = x + dx * k;
          const ny = y + dy * k;

          if (!isValid(nx, ny) || grid[nx][ny] !== target[k]) {
            found = false;
            break;
          }
        }

        if (found) {
          cnt++;
        }
      }
    }
  }
}

function countXMAS(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  let cnt = 0;
  const isValid = (x, y) => x >= 0 && y >= 0 && x < rows && y < cols;
  const isMatchingPair = (a, b) => {
    return a === "M" && b === "S";
  };
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x][y] !== "A") continue;

      console.log({ x, y });

      // 대각선 조합 1: 왼쪽 위 ↔ 오른쪽 아래
      if (
        isValid(x - 1, y - 1) &&
        isValid(x + 1, y + 1) &&
        isMatchingPair(grid[x - 1][y - 1], grid[x + 1][y + 1])
      ) {
        console.log(`Found pattern at [${x}, ${y}] - Left-Top ↔ Right-Bottom`);
        cnt++;
      }

      // 대각선 조합 2: 오른쪽 위 ↔ 왼쪽 아래
      if (
        isValid(x - 1, y + 1) &&
        isValid(x + 1, y - 1) &&
        isMatchingPair(grid[x - 1][y + 1], grid[x + 1][y - 1])
      ) {
        console.log(`Found pattern at [${x}, ${y}] - Right-Top ↔ Left-Bottom`);
        cnt++;
      }
    }
  }
  return cnt;
}

findPattern(input, target);

console.log(countXMAS(input));
