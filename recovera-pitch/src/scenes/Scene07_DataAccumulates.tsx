import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";
import { FounderPlaceholder } from "../components/FounderPlaceholder";
import { EASE_OUT_EXPO } from "../animations";

/**
 * SCENE 7 — The Dataset No Competitor Can Buy. 720 frames / 24s.
 *
 * Horizontal timeline. Four milestones animate in one by one (Year 1,
 * Year 2, Year 3, Year 5) with slide-up labels above each green dot.
 * After the final milestone, a 4-second hold — then a bold closing line
 * lands to seal the moat.
 */

type Milestone = {
  year: string;
  primary: string;
  secondary: string;
  /** position along the timeline, 0 (left) → 1 (right) */
  x: number;
};

const MILESTONES: Milestone[] = [
  { year: "Year 1", primary: "1,000 sessions", secondary: "3 clinics · 20 patients", x: 0.08 },
  { year: "Year 2", primary: "50,000 sessions", secondary: "100 clinics", x: 0.36 },
  { year: "Year 3", primary: "500,000 sessions", secondary: "1,000 clinics", x: 0.64 },
  { year: "Year 5", primary: "5M+ sessions", secondary: "The dataset no competitor can buy", x: 0.96 },
];

// Timing windows (local frame)
const HEADER_START = 0;
const TIMELINE_DRAW_START = 30;
const TIMELINE_DRAW_END = 110;
const MILESTONE_STARTS = [120, 210, 300, 390];
const FINAL_LINE_START = 510; // ~4s hold after last milestone lands (~frame 430)

export const Scene07_DataAccumulates: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header fades + slides up
  const headerOpacity = interpolate(frame, [HEADER_START, HEADER_START + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(frame, [HEADER_START, HEADER_START + 30], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  // Timeline draws left → right
  const timelineProgress = interpolate(
    frame,
    [TIMELINE_DRAW_START, TIMELINE_DRAW_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );

  // Final line slides up into view
  const finalOpacity = interpolate(frame, [FINAL_LINE_START, FINAL_LINE_START + 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const finalY = interpolate(frame, [FINAL_LINE_START, FINAL_LINE_START + 28], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

  // Geometry
  const TIMELINE_TOP_PCT = 52; // vertical position of the line
  const TIMELINE_LEFT_PCT = 6;
  const TIMELINE_RIGHT_PCT = 6;
  const usable = 100 - TIMELINE_LEFT_PCT - TIMELINE_RIGHT_PCT;

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          padding: "0 120px",
        }}
      >
        <div
          style={{
            fontFamily: SORA,
            fontWeight: 700,
            fontSize: 48,
            color: COLORS.ink,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
          }}
        >
          The dataset no competitor can buy.
        </div>
        <div
          style={{
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 20,
            color: COLORS.muted,
            marginTop: 14,
          }}
        >
          Recovera sessions processed over time.
        </div>
      </div>

      {/* Timeline */}
      <div
        style={{
          position: "absolute",
          top: `${TIMELINE_TOP_PCT}%`,
          left: `${TIMELINE_LEFT_PCT}%`,
          right: `${TIMELINE_RIGHT_PCT}%`,
          height: 2,
          background: COLORS.border,
          transform: `scaleX(${timelineProgress})`,
          transformOrigin: "left center",
        }}
      />

      {/* Milestones */}
      {MILESTONES.map((m, i) => {
        const start = MILESTONE_STARTS[i];
        const dotScale = spring({
          frame: frame - start,
          fps,
          config: { damping: 150, stiffness: 90 },
          from: 0,
          to: 1,
        });
        const labelOpacity = interpolate(frame, [start + 6, start + 30], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const labelY = interpolate(frame, [start + 6, start + 30], [22, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE_OUT_EXPO,
        });

        const xPct = TIMELINE_LEFT_PCT + m.x * usable;
        const isLast = i === MILESTONES.length - 1;

        return (
          <React.Fragment key={i}>
            {/* Dot */}
            <div
              style={{
                position: "absolute",
                top: `${TIMELINE_TOP_PCT}%`,
                left: `${xPct}%`,
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: COLORS.green,
                border: `3px solid ${COLORS.bg}`,
                boxSizing: "content-box",
                transform: `translate(-50%, -50%) scale(${dotScale})`,
                boxShadow: isLast
                  ? "0 0 0 6px rgba(31,77,46,0.12), 0 6px 18px rgba(31,77,46,0.25)"
                  : "0 4px 10px rgba(31,77,46,0.18)",
              }}
            />

            {/* Label block — above the dot */}
            <div
              style={{
                position: "absolute",
                top: `calc(${TIMELINE_TOP_PCT}% - 170px)`,
                left: `${xPct}%`,
                transform: `translate(-50%, ${labelY}px)`,
                opacity: labelOpacity,
                textAlign: "center",
                width: 340,
                marginLeft: -170,
              }}
            >
              <div
                style={{
                  fontFamily: SORA,
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.14em",
                  color: COLORS.green,
                  marginBottom: 10,
                }}
              >
                {m.year.toUpperCase()}
              </div>
              <div
                style={{
                  fontFamily: SORA,
                  fontWeight: 700,
                  fontSize: 32,
                  letterSpacing: "-0.02em",
                  color: COLORS.ink,
                  lineHeight: 1.1,
                }}
              >
                {m.primary}
              </div>
              <div
                style={{
                  fontFamily: DM,
                  fontWeight: 400,
                  fontSize: 16,
                  color: isLast ? COLORS.green : COLORS.muted,
                  marginTop: 8,
                  lineHeight: 1.35,
                }}
              >
                {m.secondary}
              </div>
            </div>

            {/* Tick line connecting dot to label */}
            <div
              style={{
                position: "absolute",
                top: `calc(${TIMELINE_TOP_PCT}% - 32px)`,
                left: `${xPct}%`,
                width: 1,
                height: 22,
                background: COLORS.border,
                opacity: labelOpacity,
                transform: "translateX(-50%)",
              }}
            />
          </React.Fragment>
        );
      })}

      {/* Final line */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 120px",
          opacity: finalOpacity,
          transform: `translateY(${finalY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: SORA,
            fontWeight: 700,
            fontSize: 44,
            color: COLORS.ink,
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
          }}
        >
          No amount of funding closes a{" "}
          <span style={{ color: COLORS.green }}>3-year data gap.</span>
        </div>
      </div>

      {/* PIP founder placeholder, unchanged */}
      <FounderPlaceholder mode="pip" />
    </AbsoluteFill>
  );
};
