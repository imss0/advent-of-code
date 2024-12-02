const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((item) => item.split(" ").map((item) => Number(item)));

function isAllIncreasing(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

function isAllDecreasing(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      return false;
    }
  }

  return true;
}

function isDiffInRange(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (
      Math.abs(arr[i] - arr[i - 1]) > 3 ||
      Math.abs(arr[i] - arr[i - 1]) < 1
    ) {
      return false;
    }
  }

  return true;
}

let cnt = 0;
for (let i = 0; i < input.length; i++) {
  if (
    (isAllIncreasing(input[i]) || isAllDecreasing(input[i])) &&
    isDiffInRange(input[i])
  ) {
    cnt++;
  }
}

console.log(cnt);
