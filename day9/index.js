const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
let input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((item) => item.split(" ").map(Number));

function findDiff(arr) {
  const diff = [];
  for (let i = 0; i < arr.length - 1; i++) {
    diff.push(arr[i + 1] - arr[i]);
  }

  return diff;
}

function findNext(arrs) {
  for (let i = arrs.length - 2; i >= 0; i--) {
    arrs[i].push(
      arrs[i][arrs[i].length - 1] + arrs[i + 1][arrs[i + 1].length - 1]
    );
  }
  return arrs;
}

function getResult(arr) {
  let consequences = [];

  while (!arr.every((item) => item === 0)) {
    consequences.push(arr.slice());
    arr = findDiff(arr);
  }
  arr.push(0);
  consequences.push(arr);
  return findNext(consequences)[0].slice(-1)[0];
}

console.log(
  input.map((item) => getResult(item)).reduce((acc, curr) => acc + curr, 0)
);
