const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split("\n\n");

const tiles = input[0].split("\n").map((row) => row.split(""));
const movements = input[1].replaceAll("\n", "").split("");

const directions = {
  "^": [-1, 0],
  v: [1, 0],
  "<": [0, -1],
  ">": [0, 1],
};

let findAt = () => {
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      if (tiles[i][j] === "@") return [i, j];
    }
  }
  return null;
};

const move = (direction) => {
  const [dx, dy] = directions[direction];
  let [x, y] = findAt();
  const [nx, ny] = [x + dx, y + dy];

  if (tiles[nx][ny] === ".") {
    tiles[nx][ny] = "@";
    tiles[x][y] = ".";
  } else if (tiles[nx][ny] === "O") {
    let [cx, cy] = [nx, ny];
    let [fx, fy] = [nx + dx, ny + dy];

    const obstaclePositions = [];
    while (tiles[cx][cy] === "O") {
      obstaclePositions.push([cx, cy]);
      [fx, fy] = [cx + dx, cy + dy];
      if (tiles[fx][fy] === ".") break;
      if (tiles[fx][fy] !== "O") break;
      [cx, cy] = [fx, fy];
    }

    if (tiles[fx][fy] === ".") {
      for (let i = obstaclePositions.length - 1; i >= 0; i--) {
        const [ox, oy] = obstaclePositions[i];
        tiles[ox + dx][oy + dy] = "O";
        tiles[ox][oy] = ".";
      }

      tiles[nx][ny] = "@";
      tiles[x][y] = ".";
    }
  }
};

movements.forEach((cmd) => move(cmd));

let sum = 0;
let findBox = () => {
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      if (tiles[i][j] === "O") {
        sum += i * 100 + j;
      }
    }
  }
};
findBox();
console.log(sum);
