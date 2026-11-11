interface Props {
  percent: number;
  label: string;
  className?: string;
}

export default function ProgressBar({ percent, label, className = "" }: Props) {
  const value = Math.max(0, Math.min(100, percent));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className={`h-1.5 overflow-hidden rounded-full bg-edge ${className}`}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-[width] duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
