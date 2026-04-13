import React from "react";
import { COLORS, FOOTAGE_BG, FOOTAGE_TEXT } from "../constants";
import { DM } from "../fonts";

type Mode = "split" | "pip";

/**
 * Founder placeholder — structurally present, visually invisible in final cut.
 * On light mode, background FOOTAGE_BG (#EFEFEB) and label FOOTAGE_TEXT match,
 * so the label disappears against the panel while the panel still reads as a
 * structural slot. Editor drops the on-camera footage onto this rectangle.
 */
export const FounderPlaceholder: React.FC<{ mode?: Mode }> = ({
  mode = "split",
}) => {
  if (mode === "pip") {
    return (
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          width: 280,
          height: 158,
          background: FOOTAGE_BG,
          border: "1px solid rgba(31,77,46,0.35)",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: DM,
            fontSize: 14,
            fontWeight: 400,
            color: FOOTAGE_TEXT,
          }}
        >
          FOOTAGE
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "calc(100% + 8px)",
            fontFamily: DM,
            fontWeight: 400,
            fontSize: 12,
            color: COLORS.teal,
          }}
        >
          Sean Flynn · Founder, Recovera
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: FOOTAGE_BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: DM,
        fontSize: 14,
        fontWeight: 400,
        color: FOOTAGE_TEXT,
      }}
    >
      FOOTAGE
    </div>
  );
};
