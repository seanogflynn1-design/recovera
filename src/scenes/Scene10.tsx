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
 * SCENE 10 — "THE CLOSE" — 390 frames / 13s.
 *
 * 0–60   : "We are building toward one moment." (word by word)
 * 60–120 : hold, then fade
 * 120–150: silence (white)
 * 150–210: "A physiotherapist — unprompted — says:" (word by word)
 * 210–240: hold, then fade
 * 240–360: "I cannot imagine going back." springs in, holds
 * 360–390: fade out, recovera wordmark rises from bottom, fade to white
 */
export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----- Line 1 -----
  const L1_IN = 0;
  const L1_FADE_OUT_START = 95;
  const L1_FADE_OUT_END = 120;

  const l1Words = "We are building toward one moment.".split(" ");

  const l1Fade = interpolate(
    frame,
    [L1_FADE_OUT_START, L1_FADE_OUT_END],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ----- Line 2 -----
  const L2_IN = 150;
  const L2_FADE_OUT_START = 215;
  const L2_FADE_OUT_END = 240;

  const l2Words = "A physiotherapist — unprompted — says:".split(" ");

  const l2Fade = interpolate(
    frame,
    [L2_FADE_OUT_START, L2_FADE_OUT_END],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ----- Line 3 (hero quote) -----
  const L3_IN = 245;
  const L3_HOLD_UNTIL = 350;
  const L3_FADE_END = 380;

  const l3Scale = spring({
    frame: frame - L3_IN,
    fps,
    config: SPRING_IMPACT,
    from: 0.9,
    to: 1,
  });
  const l3Opacity = interpolate(
    frame,
    [L3_IN, L3_IN + 22, L3_HOLD_UNTIL, L3_FADE_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ----- Wordmark rises from below as hero fades -----
  const MARK_IN = L3_HOLD_UNTIL;
  const markOpacity = interpolate(frame, [MARK_IN, MARK_IN + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const markY = interpolate(frame, [MARK_IN, MARK_IN + 24], [24, 0], {
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
        padding: "0 80px",
        textAlign: "center",
      }}
    >
      {/* Line 1 */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: l1Fade, padding: "0 80px" }}>
        <SerifWordBuild
          words={l1Words}
          start={L1_IN}
          stride={9}
          size={56}
          italic
          weight={400}
          color={COLORS.text}
        />
      </div>

      {/* Line 2 */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: l2Fade, padding: "0 80px" }}>
        <SerifWordBuild
          words={l2Words}
          start={L2_IN}
          stride={9}
          size={64}
          italic
          weight={700}
          color={COLORS.text}
        />
      </div>

      {/* Line 3 — hero quote */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
          opacity: l3Opacity,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.serif,
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: 104,
            color: COLORS.text,
            letterSpacing: -3,
            lineHeight: 1.1,
            transform: `scale(${l3Scale})`,
            transformOrigin: "center",
          }}
        >
          "I cannot imagine
          <br />
          going back."
        </div>
      </div>

      {/* Wordmark */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONTS.mono,
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: 6,
          color: COLORS.green,
          opacity: markOpacity,
          transform: `translateY(${markY}px)`,
        }}
      >
        RECOVERA · RECOVERA.IO
      </div>
    </AbsoluteFill>
  );
};

const SerifWordBuild: React.FC<{
  words: string[];
  start: number;
  stride: number;
  size: number;
  color: string;
  italic?: boolean;
  weight?: number;
}> = ({ words, start, stride, size, color, italic = false, weight = 400 }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        fontFamily: FONTS.serif,
        fontSize: size,
        fontWeight: weight,
        fontStyle: italic ? "italic" : "normal",
        color,
        letterSpacing: -1,
        lineHeight: 1.2,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: size * 0.24,
      }}
    >
      {words.map((w, i) => {
        const wStart = start + i * stride;
        const opacity = interpolate(frame, [wStart, wStart + 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(frame, [wStart, wStart + 16], [14, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${y}px)`,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
