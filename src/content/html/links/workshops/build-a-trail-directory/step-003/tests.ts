import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "a[href=\"https://example.com/forecast\"]",
    "message": "The forecast link has an absolute address"
  },
  {
    "type": "text",
    "selector": "a[href=\"https://example.com/forecast\"]",
    "includes": "weather service site",
    "message": "...with the words as its text."
  }
];

export default checks;
