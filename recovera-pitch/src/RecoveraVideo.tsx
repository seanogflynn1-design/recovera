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
import { SceneWedge } from "./scenes/SceneWedge";
import { EndCard } from "./scenes/EndCard";

type SceneEntry = {
  start: number;
  duration: number;
  component: React.ComponentType;
  id: string;
};

/**
 * All durations are 1.5× the original spec to give judges more reading
 * time. The cumulative `start` column is just a running total of the
 * durations above it. A new "wedge" scene is inserted between Veeva and
 * Traction.
 */
const SCENES: SceneEntry[] = [
  { id: "01-void",         start: 0,    duration: 810,  component: Scene01_Void },
  { id: "02-person",       start: 810,  duration: 630,  component: Scene02_PersonAlone },
  { id: "03-before-after", start: 1440, duration: 900,  component: Scene03_BeforeAfter },
  { id: "04-scale",        start: 2340, duration: 630,  component: Scene04_Scale },
  { id: "05-technology",   start: 2970, duration: 540,  component: Scene05_Technology },
  { id: "06-matrix",       start: 3510, duration: 540,  component: Scene06_CompetitorMatrix },
  { id: "07-data",         start: 4050, duration: 720,  component: Scene07_DataAccumulates },
  { id: "08-business",     start: 4770, duration: 1080, component: Scene08_Business },
  { id: "09-veeva",        start: 5850, duration: 540,  component: Scene09_Comparable },
  { id: "10-wedge",        start: 6390, duration: 420,  component: SceneWedge },
  { id: "11-traction",     start: 6810, duration: 540,  component: Scene10_Traction },
  { id: "12-close",        start: 7350, duration: 360,  component: Scene11_Close },
  { id: "end-card",        start: 7710, duration: 270,  component: EndCard },
];
// Sum: 810+630+900+630+540+540+720+1080+540+420+540+360+270 = 7980 frames
// = 266 seconds = 4:26. Matches DURATION_FRAMES in constants.ts.

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
    <AbsoluteFill style={{ background: "#F8F8F5" }}>
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
