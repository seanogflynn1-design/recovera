import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";
import { Layout } from "../components/Layout";

/**
 * SCENE 8 — The Business. Frames 3180–3900 (local 0–720).
 *
 * Phase 1 (0–90): intro triplet. Phase 2 (90+): header + revenue layers.
 */
export const Scene08_Business: React.FC = () => {
  const frame = useCurrentFrame();

  // Intro lines — 20-frame intervals
  const i1 = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const i2 = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const i3 = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Header shrink + move up starting at local 90
  const headerProgress = interpolate(frame, [90, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const introScale = interpolate(headerProgress, [0, 1], [1, 0.4]);
  const introY = interpolate(headerProgress, [0, 1], [0, -220]);
  const introOpacity = interpolate(headerProgress, [0, 1], [1, 0.5]);

  // Layer animations — every 120 frames starting local 120 (slower cadence
  // so each stream has time to be read; duration was extended 1.5×).
  const layerAnim = (i: number) => {
    const s = 120 + i * 120;
    return {
      opacity: interpolate(frame, [s, s + 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      tx: interpolate(frame, [s, s + 30], [60, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    };
  };

  const L1 = layerAnim(0);
  const L2 = layerAnim(1);
  const L3 = layerAnim(2);
  const L4 = layerAnim(3);
  const L5 = layerAnim(4);

  // Total bar lands after all five layers have settled
  const TOTAL_START = 780;
  const totalOpacity = interpolate(
    frame,
    [TOTAL_START, TOTAL_START + 25],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const totalScale = interpolate(
    frame,
    [TOTAL_START, TOTAL_START + 25],
    [0.9, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <Layout mode="split">
      <div style={{ height: "100%", position: "relative" }}>
        {/* Intro triplet */}
        <div
          style={{
            position: headerProgress > 0 ? "absolute" : "relative",
            top: 0,
            left: 0,
            right: 0,
            transform: `translateY(${introY}px) scale(${introScale})`,
            transformOrigin: "top left",
            opacity: introOpacity,
          }}
        >
          <div
            style={{
              fontFamily: SORA,
              fontWeight: 600,
              fontSize: 40,
              color: COLORS.white,
              opacity: i1,
              letterSpacing: "-0.02em",
            }}
          >
            Five revenue streams.
          </div>
          <div
            style={{
              fontFamily: SORA,
              fontWeight: 400,
              fontSize: 28,
              color: COLORS.muted,
              marginTop: 16,
              opacity: i2,
            }}
          >
            Each larger than the last.
          </div>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 20,
              color: "#9CA3AF",
              marginTop: 12,
              opacity: i3,
            }}
          >
            All running on the same engine.
          </div>
        </div>

        {/* Layers */}
        <div style={{ position: "absolute", top: 80, left: 0, right: 0 }}>
          <Layer
            idx="01"
            title="CLINIC SAAS"
            titleColor={COLORS.inkSoft}
            sub="Physiotherapy practices · €400–700/month"
            value="€96M – €168M"
            valueColor={COLORS.ink}
            valueSub="ARR potential"
            bg="#FFFFFF"
            borderColor={COLORS.muted}
            anim={L1}
          />
          <Layer
            idx="02"
            title="ENTERPRISE"
            titleColor="#1E40AF"
            sub="Sports orgs · employers · hospitals"
            value="€90M – €300M"
            valueColor="#1E40AF"
            valueSub="ARR potential"
            bg="#FFFFFF"
            borderColor="#1E40AF"
            anim={L2}
          />
          <Layer
            idx="03"
            title="PROFESSIONAL NETWORK"
            titleColor="#5B21B6"
            sub="Verified providers · marketplace fees"
            value="€72M – €360M"
            valueColor="#5B21B6"
            valueSub="ARR potential"
            bg="#F3F1F6"
            borderColor="#5B21B6"
            anim={L3}
          />
          <Layer
            idx="04"
            title="INSURER CONTRACTS"
            titleColor={COLORS.green}
            sub="Outcome-based · per avoided readmission"
            value="€60M – €180M"
            valueColor={COLORS.green}
            valueSub="ARR potential"
            bg="#F1F6F3"
            borderColor={COLORS.greenDim}
            anim={L4}
          />
          <Layer
            idx="05"
            title="DATA & INTELLIGENCE"
            titleColor={COLORS.green}
            sub="Bloomberg for movement health · 80–90% margin"
            value="€25M – €100M"
            valueColor={COLORS.green}
            valueSub="ARR potential"
            bg="#E9F2EC"
            borderColor={COLORS.green}
            glow
            anim={L5}
            badge="HIGHEST MARGIN"
          />

          {/* Total */}
          <div
            style={{
              marginTop: 20,
              background: "rgba(31,77,46,0.06)",
              border: "1px solid rgba(31,77,46,0.15)",
              borderRadius: 8,
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: totalOpacity,
              transform: `scale(${totalScale})`,
            }}
          >
            <div
              style={{
                fontFamily: DM,
                fontWeight: 400,
                fontSize: 14,
                color: COLORS.muted,
              }}
            >
              Total addressable ARR at full execution:
            </div>
            <div
              style={{
                fontFamily: SORA,
                fontWeight: 700,
                fontSize: 32,
                color: COLORS.white,
                letterSpacing: "-0.02em",
              }}
            >
              €343M – €1B+
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

type LayerAnim = { opacity: number; tx: number };

const Layer: React.FC<{
  idx: string;
  title: string;
  titleColor: string;
  sub: string;
  value: string;
  valueColor: string;
  valueSub: string;
  bg: string;
  borderColor: string;
  anim: LayerAnim;
  glow?: boolean;
  badge?: string;
}> = ({
  idx,
  title,
  titleColor,
  sub,
  value,
  valueColor,
  valueSub,
  bg,
  borderColor,
  anim,
  glow,
  badge,
}) => (
  <div
    style={{
      width: "100%",
      height: 96,
      borderRadius: 8,
      marginBottom: 10,
      background: bg,
      borderLeft: `3px solid ${borderColor}`,
      padding: "0 20px 0 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxSizing: "border-box",
      position: "relative",
      boxShadow: glow ? "-4px 0 20px rgba(31,77,46,0.3)" : undefined,
      opacity: anim.opacity,
      transform: `translateX(${anim.tx}px)`,
    }}
  >
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 4,
        }}
      >
        <div
          style={{
            fontFamily: SORA,
            fontWeight: 700,
            fontSize: 11,
            color: "#9CA3AF",
          }}
        >
          {idx}
        </div>
        <div
          style={{
            fontFamily: SORA,
            fontWeight: 600,
            fontSize: 15,
            color: titleColor,
            letterSpacing: "0.06em",
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontFamily: DM,
          fontWeight: 400,
          fontSize: 13,
          color: COLORS.muted,
        }}
      >
        {sub}
      </div>
    </div>
    <div style={{ textAlign: "right", flexShrink: 0 }}>
      <div
        style={{
          fontFamily: SORA,
          fontWeight: 600,
          fontSize: 20,
          color: valueColor,
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: DM,
          fontWeight: 400,
          fontSize: 12,
          color: COLORS.muted,
        }}
      >
        {valueSub}
      </div>
    </div>

    {badge && (
      <div
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          background: "rgba(31,77,46,0.12)",
          color: COLORS.teal,
          fontFamily: DM,
          fontWeight: 500,
          fontSize: 10,
          borderRadius: 3,
          padding: "2px 6px",
        }}
      >
        {badge}
      </div>
    )}
  </div>
);
