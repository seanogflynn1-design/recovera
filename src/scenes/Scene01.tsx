import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONTS } from "../theme";

/**
 * SCENE 01 — "THE SILENCE"
 * 90 frames / 3 seconds.
 * 0–60: fade in over 2s. 60–90: hold.
 */
export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Barely perceptible rise from below — breathing in, not jumping in.
  const translateY = interpolate(frame, [0, 60], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.white,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: FONTS.sans,
          fontWeight: 500,
          fontSize: 140,
          letterSpacing: -6,
          color: COLORS.text,
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        Between.
      </div>
    </AbsoluteFill>
  );
};
