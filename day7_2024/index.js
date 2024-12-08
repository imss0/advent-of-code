const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((item) => {
    const split = item.split(": ");
    const target = Number(split[0]);
    const source = split[1].split(" ").map((item) => Number(item));
    return {
      target,
      source,
    };
  });

const results = new Set();

input.forEach((item) => {
  canMakeTargetRecursive(item.source, item.target);
});

function canMakeTargetRecursive(
  source,
  target,
  index = 1,
  currentResult = source[0]
) {
  if (index === source.length) {
    return currentResult === target;
  }

  if (
    canMakeTargetRecursive(
      source,
      target,
      index + 1,
      currentResult + source[index]
    )
  ) {
    results.add(target);
    return true;
  }

  if (
    canMakeTargetRecursive(
      source,
      target,
      index + 1,
      currentResult * source[index]
    )
  ) {
    results.add(target);
    return true;
  }

   if (
     canMakeTargetRecursive(
       source,
       target,
       index + 1,
       Number(currentResult.toString() + source[index].toString())
     )
   ) {
     results.add(target);
     return true;
   }

  return false;
}

console.log(Array.from(results).reduce((acc, curr) => acc + curr, 0));
