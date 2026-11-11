import type { TopicContent } from "@/engine/types";
import buildALivelyTrailPage from "./transitions/workshops/build-a-lively-trail-page/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
          id: "what-is-a-transition",
          kind: "learn",
          title: "What a transition is",
          summary: "How a property change becomes a smooth journey, and the four ingredients every transition is made from.",
          minutes: 9,
          concept: {
            description: "A **transition** makes a CSS property change gradually instead of instantly. When a property's value changes, for example when `:hover` turns a background from indigo to dark indigo, the browser plays the in-between values over a set amount of time.",
            why: "Without transitions, every state change is a jump cut: a menu appears, a colour flips, a card moves. Jumps make an interface feel brittle and make it hard to see what changed. A short transition shows the eye what moved and where it went, and it costs a few lines of CSS and no JavaScript.",
            mentalModel: "A transition is a dimmer switch instead of a light switch. CSS still decides the start and end values, as it always did. The transition decides how the browser gets from one to the other: how long it takes, how it speeds up and slows down, and which properties take part.",
          },
          body: [
            {
              type: "heading",
              text: "Two states and the journey between them",
            },
            {
              type: "paragraph",
              text: "Every transition needs two things you are probably already writing: a **start state** and an **end state**. A button has a base style, and a `:hover` rule changes some of its properties. That change is the **trigger**. Without a transition, the browser applies the new values on the very next frame. With a transition, the browser remembers the old value, works out a series of in-between values, and shows one of them on each frame until it reaches the end.",
            },
            {
              type: "paragraph",
              text: "You never write the in-between values. You only say **what** should animate and **how**: the properties, the duration, the speed curve and an optional delay. The browser does the arithmetic, which is why transitions are the easiest kind of animation in CSS.",
            },
            {
              type: "code",
              language: "css",
              code: `.btn {
      background-color: #4f46e5;
      transition-property: background-color;
      transition-duration: 0.25s;
    }
    
    .btn:hover {
      background-color: #3730a3;
    }`,
              caption: "The transition lives on the base rule, and :hover only supplies the end value",
            },
            {
              type: "heading",
              text: "The four ingredients",
            },
            {
              type: "list",
              items: [
                "`transition-property`: which properties take part. The default is `all`, meaning every property that can animate.",
                "`transition-duration`: how long the journey takes. The default is `0s`, which means no animation at all.",
                "`transition-timing-function`: the speed curve, such as `ease` or `linear`. The default is `ease`.",
                "`transition-delay`: how long to wait before the journey starts. The default is `0s`.",
              ],
            },
            {
              type: "paragraph",
              text: "Look closely at the default duration. A transition with no duration is an instant change, so writing `transition-property: color` on its own does nothing you can see. Forgetting the duration is the commonest reason a new transition seems broken.",
            },
            {
              type: "heading",
              text: "What counts as a change",
            },
            {
              type: "paragraph",
              text: "A transition runs when the **computed value** of a property changes between two renders. The cause does not matter. It can be a pseudo-class such as `:hover` or `:focus`, a class added by JavaScript, an attribute that changed, or a media query that has just started to match. What the browser watches is the resulting value, not the rule that produced it. If the value is the same before and after, nothing runs.",
            },
            {
              type: "paragraph",
              text: "A transition also cannot run on the very first render of an element, because there is no earlier value to start from. Elements that are on the page when it loads simply appear in their final state.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.link {
      color: #4f46e5;
      transition-property: color;
      transition-duration: 0.2s;
    }`,
                note: "The property is named and the duration is set, so the colour fades.",
              },
              bad: {
                code: `.link {
      color: #4f46e5;
      transition-property: color;
    }`,
                note: "There is no duration, so it defaults to `0s` and the colour still jumps. Naming a property is not enough.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "To see exactly what a transition does, exaggerate it. Set the duration to `2s` while you build, watch which properties move, and shorten it to something sensible afterwards.",
            },
            {
              type: "callout",
              tone: "note",
              text: "This topic writes transitions with the separate longhand properties first, because each one is easier to learn alone. The `transition` shorthand, which packs them into one line, has its own lesson.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "A transition animates a property between two values when the value changes, so the end state still comes from ordinary CSS.",
                "The four ingredients are property, duration, timing function and delay. The duration defaults to `0s`, so you must always set one.",
                "Any change of computed value can trigger a transition: a pseudo-class, a class, an attribute or a media query.",
                "Nothing animates on first render, because there is no earlier value to start from.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "transition-property",
          kind: "learn",
          title: "Choosing which properties transition",
          summary: "`transition-property`: `all`, a list of names, `none`, and why an explicit list beats `all`.",
          minutes: 9,
          concept: {
            description: "`transition-property` names the CSS properties that should animate when they change. It accepts `all` (the default), `none`, or a comma separated list such as `background-color, transform`. Any property not in the list still changes, but it changes instantly.",
            why: "Choosing the list is choosing what the learner's eye follows. Animating the colour and the lift of a card is a deliberate effect. Animating everything is a mess, and `all` also catches changes you never meant to animate, like a width that moves when the window resizes. An explicit list also tells the next reader which properties the design cares about.",
            mentalModel: "The list is a guest list for a party. Every property on it gets to dance when the music starts. Everyone else still arrives and leaves, but they snap in and out without moving. `all` is a party with no guest list: it works, and then someone you did not expect shows up.",
          },
          body: [
            {
              type: "heading",
              text: "A list of exactly what moves",
            },
            {
              type: "paragraph",
              text: "Write the property names after `transition-property`, separated by commas. Use the real property names, not shorthand sums: `background-color` rather than `background` if you only mean the colour, and `border-color` rather than `border` if the width does not change. Each name in the list can have its own duration, timing function and delay, which a later lesson explains.",
            },
            {
              type: "code",
              language: "css",
              code: `.card {
      transition-property: transform, box-shadow;
      transition-duration: 0.3s;
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgb(15 23 42 / 0.15);
      background-color: #eef2ff;   /* not in the list, so it changes instantly */
    }`,
              caption: "The lift and the shadow animate, and the background colour jumps",
            },
            {
              type: "paragraph",
              text: "That last declaration is worth noticing. A property that is not in the list is not blocked. It still changes on hover, but without a journey. This is a common cause of mixed effects, where one part of a component glides while another snaps.",
            },
            {
              type: "heading",
              text: "The values you can use",
            },
            {
              type: "list",
              items: [
                "`all`: every property that can animate takes part. It is the default, and it is short to type.",
                "`none`: nothing animates, whatever the other transition properties say. It is useful to switch a transition off in one place.",
                "A list such as `color, background-color`: only those properties animate.",
                "A custom property name: only works when the property has been registered with `@property`, so the browser knows its type.",
              ],
            },
            {
              type: "heading",
              text: "Why `all` is risky",
            },
            {
              type: "paragraph",
              text: "`all` is attractive because one word covers every case. But a component changes for many reasons, and not all of them are hover effects. A theme switch changes colours. A media query changes widths and font sizes. A layout shift changes positions. With `transition-property: all`, every one of those changes is animated too, and you see panels sliding when the window is resized, or text growing slowly when a breakpoint is crossed.",
            },
            {
              type: "paragraph",
              text: "`all` is fine for a quick experiment, and many designers use it on small elements such as buttons where nothing else changes. When a component grows more complex, replace it with the list of properties you actually mean.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.btn {
      transition-property: background-color, color;
      transition-duration: 0.2s;
    }`,
                note: "Only the two colour changes are animated, so nothing else can surprise you.",
              },
              bad: {
                code: `.btn {
      transition-property: all;
      transition-duration: 0.2s;
    }`,
                note: "`all` also animates anything that changes later: width at a breakpoint, a font size, a layout position. Each one becomes an accidental animation.",
              },
            },
            {
              type: "callout",
              tone: "warning",
              text: "Misspelling a property name does not cause an error. The browser just never matches it, so nothing animates. If a transition does nothing, check the spelling in `transition-property` against the property that changes.",
            },
            {
              type: "callout",
              tone: "tip",
              text: "You can list the same property as the one that changes with its longhands: `margin-top` transitions if only the top margin changes, and `margin` covers all four sides.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "`transition-property` chooses which properties animate. The default is `all`, and `none` turns animation off.",
                "A property that is not in the list still changes, but instantly, which can make an effect look half-finished.",
                "Prefer an explicit list over `all` once a component grows, so unrelated changes do not animate by accident.",
                "A misspelt or missing property name silently does nothing.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "duration-and-delay",
          kind: "learn",
          title: "Duration and delay",
          summary: "How long a transition takes, how long it waits, and the numbers that feel right for interface motion.",
          minutes: 9,
          concept: {
            description: "`transition-duration` sets how long a transition takes, and `transition-delay` sets how long the browser waits before it starts. Both are times, written in seconds (`s`) or milliseconds (`ms`), so `0.25s` and `250ms` are the same.",
            why: "Timing decides whether motion feels crisp or sluggish. A hover that takes a full second makes people wait for the interface, while one that takes 10ms is not noticed at all. Delays are even more powerful: they let you sequence several elements, or ignore a pointer that is only passing across an element on its way somewhere else.",
            mentalModel: "Duration is how long the trip takes by car. Delay is how long you sit in the driveway before you leave. A long trip with no delay feels slow, and a short trip after a long wait feels like nothing happened.",
          },
          body: [
            {
              type: "heading",
              text: "Durations that feel right",
            },
            {
              type: "paragraph",
              text: "There is no single correct duration, but interface motion has a comfortable range. Small, direct feedback such as a colour change on hover feels best between **100 and 200 milliseconds**. Larger movements, such as a panel opening or a card lifting, suit **200 to 400 milliseconds**. Anything above about half a second starts to feel like waiting, unless it is a deliberate, decorative effect. Movements that cover a greater distance can take a little longer than small ones, because the eye needs time to follow them.",
            },
            {
              type: "code",
              language: "css",
              code: `.btn {
      transition-property: background-color;
      transition-duration: 0.15s;     /* small, direct feedback */
    }
    
    .panel {
      transition-property: transform;
      transition-duration: 350ms;     /* a larger movement */
    }`,
              caption: "Seconds and milliseconds are interchangeable",
            },
            {
              type: "heading",
              text: "Units and the zero trap",
            },
            {
              type: "paragraph",
              text: "A time must have a unit. `0.3s` and `300ms` are valid. `0.3` and `300` are not, and the browser drops the whole declaration without a warning, leaving the duration at its default of `0s`. A zero time also needs its unit: `transition-duration: 0` is invalid, while `0s` is correct.",
            },
            {
              type: "heading",
              text: "Delay",
            },
            {
              type: "paragraph",
              text: "`transition-delay` is the pause before the transition begins. During the delay the element keeps its old value, then the journey starts. A small delay of 50 to 150ms is a classic way to avoid accidental triggers. A menu that opens only if the pointer stays for 150ms will not flicker open when the mouse brushes past on its way across the page.",
            },
            {
              type: "paragraph",
              text: "A delay can also be used to build a **stagger**. Give the first item no delay, the second `0.05s`, the third `0.1s`, and the items start one after another, which looks far more natural than everything moving at once. Because a delay applies to the element it is written on, a stagger usually needs a rule for each position, such as `:nth-child(2)`.",
            },
            {
              type: "paragraph",
              text: "A **negative delay** is allowed too. It makes the transition start already part of the way through, as if it had begun earlier. It is rarely needed for transitions, and common for looping animations.",
            },
            {
              type: "list",
              items: [
                "`0.2s`, `200ms`: a short duration for small feedback.",
                "`0s`: no transition. This is the default, and also what you get when a value is invalid.",
                "`0.05s, 0.1s, 0.15s` across items: a stagger, one rule per item.",
                "`-0.1s`: a negative delay, which starts the transition partway through.",
              ],
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.tile {
      transition-property: transform;
      transition-duration: 0.25s;
      transition-delay: 0s;
    }`,
                note: "Units are present on every time, including the zero.",
              },
              bad: {
                code: `.tile {
      transition-property: transform;
      transition-duration: 250;
      transition-delay: 0;
    }`,
                note: "Neither value has a unit, so both declarations are invalid and the duration stays `0s`. The transform will jump.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "Reduce the number of different durations in a design. Pick two or three (say 150ms, 250ms, 400ms) and reuse them. Consistent timing is part of what makes an interface feel designed.",
            },
            {
              type: "callout",
              tone: "warning",
              text: "A delay applies every time the transition runs, in both directions, unless you write a different delay on the hover rule. A long delay on a base rule makes the element feel stuck when the pointer leaves.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Durations are written in `s` or `ms`. Zero needs a unit too, and a missing unit makes the declaration invalid.",
                "Aim for 100 to 200ms for small feedback and 200 to 400ms for larger movement. Over half a second feels slow.",
                "`transition-delay` waits before the journey starts. Use short delays to avoid accidental triggers and to stagger items.",
                "Reuse a small set of durations so the whole interface moves at a consistent pace.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "timing-functions",
          kind: "learn",
          title: "Timing functions and easing",
          summary: "`ease`, `linear`, `ease-in`, `ease-out`, `cubic-bezier()` and `steps()`: shaping the speed of a transition.",
          minutes: 10,
          concept: {
            description: "A **timing function**, also called **easing**, describes how the speed of a transition changes from start to finish. `transition-timing-function` accepts keywords such as `ease`, `linear`, `ease-in`, `ease-out` and `ease-in-out`, a custom curve written as `cubic-bezier()`, or a stepped function such as `steps()`.",
            why: "Two transitions with the same duration can feel completely different. Linear motion looks mechanical, because nothing in the physical world starts and stops at full speed. A good curve makes a menu feel as if it has weight, and a poor one makes it feel as if it is dragging or lurching. Easing is the cheapest way to add polish.",
            mentalModel: "Think of a car pulling away from traffic lights. `linear` is a car that is already at full speed the moment the light turns green. `ease-in` starts slowly and speeds up, `ease-out` starts fast and brakes gently, and `ease-in-out` does both. Most real motion eases out, because things respond quickly and settle gently.",
          },
          body: [
            {
              type: "heading",
              text: "The keywords",
            },
            {
              type: "list",
              items: [
                "`ease` (the default): starts quickly, slows down towards the end. A friendly, general purpose curve.",
                "`linear`: constant speed all the way. It suits things that really do move at a steady speed, such as a progress bar, and feels robotic for most interface motion.",
                "`ease-in`: starts slowly and speeds up. It suits an element that is **leaving**, because it picks up speed as it goes.",
                "`ease-out`: starts fast and slows down. It suits an element that is **arriving** or reacting to a pointer, because it responds at once and then settles.",
                "`ease-in-out`: slow at both ends. It suits something that moves from one place to another on the screen.",
              ],
            },
            {
              type: "paragraph",
              text: "As a rule of thumb, reach for `ease-out` for anything that responds to a click or hover, `ease-in` for things that exit, and `ease-in-out` for things that travel. When in doubt, the default `ease` is a safe choice.",
            },
            {
              type: "code",
              language: "css",
              code: `.menu {
      transition-property: transform;
      transition-duration: 0.3s;
      transition-timing-function: ease-out;
    }
    
    .progress {
      transition-property: width;
      transition-duration: 1s;
      transition-timing-function: linear;
    }`,
              caption: "Each curve suits a different kind of motion",
            },
            {
              type: "heading",
              text: "Custom curves with cubic-bezier()",
            },
            {
              type: "paragraph",
              text: "Every keyword is a shortcut for a **cubic Bézier curve**, defined by four numbers, `cubic-bezier(x1, y1, x2, y2)`. They are the positions of two control points on a graph where the horizontal axis is time and the vertical axis is progress. For example, `ease` is `cubic-bezier(0.25, 0.1, 0.25, 1)`. The two `x` values must be between 0 and 1, or the declaration is invalid. The two `y` values can go outside that range, and that is how you get **overshoot**: `cubic-bezier(0.34, 1.56, 0.64, 1)` goes past the end value and settles back, which gives a springy, playful feel.",
            },
            {
              type: "heading",
              text: "Stepped motion with steps()",
            },
            {
              type: "paragraph",
              text: "`steps(4)` does not glide at all. It jumps in four equal steps, which suits sprite animations and typewriter effects. For ordinary transitions you will rarely want it, and `step-start` and `step-end` are shorthands for a single jump at the start or at the end.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.drawer {
      transition-property: transform;
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
    }`,
                note: "The x values are between 0 and 1, so the curve is valid and ends with a soft landing.",
              },
              bad: {
                code: `.drawer {
      transition-property: transform;
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(1.5, 0, 0.2, 1);
    }`,
                note: "An `x` value of `1.5` is outside the 0 to 1 range, so the whole declaration is invalid and the browser falls back to `ease`.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "Browser DevTools include a curve editor. In the Styles panel, click the small curve icon next to a timing function and drag the handles, and you see the exact `cubic-bezier()` numbers as you go.",
            },
            {
              type: "callout",
              tone: "warning",
              text: "Overshoot curves are fun, but use them sparingly. A little bounce on a small control can feel delightful, and the same bounce on every element of a page is tiring.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "The timing function shapes speed over time. The default is `ease`.",
                "Use `ease-out` for things that respond, `ease-in` for things that leave, `ease-in-out` for things that travel, and `linear` only for steady motion.",
                "`cubic-bezier(x1, y1, x2, y2)` makes a custom curve. The x values must be from 0 to 1, and y values outside 0 to 1 create overshoot.",
                "`steps()` jumps in discrete steps instead of gliding.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "shorthand-and-lists",
          kind: "learn",
          title: "The transition shorthand and comma lists",
          summary: "Packing the four properties into one `transition` declaration, the order that matters, and giving each property its own timing.",
          minutes: 10,
          concept: {
            description: "The **`transition` shorthand** sets the property, duration, timing function and delay in one declaration, for example `transition: background-color 0.2s ease-out`. Several transitions can be listed, separated by commas, so each property can have its own timing.",
            why: "The shorthand is what you will see in almost every stylesheet, so you have to read it fluently. It is also the source of the commonest transition bug: writing the values in a confusing order, or writing a second `transition` rule that silently replaces the first one.",
            mentalModel: "The shorthand is a luggage tag with four boxes: where it is going, how long the trip takes, how fast it travels, and how long it waits. The first time value in the tag is always the duration, and the second is always the delay.",
          },
          body: [
            {
              type: "heading",
              text: "Reading the shorthand",
            },
            {
              type: "paragraph",
              text: "A single transition is made of up to four parts. The browser tells them apart by what they look like, so the order is flexible, with one important exception: the **first time value is the duration, and the second is the delay**. The usual order, and the easiest to read, is property, duration, timing function, delay.",
            },
            {
              type: "code",
              language: "css",
              code: `transition: color 0.2s;                        /* property, duration */
    transition: color 0.2s ease-out;               /* + timing function */
    transition: color 0.2s ease-out 0.1s;          /* + delay */
    transition: all 0.3s;                          /* every property */
    transition: none;                              /* turn transitions off */`,
              caption: "Four forms of the same declaration",
            },
            {
              type: "heading",
              text: "Several transitions at once",
            },
            {
              type: "paragraph",
              text: "Separate transitions with commas. Each entry has its own property, duration, timing function and delay, so a quick colour change and a slower movement can sit in the same element. This is the main reason to prefer the shorthand with a list over `transition-property: all`.",
            },
            {
              type: "code",
              language: "css",
              code: `.card {
      transition:
        background-color 0.15s ease-out,
        transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
        box-shadow 0.3s ease-out;
    }`,
              caption: "Each property has its own duration and curve",
            },
            {
              type: "heading",
              text: "The same thing with longhands",
            },
            {
              type: "paragraph",
              text: "The longhand properties accept comma lists as well, and the lists are matched up by **position**. In `transition-property: color, transform` with `transition-duration: 0.1s, 0.4s`, the first duration belongs to `color` and the second to `transform`. If a list is **shorter** than the property list, the browser repeats it from the start, so a single duration applies to every property. If it is **longer**, the extra values are ignored.",
            },
            {
              type: "code",
              language: "css",
              code: `.card {
      transition-property: background-color, transform;
      transition-duration: 0.15s, 0.4s;
      transition-timing-function: ease-out;   /* one value, used for both */
    }`,
              caption: "The same transitions written as longhands",
            },
            {
              type: "heading",
              text: "A rule that replaces another",
            },
            {
              type: "paragraph",
              text: "The `transition` shorthand is one property, so a later rule that sets it replaces an earlier one completely. If a base rule says `transition: color 0.2s` and a modifier class says `transition: transform 0.3s`, the colour transition is gone. When an element needs different transitions in different states, write the full list again, or use longhands for the parts that change.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.btn {
      transition: background-color 0.2s, transform 0.2s;
    }
    .btn.large {
      transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
    }`,
                note: "The modifier repeats the whole list and adds to it, so nothing is lost.",
              },
              bad: {
                code: `.btn {
      transition: background-color 0.2s, transform 0.2s;
    }
    .btn.large {
      transition: box-shadow 0.2s;
    }`,
                note: "The second `transition` replaces the first, so large buttons lose their colour and transform transitions.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "When you read `transition: opacity 0.3s 0.1s`, count the times. The first, `0.3s`, is the duration, and the second, `0.1s`, is the delay. Two times in a row always mean duration then delay.",
            },
            {
              type: "callout",
              tone: "note",
              text: "Newer browsers also let you add `transition-behavior` to the shorthand, for transitions of properties like `display`. A later lesson covers it.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "`transition: property duration timing-function delay` packs everything into one declaration. The first time is the duration, and the second is the delay.",
                "Separate several transitions with commas so every property gets its own timing.",
                "Longhand lists match up by position, and a short list repeats.",
                "A later `transition` shorthand replaces an earlier one entirely, so repeat the full list when you override it.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "triggers-and-asymmetry",
          kind: "learn",
          title: "Triggers, and why the rule you write it in matters",
          summary: "Hover, focus and class changes as triggers, and how putting the transition on the base rule or the state rule changes the way in and the way out.",
          minutes: 10,
          concept: {
            description: "A transition is **triggered** by a change of value, such as a pseudo-class starting to match or a class being added. A transition uses the transition properties of the element's **new** style, the one it is changing to. So the same transition written on the base rule or on the `:hover` rule behaves differently going in and going out.",
            why: "Most hover effects that seem to \"snap back\" are a misplaced `transition`. Understanding which rule is in charge lets you do useful things on purpose, such as a quick, responsive hover in and a gentle fade out, and it explains the bug where the effect only animates in one direction.",
            mentalModel: "The transition belongs to the room you are walking into. When you walk into the hover room, the hover room's rules decide how you arrive. When you walk back out, the base room's rules decide. If the base room has no transition rule, you teleport home.",
          },
          body: [
            {
              type: "heading",
              text: "What triggers a transition",
            },
            {
              type: "paragraph",
              text: "Anything that changes a computed value can start a transition. The usual triggers are the state pseudo-classes: `:hover` (the pointer is over the element), `:focus` and `:focus-visible` (the element has focus), `:active` (it is being pressed), and `:checked` (a checkbox or radio is on). A class added by JavaScript works just as well, so a menu that gets an `is-open` class can transition without any special code. Media queries that change a value can trigger too, such as when the window is resized across a breakpoint.",
            },
            {
              type: "heading",
              text: "The destination decides",
            },
            {
              type: "paragraph",
              text: "When a value changes, the browser looks at the transition properties of the **after-change** style, the style the element is going to. This one rule explains a lot of behaviour. Move the pointer onto a button, and the button is now in its `:hover` state, so the properties in the hover rule decide how it arrives. Move off again, and it is back in its base state, so the properties in the base rule decide how it leaves.",
            },
            {
              type: "code",
              language: "css",
              code: `.link {
      color: #4f46e5;
    }
    
    .link:hover {
      color: #3730a3;
      transition-property: color;
      transition-duration: 0.2s;
    }`,
              caption: "The colour fades in on hover, but snaps back on the way out",
            },
            {
              type: "paragraph",
              text: "In that example, the base rule has no transition, so when the pointer leaves, the element goes back to a style with a `0s` duration, and the colour jumps. Many people see this and think the transition is broken. It is simply on the wrong side.",
            },
            {
              type: "heading",
              text: "Putting it on the base rule",
            },
            {
              type: "paragraph",
              text: "For a symmetric effect that animates in and out, write the transition on the **base rule**. The hover rule then contains only the end values. This is also the easiest to read, because all the motion for the element sits in one place.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.link {
      color: #4f46e5;
      transition-property: color;
      transition-duration: 0.2s;
    }
    
    .link:hover {
      color: #3730a3;
    }`,
                note: "The transition is on the base rule, so it applies in both directions.",
              },
              bad: {
                code: `.link {
      color: #4f46e5;
    }
    
    .link:hover {
      color: #3730a3;
      transition-property: color;
      transition-duration: 0.2s;
    }`,
                note: "The transition is only on the hover rule, so it plays on the way in. On the way out the base rule has a `0s` duration, so the colour snaps back.",
              },
            },
            {
              type: "heading",
              text: "Different speeds in and out",
            },
            {
              type: "paragraph",
              text: "Sometimes the asymmetry is what you want. A common pattern is a **quick response** and a **gentle release**: the base rule has a slower duration for leaving, and the state rule overrides it with a short one for arriving. The hover feels immediate, because it responds fast, and the fade back feels relaxed.",
            },
            {
              type: "code",
              language: "css",
              code: `.card {
      transform: none;
      transition-property: transform;
      transition-duration: 0.4s;      /* leaving: slow and gentle */
    }
    
    .card:hover {
      transform: translateY(-6px);
      transition-duration: 0.15s;     /* arriving: quick */
    }`,
              caption: "Quick in, slow out",
            },
            {
              type: "callout",
              tone: "warning",
              text: "Hover does not exist on most touch screens, and on some it \"sticks\" after a tap. Do not hide anything essential behind a hover effect, and consider wrapping hover-only styles in `@media (hover: hover)` so they apply only when a real pointer is present.",
            },
            {
              type: "callout",
              tone: "tip",
              text: "`:focus-visible` deserves the same effects as `:hover`. Keyboard users never hover, so an effect that appears only on hover is invisible to them.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "A change of computed value triggers a transition, whatever caused it: a pseudo-class, a class, an attribute or a media query.",
                "The browser uses the transition properties of the style the element is moving **to**.",
                "Put the transition on the base rule for a symmetric effect, and add it to the state rule only when the way in should differ.",
                "A transition written only on `:hover` snaps back when the pointer leaves.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "transition-explorer",
          kind: "visualizer",
          title: "Transition explorer",
          summary: "Hover or click a tile, then change its property list, duration, curve and delay, and watch the journey change.",
          minutes: 9,
          concept: {
            description: "Three tiles change shape, colour and position when you hover or click them. Controls change the four transition properties on the tiles, so you can see how each one changes the journey. A challenge asks you to write a springy transition yourself.",
            why: "Transitions are about feel, and feel is hard to read from code. Moving a slider from 0.1s to 1.5s teaches duration faster than a paragraph, and picking a property that the hover does not change shows you what \"nothing happens\" looks like.",
            mentalModel: "The hover rule is fixed, and it describes where the tile ends up. The transition properties are the dials that decide how the tile gets there. You turn the dials, and the same trip feels completely different.",
          },
          stage: {
            html: `<div class="container">
      <div class="item item-1" tabindex="0">Hover or click me</div>
      <div class="item item-2" tabindex="0">Then me</div>
      <div class="item item-3" tabindex="0">And me</div>
    </div>`,
            baseCss: `html, body { margin: 0; }
    body { padding: 32px 16px 16px; background: #0f172a; font-family: system-ui, sans-serif; }
    .container { display: flex; flex-wrap: wrap; gap: 12px; }
    .item { display: flex; align-items: center; justify-content: center; flex: 1 1 110px; height: 96px; border-radius: 12px; background: #334155; color: #e2e8f0; font-size: 14px; font-weight: 600; text-align: center; cursor: pointer; outline: none; }
    .item:hover, .item:focus { transform: translateY(-14px) rotate(-3deg); background: #6366f1; color: #ffffff; border-radius: 36px; box-shadow: 0 16px 24px rgb(0 0 0 / 0.35); }`,
            annotate: "none",
            target: ".container",
            items: ".item",
            itemCount: 3,
          },
          starter: `.item {
      transition-property: all;
      transition-duration: 0.4s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }
    `,
          controls: [
            {
              id: "property",
              label: "transition-property",
              selector: ".item",
              property: "transition-property",
              fallback: "all",
              type: "options",
              options: ["all", "transform", "background-color", "transform, background-color", "border-radius", "opacity"],
              help: "The hover changes transform, colour, radius and shadow. Pick `opacity` and nothing animates, because opacity never changes.",
            },
            {
              id: "duration",
              label: "transition-duration",
              selector: ".item",
              property: "transition-duration",
              fallback: "0s",
              type: "range",
              min: 0,
              max: 2,
              step: 0.1,
              unit: "s",
              help: "At `0s` there is no journey at all.",
            },
            {
              id: "timing",
              label: "transition-timing-function",
              selector: ".item",
              property: "transition-timing-function",
              fallback: "ease",
              type: "options",
              options: ["ease", "linear", "ease-in", "ease-out", "ease-in-out", "cubic-bezier(0.34, 1.56, 0.64, 1)"],
              help: "The last one overshoots, so the tile goes past its end value and settles back.",
            },
            {
              id: "delay",
              label: "transition-delay",
              selector: ".item",
              property: "transition-delay",
              fallback: "0s",
              type: "range",
              min: 0,
              max: 1,
              step: 0.05,
              unit: "s",
              help: "Applies to every tile, in both directions.",
            },
            {
              id: "stagger",
              label: "Delay for the selected tile",
              selector: ".item-{item}",
              property: "transition-delay",
              fallback: "0s",
              type: "range",
              min: 0,
              max: 1,
              step: 0.05,
              unit: "s",
              help: "Select a tile, then give it its own delay to build a stagger.",
            },
          ],
          presets: [
            {
              id: "snappy",
              label: "Snappy",
              description: "short and ease-out",
              css: ".item { transition-duration: 0.15s; transition-timing-function: ease-out; }",
            },
            {
              id: "floaty",
              label: "Slow and floaty",
              description: "long and ease-in-out",
              css: ".item { transition-duration: 1.2s; transition-timing-function: ease-in-out; }",
            },
            {
              id: "spring",
              label: "Springy",
              description: "overshoot curve",
              css: ".item { transition-duration: 0.6s; transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }",
            },
            {
              id: "stagger",
              label: "Stagger",
              description: "delays of 0.1s and 0.2s",
              css: `.item-2 { transition-delay: 0.1s; }
    .item-3 { transition-delay: 0.2s; }`,
            },
            {
              id: "colour",
              label: "Only the colour",
              description: "the shape and position jump",
              css: ".item { transition-property: background-color; }",
            },
          ],
          challenge: {
            title: "Make the tiles spring",
            description: "Change the `.item` rule so that the tiles animate only `transform, background-color` (the shape and shadow will jump), take `0.6s`, and use the overshoot curve `cubic-bezier(0.34, 1.56, 0.64, 1)`. Write the longhand properties exactly as shown.",
            hints: [
              "Edit the three declarations in the `.item` rule. You can also use the controls, which write the same CSS.",
              "The property list is `transform, background-color`, with a comma and a space between the two names.",
              "`.item { transition-property: transform, background-color; transition-duration: 0.6s; transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".item",
                property: "transition-property",
                expected: ["transform, background-color"],
                message: "The tiles animate only `transform, background-color`.",
              },
              {
                type: "computedStyle",
                selector: ".item",
                property: "transition-duration",
                expected: ["0.6s", "600ms"],
                message: "...and take `0.6s`.",
              },
              {
                type: "computedStyle",
                selector: ".item",
                property: "transition-timing-function",
                expected: ["cubic-bezier(0.34, 1.56, 0.64, 1)"],
                message: "...with the overshoot curve.",
              },
            ],
            solution: `.item {
      transition-property: transform, background-color;
      transition-duration: 0.6s;
      transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
      transition-delay: 0s;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-what-animates",
          kind: "predict",
          title: "Predict what animates",
          summary: "A card changes three things on hover but only lists two of them. Work out what glides, what jumps and how long each takes.",
          minutes: 7,
          mode: "css",
          intro: "A card changes three properties on hover, and the transition properties list only some of them, with two different durations. Predict what happens, then run the code and hover over the card.",
          code: {
            html: `<div class="card">
      <h2>Trail map</h2>
      <p>Hover over this card.</p>
    </div>`,
            css: `body {
      margin: 0;
      padding: 2.5rem 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .card {
      width: 14rem;
      padding: 1.25rem;
      border-radius: 0.75rem;
      background-color: #e0e7ff;
      box-shadow: 0 1px 2px rgb(15 23 42 / 0.1);
      transition-property: background-color, transform;
      transition-duration: 0.3s, 0.6s;
      transition-timing-function: ease-out;
    }
    
    .card h2 {
      margin: 0 0 0.5rem;
    }
    
    .card:hover {
      background-color: #c7d2fe;
      transform: translateY(-8px);
      box-shadow: 0 16px 32px rgb(15 23 42 / 0.25);
    }`,
          },
          questions: [
            {
              prompt: "When the pointer enters the card, which of the three changes does NOT glide?",
              options: ["The background colour", "The upward movement", "The shadow", "All three glide"],
              answerIndex: 2,
              hint: "Compare the list in `transition-property` with the three properties the hover rule changes.",
              explanation: "`transition-property` names `background-color` and `transform`. The shadow changes too, but it is not in the list, so it jumps to its new value instantly.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".card",
                  property: "transition-property",
                  expected: ["background-color, transform"],
                  message: "Only the colour and the transform are listed.",
                },
              ],
            },
            {
              prompt: "How long does the upward movement take?",
              options: ["0.3 seconds", "0.6 seconds", "0.9 seconds", "It has no duration, so it jumps"],
              answerIndex: 1,
              hint: "Lists are matched up by position: the first duration belongs to the first property.",
              explanation: "The durations are `0.3s, 0.6s` and the properties are `background-color, transform`. The second duration pairs with the second property, so the lift takes `0.6s` and the colour takes `0.3s`.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".card",
                  property: "transition-duration",
                  expected: ["0.3s, 0.6s", "0.3s,0.6s"],
                  message: "The durations are 0.3s and 0.6s.",
                },
              ],
            },
            {
              prompt: "The pointer leaves the card. What happens to the background colour?",
              options: [
                "It snaps back at once",
                "It fades back over 0.3 seconds, because the transition is on the base rule",
                "It waits 0.6 seconds, then snaps",
                "It stays at the hover colour",
              ],
              answerIndex: 1,
              hint: "Which rule has the transition properties: the base rule, or the hover rule?",
              explanation: "When the pointer leaves, the card returns to its base style, and the base style is where the transition is written. So the colour fades back with the same `0.3s` journey, and so does the lift.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".card",
                  property: "transition-property",
                  expected: ["background-color, transform"],
                  message: "The transition is declared on the base rule.",
                },
              ],
            },
            {
              prompt: "Which timing function does the lift use?",
              options: [
                "`ease`, the default",
                "`linear`",
                "`ease-out`, shared with the colour",
                "None, because only one value was given",
              ],
              answerIndex: 2,
              hint: "A list that is shorter than the property list repeats from the start.",
              explanation: "There is one timing function for two properties, so the list repeats and `ease-out` applies to both.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".card",
                  property: "transition-timing-function",
                  expected: ["ease-out", "ease-out, ease-out"],
                  message: "One `ease-out` value is shared.",
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-button-feedback",
          kind: "lab",
          title: "Lab: make a button feel responsive",
          mode: "css",
          summary: "The hover and pressed styles already exist but they jump. Add a transition on the base rule with the right properties, duration and curve.",
          minutes: 10,
          starter: {
            html: "<button class=\"btn\" type=\"button\">Save route</button>",
            css: `body {
      margin: 0;
      padding: 2rem;
      font-family: system-ui, sans-serif;
    }
    
    .btn {
      padding: 0.7rem 1.4rem;
      border: 0;
      border-radius: 0.5rem;
      background-color: #4f46e5;
      color: #ffffff;
      font: inherit;
      font-weight: 600;
    }
    
    .btn:hover {
      background-color: #3730a3;
      transform: translateY(-2px);
    }
    
    .btn:active {
      transform: translateY(0) scale(0.98);
    }
    `,
          },
          challenge: {
            title: "Smooth the button's feedback",
            description: "The button already changes colour and lifts on hover, and presses down when active, but every change jumps. Add the transition to the **base** `.btn` rule, using the longhand properties, so it animates in both directions. The hover and active rules are not auto-checked, because the checks cannot hover, so try them in the preview.",
            hints: [
              "Four declarations go inside the `.btn` rule, not the `:hover` rule.",
              "The property list needs both things that change: `background-color, transform`. Without a duration, nothing will move.",
              "`transition-property: background-color, transform; transition-duration: 0.2s; transition-timing-function: ease-out; cursor: pointer;`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".btn",
                property: "transition-property",
                expected: ["background-color, transform", "transform, background-color"],
                message: "The button transitions `background-color` and `transform`.",
              },
              {
                type: "computedStyle",
                selector: ".btn",
                property: "transition-duration",
                expected: ["0.2s", "200ms"],
                message: "...over `0.2s`",
              },
              {
                type: "computedStyle",
                selector: ".btn",
                property: "transition-timing-function",
                expected: ["ease-out"],
                message: "...with `ease-out`.",
              },
              {
                type: "computedStyle",
                selector: ".btn",
                property: "cursor",
                expected: ["pointer"],
                message: "The button shows the `pointer` cursor.",
              },
            ],
            solution: {
              html: "<button class=\"btn\" type=\"button\">Save route</button>",
              css: `body {
      margin: 0;
      padding: 2rem;
      font-family: system-ui, sans-serif;
    }
    
    .btn {
      padding: 0.7rem 1.4rem;
      border: 0;
      border-radius: 0.5rem;
      background-color: #4f46e5;
      color: #ffffff;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      transition-property: background-color, transform;
      transition-duration: 0.2s;
      transition-timing-function: ease-out;
    }
    
    .btn:hover {
      background-color: #3730a3;
      transform: translateY(-2px);
    }
    
    .btn:active {
      transform: translateY(0) scale(0.98);
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-snaps-back",
          kind: "debug",
          title: "Debug: the hover that snaps back",
          mode: "css",
          summary: "The links fade in on hover, but jump back the moment the pointer leaves. Find out why the way out has no transition.",
          minutes: 7,
          broken: {
            html: `<nav class="nav">
      <a class="nav-link" href="#">Routes</a>
      <a class="nav-link" href="#">Gear</a>
      <a class="nav-link" href="#">Stories</a>
    </nav>`,
            css: `body {
      margin: 0;
      padding: 2rem;
      font-family: system-ui, sans-serif;
    }
    
    .nav {
      display: flex;
      gap: 0.5rem;
    }
    
    .nav-link {
      padding: 0.45rem 0.8rem;
      border-radius: 0.5rem;
      color: #475569;
      text-decoration: none;
    }
    
    .nav-link:hover {
      background-color: #eef2ff;
      color: #4f46e5;
      transition-property: color, background-color;
      transition-duration: 0.25s;
    }
    `,
          },
          challenge: {
            title: "Make the links fade both ways",
            description: "Hovering a link fades it to indigo, which looks good, but moving the pointer away makes it snap back to grey instantly. Fix it so that the colour and background fade in **and** out, taking `0.25s`.",
            hints: [
              "Use the explain panel, then think about which rule is in charge when the pointer leaves: the base rule or the hover rule?",
              "The transition is written only in the `:hover` rule. When the pointer leaves, the link is back in its base style, which has no transition.",
              "Move `transition-property: color, background-color;` and `transition-duration: 0.25s;` into the `.nav-link` rule.",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".nav-link",
                property: "transition-property",
                expected: ["color, background-color"],
                message: "The base `.nav-link` rule transitions `color` and `background-color`.",
              },
              {
                type: "computedStyle",
                selector: ".nav-link",
                property: "transition-duration",
                expected: ["0.25s", "250ms"],
                message: "...over `0.25s`, so the way back animates too.",
              },
            ],
            solution: {
              html: `<nav class="nav">
      <a class="nav-link" href="#">Routes</a>
      <a class="nav-link" href="#">Gear</a>
      <a class="nav-link" href="#">Stories</a>
    </nav>`,
              css: `body {
      margin: 0;
      padding: 2rem;
      font-family: system-ui, sans-serif;
    }
    
    .nav {
      display: flex;
      gap: 0.5rem;
    }
    
    .nav-link {
      padding: 0.45rem 0.8rem;
      border-radius: 0.5rem;
      color: #475569;
      text-decoration: none;
      transition-property: color, background-color;
      transition-duration: 0.25s;
    }
    
    .nav-link:hover {
      background-color: #eef2ff;
      color: #4f46e5;
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "what-can-animate",
          kind: "learn",
          title: "What can and cannot be animated",
          summary: "Interpolable properties, the ones that jump, and the honest reasons `display` and `height: auto` do not tween.",
          minutes: 10,
          concept: {
            description: "A property can transition only if the browser knows how to calculate values **between** its start and end. Numbers, lengths, percentages, colours, shadows and transforms can all be calculated this way, and the browser calls this **interpolation**. Keyword-like properties such as `display` or `font-family` have no in-between values, so they change instantly.",
            why: "Most \"my transition does nothing\" questions have the same answer: the property is not animatable, or one of its two values is a keyword the browser cannot calculate with. Knowing the families of properties that can and cannot animate saves a great deal of guessing, and it tells you which workaround to reach for.",
            mentalModel: "Interpolation is a ruler. If the start and end are both marks on the ruler, such as 10px and 20px, the browser can find every mark in between. If one end is a word, such as `auto`, there is no mark to measure from, and the browser can only jump.",
          },
          body: [
            {
              type: "heading",
              text: "Properties that animate well",
            },
            {
              type: "list",
              items: [
                "**Colours:** `color`, `background-color`, `border-color`, `outline-color`, `text-decoration-color`. The browser blends the red, green and blue channels.",
                "**Lengths and percentages:** `width`, `height`, `margin`, `padding`, `top`, `left`, `font-size`, `border-radius`, `gap` and `letter-spacing`.",
                "**Numbers:** `opacity`, `line-height` (when unitless), `flex-grow` and `z-index`.",
                "**Transforms:** `transform` and the individual `translate`, `scale` and `rotate` properties.",
                "**Shadows and filters:** `box-shadow`, `text-shadow`, `filter` and `backdrop-filter`, as long as both values have the same shape.",
                "**Tracks:** `grid-template-rows` and `grid-template-columns`, in current browsers, when the two lists have the same number of tracks.",
              ],
            },
            {
              type: "code",
              language: "css",
              code: `.chip {
      background-color: #e0e7ff;
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
      transition-property: background-color, border-radius, padding;
      transition-duration: 0.25s;
    }
    
    .chip:hover {
      background-color: #4f46e5;
      border-radius: 999px;
      padding: 0.25rem 1rem;
    }`,
              caption: "A colour, a length and a shorthand of lengths all animate",
            },
            {
              type: "heading",
              text: "Properties that jump",
            },
            {
              type: "paragraph",
              text: "Some properties only have a list of named options, and there is no halfway point between two options. `display: none` to `display: block`, `position: static` to `fixed`, and `font-family: serif` to `sans-serif` all change in a single frame. A background that is an **image or a gradient** also generally jumps, because browsers do not blend `background-image` values. A common workaround is to place the gradient on a larger background and animate `background-position`, or to fade the opacity of a pseudo-element that carries the second gradient.",
            },
            {
              type: "heading",
              text: "The `auto` problem",
            },
            {
              type: "paragraph",
              text: "The most common surprise is `height: auto`. A box sized by its content has no number to start from, so `height: 0` to `height: auto` jumps. There are a few ways around it. You can animate between two **real** numbers, such as `max-height: 0` to `max-height: 20rem`, and accept that the timing is based on the larger number. You can animate a grid row from `0fr` to `1fr`, which does give a smooth result for content of any height. Newer browsers also offer `interpolate-size: allow-keywords`, which lets sizes animate to and from `auto`, but support is still growing, so check it before relying on it.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.panel {
      max-height: 0;
      overflow: hidden;
      transition-property: max-height;
      transition-duration: 0.3s;
    }
    .panel.open {
      max-height: 20rem;
    }`,
                note: "Both values are real lengths, so the browser can interpolate between them.",
              },
              bad: {
                code: `.panel {
      height: 0;
      overflow: hidden;
      transition-property: height;
      transition-duration: 0.3s;
    }
    .panel.open {
      height: auto;
    }`,
                note: "`auto` is a keyword, not a number. The panel pops open in one frame, and the transition never shows.",
              },
            },
            {
              type: "callout",
              tone: "note",
              text: "`visibility` is a special case. It does animate, but in a stepped way: when going to `visible` it flips at the start, and when going to `hidden` it flips at the end, so the element stays visible while it fades. That is why `opacity` plus `visibility` is a classic way to fade something out.",
            },
            {
              type: "callout",
              tone: "tip",
              text: "To check whether a property animates, look it up on MDN. Each property page has an \"Animation type\" line, such as \"a length\" or \"discrete\". Discrete means it jumps.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Colours, lengths, numbers, transforms, shadows and filters can be interpolated, so they transition smoothly.",
                "Keyword properties such as `display` and `font-family`, and usually `background-image`, change instantly.",
                "`height: auto` cannot animate. Use two real numbers, a `0fr` to `1fr` grid row, or `interpolate-size` where it is supported.",
                "Check the \"Animation type\" on MDN when a transition does nothing.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "transform-opacity-performance",
          kind: "learn",
          title: "Smooth by design: transform, opacity and performance",
          summary: "Why moving things with `transform` and `opacity` stays smooth, why `top` and `width` do not, and a first look at `will-change`.",
          minutes: 10,
          concept: {
            description: "Every animated frame the browser may have to recalculate the layout, repaint pixels and composite layers. **`transform` and `opacity`** can be handled by the **compositor**, the last stage, without redoing layout or paint, so they stay smooth even on modest devices. Properties such as `width`, `top` and `margin` force the browser back to the start of that pipeline on every frame.",
            why: "A hover effect that stutters is worse than no effect. Phones and older laptops have little spare time in a 16-millisecond frame, and a transition that triggers layout on every frame can drop below 60 frames per second. Choosing the right property is often the entire difference between a smooth interface and a janky one.",
            mentalModel: "Think of a stage. Moving a spotlight across the stage (transform) is cheap, and the set stays where it is. Rebuilding the set every frame (changing width or margin) means all the actors have to find their marks again. Both can produce the same picture, but one is far more work.",
          },
          body: [
            {
              type: "heading",
              text: "Three stages of rendering",
            },
            {
              type: "paragraph",
              text: "To put a frame on the screen, the browser works in three stages. **Layout** works out the size and position of every box. **Paint** fills in the pixels: colours, text, borders and shadows. **Compositing** stacks the painted layers and draws them in the right order. Changing `width` forces layout, then paint, then compositing. Changing `background-color` or `box-shadow` skips layout but still repaints. Changing `transform` or `opacity` on a layer that is already painted can skip both and go straight to compositing.",
            },
            {
              type: "heading",
              text: "Move with transform, not with position",
            },
            {
              type: "paragraph",
              text: "To move an element 20 pixels to the right, you could animate `left` or `margin-left`, but the moves would change the layout, so everything near it has to be recalculated. `transform: translateX(20px)` shifts the element visually without changing where the layout thinks it is, so neighbours stay put and the browser only has to composite. The same idea works for size: `transform: scale(1.05)` grows a card without changing the layout, while `width` and `height` push other content around.",
            },
            {
              type: "code",
              language: "css",
              code: `.card {
      transition-property: transform, opacity;
      transition-duration: 0.25s;
    }
    
    .card:hover {
      transform: translateY(-6px) scale(1.02);   /* cheap */
    }
    
    /* costly: each frame changes the layout */
    .card--slow:hover {
      margin-top: -6px;
      width: 102%;
    }`,
              caption: "The first rule composites, and the second recalculates layout",
            },
            {
              type: "heading",
              text: "A word about will-change",
            },
            {
              type: "paragraph",
              text: "`will-change: transform` tells the browser ahead of time that an element is about to move, so it can prepare a layer for it. It sounds like a free speed-up, but each layer uses memory, and too many can slow a page down. Use it only on elements that really animate, only when you can measure a problem, and prefer to add it just before an animation (with JavaScript or a state class) rather than leaving it on everything.",
            },
            {
              type: "list",
              items: [
                "**Cheap:** `transform`, `opacity` (and, in many browsers, `filter`).",
                "**Repaint only:** `color`, `background-color`, `box-shadow`, `border-color`.",
                "**Layout:** `width`, `height`, `top`, `left`, `margin`, `padding`, `font-size`, `border-width`.",
              ],
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.drawer {
      transform: translateX(-100%);
      transition-property: transform;
      transition-duration: 0.3s;
    }
    .drawer.open {
      transform: translateX(0);
    }`,
                note: "Moves the panel on the compositor and leaves the layout alone.",
              },
              bad: {
                code: `.drawer {
      left: -320px;
      transition-property: left;
      transition-duration: 0.3s;
    }
    .drawer.open {
      left: 0;
    }`,
                note: "Changes layout on every frame of the animation. It works, but it is more likely to stutter, especially on phones.",
              },
            },
            {
              type: "callout",
              tone: "warning",
              text: "A `transform` other than `none` has side effects. It creates a new stacking context and becomes the reference point for descendants with `position: fixed`. If a fixed element inside a transformed card suddenly sits in the wrong place, this is why.",
            },
            {
              type: "callout",
              tone: "note",
              text: "`transform` has no effect on plain inline elements, such as a `span` or an `a` in a line of text. Give them `display: inline-block` first.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "`transform` and `opacity` can skip layout and paint, so they animate smoothly even on weak devices.",
                "Move things with `transform: translate()` and resize them with `transform: scale()` instead of animating `top`, `left`, `width` or `height`.",
                "`box-shadow` and colours repaint but do not re-layout, so they are fine for small elements.",
                "Use `will-change` sparingly, and remember that a transform creates a stacking context.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "colors-shadows-sizes",
          kind: "learn",
          title: "Everyday effects: colours, shadows, underlines and reveals",
          summary: "Recipes for the transitions you will write most often, from hover colours to a smooth accordion.",
          minutes: 10,
          concept: {
            description: "A handful of transitions cover most interfaces: a colour change on hover, a lift with a shadow, an underline that grows, an icon that rotates, and a panel that opens. Each one is a small pattern with a base state, an end state and a transition on the base rule.",
            why: "Knowing the patterns means you do not start from nothing each time. You also learn their traps, such as a shadow that jumps because only one side has one, or an accordion that cannot animate to `auto`. These recipes use everything from the earlier lessons.",
            mentalModel: "A kitchen has a short list of techniques that make hundreds of recipes. Transitions are the same. Learn to fade a colour, lift a card, grow an underline and fold open a panel, and you have most of the menu.",
          },
          body: [
            {
              type: "heading",
              text: "Colour and underline",
            },
            {
              type: "paragraph",
              text: "Colour changes are the simplest effect, and they also repaint without relayout, so they are cheap. Transition the property that actually changes (`color`, `background-color` or `border-color`), and keep the duration short. A link underline is a nice upgrade. Keep the underline always present, but make its colour `transparent` at rest, and transition `text-decoration-color` to the real colour on hover. Because the underline is always there, it does not shift the text.",
            },
            {
              type: "code",
              language: "css",
              code: `.nav-link {
      color: #475569;
      text-decoration-line: underline;
      text-decoration-color: transparent;
      text-underline-offset: 0.3em;
      transition-property: color, text-decoration-color;
      transition-duration: 0.2s;
    }
    
    .nav-link:hover {
      color: #4f46e5;
      text-decoration-color: currentColor;
    }`,
              caption: "The underline fades in without moving the text",
            },
            {
              type: "heading",
              text: "Lift and shadow",
            },
            {
              type: "paragraph",
              text: "A card that lifts gently on hover feels tactile. Move it up with `translateY`, and strengthen its shadow. `box-shadow` blends smoothly between two shadows, so give the card a quiet shadow at rest rather than none. It looks better, because the card already has some depth before the pointer arrives, and the change then reads as the card rising towards you.",
            },
            {
              type: "code",
              language: "css",
              code: `.card {
      box-shadow: 0 1px 2px rgb(15 23 42 / 0.08);
      transition-property: transform, box-shadow;
      transition-duration: 0.3s;
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 28px rgb(15 23 42 / 0.16);
    }`,
            },
            {
              type: "heading",
              text: "Rotate an icon",
            },
            {
              type: "paragraph",
              text: "A chevron that turns when a section opens is a small effect that explains the state. Animate `transform: rotate(180deg)`. Remember that an inline element will not rotate, so give the icon `display: inline-block`, and check where it spins from: the default `transform-origin` is the centre, which is usually what you want.",
            },
            {
              type: "heading",
              text: "Fold open a panel",
            },
            {
              type: "paragraph",
              text: "To open a panel with content of unknown height, use a grid. Make the panel `display: grid` with `grid-template-rows: 0fr`, put the content in one child with `overflow: hidden`, and change the row to `1fr` when it opens. The row grows from nothing to the height of the content, with no guessing. This is more reliable than `max-height`, because the timing matches the real height.",
            },
            {
              type: "code",
              language: "css",
              code: `.panel {
      display: grid;
      grid-template-rows: 0fr;
      transition-property: grid-template-rows;
      transition-duration: 0.3s;
    }
    
    .panel.open {
      grid-template-rows: 1fr;
    }
    
    .panel-inner {
      overflow: hidden;
    }`,
              caption: "The row animates from nothing to the content's own height",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.nav-link {
      text-decoration-line: underline;
      text-decoration-color: transparent;
      transition-property: text-decoration-color;
      transition-duration: 0.2s;
    }
    .nav-link:hover {
      text-decoration-color: currentColor;
    }`,
                note: "The underline is always there and only its colour changes, so it fades in smoothly.",
              },
              bad: {
                code: `.nav-link {
      text-decoration-line: none;
      transition-property: text-decoration-line;
      transition-duration: 0.2s;
    }
    .nav-link:hover {
      text-decoration-line: underline;
    }`,
                note: "`text-decoration-line` has no in-between values, so the underline jumps in, whatever the duration says.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "Put the hover and focus styles in one rule: `.card:hover, .card:focus-within { ... }`. That way mouse and keyboard users get the same effect.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "Transition the single property that changes, and keep colour effects short.",
                "Keep an underline at rest with a transparent colour, and animate `text-decoration-color`, so the text does not move.",
                "Give a card a quiet shadow at rest, so the hover shadow reads as the card rising.",
                "Animate a panel's height with a grid row from `0fr` to `1fr`, and rotate icons with `display: inline-block`.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "easing-race",
          kind: "visualizer",
          title: "Easing race",
          summary: "Four lanes, four timing functions, one finish line. Hover the lanes and compare how each curve spends its time.",
          minutes: 8,
          concept: {
            description: "Four squares travel the same distance in the same time, and each lane uses a different timing function. Hover or click the lanes, then change the curves and the duration to see how the shape of a curve changes the feel of identical motion.",
            why: "On paper, `ease-in` and `ease-out` look like opposites, but you only understand them by watching them race. Seeing a linear square arrive at the same moment as an eased one, yet look completely different in between, is the whole lesson of easing.",
            mentalModel: "Every square has the same start, finish and total time. The timing function only decides how the time is spent: slow at the start, slow at the end, or even all the way through. Overshoot curves spend a moment past the finish line.",
          },
          stage: {
            html: `<div class="container" tabindex="0">
      <div class="lane"><div class="item item-1">1</div></div>
      <div class="lane"><div class="item item-2">2</div></div>
      <div class="lane"><div class="item item-3">3</div></div>
      <div class="lane"><div class="item item-4">4</div></div>
    </div>`,
            baseCss: `html, body { margin: 0; }
    body { padding: 16px; background: #0f172a; font-family: system-ui, sans-serif; }
    .container { display: grid; gap: 10px; outline: none; cursor: pointer; }
    .lane { padding: 6px; border-radius: 10px; background: #1e293b; }
    .item { display: flex; align-items: center; justify-content: center; width: 56px; height: 36px; border-radius: 8px; background: #6366f1; color: #ffffff; font-size: 13px; font-weight: 700; }
    .item-2 { background: #0ea5e9; }
    .item-3 { background: #10b981; }
    .item-4 { background: #f59e0b; color: #1e293b; }
    .container:hover .item, .container:focus .item { transform: translateX(min(260px, calc(100vw - 140px))); }`,
            annotate: "none",
            target: ".container",
            items: ".item",
            itemCount: 4,
          },
          starter: `.item {
      transition-property: transform;
      transition-duration: 1.6s;
    }
    
    .item-1 {
      transition-timing-function: linear;
    }
    
    .item-2 {
      transition-timing-function: ease;
    }
    
    .item-3 {
      transition-timing-function: ease-in;
    }
    
    .item-4 {
      transition-timing-function: ease-out;
    }
    `,
          controls: [
            {
              id: "duration",
              label: "Duration for every lane",
              selector: ".item",
              property: "transition-duration",
              fallback: "1.6s",
              type: "range",
              min: 0.4,
              max: 4,
              step: 0.2,
              unit: "s",
              help: "All four squares share this duration, so they finish together.",
            },
            {
              id: "curve",
              label: "Timing function for the selected lane",
              selector: ".item-{item}",
              property: "transition-timing-function",
              fallback: "ease",
              type: "options",
              options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "cubic-bezier(0.34, 1.56, 0.64, 1)", "steps(5, end)"],
              help: "Select a lane, then pick a curve. `steps(5, end)` jumps in five equal steps.",
            },
          ],
          presets: [
            {
              id: "linear",
              label: "All linear",
              description: "the baseline",
              css: `.item-1 { transition-timing-function: linear; }
    .item-2 { transition-timing-function: linear; }
    .item-3 { transition-timing-function: linear; }
    .item-4 { transition-timing-function: linear; }`,
            },
            {
              id: "overshoot",
              label: "Overshoot on lane 3",
              description: "cubic-bezier with y above 1",
              css: ".item-3 { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }",
            },
            {
              id: "steps",
              label: "Stepped on lane 4",
              description: "five jumps",
              css: ".item-4 { transition-timing-function: steps(5, end); }",
            },
          ],
          challenge: {
            title: "Slow it down and add a spring",
            description: "Set the duration of every lane (the `.item` rule) to `2s`. Give lane 1 the overshoot curve `cubic-bezier(0.34, 1.56, 0.64, 1)`, and make lane 2 `ease-in-out`.",
            hints: [
              "You need to edit three declarations: one in `.item`, and one each in `.item-1` and `.item-2`.",
              "The duration is `2s` and belongs in the `.item` rule, so that every lane changes at once.",
              "`.item-1 { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }` and `.item-2 { transition-timing-function: ease-in-out; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".item",
                property: "transition-duration",
                expected: ["2s", "2000ms"],
                message: "Every lane takes `2s`.",
              },
              {
                type: "computedStyle",
                selector: ".item-1",
                property: "transition-timing-function",
                expected: ["cubic-bezier(0.34, 1.56, 0.64, 1)"],
                message: "Lane 1 uses the overshoot curve.",
              },
              {
                type: "computedStyle",
                selector: ".item-2",
                property: "transition-timing-function",
                expected: ["ease-in-out"],
                message: "Lane 2 uses `ease-in-out`.",
              },
            ],
            solution: `.item {
      transition-property: transform;
      transition-duration: 2s;
    }
    
    .item-1 {
      transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    .item-2 {
      transition-timing-function: ease-in-out;
    }
    
    .item-3 {
      transition-timing-function: ease-in;
    }
    
    .item-4 {
      transition-timing-function: ease-out;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-card-lift",
          kind: "lab",
          title: "Lab: a staggered card lift",
          mode: "css",
          summary: "Animate the transform and the shadow of three cards with a custom curve, then stagger the cards with delays.",
          minutes: 12,
          starter: {
            html: `<ul class="cards">
      <li class="card"><h2>Riverside loop</h2><p>4 km, flat and shaded.</p></li>
      <li class="card"><h2>Lake path</h2><p>7 km, gentle climbs.</p></li>
      <li class="card"><h2>Ridge scramble</h2><p>9 km, steep and exposed.</p></li>
    </ul>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      background-color: #f1f5f9;
      font-family: system-ui, sans-serif;
    }
    
    .cards {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin: 0;
      padding: 1rem 0;
      list-style: none;
    }
    
    .card {
      flex: 1 1 9rem;
      padding: 1rem;
      border-radius: 0.75rem;
      background-color: #ffffff;
      box-shadow: 0 1px 2px rgb(15 23 42 / 0.1);
    }
    
    .card h2 {
      margin: 0 0 0.4rem;
      font-size: 1.05rem;
    }
    
    .card p {
      margin: 0;
      color: #475569;
      font-size: 0.9rem;
    }
    
    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 28px rgb(15 23 42 / 0.18);
    }
    `,
          },
          challenge: {
            title: "Make the cards lift smoothly, one after the other",
            description: "The cards already lift and gain a stronger shadow on hover, but with a jump. On the base `.card` rule, transition `transform` and `box-shadow` over `0.3s` with the curve `cubic-bezier(0.2, 0.8, 0.2, 1)`. Then give the second card a `0.05s` delay and the third card a `0.1s` delay, so the lifts ripple across the row. Use the longhand properties.",
            hints: [
              "Put the first three declarations in `.card`. The delays need two new rules, using `.card:nth-child(2)` and `.card:nth-child(3)`.",
              "Write the list as `transform, box-shadow`. The curve is `cubic-bezier(0.2, 0.8, 0.2, 1)` with a space after each comma.",
              "`.card:nth-child(2) { transition-delay: 0.05s; }` and `.card:nth-child(3) { transition-delay: 0.1s; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".card",
                property: "transition-property",
                expected: ["transform, box-shadow", "box-shadow, transform"],
                message: "The cards transition `transform` and `box-shadow`.",
              },
              {
                type: "computedStyle",
                selector: ".card",
                property: "transition-duration",
                expected: ["0.3s", "300ms"],
                message: "...over `0.3s`",
                match: "all",
              },
              {
                type: "computedStyle",
                selector: ".card",
                property: "transition-timing-function",
                expected: ["cubic-bezier(0.2, 0.8, 0.2, 1)"],
                message: "...with `cubic-bezier(0.2, 0.8, 0.2, 1)`.",
              },
              {
                type: "computedStyle",
                selector: ".card:nth-child(2)",
                property: "transition-delay",
                expected: ["0.05s", "50ms"],
                message: "The second card has a `0.05s` delay.",
              },
              {
                type: "computedStyle",
                selector: ".card:nth-child(3)",
                property: "transition-delay",
                expected: ["0.1s", "100ms"],
                message: "The third card has a `0.1s` delay.",
              },
            ],
            solution: {
              html: `<ul class="cards">
      <li class="card"><h2>Riverside loop</h2><p>4 km, flat and shaded.</p></li>
      <li class="card"><h2>Lake path</h2><p>7 km, gentle climbs.</p></li>
      <li class="card"><h2>Ridge scramble</h2><p>9 km, steep and exposed.</p></li>
    </ul>`,
              css: `body {
      margin: 0;
      padding: 1.5rem;
      background-color: #f1f5f9;
      font-family: system-ui, sans-serif;
    }
    
    .cards {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin: 0;
      padding: 1rem 0;
      list-style: none;
    }
    
    .card {
      flex: 1 1 9rem;
      padding: 1rem;
      border-radius: 0.75rem;
      background-color: #ffffff;
      box-shadow: 0 1px 2px rgb(15 23 42 / 0.1);
      transition-property: transform, box-shadow;
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    
    .card:nth-child(2) {
      transition-delay: 0.05s;
    }
    
    .card:nth-child(3) {
      transition-delay: 0.1s;
    }
    
    .card h2 {
      margin: 0 0 0.4rem;
      font-size: 1.05rem;
    }
    
    .card p {
      margin: 0;
      color: #475569;
      font-size: 0.9rem;
    }
    
    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 28px rgb(15 23 42 / 0.18);
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-timeline",
          kind: "predict",
          title: "Predict the timeline",
          summary: "Three rows slide in with a stagger. Work out when each one starts, when the last one finishes and what happens on the way back.",
          minutes: 7,
          mode: "css",
          intro: "Three rows react when you hover the list, and each has its own delay. Predict the timeline, then run it and hover the list.",
          code: {
            html: `<ul class="list">
      <li class="row">One</li>
      <li class="row">Two</li>
      <li class="row">Three</li>
    </ul>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .list {
      width: 12rem;
      margin: 0;
      padding: 0.5rem;
      list-style: none;
      border-radius: 0.75rem;
      background-color: #f1f5f9;
    }
    
    .row {
      margin: 0.25rem 0;
      padding: 0.6rem 0.75rem;
      border-radius: 0.5rem;
      background-color: #e0e7ff;
      opacity: 0.4;
      transition-property: opacity, transform;
      transition-duration: 0.4s;
    }
    
    .row:nth-child(2) {
      transition-delay: 0.1s;
    }
    
    .row:nth-child(3) {
      transition-delay: 0.2s;
    }
    
    .list:hover .row {
      opacity: 1;
      transform: translateX(12px);
    }`,
          },
          questions: [
            {
              prompt: "After the pointer enters the list, when does row three finish moving?",
              options: ["After 0.4 seconds", "After 0.6 seconds", "After 0.2 seconds", "After 0.9 seconds"],
              answerIndex: 1,
              hint: "A delay is a wait before the journey. Add it to the duration.",
              explanation: "Row three waits `0.2s` and then travels for `0.4s`, so it finishes `0.6s` after the pointer arrives.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".row:nth-child(3)",
                  property: "transition-delay",
                  expected: ["0.2s", "200ms"],
                  message: "Row three has a `0.2s` delay.",
                },
                {
                  type: "computedStyle",
                  selector: ".row",
                  property: "transition-duration",
                  expected: ["0.4s", "400ms"],
                  message: "Each row travels for `0.4s`.",
                  match: "all",
                },
              ],
            },
            {
              prompt: "Which row starts moving first?",
              options: [
                "Row three, because it has the biggest delay",
                "Row one, because it has no delay of its own",
                "All rows start together",
                "Row two",
              ],
              answerIndex: 1,
              hint: "Only two of the rows have a `transition-delay` rule.",
              explanation: "Row one has no delay rule, so its delay is the default `0s` and it starts at once. Rows two and three wait `0.1s` and `0.2s`, which gives the stagger.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".row:nth-child(2)",
                  property: "transition-delay",
                  expected: ["0.1s", "100ms"],
                  message: "Row two waits `0.1s`.",
                },
              ],
            },
            {
              prompt: "The pointer leaves the list. What happens?",
              options: [
                "Nothing animates, because the transition is only for hovering",
                "The rows return together, and the delays are ignored",
                "Row three still waits 0.2s before it moves back, because the delay is on the base rule",
                "Row one waits the longest",
              ],
              answerIndex: 2,
              hint: "Where are the delays written: on the hover rule, or on the rows' own rules?",
              explanation: "The transition properties and delays are on the rows' base rules, so they apply in both directions. On the way back, row three still waits `0.2s`, so the stagger runs again in the same order.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".row:nth-child(3)",
                  property: "transition-delay",
                  expected: ["0.2s", "200ms"],
                  message: "The delay is on the row's own rule.",
                },
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "reduced-motion-and-accessibility",
          kind: "learn",
          title: "Motion and accessibility: respecting reduced motion",
          summary: "`prefers-reduced-motion`, which effects to remove, which to keep, and the other ways motion can exclude people.",
          minutes: 9,
          concept: {
            description: "Some people feel dizzy, nauseous or disoriented by movement on a screen. Operating systems let them say so, and browsers pass that preference to CSS as the **`prefers-reduced-motion`** media feature. A well-built interface listens, and replaces large movement with something gentler.",
            why: "Motion is a feature for many people and a barrier for some. Vestibular disorders, migraines and some forms of epilepsy and attention disorders can all be triggered by parallax, large slides, zooms and spinning. Supporting reduced motion takes one media query, it is part of accessibility guidance such as WCAG, and it makes the experience calmer for everyone who turned the setting on.",
            mentalModel: "Reduced motion is a volume knob for movement, not an off switch for design. The person asked for quiet, so turn down the shaking and keep the signals: a colour change still says \"this is a button\" without anything flying across the screen.",
          },
          body: [
            {
              type: "heading",
              text: "The media feature",
            },
            {
              type: "paragraph",
              text: "`@media (prefers-reduced-motion: reduce)` matches when the person has asked their system to minimise motion (on Windows, \"Show animations\" is turned off, and on macOS and iOS, \"Reduce motion\" is turned on). The opposite value, `no-preference`, matches when they have not. Inside the query, you override the parts of your design that move.",
            },
            {
              type: "code",
              language: "css",
              code: `.card {
      transition-property: transform, box-shadow;
      transition-duration: 0.3s;
    }
    
    .card:hover {
      transform: translateY(-6px);
    }
    
    @media (prefers-reduced-motion: reduce) {
      .card {
        transition-property: box-shadow;   /* keep the soft shadow, drop the movement */
      }
      .card:hover {
        transform: none;
      }
    }`,
              caption: "Large movement is removed, and a gentle cue stays",
            },
            {
              type: "heading",
              text: "Reduce, don't remove",
            },
            {
              type: "paragraph",
              text: "Reducing motion does not mean removing all feedback. A fade or a colour change is not the kind of motion that causes discomfort, so those can usually stay. What to take out is **large movement**: things sliding across the screen, zooming, spinning, parallax, and anything that fills much of the viewport. A heavy-handed rule such as `* { transition: none !important }` does work, but it also removes helpful cues. Think of it as a floor, and prefer targeted rules once the design is built.",
            },
            {
              type: "code",
              language: "css",
              code: `@media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        transition-duration: 0.01ms !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
      }
    }`,
              caption: "A blunt safety net that is better than nothing",
            },
            {
              type: "heading",
              text: "Other ways motion can exclude",
            },
            {
              type: "list",
              items: [
                "**Do not carry meaning in motion alone.** A field that shakes on error also needs an error message, because the person may have reduced motion on or may simply miss it.",
                "**Avoid flashing.** Content that flashes more than three times in a second can trigger seizures.",
                "**Keep durations short.** Long animations hold people up, especially keyboard and screen reader users repeating an action.",
                "**Offer control for long motion.** Autoplaying movement that lasts more than five seconds should be pausable.",
              ],
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `@media (prefers-reduced-motion: reduce) {
      .hero {
        transform: none;
        transition-property: opacity;
      }
    }`,
                note: "Large movement is removed, and a fade remains as a gentle signal.",
              },
              bad: {
                code: `@media (prefers-reduced-motion: reduce) {
      * {
        transition: none !important;
        animation: none !important;
      }
    }`,
                note: "This removes everything, including harmless cues, and the `!important` makes it hard to adjust later. It works as a last resort, not as a design.",
              },
            },
            {
              type: "callout",
              tone: "tip",
              text: "In Chrome DevTools, open the Rendering panel and set \"Emulate CSS media feature prefers-reduced-motion\" to reduce. Safari and Firefox have similar options, and so do their accessibility settings on the operating system.",
            },
            {
              type: "callout",
              tone: "note",
              text: "`prefers-reduced-motion` cannot be checked in the lab checks of this course, because the preview does not turn the preference on. The rule still works in a real browser, so test it there.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "`@media (prefers-reduced-motion: reduce)` tells you the person wants less movement, and it is honoured on every major system.",
                "Remove large movement such as slides, zooms and parallax, and keep gentle cues such as fades and colour changes.",
                "A blanket `transition: none !important` is a safety net, and targeted rules are better design.",
                "Never use motion as the only signal, avoid flashing, and keep durations short.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "interruptions-and-pitfalls",
          kind: "learn",
          title: "Interruptions, first renders and other pitfalls",
          summary: "What happens when a transition is reversed halfway, why nothing animates on load, and the checklist for a transition that will not run.",
          minutes: 10,
          concept: {
            description: "A transition is a promise to animate **one change** of a value. Real interfaces interrupt it: the pointer leaves before the journey ends, or the state changes again. Some transitions never start, because the element had no earlier value, or the property cannot animate. Understanding these cases removes most of the mystery.",
            why: "A transition that works in a demo and fails in a real page usually breaks in one of a small number of ways. If you know the list, you can debug a stuck transition in a minute instead of an afternoon, and your hover effects stay smooth even when someone sweeps the mouse across a row of buttons.",
            mentalModel: "A transition is a lift travelling between floors. If someone presses the opposite button while the lift is between floors, it does not jump to the start. It turns round from where it is. If the building has not opened yet, there is no lift to ride at all.",
          },
          body: [
            {
              type: "heading",
              text: "Reversing halfway",
            },
            {
              type: "paragraph",
              text: "When the pointer enters and leaves an element quickly, the element is in the middle of a transition when the state changes again. The browser does not restart from the beginning. It starts a new transition **from the current, in-between value** back to the original one. It also shortens the reversing journey in proportion to how far the first one had got, so that going back takes about as long as it took to get there. The result is smooth, and it is one reason transitions are better than animations for hover effects.",
            },
            {
              type: "code",
              language: "css",
              code: `.btn {
      transform: scale(1);
      transition-property: transform;
      transition-duration: 0.4s;
    }
    
    .btn:hover {
      transform: scale(1.2);
    }
    /* Hover for 0.1s, then leave: the button goes back from about
       scale(1.05), not from scale(1.2), so the return is short. */`,
              caption: "Reversals pick up where the element is",
            },
            {
              type: "heading",
              text: "Nothing on first render",
            },
            {
              type: "paragraph",
              text: "A transition needs a value to leave from. When an element is first created, or its `display` changes from `none`, it has no earlier style, so it simply appears in its final state. This is why a modal that is added to the page does not fade in by itself. Two tools cover it: CSS animations (a later topic) and, in newer browsers, `@starting-style`, which declares the style an element starts from when it first appears.",
            },
            {
              type: "heading",
              text: "A checklist for a transition that will not run",
            },
            {
              type: "list",
              items: [
                "**Is there a duration?** The default is `0s`, and a value without a unit is invalid.",
                "**Is the property in the list?** Check `transition-property` for a typo or a missing property.",
                "**Can the property animate?** `display` and `height: auto` cannot. Look up the \"Animation type\".",
                "**Is the transition on the right rule?** A transition only on `:hover` does not play when leaving.",
                "**Does the value really change?** If a more specific rule gives the same value in both states, nothing moves.",
                "**Is something overriding it?** A later `transition` shorthand replaces an earlier one, and `!important` or a more specific selector can win.",
                "**Is the element rendered?** An element with `display: none` has no style to animate from.",
              ],
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.item {
      opacity: 1;
      transition-property: opacity;
      transition-duration: 0.3s;
    }
    .item.hidden {
      opacity: 0;
    }`,
                note: "Opacity changes on an element that is still rendered, so the fade runs.",
              },
              bad: {
                code: `.item {
      transition-property: opacity;
      transition-duration: 0.3s;
    }
    .item.hidden {
      display: none;
      opacity: 0;
    }`,
                note: "`display: none` removes the element at once, so there is nothing left to fade. The opacity change is never seen.",
              },
            },
            {
              type: "heading",
              text: "Events, briefly",
            },
            {
              type: "paragraph",
              text: "If you use JavaScript, a transition fires events: `transitionrun`, `transitionstart`, `transitionend` and `transitioncancel`. `transitionend` fires once for **each** property that finishes, so an element that transitions three properties fires it three times. Check `event.propertyName` if you only care about one. These events are handy for cleaning up after an exit, but CSS can usually do the job without them.",
            },
            {
              type: "callout",
              tone: "tip",
              text: "In DevTools, the Animations panel records transitions and lets you slow them down. Triggering a hover while it is open shows you the duration, the delay and the curve of the real transition.",
            },
            {
              type: "callout",
              tone: "warning",
              text: "Do not wait for `transitionend` to continue if the transition might never run. When `prefers-reduced-motion` removes the duration, or when the element is hidden, the event may never fire, and your code will wait forever.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "A reversed transition starts from the current value and is shortened, so quick hover in and out stays smooth.",
                "Elements that are new, or that were `display: none`, have no earlier value, so nothing animates on their first appearance.",
                "When a transition does not run, check the duration, the property list, whether the property can animate, the rule it is on and whether it is overridden.",
                "`transitionend` fires once per property, and may not fire at all when the duration is zero.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "entry-exit-modern",
          kind: "learn",
          title: "Entry and exit: `@starting-style` and `transition-behavior`",
          summary: "How modern CSS fades elements in when they appear and out when they disappear, including `display` and popovers.",
          minutes: 10,
          concept: {
            description: "Two recent features remove the biggest limits of transitions. **`@starting-style`** declares the style an element has the first time it is rendered, so it can transition **in**. **`transition-behavior: allow-discrete`** lets properties that normally jump, such as `display`, take part in a transition, so an element can transition **out** before it disappears.",
            why: "Dialogs, popovers, menus and toasts all appear and disappear, and until recently, fading them meant JavaScript timers or `visibility` tricks. These features make it plain CSS. They are young, so you should know both what they do and how to fall back when a browser does not support them.",
            mentalModel: "An element that appears has no \"before\" picture, so a transition has nothing to start from. `@starting-style` hands it a before picture. An element that disappears is taken off the stage at once. `allow-discrete` tells the stagehand to wait until the fade has finished before taking it away.",
          },
          body: [
            {
              type: "heading",
              text: "Transitioning in with @starting-style",
            },
            {
              type: "paragraph",
              text: "When an element is added to the page, or changes from `display: none` to a visible display, the browser has no previous style to move away from, so a transition has nothing to play. Inside `@starting-style` you write the values the element should start from. The browser uses them as the \"before\" style, and then transitions to the normal style.",
            },
            {
              type: "code",
              language: "css",
              code: `.toast {
      opacity: 1;
      transform: translateY(0);
      transition-property: opacity, transform;
      transition-duration: 0.3s;
    }
    
    @starting-style {
      .toast {
        opacity: 0;
        transform: translateY(1rem);
      }
    }`,
              caption: "The toast fades and slides in the first time it is shown",
            },
            {
              type: "heading",
              text: "Transitioning out with allow-discrete",
            },
            {
              type: "paragraph",
              text: "`display` is a **discrete** property: it has no in-between values. With `transition-behavior: allow-discrete`, a discrete property is allowed to transition, and the browser flips it at the **right moment**. When `display` changes to `none`, the switch is held back until the end of the transition, so the fade can finish first. When it changes from `none`, the switch happens at the start. The same switch also makes `content-visibility`, and the open state of a popover or a dialog, work.",
            },
            {
              type: "code",
              language: "css",
              code: `.toast {
      transition-property: opacity, transform, display;
      transition-duration: 0.3s;
      transition-behavior: allow-discrete;
    }
    
    .toast.is-hidden {
      display: none;
      opacity: 0;
      transform: translateY(1rem);
    }`,
              caption: "The element fades out first, then display: none takes effect",
            },
            {
              type: "paragraph",
              text: "In the shorthand, add the keyword after the duration, such as `transition: opacity 0.3s, display 0.3s allow-discrete`.",
            },
            {
              type: "heading",
              text: "Support and fallbacks",
            },
            {
              type: "paragraph",
              text: "Both features arrived in the major browsers during 2023 and 2024, and a person with an older browser will not get them. The fallback is gentle: the element simply appears and disappears without the effect, as it did before. Design for that, so the page works either way, and check a current compatibility table for your audience before relying on it.",
            },
            {
              type: "compare",
              language: "css",
              good: {
                code: `.dialog[open] {
      opacity: 1;
      transition-property: opacity, display, overlay;
      transition-duration: 0.25s;
      transition-behavior: allow-discrete;
    }
    @starting-style {
      .dialog[open] { opacity: 0; }
    }`,
                note: "The starting style gives the open dialog something to fade in from.",
              },
              bad: {
                code: `.dialog {
      opacity: 0;
      transition: opacity 0.25s;
    }
    .dialog[open] {
      opacity: 1;
    }`,
                note: "A closed dialog has `display: none`, so when it opens there is no earlier style and the opacity change never animates.",
              },
            },
            {
              type: "callout",
              tone: "note",
              text: "`@starting-style` and `allow-discrete` cannot be tested by the automatic checks in this course, because the preview inspects styles at rest. They are covered here so you recognise them, and you can try them in the Playground.",
            },
            {
              type: "callout",
              tone: "tip",
              text: "For a popover or a dialog, list `overlay` together with `display` in `transition-property`. It keeps the element in the top layer until the exit transition has finished.",
            },
            {
              type: "heading",
              text: "Recap",
            },
            {
              type: "list",
              items: [
                "`@starting-style` gives a newly rendered element a before picture, so it can transition in.",
                "`transition-behavior: allow-discrete` lets `display` and similar properties take part, so an element can fade out before disappearing.",
                "In the shorthand, `allow-discrete` goes after the duration.",
                "Without browser support the element appears and disappears instantly, so the page still works.",
              ],
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-silent-transitions",
          kind: "debug",
          title: "Debug: the transition that silently does nothing",
          mode: "css",
          summary: "Nothing animates and the browser says nothing. Find three silent mistakes: a missing unit, a misspelt property and an impossible curve.",
          minutes: 9,
          broken: {
            html: "<div class=\"tile\" tabindex=\"0\">Hover over me</div>",
            css: `body {
      margin: 0;
      padding: 2.5rem 2rem;
      font-family: system-ui, sans-serif;
    }
    
    .tile {
      display: grid;
      place-items: center;
      width: 12rem;
      height: 7rem;
      border-radius: 0.5rem;
      background-color: #e0e7ff;
      color: #312e81;
      font-weight: 600;
      transition-property: background-colour, transform;
      transition-duration: 300;
      transition-timing-function: cubic-bezier(1.5, 0, 0.2, 1);
    }
    
    .tile:hover {
      background-color: #4f46e5;
      color: #ffffff;
      border-radius: 2rem;
      transform: translateY(-8px);
    }
    `,
          },
          challenge: {
            title: "Make the tile animate",
            description: "Hovering the tile should fade its colour, round its corners and lift it, all together, taking `0.3s` with a soft landing. Instead everything jumps, and there is no error anywhere. Fix the three transition declarations on `.tile`. The property list must name `background-color`, `transform` and `border-radius`, in that order, and the curve must be `cubic-bezier(0.2, 0.8, 0.2, 1)`.",
            hints: [
              "Open the explain panel and read the Heads up cards. Each of the three transition declarations has a mistake.",
              "A time needs a unit, one property name is spelt the British way, and the first number of a `cubic-bezier()` must be between 0 and 1.",
              "`transition-property: background-color, transform, border-radius; transition-duration: 0.3s; transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".tile",
                property: "transition-property",
                expected: [
                  "background-color, transform, border-radius",
                ],
                message: "The tile transitions `background-color, transform, border-radius`.",
              },
              {
                type: "computedStyle",
                selector: ".tile",
                property: "transition-duration",
                expected: ["0.3s", "300ms"],
                message: "...for `0.3s`",
              },
              {
                type: "computedStyle",
                selector: ".tile",
                property: "transition-timing-function",
                expected: ["cubic-bezier(0.2, 0.8, 0.2, 1)"],
                message: "...with the curve `cubic-bezier(0.2, 0.8, 0.2, 1)`.",
              },
            ],
            solution: {
              html: "<div class=\"tile\" tabindex=\"0\">Hover over me</div>",
              css: `body {
      margin: 0;
      padding: 2.5rem 2rem;
      font-family: system-ui, sans-serif;
    }
    
    .tile {
      display: grid;
      place-items: center;
      width: 12rem;
      height: 7rem;
      border-radius: 0.5rem;
      background-color: #e0e7ff;
      color: #312e81;
      font-weight: 600;
      transition-property: background-color, transform, border-radius;
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    
    .tile:hover {
      background-color: #4f46e5;
      color: #ffffff;
      border-radius: 2rem;
      transform: translateY(-8px);
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    buildALivelyTrailPage,

    /* ------------------------------------------------------------------ */
    {
          id: "transitions-quiz",
          kind: "quiz",
          title: "Quiz: transitions",
          summary: "Seventeen questions on properties, timing, triggers, animatable values, performance and reduced motion.",
          minutes: 12,
          passPercent: 70,
          questions: [
            {
              prompt: "What does a transition do?",
              options: [
                "It prevents a property from changing",
                "It plays a looping animation",
                "It makes a property change gradually instead of instantly",
                "It loads a page faster",
              ],
              answerIndex: 2,
              explanation: "A transition animates the change of a property between two values over a set time. It does not loop (that is an animation), and it never blocks a change.",
            },
            {
              prompt: "What is the default value of `transition-duration`?",
              options: ["`0s`", "`1s`", "`0.3s`", "`ease`"],
              answerIndex: 0,
              explanation: "The default is `0s`, so a transition with no duration changes instantly. This is the most common reason a new transition seems not to work.",
            },
            {
              prompt: "Which of these durations is invalid?",
              options: ["`0.3s`", "`300ms`", "`0s`", "`300`"],
              answerIndex: 3,
              explanation: "A time needs a unit. `300` and a bare `0` are invalid, and the browser drops the whole declaration.",
            },
            {
              prompt: "A `:hover` rule changes `background-color`, `transform` and `box-shadow`. The base rule has `transition-property: background-color, transform; transition-duration: 0.3s`. What does the shadow do?",
              options: [
                "It animates over 0.3s",
                "It jumps, because it is not in the list",
                "It animates over 0s",
                "It is ignored",
              ],
              answerIndex: 1,
              explanation: "A property that is not in `transition-property` still changes, but instantly. The shadow jumps while the other two glide.",
            },
            {
              prompt: "Which timing function best suits an element that responds to a hover?",
              options: ["`ease-in`", "`ease-out`", "`step-start`", "`linear`"],
              answerIndex: 1,
              explanation: "`ease-out` starts fast and settles, so the response feels immediate. `ease-in` is for things that leave, and `linear` feels mechanical.",
            },
            {
              prompt: "Why does this hover colour snap back when the pointer leaves?",
              code: {
                language: "css",
                code: `.link { color: #4f46e5; }
    
    .link:hover {
      color: #3730a3;
      transition: color 0.2s;
    }`,
              },
              options: [
                "`ease` cannot reverse",
                "The `a` selector is too weak",
                "`color` cannot animate",
                "The transition is only on the `:hover` rule, so the base rule has a `0s` duration",
              ],
              answerIndex: 3,
              explanation: "The browser uses the transition of the style the element is going to. On the way out, that is the base rule, which has no transition.",
            },
            {
              prompt: "In `transition: opacity 0.3s ease 0.1s`, what does `0.1s` mean?",
              options: ["The delay", "The duration", "The timing function", "The opacity step"],
              answerIndex: 0,
              explanation: "The first time value is the duration and the second is the delay. So the transition waits `0.1s`, then runs for `0.3s`.",
            },
            {
              prompt: "Which property cannot be animated smoothly?",
              options: ["`opacity`", "`background-color`", "`display`", "`transform`"],
              answerIndex: 2,
              explanation: "`display` has no in-between values, so it changes in a single frame. Recent browsers can transition it with `transition-behavior: allow-discrete`.",
            },
            {
              prompt: "Why does `height: 0` to `height: auto` not animate?",
              options: [
                "`height` is not animatable",
                "Transitions only work on widths",
                "`overflow` must be visible",
                "`auto` is a keyword, so the browser has no number to interpolate to",
              ],
              answerIndex: 3,
              explanation: "A keyword such as `auto` is not a number, so the browser cannot calculate values between the two. Use real numbers, a `0fr` to `1fr` grid row, or `interpolate-size` where it is supported.",
            },
            {
              prompt: "Which pair is cheapest to animate, because the browser can handle it without redoing layout or paint?",
              options: ["`width` and `height`", "`transform` and `opacity`", "`top` and `left`", "`margin` and `padding`"],
              answerIndex: 1,
              explanation: "`transform` and `opacity` can be composited, so they stay smooth. The others change layout on every frame.",
            },
            {
              prompt: "What does `transition-property: all` risk?",
              options: [
                "Nothing, it is always the best choice",
                "It disables the duration",
                "It also animates changes you did not intend, such as a width changing at a breakpoint",
                "It only works on hover",
              ],
              answerIndex: 2,
              explanation: "`all` animates every animatable property that changes, so unrelated changes, such as layout shifts and theme switches, are animated too.",
            },
            {
              prompt: "Which is a valid `cubic-bezier()`?",
              options: ["`cubic-bezier(0.2, 0.8, 0.2, 1)`", "`cubic-bezier(1.5, 0, 0.2, 1)`", "`cubic-bezier(0.2, 0.8)`", "`cubic-bezier(0.2, 0.8, 0.2, 1, 1)`"],
              answerIndex: 0,
              explanation: "It needs exactly four numbers, and the two x values must be between 0 and 1. The y values can go outside that range to give an overshoot.",
            },
            {
              prompt: "What does `@media (prefers-reduced-motion: reduce)` tell you?",
              options: [
                "The person asked their system to minimise motion",
                "The device is slow",
                "The screen is small",
                "The page is printing",
              ],
              answerIndex: 0,
              explanation: "It matches when the person has turned on a reduce motion setting, so you can replace large movement with something gentler.",
            },
            {
              prompt: "What should reduced motion usually remove?",
              options: [
                "Every change of colour",
                "All hover effects",
                "Large movement such as slides, zooms and parallax",
                "The page layout",
              ],
              answerIndex: 2,
              explanation: "Large movement is what causes discomfort. Gentle cues such as fades and colour changes can generally stay.",
            },
            {
              prompt: "Why does a modal that is added to the page not fade in with a simple transition?",
              options: [
                "`opacity` does not animate",
                "A new element has no earlier style to transition from",
                "Modals cannot use transitions",
                "The duration is too short",
              ],
              answerIndex: 1,
              explanation: "A transition needs a start value. `@starting-style` provides one for elements that are rendered for the first time.",
            },
            {
              prompt: "A transition is reversed halfway through. What does the browser do?",
              options: [
                "Restarts from the beginning",
                "Jumps to the end value",
                "Ignores the second change",
                "Turns round from the current value, with a shortened journey",
              ],
              answerIndex: 3,
              explanation: "The new transition begins from the in-between value and is shortened in proportion, so quick hovers in and out stay smooth.",
            },
            {
              prompt: "Why does `transform: rotate(180deg)` do nothing on a plain `<span>` in a line of text?",
              options: [
                "`span` elements cannot have classes",
                "`rotate` needs a duration",
                "Transforms do not apply to non-replaced inline elements",
                "It needs `position: absolute`",
              ],
              answerIndex: 2,
              explanation: "Transforms do not apply to plain inline boxes. Give the element `display: inline-block` (or make it a flex or grid item) first.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "transitions-review",
          kind: "review",
          title: "Review: transitions cheat sheet",
          summary: "The properties, the shorthand, the curves, what can animate and the accessibility rule on one page.",
          minutes: 4,
          body: [
            {
              type: "heading",
              text: "The five properties",
            },
            {
              type: "code",
              language: "css",
              code: `transition-property: background-color, transform;  /* what (default: all) */
    transition-duration: 0.2s, 0.4s;                   /* how long (default: 0s) */
    transition-timing-function: ease-out;              /* speed curve (default: ease) */
    transition-delay: 0s;                              /* wait before starting */
    transition-behavior: allow-discrete;               /* let display etc. take part */`,
            },
            {
              type: "heading",
              text: "The shorthand",
            },
            {
              type: "code",
              language: "css",
              code: `transition: color 0.2s ease-out 0.1s;   /* property duration timing delay */
    transition: opacity 0.3s, transform 0.3s;   /* a list, one entry per property */
    transition: none;
    /* the first time is the duration, the second is the delay */`,
            },
            {
              type: "heading",
              text: "Timing",
            },
            {
              type: "code",
              language: "css",
              code: `ease          /* default: quick start, soft landing */
    ease-out      /* responses, arrivals */
    ease-in       /* exits */
    ease-in-out   /* things that travel */
    linear        /* steady motion only */
    cubic-bezier(0.34, 1.56, 0.64, 1)   /* x in 0..1, y can overshoot */
    steps(4, end)                       /* jumps, no glide */`,
            },
            {
              type: "heading",
              text: "Which rule is in charge",
            },
            {
              type: "code",
              language: "css",
              code: `.btn { transition: background-color 0.2s; }   /* applies both ways */
    .btn:hover { transition-duration: 0.1s; }    /* only the way in */`,
            },
            {
              type: "heading",
              text: "What can animate",
            },
            {
              type: "list",
              items: [
                "**Yes:** colours, lengths, percentages, numbers, `transform`, `box-shadow`, `filter`, grid tracks.",
                "**No:** `display`, `font-family`, `background-image`, and `auto` sizes. Use `max-height`, a `0fr` to `1fr` grid row, or `interpolate-size`.",
                "**Cheapest:** `transform` and `opacity`. Layout properties such as `width` and `top` are the costliest.",
              ],
            },
            {
              type: "heading",
              text: "Entry and exit",
            },
            {
              type: "code",
              language: "css",
              code: `@starting-style { .toast { opacity: 0; } }        /* the before picture */
    .toast { transition: opacity 0.3s, display 0.3s allow-discrete; }`,
            },
            {
              type: "heading",
              text: "Remember",
            },
            {
              type: "list",
              items: [
                "A duration is required: the default `0s` means no animation, and a time needs its unit.",
                "The after-change style decides: put the transition on the base rule for an effect that works both ways.",
                "A property not in the list still changes, but instantly. Prefer a list over `all`.",
                "A later `transition` shorthand replaces an earlier one completely.",
                "Keep durations in the 100 to 400ms range, and reuse a small set of them.",
                "Respect `@media (prefers-reduced-motion: reduce)` by removing large movement and keeping gentle cues.",
                "Never carry meaning in motion alone, and do not hide anything essential behind hover.",
              ],
            },
            {
              type: "callout",
              tone: "tip",
              text: "When a transition does nothing, go through the list: is there a duration, is the property in the list, can it animate, is the transition on the right rule, and is something overriding it?",
            },
          ],
        },
  ],
};

export default content;
