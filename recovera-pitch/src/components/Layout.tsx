import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../constants";
import { FounderPlaceholder } from "./FounderPlaceholder";

type Props = {
  mode: "split" | "full" | "pipOverlay";
  children: React.ReactNode;
};

/**
 * SPLIT — founder placeholder left 38%, graphic right 62%, teal gradient divider.
 * FULL  — full-screen graphic, no founder.
 * PIPOVERLAY — full-screen graphic with a 280×158 founder PiP bottom-left.
 */
export const Layout: React.FC<Props> = ({ mode, children }) => {
  if (mode === "full") {
    return (
      <AbsoluteFill style={{ background: COLORS.bg }}>{children}</AbsoluteFill>
    );
  }
  if (mode === "pipOverlay") {
    return (
      <AbsoluteFill style={{ background: COLORS.bg }}>
        {children}
        <FounderPlaceholder mode="pip" />
      </AbsoluteFill>
    );
  }
  // SPLIT
  return (
    <AbsoluteFill style={{ background: COLORS.bg, display: "flex", flexDirection: "row" }}>
      <div style={{ width: "38%", height: "100%", position: "relative" }}>
        <FounderPlaceholder mode="split" />
      </div>
      {/* Thin teal-gradient divider */}
      <div
        style={{
          width: 1,
          height: "100%",
          background:
            "linear-gradient(to bottom, transparent, rgba(0,212,170,0.25), transparent)",
        }}
      />
      <div
        style={{
          flex: 1,
          height: "100%",
          background: COLORS.bg,
          padding: "52px 60px",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
