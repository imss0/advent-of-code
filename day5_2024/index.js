const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split("\n\n");

const part1 = input[0]
  .split("\n")
  .map((item) => item.split("|").map((item) => Number(item)));

const part2 = input[1].split("\n").map((item) => item.split(","));

let sum = 0;
function checkSortRules(array, rules) {
  // Iterate through each rule
  for (let [a, b] of rules) {
    // Find the indices of a and b in the array
    let indexA = array.indexOf(String(a));
    let indexB = array.indexOf(String(b));

    // If a or b is not found, skip this rule
    if (indexA === -1 || indexB === -1) continue;

    // If a does not appear before b, return false
    if (indexA > indexB) {
      return false;
    }
  }
  // All rules are satisfied
  sum += Number(array[Math.floor(array.length / 2)]);
  console.log(sum);
  return true;
}

part2.forEach((arr) => {
  checkSortRules(arr, part1);
});

// Check if the array satisfies the sorting rules
checkSortRules(part2, part1);
