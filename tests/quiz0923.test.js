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
assert.match(page, /兩端為空氣位移腹點、管內四個節點/);
assert.match(page, /f<sub>n<\/sub> = nv\/\(2L\)/);
assert.match(page, /M34 72 C48 72 60 110 74 110 C88 110 100 72 114 72 C128 72 140 110 154 110 C168 110 180 72 194 72 C208 72 220 110 234 110 C248 110 260 72 274 72 C288 72 300 110 314 110 C328 110 340 72 354 72/);
assert.match(page, /M34 148 C48 148 60 110 74 110 C88 110 100 148 114 148 C128 148 140 110 154 110 C168 110 180 148 194 148 C208 148 220 110 234 110 C248 110 260 148 274 148 C288 148 300 110 314 110 C328 110 340 148 354 148/);
assert.match(page, /10√2/);
assert.match(page, /assets\/quiz0923-refraction-question-pdf\.png/);
assert.ok(fs.existsSync(path.join(process.cwd(), "assets", "quiz0923-refraction-question-pdf.png")));
assert.match(page, /assets\/quiz0923-transverse-question-pdf\.png/);
assert.ok(fs.existsSync(path.join(process.cwd(), "assets", "quiz0923-transverse-question-pdf.png")));
assert.match(page, /波程差/);
assert.match(page, /m = 0, 1, 2/);
assert.match(page, /3 次/);
assert.match(page, /7 次/);
assert.match(page, /datong-0923-comments-v1/);
assert.match(page, /href="index\.html"/);
assert.match(index, /quiz0923\.html/);
assert.match(index, /1-1 到 2-2/);

// The original 0923 displacement graph covers 1.5 periods from x = 0 to 6.
assert.match(page, /M30 37 C51 1 94 1 115 37 S179 73 200 37 S264 1 285 37/);
assert.match(page, /M30 144 C58 144 87 90 115 90 C143 90 172 144 200 144 C228 144 257 90 285 90/);
assert.match(page, /M44 56 C69 20 119 20 144 56 S219 92 244 56 S319 20 344 56/);
assert.match(page, /M44 198 C77 198 111 126 144 126 C177 126 211 198 244 198 C277 198 311 126 344 126/);
assert.match(index, /M30 46 C55 12 105 12 130 46 S205 80 230 46 S305 12 330 46/);
assert.match(index, /M30 156 C63 156 97 88 130 88 C163 88 197 156 230 156 C263 156 297 88 330 88/);
assert.match(index, /M24 43 C46 15 92 15 114 43 S182 71 204 43 S272 15 294 43/);
assert.match(index, /M24 139 C54 139 84 83 114 83 C144 83 174 139 204 139 C234 139 264 83 294 83/);

console.log("0923 static contract passed");
