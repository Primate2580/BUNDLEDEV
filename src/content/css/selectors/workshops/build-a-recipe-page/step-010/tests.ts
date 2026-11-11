import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".intro",
    "property": "font-size",
    "expected": "14px",
    "message": "The intro is `14px`."
  },
  {
    "type": "computedStyle",
    "selector": ".source",
    "property": "font-size",
    "expected": "14px",
    "message": "The source line is `14px` too."
  }
];

export default checks;
