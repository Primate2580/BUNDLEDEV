import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "h1#top",
    "message": "The `h1` has the id `top`"
  },
  {
    "type": "text",
    "selector": "a[href=\"#top\"]",
    "includes": "Back to the top",
    "message": "...and `Back to the top` links to it."
  }
];

export default checks;
