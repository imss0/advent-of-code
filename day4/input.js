const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// 오른쪽 숫자들이 내가 가진 것, 왼쪽 숫자들이 당첨 번호
// 왼쪽 숫자들 = targett / 오른쪽 숫자들을 빙글빙글 돌며 왼쪽 숫자 target에 맞는 숫자가 있다면 count+ 한다
// Math.pow(2, count - 1) = 점수!

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
  if ((count === 0)) return 0;
  else return (Math.pow(2, count - 1));
}

let res1 = 0;

input.forEach((item) => {
  res1 += getScore(item);
});

console.log(res1);
