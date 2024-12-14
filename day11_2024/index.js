const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const stones = fs.readFileSync(filePath).toString().split(" ");

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

// const cache = new Map();

// function processStoneWithCache(stone) {
//   if (cache.has(stone)) return cache.get(stone);

//   const result = processStone(stone);
//   cache.set(stone, result);
//   return result;
// }

// function processStoneIterativelyWithCache(stones, iterations, batchSize) {
//   let currentStones = stones;

//   for (let i = 0; i < iterations; i++) {
//     const nextStones = [];

//     for (let j = 0; j < currentStones.length; j += batchSize) {
//       const batch = currentStones.slice(j, j + batchSize);
//       const processedBatch = batch.flatMap((stone) =>
//         processStoneWithCache(stone)
//       );
//       nextStones.push(...processedBatch);
//     }

//     currentStones = nextStones;

//     console.log(`Iteration ${i + 1}, Stones Count: ${currentStones.length}`);
//   }

//   return currentStones;
// }

// processStoneIterativelyWithCache(stones, 75, 10000);
function processStoneInChunks(stones, maxIterations, chunkSize) {
  let currentStones = stones;

  for (let i = 0; i < maxIterations; i++) {
    let nextStones = [];

    // stones 배열을 chunkSize만큼 분할하여 처리
    for (let j = 0; j < currentStones.length; j += chunkSize) {
      const chunk = currentStones.slice(j, j + chunkSize);
      const processedChunk = chunk.flatMap((stone) => processStone(stone));
      nextStones.push(...processedChunk);
    }

    currentStones = nextStones;
    console.log(`Iteration ${i + 1}, Stones Count: ${currentStones.length}`);
  }

  return currentStones;
}

processStoneInChunks(stones, 75, 1000);
