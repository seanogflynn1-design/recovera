import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";
import { Layout } from "../components/Layout";
import { EASE_OUT_EXPO } from "../animations";

/**
 * NEW SCENE — The Wedge. 420 frames (14s).
 *
 * "We start with one clinic. One physio. One outcome: they cannot imagine
 *  going back. That proof point unlocks everything."
 *
 * Five lines reveal on a slow cadence with a very long hold at the end —
 * the viewer should feel the strategy land, not just read it.
 */
export const SceneWedge: React.FC = () => {
  const frame = useCurrentFrame();

  // Label at the top of the panel — quiet, contextual
  const LABEL_START = 10;
  const labelOpacity = interpolate(frame, [LABEL_START, LABEL_START + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // The five beats — staggered for emphasis
  const L1_START = 40;   // "We start with"
  const L2_START = 80;   // "one clinic."
  const L3_START = 140;  // "One physio."
  const L4_START = 200;  // "One outcome:"
  const L5_START = 240;  // "they cannot imagine going back."
  const L6_START = 340;  // "That proof point unlocks everything."
  // Frame 370+ = 50-frame (1.7s) final hold

  return (
    <Layout mode="split">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 8px",
          position: "relative",
        }}
      >
        {/* Top label */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            fontFamily: SORA,
            fontWeight: 600,
            fontSize: 13,
            color: COLORS.green,
            letterSpacing: "0.12em",
            opacity: labelOpacity,
          }}
        >
          THE WEDGE
        </div>

        <LineRise
          frame={frame}
          start={L1_START}
          size={24}
          weight={400}
          color={COLORS.muted}
          family={DM}
        >
          We start with
        </LineRise>

        <LineRise
          frame={frame}
          start={L2_START}
          size={72}
          weight={700}
          color={COLORS.ink}
          family={SORA}
          tight
        >
          one clinic.
        </LineRise>

        <LineRise
          frame={frame}
          start={L3_START}
          size={72}
          weight={700}
          color={COLORS.ink}
          family={SORA}
          tight
        >
          One physio.
        </LineRise>

        <div style={{ height: 12 }} />

        <LineRise
          frame={frame}
          start={L4_START}
          size={24}
          weight={400}
          color={COLORS.muted}
          family={DM}
        >
          One outcome:
        </LineRise>

        <LineRise
          frame={frame}
          start={L5_START}
          size={56}
          weight={700}
          color={COLORS.green}
          family={SORA}
          italic
          tight
        >
          they cannot imagine going back.
        </LineRise>

        <div style={{ height: 36 }} />

        {/* Thin green rule draws in right before the closing line */}
        <Rule start={L6_START - 20} />

        <LineRise
          frame={frame}
          start={L6_START}
          size={22}
          weight={500}
          color={COLORS.inkSoft}
          family={DM}
        >
          That proof point unlocks everything.
        </LineRise>
      </div>
    </Layout>
  );
};

const LineRise: React.FC<{
  frame: number;
  start: number;
  size: number;
  weight: number;
  color: string;
  family: string;
  italic?: boolean;
  tight?: boolean;
  children: React.ReactNode;
}> = ({ frame, start, size, weight, color, family, italic, tight, children }) => {
  const opacity = interpolate(frame, [start, start + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ty = interpolate(frame, [start, start + 22], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });
  return (
    <div
      style={{
        fontFamily: family,
        fontSize: size,
        fontWeight: weight,
        fontStyle: italic ? "italic" : "normal",
        color,
        letterSpacing: tight ? "-0.025em" : "0",
        lineHeight: 1.15,
        opacity,
        transform: `translateY(${ty}px)`,
        marginBottom: 4,
      }}
    >
      {children}
    </div>
  );
};

const Rule: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [start, start + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <div
      style={{
        height: 1,
        background: COLORS.green,
        width: `${progress * 60}%`,
        marginBottom: 20,
      }}
    />
  );
};
