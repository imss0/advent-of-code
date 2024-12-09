const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
let input = fs.readFileSync(filePath).toString();

let converted = [];
for (let i = 0; i < input.length; i++) {
  if (i % 2 === 0) {
    for (let j = 0; j < Number(input[i]); j++) {
      converted.push(i / 2);
    }
  } else {
    for (let j = 0; j < Number(input[i]); j++) {
      converted.push(null);
    }
  }
}

let lastNumber = null;
let lastNumberIdx = null;

const isDotsAtEnd = () => {
  let foundDot = false;
  for (let char of converted) {
    if (char === null) {
      foundDot = true;
    } else if (foundDot) {
      return false;
    }
  }
  return true;
};

for (let i = 0; i < converted.length; i++) {
  if (converted[i] === null) {
    // set lastNumber
    for (let j = converted.length - 1; j >= 0; j--) {
      if (converted[j] !== null) {
        lastNumber = converted[j];
        lastNumberIdx = j;
        break;
      }
    }

    // swap
    converted[i] = lastNumber;
    converted[lastNumberIdx] = null;

    if (isDotsAtEnd()) {
      break;
    }
  }
}

let result = 0;
for (let i = 0; i < converted.length; i++) {
  if (converted[i] != null) result += Number(converted[i]) * i;
}

console.log(result);
