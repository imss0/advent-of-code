const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split("\n\n");

const patterns = input[0].split(", ");
const designs = input[1].split("\n");
function countDesignCombinations(patterns, designs) {
  function countCombinations(design, patterns) {
    const memo = new Map();

    function backtrack(remainingDesign) {
      if (remainingDesign === "") {
        return 1;
      }

      if (memo.has(remainingDesign)) {
        return memo.get(remainingDesign);
      }

      let count = 0;
      for (let pattern of patterns) {
        if (remainingDesign.startsWith(pattern)) {
          count += backtrack(remainingDesign.slice(pattern.length));
        }
      }

      memo.set(remainingDesign, count);
      return count;
    }

    return backtrack(design);
  }

  return designs.map((design) => countCombinations(design, patterns));
}

const res = countDesignCombinations(patterns, designs).reduce(
  (acc, curr) => acc + curr,
  0
);
console.log(res);
