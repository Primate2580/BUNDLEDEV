import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "text",
    "selector": "body > p",
    "includes": "hike",
    "message": "The `body` contains a paragraph that mentions `hike`."
  }
];

export default checks;
