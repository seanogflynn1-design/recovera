import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";
import { Layout } from "../components/Layout";

/**
 * SCENE 9 — The Comparable (Veeva). Frames 3900–4260 (local 0–360).
 */
export const Scene09_Comparable: React.FC = () => {
  const frame = useCurrentFrame();

  // Intro quote fades in, scales up to header position after local 90
  const q1 = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const q2 = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const q3 = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const q4 = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Transition starts at local 90
  const transition = interpolate(frame, [90, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const introScale = interpolate(transition, [0, 1], [1, 0.55]);
  const introY = interpolate(transition, [0, 1], [0, -160]);
  const introOpacity = interpolate(transition, [0, 1], [1, 0.65]);

  // Cards at local 130
  const CARDS_START = 130;
  const cardsOpacity = interpolate(frame, [CARDS_START, CARDS_START + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardsTy = interpolate(frame, [CARDS_START, CARDS_START + 25], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom "Same playbook" + "Larger ceiling" at local 250
  const SP_START = 250;
  const sp1Opacity = interpolate(frame, [SP_START, SP_START + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sp2Opacity = interpolate(frame, [SP_START + 20, SP_START + 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Layout mode="split">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 0,
        }}
      >
        {/* Intro stack */}
        <div
          style={{
            transform: `translateY(${introY}px) scale(${introScale})`,
            transformOrigin: "top left",
            opacity: introOpacity,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 20,
              color: COLORS.muted,
              opacity: q1,
            }}
          >
            The company this most resembles
          </div>
          <div
            style={{
              fontFamily: SORA,
              fontWeight: 600,
              fontSize: 40,
              color: COLORS.white,
              marginTop: 12,
              letterSpacing: "-0.02em",
              opacity: q2,
            }}
          >
            is Veeva Systems.
          </div>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 18,
              color: COLORS.mutedLight,
              marginTop: 12,
              opacity: q3,
            }}
          >
            Vertical SaaS. Built through the professional.
          </div>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 500,
              fontSize: 18,
              color: COLORS.white,
              marginTop: 8,
              opacity: q4,
            }}
          >
            IPO'd at $4B. Now $30B+.
          </div>
        </div>

        {/* Two columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            opacity: cardsOpacity,
            transform: `translateY(${cardsTy}px)`,
          }}
        >
          <ComparableCard
            header="VEEVA SYSTEMS"
            headerColor={COLORS.mutedLight}
            border="0.5px solid rgba(13,13,13,0.08)"
            bg="#FFFFFF"
            rows={[
              ["Market", "Pharma CRM"],
              ["Built through", "Sales reps"],
              ["Moat", "Clinical data asset"],
              ["Outcome", "$4B → $30B+"],
            ]}
          />
          <ComparableCard
            header="RECOVERA"
            headerColor={COLORS.teal}
            border="0.5px solid rgba(31,77,46,0.25)"
            bg="#E9F2EC"
            rows={[
              ["Market", <>Movement health (<span style={{ color: COLORS.teal }}>5× larger</span>)</>],
              ["Built through", "Physiotherapists"],
              ["Moat", "Movement intelligence data"],
              ["Outcome", <span style={{ color: COLORS.teal }}>Category infrastructure</span>],
            ]}
          />
        </div>

        {/* Bottom lines */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <div
            style={{
              fontFamily: SORA,
              fontWeight: 700,
              fontSize: 44,
              color: COLORS.ink,
              opacity: sp1Opacity,
              letterSpacing: "-0.03em",
            }}
          >
            Same playbook.
          </div>
          <div
            style={{
              fontFamily: SORA,
              fontWeight: 800,
              fontSize: 48,
              color: COLORS.green,
              marginTop: 8,
              opacity: sp2Opacity,
              letterSpacing: "-0.03em",
            }}
          >
            Larger ceiling.
          </div>
        </div>
      </div>
    </Layout>
  );
};

const ComparableCard: React.FC<{
  header: string;
  headerColor: string;
  border: string;
  bg: string;
  rows: Array<[string, React.ReactNode]>;
}> = ({ header, headerColor, border, bg, rows }) => (
  <div
    style={{
      background: bg,
      borderRadius: 10,
      border,
      padding: "28px 32px",
    }}
  >
    <div
      style={{
        fontFamily: SORA,
        fontWeight: 600,
        fontSize: 13,
        color: headerColor,
        letterSpacing: "0.1em",
      }}
    >
      {header}
    </div>
    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
      {rows.map(([k, v], i) => (
        <div key={i}>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 12,
              color: COLORS.muted,
            }}
          >
            {k}
          </div>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 500,
              fontSize: 15,
              color: COLORS.white,
              marginTop: 2,
            }}
          >
            {v}
          </div>
        </div>
      ))}
    </div>
  </div>
);
