const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split("\n\n");

const tiles = input[0].split("\n").map((row) => row.split(""));
const movements = input[1].replaceAll("\n", "").split("");

tiles.forEach((row) => {
  return row.forEach((item, idx) => {
    if (item === "#") {
      row[idx] = "##";
    } else if (item === "O") {
      row[idx] = "[]";
    } else if (item === ".") {
      row[idx] = "..";
    } else {
      row[idx] = "@.";
    }
  });
});

const expandedTiles = tiles.map((row) =>
  row.flatMap((item) => [item[0], item[1]])
);

// console.log(expandedTiles);

const directions = {
  "^": [-1, 0],
  v: [1, 0],
  "<": [0, -1],
  ">": [0, 1],
};

let findAt = () => {
  for (let i = 0; i < expandedTiles.length; i++) {
    for (let j = 0; j < expandedTiles[i].length; j++) {
      if (expandedTiles[i][j] === "@") return [i, j];
    }
  }
  return null;
};

const move = (direction) => {
  console.log(direction);
  const [dx, dy] = directions[direction];
  let [x, y] = findAt();
  const [nx, ny] = [x + dx, y + dy];

  if (expandedTiles[nx][ny] === ".") {
    expandedTiles[nx][ny] = "@";
    expandedTiles[x][y] = ".";
  } else if (expandedTiles[nx][ny] === "O") {
    let [cx, cy] = [nx, ny];
    let [fx, fy] = [nx + dx, ny + dy];

    const obstaclePositions = [];
    while (expandedTiles[cx][cy] === "O") {
      obstaclePositions.push([cx, cy]);
      [fx, fy] = [cx + dx, cy + dy];
      if (expandedTiles[fx][fy] === ".") break;
      if (expandedTiles[fx][fy] !== "O") break;
      [cx, cy] = [fx, fy];
    }

    if (expandedTiles[fx][fy] === ".") {
      for (let i = obstaclePositions.length - 1; i >= 0; i--) {
        const [ox, oy] = obstaclePositions[i];
        expandedTiles[ox + dx][oy + dy] = "O";
        expandedTiles[ox][oy] = ".";
      }

      expandedTiles[nx][ny] = "@";
      expandedTiles[x][y] = ".";
    }
  }
  console.log(expandedTiles.map((row) => row.join("")));
};

movements.forEach((cmd) => move(cmd));

let sum = 0;
let findBox = () => {
  for (let i = 0; i < expandedTiles.length; i++) {
    for (let j = 0; j < expandedTiles[i].length; j++) {
      if (expandedTiles[i][j] === "[") {
        sum += i * 100 + j;
      }
    }
  }
};
findBox();
console.log(sum);
