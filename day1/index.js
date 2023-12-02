const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim();

function getTwoDigits(str) {
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    if (Number(str[i])) {
      arr.push(str[i]);
    }
  }

  if (arr.length === 1) return Number(arr[0].concat(arr[0]));
  return Number(arr[0].concat(arr[arr.length - 1]));
}

function getTwoDigitsFromString(str) {
  let arr = [];
  const regex = /(one|two|three|four|five|six|seven|eight|nine)/gi;
  const map = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  let replaced = str;
  let match = replaced.match(regex);

  while (match) {
    replaced = replaced.replace(regex, (matched) => map[matched]);
    match = replaced.match(regex);
  }
  let reversedStr = str.split("").reverse().join("");
  let reversedReplaced = reversedStr.replace(regex, (match) => map[match]);
  let reversedReplacedString = reversedReplaced.split("").reverse().join("");
  for (let i = 0; i < replaced.length; i++) {
    if (!isNaN(replaced[i])) {
      arr.push(replaced[i]);
    }
  }

  if (arr.length === 1) return Number(arr[0].concat(arr[0]));
  return Number(arr[0].concat(arr[arr.length - 1]));
}

const strArr = input.split("\n");
let res1 = 0;
let res2 = 0;

strArr.forEach((item) => {
  res1 += getTwoDigits(item);
  res2 += getTwoDigitsFromString(item);
});

console.log(res1, res2);
