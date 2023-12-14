const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split("\n");

let pattern = /\.{1,}/g;

function processRow(row) {
  row = row.split(" ");
  const springs = row[0].replaceAll(pattern, ".");
  const sizes = row[1].split(",").map((item) => +item);
  return { springs, sizes };
}

function countArrangements(data) {}

const processed = input.map((row) => processRow(row));
console.log(processed);
// console.log(processed.map((item) => countArrangements(item)));
