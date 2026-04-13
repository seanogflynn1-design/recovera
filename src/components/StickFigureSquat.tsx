import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../theme";

type Props = {
  size?: number;
  color?: string;
};

/**
 * Simple stick figure that squats and rises in a 2-second loop (60 frames).
 * 0–30 frames: descend into squat. 30–60: rise back up.
 */
export const StickFigureSquat: React.FC<Props> = ({
  size = 260,
  color = COLORS.text,
}) => {
  const frame = useCurrentFrame();
  const cycle = frame % 60;
  // Eased squat progress: 0 = standing, 1 = deep squat
  const raw = cycle < 30 ? cycle / 30 : 1 - (cycle - 30) / 30;
  const squat = 0.5 - Math.cos(raw * Math.PI) / 2; // ease-in-out

  // Joint geometry
  const hipY = interpolate(squat, [0, 1], [200, 260]);
  const kneeY = interpolate(squat, [0, 1], [300, 320]);
  const kneeX = interpolate(squat, [0, 1], [0, 28]);
  const ankleY = 380;
  const headCY = interpolate(squat, [0, 1], [80, 140]);
  const shoulderY = interpolate(squat, [0, 1], [120, 180]);
  const handY = interpolate(squat, [0, 1], [200, 230]);
  const handForward = interpolate(squat, [0, 1], [40, 90]);

  const stroke = 7;

  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="-120 0 240 420"
      style={{ display: "block" }}
    >
      {/* Floor line */}
      <line
        x1={-110}
        y1={ankleY + 2}
        x2={110}
        y2={ankleY + 2}
        stroke={COLORS.subtle}
        strokeWidth={2}
      />
      {/* Head */}
      <circle cx={0} cy={headCY} r={22} stroke={color} strokeWidth={stroke} fill="none" />
      {/* Spine */}
      <line
        x1={0}
        y1={headCY + 22}
        x2={0}
        y2={hipY}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      {/* Arms (forward, elbows extended) */}
      <line
        x1={0}
        y1={shoulderY}
        x2={handForward}
        y2={handY}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <line
        x1={0}
        y1={shoulderY}
        x2={-handForward}
        y2={handY}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      {/* Left leg */}
      <line
        x1={0}
        y1={hipY}
        x2={-kneeX - 20}
        y2={kneeY}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <line
        x1={-kneeX - 20}
        y1={kneeY}
        x2={-30}
        y2={ankleY}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      {/* Right leg */}
      <line
        x1={0}
        y1={hipY}
        x2={kneeX + 20}
        y2={kneeY}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <line
        x1={kneeX + 20}
        y1={kneeY}
        x2={30}
        y2={ankleY}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </svg>
  );
};
