import React from "react";
import { COLORS } from "../constants";

/**
 * Laptop / monitor bezel. Dark titanium-ish frame around white content.
 * Use `pad={false}` when the child already draws a full-bleed UI that
 * should butt up to the bezel (e.g. ClinicalDashboard).
 */
export const LaptopFrame: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  pad?: boolean;
}> = ({ children, style, pad = false }) => {
  return (
    <div
      style={{
        background: COLORS.device,
        borderRadius: 14,
        padding: 14,
        boxShadow: "0 6px 24px rgba(13,13,13,0.08)",
        boxSizing: "border-box",
        position: "relative",
        ...style,
      }}
    >
      {/* Camera dot */}
      <div
        style={{
          position: "absolute",
          top: 6,
          left: "50%",
          transform: "translateX(-50%)",
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#3A3A3A",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          background: COLORS.surface,
          borderRadius: 8,
          overflow: "hidden",
          padding: pad ? 18 : 0,
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * iPhone-style bezel. White inside, dark titanium outside, dynamic island
 * notch at top. Children render inside the content area (below the notch).
 */
export const PhoneFrame: React.FC<{
  children: React.ReactNode;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}> = ({ children, width = 260, height = 520, style }) => {
  return (
    <div
      style={{
        width,
        height,
        background: COLORS.device,
        borderRadius: 36,
        padding: 10,
        boxSizing: "border-box",
        boxShadow: "0 6px 20px rgba(13,13,13,0.12)",
        position: "relative",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: COLORS.surface,
          borderRadius: 28,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Dynamic island */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: Math.min(80, width * 0.32),
            height: 22,
            borderRadius: 11,
            background: COLORS.ink,
            zIndex: 5,
          }}
        />
        {children}
      </div>
    </div>
  );
};
