const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim();

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

const matches = [...input.matchAll(regex)];

let res = 0;

matches.forEach((match) => {
  res += match[1] * match[2]
});
console.log(res)