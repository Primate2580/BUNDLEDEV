import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "text",
    "selector": "body > h2",
    "includes": "Popular trails",
    "message": "The `body` contains an `h2` that says `Popular trails`."
  }
];

export default checks;
