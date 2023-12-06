const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
let [times, distances] = fs.readFileSync(filePath).toString().split("\n");
times = times
  .split(":")[1]
  .trim()
  .split("   ")
  .map((item) => +item);
distances = distances
  .split(":")[1]
  .trim()
  .split("  ")
  .map((item) => +item);

let res = [];
times.forEach((time, index) => {
  let count = 0;
  for (let i = 0; i <= time; i++) {
    if (i * (time - i) > distances[index]) {
      count++;
    }
  }
  res.push(count);
});

console.log(res.reduce((acc, curr) => acc * curr, 1));
