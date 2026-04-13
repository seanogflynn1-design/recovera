import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants";
import { DM } from "../fonts";
import { ClinicalDashboard } from "../components/ClinicalDashboard";
import { FounderPlaceholder } from "../components/FounderPlaceholder";

const NOTES_TEXT = `Date: 12/03/26

Subjective: Patient reports exercises "going well". Some
discomfort on single-leg work. Not sure about form.

Objective: [blank — no data between sessions]

Assessment: Progressing as expected(?)

Plan: Continue programme. Review next week.`;

/**
 * SCENE 3 — Before / After. Frames 960–1560 (local 0–600).
 *
 * Phase 1 (0–240): full-screen "before" — old patient notes.
 * Phase 2 (240–300): crossfade with teal scanner sweep.
 * Phase 3 (300–600): SPLIT — clinician dashboard right.
 */
export const Scene03_BeforeAfter: React.FC = () => {
  const frame = useCurrentFrame();

  // Typed notes begin at local 30, 2 frames/char
  const notesStart = 30;
  const typed = Math.max(0, Math.floor((frame - notesStart) / 2));
  const notes = NOTES_TEXT.slice(0, Math.min(typed, NOTES_TEXT.length));

  // Message bubble at local 170
  const bubbleOpacity = interpolate(frame, [170, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bubbleY = interpolate(frame, [170, 200], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "This is the clinical data." label
  const clinicalLabelOpacity = interpolate(frame, [205, 235], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Crossfade at local 240–300
  const beforeOpacity = interpolate(frame, [240, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const afterOpacity = interpolate(frame, [260, 320], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scanner beam — translateX -100 % → 100 % over 60 frames from local 240
  const sweepT = interpolate(frame, [240, 300], [-100, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // When is phase 3 fully active?
  const afterActive = frame >= 260;

  // Dashboard row stagger should begin ~local 330 (spec absolute 1290)
  const DASHBOARD_ROW_START = 330;

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* BEFORE — centered patient-notes card */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: beforeOpacity,
          gap: 18,
        }}
      >
        <div
          style={{
            background: "#F5F5F0",
            borderRadius: 4,
            padding: 32,
            width: 700,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: 600,
              fontSize: 16,
              color: "#1a1a1a",
              marginBottom: 16,
            }}
          >
            Patient Notes — Conor Murphy
          </div>
          <pre
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: "#1a1a1a",
              whiteSpace: "pre-wrap",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {notes}
          </pre>
        </div>

        {/* WhatsApp-style bubble */}
        <div
          style={{
            background: "#25D366",
            borderRadius: 18,
            padding: "10px 16px",
            maxWidth: 320,
            opacity: bubbleOpacity,
            transform: `translateY(${bubbleY}px)`,
            alignSelf: "center",
          }}
        >
          <div style={{ fontFamily: DM, fontWeight: 400, fontSize: 14, color: "#fff" }}>
            yeah the exercises were grand
          </div>
          <div
            style={{
              fontFamily: DM,
              fontWeight: 400,
              fontSize: 11,
              color: "rgba(255,255,255,0.7)",
              textAlign: "right",
              marginTop: 2,
            }}
          >
            Tue 14:32
          </div>
        </div>

        {/* Label */}
        <div
          style={{
            fontFamily: DM,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 16,
            color: COLORS.mutedLight,
            opacity: clinicalLabelOpacity,
          }}
        >
          This is the clinical data.
        </div>
      </div>

      {/* SCANNER BEAM — during crossfade only */}
      {frame >= 240 && frame <= 310 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(to right, transparent, #00D4AA, transparent)",
            transform: `translateX(${sweepT}%) translateY(540px)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* AFTER — split layout; dashboard fills right panel edge-to-edge */}
      {afterActive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "row",
            opacity: afterOpacity,
          }}
        >
          {/* Left — founder */}
          <div style={{ width: "38%", height: "100%", position: "relative" }}>
            <FounderPlaceholder mode="split" />
          </div>
          {/* Divider */}
          <div
            style={{
              width: 1,
              height: "100%",
              background:
                "linear-gradient(to bottom, transparent, rgba(0,212,170,0.25), transparent)",
            }}
          />
          {/* Right — dashboard flush to edges */}
          <div style={{ flex: 1, height: "100%", background: COLORS.bg }}>
            <ClinicalDashboard rowStartFrame={DASHBOARD_ROW_START} />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
