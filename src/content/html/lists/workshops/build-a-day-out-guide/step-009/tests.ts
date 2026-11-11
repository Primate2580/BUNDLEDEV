import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "text",
    "selector": "style",
    "includes": "list-style",
    "message": "The page has a rule that removes the list style"
  },
  {
    "type": "exists",
    "selector": "ul.menu",
    "message": "...and the walks list has the class `menu`."
  }
];

export default checks;
