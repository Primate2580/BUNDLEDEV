# Content guide

How to write lessons for CSS Lab. `npm run test:content` enforces the rules marked (checked).

## The lesson voice (from the Transforms and animations batch on)

Lessons read like a friendly teacher talking you through it, in the style of freeCodeCamp and Codecademy.

- **One flow, no subheadings.** A Learn lesson is paragraphs and code examples, nothing else: no headings, no lists, no
  callout boxes, no compare blocks and no "Recap". Do and don't advice goes inside the paragraphs ("write it like this... avoid
  that, because...").
- **450 to 500 words** of prose per Learn lesson, counting the three concept fields and the paragraphs (code excluded).
- **The three concept fields are the opening of the flow.** `description` says what it is, `why` says why it matters, and
  `mentalModel` is the "think of it this way" paragraph. It is shown as plain text after the words "Think of it this way.", so
  write it as full sentences ("Picture a photo on a table...") and do not start it with "Think of".
- **Talk to the learner.** "Let's make a dot that pulses." "Add this rule to the Playground and watch the badge tilt."
- **Workshop steps read like instructions.** A short explanation, then the task in the order the learner does it, with the text
  to type in fenced code blocks:

      First, add an `h3` element with the text:

      ```md
      Introduction to JavaScript
      ```

      Then, below that `h3` element, add a `p` element with the following text:

      ```md
      JavaScript adds interactivity to a webpage
      ```

  Fenced blocks are kept whole in `instructions.md`, in both the explanation and the `## Task` part.

## Learn lessons: the depth standard

A Learn lesson should teach the idea properly, not just name it. Aim for **450 to 700 words** of
prose (code excluded). The minimum is **350 words** (checked).

Use this shape:

1. **Concept card** (`concept`): `description` (what it is), `why` (why it matters, with a real
   consequence), `mentalModel` (one memorable comparison). All three required (checked).
2. **Body**, built from short sections, each starting with a `heading` (at least one, checked):
   - the idea in plain words, then a small **code example** (at least one, checked),
   - what each part does (a `list`),
   - **a do / not-this comparison** (`compare`) for the commonest mistake,
   - a `callout` (tip, warning or note) for something that surprises beginners,
   - a closing **Recap** `list` with 3+ items (checked).
3. **Reading time** (`minutes`): about 1 minute per 200 words, plus a minute per code example.

Writing rules:

- Define every new term the first time you use it.
- Explain *why*, not just *what*. "Add `lang` because screen readers use it" beats "Add `lang`".
- One idea per paragraph. Short sentences. No jargon without a definition.
- Use `` `backticks` `` for code in text and `**bold**` for the key term being introduced.

## Labs and challenges

- A lab is one task with 4 to 8 requirements. Each check's `message` is the requirement exactly as
  the learner reads it ("The title is "My First Page""). Write it so a pass or fail is obvious.
- The `starter` must **fail** at least one check, and the `solution` must **pass all** (checked).
- Give 3 to 4 `hints`, from a gentle nudge to nearly the answer (at least one, checked).
- Checks inspect the live page (DOM and computed styles), never the learner's source text, so any
  correct solution passes. Accept alternatives with `expected: ["a", "b"]`.
- **Head and document-structure labs need a full-document starter** (one containing `<html>`).
  For HTML fragments the preview adds its own charset and viewport tags, which would make those checks
  pass without the learner doing anything.
- Tailwind labs: style checks (`computedStyle`) can't be verified by `test:content` (it needs a real
  browser to generate the CSS) and are reported as such. Prefer `exists`, `count` and `attribute`
  checks on class names where possible.
- For gaps, check the `gap` property, not `column-gap`/`row-gap`, and for rounded corners check `border-radius`, not
  the per-corner properties: jsdom doesn't expand those shorthands, and the shorthand reads the same in browsers
  (`gap` gives `16px`, or `24px 16px` when rows and columns differ). `padding`, `margin` and `border` do expand.
- jsdom doesn't evaluate media queries. Don't rely on `test:content` to verify responsive rules.

## Workshops

A workshop builds one real thing in 10 to 30 small steps (the freeCodeCamp model). Authored as
folders, compiled by `npm run build:content` into `workshop.generated.ts` (never edit that file):

```
src/content/<track>/<topic>/workshops/<workshop>/
  workshop.json         id, title, summary, minutes, mode, intro, (files, readOnly, canvas)
  step-001/
    instructions.md     explanation, then "## Task", then "## Hints" (bullet list)
    seed.html           step 1 ONLY (later steps start from the previous solution)
    solution.html       (+ solution.css if needed)
    tests.ts            export default Check[]
  step-002/ ...
```

Then import the generated file in the topic and list it among the lessons:
`import w from "./<topic>/workshops/<workshop>/workshop.generated"`.

Writing a step:

