const fs = require("fs");
function read(filename) {
  const data = fs.readFileSync(`./inputs/${filename}`, "utf8").split("\n");
  return data;
}

const data = read("d1");
let p1 = 0;
let p2 = 0;
const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

data.forEach((line) => {
  let p1Digits = [];
  let p2Digits = [];

  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (/\d/.test(c)) {
      p1Digits.push(c);
      p2Digits.push(c);
    }

    numberWords.forEach((val, d) => {
      if (line.substring(i).startsWith(val)) {
        p2Digits.push(String(d + 1));
      }
    });
  }

  p1 += parseInt(p1Digits[0] + p1Digits[p1Digits.length - 1]);
  p2 += parseInt(p2Digits[0] + p2Digits[p2Digits.length - 1]);
});

console.log(`Part 1: ${p1}`);
console.log(`Part 2: ${p2}`);
