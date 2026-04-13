import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";
import { Layout } from "../components/Layout";
import { ClinicalDashboard } from "../components/ClinicalDashboard";

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
            background: "#111820",
            borderRadius: 10,
            border: "0.5px solid rgba(255,255,255,0.08)",
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
              background: "rgba(0,212,170,0.07)",
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
      background: "#0D1117",
      border: "0.5px solid rgba(255,255,255,0.08)",
      borderRadius: 10,
      overflow: "hidden",
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
        background: "rgba(16,185,129,0.15)",
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
  // We render the dashboard inside a scaled container so the full UI shows.
  <div style={{ width: "100%", height: "100%" }}>
    <ClinicalDashboard rowStartFrame={0} compact />
  </div>
);

const PatientMobileScreen: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0D1117",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Phone frame 360×640 scaled down */}
      <div
        style={{
          width: 240,
          height: 420,
          background: "#0A0A0F",
          border: "2px solid rgba(255,255,255,0.1)",
          borderRadius: 28,
          padding: 24,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
        }}
      >
        {/* Ring */}
        <div style={{ position: "relative", width: 160, height: 160 }}>
          <svg width={160} height={160} viewBox="0 0 160 160">
            <circle
              cx={80}
              cy={80}
              r={70}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={6}
            />
            <circle
              cx={80}
              cy={80}
              r={70}
              fill="none"
              stroke={COLORS.teal}
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 70 * 0.65} ${2 * Math.PI * 70}`}
              transform="rotate(-90 80 80)"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: SORA,
              fontWeight: 700,
              fontSize: 48,
              color: COLORS.white,
              letterSpacing: "-0.02em",
            }}
          >
            71
          </div>
        </div>
        <div
          style={{
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 14,
            color: COLORS.muted,
          }}
        >
          Movement Score
        </div>
        <div
          style={{
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 13,
            color: "#374151",
          }}
        >
          Session 3 of 5 · Tuesday
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          {[true, true, true, false, false].map((done, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: done ? COLORS.teal : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SportsTeamScreen: React.FC = () => {
  const statuses: Array<"g" | "a" | "r"> = [
    "g", "g", "g", "g",
    "g", "a", "g", "g",
    "g", "g", "r", "a",
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0D1117",
        padding: 18,
        boxSizing: "border-box",
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
              background: "#111820",
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
                  color: COLORS.white,
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
                color: COLORS.mutedLight,
              }}
            >
              {70 + Math.round(Math.sin(i * 1.3) * 15 + 15)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const InsurerROIScreen: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0D1117",
        padding: 24,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ display: "flex", gap: 20 }}>
        <MetricBig value="€186K" sub="platform investment" color={COLORS.white} />
        <MetricBig value="€2.4M" sub="claims saved" color={COLORS.green} />
      </div>
      <div
        style={{
          fontFamily: SORA,
          fontWeight: 600,
          fontSize: 20,
          color: COLORS.teal,
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
          height: 120,
          marginTop: "auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: 40, height: 20, background: "#374151" }} />
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
          <div style={{ width: 40, height: 100, background: COLORS.teal }} />
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
