import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "button > svg[aria-hidden=\"true\"] > circle",
    "message": "The button has a decorative inline icon"
  },
  {
    "type": "text",
    "selector": "button",
    "includes": "Save this walk",
    "message": "...and a text label."
  }
];

export default checks;
