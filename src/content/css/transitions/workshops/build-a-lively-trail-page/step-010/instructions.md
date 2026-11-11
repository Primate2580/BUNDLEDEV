Zoom the picture inside each card. The picture is a child of `.media`, so scaling it would spill over the rounded top corners. `overflow: hidden` on the **parent** clips it, which is the standard recipe for an image zoom.

The hover rule is on the **card**, and it targets the picture inside it with `.card:hover .thumb`. A slow `0.5s` zoom feels calmer than the quick lift. Hover, pressed and checked states cannot be read by the automatic checks, so they look at the base styles. Try the state in the preview to see the rule work.

## Task

Add `overflow: hidden;` to the `.media` rule. Add `transition-property: transform;` and `transition-duration: 0.5s;` to the `.thumb` rule. Then add a new rule `.card:hover .thumb` with `transform: scale(1.06);`.

## Hints

- One declaration in `.media`, two in `.thumb`, and a new rule.
- `.card:hover .thumb { transform: scale(1.06); }`
