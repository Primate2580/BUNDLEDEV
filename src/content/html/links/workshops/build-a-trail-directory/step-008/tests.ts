import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "a[href=\"ridge-trail.html#parking\"]",
    "message": "The link reaches a section of another page"
  },
  {
    "type": "text",
    "selector": "a[href=\"ridge-trail.html#parking\"]",
    "includes": "parking section",
    "message": "...with the words as its text."
  }
];

export default checks;
