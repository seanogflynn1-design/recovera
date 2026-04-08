import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

/* ── colour palette ─────────────────────────────────────────── */
const COLORS = {
  navy: "#0B1D3A",
  teal: "#00C9A7",
  white: "#FFFFFF",
  lightGray: "#F0F4F8",
  darkGray: "#4A5568",
  accent: "#4FD1C5",
  gradientStart: "#0B1D3A",
  gradientEnd: "#1A365D",
};

/* ── shared animation helpers ────────────────────────────────── */
const fadeIn = (frame: number, start: number, duration = 15) =>
  interpolate(frame - start, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, fps: number, start: number, delay = 0) =>
  spring({ frame: frame - start - delay, fps, config: { damping: 15 } });

/* ── Slide wrapper ───────────────────────────────────────────── */
const Slide: React.FC<{
  background?: string;
  gradient?: boolean;
  children: React.ReactNode;
}> = ({ background, gradient, children }) => (
  <AbsoluteFill
    style={{
      background: gradient
        ? `linear-gradient(135deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`
        : background ?? COLORS.navy,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}
  >
    {children}
  </AbsoluteFill>
);

/* ── 1. Title slide ──────────────────────────────────────────── */
const TitleSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const taglineOpacity = fadeIn(frame, 20);
  const taglineY = interpolate(frame - 20, [0, 20], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Slide gradient>
      <div
        style={{
          transform: `scale(${logoScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 30,
            background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.accent})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
            boxShadow: "0 20px 60px rgba(0,201,167,0.3)",
          }}
        >
          <span style={{ fontSize: 60, color: COLORS.white, fontWeight: 700 }}>
            R
          </span>
        </div>

        <h1
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: COLORS.white,
            margin: 0,
            letterSpacing: -2,
          }}
        >
          Recovera
        </h1>
      </div>

      <p
        style={{
          fontSize: 36,
          color: COLORS.accent,
          marginTop: 30,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontWeight: 500,
          letterSpacing: 1,
        }}
      >
        Smarter Recovery, Better Outcomes
      </p>
    </Slide>
  );
};

/* ── 2. Problem slide ────────────────────────────────────────── */
const ProblemSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const problems = [
    { icon: "⏳", text: "Recovery timelines are unpredictable" },
    { icon: "📋", text: "Care plans lack personalisation" },
    { icon: "🔗", text: "Patients lose connection between visits" },
  ];

  return (
    <Slide gradient>
      <h2
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: COLORS.teal,
          marginBottom: 60,
          opacity: fadeIn(frame, 0),
        }}
      >
        The Problem
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {problems.map((p, i) => {
          const progress = slideUp(frame, fps, 0, i * 10);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: progress,
                transform: `translateY(${(1 - progress) * 40}px)`,
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 18,
                  background: "rgba(0,201,167,0.15)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 36,
                  flexShrink: 0,
                }}
              >
                {p.icon}
              </div>
              <span
                style={{
                  fontSize: 34,
                  color: COLORS.white,
                  fontWeight: 500,
                }}
              >
                {p.text}
              </span>
            </div>
          );
        })}
      </div>
    </Slide>
  );
};

/* ── 3. Solution slide ───────────────────────────────────────── */
const SolutionSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = [
    { icon: "🤖", title: "AI-Powered Plans", desc: "Adaptive recovery programs" },
    { icon: "📊", title: "Real-Time Tracking", desc: "Progress visible to all" },
    { icon: "💬", title: "Connected Care", desc: "Patient-provider messaging" },
  ];

  return (
    <Slide gradient>
      <h2
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: COLORS.teal,
          marginBottom: 60,
          opacity: fadeIn(frame, 0),
        }}
      >
        Our Solution
      </h2>

      <div style={{ display: "flex", gap: 50 }}>
        {features.map((f, i) => {
          const progress = slideUp(frame, fps, 0, i * 8);
          return (
            <div
              key={i}
              style={{
                width: 320,
                padding: 40,
                borderRadius: 24,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(0,201,167,0.2)",
                textAlign: "center",
                opacity: progress,
                transform: `translateY(${(1 - progress) * 50}px)`,
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 20 }}>{f.icon}</div>
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: COLORS.white,
                  margin: "0 0 10px",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 22,
                  color: COLORS.accent,
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {f.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Slide>
  );
};

/* ── 4. How It Works slide ───────────────────────────────────── */
const HowItWorksSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { num: "01", title: "Assess", desc: "AI evaluates patient needs" },
    { num: "02", title: "Plan", desc: "Personalised recovery program" },
    { num: "03", title: "Track", desc: "Real-time progress monitoring" },
    { num: "04", title: "Adapt", desc: "Continuous plan optimisation" },
  ];

  return (
    <Slide gradient>
      <h2
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: COLORS.teal,
          marginBottom: 60,
          opacity: fadeIn(frame, 0),
        }}
      >
        How It Works
      </h2>

      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        {steps.map((s, i) => {
          const progress = slideUp(frame, fps, 0, i * 8);
          return (
            <React.Fragment key={i}>
              <div
                style={{
                  textAlign: "center",
                  opacity: progress,
                  transform: `translateY(${(1 - progress) * 40}px)`,
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.accent})`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 28,
                    fontWeight: 800,
                    color: COLORS.navy,
                    margin: "0 auto 16px",
                  }}
                >
                  {s.num}
                </div>
                <h3
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.white,
                    margin: "0 0 8px",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: 20,
                    color: COLORS.darkGray,
                    margin: 0,
                    maxWidth: 180,
                  }}
                >
                  {s.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    width: 60,
                    height: 3,
                    background: `linear-gradient(90deg, ${COLORS.teal}, transparent)`,
                    opacity: progress,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Slide>
  );
};

