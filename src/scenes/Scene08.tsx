import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { COLORS, FONTS } from "../theme";
import { IPhoneMockup } from "../components/IPhoneMockup";
import { IPadMockup } from "../components/IPadMockup";

/**
 * SCENE 08 — "THE VISION" — 450 frames / 15s.
 * Three cross-fading vignettes, then they shrink into tiles at top
 * while a centered climax headline builds word-by-word.
 */
export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();

  // Vignette timing windows (in frames). Cross-fades = 15 frames.
  const V1 = { start: 0, fullIn: 15, fullOut: 90, end: 105 };
  const V2 = { start: 90, fullIn: 105, fullOut: 180, end: 195 };
  const V3 = { start: 180, fullIn: 195, fullOut: 270, end: 285 };

  // After vignette 3, all three shrink and move to tiles at top
  const ARRANGE_START = 285;
  const ARRANGE_END = 345;

  const arrangeProgress = interpolate(
    frame,
    [ARRANGE_START, ARRANGE_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );

  const vignetteOpacityAtStage = (w: typeof V1) =>
    interpolate(
      frame,
      [w.start, w.fullIn, w.fullOut, w.end],
      [0, 1, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

  // Once arrangement begins, all three tiles become visible simultaneously
  const tileOpacity = interpolate(
    frame,
    [ARRANGE_START, ARRANGE_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Climax headline builds word-by-word
  // "This is not an exercise app." (6 words)
  // "This is what happens when movement health" (7 words)
  // "finally catches up with medicine." (5 words)
  const HEAD_START = 320;
  const words1 = "This is not an exercise app.".split(" ");
  const words2 = "This is what happens when movement health".split(" ");
  const words3 = "finally catches up with medicine.".split(" ");
  const WORD_STRIDE = 7; // frames per word
  const GAP_BETWEEN_LINES = 18;

  const l1Start = HEAD_START;
  const l2Start = l1Start + words1.length * WORD_STRIDE + GAP_BETWEEN_LINES;
  const l3Start = l2Start + words2.length * WORD_STRIDE + GAP_BETWEEN_LINES;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.white }}>
      {/* Full-screen vignettes (fade across phases, shrink into tiles after arrange) */}
      <VignetteStage
        progress={arrangeProgress}
        tileIndex={0}
        fullScreenOpacity={vignetteOpacityAtStage(V1)}
        tileOpacity={tileOpacity}
      >
        <Vignette1 />
      </VignetteStage>

      <VignetteStage
        progress={arrangeProgress}
        tileIndex={1}
        fullScreenOpacity={vignetteOpacityAtStage(V2)}
        tileOpacity={tileOpacity}
      >
        <Vignette2 />
      </VignetteStage>

      <VignetteStage
        progress={arrangeProgress}
        tileIndex={2}
        fullScreenOpacity={vignetteOpacityAtStage(V3)}
        tileOpacity={tileOpacity}
      >
        <Vignette3 />
      </VignetteStage>

      {/* Vignette captions — only show when their vignette is live (not in tile stage) */}
      <VignetteCaption
        text="A fall that never happens."
        opacity={
          vignetteOpacityAtStage(V1) * interpolate(
            frame,
            [ARRANGE_START, ARRANGE_START + 15],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />
      <VignetteCaption
        text="A career that continues."
        opacity={
          vignetteOpacityAtStage(V2) * interpolate(
            frame,
            [ARRANGE_START, ARRANGE_START + 15],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />
      <VignetteCaption
        text="A physio who finally has eyes everywhere."
        opacity={
          vignetteOpacityAtStage(V3) * interpolate(
            frame,
            [ARRANGE_START, ARRANGE_START + 15],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />

      {/* Climax headline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          textAlign: "center",
        }}
      >
        <WordBuild
          words={words1}
          start={l1Start}
          stride={WORD_STRIDE}
          size={52}
          weight={700}
          color={COLORS.text}
        />
        <div style={{ height: 28 }} />
        <WordBuild
          words={words2}
          start={l2Start}
          stride={WORD_STRIDE}
          size={48}
          weight={500}
          color={COLORS.mid}
        />
        <div style={{ height: 28 }} />
        <WordBuild
          words={words3}
          start={l3Start}
          stride={WORD_STRIDE}
          size={78}
          weight={900}
          color={COLORS.green}
        />
      </div>
    </AbsoluteFill>
  );
};

/**
 * Wraps a vignette so it can transition from full-screen → small tile at top.
 */
const VignetteStage: React.FC<{
  progress: number; // 0 = fullscreen, 1 = tile
  tileIndex: number; // 0,1,2
  fullScreenOpacity: number;
  tileOpacity: number;
  children: React.ReactNode;
}> = ({ progress, tileIndex, fullScreenOpacity, tileOpacity, children }) => {
  // Tile grid: three tiles centered horizontally at y=120, each ~300px wide
  const TILE_WIDTH = 300;
  const TILE_GAP = 36;
  const totalWidth = TILE_WIDTH * 3 + TILE_GAP * 2;
  const startX = (1080 - totalWidth) / 2;
  const tileX = startX + tileIndex * (TILE_WIDTH + TILE_GAP);
  const tileY = 200;

  // Full-screen anchor: center at (540, 960), width 520
  const fullWidth = 520;
  const fullX = (1080 - fullWidth) / 2;
  const fullY = 340;

  const x = interpolate(progress, [0, 1], [fullX, tileX]);
  const y = interpolate(progress, [0, 1], [fullY, tileY]);
  const scale = interpolate(progress, [0, 1], [1, TILE_WIDTH / fullWidth]);

  const opacity =
    progress < 0.01 ? fullScreenOpacity : Math.max(fullScreenOpacity, tileOpacity);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: fullWidth,
        transformOrigin: "top left",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {children}
    </div>
  );
};

const VignetteCaption: React.FC<{ text: string; opacity: number }> = ({
  text,
  opacity,
}) => (
  <div
    style={{
      position: "absolute",
      bottom: 300,
      left: 0,
      right: 0,
      textAlign: "center",
      fontFamily: FONTS.sans,
      fontSize: 44,
      fontWeight: 700,
      letterSpacing: -1.2,
      color: COLORS.text,
      opacity,
    }}
  >
    {text}
  </div>
);

const WordBuild: React.FC<{
  words: string[];
  start: number;
  stride: number;
  size: number;
  weight: number;
  color: string;
}> = ({ words, start, stride, size, weight, color }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        fontFamily: FONTS.sans,
        fontSize: size,
        fontWeight: weight,
        color,
        letterSpacing: size > 60 ? -2.5 : -1,
        lineHeight: 1.1,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: size * 0.24,
      }}
    >
      {words.map((w, i) => {
        const wStart = start + i * stride;
        const opacity = interpolate(frame, [wStart, wStart + 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(frame, [wStart, wStart + 12], [12, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${y}px)`,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

/* ---------- Vignette screen bodies ---------- */

const Vignette1: React.FC = () => {
  const frame = useCurrentFrame();
  // Declining gait score — three weeks
  const weeks = ["Week 1", "Week 2", "Week 3"];
  const scores = [88, 71, 54];
  return (
    <IPhoneMockup width={520} height={1080}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "68px 22px 22px 22px",
          boxSizing: "border-box",
          background: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            recovera
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              letterSpacing: 2,
              color: COLORS.mid,
            }}
          >
            GAIT · M. O'BRIEN · 82
          </div>
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            color: COLORS.mid,
            marginTop: 24,
          }}
        >
          Gait score
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 56,
            fontWeight: 900,
            color: COLORS.text,
            letterSpacing: -2,
          }}
        >
          54
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 20,
              fontWeight: 400,
              color: COLORS.mid,
              marginLeft: 8,
            }}
          >
            ↓ 34 in 3 weeks
          </span>
        </div>
        {/* Bar chart */}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "flex-end",
            gap: 24,
            height: 220,
            padding: "0 4px",
            borderBottom: `1px solid ${COLORS.subtle}`,
          }}
        >
          {scores.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: `${s}%`,
                  background: i === 2 ? COLORS.red : COLORS.text,
                }}
              />
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 10,
                  color: COLORS.mid,
                  marginTop: 8,
                }}
              >
                {weeks[i]}
              </div>
            </div>
          ))}
        </div>
        {/* Red alert */}
        <div
          style={{
            marginTop: 28,
            background: COLORS.red,
            color: "#FFFFFF",
            padding: "14px 18px",
            fontFamily: FONTS.sans,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: -0.2,
            opacity: (Math.sin(frame / 10) + 1) / 2 * 0.4 + 0.6,
          }}
        >
          ⚠  Hospitalisation risk elevated
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 13,
            color: COLORS.mid,
            marginTop: 14,
            lineHeight: 1.4,
          }}
        >
          Book fall-risk assessment. Notify GP.
        </div>
      </div>
    </IPhoneMockup>
  );
};

const Vignette2: React.FC = () => {
  return (
    <IPhoneMockup width={520} height={1080}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "68px 22px 22px 22px",
          boxSizing: "border-box",
          background: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            recovera
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              letterSpacing: 2,
              color: COLORS.mid,
            }}
          >
            POST-OP · ACL · WK 8/8
          </div>
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            color: COLORS.mid,
            marginTop: 24,
          }}
        >
          Adherence · 8 weeks
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 64,
            fontWeight: 900,
            color: COLORS.green,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          100%
        </div>
        {/* Adherence dots */}
        <div
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 8,
          }}
        >
          {Array.from({ length: 56 }).map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1 / 1",
                background: COLORS.green,
              }}
            />
          ))}
        </div>
        {/* Green clear badge */}
        <div
          style={{
            marginTop: 28,
            background: COLORS.green,
            color: "#FFFFFF",
            padding: "14px 18px",
            fontFamily: FONTS.sans,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: -0.2,
          }}
        >
          ✓  Cleared for return to sport
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 13,
            color: COLORS.mid,
            marginTop: 14,
            lineHeight: 1.4,
          }}
        >
          Symmetry within 3%. Strength at baseline.
        </div>
      </div>
    </IPhoneMockup>
  );
};

const Vignette3: React.FC = () => {
  const rows = [
    { name: "Conor Murphy", status: "ok", meta: "ACL · Wk 8" },
    { name: "Sarah Walsh", status: "ok", meta: "Rotator cuff · Wk 3" },
    { name: "Imani Okafor", status: "ok", meta: "Achilles · Wk 6" },
    { name: "Michael Ryan", status: "flag", meta: "Low back · Wk 2" },
    { name: "Elena Rossi", status: "ok", meta: "Knee OA · Wk 12" },
    { name: "James Park", status: "flag", meta: "Hip · Wk 4" },
    { name: "Aoife Byrne", status: "ok", meta: "Shoulder · Wk 5" },
  ];
  return (
    // Note: Scene 08 uses iPhone portrait framing in fullscreen anchor; for v3 we
    // still render an iPad-style dashboard at a size matching the other vignettes.
    <IPadMockup width={520} height={1080}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "20px 22px",
          boxSizing: "border-box",
          background: "#FAFAFA",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 16,
            borderBottom: `1px solid ${COLORS.subtle}`,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            recovera · clinic
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              letterSpacing: 2,
              color: COLORS.mid,
            }}
          >
            TODAY · 23 PATIENTS
          </div>
        </div>

        {/* Summary strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
            marginTop: 14,
          }}
        >
          {[
            { label: "ON TRACK", value: "21", color: COLORS.green },
            { label: "FLAGGED", value: "2", color: COLORS.amber },
            { label: "URGENT", value: "0", color: COLORS.text },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "#FFFFFF",
                border: `1px solid ${COLORS.subtle}`,
                padding: "10px 12px",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 9,
                  color: COLORS.mid,
                  letterSpacing: 1.5,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 24,
                  fontWeight: 700,
                  color: s.color,
                  letterSpacing: -0.6,
                  marginTop: 2,
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Patient list */}
        <div style={{ marginTop: 14, flex: 1, overflow: "hidden" }}>
          {rows.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "11px 6px",
                borderBottom: `1px solid ${COLORS.subtle}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: r.status === "flag" ? COLORS.amber : COLORS.green,
                  }}
                />
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.text,
                  }}
                >
                  {r.name}
                </div>
              </div>
              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 11,
                  color: COLORS.mid,
                }}
              >
                {r.meta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </IPadMockup>
  );
};
