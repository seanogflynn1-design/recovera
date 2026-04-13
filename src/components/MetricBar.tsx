import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONTS } from "../theme";

type Props = {
  label: string;
  value: number; // 0–100
  color: "green" | "amber";
  startFrame: number;
  duration?: number;
  flagPulse?: boolean; // pulse amber twice after fill
  barWidth?: number;
};

/**
 * Animated metric bar — fills from 0% to target over 45 frames by default.
 * Optional amber pulse for flagged metrics.
 */
export const MetricBar: React.FC<Props> = ({
  label,
  value,
  color,
  startFrame,
  duration = 45,
  flagPulse = false,
  barWidth = 440,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame - startFrame,
    [0, duration],
    [0, value / 100],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );

  const shownValue = Math.floor(progress * 100);
  const fillColor = color === "green" ? COLORS.green : COLORS.amber;

  // Pulse — two pulses after the fill lands, each 14 frames.
  let pulseOpacity = 1;
  if (flagPulse) {
    const afterFill = frame - startFrame - duration;
    if (afterFill >= 0 && afterFill < 28) {
      const t = afterFill % 14;
      pulseOpacity = 0.55 + 0.45 * Math.cos((t / 14) * Math.PI * 2);
    }
  }

  return (
    <div
      style={{
        width: barWidth,
        marginBottom: 18,
        opacity: interpolate(frame - startFrame, [0, 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 18,
            fontWeight: 500,
            color: COLORS.text,
            letterSpacing: -0.2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 18,
            fontWeight: 500,
            color: fillColor,
            opacity: pulseOpacity,
          }}
        >
          {shownValue}%
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 8,
          background: "#F0F0F0",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: fillColor,
            opacity: pulseOpacity,
          }}
        />
      </div>
    </div>
  );
};
