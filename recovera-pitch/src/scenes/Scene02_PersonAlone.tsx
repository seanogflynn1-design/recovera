import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants";
import { DM } from "../fonts";

/**
 * SCENE 2 — The Person Alone. Frames 540–960 (local 0–420).
 *
 * Stick figure doing a slow squat at home at night. Recovera overlays
 * materialise around her in the last third.
 */
export const Scene02_PersonAlone: React.FC = () => {
  // `frame` here is local-to-sequence (0 at scene start), but spec uses
  // absolute frame numbers. We adjust so the animation reads "naturally".
  const frame = useCurrentFrame();

  // ---- Squat motion, driven by sine ----
  // Spec: one full rep ~ every 50 frames, starting from frame 540 absolute.
  // Locally that's a direct offset.
  const t = Math.sin(frame * 0.06); // -1 .. 1
  const squat = (t + 1) / 2; // 0 standing, 1 deep squat

  // Joint positions, interpolating between standing and squat.
  const hipY = interpolate(squat, [0, 1], [600, 650]);
  const leftKneeX = interpolate(squat, [0, 1], [920, 880]);
  const leftKneeY = interpolate(squat, [0, 1], [690, 680]);
  const rightKneeX = interpolate(squat, [0, 1], [1000, 1040]);
  const rightKneeY = interpolate(squat, [0, 1], [690, 680]);
  const torsoTilt = interpolate(squat, [0, 1], [0, 6]); // degrees forward

  // Joint styles
  const strokeCol = "rgba(13,13,13,0.35)";
  const jointCol = "rgba(13,13,13,0.3)";
  const limbW = 3;

  // ---- Overlay timings (local = absolute - 540) ----
  // Spec absolute 700 → local 160
  const caption1Opacity = interpolate(frame, [160, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const caption1FadeOut = interpolate(frame, [320, 360], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Overlays materialise at absolute 860 → local 320
  const overlayStart = 320;
  const overlayOpacity = interpolate(
    frame,
    [overlayStart, overlayStart + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Second caption at absolute 900 → local 360
  const caption2Opacity = interpolate(frame, [360, 390], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progressFillWidth = interpolate(
    frame,
    [overlayStart, overlayStart + 30],
    [0, 0.65],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Room SVG — 1920x1080 */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Back wall */}
        <rect x={0} y={0} width={1920} height={780} fill={COLORS.bg} />
        {/* Floor line */}
        <line
          x1={0}
          y1={780}
          x2={1920}
          y2={780}
          stroke="rgba(13,13,13,0.06)"
          strokeWidth={1}
        />
        {/* Window — moonlight suggestion */}
        <rect
          x={1400}
          y={120}
          width={220}
          height={300}
          fill="rgba(13,13,13,0.02)"
          stroke="rgba(13,13,13,0.05)"
          strokeWidth={1}
        />
        {/* Mat on the floor */}
        <rect
          x={700}
          y={720}
          width={500}
          height={60}
          rx={4}
          fill="rgba(13,13,13,0.04)"
          stroke="rgba(13,13,13,0.06)"
        />

        {/* Figure — torso tilts slightly forward as the hips drop */}
        <g transform={`rotate(${torsoTilt} 960 ${hipY})`}>
          {/* Head */}
          <circle
            cx={960}
            cy={380}
            r={28}
            fill="none"
            stroke="rgba(13,13,13,0.5)"
            strokeWidth={2}
          />
          {/* Neck */}
          <line x1={960} y1={408} x2={960} y2={450} stroke={strokeCol} strokeWidth={limbW} strokeLinecap="round" />
          {/* Shoulders */}
          <line x1={900} y1={450} x2={1020} y2={450} stroke={strokeCol} strokeWidth={limbW} strokeLinecap="round" />
          {/* Torso */}
          <line x1={960} y1={450} x2={960} y2={hipY} stroke={strokeCol} strokeWidth={limbW} strokeLinecap="round" />
          {/* Arms — left */}
          <line x1={900} y1={450} x2={870} y2={520} stroke={strokeCol} strokeWidth={limbW} strokeLinecap="round" />
          <line x1={870} y1={520} x2={850} y2={590} stroke={strokeCol} strokeWidth={limbW} strokeLinecap="round" />
          {/* Arms — right */}
          <line x1={1020} y1={450} x2={1050} y2={520} stroke={strokeCol} strokeWidth={limbW} strokeLinecap="round" />
          <line x1={1050} y1={520} x2={1070} y2={590} stroke={strokeCol} strokeWidth={limbW} strokeLinecap="round" />
        </g>
        {/* Legs — driven by squat; not rotated with torso */}
        <line x1={960} y1={hipY} x2={leftKneeX} y2={leftKneeY} stroke={strokeCol} strokeWidth={limbW} strokeLinecap="round" />
        <line x1={leftKneeX} y1={leftKneeY} x2={900} y2={770} stroke={strokeCol} strokeWidth={limbW} strokeLinecap="round" />
        <line x1={960} y1={hipY} x2={rightKneeX} y2={rightKneeY} stroke={strokeCol} strokeWidth={limbW} strokeLinecap="round" />
        <line x1={rightKneeX} y1={rightKneeY} x2={1020} y2={770} stroke={strokeCol} strokeWidth={limbW} strokeLinecap="round" />

        {/* Joint dots */}
        <circle cx={900} cy={450} r={6} fill={jointCol} />
        <circle cx={1020} cy={450} r={6} fill={jointCol} />
        <circle cx={960} cy={hipY} r={6} fill={jointCol} />
        <circle cx={leftKneeX} cy={leftKneeY} r={6} fill={jointCol} />
        <circle cx={rightKneeX} cy={rightKneeY} r={6} fill={jointCol} />
        <circle cx={900} cy={770} r={6} fill={jointCol} />
        <circle cx={1020} cy={770} r={6} fill={jointCol} />
        <circle cx={870} cy={520} r={6} fill={jointCol} />
        <circle cx={1050} cy={520} r={6} fill={jointCol} />

        {/* Leader line from left-knee pill to the knee — drawn when overlays appear */}
        {overlayOpacity > 0 && (
          <line
            x1={720}
            y1={620}
            x2={leftKneeX}
            y2={leftKneeY}
            stroke="rgba(185,28,28,0.4)"
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={overlayOpacity}
          />
        )}
      </svg>

      {/* Caption 1 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: DM,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 22,
          color: "rgba(13,13,13,0.4)",
          opacity: caption1Opacity * caption1FadeOut,
        }}
      >
        Doing their best. Alone. Unseen.
      </div>

      {/* Left-knee warning pill — anchored top-left of figure */}
      <div
        style={{
          position: "absolute",
          top: 590,
          left: 560,
          background: "rgba(185,28,28,0.2)",
          border: "1px solid rgba(185,28,28,0.4)",
          borderRadius: 20,
          padding: "6px 14px",
          fontFamily: DM,
          fontWeight: 500,
          fontSize: 13,
          color: COLORS.red,
          opacity: overlayOpacity,
        }}
      >
        ⚠ Left knee tracking inward
      </div>

      {/* Top-right symmetry pill */}
      <div
        style={{
          position: "absolute",
          top: 360,
          left: 1180,
          background: "rgba(31,77,46,0.1)",
          border: "1px solid rgba(31,77,46,0.3)",
          borderRadius: 20,
          padding: "6px 14px",
          fontFamily: DM,
          fontWeight: 500,
          fontSize: 13,
          color: COLORS.teal,
          opacity: overlayOpacity,
        }}
      >
        Symmetry: 84%
      </div>

      {/* Progress bar below the figure */}
      <div
        style={{
          position: "absolute",
          top: 830,
          left: "50%",
          transform: "translateX(-50%)",
          width: 280,
          opacity: overlayOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 12,
            color: COLORS.muted,
            marginBottom: 6,
          }}
        >
          Session 3 of 5
        </div>
        <div
          style={{
            width: "100%",
            height: 4,
            background: "rgba(13,13,13,0.1)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressFillWidth * 100}%`,
              height: "100%",
              background: COLORS.teal,
            }}
          />
        </div>
      </div>

      {/* Caption 2 */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: DM,
          fontWeight: 400,
          fontSize: 22,
          color: COLORS.teal,
          opacity: caption2Opacity,
        }}
      >
        Now their physio can see every rep.
      </div>
    </AbsoluteFill>
  );
};
