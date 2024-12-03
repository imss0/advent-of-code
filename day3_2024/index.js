const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim();

const regex = /don't()|do()|mul\((\d{1,3}),(\d{1,3})\)/g;
const matches = [...input.matchAll(regex)];

let res = 0;

let enabled = true;
matches.forEach((match) => {
  if (match[0] !== "don't" && match[0] !== "do" && enabled) {
    res += match[3] * match[4];
  } else if (match[0] === "don't") enabled = false;
  else if (match[0] === "do") enabled = true;
});

console.log(res);
