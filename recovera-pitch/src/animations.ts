import { interpolate, spring, Easing } from "remotion";

export const EASE_OUT_EXPO = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.4, 0, 0.2, 1);

export const fadeIn = (frame: number, delay = 0, dur = 20) =>
  interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const fadeOut = (frame: number, start: number, dur = 15) =>
  interpolate(frame, [start, start + dur], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const slideUp = (frame: number, delay = 0, dist = 28) =>
  interpolate(frame, [delay, delay + 28], [dist, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

export const slideRight = (frame: number, delay = 0, dist = 48) =>
  interpolate(frame, [delay, delay + 28], [-dist, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });

export const sp = (
  frame: number,
  delay = 0,
  config: { damping?: number; stiffness?: number; mass?: number } = {
    damping: 200,
    stiffness: 80,
  },
) => spring({ frame: frame - delay, fps: 30, config });

export const drawLine = (frame: number, delay = 0, dur = 30) =>
  interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT_EXPO,
  });
