import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { COLORS, FONTS } from "../theme";

const STATS = [
  { value: "€70", label: "per session spent\ncatching up" },
  { value: "58%", label: "adherence without\nmonitoring" },
  { value: "0", label: "data points between\nsessions" },
  { value: "18min", label: "lost per session to\nreassessment" },
];

const StatCard: React.FC<{
  value: string;
  label: string;
  index: number;
  frame: number;
  fps: number;
}> = ({ value, label, index, frame, fps }) => {
  const delay = index * 12;

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        transform: `scale(${scale})`,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: "28px 24px",
        width: 240,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        border: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          fontFamily: FONTS.heading,
          color: COLORS.teal,
          marginBottom: 8,
          letterSpacing: "-1px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 16,
          fontFamily: FONTS.body,
          color: COLORS.textLight,
          textAlign: "center",
          lineHeight: 1.4,
          whiteSpace: "pre-line",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeOut = interpolate(frame, [120, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontFamily: FONTS.body,
          color: COLORS.textLight,
          textAlign: "center",
          marginBottom: 40,
          fontWeight: 500,
          letterSpacing: "3px",
          textTransform: "uppercase",
        }}
      >
        The problem today
      </div>
      <div
        style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {STATS.map((stat, i) => (
          <StatCard
            key={i}
            value={stat.value}
            label={stat.label}
            index={i}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
