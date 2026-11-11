import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "figure > blockquote > p",
    "message": "The quote is a `blockquote` with a paragraph, inside a `figure`"
  },
  {
    "type": "text",
    "selector": "figure > figcaption cite",
    "includes": "Notes from the Ridge",
    "message": "...and the credit is a `figcaption` with the title in a `cite`."
  }
];

export default checks;
