import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { COLORS, FONTS } from "../theme";

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [5, 25], [40, 0], {
    extrapolateRight: "clamp",
  });

  // Subtitle
  const subOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [35, 55], [30, 0], {
    extrapolateRight: "clamp",
  });

  // Flow diagram
  const flowOpacity = interpolate(frame, [65, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  const phoneScale = spring({
    frame: frame - 70,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const arrowWidth1 = interpolate(frame, [85, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const engineScale = spring({
    frame: frame - 95,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const arrowWidth2 = interpolate(frame, [110, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const clinicianScale = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
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
          gap: 16,
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontSize: 46,
            fontFamily: FONTS.heading,
            fontWeight: 700,
            color: COLORS.text,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
          }}
        >
          One AI engine.{" "}
          <span style={{ color: COLORS.teal }}>Every movement profession.</span>
        </div>

        <div
          style={{
            fontSize: 28,
            fontFamily: FONTS.body,
            fontWeight: 400,
            color: COLORS.textLight,
            textAlign: "center",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            marginBottom: 20,
          }}
        >
          Through the clinician, not around them.
        </div>

        {/* Flow diagram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            opacity: flowOpacity,
            marginTop: 20,
          }}
        >
          {/* Phone */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `scale(${phoneScale})`,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                backgroundColor: COLORS.accent,
                border: `2px solid ${COLORS.teal}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <rect
                  x="5"
                  y="2"
                  width="14"
                  height="20"
                  rx="2"
                  stroke={COLORS.teal}
                  strokeWidth="2"
                />
                <circle cx="12" cy="18" r="1" fill={COLORS.teal} />
              </svg>
            </div>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textLight,
                marginTop: 10,
                fontFamily: FONTS.body,
                fontWeight: 500,
              }}
            >
              Any Camera
            </div>
          </div>

          {/* Arrow 1 */}
          <div
            style={{
              width: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: 2,
                backgroundColor: COLORS.teal,
                width: `${arrowWidth1 * 60}px`,
              }}
            />
          </div>

          {/* Engine */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `scale(${engineScale})`,
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 8px 32px ${COLORS.tealGlow}`,
              }}
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
            <div
              style={{
                fontSize: 14,
                color: COLORS.teal,
                marginTop: 10,
                fontFamily: FONTS.body,
                fontWeight: 700,
              }}
            >
              AI Engine
            </div>
          </div>

          {/* Arrow 2 */}
          <div
            style={{
              width: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: 2,
                backgroundColor: COLORS.teal,
                width: `${arrowWidth2 * 60}px`,
              }}
            />
          </div>

          {/* Clinician */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `scale(${clinicianScale})`,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                backgroundColor: COLORS.accent,
                border: `2px solid ${COLORS.teal}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  stroke={COLORS.teal}
                  strokeWidth="2"
                />
                <path
                  d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
                  stroke={COLORS.teal}
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textLight,
                marginTop: 10,
                fontFamily: FONTS.body,
                fontWeight: 500,
              }}
            >
              Clinician
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
