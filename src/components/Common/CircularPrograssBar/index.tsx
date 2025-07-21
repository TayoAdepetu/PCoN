import { CircularProgressBarProps } from "../../../types/props";

export default function CircularProgressBar({
  progress,
  size = 100,
  strokeWidth = 10,
  color = "#0080aa",
  emptyColor = "#f0f0f080",
  textColor = "#2a2a2a",
}: CircularProgressBarProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-block">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={emptyColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-500 ease-out"
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />

        {/* Centered Text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: size / 3, fill: textColor, fontWeight: "600" }}
        >
          {progress}
          <tspan style={{ fontSize: size / 5, fontWeight: "bold" }}>%</tspan>
        </text>
      </svg>
    </div>
  );
}
