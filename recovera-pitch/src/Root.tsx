import React from "react";
import { Composition } from "remotion";
import { RecoveraVideo } from "./RecoveraVideo";
import { DURATION_FRAMES, VIDEO_HEIGHT, VIDEO_WIDTH, fps } from "./constants";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="RecoveraVideo"
      component={RecoveraVideo}
      durationInFrames={DURATION_FRAMES}
      fps={fps}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
