const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().split("\n\n");

function checkHorizontalReflection(input) {
  const rows = input.split("\n");
  // console.log(rows);

  for (let i = 1; i < rows.length; i++) {
    const beforeSymmetry = rows.slice(0, i).join("\n");
    const afterSymmetry = rows.slice(i).join("\n");

    const beforeSymmetryLength = beforeSymmetry.split("\n").length;
    const afterSymmetryLength = afterSymmetry.split("\n").length;
    // console.log({ beforeSymmetryLength, afterSymmetryLength });

    let adjustedAfterSymmetry = afterSymmetry;
    let adjustedBeforeSymmetry = beforeSymmetry;

    if (beforeSymmetryLength < afterSymmetryLength) {
      adjustedAfterSymmetry = afterSymmetry
        .split("\n")
        .slice(0, beforeSymmetryLength)
        .reverse()
        .join("\n");
    } else if (beforeSymmetryLength > afterSymmetryLength) {
      adjustedBeforeSymmetry = beforeSymmetry
        .split("\n")
        .slice(-afterSymmetryLength)
        .reverse()
        .join("\n");
    }

    if (adjustedBeforeSymmetry === adjustedAfterSymmetry) {
      return i * 100;
    }
  }

  return 0;
}

function checkVerticalReflection(input) {
  const rows = input.split("\n");
  console.log(rows);

  for (let i = 1; i < rows[0].length; i++) {
    const beforeSymmetry = rows.map((row) => row.slice(0, i)).join("\n");
    const afterSymmetry = rows
      .map((row) => row.slice(i).split("").join(""))
      .join("\n");

    const beforeSymmetryLength = beforeSymmetry.split("\n")[0].length;
    const afterSymmetryLength = afterSymmetry.split("\n")[0].length;

    console.log({ beforeSymmetryLength, afterSymmetryLength });
    let adjustedAfterSymmetry = afterSymmetry;
    let adjustedBeforeSymmetry = beforeSymmetry;

    if (beforeSymmetryLength < afterSymmetryLength) {
      adjustedAfterSymmetry = afterSymmetry
        .split("\n")
        .map((row) =>
          row.slice(0, beforeSymmetryLength).split("").reverse().join("")
        )
        .join("\n");
    } else if (beforeSymmetryLength > afterSymmetryLength) {
      adjustedBeforeSymmetry = beforeSymmetry
        .split("\n")
        .map((row) =>
          row.slice(-afterSymmetryLength).split("").reverse().join("")
        )
        .join("\n");
    }

    if (adjustedBeforeSymmetry === adjustedAfterSymmetry) {
      return i;
    }
  }

  return 0;
}

const res = input
  .map(
    (item) => checkHorizontalReflection(item) + checkVerticalReflection(item)
  )
  .reduce((acc, curr) => acc + curr, 0);

console.log(res);
