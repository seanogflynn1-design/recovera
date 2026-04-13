import React from "react";
import { COLORS, FOOTAGE_BG, FOOTAGE_TEXT } from "../constants";
import { DM } from "../fonts";

type Mode = "split" | "pip";

/**
 * Founder placeholder — structurally present, visually invisible in final cut.
 * Background is #0C0C14, the "FOOTAGE" label uses #13131A so it disappears
 * against the panel in the rendered output but remains present in layout
 * for the editor to drop the on-camera shot onto.
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
          border: "1px solid rgba(0,212,170,0.35)",
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