- **One idea, one task.** The explanation is 2 short paragraphs (what it is, why it matters). The task
  is one sentence the learner can act on, naming the exact tag, attribute or value.
- **Checks match the task.** 1 to 4 checks, each phrased as the requirement. The seed (previous
  solution) must **fail** at least one, and the solution must **pass all** (checked).
- **Never test something the browser creates by itself.** The DOM always has a `head` and `body`, even
  if the learner didn't type them, so a check like `html > body` can't tell. Test their contents instead
  (`head > meta[charset]`, `body > h1`).
- **Hints**: at least one, ideally two: first the location, then nearly the answer.
- Steps go in order with no gaps (`001`, `002`...). A step's start is always the previous solution, so
  the chain can't break (checked).

If you edit step files while `npm run dev` is running, run `npm run build:content` to refresh.

## Visualizers

An interactive explorer: guided controls, quick presets and a code editor all drive one piece of CSS, and the
preview is annotated (axes, gaps, grid lines, box layers). Written as data in the topic file
(see `src/content/css/flexbox.ts`):

- `stage.html` is the demo markup. `stage.baseCss` is fixed styling that makes it look good. Neither is shown
  to the learner, who only edits `starter` (their CSS).
- `stage.annotate` is `"flex"`, `"grid"`, `"box"` or `"none"`. `target` (default `.container`) is the element being
  explained, and `items` (default `.item`) are its children. `itemCount` enables "change one item" controls.
- `controls`: each edits one declaration, either as `options` (buttons) or a `range` (slider). Use `{item}` in a
  selector (`.item-{item}`) for per-item controls. `fallback` is the browser default shown when the CSS doesn't
  set the property. Controls and the editor edit the same CSS text, so they never disagree.
- `presets`: "quick experiments" that merge declarations into the current CSS in one click.
- `challenge`: a checked task (`solution` is the CSS). The learner only writes CSS, so write checks on computed
  styles of elements in the stage.

Checked by `test:content`: every control targets a real element and every value it can write reads back
unchanged; presets contain declarations; the challenge starter fails and its solution passes. A pleasant
visualizer has 4 to 8 controls, 3 to 5 presets and one challenge.

## Predict, Debug and Quiz lessons

**Predict the output** (`kind: "predict"`): `code` is shown, then 1 to 4 `questions` about it. The preview stays hidden
until every question is resolved, so the learner reasons first. Each question has a `hint` (shown after a wrong
answer; they get two retries), an `explanation`, and `proves`: checks that make the answer true of the code
(checked by `test:content`, so an answer can never claim something the code doesn't do). Ask about things that
checks can see (flex direction, justify-content, sizes), and write the explanation as the "why".

**Debug it** (`kind: "debug"`): `broken` is the code the learner starts with, and the challenge is the bug report.
It plays like a lab with a "What it should look like" preview of the solution. The broken code must **fail** and the
solution must **pass** (checked). Write the description as symptoms, not causes ("the links are bunched on the
left"), and make the first hint point at a tool (the explain panel's **Heads up** card is often the clue).

**Quiz** (`kind: "quiz"`): 10 to 20 questions at the end of a topic (under 5 is an error, under 10 a note). One
question at a time with instant feedback, then a score and a review of misses. Options and question order are
shuffled on every attempt, so vary where the right answer sits in your data anyway (checked). `passPercent`
defaults to 70, and the best score is saved. Write plausible wrong answers that reflect real misconceptions, and put
the "why" in the `explanation`. A question may include a `code` snippet.

## The explain engine

Every code lab, workshop and visualizer shows a "What did that change do?" panel. It is built from the
learner's before/after code by `src/lib/explain`, using plain-English descriptions in `knowledge.ts`
(CSS properties and values) and `explainHtml.ts` (elements and attributes).

- When a lesson introduces a property, value or element the engine describes generically, `npm run test:content`
  prints a note ("the explain engine has no specific description for ..."). Add a sentence to `knowledge.ts`
  (or `ELEMENTS` / `attrText` for HTML) so learners get a real explanation.
- Every workshop step must produce at least one explanation between its starting code and its solution (checked).
- The engine also warns about the commonest silent mistakes, such as `justify-content` on an element that isn't a
  flex or grid container.

## Prerequisites

Each topic in `src/content/index.ts` can list `prerequisites` (topic ids in the same track). They only drive a
"Helpful first" suggestion, never a lock. List the 1 to 3 topics that really make this one easier, not everything
that comes earlier. `test:content` rejects prerequisites that don't exist, point at a harder level, or form a loop.
Prerequisites on topics that aren't written yet are fine: they are ignored until the topic exists.

## Ids

Lesson ids are kebab-case, unique within the topic, and **never renamed** (progress is saved against
them). Update `lessonCount` in `src/content/index.ts` when you add or remove lessons (checked).
