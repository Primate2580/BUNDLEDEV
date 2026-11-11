import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "text",
    "selector": "p strong",
    "includes": "Do not",
    "message": "`Do not` is strongly important"
  },
  {
    "type": "text",
    "selector": "p em",
    "includes": "ridge",
    "message": "...and `ridge` is stressed."
  }
];

export default checks;
