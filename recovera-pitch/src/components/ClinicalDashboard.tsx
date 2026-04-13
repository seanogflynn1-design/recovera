import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";

/**
 * Clinical dashboard — the centrepiece product mockup.
 *
 * `startFrame` is the absolute frame (relative to the scene it sits in)
 * at which the row stagger begins. When embedded inside a Sequence, pass
 * the local frame offset.
 */
type Props = {
  /** Frame at which row animation should start (local to scene). */
  rowStartFrame: number;
  /** When true, compress paddings for the small-screen montage in Scene 10. */
  compact?: boolean;
};

export const ClinicalDashboard: React.FC<Props> = ({
  rowStartFrame,
  compact = false,
}) => {
  const frame = useCurrentFrame();

  const rowAnim = (idx: number) => {
    const start = rowStartFrame + idx * 30;
    const opacity = interpolate(frame, [start, start + 22], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const ty = interpolate(frame, [start, start + 22], [12, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { opacity, ty, start };
  };

  const row1 = rowAnim(0);
  const row2 = rowAnim(1);
  const row3 = rowAnim(2);
  const row4 = rowAnim(3);

  // Row 1 critical flash — briefly hot-red on entry
  const row1Flash = interpolate(
    frame,
    [row1.start, row1.start + 10, row1.start + 25],
    [0, 0.14, 0.06],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Row 2 progress bar fill 0 → 82
  const row2Fill = interpolate(
    frame,
    [row2.start, row2.start + 30],
    [0, 82],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Row 4 ring progress 0 → 81
  const row4Ring = interpolate(
    frame,
    [row4.start, row4.start + 30],
    [0, 81],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const ringCircumference = 2 * Math.PI * 18;
  const ringDash = (row4Ring / 100) * ringCircumference;

  const px = compact ? 0.75 : 1;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top nav */}
      <div
        style={{
          height: 52 * px,
          background: "#FFFFFF",
          borderBottom: "1px solid rgba(13,13,13,0.06)",
          padding: `0 ${24 * px}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: SORA,
            fontWeight: 600,
            fontSize: 16 * px,
            color: COLORS.teal,
            letterSpacing: "0.12em",
          }}
        >
          RECOVERA
        </div>
        <div
          style={{
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 13 * px,
            color: COLORS.muted,
          }}
        >
          Pre-session Brief · Auto-generated 4 mins ago
        </div>
      </div>

      {/* Patient header */}
      <div
        style={{
          padding: `${20 * px}px ${24 * px}px`,
          borderBottom: "1px solid rgba(13,13,13,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: SORA,
              fontWeight: 600,
              fontSize: 20 * px,
              color: COLORS.white,
            }}
          >
            Conor Murphy
          </div>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 14 * px,
              color: COLORS.muted,
              marginTop: 4,
            }}
          >
            ACL Reconstruction · Week 8 of 16
          </div>
        </div>
        <div
          style={{
            background: COLORS.green,
            color: "#FFFFFF",
            borderRadius: 6,
            padding: "6px 12px",
            fontFamily: DM,
            fontWeight: 600,
            fontSize: 12 * px,
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#FFFFFF",
              display: "inline-block",
            }}
          />
          READY FOR SESSION
        </div>
      </div>

      {/* Row 1 — CRITICAL */}
      <DashRow
        opacity={row1.opacity}
        ty={row1.ty}
        background={`rgba(185,28,28,${0.06 + row1Flash})`}
      >
        <IconCircle color={COLORS.red} bg="rgba(185,28,28,0.2)" px={px}>
          ⚠
        </IconCircle>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 500,
              fontSize: 15 * px,
              color: COLORS.white,
            }}
          >
            Left knee valgus — 3 consecutive sessions
          </div>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 13 * px,
              color: COLORS.mutedLight,
              marginTop: 4,
            }}
          >
            Present from rep 1, not rep 8 — load-dependent, not fatigue
          </div>
        </div>
        <Badge bg="rgba(185,28,28,0.15)" color={COLORS.red} px={px}>
          REVIEW BEFORE SESSION
        </Badge>
      </DashRow>

      {/* Row 2 — ADHERENCE */}
      <DashRow opacity={row2.opacity} ty={row2.ty}>
        <IconCircle color={COLORS.green} bg="rgba(15,107,62,0.18)" px={px}>
          ✓
        </IconCircle>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 500,
              fontSize: 15 * px,
              color: COLORS.white,
            }}
          >
            Adherence: 82% · 4 of 5 sessions completed
          </div>
          <div
            style={{
              width: 240 * px,
              height: 4,
              background: "rgba(13,13,13,0.08)",
              borderRadius: 2,
              marginTop: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${row2Fill}%`,
                height: "100%",
                background: COLORS.green,
              }}
            />
          </div>
        </div>
        <div
          style={{
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 13 * px,
            color: COLORS.green,
          }}
        >
          +3% vs last week
        </div>
      </DashRow>

      {/* Row 3 — PAIN */}
      <DashRow opacity={row3.opacity} ty={row3.ty}>
        <IconCircle color={COLORS.teal} bg="rgba(31,77,46,0.12)" px={px}>
          ↘
        </IconCircle>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 500,
              fontSize: 15 * px,
              color: COLORS.white,
            }}
          >
            Pain score trending down
          </div>
          <svg
            viewBox="0 0 120 30"
            width={120 * px}
            height={30 * px}
            style={{ marginTop: 4 }}
          >
            <path
              d="M 0 25 L 30 20 L 60 18 L 90 12 L 120 6 L 120 30 L 0 30 Z"
              fill="rgba(31,77,46,0.1)"
            />
            <polyline
              points="0,25 30,20 60,18 90,12 120,6"
              stroke={COLORS.teal}
              strokeWidth={2}
              fill="none"
            />
          </svg>
        </div>
        <div
          style={{
            fontFamily: DM,
            fontWeight: 500,
            fontSize: 15 * px,
            color: COLORS.teal,
          }}
        >
          4.2 → 2.1
        </div>
      </DashRow>

      {/* Row 4 — MOVEMENT SCORE */}
      <DashRow opacity={row4.opacity} ty={row4.ty}>
        <div
          style={{
            width: 32 * px,
            height: 32 * px,
            background: "rgba(31,77,46,0.12)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: SORA,
            fontWeight: 600,
            fontSize: 13 * px,
            color: COLORS.teal,
          }}
        >
          71
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 500,
              fontSize: 15 * px,
              color: COLORS.white,
            }}
          >
            Movement Score: 71 / 100
          </div>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 13 * px,
              color: COLORS.teal,
              marginTop: 4,
            }}
          >
            +8 this week
          </div>
        </div>
        <svg width={44 * px} height={44 * px} viewBox="0 0 44 44">
          <circle
            cx={22}
            cy={22}
            r={18}
            fill="none"
            stroke="rgba(13,13,13,0.08)"
            strokeWidth={3}
          />
          <circle
            cx={22}
            cy={22}
            r={18}
            fill="none"
            stroke={COLORS.teal}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={`${ringDash} ${ringCircumference}`}
            transform="rotate(-90 22 22)"
          />
        </svg>
      </DashRow>

      {/* AI suggestion bar — typewriter reveal */}
      {(() => {
        const AI_TEXT =
          "Before progressing to bilateral loading, consider testing hip abductor activation — pattern is consistent with hip compensation, not quad weakness.";
        const AI_START = rowStartFrame + 140;
        const barOpacity = interpolate(frame, [AI_START, AI_START + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        // 1 char every 2 frames
        const shownChars = Math.max(0, Math.floor((frame - AI_START - 10) / 2));
        const typed = AI_TEXT.slice(0, Math.min(shownChars, AI_TEXT.length));
        const caretOn = shownChars < AI_TEXT.length && (frame % 20) < 10;
        return (
          <div
            style={{
              background: "rgba(31,77,46,0.06)",
              borderTop: "1px solid rgba(31,77,46,0.15)",
              padding: `${14 * px}px ${24 * px}px`,
              display: "flex",
              gap: 12 * px,
              alignItems: "flex-start",
              opacity: barOpacity,
              marginTop: "auto",
            }}
          >
            <div
              style={{
                color: COLORS.green,
                fontSize: 16 * px,
                fontFamily: SORA,
                lineHeight: 1,
                paddingTop: 2,
              }}
            >
              ✦
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: SORA,
                  fontWeight: 600,
                  fontSize: 11 * px,
                  letterSpacing: "0.12em",
                  color: COLORS.green,
                  marginBottom: 6,
                }}
              >
                AI INSIGHT
              </div>
              <div
                style={{
                  fontFamily: DM,
                  fontWeight: 400,
                  fontSize: 13 * px,
                  color: COLORS.ink,
                  lineHeight: 1.5,
                  minHeight: `${Math.round(13 * px * 1.5 * 3)}px`,
                }}
              >
                {typed}
                {caretOn && (
                  <span style={{ color: COLORS.green, marginLeft: 1 }}>▍</span>
                )}
              </div>
              <div
                style={{
                  fontFamily: DM,
                  fontWeight: 400,
                  fontSize: 12 * px,
                  color: "rgba(31,77,46,0.6)",
                  marginTop: 8,
                }}
              >
                Week 8 ACL data across 847 similar patients
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

const DashRow: React.FC<{
  opacity: number;
  ty: number;
  background?: string;
  children: React.ReactNode;
}> = ({ opacity, ty, background, children }) => (
  <div
    style={{
      padding: "16px 24px",
      borderBottom: "1px solid rgba(13,13,13,0.04)",
      display: "flex",
      alignItems: "center",
      gap: 16,
      opacity,
      transform: `translateY(${ty}px)`,
      background,
    }}
  >
    {children}
  </div>
);

const IconCircle: React.FC<{
  color: string;
  bg: string;
  children: React.ReactNode;
  px?: number;
}> = ({ color, bg, children, px = 1 }) => (
  <div
    style={{
      width: 28 * px,
      height: 28 * px,
      minWidth: 28 * px,
      background: bg,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color,
      fontSize: 13 * px,
      fontFamily: DM,
      fontWeight: 500,
    }}
  >
    {children}
  </div>
);

const Badge: React.FC<{
  bg: string;
  color: string;
  px?: number;
  children: React.ReactNode;
}> = ({ bg, color, px = 1, children }) => (
  <div
    style={{
      background: bg,
      color,
      borderRadius: 4,
      padding: "3px 8px",
      fontFamily: DM,
      fontWeight: 500,
      fontSize: 11 * px,
    }}
  >
    {children}
  </div>
);
