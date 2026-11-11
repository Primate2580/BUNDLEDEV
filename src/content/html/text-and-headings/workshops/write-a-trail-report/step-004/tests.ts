import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "text",
    "selector": "h2",
    "includes": "Trail conditions",
    "message": "`Trail conditions` is an `h2`"
  },
  {
    "type": "text",
    "selector": "p",
    "includes": "The lower half is firm",
    "message": "...and its text is in a paragraph."
  }
];

export default checks;
