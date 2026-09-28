# 0923 波動、光與聲音互動詳解 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 0923 wave, light, and sound quiz explainer to DTquiz with interactive steps, cloud comments, a homepage entry, and deployable static files.

**Architecture:** `quiz0923.html` follows the existing self-contained quiz page pattern: CSS for the responsive learning surface and JavaScript data objects for five question cards, controls, checks, and Supabase-backed comments. `index.html` remains the hub, while `supabase-schema.sql` is the source of truth for the public comment allowlist. A dependency-free Node test reads the static files and asserts the required public contract.

**Tech Stack:** HTML, CSS, browser JavaScript, Supabase REST API, Node.js built-in `node:fs` and `node:assert`, GitHub Pages, Netlify static deployment.

## Global Constraints

- Preserve existing `quiz0526.html`, `quiz0604.html`, `quiz0618.html`, and their comments unchanged.
- Use Traditional Chinese and classroom terminology: 「密部／疏部」、「簡諧運動」、「波程差」。
- Use question IDs `0923-q1` to `0923-q5` and local fallback key `datong-0923-comments-v1`.
- Use the existing Supabase project, `quiz_comments` table, and anonymous insert/read flow.
- Keep all page controls usable at desktop and mobile widths and retain a visible return-home link.
- Push only verified commits to `t928-spec/DTquiz` `main`; prepare the Netlify drop archive at `C:\Users\User\Documents\小考訂正用\DTquiz-netlify.zip`.

---

## File Structure

- Create: `tests/quiz0923.test.js` - static contract test for the new page, homepage, and Supabase allowlist.
- Create: `quiz0923.html` - the five-question interactive explanation page.
- Modify: `index.html` - latest-quiz hero, `1-1 到 2-2` filter, and 0923 card.
- Modify: `supabase-schema.sql` - allow the five 0923 comment IDs.
- Modify: `docs/superpowers/specs/2026-09-29-quiz0923-wave-light-sound-design.md` only if implementation reveals a required factual correction.
- Generate outside Git: `C:\Users\User\Documents\小考訂正用\DTquiz-netlify.zip` - Netlify drop archive containing root HTML, `assets`, `netlify.toml`, and `.nojekyll`.

## Task 1: Establish the Static Contract Test

**Files:**
- Create: `tests/quiz0923.test.js`

**Interfaces:**
- Consumes: repository root from `process.cwd()`.
- Produces: `node tests/quiz0923.test.js`, which exits 0 only when the 0923 page, homepage route, comments IDs, and required answers are present.

- [ ] **Step 1: Write the failing test**

Create `tests/quiz0923.test.js` with this contract:

```js
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node tests/quiz0923.test.js`

Expected: failure because `quiz0923.html` does not exist.

- [ ] **Step 3: Keep the test as the public content contract**

Do not weaken the exact checks. They capture the agreed distinguishing ideas: zero-displacement dense/rarefied reasoning, SHM, open-pipe resonance, refraction, and wavelength plus path difference.

- [ ] **Step 4: Commit the red test**

```bash
git add tests/quiz0923.test.js
git commit -m "Test 0923 quiz content contract"
```

## Task 2: Build the 0923 Interactive Quiz Page

**Files:**
- Create: `quiz0923.html`
- Test: `tests/quiz0923.test.js`

**Interfaces:**
- Consumes: the existing `COMMENT_BACKEND`, comment-rendering behavior, and responsive card styles from `quiz0618.html`.
- Produces: a stand-alone page at `quiz0923.html` with `quiz` data records for `0923-q1` through `0923-q5`.

- [ ] **Step 1: Run the contract test again before implementation**

Run: `node tests/quiz0923.test.js`

Expected: failure because the page has not been created.

- [ ] **Step 2: Create the page shell and shared interaction code**

Copy the structural shell, controls, question navigation, comment form, Supabase fetch/post functions, HTML escaping, and mobile styles from `quiz0618.html`. Change the page title, sidebar label, range to `1-1～2-2`, source pill to `波動｜光與聲音`, storage key to `datong-0923-comments-v1`, and initial question ID to `0923-q1`.

The page header must include:

```html
<a class="home-link" href="index.html">← 返回首頁</a>
```

Use a `wave` hero visual with a labelled displacement curve and pressure curve, so the page advertises the relation used in question 1 without reproducing the annotated answer photograph.

