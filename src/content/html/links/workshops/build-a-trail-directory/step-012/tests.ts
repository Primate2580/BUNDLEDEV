import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "attribute",
    "selector": "a[download]",
    "attribute": "href",
    "expected": "files/ridge-map.pdf",
    "message": "The map link points at the PDF"
  },
  {
    "type": "exists",
    "selector": "a[download]",
    "message": "...and has the `download` attribute."
  }
];

export default checks;
