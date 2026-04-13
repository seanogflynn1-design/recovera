export const COLORS = {
  // Backgrounds / surfaces
  bg: "#F8F8F5", // off-white page
  surface: "#FFFFFF", // card / content
  surfaceAlt: "#F1F1ED", // subtle alt panel

  // Ink
  ink: "#0D0D0D", // primary near-black text
  inkSoft: "#3F3F3F", // secondary
  muted: "#6B7280",
  mutedLight: "#9CA3AF",

  // Legacy text alias — existing refs use COLORS.white to mean "primary text".
  // In light mode that is ink. Kept as an alias so the migration stays small.
  white: "#0D0D0D",

  // Accent — forest green
  green: "#1F4D2E",
  greenDim: "#2A5F3D",
  greenFaint: "rgba(31,77,46,0.10)",
  greenGlow: "rgba(31,77,46,0.04)",

  // Legacy accent alias — code wrote COLORS.teal everywhere; remap to green.
  teal: "#1F4D2E",
  tealDim: "#2A5F3D",
  tealFaint: "rgba(31,77,46,0.10)",
  tealGlow: "rgba(31,77,46,0.04)",

  // Status
  red: "#B91C1C",
  redFaint: "rgba(185,28,28,0.10)",
  amber: "#B45309",
  // Success (greener than accent) — used for ✓ dots, trend markers
  success: "#0F6B3E",

  // Dividers — now dark alpha on light bg
  divider: "rgba(13,13,13,0.07)",
  border: "rgba(13,13,13,0.12)",

  // Device chrome (titanium-ish bezel around screens)
  device: "#1A1A1A",
  deviceInner: "#2A2A2A",
};

export const fps = 30;

export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;

// Scene durations (1.5× original, in frames @30fps)
// 810 + 630 + 900 + 630 + 540 + 540 + 720 + 1080 + 540 + 420 (wedge) + 540 + 360 + 270
export const DURATION_FRAMES = 7980;

// Founder placeholder — now inverted for light mode.
// A slightly darker off-white panel (visible as a structural slot against
// the page bg) with a label that matches the panel to stay invisible.
export const FOOTAGE_BG = "#EFEFEB";
export const FOOTAGE_TEXT = "#EFEFEB";
