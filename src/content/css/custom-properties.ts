import type { TopicContent } from "@/engine/types";
import themeATrailCardSet from "./custom-properties/workshops/theme-a-trail-card-set/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
          id: "what-are-custom-properties",
          kind: "learn",
          title: "What custom properties are",
          summary: "Name a value once, use it everywhere, and change it in one place.",
          minutes: 8,
          concept: {
            description: "A **custom property** is a name you invent for a value. You write it with two dashes at the front, give it a value, and then use it anywhere with `var()`. Many people call them CSS variables, and they work much like variables in any language.",
            why: "Think about a stylesheet with your brand colour written in forty places. When the brand changes, you have forty edits to make, and you will miss one. With a custom property you write the colour once, use its name forty times, and the next change is a single line.",
            mentalModel: "Picture a paint shop that mixes your brand colour and puts it in a tin with a label on it. Every wall gets painted from that tin. If you change the colour in the tin, every wall changes with it.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's try it. Open the Playground with the example below, and look at the first rule. It defines the property on `:root`, which is the top of the page, so every element can reach it.",
            },
            {
              type: "code",
              language: "css",
              code: `:root {
      --brand: #4f46e5;
    }
    
    .btn {
      background: var(--brand);
      color: white;
    }
    
    .link {
      color: var(--brand);
    }`,
              html: `<button class="btn">Save</button>
    <a class="link" href="#">Read more</a>`,
            },
            {
              type: "paragraph",
              text: "The first line gives the name `--brand` the value `#4f46e5`. The two dashes are what tell the browser this is your own property rather than a built-in one like `color`. Then `var(--brand)` asks for the value, so the button and the link both come out indigo. Change the hex code in the first rule, and watch both of them change together.",
            },
            {
              type: "paragraph",
              text: "You can name a custom property almost anything, as long as it starts with two dashes. Names are case-sensitive, so `--Brand` and `--brand` are two different properties, which is a classic source of confusing bugs. Most people use lowercase words joined with hyphens, such as `--brand-dark` or `--space-4`.",
            },
            {
              type: "paragraph",
              text: "Custom properties are not the same as the variables in a tool like Sass. Those are replaced before the page ever reaches the browser, so they can never change. These live in the browser while the page is running, so the value can be different in different places, can change inside a media query, and can even be changed by a script. That is what makes them much more powerful, and the rest of this topic is about using that.",
            },
            {
              type: "paragraph",
              text: "You might wonder why the example uses `:root` rather than `body`. `:root` is the very top element of the page, the same one as `html`, so every other element is inside it and can reach what you declare there. Any element can hold a custom property, and `body` would work in most cases, but `:root` is the convention, and it makes the global values easy to find when you open a stylesheet.",
            },
            {
              type: "paragraph",
              text: "For now, the habit to build is simple. Whenever you notice the same colour, size or shadow appearing twice in your CSS, stop and ask whether it deserves a name. If the answer is yes, put it on `:root`, give it a clear name, and use `var()` wherever it appears.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "declaring-and-using",
          kind: "learn",
          title: "Declaring and using them",
          summary: "Where to write a custom property, what it can hold, and where var() works.",
          minutes: 8,
          concept: {
            description: "You can declare a custom property in any rule, with any selector. Declaring it on `:root` makes it available to the whole page, and you read it with `var(--name)` inside the value of almost any other property.",
            why: "Once you know what a custom property can hold, you stop thinking of it as just a colour variable. It can store a shadow, a font stack, a length, a number, or half a value. That flexibility is what lets one name drive many different rules.",
            mentalModel: "A custom property is a sticky note with a name on it. The note can hold anything you write, and CSS only checks whether the text makes sense at the moment you use it.",
          },
          body: [
            {
              type: "paragraph",
              text: "The browser does not check the value when you declare it. It simply stores the text, and checks it when you use it in a real property. That means a custom property can hold a whole shadow, or a whole font stack, which you can then reuse. Try this in the Playground:",
            },
            {
              type: "code",
              language: "css",
              code: `:root {
      --shadow: 0 4px 12px rgb(15 23 42 / 0.15);
      --font-body: system-ui, sans-serif;
      --radius: 0.75rem;
    }
    
    .card {
      padding: 1.5rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      font-family: var(--font-body);
    }`,
              html: "<div class=\"card\">A card that uses three named values.</div>",
            },
            {
              type: "paragraph",
              text: "Look at how each name stands for a different kind of value. `--shadow` is several parts, `--font-body` is a list, and `--radius` is a single length. Each of them is used in the property where it makes sense. You can also use `var()` as only part of a value, as in `margin: var(--space) auto`, or several times in one value.",
            },
            {
              type: "paragraph",
              text: "There are things `var()` cannot do. You cannot build a property name out of one, so `var(--prop): red` does nothing. You cannot use it in a selector. And you cannot use it inside the condition of a media query, such as `@media (min-width: var(--bp))`, because those are read before any variables exist. When you need that, the answer is to change the variable inside the media query instead, and a later lesson shows how.",
            },
            {
              type: "paragraph",
              text: "Spaces matter in one place. Write `var(--radius)` with no space between `var` and the bracket. Inside, leave a comma before an optional fallback, which you will meet in a couple of lessons. And remember that a custom property keeps its text exactly as you wrote it, so `--space: 16` is just the number sixteen, and `width: var(--space)` will not work because a bare number is not a length.",
            },
            {
              type: "paragraph",
              text: "A custom property can even be built from another one. A line such as `--space-lg: calc(var(--space) * 2)` makes a new value out of an existing one, and it updates whenever the original does. That lets you define a few base values and derive the rest from them, which keeps the list short and the relationships between the values obvious.",
            },
            {
              type: "paragraph",
              text: "Declare your properties together at the top of the stylesheet, in a single `:root` rule, and give them names that describe the job, not the value. `--radius` will still make sense next year, while `--twelve-pixels` will not.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "token-explorer",
          kind: "visualizer",
          title: "Token explorer",
          summary: "Four tokens drive a card, a button and a link. Change one value and watch every place that uses it move together.",
          minutes: 9,
          concept: {
            description: "A small design system is defined on `:root` as four custom properties: a brand colour, a radius, a spacing unit and a shadow. The card, the button and the link are all written with `var()`, so none of them contains a raw number. Controls change the tokens, and a challenge asks you to write a new set.",
            why: "You can read that one edit updates a dozen rules, and still not feel it. Dragging the radius slider and watching the card and the button round together shows the benefit in a second, and it makes the idea of a token click.",
            mentalModel: "Imagine four dials on a mixing desk. Each dial is connected to several instruments at once. You never touch the instruments, only the dials, and the whole piece changes character.",
          },
          stage: {
            html: `<div class="card">
      <h2 class="title">Weekend pass</h2>
      <p class="text">Unlimited trails, any day of the weekend.</p>
      <button class="btn">Book now</button>
      <a class="link" href="#">Details</a>
    </div>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    .card { margin: 16px; padding: var(--space); border-radius: var(--radius); background: #1e293b; box-shadow: var(--shadow); }
    .title { margin: 0 0 8px; color: var(--brand); font-size: 20px; }
    .text { margin: 0 0 var(--space); color: #cbd5e1; }
    .btn { padding: calc(var(--space) / 2) var(--space); border: 0; border-radius: var(--radius); background: var(--brand); color: #ffffff; font: inherit; font-weight: 700; }
    .link { margin-left: 12px; color: var(--brand); }`,
            annotate: "none",
            target: ".card",
            items: ".card",
            itemCount: 1,
          },
          starter: `:root {
      --brand: #6366f1;
      --radius: 0.75rem;
      --space: 1rem;
      --shadow: 0 8px 24px rgb(0 0 0 / 0.35);
    }
    `,
          controls: [
            {
              id: "brand",
              label: "--brand",
              selector: ":root",
              property: "--brand",
              fallback: "#6366f1",
              type: "options",
              options: ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#0ea5e9"],
              help: "Used by the title, the button and the link.",
            },
            {
              id: "radius",
              label: "--radius",
              selector: ":root",
              property: "--radius",
              fallback: "0.75rem",
              type: "range",
              min: 0,
              max: 2,
              step: 0.25,
              unit: "rem",
              help: "Rounds the card and the button together.",
            },
            {
              id: "space",
              label: "--space",
              selector: ":root",
              property: "--space",
              fallback: "1rem",
              type: "range",
              min: 0.5,
              max: 2,
              step: 0.25,
              unit: "rem",
              help: "The card's padding, and the button's, are both built from it.",
            },
            {
              id: "shadow",
              label: "--shadow",
              selector: ":root",
              property: "--shadow",
              fallback: "0 8px 24px rgb(0 0 0 / 0.35)",
              type: "options",
              options: ["none", "0 2px 6px rgb(0 0 0 / 0.3)", "0 8px 24px rgb(0 0 0 / 0.35)"],
              help: "A whole shadow stored in one name.",
            },
          ],
          presets: [
            {
              id: "round",
              label: "Rounder and roomier",
              description: "radius 1.5rem, space 1.5rem",
              css: ":root { --radius: 1.5rem; --space: 1.5rem; }",
            },
            {
              id: "sharp",
              label: "Sharp and tight",
              description: "radius 0.25rem, space 0.5rem",
              css: ":root { --radius: 0.25rem; --space: 0.5rem; }",
            },
            {
              id: "green",
              label: "Green brand",
              description: "one value, three places",
              css: ":root { --brand: #10b981; }",
            },
          ],
          challenge: {
            title: "Write a new set of tokens",
            description: "Give the page a fresh look by changing only the four lines in `:root`: set `--brand` to the green `#10b981`, `--radius` to `0.25rem` for sharper corners, and `--space` to `1.5rem` for a roomier card. You do not need to touch any other rule.",
            hints: [
              "Edit three values in the `:root` rule. The title, the button, the link and the card all follow.",
              "Write the values exactly: `#10b981`, `0.25rem` and `1.5rem`.",
              "`:root { --brand: #10b981; --radius: 0.25rem; --space: 1.5rem; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ":root",
                property: "--brand",
                expected: ["#10b981", " #10b981"],
                message: "The brand colour is green, `#10b981`",
              },
              {
                type: "computedStyle",
                selector: ":root",
                property: "--radius",
                expected: ["0.25rem", " 0.25rem"],
                message: "...with a `0.25rem` radius",
              },
              {
                type: "computedStyle",
                selector: ":root",
                property: "--space",
                expected: ["1.5rem", " 1.5rem"],
                message: "...and `1.5rem` of space.",
              },
            ],
            solution: `:root {
      --brand: #10b981;
      --radius: 0.25rem;
      --space: 1.5rem;
      --shadow: 0 8px 24px rgb(0 0 0 / 0.35);
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "scope-and-inheritance",
          kind: "learn",
          title: "Scope and inheritance",
          summary: "Custom properties follow the same inheritance rules as colour, which is what makes local theming possible.",
          minutes: 9,
          concept: {
            description: "A custom property is inherited by default, just like `color` or `font-family`. If you declare it on an element, all of that element's descendants can use it. If a descendant declares the same name, its own value wins for that element and everything inside it.",
            why: "This is the feature that surprises people most, and the most useful one. It means you can define a global value once, and then override it for a single card, a single section or a single button, without writing any new rules for the elements inside.",
            mentalModel: "Imagine a family recipe passed down through generations. Everyone follows it, but one cousin adds a pinch of chilli, and only her children and grandchildren inherit that change.",
          },
          body: [
            {
              type: "paragraph",
              text: "Here is a small example. The page defines an accent colour. One panel changes it, and everything inside that panel follows the change without being told.",
            },
            {
              type: "code",
              language: "css",
              code: `:root {
      --accent: #4f46e5;
    }
    
    .panel { padding: 1rem; }
    .panel h2 { color: var(--accent); }
    .panel a  { color: var(--accent); }
    
    .panel--warm {
      --accent: #ea580c;
    }`,
              html: `<div class="panel">
      <h2>Normal panel</h2>
      <a href="#">A link</a>
    </div>
    <div class="panel panel--warm">
      <h2>Warm panel</h2>
      <a href="#">A link</a>
    </div>`,
            },
            {
              type: "paragraph",
              text: "Notice what the last rule does not do. It does not mention the heading or the link at all. It only changes `--accent` on the panel, and because the heading and the link both read `var(--accent)`, they pick up the new value automatically. Add a third panel with a different accent and nothing else in the stylesheet has to change.",
            },
            {
              type: "paragraph",
              text: "The ordinary cascade applies as well. Two rules that set the same custom property on the same element are settled by specificity and order, just like any other property. And a property declared on an element is not visible to its siblings or its parents. If a card defines `--accent` and something outside the card tries to use it, that second thing will find nothing.",
            },
            {
              type: "paragraph",
              text: "A good habit is to define the common defaults on `:root`, and to override them on the smallest element that makes sense. A dark section of the page can change three variables and every button and heading inside it adapts, with no extra class on any of them.",
            },
            {
              type: "paragraph",
              text: "People often ask when to declare something on `:root` and when to put it on a component. A simple rule works well: values that are the same everywhere belong on `:root`, and values that only make sense for one component belong on that component, so the component stays self-contained and easy to move.",
            },
            {
              type: "paragraph",
              text: "If you ever lose track of where a value comes from, select the element in your browser's developer tools and look at the Styles panel. It shows each custom property being used, and the rule that supplied it, so you can see the exact element where the inheritance chain starts.",
            },
            {
              type: "paragraph",
              text: "Scope also explains a common surprise in developer tools. If you change a variable on one element, only that element and its children are affected, so the rest of the page seems to ignore you. Change it on `:root` instead to move everything at once.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "scope-explorer",
          kind: "visualizer",
          title: "Scope explorer",
          summary: "Three panels read the same variable. Override it on one panel and only that panel changes.",
          minutes: 8,
          concept: {
            description: "Three panels each have a heading and a button coloured by `--accent`. The accent is defined once on `:root`, and the second panel overrides it. Controls change the accent for the page or for a single panel, so you can see exactly how far a value travels.",
            why: "Inheritance is the feature that makes custom properties so useful, and the one that is hardest to believe until you see it. Changing a variable on one panel and watching only its heading and button react shows scope in action.",
            mentalModel: "Think of the page as a house, and each panel as a room. A light switch on the front door lights the whole house, but a switch inside one room only changes that room.",
          },
          stage: {
            html: `<section class="panel panel-1">
      <h3>Panel 1</h3>
      <button class="btn">Action</button>
    </section>
    <section class="panel panel-2">
      <h3>Panel 2</h3>
      <button class="btn">Action</button>
    </section>
    <section class="panel panel-3">
      <h3>Panel 3</h3>
      <button class="btn">Action</button>
    </section>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #e2e8f0; font-family: system-ui, sans-serif; font-size: 14px; }
    body { padding: 10px; }
    .panel { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; padding: 12px 16px; border-radius: 10px; background: #1e293b; }
    .panel h3 { margin: 0; color: var(--accent); font-size: 16px; }
    .btn { padding: 6px 14px; border: 0; border-radius: 8px; background: var(--accent); color: #0f172a; font: inherit; font-weight: 700; }`,
            annotate: "none",
            target: "body",
            items: ".panel",
            itemCount: 3,
          },
          starter: `:root {
      --accent: #6366f1;
    }
    
    .panel-2 {
      --accent: #f59e0b;
    }
    `,
          controls: [
            {
              id: "root",
              label: "--accent on the whole page",
              selector: ":root",
              property: "--accent",
              fallback: "#6366f1",
              type: "options",
              options: ["#6366f1", "#10b981", "#ec4899", "#0ea5e9"],
              help: "Every panel that does not set its own value follows this one.",
            },
            {
              id: "panel",
              label: "--accent on the selected panel",
              selector: ".panel-{item}",
              property: "--accent",
              fallback: "#6366f1",
              type: "options",
              options: ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#14b8a6"],
              help: "Select a panel, then give it its own accent. Only that panel changes.",
            },
          ],
          presets: [
            {
              id: "global",
              label: "Change the whole page",
              description: "panels 1 and 3 follow",
              css: ":root { --accent: #10b981; }",
            },
            {
              id: "local",
              label: "Override panel 3 only",
              description: "a local value",
              css: ".panel-3 { --accent: #ec4899; }",
            },
          ],
          challenge: {
            title: "Give panel 3 its own accent",
            description: "Panel 3 should be teal, `#14b8a6`, while the other panels keep their colours. Do not change the `:root` rule or the panel 2 rule: add a new `.panel-3` rule that sets `--accent`.",
            hints: [
              "A custom property set on one element only reaches that element and its children.",
              "You need a new rule with the selector `.panel-3`, and a single declaration in it.",
              "`.panel-3 { --accent: #14b8a6; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".panel-3",
                property: "--accent",
                expected: ["#14b8a6", " #14b8a6"],
                message: "Panel 3 sets its own teal accent",
              },
              {
                type: "computedStyle",
                selector: ":root",
                property: "--accent",
                expected: ["#6366f1", " #6366f1"],
                message: "...and the page keeps its indigo",
              },
              {
                type: "computedStyle",
                selector: ".panel-2",
                property: "--accent",
                expected: ["#f59e0b", " #f59e0b"],
                message: "...and panel 2 keeps its amber.",
              },
            ],
            solution: `:root {
      --accent: #6366f1;
    }
    
    .panel-2 {
      --accent: #f59e0b;
    }
    
    .panel-3 {
      --accent: #14b8a6;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-scope",
          kind: "predict",
          title: "Predict the scope",
          summary: "One rule colours three headings with `var(--accent)`, and the variable is defined three times. Work out which value each heading gets.",
          minutes: 7,
          mode: "css",
          intro: "All three headings use the very same rule, `color: var(--accent)`. But `--accent` is defined on the page, on the card and on an inner box. Predict the colour of each heading, then run the code.",
          code: {
            html: `<h2 class="title">Page heading</h2>
    <section class="card">
      <h2 class="title">Card heading</h2>
      <div class="inner">
        <h2 class="title">Inner heading</h2>
      </div>
    </section>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    :root {
      --accent: #4f46e5;
    }
    
    .title {
      margin: 0 0 0.75rem;
      color: var(--accent);
    }
    
    .card {
      --accent: #ea580c;
      padding: 1rem;
      border: 2px solid var(--accent);
    }
    
    .inner {
      --accent: #16a34a;
      padding: 0.5rem;
    }`,
          },
          questions: [
            {
              prompt: "What colour is the first heading, the one outside the card?",
              options: ["Orange, from the card", "Indigo, from `:root`", "Green, from the inner box", "Black, because nothing applies"],
              answerIndex: 1,
              hint: "Which definitions can the heading reach?",
              explanation: "The page heading is not inside the card, so it only sees the value defined on `:root`, which is indigo.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ":root",
                  property: "--accent",
                  expected: ["#4f46e5", " #4f46e5"],
                  message: "The page defines indigo on `:root`.",
                },
                {
                  type: "computedStyle",
                  selector: ".title",
                  property: "color",
                  expected: ["var(--accent)", "rgb(79, 70, 229)"],
                  message: "The headings use `var(--accent)`.",
                  match: "first",
                },
              ],
            },
            {
              prompt: "And the second heading, inside the card but outside the inner box?",
              options: [
                "Indigo",
                "It has no colour",
                "Green",
                "Orange, because the card redefines `--accent`",
              ],
              answerIndex: 3,
              hint: "The nearest definition wins.",
              explanation: "The card sets `--accent` to orange, so everything inside it, which is not inside something else that sets its own, inherits the orange.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".card",
                  property: "--accent",
                  expected: ["#ea580c", " #ea580c"],
                  message: "The card defines its own orange `--accent`.",
                },
              ],
            },
            {
              prompt: "What colour is the third heading, inside the inner box?",
              options: ["Green, from the nearest definition", "Orange", "Indigo", "A mix of orange and green"],
              answerIndex: 0,
              hint: "Look for the closest ancestor that defines `--accent`.",
              explanation: "The inner box defines green, and it is closer to the heading than the card or the page. A variable reads the nearest definition, not a mixture.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".inner",
                  property: "--accent",
                  expected: ["#16a34a", " #16a34a"],
                  message: "The inner box defines green.",
                },
              ],
            },
            {
              prompt: "What colour is the card's border, `border: 2px solid var(--accent)`?",
              options: [
                "Indigo, because it is outside the heading",
                "Green",
                "Orange, because `--accent` is set on the card itself",
                "There is no border",
              ],
              answerIndex: 2,
              hint: "Does a rule on an element see the variables that element sets?",
              explanation: "An element can use a variable that it declares itself, so the card's border takes its own orange value, together with everything inside the card.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "fallbacks-and-invalid-values",
          kind: "learn",
          title: "Fallbacks, and what happens when it goes wrong",
          summary: "The second argument to var(), and the surprising thing that happens when a value does not fit.",
          minutes: 9,
          concept: {
            description: "`var()` accepts a second value after a comma, which is used when the custom property is not defined. That fallback is also how you make a component work with sensible defaults, whether or not anyone has set its variables.",
            why: "Custom properties fail silently. A typo, a missing definition or a value of the wrong kind does not make an error message, it just makes a property behave strangely. Knowing exactly what the browser does in each case turns a mystery into a short checklist.",
            mentalModel: "Think of a vending machine with a spare slot. If the slot you asked for is empty, the machine hands you the spare. But if the slot holds something that cannot work with your order, you get nothing, and there is no spare.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with the useful case. The fallback is only used when the property is not defined at all on that element or its ancestors:",
            },
            {
              type: "code",
              language: "css",
              code: `.btn {
      background: var(--btn-bg, #4f46e5);
      color: var(--btn-text, white);
    }
    
    .btn--danger {
      --btn-bg: #dc2626;
    }`,
              html: `<button class="btn">Normal</button>
    <button class="btn btn--danger">Danger</button>`,
            },
            {
              type: "paragraph",
              text: "The first button has no `--btn-bg` anywhere, so it uses the fallback and comes out indigo. The second button defines one, so the variable wins. Everything after the first comma is the fallback, even if it has more commas in it, so a font list works fine as a fallback. You can also nest one variable inside another, as in `var(--a, var(--b, blue))`, which tries `--a`, then `--b`, then blue.",
            },
            {
              type: "paragraph",
              text: "Now the surprising case. A fallback only covers a property that is missing. If the property exists but the value cannot be used where you put it, the fallback is ignored, and the declaration is thrown away at that moment. Suppose you write `--size: red` and then `width: var(--size)`. Red is not a width, so the `width` property becomes its natural value. It does not go back to an earlier `width` you wrote above, and it does not use any fallback.",
            },
            {
              type: "code",
              language: "css",
              code: `:root { --size: red; }
    .box {
      width: 200px;
      width: var(--size);   /* invalid: the box gets its natural width, not 200px */
    }`,
            },
            {
              type: "paragraph",
              text: "Do not overuse fallbacks, though. Every `var()` with a fallback repeats a value, which is the thing custom properties were meant to remove. Define your defaults once on `:root`, and keep fallbacks for the optional settings of a component, where it really is normal for nobody to have set the variable.",
            },
            {
              type: "paragraph",
              text: "That is why a missing variable can make a layout jump in a way that a normal typo would not. When something looks wrong, check three things in order: is the name spelt exactly the same in both places, is the property defined on an ancestor of that element, and is the value the right kind of thing for the property that uses it. Those three questions find almost every custom property bug.",
            },
            {
              type: "paragraph",
              text: "A good test for any component is to delete its variable definitions in your developer tools and watch what happens. If it still looks reasonable, its fallbacks are doing their job, and if it falls apart, you have found a missing default.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-fallback",
          kind: "predict",
          title: "Predict the fallback",
          summary: "Four paragraphs, four ways a variable can be missing, defined or invalid. Predict what each one ends up as.",
          minutes: 7,
          mode: "css",
          intro: "Each paragraph uses `var()` in a slightly different situation. Work out what colour or width each one gets, then run the code to check.",
          code: {
            html: `<p class="a">A: missing variable with a fallback</p>
    <p class="b">B: a value that does not fit</p>
    <p class="c">C: defined variable with a fallback</p>
    <p class="d">D: nested fallbacks</p>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
      font-weight: 600;
    }
    
    .a {
      color: var(--missing, #16a34a);
    }
    
    .b {
      --size: red;
      width: 12rem;
      width: var(--size);
      padding: 0.5rem;
      background-color: #e0e7ff;
    }
    
    .c {
      --c: #2563eb;
      color: var(--c, #dc2626);
    }
    
    .d {
      color: var(--first, var(--second, #7c3aed));
    }`,
          },
          questions: [
            {
              prompt: "What colour is paragraph A, which uses `var(--missing, #16a34a)`?",
              options: [
                "Black, because `--missing` does not exist",
                "The default blue of a link",
                "Green, the fallback",
                "It is invalid",
              ],
              answerIndex: 2,
              hint: "What is the second value for?",
              explanation: "`--missing` is not defined anywhere, so `var()` uses its fallback, `#16a34a`.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".a",
                  property: "color",
                  expected: ["var(--missing, #16a34a)", "rgb(22, 163, 74)"],
                  message: "A uses a fallback.",
                },
              ],
            },
            {
              prompt: "Paragraph B sets `--size: red` and then `width: var(--size)`, after an earlier `width: 12rem`. What width does it get?",
              options: [
                "Its natural width, because the declaration is invalid when it is used",
                "Red, because that is the value",
                "12rem, from the line above",
                "Zero",
              ],
              answerIndex: 0,
              hint: "Red is not a length. Does the browser go back to the earlier width?",
              explanation: "The value is only checked when it is used, and red is not a valid width. The `width` declaration becomes invalid at that moment, and it does not fall back to the earlier line, so the paragraph takes its natural width, the full line.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".b",
                  property: "--size",
                  expected: ["red", " red"],
                  message: "B defines `--size: red`.",
                },
              ],
            },
            {
              prompt: "Paragraph C defines `--c: #2563eb` and uses `var(--c, #dc2626)`. What colour is it?",
              options: ["Red, the fallback", "Black", "Purple", "Blue, because the variable is defined"],
              answerIndex: 3,
              hint: "When is a fallback used?",
              explanation: "The fallback is only used when the variable is missing. Here it exists, so C is blue.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".c",
                  property: "color",
                  expected: ["var(--c, #dc2626)", "rgb(37, 99, 235)"],
                  message: "C uses a defined variable with a fallback.",
                },
              ],
            },
            {
              prompt: "Paragraph D uses `var(--first, var(--second, #7c3aed))`, and neither variable exists. What colour is it?",
              options: ["Black", "Purple, the last fallback", "Whatever `--second` would be", "It is invalid"],
              answerIndex: 1,
              hint: "The fallback can contain another `var()`.",
              explanation: "`--first` is missing, so the browser tries the fallback, which is another `var()`. `--second` is missing too, so it uses `#7c3aed`.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".d",
                  property: "color",
                  expected: ["var(--first, var(--second, #7c3aed))", "rgb(124, 58, 237)"],
                  message: "D nests two fallbacks.",
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-silent-variable",
          kind: "debug",
          title: "Debug: the variables that do nothing",
          mode: "css",
          summary: "The button has no background and no padding, and nothing reports an error. Two small mistakes in the definitions are to blame.",
          minutes: 8,
          broken: {
            html: "<button class=\"btn\">Save route</button>",
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    :root {
      --Brand: #4f46e5;
      --space: 16;
    }
    
    .btn {
      padding: var(--space);
      border: 0;
      border-radius: 0.5rem;
      background-color: var(--brand);
      color: #ffffff;
      font: inherit;
    }
    `,
          },
          challenge: {
            title: "Make the button pick up its colour and its padding",
            description: "The button should be indigo, `#4f46e5`, with `1rem` of padding. Both values are defined in `:root`, and both are used with `var()`, yet neither shows. Find out why, and fix the **definitions**, not the button's rule.",
            hints: [
              "Compare the names in `:root` with the names in the button's rule, letter by letter.",
              "Names are case-sensitive, and a bare number such as `16` is not a length, so `padding: var(--space)` is invalid.",
              "`--brand: #4f46e5;` and `--space: 1rem;`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ":root",
                property: "--brand",
                expected: ["#4f46e5", " #4f46e5"],
                message: "The variable is named `--brand`, in lowercase",
              },
              {
                type: "computedStyle",
                selector: ":root",
                property: "--space",
                expected: ["1rem", " 1rem"],
                message: "...and `--space` is a real length, `1rem`.",
              },
            ],
            solution: {
              html: "<button class=\"btn\">Save route</button>",
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    :root {
      --brand: #4f46e5;
      --space: 1rem;
    }
    
    .btn {
      padding: var(--space);
      border: 0;
      border-radius: 0.5rem;
      background-color: var(--brand);
      color: #ffffff;
      font: inherit;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "design-tokens-and-a-system",
          kind: "learn",
          title: "Design tokens: a small system in one place",
          summary: "Colours, spacing, radii and type as named values, and how to name them so they last.",
          minutes: 9,
          concept: {
            description: "A **design token** is a custom property that holds a decision: a brand colour, a spacing step, a corner radius. A handful of them, defined together, is the foundation of a design system, and it is the same idea you will meet again in Tailwind.",
            why: "Without tokens, a stylesheet ends up with thirty slightly different greys and a dozen spacings that almost match. With a small set, everything lines up, the page feels designed, and a redesign is a matter of editing a few lines.",
            mentalModel: "Imagine a box of crayons with eight colours. You are free to draw anything, but you only pick from the box, so every drawing ends up looking as though it belongs to the same book.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start by writing down the decisions that repeat. A good first set is a few colours, a scale of spacings, a couple of radii, and a shadow. Put them together in one rule, so anyone can see the whole system at a glance:",
            },
            {
              type: "code",
              language: "css",
              code: `:root {
      --color-brand: #4f46e5;
      --color-text: #0f172a;
      --color-muted: #64748b;
      --color-surface: #ffffff;
    
      --space-1: 0.25rem;
      --space-2: 0.5rem;
      --space-3: 1rem;
      --space-4: 2rem;
    
      --radius-sm: 0.25rem;
      --radius-md: 0.75rem;
    }`,
              html: `<div class="card">
      <h2 class="title">Weekend pass</h2>
      <p class="text">Unlimited trails, any day.</p>
    </div>`,
            },
            {
              type: "paragraph",
              text: "Then use only those names in your rules. A card might use `padding: var(--space-3)`, `border-radius: var(--radius-md)` and `background: var(--color-surface)`. Notice there are no raw numbers in the card at all. If the design later wants everything a little roomier, you change `--space-3` once and every card, button and form follows.",
            },
            {
              type: "paragraph",
              text: "Naming is the part that decides whether the system lasts. Name things by their job rather than their value. `--color-brand` can change from indigo to green without the name becoming a lie, but `--indigo` cannot. A numbered scale such as `--space-1` to `--space-4` is easy to extend, and it tells people which ones are bigger without a table.",
            },
            {
              type: "paragraph",
              text: "Many teams use two layers. The first layer holds raw values, such as `--indigo-600`. The second layer gives them jobs, such as `--color-brand: var(--indigo-600)`. Components only use the second layer, so you can change what the brand colour means without hunting through any component. You do not need this on day one, but it is worth knowing it exists.",
            },
            {
              type: "paragraph",
              text: "Try it now in the Playground. Change `--space-3` and `--color-brand`, and notice how many places move at once. That jump, from one edit to a dozen visible changes, is the whole benefit, and it is also why a token system pays for itself on the very first redesign.",
            },
            {
              type: "paragraph",
              text: "Resist the urge to turn every value into a token. If a number is used once, in one place, for one reason, leave it where it is. Tokens are for decisions that repeat, and a short list that people can remember is worth more than a long list they ignore.",
            },
            {
              type: "paragraph",
              text: "Write the tokens in a clear order, with colours first, then spacing, then shape, and put a short comment above each group. When you come back to the stylesheet after a month, you will be able to find the value you want in a few seconds.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-build-a-token-set",
          kind: "lab",
          title: "Lab: pull the repeated values into tokens",
          mode: "css",
          summary: "The same colour, size and radius are written out several times. Name them once, and use the names.",
          minutes: 10,
          starter: {
            html: `<div class="card">
      <h2 class="title">Weekend pass</h2>
      <p class="text">Unlimited trails, any day.</p>
      <button class="btn">Book now</button>
    </div>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .card {
      padding: 1rem;
      border-radius: 0.75rem;
      background-color: #e0e7ff;
    }
    
    .title {
      margin: 0 0 0.5rem;
      color: #4f46e5;
    }
    
    .text {
      margin: 0 0 1rem;
    }
    
    .btn {
      padding: 0.5rem 1rem;
      border: 0;
      border-radius: 0.75rem;
      background-color: #4f46e5;
      color: #ffffff;
      font: inherit;
      font-weight: 600;
    }
    `,
          },
          challenge: {
            title: "Replace the repeated values with custom properties",
            description: "The brand colour `#4f46e5`, the `1rem` spacing and the `0.75rem` radius appear more than once. Add a `:root` rule that defines `--brand`, `--space` and `--radius` with those exact values, and then use `var()` in the card and the button. The title colour and the button background should read `--brand`, the card padding should read `--space`, and the card's border radius should read `--radius`.",
            hints: [
              "Write the three definitions first, in one `:root` rule, then change the declarations that use them.",
              "Use `var(--brand)`, `var(--space)` and `var(--radius)`, with no space between `var` and the bracket.",
              "`:root { --brand: #4f46e5; --space: 1rem; --radius: 0.75rem; }` and then `background-color: var(--brand);` and so on.",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ":root",
                property: "--brand",
                expected: ["#4f46e5", " #4f46e5"],
                message: "`--brand` is defined as `#4f46e5`",
              },
              {
                type: "computedStyle",
                selector: ":root",
                property: "--space",
                expected: ["1rem", " 1rem"],
                message: "...`--space` as `1rem`",
              },
              {
                type: "computedStyle",
                selector: ":root",
                property: "--radius",
                expected: ["0.75rem", " 0.75rem"],
                message: "...and `--radius` as `0.75rem`.",
              },
              {
                type: "computedStyle",
                selector: ".btn",
                property: "background-color",
                expected: ["var(--brand)", "rgb(79, 70, 229)"],
                message: "The button reads `var(--brand)`.",
              },
              {
                type: "computedStyle",
                selector: ".title",
                property: "color",
                expected: ["var(--brand)", "rgb(79, 70, 229)"],
                message: "The title reads `var(--brand)`.",
              },
              {
                type: "computedStyle",
                selector: ".card",
                property: "padding",
                expected: ["var(--space)", "16px"],
                message: "The card padding reads `var(--space)`.",
              },
              {
                type: "computedStyle",
                selector: ".card",
                property: "border-radius",
                expected: ["var(--radius)", "12px"],
                message: "The card radius reads `var(--radius)`.",
              },
            ],
            solution: {
              html: `<div class="card">
      <h2 class="title">Weekend pass</h2>
      <p class="text">Unlimited trails, any day.</p>
      <button class="btn">Book now</button>
    </div>`,
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    :root {
      --brand: #4f46e5;
      --space: 1rem;
      --radius: 0.75rem;
    }
    
    .card {
      padding: var(--space);
      border-radius: var(--radius);
      background-color: #e0e7ff;
    }
    
    .title {
      margin: 0 0 0.5rem;
      color: var(--brand);
    }
    
    .text {
      margin: 0 0 1rem;
    }
    
    .btn {
      padding: 0.5rem 1rem;
      border: 0;
      border-radius: var(--radius);
      background-color: var(--brand);
      color: #ffffff;
      font: inherit;
      font-weight: 600;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "theming-light-dark",
          kind: "learn",
          title: "Themes: light, dark and anything else",
          summary: "Swap a whole set of values by changing a single attribute.",
          minutes: 9,
          concept: {
            description: "Because custom properties can be redefined on any element, a theme is simply a second set of values. You describe the colours by job, such as background and text, and switch the values with an attribute or a media query, without touching a single component rule.",
            why: "Dark mode used to mean writing every colour twice. With custom properties, every component says `var(--bg)`, and the theme decides what that means. Adding a third theme, such as a high contrast one, is another block of values rather than another stylesheet.",
            mentalModel: "Think of stage lighting. The actors, the costumes and the set stay exactly the same, and when the lighting changes, the whole scene changes with it.",
          },
          body: [
            {
              type: "paragraph",
              text: "The first step is to describe your colours by what they are for, not by what they look like. Then write the light values on `:root`, and the dark values under an attribute. Here is a full example with a page, a card and a button:",
            },
            {
              type: "code",
              language: "css",
              code: `:root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --text: #0f172a;
      --brand: #4f46e5;
    }
    
    [data-theme="dark"] {
      --bg: #0f172a;
      --surface: #1e293b;
      --text: #e2e8f0;
      --brand: #818cf8;
    }
    
    body  { background: var(--bg); color: var(--text); }
    .card { background: var(--surface); padding: 1.5rem; border-radius: 0.75rem; }
    .btn  { background: var(--brand); color: #0f172a; }`,
              html: `<body data-theme="dark">
      <div class="card">
        <p>Switch the attribute to light to see the other theme.</p>
        <button class="btn">Save</button>
      </div>
    </body>`,
            },
            {
              type: "paragraph",
              text: "Try changing `data-theme` in the HTML from dark to light and back. No rule changed, and yet everything did, because the components only know the names. A little script can flip that attribute when someone presses a button, and the page will follow, which is all that most theme toggles do.",
            },
            {
              type: "paragraph",
              text: "You can follow the person's system setting too. A media query for `prefers-color-scheme: dark` can redefine the same variables on `:root`, so people who have chosen dark mode in their operating system get it before they press anything. Put it before the attribute rule, so that an explicit choice on the page wins over the system default.",
            },
            {
              type: "paragraph",
              text: "While you are here, add `color-scheme: light dark` to `:root`. It tells the browser that the page supports both, so the built-in parts, such as scrollbars, form controls and the default text colour, switch with it. Newer browsers also have a `light-dark()` function that picks between two colours automatically, which is worth trying once you are comfortable with this approach.",
            },
            {
              type: "paragraph",
              text: "Remember the person's choice, too. Save it in `localStorage`, and set the attribute as early as you can, ideally with a tiny script in the `<head>`, so the page does not flash the wrong theme for a moment before the right one appears.",
            },
            {
              type: "paragraph",
              text: "One last tip: check the contrast in both themes. A colour that reads well on a white card can disappear on a dark one, so that is why the brand colour above is lighter in the dark theme. Test the two palettes separately, and treat each as a design of its own.",
            },
            {
              type: "paragraph",
              text: "If a theme ever looks wrong, compare the names before you compare the colours. A variable that is missing from one theme is a much more likely cause than a wrong hex code, and it is quick to check.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-dark-theme",
          kind: "lab",
          title: "Lab: write a dark theme",
          mode: "css",
          summary: "The components already use variables. Fill in the dark theme's values, and the page changes without touching a component.",
          minutes: 8,
          starter: {
            html: `<div class="app" data-theme="dark">
      <div class="card">
        <h2 class="title">Dark mode</h2>
        <p>The page already reads its colours from variables. Give the dark theme its own values.</p>
      </div>
    </div>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --text: #0f172a;
    }
    
    [data-theme="dark"] {
    }
    
    .app {
      padding: 1.5rem;
      background-color: var(--bg);
      color: var(--text);
    }
    
    .card {
      padding: 1.25rem;
      border-radius: 0.75rem;
      background-color: var(--surface);
    }
    
    .title {
      margin: 0 0 0.5rem;
    }
    `,
          },
          challenge: {
            title: "Define the dark values",
            description: "The wrapper has `data-theme=\"dark\"`, but the `[data-theme=\"dark\"]` rule is empty, so the page is still light. Inside that rule, set `--bg` to `#0f172a`, `--surface` to `#1e293b` and `--text` to `#e2e8f0`. Do not change any of the component rules: they should follow by themselves.",
            hints: [
              "Put three declarations in the empty `[data-theme=\"dark\"]` rule, using the same names as in `:root`.",
              "The attribute rule only applies to the wrapper and everything inside it, so the light values on `:root` stay as they are.",
              "`[data-theme=\"dark\"] { --bg: #0f172a; --surface: #1e293b; --text: #e2e8f0; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".app",
                property: "--bg",
                expected: ["#0f172a", " #0f172a"],
                message: "The dark background is `#0f172a`",
              },
              {
                type: "computedStyle",
                selector: ".app",
                property: "--surface",
                expected: ["#1e293b", " #1e293b"],
                message: "...the surface `#1e293b`",
              },
              {
                type: "computedStyle",
                selector: ".app",
                property: "--text",
                expected: ["#e2e8f0", " #e2e8f0"],
                message: "...and the text `#e2e8f0`.",
              },
            ],
            solution: {
              html: `<div class="app" data-theme="dark">
      <div class="card">
        <h2 class="title">Dark mode</h2>
        <p>The page already reads its colours from variables. Give the dark theme its own values.</p>
      </div>
    </div>`,
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --text: #0f172a;
    }
    
    [data-theme="dark"] {
      --bg: #0f172a;
      --surface: #1e293b;
      --text: #e2e8f0;
    }
    
    .app {
      padding: 1.5rem;
      background-color: var(--bg);
      color: var(--text);
    }
    
    .card {
      padding: 1.25rem;
      border-radius: 0.75rem;
      background-color: var(--surface);
    }
    
    .title {
      margin: 0 0 0.5rem;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "custom-properties-with-calc",
          kind: "learn",
          title: "Doing maths with custom properties",
          summary: "Build new values from old ones with calc(), and use plain numbers as dials.",
          minutes: 9,
          concept: {
            description: "Custom properties work beautifully with `calc()`. You can multiply a spacing by two, add a border width to a size, or store a plain number such as a column count and use it wherever a number is needed.",
            why: "This is how a small set of base values can produce a whole scale without writing every size out by hand. It also lets you store a single dial, such as a ratio, and have many properties respond to it.",
            mentalModel: "Think of a volume knob. You turn one dial, and the sound changes everywhere it is connected. The knob holds a number, and each speaker decides what that number means.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's start with spacing. Define one base unit, and derive larger steps from it. Because each step is built from the base, changing the base moves the whole scale together.",
            },
            {
              type: "code",
              language: "css",
              code: `:root {
      --space: 0.5rem;
      --space-2: calc(var(--space) * 2);
      --space-4: calc(var(--space) * 4);
    }
    
    .card {
      padding: var(--space-2);
      margin-bottom: var(--space-4);
    }`,
              html: "<div class=\"card\">Padding is two spaces, margin is four.</div>",
            },
            {
              type: "paragraph",
              text: "The multiplication works because one side of it is a plain number. In `calc()`, you can multiply or divide by a number without a unit, but not by a length. So `calc(var(--space) * 2)` is fine, while `calc(var(--space) * var(--gap))` only works if `--gap` is written as a bare number such as `3`. Bare numbers are not valid lengths on their own, which is why you can store them in a custom property, but you cannot use them directly as a `width`.",
            },
            {
              type: "paragraph",
              text: "A bare number is a very handy dial. You can store a count, a ratio or a scale, and each property that uses it adds the unit it needs. Here a single number controls the column count of a grid, and another controls how much a card grows on hover:",
            },
            {
              type: "code",
              language: "css",
              code: `.gallery {
      --cols: 3;
      display: grid;
      grid-template-columns: repeat(var(--cols), 1fr);
      gap: 1rem;
    }
    
    .photo {
      --lift: 1.05;
      transition: transform 0.2s;
    }
    .photo:hover {
      transform: scale(var(--lift));
    }`,
              html: `<div class="gallery">
      <div class="photo">1</div>
      <div class="photo">2</div>
      <div class="photo">3</div>
    </div>`,
            },
            {
              type: "paragraph",
              text: "To turn a bare number into a length, multiply it by a unit inside `calc()`, as in `calc(var(--n) * 1px)`. This also lets you do the reverse and compute a width from a count, such as `width: calc(100% / var(--cols))`. Division by a variable works the same way, as long as the variable is a plain number.",
            },
            {
              type: "paragraph",
              text: "A word of caution. The more you build from other values, the harder a stylesheet is to read at a glance. Two or three levels of derived values is comfortable. Beyond that, people stop being able to see where a number comes from. When a calculation gets long, give the intermediate result its own name, so each step is readable on its own.",
            },
            {
              type: "paragraph",
              text: "Try changing `--cols` to 2 and 4 in the Playground, and `--lift` to 1.2. One digit, and the whole layout and the hover effect respond. That is the real power of a custom property that holds a number: the rest of the stylesheet becomes a set of rules that read it, and you only touch the dial.",
            },
            {
              type: "paragraph",
              text: "If a result looks odd, check the units first. A number and a length are different kinds of thing, and most surprises come from mixing them.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "component-variables",
          kind: "learn",
          title: "Variables as a component's settings",
          summary: "Give a component a few named options, with defaults, so variants need no new rules.",
          minutes: 9,
          concept: {
            description: "A well-built component exposes a few custom properties as its settings. It reads them with sensible fallbacks, so it works with no setup at all, and anyone who wants a variant simply sets one or two of them.",
            why: "This avoids the usual problem with variants, where a `.btn-danger` class has to repeat every colour and every state, and then fight the base rule with a heavier selector. When a variant only changes a variable, there is nothing to fight and nothing to repeat.",
            mentalModel: "Picture a lamp with a dimmer and a colour dial. The lamp's design does not change. Each room just turns the dials to the setting it wants.",
          },
          body: [
            {
              type: "paragraph",
              text: "Here is a button written that way. The base rule reads two settings and gives each a default. It never mentions a variant.",
            },
            {
              type: "code",
              language: "css",
              code: `.btn {
      padding: 0.6rem 1.2rem;
      border: 0;
      border-radius: 0.5rem;
      background: var(--btn-bg, #4f46e5);
      color: var(--btn-text, #ffffff);
      font-weight: 600;
    }
    
    .btn:hover {
      background: var(--btn-bg-hover, #3730a3);
    }`,
              html: "<button class=\"btn\">Primary</button>",
            },
            {
              type: "paragraph",
              text: "Now a variant is just a few lines that set the settings, and nothing else. It does not need to repeat the padding or the radius, and it does not need more specificity than the base rule, because it is not changing a property, only a variable.",
            },
            {
              type: "code",
              language: "css",
              code: `.btn--danger {
      --btn-bg: #dc2626;
      --btn-bg-hover: #b91c1c;
    }
    
    .btn--quiet {
      --btn-bg: transparent;
      --btn-text: #4f46e5;
      --btn-bg-hover: #e0e7ff;
    }`,
              html: `<button class="btn">Primary</button>
    <button class="btn btn--danger">Danger</button>
    <button class="btn btn--quiet">Quiet</button>`,
            },
            {
              type: "paragraph",
              text: "Look at what the hover rule does. It uses its own setting, `--btn-bg-hover`, so each variant can decide what hover looks like. Without that, you would need a separate hover rule for every variant, which is the kind of duplication custom properties are meant to remove.",
            },
            {
              type: "paragraph",
              text: "Give the settings a prefix that belongs to the component, such as `--btn-`. A shared prefix tells readers the properties belong together, and it stops them colliding with global tokens like `--brand`. You can also build the defaults from your tokens, as in `var(--btn-bg, var(--color-brand))`, which connects the component to the rest of your system.",
            },
            {
              type: "paragraph",
              text: "Do not expose every property. A component with thirty settings is hard to use, and harder to change. Choose the handful of things that people really vary, such as colour, size and spacing, and leave the rest as ordinary declarations inside the component, where they are easy to find.",
            },
            {
              type: "paragraph",
              text: "This pattern is how many large design systems work. The components live in one place, with their defaults, and each product or theme sets a few variables on top. Nobody edits the component to change its look, so upgrading it later does not erase anyone's customisations, because all they ever touched were the settings.",
            },
            {
              type: "paragraph",
              text: "Settings also work on a single instance, since a custom property can be set anywhere. A one-off button can set `style=\"--btn-bg: #0f766e\"` in the HTML, and nothing in the stylesheet has to change.",
            },
            {
              type: "paragraph",
              text: "Document the settings in a short comment above the component, listing each name and its default. That small habit turns a hidden feature into a real, discoverable API that other people can use without reading every line.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "changing-variables-with-javascript",
          kind: "learn",
          title: "Changing variables with JavaScript",
          summary: "Let a script move a dial, and let CSS do all of the drawing.",
          minutes: 8,
          concept: {
            description: "A script can read and write custom properties, which makes them the cleanest way to connect JavaScript to your styles. The script updates a number or a colour, and the CSS, which already knows what to do with it, redraws everything that uses it.",
            why: "The alternative is a script that sets many individual styles on many elements, which scatters your design across two languages. With a custom property, the script changes one value, and the stylesheet remains the only place that decides how things look.",
            mentalModel: "Imagine a control room with a single lever. The operator, the script, only moves the lever. The machines, your CSS rules, decide what to do when it moves.",
          },
          body: [
            {
              type: "paragraph",
              text: "To write a value, use `setProperty` on an element's `style`. Setting it on the `document.documentElement` changes the whole page, and setting it on a single element changes only that element and its children, which follows the scope rules you already know.",
            },
            {
              type: "code",
              language: "js",
              code: `const root = document.documentElement;
    
    // change the brand colour for the whole page
    root.style.setProperty("--brand", "#16a34a");
    
    // change it for one card only
    document.querySelector(".card").style.setProperty("--brand", "#ea580c");`,
            },
            {
              type: "paragraph",
              text: "To read a value, ask for the computed style of an element, and request the property by name. The result is a string, and it may include a leading space, so it is good practice to trim it before comparing.",
            },
            {
              type: "paragraph",
              text: "Values you set from a script are plain strings, so write them exactly as you would in CSS, with units included. Setting `--size` to the number `20` will not work if the stylesheet expects `20px`, so either send `\"20px\"` from the script, or keep the number bare and let the CSS add the unit with `calc()`. The second approach keeps all the unit decisions in the stylesheet, which is where they belong.",
            },
            {
              type: "code",
              language: "js",
              code: `const styles = getComputedStyle(document.documentElement);
    const brand = styles.getPropertyValue("--brand").trim();
    console.log(brand); // "#16a34a" `,
            },
            {
              type: "paragraph",
              text: "A classic use is a slider. The script reads the slider's value, and puts it into a custom property. The stylesheet uses the property to set a hue, and the whole palette changes while you drag.",
            },
            {
              type: "code",
              language: "js",
              code: `slider.addEventListener("input", () => {
      root.style.setProperty("--hue", slider.value);
    });`,
            },
            {
              type: "code",
              language: "css",
              code: `:root { --hue: 250; }
    
    .card {
      background: hsl(var(--hue) 80% 95%);
      border: 2px solid hsl(var(--hue) 70% 50%);
    }`,
              html: "<div class=\"card\">The card follows the --hue value.</div>",
            },
            {
              type: "paragraph",
              text: "Another favourite is tracking the pointer. A script writes the mouse position into `--x` and `--y`, and CSS draws a glow or a spotlight at that point. The script stays tiny, and none of the visual work lives in it.",
            },
            {
              type: "paragraph",
              text: "Keep one rule in mind. JavaScript should only supply values, such as numbers, colours and sizes. Decisions about how things look, and any maths that turns those values into a layout, belong in the stylesheet. That keeps your CSS readable on its own, and means a designer can change the look without opening a script.",
            },
            {
              type: "paragraph",
              text: "You can also remove a value you have set, with `style.removeProperty(\"--brand\")`. The element then goes back to whatever the stylesheet says, which is a lovely way to build a reset button, because the script never needs to remember the original values.",
            },
            {
              type: "paragraph",
              text: "Make sure your script runs after the elements exist, or place it at the end of the body, so that `querySelector` can find what it is looking for.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "registering-with-property",
          kind: "learn",
          title: "Registering a property with @property",
          summary: "Tell the browser what type a custom property is, and unlock animation.",
          minutes: 9,
          concept: {
            description: "By default, a custom property is just text, and the browser does not know whether it holds a colour, a length or a word. The `@property` rule lets you register one with a type, a default and an inheritance setting, and the browser then treats it like a real property.",
            why: "A registered property can be validated, it has a proper default, and, most excitingly, it can be animated. A plain custom property cannot be smoothly animated, because the browser has no idea how to blend two pieces of text.",
            mentalModel: "It is the difference between a label on a box and a measuring tape. The label tells you what the box is called. The tape knows the box is a length, so it can work out what lies halfway.",
          },
          body: [
            {
              type: "paragraph",
              text: "A registration has three parts. The syntax says what type of value it accepts, `inherits` says whether children get the value, and `initial-value` gives it a default. Here an angle is registered:",
            },
            {
              type: "code",
              language: "css",
              code: `@property --angle {
      syntax: "<angle>";
      inherits: false;
      initial-value: 0deg;
    }
    
    .swatch {
      width: 8rem;
      height: 8rem;
      background: linear-gradient(var(--angle), #4f46e5, #ec4899);
    }`,
              html: "<div class=\"swatch\"></div>",
            },
            {
              type: "paragraph",
              text: "Because `--angle` is now known to be an angle, the browser can animate it. Without the registration, a gradient angle held in a custom property would jump from one value to the next. With it, a transition or animation glides, which gives you a spinning gradient with a few lines of CSS.",
            },
            {
              type: "code",
              language: "css",
              code: `.swatch {
      transition: --angle 0.6s;
    }
    .swatch:hover {
      --angle: 180deg;
    }`,
            },
            {
              type: "paragraph",
              text: "The syntax can be a single type, such as `<length>`, `<color>`, `<number>` or `<percentage>`, or a list of keywords like `\"small | large\"`, or `\"*\"` for anything. Registered properties are checked when you set them, and an invalid value is ignored, so you get a safety net that plain custom properties do not have. An `initial-value` is required unless the syntax is `\"*\"`.",
            },
            {
              type: "paragraph",
              text: "Be aware that `@property` is a newer feature. It is available in current versions of all the major browsers, but it is worth checking support for the browsers you must serve. Fortunately it fails gently. In a browser that does not know it, the property is an ordinary custom property, so the colours still appear, and the only loss is the smooth animation.",
            },
            {
              type: "paragraph",
              text: "Use it when you want typed behaviour, not for every variable. For plain tokens such as colours and spacings, an ordinary custom property is enough, and a registration is extra code to maintain. Reach for `@property` when you need to animate a value, or when you want the browser to reject values of the wrong kind.",
            },
            {
              type: "paragraph",
              text: "It also pays to keep the registration next to the rules that use the property, with a comment that says why it is typed. A future reader will wonder why one variable has a formal definition and the others do not, and a single line explaining that it is animated will save them the trouble of finding out.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "variables-in-media-and-containers",
          kind: "learn",
          title: "Variables in media and container queries",
          summary: "You can't use a variable inside a query condition, but you can change variables inside one.",
          minutes: 8,
          concept: {
            description: "A media query's condition is read before any custom properties exist, so `@media (min-width: var(--bp))` does nothing. What you can do, and what is much more useful, is redefine your custom properties inside a media query, so every rule that uses them adapts at once.",
            why: "Responsive design usually means writing the same changes in many rules. If your sizes live in variables, a single block inside a media query can change the whole page's scale. The components never need to know the page is responsive.",
            mentalModel: "Imagine a thermostat in a building. You do not rewire each room when winter arrives. You change the setting, and every room responds in its own way.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with spacing and type. Define the small-screen values on `:root`, and then override only those values on larger screens:",
            },
            {
              type: "code",
              language: "css",
              code: `:root {
      --space: 1rem;
      --title-size: 1.75rem;
      --columns: 1;
    }
    
    @media (min-width: 48rem) {
      :root {
        --space: 1.5rem;
        --title-size: 2.5rem;
        --columns: 3;
      }
    }
    
    .page   { padding: var(--space); }
    .title  { font-size: var(--title-size); }
    .grid   {
      display: grid;
      gap: var(--space);
      grid-template-columns: repeat(var(--columns), 1fr);
    }`,
              html: `<div class="page">
      <h1 class="title">Responsive tokens</h1>
      <div class="grid"><div>1</div><div>2</div><div>3</div></div>
    </div>`,
            },
            {
              type: "paragraph",
              text: "Notice how short the media query is. It lists three values, and everything else, from the padding to the heading to the grid, follows. If the design later adds a new component that uses `--space`, it will be responsive from its first line, with no media query of its own.",
            },
            {
              type: "paragraph",
              text: "The same idea works with container queries. Inside a container query, you can redefine variables on the elements that sit inside the container, so a card can switch from a roomy layout to a compact one depending on how much space it has, rather than on the size of the whole window. The rules in the card stay exactly the same.",
            },
            {
              type: "paragraph",
              text: "You can combine this with the preferences media features. A `prefers-reduced-motion: reduce` block can set `--duration: 0.01ms`, and every transition that reads `var(--duration)` becomes instant for people who asked for it. A `prefers-contrast: more` block can swap your colour tokens for stronger ones. One block, the whole page.",
            },
            {
              type: "paragraph",
              text: "A useful habit is to write the media query as a list of settings, never as a list of rules. If you catch yourself writing a selector inside it, ask whether a variable could do the job instead. Often it can, and the media query shrinks to a few lines that anyone can read at a glance, while the real styling stays in one place, at the top level, where it is easy to follow.",
            },
            {
              type: "paragraph",
              text: "There is a catch worth remembering. Changing a variable on a very large part of the page makes the browser recheck every element that uses it, which is nearly free for normal pages but can add up on huge ones if you do it every frame. For things that change on resize or on a preference, it is perfectly fine.",
            },
            {
              type: "paragraph",
              text: "Test the page by dragging the edge of the window and watching the settings change at the breakpoint. If something does not move, it is not reading the variable yet, and that is the thing to fix.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-trapped-variable",
          kind: "debug",
          title: "Debug: the variable that can't be reached",
          mode: "css",
          summary: "The card's border is indigo, but the heading above it ignores the same variable. Find out why it is out of reach.",
          minutes: 6,
          broken: {
            html: `<h1 class="page-title">Trailhead</h1>
    <div class="card">
      <p>The card uses the accent for its border.</p>
    </div>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .page-title {
      margin: 0 0 1rem;
      color: var(--accent);
    }
    
    .card {
      --accent: #4f46e5;
      padding: 1rem;
      border: 3px solid var(--accent);
      border-radius: 0.5rem;
    }
    `,
          },
          challenge: {
            title: "Make the accent available to the heading too",
            description: "The card's border is indigo, which proves that `--accent` works. But the page title uses `var(--accent)` as well, and it is not indigo. The variable is defined inside the card's rule, so only the card and its contents can see it. Move the definition to where the whole page can reach it, with the value `#4f46e5`.",
            hints: [
              "Which element is the title inside? Is it inside the card?",
              "A custom property is inherited by descendants only. The title is a sibling of the card, not a child.",
              "Define `--accent: #4f46e5;` in a `:root` rule instead of in `.card`.",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ":root",
                property: "--accent",
                expected: ["#4f46e5", " #4f46e5"],
                message: "`--accent` is defined on `:root`, where everything can reach it.",
              },
              {
                type: "computedStyle",
                selector: ".page-title",
                property: "color",
                expected: ["var(--accent)", "rgb(79, 70, 229)"],
                message: "...and the title reads `var(--accent)`.",
              },
            ],
            solution: {
              html: `<h1 class="page-title">Trailhead</h1>
    <div class="card">
      <p>The card uses the accent for its border.</p>
    </div>`,
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    :root {
      --accent: #4f46e5;
    }
    
    .page-title {
      margin: 0 0 1rem;
      color: var(--accent);
    }
    
    .card {
      padding: 1rem;
      border: 3px solid var(--accent);
      border-radius: 0.5rem;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "custom-property-gotchas",
          kind: "learn",
          title: "Gotchas and how to debug them",
          summary: "The handful of ways a custom property can quietly fail, and a routine for finding the cause.",
          minutes: 9,
          concept: {
            description: "Custom properties fail quietly, because the browser does not check them until the moment they are used. When something looks wrong, nothing is reported, so it helps to know the short list of causes, which covers almost every case.",
            why: "Most of the time you will spend with variables is not writing them but working out why one does not work. A calm checklist turns a confusing afternoon into a two minute job, and it also teaches you to write them in a way that avoids the problems.",
            mentalModel: "Think of detective work. The scene always shows the same few kinds of clue, and once you know them, you look in the right drawers first.",
          },
          body: [
            {
              type: "paragraph",
              text: "The first clue is a typo. A name that is spelt differently in two places, or with different capital letters, is a different property, and `var()` with an unknown name produces nothing. Copy and paste the name rather than typing it, and use the developer tools: a custom property that is not defined shows up as crossed out or missing in the Styles panel.",
            },
            {
              type: "paragraph",
              text: "The second is scope. A variable declared on a card is not visible outside the card, and one declared on a sibling is not visible at all. If you are using a variable and it seems empty, check that the element, or one of its ancestors, really declares it.",
            },
            {
              type: "paragraph",
              text: "The third is the wrong kind of value. If a variable holds `16` and you write `padding: var(--space)`, the number is not a length, so the whole declaration is invalid at that moment. The result is not the fallback and not the previous value, but the property's natural value, which can look like a strange jump.",
            },
            {
              type: "code",
              language: "css",
              code: `:root { --space: 16; }
    
    .bad  { padding: var(--space); }              /* invalid: no unit */
    .good { padding: calc(var(--space) * 1px); }  /* a number turned into a length */`,
            },
            {
              type: "paragraph",
              text: "The fourth is the places a variable cannot go. You cannot use one for a property name, a selector or a media query condition, and you cannot put one inside a `url()` that is written without quotes. When you need a value in one of those places, move the decision elsewhere: change the variable inside a media query, or build the whole URL as a variable on its own.",
            },
            {
              type: "paragraph",
              text: "The fifth is cycles. Two variables that refer to each other, such as `--a: var(--b)` and `--b: var(--a)`, can never be resolved, and both become invalid. It usually happens by accident when you rename things. Using the same name for a parent value and its derived value is a common way to cause it, so keep the names distinct.",
            },
            {
              type: "paragraph",
              text: "When you are stuck, work through the same four questions in order. Is the name exactly the same? Is the variable defined on this element or an ancestor? Is the value valid in the property that uses it? And is anything redefining it somewhere closer to the element? Select the element in your developer tools and look at the Computed panel, which shows the final value of each variable and where it came from.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    themeATrailCardSet,

    /* ------------------------------------------------------------------ */
    {
          id: "custom-properties-quiz",
          kind: "quiz",
          title: "Quiz: custom properties",
          summary: "Seventeen questions on declaring, scope, fallbacks, tokens, themes, calc, JavaScript, @property and debugging.",
          minutes: 12,
          passPercent: 70,
          questions: [
            {
              prompt: "How do you start the name of a custom property?",
              options: ["With a dollar sign", "With two dashes", "With a hash", "With the word `var`"],
              answerIndex: 1,
              explanation: "Custom property names begin with two dashes, such as `--brand`. That is how the browser tells them apart from built-in properties.",
            },
            {
              prompt: "Which line reads a custom property?",
              options: ["`color: --brand;`", "`color: $brand;`", "`color: brand();`", "`color: var(--brand);`"],
              answerIndex: 3,
              explanation: "You read a custom property with `var()`, and put the full name, dashes included, inside the brackets.",
            },
            {
              prompt: "Why is `:root` a common place to declare global custom properties?",
              options: [
                "It is the top element, so every other element can reach the value",
                "It is faster",
                "It is the only place allowed",
                "It makes them read-only",
              ],
              answerIndex: 0,
              explanation: "`:root` is the `html` element. Custom properties inherit, so anything declared there is visible to the whole page.",
            },
            {
              prompt: "`--Brand` and `--brand` are…",
              options: [
                "The same property",
                "Both invalid",
                "Two different properties, because names are case-sensitive",
                "The same, but only in dark mode",
              ],
              answerIndex: 2,
              explanation: "Custom property names are case-sensitive, which is a common cause of values that never apply.",
            },
            {
              prompt: "Which of these can't hold a `var()`?",
              options: ["The value of `padding`", "A property name", "Part of a `box-shadow`", "A `calc()` expression"],
              answerIndex: 1,
              explanation: "You can use `var()` in values, but not to build a property name, a selector or a media query condition.",
            },
            {
              prompt: "What does `var(--x, red)` do when `--x` is not defined?",
              options: ["Uses the previous declaration", "Is invalid", "Uses `initial`", "Uses `red`"],
              answerIndex: 3,
              explanation: "The second argument is the fallback, used only when the variable is not defined.",
            },
            {
              prompt: "`--size: red; width: var(--size);` makes the width…",
              options: [
                "Red",
                "`12rem`, from an earlier declaration",
                "Its natural value, because the declaration is invalid at that moment",
                "The fallback",
              ],
              answerIndex: 2,
              explanation: "The value is checked when it is used. Red is not a width, so the declaration is invalid, and the property takes its natural value, not an earlier one.",
            },
            {
              prompt: "A card sets `--accent: orange`. Which elements can use it?",
              options: ["Only the card and its descendants", "Everything on the page", "Only the card's siblings", "Only the card's parent"],
              answerIndex: 0,
              explanation: "Custom properties inherit downwards, so the card and everything inside it can read the value.",
            },
            {
              prompt: "Which is the best name for a token?",
              options: ["`--indigo-600`", "`--color-brand`", "`--blue`", "`--c1`"],
              answerIndex: 1,
              explanation: "Name by the job rather than the value, so the name stays true if the value changes.",
            },
            {
              prompt: "How can you turn the bare number in `--n: 3` into a length of 3 pixels?",
              options: ["`var(--n)px`", "`px(var(--n))`", "`3 + px`", "`calc(var(--n) * 1px)`"],
              answerIndex: 3,
              explanation: "A bare number is not a length. Multiplying by a unit inside `calc()` makes one.",
            },
            {
              prompt: "How do you change a custom property from JavaScript?",
              options: [
                "`element.style.setProperty(\"--x\", \"10px\")`",
                "`element.setVar(\"--x\")`",
                "`element.css.x = 10`",
                "You cannot",
              ],
              answerIndex: 0,
              explanation: "`setProperty` on an element's `style` writes custom properties, and CSS rules using them respond.",
            },
            {
              prompt: "Why can't you write `@media (min-width: var(--bp))`?",
              options: [
                "`var()` is deprecated",
                "`min-width` does not accept lengths",
                "Media conditions are read before custom properties exist",
                "It would need `!important`",
              ],
              answerIndex: 2,
              explanation: "The conditions of a media query cannot use variables. Redefine the variables inside the media query instead.",
            },
            {
              prompt: "What is a good way to make a layout responsive with custom properties?",
              options: [
                "Repeat every rule in each media query",
                "Redefine a few variables inside a media query",
                "Use `@import`",
                "Use `!important`",
              ],
              answerIndex: 1,
              explanation: "If your sizes are variables, one media query that changes them can adapt the whole page.",
            },
            {
              prompt: "What does `@property` let you do?",
              options: [
                "Rename a built-in property",
                "Import properties from another file",
                "Make a property read-only",
                "Declare a typed custom property with a default, which can also be animated",
              ],
              answerIndex: 3,
              explanation: "A registered property has a syntax, an inheritance setting and an initial value, and the browser can animate it.",
            },
            {
              prompt: "Which approach keeps a button's variants small?",
              options: [
                "A new rule for each variant, with all its properties",
                "Inline styles",
                "Variants that only set the component's variables, such as `--btn-bg`",
                "Copying the button's CSS",
              ],
              answerIndex: 2,
              explanation: "When the base rule reads settings with fallbacks, a variant only sets a few variables.",
            },
            {
              prompt: "A theme is switched by changing `data-theme` on the page. What does the stylesheet need?",
              options: [
                "A rule per theme that redefines the same variables",
                "A copy of every rule for each theme",
                "A new HTML file",
                "JavaScript that sets every colour",
              ],
              answerIndex: 0,
              explanation: "Components read variables, and each theme redefines the values, so nothing else has to change.",
            },
            {
              prompt: "A variable seems empty when you use it. Which is the first thing to check?",
              options: [
                "The browser version",
                "Whether the name matches exactly, and whether an ancestor defines it",
                "The page language",
                "The file size",
              ],
              answerIndex: 1,
              explanation: "Typos, case and scope cause nearly every missing-variable bug. The Computed panel shows where a value comes from.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "custom-properties-review",
          kind: "review",
          title: "Review: custom properties",
          summary: "Declaring, using, scope, fallbacks, tokens, themes, maths, scripts and the checklist for when one does not work.",
          minutes: 4,
          body: [
            {
              type: "paragraph",
              text: "A custom property is a name you invent for a value. You write it with two dashes, declare it in any rule, and read it with `var()`. Declare the global ones on `:root`, where every element can reach them, and keep the names in lowercase, describing the job rather than the value.",
            },
            {
              type: "code",
              language: "css",
              code: `:root {
      --color-brand: #4f46e5;
      --space-3: 1rem;
      --shadow: 0 4px 12px rgb(15 23 42 / 0.15);
    }
    
    .card {
      padding: var(--space-3);
      box-shadow: var(--shadow);
      border-color: var(--color-brand);
    }`,
            },
            {
              type: "paragraph",
              text: "Custom properties inherit, so a value set on an element reaches its descendants, and the nearest definition wins. That is how a single panel, section or button can have its own theme with no new rules inside it. A second argument to `var()` is a fallback, used only when the variable is not defined, and fallbacks can be nested.",
            },
            {
              type: "code",
              language: "css",
              code: `background: var(--btn-bg, var(--color-brand));   /* --btn-bg, then --color-brand */
    width: var(--size);                               /* invalid value: the property gets its natural value */`,
            },
            {
              type: "paragraph",
              text: "You can build values from other values with `calc()`, and a bare number such as `--cols: 3` is a handy dial. A script changes a variable with `element.style.setProperty(\"--x\", \"10px\")` and CSS does the drawing. Themes are sets of redefined variables, switched by an attribute or by `prefers-color-scheme`, and a media query can redefine variables, though it cannot use one in its own condition.",
            },
            {
              type: "code",
              language: "css",
              code: `@property --angle {
      syntax: "<angle>";
      inherits: false;
      initial-value: 0deg;
    }`,
            },
            {
              type: "paragraph",
              text: "`@property` gives a variable a type and a default, and lets it animate. When a variable does not work, check four things in order: the name is spelt and cased exactly the same, an ancestor of the element defines it, the value suits the property that uses it, and nothing closer to the element redefines it.",
            },
          ],
        },
  ],
};

export default content;
