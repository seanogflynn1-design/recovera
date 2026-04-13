import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, FONTS, SPRING_IMPACT } from "../theme";

/**
 * SCENE 07 — "THE SCALE" — 360 frames / 12s.
 * Three beats, each fills the frame:
 *   Beat 1 (0–110):  count 0 → 14,200 + caption
 *   Beat 2 (110–220): "€500B" + captions
 *   Beat 3 (220–360): typographic comparison with Recovera closing the frame
 */
export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beat windows
  const B1 = { in: 0, out: 110 };
  const B2 = { in: 110, out: 220 };
  const B3 = { in: 220, out: 360 };

  // Fade schedules — each beat fades in/out over 12 frames at edges.
  const opacityFor = (win: { in: number; out: number }, extra = 0) =>
    interpolate(
      frame,
      [win.in + extra, win.in + extra + 14, win.out - 14, win.out],
      [0, 1, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

  // BEAT 1 — count up 0 → 14,200 over 60 frames
  const b1CountRaw = interpolate(
    frame - B1.in,
    [10, 70],
    [0, 14200],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const b1Count = Math.floor(b1CountRaw).toLocaleString();
  const b1Scale = spring({
    frame: frame - B1.in,
    fps,
    config: SPRING_IMPACT,
    from: 0.88,
    to: 1,
  });
  const b1Op = opacityFor(B1);

  // BEAT 2 — "€500B"
  const b2Scale = spring({
    frame: frame - B2.in,
    fps,
    config: SPRING_IMPACT,
    from: 0.88,
    to: 1,
  });
  const b2Op = opacityFor(B2);

  // BEAT 3 — typographic composition, three lines build
  const L_STRIPE = B3.in + 6;
  const L_VEEVA = B3.in + 34;
  const L_RECOVERA = B3.in + 72;

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
      {/* BEAT 1 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: b1Op,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 220,
            fontWeight: 900,
            color: COLORS.text,
            letterSpacing: -10,
            lineHeight: 1,
            transform: `scale(${b1Scale})`,
          }}
        >
          {b1Count}
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 30,
            fontWeight: 400,
            color: COLORS.mid,
            marginTop: 36,
            maxWidth: 760,
          }}
        >
          physiotherapy clinics in the UK alone
        </div>
      </div>

      {/* BEAT 2 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: b2Op,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 280,
            fontWeight: 900,
            color: COLORS.text,
            letterSpacing: -12,
            lineHeight: 1,
            transform: `scale(${b2Scale})`,
          }}
        >
          €500B
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 30,
            fontWeight: 400,
            color: COLORS.mid,
            marginTop: 36,
            maxWidth: 800,
          }}
        >
          global movement health market
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 26,
            fontWeight: 400,
            color: COLORS.mid,
            marginTop: 10,
            fontStyle: "italic",
            maxWidth: 800,
          }}
        >
          No system of record has ever existed for it.
        </div>
      </div>

      {/* BEAT 3 — typographic composition */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          textAlign: "left",
          opacity: opacityFor(B3),
        }}
      >
        <TypoLine
          frame={frame}
          start={L_STRIPE}
          fps={fps}
          brand="STRIPE"
          verb="built payments"
          noun="infrastructure"
          size={50}
          color={COLORS.text}
        />
        <div style={{ height: 28 }} />
        <TypoLine
          frame={frame}
          start={L_VEEVA}
          fps={fps}
          brand="VEEVA"
          verb="built life sciences"
          noun="infrastructure"
          size={60}
          color={COLORS.text}
        />
        <div style={{ height: 32 }} />
        <TypoLine
          frame={frame}
          start={L_RECOVERA}
          fps={fps}
          brand="RECOVERA"
          verb="builds movement"
          noun="intelligence"
          size={82}
          color={COLORS.green}
          highlight
        />
      </div>
    </AbsoluteFill>
  );
};

const TypoLine: React.FC<{
  frame: number;
  start: number;
  fps: number;
  brand: string;
  verb: string;
  noun: string;
  size: number;
  color: string;
  highlight?: boolean;
}> = ({ frame, start, fps, brand, verb, noun, size, color, highlight }) => {
  const s = spring({
    frame: frame - start,
    fps,
    config: SPRING_IMPACT,
    from: 0,
    to: 1,
  });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const tx = interpolate(s, [0, 1], [30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${tx}px)`,
        display: "flex",
        alignItems: "baseline",
        flexWrap: "wrap",
        gap: 22,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.sans,
          fontWeight: 900,
          fontSize: size,
          letterSpacing: highlight ? -2 : -1,
          color,
          lineHeight: 1,
        }}
      >
        {brand}
      </div>
      <div
        style={{
          fontFamily: FONTS.sans,
          fontWeight: 400,
          fontSize: size * 0.5,
          color: highlight ? COLORS.green : COLORS.mid,
          lineHeight: 1,
        }}
      >
        {verb}
      </div>
      <div
        style={{
          fontFamily: FONTS.sans,
          fontWeight: 700,
          fontSize: size * 0.55,
          color,
          lineHeight: 1,
          letterSpacing: -0.5,
        }}
      >
        {noun}
      </div>
    </div>
  );
};
