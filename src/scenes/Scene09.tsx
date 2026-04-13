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
 * SCENE 09 — "THE PROOF" — 270 frames / 9s.
 * 0.828 springs in, then a stagger of three statements.
 */
export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1.5s spring for the number
  const numberScale = spring({
    frame,
    fps,
    config: SPRING_IMPACT,
    durationInFrames: 45,
    from: 0.72,
    to: 1,
  });
  const numberOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Supporting text below the number
  const COMPARE_START = 48;
  const compareOpacity = interpolate(
    frame,
    [COMPARE_START, COMPARE_START + 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const compareY = interpolate(
    frame,
    [COMPARE_START, COMPARE_START + 18],
    [10, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  const PROVENANCE_START = COMPARE_START + 20;
  const provOpacity = interpolate(
    frame,
    [PROVENANCE_START, PROVENANCE_START + 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Green rule draws across
  const RULE_START = PROVENANCE_START + 28;
  const ruleProgress = interpolate(frame, [RULE_START, RULE_START + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Three statement lines — 0.6s stagger (18 frames)
  const S1 = RULE_START + 36;
  const S2 = S1 + 18;
  const S3 = S2 + 18;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.white,
        padding: "0 80px",
        justifyContent: "center",
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: 320,
          fontWeight: 900,
          color: COLORS.green,
          letterSpacing: -14,
          lineHeight: 1,
          textAlign: "center",
          opacity: numberOpacity,
          transform: `scale(${numberScale})`,
          transformOrigin: "center",
        }}
      >
        0.828
      </div>

      {/* Compare line */}
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: 30,
          fontWeight: 400,
          color: COLORS.text,
          textAlign: "center",
          marginTop: 28,
          opacity: compareOpacity,
          transform: `translateY(${compareY}px)`,
        }}
      >
        vs 0.833 for two physiotherapists
      </div>

      {/* Provenance */}
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: 3,
          color: COLORS.mid,
          textAlign: "center",
          marginTop: 14,
          opacity: provOpacity,
        }}
      >
        CLINICAL EQUIVALENCE · PEER-REVIEWED · 2023
      </div>

      {/* Green rule */}
      <div
        style={{
          height: 2,
          background: COLORS.green,
          width: `${ruleProgress * 100}%`,
          maxWidth: "100%",
          margin: "80px auto 0 auto",
        }}
      />

      {/* Three statements */}
      <div style={{ marginTop: 56, textAlign: "center" }}>
        <StaggeredLine
          text="The technology exists."
          start={S1}
          color={COLORS.text}
          size={56}
          weight={500}
        />
        <StaggeredLine
          text="The platform has never been built."
          start={S2}
          color={COLORS.text}
          size={56}
          weight={500}
        />
        <StaggeredLine
          text="Until now."
          start={S3}
          color={COLORS.green}
          size={72}
          weight={900}
        />
      </div>
    </AbsoluteFill>
  );
};

const StaggeredLine: React.FC<{
  text: string;
  start: number;
  color: string;
  size: number;
  weight: number;
}> = ({ text, start, color, size, weight }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [start, start + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [start, start + 20], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div
      style={{
        fontFamily: FONTS.sans,
        fontSize: size,
        fontWeight: weight,
        color,
        letterSpacing: -1.5,
        opacity,
        transform: `translateY(${y}px)`,
        marginBottom: 18,
        lineHeight: 1.15,
      }}
    >
      {text}
    </div>
  );
};
