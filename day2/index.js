const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim();

function getAvailableGameId(str) {
  const splitted = str.split(": ");
  const [gameId, games] = [splitted[0], splitted[1]];
  const sets = games
    .split("; ")
    .map((item) => item.split(", ").map((item) => item.split(" ")));

  const res = sets
    .map((item) =>
      item.map((item) => {
        if (item[1] === "green" && Number(item[0] > 13)) return false;
        if (item[1] === "blue" && Number(item[0] > 14)) return false;
        if (item[1] === "red" && Number(item[0] > 12)) return false;
        return true;
      })
    )
    .flat()
    .every((item) => item !== false);

  if (res) return Number(gameId.split(" ")[1]);
  return 0;
}

function getAmountOfCubes(str) {
  const splitted = str.split(": ");
  const games = splitted[1];
  const cubeMap = {};
  const sets = games
    .split("; ")
    .map((item) => item.split(", ").map((item) => item.split(" ")));
  sets.forEach((item) =>
    item.map((item) => {
      if (!cubeMap.hasOwnProperty(item[1])) {
        cubeMap[item[1]] = Number(item[0]);
      } else if (cubeMap[item[1]] <= Number(item[0])) {
        cubeMap[[item[1]]] = Number(item[0]);
      }
    })
  );

  if (!cubeMap.hasOwnProperty('green')) cubeMap['green'] = 1;
  if (!cubeMap.hasOwnProperty('blue')) cubeMap['blue'] = 1;
  if (!cubeMap.hasOwnProperty('red')) cubeMap['red'] = 1;
   return cubeMap.green * cubeMap.blue * cubeMap.red;
}

const strArr = input.split("\n");
let res1 = 0;
let res2 = 0;

strArr.forEach((item) => {
  if (item) res1 += getAvailableGameId(item);
  res2 += getAmountOfCubes(item);
});

console.log(res1, res2);
