const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((item) => item.split(" "));

const firstCompareStep = (card) => {
  const cardMap = {};
  for (let i = 0; i < 5; i++) {
    if (!cardMap.hasOwnProperty(card[0][i])) {
      cardMap[card[0][i]] = 1;
    } else {
      cardMap[card[0][i]]++;
    }
  }

  const max = Math.max(...Object.values(cardMap));

  if (max === 5) return { card: card[0], bid: +card[1], score: 7 };
  if (max === 4) return { card: card[0], bid: +card[1], score: 6 };
  if (max === 3 && Object.keys(cardMap).length === 2)
    return { card: card[0], bid: +card[1], score: 5 };
  if (max === 3 && Object.keys(cardMap).length === 3)
    return { card: card[0], bid: +card[1], score: 4 };
  if (max === 2 && Object.keys(cardMap).length === 3)
    return { card: card[0], bid: +card[1], score: 3 };
  if (max === 2 && Object.keys(cardMap).length === 4)
    return { card: card[0], bid: +card[1], score: 2 };
  return { card: card[0], bid: +card[1], score: 1 };
};

const processed = input
  .map((item) => firstCompareStep(item))
  .sort((a, b) => b.score - a.score);

const secondCompareStep = (card1, card2) => {
  const scoremap = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
  };
  for (let i = 0; i < 5; i++) {
    if (scoremap[card1.card[i]] > scoremap[card2.card[i]]) {
      return;
    }
    if (scoremap[card2.card[i]] > scoremap[card1.card[i]]) {
      const index1 = processed.indexOf(card1);
      const index2 = processed.indexOf(card2);
      [processed[index1], processed[index2]] = [
        processed[index2],
        processed[index1],
      ];

      return;
    }
  }
};

for (let i = 0; i < processed.length - 1; i++) {
  if (processed[i].score === processed[i + 1].score) {
    secondCompareStep(processed[i], processed[i + 1]);
  }
}

console.log(processed);

const result = processed
  .map((item, index) => item.bid * (processed.length - index))
  .reduce((acc, curr) => acc + curr, 0);
console.log(result);
