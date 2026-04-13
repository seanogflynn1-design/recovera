import React from "react";

type Props = {
  width?: number;
  height?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * iPad-style mockup — dark titanium frame, landscape, 32px outer radius.
 */
export const IPadMockup: React.FC<Props> = ({
  width = 900,
  height = 640,
  children,
  style,
}) => {
  const framePadding = 14;
  const screenRadius = 24;

  return (
    <div
      style={{
        width,
        height,
        background: "#1A1A1A",
        borderRadius: 32,
        padding: framePadding,
        position: "relative",
        boxSizing: "border-box",
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
        {children}
      </div>
    </div>
  );
};
