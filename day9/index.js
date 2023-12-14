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

/*
5 // 10  13  16  21  30  45
  5 //  3   3   5   9  15
   -2  //  0   2   4   6
      2  // 2   2   2
        0  //  0   0
*/
function findFirst(arrs) {
  for (let i = arrs.length - 2; i >= 0; i--) {
    console.log('A',arrs[i])
    console.log('B', arrs[i + 1])
    console
    arrs[i].unshift(arrs[i][arrs[i][0]] - arrs[i + 1][0]);
  }
}

function getResultForPart2(arr) {
  let consequences = [];

  while (!arr.every((item) => item === 0)) {
    consequences.push(arr.slice());
    arr = findDiff(arr);
  }
  arr.push(0);
  consequences.push(arr);
  console.log('conseequences', consequences);
  return findFirst(consequences);
}

console.log(
  input
    .map((item) => getResultForPart2(item))
    .reduce((acc, curr) => acc + curr, 0)
);

// part1 functions
function findNext(arrs) {
  for (let i = arrs.length - 2; i >= 0; i--) {
    arrs[i].push(
      arrs[i][arrs[i].length - 1] + arrs[i + 1][arrs[i + 1].length - 1]
    );
  }
  return arrs;
}

function getResultForPart1(arr) {
  let consequences = [];

  while (!arr.every((item) => item === 0)) {
    consequences.push(arr.slice());
    arr = findDiff(arr);
  }
  arr.push(0);
  consequences.push(arr);
  return findNext(consequences)[0].slice(-1)[0];
}
