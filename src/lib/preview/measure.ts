/** One thing to measure: every element matching `selector`, plus the listed computed style properties. */
export interface MeasureRequest {
  /** name the result is filed under */
  key: string;
  selector: string;
  /** CSS property names, e.g. "flex-direction" */
  props: string[];
}

export interface MeasuredElement {
  /** position and size in the preview page's viewport (border box) */
  rect: { x: number; y: number; width: number; height: number };
  style: Record<string, string>;
}

export interface MeasureResult {
  viewport: { width: number; height: number };
  elements: Record<string, MeasuredElement[]>;
}

/**
 * Measures elements in the page. Like runChecks, this must stay self-contained: its source
 * text is copied into the sandboxed preview (see bridge.ts), and it also runs under jsdom in tests.
 */
export function measureElements(requests: MeasureRequest[], win: Window): MeasureResult {
  const elements: Record<string, MeasuredElement[]> = {};
  for (const request of requests) {
    let found: Element[] = [];
    try {
      found = Array.from(win.document.querySelectorAll(request.selector));
    } catch {
      found = [];
    }
    elements[request.key] = found.slice(0, 50).map((el) => {
      const box = el.getBoundingClientRect();
      const computed = win.getComputedStyle(el);
      const style: Record<string, string> = {};
      for (const prop of request.props) style[prop] = computed.getPropertyValue(prop);
      return { rect: { x: box.left, y: box.top, width: box.width, height: box.height }, style };
    });
  }
  return { viewport: { width: win.innerWidth, height: win.innerHeight }, elements };
}
