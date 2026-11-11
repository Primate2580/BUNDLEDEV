import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "ol > li > a[href=\"bridge.html\"]",
    "message": "The bridge link sits inside a route step"
  },
  {
    "type": "text",
    "selector": "a[href=\"bridge.html\"]",
    "includes": "wooden bridge",
    "message": "...with the words as its text."
  }
];

export default checks;
