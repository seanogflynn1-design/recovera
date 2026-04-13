import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, FONTS, SPRING_DEFAULT, SPRING_IMPACT } from "../theme";

/**
 * SCENE 06 — "THE COMPETITIVE TRUTH" — 300 frames / 10s.
 */
export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Left column slide-in from left
  const left = spring({
    frame,
    fps,
    config: SPRING_DEFAULT,
    from: 0,
    to: 1,
  });
  const leftX = interpolate(left, [0, 1], [-200, 0]);
  const leftOpacity = interpolate(left, [0, 1], [0, 1]);

  // Right column slide-in from right, 1s delay
  const RIGHT_START = 30;
  const right = spring({
    frame: frame - RIGHT_START,
    fps,
    config: SPRING_DEFAULT,
    from: 0,
    to: 1,
  });
  const rightX = interpolate(right, [0, 1], [200, 0]);
  const rightOpacity = interpolate(right, [0, 1], [0, 1]);

  // Fade to 20% and reveal center headlines
  const FADE_START = 130;
  const colsOpacity = interpolate(
    frame,
    [FADE_START, FADE_START + 24],
    [1, 0.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Headlines stagger
  const H1_START = FADE_START + 18;
  const H2_START = H1_START + 30;
  const H3_START = H2_START + 30;

  const h1 = headlineAnim(frame, fps, H1_START);
  const h2 = headlineAnim(frame, fps, H2_START);
  const h3 = headlineAnim(frame, fps, H3_START);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.white,
        padding: "140px 80px",
        boxSizing: "border-box",
      }}
    >
      {/* Two columns */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 48,
          opacity: colsOpacity,
        }}
      >
        {/* Left column — red X */}
        <div
          style={{
            transform: `translateX(${leftX}px)`,
            opacity: leftOpacity * colsOpacity,
          }}
        >
          <XMark color={COLORS.red} size={64} />
          <div style={{ marginTop: 28 }}>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.text,
                letterSpacing: -1,
                marginBottom: 14,
              }}
            >
              Kaia. Hinge. Sword.
            </div>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 26,
                fontWeight: 400,
                color: COLORS.mid,
                lineHeight: 1.4,
                marginBottom: 8,
              }}
            >
              They gave patients an algorithm.
            </div>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 26,
                fontWeight: 400,
                color: COLORS.mid,
                lineHeight: 1.4,
              }}
            >
              They called it healthcare.
            </div>
          </div>
        </div>

        {/* Right column — green check */}
        <div
          style={{
            transform: `translateX(${rightX}px)`,
            opacity: rightOpacity * colsOpacity,
            marginLeft: "auto",
            textAlign: "right",
            maxWidth: 720,
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CheckMark color={COLORS.green} size={64} />
          </div>
          <div style={{ marginTop: 28 }}>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.text,
                letterSpacing: -1,
                lineHeight: 1.2,
              }}
            >
              Recovera gives physiotherapists
              <br />
              eyes between appointments.
            </div>
          </div>
        </div>
      </div>

      {/* Centered headline stack */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
          pointerEvents: "none",
        }}
      >
        <AnimHeadline anim={h1} color={COLORS.text} size={58}>
          The physio was never failing the patient.
        </AnimHeadline>
        <div style={{ height: 24 }} />
        <AnimHeadline anim={h2} color={COLORS.text} size={58}>
          The system was failing the physio.
        </AnimHeadline>
        <div style={{ height: 36 }} />
        <AnimHeadline anim={h3} color={COLORS.green} size={72} bold>
          Recovera fixes the system.
        </AnimHeadline>
      </div>
    </AbsoluteFill>
  );
};

type HeadlineAnim = { opacity: number; scale: number };

function headlineAnim(frame: number, fps: number, start: number): HeadlineAnim {
  const s = spring({
    frame: frame - start,
    fps,
    config: SPRING_IMPACT,
    from: 0,
    to: 1,
  });
  return {
    opacity: interpolate(s, [0, 1], [0, 1]),
    scale: interpolate(s, [0, 1], [0.94, 1]),
  };
}

const AnimHeadline: React.FC<{
  anim: HeadlineAnim;
  color: string;
  size: number;
  bold?: boolean;
  children: React.ReactNode;
}> = ({ anim, color, size, bold = true, children }) => (
  <div
    style={{
      fontFamily: FONTS.sans,
      fontSize: size,
      fontWeight: bold ? 700 : 500,
      color,
      letterSpacing: -2,
      textAlign: "center",
      opacity: anim.opacity,
      transform: `scale(${anim.scale})`,
      lineHeight: 1.15,
    }}
  >
    {children}
  </div>
);

const XMark: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <line x1={10} y1={10} x2={38} y2={38} stroke={color} strokeWidth={6} strokeLinecap="square" />
    <line x1={38} y1={10} x2={10} y2={38} stroke={color} strokeWidth={6} strokeLinecap="square" />
  </svg>
);

const CheckMark: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <polyline
      points="8,26 20,38 40,12"
      stroke={color}
      strokeWidth={6}
      strokeLinecap="square"
      strokeLinejoin="miter"
      fill="none"
    />
  </svg>
);
