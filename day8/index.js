const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split("\n");

// get rules and dict
const rules = input[0].split("");
const data = input.slice(2);
const dict = {};
function getObjFromStr(str) {
  const [source, targets] = str.split("=");
  const left = targets.slice(2, 5);
  const right = targets.slice(7, 10);
  dict[source.trim()] = [left, right];
}
data.forEach((item) => getObjFromStr(item));

// start adjusting rules...
let node = "AAA";
let goal = "ZZZ";
let count = 0;

while (node !== goal) {
  for (let i = 0; i < rules.length; i++) {
    const direction = rules[i] === "L" ? 0 : 1;
    node = dict[node][direction];
    count++;
  }
}

console.log(node, goal, count);
