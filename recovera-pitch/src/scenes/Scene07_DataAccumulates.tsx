import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";
import { FounderPlaceholder } from "../components/FounderPlaceholder";

type Dot = { x: number; y: number; delay: number; warm: boolean };

/**
 * SCENE 7 — Data Accumulates. Frames 2700–3180 (local 0–480).
 *
 * 800 dots max. Positions pre-generated in useMemo and never re-randomised.
 */
export const Scene07_DataAccumulates: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Year label timing windows
  // Year 1 — local 60, 50 dots over 60f
  // Year 2 — local 180, +200 dots
  // Year 3 — local 270, +500 dots (some warm)
  // Year 5 — local 360, flood (cap 800 total)
  const dots = useMemo<Dot[]>(() => {
    const rng = mulberry32(42);
    const out: Dot[] = [];

    const pushDots = (count: number, delayStart: number, delaySpread: number, warmChance: number) => {
      for (let i = 0; i < count; i++) {
        const x = 160 + rng() * 1600;
        const y = 240 + rng() * 600;
        const delay = delayStart + rng() * delaySpread;
        const warm = rng() < warmChance;
        out.push({ x, y, delay, warm });
      }
    };

    pushDots(50, 60, 60, 0); // Year 1
    pushDots(200, 180, 60, 0); // Year 2
    pushDots(400, 270, 60, 0.3); // Year 3
    pushDots(150, 360, 80, 0.5); // Year 5 — keep total ≤ 800

    return out;
  }, []);

  const yearLabel = (s: number, e: number) =>
    interpolate(frame, [s, s + 25, e, e + 25], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  // End messages at local 420
  const END_START = 420;
  const endLine1 = interpolate(frame, [END_START, END_START + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const endLine2 = interpolate(frame, [END_START + 20, END_START + 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            fontFamily: SORA,
            fontWeight: 600,
            fontSize: 28,
            color: COLORS.white,
            letterSpacing: "-0.01em",
          }}
        >
          The dataset no competitor can buy
        </div>
        <div
          style={{
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 16,
            color: COLORS.muted,
            marginTop: 8,
          }}
        >
          Recovera sessions processed over time
        </div>
      </div>

      {/* Dot field (SVG) */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        {dots.map((d, i) => {
          const opacity = interpolate(
            frame,
            [d.delay, d.delay + 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const scale = interpolate(
            frame,
            [d.delay, d.delay + 12],
            [0.5, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          if (opacity === 0) return null;
          return (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={3 * scale}
              fill={d.warm ? "rgba(0,212,170,0.8)" : "rgba(0,212,170,0.6)"}
              opacity={opacity}
            />
          );
        })}
      </svg>

      {/* Year labels — anchored bottom-left */}
      <YearLabel style={{ left: 60, bottom: 260 }} text="Year 1 · 10,000 sessions" opacity={yearLabel(60, 150)} />
      <YearLabel style={{ left: 60, bottom: 220 }} text="Year 2 · 150,000 sessions" opacity={yearLabel(180, 260)} />
      <YearLabel style={{ left: 60, bottom: 180 }} text="Year 3 · 800,000 sessions" opacity={yearLabel(270, 350)} />
      <YearLabel style={{ left: 60, bottom: 140 }} text="Year 5 · 4.2 million sessions" opacity={yearLabel(360, 420)} />

      {/* Final messages */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "55%",
          textAlign: "center",
          fontFamily: DM,
          fontWeight: 500,
          fontSize: 22,
          color: COLORS.white,
          opacity: endLine1,
          padding: "0 160px",
        }}
      >
        No competitor can build this dataset without starting where we started.
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "60%",
          textAlign: "center",
          fontFamily: DM,
          fontWeight: 400,
          fontSize: 18,
          color: COLORS.mutedLight,
          opacity: endLine2,
          padding: "0 160px",
        }}
      >
        No amount of funding closes a 5-year data gap.
      </div>

      {/* PIP placeholder */}
      <FounderPlaceholder mode="pip" />
    </AbsoluteFill>
  );
};

const YearLabel: React.FC<{
  style: React.CSSProperties;
  text: string;
  opacity: number;
}> = ({ style, text, opacity }) => (
  <div
    style={{
      position: "absolute",
      fontFamily: DM,
      fontWeight: 400,
      fontSize: 13,
      color: COLORS.muted,
      opacity,
      ...style,
    }}
  >
    {text}
  </div>
);

function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
