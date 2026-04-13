import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, FONTS, SPRING_DEFAULT, SPRING_IMPACT } from "../theme";
import { IPhoneMockup } from "../components/IPhoneMockup";

const AI_TEXT =
  "Left knee valgus detected across 3 consecutive sessions. Load-dependent. Probable hip abductor deficit. Recommend activation test before progressing single-leg work.";

type StatTile = {
  label: string;
  value: string;
  color: "green" | "amber";
};

const STATS: StatTile[] = [
  { label: "Adherence", value: "82%", color: "green" },
  { label: "Pain trend", value: "↓ 4→2", color: "green" },
  { label: "Symmetry", value: "62%", color: "amber" },
  { label: "Sessions", value: "7 of 8", color: "green" },
];

/**
 * SCENE 05 — "THE MOMENT OF KNOWING" — 420 frames / 14s.
 * Clinician pre-session brief. Emotional centrepiece.
 */
export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone slides in
  const phoneProgress = spring({
    frame,
    fps,
    config: SPRING_DEFAULT,
    from: 0,
    to: 1,
  });
  const phoneY = interpolate(phoneProgress, [0, 1], [1000, 0]);
  const phoneOpacity = interpolate(phoneProgress, [0, 0.2, 1], [0, 1, 1]);

  // Stat tiles stagger after phone lands
  const STATS_START = 55;

  // AI reasoning begins after stats settle
  const AI_START = STATS_START + 60;
  const charsPerFrame = 0.5; // 1 character every 2 frames
  const totalChars = AI_TEXT.length;
  const shownChars = Math.floor(
    Math.max(0, (frame - AI_START) * charsPerFrame),
  );
  const typedText = AI_TEXT.slice(0, Math.min(shownChars, totalChars));

  // Green pulse dot — slow breathing
  const pulse = 0.6 + 0.4 * Math.sin(((frame - AI_START) / fps) * Math.PI);
  const pulseOpacity = frame >= AI_START ? pulse : 0;

  // Caption lines
  const CAPTION_START = AI_START + totalChars * 2 + 30;
  const captionOpacity = interpolate(
    frame,
    [CAPTION_START, CAPTION_START + 24],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const captionScale = spring({
    frame: frame - CAPTION_START,
    fps,
    config: SPRING_IMPACT,
    from: 0.92,
    to: 1,
  });
  const subcaptionOpacity = interpolate(
    frame,
    [CAPTION_START + 24, CAPTION_START + 48],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.white,
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: 90,
          transform: `translateY(${phoneY}px)`,
          opacity: phoneOpacity,
        }}
      >
        <IPhoneMockup width={620} height={1260}>
          <ClinicianBriefScreen
            statsStart={STATS_START}
            typedText={typedText}
            pulseOpacity={pulseOpacity}
            totalChars={totalChars}
            shownChars={shownChars}
          />
        </IPhoneMockup>
      </div>

      {/* Captions */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 72,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: -2.5,
            opacity: captionOpacity,
            transform: `scale(${captionScale})`,
            transformOrigin: "center",
          }}
        >
          She walks in knowing.
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 32,
            fontWeight: 400,
            color: COLORS.mid,
            marginTop: 18,
            opacity: subcaptionOpacity,
          }}
        >
          Not guessing.
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ClinicianBriefScreen: React.FC<{
  statsStart: number;
  typedText: string;
  pulseOpacity: number;
  totalChars: number;
  shownChars: number;
}> = ({ statsStart, typedText, pulseOpacity, totalChars, shownChars }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "68px 22px 22px 22px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        background: "#FAFAFA",
      }}
    >
      {/* Top wordmark + brief label */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 4px" }}>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: -0.3,
          }}
        >
          recovera
        </div>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: 2,
            color: COLORS.green,
          }}
        >
          PRE-SESSION BRIEF
        </div>
      </div>

      {/* Patient card */}
      <div
        style={{
          background: "#FFFFFF",
          border: `1px solid ${COLORS.subtle}`,
          padding: "18px 20px",
          marginTop: 16,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 20,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: -0.4,
          }}
        >
          Conor Murphy
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 14,
            fontWeight: 400,
            color: COLORS.mid,
            marginTop: 4,
          }}
        >
          ACL · Week 8 · Today 9:00am
        </div>
      </div>

      {/* 2x2 stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginTop: 14,
        }}
      >
        {STATS.map((s, i) => (
          <StatTileCmp key={i} tile={s} index={i} startFrame={statsStart} />
        ))}
      </div>

      {/* AI Insight card */}
      <div
        style={{
          background: "#FFFFFF",
          border: `1px solid ${COLORS.subtle}`,
          padding: "18px 20px",
          marginTop: 14,
          flex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: COLORS.green,
              opacity: pulseOpacity,
            }}
          />
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: 2,
              color: COLORS.green,
            }}
          >
            AI INSIGHT
          </div>
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 15,
            fontWeight: 400,
            color: COLORS.text,
            lineHeight: 1.45,
            letterSpacing: -0.1,
          }}
        >
          {typedText}
          {shownChars < totalChars && (
            <span style={{ opacity: (frame % 20) < 10 ? 1 : 0 }}>▍</span>
          )}
        </div>
      </div>
    </div>
  );
};

const StatTileCmp: React.FC<{
  tile: StatTile;
  index: number;
  startFrame: number;
}> = ({ tile, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({
    frame: frame - (startFrame + index * 6),
    fps,
    config: SPRING_IMPACT,
    from: 0,
    to: 1,
  });
  const scale = interpolate(s, [0, 1], [0.85, 1]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  const valueColor = tile.color === "green" ? COLORS.green : COLORS.amber;

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: `1px solid ${COLORS.subtle}`,
        padding: "16px 18px",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: 2,
          color: COLORS.mid,
        }}
      >
        {tile.label.toUpperCase()}
      </div>
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: 30,
          fontWeight: 700,
          color: valueColor,
          marginTop: 6,
          letterSpacing: -0.8,
        }}
      >
        {tile.value}
      </div>
    </div>
  );
};
