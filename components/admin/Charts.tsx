"use client";

/** Lightweight dependency-free SVG charts for the admin panel. */

type BarPoint = { label: string; value: number };

export function BarChart({
  data,
  height = 180,
  color = "#C9A84C",
  valueFormat = (n: number) => String(n),
}: {
  data: BarPoint[];
  height?: number;
  color?: string;
  valueFormat?: (n: number) => string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="w-full">
      <div className="flex items-end gap-1.5" style={{ height }}>
        {data.map((d, i) => {
          const h = (d.value / max) * (height - 24);
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end group min-w-0">
              <div className="text-[10px] font-semibold text-black/50 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {valueFormat(d.value)}
              </div>
              <div
                className="w-full rounded-t-md transition-all duration-300 hover:opacity-80"
                style={{ height: Math.max(2, h), background: color, minHeight: 2 }}
                title={`${d.label}: ${valueFormat(d.value)}`}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-1.5 mt-2">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center text-[9px] text-black/35 truncate min-w-0" title={d.label}>
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LineChart({
  data,
  height = 180,
  color = "#C9A84C",
}: {
  data: BarPoint[];
  height?: number;
  color?: string;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const w = 100; // viewBox width units
  const stepX = data.length > 1 ? w / (data.length - 1) : w;
  const points = data.map((d, i) => {
    const x = i * stepX;
    const y = height - 20 - (d.value / max) * (height - 30);
    return { x, y };
  });
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${path} L ${w} ${height - 20} L 0 ${height - 20} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#lineFill)" />
        <path d={path} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill={color} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="flex mt-2">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center text-[9px] text-black/35 truncate" title={d.label}>
            {i % 2 === 0 ? d.label : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Circular progress ring — used for storage usage. */
export function Donut({
  percent,
  size = 140,
  color = "#C9A84C",
  track = "#00000012",
  label,
  sub,
}: {
  percent: number;
  size?: number;
  color?: string;
  track?: string;
  label?: string;
  sub?: string;
}) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = c - (clamped / 100) * c;
  const danger = clamped >= 90;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={danger ? "#DC2626" : color}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <div className="text-[22px] font-bold text-[#0D0D0D] leading-none">{label}</div>}
        {sub && <div className="text-[11px] text-black/40 mt-1">{sub}</div>}
      </div>
    </div>
  );
}
