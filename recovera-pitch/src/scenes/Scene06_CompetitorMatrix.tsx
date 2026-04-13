import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";
import { Layout } from "../components/Layout";

/**
 * SCENE 6 — Competitor Positioning Matrix. Frames 2340–2700 (local 0–360).
 */
export const Scene06_CompetitorMatrix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Axes draw 0–20
  const hAxis = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const vAxis = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Labels fade after axes draw
  const labelOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Competitor dots at local 90, 120, 150
  const dot = (i: number) => {
    const s = 90 + i * 30;
    const opacity = interpolate(frame, [s, s + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const scale = interpolate(frame, [s, s + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { opacity, scale };
  };

  const hinge = dot(0);
  const sword = dot(1);
  const kaia = dot(2);

  // Glow zone at local 210
  const GLOW_START = 210;
  const glowVisible = frame >= GLOW_START;
  const glowLoop = ((frame - GLOW_START) / 80) % 1;
  const glowScale = 1 + 0.08 * Math.sin(glowLoop * Math.PI * 2);
  const glowOpacity = interpolate(frame, [GLOW_START, GLOW_START + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Recovera dot at local 270
  const RCV_START = 270;
  const rcvScale = spring({
    frame: frame - RCV_START,
    fps,
    config: { damping: 120, stiffness: 80 },
    from: 0,
    to: 1,
  });
  const rcvLabelOpacity = interpolate(frame, [RCV_START + 15, RCV_START + 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom line at local 310
  const bottomOpacity = interpolate(frame, [310, 340], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Layout mode="split">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Plot area uses the inner right-panel region (already 52/60 padded by Layout). */}
        <svg
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
        >
          {/* H axis at y = 50% = 350 */}
          <line
            x1={0}
            y1={350}
            x2={1000 * hAxis}
            y2={350}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
          />
          {/* V axis at x = 48% = 480 */}
          <line
            x1={480}
            y1={0}
            x2={480}
            y2={700 * vAxis}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
          />
        </svg>

        {/* Axis labels */}
        <AxisLabel style={{ left: 0, top: "calc(50% + 8px)" }} opacity={labelOpacity}>
          Without clinician
        </AxisLabel>
        <AxisLabel
          style={{ right: 0, top: "calc(50% + 8px)", textAlign: "right" }}
          opacity={labelOpacity}
        >
          Through clinician
        </AxisLabel>
        <AxisLabel
          style={{
            left: "calc(48% + 8px)",
            top: 0,
          }}
          opacity={labelOpacity}
        >
          Clinical grade
        </AxisLabel>
        <AxisLabel
          style={{
            left: "calc(48% + 8px)",
            bottom: 0,
          }}
          opacity={labelOpacity}
        >
          Consumer
        </AxisLabel>

        {/* Glow zone (upper-right) at 72%,26% */}
        <div
          style={{
            position: "absolute",
            left: "72%",
            top: "26%",
            width: 160,
            height: 120,
            transform: `translate(-50%, -50%) scale(${glowVisible ? glowScale : 0})`,
            background:
              "radial-gradient(circle, rgba(0,212,170,0.18) 0%, transparent 65%)",
            opacity: glowOpacity,
            pointerEvents: "none",
          }}
        />

        {/* Competitor dots */}
        <CompetitorDot
          x="28%"
          y="28%"
          label="Hinge"
          opacity={hinge.opacity}
          scale={hinge.scale}
        />
        <CompetitorDot
          x="25%"
          y="36%"
          label="Sword"
          opacity={sword.opacity}
          scale={sword.scale}
        />
        <CompetitorDot
          x="34%"
          y="44%"
          label="Kaia"
          opacity={kaia.opacity}
          scale={kaia.scale}
        />

        {/* Recovera dot */}
        <div
          style={{
            position: "absolute",
            left: "72%",
            top: "26%",
            transform: `translate(-50%, -50%) scale(${rcvScale})`,
            transformOrigin: "center",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: COLORS.teal,
              border: "2px solid rgba(0,212,170,0.4)",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: "72%",
            top: "26%",
            transform: "translate(24px, 8px)",
            fontFamily: SORA,
            fontWeight: 600,
            fontSize: 14,
            color: COLORS.teal,
            opacity: rcvLabelOpacity,
            whiteSpace: "nowrap",
          }}
        >
          RECOVERA
        </div>

        {/* Bottom line */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 18,
            color: COLORS.white,
            opacity: bottomOpacity,
          }}
        >
          Every competitor left the same position open.
        </div>
      </div>
    </Layout>
  );
};

const AxisLabel: React.FC<{
  style: React.CSSProperties;
  opacity: number;
  children: React.ReactNode;
}> = ({ style, opacity, children }) => (
  <div
    style={{
      position: "absolute",
      fontFamily: DM,
      fontWeight: 400,
      fontSize: 13,
      color: "#374151",
      opacity,
      ...style,
    }}
  >
    {children}
  </div>
);

const CompetitorDot: React.FC<{
  x: string;
  y: string;
  label: string;
  opacity: number;
  scale: number;
}> = ({ x, y, label, opacity, scale }) => (
  <>
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#1F2937",
        border: "1px solid rgba(255,255,255,0.1)",
        boxSizing: "border-box",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
      }}
    />
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(18px, 2px)",
        fontFamily: DM,
        fontWeight: 400,
        fontSize: 13,
        color: COLORS.muted,
        opacity,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  </>
);
