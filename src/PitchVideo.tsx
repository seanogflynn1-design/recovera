import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { HookScene } from "./scenes/HookScene";
import { StatsScene } from "./scenes/StatsScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { MarketScene } from "./scenes/MarketScene";
import { CTAScene } from "./scenes/CTAScene";

// 30 seconds at 30fps = 900 frames
// Scene breakdown:
//   Hook:     0–180   (0–6s)    — "Recovery happens between appointments"
//   Stats:    150–300  (5–10s)  — Key problem stats
//   Solution: 270–450  (9–15s)  — AI engine through the clinician
//   Features: 420–570  (14–19s) — Four feature highlights
//   Market:   540–660  (18–22s) — €500B+ market
//   CTA:      630–900  (21–30s) — RECOVERA logo + tagline

export const PitchVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={180} name="Hook">
        <HookScene />
      </Sequence>

      <Sequence from={150} durationInFrames={150} name="Stats">
        <StatsScene />
      </Sequence>

      <Sequence from={270} durationInFrames={180} name="Solution">
        <SolutionScene />
      </Sequence>

      <Sequence from={420} durationInFrames={150} name="Features">
        <FeaturesScene />
      </Sequence>

      <Sequence from={540} durationInFrames={120} name="Market">
        <MarketScene />
      </Sequence>

      <Sequence from={630} durationInFrames={270} name="CTA">
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
