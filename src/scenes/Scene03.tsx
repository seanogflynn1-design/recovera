import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { COLORS, FONTS, SPRING_DEFAULT } from "../theme";

type RowSpec = {
  emoji: string;
  discipline: string;
  tool: string;
  status: "MONITORED" | "INVISIBLE";
};

const ROWS: RowSpec[] = [
  { emoji: "🫀", discipline: "Cardiology", tool: "Holter Monitor", status: "MONITORED" },
  { emoji: "🩸", discipline: "Diabetes", tool: "Glucose Sensor", status: "MONITORED" },
  { emoji: "🦴", discipline: "Movement Health", tool: "—", status: "INVISIBLE" },
];

const Row: React.FC<{ row: RowSpec; startFrame: number }> = ({ row, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: frame - startFrame,
    fps,
    config: SPRING_DEFAULT,
    from: 0,
    to: 1,
  });
  const translateX = interpolate(s, [0, 1], [200, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  const isInvisible = row.status === "INVISIBLE";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 36,
        padding: "32px 0",
        borderBottom: `1px solid ${COLORS.subtle}`,
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div style={{ fontSize: 80, lineHeight: 1, width: 110 }}>{row.emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 42,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: -1,
          }}
        >
          {row.discipline}
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 26,
            fontWeight: 400,
            color: COLORS.mid,
            marginTop: 4,
          }}
        >
          {row.tool}
        </div>
      </div>
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: 2,
          padding: "10px 18px",
          color: "#FFFFFF",
          background: isInvisible ? COLORS.amber : COLORS.green,
          whiteSpace: "nowrap",
        }}
      >
        {row.status}
      </div>
    </div>
  );
};

/**
 * SCENE 03 — "THE INDUSTRY SHAME" — 270 frames / 9s.
 */
export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();

  const ROW_STAGGER = 12; // 0.4s
  const FLASH_FRAME = ROW_STAGGER * 2 + 36; // after all three rows resolved
  const flashOpacity = interpolate(
    frame,
    [FLASH_FRAME, FLASH_FRAME + 1.5, FLASH_FRAME + 3],
    [0, 0.08, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const HEADLINE_START = FLASH_FRAME + 12;
  const SUBLINE_START = HEADLINE_START + 20;

  const headlineOpacity = interpolate(
    frame,
    [HEADLINE_START, HEADLINE_START + 24],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const headlineY = interpolate(
    frame,
    [HEADLINE_START, HEADLINE_START + 24],
    [18, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  const sublineOpacity = interpolate(
    frame,
    [SUBLINE_START, SUBLINE_START + 24],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const sublineY = interpolate(
    frame,
    [SUBLINE_START, SUBLINE_START + 24],
    [18, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  // Section label fade-in at start
  const labelOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.white }}>
      <div style={{ padding: "220px 80px 0 80px" }}>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 6,
            color: COLORS.green,
            opacity: labelOpacity,
            marginBottom: 80,
          }}
        >
          A PATTERN
        </div>

        {ROWS.map((row, i) => (
          <Row key={i} row={row} startFrame={i * ROW_STAGGER} />
        ))}

        <div style={{ marginTop: 100 }}>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 62,
              fontWeight: 700,
              letterSpacing: -2,
              color: COLORS.text,
              lineHeight: 1.1,
              opacity: headlineOpacity,
              transform: `translateY(${headlineY}px)`,
            }}
          >
            Every other discipline
            <br />
            solved this.
          </div>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 34,
              fontWeight: 400,
              color: COLORS.mid,
              marginTop: 24,
              opacity: sublineOpacity,
              transform: `translateY(${sublineY}px)`,
            }}
          >
            Movement health never did.
          </div>
        </div>
      </div>

      {/* Amber flash */}
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.amber,
          opacity: flashOpacity,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
