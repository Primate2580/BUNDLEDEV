import type { TopicContent } from "@/engine/types";
import buildAProductCard from "./backgrounds-borders/workshops/build-a-product-card/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
      id: "background-color-and-clip",
      kind: "learn",
      title: "Background colour and where it paints",
      summary: "What a background covers by default, how background-clip and background-origin change it, and gradient text.",
      minutes: 9,
      concept: {
        description:
          "A background fills an element's box, and by default it reaches all the way **under the border**. Two properties refine that: `background-clip` decides how far the paint extends, and `background-origin` decides where background images start. A clip of `text` even paints the background only inside the letters.",
        why: "You usually do not notice where a background stops until a translucent or dashed border shows the paint underneath it, or until a background image starts in the wrong place. Knowing the two boxes involved fixes those surprises and unlocks effects like gradient text.",
        mentalModel:
          "Think of an element as a framed picture. By default, the canvas (background) runs right to the outer edge of the frame, so it shows through any gaps in the frame. `background-clip` lets you cut the canvas back to the inside of the frame, or even to the shape of the letters.",
      },
      body: [
        { type: "heading", text: "The default: paint under the border" },
        {
          type: "paragraph",
          text: "`background-color` fills the element's **border box**: the content, the padding and the border area. Normally a solid border covers the paint beneath it, so you never see the difference. With a dashed, dotted or semi-transparent border, though, the background shows through the gaps. The default colour is `transparent`, and a background is not inherited, so a child shows its parent's background through itself rather than copying it.",
        },
        {
          type: "paragraph",
          text: "One more detail is worth knowing. If the `html` element has no background of its own, the background of `body` is passed up to paint the entire page canvas. That is why a colour on `body` fills the whole window even when the body is short.",
        },
        { type: "heading", text: "background-clip" },
        {
          type: "paragraph",
          text: "`background-clip` chooses how far the paint reaches: `border-box` (the default), `padding-box` (stops at the inside edge of the border), `content-box` (only behind the content) or `text` (only behind the glyphs of the text). Clipping to `padding-box` stops the background showing through a translucent border, giving a cleaner edge.",
        },
        {
          type: "code",
          language: "css",
          code: `.badge {
  padding: 0.5rem 1rem;
  border: 4px dashed rgb(79 70 229 / 0.45);
  background-color: #e0e7ff;
  background-clip: padding-box;
}`,
          caption: "The pale fill stops at the border instead of showing through the dashes",
        },
        { type: "heading", text: "background-origin" },
        {
          type: "paragraph",
          text: "`background-origin` sets the box that background **images** and gradients are positioned against. The default is `padding-box`, so a `top left` image starts just inside the border. It does not affect the colour, which always fills the clip area. Clip and origin are independent, which is why a pattern can start in one box and be cut off at another.",
        },
        { type: "heading", text: "Gradient text" },
        {
          type: "paragraph",
          text: "A famous use of `background-clip: text` makes text filled with a gradient. You give the element a gradient background, clip it to the text, and make the text colour `transparent` so the background shows through. Include the `-webkit-` prefixed versions as well, because older browsers need them.",
        },
        {
          type: "code",
          language: "css",
          code: `.headline {
  background-image: linear-gradient(90deg, #4f46e5, #db2777);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}`,
          caption: "A headline painted with a gradient instead of a flat colour",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card {
  border: 6px solid rgb(15 23 42 / 0.2);
  background-color: #ffffff;
  background-clip: padding-box;
}`,
            note: "The white stops at the border, so the translucent border looks like a clean, even frame.",
          },
          bad: {
            code: `.card {
  border: 6px solid rgb(15 23 42 / 0.2);
  background-color: #ffffff;
}`,
            note: "The white extends under the border, so the translucent border looks muddy where the two overlap.",
          },
        },
        {
          type: "callout",
          tone: "warning",
          text: "Gradient text relies on `color: transparent`. If the background fails to load or clip, the text disappears. Put a normal `color` on a fallback rule, or use `@supports (background-clip: text)` to apply the effect only where it works.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A background fills the border box by default, so it shows under translucent or dashed borders.",
            "`background-clip` can stop it at the `padding-box` or `content-box`, or clip it to the text.",
            "`background-origin` sets where images and gradients are positioned, and defaults to `padding-box`.",
            "Gradient text needs `background-clip: text` and a transparent text colour, plus a fallback.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "background-images",
      kind: "learn",
      title: "Background images, repeat and position",
      summary: "How url() images work, when to use a background instead of an img, and how repeat and position behave.",
      minutes: 10,
      concept: {
        description:
          "`background-image` paints one or more images behind an element's content, using `url()` for files and functions such as `linear-gradient()` for generated ones. `background-repeat` decides whether the image tiles, and `background-position` decides where it sits.",
        why: "Backgrounds are how you add texture, patterns, hero artwork and decoration without extra HTML. They also have limits, because assistive technology does not see them, so you need to know which images belong in CSS and which in the HTML.",
        mentalModel:
          "A background image is wallpaper, not a picture on the wall. It decorates what is in front of it. If the picture itself carries meaning, it belongs on the wall, as an `<img>` with a description.",
      },
      body: [
        { type: "heading", text: "Adding an image" },
        {
          type: "paragraph",
          text: "Write the file address in `url()`, ideally in quotes: `background-image: url(\"leaves.png\")`. In a stylesheet file, relative paths are relative to **the stylesheet**, not to the HTML page. The image loads when the element needs it, and you can list several images separated by commas, which then stack. The value `none` removes any image. Small icons can even be written inline as a `data:` URI, which saves a request.",
        },
        {
          type: "code",
          language: "css",
          code: `.pattern {
  background-color: #1e1b4b;
  background-image: url("dots.svg");
  background-repeat: repeat;
  background-position: 0 0;
}`,
          caption: "A repeating texture on a dark fallback colour",
        },
        { type: "heading", text: "background-repeat" },
        {
          type: "paragraph",
          text: "By default, an image **tiles** in both directions until it fills the box. `no-repeat` shows it once. `repeat-x` and `repeat-y` tile along one axis. `space` tiles whole copies only and spreads the gaps out evenly, and `round` stretches the copies a little so that a whole number fits exactly. You can give two values, one for each axis.",
        },
        { type: "heading", text: "background-position" },
        {
          type: "paragraph",
          text: "`background-position` places the image inside the origin box. It accepts keywords (`left`, `center`, `right`, `top`, `bottom`), lengths such as `20px 40px` and percentages. A percentage lines up the **same point on the image and on the box**, so `50% 50%` centres the image, and `100% 100%` pins its bottom right corner to the box's bottom right corner. The default is `0% 0%`, the top left. A four-value form such as `right 1rem bottom 2rem` offsets from chosen edges.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.hero {
  background-color: #1e1b4b;
  background-image: url("hero.jpg");
  color: #ffffff;
}`,
            note: "A dark fallback colour keeps the white text readable while the image loads, or if it fails.",
          },
          bad: {
            code: `.hero {
  background-image: url("hero.jpg");
  color: #ffffff;
}`,
            note: "If the image does not load, the white text sits on a white page and disappears.",
          },
        },
        { type: "heading", text: "Background or img?" },
        {
          type: "paragraph",
          text: "Use a background when the image is decoration: textures, patterns, gradients, ornamental artwork. Use an `<img>` with an `alt` description when the image carries content, such as a photo of a product, a chart or a logo that people need. Background images are invisible to screen readers, are not saved or printed by default, and cannot be lazy-loaded or given responsive sources in the way `<img>` can.",
        },
        {
          type: "callout",
          tone: "note",
          text: "In this app's preview, images from `https:` addresses and `data:` URIs can load, while local files cannot, so the lessons here use gradients and inline images for practice.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`background-image: url(\"file\")` paints one or more images. Paths in a stylesheet are relative to the stylesheet.",
            "Images tile by default. `no-repeat`, `repeat-x`, `repeat-y`, `space` and `round` change that.",
            "`background-position` accepts keywords, lengths and percentages. `50% 50%` centres an image.",
            "Always add a fallback colour, and use `<img>` with `alt` for images that carry meaning.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "background-size-and-attachment",
      kind: "learn",
      title: "Background size and attachment",
      summary: "cover and contain, sizing for sharp images, and the fixed and local attachment modes.",
      minutes: 9,
      concept: {
        description:
          "`background-size` scales a background image: to exact lengths, to fill the box (`cover`), or to fit entirely inside it (`contain`). `background-attachment` decides whether the background scrolls with the page, stays fixed against the window, or scrolls with the element's own content.",
        why: "Without a size, an image is shown at its natural pixel size, which is rarely the size of the box. `cover` and `center` together are the standard recipe for hero images that fill any shape, and knowing the other options keeps images sharp and tidy.",
        mentalModel:
          "`cover` is stretching a poster until it fills the whole frame, cropping the edges that do not fit. `contain` is shrinking it until all of it fits inside the frame, leaving blank bands at the sides.",
      },
      body: [
        { type: "heading", text: "Sizing the image" },
        {
          type: "paragraph",
          text: "The default `auto` keeps the image's own size. You can give one length, which sets the width and keeps the proportions, or two values for width and height, such as `48px 48px`. Percentages are measured against the background positioning area, so `50% 50%` is half the box in each direction. Remember that two values on a gradient are important, because a gradient has no natural size and would otherwise fill the box.",
        },
        {
          type: "list",
          items: [
            "`cover`: scale up until the image covers the whole box. Some of it may be cropped, but there are no gaps.",
            "`contain`: scale until the whole image fits. Nothing is cropped, but there may be empty space, and the image tiles into it unless you set `no-repeat`.",
            "`auto`, lengths and percentages for exact control, which suits patterns and icons.",
          ],
        },
        {
          type: "code",
          language: "css",
          code: `.hero {
  background-image: url("hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}`,
          caption: "The standard recipe for a full-bleed hero image",
        },
        { type: "heading", text: "Sharp images on dense screens" },
        {
          type: "paragraph",
          text: "A photo that is 800 pixels wide, shown at 400 CSS pixels, has twice as many pixels as the box needs on a high-density screen, so it looks crisp. You can do the same for icons: supply an image at double size and set `background-size` to half of it, such as `background-size: 24px 24px` for a 48 by 48 icon file.",
        },
        { type: "heading", text: "background-attachment" },
        {
          type: "paragraph",
          text: "The default, `scroll`, means the background moves with the element as the page scrolls. `fixed` pins it to the **viewport**, so the page seems to slide over a stationary image, a popular parallax effect. `local` makes it scroll with the element's own content, which is useful for scrollable boxes. `fixed` is poorly supported on many mobile browsers, which fall back to normal scrolling, and it can be slow to paint.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.hero {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}`,
            note: "The image fills the box at any size, stays centred as it crops, and never tiles.",
          },
          bad: {
            code: `.hero {
  background-image: url("hero.jpg");
}`,
            note: "With the defaults, a large photo is cropped at its top left corner, and a small one tiles like wallpaper.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "If the important part of a photo is not in the middle, move the crop with `background-position`. For example, `center top` keeps people's heads in view when `cover` crops the bottom.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`background-size` takes `auto`, lengths, percentages, `cover` and `contain`.",
            "`cover` fills and may crop, and `contain` fits and may leave gaps. Add `no-repeat` with `contain`.",
            "`cover`, `center` and `no-repeat` together are the standard hero image recipe.",
            "`fixed` attachment pins the background to the window, but it is unreliable on phones.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "background-explorer",
      kind: "visualizer",
      title: "Background explorer",
      summary: "Change size, repeat, position, clip and origin on a dotted background, and see what each one does.",
      minutes: 10,
      concept: {
        description:
          "A box with a thick dashed border and padding is painted with a tile of dots. Five controls change the tile size, how it repeats, where it sits, and how far the paint is clipped and positioned, so you can see every part of the background model at once.",
        why: "The background properties interact: clip decides how far the paint goes, origin decides where the tiles start, and size and repeat decide how they fill. Playing with all five on one box makes those relationships clear.",
        mentalModel:
          "Imagine a sheet of dotted wrapping paper laid over a gift box. Size is the print scale, repeat decides whether the pattern tiles, position slides the sheet around, clip is where you cut the paper, and origin is the corner where you started unrolling.",
      },
      stage: {
        html: '<div class="board">\n  <div class="box">Background</div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 16px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; }\n.board { height: 100%; box-sizing: border-box; padding: 16px; border-radius: 12px; background: #ffffff; }\n.box { box-sizing: border-box; width: 100%; height: 100%; min-height: 160px; display: flex; align-items: flex-end; justify-content: flex-end; color: #1e1b4b; font-weight: 700; font-size: 14px; }",
        annotate: "none",
        target: ".box",
        items: ".box",
      },
      starter: `.box {
  border: 14px dashed rgb(15 23 42 / 0.35);
  padding: 20px;
  background-color: #eef2ff;
  background-image: radial-gradient(circle, #4f46e5 30%, transparent 32%);
  background-size: 48px 48px;
  background-repeat: repeat;
  background-position: 0 0;
  background-clip: border-box;
  background-origin: padding-box;
}
`,
      controls: [
        { id: "size", label: "background-size", selector: ".box", property: "background-size", fallback: "auto", type: "options", options: ["48px 48px", "24px 24px", "96px 96px", "50% 50%", "cover", "contain", "auto"], help: "A gradient has no natural size, so `auto` and `cover` fill the whole box." },
        { id: "repeat", label: "background-repeat", selector: ".box", property: "background-repeat", fallback: "repeat", type: "options", options: ["repeat", "no-repeat", "repeat-x", "repeat-y", "space", "round"], help: "`space` and `round` fit whole tiles only." },
        { id: "position", label: "background-position", selector: ".box", property: "background-position", fallback: "0 0", type: "options", options: ["0 0", "center", "right bottom", "50% 0", "20px 20px"], help: "Percentages line up the same point on the image and the box." },
        { id: "clip", label: "background-clip", selector: ".box", property: "background-clip", fallback: "border-box", type: "options", options: ["border-box", "padding-box", "content-box"], help: "How far the paint reaches. Look at the dashed border." },
        { id: "origin", label: "background-origin", selector: ".box", property: "background-origin", fallback: "padding-box", type: "options", options: ["border-box", "padding-box", "content-box"], help: "Where the first tile starts." },
      ],
      presets: [
        { id: "single", label: "One centred dot", description: "no-repeat, centred, 96px", css: ".box { background-size: 96px 96px; background-repeat: no-repeat; background-position: center; }" },
        { id: "row", label: "A row of dots", description: "repeat-x along the top", css: ".box { background-repeat: repeat-x; background-position: 0 0; }" },
        { id: "fit", label: "Whole tiles only", description: "space spreads whole tiles", css: ".box { background-size: 64px 64px; background-repeat: space; }" },
        { id: "inside", label: "Inside the border", description: "padding-box clip", css: ".box { background-clip: padding-box; }" },
        { id: "content", label: "Behind content only", description: "content-box clip", css: ".box { background-clip: content-box; }" },
      ],
      challenge: {
        title: "One centred dot",
        description:
          "The dots tile across the whole box. Show a single dot instead: make the tile `80px 80px`, turn off tiling with `no-repeat`, and centre it with `background-position: center`.",
        hints: [
          "Three declarations in the `.box` rule need new values.",
          "A single dot needs a tile size, no repeating, and a centred position.",
          "`background-size: 80px 80px;` `background-repeat: no-repeat;` `background-position: center;`",
        ],
        checks: [
          { type: "computedStyle", selector: ".box", property: "background-size", expected: ["80px 80px"], message: "The tile is `80px 80px`." },
          { type: "computedStyle", selector: ".box", property: "background-repeat", expected: ["no-repeat"], message: "The tile does not repeat." },
          { type: "computedStyle", selector: ".box", property: "background-position", expected: ["center", "50% 50%"], message: "The tile is centred." },
        ],
        solution: `.box {
  border: 14px dashed rgb(15 23 42 / 0.35);
  padding: 20px;
  background-color: #eef2ff;
  background-image: radial-gradient(circle, #4f46e5 30%, transparent 32%);
  background-size: 80px 80px;
  background-repeat: no-repeat;
  background-position: center;
  background-clip: border-box;
  background-origin: padding-box;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "background-shorthand-and-layers",
      kind: "learn",
      title: "The background shorthand and layers",
      summary: "The order of the background shorthand, how it resets, and how multiple backgrounds stack.",
      minutes: 9,
      concept: {
        description:
          "`background` is a shorthand for all the background properties. It can describe several **layers** separated by commas, with the first one on top, and a colour that may only appear in the last layer. Like every shorthand, it resets any part you leave out.",
        why: "Real designs stack backgrounds: a dark overlay over a photo over a fallback colour. The shorthand is the compact way to write that, but its reset behaviour and layer order cause some of the most common background bugs.",
        mentalModel:
          "A background is a stack of transparent sheets. The first one you list lies on top, and the solid colour is the table underneath. The shorthand redefines the whole stack in one go, so anything you do not mention is cleared.",
      },
      body: [
        { type: "heading", text: "One layer" },
        {
          type: "paragraph",
          text: "A layer is written as `image position / size repeat attachment origin clip`, in a fairly flexible order. The position and size must be written together with a slash between them and **position first**, as in `center / cover`. The colour is written on its own and can only belong to the **final** layer. Anything you leave out is set back to its initial value.",
        },
        {
          type: "code",
          language: "css",
          code: `.hero {
  background: #1e1b4b url("hero.jpg") center / cover no-repeat;
}

/* the same, written out */
.hero {
  background-color: #1e1b4b;
  background-image: url("hero.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}`,
          caption: "One line replaces five declarations",
        },
        { type: "heading", text: "Several layers" },
        {
          type: "paragraph",
          text: "Separate layers with commas. The **first** layer is painted on top and the last at the bottom, with the colour behind everything. A classic use is a translucent dark overlay above a photo, which makes white text readable. A gradient is an image, so it can be a layer too. Each layer gets its own size, position and repeat, listed in the same order.",
        },
        {
          type: "code",
          language: "css",
          code: `.hero {
  background:
    linear-gradient(rgb(15 23 42 / 0.55), rgb(15 23 42 / 0.55)),
    url("hero.jpg") center / cover no-repeat,
    #0f172a;
}`,
          caption: "An overlay on top, the photo beneath it, and a fallback colour at the bottom",
        },
        { type: "heading", text: "The reset trap" },
        {
          type: "paragraph",
          text: "Because the shorthand resets everything it does not mention, order matters. A longhand written **after** the shorthand overrides its part, while a longhand written **before** it is wiped out. So a `background-size: cover` placed before `background: url(...)` is lost, and the image shows at full size.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.hero {
  background: url("hero.jpg") center no-repeat;
  background-size: cover;
}`,
            note: "The shorthand comes first, and the longhand that tweaks it comes after, so `cover` survives.",
          },
          bad: {
            code: `.hero {
  background-size: cover;
  background: url("hero.jpg") center no-repeat;
}`,
            note: "The shorthand comes second and resets the size to `auto`, so the `cover` is silently lost.",
          },
        },
        {
          type: "paragraph",
          text: "A few shorthand details are worth remembering. If you give a layer a size but forget the position, the size is ignored, because the slash only works after a position, so `background: url(a.png) / cover` is invalid. And if you want only a colour, `background: #1e1b4b` is perfectly fine, but it also clears any image set earlier in the cascade, which is exactly why it is safer to use `background-color` when that is all you mean.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "For anything with more than one layer, the longhands are easier to read and to override later. You can still list several layers in each one, such as `background-size: auto, cover`.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A layer is `image position / size repeat attachment origin clip`, with the colour only in the last layer.",
            "Write position and size together with a slash, position first: `center / cover`.",
            "Layers are separated by commas. The first is on top, and the colour is at the bottom.",
            "The shorthand resets what it omits, so write it before any longhands for the same element.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-background",
      kind: "predict",
      title: "Predict the background",
      summary: "Work out which backgrounds survive a shorthand, and which layer ends up on top.",
      minutes: 6,
      mode: "css",
      intro: "Three boxes combine a colour and gradient images in different orders. Predict what each one shows, then run the code.",
      code: {
        html: `<div class="box a">A</div>
<div class="box b">B</div>
<div class="box c">C</div>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.box {
  height: 80px;
  margin-bottom: 12px;
  font-weight: 700;
}

.a {
  background-image: linear-gradient(#f59e0b, #f59e0b);
  background: #e0e7ff;
}

.b {
  background: #e0e7ff;
  background-image: linear-gradient(#f59e0b, #f59e0b);
}

.c {
  background-color: #e0e7ff;
  background-image:
    linear-gradient(#4f46e5, #4f46e5),
    linear-gradient(#f59e0b, #f59e0b);
  background-size: 50% 100%, 100% 50%;
  background-repeat: no-repeat;
}`,
      },
      questions: [
        {
          prompt: "Box A sets an amber `background-image` and then the shorthand `background: #e0e7ff`. What does it show?",
          options: ["An amber box", "A pale lilac box with an amber layer on top", "A pale lilac box only: the shorthand cleared the image", "Nothing at all"],
          answerIndex: 2,
          hint: "A shorthand resets every part it does not mention. Which part comes later?",
          explanation: "The shorthand is written after the image, so it resets `background-image` to `none` and sets the colour. Only the pale lilac remains.",
        },
        {
          prompt: "Box B writes the same two declarations in the opposite order. What does it show?",
          options: ["Pale lilac only", "Amber: the image layer is painted on top of the colour", "A blend of both colours", "The rule is invalid"],
          answerIndex: 1,
          hint: "Now the longhand comes after the shorthand.",
          explanation: "The shorthand sets the colour first, and the `background-image` longhand then adds an amber layer. Images are always painted on top of the background colour, so the box is amber.",
        },
        {
          prompt: "Box C has two layers: indigo first, amber second. Which one is painted on top where they overlap?",
          options: ["Neither: they swap each time", "The amber one, because it is listed last", "Both are blended together", "The indigo one: the first listed layer is painted on top"],
          answerIndex: 3,
          hint: "Think of the list as a stack, and ask which end is the top.",
          explanation: "In a list of backgrounds, the first layer is on top and the last is at the bottom, just above the colour. So the indigo block, which fills the left half, covers the amber band where they overlap.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "gradients",
      kind: "learn",
      title: "Gradients: linear, radial and conic",
      summary: "Generate smooth blends, hard stripes and pie shapes in CSS, and why gradients are images, not colours.",
      minutes: 11,
      concept: {
        description:
          "A **gradient** is an image that CSS draws for you: a smooth blend between two or more colours. There are three shapes: `linear-gradient()` blends along a line, `radial-gradient()` outward from a point, and `conic-gradient()` around a point, like a colour wheel.",
        why: "Gradients replace many image files with one line of CSS. They scale perfectly, load instantly and can be restyled by changing a colour. They also make stripes, dots, pie charts and overlays, so they are one of the most useful tools in CSS.",
        mentalModel:
          "A gradient is a painter's blend laid along a path. A linear gradient lays the blend along a straight line, a radial one along rays from a centre, and a conic one around a clock face.",
      },
      body: [
        { type: "heading", text: "A gradient is an image" },
        {
          type: "paragraph",
          text: "This is the most important thing to remember. A gradient is a CSS **image**, so it goes where images go: `background-image` or the `background` shorthand. It is never valid as a `background-color` or a text `color`. Because it is an image, it has no natural size, so it fills the box unless you set a `background-size` to make it tile.",
        },
        { type: "heading", text: "Linear gradients" },
        {
          type: "paragraph",
          text: "A linear gradient takes an optional direction and then two or more colour stops. The direction is either a keyword such as `to right` or an **angle**: `0deg` points up, `90deg` points right and `180deg` points down, which is the default. Each stop can have a position, so `#4f46e5 0%, #db2777 100%` places them at the two ends. Add more stops for more colours. Placing two stops at the same position makes a **hard edge**, with no blend, which is how you draw stripes.",
        },
        {
          type: "code",
          language: "css",
          code: `.banner {
  background-image: linear-gradient(90deg, #4f46e5, #db2777);
}

.stripes {
  background-image: linear-gradient(
    90deg,
    #fde68a 0 50%,
    #f59e0b 50% 100%
  );
}`,
          caption: "A smooth left to right blend, and a hard-edged split",
        },
        { type: "heading", text: "Radial and conic gradients" },
        {
          type: "paragraph",
          text: "`radial-gradient(circle at 30% 20%, #fde68a, #f59e0b)` blends outward from a point you choose, in a circle or an ellipse. Size keywords such as `closest-side` and `farthest-corner` decide where the last colour ends. `conic-gradient(from 0deg, ...)` sweeps colours around the centre: put hard stops in it, and you have a pie chart. The `repeating-` versions of all three tile the pattern forever, which makes stripes and rings.",
        },
        {
          type: "code",
          language: "css",
          code: `.dots {
  background-image: radial-gradient(circle, #4f46e5 30%, transparent 32%);
  background-size: 24px 24px;
}

.pie {
  border-radius: 50%;
  background-image: conic-gradient(#4f46e5 0 40%, #e0e7ff 40% 100%);
}`,
          caption: "A dot pattern from a tiled radial gradient, and a 40% pie chart",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.banner {
  background-image: linear-gradient(90deg, #4f46e5, #db2777);
}`,
            note: "A gradient is an image, so it goes in `background-image`.",
          },
          bad: {
            code: `.banner {
  background-color: linear-gradient(90deg, #4f46e5, #db2777);
}`,
            note: "`background-color` only accepts colours. The declaration is invalid and the banner stays empty.",
          },
        },
        {
          type: "callout",
          tone: "tip",
          text: "Put readable text on a gradient only after checking its contrast at the lightest and darkest points the text will cover, or add a translucent dark layer between them.",
        },
        {
          type: "callout",
          tone: "note",
          text: "A comma is required between the direction and the first colour, and between every stop. A missing comma, as in `linear-gradient(to right #4f46e5, #db2777)`, invalidates the whole value.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Gradients are images: use `background-image` or `background`, never `background-color`.",
            "`linear-gradient(angle or to side, stop, stop...)`: `0deg` is up, `90deg` is right, `180deg` is down.",
            "Two stops at the same position make a hard edge, which is how stripes and pies are drawn.",
            "`radial-gradient()` blends outward from a point, and `conic-gradient()` blends around one. Add `background-size` to tile them.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "gradient-explorer",
      kind: "visualizer",
      title: "Gradient explorer",
      summary: "Change a gradient's angle, colours and midpoint, then write a gradient yourself in the challenge.",
      minutes: 10,
      concept: {
        description:
          "A swatch is painted with a linear gradient whose angle, two colours and midpoint are stored as custom properties you can change. Underneath it, a plain banner is waiting for you to write a gradient of your own.",
        why: "The angle numbers and the colour hint are hard to picture from the syntax alone. Dragging an angle round from 0 to 360 degrees shows exactly which way a gradient flows, and the hint slider shows how the midpoint shifts the blend.",
        mentalModel:
          "The angle is a compass needle: 0 points up, 90 right, 180 down, 270 left. The colour hint is a slider along the blend that decides where the two colours are mixed fifty-fifty.",
      },
      stage: {
        html: '<div class="board">\n  <div class="swatch"></div>\n  <div class="banner">Banner</div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 16px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; }\n.board { height: 100%; box-sizing: border-box; padding: 16px; border-radius: 12px; background: #ffffff; }\n.swatch { height: 130px; margin-bottom: 14px; border-radius: 10px; }\n.banner { height: 56px; display: flex; align-items: center; padding-left: 16px; border-radius: 10px; color: #ffffff; font-weight: 700; font-size: 15px; }",
        annotate: "none",
        target: ".swatch",
        items: ".swatch",
      },
      starter: `.swatch {
  --angle: 90deg;
  --c1: #4f46e5;
  --c2: #db2777;
  --stop: 50%;
  background-image: linear-gradient(var(--angle), var(--c1), var(--stop), var(--c2));
}

.banner {
  background-color: #4f46e5;
}
`,
      controls: [
        { id: "angle", label: "angle", selector: ".swatch", property: "--angle", fallback: "90deg", type: "range", min: 0, max: 360, step: 15, unit: "deg", help: "0deg points up, 90deg right, 180deg down, 270deg left." },
        { id: "c1", label: "first colour", selector: ".swatch", property: "--c1", fallback: "#4f46e5", type: "options", options: ["#4f46e5", "#f59e0b", "#059669", "#0284c7", "#ffffff"], help: "The colour at the start of the gradient line." },
        { id: "c2", label: "second colour", selector: ".swatch", property: "--c2", fallback: "#db2777", type: "options", options: ["#db2777", "#4f46e5", "#fde68a", "#0f172a", "#ef4444"], help: "The colour at the end of the gradient line." },
        { id: "stop", label: "colour hint", selector: ".swatch", property: "--stop", fallback: "50%", type: "range", min: 10, max: 90, step: 5, unit: "%", help: "Where the two colours are mixed half and half." },
      ],
      presets: [
        { id: "sunset", label: "Sunset", description: "amber to pink, tilted", css: ".swatch { --angle: 160deg; --c1: #f59e0b; --c2: #db2777; }" },
        { id: "ocean", label: "Ocean", description: "sky blue to indigo", css: ".swatch { --angle: 135deg; --c1: #0284c7; --c2: #4f46e5; }" },
        { id: "forest", label: "Forest", description: "emerald to dark", css: ".swatch { --angle: 180deg; --c1: #059669; --c2: #0f172a; }" },
        { id: "sharp", label: "Squeezed midpoint", description: "hint at 15%", css: ".swatch { --stop: 15%; }" },
      ],
      challenge: {
        title: "Write a gradient of your own",
        description:
          "The banner has a flat indigo colour. Give `.banner` a left to right gradient from indigo `#4f46e5` to pink `#db2777`, written as `background-image: linear-gradient(90deg, #4f46e5, #db2777)`.",
        hints: [
          "A gradient is an image, so use `background-image`, not `background-color`.",
          "`linear-gradient()` takes an angle, then two colours, separated by commas. `90deg` points to the right.",
          "`.banner { background-image: linear-gradient(90deg, #4f46e5, #db2777); }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".banner", property: "background-image", expected: ["linear-gradient(90deg, #4f46e5, #db2777)", "linear-gradient(90deg, rgb(79, 70, 229), rgb(219, 39, 119))"], message: "The banner has a left to right gradient from `#4f46e5` to `#db2777`." },
        ],
        solution: `.swatch {
  --angle: 90deg;
  --c1: #4f46e5;
  --c2: #db2777;
  --stop: 50%;
  background-image: linear-gradient(var(--angle), var(--c1), var(--stop), var(--c2));
}

.banner {
  background-color: #4f46e5;
  background-image: linear-gradient(90deg, #4f46e5, #db2777);
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-gradient-hero",
      kind: "lab",
      title: "Lab: a layered hero background",
      summary: "Combine a fallback colour, a dark overlay and a dotted pattern into one background.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<header class="hero">
  <h1 class="hero-title">Dotted night sky</h1>
  <p class="hero-sub">A hero built from layered backgrounds.</p>
</header>`,
        css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.hero {
  min-height: 220px;
  padding: 2rem;
  color: #ffffff;
}

.hero-title {
  margin: 0 0 0.5rem;
}

.hero-sub {
  margin: 0;
}
`,
      },
      challenge: {
        title: "Build the layered background",
        description:
          "Give `.hero` three things: a fallback `background-color` of `#1e1b4b`, a pattern of dots as its `background-image`, `radial-gradient(circle, #818cf8 2px, transparent 3px)`, and a tile size of `24px 24px` with the default repeat so the dots fill the box. Keep the repeat as `repeat`, which is also the default.",
        hints: [
          "Three declarations in the `.hero` rule: a colour, a gradient image and a size.",
          "A gradient has no natural size, so `background-size: 24px 24px` is what turns one dot into a grid of them.",
          "`background-color: #1e1b4b; background-image: radial-gradient(circle, #818cf8 2px, transparent 3px); background-size: 24px 24px;`",
        ],
        checks: [
          { type: "computedStyle", selector: ".hero", property: "background-color", expected: ["#1e1b4b", "rgb(30, 27, 75)"], message: "The fallback colour is `#1e1b4b`." },
          { type: "computedStyle", selector: ".hero", property: "background-image", expected: ["radial-gradient(circle, #818cf8 2px, transparent 3px)", "radial-gradient(rgb(129, 140, 248) 2px, rgba(0, 0, 0, 0) 3px)"], message: "The image is a radial-gradient dot." },
          { type: "computedStyle", selector: ".hero", property: "background-size", expected: ["24px 24px"], message: "The tile is `24px 24px`, so the dots form a grid." },
          { type: "computedStyle", selector: ".hero", property: "background-repeat", expected: ["repeat"], message: "The dots tile in both directions." },
        ],
        solution: {
          html: `<header class="hero">
  <h1 class="hero-title">Dotted night sky</h1>
  <p class="hero-sub">A hero built from layered backgrounds.</p>
</header>`,
          css: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.hero {
  min-height: 220px;
  padding: 2rem;
  color: #ffffff;
  background-color: #1e1b4b;
  background-image: radial-gradient(circle, #818cf8 2px, transparent 3px);
  background-size: 24px 24px;
  background-repeat: repeat;
}

.hero-title {
  margin: 0 0 0.5rem;
}

.hero-sub {
  margin: 0;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-vanished-background",
      kind: "debug",
      title: "Debug: the backgrounds that vanished",
      summary: "Five background declarations fail: a size without units, a missing comma and three invalid values.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<div class="box a">A</div>
<div class="box b">B</div>
<div class="box c">C</div>
<div class="box d">D</div>
<div class="box e">E</div>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.box {
  height: 60px;
  margin-bottom: 10px;
  padding: 8px;
  color: #ffffff;
  font-weight: 700;
}

.a {
  background-color: #1e1b4b;
  background-image: radial-gradient(circle, #818cf8 30%, transparent 32%);
  background-size: 40 40;
}

.b {
  background-image: linear-gradient(to right #4f46e5, #db2777);
}

.c {
  background-color: #4f46e5;
  background-repeat: no repeat;
}

.d {
  background-color: #4f46e5;
  background-position: center center top;
}

.e {
  background-color: #4f46e5;
  background-size: cover contain;
}
`,
      },
      challenge: {
        title: "Bring every background back",
        description:
          "Five of these boxes are not styled as intended. A: the dots should be a `40px 40px` tile, but the size is not applied. B: the gradient should run `to right` from `#4f46e5` to `#db2777`. C: the background should not repeat (`no-repeat`). D: the position should be `center top`. E: the size should be `cover`.",
        hints: [
          "Use the explain panel's Heads up card and DevTools, where invalid declarations are struck through.",
          "A: look at the units. B: a comma is missing. C, D and E: look at the values.",
          "A: a length needs a unit, so `40px 40px`. B: `to right,` needs a comma. C: `no-repeat`. D: `center top`. E: one keyword only, `cover`.",
        ],
        checks: [
          { type: "computedStyle", selector: ".a", property: "background-size", expected: ["40px 40px"], message: "Box A's tile size is `40px 40px`." },
          { type: "computedStyle", selector: ".b", property: "background-image", expected: ["linear-gradient(to right, #4f46e5, #db2777)", "linear-gradient(to right, rgb(79, 70, 229), rgb(219, 39, 119))"], message: "Box B has a left to right gradient." },
          { type: "computedStyle", selector: ".c", property: "background-repeat", expected: ["no-repeat"], message: "Box C does not repeat." },
          { type: "computedStyle", selector: ".d", property: "background-position", expected: ["center top", "50% 0%"], message: "Box D is positioned `center top`." },
          { type: "computedStyle", selector: ".e", property: "background-size", expected: ["cover"], message: "Box E uses `cover`." },
        ],
        solution: {
          html: `<div class="box a">A</div>
<div class="box b">B</div>
<div class="box c">C</div>
<div class="box d">D</div>
<div class="box e">E</div>`,
          css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.box {
  height: 60px;
  margin-bottom: 10px;
  padding: 8px;
  color: #ffffff;
  font-weight: 700;
}

.a {
  background-color: #1e1b4b;
  background-image: radial-gradient(circle, #818cf8 30%, transparent 32%);
  background-size: 40px 40px;
}

.b {
  background-image: linear-gradient(to right, #4f46e5, #db2777);
}

.c {
  background-color: #4f46e5;
  background-repeat: no-repeat;
}

.d {
  background-color: #4f46e5;
  background-position: center top;
}

.e {
  background-color: #4f46e5;
  background-size: cover;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "borders",
      kind: "learn",
      title: "Borders: width, style and colour",
      summary: "The three parts of a border, why a border without a style is invisible, and how to set single sides.",
      minutes: 9,
      concept: {
        description:
          "A border is a line drawn around an element, between its padding and its margin. It has three parts: a **width**, a **style** (solid, dashed, dotted and so on) and a **colour**. The `border` shorthand sets all three at once.",
        why: "Borders are the most basic way to draw a frame, a divider or an outline of a card. They also trip up beginners, because a border with no style simply does not appear, and because a border adds to the size of the box.",
        mentalModel:
          "A border is a frame with three dials: how thick it is, what pattern it is made of, and what colour it is painted. Switch the pattern dial off (`none`, the default) and the frame vanishes, whatever you did to the other two.",
      },
      body: [
        { type: "heading", text: "The three parts" },
        {
          type: "paragraph",
          text: "The shorthand takes the parts in any order: `border: 2px solid #4f46e5`. The **style** is the one that matters most, because its default value is `none`, and with no style there is no border, and the width collapses to zero. The colour defaults to the element's text colour (`currentColor`). The width can be a length, or one of the keywords `thin`, `medium` and `thick`, which are about 1px, 3px and 5px.",
        },
        {
          type: "code",
          language: "css",
          code: `.card {
  border: 1px solid #cbd5e1;
}

.note {
  border-width: 2px;
  border-style: dashed;
  border-color: #f59e0b;
}`,
          caption: "The shorthand, and the three longhands",
        },
        { type: "heading", text: "Styles" },
        {
          type: "list",
          items: [
            "`solid`: one continuous line. The everyday choice.",
            "`dashed` and `dotted`: broken lines, good for \"drop here\" areas and separators.",
            "`double`: two lines with a gap, which needs a width of at least 3px to show.",
            "`groove`, `ridge`, `inset` and `outset`: old-fashioned 3D effects that shade the colour.",
            "`none` and `hidden`: no border. `hidden` wins over other borders in collapsed table cells.",
          ],
        },
        { type: "heading", text: "Single sides and logical sides" },
        {
          type: "paragraph",
          text: "Each side has its own properties: `border-top`, `border-right`, `border-bottom` and `border-left`, and longhands such as `border-top-width`. A common pattern is a divider line on just one side, such as `border-bottom: 1px solid`. The multi-value forms `border-width`, `border-style` and `border-color` follow the same top, right, bottom, left order as `margin`. There are also logical versions, `border-block-start` and `border-inline-end`, which follow the writing direction.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card {
  border: 1px solid #cbd5e1;
}`,
            note: "Width, style and colour are all present, so the border appears.",
          },
          bad: {
            code: `.card {
  border: 1px #cbd5e1;
}`,
            note: "There is no style, so it defaults to `none` and no border is drawn at all. `border: 2 solid` fails too, since the width has no unit.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "A border adds to the size of the box unless you use `box-sizing: border-box`. A 200px wide box with a 5px border is 210px wide by default. The Box model topic explains this, and it is why most stylesheets set `border-box` globally.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Use a thin, quiet border (1px of a light grey) to separate things, and save thick, bright borders for emphasis. To remove a border, `border: none` or `border: 0` both work.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A border has a width, a style and a colour. `border: 2px solid #4f46e5` sets all three.",
            "The style defaults to `none`, so a border with no style is invisible.",
            "Each side has its own properties, and `border-width`, `border-style` and `border-color` follow top, right, bottom, left order.",
            "Borders add to the box size unless `box-sizing: border-box` is used.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "border-radius",
      kind: "learn",
      title: "Border radius",
      summary: "Rounded corners, pills, circles and ellipses, the four-value order and how to clip children.",
      minutes: 10,
      concept: {
        description:
          "`border-radius` rounds the corners of an element's box. One number rounds all four equally, up to four values give each corner its own radius, and `50%` on a square makes a circle. The rounding clips the background, the border and the shadow, but **not** the contents inside, unless you also clip them.",
        why: "Rounded corners define the look of modern interfaces: buttons, cards, avatars, pills and badges. A few rules about the order of values, large radii and clipping contents explain nearly all the surprises.",
        mentalModel:
          "Imagine cutting a corner off a piece of paper with a round cookie cutter. The radius is the size of the cutter. A bigger cutter cuts away more, and if it is bigger than the paper's edge, the corner just becomes a smooth curve.",
      },
      body: [
        { type: "heading", text: "One to four values" },
        {
          type: "paragraph",
          text: "With one value, every corner gets the same radius: `border-radius: 12px`. With four, they go **clockwise from the top left**: top-left, top-right, bottom-right, bottom-left. Two values set the top-left and bottom-right corners (the first), and the top-right and bottom-left corners (the second). Three values give the top left, then the top right and bottom left together, then the bottom right. Single corners have longhands such as `border-top-left-radius`.",
        },
        {
          type: "code",
          language: "css",
          code: `.card   { border-radius: 12px; }
.tab    { border-radius: 12px 12px 0 0; }
.bubble { border-radius: 16px 16px 16px 4px; }
.leaf   { border-radius: 0 40px; }`,
          caption: "One radius, a tab, a speech bubble and a leaf shape",
        },
        { type: "heading", text: "Circles, ellipses and pills" },
        {
          type: "paragraph",
          text: "Percentages are measured against the box: the horizontal radius against the width and the vertical radius against the height. `border-radius: 50%` therefore makes a **circle** on a square element, and an **ellipse** on a rectangle. For a **pill** shape, with fully rounded ends, use a very large radius such as `999px`. If the radii are bigger than the box allows, the browser scales them all down in proportion, so the ends simply become perfect semicircles.",
        },
        {
          type: "code",
          language: "css",
          code: `.avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.pill {
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
}`,
          caption: "A circle needs a square box, and a pill works at any size",
        },
        { type: "heading", text: "Rounded corners do not clip content" },
        {
          type: "paragraph",
          text: "The radius rounds the element's own background and border, but a child with square corners, such as an image or a coloured header, still pokes out of the rounded corners. To clip the children too, add `overflow: hidden` to the rounded element. When you nest rounded boxes, a pleasing inner radius is the outer radius minus the padding between them, so the corners look concentric.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card {
  border-radius: 16px;
  overflow: hidden;
}`,
            note: "The image or header inside is clipped to the same rounded corners.",
          },
          bad: {
            code: `.card {
  border-radius: 16px;
}`,
            note: "The card's own background is rounded, but a square image inside still sticks out of the corners.",
          },
        },
        {
          type: "callout",
          tone: "note",
          text: "In current browsers, `outline` and `box-shadow` both follow the rounded corners, so a focus ring or shadow wraps the shape neatly.",
        },
        {
          type: "callout",
          tone: "warning",
          text: "`overflow: hidden` also clips anything that is meant to stick out, such as a dropdown menu or a focus outline on a child. If that happens, round the child instead of clipping from the parent.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`border-radius` takes one to four values, clockwise from the top left.",
            "`50%` makes a circle on a square and an ellipse on a rectangle. `999px` makes a pill.",
            "Radii are scaled down if they are too big for the box.",
            "Rounding does not clip children. Add `overflow: hidden` to the rounded element when you need it.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "border-explorer",
      kind: "visualizer",
      title: "Border explorer",
      summary: "Change a border's width, style, colour and radius, and watch the shape change.",
      minutes: 9,
      concept: {
        description:
          "A single box has its border width, style, colour and corner radius controlled by sliders and options, plus some padding. You can try every style, make pills and ellipses, and see how a thin dashed border differs from a thick double one.",
        why: "Seeing `double`, `groove` and `ridge` side by side, and watching a radius turn a rectangle into a pill, is far faster than reading about them.",
        mentalModel:
          "The box is a picture frame on your workbench. You can swap the moulding (style), thickness (width) and paint (colour), and round off the corners with the radius slider.",
      },
      stage: {
        html: '<div class="board">\n  <div class="box">Border</div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 16px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; }\n.board { height: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border-radius: 12px; background: #ffffff; }\n.box { box-sizing: border-box; width: 210px; height: 130px; display: flex; align-items: center; justify-content: center; color: #1e1b4b; font-weight: 700; font-size: 15px; }",
        annotate: "none",
        target: ".box",
        items: ".box",
      },
      starter: `.box {
  border-width: 6px;
  border-style: solid;
  border-color: #4f46e5;
  border-radius: 12px;
  background-color: #eef2ff;
}
`,
      controls: [
        { id: "width", label: "border-width", selector: ".box", property: "border-width", fallback: "3px", type: "range", min: 0, max: 24, step: 1, unit: "px", help: "Thicker borders show the style more clearly." },
        { id: "style", label: "border-style", selector: ".box", property: "border-style", fallback: "none", type: "options", options: ["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset"], help: "`double` needs at least 3px to show two lines." },
        { id: "color", label: "border-color", selector: ".box", property: "border-color", fallback: "currentColor", type: "options", options: ["#4f46e5", "#db2777", "#059669", "#f59e0b", "#0f172a"], help: "The 3D styles shade this colour." },
        { id: "radius", label: "border-radius", selector: ".box", property: "border-radius", fallback: "0", type: "range", min: 0, max: 120, step: 2, unit: "px", help: "Over 65px, the box becomes a pill, because the radius is scaled to fit." },
      ],
      presets: [
        { id: "pill", label: "Pill", description: "999px radius", css: ".box { border-radius: 999px; }" },
        { id: "ellipse", label: "Ellipse", description: "50% radius", css: ".box { border-radius: 50%; }" },
        { id: "double", label: "Double frame", description: "9px double border", css: ".box { border-width: 9px; border-style: double; }" },
        { id: "dotted", label: "Dotted", description: "4px dotted", css: ".box { border-width: 4px; border-style: dotted; }" },
        { id: "groove", label: "3D groove", description: "an old-school carved look", css: ".box { border-width: 10px; border-style: groove; }" },
      ],
      challenge: {
        title: "A dashed pill",
        description:
          "Turn the box into a pill with a dashed border: set `border-width` to `2px`, `border-style` to `dashed` and `border-radius` to `999px`.",
        hints: [
          "Three declarations in the `.box` rule need new values.",
          "A pill uses a radius that is much bigger than the box, so it is scaled to a perfect semicircle.",
          "`border-width: 2px;` `border-style: dashed;` `border-radius: 999px;`",
        ],
        checks: [
          { type: "computedStyle", selector: ".box", property: "border-width", expected: ["2px"], message: "The border is `2px` wide." },
          { type: "computedStyle", selector: ".box", property: "border-style", expected: ["dashed"], message: "The border is `dashed`." },
          { type: "computedStyle", selector: ".box", property: "border-radius", expected: ["999px"], message: "The corners are `999px`, which makes a pill." },
        ],
        solution: `.box {
  border-width: 2px;
  border-style: dashed;
  border-color: #4f46e5;
  border-radius: 999px;
  background-color: #eef2ff;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "predict-the-radius",
      kind: "predict",
      title: "Predict the rounded corners",
      summary: "Work out when children are clipped by rounded corners, and what 50% does to a rectangle.",
      minutes: 6,
      mode: "css",
      intro: "Two cards with rounded corners each contain a square-cornered header, and a third shape uses `border-radius: 50%`. Predict what each looks like, then run the code.",
      code: {
        html: `<div class="card a"><div class="media">Card A</div></div>
<div class="card b"><div class="media">Card B</div></div>
<div class="shape c"></div>`,
        css: `body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

.card {
  width: 220px;
  margin-bottom: 14px;
  border-radius: 24px;
  background-color: #e0e7ff;
}

.media {
  height: 64px;
  padding: 8px 12px;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 700;
}

.a { overflow: hidden; }

.c {
  width: 120px;
  height: 60px;
  background-color: #db2777;
  border-radius: 50%;
}`,
      },
      questions: [
        {
          prompt: "Card A has `border-radius: 24px` and `overflow: hidden`. What happens to the corners of the indigo header inside it?",
          options: ["They stick out as sharp corners", "The header is hidden completely", "They are clipped to the card's rounded corners", "They become rounded because radius is inherited"],
          answerIndex: 2,
          hint: "What does `overflow: hidden` do to anything that goes past the card's shape?",
          explanation: "`overflow: hidden` clips children to the element's rounded shape, so the header's top corners follow the card's 24px curve. `border-radius` is not inherited, so it would not round the header by itself.",
          proves: [
            { type: "computedStyle", selector: ".a", property: "overflow", expected: ["hidden"], message: "Card A clips its contents." },
            { type: "computedStyle", selector: ".a", property: "border-radius", expected: ["24px"], message: "Card A has 24px corners." },
          ],
        },
        {
          prompt: "Card B has the same radius but no `overflow`. What happens to the header's corners?",
          options: ["The square corners of the header poke out past the card's rounded corners", "They are clipped", "The card ignores its radius", "The header inherits the radius"],
          answerIndex: 0,
          hint: "Rounding applies to the card's own background and border, not to its children.",
          explanation: "The card's pale background is rounded, but the header is a separate box with square corners, and nothing clips it, so its corners stick out of the card's curves.",
        },
        {
          prompt: "The pink shape is 120px wide and 60px tall with `border-radius: 50%`. What shape is it?",
          options: ["A circle", "An ellipse", "A rectangle with 50px corners", "A square"],
          answerIndex: 1,
          hint: "Percentages are measured against the width for horizontal radii and the height for vertical ones.",
          explanation: "The horizontal radius is 50% of 120px (60px) and the vertical radius is 50% of 60px (30px). Different radii in each direction make an ellipse. It would be a circle only if the box were square.",
          proves: [{ type: "computedStyle", selector: ".c", property: "border-radius", expected: ["50%"], message: "The shape has a 50% radius." }],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "outlines-and-focus",
      kind: "learn",
      title: "Outlines and focus rings",
      summary: "How outline differs from border, why focus rings matter, and how to style them without removing them.",
      minutes: 9,
      concept: {
        description:
          "An `outline` is a line drawn **outside** an element's border. Unlike a border, it takes up no space and does not change the layout. Browsers use it to show which element has keyboard focus, so it is also one of the most important accessibility features of CSS.",
        why: "Keyboard and assistive-technology users cannot use a page if they cannot see where they are. Removing the focus outline is one of the commonest accessibility mistakes, and the fix is almost always to restyle it, never to delete it.",
        mentalModel:
          "A border is part of the box and pushes its neighbours away. An outline is a highlighter pen drawn around the box on a transparent sheet laid over the page. It marks the element without moving anything.",
      },
      body: [
        { type: "heading", text: "Outline versus border" },
        {
          type: "paragraph",
          text: "The properties mirror the border ones: `outline-width`, `outline-style`, `outline-color` and the `outline` shorthand. The differences are what matter. An outline takes up **no space**, so adding one never makes a box bigger or moves other things. It is drawn outside the border edge, and `outline-offset` moves it further out, or in with a negative value. In current browsers, an outline also follows the element's `border-radius`.",
        },
        {
          type: "code",
          language: "css",
          code: `.btn:focus-visible {
  outline: 3px solid #4f46e5;
  outline-offset: 3px;
}`,
          caption: "A clear focus ring, three pixels off the button",
        },
        { type: "heading", text: "Focus indicators" },
        {
          type: "paragraph",
          text: "The browser's default focus ring is an outline, usually with `outline-style: auto`. The `:focus-visible` pseudo-class applies a style only when the browser decides a focus indicator is helpful, which means keyboard focus and not a mouse click, so you can have a strong ring for keyboards without a ring on every click. WCAG asks for a visible focus indicator, and WCAG 2.2 suggests one at least 2px thick with at least 3:1 contrast against its surroundings.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `a:focus-visible {
  outline: 3px solid #4f46e5;
  outline-offset: 2px;
}`,
            note: "A custom ring that is more visible than the default and only appears when it is needed.",
          },
          bad: {
            code: `a:focus {
  outline: none;
}`,
            note: "Keyboard users now have no way to see where they are. If you remove the outline, you must replace it.",
          },
        },
        { type: "heading", text: "Why outlines beat shadows for focus" },
        {
          type: "paragraph",
          text: "Designers often draw rings with `box-shadow: 0 0 0 3px`, which looks great. The problem is **forced colours mode**, used by many people with low vision, where the operating system overrides colours and removes box shadows. Outlines are kept, so they are the safe choice. If you do use a shadow ring, add a transparent outline too, such as `outline: 2px solid transparent`, which becomes visible in forced colours mode.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "Do not set `outline: none` on `:focus` unless the same rule gives a replacement. A good test is to put your mouse away and press Tab through the page: you should always be able to see where you are.",
        },
        {
          type: "callout",
          tone: "note",
          text: "Outlines can also be used for decoration or debugging, such as `* { outline: 1px solid red }` to see every element's box without changing the layout.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`outline` is drawn outside the border, takes up no space and does not change layout.",
            "`outline-offset` moves it away from, or into, the element. It follows `border-radius` in current browsers.",
            "Use `:focus-visible` to show focus rings for keyboard users, and make them at least 2px thick with 3:1 contrast.",
            "Never remove an outline without replacing it. Outlines survive forced-colours mode, and shadows do not.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "box-shadow",
      kind: "learn",
      title: "Box shadows",
      summary: "The five parts of box-shadow, inset and layered shadows, and how to make shadows that look real.",
      minutes: 11,
      concept: {
        description:
          "`box-shadow` draws one or more shadows behind (or, with `inset`, inside) an element's box. Each shadow has an x and y offset, a blur, an optional spread and a colour. Shadows follow the element's rounded corners and take up no space.",
        why: "Shadows give an interface depth: they lift cards off the page, show what is clickable and show what is pressed in. Good shadows are soft, low in contrast and layered. Bad ones are black, hard and distracting, and the parameters decide which you get.",
        mentalModel:
          "A shadow is a copy of the box painted in a colour, moved by the offsets, blurred and grown or shrunk by the spread, and then slipped behind the real box. Different light sources are different offsets.",
      },
      body: [
        { type: "heading", text: "The parts" },
        {
          type: "paragraph",
          text: "The full form is `box-shadow: offset-x offset-y blur spread color`. The **x** and **y offsets** move the shadow right and down, and negative values move it left and up. The **blur** softens the edge, and `0` is a hard edge. The **spread** grows the shadow outwards, or shrinks it if negative, before blurring. The **colour** should almost always be semi-transparent, such as `rgb(15 23 42 / 0.15)`, so the shadow blends with whatever it falls on.",
        },
        {
          type: "code",
          language: "css",
          code: `.card {
  box-shadow: 0 10px 25px rgb(15 23 42 / 0.12);
}

.card-hard {
  box-shadow: 6px 6px 0 #0f172a;
}`,
          caption: "A soft shadow that lifts a card, and a hard offset one in a retro style",
        },
        { type: "heading", text: "Inset, layers and rings" },
        {
          type: "paragraph",
          text: "Adding `inset` draws the shadow **inside** the box, which looks like a pressed-in surface, as on a text field or a button being pushed. You can list several shadows separated by commas, and the first is on top. Realistic depth comes from layering a tight, faint shadow with a wide, softer one. With a blur of `0` and a spread, a shadow becomes a **ring**: `0 0 0 3px #4f46e5` looks like a border but takes up no layout space.",
        },
        {
          type: "code",
          language: "css",
          code: `.card {
  box-shadow:
    0 1px 2px rgb(15 23 42 / 0.08),
    0 10px 25px rgb(15 23 42 / 0.12);
}

.field {
  box-shadow: inset 0 2px 4px rgb(15 23 42 / 0.1);
}

.ring {
  box-shadow: 0 0 0 3px #4f46e5;
}`,
          caption: "A layered shadow, an inset shadow and a ring",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card {
  box-shadow: 0 10px 25px rgb(15 23 42 / 0.12);
}`,
            note: "Soft, low contrast and tinted with the page's own dark colour, so it feels like a natural shadow.",
          },
          bad: {
            code: `.card {
  box-shadow: 0 0 20px black;
}`,
            note: "Pure, fully opaque black with no offset looks like a dirty smudge around the card.",
          },
        },
        { type: "heading", text: "Things to remember" },
        {
          type: "list",
          items: [
            "Shadows follow `border-radius`, and they do not affect layout, so they can be clipped by an ancestor's `overflow: hidden`.",
            "For images with transparent areas, `filter: drop-shadow()` follows the shape of the visible pixels, which `box-shadow` cannot.",
            "A negative spread with a vertical offset gives a shadow that appears only underneath, such as `0 12px 16px -8px`.",
            "Large blurred shadows are costly to repaint, so avoid animating them on many elements at once.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          text: "Do not use shadows as the only sign that something is interactive or focused. They disappear in forced-colours mode and are hard to see for many people. Combine them with a border, outline or text.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`box-shadow: x y blur spread color`: offsets move it, blur softens it and spread grows or shrinks it.",
            "Use semi-transparent colours, and layer a tight shadow with a soft one for realistic depth.",
            "`inset` puts the shadow inside the box, and a zero blur with spread makes a ring.",
            "Shadows follow rounded corners and take no layout space. Use `filter: drop-shadow()` for irregular shapes.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "shadow-explorer",
      kind: "visualizer",
      title: "Shadow explorer",
      summary: "Drag a shadow's offset, blur, spread and opacity, then write a shadow for a button yourself.",
      minutes: 10,
      concept: {
        description:
          "A white card on a pale background has its shadow built from five custom properties: x offset, y offset, blur, spread and opacity. Below it, a button waits for you to write a shadow of your own.",
        why: "Shadow numbers are easy to get wrong because they all interact. Dragging each one while the others stay still shows you exactly what blur does compared with spread, and why a small, low-opacity shadow looks more natural than a big, dark one.",
        mentalModel:
          "The offsets are where the lamp is. Blur is how wide the lamp's light is, so bigger is softer. Spread is how big the object is, and opacity is how dark the room is.",
      },
      stage: {
        html: '<div class="board">\n  <div class="card">Card</div>\n  <button class="pill">Pill</button>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 16px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; }\n.board { height: 100%; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; border-radius: 12px; background: #f1f5f9; }\n.card { width: 200px; height: 110px; display: flex; align-items: center; justify-content: center; border-radius: 14px; background: #ffffff; color: #1e1b4b; font-weight: 700; }\n.pill { padding: 10px 24px; border: 0; border-radius: 999px; background: #4f46e5; color: #ffffff; font-weight: 700; font-size: 14px; }",
        annotate: "none",
        target: ".card",
        items: ".card",
      },
      starter: `.card {
  --x: 0px;
  --y: 10px;
  --blur: 24px;
  --spread: 0px;
  --alpha: 0.25;
  box-shadow: var(--x) var(--y) var(--blur) var(--spread) rgb(15 23 42 / var(--alpha));
}

.pill {
  box-shadow: none;
}
`,
      controls: [
        { id: "x", label: "x offset", selector: ".card", property: "--x", fallback: "0px", type: "range", min: -40, max: 40, step: 2, unit: "px", help: "Positive moves the shadow right, negative left." },
        { id: "y", label: "y offset", selector: ".card", property: "--y", fallback: "10px", type: "range", min: -40, max: 60, step: 2, unit: "px", help: "Positive moves it down, which looks like light from above." },
        { id: "blur", label: "blur", selector: ".card", property: "--blur", fallback: "24px", type: "range", min: 0, max: 80, step: 2, unit: "px", help: "0 is a hard edge, and bigger is softer." },
        { id: "spread", label: "spread", selector: ".card", property: "--spread", fallback: "0px", type: "range", min: -20, max: 40, step: 2, unit: "px", help: "Grows or shrinks the shadow before it is blurred." },
        { id: "alpha", label: "opacity", selector: ".card", property: "--alpha", fallback: "0.25", type: "range", min: 0, max: 1, step: 0.05, help: "Low opacity looks natural, and high opacity looks harsh." },
      ],
      presets: [
        { id: "soft", label: "Soft lift", description: "gentle and natural", css: ".card { --x: 0px; --y: 10px; --blur: 25px; --spread: 0px; --alpha: 0.15; }" },
        { id: "hard", label: "Hard offset", description: "retro, no blur", css: ".card { --x: 8px; --y: 8px; --blur: 0px; --spread: 0px; --alpha: 1; }" },
        { id: "glow", label: "Glow", description: "centred and wide", css: ".card { --x: 0px; --y: 0px; --blur: 30px; --spread: 6px; --alpha: 0.4; }" },
        { id: "ring", label: "Ring", description: "zero blur, spread only", css: ".card { --x: 0px; --y: 0px; --blur: 0px; --spread: 4px; --alpha: 0.5; }" },
        { id: "flat", label: "Flat", description: "no shadow at all", css: ".card { --y: 0px; --blur: 0px; --alpha: 0; }" },
      ],
      challenge: {
        title: "Give the button a shadow",
        description:
          "The pill button is flat. Give `.pill` an indigo-tinted shadow: `box-shadow: 0 4px 12px rgb(79 70 229 / 0.4)`.",
        hints: [
          "You are changing the `.pill` rule, not the card.",
          "A shadow takes x offset, y offset, blur and a colour, with alpha after a slash.",
          "`.pill { box-shadow: 0 4px 12px rgb(79 70 229 / 0.4); }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".pill", property: "box-shadow", expected: ["0 4px 12px rgb(79 70 229 / 0.4)", "rgba(79, 70, 229, 0.4) 0px 4px 12px 0px"], message: "The button has a soft indigo shadow." },
        ],
        solution: `.card {
  --x: 0px;
  --y: 10px;
  --blur: 24px;
  --spread: 0px;
  --alpha: 0.25;
  box-shadow: var(--x) var(--y) var(--blur) var(--spread) rgb(15 23 42 / var(--alpha));
}

.pill {
  box-shadow: 0 4px 12px rgb(79 70 229 / 0.4);
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "lab-style-a-card-edge",
      kind: "lab",
      title: "Lab: style a card's edges",
      summary: "Add a border, rounded corners and a shadow to a card, and round off a chip and a button.",
      minutes: 12,
      mode: "css",
      starter: {
        html: `<article class="card">
  <span class="chip">New</span>
  <h2 class="card-title">Trail pass</h2>
  <p class="card-text">Valid on every marked route.</p>
  <button class="btn">Buy pass</button>
</article>`,
        css: `body {
  margin: 0;
  padding: 32px;
  background-color: #f1f5f9;
  font-family: system-ui, sans-serif;
}

.card {
  max-width: 20rem;
  padding: 1.5rem;
  background-color: #ffffff;
}

.chip {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #e0e7ff;
  color: #3730a3;
  font-size: 0.8125rem;
  font-weight: 700;
}

.card-title {
  margin: 0.75rem 0 0.25rem;
}

.card-text {
  margin: 0 0 1rem;
}

.btn {
  padding: 0.6rem 1.25rem;
  border: 0;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 700;
}
`,
      },
      challenge: {
        title: "Finish the card's edges",
        description:
          "Give `.card` a `1px` `solid` border in `#cbd5e1`, `1rem` rounded corners and the shadow `0 10px 25px rgb(15 23 42 / 0.12)`. Make the `.chip` a pill with `border-radius: 999px`, and round the `.btn` with `border-radius: 0.5rem`.",
        hints: [
          "The border needs all three parts. Use `border-width`, `border-style` and `border-color`, or the `border` shorthand.",
          "Three more declarations on `.card`: radius and shadow. One each on `.chip` and `.btn`.",
          "`.card { border-width: 1px; border-style: solid; border-color: #cbd5e1; border-radius: 1rem; box-shadow: 0 10px 25px rgb(15 23 42 / 0.12); }`",
        ],
        checks: [
          { type: "computedStyle", selector: ".card", property: "border-width", expected: ["1px"], message: "The card border is `1px` wide." },
          { type: "computedStyle", selector: ".card", property: "border-style", expected: ["solid"], message: "...`solid`" },
          { type: "computedStyle", selector: ".card", property: "border-color", expected: ["#cbd5e1", "rgb(203, 213, 225)"], message: "...and `#cbd5e1`." },
          { type: "computedStyle", selector: ".card", property: "border-radius", expected: ["1rem", "16px"], message: "The card corners are `1rem`." },
          { type: "computedStyle", selector: ".card", property: "box-shadow", expected: ["0 10px 25px rgb(15 23 42 / 0.12)", "rgba(15, 23, 42, 0.12) 0px 10px 25px 0px"], message: "The card has the soft shadow." },
          { type: "computedStyle", selector: ".chip", property: "border-radius", expected: ["999px"], message: "The chip is a pill." },
          { type: "computedStyle", selector: ".btn", property: "border-radius", expected: ["0.5rem", "8px"], message: "The button corners are `0.5rem`." },
        ],
        solution: {
          html: `<article class="card">
  <span class="chip">New</span>
  <h2 class="card-title">Trail pass</h2>
  <p class="card-text">Valid on every marked route.</p>
  <button class="btn">Buy pass</button>
</article>`,
          css: `body {
  margin: 0;
  padding: 32px;
  background-color: #f1f5f9;
  font-family: system-ui, sans-serif;
}

.card {
  max-width: 20rem;
  padding: 1.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: #cbd5e1;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0 10px 25px rgb(15 23 42 / 0.12);
}

.chip {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background-color: #e0e7ff;
  color: #3730a3;
  font-size: 0.8125rem;
  font-weight: 700;
}

.card-title {
  margin: 0.75rem 0 0.25rem;
}

.card-text {
  margin: 0 0 1rem;
}

.btn {
  padding: 0.6rem 1.25rem;
  border: 0;
  border-radius: 0.5rem;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 700;
}
`,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "choosing-border-outline-shadow",
      kind: "learn",
      title: "Border, outline or shadow?",
      summary: "Three ways to draw an edge, how they differ in layout, shape and accessibility, and which to pick.",
      minutes: 8,
      concept: {
        description:
          "A border, an outline and a box shadow can all draw a line around an element, and they look similar. They behave very differently: a border takes up space, an outline does not and survives high-contrast modes, and a shadow takes no space, supports many layers and soft edges, and disappears in forced colours.",
        why: "Choosing the wrong one causes layout jumps when something is hovered, focus indicators that vanish for the people who need them most, and fussy hacks to get an edge you could have drawn directly.",
        mentalModel:
          "A border is a wall, which takes up room. An outline is a chalk line on the floor around the wall. A shadow is a soft glow cast around it. All three mark the edge, but only the wall pushes things away.",
      },
      body: [
        { type: "heading", text: "Side by side" },
        {
          type: "list",
          items: [
            "**Border:** takes up layout space, so it is part of the box and counts in its size. Has separate sides. Survives forced-colours mode. Best for permanent frames and dividers.",
            "**Outline:** takes no space, drawn outside the border, one line for the whole box, and can be offset. Survives forced-colours mode. Best for focus rings and debugging.",
            "**Box shadow:** takes no space, can be soft, layered, offset and inset. Removed in forced-colours mode. Best for depth and decoration, and for ring effects that must not move layout.",
          ],
        },
        { type: "heading", text: "Avoiding layout jumps" },
        {
          type: "paragraph",
          text: "A common bug appears when a hover state adds a border: `a:hover { border: 2px solid }` makes the element two pixels bigger on every side, so its neighbours jump. There are three fixes. Give the element a transparent border all the time, so hover only changes its colour. Use an `outline` for the hover state, which takes no space. Or use a `box-shadow` ring. The first is the most robust and keeps the border visible in forced-colours mode, since the colour is replaced.",
        },
        {
          type: "code",
          language: "css",
          code: `.tab {
  border-bottom: 3px solid transparent;
}

.tab:hover {
  border-bottom-color: #a5b4fc;
}

.tab[aria-selected="true"] {
  border-bottom-color: #4f46e5;
}`,
          caption: "The border is always there, so changing its colour never moves anything",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.btn {
  border: 2px solid transparent;
}

.btn:hover {
  border-color: #4f46e5;
}`,
            note: "The space for the border is reserved from the start, so hovering changes only the colour.",
          },
          bad: {
            code: `.btn:hover {
  border: 2px solid #4f46e5;
}`,
            note: "The border appears on hover, so the button grows by 4px and everything beside it shifts.",
          },
        },
        {
          type: "paragraph",
          text: "Accessibility pushes in the same direction. People who use forced-colours mode, a setting that makes the system override a page's colours, still see borders and outlines, because the browser repaints them in system colours, but they do not see shadows. So anything essential, such as the edge of an input or a focus ring, should be a border or an outline, with the shadow reserved for decoration that the page can lose without breaking.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "A quick guide: border for structure, outline for focus, shadow for depth. If a ring must be visible in forced-colours mode, use an outline or a border, or add a transparent outline next to a shadow ring.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "A border takes space. An outline and a shadow do not.",
            "Outlines and borders survive forced-colours mode, while shadows are removed.",
            "Reserve border space with `border: ... transparent` to avoid layout jumps on hover.",
            "Border for structure, outline for focus rings, shadow for depth.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "layering-and-blending",
      kind: "learn",
      title: "Layering, overlays and blending",
      summary: "Readable text over images, blend modes, frosted glass and fading edges with masks.",
      minutes: 10,
      concept: {
        description:
          "CSS can combine visual layers in several ways. Stacked backgrounds make overlays and scrims, `background-blend-mode` and `mix-blend-mode` mix layers like image-editing software, `backdrop-filter` blurs whatever lies behind an element, and `mask-image` fades the edges of an element away.",
        why: "Text on photos, frosted panels and soft fades are everywhere in modern design, and they can all be done without image files. Knowing the tools also tells you their costs, since some are expensive to paint and some have accessibility consequences.",
        mentalModel:
          "Think of a stack of glass plates. Backgrounds are plates you can order. Blend modes decide how the colours of two plates mix. Backdrop filters are frosted glass in front of the stack, and masks are stencils that cut away parts of a plate.",
      },
      body: [
        { type: "heading", text: "Overlays for readable text" },
        {
          type: "paragraph",
          text: "Text over a photo is hard to read where the picture is light. The classic fix is a **scrim**: a translucent dark gradient placed above the image as another background layer. A gradient from transparent at the top to dark at the bottom keeps the picture visible while giving the caption a dark base.",
        },
        {
          type: "code",
          language: "css",
          code: `.cover {
  background:
    linear-gradient(to top, rgb(15 23 42 / 0.8), transparent 60%),
    url("trail.jpg") center / cover no-repeat;
  color: #ffffff;
}`,
          caption: "A dark scrim over a photo, strongest at the bottom where the caption sits",
        },
        { type: "heading", text: "Blend modes" },
        {
          type: "paragraph",
          text: "`background-blend-mode` mixes an element's background layers with each other and with its colour, using the modes from image editors: `multiply` darkens, `screen` lightens, `overlay` increases contrast and `luminosity` keeps the brightness of one layer with the colour of the other. A grayscale photo with `multiply` over a brand colour gives a duotone look. `mix-blend-mode` does the same between an element and whatever is behind it.",
        },
        { type: "heading", text: "Frosted glass and masks" },
        {
          type: "paragraph",
          text: "`backdrop-filter: blur(12px)` blurs everything that shows through an element's translucent background, which gives the frosted-glass effect. It needs a background that is not fully opaque, and it is supported in current browsers, though it is costly to paint, so use it sparingly. `mask-image` takes an image, most often a gradient, and hides the parts of the element where the mask is transparent. `mask-image: linear-gradient(black 70%, transparent)` fades the bottom of a box smoothly to nothing.",
        },
        {
          type: "code",
          language: "css",
          code: `.glass {
  background-color: rgb(255 255 255 / 0.35);
  backdrop-filter: blur(12px);
}

.fade-bottom {
  mask-image: linear-gradient(black 70%, transparent);
}`,
          caption: "A frosted panel, and an element that fades away at the bottom",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.glass {
  background-color: rgb(255 255 255 / 0.7);
  backdrop-filter: blur(12px);
}`,
            note: "A fairly opaque tint keeps the text readable even where the blur is not available.",
          },
          bad: {
            code: `.glass {
  background-color: rgb(255 255 255 / 0.05);
  backdrop-filter: blur(12px);
}`,
            note: "Almost fully transparent. In a browser without `backdrop-filter`, text sits directly on busy imagery and cannot be read.",
          },
        },
        {
          type: "paragraph",
          text: "These effects stack, and every layer you add costs the browser more to paint. A page with a few frosted panels and one scrim is fine. A page with dozens of blurred, blended, masked elements can scroll badly on a phone. Use them where they add something, and test on a modest device.",
        },
        {
          type: "callout",
          tone: "warning",
          text: "Always check the contrast of text over images, blur and blends at the worst point behind it, and give the element a solid enough fallback colour for browsers that do not support the effect.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "Stack a translucent gradient above an image to make text readable.",
            "`background-blend-mode` and `mix-blend-mode` mix layers using modes like `multiply` and `overlay`.",
            "`backdrop-filter: blur()` frosts whatever is behind a translucent element, and is costly to paint.",
            "`mask-image` fades or cuts away parts of an element. Always keep a readable fallback.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "object-fit-and-images",
      kind: "learn",
      title: "Images in boxes: object-fit and aspect-ratio",
      summary: "How to fit an img into a fixed box without stretching it, and how to reserve space for it.",
      minutes: 9,
      concept: {
        description:
          "`object-fit` controls how an `<img>` (or a video) is scaled to fit the box that CSS gives it, much like `background-size` does for backgrounds. `object-position` chooses which part is kept, and `aspect-ratio` reserves the right shape before the picture has loaded.",
        why: "Photos come in every shape, and cards, avatars and galleries need them in one shape. Without `object-fit`, forcing an image into a box stretches it, and without a reserved shape the page jumps as images load.",
        mentalModel:
          "An image in a frame is like a poster in a picture frame. `fill` squashes the poster to fit, `contain` fits the whole poster and leaves matte around it, and `cover` fills the frame and trims the poster's edges.",
      },
      body: [
        { type: "heading", text: "The object-fit values" },
        {
          type: "list",
          items: [
            "`fill` (the default): stretches the image to the box exactly. It distorts the image if the shapes differ.",
            "`contain`: scales the whole image to fit inside, keeping its proportions, and leaves empty bands.",
            "`cover`: scales until the box is full, keeping proportions, and crops what does not fit.",
            "`none`: keeps the image's natural size, cropping or leaving space.",
            "`scale-down`: acts like `none` or `contain`, whichever gives the smaller image.",
          ],
        },
        {
          type: "code",
          language: "css",
          code: `.avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
}

.thumb {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center top;
}`,
          caption: "A round avatar from any photo, and a 16:9 thumbnail that keeps people's heads",
        },
        { type: "heading", text: "object-position and aspect-ratio" },
        {
          type: "paragraph",
          text: "`object-position` is the partner of `background-position`: it picks which part of the image stays visible when `cover` has to crop, so `center top` favours the top of the photo. `aspect-ratio: 16 / 9` gives the box a shape at any width, so the browser can reserve the space before the file arrives. Also add `width` and `height` attributes to the HTML `<img>`, so the browser knows the natural ratio, and the page does not jump as images load.",
        },
        {
          type: "compare",
          language: "css",
          good: {
            code: `.card img {
  width: 100%;
  height: 12rem;
  object-fit: cover;
}`,
            note: "Every photo fills the same shape without being stretched, whatever its original proportions.",
          },
          bad: {
            code: `.card img {
  width: 100%;
  height: 12rem;
}`,
            note: "With the default `fill`, a tall photo is squashed to fit, and people look wider than they are.",
          },
        },
        {
          type: "paragraph",
          text: "Remember the difference between the two ways of putting a picture in a box. An `<img>` is content: it can have alt text, is saved and printed with the page, and can be loaded lazily, which makes it the right choice for photographs. A CSS background is decoration, and is the right choice for textures and ornaments. `object-fit` and `background-size` give you the same cropping choices in either case, so you can pick based on meaning, not on layout.",
        },
        {
          type: "callout",
          tone: "tip",
          text: "If you only need a width limit, `max-width: 100%; height: auto;` keeps an image in its container and preserves its proportions. Use `object-fit` when the box has a fixed shape that the image must fill.",
        },
        {
          type: "callout",
          tone: "note",
          text: "`object-fit` works on `<img>`, `<video>` and `<canvas>`. For CSS backgrounds, the equivalent is `background-size: cover` with `background-position`.",
        },
        { type: "heading", text: "Recap" },
        {
          type: "list",
          items: [
            "`object-fit: cover` fills the box and crops. `contain` fits the whole image and leaves gaps. The default `fill` stretches.",
            "`object-position` chooses which part of a cropped image stays visible.",
            "`aspect-ratio` plus `width` and `height` attributes reserve space and stop the page jumping.",
            "`object-fit` is for `<img>` and `<video>`, and `background-size` is its background equivalent.",
          ],
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "object-fit-explorer",
      kind: "visualizer",
      title: "Object-fit explorer",
      summary: "Fit one picture into a fixed frame in five ways, and move the crop with object-position.",
      minutes: 8,
      concept: {
        description:
          "A wide picture sits in a fixed frame whose shape is different from the picture's. Two controls change how the picture is fitted and which part is kept, so you can compare `fill`, `contain`, `cover`, `none` and `scale-down` directly.",
        why: "The difference between `contain` and `cover`, and between cropping the top or the centre, is much easier to see than to read, and these two properties are what you will use on nearly every photo.",
        mentalModel:
          "The dashed frame is the box CSS gives the image. The control decides whether the picture is squashed to fill it, shrunk to fit inside it, or enlarged until it covers it.",
      },
      stage: {
        html: '<div class="board">\n  <div class="frame"><img class="photo" alt="A sample landscape" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiB2aWV3Qm94PSIwIDAgNDAwIDI0MCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNGY0NmU1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZGIyNzc3Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyNDAiIGZpbGw9InVybCgjZykiLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSI3MCIgcj0iMzQiIGZpbGw9IiNmZGU2OGEiLz48cGF0aCBkPSJNMCAyNDAgTDExMCAxMjAgTDE5MCAyMDAgTDI2MCAxNDAgTDQwMCAyNDAgWiIgZmlsbD0iIzFlMWI0YiIgb3BhY2l0eT0iMC44NSIvPjwvc3ZnPg=="></div>\n</div>',
        baseCss:
          "html, body { margin: 0; height: 100%; }\nbody { padding: 16px; box-sizing: border-box; background: #0f172a; font-family: system-ui, sans-serif; }\n.board { height: 100%; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border-radius: 12px; background: #ffffff; }\n.frame { width: 240px; height: 240px; background: #e2e8f0; outline: 2px dashed #94a3b8; }\n.photo { display: block; width: 100%; height: 100%; }",
        annotate: "none",
        target: ".photo",
        items: ".photo",
      },
      starter: `.photo {
  object-fit: fill;
  object-position: 50% 50%;
}
`,
      controls: [
        { id: "fit", label: "object-fit", selector: ".photo", property: "object-fit", fallback: "fill", type: "options", options: ["fill", "contain", "cover", "none", "scale-down"], help: "The frame is a 240px square, and the picture is wider than it is tall." },
        { id: "position", label: "object-position", selector: ".photo", property: "object-position", fallback: "50% 50%", type: "options", options: ["50% 50%", "left top", "right bottom", "center top", "0 100%"], help: "Which part of the picture stays visible when it is cropped." },
      ],
      presets: [
        { id: "cover", label: "Cover, centred", description: "fills and crops evenly", css: ".photo { object-fit: cover; object-position: 50% 50%; }" },
        { id: "contain", label: "Contain", description: "fits whole, leaves bands", css: ".photo { object-fit: contain; }" },
        { id: "left", label: "Cover, left side", description: "keeps the left of the picture", css: ".photo { object-fit: cover; object-position: left center; }" },
        { id: "none", label: "Natural size", description: "no scaling at all", css: ".photo { object-fit: none; }" },
      ],
      challenge: {
        title: "Fill the frame without stretching",
        description:
          "The picture is squashed to fit the square frame. Make it fill the frame without distortion, keeping the top of the picture in view: set `object-fit: cover` and `object-position: center top`.",
        hints: [
          "Both declarations are in the `.photo` rule.",
          "`cover` fills the frame and crops. `center top` keeps the top part.",
          "`object-fit: cover;` and `object-position: center top;`",
        ],
        checks: [
          { type: "computedStyle", selector: ".photo", property: "object-fit", expected: ["cover"], message: "The picture uses `object-fit: cover`." },
          { type: "computedStyle", selector: ".photo", property: "object-position", expected: ["center top", "50% 0%"], message: "The crop keeps the top: `center top`." },
        ],
        solution: `.photo {
  object-fit: cover;
  object-position: center top;
}
`,
      },
    },

    /* ------------------------------------------------------------------ */
    {
      id: "debug-the-invisible-border",
      kind: "debug",
      title: "Debug: the borders, radii and shadows that do nothing",
      summary: "Five edge declarations are ignored: a missing style, missing units and a value with too many parts.",
      minutes: 10,
      mode: "css",
      broken: {
        html: `<div class="box a">A</div>
<div class="box b">B</div>
<div class="box c">C</div>
<div class="box d">D</div>
<div class="box e">E</div>`,
        css: `body {
  margin: 0;
  padding: 24px;
  background-color: #f1f5f9;
  font-family: system-ui, sans-serif;
}

.box {
  margin-bottom: 14px;
  padding: 14px;
  background-color: #ffffff;
  font-weight: 700;
}

.a {
  border-width: 2px;
  border-color: #4f46e5;
}

.b {
  border-width: 2;
  border-style: solid;
  border-color: #4f46e5;
}

.c {
  border-radius: 12;
}

.d {
  box-shadow: 0 4 12px rgb(15 23 42 / 0.2);
}

.e {
  border-radius: 8px 8px 0 0 0;
}
`,
      },
      challenge: {
        title: "Make every edge appear",
        description:
          "None of these edges show. Fix each so that: A has a `solid` border style, B has a `2px` border width, C has a `12px` radius, D has the shadow `0 4px 12px rgb(15 23 42 / 0.2)`, and E has the radius `8px 8px 0 0` (rounded on top only).",
        hints: [
          "Use the explain panel's Heads up card and DevTools, where invalid declarations are struck through.",
          "Look for: a border with no style, lengths with no unit, and a radius with five values.",
          "A needs `border-style: solid`. B needs `2px`. C needs `12px`. D needs `4px`. E can have at most four values.",
        ],
        checks: [
          { type: "computedStyle", selector: ".a", property: "border-style", expected: ["solid"], message: "Box A has a `solid` border." },
          { type: "computedStyle", selector: ".b", property: "border-width", expected: ["2px"], message: "Box B's border is `2px` wide." },
          { type: "computedStyle", selector: ".c", property: "border-radius", expected: ["12px"], message: "Box C has a `12px` radius." },
          { type: "computedStyle", selector: ".d", property: "box-shadow", expected: ["0 4px 12px rgb(15 23 42 / 0.2)", "rgba(15, 23, 42, 0.2) 0px 4px 12px 0px"], message: "Box D has the soft shadow." },
          { type: "computedStyle", selector: ".e", property: "border-radius", expected: ["8px 8px 0 0", "8px 8px 0px 0px"], message: "Box E is rounded on top only." },
        ],
        solution: {
          html: `<div class="box a">A</div>
<div class="box b">B</div>
<div class="box c">C</div>
<div class="box d">D</div>
<div class="box e">E</div>`,
          css: `body {
  margin: 0;
  padding: 24px;
  background-color: #f1f5f9;
  font-family: system-ui, sans-serif;
}

.box {
  margin-bottom: 14px;
  padding: 14px;
  background-color: #ffffff;
  font-weight: 700;
}

.a {
  border-width: 2px;
  border-style: solid;
  border-color: #4f46e5;
}

.b {
  border-width: 2px;
  border-style: solid;
  border-color: #4f46e5;
}

.c {
  border-radius: 12px;
}

.d {
  box-shadow: 0 4px 12px rgb(15 23 42 / 0.2);
}

.e {
  border-radius: 8px 8px 0 0;
}
`,
        },
      },
    },

    // Guided build: step files live in ./backgrounds-borders/workshops/build-a-product-card (compiled by `npm run build:content`).
    buildAProductCard,

    /* ------------------------------------------------------------------ */
    {
      id: "backgrounds-borders-quiz",
      kind: "quiz",
      title: "Quiz: backgrounds and borders",
      summary: "Eighteen questions on backgrounds, gradients, borders, radius, outlines, shadows and images.",
      minutes: 14,
      passPercent: 70,
      questions: [
        {
          prompt: "Where does an element's background paint by default?",
          options: ["Only behind the content", "Under the whole border box, including the border area", "Only inside the padding", "Outside the border"],
          answerIndex: 1,
          explanation: "`background-clip` defaults to `border-box`, so the paint reaches under the border. That is why a dashed or translucent border shows the background through its gaps.",
        },
        {
          prompt: "Which property stops a background showing through a translucent border?",
          options: ["`background-origin: padding-box`", "`background-attachment: local`", "`background-clip: padding-box`", "`background-repeat: no-repeat`"],
          answerIndex: 2,
          explanation: "`background-clip: padding-box` cuts the paint at the inside edge of the border. `background-origin` only decides where images start.",
        },
        {
          prompt: "What does `background-size: cover` do?",
          options: ["Shrinks the image until it fits, leaving gaps", "Repeats the image to cover the box", "Stretches the image out of proportion", "Scales the image until it covers the whole box, cropping what does not fit"],
          answerIndex: 3,
          explanation: "`cover` keeps the proportions and scales up until there are no gaps, cropping the overflow. `contain` is the one that shrinks to fit.",
        },
        {
          prompt: "In `background: A, B, #fff`, which layer is painted on top?",
          options: ["A, the first one listed", "B", "The colour", "They are blended equally"],
          answerIndex: 0,
          explanation: "The first layer is on top and the last is at the bottom, with the colour behind everything.",
        },
        {
          prompt: "A rule has `background-size: cover;` followed by `background: url(a.jpg) center no-repeat;`. What happens to the size?",
          options: ["It is kept", "It is reset to `auto`, because the shorthand resets what it omits", "It overrides the shorthand", "The rule becomes invalid"],
          answerIndex: 1,
          explanation: "A shorthand resets every sub-property it does not mention. Because it comes after, it undoes the `cover`. Write the longhand after the shorthand instead.",
        },
        {
          prompt: "Which declaration is valid for a gradient background?",
          options: ["`color: linear-gradient(red, blue);`", "`background-color: linear-gradient(red, blue);`", "`background-image: linear-gradient(red, blue);`", "`background: gradient(red, blue);`"],
          answerIndex: 2,
          explanation: "A gradient is an image, so it belongs in `background-image` or `background`. `background-color` and `color` only accept colours.",
        },
        {
          prompt: "Which direction does `linear-gradient(90deg, red, blue)` flow?",
          options: ["Up", "Down", "Left", "Right"],
          answerIndex: 3,
          explanation: "`0deg` points up, `90deg` points right, `180deg` points down and `270deg` points left.",
        },
        {
          prompt: "How do you make a hard edge between two colours in a gradient?",
          options: ["Give two colour stops the same position", "Set `blur: 0`", "Use only `repeating-linear-gradient`", "Set `background-size: 0`"],
          answerIndex: 0,
          explanation: "When two stops share a position, there is no space to blend, so the colour changes abruptly. That is how stripes and pie charts are drawn.",
        },
        {
          prompt: "What does `border: 1px #cbd5e1;` display?",
          options: ["A thin solid line", "Nothing: the style defaults to `none`", "A dotted line", "A browser error"],
          answerIndex: 1,
          explanation: "A border needs a style. Without one, the style is `none` and no border is drawn.",
        },
        {
          prompt: "In `border-radius: 10px 20px 30px 40px`, which corner gets `30px`?",
          options: ["Top left", "Top right", "Bottom right", "Bottom left"],
          answerIndex: 2,
          explanation: "The four values go clockwise from the top left: top left, top right, bottom right, bottom left.",
        },
        {
          prompt: "Which radius makes a pill shape at any size?",
          options: ["`border-radius: 0`", "`border-radius: 50%`", "`border-radius: 1`", "`border-radius: 999px`"],
          answerIndex: 3,
          explanation: "A radius larger than the box allows is scaled down, so `999px` always gives fully rounded ends. `50%` would make an ellipse on a rectangle.",
        },
        {
          prompt: "Why does a square image inside a rounded card poke out of its corners?",
          options: ["Rounded corners do not clip children, so you need `overflow: hidden`", "Children ignore borders", "`border-radius` is invalid on children", "The parent needs a `box-shadow`"],
          answerIndex: 0,
          explanation: "`border-radius` rounds the element's own background and border, not its contents. `overflow: hidden` clips children to the rounded shape.",
        },
        {
          prompt: "Which of these takes up NO layout space?",
          options: ["`border`", "`outline`", "`padding`", "`margin`"],
          answerIndex: 1,
          explanation: "An outline is drawn over the page outside the border and does not change the layout. A border, padding and margin all affect the box's size or position.",
        },
        {
          prompt: "In `box-shadow: 0 4px 12px rgb(0 0 0 / 0.2)`, what is `12px`?",
          options: ["The spread", "The vertical offset", "The blur radius", "The horizontal offset"],
          answerIndex: 2,
          explanation: "The order is x offset, y offset, blur, then spread (optional), then colour. So `0` is the x offset, `4px` is the y offset and `12px` is the blur.",
        },
        {
          prompt: "What does the `inset` keyword do in a `box-shadow`?",
          options: ["Moves the shadow behind the element", "Makes it blurrier", "Shows it only on hover", "Draws the shadow inside the box"],
          answerIndex: 3,
          explanation: "`inset` flips the shadow to the inside of the box, which looks like a recessed surface.",
        },
        {
          prompt: "An image is placed in a fixed 16:9 box with `object-fit: cover`. What happens?",
          options: ["It fills the box, keeping its proportions, and crops what overflows", "It is stretched to fit exactly", "It shrinks to fit entirely, with gaps", "It repeats to fill the box"],
          answerIndex: 0,
          explanation: "`cover` scales the image until the box is full without distorting it, and crops the parts that fall outside.",
        },
        {
          prompt: "A photo carries meaning for the reader. Which is the right way to include it?",
          options: ["As a CSS background", "As an `<img>` with alt text", "As a gradient", "As a `box-shadow`"],
          answerIndex: 1,
          explanation: "Background images are invisible to assistive technology. Content images belong in an `<img>` with a text alternative.",
        },
        {
          prompt: "Why are outlines safer than box-shadow rings for focus indicators?",
          options: ["Outlines are animated faster", "Shadows cannot have colours", "Outlines stay visible in forced-colours mode, but shadows are removed", "Outlines are always blue"],
          answerIndex: 2,
          explanation: "In forced-colours (high-contrast) modes, the system removes box shadows but keeps outlines and borders, so outlines are reliable for the people who depend on them.",
        },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: "backgrounds-borders-review",
      kind: "review",
      title: "Review: backgrounds and borders cheat sheet",
      summary: "Every background property, gradients, borders, radius, shadows and image fitting on one page.",
      minutes: 4,
      body: [
        { type: "heading", text: "Backgrounds" },
        {
          type: "code",
          language: "css",
          code: `background-color: #1e1b4b;              /* fills the border box by default */
background-image: url("a.jpg");           /* or a gradient */
background-repeat: no-repeat;             /* repeat | repeat-x | repeat-y | space | round */
background-position: center;              /* 50% 50% */
background-size: cover;                   /* contain | 48px 48px | auto */
background-clip: padding-box;             /* border-box | content-box | text */
background-origin: padding-box;
background: linear-gradient(...), url(...) center / cover no-repeat, #1e1b4b;  /* first layer on top */`,
        },
        { type: "heading", text: "Gradients" },
        {
          type: "code",
          language: "css",
          code: `linear-gradient(90deg, #4f46e5, #db2777)           /* 0deg up, 90deg right, 180deg down */
linear-gradient(90deg, #fde68a 0 50%, #f59e0b 50% 100%)   /* hard stop = stripes */
radial-gradient(circle at 30% 20%, #fde68a, #f59e0b)
conic-gradient(#4f46e5 0 40%, #e0e7ff 40% 100%)    /* pie chart */
/* gradients are IMAGES: use background-image, never background-color */`,
        },
        { type: "heading", text: "Borders, radius and outlines" },
        {
          type: "code",
          language: "css",
          code: `border: 1px solid #cbd5e1;      /* style defaults to none: no style, no border */
border-radius: 12px;            /* TL TR BR BL, clockwise */
border-radius: 999px;           /* pill */   border-radius: 50%;  /* circle or ellipse */
overflow: hidden;               /* clips children to the rounded corners */
outline: 3px solid #4f46e5;     /* takes no space */
outline-offset: 3px;
a:focus-visible { outline: 3px solid #4f46e5; }   /* never outline: none without a replacement */`,
        },
        { type: "heading", text: "Shadows and image fitting" },
        {
          type: "code",
          language: "css",
          code: `box-shadow: 0 10px 25px rgb(15 23 42 / 0.12);       /* x y blur [spread] colour */
box-shadow: 0 1px 2px rgb(15 23 42 / .08), 0 10px 25px rgb(15 23 42 / .12);  /* layered */
box-shadow: inset 0 2px 4px rgb(15 23 42 / .1);     /* pressed in */
box-shadow: 0 0 0 3px #4f46e5;                      /* ring, no layout space */
img { object-fit: cover; object-position: center top; aspect-ratio: 16 / 9; }`,
        },
        { type: "heading", text: "Remember" },
        {
          type: "list",
          items: [
            "A shorthand resets what it omits. Write `background` before any longhands.",
            "Layers: the first listed is on top, and the colour is at the bottom.",
            "`border-radius` does not clip children. Add `overflow: hidden` to the rounded element.",
            "Border takes space, outline and shadow do not. Reserve a transparent border to avoid hover jumps.",
            "Outlines survive forced-colours mode and shadows do not, so use outlines for focus.",
            "Use `<img>` with alt text for content images, and backgrounds for decoration.",
            "Always give text on an image a fallback colour and enough contrast.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text: "When an edge looks wrong, ask which of the three tools you used: a border (takes space), an outline (does not) or a shadow (soft, layered, removed in forced colours).",
        },
      ],
    },
  ],
};

export default content;
