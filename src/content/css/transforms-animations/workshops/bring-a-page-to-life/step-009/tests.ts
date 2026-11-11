import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".flip",
    "property": "perspective",
    "expected": [
      "800px"
    ],
    "message": "The parent sets a `800px` perspective"
  },
  {
    "type": "computedStyle",
    "selector": ".flip-inner",
    "property": "transform-style",
    "expected": [
      "preserve-3d"
    ],
    "message": "...the turning part keeps its children in 3D"
  },
  {
    "type": "computedStyle",
    "selector": ".flip-inner",
    "property": "transition-property",
    "expected": [
      "transform"
    ],
    "message": "...and eases its `transform`."
  }
];

export default checks;
