import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";
import { Layout } from "../components/Layout";

/**
 * SCENE 5 — Technology is Proven. Frames 1980–2340 (local 0–360).
 *
 * Phase 1 (0–150): research validation citation card
 * Phase 2 (150–360): competitor reframe
 */
export const Scene05_Technology: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1 fade in / fade out
  const cardOpacity = interpolate(frame, [0, 25, 140, 160], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardTy = interpolate(frame, [0, 25], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Numbers count up from 0 to their values over 40 frames
  const n1 = interpolate(frame, [10, 50], [0, 0.828], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const n2 = interpolate(frame, [10, 50], [0, 0.833], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2 — header
  const headerOpacity = interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerTy = interpolate(frame, [150, 170], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Competitor rows — every 20 frames from local 190
  const rowAnim = (i: number) => {
    const s = 190 + i * 20;
    return {
      opacity: interpolate(frame, [s, s + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      ty: interpolate(frame, [s, s + 20], [10, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    };
  };
  const r1 = rowAnim(0);
  const r2 = rowAnim(1);
  const r3 = rowAnim(2);

  // Highlight bar — pulses teal glow on entry
  const hlStart = 260;
  const hlOpacity = interpolate(frame, [hlStart, hlStart + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hlGlow =
    interpolate(
      frame,
      [hlStart, hlStart + 10, hlStart + 40],
      [0, 0.4, 0.18],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

  return (
    <Layout mode="split">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Phase 1 — citation card */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: cardOpacity,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 12,
              border: "0.5px solid rgba(13,13,13,0.08)",
              padding: "40px 48px",
              transform: `translateY(${cardTy}px)`,
              maxWidth: 640,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontFamily: DM,
                fontWeight: 400,
                fontSize: 12,
                color: COLORS.muted,
                letterSpacing: "0.08em",
                textTransform: "none",
              }}
            >
              Peer-reviewed · Published 2023
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: 24,
                gap: 16,
              }}
            >
              <div style={{ textAlign: "center", flex: 1 }}>
                <div
                  style={{
                    fontFamily: SORA,
                    fontWeight: 700,
                    fontSize: 64,
                    color: COLORS.teal,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {n1.toFixed(3)}
                </div>
                <div
                  style={{
                    fontFamily: DM,
                    fontWeight: 400,
                    fontSize: 14,
                    color: COLORS.mutedLight,
                    marginTop: 8,
                  }}
                >
                  Smartphone AI
                </div>
              </div>
              <div
                style={{
                  width: 1,
                  height: 80,
                  background: "rgba(13,13,13,0.1)",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    fontFamily: SORA,
                    fontWeight: 400,
                    fontSize: 32,
                    color: COLORS.muted,
                    background: "#FFFFFF",
                    padding: "4px 8px",
                  }}
                >
                  ≈
                </div>
              </div>
              <div style={{ textAlign: "center", flex: 1 }}>
                <div
                  style={{
                    fontFamily: SORA,
                    fontWeight: 700,
                    fontSize: 64,
                    color: COLORS.mutedLight,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {n2.toFixed(3)}
                </div>
                <div
                  style={{
                    fontFamily: DM,
                    fontWeight: 400,
                    fontSize: 14,
                    color: COLORS.mutedLight,
                    marginTop: 8,
                  }}
                >
                  Two physiotherapists
                </div>
              </div>
            </div>
            <div
              style={{
                fontFamily: DM,
                fontWeight: 500,
                fontSize: 18,
                color: COLORS.white,
                marginTop: 32,
                textAlign: "center",
              }}
            >
              Clinical equivalence. Confirmed.
            </div>
          </div>
        </div>

        {/* Phase 2 — competitor reframe */}
        <div
          style={{
            opacity: headerOpacity,
            transform: `translateY(${headerTy}px)`,
          }}
        >
          <div
            style={{
              fontFamily: SORA,
              fontWeight: 600,
              fontSize: 36,
              color: COLORS.white,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            They proved the market exists.
          </div>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 22,
              color: COLORS.muted,
              marginTop: 12,
            }}
          >
            Then left the most valuable position open.
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <CompetitorRow
            name="Hinge Health"
            raise="$6B peak valuation"
            proved="Patients engage with digital MSK"
            anim={r1}
          />
          <CompetitorRow
            name="Sword Health"
            raise="$2B valuation"
            proved="Clinician-adjacent model works"
            anim={r2}
          />
          <CompetitorRow
            name="Kaia Health"
            raise="$123M raised"
            proved="Smartphone AI is clinically valid"
            anim={r3}
          />
        </div>

        <div
          style={{
            marginTop: 32,
            background: "rgba(31,77,46,0.08)",
            border: "1px solid rgba(31,77,46,0.2)",
            borderRadius: 8,
            padding: "16px 20px",
            opacity: hlOpacity,
            boxShadow: `0 0 32px rgba(31,77,46,${hlGlow})`,
          }}
        >
          <div
            style={{
              fontFamily: DM,
              fontWeight: 500,
              fontSize: 15,
              color: COLORS.teal,
              lineHeight: 1.45,
            }}
          >
            They spent hundreds of millions proving our thesis. We just have to
            claim the layer they left behind.
          </div>
        </div>
      </div>
    </Layout>
  );
};

const CompetitorRow: React.FC<{
  name: string;
  raise: string;
  proved: string;
  anim: { opacity: number; ty: number };
}> = ({ name, raise, proved, anim }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 0",
      borderBottom: "0.5px solid rgba(13,13,13,0.06)",
      opacity: anim.opacity,
      transform: `translateY(${anim.ty}px)`,
      gap: 16,
    }}
  >
    <div
      style={{
        fontFamily: DM,
        fontWeight: 500,
        fontSize: 16,
        color: COLORS.mutedLight,
        flexShrink: 0,
        width: 150,
      }}
    >
      {name}
    </div>
    <div
      style={{
        fontFamily: DM,
        fontWeight: 400,
        fontSize: 14,
        color: "#9CA3AF",
        flex: 1,
      }}
    >
      {raise}
    </div>
    <div
      style={{
        fontFamily: DM,
        fontWeight: 400,
        fontSize: 14,
        color: COLORS.muted,
        textAlign: "right",
      }}
    >
      {proved}
    </div>
  </div>
);
