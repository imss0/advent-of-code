const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const testPath = path.join(__dirname, "testinput.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const testInput = fs.readFileSync(testPath).toString().trim().split("\n");

function getScore(str) {
  let [targets, myNumbers] = str.split(":")[1].split("|");
  targets = targets
    .split(" ")
    .filter((item) => item)
    .map((item) => Number(item));
  myNumbers = myNumbers
    .split(" ")
    .filter((item) => item)
    .map((item) => Number(item));
  let count = 0;
  for (let i = 0; i < targets.length; i++) {
    for (let j = 0; j < myNumbers.length; j++) {
      if (myNumbers[j] === targets[i]) {
        count++;
      }
    }
  }
  if (count === 0) return 0;
  else return Math.pow(2, count - 1);
}

function getAmountOfCards(arr) {
  const enriched = arr.map((str) => {
    let cardId = Number(str.split(":")[0].split(" ")[1]);
    let [targets, myNumbers] = str.split(":")[1].split("|");
    const instances = [];
    targets = targets
      .split(" ")
      .filter((item) => item)
      .map((item) => Number(item));
    myNumbers = myNumbers
      .split(" ")
      .filter((item) => item)
      .map((item) => Number(item));
    let count = 0;
    for (let i = 0; i < targets.length; i++) {
      for (let j = 0; j < myNumbers.length; j++) {
        if (myNumbers[j] === targets[i]) {
          count++;
        }
      }
    }

    for (let i = 0; i < count; i++) {
      instances.push({
        cardId: cardId + i + 1,
        instances: [],
      });
    }

    return {
      cardId,
      instances,
    };
  });

  return enriched;
}

let res1 = 0;

input.forEach((item) => {
  res1 += getScore(item);
});

console.log(getAmountOfCards(testInput));
