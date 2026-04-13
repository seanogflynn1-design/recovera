import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { COLORS, FONTS, SPRING_IMPACT } from "../theme";

/**
 * SCENE 02 — "THE SYSTEM FAILING" — 210 frames / 7s.
 * Three stacked lines, amber rule below, mono caption.
 */
export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line timings — each ~0.8s = 24 frames to appear.
  const L1_START = 0;
  const L2_START = 28;
  const L3_START = 56;
  const RULE_START = L3_START + 45; // 1.5s after line 3 begins
  const CAPTION_START = RULE_START + 18;

  // Line 1 — small green mono label
  const l1Opacity = interpolate(frame, [L1_START, L1_START + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const l1Y = interpolate(frame, [L1_START, L1_START + 24], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Line 2 — "Zero." spring from 0.8 to 1.0
  const zeroScale = spring({
    frame: frame - L2_START,
    fps,
    config: SPRING_IMPACT,
    from: 0.8,
    to: 1,
  });
  const zeroOpacity = interpolate(frame, [L2_START, L2_START + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 3 — body copy
  const l3Opacity = interpolate(frame, [L3_START, L3_START + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const l3Y = interpolate(frame, [L3_START, L3_START + 24], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Amber rule draws L→R over 36 frames
  const ruleProgress = interpolate(frame, [RULE_START, RULE_START + 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Mono caption
  const captionOpacity = interpolate(
    frame,
    [CAPTION_START, CAPTION_START + 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.white,
        padding: "260px 80px 0 80px",
      }}
    >
      {/* Line 1 — label */}
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: 6,
          color: COLORS.green,
          opacity: l1Opacity,
          transform: `translateY(${l1Y}px)`,
          marginBottom: 48,
        }}
      >
        THE PROBLEM
      </div>

      {/* Line 2 — "Zero." */}
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: 240,
          fontWeight: 900,
          letterSpacing: -10,
          color: COLORS.text,
          lineHeight: 1,
          opacity: zeroOpacity,
          transform: `scale(${zeroScale})`,
          transformOrigin: "left center",
          marginBottom: 56,
        }}
      >
        Zero.
      </div>

      {/* Line 3 — body */}
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: 34,
          fontWeight: 400,
          lineHeight: 1.35,
          color: COLORS.text,
          maxWidth: 620,
          opacity: l3Opacity,
          transform: `translateY(${l3Y}px)`,
          marginBottom: 100,
        }}
      >
        Objective data points a physiotherapist receives between appointments.
      </div>

      {/* Amber rule */}
      <div
        style={{
          height: 2,
          background: COLORS.amber,
          width: `${ruleProgress * 100}%`,
          maxWidth: "100%",
          marginBottom: 28,
        }}
      />

      {/* Mono caption */}
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: 3,
          color: COLORS.amber,
          opacity: captionOpacity,
        }}
      >
        EVERY CLINIC. EVERY DAY.
      </div>
    </AbsoluteFill>
  );
};
