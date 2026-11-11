import type { Shape } from "@/lib/visualizer/annotations";

interface Props {
  shapes: Shape[];
  /** the preview page's size, so shapes line up with the page underneath */
  viewport: { width: number; height: number };
}

function Arrow({ x1, y1, x2, y2, color, dash }: Extract<Shape, { type: "line" }>) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const back = (d: number, w: number) => [
    x2 - d * Math.cos(angle) + w * Math.sin(angle),
    y2 - d * Math.sin(angle) - w * Math.cos(angle),
  ];
  const [lx, ly] = back(size, size / 2);
  const [rx, ry] = back(size, -size / 2);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} strokeDasharray={dash ? "6 4" : undefined} />
      <polygon points={`${x2},${y2} ${lx},${ly} ${rx},${ry}`} fill={color} />
    </g>
  );
}

/** Draws annotation shapes over the preview. Purely visual: hidden from assistive technology. */
export default function AnnotationOverlay({ shapes, viewport }: Props) {
  if (viewport.width <= 0 || viewport.height <= 0) return null;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${viewport.width} ${viewport.height}`}
      preserveAspectRatio="none"
      className="size-full"
    >
      {shapes.map((shape, i) => {
        switch (shape.type) {
          case "rect":
            return (
              <rect
                key={i}
                x={shape.x}
                y={shape.y}
                width={Math.max(0, shape.w)}
                height={Math.max(0, shape.h)}
                fill={shape.fill ?? "none"}
                fillOpacity={shape.opacity}
                stroke={shape.stroke}
                strokeWidth={shape.stroke ? 1.5 : 0}
                strokeDasharray={shape.dash ? "5 4" : undefined}
              />
            );
          case "line":
            return shape.arrow ? (
              <Arrow key={i} {...shape} />
            ) : (
              <line
                key={i}
                x1={shape.x1}
                y1={shape.y1}
                x2={shape.x2}
                y2={shape.y2}
                stroke={shape.color}
                strokeWidth={1.5}
                strokeDasharray={shape.dash ? "5 4" : undefined}
                strokeOpacity={0.9}
              />
            );
          case "text":
            return (
              <text
                key={i}
                x={shape.x}
                y={shape.y}
                fill={shape.color}
                textAnchor={shape.anchor ?? "start"}
                fontSize={11}
                fontWeight={600}
                fontFamily="Inter, system-ui, sans-serif"
                stroke="#0b1020"
                strokeWidth={3}
                paintOrder="stroke"
              >
                {shape.text}
              </text>
            );
        }
      })}
    </svg>
  );
}
