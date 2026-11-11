import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "count",
    "selector": "ul > li",
    "message": "The items are four `li` elements inside a `ul`",
    "min": 4,
    "max": 4
  },
  {
    "type": "text",
    "selector": "ul li",
    "includes": "Rain jacket",
    "message": "...including `Rain jacket`."
  }
];

export default checks;
