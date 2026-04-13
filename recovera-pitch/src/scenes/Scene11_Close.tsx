import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";
import { EASE_OUT_EXPO } from "../animations";

/**
 * SCENE 11 — The Close. Frames 4620–4860 (local 0–240).
 */
export const Scene11_Close: React.FC = () => {
  const frame = useCurrentFrame();

  // 0–60: dim quote fades in
  const q1Opacity = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 60–120: teal strike-through draws
  const strikeProgress = interpolate(frame, [60, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  // 120–180: new line 1
  const line1Opacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line1Ty = interpolate(frame, [120, 140], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 180–240: "Starting now." line 2
  const line2Opacity = interpolate(frame, [180, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 120px",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
            fontFamily: DM,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 28,
            color: "rgba(13,13,13,0.2)",
            opacity: q1Opacity,
          }}
        >
          {"\u201CSo \u2014 how did the exercises go this week?\u201D"}
          {/* Strike-through — draws left to right */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              height: 2,
              background: COLORS.teal,
              width: `${strikeProgress * 100}%`,
              transform: "translateY(-50%)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "52%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: line1Opacity,
          transform: `translateY(${line1Ty}px)`,
        }}
      >
        <div
          style={{
            fontFamily: SORA,
            fontWeight: 800,
            fontSize: 72,
            color: COLORS.ink,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
          }}
        >
          Recovera ends that question.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "64%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: line2Opacity,
        }}
      >
        <div
          style={{
            fontFamily: SORA,
            fontWeight: 800,
            fontSize: 64,
            color: COLORS.green,
            letterSpacing: "-0.035em",
          }}
        >
          Starting now.
        </div>
      </div>
    </AbsoluteFill>
  );
};
