const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const stones = fs.readFileSync(filePath).toString().split(" ");

console.log(stones);

function processStone(stone) {
  const processed = [];
  if (stone === "0") {
    processed.push("1");
  } else if (stone.length % 2 === 1) {
    processed.push((stone * 2024).toString());
  } else {
    const left = stone.slice(0, stone.length / 2);
    const right = stone.slice(stone.length / 2);
    const normalize = (str) =>
      str.match(/^0+$/) ? "0" : str.replace(/^0+/, "");
    processed.push(normalize(left));
    processed.push(normalize(right));
  }

  return processed;
}

function processStoneIteratively(stones, iterations) {
  let currentStones = stones;
  for (let i = 0; i < iterations; i++) {
    currentStones = currentStones.flatMap((stone) => processStone(stone));
  }
  return currentStones;
}

const res = processStoneIteratively(stones, 25);
console.log(res);
console.log(res.length);
