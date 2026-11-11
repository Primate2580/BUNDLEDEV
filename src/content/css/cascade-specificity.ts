import type { TopicContent } from "@/engine/types";
import untangleAStylesheet from "./cascade-specificity/workshops/untangle-a-stylesheet/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
          id: "what-the-cascade-decides",
          kind: "learn",
          title: "What the cascade decides",
          summary: "When two rules disagree, the browser runs a fixed set of tie-breakers. Learn them in order.",
          minutes: 10,
          concept: {
            description: "The **cascade** is the algorithm that decides which declaration wins when several rules set the same property on the same element. It is not a mystery or a bug: it is a fixed list of tie-breakers, and the browser works down the list until one declaration is left.",
            why: "Almost every \"my CSS is not working\" moment is a cascade question. The rule you wrote is present, matched the element and was simply outvoted. If you know the order of the tie-breakers, you can say which rule won and why, in a few seconds, instead of adding `!important` and hoping.",
            mentalModel: "The cascade is a panel of judges who score in a fixed order. The first judge looks at where the rule came from and whether it is marked important. If that is a tie, the next judge looks at how specific the selector is. If that is a tie as well, the last judge simply picks the rule that comes later. A rule only needs to win one round.",
          },
          body: [
            {
              type: "heading",
              text: "Many rules, one value",
            },
            {
              type: "paragraph",
              text: "Think about a paragraph on a real page. The browser has default styles for `p`. Your stylesheet might set `p { color: #334155 }`, a component might set `.note { color: #4f46e5 }`, and a campaign page might add `#promo { color: #b91c1c }`. All three rules **match** the same element, and all three set `color`. An element can only have one colour, so the browser has to pick one declaration. The cascade is that choice.",
            },
            {
              type: "paragraph",
              text: "Two things the cascade is **not**. It is not about which property you wrote last in a single rule (inside one rule block, a repeated property simply overrides the earlier one). And it is not applied across different properties: if one rule sets `color` and another sets `font-size`, they do not compete at all, and both apply.",
            },
            {
              type: "heading",
              text: "The tie-breakers, in order",
            },
            {
              type: "list",
              items: [
                "**Relevance.** Only declarations whose selector matches the element (and whose `@media` or `@supports` condition is true) take part.",
                "**Origin and importance.** Browser default styles, the person's own settings, and your styles are three **origins**. A declaration marked `!important` jumps to a different, reversed, ranking.",
                "**Inline style.** A declaration in the element's `style` attribute beats ordinary selector rules.",
                "**Cascade layers.** If you use `@layer`, a rule in a later layer beats one in an earlier layer. A later topic explains this.",
                "**Specificity.** A more specific selector beats a less specific one. The next lessons show how to count it.",
                "**Order of appearance.** If everything above is a tie, the declaration that comes **last** in the stylesheet wins.",
              ],
            },
            {
              type: "paragraph",
              text: "The browser walks down this list for each property of each element, and stops as soon as one declaration is left. That is why most day-to-day conflicts are decided by two of the last three steps: specificity first, and then source order.",
            },
            {
              type: "code",
              language: "css",
              code: `p        { color: #334155; }   /* matches, specificity (0,0,1) */
    .note    { color: #4f46e5; }   /* matches, specificity (0,1,0) */
    #promo   { color: #b91c1c; }   /* matches, specificity (1,0,0) */
    
    /* <p class="note" id="promo"> is red: the id rule wins on specificity. */`,
              caption: "Three rules match one paragraph, and the most specific one wins",
            },
            {
              type: "heading",
              text: "Winning one property, losing another",
            },
            {
              type: "paragraph",
              text: "The cascade runs **per property**. Rule A can win the `color` of an element while rule B wins its `font-size`, and the element then uses a mixture of both. This is why overriding styles can feel like it half works: your rule did win some properties, and lost others to a more specific rule that sets them.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `p        { color: #334155; font-size: 1rem; }
    .note    { color: #4f46e5; }`,
                note: "`.note` wins `color` (higher specificity), and `p` still supplies `font-size`, because nothing else sets it. The paragraph gets a mix.",
              },
              bad: {
                code: `p        { color: #334155; font-size: 1rem; }
    .note    { color: #4f46e5; font-size: 1rem; }`,
                note: "Repeating declarations you did not mean to change adds weight to the stylesheet and makes the next override harder. Only write the properties that should differ.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "When you open DevTools and select an element, the Styles panel lists matching rules from the strongest at the top to the weakest at the bottom, and draws a line through the declarations that lost. It is the cascade, laid out for you.",
            },
            {
              type: "callout",
              tone: "note",
              text: "Inheritance is not part of this list. An inherited value is only used when **no** declaration at all applies to the element for that property, so even a weak rule beats it. A later lesson covers this.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "The cascade is the fixed procedure that picks one declaration when several match the same element and property.",
                "The order of the tie-breakers is: relevance, origin and importance, inline style, layers, specificity, then order of appearance.",
                "It works per property, so an element can take some properties from one rule and the rest from another.",
                "Most real conflicts come down to specificity, and then to which rule is later.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "specificity-the-three-columns",
          kind: "learn",
          title: "Specificity: IDs, classes and types",
          summary: "Every selector has a weight made of three columns. Learn what goes in each one.",
          minutes: 10,
          concept: {
            description: "**Specificity** is a weight the browser gives every selector. It has three columns: the number of **ID** selectors, the number of **class-like** selectors (classes, attributes and pseudo-classes), and the number of **type-like** selectors (element names and pseudo-elements). Written as `(a, b, c)`, a selector with more in a left column always beats one with less, whatever is to the right.",
            why: "A selector you wrote months ago can silently outrank a new one. Being able to read specificity at a glance explains why a plain `.btn` loses to `#sidebar a`, and it also shows how to avoid the problem altogether by writing selectors that are all about the same weight.",
            mentalModel: "Specificity is a three-digit odometer, but the digits never carry over. The left wheel is IDs, the middle wheel is classes, the right wheel is types. Compare the left wheel first. Only if both are equal do you look at the middle wheel, and then the right. Ten classes never add up to one ID.",
          },
          body: [
            {
              type: "heading",
              text: "The three columns",
            },
            {
              type: "list",
              items: [
                "**Column a: IDs.** Each `#id` selector counts one here, for example `#header`.",
                "**Column b: classes, attributes and pseudo-classes.** Each `.class`, each attribute selector such as `[type=\"email\"]` and each pseudo-class such as `:hover` or `:nth-child(2)` counts one here.",
                "**Column c: types and pseudo-elements.** Each element name such as `p` or `a`, and each pseudo-element such as `::before`, counts one here.",
              ],
            },
            {
              type: "paragraph",
              text: "Everything else has **no weight at all**: the universal selector `*`, the combinators (a space, `>`, `+`, `~`) and the `:where()` pseudo-class contribute nothing. This matters because a selector such as `.menu > li` is not heavier than `.menu li`. Combinators only decide which elements match, never how much the selector weighs.",
            },
            {
              type: "code",
              language: "css",
              code: `p                  /* (0, 0, 1)  one type */
    .note              /* (0, 1, 0)  one class */
    #promo             /* (1, 0, 0)  one id */
    p.note             /* (0, 1, 1)  one class, one type */
    a:hover            /* (0, 1, 1)  one pseudo-class, one type */
    input[type="email"]/* (0, 1, 1)  one attribute, one type */
    p::first-line      /* (0, 0, 2)  one type, one pseudo-element */
    *                  /* (0, 0, 0)  nothing */`,
              caption: "The weight of some everyday selectors",
            },
            {
              type: "heading",
              text: "Compare from the left",
            },
            {
              type: "paragraph",
              text: "To find which selector is stronger, compare the **first column**. The bigger number wins, and you stop. Only if the first columns are equal do you look at the second column, and then the third. `(1, 0, 0)` beats `(0, 20, 0)`, because one ID beats any number of classes. `(0, 2, 0)` beats `(0, 1, 5)`, because two classes beat one class and any number of types.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `/* (0, 2, 0) beats (0, 1, 5) */
    .card .title        { color: #4f46e5; }
    .card div div div div div { color: #94a3b8; }`,
                note: "Two classes in the middle column beat any number of element names in the right column, so the first rule wins.",
              },
              bad: {
                code: `/* a common mistake: adding the columns up */
    .a.b.c.d.e.f.g.h.i.j.k   /* (0, 11, 0) */
    #x                       /* (1, 0, 0)  still wins */`,
                note: "Specificity is not a base-10 number. Eleven classes lose to one ID, because the columns never carry over.",
              },
            },
            {
              type: "heading",
              text: "The universal selector and combinators",
            },
            {
              type: "paragraph",
              text: "`*` has zero weight, so `* { color: red }` loses to any other rule, even a plain `p`. This is a useful tool: you can use `*` for a very weak default that anything else overrides. Combinators are the same: `nav > a` and `nav a` both weigh `(0, 0, 2)`, because they have the same two type selectors.",
            },
            {
              type: "callout",
              tone: "tip",
              text: "To keep the three columns straight, think of the order of strength in a real address: the ID is a person (unique), the class is a street (a group) and the type is a country (very broad). The more specific the address, the more it is worth.",
            },
            {
              type: "callout",
              tone: "note",
              text: "There is a fourth rung above all of these: an inline `style` attribute beats any selector, and `!important` ranks above that. Neither is part of the three columns, and they have their own lessons.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Specificity has three columns: IDs, then classes/attributes/pseudo-classes, then types/pseudo-elements.",
                "Compare the columns from the left. A bigger left column always wins, whatever is on the right.",
                "`*`, combinators and `:where()` add no weight.",
                "The columns never carry over, so many classes never beat one ID.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "calculating-specificity",
          kind: "learn",
          title: "Calculating specificity, step by step",
          summary: "A short routine for counting the weight of any selector, including `:not()`, `:is()` and `:where()`.",
          minutes: 10,
          concept: {
            description: "To calculate specificity, walk through the selector from left to right and tally what you see in three columns. Simple selectors are one tally each. The functional pseudo-classes `:not()`, `:is()` and `:has()` take the weight of their most specific argument, and `:where()` always counts as zero.",
            why: "You will read specificity far more often than you calculate it. But a few minutes of deliberate counting makes the numbers automatic, and it removes the guesswork from lists of selectors such as `a:not(.btn):hover`, where it is not obvious which part counts.",
            mentalModel: "Counting specificity is like counting items at a till. Each selector part is an item with a price in one of three currencies. You total each currency separately, and you never convert between them. The only trick is that some selectors are wrapping paper: they cost whatever is inside.",
          },
          body: [
            {
              type: "heading",
              text: "A routine",
            },
            {
              type: "list",
              items: [
                "Look at each part of the selector, ignoring combinators and `*`.",
                "Add one to **a** for each `#id`.",
                "Add one to **b** for each `.class`, `[attribute]` and `:pseudo-class`.",
                "Add one to **c** for each `element` and `::pseudo-element`.",
                "Read the three numbers as `(a, b, c)` and compare them from the left.",
              ],
              ordered: true,
            },
            {
              type: "code",
              language: "css",
              code: `nav ul li a                 /* (0, 0, 4)  four types */
    .menu a.active              /* (0, 2, 1)  two classes, one type */
    #main .card:hover h2        /* (1, 2, 1)  id; class and :hover; one type */
    a[href^="https"]::after     /* (0, 1, 2)  attribute; a and ::after */`,
              caption: "Four selectors, counted",
            },
            {
              type: "heading",
              text: "The pseudo-classes that wrap other selectors",
            },
            {
              type: "paragraph",
              text: "`:not()`, `:is()` and `:has()` are **transparent** to specificity: they add nothing themselves, but they take the weight of the most specific selector inside their parentheses. `:where()` is different: it is always zero, whatever is inside. `:nth-child()` and `:nth-last-child()` count as a pseudo-class, which is one in column b. With the optional `of S` part, they also add the most specific selector in `S`.",
            },
            {
              type: "code",
              language: "css",
              code: `:not(.btn)                 /* (0, 1, 0)  takes .btn */
    :not(#a, .b)                /* (1, 0, 0)  takes the most specific: #a */
    :is(h1, .title, #hero)      /* (1, 0, 0)  takes #hero, even if it is not the one that matched */
    :where(h1, .title, #hero)   /* (0, 0, 0)  always zero */
    :nth-child(2)               /* (0, 1, 0)  counts as a pseudo-class */
    li:has(> a.active)          /* (0, 2, 1)  li, plus .active inside :has() */`,
              caption: "Functional pseudo-classes",
            },
            {
              type: "paragraph",
              text: "The `:is()` rule has a surprising consequence: the weight comes from the most specific argument in the **list**, not from the one that actually matched the element. `:is(h1, #hero)` has an ID's weight even when it matches a plain `h1`. This is one reason to write the arguments with care.",
            },
            {
              type: "heading",
              text: "A worked example",
            },
            {
              type: "paragraph",
              text: "Take `.sidebar ul > li:not(.current) a:hover`. Count the parts: `.sidebar` is a class (b), `ul` is a type (c), `li` is a type (c), `:not(.current)` takes `.current` which is a class (b), `a` is a type (c), and `:hover` is a pseudo-class (b). The tally is three in column b and three in column c, so the specificity is `(0, 3, 3)`. A selector of just `.sidebar .link.active` would be `(0, 3, 0)`, which beats `(0, 2, 5)` but loses to `(0, 3, 3)` thanks to the extra types.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `/* (0, 1, 0) */
    .btn:not(.disabled) { background-color: #4f46e5; }
    
    /* (0, 2, 0) */
    .btn.enabled { background-color: #4f46e5; }`,
                note: "`:not(.disabled)` takes the weight of `.disabled`, one class, so the whole selector is `(0, 1, 0)` plus the class `.btn`. Both rules weigh the same, which is easy to reason about.",
              },
              bad: {
                code: `/* (1, 1, 0): the :not() takes the ID */
    .btn:not(#locked) { background-color: #4f46e5; }`,
                note: "Using an ID inside `:not()` quietly gives the selector an ID's weight, which is almost impossible to override without another ID.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "Some DevTools show specificity when you hover a selector, and online specificity calculators accept any selector. Use them to check your counting while you learn.",
            },
            {
              type: "callout",
              tone: "warning",
              text: "Pseudo-elements such as `::before` are column c, but the pseudo-class `:hover` is column b. People often swap them, because the single colon and the double colon look alike.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Count each selector part into three columns, ignoring `*` and combinators.",
                "`:not()`, `:is()` and `:has()` take the weight of their most specific argument. `:where()` is always zero.",
                "`:nth-child()` counts as one pseudo-class.",
                "Compare the totals from the left: the first column that differs decides.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "source-order-and-ties",
          kind: "learn",
          title: "Source order and ties",
          summary: "When specificity is equal, the later rule wins, and what \"later\" means across files and `<style>` tags.",
          minutes: 9,
          concept: {
            description: "If two rules have the same origin, the same importance and the same specificity, the browser picks the one that appears **later**. This tie-breaker is called **order of appearance**, or source order, and it applies across all your stylesheets read in the order they load.",
            why: "Source order is the quietest part of the cascade. Nothing about a rule says \"I am weak\", but if it sits above an equal rule, it loses. Many bugs come from moving a rule up or down a file, or from linking stylesheets in a different order, and the symptom is a change that seems to have no cause.",
            mentalModel: "Source order is a vote where each side has the same number of ballots, and the tie is broken by who spoke last. Everything else in the cascade comes first. Only when the weights are exactly equal does the last speaker win.",
          },
          body: [
            {
              type: "heading",
              text: "Last one wins",
            },
            {
              type: "paragraph",
              text: "Read the stylesheet from top to bottom. When two matching declarations tie on everything else, the second one replaces the first. It works the same way inside a single rule: if you write `color` twice in a block, the second one is used. Browsers actually rely on this to support new features, because an older browser keeps the first value and a newer one replaces it.",
            },
            {
              type: "code",
              language: "css",
              code: `.btn         { background-color: #4f46e5; }
    .btn-danger  { background-color: #dc2626; }
    
    /* <a class="btn btn-danger">: both rules weigh (0,1,0), so the later one wins: red */`,
              caption: "Equal weight, so the later rule wins",
            },
            {
              type: "paragraph",
              text: "Notice what does not matter: the order of the class names in the HTML `class` attribute. `class=\"btn btn-danger\"` and `class=\"btn-danger btn\"` are identical to the browser, because the order of the **rules**, not the order of the names, decides.",
            },
            {
              type: "heading",
              text: "Across files and style tags",
            },
            {
              type: "paragraph",
              text: "Source order is calculated across the whole document. The browser treats all stylesheets as one long list, in the order that they appear in the HTML. A `<link>` tag that comes after another `<link>` is later, and a `<style>` block after a `<link>` is later still. If a library's CSS is linked **after** your own, its rules win every tie against yours, so linking your stylesheet last is a common convention. An `@import` is read where it is written, and it must be at the top of a stylesheet, so it is always earlier than the rules below it in that file.",
            },
            {
              type: "heading",
              text: "Order as a design tool",
            },
            {
              type: "paragraph",
              text: "A tidy codebase uses source order on purpose. Put generic rules first, then components, then variants and states, and finally utilities. A variant such as `.btn-danger` then reliably beats the base `.btn` because it comes later, and the two selectors can have **the same weight**, which is the easiest kind of code to maintain.",
            },
            {
              type: "list",
              items: [
                "**Base:** element defaults such as `a`, `h1` and `body`.",
                "**Components:** `.card`, `.btn`, `.nav`.",
                "**Variants and states:** `.btn-danger`, `.is-open`, `.card--featured`.",
                "**Utilities:** `.hidden`, `.text-center`, which should win over everything before them.",
              ],
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.btn         { background-color: #4f46e5; }
    .btn-danger  { background-color: #dc2626; }
    .btn-disabled { background-color: #cbd5e1; }`,
                note: "The variants come after the base, and equal weights let the later rule win. The disabled state is last, so it beats the others.",
              },
              bad: {
                code: `.btn-disabled { background-color: #cbd5e1; }
    .btn-danger  { background-color: #dc2626; }
    .btn         { background-color: #4f46e5; }`,
                note: "The base rule is last, so it wins every tie. The variants look like they are broken, and the fix is to reorder, not to add `!important`.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "When two rules look equal and the wrong one wins, check three things in order: is the weight really the same, which is later, and is a stylesheet loaded in an unexpected order. Reordering is the cheapest fix.",
            },
            {
              type: "callout",
              tone: "warning",
              text: "Sorting rules alphabetically or by property is tempting, but it silently breaks the order that the cascade depends on. Keep source order meaningful, and group by role instead.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "With equal origin, importance and specificity, the later declaration wins.",
                "The order of class names in the HTML does not matter, only the order of the rules.",
                "Stylesheets are one long list in the order they load, so link your own after libraries.",
                "Organise rules from generic to specific so that source order helps you instead of surprising you.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "specificity-duel",
          kind: "visualizer",
          title: "Specificity duel",
          summary: "Three lines of text, three rules of increasing weight. Change each rule's colour and see which one actually shows.",
          minutes: 8,
          concept: {
            description: "Three paragraphs are matched by one, two and three rules: a type selector `p`, a class `.note` and an ID `#msg`. Each rule sets a different colour, and the colour you see is the colour of the heaviest rule that matches. Change the colours with the controls, then try to beat the ID without editing it.",
            why: "Reading a table of weights is one thing, and watching a colour refuse to change is another. If you turn the `p` rule purple and only the first line changes, you have seen exactly why a weak rule loses.",
            mentalModel: "Each line is a contest. Line 1 has one rule entered, line 2 has two, and line 3 has three. In every contest the heaviest selector wins, so the colour of the lighter rules never shows on the lines they lose. Their colour only appears where nothing heavier matches.",
          },
          stage: {
            html: `<p class="one">Matched by <b>p</b> only</p>
    <p class="note two">Matched by <b>p</b> and <b>.note</b></p>
    <p class="note" id="msg">Matched by <b>p</b>, <b>.note</b> and <b>#msg</b></p>`,
            baseCss: `html, body { margin: 0; }
    body { padding: 20px 16px; background: #0f172a; font-family: system-ui, sans-serif; font-size: 18px; font-weight: 600; }
    p { margin: 0 0 10px; padding: 12px 14px; border-radius: 10px; background: #1e293b; }
    b { font-weight: 700; }`,
            annotate: "none",
            target: "body",
            items: "p",
            itemCount: 3,
          },
          starter: `p {
      color: #ef4444;
    }
    
    .note {
      color: #3b82f6;
    }
    
    #msg {
      color: #22c55e;
    }
    `,
          controls: [
            {
              id: "type",
              label: "Colour of `p`  (0, 0, 1)",
              selector: "p",
              property: "color",
              fallback: "#ef4444",
              type: "options",
              options: ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#a855f7"],
              help: "Only line 1 shows this colour, because lines 2 and 3 are matched by heavier rules.",
            },
            {
              id: "class",
              label: "Colour of `.note`  (0, 1, 0)",
              selector: ".note",
              property: "color",
              fallback: "#3b82f6",
              type: "options",
              options: ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#a855f7"],
              help: "Lines 2 shows this colour. Line 3 is matched too, but an ID is heavier.",
            },
            {
              id: "id",
              label: "Colour of `#msg`  (1, 0, 0)",
              selector: "#msg",
              property: "color",
              fallback: "#22c55e",
              type: "options",
              options: ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#a855f7"],
              help: "The ID wins line 3 whatever the other two rules say.",
            },
          ],
          presets: [
            {
              id: "weak",
              label: "Recolour `p` purple",
              description: "only line 1 changes",
              css: "p { color: #a855f7; }",
            },
            {
              id: "mid",
              label: "Recolour `.note` amber",
              description: "lines 1 and 3 do not change",
              css: ".note { color: #f59e0b; }",
            },
            {
              id: "heavy",
              label: "Recolour `#msg` red",
              description: "only line 3 changes",
              css: "#msg { color: #ef4444; }",
            },
          ],
          challenge: {
            title: "Beat the ID",
            description: "Make line 3 (`#msg`) amber, `#f59e0b`, **without editing the `#msg` rule**, and without using `!important`. Add a new rule with a selector that is heavier than `#msg` and comes after it. Lines 1 and 2 must keep their colours.",
            hints: [
              "A heavier selector needs more than one ID, or an ID plus other parts. You can add a class and a type to the ID.",
              "`p#msg.note` has one ID, one class and one type, so it weighs `(1, 1, 1)`, which is more than `(1, 0, 0)`.",
              "`p#msg.note { color: #f59e0b; }` placed at the end of the CSS.",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: "#msg",
                property: "color",
                expected: ["#f59e0b", "rgb(245, 158, 11)"],
                message: "Line 3 is amber.",
              },
              {
                type: "computedStyle",
                selector: ".two",
                property: "color",
                expected: ["#3b82f6", "rgb(59, 130, 246)"],
                message: "Line 2 is still the `.note` colour.",
              },
              {
                type: "computedStyle",
                selector: ".one",
                property: "color",
                expected: ["#ef4444", "rgb(239, 68, 68)"],
                message: "Line 1 is still the `p` colour.",
              },
            ],
            solution: `p {
      color: #ef4444;
    }
    
    .note {
      color: #3b82f6;
    }
    
    #msg {
      color: #22c55e;
    }
    
    p#msg.note {
      color: #f59e0b;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-winner",
          kind: "predict",
          title: "Predict the winning colour",
          summary: "Four rules compete for the colour of three paragraphs. Work out the winners by comparing the weights.",
          minutes: 7,
          mode: "css",
          intro: "Four rules set a colour, and each paragraph is matched by a different mix of them. Work out the weight of each selector, then run the code to see the result.",
          code: {
            html: `<p id="intro" class="note">First paragraph</p>
    <p class="note second">Second paragraph</p>
    <p class="plain">Third paragraph</p>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
      font-weight: 600;
    }
    
    p {
      color: #dc2626;
    }
    
    .note {
      color: #16a34a;
    }
    
    p.note {
      color: #ea580c;
    }
    
    #intro {
      color: #2563eb;
    }`,
          },
          questions: [
            {
              prompt: "What colour is the first paragraph, `<p id=\"intro\" class=\"note\">`?",
              options: ["Red, from `p`", "Green, from `.note`", "Orange, from `p.note`", "Blue, from `#intro`"],
              answerIndex: 3,
              hint: "Four rules match it. Compare their weights from the left column.",
              explanation: "`p` is `(0, 0, 1)`, `.note` is `(0, 1, 0)`, `p.note` is `(0, 1, 1)` and `#intro` is `(1, 0, 0)`. The ID column is compared first, so `#intro` wins.",
              proves: [
                {
                  type: "computedStyle",
                  selector: "#intro",
                  property: "color",
                  expected: ["#2563eb", "rgb(37, 99, 235)"],
                  message: "The ID rule wins the first paragraph.",
                },
              ],
            },
            {
              prompt: "What colour is the second paragraph, `<p class=\"note second\">`?",
              options: ["Red", "Green", "Orange", "Blue"],
              answerIndex: 2,
              hint: "Which two rules are both a class, and which of them also has an element name?",
              explanation: "Three rules match: `p` `(0,0,1)`, `.note` `(0,1,0)` and `p.note` `(0,1,1)`. The class column ties between the last two, and then `p.note` has an extra type, so it wins.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".second",
                  property: "color",
                  expected: ["#ea580c", "rgb(234, 88, 12)"],
                  message: "`p.note` wins the second paragraph.",
                },
              ],
            },
            {
              prompt: "What colour is the third paragraph, `<p class=\"plain\">`?",
              options: ["Red", "Green", "Orange", "Blue"],
              answerIndex: 0,
              hint: "Only one rule matches an element with no `note` class and no ID.",
              explanation: "Only `p` matches. A rule with no competition simply applies, whatever its weight.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".plain",
                  property: "color",
                  expected: ["#dc2626", "rgb(220, 38, 38)"],
                  message: "Only the `p` rule matches the third paragraph.",
                },
              ],
            },
            {
              prompt: "What is the specificity of `p.note`?",
              options: ["`(0, 0, 2)`", "`(0, 1, 1)`", "`(1, 0, 0)`", "`(0, 2, 0)`"],
              answerIndex: 1,
              hint: "One class, and one element name. Which columns do they go in?",
              explanation: "The class `.note` goes in the middle column and the element name `p` goes in the right column, so the weight is `(0, 1, 1)`.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-beat-the-base",
          kind: "lab",
          title: "Lab: make the urgent note win",
          mode: "css",
          summary: "A state class loses to a heavier base rule. Make it win with the right selector and order, not with !important.",
          minutes: 10,
          starter: {
            html: `<p class="note urgent">Server is down</p>
    <p class="note calm">Backup finished</p>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .urgent {
      color: #dc2626;
      font-weight: 700;
    }
    
    p.note {
      color: #64748b;
      font-weight: 400;
    }
    `,
          },
          challenge: {
            title: "Make `.urgent` win without `!important`",
            description: "The urgent note should be red and bold, but it is grey and normal weight. `.urgent` weighs `(0, 1, 0)`, while `p.note` weighs `(0, 1, 1)`. Fix it **without `!important`** and **without editing the `p.note` rule**: write a selector that is heavier than `p.note`, and place it after it. The calm note must stay as it is.",
            hints: [
              "Compare the two weights: `.urgent` loses on the right column. You need at least `(0, 1, 2)`, or more classes.",
              "Combine the type and both classes: one selector that names `p`, `note` and `urgent`. Place it below `p.note`.",
              "`p.note.urgent { color: #dc2626; font-weight: 700; }`, written after the `p.note` rule.",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".urgent",
                property: "color",
                expected: ["#dc2626", "rgb(220, 38, 38)"],
                message: "The urgent note is red",
              },
              {
                type: "computedStyle",
                selector: ".urgent",
                property: "font-weight",
                expected: ["700"],
                message: "...and bold (`700`).",
              },
              {
                type: "computedStyle",
                selector: ".calm",
                property: "color",
                expected: ["#64748b", "rgb(100, 116, 139)"],
                message: "The calm note keeps the grey colour",
              },
              {
                type: "computedStyle",
                selector: ".calm",
                property: "font-weight",
                expected: ["400"],
                message: "...and the normal weight.",
              },
            ],
            solution: {
              html: `<p class="note urgent">Server is down</p>
    <p class="note calm">Backup finished</p>`,
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    p.note {
      color: #64748b;
      font-weight: 400;
    }
    
    p.note.urgent {
      color: #dc2626;
      font-weight: 700;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "important-and-origins",
          kind: "learn",
          title: "`!important` and the three origins",
          summary: "Why `!important` outranks everything, why it reverses the order of the origins, and when it is the right tool.",
          minutes: 10,
          concept: {
            description: "Styles come from three **origins**: the browser's default stylesheet (user agent), the person's own settings (user), and your stylesheets (author). Normally author styles beat the others. Adding `!important` to a declaration moves it into a separate, **reversed** ranking, in which the user's and the browser's important declarations beat the author's.",
            why: "`!important` is both the most-used and most-misused tool in CSS. It solves an immediate conflict, but it cannot be undone except by another `!important` with higher specificity, so one use invites the next. Knowing exactly how it ranks, and why it exists, lets you reserve it for the few jobs it suits.",
            mentalModel: "Imagine three desks: the browser's, the person's and yours. Normally the stack of papers on your desk is read first. `!important` is a red stamp that sends a paper to a different, emergency inbox, where the order is reversed: the browser's emergency papers come first, then the person's, and yours come last of all.",
          },
          body: [
            {
              type: "heading",
              text: "The three origins",
            },
            {
              type: "list",
              items: [
                "**User agent:** the browser's built-in default styles. This is why a `<h1>` is big and bold, a `<ul>` has bullets, and links are blue and underlined, even with no CSS.",
                "**User:** styles set by the person using the browser, such as a minimum font size or high-contrast mode. Most people never set any.",
                "**Author:** your stylesheets and the `style` attributes in your HTML.",
              ],
            },
            {
              type: "paragraph",
              text: "For ordinary declarations, the ranking is simple: **author beats user, and user beats user agent**. This is why your `h1 { font-size: 2rem }` replaces the browser's default without needing any special weight.",
            },
            {
              type: "heading",
              text: "What `!important` does",
            },
            {
              type: "paragraph",
              text: "Putting `!important` at the end of a declaration, for example `color: red !important`, does two things. It makes the declaration win over any normal declaration, whatever its specificity, so `p { color: red !important }` beats `#promo { color: blue }`. And it moves the declaration to the **important** ranking, in which the origins are reversed: important user agent styles beat important user styles, which beat important author styles.",
            },
            {
              type: "code",
              language: "css",
              code: `p      { color: #334155 !important; }   /* (0,0,1) but important */
    #promo { color: #b91c1c; }              /* (1,0,0), normal */
    
    /* <p id="promo">: grey. The important declaration wins over the id. */`,
              caption: "`!important` ignores specificity when the other rule is not important",
            },
            {
              type: "paragraph",
              text: "The reversal is deliberate. It lets a person with accessibility needs insist on a setting, such as a large minimum font size, that no website can override by accident. It also stops you from overriding a safety style in the browser's own stylesheet.",
            },
            {
              type: "paragraph",
              text: "Between two important declarations of the same origin, the usual tie-breakers apply again: more specificity wins, and then the later rule. This is how an \"`!important` war\" starts, with each override needing one more.",
            },
            {
              type: "heading",
              text: "When `!important` is a fair choice",
            },
            {
              type: "list",
              items: [
                "**Utility classes** that must always win, such as `.hidden { display: none !important }`.",
                "**Overriding inline styles** that you cannot edit, for example from a third-party widget.",
                "**Overriding third-party CSS** that you cannot change, as a last resort and with a comment.",
                "**Accessibility overrides**, such as the reduced motion rule in the transitions topic.",
              ],
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `/* a utility that must win, documented and rare */
    .hidden { display: none !important; }`,
                note: "A single utility with a clear job, easy to find and understand.",
              },
              bad: {
                code: `.card .title { color: #4f46e5 !important; }
    .card .title.big { color: #4f46e5 !important; font-size: 2rem !important; }`,
                note: "Important declarations scattered across components, each one forcing the next. Nothing can be overridden without more `!important`.",
              },
            },
            {
              type: "callout",
              tone: "warning",
              text: "`!important` only wins the property it is written on. It does not make the whole rule important, and a declaration without it still loses to a more specific rule.",
            },
            {
              type: "callout",
              tone: "tip",
              text: "If you reach for `!important` to fix a normal conflict, stop and look at the cascade first. A change of selector, a change of order, or removing a competing rule is nearly always cleaner.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "There are three origins: user agent, user and author. For normal declarations, author beats user, which beats user agent.",
                "`!important` moves a declaration into a separate ranking in which the order of the origins is reversed.",
                "A normal declaration, whatever its specificity, loses to an important one. Two important declarations are settled by specificity and order.",
                "Keep `!important` for utilities and overrides you cannot avoid, and document each use.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "order-and-important",
          kind: "visualizer",
          title: "Order and !important",
          summary: "Two classes with equal weight. See that the rule order decides, not the class order, and what `!important` does to that.",
          minutes: 8,
          concept: {
            description: "Two paragraphs use the same two classes, `a` and `b`, in a different order in the HTML. Both classes have the same specificity, so the colour that shows depends on which **rule** comes later in the CSS. Controls switch `!important` on and off and recolour the rules, and a challenge asks you to turn both lines blue by changing the order.",
            why: "When specificity ties, source order decides, and it is easy to believe the order of the class names matters instead. Watching the two lines react identically, whatever order the HTML names appear in, removes that doubt. Adding `!important` then shows how it overrides order too.",
            mentalModel: "With equal weights, the browser reads the stylesheet from top to bottom and keeps the last matching declaration. The HTML only says which rules apply, never which one comes last. `!important` is a different ranking altogether: it wins first, and order only matters between two important declarations.",
          },
          stage: {
            html: `<p class="a b" id="first">class="a b"</p>
    <p class="b a" id="second">class="b a"</p>`,
            baseCss: `html, body { margin: 0; }
    body { padding: 20px 16px; background: #0f172a; font-family: system-ui, sans-serif; font-size: 18px; font-weight: 600; }
    p { margin: 0 0 10px; padding: 12px 14px; border-radius: 10px; background: #1e293b; }
    `,
            annotate: "none",
            target: "body",
            items: "p",
            itemCount: 2,
          },
          starter: `.a {
      color: #3b82f6;
    }
    
    .b {
      color: #f59e0b;
    }
    `,
          controls: [
            {
              id: "a",
              label: "`.a` rule (first in the file)",
              selector: ".a",
              property: "color",
              fallback: "#3b82f6",
              type: "options",
              options: ["#3b82f6", "#3b82f6 !important", "#22c55e", "#a855f7"],
              help: "Pick the `!important` version and `.a` wins, even though it comes first.",
            },
            {
              id: "b",
              label: "`.b` rule (second in the file)",
              selector: ".b",
              property: "color",
              fallback: "#f59e0b",
              type: "options",
              options: ["#f59e0b", "#f59e0b !important", "#ef4444"],
              help: "With equal weight, this later rule wins both lines.",
            },
          ],
          presets: [
            {
              id: "a-important",
              label: "`.a` important",
              description: "wins despite coming first",
              css: ".a { color: #3b82f6 !important; }",
            },
            {
              id: "both-important",
              label: "Both important",
              description: "now the later one wins again",
              css: `.a { color: #3b82f6 !important; }
    .b { color: #f59e0b !important; }`,
            },
          ],
          challenge: {
            title: "Reorder the rules",
            description: "Both lines are amber because `.b` comes after `.a`. Make **both** lines blue, `#3b82f6`, without using `!important` and without changing any colour: only change the **order** of the two rules.",
            hints: [
              "Equal weights are settled by the later rule, so `.a` has to come last.",
              "Cut the `.a` rule and paste it below `.b`.",
              "`.b { color: #f59e0b; }` first, and then `.a { color: #3b82f6; }`.",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: "#first",
                property: "color",
                expected: ["#3b82f6", "rgb(59, 130, 246)"],
                message: "The first line is blue.",
              },
              {
                type: "computedStyle",
                selector: "#second",
                property: "color",
                expected: ["#3b82f6", "rgb(59, 130, 246)"],
                message: "The second line is blue too.",
              },
            ],
            solution: `.b {
      color: #f59e0b;
    }
    
    .a {
      color: #3b82f6;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "inline-styles-and-ids",
          kind: "learn",
          title: "Inline styles and IDs: the heavy hitters",
          summary: "Why the `style` attribute and `#id` selectors are so hard to override, and what to use instead.",
          minutes: 9,
          concept: {
            description: "A declaration in an element's **`style` attribute** beats any selector, because the cascade ranks it above specificity. `#id` selectors sit in the first specificity column, so a single ID beats any number of classes. Both are therefore the hardest styles to override cleanly.",
            why: "Inline styles and IDs are usually not chosen on purpose. They arrive from a content editor, a script that sets `element.style`, a copied snippet or a framework, and later someone tries to restyle the element with a class and nothing happens. Knowing why lets you plan around them.",
            mentalModel: "A normal selector is a request put through the proper channels. An inline style is a note written directly on the element itself, and the cascade reads it before it reads any request from the stylesheet. An ID selector is a request with a VIP stamp, so ordinary requests can queue forever.",
          },
          body: [
            {
              type: "heading",
              text: "The `style` attribute",
            },
            {
              type: "paragraph",
              text: "When you write `<p style=\"color: red\">`, you attach the declaration straight to the element. In the cascade, element-attached styles rank above all selectors of the same importance, whatever their specificity. No selector, not even one with many IDs, can beat a normal inline declaration. Only `!important` in a stylesheet can override it.",
            },
            {
              type: "code",
              language: "css",
              code: `<p class="note" style="color: #b91c1c">Overdue</p>
    
    /* .note { color: #4f46e5 }        loses
       #page .note { color: #4f46e5 }  loses
       .note { color: #4f46e5 !important } wins */`,
              caption: "An inline style beats every normal selector",
            },
            {
              type: "paragraph",
              text: "This is why scripts that set `element.style.color = \"...\"` are hard to restyle afterwards. If you need a script to change how something looks, it is usually better to add or remove a **class** and let the stylesheet do the work. The styles then stay in one place, and the cascade can still be used.",
            },
            {
              type: "heading",
              text: "IDs in selectors",
            },
            {
              type: "paragraph",
              text: "An ID in a selector adds one to column a, and that column is compared before any other. `#sidebar a` is `(1, 0, 1)` and beats `.nav .link.active` at `(0, 3, 0)`. IDs are useful as link targets (`<a href=\"#contact\">`) and for JavaScript and form labels. For styling, they are a trap, because to override `#sidebar a` you need another ID or an `!important`.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.sidebar-link {
      color: #475569;
    }
    .sidebar-link.is-active {
      color: #4f46e5;
    }`,
                note: "Classes only. The active state has two classes, weighs `(0, 2, 0)`, and is easy to override or reorder.",
              },
              bad: {
                code: `#sidebar a {
      color: #475569;
    }
    .is-active {
      color: #4f46e5;   /* loses: (0,1,0) against (1,0,1) */
    }`,
                note: "The ID rule outranks the state class. The active link never changes colour, and the usual response is to add `!important`.",
              },
            },
            {
              type: "heading",
              text: "What to do instead",
            },
            {
              type: "list",
              items: [
                "**Style with classes.** Keep IDs for anchors, labels and scripts, and give the same element a class for its look.",
                "**Avoid inline styles for design.** They are acceptable for a value that is really data, such as a progress bar's width set by a script, or for a custom property.",
                "**Toggle classes in scripts.** Add `is-open` or `is-active` instead of writing `style.display`.",
                "**If you must override**, write a selector of equal or greater weight and place it later, which is cleaner than `!important`. If an old ID rule is in your way, the best fix is to replace it with a class.",
              ],
            },
            {
              type: "callout",
              tone: "note",
              text: "Attribute selectors that name an ID, such as `[id=\"sidebar\"]`, count as a class, not as an ID. That makes them a quiet way to target an element by ID without paying the ID's weight, but they are also a sign that a class would be clearer.",
            },
            {
              type: "callout",
              tone: "tip",
              text: "Search your project for `style=` and for `#` in stylesheets from time to time. Each one is a place where the cascade has less room to work.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "The `style` attribute outranks every normal selector. Only `!important` in a stylesheet can beat it.",
                "An ID selector adds to the first specificity column, so it beats any number of classes.",
                "Style with classes, keep IDs for anchors and scripts, and have scripts toggle classes instead of writing styles.",
                "Inline styles are best kept for real data, such as a width calculated by a script.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-override-ignored",
          kind: "debug",
          title: "Debug: my rule is ignored",
          mode: "css",
          summary: "`.heading` is correct and still does nothing. Find the rule that outranks it and fix the cause.",
          minutes: 8,
          broken: {
            html: `<aside class="panel" id="sidebar">
      <h3 class="heading">Filters</h3>
      <p class="hint">Narrow the trail list.</p>
    </aside>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .heading {
      color: #4f46e5;
      font-size: 1.5rem;
    }
    
    #sidebar h3 {
      color: #475569;
      font-size: 1rem;
    }
    `,
          },
          challenge: {
            title: "Make the heading large and indigo",
            description: "The heading should be indigo and `1.5rem`, as the `.heading` rule says. It is grey and small. The selector is right, the class is on the element, and the property names are spelt correctly. Find out why the rule loses, and fix the **cause**, without `!important`.",
            hints: [
              "Use the explain panel, then count the weights of the two rules that match the heading.",
              "`#sidebar h3` weighs `(1, 0, 1)`, and `.heading` weighs `(0, 1, 0)`. The ID column decides before anything else.",
              "Delete the `#sidebar h3` rule. The class rule is then the only one left.",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".heading",
                property: "color",
                expected: ["#4f46e5", "rgb(79, 70, 229)"],
                message: "The heading is indigo",
              },
              {
                type: "computedStyle",
                selector: ".heading",
                property: "font-size",
                expected: ["1.5rem", "24px"],
                message: "...and `1.5rem` tall.",
              },
            ],
            solution: {
              html: `<aside class="panel" id="sidebar">
      <h3 class="heading">Filters</h3>
      <p class="hint">Narrow the trail list.</p>
    </aside>`,
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .heading {
      color: #4f46e5;
      font-size: 1.5rem;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "inheritance-keywords",
          kind: "learn",
          title: "Inheritance and the reset keywords",
          summary: "Why inherited values lose to any rule, and what `inherit`, `initial`, `unset` and `revert` do.",
          minutes: 10,
          concept: {
            description: "Some properties, such as `color` and `font-family`, are **inherited**: if no rule sets them on an element, the element takes its parent's value. Others, such as `margin` and `border`, are **not inherited**. Four keywords let you take control: `inherit` copies the parent's value, `initial` uses the property's starting value, `unset` picks one of those two for you, and `revert` goes back to the browser's default.",
            why: "Inheritance is what lets you set a font on `body` once, and it is why a heading inside a card can suddenly look wrong when a rule higher up changes. It also interacts with the cascade in one surprising way: an inherited value is the weakest possible, weaker than a rule with no specificity at all.",
            mentalModel: "Inheritance is a family trait, and the cascade is a personal choice. A child has its parent's eye colour unless someone makes a choice for them. Any explicit rule, however weak, is a choice, and a choice always beats the family trait.",
          },
          body: [
            {
              type: "heading",
              text: "Which properties inherit",
            },
            {
              type: "paragraph",
              text: "Properties that describe **text and how it looks** are inherited by default: `color`, `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `text-align`, `visibility` and `cursor`. Properties that describe **the box** are not: `margin`, `padding`, `border`, `background`, `width`, `height`, `display` and `position`. This makes sense. You want body text to look consistent, but you do not want every child to repeat its parent's border.",
            },
            {
              type: "heading",
              text: "Inheritance is weaker than any rule",
            },
            {
              type: "paragraph",
              text: "When the browser finds the value of a property for an element, it asks the cascade first. Only if **no declaration at all** applies does it use the inherited value. This means that a rule with specificity zero still beats inheritance. A well-known result is that `* { color: red }` colours every element red, even elements that would otherwise have inherited a different colour from their parent.",
            },
            {
              type: "code",
              language: "css",
              code: `body { color: #0f172a; }
    
    /* The universal selector has no weight, but it matches every element directly,
       so every element has a declared value and nothing is inherited any more. */
    * { color: #4f46e5; }`,
              caption: "A weightless rule that matches the element beats an inherited value",
            },
            {
              type: "heading",
              text: "Four keywords",
            },
            {
              type: "list",
              items: [
                "`inherit`: take the parent's computed value, even for a property that normally does not inherit. `border: inherit` copies the parent's border.",
                "`initial`: use the property's own starting value from the CSS specification, such as `0` for `margin` or `transparent` for `background-color`. It ignores the browser's default stylesheet.",
                "`unset`: act as `inherit` for inherited properties and as `initial` for the rest. It is a sensible \"remove my style\" for any property.",
                "`revert`: undo the author's styles and go back to what the browser or the person's own settings say. `h1 { font-size: revert }` gives a heading the browser default again.",
                "`revert-layer`: like `revert`, but only goes back one cascade layer.",
              ],
            },
            {
              type: "code",
              language: "css",
              code: `.card a {
      color: inherit;             /* links look like the text around them */
      text-decoration: inherit;
    }
    
    .reset-me {
      all: unset;                 /* every property: unset */
    }`,
              caption: "`inherit` is a common way to make links blend in, and `all` applies a keyword to every property",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.btn-link {
      color: inherit;
      background: none;
    }`,
                note: "`inherit` makes the link take its colour from the surrounding text, and it is short and readable.",
              },
              bad: {
                code: `.btn-link {
      color: #0f172a;      /* hard-coded copy of the parent colour */
    }`,
                note: "A hard-coded copy goes out of date the moment the theme changes, and it adds a declaration that is heavier than inheritance.",
              },
            },
            {
              type: "callout",
              tone: "note",
              text: "`all` is a shorthand for every property except `direction` and `unicode-bidi`. It only accepts the global keywords: `all: unset`, `all: initial`, `all: inherit` or `all: revert`.",
            },
            {
              type: "callout",
              tone: "tip",
              text: "To find out why a property has its value, select the element in DevTools and look at the Computed panel. It shows the final value, and its Inherited section shows which parent it came from.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Text properties such as `color` and `font-family` are inherited. Box properties such as `margin` and `border` are not.",
                "An inherited value is used only when no declaration applies, so even a rule with no specificity beats it.",
                "`inherit`, `initial`, `unset` and `revert` give explicit control over a property.",
                "`all` with one of these keywords resets every property at once.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-order-and-important",
          kind: "predict",
          title: "Predict order and !important",
          summary: "The same kind of contest, but the heaviest rule is written first and one rule is important. Predict which ones survive.",
          minutes: 7,
          mode: "css",
          intro: "This time the heavy rule comes **first** in the file, and one declaration is marked `!important`. Predict the colours, then run the code.",
          code: {
            html: `<p id="msg" class="note">One</p>
    <p class="note flag">Two</p>
    <p class="note">Three</p>
    <p>Four</p>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
      font-weight: 600;
    }
    
    #msg {
      color: #2563eb;
    }
    
    .note {
      color: #16a34a;
    }
    
    p {
      color: #dc2626;
    }
    
    .flag {
      color: #7c3aed !important;
    }`,
          },
          questions: [
            {
              prompt: "What colour is paragraph One, `<p id=\"msg\" class=\"note\">`?",
              options: ["Blue, from `#msg`", "Green, from `.note`", "Red, because `p` comes later", "Purple"],
              answerIndex: 0,
              hint: "Does a rule being written first make it weaker?",
              explanation: "Source order is only the last tie-breaker. `#msg` is `(1, 0, 0)`, which beats `.note` and `p` however far below they are written.",
            },
            {
              prompt: "What colour is paragraph Two, `<p class=\"note flag\">`?",
              options: ["Green", "Red", "Purple", "Blue"],
              answerIndex: 2,
              hint: "Look at the end of the `.flag` declaration.",
              explanation: "`.flag` is `!important`, so it wins over the normal `.note` and `p` declarations, which are all competing for the same property.",
            },
            {
              prompt: "What colour is paragraph Three, `<p class=\"note\">`?",
              options: [
                "Red, because `p` is later in the file",
                "Green, because `.note` is heavier than `p`",
                "Blue",
                "Purple",
              ],
              answerIndex: 1,
              hint: "A class beats an element name before order is considered.",
              explanation: "`.note` is `(0, 1, 0)` and `p` is `(0, 0, 1)`. Specificity is compared first, so `.note` wins even though `p` comes later.",
            },
            {
              prompt: "What colour is paragraph Four, a plain `<p>`?",
              options: ["Red", "Green", "Blue", "Purple"],
              answerIndex: 0,
              hint: "Which rules match an element with no class and no ID?",
              explanation: "Only `p` matches, so its colour applies.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lowering-specificity-is-where",
          kind: "learn",
          title: "Keeping weight low with `:where()`, `:is()` and `:not()`",
          summary: "How the modern selector pseudo-classes change specificity, and when a zero-weight selector is exactly what you need.",
          minutes: 10,
          concept: {
            description: "`:where()` accepts a list of selectors, matches like `:is()`, and has **zero** specificity. That makes it ideal for defaults that any later rule can override, whatever the later rule's weight. `:is()` and `:not()` use the weight of their most specific argument, which can be a trap.",
            why: "Big stylesheets break down when defaults are too heavy. A reset or a base style that uses `.prose a` or `article p` is stronger than you meant, and every component then has to fight it. Zero-weight tools let a library or a base layer say \"this is only a suggestion\", which is exactly the relationship you want.",
            mentalModel: "`:where()` is writing in pencil: anyone can overwrite it without needing a stronger pen. `:is()` is writing in the colour of the strongest pen in the list, even when the pen that actually matched was a weak one.",
          },
          body: [
            {
              type: "heading",
              text: "`:where()`: zero by design",
            },
            {
              type: "paragraph",
              text: "`:where(a, b, c)` matches an element if it matches any of the selectors in the list, just like `:is()`. The difference is entirely about weight: the whole `:where()` contributes `(0, 0, 0)`, whatever is inside. Selectors **outside** the parentheses still count, so `:where(.prose) a` weighs the same as plain `a`, which is `(0, 0, 1)`.",
            },
            {
              type: "code",
              language: "css",
              code: `:where(.prose) :where(h2, h3, h4) {
      margin-block: 1.5em 0.5em;      /* (0,0,0): any rule beats it */
    }
    
    .prose-lead {
      margin-block-start: 0;           /* (0,1,0): wins easily */
    }`,
              caption: "A zero-weight default is easy to override",
            },
            {
              type: "paragraph",
              text: "This is a common pattern for design systems and resets: wrap the whole selector in `:where()`, so users of the library do not have to raise the specificity of every override. Many modern CSS resets use it.",
            },
            {
              type: "heading",
              text: "`:is()`: the weight of the strongest argument",
            },
            {
              type: "paragraph",
              text: "`:is()` is helpful for shortening a repeated selector. `:is(.card, .panel) .title` replaces two rules. But the whole thing takes the weight of the most specific argument, so `:is(.card, #hero) .title` weighs `(1, 1, 0)`, even for a `.card` element, because `#hero` is in the list.",
            },
            {
              type: "heading",
              text: "`:not()`: the weight of what you exclude",
            },
            {
              type: "paragraph",
              text: "`:not(.disabled)` weighs a class, and `:not(#locked)` weighs an ID. It is common to forget that an exclusion costs as much as an inclusion, so a rule like `a:not(.btn)` weighs `(0, 1, 1)`, which beats a simple `.link` at `(0, 1, 0)`.",
            },
            {
              type: "code",
              language: "css",
              code: `/* weights */
    :where(.nav, .footer) a      /* (0, 0, 1) */
    :is(.nav, .footer) a         /* (0, 1, 1) */
    a:not(.btn)                  /* (0, 1, 1) */
    a:not(:where(.btn))          /* (0, 0, 1)  the :where() inside :not() is zero */`,
              caption: "The same selectors, weighed",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `:where(button, [type="submit"]) {
      font: inherit;
    }`,
                note: "A zero-weight default. Every component rule overrides it without a fight.",
              },
              bad: {
                code: `button, [type="submit"] {
      font: inherit;
    }
    .btn { font: 0.875rem/1.25 system-ui; }`,
                note: "The first rule weighs `(0, 1, 0)` for the attribute selector, which ties with `.btn`. A later reorder could silently flip the result.",
              },
            },
            {
              type: "callout",
              tone: "note",
              text: "Support for `:is()` and `:where()` is good in all current browsers, and the next topics in this course cover them. In an unusual browser, a selector list containing an unsupported selector is ignored whole, which is the old behaviour of a comma list.",
            },
            {
              type: "callout",
              tone: "warning",
              text: "Zero weight does not mean \"always loses\". A `:where()` rule still beats inheritance, and it still wins over a rule that is earlier and also has zero weight. It only means that any real selector beats it.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "`:where()` always counts as `(0, 0, 0)`, so it is perfect for defaults that must stay easy to override.",
                "`:is()` and `:not()` take the weight of the most specific selector in their list, not the one that matched.",
                "Selectors outside the parentheses still count.",
                "Use zero-weight selectors in resets and design systems, and watch for hidden IDs inside `:is()` and `:not()`.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-flatten-the-menu",
          kind: "lab",
          title: "Lab: flatten a heavy selector",
          mode: "css",
          summary: "A deep selector beats the active state. Replace it with a single class so the state can win through source order.",
          minutes: 10,
          starter: {
            html: `<nav class="menu">
      <ul>
        <li><a class="menu-link" href="#">Home</a></li>
        <li><a class="menu-link link-active" href="#">Routes</a></li>
        <li><a class="menu-link" href="#">Gear</a></li>
      </ul>
    </nav>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .menu ul {
      display: flex;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    
    .link-active {
      color: #4f46e5;
      font-weight: 700;
    }
    
    .menu ul li a {
      display: block;
      padding: 0.4rem 0.8rem;
      border-radius: 0.5rem;
      color: #334155;
      font-weight: 500;
      text-decoration-line: none;
    }
    `,
          },
          challenge: {
            title: "Make the active link stand out",
            description: "The active link should be bold and indigo, but `.menu ul li a` weighs `(0, 1, 3)`, which beats `.link-active` at `(0, 1, 0)`. Do not make the state heavier. Instead **flatten** the base rule: replace `.menu ul li a` with the single class `.menu-link` (each link already has it), and put it **before** `.link-active`, so that equal weights are settled by order. Keep the same declarations.",
            hints: [
              "Rename the selector, and then move the whole rule above `.link-active`.",
              "A single class has weight `(0, 1, 0)`, exactly the same as `.link-active`, so the later rule wins.",
              "`.menu-link { display: block; padding: 0.4rem 0.8rem; ... }` first, then `.link-active { ... }`.",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".link-active",
                property: "color",
                expected: ["#4f46e5", "rgb(79, 70, 229)"],
                message: "The active link is indigo",
              },
              {
                type: "computedStyle",
                selector: ".link-active",
                property: "font-weight",
                expected: ["700"],
                message: "...and bold.",
              },
              {
                type: "computedStyle",
                selector: ".menu-link",
                property: "color",
                expected: ["#334155", "rgb(51, 65, 85)"],
                message: "The other links keep the slate colour",
              },
              {
                type: "computedStyle",
                selector: ".menu-link",
                property: "padding-left",
                expected: ["0.8rem", "12.8px"],
                message: "...and the padding.",
              },
            ],
            solution: {
              html: `<nav class="menu">
      <ul>
        <li><a class="menu-link" href="#">Home</a></li>
        <li><a class="menu-link link-active" href="#">Routes</a></li>
        <li><a class="menu-link" href="#">Gear</a></li>
      </ul>
    </nav>`,
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .menu ul {
      display: flex;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    
    .menu-link {
      display: block;
      padding: 0.4rem 0.8rem;
      border-radius: 0.5rem;
      color: #334155;
      font-weight: 500;
      text-decoration-line: none;
    }
    
    .link-active {
      color: #4f46e5;
      font-weight: 700;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "maintainable-css",
          kind: "learn",
          title: "Writing CSS that stays easy to override",
          summary: "Habits that keep specificity flat: classes only, shallow selectors, meaningful order and a place for exceptions.",
          minutes: 10,
          concept: {
            description: "CSS that stays easy to override has one property: most selectors have the **same low weight**, a single class. When everything is `(0, 1, 0)`, source order decides, and source order is easy to see and to change. Deep selectors, IDs and `!important` are the main ways that this breaks.",
            why: "Specificity problems rarely appear in a small project. They appear six months later, when a new component needs to override an old one and cannot. The habits that avoid this cost nothing when you start, and they are very expensive to add later.",
            mentalModel: "A flat stylesheet is a road with one speed limit. Everyone knows the rule, and who goes first depends only on who arrived first. A stylesheet with IDs and `!important` is a road with every kind of priority vehicle: it works until two of them meet in a junction.",
          },
          body: [
            {
              type: "heading",
              text: "Habit 1: one class, one job",
            },
            {
              type: "paragraph",
              text: "Give each part of a component its own class, and style that class directly. Write `.card-title`, not `.card h2` or `div.card > header > h2.title`. A single class is `(0, 1, 0)`, so it can be overridden by any other single class that comes later. It also keeps the CSS independent of the HTML structure, so moving an element does not break its style.",
            },
            {
              type: "code",
              language: "css",
              code: `.card        { padding: 1rem; }
    .card-title  { font-size: 1.25rem; }
    .card-text   { color: #475569; }
    .card--featured { border-color: #4f46e5; }`,
              caption: "A flat component with a naming convention (here, BEM style)",
            },
            {
              type: "heading",
              text: "Habit 2: shallow selectors",
            },
            {
              type: "paragraph",
              text: "Every extra level in a selector adds weight, and ties the style to a particular nesting. Two levels at most is a good rule of thumb: `.nav-link`, or `.nav .link` if you must. Avoid qualifying a class with its element (`div.card`), because it only adds a `(0, 0, 1)` that you will later have to beat.",
            },
            {
              type: "heading",
              text: "Habit 3: order with purpose",
            },
            {
              type: "paragraph",
              text: "Order the stylesheet from generic to specific: element defaults, then components, then variants and states, then utilities. Equal weights then resolve the right way without any extra work. If a variant must override its base, place it after the base.",
            },
            {
              type: "heading",
              text: "Habit 4: keep IDs and inline styles out of the design",
            },
            {
              type: "paragraph",
              text: "Use IDs for anchors, `for` and `aria` references, and scripts. Keep design in classes. For things that a script must change visually, toggle classes. The previous lesson explains why.",
            },
            {
              type: "heading",
              text: "Habit 5: give exceptions a home",
            },
            {
              type: "paragraph",
              text: "Sooner or later, you will need an override that really must win. Put it in one place, such as a clearly named utilities section, and use `!important` there only if you must. Cascade layers, covered in a later topic, give this a proper structure.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.btn { background-color: #4f46e5; }
    .btn-danger { background-color: #dc2626; }
    .btn-large { padding: 0.75rem 1.5rem; }`,
                note: "Everything is `(0, 1, 0)`, and the variants simply follow the base.",
              },
              bad: {
                code: `div#app .container .btn.primary { background-color: #4f46e5; }
    .btn-danger { background-color: #dc2626 !important; }`,
                note: "A heavy selector and an `!important` for the exception. The next change needs a heavier selector still.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "A quick audit: search your stylesheet for `#` and `!important`, and look at the longest selectors. Each hit is worth a second look, and most can be turned into a single class.",
            },
            {
              type: "callout",
              tone: "note",
              text: "Utility-first CSS, such as Tailwind in the last track of this course, takes this to an extreme: every rule is one class, and the order of the stylesheet is fixed by the tool.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Aim for one low weight everywhere: a single class per job, shallow selectors, and no IDs for styling.",
                "Order the stylesheet from base to components to variants to utilities, and let equal weights follow source order.",
                "Keep inline styles and `!important` rare, and keep them in one clear place.",
                "These habits cost nothing at the start and are very expensive to add later.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "tracing-the-cascade",
          kind: "learn",
          title: "Tracing the cascade in DevTools",
          summary: "A method for finding out why a style does not apply, using the Styles and Computed panels.",
          minutes: 9,
          concept: {
            description: "Browser DevTools show the cascade directly. The **Styles** panel lists every matching rule for the selected element, from strongest to weakest, with the losing declarations struck through. The **Computed** panel shows the final value of each property and, when you click the arrow, which rule it came from.",
            why: "Guessing at a conflict wastes time. The tools already know which rule won, and a two-minute trace usually reveals the cause: a specificity mismatch, a later rule, a typo that makes the declaration invalid, or a rule that never matched. A fixed routine makes debugging calm and quick.",
            mentalModel: "Tracing the cascade is reading the scoreboard instead of replaying the match in your head. The panel already shows who played, who won, and who was struck out, and your job is only to ask the right question: why is this rule above mine?",
          },
          body: [
            {
              type: "heading",
              text: "A five-step routine",
            },
            {
              type: "list",
              items: [
                "**Select the element.** Right-click it and choose Inspect, or select it in the Elements panel.",
                "**Find your declaration in the Styles panel.** If it is missing, your rule does not match the element: check the selector, the class name and any typos.",
                "**Is it crossed out?** A line through it means a stronger rule won. Look further up the panel for the declaration of the same property without the line.",
                "**Is there a warning icon or a grey colour?** A yellow warning means the value is invalid or the property does not apply (for example `width` on an inline element). The browser dropped the declaration.",
                "**Compare the two selectors.** Count the specificity of the winner and your rule, check the order and check for `!important`, using the steps from this topic.",
              ],
              ordered: true,
            },
            {
              type: "code",
              language: "css",
              code: `/* Styles panel, top = strongest */
    #sidebar a            { color: #475569; }        /* winner */
    .link-active          { color: #4f46e5; }        /* struck through: lost */
    a                     { color: #2563eb; }        /* struck through */
    user agent stylesheet   a:-webkit-any-link { ... } `,
              caption: "What the Styles panel might show",
            },
            {
              type: "heading",
              text: "The Computed panel",
            },
            {
              type: "paragraph",
              text: "The **Computed** panel lists the final value of every property for the element. Expanding a property (the small arrow) shows the rules that set it, with the winner on top. It is the quickest way to answer \"where does this padding come from?\", and it also reveals values that come from inheritance rather than from a rule.",
            },
            {
              type: "heading",
              text: "Experiment safely",
            },
            {
              type: "paragraph",
              text: "Click a checkbox next to a declaration to switch it off, or edit its value, and watch the page update. Use the `:hov` button to force `:hover`, `:focus` or `:active` on an element so that you can inspect those states. All the changes are temporary and disappear when the page reloads, so copy anything that works back to your real stylesheet.",
            },
            {
              type: "heading",
              text: "Typical findings",
            },
            {
              type: "list",
              items: [
                "**A rule not shown at all:** the selector does not match, or the stylesheet did not load.",
                "**Struck through, with a stronger selector above:** a specificity problem.",
                "**Struck through, with an identical weight above:** a source order problem.",
                "**Not struck through, but still not applied:** an invalid value, or a property that does not apply to this kind of element.",
                "**A value you did not write:** inheritance, or the browser's default stylesheet.",
              ],
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `/* Found with DevTools: the ID rule beats the class. Fix the cause. */
    .sidebar-link { color: #475569; }
    .sidebar-link.is-active { color: #4f46e5; }`,
                note: "The fix removes the ID rule and uses two classes, so the override is clean.",
              },
              bad: {
                code: `/* "Fixed" by guessing */
    .is-active { color: #4f46e5 !important; }`,
                note: "The symptom is hidden, but the ID rule is still in the way. The next override will need another `!important`.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "Some browsers' DevTools show a selector's specificity when you hover it in the Styles panel. If yours does not, a specificity calculator on the web is a good second opinion.",
            },
            {
              type: "callout",
              tone: "note",
              text: "The Rules view only shows rules that match the element at that moment. A rule that depends on a state, such as `:hover`, or on a media query that is not currently true, will not be listed until the condition is met.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Select the element, find your declaration, and see whether it is missing, struck through, or flagged as invalid.",
                "Struck through with a stronger selector means specificity. Struck through with an equal one means source order.",
                "The Computed panel shows the final value and the rule that provided it.",
                "Toggle declarations and force states in DevTools, and copy the winning change back to your stylesheet.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-last-rule-wins",
          kind: "debug",
          title: "Debug: the disabled button that looks enabled",
          mode: "css",
          summary: "Two classes with the same weight, and the wrong one wins. Fix the order, not the selectors.",
          minutes: 6,
          broken: {
            html: "<button class=\"btn btn-primary btn-disabled\" type=\"button\" disabled>Save route</button>",
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .btn {
      padding: 0.6rem 1.2rem;
      border: 0;
      border-radius: 0.5rem;
      font-weight: 600;
    }
    
    .btn-disabled {
      background-color: #cbd5e1;
      color: #64748b;
      cursor: not-allowed;
    }
    
    .btn-primary {
      background-color: #4f46e5;
      color: #ffffff;
    }
    `,
          },
          challenge: {
            title: "Make the disabled style win",
            description: "The button has the classes `btn-primary` and `btn-disabled`. It is disabled, but it still looks like a normal indigo button, although the not-allowed cursor works. Both rules weigh `(0, 1, 0)`. Make the button grey, `#cbd5e1` with `#64748b` text, by changing the order only: no `!important`, and no new selectors.",
            hints: [
              "The cursor is applied because only `.btn-disabled` sets it. The colours lose because `.btn-primary` is lower in the file.",
              "With equal weight, the later rule wins. Move the rule that should win to the bottom.",
              "Put `.btn-primary` above `.btn-disabled`.",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".btn-disabled",
                property: "background-color",
                expected: ["#cbd5e1", "rgb(203, 213, 225)"],
                message: "The disabled button is grey",
              },
              {
                type: "computedStyle",
                selector: ".btn-disabled",
                property: "color",
                expected: ["#64748b", "rgb(100, 116, 139)"],
                message: "...with slate text.",
              },
            ],
            solution: {
              html: "<button class=\"btn btn-primary btn-disabled\" type=\"button\" disabled>Save route</button>",
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .btn {
      padding: 0.6rem 1.2rem;
      border: 0;
      border-radius: 0.5rem;
      font-weight: 600;
    }
    
    .btn-primary {
      background-color: #4f46e5;
      color: #ffffff;
    }
    
    .btn-disabled {
      background-color: #cbd5e1;
      color: #64748b;
      cursor: not-allowed;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "cascade-pitfalls",
          kind: "learn",
          title: "Cascade pitfalls and how to fix them",
          summary: "Frequent traps: stray IDs, `:not()` weight, order across files, nesting, attribute selectors and third-party CSS.",
          minutes: 10,
          concept: {
            description: "Most cascade trouble comes from a small set of recurring situations. Each one has a clear cause in the cascade rules, and a clean fix that does not need `!important`. Recognising them saves most of the debugging time.",
            why: "These are the patterns that you will meet again and again in real projects, in your own code, in a teammate's and in third-party libraries. A list of known traps, each with its fix, is a practical way to turn the abstract rules of the cascade into habits.",
            mentalModel: "Think of this lesson as a field guide. For each creature there is a name, a description, how to tell it is the cause, and how to deal with it. After a few sightings you recognise them from the footprints.",
          },
          body: [
            {
              type: "heading",
              text: "The usual suspects",
            },
            {
              type: "paragraph",
              text: "**1. A stray ID.** A rule such as `#main p { color: ... }` quietly beats every class. Fix: replace the ID with a class or remove the rule. If you cannot edit it, match the weight with a selector that has an ID too, as a last resort.",
            },
            {
              type: "paragraph",
              text: "**2. The loser is earlier.** Two rules of equal weight, where the one you want comes first. Fix: reorder so that the one you want is later. This is the safest and cheapest fix, and you should check it before anything else.",
            },
            {
              type: "paragraph",
              text: "**3. An exclusion with weight.** `a:not(.btn)` weighs the same as `a.link` and beats `.link`. Fix: wrap the exclusion in `:where()` when you want it free: `a:not(:where(.btn))`.",
            },
            {
              type: "paragraph",
              text: "**4. Library CSS that loads after yours.** Its rules win ties. Fix: link your stylesheet last, or load the library into a lower cascade layer.",
            },
            {
              type: "paragraph",
              text: "**5. A typo that drops the declaration.** `colour: red` or `margin: 1rem 2` is invalid, so the browser ignores it, and a lower rule wins. Fix: look for a warning in DevTools.",
            },
            {
              type: "paragraph",
              text: "**6. An inline style from a script.** Changing `element.style` beats every selector. Fix: toggle a class instead, or override with `!important` if you cannot change the script.",
            },
            {
              type: "heading",
              text: "Specificity of attribute selectors and `:root`",
            },
            {
              type: "paragraph",
              text: "An attribute selector is a class for weight, so `[type=\"text\"]` is `(0, 1, 0)` and ties with `.input`. The pseudo-class `:root` also counts as a class, so `:root` is `(0, 1, 0)`, while `html` is only `(0, 0, 1)`. This matters for custom properties: a variable defined on `:root` is heavier than one defined on `html`.",
            },
            {
              type: "code",
              language: "css",
              code: `[type="text"]   /* (0, 1, 0), same as a class */
    :root           /* (0, 1, 0) */
    html            /* (0, 0, 1) */
    html:root       /* (0, 1, 1) */`,
              caption: "Weights that surprise people",
            },
            {
              type: "heading",
              text: "Nested CSS",
            },
            {
              type: "paragraph",
              text: "Modern CSS allows nesting, where `&` stands for the parent selector. The nested rule `.card { & .title { ... } }` is treated like `.card .title`, which is `(0, 2, 0)`. When the parent is a **list**, `&` behaves like `:is()` and takes the weight of the most specific selector in the list. Nesting makes it easy to build deep selectors without noticing, so keep nesting shallow, one or two levels.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `/* flat, and equal in weight */
    .card { padding: 1rem; }
    .card-title { font-size: 1.25rem; }`,
                note: "Each rule is one class, so the cascade resolves on source order.",
              },
              bad: {
                code: `/* nesting without noticing: (0, 3, 0) */
    .card {
      & .body {
        & .title { font-size: 1.25rem; }
      }
    }`,
                note: "Three levels deep is `(0, 3, 0)`. Every override of `.title` now needs the same depth.",
              },
            },
            {
              type: "callout",
              tone: "warning",
              text: "`@import` rules are read at the point they appear, and they must come first in a stylesheet. An imported file's rules are earlier than the rest of the file, so they lose every tie. People are often surprised that the file they imported loses to a rule written below the `@import`.",
            },
            {
              type: "callout",
              tone: "tip",
              text: "If you find yourself raising specificity again and again, the root cause is almost always a too-heavy rule somewhere earlier. Fixing that one rule often removes many workarounds.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Stray IDs, earlier equal rules, weighty `:not()` and late library CSS are the commonest causes of a lost override.",
                "Invalid declarations are silently dropped, so look for warnings in DevTools.",
                "Attribute selectors and `:root` count as a class, and nesting multiplies weight quietly.",
                "Fix the cause (a class, an order, a layer) before reaching for `!important`.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    untangleAStylesheet,

    /* ------------------------------------------------------------------ */
    {
          id: "cascade-quiz",
          kind: "quiz",
          title: "Quiz: cascade and specificity",
          summary: "Seventeen questions on weights, order, !important, inheritance and debugging.",
          minutes: 12,
          passPercent: 70,
          questions: [
            {
              prompt: "What is the cascade?",
              options: [
                "A way to nest rules inside rules",
                "The procedure that chooses one declaration when several match the same property of an element",
                "A kind of animation",
                "The order in which elements are painted",
              ],
              answerIndex: 1,
              explanation: "The cascade is the fixed procedure of tie-breakers that picks the winning declaration for each property of each element.",
            },
            {
              prompt: "What are the three columns of specificity, from left to right?",
              options: [
                "Types, classes, IDs",
                "Classes, IDs, types",
                "Inline, IDs, classes",
                "IDs, classes (and attributes, pseudo-classes), types (and pseudo-elements)",
              ],
              answerIndex: 3,
              explanation: "The first column counts IDs, the second counts classes, attribute selectors and pseudo-classes, and the third counts element names and pseudo-elements.",
            },
            {
              prompt: "What is the specificity of `nav a.active:hover`?",
              options: ["`(0, 2, 2)`", "`(0, 1, 2)`", "`(0, 2, 1)`", "`(1, 0, 2)`"],
              answerIndex: 0,
              explanation: "`.active` and `:hover` are two class-like selectors, and `nav` and `a` are two types, so the weight is `(0, 2, 2)`.",
            },
            {
              prompt: "Which selector is the strongest?",
              options: ["`.a.b.c.d.e`", "`div div div div`", "`#x`", "`p.note`"],
              answerIndex: 2,
              explanation: "An ID is in the first column, so one ID beats any number of classes or types.",
            },
            {
              prompt: "Two rules have equal origin, importance and specificity. Which one wins?",
              options: [
                "The one with the longer selector",
                "Neither: the browser picks at random",
                "The one that comes first",
                "The one that comes later in the stylesheet",
              ],
              answerIndex: 3,
              explanation: "Order of appearance is the last tie-breaker. The later declaration wins.",
            },
            {
              prompt: "`<p class=\"b a\">`, with `.a { color: blue }` first and `.b { color: orange }` second in the CSS. What colour is it?",
              code: {
                language: "css",
                code: `.a { color: blue; }
    .b { color: orange; }`,
              },
              options: [
                "Blue, because `a` is the last class name",
                "Orange, because `.b` is the later rule",
                "Blue, because `a` is the first rule",
                "It is invalid",
              ],
              answerIndex: 1,
              explanation: "The order of the class names in the HTML does not matter. The rules have equal weight, so the later **rule** wins.",
            },
            {
              prompt: "What does `*` add to a selector's specificity?",
              options: ["Nothing, it is `(0, 0, 0)`", "`(0, 1, 0)`", "`(0, 0, 1)`", "`(1, 0, 0)`"],
              answerIndex: 0,
              explanation: "The universal selector and combinators add no weight at all.",
            },
            {
              prompt: "What is the specificity of `:where(.nav, #top) a`?",
              options: ["`(1, 0, 1)`", "`(0, 1, 1)`", "`(0, 0, 1)`", "`(1, 1, 1)`"],
              answerIndex: 2,
              explanation: "`:where()` is always zero, so only the `a` outside it counts.",
            },
            {
              prompt: "What is the specificity of `:is(.nav, #top) a`?",
              options: ["`(0, 1, 1)`", "`(1, 0, 1)`", "`(0, 0, 1)`", "`(1, 1, 1)`"],
              answerIndex: 1,
              explanation: "`:is()` takes the weight of its most specific argument, here `#top`, even if the element matched `.nav`.",
            },
            {
              prompt: "Where does an inline `style=\"color: red\"` rank among normal declarations?",
              options: [
                "Below every selector",
                "It depends on source order",
                "The same as an ID",
                "Above every selector, whatever its specificity",
              ],
              answerIndex: 3,
              explanation: "Element-attached styles beat all selector rules of the same importance. Only `!important` in a stylesheet can override them.",
            },
            {
              prompt: "What does `!important` do?",
              options: [
                "Moves that declaration into a separate ranking where it beats normal declarations",
                "Makes the whole rule block heavier",
                "Makes a rule apply to child elements",
                "Disables the cascade",
              ],
              answerIndex: 0,
              explanation: "`!important` applies to the single declaration, and it wins over any normal declaration, whatever their specificity.",
            },
            {
              prompt: "Why is `* { color: red }` stronger than an inherited colour?",
              options: [
                "`*` has a high specificity",
                "`*` is important",
                "An inherited value is only used when no declaration applies at all",
                "Colours do not inherit",
              ],
              answerIndex: 2,
              explanation: "Inheritance is the weakest source of all. As soon as a rule sets the property on the element, even one of weight zero, the inherited value is no longer used.",
            },
            {
              prompt: "Which property is inherited by default?",
              options: ["`margin`", "`color`", "`border`", "`background-color`"],
              answerIndex: 1,
              explanation: "Text properties such as `color`, `font-family` and `line-height` are inherited. Box properties are not.",
            },
            {
              prompt: "What does `color: inherit` do?",
              options: ["Resets the colour to black", "Removes the declaration", "Uses the browser's default colour", "Takes the parent's computed value"],
              answerIndex: 3,
              explanation: "`inherit` copies the parent's computed value, even for a property that does not normally inherit.",
            },
            {
              prompt: "Which is the best way to make `.btn-danger` override `.btn` when both are `(0, 1, 0)`?",
              options: [
                "Put `.btn-danger` after `.btn` in the stylesheet",
                "Add `!important` to `.btn-danger`",
                "Add an ID to the button",
                "Use `*`",
              ],
              answerIndex: 0,
              explanation: "With equal weights, source order decides. Putting the variant later is the cleanest solution.",
            },
            {
              prompt: "A rule shows struck through in DevTools, with a more specific selector above it. What does that mean?",
              options: ["The rule is invalid", "The rule is later in the file", "A stronger rule won on specificity", "The rule matched nothing"],
              answerIndex: 2,
              explanation: "A line through a declaration means it lost the cascade. A stronger selector above it is the winner, so the cause is specificity.",
            },
            {
              prompt: "Which is easiest to override later?",
              options: ["`#app .card .title`", "`.card-title`", "`div.card h2.title`", "`.card .title !important`"],
              answerIndex: 1,
              explanation: "A single class has the lowest practical weight, so any later single class can override it, and the rules stay in a simple, predictable order.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "cascade-review",
          kind: "review",
          title: "Review: cascade and specificity cheat sheet",
          summary: "The tie-breaker order, how to count specificity, `!important`, inheritance keywords and a debugging routine.",
          minutes: 4,
          body: [
            {
              type: "heading",
              text: "The tie-breakers, in order",
            },
            {
              type: "list",
              items: [
                "Relevance: the selector matches and any `@media` is true.",
                "Origin and importance: user agent, user, author. `!important` reverses the ranking.",
                "Inline `style` attribute.",
                "Cascade layers (a later topic).",
                "Specificity.",
                "Order of appearance: the later rule wins.",
              ],
              ordered: true,
            },
            {
              type: "heading",
              text: "Specificity: (IDs, classes, types)",
            },
            {
              type: "code",
              language: "css",
              code: `#id                      /* (1, 0, 0) */
    .class  [attr]  :hover    /* (0, 1, 0) each */
    p  ::before               /* (0, 0, 1) each */
    *  >  +  ~  (space)       /* (0, 0, 0) */
    :where(...)               /* (0, 0, 0) always */
    :is(...)  :not(...)  :has(...)   /* the most specific argument */`,
            },
            {
              type: "code",
              language: "css",
              code: `nav ul li a             /* (0, 0, 4) */
    .menu a.active          /* (0, 2, 1) */
    #main .card:hover h2    /* (1, 2, 1) */
    a:not(.btn)             /* (0, 1, 1) */
    /* compare from the left: one id beats any number of classes */`,
              caption: "A few worked examples",
            },
            {
              type: "heading",
              text: "Inheritance and the keywords",
            },
            {
              type: "code",
              language: "css",
              code: `color: inherit;     /* take the parent's computed value */
    margin: initial;    /* the specification's starting value */
    color: unset;       /* inherit if the property inherits, else initial */
    font-size: revert;  /* back to the browser (or user) default */
    all: unset;         /* apply a keyword to every property */`,
            },
            {
              type: "list",
              items: [
                "**Inherited:** `color`, `font-*`, `line-height`, `text-align`, `visibility`, `cursor`.",
                "**Not inherited:** `margin`, `padding`, `border`, `background`, `width`, `display`, `position`.",
                "An inherited value is weaker than any rule that sets the property, even `*`.",
              ],
            },
            {
              type: "heading",
              text: "A debugging routine",
            },
            {
              type: "list",
              items: [
                "Select the element and find your declaration in the Styles panel.",
                "Missing: the selector does not match. Struck through: a rule won. Warning icon: the value is invalid.",
                "Struck through with a heavier selector above: specificity. With an equal one: source order.",
                "Fix the cause with a flatter selector, a better order or a layer, and keep `!important` for utilities.",
              ],
            },
            {
              type: "heading",
              text: "Remember",
            },
            {
              type: "list",
              items: [
                "Only one declaration wins per property per element, and it is decided by the first tie-breaker that separates them.",
                "Columns never carry over: one ID beats a hundred classes.",
                "The order of class names in the HTML never matters. The order of the rules does.",
                "Style with single classes, keep IDs for anchors and scripts, and let source order do the work.",
              ],
            },
            {
              type: "callout",
              tone: "tip",
              text: "When a rule seems ignored: is it matching, is it valid, which rule won, and is the winner heavier or just later?",
            },
          ],
        },
  ],
};

export default content;
