import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".media",
    "property": "overflow",
    "expected": [
      "hidden"
    ],
    "message": "The picture holder clips with `overflow: hidden`."
  },
  {
    "type": "computedStyle",
    "selector": ".thumb",
    "property": "transition-property",
    "expected": [
      "transform"
    ],
    "message": "The pictures transition `transform`",
    "match": "all"
  },
  {
    "type": "computedStyle",
    "selector": ".thumb",
    "property": "transition-duration",
    "expected": [
      "0.5s",
      "500ms"
    ],
    "message": "...over `0.5s`.",
    "match": "all"
  }
];

export default checks;
