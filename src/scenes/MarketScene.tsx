import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { COLORS, FONTS } from "../theme";

export const MarketScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const marketScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const marketOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const tagOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [40, 55], [20, 0], {
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [100, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontFamily: FONTS.heading,
            fontWeight: 800,
            color: COLORS.tealLight,
            opacity: marketOpacity,
            transform: `scale(${marketScale})`,
            letterSpacing: "-3px",
          }}
        >
          &euro;500B+
        </div>
        <div
          style={{
            fontSize: 24,
            fontFamily: FONTS.body,
            color: COLORS.white,
            opacity: marketOpacity,
            fontWeight: 300,
            letterSpacing: "1px",
          }}
        >
          global movement health market
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 30,
            fontFamily: FONTS.heading,
            fontWeight: 500,
            color: COLORS.white,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          No system of record.{" "}
          <span style={{ color: COLORS.tealLight, fontWeight: 700 }}>
            Until now.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
