import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "head > meta[name=\"viewport\"]",
    "message": "The `head` contains a `meta` tag named `viewport`."
  },
  {
    "type": "attribute",
    "selector": "meta[name=\"viewport\"]",
    "attribute": "content",
    "expected": "width=device-width, initial-scale=1",
    "message": "Its content is `width=device-width, initial-scale=1`."
  }
];

export default checks;
