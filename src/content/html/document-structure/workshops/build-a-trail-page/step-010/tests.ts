import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "ul > li:first-child a",
    "attribute": "href",
    "expected": "#lakes",
    "message": "The first list item contains a link to `#lakes`."
  },
  {
    "type": "text",
    "selector": "ul > li:first-child a",
    "includes": "Lake loop",
    "message": "The link text is `Lake loop`."
  }
];

export default checks;
