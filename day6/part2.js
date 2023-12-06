const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
let [time, distance] = fs.readFileSync(filePath).toString().split("\n");
time = +time
  .split(":")[1]
  .trim()
  .split("     ")
  .reduce((acc, curr) => acc + curr, 0);
distance = +distance
  .split(":")[1]
  .trim()
  .split("   ")
  .reduce((acc, curr) => acc + curr, 0);

let count = 0;
for (let i = 0; i <= time; i++) {
  if (i * (time - i) > distance) {
    count++;
  }
}
console.log(count);
