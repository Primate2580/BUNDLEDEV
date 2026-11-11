import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "computedStyle",
    "selector": ".menu-list",
    "property": "list-style-type",
    "expected": "none",
    "message": "The list has no bullets."
  },
  {
    "type": "computedStyle",
    "selector": ".menu-list",
    "property": "padding-left",
    "expected": "0px",
    "message": "...and no left padding."
  }
];

export default checks;
