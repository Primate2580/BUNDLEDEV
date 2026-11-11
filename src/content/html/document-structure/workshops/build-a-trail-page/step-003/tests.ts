import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "head > meta[charset]",
    "message": "The `head` contains a `meta` tag with a `charset` attribute."
  },
  {
    "type": "attribute",
    "selector": "meta[charset]",
    "attribute": "charset",
    "expected": "UTF-8",
    "message": "The charset is `UTF-8`."
  }
];

export default checks;
