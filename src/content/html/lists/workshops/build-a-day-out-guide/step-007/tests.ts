import type { Check } from "@/engine/types";

const checks: Check[] = [
  {
    "type": "exists",
    "selector": "nav > ul > li > a",
    "message": "The walks are links in a list, inside a `nav`"
  },
  {
    "type": "attribute",
    "selector": "a[href=\"heron-lake.html\"]",
    "attribute": "href",
    "expected": "heron-lake.html",
    "message": "...including `heron-lake.html`."
  }
];

export default checks;