- [ ] **Step 3: Add the five question records with these exact reasoning checkpoints**

Implement `const quiz = [...]` with these required answer and step sequences:

```js
{
  id: "0923-q1",
  nav: "縱波密疏",
  answer: "密部：x=2、6；疏部：x=0、4。壓力在密部最大、在疏部最小。",
  concepts: ["縱波", "位移快照", "密部與疏部", "壓力變化"],
  pitfalls: ["把峰谷當成密疏", "把位移圖誤讀成速度圖"],
  steps: [
    "找出位移為零的位置 x=0、2、4、6",
    "判斷兩側質點位移是否指向該點",
    "指向該點為密部，背離該點為疏部",
    "利用壓力與密度同相畫出壓力-位置圖"
  ]
}
```

```js
{
  id: "0923-q2",
  nav: "繩波與 SHM",
  answer: "選 D：C 點速率最大，加速度量值為零。",
  concepts: ["橫波", "簡諧運動", "平衡位置"],
  pitfalls: ["把波形斜率當作加速度", "以為最高點速率最大"],
  steps: [
    "每個繩上質點都做簡諧運動",
    "使用 a=-ω²y 判斷加速度",
    "使用 y=0 時速率最大",
    "辨認 C 是平衡位置並選 D"
  ]
}
```

```js
{
  id: "0923-q3",
  nav: "開管諧音",
  answer: "第 4 諧音。",
  steps: [
    "由 λ=v/f=340/680=0.5 m",
    "兩端開口管滿足 L=nλ/2",
    "代入 1=n(0.5)/2 得 n=4"
  ]
}
```

```js
{
  id: "0923-q4",
  nav: "干涉與折射",
  answer: "(1) 錯，應增加兩波源間距或減小波長。(2) 錯，淺水波速為 10√2 cm/s。",
  steps: [
    "節線數增加對應 d/λ 增加",
    "波前與界面夾角等於傳播方向與法線夾角",
    "套用 sinθ深/v深=sinθ淺/v淺",
    "求 v淺=20×sin30°/sin45°=10√2 cm/s"
  ]
}
```

```js
{
  id: "0923-q5",
  nav: "聲波干涉",
  answer: "(1) 3 次；(2) 7 次。",
  concepts: ["同相點波源", "波程差", "破壞性干涉"],
  pitfalls: ["未先算波長", "不計算波程差就直接數線"],
  steps: [
    "由 λ=v/f=340/170=2 m",
    "S1 到 P 的波程差由 5λ 變到 ΔP=(10√2-10)m=(5√2-5)λ，跨過 4.5λ、3.5λ、2.5λ",
    "P 到 S2 先到波程差 0 再到 5λ",
    "列出兩段跨越的半整數倍波長，共得到 3 次與 7 次"
  ]
}
```

For every string in the outline, write a student-facing body, a detailed explanation, an appropriate diagram key, and one three-option check with feedback. Retain semantic `sub` and `sup` HTML for mathematical subscripts and exponents.

- [ ] **Step 4: Add the diagram renderers and accessible text**

Define a `diagrams` object with keys `longitudinal`, `transverse`, `openPipe`, `refraction`, and `interference`. Use labelled HTML/CSS diagrams, not colour alone, and provide an `aria-label` or informative `alt` text for each figure. The interference diagram must show S1, S2, P, both 10 m legs, and the changing wave-path difference; the refraction diagram must label deep and shallow water plus the normal.

- [ ] **Step 5: Run the contract test to verify it passes**

Run: `node tests/quiz0923.test.js`

Expected: `0923 static contract passed`.

- [ ] **Step 6: Commit the interactive page**

```bash
git add quiz0923.html tests/quiz0923.test.js
git commit -m "Add 0923 wave quiz explainer"
```

## Task 3: Add Homepage Discovery and Cloud Comment Permission

**Files:**
- Modify: `index.html:429-500`
- Modify: `supabase-schema.sql:19-32`
- Test: `tests/quiz0923.test.js`

**Interfaces:**
- Consumes: `quizzes` array and `quizCard()` renderer in `index.html`, plus the question-ID allowlist in `supabase-schema.sql`.
- Produces: a card that links to `quiz0923.html`, a matching filter, and Supabase authorization for every 0923 question comment.

- [ ] **Step 1: Extend the contract test before changing the files**

Add these assertions to `tests/quiz0923.test.js`:

