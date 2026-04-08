import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { COLORS, FONTS } from "../theme";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Opacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line1Y = interpolate(frame, [15, 35], [30, 0], {
    extrapolateRight: "clamp",
  });

  const line2Opacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line2Y = interpolate(frame, [55, 75], [30, 0], {
    extrapolateRight: "clamp",
  });

  const lineWidth = spring({
    frame: frame - 40,
    fps,
    config: { damping: 30, stiffness: 80 },
  });

  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontFamily: FONTS.heading,
            fontWeight: 300,
            color: COLORS.white,
            textAlign: "center",
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            letterSpacing: "-0.5px",
            lineHeight: 1.3,
          }}
        >
          Recovery happens between appointments.
        </div>

        <div
          style={{
            width: `${lineWidth * 120}px`,
            height: 2,
            backgroundColor: COLORS.teal,
            marginTop: 8,
            marginBottom: 8,
          }}
        />

        <div
          style={{
            fontSize: 42,
            fontFamily: FONTS.heading,
            fontWeight: 600,
            color: COLORS.teal,
            textAlign: "center",
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            letterSpacing: "-0.3px",
            lineHeight: 1.3,
          }}
        >
          Clinicians can't see any of it.
        </div>
      </div>
    </AbsoluteFill>
  );
};
