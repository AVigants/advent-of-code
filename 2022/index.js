const fs = require("fs");

const read = (file) => {
  return fs.readFileSync(file, "utf8");
};

function day_i() {
  let input = read("./inputs/d1.txt");
  function part_i() {
    let data = input.split("\n\n");
    let totals = [];
    for (let i = 0; i < data.length; i++) {
      let collection = data[i].split("\n");
      let sum = 0;
      for (let ii = 0; ii < collection.length; ii++) {
        sum += Number(collection[ii]);
      }
      totals.push(sum);
    }
    totals.sort(function (a, b) {
      return b - a;
    });
    console.log(`part 1 - ${totals[0]}`);
    return totals;
  }
  //   part_i();

  function part_ii() {
    let data = part_i();
    let result = 0;
    for (let i = 0; i < 3; i++) {
      result += data[i];
    }
    console.log(`part 2 - ${result}`);
  }
  part_ii();
}
// day_i();

function day_iii() {
  let input = read("./inputs/d3.txt");
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let data = input.split("\n");
  let characters = [];
  let result = 0;

  function part_i() {
    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      // console.log(i, " : " , row);
      let halfLength = row.length / 2;
      let firstHalf = row.slice(0, halfLength);
      let secondHalf = row.slice(halfLength, row.length);
      for (let j = 0; j < firstHalf.length; j++) {
        if (secondHalf.includes(firstHalf[j])) {
          characters.push(firstHalf[j]);
          break;
        }
      }
    }

    for (let i = 0; i < characters.length; i++) {
      let char = characters[i];
      result += alphabet.indexOf(char) + 1;
    }

    console.log(result); //7848
  }
  // part_i();

  function pii() {
    let groups = [];
    let counter = 0;
    let group = [];

    for (let i = 0; i < data.length; i++) {
      if (counter === 2) {
        group.push(data[i]);
        groups.push(group);
        counter = 0;
        group = [];
        continue;
      }

      group.push(data[i]);
      counter++;
    }

    let characters = [];
    let result = 0;

    for (let i = 0; i < groups.length; i++) {
      let group = groups[i];
      group = arrange(group);
      let string_ = group[0];
      let string_i = group[1];
      let string_ii = group[2];

      for (let j = 0; j < string_.length; j++) {
        let char = string_[j];
        if (string_i.includes(char) && string_ii.includes(char)) {
          characters.push(char);
          break;
        }
      }
    }

    for (let i = 0; i < characters.length; i++) {
      let char = characters[i];
      result += alphabet.indexOf(char) + 1;
    }

    console.log(result); //2616
  }
  pii();

  function arrange(group) {
    return group.sort((a, b) => {
      return a.length - b.length;
    });
  }
}
// day_iii();

function day_iv() {
  let input = read("./inputs/d4.txt");
  let data = input.split(`\n`);
  let result = 0;
  function pi() {
    for (let i = 0; i < data.length; i++) {
      let pair = data[i];
      let pairs = pair.split(",");
      let pair_i = pairs[0];
      let pair_ii = pairs[1];
      let a = Number(/(\d+)-/.exec(pair_i)[1]);
      let b = Number(/-(\d+)/.exec(pair_i)[1]);
      let c = Number(/(\d+)-/.exec(pair_ii)[1]);
      let d = Number(/-(\d+)/.exec(pair_ii)[1]);
      if (a <= c && b >= d) {
        result++;
        continue;
      }
      if (c <= a && d >= b) {
        result++;
        continue;
      }
    }
    console.log(result); //605
  }
  // pi();

  function pii() {
    for (let i = 0; i < data.length; i++) {
      let pair = data[i];
      let pairs = pair.split(",");
      let pair_i = pairs[0];
      let pair_ii = pairs[1];
      let a = Number(/(\d+)-/.exec(pair_i)[1]);
      let b = Number(/-(\d+)/.exec(pair_i)[1]);
      let c = Number(/(\d+)-/.exec(pair_ii)[1]);
      let d = Number(/-(\d+)/.exec(pair_ii)[1]);

      let cbDelta = c - b;
      let adDelta = d - a;
      if (cbDelta <= 0 && adDelta >= 0) {
        result++;
      }
    }
    console.log(result); //914
  }
  pii();
}
// day_iv();

function day_v() {
  let input = read("./inputs/d5.txt");
  let data = input.split(`\n`);

  let crates = `
  N 0 C 0 0 0 0 Q 0 
  W 0 J L 0 0 0 J V
  F 0 N D 0 L 0 S W
  R S F G 0 R 0 V Z
  Z G Q C 0 W C F G
  S Q V P S F D R S
  M P R Z P D N N M
  D W W F T H Z W R`;

  let _crates = [];
  crates = crates.split(`\n`).reverse();
  crates.forEach((el) => {
    el = el.trim();
    el = el.replace(/\s/g, "");
    if (el.length) {
      _crates.push(el);
    }
  });

  crates = [];

  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      if (_crates[j][i] != 0) {
        row.push(_crates[j][i]);
      }
      if (j == 7) {
        crates.push(row);
      }
    }
  }

  for (let i = 0; i < crates.length; i++) {
    crates[i] = crates[i].join().replace(/,/g, "");
  }
  // console.log(crates); //ok

  for (let i = 0; i < data.length; i++) {
    let command = data[i];

    let amount = /move (\d+)/.exec(command)[1];
    let startCol = /from (\d+)/.exec(command)[1] - 1;
    let endCol = /to (\d+)/.exec(command)[1] - 1;

    //NOTE - reverse() is needed for pt1. remove ir for pt2
    let slicedCrates = crates[startCol]
      .slice(crates[startCol].length - amount)
      .split("")
      // .reverse()
      .join()
      .replace(/,/g, "");

    crates[startCol] = crates[startCol].slice(
      0,
      crates[startCol].length - amount
    );
    crates[endCol] = crates[endCol] + slicedCrates;
  }

  console.log(crates);
  //FWNSHLDNZ
  //RNRGDNFQG
}

// day_v();

function day_vi() {
  let input = read(`./inputs/d6.txt`);
}
day_vi();
