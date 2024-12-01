const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim();

const list = input
  .split("\n")
  .map((item) => item.split("   ").map((item) => Number(item)));
const left = list.map((item) => item[0]).sort((a, b) => a - b);
const right = list.map((item) => item[1]).sort((a, b) => a - b);

let res = 0;

/* Part 1 
for (let i = 0; i < left.length; i++) {
  const diff = Math.abs(left[i] - right[i]);
  res += diff;
}

*/

for (let i = 0; i < left.length; i++) {
  const target = left[i];
  let cnt = 0;
  right.forEach((item) => {
    if (item === target) {
      cnt++;
    }
  });

  res += target * cnt;
}

console.log(res);
