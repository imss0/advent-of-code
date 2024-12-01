const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split(",");


function getHashed(str) {
  let curr = 0;
  for (let i = 0; i < str.length; i++) {
    curr += str[i].charCodeAt(0);
    curr *= 17;
    curr %= 256;
  }

  return curr;
}

const res = input
  .map((str) => getHashed(str))
  // .reduce((acc, curr) => acc + curr, 0);

console.log(res);