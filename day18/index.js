const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((row) => row.split(",").map(Number));

const grid = Array.from({ length: 71 }).map(() => Array(71).fill("."));

// for (let i = 0; i < input.length; i++) {
//   const [x, y] = input[i];
//   grid[y][x] = "#";
// }

function isValid(x, y, grid, visited) {
  return (
    x >= 0 &&
    y >= 0 &&
    x < grid.length &&
    y < grid[0].length &&
    grid[x][y] !== "#" &&
    !visited[x][y]
  );
}

function shortestPath(grid, start, end) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const queue = [];
  const visited = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(false)
  );

  queue.push([...start, 0]);
  visited[start[0]][start[1]] = true;

  while (queue.length > 0) {
    const [x, y, distance] = queue.shift();

    if (x === end[0] && y === end[1]) {
      return distance;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (isValid(nx, ny, grid, visited)) {
        visited[nx][ny] = true;
        queue.push([nx, ny, distance + 1]);
      }
    }
  }

  return -1;
}

const start = [0, 0];
const end = [70, 70];

let index = 0;
let result;

while (result !== -1 && index < input.length) {
  const [x, y] = input[index];
  if (grid[y][x] === ".") {
    grid[y][x] = "#";
  }

  result = shortestPath(grid, start, end);

  console.log(`Checked input[${index}]: (${x}, ${y}), Result: ${result}`);
  index++;
}
