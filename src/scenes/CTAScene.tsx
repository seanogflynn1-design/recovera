import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { COLORS, FONTS } from "../theme";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 60 },
  });

  const logoOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Tagline
  const tagOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [30, 50], [15, 0], {
    extrapolateRight: "clamp",
  });

  // Teal line under logo
  const lineWidth = spring({
    frame: frame - 20,
    fps,
    config: { damping: 30, stiffness: 60 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* R mark */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              boxShadow: `0 12px 40px rgba(13, 148, 136, 0.3)`,
            }}
          >
            <span
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.white,
                fontFamily: FONTS.heading,
              }}
            >
              R
            </span>
          </div>

          <div
            style={{
              fontSize: 56,
              fontFamily: FONTS.heading,
              fontWeight: 700,
              color: COLORS.white,
              letterSpacing: "8px",
              textTransform: "uppercase",
            }}
          >
            RECOVERA
          </div>
        </div>

        {/* Teal line */}
        <div
          style={{
            width: `${lineWidth * 200}px`,
            height: 2,
            backgroundColor: COLORS.teal,
            marginTop: 4,
            marginBottom: 8,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            fontFamily: FONTS.body,
            fontWeight: 300,
            color: COLORS.textLight,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          The intelligence layer for the movement economy
        </div>
      </div>
    </AbsoluteFill>
  );
};
