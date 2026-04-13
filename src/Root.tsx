import React from "react";
import { Composition } from "remotion";
import "./fonts";
import { VIDEO_WIDTH, VIDEO_HEIGHT, FPS } from "./theme";

import { Scene01 } from "./scenes/Scene01";
import { Scene02 } from "./scenes/Scene02";
import { Scene03 } from "./scenes/Scene03";
import { Scene04 } from "./scenes/Scene04";
import { Scene05 } from "./scenes/Scene05";
import { Scene06 } from "./scenes/Scene06";
import { Scene07 } from "./scenes/Scene07";
import { Scene08 } from "./scenes/Scene08";
import { Scene09 } from "./scenes/Scene09";
import { Scene10 } from "./scenes/Scene10";

type SceneDef = {
  id: string;
  component: React.ComponentType;
  durationInFrames: number;
};

export const SCENES: SceneDef[] = [
  { id: "Scene01", component: Scene01, durationInFrames: 90 },
  { id: "Scene02", component: Scene02, durationInFrames: 210 },
  { id: "Scene03", component: Scene03, durationInFrames: 270 },
  { id: "Scene04", component: Scene04, durationInFrames: 360 },
  { id: "Scene05", component: Scene05, durationInFrames: 420 },
  { id: "Scene06", component: Scene06, durationInFrames: 300 },
  { id: "Scene07", component: Scene07, durationInFrames: 360 },
  { id: "Scene08", component: Scene08, durationInFrames: 450 },
  { id: "Scene09", component: Scene09, durationInFrames: 270 },
  { id: "Scene10", component: Scene10, durationInFrames: 390 },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {SCENES.map((s) => (
        <Composition
          key={s.id}
          id={s.id}
          component={s.component}
          durationInFrames={s.durationInFrames}
          fps={FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
        />
      ))}
    </>
  );
};
