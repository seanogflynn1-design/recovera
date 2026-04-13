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
import { IPhoneMockup } from "../components/IPhoneMockup";
import { StickFigureSquat } from "../components/StickFigureSquat";
import { MetricBar } from "../components/MetricBar";

/**
 * SCENE 04 — "THE PATIENT AT HOME" — 360 frames / 12s.
 * iPhone slides in from bottom with spring. Inside: patient recovery app UI
 * with animated stick figure squat and three animated metric bars.
 */
export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone entrance — spring from bottom (0–45 frames)
  const phoneProgress = spring({
    frame,
    fps,
    config: SPRING_DEFAULT,
    from: 0,
    to: 1,
  });
  const phoneY = interpolate(phoneProgress, [0, 1], [1000, 0]);
  const phoneOpacity = interpolate(phoneProgress, [0, 0.2, 1], [0, 1, 1]);

  // Metric bars start after phone lands
  const BARS_START = 60;
  const bar1Start = BARS_START;
  const bar2Start = BARS_START + 20;
  const bar3Start = BARS_START + 40;

  // Caption below phone
  const CAPTION_START = 240;
  const captionOpacity = interpolate(
    frame,
    [CAPTION_START, CAPTION_START + 24],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const captionY = interpolate(
    frame,
    [CAPTION_START, CAPTION_START + 24],
    [20, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

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
      {/* Phone */}
      <div
        style={{
          marginTop: 120,
          transform: `translateY(${phoneY}px)`,
          opacity: phoneOpacity,
        }}
      >
        <IPhoneMockup width={600} height={1230}>
          <PatientAppScreen
            bar1Start={bar1Start}
            bar2Start={bar2Start}
            bar3Start={bar3Start}
          />
        </IPhoneMockup>
      </div>

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: -2,
            opacity: captionOpacity,
            transform: `translateY(${captionY}px)`,
          }}
        >
          Every rep. Tracked. Analysed.
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
          Without a wearable.
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PatientAppScreen: React.FC<{
  bar1Start: number;
  bar2Start: number;
  bar3Start: number;
}> = ({ bar1Start, bar2Start, bar3Start }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "68px 28px 28px 28px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        background: "#FFFFFF",
      }}
    >
      {/* Dark header bar */}
      <div
        style={{
          background: "#0A0A0A",
          color: "#FFFFFF",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: -0.3,
          }}
        >
          recovera
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 14,
            fontWeight: 400,
            opacity: 0.8,
          }}
        >
          Conor Murphy
        </div>
      </div>

      {/* Session card */}
      <div
        style={{
          background: "#FFFFFF",
          border: `1px solid ${COLORS.subtle}`,
          padding: "20px 22px",
          marginTop: 18,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: 2,
            color: COLORS.green,
            marginBottom: 8,
          }}
        >
          TODAY · SESSION
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: -0.6,
          }}
        >
          Session 4 of 8 — ACL Recovery
        </div>
      </div>

      {/* Stick figure area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 0",
        }}
      >
        <StickFigureSquat size={220} />
      </div>

      {/* Metric bars */}
      <div style={{ paddingTop: 8 }}>
        <MetricBar
          label="Left knee alignment"
          value={78}
          color="green"
          startFrame={bar1Start}
          barWidth={520}
        />
        <MetricBar
          label="Hip symmetry"
          value={42}
          color="amber"
          startFrame={bar2Start}
          flagPulse
          barWidth={520}
        />
        <MetricBar
          label="Form quality"
          value={71}
          color="green"
          startFrame={bar3Start}
          barWidth={520}
        />
      </div>
    </div>
  );
};
