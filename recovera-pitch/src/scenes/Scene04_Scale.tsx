import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";
import { Layout } from "../components/Layout";

/**
 * SCENE 4 — Scale of the Problem. 630 frames / 21s.
 *
 * A running counter of minutes wasted on reassessment today, globally.
 * Baseline 43,200,000 (minutes burned through the morning), ticks at
 * ~1,000 per real second (+33.33 per frame). Freezes at local 240
 * (~8s in), then transitions to red over the next 20 frames and the
 * three stats slide up beneath.
 */
export const Scene04_Scale: React.FC = () => {
  const frame = useCurrentFrame();

  const counterFreezeFrame = 240;
  const shownFrame = Math.min(frame, counterFreezeFrame);
  // Baseline + 1000/sec = +33.333/frame @ 30fps
  const count = Math.floor(43_200_000 + shownFrame * (1000 / 30));
  const formatted = new Intl.NumberFormat("en-IE").format(count);

  // Red mix after freeze
  const redMix = interpolate(
    frame,
    [counterFreezeFrame, counterFreezeFrame + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const counterColor = mixHex(COLORS.white, COLORS.red, redMix);

  // Top label fades in at local 0
  const labelOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Every minute you watch: +86,400" at local 120
  const sublineOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stats begin at counter-freeze + 30 frames
  const statStart = counterFreezeFrame + 30;
  const statAnim = (i: number) => {
    const s = statStart + i * 20;
    return {
      opacity: interpolate(frame, [s, s + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      ty: interpolate(frame, [s, s + 20], [14, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    };
  };

  const s1 = statAnim(0);
  const s2 = statAnim(1);
  const s3 = statAnim(2);

  return (
    <Layout mode="split">
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {/* Labels */}
        <div style={{ textAlign: "center", opacity: labelOpacity }}>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 18,
              color: COLORS.muted,
            }}
          >
            Minutes wasted on reassessment
          </div>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 14,
              color: "#9CA3AF",
              marginTop: 8,
            }}
          >
            right now, globally, today
          </div>
        </div>

        {/* Counter */}
        <div
          style={{
            fontFamily: SORA,
            fontWeight: 800,
            fontSize: 104,
            color: counterColor,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.035em",
            lineHeight: 1,
          }}
        >
          {formatted}
        </div>

        {/* Subline */}
        <div
          style={{
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 14,
            color: COLORS.red,
            opacity: sublineOpacity,
          }}
        >
          Every minute you watch this video: +60,000 minutes wasted
        </div>

        {/* Three stats */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            marginTop: 24,
            width: "100%",
            maxWidth: 560,
          }}
        >
          <Stat
            number="€70"
            label="per session, 18 minutes lost to catch-up"
            color={COLORS.white}
            opacity={s1.opacity}
            ty={s1.ty}
          />
          <Stat
            number="58%"
            label="patient adherence without monitoring"
            color={COLORS.white}
            opacity={s2.opacity}
            ty={s2.ty}
          />
          <Stat
            number="0"
            label="objective data points between sessions"
            color={COLORS.red}
            opacity={s3.opacity}
            ty={s3.ty}
          />
        </div>
      </div>
    </Layout>
  );
};

const Stat: React.FC<{
  number: string;
  label: string;
  color: string;
  opacity: number;
  ty: number;
}> = ({ number, label, color, opacity, ty }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      opacity,
      transform: `translateY(${ty}px)`,
    }}
  >
    <div
      style={{
        width: 3,
        height: 48,
        background: COLORS.teal,
      }}
    />
    <div style={{ fontFamily: SORA, fontWeight: 600, fontSize: 32, color }}>
      {number}
    </div>
    <div style={{ fontFamily: DM, fontWeight: 400, fontSize: 15, color: COLORS.muted }}>
      {label}
    </div>
  </div>
);

function mixHex(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ar = (pa >> 16) & 0xff;
  const ag = (pa >> 8) & 0xff;
  const ab = pa & 0xff;
  const br = (pb >> 16) & 0xff;
  const bg = (pb >> 8) & 0xff;
  const bb = pb & 0xff;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}
