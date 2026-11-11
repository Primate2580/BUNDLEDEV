Start with the navigation links. The goal is a colour that fades on hover. A transition needs two things in the **base** rule: the property that animates, and (in the next step) a duration. Without a duration, the default is `0s`, and nothing visible happens.

The hover rule only supplies the end colour, because the base rule is where the transition lives. Hover, pressed and checked states cannot be read by the automatic checks, so they look at the base styles. Try the state in the preview to see the rule work.

## Task

Add `transition-property: color;` to the `.nav-link` rule. Then add a new rule `.nav-link:hover` with `color: #4f46e5;`.

## Hints

- One declaration in `.nav-link`, and a new rule for the hover state.
- `.nav-link:hover { color: #4f46e5; }`
