import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "form",
    "attribute": "action",
    "expected": "/book",
    "message": "The form sends its data to `/book`"
  },
  {
    "type": "attribute",
    "selector": "form",
    "attribute": "method",
    "expected": "post",
    "message": "...with the `post` method."
  }
];

export default checks;
