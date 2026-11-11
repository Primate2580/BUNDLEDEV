import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".front",
    "property": "backface-visibility",
    "expected": [
      "hidden"
    ],
    "message": "The faces hide their backs"
  },
  {
    "type": "computedStyle",
    "selector": ".back",
    "property": "transform",
    "expected": [
      "rotateY(180deg)",
      "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)"
    ],
    "message": "...and the back face starts turned around."
  }
];

export default checks;