/* ── 5. Market slide ─────────────────────────────────────────── */
const MarketSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: "$50B", label: "Global Rehab Market" },
    { value: "3.2M", label: "Potential Users" },
    { value: "28%", label: "Annual Growth" },
  ];

  return (
    <Slide gradient>
      <h2
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: COLORS.teal,
          marginBottom: 60,
          opacity: fadeIn(frame, 0),
        }}
      >
        Market Opportunity
      </h2>

      <div style={{ display: "flex", gap: 80 }}>
        {stats.map((s, i) => {
          const progress = slideUp(frame, fps, 0, i * 10);
          const countUp = interpolate(frame, [i * 10, i * 10 + 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity: progress,
                transform: `scale(${0.8 + progress * 0.2})`,
              }}
            >
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 800,
                  color: COLORS.teal,
                  marginBottom: 12,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: COLORS.white,
                  fontWeight: 400,
                  opacity: 0.8,
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </Slide>
  );
};

/* ── 6. Traction slide ───────────────────────────────────────── */
const TractionSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const milestones = [
    "Beta launched with 5 clinic partners",
    "92% patient satisfaction score",
    "40% improvement in adherence rates",
    "Featured in Digital Health Today",
  ];

  return (
    <Slide gradient>
      <h2
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: COLORS.teal,
          marginBottom: 60,
          opacity: fadeIn(frame, 0),
        }}
      >
        Traction
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {milestones.map((m, i) => {
          const progress = slideUp(frame, fps, 0, i * 8);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: progress,
                transform: `translateX(${(1 - progress) * 60}px)`,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: COLORS.teal,
                  flexShrink: 0,
                  boxShadow: `0 0 20px ${COLORS.teal}`,
                }}
              />
              <span
                style={{ fontSize: 32, color: COLORS.white, fontWeight: 500 }}
              >
                {m}
              </span>
            </div>
          );
        })}
      </div>
    </Slide>
  );
};

/* ── 7. Team slide ───────────────────────────────────────────── */
const TeamSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const team = [
    { name: "Founder / CEO", role: "Vision & Strategy", color: "#00C9A7" },
    { name: "CTO", role: "Product & Engineering", color: "#4FD1C5" },
    { name: "CMO", role: "Growth & Partnerships", color: "#38B2AC" },
  ];

  return (
    <Slide gradient>
      <h2
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: COLORS.teal,
          marginBottom: 60,
          opacity: fadeIn(frame, 0),
        }}
      >
        The Team
      </h2>

      <div style={{ display: "flex", gap: 60 }}>
        {team.map((t, i) => {
          const progress = slideUp(frame, fps, 0, i * 10);
          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity: progress,
                transform: `translateY(${(1 - progress) * 40}px)`,
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${t.color}, ${COLORS.navy})`,
                  border: `3px solid ${t.color}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto 20px",
                  fontSize: 48,
                  color: COLORS.white,
                  fontWeight: 700,
                }}
              >
                {t.name[0]}
              </div>
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: COLORS.white,
                  margin: "0 0 8px",
                }}
              >
                {t.name}
              </h3>
              <p
                style={{
                  fontSize: 22,
                  color: COLORS.accent,
                  margin: 0,
                }}
              >
                {t.role}
              </p>
            </div>
          );
        })}
      </div>
    </Slide>
  );
};

