const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const read = file => fs.readFileSync(path.join(process.cwd(), file), "utf8");
const page = read("quiz0923.html");
const index = read("index.html");
const schema = read("supabase-schema.sql");

for (const id of ["0923-q1", "0923-q2", "0923-q3", "0923-q4", "0923-q5"]) {
  assert.match(page, new RegExp(`id: "${id}"`));
  assert.match(schema, new RegExp(`'${id}'`));
}

assert.match(page, /位移為零/);
assert.match(page, /兩側.*指向.*密部/);
assert.match(page, /壓力的平衡線.*1 atm/);
assert.match(page, /疏部.*小於.*1 atm/);
assert.match(page, /簡諧運動/);
assert.match(page, /大卓利用繩子/);
assert.match(page, /第 4 諧音/);
assert.match(page, /10√2/);
assert.match(page, /波程差/);
assert.match(page, /3 次/);
assert.match(page, /7 次/);
assert.match(page, /datong-0923-comments-v1/);
assert.match(page, /href="index\.html"/);
assert.match(index, /quiz0923\.html/);
assert.match(index, /1-1 到 2-2/);

// The original 0923 displacement graph covers 1.5 periods from x = 0 to 6.
assert.match(page, /M30 37 C51 1 94 1 115 37 S179 73 200 37 S264 1 285 37/);
assert.match(page, /M44 56 C69 20 119 20 144 56 S219 92 244 56 S319 20 344 56/);
assert.match(index, /M30 46 C55 12 105 12 130 46 S205 80 230 46 S305 12 330 46/);
assert.match(index, /M24 43 C46 15 92 15 114 43 S182 71 204 43 S272 15 294 43/);

console.log("0923 static contract passed");
