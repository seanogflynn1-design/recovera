import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";

const LINE_1 = "Every day, a physiotherapist asks their patient:";
const LINE_2 = "\u201CSo \u2014 how did the exercises go this week?\u201D";
const LINE_3 = "This is everything she can see between sessions.";

export const Scene01_Void: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----- LINE 1: typewriter, 3 frames per character from frame 0 -----
  const charsShown = Math.max(0, Math.floor(frame / 3));
  const line1 = LINE_1.slice(0, Math.min(charsShown, LINE_1.length));
  const line1Caret = frame < LINE_1.length * 3 + 30;

  // Line 1 fades out with everything else at frame 480
  const allFade = interpolate(frame, [480, 510], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ----- LINE 2: word-by-word 90-180 -----
  const line2Words = LINE_2.split(" ");
  const L2_START = 90;
  const WORD_FADE = 8;
  const WORD_STAGGER = 6;

  // ----- DIVIDER: draw 210-270 via scaleX from center -----
  const dividerScale = interpolate(frame, [210, 270], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ----- LINE 3: fade 270-330 -----
  const line3Opacity = interpolate(frame, [270, 330], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ----- THE "0": spring 360-420 -----
  const zeroSpring = spring({
    frame: frame - 360,
    fps,
    config: { damping: 150, stiffness: 60 },
    from: 0.7,
    to: 1,
  });
  const zeroOpacity = interpolate(frame, [360, 390], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Color transitions white → red over 420-450
  const redMix = interpolate(frame, [420, 450], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const zeroColor = mixHex(COLORS.white, COLORS.red, redMix);

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Line 1 — typewriter */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: DM,
          fontWeight: 400,
          fontSize: 24,
          color: COLORS.muted,
          opacity: allFade,
          transform: "translateY(-50%)",
        }}
      >
        {line1}
        {line1Caret && (
          <span style={{ opacity: (frame % 20) < 10 ? 0.7 : 0 }}>|</span>
        )}
      </div>

      {/* Line 2 — word by word */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: DM,
          fontWeight: 400,
          fontSize: 32,
          color: COLORS.white,
          opacity: allFade,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.32em",
          padding: "0 120px",
        }}
      >
        {line2Words.map((w, i) => {
          const start = L2_START + i * WORD_STAGGER;
          const wOpacity = interpolate(frame, [start, start + WORD_FADE], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <span key={i} style={{ opacity: wOpacity }}>
              {w}
            </span>
          );
        })}
      </div>

      {/* Divider */}
      <div
        style={{
          position: "absolute",
          top: "58%",
          left: "15%",
          right: "15%",
          height: 1,
          background: "rgba(255,255,255,0.08)",
          transform: `scaleX(${dividerScale})`,
          transformOrigin: "center",
          opacity: allFade,
        }}
      />

      {/* Line 3 */}
      <div
        style={{
          position: "absolute",
          top: "63%",
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: DM,
          fontWeight: 400,
          fontSize: 20,
          color: COLORS.muted,
          opacity: line3Opacity * allFade,
        }}
      >
        {LINE_3}
      </div>

      {/* The "0" */}
      <div
        style={{
          position: "absolute",
          top: "72%",
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: SORA,
          fontWeight: 700,
          fontSize: 180,
          letterSpacing: "-0.02em",
          color: zeroColor,
          opacity: zeroOpacity,
          transform: `scale(${zeroSpring})`,
          transformOrigin: "center",
          lineHeight: 1,
        }}
      >
        0
      </div>
    </AbsoluteFill>
  );
};

// Lerp two hex colors (#RRGGBB) by t∈[0,1]
function mixHex(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ar = (pa >> 16) & 0xff;
  const ag = (pa >> 8) & 0xff;
  const ab = pa & 0xff;
  const br = (pb >> 16) & 0xff;
  const bg = (pb >> 8) & 0xff;
  const bb = pb & 0xff;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}
