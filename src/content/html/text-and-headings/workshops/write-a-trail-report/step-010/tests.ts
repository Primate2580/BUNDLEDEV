import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "text",
    "selector": "p",
    "includes": "© 2026 Ridge & Valley Park",
    "message": "The copyright line uses `&copy;` and `&amp;`"
  },
  {
    "type": "text",
    "selector": "p",
    "includes": "Boots & poles are on sale",
    "message": "...and the shop line is a paragraph with an ampersand."
  }
];

export default checks;
