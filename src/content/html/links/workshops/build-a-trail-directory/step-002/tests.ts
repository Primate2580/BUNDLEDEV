import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "a[href=\"walks/mill-creek.html\"]",
    "message": "`Mill Creek walk` links into the `walks` folder"
  },
  {
    "type": "text",
    "selector": "a[href=\"walks/mill-creek.html\"]",
    "includes": "Mill Creek walk",
    "message": "...with the words as its text."
  }
];

export default checks;
