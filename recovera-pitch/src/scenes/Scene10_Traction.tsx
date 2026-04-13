import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";
import { Layout } from "../components/Layout";
import { ClinicalDashboard } from "../components/ClinicalDashboard";
import { LaptopFrame, PhoneFrame } from "../components/DeviceFrame";

/**
 * SCENE 10 — Where We Are. Frames 4260–4620 (local 0–360).
 *
 * Top half: product-screen montage (4 screens, crossfade every 55 frames, 10-frame fades).
 * Bottom half: status card, 4 rows, one pulsing.
 */
export const Scene10_Traction: React.FC = () => {
  const frame = useCurrentFrame();

  // Screen cycle: each holds 55 frames with 10-frame crossfade between them.
  // With 4 screens, one cycle is 4*(55+10) = 260 frames.
  const screenOpacity = (idx: number) => {
    const period = 65; // hold 55 + fade 10
    const totalCycle = period * 4;
    const t = frame % totalCycle;
    const start = idx * period;
    const fadeIn = interpolate(t, [start, start + 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const fadeOut = interpolate(
      t,
      [start + 55, start + 65],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    return fadeIn * fadeOut;
  };

  // Status rows
  const rowAnim = (i: number) => {
    const s = 30 + i * 18;
    return {
      opacity: interpolate(frame, [s, s + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      ty: interpolate(frame, [s, s + 20], [8, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    };
  };
  const r1 = rowAnim(0);
  const r2 = rowAnim(1);
  const r3 = rowAnim(2);
  const r4 = rowAnim(3);

  // Pulsing opacity for the last row: 0.7 → 1 → 0.7 over 90 frames, looping
  const pulse = 0.7 + 0.3 * (0.5 + 0.5 * Math.sin((frame / 90) * Math.PI * 2));

  return (
    <Layout mode="split">
      <div style={{ height: "100%", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Screen montage — top half */}
        <div
          style={{
            flex: "0 0 auto",
            height: "48%",
            position: "relative",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <Screen opacity={screenOpacity(0)}>
            <DashboardScreen />
          </Screen>
          <Screen opacity={screenOpacity(1)}>
            <PatientMobileScreen />
          </Screen>
          <Screen opacity={screenOpacity(2)}>
            <SportsTeamScreen />
          </Screen>
          <Screen opacity={screenOpacity(3)}>
            <InsurerROIScreen />
          </Screen>
        </div>

        {/* Status card — bottom */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 10,
            border: "0.5px solid rgba(13,13,13,0.08)",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <StatusRow
            icon="✓"
            iconColor={COLORS.green}
            text="Fully working prototype — every screen live"
            anim={r1}
          />
          <StatusRow
            icon="✓"
            iconColor={COLORS.green}
            text="40+ physiotherapist validation interviews"
            anim={r2}
          />
          <StatusRow
            icon="✓"
            iconColor={COLORS.green}
            text="Clinical specialist partnership — problem confirmed daily"
            anim={r3}
          />
          <div
            style={{
              background: "rgba(31,77,46,0.07)",
              borderRadius: 6,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: r4.opacity * pulse,
              transform: `translateY(${r4.ty}px)`,
            }}
          >
            <div
              style={{
                color: COLORS.teal,
                fontSize: 14,
                fontFamily: DM,
                fontWeight: 500,
              }}
            >
              →
            </div>
            <div
              style={{
                fontFamily: DM,
                fontWeight: 500,
                fontSize: 14,
                color: COLORS.teal,
              }}
            >
              Next: 3 pilot clinics · 20 patients
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Screen: React.FC<{ opacity: number; children: React.ReactNode }> = ({
  opacity,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity,
    }}
  >
    {children}
  </div>
);

const StatusRow: React.FC<{
  icon: string;
  iconColor: string;
  text: string;
  anim: { opacity: number; ty: number };
}> = ({ icon, iconColor, text, anim }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      opacity: anim.opacity,
      transform: `translateY(${anim.ty}px)`,
    }}
  >
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "rgba(15,107,62,0.15)",
        color: iconColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: DM,
        fontWeight: 600,
        fontSize: 12,
      }}
    >
      {icon}
    </div>
    <div
      style={{
        fontFamily: DM,
        fontWeight: 500,
        fontSize: 14,
        color: COLORS.white,
      }}
    >
      {text}
    </div>
  </div>
);

/* ---------- four product screens ---------- */

const DashboardScreen: React.FC = () => (
  <LaptopFrame style={{ width: "92%", height: "94%" }}>
    <div style={{ width: "100%", height: "100%" }}>
      <ClinicalDashboard rowStartFrame={0} compact />
    </div>
  </LaptopFrame>
);

const PatientMobileScreen: React.FC = () => {
  const frame = useCurrentFrame();

  // Animated form score 0 → 84 (then settles, slight micro-drift)
  const scoreRaw = interpolate(frame, [0, 90], [0, 84], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const drift = Math.sin(frame / 18) * 1.2;
  const score = Math.max(0, Math.round(scoreRaw + (frame > 90 ? drift : 0)));

  // Bars fill over 45 frames
  const kneeFill = interpolate(frame, [30, 75], [0, 0.84], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hipFill = interpolate(frame, [50, 95], [0, 0.62], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stick figure squat — one rep every 50 frames
  const squat = (Math.sin(frame * 0.06) + 1) / 2;
  const hipY = interpolate(squat, [0, 1], [88, 102]);
  const leftKX = interpolate(squat, [0, 1], [72, 66]);
  const leftKY = interpolate(squat, [0, 1], [118, 118]);
  const rightKX = interpolate(squat, [0, 1], [96, 102]);
  const rightKY = interpolate(squat, [0, 1], [118, 118]);

  return (
    <PhoneFrame width={240} height={480}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: COLORS.surface,
          display: "flex",
          flexDirection: "column",
          padding: "44px 16px 16px 16px",
          boxSizing: "border-box",
          gap: 12,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: SORA,
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.12em",
              color: COLORS.green,
            }}
          >
            RECOVERA
          </div>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 10,
              color: COLORS.muted,
            }}
          >
            Rep 6 / 10
          </div>
        </div>

        {/* Stick figure in a card */}
        <div
          style={{
            background: COLORS.surfaceAlt,
            borderRadius: 10,
            padding: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 auto",
            height: 148,
          }}
        >
          <svg width={110} height={140} viewBox="0 0 170 170">
            {/* Floor */}
            <line
              x1={10}
              y1={142}
              x2={160}
              y2={142}
              stroke={COLORS.border}
              strokeWidth={1}
            />
            {/* Head */}
            <circle
              cx={85}
              cy={36}
              r={9}
              fill="none"
              stroke={COLORS.ink}
              strokeWidth={2.4}
            />
            {/* Torso */}
            <line x1={85} y1={45} x2={85} y2={hipY} stroke={COLORS.ink} strokeWidth={2.4} strokeLinecap="round" />
            {/* Arms */}
            <line x1={85} y1={56} x2={68} y2={84} stroke={COLORS.ink} strokeWidth={2.4} strokeLinecap="round" />
            <line x1={85} y1={56} x2={102} y2={84} stroke={COLORS.ink} strokeWidth={2.4} strokeLinecap="round" />
            {/* Legs */}
            <line x1={85} y1={hipY} x2={leftKX} y2={leftKY} stroke={COLORS.ink} strokeWidth={2.4} strokeLinecap="round" />
            <line x1={leftKX} y1={leftKY} x2={70} y2={142} stroke={COLORS.ink} strokeWidth={2.4} strokeLinecap="round" />
            <line x1={85} y1={hipY} x2={rightKX} y2={rightKY} stroke={COLORS.ink} strokeWidth={2.4} strokeLinecap="round" />
            <line x1={rightKX} y1={rightKY} x2={100} y2={142} stroke={COLORS.ink} strokeWidth={2.4} strokeLinecap="round" />
          </svg>
        </div>

        {/* Form score */}
        <div>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 10,
              color: COLORS.muted,
              letterSpacing: "0.1em",
            }}
          >
            FORM SCORE
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 6,
              marginTop: 2,
            }}
          >
            <div
              style={{
                fontFamily: SORA,
                fontWeight: 800,
                fontSize: 36,
                color: COLORS.ink,
                letterSpacing: "-0.03em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {score}
            </div>
            <div
              style={{
                fontFamily: DM,
                fontWeight: 500,
                fontSize: 12,
                color: COLORS.green,
              }}
            >
              ↑ live
            </div>
          </div>
        </div>

        {/* Bars */}
        <MiniBar label="Left knee alignment" value={Math.round(kneeFill * 100)} fill={kneeFill} color={COLORS.green} />
        <MiniBar label="Hip symmetry" value={Math.round(hipFill * 100)} fill={hipFill} color={COLORS.amber} />
      </div>
    </PhoneFrame>
  );
};

const MiniBar: React.FC<{ label: string; value: number; fill: number; color: string }> = ({
  label,
  value,
  fill,
  color,
}) => (
  <div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <div style={{ fontFamily: DM, fontWeight: 500, fontSize: 11, color: COLORS.ink }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: SORA,
          fontWeight: 700,
          fontSize: 11,
          color,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}%
      </div>
    </div>
    <div
      style={{
        width: "100%",
        height: 5,
        background: "rgba(13,13,13,0.08)",
        borderRadius: 3,
        marginTop: 4,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${fill * 100}%`,
          height: "100%",
          background: color,
          borderRadius: 3,
        }}
      />
    </div>
  </div>
);

const SportsTeamScreen: React.FC = () => {
  const statuses: Array<"g" | "a" | "r"> = [
    "g", "g", "g", "g",
    "g", "a", "g", "g",
    "g", "g", "r", "a",
  ];
  return (
    <LaptopFrame style={{ width: "92%", height: "94%" }} pad>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
      <div
        style={{
          fontFamily: SORA,
          fontWeight: 600,
          fontSize: 12,
          color: COLORS.mutedLight,
          letterSpacing: "0.08em",
          marginBottom: 12,
        }}
      >
        SQUAD MOVEMENT HEALTH · Week 12 of Pre-Season
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          flex: 1,
        }}
      >
        {statuses.map((s, i) => (
          <div
            key={i}
            style={{
              background: COLORS.surfaceAlt,
              borderRadius: 6,
              padding: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background:
                    s === "g"
                      ? COLORS.green
                      : s === "a"
                      ? COLORS.amber
                      : COLORS.red,
                }}
              />
              <div
                style={{
                  fontFamily: DM,
                  fontWeight: 500,
                  fontSize: 11,
                  color: COLORS.ink,
                }}
              >
                Player {i + 1}
              </div>
            </div>
            <div
              style={{
                fontFamily: SORA,
                fontWeight: 600,
                fontSize: 12,
                color: COLORS.inkSoft,
              }}
            >
              {70 + Math.round(Math.sin(i * 1.3) * 15 + 15)}
            </div>
          </div>
        ))}
        </div>
      </div>
    </LaptopFrame>
  );
};

const InsurerROIScreen: React.FC = () => {
  return (
    <LaptopFrame style={{ width: "92%", height: "94%" }} pad>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          <MetricBig value="€186K" sub="platform investment" color={COLORS.ink} />
          <MetricBig value="€2.4M" sub="claims saved" color={COLORS.green} />
        </div>
        <div
          style={{
            fontFamily: SORA,
            fontWeight: 600,
            fontSize: 20,
            color: COLORS.green,
          }}
        >
          13.4× ROI · Q4 2025
        </div>
        {/* Bar chart */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 40,
            height: 100,
            marginTop: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 40, height: 20, background: COLORS.mutedLight }} />
            <div
              style={{
                fontFamily: DM,
                fontWeight: 400,
                fontSize: 11,
                color: COLORS.muted,
              }}
            >
              Invest
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 40, height: 90, background: COLORS.green }} />
            <div
              style={{
                fontFamily: DM,
                fontWeight: 400,
                fontSize: 11,
                color: COLORS.muted,
              }}
            >
              Saved
            </div>
          </div>
        </div>
      </div>
    </LaptopFrame>
  );
};

const MetricBig: React.FC<{ value: string; sub: string; color: string }> = ({
  value,
  sub,
  color,
}) => (
  <div style={{ flex: 1 }}>
    <div
      style={{
        fontFamily: SORA,
        fontWeight: 700,
        fontSize: 48,
        color,
        letterSpacing: "-0.03em",
        lineHeight: 1,
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontFamily: DM,
        fontWeight: 400,
        fontSize: 14,
        color: COLORS.muted,
        marginTop: 6,
      }}
    >
      {sub}
    </div>
  </div>
);
