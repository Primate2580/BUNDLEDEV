import type { TopicContent } from "@/engine/types";
import buildAPricingCard from "./colors/workshops/build-a-pricing-card/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: "colour-properties",
      kind: "learn",
      title: "Colour properties: text, background and border",
      summary: "Which property paints which part of a box, and how colour is inherited.",
      minutes: 8,
      concept: {
        description:
          "CSS paints colour in three main places: the text itself (`color`), the area behind the text (`background-color`) and the line around the box (`border-color`). Each one takes a colour value, and each one is a separate property that has to be set on its own.",
        why: "Almost every design decision starts with colour, and the commonest beginner surprise is that `color` does not colour the background. Knowing which property paints which part of the box saves you from guessing, and from repeating the same colour in five places when one inherited value would do.",
        mentalModel:
          "Think of a painted sign. `color` is the ink of the lettering, `background-color` is the paint on the board, and `border-color` is the paint on the frame around it.",
      },
      body: [
        { type: "heading", text: "The three places colour goes" },
        {
          type: "paragraph",
          text: "Every element is a box with text inside it. CSS lets you colour three parts of that box separately. The `color` property sets the colour of the text, and of anything that borrows the text colour, such as underlines. The `background-color` property fills the area behind the content and padding. The `border-color` property colours the border, which only shows once the border has a width and a style.",
        },
        {
          type: "list",
          items: [
            "`color`: the text and its decorations.",
            "`background-color`: the fill behind the content and padding.",
            "`border-color`: the border line. It needs a `border-style` such as `solid`, or there is no line to colour.",
          ],
        },
        {
          type: "code",
          language: "css",
          code: `.alert {
  color: #7f1d1d;
  background-color: #fee2e2;
  border: 2px solid #ef4444;
}`,
          caption: "Dark red text on a pale red box with a red border",
        },
        { type: "heading", text: "Text colour is inherited, backgrounds are not" },
        {
          type: "paragraph",
          text: "`color` is an **inherited** property. If you set it on `body`, every paragraph, heading and list item inside takes the same colour, unless a rule closer to the element overrides it. That is why one rule on `body` can set the text colour for a whole page. `background-color` is not inherited. Its default value is `transparent`, so a child lets its parent's background show through, which looks like inheritance but is not.",
        },
        {
          type: "paragraph",
          text: "Links are the usual exception. Browsers give `a` elements their own default colours, so a `color` on `body` does not change them. You need to style `a` directly.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `body {
  color: #1f2937;
}

.footer {
  color: #6b7280;
}`,
            note: "Set the main text colour once on `body`, and override it only where something is meant to look different.",
          },
          bad: {
            code: `p  { color: #1f2937; }
li { color: #1f2937; }
h2 { color: #1f2937; }`,
            note: "The same colour repeated on every element is slow to change later, and easy to leave out of sync.",
          },
        },
        { type: "heading", text: "The border colour default" },
        {
          type: "paragraph",
          text: "A border has three parts: width, style and colour. If you leave the colour out, the border takes the element's text `color`. That is a handy default, but it also means the border colour changes whenever the text colour does. The `border` shorthand sets all three parts at once, while `border-color` changes only the colour of a border that already exists.",
        },
        {
          type: "callout",
          tone: "warning",
          text: "`color: red` colours text only. To change a box's fill, you need `background-color`. If a colour change seems to do nothing, check that you used the property for the part you meant to colour.",
        },
        { type: "heading", text: "Colour values come in several notations" },
        {
          type: "paragraph",
          text: "The examples above used hex values such as `#7f1d1d`, but hex is only one notation. CSS also has named colours, `rgb()`, `hsl()` and newer colour spaces such as `oklch()`. They all describe a colour, and the next lessons teach each one so you can choose the right tool for the job.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`color` paints text, `background-color` paints the fill, `border-color` paints the border line.",
            "`color` is inherited, so one rule on `body` can colour a whole page. `background-color` is not inherited.",
            "A border with no colour uses the element's text colour.",
            "Links have their own default colours, so style `a` directly when you need to change them.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "named-colors-and-keywords",
      kind: "learn",
      title: "Named colours, transparent and currentColor",
      summary: "The readable colour names, and the two keywords that behave differently from every other colour.",
      minutes: 8,
      concept: {
        description:
          "CSS has about 150 named colours, such as `tomato` and `rebeccapurple`, plus two special keywords. `transparent` is a colour with no opacity at all, and `currentColor` means \"whatever this element's text colour is right now\".",
        why: "Names are the quickest way to try an idea and the easiest to read, and `currentColor` is how icons, borders and underlines stay in step with the text beside them. Knowing both saves you from copying one hex value into six places.",
        mentalModel:
          "A named colour is a paint pot with a label on it. `transparent` is clear glass, and `currentColor` is a pencil attached to the text's ink by a string: wherever the text colour goes, it follows.",
      },
      body: [
        { type: "heading", text: "Named colours" },
        {
          type: "paragraph",
          text: "You can write a colour as a plain English word: `red`, `navy`, `tomato`, `seagreen`, `slategray`. Names are not case sensitive, so `Tomato` and `tomato` are the same. They are easy to read and perfect for quick experiments, but the set is fixed, and the names are not always what you would guess. `lightgray` is lighter than `gray`, and `darkgray` is lighter still.",
        },
        {
          type: "paragraph",
          text: "One name has a story. `rebeccapurple` is the colour `#663399`, added in 2014 in memory of the daughter of web standards pioneer Eric Meyer. It is one of the few names that was added later.",
        },
        {
          type: "code",
          language: "css",
          code: `.banner {
  color: white;
  background-color: darkslateblue;
}`,
          caption: "Names are readable, but you only get what is on the list",
        },
        { type: "heading", text: "transparent" },
        {
          type: "paragraph",
          text: "`transparent` is a real colour value: black with no opacity, so you can see straight through it. It is the default value of `background-color`, which is why a new `div` shows what is behind it. You write it out when you want to be explicit, or when you need to cancel a background set by another rule.",
        },
        { type: "heading", text: "currentColor" },
        {
          type: "paragraph",
          text: "`currentColor` is a keyword that stands for the element's own `color` value. Wherever a colour is expected, you can write `currentColor`, and the browser uses the text colour at that moment. Borders and underlines already behave this way by default. You use it explicitly for things that do not, such as the `fill` of an SVG icon.",
        },
        {
          type: "code",
          language: "css",
          code: `.button {
  color: rebeccapurple;
  border: 2px solid currentColor;
  background-color: transparent;
}

.button svg {
  fill: currentColor;
}`,
          caption: "Change `color` once and the border and icon follow",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.link {
  color: #0369a1;
  border-bottom: 2px solid currentColor;
}`,
            note: "The underline always matches the text. Change the text colour and the border changes with it.",
          },
          bad: {
            code: `.link {
  color: #0369a1;
  border-bottom: 2px solid #0369a1;
}`,
            note: "The same hex is written twice. Update one and forget the other, and they drift apart.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Use names when you are sketching and `currentColor` whenever a border, outline or icon should match its text. When you need an exact brand colour, switch to hex, `rgb()` or `hsl()`.",
        },
        { type: "heading", text: "System colours" },
        {
          type: "paragraph",
          text: "There is a third group you will meet less often: system colours such as `Canvas`, `CanvasText` and `LinkText`. They return the colours the user's browser or operating system uses, including in high contrast modes. They help you respect those settings instead of fighting them.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Named colours are readable and case-insensitive, but the list is fixed.",
            "`transparent` is a fully see-through colour, and it is the default `background-color`.",
            "`currentColor` means the element's own text colour, and keeps borders, underlines and icons matched to it.",
            "System colours follow the user's browser and operating system settings.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hex-colors",
      kind: "learn",
      title: "Hex colours",
      summary: "How #rrggbb works, how to read one at a glance, and the short and alpha forms.",
      minutes: 9,
      concept: {
        description:
          "A hex colour is a `#` followed by hexadecimal digits that give the amount of red, green and blue light in the colour. `#ff0000` is full red, no green and no blue.",
        why: "Hex is the format you will meet most often in design files, style guides and other people's CSS. Being able to read it, and to spot a malformed one, is a basic CSS skill.",
        mentalModel:
          "A hex colour is three dimmer switches, written side by side. Each switch goes from `00` (off) to `ff` (fully on), and the colour you see is the mix of the red, green and blue light.",
      },
      body: [
        { type: "heading", text: "Three pairs of digits" },
        {
          type: "paragraph",
          text: "A six-digit hex colour is made of three pairs: red, green and blue, in that order. Each pair is a number from 0 to 255 written in base 16, or **hexadecimal**. Base 16 uses the digits `0` to `9` and then the letters `a` to `f`, so `a` is 10 and `f` is 15. The pair `ff` means 15 sixteens plus 15, which is 255, the maximum. The pair `00` means none at all.",
        },
        {
          type: "list",
          items: [
            "`#ff0000` is red at full, green and blue off: pure red.",
            "`#00ff00` is pure green, and `#0000ff` is pure blue.",
            "`#000000` is every channel off, which is black. `#ffffff` is every channel full, which is white.",
            "Equal pairs give a grey, such as `#808080`.",
          ],
        },
        { type: "heading", text: "Reading a hex colour" },
        {
          type: "paragraph",
          text: "You do not need to convert every digit. Look at which pair is biggest. In `#4f46e5` the pairs are `4f` (79), `46` (70) and `e5` (229). Blue is far larger than the other two, so the colour is a blue-violet. Practice this and you can guess most colours before you see them.",
        },
        {
          type: "code",
          language: "css",
          code: `.title {
  color: #1e3a8a;
  background-color: #dbeafe;
}`,
          caption: "A dark navy title on a pale blue background",
        },
        { type: "heading", text: "Short form and alpha" },
        {
          type: "paragraph",
          text: "When each pair repeats a digit, you can shorten it to three digits. `#ff8800` becomes `#f80`, and `#ffffff` becomes `#fff`. The browser doubles each digit to get the full version, so `#f80` means `#ff8800`, not `#f08000`. You can also add an **alpha** value, the opacity of the colour, as a fourth pair. `#0000ff80` is blue at about 50% opacity, because `80` in hex is 128 out of 255. A shorter four-digit form works too, so `#00f8` is blue at about 53%.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.badge {
  color: #fff;
  background-color: #4f46e5;
}`,
            note: "A `#` and three or six digits (or four or eight with alpha) is always a valid hex colour.",
          },
          bad: {
            code: `.badge {
  color: fff;
  background-color: #4f46e;
}`,
            note: "`fff` has no `#`, and `#4f46e` has five digits. Both are invalid, so the browser ignores the declarations.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "CSS never shows an error for an invalid colour. The browser silently drops the declaration and carries on with whatever colour applied before. If a colour does not show up, count the digits and look for the `#`.",
        },
        {
          type: "paragraph",
          text: "Hex digits can be upper or lower case, so `#4F46E5` and `#4f46e5` are identical. Pick one style for a project and stay with it, so the code reads consistently.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A hex colour is `#` plus red, green and blue pairs, each from `00` to `ff` (0 to 255).",
            "Three-digit hex doubles each digit, so `#f80` is `#ff8800`.",
            "A fourth pair, or a fourth digit, adds alpha: `#0000ff80` is blue at about 50% opacity.",
            "A missing `#` or the wrong number of digits makes the declaration invalid, and the browser quietly ignores it.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "rgb-colors",
      kind: "learn",
      title: "rgb() colours",
      summary: "The same red, green and blue channels written as plain numbers, with a built-in alpha.",
      minutes: 8,
      concept: {
        description:
          "`rgb()` describes a colour with three numbers from 0 to 255: red, green and blue. It is the same model as hex, written in plain decimal, with an optional alpha for transparency.",
        why: "Numbers are easier to calculate with and to change than hex pairs. `rgb()` is also the form browsers report back to you: DevTools shows colours as `rgb()` whatever notation you wrote.",
        mentalModel:
          "`rgb(255 0 0)` is the same three dimmer switches as hex, but labelled with ordinary numbers instead of base 16. The switches go from 0 (off) to 255 (full).",
      },
      body: [
        { type: "heading", text: "Writing rgb()" },
        {
          type: "paragraph",
          text: "Write the three channel values inside `rgb()`, in the order red, green, blue. `rgb(255 0 0)` is red and `rgb(0 0 255)` is blue. Every hex colour has an exact `rgb()` twin: `#4f46e5` is `rgb(79 70 229)`, because `4f` is 79, `46` is 70 and `e5` is 229. Values above 255 are clamped to 255, so they never break anything.",
        },
        {
          type: "paragraph",
          text: "Modern CSS separates the numbers with spaces. The older form with commas, `rgb(79, 70, 229)`, still works everywhere, and you will see it in a lot of existing code. Both mean the same, but you must not mix them in one value.",
        },
        {
          type: "code",
          language: "css",
          code: `.note {
  color: rgb(55 65 81);
  background-color: rgb(254 243 199);
  border-color: rgb(245 158 11);
}`,
          caption: "Dark grey text on a warm yellow note",
        },
        { type: "heading", text: "How channels mix" },
        {
          type: "paragraph",
          text: "Screens mix **light**, so colours add up. Red plus green gives yellow: `rgb(255 255 0)`. Green plus blue gives cyan, and red plus blue gives magenta. All three at full gives white, and all three at zero gives black. When the three numbers are equal you get a grey: `rgb(128 128 128)` is a mid grey. This is the opposite of mixing paint, where adding colours makes them darker.",
        },
        { type: "heading", text: "Alpha and percentages" },
        {
          type: "paragraph",
          text: "To make a colour see-through, add a slash and an alpha value at the end. The alpha can be a number from 0 (invisible) to 1 (solid), or a percentage. `rgb(0 0 0 / 0.5)` and `rgb(0 0 0 / 50%)` are the same half-transparent black. The older name `rgba()` still works and takes the same arguments, but plain `rgb()` now accepts alpha, so you no longer need it. You can also write channels as percentages: `rgb(100% 0% 0%)` is red.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.overlay {
  background-color: rgb(0 0 0 / 0.6);
}`,
            note: "A consistent, modern value: spaces between the channels and a slash before the alpha.",
          },
          bad: {
            code: `.overlay {
  background-color: rgb(0, 0 0 / 0.6);
}`,
            note: "A comma between two of the numbers, but a space between the others. The whole declaration is invalid and is ignored.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Browsers always report colours as `rgb()` (or `rgba()` when there is transparency). If you want to know what colour a hex or `hsl()` value really is, look at the Computed panel in DevTools.",
        },
        { type: "heading", text: "Choosing between hex and rgb()" },
        {
          type: "paragraph",
          text: "Neither is more correct. Hex is short and common in design tools. `rgb()` shows the channels as readable numbers and handles alpha naturally. Many teams use hex for solid colours and `rgb()` with a slash whenever transparency is involved.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`rgb(r g b)` takes three numbers from 0 to 255, and every hex colour has an exact `rgb()` twin.",
            "Screens mix light: red plus green is yellow, and all channels full is white.",
            "Add alpha after a slash: `rgb(0 0 0 / 50%)`. `rgba()` is an older alias for the same thing.",
            "Use commas throughout or spaces throughout. Mixing them makes the value invalid.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hsl-colors",
      kind: "learn",
      title: "hsl() colours",
      summary: "Describe a colour by hue, saturation and lightness, and make lighter, darker and muted versions by changing one number.",
      minutes: 9,
      concept: {
        description:
          "`hsl()` describes a colour with three numbers that match how people think about colour: **hue** (the position on the colour wheel, 0 to 360), **saturation** (how vivid it is, 0% to 100%) and **lightness** (from black at 0% through the pure colour at 50% to white at 100%).",
        why: "With hex or `rgb()` it is hard to guess what \"a bit lighter\" means in numbers. With `hsl()` it is one number: raise the lightness. That makes it the best notation for building shades, hover states and whole palettes from a single hue.",
        mentalModel:
          "Hue is where your finger points on a colour wheel. Saturation is how far from the grey centre you are. Lightness is a dimmer that runs from black to white.",
      },
      body: [
        { type: "heading", text: "The three numbers" },
        {
          type: "paragraph",
          text: "The **hue** is an angle around a colour wheel, from 0 to 360 degrees. Red is at 0, yellow at 60, green at 120, cyan at 180, blue at 240 and magenta at 300, and the wheel comes back to red at 360. **Saturation** is a percentage: 100% is vivid, and 0% is a pure grey. **Lightness** is a percentage too: 0% is always black, 100% is always white, and 50% shows the colour at full strength.",
        },
        {
          type: "code",
          language: "css",
          code: `.swatch {
  background-color: hsl(220 80% 55%);
}`,
          caption: "Hue 220 (blue), strongly saturated, a little above mid lightness",
        },
        {
          type: "paragraph",
          text: "Modern syntax separates the three values with spaces, like `rgb()`. The commas form, `hsl(220, 80%, 55%)`, still works, but in that form the saturation and lightness must have a percent sign. The hue is a plain number of degrees, though you can add a unit such as `220deg` or `0.5turn`.",
        },
        { type: "heading", text: "Make a palette by changing one number" },
        {
          type: "paragraph",
          text: "Here is why `hsl()` is popular. Keep the hue and saturation, and change only the lightness, and you get a family of tints and shades of the same colour. Lower the saturation to mute it. Set it to 0% and you have a grey. Every step stays recognisably the same colour, which is hard to do by editing hex values by eye.",
        },
        {
          type: "code",
          language: "css",
          code: `.tint-100 { background-color: hsl(220 80% 95%); }
.tint-300 { background-color: hsl(220 80% 80%); }
.base     { background-color: hsl(220 80% 55%); }
.shade-700 { background-color: hsl(220 80% 35%); }
.shade-900 { background-color: hsl(220 80% 18%); }`,
          caption: "Five steps of one blue: only the lightness changes",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.btn       { background-color: hsl(220 80% 55%); }
.btn:hover { background-color: hsl(220 80% 45%); }`,
            note: "The hover state is the same colour, only darker. One number changed, and the intent is obvious.",
          },
          bad: {
            code: `.btn       { background-color: #3b82f6; }
.btn:hover { background-color: #1d4ed8; }`,
            note: "Both are valid blues, but they are picked by eye, so you cannot see how they relate or repeat the step.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "Lightness in `hsl()` is not how bright a colour looks to the eye. `hsl(60 100% 50%)` yellow looks much lighter than `hsl(240 100% 50%)` blue, even though both have 50% lightness. A later lesson on `oklch()` fixes that.",
        },
        { type: "heading", text: "Alpha in hsl()" },
        {
          type: "paragraph",
          text: "Alpha works exactly as it does in `rgb()`: add a slash and a value, such as `hsl(220 80% 55% / 0.5)`. The older `hsla()` is the same idea with its own name, and is no longer needed.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`hsl(hue saturation lightness)`: hue is 0 to 360 degrees, saturation and lightness are percentages.",
            "Hue: 0 red, 60 yellow, 120 green, 180 cyan, 240 blue, 300 magenta.",
            "Change only the lightness for tints and shades, and lower the saturation to mute a colour.",
            "Lightness is not the same as how bright a colour looks, because yellow looks lighter than blue at the same value.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "hsl-explorer",
      kind: "visualizer",
      title: "HSL explorer",
      summary: "Drag hue, saturation, lightness and alpha, and watch one swatch change.",
      minutes: 10,
      concept: {
        description:
          "One swatch is painted with `hsl()`, and its four numbers are stored as custom properties you can drag. Hue picks the colour, saturation sets how vivid it is, lightness runs from black to white, and alpha makes it see-through.",
        why: "Reading about hue angles is one thing, but dragging a slider makes the colour wheel, and the way lightness behaves at both ends, stick in your memory far better.",
        mentalModel:
          "Hue is the dial on a colour wheel. Saturation is how far you are from grey. Lightness is a dimmer from black to white. Alpha is how much of the checkerboard behind shows through.",
      },
      stage: {
        html: '<div class="board">\n  <div class="swatch"><span class="label">hsl()</span></div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 16px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; overflow: hidden; }\n.board { height: 100%; box-sizing: border-box; padding: 14px; border-radius: 14px; background-color: #e2e8f0; background-image: linear-gradient(45deg, #cbd5e1 25%, transparent 25%, transparent 75%, #cbd5e1 75%), linear-gradient(45deg, #cbd5e1 25%, transparent 25%, transparent 75%, #cbd5e1 75%); background-size: 20px 20px; background-position: 0 0, 10px 10px; }\n.swatch { height: 100%; min-height: 100px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }\n.label { font-size: 28px; font-weight: 800; letter-spacing: 0.02em; }",
        annotate: "none",
        target: ".swatch",
        items: ".swatch",
      },
      starter: `.swatch {
  --hue: 220;
  --sat: 80%;
  --light: 85%;
  --alpha: 1;
  background-color: hsl(var(--hue) var(--sat) var(--light) / var(--alpha));
}

.label {
  color: #ffffff;
}
`,
      controls: [
        { id: "hue", label: "hue", selector: ".swatch", property: "--hue", fallback: "220", type: "range", min: 0, max: 360, step: 5, help: "0 red, 60 yellow, 120 green, 180 cyan, 240 blue, 300 magenta." },
        { id: "sat", label: "saturation", selector: ".swatch", property: "--sat", fallback: "80%", type: "range", min: 0, max: 100, step: 5, unit: "%", help: "0% is a pure grey. 100% is as vivid as it gets." },
        { id: "light", label: "lightness", selector: ".swatch", property: "--light", fallback: "85%", type: "range", min: 0, max: 100, step: 5, unit: "%", help: "0% is always black, 100% is always white, 50% is the pure colour." },
        { id: "alpha", label: "alpha", selector: ".swatch", property: "--alpha", fallback: "1", type: "range", min: 0, max: 1, step: 0.05, help: "0 is invisible, 1 is solid. The checkerboard shows through when it is below 1." },
        { id: "label-color", label: "label colour", selector: ".label", property: "color", fallback: "#ffffff", type: "options", options: ["#ffffff", "#0f172a", "#1e3a8a"], help: "Notice which label colours stay readable as you change the lightness." },
      ],
      presets: [
        { id: "sky", label: "Sky blue", description: "hue 200, bright and light", css: ".swatch { --hue: 200; --sat: 90%; --light: 70%; }" },
        { id: "forest", label: "Deep forest", description: "a dark, muted green", css: ".swatch { --hue: 140; --sat: 45%; --light: 25%; }" },
        { id: "grey", label: "Pure grey", description: "saturation 0 removes the hue", css: ".swatch { --sat: 0%; --light: 60%; }" },
        { id: "amber", label: "Warm amber", description: "hue 40, vivid", css: ".swatch { --hue: 40; --sat: 95%; --light: 55%; }" },
        { id: "glass", label: "See-through", description: "alpha 0.4 lets the checkerboard through", css: ".swatch { --alpha: 0.4; }" },
      ],
      challenge: {
        title: "Make the label readable",
        description:
          "The swatch is a pale blue, and its white label is almost impossible to read. Give `.label` a dark navy text colour, written with `hsl()`: hue 220, saturation 60% and lightness 15%.",
        hints: [
          "You are changing the `color` of `.label`, not the swatch.",
          "`hsl()` takes three values separated by spaces: a hue number, then two percentages.",
          "`.label { color: hsl(220 60% 15%); }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".label", property: "color", expected: ["hsl(220 60% 15%)", "hsl(220, 60%, 15%)", "rgb(15, 31, 61)"], message: "The label is dark navy: `hsl(220 60% 15%)`." },
        ],
        solution: `.swatch {
  --hue: 220;
  --sat: 80%;
  --light: 85%;
  --alpha: 1;
  background-color: hsl(var(--hue) var(--sat) var(--light) / var(--alpha));
}

.label {
  color: hsl(220 60% 15%);
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-colour",
      kind: "predict",
      title: "Predict the colour",
      summary: "Read hex, rgb() and hsl() values and say which chips match, before you run them.",
      minutes: 6,
      mode: "css",
      intro: "Six chips, written in three different notations. Predict what each one will show, then run the code.",
      code: {
        html: `<div class="chip a">A</div>
<div class="chip b">B</div>
<div class="chip c">C</div>
<div class="chip d">D</div>
<div class="chip e">E</div>
<div class="chip f">F</div>`,
        css: `body {
  font-family: system-ui, sans-serif;
  padding: 16px;
}

.chip {
  display: inline-block;
  width: 56px;
  height: 56px;
  margin: 0 8px 8px 0;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 700;
  line-height: 56px;
  text-align: center;
}

.a { background-color: #ff0000; }
.b { background-color: rgb(255 0 0); }
.c { background-color: hsl(0 100% 50%); }
.d { background-color: #0f0; }
.e { background-color: #0000ff80; }
.f { background-color: rgb(0 0 0); }`,
      },
      questions: [
        {
          prompt: "Chips A, B and C use three different notations. What do they show?",
          options: ["Three different shades of red", "The same pure red", "Red, orange and yellow", "Red, green and blue"],
          answerIndex: 1,
          hint: "Work out each one: `ff` is full strength, `255` is full strength, and hue `0` is red.",
          explanation: "`#ff0000`, `rgb(255 0 0)` and `hsl(0 100% 50%)` are three ways of writing exactly the same pure red. The notation changes how you write a colour, never what it is.",
          proves: [
            { type: "computedStyle", selector: ".a", property: "background-color", expected: ["#ff0000", "rgb(255, 0, 0)"], message: "Chip A is pure red." },
            { type: "computedStyle", selector: ".b", property: "background-color", expected: ["rgb(255 0 0)", "rgb(255, 0, 0)"], message: "Chip B is pure red." },
            { type: "computedStyle", selector: ".c", property: "background-color", expected: ["hsl(0 100% 50%)", "rgb(255, 0, 0)"], message: "Chip C is pure red." },
          ],
        },
        {
          prompt: "Chip D is written `#0f0`. What colour is it?",
          options: ["Dark green", "Cyan", "Pure, bright green", "Black"],
          answerIndex: 2,
          hint: "Three-digit hex doubles every digit. What does `#0f0` become?",
          explanation: "The short form doubles each digit, so `#0f0` is `#00ff00`: no red, full green, no blue. That is pure, bright green.",
          proves: [{ type: "computedStyle", selector: ".d", property: "background-color", expected: ["#0f0", "rgb(0, 255, 0)"], message: "Chip D is pure green." }],
        },
        {
          prompt: "Chip E is `#0000ff80`. What do the last two digits, `80`, do?",
          options: ["They make the blue about 50% see-through", "They make it darker", "They set the green channel to 128", "Nothing, the browser ignores extra digits"],
          answerIndex: 0,
          hint: "Eight hex digits means red, green, blue and one more pair. What could that last pair be?",
          explanation: "An eight-digit hex colour ends with an alpha pair. `80` is 128 out of 255, which is about 50%, so the blue is half see-through. The green channel is the third pair, `00`.",
          proves: [{ type: "computedStyle", selector: ".e", property: "background-color", expected: ["#0000ff80", "rgba(0, 0, 255, 0.5)"], message: "Chip E is blue at about 50% alpha." }],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-five-shades",
      kind: "lab",
      title: "Lab: five shades from one hue",
      summary: "Build a blue scale by changing only the lightness in hsl().",
      minutes: 10,
      mode: "css",
      starter: {
        html: `<div class="row">
  <div class="shade s1">100</div>
  <div class="shade s2">300</div>
  <div class="shade s3">500</div>
  <div class="shade s4">700</div>
  <div class="shade s5">900</div>
</div>`,
        css: `body {
  margin: 0;
  padding: 24px;
  font-family: system-ui, sans-serif;
}

.row {
  display: flex;
}

.shade {
  flex: 1;
  padding: 36px 8px;
  text-align: center;
  font-weight: 700;
}
`,
      },
      challenge: {
        title: "Build a blue scale",
        description:
          "The five boxes have no colour yet. Give every shade the hue `210` and saturation `80%`, and set the lightness to `92%`, `75%`, `55%`, `35%` and `18%`, from the lightest (`.s1`) to the darkest (`.s5`). The two darkest shades need white text so their numbers stay readable.",
        hints: [
          "Each shade is its own rule, such as `.s1 { background-color: ...; }`.",
          "All five use `hsl(210 80% ...)`. Only the third number changes.",
          "Lightest to darkest: `92%`, `75%`, `55%`, `35%`, `18%`. Then add `color: white` for `.s4` and `.s5`.",
          "`.s1 { background-color: hsl(210 80% 92%); }` and so on. `.s4, .s5 { color: white; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".s1", property: "background-color", expected: ["hsl(210 80% 92%)", "rgb(218, 235, 251)"], message: "`.s1` is `hsl(210 80% 92%)`, the lightest tint." },
          { type: "computedStyle", selector: ".s2", property: "background-color", expected: ["hsl(210 80% 75%)", "rgb(140, 191, 242)"], message: "`.s2` is `hsl(210 80% 75%)`." },
          { type: "computedStyle", selector: ".s3", property: "background-color", expected: ["hsl(210 80% 55%)", "rgb(48, 140, 232)"], message: "`.s3` is `hsl(210 80% 55%)`, the base colour." },
          { type: "computedStyle", selector: ".s4", property: "background-color", expected: ["hsl(210 80% 35%)", "rgb(18, 89, 161)"], message: "`.s4` is `hsl(210 80% 35%)`." },
          { type: "computedStyle", selector: ".s5", property: "background-color", expected: ["hsl(210 80% 18%)", "rgb(9, 46, 83)"], message: "`.s5` is `hsl(210 80% 18%)`, the darkest shade." },
          { type: "computedStyle", selector: ".s4, .s5", property: "color", expected: ["white", "rgb(255, 255, 255)"], match: "all", message: "The two darkest shades have white text." },
        ],
        solution: {
          html: `<div class="row">
  <div class="shade s1">100</div>
  <div class="shade s2">300</div>
  <div class="shade s3">500</div>
  <div class="shade s4">700</div>
  <div class="shade s5">900</div>
</div>`,
          css: `body {
  margin: 0;
  padding: 24px;
  font-family: system-ui, sans-serif;
}

.row {
  display: flex;
}

.shade {
  flex: 1;
  padding: 36px 8px;
  text-align: center;
  font-weight: 700;
}

.s1 { background-color: hsl(210 80% 92%); }
.s2 { background-color: hsl(210 80% 75%); }
.s3 { background-color: hsl(210 80% 55%); }
.s4 { background-color: hsl(210 80% 35%); }
.s5 { background-color: hsl(210 80% 18%); }

.s4, .s5 {
  color: white;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-invalid-colours",
      kind: "debug",
      title: "Debug: the colours that never appear",
      summary: "Five declarations are silently ignored by the browser. Find out why each one is invalid.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<h1 class="title">Trail report</h1>
<p class="subtitle">Updated this morning</p>
<span class="tag">Open</span>
<a class="button" href="#map">View map</a>
<p class="note">Bring a headlamp after 5pm.</p>`,
        css: `body {
  font-family: system-ui, sans-serif;
  padding: 16px;
}

.title {
  color: #1e3a8;
}

.subtitle {
  colour: #475569;
}

.tag {
  background-color: rgb(220, 252 231);
}

.button {
  display: inline-block;
  padding: 8px 14px;
  color: #ffffff;
  background-color: 4f46e5;
}

.note {
  color: #b45309
  background-color: #fffbeb;
}
`,
      },
      challenge: {
        title: "Make every colour apply",
        description:
          "The designer's colours are all in the CSS, but none of them show up: the title is plain black, the subtitle is black, the tag has no fill, the button is invisible against the page, and the note has neither its text colour nor its background. CSS never reports errors, so every colour has a typo of some kind. Fix each declaration so the intended colours apply: title `#1e3a8a`, subtitle `#475569`, tag background `rgb(220 252 231)`, button background `#4f46e5`, note text `#b45309` and note background `#fffbeb`.",
        hints: [
          "Use the explain panel's Heads up card, and your browser's DevTools, where an invalid declaration is shown struck through.",
          "Look for: a hex with the wrong number of digits, a misspelled property, a mix of commas and spaces, a missing `#`, and a missing semicolon.",
          "A hex colour has 3, 4, 6 or 8 digits. The property is spelled `color`. A missing semicolon makes two declarations merge into one invalid one.",
        ],
        checks: [
          { type: "computedStyle", selector: ".title", property: "color", expected: ["#1e3a8a", "rgb(30, 58, 138)"], message: "The title is navy: `#1e3a8a`." },
          { type: "computedStyle", selector: ".subtitle", property: "color", expected: ["#475569", "rgb(71, 85, 105)"], message: "The subtitle text is `#475569`." },
          { type: "computedStyle", selector: ".tag", property: "background-color", expected: ["rgb(220 252 231)", "rgb(220, 252, 231)"], message: "The tag background is `rgb(220 252 231)`." },
          { type: "computedStyle", selector: ".button", property: "background-color", expected: ["#4f46e5", "rgb(79, 70, 229)"], message: "The button background is `#4f46e5`." },
          { type: "computedStyle", selector: ".note", property: "color", expected: ["#b45309", "rgb(180, 83, 9)"], message: "The note text is `#b45309`." },
          { type: "computedStyle", selector: ".note", property: "background-color", expected: ["#fffbeb", "rgb(255, 251, 235)"], message: "...and its background is `#fffbeb`." },
        ],
        solution: {
          html: `<h1 class="title">Trail report</h1>
<p class="subtitle">Updated this morning</p>
<span class="tag">Open</span>
<a class="button" href="#map">View map</a>
<p class="note">Bring a headlamp after 5pm.</p>`,
          css: `body {
  font-family: system-ui, sans-serif;
  padding: 16px;
}

.title {
  color: #1e3a8a;
}

.subtitle {
  color: #475569;
}

.tag {
  background-color: rgb(220 252 231);
}

.button {
  display: inline-block;
  padding: 8px 14px;
  color: #ffffff;
  background-color: #4f46e5;
}

.note {
  color: #b45309;
  background-color: #fffbeb;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "alpha-and-opacity",
      kind: "learn",
      title: "Alpha and opacity",
      summary: "Two ways to make something see-through, and why they behave very differently.",
      minutes: 9,
      concept: {
        description:
          "Colour can be partly see-through in two different ways. An **alpha** value makes one colour transparent, such as a background. The `opacity` property makes a whole element transparent: its background, text, border and every child inside it.",
        why: "Choosing the wrong one is behind many washed-out cards and faint buttons. Alpha lets you add an overlay or a tint while the text stays crisp. Opacity is for fading a whole thing in or out together.",
        mentalModel:
          "Alpha is tinted glass: only the glass is see-through, and the writing on it stays solid. Opacity is a ghost: the whole thing, writing and all, fades together.",
      },
      body: [
        { type: "heading", text: "Alpha: transparency inside one colour" },
        {
          type: "paragraph",
          text: "Alpha is an extra channel on a colour, from 0 (invisible) to 1 (solid). You have already met it: `rgb(0 0 0 / 0.5)`, `hsl(220 80% 55% / 40%)` and `#0000ff80` all carry an alpha value. It changes only that one colour. If a background has alpha, the text on top is still drawn with its own `color`, so it stays sharp and fully solid.",
        },
        {
          type: "code",
          language: "css",
          code: `.overlay {
  background-color: rgb(0 0 0 / 0.6);
  color: #ffffff;
}`,
          caption: "A dark see-through layer with solid white text",
        },
        { type: "heading", text: "opacity: transparency for the whole element" },
        {
          type: "paragraph",
          text: "The `opacity` property takes a number from 0 to 1 and applies it to everything the element draws: background, text, borders, images and all of its children. It is perfect for fading something in and out, or for a quick greyed-out look.",
        },
        {
          type: "paragraph",
          text: "There is one rule that surprises people. A child can never be more opaque than its parent. If a parent has `opacity: 0.5` and a child has `opacity: 1`, the child is still only half visible, because the child is drawn inside a parent that is already faded. You cannot \"switch off\" a parent's opacity from inside it.",
        },
        {
          type: "code",
          language: "css",
          code: `.card.is-loading {
  opacity: 0.5;
}`,
          caption: "The whole card, and everything in it, at half strength",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.hero-card {
  background-color: rgb(255 255 255 / 0.6);
  color: #0f172a;
}`,
            note: "Only the background is see-through. The text stays sharp and readable.",
          },
          bad: {
            code: `.hero-card {
  background-color: #ffffff;
  opacity: 0.6;
}`,
            note: "Everything fades together, including the text, which now has much weaker contrast against what is behind it.",
          },
        },
        { type: "heading", text: "A see-through colour has no fixed look" },
        {
          type: "paragraph",
          text: "A transparent colour blends with whatever sits behind it. The same `rgb(0 0 0 / 0.5)` looks mid grey over white, and nearly black over navy. That is exactly why it is useful for shadows, overlays and tints that work on any background. It also means you cannot judge the contrast of a see-through colour on its own, and you need to check it against the real background.",
        },
        {
          type: "callout",
          tone: "warning",
          text: "Fading text with `opacity` or with a see-through text colour lowers its contrast, often below a readable level. For a quieter look, pick a lighter but solid colour and check its contrast ratio.",
        },
        {
          type: "callout",
          tone: "note",
          text: "Any `opacity` below 1 also puts the element into its own layer, called a stacking context. That can change how `z-index` behaves. A later lesson covers it in detail.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Alpha makes a single colour see-through, so a background can fade while the text stays solid.",
            "`opacity` fades the whole element and every child inside it together.",
            "A child can never be more opaque than its parent, so setting `opacity: 1` inside a faded parent does nothing.",
            "See-through colours blend with whatever is behind them, so check contrast against the real background.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "alpha-explorer",
      kind: "visualizer",
      title: "Alpha vs opacity explorer",
      summary: "Fade a card two ways and see which one takes the text down with it.",
      minutes: 9,
      concept: {
        description:
          "A card sits on top of a colourful background. You can make it see-through with `opacity`, which fades everything on the card, or with an alpha background colour, which fades only the fill.",
        why: "Watching the same card go from crisp to washed-out and back again makes the difference unforgettable, and it shows why a see-through background is almost always the better choice for a panel with text on it.",
        mentalModel:
          "Opacity is turning down the whole card, text and all. Alpha is swapping the board for tinted glass while the writing stays as it was.",
      },
      stage: {
        html: '<div class="scene">\n  <div class="card">\n    <h3 class="title">Weekend trail pass</h3>\n    <p class="text">Valid on all marked routes.</p>\n  </div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 16px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; overflow: hidden; }\n.scene { height: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: center; padding: 16px; border-radius: 14px; background: linear-gradient(135deg, #f97316 0%, #ec4899 40%, #6366f1 70%, #06b6d4 100%); }\n.card { width: 85%; box-sizing: border-box; padding: 18px 20px; border-radius: 12px; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.25); }\n.title { margin: 0 0 6px; font-size: 20px; }\n.text { margin: 0; font-size: 15px; }",
        annotate: "none",
        target: ".card",
        items: ".card",
      },
      starter: `.card {
  background-color: #ffffff;
  color: #0f172a;
  opacity: 0.6;
}
`,
      controls: [
        { id: "opacity", label: "opacity", selector: ".card", property: "opacity", fallback: "1", type: "range", min: 0, max: 1, step: 0.1, help: "Fades the card and everything inside it." },
        { id: "background", label: "background", selector: ".card", property: "background-color", fallback: "transparent", type: "options", options: ["#ffffff", "rgb(255 255 255 / 0.8)", "rgb(255 255 255 / 0.5)", "rgb(255 255 255 / 0.2)", "rgb(15 23 42 / 0.6)"], help: "Alpha fades only the fill. The text stays solid." },
        { id: "color", label: "text colour", selector: ".card", property: "color", fallback: "black", type: "options", options: ["#0f172a", "#ffffff", "rgb(15 23 42 / 0.5)"], help: "The last option gives the text itself some alpha." },
        { id: "border", label: "border", selector: ".card", property: "border", fallback: "none", type: "options", options: ["none", "2px solid #ffffff", "2px solid rgb(255 255 255 / 0.5)"], help: "Opacity fades the border too. An alpha border colour fades only the border." },
      ],
      presets: [
        { id: "frosted", label: "Frosted glass", description: "alpha background, solid text", css: ".card { background-color: rgb(255 255 255 / 0.5); opacity: 1; }" },
        { id: "faded", label: "Faded card", description: "opacity fades everything", css: ".card { background-color: #ffffff; opacity: 0.5; }" },
        { id: "dark", label: "Dark glass", description: "dark alpha fill, white text", css: ".card { background-color: rgb(15 23 42 / 0.6); color: #ffffff; opacity: 1; }" },
        { id: "solid", label: "Solid again", description: "back to a normal card", css: ".card { background-color: #ffffff; color: #0f172a; opacity: 1; }" },
      ],
      challenge: {
        title: "See-through card, solid text",
        description:
          "The card is faded with `opacity`, so its text is washed out too. Make the card's background half see-through white (white at 50% alpha), and put the `opacity` back to `1`, so only the fill is see-through and the text stays crisp.",
        hints: [
          "You need two changes: a different `background-color`, and a different `opacity`.",
          "Use `rgb()` with a slash for the alpha: `rgb(255 255 255 / 0.5)`.",
          "`.card { background-color: rgb(255 255 255 / 0.5); opacity: 1; }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".card", property: "background-color", expected: ["rgb(255 255 255 / 0.5)", "rgb(255 255 255 / 50%)", "rgba(255, 255, 255, 0.5)"], message: "The card background is white at 50% alpha." },
          { type: "computedStyle", selector: ".card", property: "opacity", expected: "1", message: "The card's `opacity` is `1`, so the text stays solid." },
        ],
        solution: `.card {
  background-color: rgb(255 255 255 / 0.5);
  color: #0f172a;
  opacity: 1;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-opacity",
      kind: "predict",
      title: "Predict the opacity",
      summary: "Work out which text fades, and why a child cannot undo its parent's opacity.",
      minutes: 6,
      mode: "css",
      intro: "Three black boxes with white text sit on a yellow strip. They use alpha and opacity in different ways. Predict how the text behaves in each one, then run the code.",
      code: {
        html: `<div class="strip">
  <div class="box a">A: alpha</div>
  <div class="box b">B: opacity</div>
  <div class="box c"><span class="inner">C: nested</span></div>
</div>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.strip {
  display: flex;
  gap: 12px;
  padding: 20px;
  background-color: #fde047;
}

.box {
  flex: 1;
  padding: 20px 12px;
  color: #ffffff;
  font-weight: 700;
  text-align: center;
}

.a { background-color: rgb(0 0 0 / 0.5); }

.b {
  background-color: #000000;
  opacity: 0.5;
}

.c {
  background-color: #000000;
  opacity: 0.5;
}

.inner { opacity: 1; }`,
      },
      questions: [
        {
          prompt: "In box A, how solid is the white text?",
          options: ["Half see-through, like the background", "Fully solid: only the background has alpha", "Invisible against the yellow", "It depends on the screen"],
          answerIndex: 1,
          hint: "Where is the transparency applied: to the whole element, or to one colour?",
          explanation: "The alpha is in the `background-color` only, so only the black fill is half see-through. The text keeps its own solid `#ffffff`.",
          proves: [
            { type: "computedStyle", selector: ".a", property: "background-color", expected: ["rgb(0 0 0 / 0.5)", "rgba(0, 0, 0, 0.5)"], message: "Box A's background has 50% alpha." },
            { type: "computedStyle", selector: ".a", property: "opacity", expected: "1", message: "Box A has no `opacity` set." },
          ],
        },
        {
          prompt: "Box B has a solid black background and `opacity: 0.5`. What happens to its text?",
          options: ["It stays fully solid", "It turns black", "It becomes bigger", "It fades along with the box"],
          answerIndex: 3,
          hint: "`opacity` is applied to the element as a whole.",
          explanation: "`opacity` fades everything the element draws, so the text fades too, giving it a lower contrast against the dark grey box.",
          proves: [{ type: "computedStyle", selector: ".b", property: "opacity", expected: "0.5", message: "Box B has `opacity: 0.5`." }],
        },
        {
          prompt: "In box C, the inner span has `opacity: 1`. How visible is its text?",
          options: ["Half faded, because a child cannot be more opaque than its parent", "Fully solid, because it overrides the parent", "Completely invisible", "Solid, but only on hover"],
          answerIndex: 0,
          hint: "The child is drawn inside a parent that is already half see-through.",
          explanation: "A child's opacity is applied inside its parent's. The parent fades everything inside it by 50%, and the child's `opacity: 1` only means \"do not fade me any further\". It cannot undo the parent's fade.",
          proves: [
            { type: "computedStyle", selector: ".c", property: "opacity", expected: "0.5", message: "Box C has `opacity: 0.5`." },
            { type: "computedStyle", selector: ".inner", property: "opacity", expected: "1", message: "The inner span has `opacity: 1`." },
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-style-an-alert",
      kind: "lab",
      title: "Lab: style a success alert",
      summary: "Use named, hex, rgb(), hsl(), alpha and transparent colours together.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<div class="alert">
  <span class="alert-icon">!</span>
  <div>
    <p class="alert-title">Deployment finished</p>
    <p class="alert-note">All 14 checks passed in 2 minutes.</p>
  </div>
</div>`,
        css: `body {
  margin: 0;
  padding: 24px;
  font-family: system-ui, sans-serif;
}

.alert {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 380px;
  padding: 16px;
  border: 2px solid #cbd5e1;
  border-radius: 12px;
  background-color: #f1f5f9;
  color: #334155;
}

.alert-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #cbd5e1;
  font-weight: 700;
}

.alert-title {
  margin: 0;
  font-weight: 700;
}

.alert-note {
  margin: 4px 0 0;
  font-size: 14px;
}
`,
      },
      challenge: {
        title: "Turn the grey alert green",
        description:
          "The alert is all neutral grey. Restyle it as a success message, using the notation named for each part: `.alert` text in hex `#14532d`, `.alert` background in `rgb(220 252 231)` and its border in `hsl(142 71% 45%)`. Then colour `.alert-title` with the named colour `darkgreen`, give `.alert-note` the colour `rgb(20 83 45 / 0.75)` and make the icon's background `transparent`.",
        hints: [
          "Everything is already in the CSS. You are changing the colour values in the `.alert`, `.alert-icon` and `.alert-note` rules.",
          "The `.alert` rule needs three changes: `color`, `background-color` and `border-color`.",
          "`.alert-title` and `.alert-note` have no colour yet, so each needs a new `color` declaration. The alpha goes after a slash.",
          "Set `.alert-icon` to `background-color: transparent`.",
        ],
        checks: [
          { type: "computedStyle", selector: ".alert", property: "color", expected: ["#14532d", "rgb(20, 83, 45)"], message: "The alert text is `#14532d`." },
          { type: "computedStyle", selector: ".alert", property: "background-color", expected: ["rgb(220 252 231)", "rgb(220, 252, 231)"], message: "The alert background is `rgb(220 252 231)`." },
          { type: "computedStyle", selector: ".alert", property: "border-color", expected: ["hsl(142 71% 45%)", "rgb(33, 196, 93)"], message: "The alert border is `hsl(142 71% 45%)`." },
          { type: "computedStyle", selector: ".alert-title", property: "color", expected: ["darkgreen", "rgb(0, 100, 0)"], message: "The title is the named colour `darkgreen`." },
          { type: "computedStyle", selector: ".alert-note", property: "color", expected: ["rgb(20 83 45 / 0.75)", "rgba(20, 83, 45, 0.75)"], message: "The note is `rgb(20 83 45 / 0.75)`." },
          { type: "computedStyle", selector: ".alert-icon", property: "background-color", expected: ["transparent", "rgba(0, 0, 0, 0)"], message: "The icon background is `transparent`." },
        ],
        solution: {
          html: `<div class="alert">
  <span class="alert-icon">!</span>
  <div>
    <p class="alert-title">Deployment finished</p>
    <p class="alert-note">All 14 checks passed in 2 minutes.</p>
  </div>
</div>`,
          css: `body {
  margin: 0;
  padding: 24px;
  font-family: system-ui, sans-serif;
}

.alert {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 380px;
  padding: 16px;
  border: 2px solid #cbd5e1;
  border-color: hsl(142 71% 45%);
  border-radius: 12px;
  background-color: rgb(220 252 231);
  color: #14532d;
}

.alert-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: transparent;
  font-weight: 700;
}

.alert-title {
  margin: 0;
  color: darkgreen;
  font-weight: 700;
}

.alert-note {
  margin: 4px 0 0;
  color: rgb(20 83 45 / 0.75);
  font-size: 14px;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "contrast-and-accessibility",
      kind: "learn",
      title: "Contrast and accessible colour",
      summary: "The contrast ratios text must meet, why colour alone is never enough, and how to check a pair.",
      minutes: 10,
      concept: {
        description:
          "**Contrast** is the difference in brightness between text and the background behind it. The Web Content Accessibility Guidelines (WCAG) measure it as a ratio from 1:1 (no difference) to 21:1 (black on white), and set minimums that text and interface parts must reach.",
        why: "Low contrast is the most common accessibility failure on the web, and it affects far more people than you might expect: people with low vision, people with a colour vision difference, and anyone reading a phone in bright sunlight. Getting it right costs nothing at design time, and fixing it later is expensive.",
        mentalModel:
          "Squint at your page. What you can still read is high contrast. If the words melt into the background when you squint, they are too close in brightness, however pretty the colours are.",
      },
      body: [
        { type: "heading", text: "The numbers to remember" },
        {
          type: "paragraph",
          text: "WCAG level AA asks for a ratio of at least **4.5:1** for normal text and **3:1** for large text, which means about 24px, or about 19px and bold. It also asks for 3:1 for the visual parts of controls and meaningful graphics, such as the border of an input or an icon button. Level AAA is stricter, at 7:1 for normal text. Black on white is the maximum, 21:1.",
        },
        {
          type: "list",
          items: [
            "Normal text: 4.5:1 or more (AA), or 7:1 or more (AAA).",
            "Large text: 3:1 or more (AA).",
            "Input borders, icons and other meaningful graphics: 3:1 or more.",
            "Purely decorative content and disabled controls are exempt.",
          ],
        },
        { type: "heading", text: "Real examples" },
        {
          type: "paragraph",
          text: "Contrast is about brightness, not hue, so a pair that looks fine can still fail. Mid greys are the classic trap. `#767676` on white is 4.54:1 and only just passes, while `#777777` is 4.48:1 and fails by a hair. The popular light grey `#999999` reaches only 2.85:1. White text on a bright green such as `#16a34a` is about 3.3:1, which fails for normal text, while the slightly darker `#15803d` reaches 5.0:1.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.help-text {
  color: #475569;
  background-color: #ffffff;
}`,
            note: "About 7.6:1, which passes AA and AAA, and still looks like quiet secondary text.",
          },
          bad: {
            code: `.help-text {
  color: #94a3b8;
  background-color: #ffffff;
}`,
            note: "About 2.6:1. It looks soft and stylish on a good monitor, and is close to unreadable for many people.",
          },
        },
        { type: "heading", text: "Do not rely on colour alone" },
        {
          type: "paragraph",
          text: "Roughly 1 in 12 men and 1 in 200 women have some kind of colour vision difference, and red and green are the pair most often confused. Sunlight, cheap screens, night modes and printers also flatten colour for everyone else. So colour must never be the only way to show something. A form field marked invalid only by a red border is not enough: add an icon and a message such as \"Enter a valid email address\". A link inside a paragraph needs an underline, not just a different colour.",
        },
        {
          type: "code",
          language: "css",
          code: `.field-error {
  color: #b91c1c;
}

.field-error::before {
  content: "Error: ";
  font-weight: 700;
}`,
          caption: "A red message that is still clear without the red",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Chrome and Firefox DevTools show the contrast ratio right in the colour picker for any text colour, with a line marking where AA passes. Check your colour pairs there before you commit to them.",
        },
        { type: "heading", text: "Respecting user settings" },
        {
          type: "paragraph",
          text: "Some people ask their system for more contrast or force their own colour palette. CSS can respond with the `prefers-contrast` and `forced-colors` media queries, and system colour keywords such as `CanvasText` follow those settings automatically. The best default is to leave plenty of headroom: choose a ratio comfortably above the minimum, so your design survives a worse screen.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "AA needs 4.5:1 for normal text, 3:1 for large text and 3:1 for controls and meaningful graphics.",
            "Contrast depends on brightness, so mid greys and bright colours with white text often fail.",
            "Never use colour as the only signal: add text, an icon, an underline or a pattern.",
            "Check ratios in DevTools, and aim comfortably above the minimum.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "modern-color-spaces",
      kind: "learn",
      title: "Modern colour spaces: oklch and display-p3",
      summary: "Why sRGB is limited, what oklch() fixes, and how to use new colours without breaking old browsers.",
      minutes: 10,
      concept: {
        description:
          "A **colour space** is the model used to describe colours. Hex, `rgb()` and `hsl()` all describe colours in sRGB, the standard the web has used since the 1990s. Modern CSS adds spaces that can show more colours (`display-p3`) and spaces designed to match human vision (`oklab()` and `oklch()`).",
        why: "Many modern screens can show colours outside sRGB, and `oklch()` makes it much easier to build palettes whose steps look evenly spaced and whose contrast is predictable. It is where colour in CSS is heading.",
        mentalModel:
          "sRGB is a small box of crayons. Wide-gamut spaces are the bigger box with more vivid colours. `oklch()` is a crayon box arranged by how the colours look to your eye, not by how a screen happens to mix them.",
      },
      body: [
        { type: "heading", text: "Why sRGB runs out" },
        {
          type: "paragraph",
          text: "Many phones, laptops and TVs can show colours that sRGB cannot. The Display P3 range, used by Apple and many other devices, is roughly a quarter larger. Hex, `rgb()` and `hsl()` cannot name those colours, because their numbers stop at full red, green and blue. The `color()` function can: `color(display-p3 1 0 0)` is a red more vivid than `#ff0000`. On a screen that cannot show it, the browser quietly picks the nearest colour it can.",
        },
        { type: "heading", text: "oklch()" },
        {
          type: "paragraph",
          text: "`oklch()` takes three values. **L** is lightness from 0 to 1 (or 0% to 100%). **C** is chroma, how much colour there is, where 0 is grey and real colours rarely pass 0.4. **H** is the hue angle from 0 to 360. The big win is that its lightness matches how bright colours look. Two colours with the same L look equally light whatever their hue, which is exactly what `hsl()` fails to do. That makes it easy to build a scale that looks evenly spaced, and to predict whether text on it passes contrast.",
        },
        {
          type: "code",
          language: "css",
          code: `.button {
  background-color: oklch(0.55 0.2 270);
  color: oklch(0.98 0 0);
}

.button:hover {
  background-color: oklch(0.48 0.2 270);
}`,
          caption: "A violet button and its darker hover state: only L changed",
        },
        {
          type: "paragraph",
          text: "The hue angles in `oklch()` are not the same as in `hsl()`, so you cannot copy a hue number from one to the other. There are close relatives too: `oklab()`, `lab()` and `lch()` use a similar idea, and `hwb()` describes a colour as a hue plus an amount of white and black.",
        },
        { type: "heading", text: "Using them without breaking old browsers" },
        {
          type: "paragraph",
          text: "A browser that does not understand a colour function treats the whole declaration as invalid and drops it. You can use that on purpose: write a safe value first, then the modern value after it. Modern browsers use the last one, and older browsers keep the first. For bigger changes, `@supports (color: oklch(0 0 0))` lets you wrap a whole block of modern colour.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.hero {
  background-color: #4f46e5;
  background-color: oklch(0.55 0.2 270);
}`,
            note: "A browser without `oklch()` ignores the second line and still gets a sensible colour from the first.",
          },
          bad: {
            code: `.hero {
  background-color: oklch(0.55 0.2 270);
}`,
            note: "On a browser that does not know `oklch()`, the declaration is dropped and the hero has no background at all.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "A colour too vivid for the screen is mapped to the nearest one that fits (gamut mapping). If two very high chroma values look identical on your monitor, the screen has run out of range, not your CSS.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Hex, `rgb()` and `hsl()` live in sRGB. `color(display-p3 ...)` reaches the wider range of modern screens.",
            "`oklch(L C H)` has perceptual lightness, so equal L means equal brightness whatever the hue.",
            "Hue numbers differ between `hsl()` and `oklch()`, so do not copy them across.",
            "Write a plain fallback line before a modern colour, or wrap modern colour in `@supports`.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "color-mix-and-relative-colors",
      kind: "learn",
      title: "color-mix() and relative colours",
      summary: "Derive hover colours, tints and shades from one brand colour instead of picking each by hand.",
      minutes: 9,
      concept: {
        description:
          "`color-mix()` blends two colours in a colour space you choose and returns the result. **Relative colour syntax** takes an existing colour, splits it into its channels, and lets you change them with maths, as in `oklch(from var(--brand) calc(l + 0.1) c h)`.",
        why: "Instead of storing a brand colour plus six hand-picked variants, you store one colour and derive every hover, tint and shade from it. Change the brand colour once and every variant follows.",
        mentalModel:
          "`color-mix()` is mixing two paints on a palette. Relative colour is taking a swatch you already own and asking the paint shop for the same colour, but a bit lighter.",
      },
      body: [
        { type: "heading", text: "color-mix()" },
        {
          type: "paragraph",
          text: "Write `color-mix(in oklch, #4f46e5 70%, white)` to get 70% of the brand colour and 30% white. The `in` part names the colour space where the mixing happens, and it is required, because the same two colours mix differently in different spaces. Percentages are optional: with none given, the two colours are mixed half and half. Mixing with `transparent` is a handy way to make a see-through version of any colour.",
        },
        {
          type: "code",
          language: "css",
          code: `:root {
  --brand: #4f46e5;
}

.btn {
  background-color: var(--brand);
}

.btn:hover {
  background-color: color-mix(in oklch, var(--brand), black 15%);
}

.tint {
  background-color: color-mix(in oklch, var(--brand) 12%, white);
}`,
          caption: "A hover colour and a pale tint, both derived from one value",
        },
        { type: "heading", text: "Relative colour syntax" },
        {
          type: "paragraph",
          text: "Relative colour syntax starts with the word `from` and a colour, then names the channels you want to produce. Inside the function, the channel names become variables that hold the original colour's values. For `rgb()` they are `r`, `g`, `b` and `alpha`, for `hsl()` they are `h`, `s` and `l`, and for `oklch()` they are `l`, `c` and `h`. You can use them as they are, or pass them through `calc()`.",
        },
        {
          type: "code",
          language: "css",
          code: `.lighter {
  background-color: oklch(from var(--brand) calc(l + 0.15) c h);
}

.half-see-through {
  background-color: rgb(from var(--brand) r g b / 50%);
}`,
          caption: "Keep the hue, raise the lightness. Keep the channels, change only the alpha",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.btn       { background-color: var(--brand); }
.btn:hover { background-color: color-mix(in oklch, var(--brand), black 15%); }`,
            note: "Change `--brand` once and the hover state follows automatically.",
          },
          bad: {
            code: `.btn       { background-color: #4f46e5; }
.btn:hover { background-color: #4338ca; }`,
            note: "Two separate hex values. Rebrand the button and you must remember to recalculate the hover by hand.",
          },
        },
        {
          type: "paragraph",
          text: "Why would you reach for these instead of a preprocessor? Because the browser does the maths while the page is running. If a user switches to dark mode, or a script changes `--brand`, every colour derived from it is recalculated instantly, with no build step. That makes theming, user-chosen accent colours and light and dark variants far easier to keep consistent than a pile of separate hex values.",
        },
        {
          type: "callout",
          tone: "warning",
          text: "Both features work in current versions of the major browsers, but an older browser drops the whole declaration. For colours the design cannot do without, write a plain fallback line first, as in the previous lesson.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Mix in `oklch` when you want blends and lightness changes that look natural. Mix in `srgb` when you want the same result as mixing the numbers directly.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`color-mix(in <space>, colour1 %, colour2 %)` blends two colours, and the colour space is required.",
            "Mixing with `black` or `white` makes shades and tints, and mixing with `transparent` makes see-through versions.",
            "Relative colour syntax uses `from <colour>` and channel names you can change with `calc()`.",
            "Derive variants from one source colour, and add a fallback for browsers that do not know the syntax.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "designing-a-palette",
      kind: "learn",
      title: "Designing a palette",
      summary: "Choose colours by role, build a scale, keep everything in one place, and prepare for dark mode.",
      minutes: 10,
      concept: {
        description:
          "A palette is a small, deliberate set of colours that a whole interface uses. Good palettes are organised by **role** (surface, text, brand, danger) rather than by hue, so every colour has a job, and every colour in the page comes from the set.",
        why: "Without a palette, a project slowly collects dozens of near-identical blues and greys that nobody can safely change. With one, you can re-theme the site, add a dark mode or fix a contrast problem by editing a handful of values.",
        mentalModel:
          "A palette is a wardrobe, not a shop. You choose a few pieces that go together, give each one a job, and everything you wear comes from it.",
      },
      body: [
        { type: "heading", text: "Start with roles, not colours" },
        {
          type: "paragraph",
          text: "Ask what jobs colour has to do, not which colours you like. Most interfaces need a surface colour for the page and cards, a main text colour, a quieter text colour, a border colour, one brand colour for buttons and links, and a few status colours. A common rule of thumb, known as 60-30-10, suggests about 60% neutral surfaces, 30% a secondary colour and 10% for the accent that draws the eye.",
        },
        {
          type: "list",
          items: [
            "**Surface and text:** the neutrals that carry most of the page. Keep their contrast high.",
            "**Brand:** one main colour for actions and links, with a hover and a tint derived from it.",
            "**Status:** success, warning and danger, each used together with text or an icon.",
            "**Border and muted text:** quieter neutrals that still meet contrast needs.",
          ],
        },
        { type: "heading", text: "Build a scale from one hue" },
        {
          type: "paragraph",
          text: "For the brand colour, build a scale of steps from a pale tint to a deep shade, keeping the hue steady and moving only the lightness, in `hsl()` or better in `oklch()`. Number the steps (`50`, `100`, `200` and up to `900`) so that you can insert new ones later without renaming everything. Pick text and background pairs from steps that are far enough apart to pass contrast.",
        },
        { type: "heading", text: "Keep colours in one place" },
        {
          type: "paragraph",
          text: "Write each colour once, as a custom property on `:root`, and use `var()` everywhere else. Custom properties get a full lesson later. For now, think of them as names you give to colours.",
        },
        {
          type: "code",
          language: "css",
          code: `:root {
  --surface: #ffffff;
  --text: #0f172a;
  --text-muted: #475569;
  --brand: #4338ca;
  --danger: #b91c1c;
}

.card {
  background-color: var(--surface);
  color: var(--text);
}`,
          caption: "Colours named by role, defined once",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `:root {
  --danger: #b91c1c;
}`,
            note: "The name says what the colour is for. If the danger colour changes, the name is still true.",
          },
          bad: {
            code: `:root {
  --red: #b91c1c;
}`,
            note: "Named after its hue. After a rebrand to orange, `--red` is a lie that confuses everyone.",
          },
        },
        { type: "heading", text: "Light and dark" },
        {
          type: "paragraph",
          text: "A palette organised by role makes dark mode easy: keep the roles and swap the values. `color-scheme: light dark` tells the browser that the page supports both, so it also adjusts built-in controls and scrollbars. The `light-dark()` function then picks the first colour in a light scheme and the second in a dark one, based on the user's system setting.",
        },
        {
          type: "code",
          language: "css",
          code: `:root {
  color-scheme: light dark;
  --surface: light-dark(#ffffff, #0f172a);
  --text: light-dark(#0f172a, #e2e8f0);
}`,
          caption: "One set of role names, two sets of values",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Keep a short list: one brand colour, a handful of neutrals and three status colours is enough for most products. Every extra colour is one more thing to check for contrast.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Choose colours by role (surface, text, brand, status), not by what looks nice on its own.",
            "Build a scale from one hue by changing the lightness, and number the steps.",
            "Define each colour once as a custom property named for its role, and use `var()` everywhere.",
            "`color-scheme` and `light-dark()` let the same role names carry both light and dark values.",
          ],
        },
      ],
    },

    // Guided build: step files live in ./colors/workshops/build-a-pricing-card (compiled by `npm run build:content`).
    buildAPricingCard,

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-washed-out-card",
      kind: "debug",
      title: "Debug: the washed-out card",
      summary: "The text is faint, the paragraph is hard to read and the button label has vanished.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<div class="backdrop">
  <article class="card">
    <h2 class="card-title">Weekend pass</h2>
    <p class="card-text">Valid on all marked routes until Sunday evening.</p>
    <a class="btn" href="#buy">Buy pass</a>
  </article>
</div>`,
        css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.backdrop {
  padding: 32px;
  background-color: #6366f1;
}

.card {
  max-width: 340px;
  padding: 20px;
  border-radius: 14px;
  background-color: #ffffff;
  opacity: 0.6;
}

.card-title {
  margin: 0 0 8px;
  color: #0f172a;
}

.card-text {
  margin: 0 0 16px;
  color: #cbd5e1;
}

.btn {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 8px;
  color: #4f46e5;
  background-color: #4f46e5;
  font-weight: 700;
  text-decoration: none;
}
`,
      },
      challenge: {
        title: "Fix the card's colours",
        description:
          "Three things look wrong. The whole card, heading included, looks faded against the purple. The paragraph is a pale grey that is nearly impossible to read. And the button's label has disappeared. The card should still let a hint of purple show through, but its text must stay crisp: use a white background at 85% alpha instead of fading the whole card, make the paragraph `#334155`, and give the button label `#ffffff`.",
        hints: [
          "Open DevTools and use the colour picker's contrast ratio on the paragraph and the button label. Both fail badly.",
          "Fading the whole card is done with `opacity`. See-through fills are done with alpha in the colour, like `rgb(255 255 255 / 0.85)`.",
          "Three edits: `.card` needs `opacity: 1` and an alpha background, `.card-text` needs a darker `color`, and `.btn` needs a different `color`.",
        ],
        checks: [
          { type: "computedStyle", selector: ".card", property: "opacity", expected: "1", message: "The card is no longer faded: `opacity` is `1`." },
          { type: "computedStyle", selector: ".card", property: "background-color", expected: ["rgb(255 255 255 / 0.85)", "rgba(255, 255, 255, 0.85)"], message: "The card background is white at 85% alpha." },
          { type: "computedStyle", selector: ".card-text", property: "color", expected: ["#334155", "rgb(51, 65, 85)"], message: "The paragraph text is `#334155`." },
          { type: "computedStyle", selector: ".btn", property: "color", expected: ["#ffffff", "rgb(255, 255, 255)"], message: "The button label is `#ffffff`." },
        ],
        solution: {
          html: `<div class="backdrop">
  <article class="card">
    <h2 class="card-title">Weekend pass</h2>
    <p class="card-text">Valid on all marked routes until Sunday evening.</p>
    <a class="btn" href="#buy">Buy pass</a>
  </article>
</div>`,
          css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.backdrop {
  padding: 32px;
  background-color: #6366f1;
}

.card {
  max-width: 340px;
  padding: 20px;
  border-radius: 14px;
  background-color: rgb(255 255 255 / 0.85);
  opacity: 1;
}

.card-title {
  margin: 0 0 8px;
  color: #0f172a;
}

.card-text {
  margin: 0 0 16px;
  color: #334155;
}

.btn {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 8px;
  color: #ffffff;
  background-color: #4f46e5;
  font-weight: 700;
  text-decoration: none;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "colors-quiz",
      kind: "quiz",
      title: "Quiz: colours",
      summary: "Fifteen questions on colour properties, notations, alpha, contrast and modern colour.",
      minutes: 12,
      passPercent: 70,
      questions: [
        {
          prompt: "Which property sets the colour of an element's text?",
          options: ["`background-color`", "`border-color`", "`color`", "`text-fill`"],
          answerIndex: 2,
          explanation: "`color` paints the text. `background-color` paints the fill behind it and `border-color` paints the border. `text-fill` is not a CSS property.",
        },
        {
          prompt: "`body` has `color: #1f2937`, and a paragraph inside it has no `color` of its own. What colour is the paragraph's text?",
          options: ["The browser's default black", "`#1f2937`, because `color` is inherited", "Transparent", "It depends on the paragraph's background"],
          answerIndex: 1,
          explanation: "`color` is an inherited property, so descendants use their parent's value unless a rule gives them a different one.",
        },
        {
          prompt: "What colour does the short hex value `#f80` stand for?",
          options: ["`#f08000`", "`#000f80`", "Nothing: hex needs six digits", "`#ff8800`"],
          answerIndex: 3,
          explanation: "Three-digit hex doubles each digit, so `#f80` becomes `#ff8800`. It is not `#f08000`, and the short form only works when each pair repeats a digit.",
        },
        {
          prompt: "Which of these is NOT a valid CSS colour?",
          options: ["`#4f46e5`", "`rgb(79 70 229)`", "`hsl(243 75% 59%)`", "`4f46e5`"],
          answerIndex: 3,
          explanation: "A hex colour must start with `#`. Without it, `4f46e5` is not a colour and the browser silently ignores the declaration.",
        },
        {
          prompt: "In `hsl(120 100% 50%)`, what does `120` mean?",
          options: ["The hue angle, which picks green", "The lightness", "The amount of green out of 255", "The saturation"],
          answerIndex: 0,
          explanation: "The first value in `hsl()` is the hue, an angle on the colour wheel. 120 degrees is green. Saturation and lightness are the two percentages after it.",
        },
        {
          prompt: "Which lightness gives black in `hsl()`, whatever the hue?",
          options: ["100%", "50%", "0%", "It depends on the hue"],
          answerIndex: 2,
          explanation: "Lightness 0% is always black and 100% is always white. 50% shows the colour at full strength.",
        },
        {
          prompt: "What does the keyword `currentColor` refer to?",
          options: ["The most recently used colour on the page", "Always pure black", "The colour of the user's text selection", "The element's own `color` value"],
          answerIndex: 3,
          explanation: "`currentColor` is replaced by the element's text colour, so borders and icons that use it follow the text colour automatically.",
        },
        {
          prompt: "What happens to the text inside this card?",
          code: { language: "css", code: ".card {\n  background-color: #ffffff;\n  opacity: 0.5;\n}" },
          options: ["It stays fully solid", "It fades along with the background", "It turns white", "It disappears completely"],
          answerIndex: 1,
          explanation: "`opacity` applies to the whole element, so the text, border and any children fade together with the background.",
        },
        {
          prompt: "Which declaration gives a half-transparent black background?",
          options: ["`background-color: rgb(0 0 0 / 50%);`", "`background-color: rgb(0 0 0, 50%);`", "`background-color: black(50%);`", "`background-color: #000 50;`"],
          answerIndex: 0,
          explanation: "Alpha goes after a slash inside `rgb()`: `rgb(0 0 0 / 50%)`. The other forms are not valid colours.",
        },
        {
          prompt: "What contrast ratio does WCAG level AA require for normal-sized text?",
          options: ["3:1", "7:1", "4.5:1", "21:1"],
          answerIndex: 2,
          explanation: "AA requires at least 4.5:1 for normal text (3:1 for large text). 7:1 is the stricter AAA level, and 21:1 is the maximum possible, black on white.",
        },
        {
          prompt: "A form marks invalid fields only by turning their border red. What is the problem?",
          options: ["Some users cannot tell the colours apart, so it needs a message or an icon too", "Red is not allowed on borders", "Borders cannot change colour", "There is no problem: red is universally understood"],
          answerIndex: 0,
          explanation: "Colour must never be the only signal. People with a colour vision difference, or on a washed-out screen, may miss it. Add text or an icon.",
        },
        {
          prompt: "Why is `oklch()` helpful for building a palette?",
          options: ["It uses fewer characters than hex", "It works in every older browser", "It is required for dark mode", "Its lightness matches how bright a colour looks, so steps look evenly spaced"],
          answerIndex: 3,
          explanation: "In `oklch()`, equal lightness means equal perceived brightness whatever the hue, which `hsl()` does not guarantee. That makes scales and contrast much more predictable.",
        },
        {
          prompt: "What does `color-mix(in oklch, #4f46e5, black 15%)` produce?",
          options: ["The brand colour made 15% more transparent", "A slightly darker version of the brand colour", "Pure black", "An error, because both colours need percentages"],
          answerIndex: 1,
          explanation: "It mixes 85% of the brand colour with 15% black, giving a slightly darker version. Percentages are optional, and the other colour takes whatever is left.",
        },
        {
          prompt: "A browser does not understand `oklch()`. Which colour does it use here?",
          code: { language: "css", code: ".a {\n  color: #4f46e5;\n  color: oklch(0.55 0.2 270);\n}" },
          options: ["No colour: the whole rule fails", "It shows an error in the page", "`#4f46e5`, because the invalid second declaration is ignored", "It converts `oklch()` to hex automatically"],
          answerIndex: 2,
          explanation: "An unknown value makes only that one declaration invalid, so the browser drops it and keeps the earlier `color`. That is why you write a safe value first.",
        },
        {
          prompt: "Which custom property name is best for the colour used for error messages?",
          options: ["`--red`", "`--danger`", "`--color-1`", "`--ff0000`"],
          answerIndex: 1,
          explanation: "Names should describe a role, not a hue or a value. If the error colour changes to orange, `--danger` is still true, while `--red` would be misleading.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "colors-review",
      kind: "review",
      title: "Review: colour cheat sheet",
      summary: "Every notation, the alpha and opacity rules, and the contrast numbers on one page.",
      minutes: 4,
      body: [
        { type: "heading", text: "Where colour goes" },
        {
          type: "code",
          language: "css",
          code: `color: #1f2937;             /* text (inherited) */
background-color: #ffffff;  /* fill behind the content, not inherited */
border-color: #cbd5e1;      /* border line; needs a border-style */
border: 1px solid currentColor;  /* border that follows the text colour */`,
        },
        { type: "heading", text: "The same purple, written many ways" },
        {
          type: "code",
          language: "css",
          code: `rebeccapurple                /* named */
#663399   #639   #663399cc   /* hex: 6, 3 and 8 digits */
rgb(102 51 153)              /* rgb, channels 0-255 */
rgb(102 51 153 / 80%)        /* with alpha */
hsl(270 50% 40%)             /* hue 0-360, saturation, lightness */
oklch(0.44 0.16 313)         /* perceptual lightness, chroma, hue (approx.) */
color(display-p3 0.4 0.2 0.58) /* wide gamut (approx.) */
transparent   currentColor   /* keywords */`,
        },
        { type: "heading", text: "Alpha or opacity" },
        {
          type: "code",
          language: "css",
          code: `background-color: rgb(0 0 0 / 0.5);  /* only the fill is see-through */
opacity: 0.5;                        /* the whole element fades, children too */`,
        },
        { type: "heading", text: "Derive, do not repeat" },
        {
          type: "code",
          language: "css",
          code: `:root { --brand: #4338ca; }
.btn:hover { background-color: color-mix(in oklch, var(--brand), black 15%); }
.tint      { background-color: oklch(from var(--brand) calc(l + 0.3) c h); }
:root { color-scheme: light dark; --surface: light-dark(#fff, #0f172a); }`,
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "`color` is inherited. `background-color` is not, and defaults to `transparent`.",
            "Hex needs `#` and 3, 4, 6 or 8 digits. A malformed colour is silently dropped.",
            "Use commas throughout or spaces throughout in `rgb()` and `hsl()`. Alpha goes after a slash in the modern form.",
            "Change only the lightness in `hsl()` or `oklch()` to make tints, shades and hover states.",
            "A child can never be more opaque than its parent, so `opacity: 1` inside a faded parent changes nothing.",
            "AA contrast: 4.5:1 for normal text, 3:1 for large text and for UI parts. Never use colour alone as a signal.",
            "Write a plain fallback colour before any modern colour function.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "When a colour does not apply, check three things in DevTools: the declaration is not struck through as invalid, nothing more specific overrides it, and you used the right property for the part you are colouring.",
        },
      ],
    },
  ],
};

export default content;
