const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const universe = fs.readFileSync(filePath).toString().split("\n");
const [initialRows, initialColumns] = [universe.length, universe[0].length];

// give number to galaxy
const newniverse = Array.from(
  Array(initialRows),
  () => new Array(initialColumns)
);
let count = 0;
for (let i = 0; i < initialRows; i++) {
  for (let j = 0; j < initialColumns; j++) {
    if (universe[i][j] !== ".") {
      count++;
      newniverse[i][j] = count;
    } else {
      newniverse[i][j] = ".";
    }
  }
}

// console.log("before expand", newniverse);

// expand rows
const allRowsDotIndex = [];
for (let i = 0; i < initialRows; i++) {
  if (newniverse[i].every((item) => item === ".")) {
    allRowsDotIndex.push(i);
  }
}
allRowsDotIndex.forEach((item) => {
  newniverse.splice(item + 1, 0, new Array(newniverse[0].length).fill("."));
});

// expand columns
const allColumnsDotIndex = [];
for (let colIdx = 0; colIdx < initialColumns; colIdx++) {
  let isAllColumnsDot = true;
  for (let rowIdx = 0; rowIdx < newniverse.length; rowIdx++) {
    if (newniverse[rowIdx][colIdx] !== ".") {
      isAllColumnsDot = false;
      break;
    }
  }
  if (isAllColumnsDot) {
    allColumnsDotIndex.push(colIdx);
  }
}

for (let i = allColumnsDotIndex.length - 1; i >= 0; i--) {
  const item = allColumnsDotIndex[i];
  for (let j = 0; j < newniverse.length; j++) {
    newniverse[j].splice(item + 1, 0, ".");
  }
}

// list positions of galaxies
const positions = [];
for (let i = 0; i < newniverse.length; i++) {
  for (let j = 0; j < newniverse[0].length; j++) {
    if (newniverse[i][j] !== ".") {
      positions.push([i, j]);
    }
  }
}

// find shortest distance between each galaxy
const processedPairs = new Set();
const results = [];
for (let i = 0; i < positions.length; i++) {
  for (let j = i + 1; j < positions.length; j++) {
    const pairKey = `${i}-${j}`;
    if (!processedPairs.has(pairKey)) {
      const result = findShortestPath(positions[i], positions[j]);
      results.push(result);
      processedPairs.add(pairKey);
    }
  }
}

console.log(results.reduce((acc, curr) => acc + curr, 0));

// logic to find shortest path
function findShortestPath(start, end) {
  const yDiff = Math.abs(start[0] - end[0]);
  const xDiff = Math.abs(start[1] - end[1]);
  return xDiff + yDiff;
}
