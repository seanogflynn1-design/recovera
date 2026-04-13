import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import "./fonts";

import { Scene01_Void } from "./scenes/Scene01_Void";
import { Scene02_PersonAlone } from "./scenes/Scene02_PersonAlone";
import { Scene03_BeforeAfter } from "./scenes/Scene03_BeforeAfter";
import { Scene04_Scale } from "./scenes/Scene04_Scale";
import { Scene05_Technology } from "./scenes/Scene05_Technology";
import { Scene06_CompetitorMatrix } from "./scenes/Scene06_CompetitorMatrix";
import { Scene07_DataAccumulates } from "./scenes/Scene07_DataAccumulates";
import { Scene08_Business } from "./scenes/Scene08_Business";
import { Scene09_Comparable } from "./scenes/Scene09_Comparable";
import { Scene10_Traction } from "./scenes/Scene10_Traction";
import { Scene11_Close } from "./scenes/Scene11_Close";
import { EndCard } from "./scenes/EndCard";

type SceneEntry = {
  start: number;
  duration: number;
  component: React.ComponentType;
  id: string;
};

const SCENES: SceneEntry[] = [
  { id: "01-void",         start: 0,    duration: 540, component: Scene01_Void },
  { id: "02-person",       start: 540,  duration: 420, component: Scene02_PersonAlone },
  { id: "03-before-after", start: 960,  duration: 600, component: Scene03_BeforeAfter },
  { id: "04-scale",        start: 1560, duration: 420, component: Scene04_Scale },
  { id: "05-technology",   start: 1980, duration: 360, component: Scene05_Technology },
  { id: "06-matrix",       start: 2340, duration: 360, component: Scene06_CompetitorMatrix },
  { id: "07-data",         start: 2700, duration: 480, component: Scene07_DataAccumulates },
  { id: "08-business",     start: 3180, duration: 720, component: Scene08_Business },
  { id: "09-veeva",        start: 3900, duration: 360, component: Scene09_Comparable },
  { id: "10-traction",     start: 4260, duration: 360, component: Scene10_Traction },
  { id: "11-close",        start: 4620, duration: 240, component: Scene11_Close },
  { id: "end-card",        start: 4860, duration: 180, component: EndCard },
];

const CROSSFADE = 15;

/**
 * Crossfades a Sequence's children based on the *local* (sequence-relative)
 * frame. Inside a `<Sequence from={X}>`, `useCurrentFrame()` returns 0 at X,
 * so the fade-in is simply [0, CROSSFADE] and fade-out [duration-CROSSFADE, duration].
 */
const Fader: React.FC<{
  duration: number;
  children: React.ReactNode;
}> = ({ duration, children }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, CROSSFADE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [duration - CROSSFADE, duration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>{children}</AbsoluteFill>
  );
};

export const RecoveraVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0A0A0F" }}>
      {SCENES.map(({ id, start, duration, component: Scene }) => (
        <Sequence key={id} from={start} durationInFrames={duration}>
          <Fader duration={duration}>
            <Scene />
          </Fader>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
