const fs = require('fs');
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim();

function getAvailableGameId(str) {
  const splitted = str.split(": ");
  const [gameId, games] = [splitted[0], splitted[1]];
  const sets = games
    .split("; ")
    .map((item) => item.split(", ").map((item) => item.split(" ")));

  const res = sets.map((item) =>
    item.map((item) => {
      if (item[1] === "green" && Number(item[0] > 13)) return false;
      if (item[1] === "blue" && Number(item[0] > 14)) return false;
      if (item[1] === "red" && Number(item[0] > 12)) return false;
      return true;
    })
  ).flat().every(item => item !== false);

  if (res) return Number(gameId.split(" ")[1]);
  return 0;
}

const strArr = input.split("\n");
let res = 0;

strArr.forEach(item => {
  if (item) res += getAvailableGameId(item)
});

console.log(res);
