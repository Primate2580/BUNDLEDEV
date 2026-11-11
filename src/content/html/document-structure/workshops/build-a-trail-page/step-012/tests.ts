import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "h2#lakes + p",
    "message": "A paragraph comes right after the `lakes` heading."
  },
  {
    "type": "text",
    "selector": "h2#lakes + p",
    "includes": "lake",
    "message": "That paragraph mentions `lake`."
  }
];

export default checks;
