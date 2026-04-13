import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants";
import { DM, SORA } from "../fonts";

/**
 * END CARD — frames 4860–5040 (local 0–180).
 *
 * Pure near-black background. Vertical stack with elements appearing every 20 frames.
 * Fade to black over the last 30 frames.
 */
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();

  const name = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const underline = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagline = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const divider = interpolate(frame, [65, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contact = interpolate(frame, [85, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const credit = interpolate(frame, [105, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hold the full card for a long beat, then fade to the page color
  // across the last 30 frames of the card's 270-frame run.
  const fadeOut = interpolate(frame, [240, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, opacity: fadeOut }}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          textAlign: "center",
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            fontFamily: SORA,
            fontWeight: 700,
            fontSize: 96,
            color: COLORS.white,
            letterSpacing: "0.18em",
            opacity: name,
          }}
        >
          RECOVERA
        </div>

        {/* Teal underline — 280px wide, scaleX 0→1 */}
        <div
          style={{
            height: 2,
            width: 280,
            background: COLORS.teal,
            marginTop: 12,
            transform: `scaleX(${underline})`,
            transformOrigin: "left",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            marginTop: 28,
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 20,
            color: COLORS.muted,
            opacity: tagline,
          }}
        >
          The intelligence layer for the global movement economy.
        </div>

        {/* Divider */}
        <div
          style={{
            marginTop: 48,
            width: 720,
            height: 1,
            background: "rgba(13,13,13,0.08)",
            opacity: divider,
          }}
        />

        {/* Contact */}
        <div
          style={{
            marginTop: 24,
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 16,
            color: COLORS.teal,
            opacity: contact,
          }}
        >
          recovera.io&nbsp;&nbsp;·&nbsp;&nbsp;sean@recovera.io
        </div>

        {/* Credit */}
        <div
          style={{
            marginTop: 10,
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 13,
            color: "#9CA3AF",
            opacity: credit,
          }}
        >
          UCD Engineering&nbsp;&nbsp;·&nbsp;&nbsp;NovaUCD Student Enterprise Competition 2026
        </div>
      </div>
    </AbsoluteFill>
  );
};