/* ── 8. Ask / CTA slide ──────────────────────────────────────── */
const AskSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });
  const glowPulse = Math.sin(frame * 0.08) * 0.3 + 0.7;

  return (
    <Slide gradient>
      <div
        style={{
          transform: `scale(${scale})`,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.teal,
            marginBottom: 30,
          }}
        >
          Join Us
        </h2>

        <p
          style={{
            fontSize: 36,
            color: COLORS.white,
            marginBottom: 50,
            fontWeight: 400,
            maxWidth: 700,
          }}
        >
          We're raising to scale Recovera and transform patient recovery
          worldwide.
        </p>

        <div
          style={{
            display: "inline-flex",
            padding: "20px 60px",
            borderRadius: 60,
            background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.accent})`,
            boxShadow: `0 0 ${40 * glowPulse}px rgba(0,201,167,${glowPulse * 0.5})`,
          }}
        >
          <span
            style={{ fontSize: 32, fontWeight: 700, color: COLORS.navy }}
          >
            Let's Talk
          </span>
        </div>
      </div>
    </Slide>
  );
};

/* ── 9. Closing slide ────────────────────────────────────────── */
const ClosingSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });
  const opacity = fadeIn(frame, 10);

  return (
    <Slide gradient>
      <div style={{ transform: `scale(${scale})`, textAlign: "center" }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 25,
            background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.accent})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 30px",
            boxShadow: "0 20px 60px rgba(0,201,167,0.3)",
          }}
        >
          <span style={{ fontSize: 50, color: COLORS.white, fontWeight: 700 }}>
            R
          </span>
        </div>
        <h1
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: COLORS.white,
            margin: 0,
            letterSpacing: -2,
          }}
        >
          Recovera
        </h1>
        <p
          style={{
            fontSize: 30,
            color: COLORS.accent,
            marginTop: 20,
            opacity,
            fontWeight: 400,
          }}
        >
          Smarter Recovery, Better Outcomes
        </p>
      </div>
    </Slide>
  );
};

/* ── Main composition ────────────────────────────────────────── */
const SLIDE_DURATION = 100; // frames per slide (≈ 3.3s at 30fps)

export const RecoveraPitch: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={SLIDE_DURATION}>
        <TitleSlide />
      </Sequence>
      <Sequence from={SLIDE_DURATION} durationInFrames={SLIDE_DURATION}>
        <ProblemSlide />
      </Sequence>
      <Sequence from={SLIDE_DURATION * 2} durationInFrames={SLIDE_DURATION}>
        <SolutionSlide />
      </Sequence>
      <Sequence from={SLIDE_DURATION * 3} durationInFrames={SLIDE_DURATION}>
        <HowItWorksSlide />
      </Sequence>
      <Sequence from={SLIDE_DURATION * 4} durationInFrames={SLIDE_DURATION}>
        <MarketSlide />
      </Sequence>
      <Sequence from={SLIDE_DURATION * 5} durationInFrames={SLIDE_DURATION}>
        <TractionSlide />
      </Sequence>
      <Sequence from={SLIDE_DURATION * 6} durationInFrames={SLIDE_DURATION}>
        <TeamSlide />
      </Sequence>
      <Sequence from={SLIDE_DURATION * 7} durationInFrames={SLIDE_DURATION}>
        <AskSlide />
      </Sequence>
      <Sequence from={SLIDE_DURATION * 8} durationInFrames={SLIDE_DURATION}>
        <ClosingSlide />
      </Sequence>
    </AbsoluteFill>
  );
};