```js
assert.match(index, /date: "0923"/);
assert.match(index, /range: "1-1to2-2"/);
assert.match(index, /title: "波動、光與聲音"/);
assert.match(index, /meta: "5 題｜互動步驟｜小檢核｜留言區"/);
```

- [ ] **Step 2: Run the extended test to verify it fails**

Run: `node tests/quiz0923.test.js`

Expected: assertion failure because the 0923 homepage card has not been added.

- [ ] **Step 3: Update the homepage**

Replace the hero image panel content with a clean wave figure available from the new page or a matching local asset. Change the hero copy to `最新：0923 波動、光與聲音` and `範圍 1-1～2-2｜波動、駐波、干涉與折射`.

Add this filter button after the `5-1 到 5-3` button:

```html
<button class="filter-button" type="button" data-filter="1-1to2-2">1-1 到 2-2</button>
```

Prepend this item to `const quizzes`:

```js
{
  date: "0923",
  range: "1-1to2-2",
  title: "波動、光與聲音",
  description: "縱波密疏、繩波與簡諧運動、開管諧音、干涉、折射與聲波波程差。",
  href: "quiz0923.html",
  topics: ["縱波", "簡諧運動", "駐波", "干涉與折射"],
  meta: "5 題｜互動步驟｜小檢核｜留言區",
  visual: "wave"
}
```

Extend the visual selection in `quizCard()` with `waveArt()` and define `waveArt()` as a semantic labelled illustration with a displacement curve, pressure curve, and a rightward propagation arrow.

- [ ] **Step 4: Update the Supabase allowlist**

Append these values within the existing `question_id in (...)` list:

```sql
'0923-q1', '0923-q2', '0923-q3', '0923-q4', '0923-q5'
```

Keep the existing `name` and `message` length limits unchanged.

- [ ] **Step 5: Run the contract test to verify it passes**

Run: `node tests/quiz0923.test.js`

Expected: `0923 static contract passed`.

- [ ] **Step 6: Commit the navigation and data permission update**

```bash
git add index.html supabase-schema.sql tests/quiz0923.test.js
git commit -m "Link 0923 quiz and enable comments"
```

## Task 4: Verify Responsive Output and Prepare Both Hosts

**Files:**
- Modify: `index.html`, `quiz0923.html`, `supabase-schema.sql` only if verification finds a defect.
- Generate: `C:\Users\User\Documents\小考訂正用\DTquiz-netlify.zip`
- Test: `tests/quiz0923.test.js`

**Interfaces:**
- Consumes: the final committed static site.
- Produces: a verified GitHub Pages source branch and a Netlify-ready drop archive.

- [ ] **Step 1: Verify content and document structure**

Run:

```bash
node tests/quiz0923.test.js
git diff --check
```

Expected: contract output is `0923 static contract passed`; Git reports no whitespace errors.

- [ ] **Step 2: Verify navigation and layout at two widths**

Serve the repository with a local static server. Check `index.html` and `quiz0923.html` at 1440 px and 390 px widths. Confirm every question navigation button opens its card, all controls retain readable labels, every return-home link works, full mathematical notation remains visible, and comments remain below the corresponding question.

- [ ] **Step 3: Build and inspect the Netlify archive**

Create `C:\Users\User\Documents\小考訂正用\DTquiz-netlify.zip` with exactly these root-level entries: `index.html`, `quiz0526.html`, `quiz0604.html`, `quiz0618.html`, `quiz0923.html`, `supabase-schema.sql`, `netlify.toml`, `.nojekyll`, and `assets/`.

List the archive contents and confirm `quiz0923.html` appears at the archive root.

- [ ] **Step 4: Commit any verification fixes, then push GitHub Pages source**

```bash
git add index.html quiz0923.html supabase-schema.sql tests/quiz0923.test.js
git commit -m "Verify 0923 quiz deployment"
git push origin main
```

Only create the final commit when `git status --short` shows the intended changes and both verification commands in Step 1 pass.

- [ ] **Step 5: Publish Netlify**

If the existing Netlify site is connected to `t928-spec/DTquiz`, trigger or wait for the deploy associated with the pushed `main` commit. Otherwise, upload `C:\Users\User\Documents\小考訂正用\DTquiz-netlify.zip` to Netlify Drop, then open the resulting site and confirm `/quiz0923.html` loads.
