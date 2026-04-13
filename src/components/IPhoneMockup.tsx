import React from "react";

type Props = {
  width?: number;
  height?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * iPhone 15 Pro mockup — dark titanium frame, 44px outer radius,
 * dynamic island notch at the top. Screen content is passed as children.
 */
export const IPhoneMockup: React.FC<Props> = ({
  width = 560,
  height = 1150,
  children,
  style,
}) => {
  const framePadding = 14;
  const screenRadius = 38;
  const dynamicIslandWidth = 120;
  const dynamicIslandHeight = 32;

  return (
    <div
      style={{
        width,
        height,
        background: "#1A1A1A",
        borderRadius: 44,
        padding: framePadding,
        position: "relative",
        boxSizing: "border-box",
        // Subtle frame highlight — no shadow, just an inner border of titanium
        border: "1.5px solid #2D2D2D",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFFFFF",
          borderRadius: screenRadius,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dynamic island */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: "50%",
            transform: "translateX(-50%)",
            width: dynamicIslandWidth,
            height: dynamicIslandHeight,
            background: "#0A0A0A",
            borderRadius: dynamicIslandHeight / 2,
            zIndex: 20,
          }}
        />
        {children}
      </div>
    </div>
  );
};
