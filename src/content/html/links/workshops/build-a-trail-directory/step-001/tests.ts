import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "a[href=\"ridge-trail.html\"]",
    "message": "`Ridge Trail` links to `ridge-trail.html`"
  },
  {
    "type": "text",
    "selector": "a[href=\"ridge-trail.html\"]",
    "includes": "Ridge Trail",
    "message": "...with the words as its text."
  }
];

export default checks;
