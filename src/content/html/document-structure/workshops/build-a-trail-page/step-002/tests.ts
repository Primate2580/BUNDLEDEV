import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "html",
    "attribute": "lang",
    "expected": "en",
    "message": "The `html` element has `lang=\"en\"`."
  }
];

export default checks;
