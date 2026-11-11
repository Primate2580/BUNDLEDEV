import type { TopicContent } from "@/engine/types";
import bringAPageToLife from "./transforms-animations/workshops/bring-a-page-to-life/workshop.generated";

const content: TopicContent = {
  lessons: [
    /* ------------------------------------------------------------------ */
    {
          id: "what-is-a-transform",
          kind: "learn",
          title: "What a transform is",
          summary: "Move, turn and resize an element without disturbing the page around it.",
          minutes: 8,
          concept: {
            description: "The `transform` property changes how an element is drawn: you can slide it, spin it, shrink it or tilt it. The browser works out the layout first, as if nothing had happened, and then draws the element in its new position.",
            why: "That order is the whole appeal. Because the page is laid out before the transform is applied, nothing around the element moves, and the browser can draw the result very quickly. It is why hover effects, sliding menus and loading spinners are almost always built with transforms.",
            mentalModel: "Picture a photo lying on a table. You can slide it, turn it, or hold it closer to your eye, and the spot on the table where it was lying stays exactly as it was. Other photos do not budge.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's try it. Imagine a small badge that sits in a row of tags. We want it to tilt a little, like a sticker someone stuck on crooked. Here is everything we need:",
            },
            {
              type: "code",
              language: "css",
              code: `.badge {
      display: inline-block;
      transform: rotate(-6deg);
    }`,
            },
            {
              type: "paragraph",
              text: "Read the value out loud: rotate minus six degrees. A negative angle turns the badge counter-clockwise, and a positive one turns it clockwise. Add the rule to a badge in the Playground and you will see it tilt, while the tags on either side stay exactly where they were. The badge still takes up its original, straight rectangle in the layout; only its drawing is rotated.",
            },
            {
              type: "paragraph",
              text: "Notice the `display: inline-block` line. Transforms have no effect on a plain inline element, such as a `span` or a link sitting inside a line of text, because the browser does not treat it as a box it can move. If a transform seems to do nothing, check the display first. Flex and grid items are fine, because they are already boxes.",
            },
            {
              type: "paragraph",
              text: "The same property can do many things, and you pick them by the function you write after the colon. `translate()` slides, `rotate()` turns, `scale()` resizes and `skew()` slants. You can even write several in a row, and the next lessons take them one at a time. For now, try changing the angle to `12deg` and then to `0.25turn`, which is a quarter of a full circle. Both are valid, and `turn` is handy when you want a clean fraction.",
            },
            {
              type: "paragraph",
              text: "To see that reserved space for yourself, give the badge's container a border and compare the two versions. With the rotation, the border does not change shape, because the browser measured the badge before it turned. That is both the strength of transforms and the thing to remember: a rotated or scaled element can overlap its neighbours, because they were never asked to make room.",
            },
            {
              type: "paragraph",
              text: "One last thing worth knowing before you move on: a transform other than `none` makes the element a stacking context, and a containing block for fixed children. You will rarely notice, but if a dropdown ever hides behind something for no reason, remember that a stray transform on an ancestor is a likely suspect.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "translate-and-scale",
          kind: "learn",
          title: "Translate and scale",
          summary: "Slide things with translate and resize them with scale, and why both beat changing margins and widths.",
          minutes: 8,
          concept: {
            description: "`translate()` moves an element sideways or up and down, and `scale()` makes it bigger or smaller. Both leave the layout alone, so the space the element originally took is still reserved.",
            why: "People often reach for `margin-left` to nudge something or `width` to grow it. That works, but it forces the browser to lay out the page again on every frame. Translate and scale skip that step, so animations stay smooth, and nothing nearby gets pushed around.",
            mentalModel: "Imagine a magnifying glass moved across a page. Sliding the glass or bringing it closer changes what you see, but the page underneath is untouched.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with `translate`. It takes one or two lengths: the first is how far to move to the right, the second how far to move down. A negative number goes the other way. Percentages are different from most places in CSS, because they are a percentage of the element's own size, not of its parent.",
            },
            {
              type: "code",
              language: "css",
              code: `.card:hover {
      transform: translate(0, -6px);     /* up by six pixels */
    }
    
    .dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); /* back by half its own size */
    }`,
            },
            {
              type: "paragraph",
              text: "That second rule is the classic way to centre a box. `top: 50%` and `left: 50%` put the box's top-left corner in the middle of its container, which is not quite centred. Pulling it back by half of its own width and height finishes the job, and it works for any size. You can also write `translateX(20px)` or `translateY(-6px)` when you only need one direction.",
            },
            {
              type: "paragraph",
              text: "Now `scale`. A single number multiplies the size in both directions, so `scale(1.1)` is ten percent bigger and `scale(0.5)` is half the size. Two numbers set width and height separately, and `scaleX(-1)` flips the element like a mirror. A hovered card feels alive with `transform: scale(1.03)`, and it does not shove its neighbours aside the way a larger `width` would.",
            },
            {
              type: "code",
              language: "css",
              code: `.thumb {
      transform: scale(1);
    }
    .thumb:hover {
      transform: scale(1.05);
    }`,
            },
            {
              type: "paragraph",
              text: "Try it with a picture inside a card. If the enlarged picture spills over the rounded corners, put `overflow: hidden` on the picture's container, and it will be clipped neatly.",
            },
            {
              type: "code",
              language: "css",
              code: `.drawer {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: 18rem;
      transform: translateX(-100%);   /* just off the left edge */
    }
    .drawer.open {
      transform: translateX(0);
    }`,
            },
            {
              type: "paragraph",
              text: "Percentages are what make that drawer work. `-100%` always means one full drawer-width to the left, whatever the width is, so you can change `18rem` to anything and the drawer still hides exactly off-screen. Add a transition and it slides in and out, and no JavaScript beyond toggling the `open` class is needed.",
            },
            {
              type: "paragraph",
              text: "If you use translate for a hover movement, write the base state too, such as `transform: translate(0, 0)`. It is not strictly required, but it makes the transition obvious to the next person who reads the code, and it avoids a jump if the starting value is ever missing.",
            },
            {
              type: "paragraph",
              text: "A habit worth building: whenever you are about to change a `margin`, `top` or `width` for a visual effect, stop and ask whether a transform could do it. If the answer is yes, the transform is nearly always the better choice, and it will animate more smoothly too.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "transform-explorer",
          kind: "visualizer",
          title: "Transform explorer",
          summary: "Slide, turn and resize a box, change where it pivots, and watch the dashed outline stay put.",
          minutes: 9,
          concept: {
            description: "A blue box sits on top of a dashed outline that marks where it started. Two controls change its `transform` and its `transform-origin`, so you can see for yourself what each function does, and what changes when you swap the order of two of them.",
            why: "It is hard to picture a rotation around a corner, or the difference between sliding then turning and turning then sliding, from a description alone. Dragging a control and watching the box answer is the quickest way to make the rules feel obvious.",
            mentalModel: "Imagine the outline is the spot on the table where the photo used to lie. The box is the photo itself. It can move, turn and grow, but the spot never changes, which is exactly why a transform never disturbs the page around it.",
          },
          stage: {
            html: `<div class="stage">
      <div class="ghost"></div>
      <div class="box">A</div>
    </div>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #ffffff; font-family: system-ui, sans-serif; font-size: 14px; font-weight: 700; }
    .stage { position: relative; height: 260px; margin: 16px; }
    .ghost { position: absolute; left: 110px; top: 70px; width: 120px; height: 80px; box-sizing: border-box; border: 2px dashed #64748b; border-radius: 10px; }
    .box { position: absolute; left: 110px; top: 70px; display: flex; align-items: center; justify-content: center; width: 120px; height: 80px; box-sizing: border-box; border-radius: 10px; background: #6366f1; font-size: 22px; opacity: 0.9; }`,
            annotate: "none",
            target: ".stage",
            items: ".box",
            itemCount: 1,
          },
          starter: `.box {
      transform: none;
      transform-origin: center;
    }
    `,
          controls: [
            {
              id: "transform",
              label: "transform",
              selector: ".box",
              property: "transform",
              fallback: "none",
              type: "options",
              options: ["none", "rotate(15deg)", "rotate(-15deg)", "scale(1.2)", "skewX(-15deg)", "translate(40px, 20px)", "translate(40px, 0) rotate(20deg)", "rotate(20deg) translate(40px, 0)"],
              help: "The last two use the same functions in a different order, and end up in different places.",
            },
            {
              id: "origin",
              label: "transform-origin",
              selector: ".box",
              property: "transform-origin",
              fallback: "center",
              type: "options",
              options: ["center", "top left", "top right", "bottom left", "bottom center"],
              help: "The point the box turns or scales around. Pick a corner and rotate again.",
            },
          ],
          presets: [
            {
              id: "hinge",
              label: "Hinge on the left",
              description: "rotate around the left edge",
              css: ".box { transform-origin: left center; transform: rotate(-30deg); }",
            },
            {
              id: "order-a",
              label: "Slide, then turn",
              description: "ends up to the right",
              css: ".box { transform-origin: center; transform: translate(40px, 0) rotate(20deg); }",
            },
            {
              id: "order-b",
              label: "Turn, then slide",
              description: "ends up lower down",
              css: ".box { transform-origin: center; transform: rotate(20deg) translate(40px, 0); }",
            },
            {
              id: "grow",
              label: "Grow from a corner",
              description: "scale from the top left",
              css: ".box { transform-origin: top left; transform: scale(1.2); }",
            },
          ],
          challenge: {
            title: "Turn it around a corner",
            description: "Make the box turn forty-five degrees, clockwise, around its **top left corner**. Set `transform` to `rotate(45deg)` and `transform-origin` to `top left`, and watch the dashed outline stay exactly where it was.",
            hints: [
              "Two declarations in the `.box` rule: one for the angle and one for the pivot.",
              "A positive angle turns clockwise. The origin takes keywords, so `top left` is the corner you want.",
              "`.box { transform: rotate(45deg); transform-origin: top left; }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".box",
                property: "transform",
                expected: [
                  "rotate(45deg)",
                  "matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0)",
                ],
                message: "The box is turned by `rotate(45deg)`",
              },
              {
                type: "computedStyle",
                selector: ".box",
                property: "transform-origin",
                expected: ["top left", "left top", "0px 0px", "0% 0%", "0 0"],
                message: "...around its `top left` corner.",
              },
            ],
            solution: `.box {
      transform: rotate(45deg);
      transform-origin: top left;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "rotate-and-skew",
          kind: "learn",
          title: "Rotate and skew",
          summary: "Turn an element around its centre, slant it, and keep the text inside readable.",
          minutes: 8,
          concept: {
            description: "`rotate()` turns an element around a point, and `skew()` slants it, as if the top were pushed one way and the bottom the other. Angles can be written in degrees, turns, or radians.",
            why: "Rotation gives a page personality: tilted stickers, a chevron that flips when a section opens, a loading ring that spins. Skew is less common, but it is how you get the slanted buttons and angled banners you see on bold designs.",
            mentalModel: "Picture a playing card on a table. Rotating it spins the card around its middle. Skewing is like holding the bottom edge still and sliding the top edge sideways, so the rectangle leans into a parallelogram.",
          },
          body: [
            {
              type: "paragraph",
              text: "Rotation is the easier one, so start there. Positive angles turn clockwise, and negative ones turn counter-clockwise. A full circle is `360deg`, which is also `1turn`.",
            },
            {
              type: "code",
              language: "css",
              code: `.chevron {
      transform: rotate(0deg);
    }
    .open .chevron {
      transform: rotate(180deg);   /* flips the arrow over */
    }`,
            },
            {
              type: "paragraph",
              text: "That small pair of rules is the whole trick behind most accordion arrows. Add a `transition` from the Transitions topic and the arrow will turn smoothly instead of snapping. Remember that the element needs to be a box for this to work, so a `span` needs `display: inline-block` first.",
            },
            {
              type: "paragraph",
              text: "Skew takes an angle for each direction. `skewX(20deg)` leans the shape sideways, and `skewY(10deg)` tilts it up or down. Skewing distorts everything inside the element, so the text slants as well, which is rarely what you want. The usual fix is to skew the box and then skew its content back by the same amount.",
            },
            {
              type: "code",
              language: "css",
              code: `.tag {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: #4f46e5;
      transform: skewX(-12deg);
    }
    .tag span {
      display: inline-block;
      transform: skewX(12deg);     /* straightens the text again */
    }`,
            },
            {
              type: "paragraph",
              text: "Paste that into the Playground with `<a class=\"tag\"><span>New</span></a>` and take the inner rule away to see what the correction does. Without it the word leans; with it, only the background does.",
            },
            {
              type: "paragraph",
              text: "Try one experiment in the Playground: set `transform: rotate(15deg)` on a button, and then click near one of its corners. The clickable area turns with the drawing, so what you see is what you can click. That is another reason transforms feel so natural: the element is genuinely moved, not just painted somewhere else.",
            },
            {
              type: "paragraph",
              text: "Rotation is best in small doses on anything people have to read. A heading tilted a few degrees can look lively, but a paragraph set at an angle is tiring to read, and text rotated to ninety degrees makes people tilt their heads. Keep body text straight, and save the tilt for stickers, badges and decorations that carry little information.",
            },
            {
              type: "code",
              language: "css",
              code: `.spinner {
      transform: rotate(1turn);
    }`,
            },
            {
              type: "paragraph",
              text: "Turns are a lovely unit for animation, because `1turn` always means one full circle. You will use `rotate(360deg)` or `rotate(1turn)` in the next lessons to make a loading ring spin forever.",
            },
            {
              type: "paragraph",
              text: "When you rotate or skew an element near the edge of a page, remember that its corners swing outwards and can poke out of the container. If you see an unexpected horizontal scrollbar after adding a transform, that is usually why, and `overflow: hidden` on the parent is the quick answer.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "transform-origin",
          kind: "learn",
          title: "Transform origin",
          summary: "Choose the point that an element turns or scales around.",
          minutes: 7,
          concept: {
            description: "Every transform needs a fixed point to work from. By default, that point is the exact centre of the element. The `transform-origin` property moves it, so the same rotation or scale can look completely different.",
            why: "Most of the time the centre is exactly what you want. But a door swings on its hinge, a menu grows out of its button, and a clock hand turns around one end. All three are the same transform with a different origin, and knowing that saves you from fiddly workarounds.",
            mentalModel: "Imagine a pin pushed through a piece of paper. Wherever you push the pin, that is where the paper turns. Pin it through the middle and it spins on the spot, and pin it at a corner and it swings around that corner like a door.",
          },
          body: [
            {
              type: "paragraph",
              text: "The origin takes one or two values: horizontal first, then vertical. You can use keywords such as `left`, `right`, `top`, `bottom` and `center`, or lengths and percentages measured from the element's top-left corner. The default is `50% 50%`, which is the same as `center`.",
            },
            {
              type: "code",
              language: "css",
              code: `.door {
      transform-origin: left center;
      transform: rotate(-30deg);
    }`,
            },
            {
              type: "paragraph",
              text: "Here the door's left edge stays where it is while the rest swings up, so it looks hinged. Change the origin back to the default and the door spins around its middle, which looks like nothing a real door would do. It is the only difference between the two, and the angle is identical.",
            },
            {
              type: "paragraph",
              text: "Origin works just as well with `scale`. A dropdown menu that appears to grow down from its button should scale from the top, not from the middle. Otherwise it expands in every direction at once and looks as if it floats loose from the thing that opened it.",
            },
            {
              type: "code",
              language: "css",
              code: `.menu {
      transform-origin: top left;
      transform: scale(0.95);
    }
    .menu.open {
      transform: scale(1);
    }`,
            },
            {
              type: "paragraph",
              text: "Combine this with a transition and the menu now unfolds from the corner of its button. A tiny detail like this is the kind of thing people feel without being able to point at it.",
            },
            {
              type: "paragraph",
              text: "Two values give you the corners. `transform-origin: 100% 0` is the top-right corner, and `bottom center` is the middle of the bottom edge, which is exactly where the hand of a clock or a pendulum should turn.",
            },
            {
              type: "code",
              language: "css",
              code: `.hand {
      transform-origin: bottom center;
      transform: rotate(40deg);
    }`,
            },
            {
              type: "paragraph",
              text: "If you cannot see why a rotation looks wrong, set a temporary `outline` and a different background colour on the element, change the origin, and watch which corner stays still. The one point that does not move is the origin, and seeing it takes the mystery away.",
            },
            {
              type: "paragraph",
              text: "Be careful with the `transform-origin` value when the element changes size. A pixel value such as `20px 20px` stays put, while a percentage follows the size of the box. Percentages are usually the safer choice for components whose size can change. Keywords such as `top left` read best of all, so use them whenever a corner or an edge is the point you mean.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-center-and-tilt",
          kind: "lab",
          title: "Lab: centre a box and tilt a badge",
          mode: "css",
          summary: "Use translate to centre an absolutely positioned box, and rotate to tilt a badge, once you remember it needs to be a box.",
          minutes: 8,
          starter: {
            html: `<div class="stage">
      <div class="dialog">
        <p class="note">Hello! <span class="badge">New</span></p>
      </div>
    </div>`,
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .stage {
      position: relative;
      width: 400px;
      height: 200px;
      background-color: #e0e7ff;
    }
    
    .dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      display: grid;
      place-items: center;
      width: 200px;
      height: 100px;
      background-color: #4f46e5;
      color: #ffffff;
      font-weight: 700;
    }
    
    .note {
      margin: 0;
    }
    
    .badge {
      padding: 0.1rem 0.5rem;
      background-color: #f59e0b;
      color: #1e293b;
      font-size: 0.8rem;
    }
    `,
          },
          challenge: {
            title: "Centre the dialog and tilt the badge",
            description: "The dialog's top left corner sits in the middle of the grey stage, which is not the same as being centred. Fix it with a transform that pulls the dialog back by half of its own width and height. Then tilt the little badge six degrees counter-clockwise, like a sticker. Remember that a `span` needs to be a box before a transform has any effect.",
            hints: [
              "Two rules need changes: `.dialog` needs a `transform`, and `.badge` needs a `display` and a `transform`.",
              "Percentages inside `translate()` are measured against the element itself, so `-50%` is half of its own size. Counter-clockwise needs a negative angle.",
              "`.dialog { transform: translate(-50%, -50%); }` and `.badge { display: inline-block; transform: rotate(-6deg); }`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".dialog",
                property: "transform",
                expected: ["translate(-50%, -50%)", "matrix(1, 0, 0, 1, -100, -50)"],
                message: "The dialog is pulled back by half of its own size",
              },
              {
                type: "computedStyle",
                selector: ".badge",
                property: "display",
                expected: ["inline-block"],
                message: "The badge is an `inline-block`",
              },
              {
                type: "computedStyle",
                selector: ".badge",
                property: "transform",
                expected: [
                  "rotate(-6deg)",
                  "matrix(0.994522, -0.104528, 0.104528, 0.994522, 0, 0)",
                ],
                message: "...and tilted by `rotate(-6deg)`.",
              },
            ],
            solution: {
              html: `<div class="stage">
      <div class="dialog">
        <p class="note">Hello! <span class="badge">New</span></p>
      </div>
    </div>`,
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .stage {
      position: relative;
      width: 400px;
      height: 200px;
      background-color: #e0e7ff;
    }
    
    .dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      display: grid;
      place-items: center;
      width: 200px;
      height: 100px;
      background-color: #4f46e5;
      color: #ffffff;
      font-weight: 700;
      transform: translate(-50%, -50%);
    }
    
    .note {
      margin: 0;
    }
    
    .badge {
      padding: 0.1rem 0.5rem;
      background-color: #f59e0b;
      color: #1e293b;
      font-size: 0.8rem;
      display: inline-block;
      transform: rotate(-6deg);
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "combining-transforms",
          kind: "learn",
          title: "Combining transforms, and why the order matters",
          summary: "Several functions in one declaration, the order trap, and the separate translate, rotate and scale properties.",
          minutes: 9,
          concept: {
            description: "You can list several transform functions in one declaration, separated by spaces, and the browser applies them one after another. The order you write them in changes the result, which surprises almost everyone the first time.",
            why: "Real effects usually mix movements: a card that lifts and tilts, a button that grows while it slides. If you do not know about ordering, you will spend an hour wondering why a box ends up in the wrong place. Once you know the rule, it takes a few seconds to fix.",
            mentalModel: "Imagine someone giving directions: walk a hundred steps, then turn right. That is a different journey from turning right first and then walking a hundred steps. Each function changes the direction the next one goes in.",
          },
          body: [
            {
              type: "paragraph",
              text: "Try this comparison. Two identical squares start in the same place. The first slides to the right and then turns. The second turns first and then slides.",
            },
            {
              type: "code",
              language: "css",
              code: `.a { transform: translate(100px, 0) rotate(90deg); }
    .b { transform: rotate(90deg) translate(100px, 0); }`,
            },
            {
              type: "paragraph",
              text: "Box `a` ends up one hundred pixels to the right, standing on its side. Box `b` ends up a hundred pixels *down*. After `rotate(90deg)`, the box's own right-hand direction points downwards, so the `translate` that follows moves along that new direction. Every function after a rotation, scale or skew works in the transformed space, so write them in the order you would describe the movement.",
            },
            {
              type: "paragraph",
              text: "A second trap catches people who write the property twice. A later `transform` declaration replaces an earlier one completely; it does not add to it. If you need both a rotation and a scale, they must go in a single value, such as `transform: rotate(8deg) scale(1.1)`.",
            },
            {
              type: "code",
              language: "css",
              code: `.badge {
      transform: rotate(-6deg);
      transform: scale(1.1);     /* replaces the rotation: only the scale remains */
    }
    
    .badge {
      transform: rotate(-6deg) scale(1.1);   /* both, in one declaration */
    }`,
            },
            {
              type: "paragraph",
              text: "If the order still feels slippery, here are two ways to think about it. Reading the list from left to right, each function moves the box's own little coordinate grid, so after a rotation the grid itself is turned. Reading it from right to left, each function moves the box in the page's own fixed directions: first it is turned, then it is moved right by a hundred pixels. Both views give the same answer, so pick the one that makes sense to you.",
            },
            {
              type: "paragraph",
              text: "There is also a tidier option in current browsers: `translate`, `rotate` and `scale` exist as properties of their own, and they combine without you having to rewrite the others. You can set `translate: 0 -6px` in a base rule and add `rotate: 4deg` on hover, and the two work together. They are applied in a fixed order, translate then rotate then scale, and then the `transform` property comes last.",
            },
            {
              type: "paragraph",
              text: "Use whichever suits the job. A single `transform` list is the most compatible choice and keeps related movements together, while the separate properties are lovely when different states want to change one movement without touching the others.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-transform-order",
          kind: "predict",
          title: "Predict the transform order",
          summary: "Two identical boxes, the same two functions, a different order. Work out where each one ends up.",
          minutes: 8,
          mode: "css",
          intro: "Boxes A and B both start at the same spot, and both get a `translate` of a hundred pixels and a `rotate` of ninety degrees. The only difference is the order the two functions are written in. Before you run the code, predict where each box ends up.",
          code: {
            html: `<div class="stage">
      <div class="box a">A</div>
      <div class="box b">B</div>
    </div>`,
            css: `body {
      margin: 0;
      font-family: system-ui, sans-serif;
      font-weight: 700;
      color: #ffffff;
    }
    
    .stage {
      position: relative;
      height: 16rem;
      margin: 1rem;
      background-color: #f1f5f9;
    }
    
    .box {
      position: absolute;
      left: 3rem;
      top: 3rem;
      display: grid;
      place-items: center;
      width: 4rem;
      height: 4rem;
      opacity: 0.85;
    }
    
    .a {
      background-color: #4f46e5;
      transform: translate(100px, 0) rotate(90deg);
    }
    
    .b {
      background-color: #f59e0b;
      transform: rotate(90deg) translate(100px, 0);
    }`,
          },
          questions: [
            {
              prompt: "Where does box A (the blue one) end up?",
              options: [
                "A hundred pixels to the right of the start, turned on its side",
                "A hundred pixels below the start, turned on its side",
                "Back at the start, turned on its side",
                "A hundred pixels to the left of the start",
              ],
              answerIndex: 0,
              hint: "Think of the directions: A slides first, and only then does it turn.",
              explanation: "A slides to the right first, while the box is still upright, and then it turns on the spot. So it ends up a hundred pixels to the right.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".a",
                  property: "transform",
                  expected: ["translate(100px, 0) rotate(90deg)", "translate(100px, 0px) rotate(90deg)", "matrix(0, 1, -1, 0, 100, 0)"],
                  message: "A is written as `translate` and then `rotate`.",
                },
              ],
            },
            {
              prompt: "Where does box B (the orange one) end up?",
              options: [
                "A hundred pixels to the right of the start",
                "A hundred pixels below the start",
                "Exactly where it started",
                "A hundred pixels above the start",
              ],
              answerIndex: 1,
              hint: "B turns first. What does its own right-hand direction point to after a ninety degree turn?",
              explanation: "B turns first, so the direction it slides in is turned too. After ninety degrees clockwise, its right-hand side points downwards, and the hundred pixel slide goes down the page.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".b",
                  property: "transform",
                  expected: ["rotate(90deg) translate(100px, 0)", "rotate(90deg) translate(100px, 0px)", "matrix(0, 1, -1, 0, 0, 100)"],
                  message: "B is written as `rotate` and then `translate`.",
                },
              ],
            },
            {
              prompt: "What would happen if the two functions were written as two separate `transform` declarations in the same rule?",
              options: [
                "Both would apply, in the order written",
                "The browser would ignore both",
                "Only the first would apply",
                "Only the last declaration would apply",
              ],
              answerIndex: 3,
              hint: "Think about what happens when you write the same property twice.",
              explanation: "A second `transform` replaces the first one completely. To use two functions, they have to be in a single value, separated by a space.",
            },
            {
              prompt: "Which of these is a good way to remember the result?",
              options: [
                "Each function moves the box in the page's fixed directions, in the order they appear",
                "Order never matters for translate and rotate",
                "Each function after a turn works in the turned direction, so write them in the order you would describe the journey",
                "The browser sorts them to put rotate first",
              ],
              answerIndex: 2,
              hint: "Compare A and B again.",
              explanation: "After a rotation, scale or skew, the box's own directions are changed. Every function that follows works in those changed directions. That is why the same functions give different results in a different order.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-lost-transform",
          kind: "debug",
          title: "Debug: the transform that lost half its job",
          mode: "css",
          summary: "The badge should slide and grow, but only one of the two happens. And it is still a plain inline span. Find out what is missing.",
          minutes: 7,
          broken: {
            html: "<p><span class=\"badge\">New</span> Riverside loop</p>",
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .badge {
      padding: 0.1rem 0.5rem;
      background-color: #fde68a;
      transform: translate(10px, 0);
      transform: scale(2);
    }
    `,
          },
          challenge: {
            title: "Make the badge slide and grow",
            description: "The badge should move ten pixels to the right and be twice as big, but it only grows. Somebody wrote the transform twice, and a second declaration replaces the first. Combine the two functions in a single `transform`, sliding first and scaling second, and make the badge an `inline-block` so it is a proper box.",
            hints: [
              "Open the explain panel and read what it says about the second `transform`.",
              "Two declarations of the same property do not combine. Put both functions in one value, separated by a space.",
              "`display: inline-block; transform: translate(10px, 0) scale(2);` and delete the second declaration.",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".badge",
                property: "transform",
                expected: ["translate(10px, 0) scale(2)", "translate(10px, 0px) scale(2)", "matrix(2, 0, 0, 2, 10, 0)"],
                message: "One `transform` that slides and then scales",
              },
              {
                type: "computedStyle",
                selector: ".badge",
                property: "display",
                expected: ["inline-block"],
                message: "...on an `inline-block` badge.",
              },
            ],
            solution: {
              html: "<p><span class=\"badge\">New</span> Riverside loop</p>",
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .badge {
      display: inline-block;
      padding: 0.1rem 0.5rem;
      background-color: #fde68a;
      transform: translate(10px, 0) scale(2);
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "three-d-transforms",
          kind: "learn",
          title: "Three dimensions: perspective and flips",
          summary: "Rotate around the X and Y axes, add depth with perspective, and build a card that flips over.",
          minutes: 9,
          concept: {
            description: "CSS can rotate things in three dimensions. `rotateX()` tips an element forwards or backwards, and `rotateY()` swings it like a revolving door. To make that look like real depth rather than a squashed rectangle, you add the `perspective` property to a parent.",
            why: "The best-known use is a card that flips to show its back, but the same idea gives you tilting panels, rotating carousels and menus that fold out. It all comes from four properties that work together, and they are easy to remember once you have flipped one card.",
            mentalModel: "Picture looking down a long corridor. The near end looks bigger than the far end. `perspective` tells the browser how far away your eye is, so a short distance gives dramatic foreshortening, and a long one gives a gentle effect.",
          },
          body: [
            {
              type: "paragraph",
              text: "Here is a full flip card. Read the HTML first, because it needs a parent for the perspective and an inner box that does the turning, with a front and a back inside:",
            },
            {
              type: "code",
              language: "html",
              code: `<div class="flip">
      <div class="flip-inner">
        <div class="front">Front</div>
        <div class="back">Back</div>
      </div>
    </div>`,
            },
            {
              type: "paragraph",
              text: "Now the CSS. The parent sets how far away you are. The inner box keeps its children in 3D space, which is what `preserve-3d` does. Each face hides its back, so you never see the reverse of the front, and the back face starts turned around so that it is facing the right way when the box flips.",
            },
            {
              type: "code",
              language: "css",
              code: `.flip { perspective: 800px; }
    .flip-inner {
      transform-style: preserve-3d;
      transition: transform 0.6s;
    }
    .front, .back {
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
    }
    .back { transform: rotateY(180deg); }
    .flip:hover .flip-inner { transform: rotateY(180deg); }`,
            },
            {
              type: "paragraph",
              text: "Hover over the card and it swings round to reveal the back. If both faces seem to show at once, you probably forgot `backface-visibility: hidden`. If the flip looks flat, like a stretching rectangle, check that `perspective` is on the parent, not on the element that is rotating, and that `transform-style: preserve-3d` is on the inner box.",
            },
            {
              type: "paragraph",
              text: "You do not always need a parent. The `perspective()` function can sit at the start of a transform and applies to that element alone, which is handy for a single tilted card that is not part of a flip.",
            },
            {
              type: "code",
              language: "css",
              code: `.tilt:hover {
      transform: perspective(600px) rotateX(8deg) rotateY(-10deg);
    }`,
            },
            {
              type: "paragraph",
              text: "A smaller `perspective` value, such as `400px`, exaggerates the effect, and a bigger one, such as `1600px`, softens it. Between 600px and 1000px usually looks natural. Try changing the number in the Playground and watch the same flip become more or less dramatic.",
            },
            {
              type: "paragraph",
              text: "While you experiment, give the card a fixed width and height, because the absolutely positioned faces do not size their container for you. Without a size, the card collapses to nothing, and you will think the flip is broken when you simply cannot see it.",
            },
            {
              type: "paragraph",
              text: "Finally, remember that people who use keyboards cannot hover. Add the same rule to `:focus-within`, or flip the card with a button, so that the back of the card is reachable by everyone. A visible focus style helps too, so people can see which card they are about to flip.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "keyframes-basics",
          kind: "learn",
          title: "Keyframes: your first animation",
          summary: "Describe the steps with @keyframes, then attach them to an element.",
          minutes: 9,
          concept: {
            description: "A CSS animation has two halves. `@keyframes` describes what should happen, as a series of snapshots, and the `animation` properties say which element should play it and for how long.",
            why: "Transitions need something to trigger them, such as a hover. Animations do not. They can start the moment the page loads, repeat forever, and move through as many steps as you like. That makes them the right tool for loaders, attention-grabbing pulses and entrance effects.",
            mentalModel: "Think of a flip book. Each page is a keyframe, and the browser draws all the pages in between so the picture moves smoothly. You only draw the important pages.",
          },
          body: [
            {
              type: "paragraph",
              text: "Let's make a dot that pulses. First we write the keyframes. We give them a name, which can be anything, and then list the snapshots. Percentages say how far through the animation each one happens, so `0%` is the start and `100%` is the end.",
            },
            {
              type: "code",
              language: "css",
              code: `@keyframes pulse {
      0%   { transform: scale(1); }
      50%  { transform: scale(1.3); }
      100% { transform: scale(1); }
    }`,
            },
            {
              type: "paragraph",
              text: "Nothing happens yet, because we have only described the animation. It is like writing a recipe without cooking. To play it, we attach it to an element with two properties: the name of the keyframes, and a duration.",
            },
            {
              type: "code",
              language: "css",
              code: `.dot {
      animation-name: pulse;
      animation-duration: 1.5s;
    }`,
            },
            {
              type: "paragraph",
              text: "Now the dot grows and shrinks once, over a second and a half. If you forget the duration, the animation does not run at all, because the default is `0s`. That is the most common reason a new animation seems dead, and the second most common is a typo in the name, which must match the `@keyframes` exactly, capital letters included.",
            },
            {
              type: "paragraph",
              text: "When an animation only has a start and an end, you can write `from` and `to` instead of the percentages. Both snapshots are optional too: if you leave out `from`, the browser uses the element's own style as the starting point, which is often just what you want.",
            },
            {
              type: "code",
              language: "css",
              code: `@keyframes fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }`,
            },
            {
              type: "paragraph",
              text: "A keyframe can change as many properties as you like, so one animation can fade, move and scale at once, and you are free to pick uneven steps such as `0%`, `30%` and `100%` when the middle moment is not halfway through. Give your keyframes names that describe what they do, like `fade-in` or `spin`, because `animation-name: anim2` tells the next person nothing.",
            },
            {
              type: "paragraph",
              text: "Put the keyframes anywhere at the top level of your stylesheet, not inside another rule, and reuse them on as many elements as you like. Try it now: add `animation-name: fade-in` and `animation-duration: 2s` to a heading in the Playground and reload the preview. Then change `fade-in` to `fadein` to see what a misspelt name does. Nothing breaks, and nothing animates either. One more thing to remember is that keyframe names are shared by the whole stylesheet, so two sets of keyframes with the same name will collide, and the later one wins. In a bigger project a descriptive name such as `card-slide-in` keeps them apart and tells you where each one is used.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "keyframes-explorer",
          kind: "visualizer",
          title: "Keyframes explorer",
          summary: "An orange ball slides along a track. Change how long it takes, how often it repeats, which way it goes and what happens at the ends.",
          minutes: 9,
          concept: {
            description: "The keyframes are already written: they slide the ball from the left end of the track to the right. Controls change the animation properties that play them, so you can see what `animation-direction`, `animation-iteration-count`, `animation-fill-mode` and the others do to the very same keyframes.",
            why: "Most animation bugs are not in the keyframes but in how they are played: an animation that jumps back at the end, never repeats, or waits too long before it starts. Seeing each property change the motion in front of you makes those bugs easy to recognise later.",
            mentalModel: "The keyframes are a video, and these properties are the player. You can set it to loop, play backwards, start after a pause, or freeze on the last frame, without ever touching the video.",
          },
          stage: {
            html: `<div class="track">
      <div class="ball"></div>
    </div>`,
            baseCss: `html, body { margin: 0; }
    body { background: #0f172a; color: #ffffff; font-family: system-ui, sans-serif; font-size: 14px; font-weight: 700; }
    .track { position: relative; height: 90px; margin: 28px 16px; overflow: hidden; border-radius: 12px; background: #1e293b; }
    .ball { position: absolute; left: 12px; top: 25px; width: 40px; height: 40px; border-radius: 50%; background: #f59e0b; }
    @keyframes slide { from { transform: translateX(0); } to { transform: translateX(min(280px, calc(100vw - 110px))); } }`,
            annotate: "none",
            target: ".track",
            items: ".ball",
            itemCount: 1,
          },
          starter: `.ball {
      animation-name: slide;
      animation-duration: 2s;
      animation-timing-function: ease-in-out;
      animation-delay: 0s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-fill-mode: none;
      animation-play-state: running;
    }
    `,
          controls: [
            {
              id: "duration",
              label: "animation-duration",
              selector: ".ball",
              property: "animation-duration",
              fallback: "2s",
              type: "range",
              min: 0.5,
              max: 4,
              step: 0.5,
              unit: "s",
              help: "How long one run takes.",
            },
            {
              id: "timing",
              label: "animation-timing-function",
              selector: ".ball",
              property: "animation-timing-function",
              fallback: "ease-in-out",
              type: "options",
              options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "steps(6, end)"],
              help: "`steps(6, end)` jumps in six stages instead of gliding.",
            },
            {
              id: "delay",
              label: "animation-delay",
              selector: ".ball",
              property: "animation-delay",
              fallback: "0s",
              type: "range",
              min: 0,
              max: 2,
              step: 0.5,
              unit: "s",
              help: "How long to wait before the first run. With fill-mode `none`, the ball sits at its normal place while it waits.",
            },
            {
              id: "count",
              label: "animation-iteration-count",
              selector: ".ball",
              property: "animation-iteration-count",
              fallback: "infinite",
              type: "options",
              options: ["infinite", "1", "2", "3"],
              help: "How many times to play.",
            },
            {
              id: "direction",
              label: "animation-direction",
              selector: ".ball",
              property: "animation-direction",
              fallback: "alternate",
              type: "options",
              options: ["normal", "reverse", "alternate", "alternate-reverse"],
              help: "`alternate` plays forwards, then backwards, so the ball never jumps back.",
            },
            {
              id: "fill",
              label: "animation-fill-mode",
              selector: ".ball",
              property: "animation-fill-mode",
              fallback: "none",
              type: "options",
              options: ["none", "forwards", "backwards", "both"],
              help: "What the ball looks like before and after the animation. Try `1` run and `forwards`.",
            },
            {
              id: "state",
              label: "animation-play-state",
              selector: ".ball",
              property: "animation-play-state",
              fallback: "running",
              type: "options",
              options: ["running", "paused"],
              help: "Freeze the ball where it is.",
            },
          ],
          presets: [
            {
              id: "once",
              label: "Once, and stay",
              description: "1 run, forwards",
              css: ".ball { animation-iteration-count: 1; animation-direction: normal; animation-fill-mode: forwards; }",
            },
            {
              id: "loop",
              label: "Loop with a jump",
              description: "normal, infinite",
              css: ".ball { animation-iteration-count: infinite; animation-direction: normal; }",
            },
            {
              id: "wait",
              label: "Wait, then go",
              description: "1s delay, backwards fill",
              css: ".ball { animation-delay: 1s; animation-iteration-count: 1; animation-direction: normal; animation-fill-mode: backwards; }",
            },
          ],
          challenge: {
            title: "Three runs, and stay at the end",
            description: "Make the ball slide **three times**, alternating direction each time, and then **stay where the last run ended**. Set `animation-iteration-count` to `3`, `animation-direction` to `alternate`, and `animation-fill-mode` to `forwards`.",
            hints: [
              "Three declarations in the `.ball` rule need to change.",
              "Three runs with `alternate` go right, left, right, so the ball ends at the far end. `forwards` holds it there.",
              "`animation-iteration-count: 3; animation-direction: alternate; animation-fill-mode: forwards;`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".ball",
                property: "animation-iteration-count",
                expected: ["3"],
                message: "The ball runs `3` times",
              },
              {
                type: "computedStyle",
                selector: ".ball",
                property: "animation-direction",
                expected: ["alternate"],
                message: "...alternating direction",
              },
              {
                type: "computedStyle",
                selector: ".ball",
                property: "animation-fill-mode",
                expected: ["forwards"],
                message: "...and stays at the end with `forwards`.",
              },
            ],
            solution: `.ball {
      animation-name: slide;
      animation-duration: 2s;
      animation-timing-function: ease-in-out;
      animation-delay: 0s;
      animation-iteration-count: 3;
      animation-direction: alternate;
      animation-fill-mode: forwards;
      animation-play-state: running;
    }
    `,
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "animation-properties",
          kind: "learn",
          title: "Controlling an animation",
          summary: "Repeat, reverse, delay and hold the last frame, with the animation properties.",
          minutes: 9,
          concept: {
            description: "Once you have keyframes, a handful of properties decide how they are played. You can repeat them, run them backwards, delay them, change the speed curve, and choose what the element looks like before and after.",
            why: "Without these, every animation would run once and then jump back to where it started, which is rarely what you want. A few lines turn a basic pulse into a smooth loop, or into an entrance that lands exactly where it should and stays there.",
            mentalModel: "Imagine a remote control for a video. The keyframes are the video itself, and these properties are the buttons: loop, reverse, wait, and hold the last frame.",
          },
          body: [
            {
              type: "paragraph",
              text: "Start with repeating. `animation-iteration-count` takes a number, or `infinite` to go on forever. Next to it, `animation-direction` can play the animation backwards, or alternate forwards and backwards on each repeat. Together they make a smooth to-and-fro, without any extra keyframes.",
            },
            {
              type: "code",
              language: "css",
              code: `.ball {
      animation-name: slide;
      animation-duration: 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }`,
            },
            {
              type: "paragraph",
              text: "Without `alternate`, the ball would slide to the end and then jump straight back to the start. With it, every second run goes in reverse, so the motion looks natural. The timing function works just as it does in transitions, and it applies between each pair of keyframes, not to the whole animation.",
            },
            {
              type: "paragraph",
              text: "The property that confuses people most is `animation-fill-mode`. It says what the element looks like when the animation is not running. By default, the element ignores the animation before it begins and after it ends, so it snaps back to its normal style. `forwards` keeps the last keyframe's values after the end. `backwards` applies the first keyframe during a delay. `both` does both.",
            },
            {
              type: "code",
              language: "css",
              code: `.message {
      opacity: 0;                      /* the final look */
      animation-name: fade-in;
      animation-duration: 0.6s;
      animation-delay: 0.3s;
      animation-fill-mode: both;
    }`,
            },
            {
              type: "paragraph",
              text: "Use `both` for entrance effects that have a delay, so the element waits, invisible, and then stays put. A delay can be negative, too, which starts the animation part of the way through, and `animation-play-state: paused` freezes it, which is useful for a hover or a pause button.",
            },
            {
              type: "paragraph",
              text: "The iteration count does not have to be a whole number. A value of `1.5` plays the animation once and then half of it again, which is a quick way to stop a spin partway round. One is the default, so you only write a count when you want more than one run.",
            },
            {
              type: "paragraph",
              text: "Two more properties are worth knowing. `animation-play-state` can be `running` or `paused`, which is how you build a pause on hover: set `paused` in a `:hover` rule and the animation freezes exactly where it is, then carries on when the pointer leaves. And `animation-timing-function` accepts `steps(8)`, which jumps in eight equal stages instead of gliding. That is how a sprite sheet or a typewriter effect is made.",
            },
            {
              type: "paragraph",
              text: "You will see all of these squeezed into the shorthand `animation`. The order is name, duration, timing function, delay, iteration count, direction, fill mode, and play state, though the browser works out most of them by their shape. Two times are read as duration then delay, just like `transition`. The longhands are easier to read, so use them until the pattern is in your fingers.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "predict-the-fill-mode",
          kind: "predict",
          title: "Predict the fill mode",
          summary: "Three dots run the same animation with three different fill modes. Work out how each one looks during the delay and after the end.",
          minutes: 8,
          mode: "css",
          intro: "Three dots play the same `grow` animation, which goes from half size to one and a half times the size. The only differences are `animation-fill-mode` and a delay. Before you run the code, predict how each dot looks once the animation is over.",
          code: {
            html: `<div class="row">
      <div class="dot d1"></div>
      <div class="dot d2"></div>
      <div class="dot d3"></div>
    </div>`,
            css: `body {
      margin: 0;
      padding: 2rem;
      font-family: system-ui, sans-serif;
    }
    
    .row {
      display: flex;
      gap: 2rem;
    }
    
    .dot {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: #4f46e5;
      animation-name: grow;
      animation-duration: 1s;
    }
    
    .d1 {
      animation-fill-mode: none;
    }
    
    .d2 {
      animation-fill-mode: forwards;
    }
    
    .d3 {
      animation-delay: 1s;
      animation-fill-mode: backwards;
    }
    
    @keyframes grow {
      from { transform: scale(0.5); }
      to   { transform: scale(1.5); }
    }`,
          },
          questions: [
            {
              prompt: "When the animation ends, what size is dot 1, which has `animation-fill-mode: none`?",
              options: ["One and a half times its size", "Its normal size, so it snaps back", "Half its size", "It disappears"],
              answerIndex: 1,
              hint: "`none` means the animation has no say before it starts or after it ends.",
              explanation: "With `none`, the element ignores the animation when it is not running. As soon as the last frame is over, the dot goes back to its normal style, which looks like a jump.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".d1",
                  property: "animation-fill-mode",
                  expected: ["none"],
                  message: "Dot 1 uses `animation-fill-mode: none`.",
                },
              ],
            },
            {
              prompt: "What size is dot 2, with `animation-fill-mode: forwards`, once the animation has finished?",
              options: [
                "Its normal size",
                "Half its size",
                "One and a half times its size, because it keeps the last keyframe",
                "It keeps growing",
              ],
              answerIndex: 2,
              hint: "`forwards` holds on to the last keyframe.",
              explanation: "`forwards` makes the element keep the values of the final keyframe when the animation is over, so it stays at one and a half times its size.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".d2",
                  property: "animation-fill-mode",
                  expected: ["forwards"],
                  message: "Dot 2 uses `animation-fill-mode: forwards`.",
                },
              ],
            },
            {
              prompt: "Dot 3 waits for a second before it starts. How does it look during that second?",
              options: [
                "Its normal size",
                "Half its size, because `backwards` applies the first keyframe during the delay",
                "Invisible",
                "One and a half times its size",
              ],
              answerIndex: 1,
              hint: "`backwards` is about the delay.",
              explanation: "`backwards` applies the first keyframe while the animation waits for its delay, so dot 3 sits at half size until the animation starts.",
              proves: [
                {
                  type: "computedStyle",
                  selector: ".d3",
                  property: "animation-delay",
                  expected: ["1s"],
                  message: "Dot 3 waits `1s`",
                },
                {
                  type: "computedStyle",
                  selector: ".d3",
                  property: "animation-fill-mode",
                  expected: ["backwards"],
                  message: "...with `backwards` fill.",
                },
              ],
            },
            {
              prompt: "Which property would you use so a dot holds its first keyframe during a delay *and* its last keyframe after the end?",
              options: ["`animation-fill-mode: both`", "`animation-direction: alternate`", "`animation-play-state: paused`", "`animation-delay: -1s`"],
              answerIndex: 0,
              hint: "One value combines two others.",
              explanation: "`both` is `backwards` and `forwards` together. It is the usual choice for entrance effects that have a delay, so the element waits in its first state and stays in its last.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "lab-keyframe-spinner",
          kind: "lab",
          title: "Lab: build a loading spinner",
          mode: "css",
          summary: "Write your first @keyframes rule and play it forever at a constant speed.",
          minutes: 8,
          starter: {
            html: "<div class=\"spinner\" role=\"status\" aria-label=\"Loading\"></div>",
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .spinner {
      width: 3rem;
      height: 3rem;
      border: 5px solid #c7d2fe;
      border-top-color: #4f46e5;
      border-radius: 50%;
    }
    `,
          },
          challenge: {
            title: "Make the ring spin",
            description: "The ring is just a circle with one coloured edge. Make it spin. First write a `@keyframes` rule called `spin` that turns the element to `rotate(360deg)`, with only a `to` step. Then play it on `.spinner` with the longhand properties: the name `spin`, a duration of `1s`, the timing function `linear` so it never speeds up or slows down, and an iteration count of `infinite`. When it works you will see the ring turning in the preview.",
            hints: [
              "The keyframes go at the top level of the CSS, outside the `.spinner` rule. The four animation properties go inside it.",
              "A `to` step on its own is enough: the starting point is filled in from the element's own style.",
              "`@keyframes spin { to { transform: rotate(360deg); } }` and then `animation-name: spin; animation-duration: 1s; animation-timing-function: linear; animation-iteration-count: infinite;`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".spinner",
                property: "animation-name",
                expected: ["spin"],
                message: "The spinner plays the `spin` keyframes",
              },
              {
                type: "computedStyle",
                selector: ".spinner",
                property: "animation-duration",
                expected: ["1s"],
                message: "...for `1s` a turn",
              },
              {
                type: "computedStyle",
                selector: ".spinner",
                property: "animation-timing-function",
                expected: ["linear"],
                message: "...at a constant `linear` speed",
              },
              {
                type: "computedStyle",
                selector: ".spinner",
                property: "animation-iteration-count",
                expected: ["infinite"],
                message: "...forever.",
              },
            ],
            solution: {
              html: "<div class=\"spinner\" role=\"status\" aria-label=\"Loading\"></div>",
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .spinner {
      width: 3rem;
      height: 3rem;
      border: 5px solid #c7d2fe;
      border-top-color: #4f46e5;
      border-radius: 50%;
      animation-name: spin;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "animation-vs-transition",
          kind: "learn",
          title: "Animation or transition?",
          summary: "How to choose between the two, and what happens when both are present.",
          minutes: 8,
          concept: {
            description: "Both transitions and animations move things over time, and for simple effects either would work. The difference is in who starts them and how many steps they have. A transition reacts to a change. An animation follows a script of its own.",
            why: "Picking the right one keeps your CSS short and your motion predictable. A hover effect written as an animation is clumsy, and a spinner written as a transition is impossible. Learning to tell them apart takes a minute and saves a lot of fiddling.",
            mentalModel: "A transition is a door closer: it only does something when you push or pull the door, and then it eases it shut. An animation is a clock. It runs by itself, as long as it has power, and it can do many things in sequence.",
          },
          body: [
            {
              type: "paragraph",
              text: "Use a **transition** when the element moves between two states because something changed: a hover, a focus, a class being added. You write the end state as ordinary CSS and let the browser fill in the journey.",
            },
            {
              type: "code",
              language: "css",
              code: `.btn {
      transition-property: background-color;
      transition-duration: 0.2s;
    }
    .btn:hover {
      background-color: #3730a3;
    }`,
            },
            {
              type: "paragraph",
              text: "Use an **animation** when the motion should start on its own, repeat, or pass through several steps. Loaders, pulses, attention shakes and entrance effects all fit. The keyframes hold the whole script, so no trigger is needed.",
            },
            {
              type: "code",
              language: "css",
              code: `.spinner {
      animation-name: spin;
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }`,
            },
            {
              type: "paragraph",
              text: "There is one rule to remember when they meet. While an animation is running, its values override the element's normal declarations, even one with a more specific selector. So if a card has a `transform` animation and also `transform: scale(1.05)` on hover, the hover does nothing until the animation has finished and is no longer holding the value. If you ever find an effect that seems to be ignored, look for an animation on the same property.",
            },
            {
              type: "paragraph",
              text: "Animations also give you control in the middle of the journey. A transition can only travel from A to B, so it cannot overshoot B and settle back. An animation can, by passing through an extra keyframe at seventy percent that goes a little too far. That small overshoot is what makes a button feel springy rather than mechanical.",
            },
            {
              type: "paragraph",
              text: "Newer browsers blur the line a little. With `@starting-style`, a transition can now run when an element first appears, which used to need an animation, and you met it in the Transitions topic. Animations are still the better choice for anything that loops or has several steps, but for a simple entrance you now have two good options, so choose the one that reads best in your stylesheet. If you cannot decide, start with a transition. It is shorter to write, and you can always turn it into an animation later if the design grows.",
            },
            {
              type: "paragraph",
              text: "A good rule of thumb: ask whether something changed. If yes, reach for a transition. If the motion should happen with no change at all, or needs more than two steps, use an animation. You can use both on the same element, as long as they work on different properties, such as an entrance animation on `opacity` and a hover transition on `transform`.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "animation-patterns",
          kind: "learn",
          title: "Four patterns you will use again and again",
          summary: "A fade-in with a stagger, a spinner, a pulse and a shake, built from the same few properties.",
          minutes: 9,
          concept: {
            description: "Most animations on real sites are variations on a small set of patterns. Learn four of them, and you will be able to build nearly everything you see: a fade-in that rises into place, a spinner, a pulse and a shake.",
            why: "These patterns appear in almost every project, and they are made from the same pieces you already know. Having them ready means that when a design asks for a loading state or an error shake, you do not start from a blank page.",
            mentalModel: "Think of these four as the basic dance steps. Once your feet know them, you can put them together in any order.",
          },
          body: [
            {
              type: "paragraph",
              text: "First, the entrance. A heading or a card fades in while rising a little, which feels gentler than appearing from nowhere. Write the keyframes once, and then reuse them with different delays so a group of items arrives one after another.",
            },
            {
              type: "code",
              language: "css",
              code: `@keyframes rise {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .item {
      animation: rise 0.5s ease-out both;
    }
    .item:nth-child(2) { animation-delay: 0.1s; }
    .item:nth-child(3) { animation-delay: 0.2s; }`,
            },
            {
              type: "paragraph",
              text: "Here the shorthand does most of the work, and the `both` keeps each item hidden until its own delay is over. Stagger the delays by around a tenth of a second, because longer gaps make people wait.",
            },
            {
              type: "paragraph",
              text: "Second, a spinner, which is just a ring that rotates forever with a constant speed. The only unusual choice is `linear`, since easing would make the ring speed up and slow down on every lap.",
            },
            {
              type: "code",
              language: "css",
              code: `.spinner {
      width: 2rem;
      height: 2rem;
      border: 3px solid #cbd5e1;
      border-top-color: #4f46e5;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }`,
            },
            {
              type: "paragraph",
              text: "Third, a pulse, which draws the eye to a button or a notification. Keep it subtle, around five percent, and let it run only a few times. Fourth, a shake, which says \"that was wrong\" faster than a message can. It moves left and right in quick steps and then settles.",
            },
            {
              type: "code",
              language: "css",
              code: `@keyframes shake {
      20%, 60% { transform: translateX(-6px); }
      40%, 80% { transform: translateX(6px); }
    }
    .field.error { animation: shake 0.4s; }`,
            },
            {
              type: "code",
              language: "css",
              code: `.alert {
      animation: pulse 1.6s ease-in-out 3;
    }
    @keyframes pulse {
      50% { transform: scale(1.05); }
    }`,
            },
            {
              type: "paragraph",
              text: "Here the pulse runs three times and then stops, which is the polite way to get attention. As a rough guide, entrances feel right between 300 and 600 milliseconds, a spinner between 0.8 and 1.2 seconds per turn, a pulse around a second and a half, and a shake under half a second. These are starting points rather than rules, so adjust them until they feel right for your page.",
            },
            {
              type: "paragraph",
              text: "You can run two animations on one element by separating them with a comma, as in `animation: rise 0.5s both, pulse 2s 0.5s infinite`. The second waits half a second, so the entrance finishes before the pulse starts. Keep the number small, though, because each extra animation makes the result harder to follow and harder to debug.",
            },
            {
              type: "paragraph",
              text: "Notice that the shake has no `from` or `to`. The element starts and ends at its normal position, since those keyframes are filled in from its own style. Put each pattern into the Playground, one at a time, and change a number to see what it controls. That is the quickest way to make them your own.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "debug-the-silent-animation",
          kind: "debug",
          title: "Debug: the animation that never plays",
          mode: "css",
          summary: "The keyframes are fine and the dot still sits there. Three small slips stop the animation, and the browser reports none of them.",
          minutes: 8,
          broken: {
            html: "<div class=\"dot\" role=\"img\" aria-label=\"Pulsing dot\"></div>",
            css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .dot {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: #4f46e5;
      animation-name: pulsee;
      animation-duration: 2;
      animation-iteration-count: infinte;
    }
    
    @keyframes pulse {
      50% {
        transform: scale(1.3);
      }
    }
    `,
          },
          challenge: {
            title: "Get the dot pulsing",
            description: "The `pulse` keyframes are correct, but the dot stays still. There are three slips, all in the `.dot` rule. The browser does not complain about any of them, which is what makes this kind of bug annoying. Fix them so the dot plays the `pulse` keyframes for `2s` per pulse, forever.",
            hints: [
              "Read each `animation-` declaration out loud and compare it with the name of the keyframes and with what the properties accept.",
              "One name has an extra letter, one time has no unit, and one keyword is missing an `i`.",
              "`animation-name: pulse; animation-duration: 2s; animation-iteration-count: infinite;`",
            ],
            checks: [
              {
                type: "computedStyle",
                selector: ".dot",
                property: "animation-name",
                expected: ["pulse"],
                message: "The dot plays the keyframes named `pulse`",
              },
              {
                type: "computedStyle",
                selector: ".dot",
                property: "animation-duration",
                expected: ["2s"],
                message: "...taking `2s`",
              },
              {
                type: "computedStyle",
                selector: ".dot",
                property: "animation-iteration-count",
                expected: ["infinite"],
                message: "...forever.",
              },
            ],
            solution: {
              html: "<div class=\"dot\" role=\"img\" aria-label=\"Pulsing dot\"></div>",
              css: `body {
      margin: 0;
      padding: 1.5rem;
      font-family: system-ui, sans-serif;
    }
    
    .dot {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: #4f46e5;
      animation-name: pulse;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }
    
    @keyframes pulse {
      50% {
        transform: scale(1.3);
      }
    }
    `,
            },
          },
        },

    /* ------------------------------------------------------------------ */
    {
          id: "motion-and-accessibility",
          kind: "learn",
          title: "Animation that respects people",
          summary: "Reduced motion, pausing, flashing and the questions to ask before an animation loops forever.",
          minutes: 8,
          concept: {
            description: "Movement that delights one person can make another feel sick. Large or constant motion can trigger dizziness, nausea and headaches for people with vestibular conditions, and flashing content can be dangerous. A well-built page lets people ask for less.",
            why: "Animation is the area where accessibility mistakes are most common, because infinite loops and big movements are so easy to write. The good news is that fixing them takes a handful of lines, and it makes the page calmer for everybody.",
            mentalModel: "Think of it as a volume knob for movement. Some people like the music loud, and some need it quiet, and your job is to listen when they turn it down.",
          },
          body: [
            {
              type: "paragraph",
              text: "Browsers pass on the person's system setting through the `prefers-reduced-motion` media feature. When it says `reduce`, replace large movement with something gentler, or remove it. You do not have to take away every effect, because a quick fade is not what causes the problem. Take away sliding, zooming, spinning and anything that fills the screen.",
            },
            {
              type: "code",
              language: "css",
              code: `.hero-title {
      animation: rise 0.6s ease-out both;
    }
    
    @media (prefers-reduced-motion: reduce) {
      .hero-title {
        animation: fade-in 0.3s both;   /* a fade, with no movement */
      }
      .spinner {
        animation-duration: 3s;         /* slower and calmer */
      }
    }`,
            },
            {
              type: "paragraph",
              text: "A blunt but effective safety net is to switch animations off for everyone who asks. It is better than nothing, though a targeted rule makes a nicer page, so treat it as a floor and build up from there.",
            },
            {
              type: "code",
              language: "css",
              code: `@media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }`,
            },
            {
              type: "paragraph",
              text: "Beyond that setting, ask three questions of every animation you write. Does it loop forever? If so, either limit the count or give people a way to pause it, because moving content that never stops is hard to ignore. Does it flash more than three times in a second? Never do that. And does it carry meaning? If a shaking field is the only sign of an error, add a message too, because not everyone will see, or want to see, the shake.",
            },
            {
              type: "paragraph",
              text: "The same care applies to anything that moves while the person scrolls, such as parallax backgrounds and sections that zoom or slide as they come into view. These are the effects most often reported as making people feel unwell, so they deserve a reduced-motion rule even more than a hover effect does.",
            },
            {
              type: "paragraph",
              text: "Some motion is genuinely useful, such as a progress bar that fills or a spinner that tells people the page is working. You can keep that kind of motion in a gentler form. Anything that moves by itself for more than five seconds and sits beside other content should come with a way to pause it, because it is hard to read while something else keeps moving next to the text.",
            },
            {
              type: "code",
              language: "css",
              code: `.carousel.paused {
      animation-play-state: paused;
    }`,
            },
            {
              type: "paragraph",
              text: "Toggle that class from a pause button, and give the button a clear label. It takes minutes to add, and for some visitors it is what makes the page usable at all.",
            },
            {
              type: "paragraph",
              text: "You can test the setting without touching your computer. In Chrome DevTools, open the Rendering panel and set \"Emulate CSS media feature prefers-reduced-motion\" to reduce. Then reload the page and check that nothing is left spinning or swooping.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "animation-gotchas",
          kind: "learn",
          title: "Animation gotchas",
          summary: "Why an element snaps back, why hover stops working, and the other surprises that catch everybody.",
          minutes: 9,
          concept: {
            description: "A few behaviours of CSS animations seem strange until you have been caught by each one once. They are all consistent, and each has a simple fix, so it is worth meeting them before they cost you an afternoon.",
            why: "If you know the usual suspects, a stubborn animation takes five minutes to fix. If you do not, it can feel as if the browser is ignoring you. This list is the one we wish we had been handed earlier.",
            mentalModel: "Think of an animation as an actor who only exists while the scene is playing. When the scene ends, the actor goes back to the dressing room, and the element goes back to its normal style, unless you say otherwise.",
          },
          body: [
            {
              type: "paragraph",
              text: "The first surprise is the snap back. When an animation ends, the element returns to its normal style, which looks like a sudden jump. If it should stay where the animation left it, use `animation-fill-mode: forwards`, or even better, make the normal style match the final keyframe so no jump is possible.",
            },
            {
              type: "code",
              language: "css",
              code: `.panel {
      opacity: 1;                       /* matches the last keyframe */
      animation: fade-in 0.5s ease-out; /* from { opacity: 0 } to { opacity: 1 } */
    }`,
            },
            {
              type: "paragraph",
              text: "The second is a hover that does nothing. A running animation has priority over normal declarations, so a hover rule on the same property is ignored while the animation holds it. If a card needs an entrance animation and a hover lift, put them on different properties, or wrap the card so each element has its own job.",
            },
            {
              type: "paragraph",
              text: "The third is an animation that does not restart. An animation plays when the name is applied, and it will not run again just because you added a class that has the same animation. To replay it, the name has to change, or the element has to be removed and added again. People use a short script for that, or give each state a different keyframes name.",
            },
            {
              type: "paragraph",
              text: "The fourth is `display: none`. Setting it removes the element from rendering, which cancels any animation on it, and when the element comes back, the animation starts from the beginning. This is handy when you want a fresh entrance every time a panel opens.",
            },
            {
              type: "paragraph",
              text: "Keep an eye on the percentages as well. Keyframe selectors must be between `0%` and `100%`, and an invalid one such as `120%` is thrown away, along with its declarations. Two keyframes with the same percentage are merged, with the later one winning, which can hide a typo for a surprisingly long time.",
            },
            {
              type: "paragraph",
              text: "Finally, remember that an element with an animation on `opacity` or `transform` is treated as a stacking context while it runs. A card that slides in can briefly appear in front of or behind things it should not, and then jump into place when the animation ends. Give it an explicit `z-index` if that happens.",
            },
            {
              type: "code",
              language: "css",
              code: `.toast {
      position: relative;
      z-index: 10;
      animation: rise 0.4s ease-out both;
    }`,
            },
            {
              type: "paragraph",
              text: "When all else fails, open the Animations panel in your browser's developer tools. It lists every animation that runs on the page, lets you slow it down, and shows the duration and the curve that the browser really used, which usually points straight at the mistake.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    bringAPageToLife,

    /* ------------------------------------------------------------------ */
    {
          id: "transforms-quiz",
          kind: "quiz",
          title: "Quiz: transforms and animations",
          summary: "Seventeen questions on transforms, 3D, keyframes, animation properties and respecting reduced motion.",
          minutes: 12,
          passPercent: 70,
          questions: [
            {
              prompt: "What does a transform do to the layout of the page?",
              options: [
                "It pushes neighbouring elements out of the way",
                "Nothing: the layout is worked out first, and the element is then drawn in its new place",
                "It recalculates every box on the page",
                "It removes the element from the flow",
              ],
              answerIndex: 1,
              explanation: "The browser lays the page out as if there were no transform, and then draws the transformed element. That is why neighbours do not move.",
            },
            {
              prompt: "Why might `transform: rotate(10deg)` seem to do nothing on a `<span>` inside a paragraph?",
              options: [
                "Spans cannot be rotated by more than 5 degrees",
                "Spans need a `position`",
                "Rotation needs a duration",
                "Plain inline elements are not transformable, so it needs `display: inline-block` or similar",
              ],
              answerIndex: 3,
              explanation: "Transforms do not apply to plain inline boxes. Make the span an inline-block, a flex item or a grid item first.",
            },
            {
              prompt: "A positive angle in `rotate()` turns the element…",
              options: ["Clockwise", "Counter-clockwise", "Upwards", "Around the Y axis"],
              answerIndex: 0,
              explanation: "Positive angles are clockwise, and negative angles are counter-clockwise.",
            },
            {
              prompt: "In `translate(-50%, -50%)`, what are the percentages relative to?",
              options: ["The parent's width and height", "The viewport", "The element's own width and height", "The font size"],
              answerIndex: 2,
              explanation: "Percentages in `translate()` refer to the element's own size, which is what makes the centring trick work.",
            },
            {
              prompt: "`.box { transform: rotate(-6deg); transform: scale(1.1); }` leaves the box…",
              options: ["Rotated and scaled", "Unchanged", "Only rotated", "Only scaled"],
              answerIndex: 3,
              explanation: "A later declaration replaces an earlier one. To use both functions, put them in one value.",
            },
            {
              prompt: "Which is the better way to make a card grow by five percent on hover?",
              options: ["`width: 105%`", "`transform: scale(1.05)`", "`margin: -2%`", "`padding: 5%`"],
              answerIndex: 1,
              explanation: "A transform does not disturb the layout, so nothing around the card moves, and it animates smoothly.",
            },
            {
              prompt: "What is the default `transform-origin`?",
              options: ["`50% 50%`, the centre", "`0 0`", "`top left`", "`bottom center`"],
              answerIndex: 0,
              explanation: "Transforms work from the centre of the element unless you change the origin.",
            },
            {
              prompt: "Which origin makes a door look as if it is hinged on its left edge?",
              options: ["`transform-origin: right center`", "`transform-origin: center`", "`transform-origin: left center`", "`transform-origin: top center`"],
              answerIndex: 2,
              explanation: "The origin is the point that stays still, so the left edge acts as a hinge.",
            },
            {
              prompt: "`translate(100px, 0) rotate(90deg)` and `rotate(90deg) translate(100px, 0)` end up…",
              options: [
                "In exactly the same place",
                "In different places, because the order matters",
                "Only one is valid",
                "In the same place, but turned differently",
              ],
              answerIndex: 1,
              explanation: "After a rotation, a translate follows the turned direction. The first moves right, and the second moves down.",
            },
            {
              prompt: "Which property must be on the parent so that a 3D rotation looks like it has depth?",
              options: ["`backface-visibility`", "`overflow`", "`transform-style`", "`perspective`"],
              answerIndex: 3,
              explanation: "`perspective` on a parent sets how far away the viewer is, and gives the children depth.",
            },
            {
              prompt: "What does `transform-style: preserve-3d` do?",
              options: [
                "Keeps the element's children in the same 3D space",
                "Makes the element flat",
                "Disables perspective",
                "Hides the back face",
              ],
              answerIndex: 0,
              explanation: "Without it, the children are flattened onto the element's plane, and a flip card looks like it squashes.",
            },
            {
              prompt: "What are `@keyframes` for?",
              options: [
                "They play an animation on an element",
                "They list the colours in a gradient",
                "They describe the steps of an animation, which are played by the `animation` properties",
                "They trigger a transition",
              ],
              answerIndex: 2,
              explanation: "The keyframes only describe the animation. To play it you need `animation-name` and a duration on an element.",
            },
            {
              prompt: "An animation is attached, and nothing moves. Which is the most common cause?",
              options: [
                "The name is capitalised",
                "Keyframes cannot use percentages",
                "The element is block level",
                "No duration, because it defaults to `0s`",
              ],
              answerIndex: 3,
              explanation: "The default duration is `0s`, so the animation has no time to run. A misspelt name is another common cause.",
            },
            {
              prompt: "What does `animation-direction: alternate` do?",
              options: [
                "Plays it once, then stops",
                "Plays forwards, then backwards, on every other run",
                "Plays it twice as fast",
                "Doubles the delay",
              ],
              answerIndex: 1,
              explanation: "`alternate` reverses every second run, so a loop does not jump back to the start.",
            },
            {
              prompt: "A dot grows during an animation and then jumps back to its normal size. What keeps it grown?",
              options: ["`animation-fill-mode: forwards`", "`animation-iteration-count: 2`", "`animation-play-state: paused`", "`animation-delay: 1s`"],
              answerIndex: 0,
              explanation: "`forwards` keeps the last keyframe's values after the animation ends.",
            },
            {
              prompt: "While an animation holds a property, what happens to a `:hover` rule on the same property?",
              options: [
                "It wins, because it is more specific",
                "It runs first, then the animation",
                "It is overridden by the running animation",
                "It cancels the animation",
              ],
              answerIndex: 2,
              explanation: "Animations take priority over normal declarations while they run, so the hover rule does nothing for that property.",
            },
            {
              prompt: "Which media feature lets you reduce or remove animation for people who ask for it?",
              options: ["`prefers-color-scheme`", "`prefers-reduced-motion`", "`hover: none`", "`orientation`"],
              answerIndex: 1,
              explanation: "`prefers-reduced-motion: reduce` matches when a person has asked their system to minimise movement.",
            },
          ],
        },

    /* ------------------------------------------------------------------ */
    {
          id: "transforms-review",
          kind: "review",
          title: "Review: transforms and animations",
          summary: "The functions, the origin, the order rule, 3D, keyframes and the animation properties, all in one place.",
          minutes: 4,
          body: [
            {
              type: "paragraph",
              text: "Transforms change how an element is drawn without changing the layout around it. The functions you will use every day are `translate()` to slide, `scale()` to resize, `rotate()` to turn and `skew()` to slant. They need a box to work on, so a plain inline element needs `display: inline-block` first.",
            },
            {
              type: "code",
              language: "css",
              code: `transform: translate(20px, -6px);   /* x, then y. Percentages are of the element's own size */
    transform: scale(1.05);            /* one number scales both ways */
    transform: rotate(-6deg);          /* positive is clockwise, 1turn is a full circle */
    transform: skewX(-12deg);
    transform-origin: top left;        /* the point that stays still. Default: center */`,
            },
            {
              type: "paragraph",
              text: "Several functions go in one declaration, and the order matters, because every function after a rotation, scale or skew works in the changed direction. Write them in the order you would describe the journey. A second `transform` replaces the first, so never write two.",
            },
            {
              type: "code",
              language: "css",
              code: `transform: translate(100px, 0) rotate(90deg);   /* ends up to the right */
    transform: rotate(90deg) translate(100px, 0);   /* ends up below */`,
            },
            {
              type: "paragraph",
              text: "For depth, put `perspective` on the parent, `transform-style: preserve-3d` on the element that turns, and `backface-visibility: hidden` on each face. A flip card is those three properties plus a `rotateY(180deg)` on the back.",
            },
            {
              type: "paragraph",
              text: "An animation has two parts. `@keyframes` describes the steps, and the `animation` properties play them. Without a duration, and a name that matches exactly, nothing runs.",
            },
            {
              type: "code",
              language: "css",
              code: `@keyframes pulse { 50% { transform: scale(1.05); } }
    
    .btn {
      animation-name: pulse;
      animation-duration: 1.5s;
      animation-timing-function: ease-in-out;
      animation-delay: 0s;
      animation-iteration-count: infinite;   /* or a number */
      animation-direction: alternate;        /* normal | reverse | alternate */
      animation-fill-mode: both;             /* none | forwards | backwards | both */
      animation-play-state: running;         /* or paused */
    }`,
            },
            {
              type: "paragraph",
              text: "Reach for a transition when something changes, and for an animation when the motion should start by itself, repeat or pass through several steps. While an animation is running, its values beat ordinary declarations. Respect `prefers-reduced-motion`, avoid loops that never stop, never flash more than three times a second, and when an animation will not play, check the name, the duration and the spelling of every keyword.",
            },
          ],
        },
  ],
};

export default content;
