const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split("\n");
const tiles = Array.from({ length: 103 }, () => Array(101).fill("."));

const parseCoordinates = (input) => {
  const [positionPart, deltaPart] = input.split(" ");
  const x = parseInt(positionPart.split("=")[1].split(",")[0], 10);
  const y = parseInt(positionPart.split(",")[1], 10);
  const dx = parseInt(deltaPart.split("=")[1].split(",")[0], 10);
  const dy = parseInt(deltaPart.split(",")[1], 10);
  return { x, y, dx, dy };
};

function initializeTiles(grid, x, y) {
  if (grid[y][x] === ".") {
    grid[y][x] = 1;
  } else {
    grid[y][x] += 1;
  }
}

let positions = input.map((position) => parseCoordinates(position));

positions.forEach((point) => initializeTiles(tiles, point.x, point.y));

function moveTile(grid, currentX, currentY, dx, dy, width, height) {
  const newX = (currentX + dx + width) % width;
  const newY = (currentY + dy + height) % height;

  if (grid[currentY][currentX] > 1) {
    grid[currentY][currentX] -= 1;
  } else {
    grid[currentY][currentX] = ".";
  }

  // console.log(newX, newY);
  if (grid[newY][newX] === ".") {
    grid[newY][newX] = 1;
  } else {
    grid[newY][newX] += 1;
  }

  return { x: newX, y: newY, dx, dy };
}

let iterationCount = 0;
while (true) {
  positions = positions.map((point) => {
    const { x, y, dx, dy } = point;
    return moveTile(tiles, x, y, dx, dy, 101, 103);
  });


  if (isChristmasTree(tiles)) {
    console.log(`Christmas tree found at iteration ${iterationCount + 1}`);
    break;
  }

  iterationCount++;
}
function calculateQuadrantSums(grid) {
  const quadrants = [0, 0, 0, 0];

  for (let y = 0; y <= 50; y++) {
    for (let x = 0; x <= 49; x++) {
      if (grid[y][x] !== ".") {
        quadrants[0] += grid[y][x];
      }
    }
  }

  for (let y = 0; y <= 50; y++) {
    for (let x = 51; x <= 100; x++) {
      if (grid[y][x] !== ".") {
        quadrants[1] += grid[y][x];
      }
    }
  }

  for (let y = 52; y <= 102; y++) {
    for (let x = 0; x <= 49; x++) {
      if (grid[y][x] !== ".") {
        quadrants[2] += grid[y][x];
      }
    }
  }

  for (let y = 52; y <= 102; y++) {
    for (let x = 51; x <= 100; x++) {
      if (grid[y][x] !== ".") {
        quadrants[3] += grid[y][x];
      }
    }
  }

  return quadrants;
}

const quadrantSums = calculateQuadrantSums(tiles);

console.log(quadrantSums);

function isChristmasTree(grid) {
  let isTreeShape = true;

  const startY = 0;
  const startX = 50;

  let currentTileCount = 1;
  for (let i = 0; i < 5; i++) {
    for (
      let j = -Math.floor(currentTileCount / 2);
      j <= Math.floor(currentTileCount / 2);
      j++
    ) {
      const y = startY + i;
      const x = startX + j;
      if (grid[y][x] === ".") {
        isTreeShape = false;
        break;
      }
    }

    if (!isTreeShape) break;
    currentTileCount += 2;
  }

  return isTreeShape;
}
