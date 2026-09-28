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
assert.match(page, /簡諧運動/);
assert.match(page, /第 4 諧音/);
assert.match(page, /10√2/);
assert.match(page, /波程差/);
assert.match(page, /3 次/);
assert.match(page, /7 次/);
assert.match(page, /datong-0923-comments-v1/);
assert.match(page, /href="index\.html"/);
assert.match(index, /quiz0923\.html/);
assert.match(index, /1-1 到 2-2/);

console.log("0923 static contract passed");
