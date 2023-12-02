// requirement :
// 1abc2 -> 12
// pqr3stu8vwx -> 38
// a1b2c3d4e5f -> 15
// treb7uchet -> 77

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

module.exports = getTwoDigits;
