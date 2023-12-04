const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

/*
size : 140 * 140,  숫자가 가로 세로 대각선으로 어떤 symbol(* @ / % $ # - & 등)과도 닿지 않아 있어야 함
1. 줄 단위로 읽어나가며
2. 숫자를 만나면 시작 index와 끝 index를 기록한다  (e.g. 시작 : input[3][6], 끝 : input[3][8])
3. 숫자를 둘러싼 index들을 배열에 담는다.
 -> 숫자 위, 아래줄은 input[2][5]부터 input[2][9], input[4][5]부터 input[4][9]까지
 -> 숫자와 동일한 줄은 input[3][5], input[3][9]만 체크
3. 위 체크한 값 중 symbol에 해당하는 게 하나라도 있다면 숫자를 배열에 담고, 하나도 없다면 담지 않는다.
4. 배열에 담긴 숫자들의 합을 리턴한다

*/
