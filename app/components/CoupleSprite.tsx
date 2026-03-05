"use client";

import { useEffect, useState, useRef, useCallback } from "react";

type Action = "walk" | "dance" | "wave" | "heart" | "spin" | "sleep" | "wake" | "idle";

// ── Pixel art sprites as inline SVG strings ──────────────────────────────────
// Each frame is a tiny 16x24 pixel figure drawn with SVG rects

const PIXEL = 2; // scale factor — each "pixel" = 2px

// Groom (dark outfit)
const GroomFrames: Record<string, JSX.Element[]> = {
  walk: [
    // frame 0 — left foot forward
    <svg key="g-w0" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      {/* head */}
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      {/* hair */}
      <rect x="5" y="0" width="6" height="2" fill="#2C1810"/>
      {/* body */}
      <rect x="4" y="6" width="8" height="7" fill="#1a1a2e"/>
      {/* bow tie */}
      <rect x="6" y="8" width="4" height="2" fill="#c0392b"/>
      {/* left arm */}
      <rect x="2" y="7" width="2" height="5" fill="#1a1a2e"/>
      {/* right arm out */}
      <rect x="12" y="7" width="2" height="6" fill="#1a1a2e"/>
      <rect x="13" y="12" width="2" height="2" fill="#F5CBA7"/>
      {/* legs */}
      <rect x="5" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="8" y="13" width="3" height="5" fill="#2c2c54"/>
      {/* shoes */}
      <rect x="4" y="19" width="4" height="2" fill="#1a1a1a"/>
      <rect x="8" y="18" width="4" height="2" fill="#1a1a1a"/>
    </svg>,
    // frame 1 — right foot forward
    <svg key="g-w1" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="5" y="0" width="6" height="2" fill="#2C1810"/>
      <rect x="4" y="6" width="8" height="7" fill="#1a1a2e"/>
      <rect x="6" y="8" width="4" height="2" fill="#c0392b"/>
      <rect x="2" y="7" width="2" height="6" fill="#1a1a2e"/>
      <rect x="1" y="12" width="2" height="2" fill="#F5CBA7"/>
      <rect x="12" y="7" width="2" height="5" fill="#1a1a2e"/>
      <rect x="5" y="13" width="3" height="5" fill="#2c2c54"/>
      <rect x="8" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="4" y="18" width="4" height="2" fill="#1a1a1a"/>
      <rect x="8" y="19" width="4" height="2" fill="#1a1a1a"/>
    </svg>,
  ],
  dance: [
    <svg key="g-d0" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="5" y="0" width="6" height="2" fill="#2C1810"/>
      <rect x="4" y="6" width="8" height="7" fill="#1a1a2e"/>
      <rect x="6" y="8" width="4" height="2" fill="#c0392b"/>
      {/* arms up */}
      <rect x="1" y="4" width="3" height="5" fill="#1a1a2e"/>
      <rect x="12" y="4" width="3" height="5" fill="#1a1a2e"/>
      <rect x="5" y="13" width="3" height="5" fill="#2c2c54"/>
      <rect x="8" y="13" width="3" height="5" fill="#2c2c54"/>
      <rect x="4" y="18" width="4" height="2" fill="#1a1a1a"/>
      <rect x="8" y="18" width="4" height="2" fill="#1a1a1a"/>
      {/* music notes */}
      <rect x="13" y="1" width="1" height="3" fill="#FFD700"/>
      <rect x="14" y="0" width="2" height="1" fill="#FFD700"/>
    </svg>,
    <svg key="g-d1" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="1" width="6" height="6" fill="#F5CBA7"/>
      <rect x="5" y="1" width="6" height="2" fill="#2C1810"/>
      <rect x="4" y="7" width="8" height="7" fill="#1a1a2e"/>
      <rect x="6" y="9" width="4" height="2" fill="#c0392b"/>
      <rect x="0" y="6" width="4" height="3" fill="#1a1a2e"/>
      <rect x="12" y="6" width="4" height="3" fill="#1a1a2e"/>
      <rect x="4" y="14" width="3" height="6" fill="#2c2c54"/>
      <rect x="9" y="14" width="3" height="6" fill="#2c2c54"/>
      <rect x="3" y="20" width="4" height="2" fill="#1a1a1a"/>
      <rect x="9" y="20" width="4" height="2" fill="#1a1a1a"/>
    </svg>,
  ],
  wave: [
    <svg key="g-wv0" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="5" y="0" width="6" height="2" fill="#2C1810"/>
      {/* smile */}
      <rect x="6" y="4" width="1" height="1" fill="#c0392b"/>
      <rect x="9" y="4" width="1" height="1" fill="#c0392b"/>
      <rect x="7" y="5" width="2" height="1" fill="#c0392b"/>
      <rect x="4" y="6" width="8" height="7" fill="#1a1a2e"/>
      <rect x="6" y="8" width="4" height="2" fill="#c0392b"/>
      {/* wave arm up high */}
      <rect x="12" y="2" width="2" height="6" fill="#1a1a2e"/>
      <rect x="13" y="1" width="2" height="3" fill="#F5CBA7"/>
      <rect x="2" y="7" width="2" height="5" fill="#1a1a2e"/>
      <rect x="5" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="8" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="4" y="19" width="4" height="2" fill="#1a1a1a"/>
      <rect x="8" y="19" width="4" height="2" fill="#1a1a1a"/>
    </svg>,
    <svg key="g-wv1" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="5" y="0" width="6" height="2" fill="#2C1810"/>
      <rect x="6" y="4" width="1" height="1" fill="#c0392b"/>
      <rect x="9" y="4" width="1" height="1" fill="#c0392b"/>
      <rect x="7" y="5" width="2" height="1" fill="#c0392b"/>
      <rect x="4" y="6" width="8" height="7" fill="#1a1a2e"/>
      <rect x="6" y="8" width="4" height="2" fill="#c0392b"/>
      <rect x="12" y="4" width="2" height="5" fill="#1a1a2e"/>
      <rect x="14" y="3" width="2" height="3" fill="#F5CBA7"/>
      <rect x="2" y="7" width="2" height="5" fill="#1a1a2e"/>
      <rect x="5" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="8" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="4" y="19" width="4" height="2" fill="#1a1a1a"/>
      <rect x="8" y="19" width="4" height="2" fill="#1a1a1a"/>
    </svg>,
  ],
  sleep: [
    <svg key="g-sl" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="5" y="0" width="6" height="2" fill="#2C1810"/>
      {/* closed eyes */}
      <rect x="6" y="3" width="2" height="1" fill="#2C1810"/>
      <rect x="9" y="3" width="2" height="1" fill="#2C1810"/>
      <rect x="4" y="6" width="8" height="7" fill="#1a1a2e"/>
      <rect x="6" y="8" width="4" height="2" fill="#c0392b"/>
      <rect x="2" y="8" width="2" height="4" fill="#1a1a2e"/>
      <rect x="12" y="8" width="2" height="4" fill="#1a1a2e"/>
      <rect x="5" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="8" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="4" y="19" width="4" height="2" fill="#1a1a1a"/>
      <rect x="8" y="19" width="4" height="2" fill="#1a1a1a"/>
      {/* z z z */}
      <rect x="13" y="0" width="2" height="1" fill="#aaa"/>
      <rect x="12" y="1" width="3" height="1" fill="#aaa"/>
    </svg>,
  ],
};

// Bride (pink/white outfit)
const BrideFrames: Record<string, JSX.Element[]> = {
  walk: [
    <svg key="b-w0" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      {/* hair bun */}
      <rect x="4" y="0" width="8" height="3" fill="#4a2c00"/>
      <rect x="9" y="0" width="3" height="4" fill="#4a2c00"/>
      {/* dress top */}
      <rect x="3" y="6" width="10" height="7" fill="#fff0f5"/>
      {/* lace detail */}
      <rect x="4" y="6" width="8" height="1" fill="#ffb6c1"/>
      {/* left arm */}
      <rect x="1" y="7" width="2" height="5" fill="#fff0f5"/>
      <rect x="0" y="11" width="2" height="2" fill="#F5CBA7"/>
      {/* right arm */}
      <rect x="13" y="7" width="2" height="6" fill="#fff0f5"/>
      {/* skirt — wide */}
      <rect x="1" y="13" width="14" height="6" fill="#fff0f5"/>
      <rect x="0" y="15" width="16" height="3" fill="#ffb6c1"/>
      {/* shoes */}
      <rect x="4" y="19" width="3" height="2" fill="#c0392b"/>
      <rect x="9" y="19" width="3" height="2" fill="#c0392b"/>
    </svg>,
    <svg key="b-w1" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="4" y="0" width="8" height="3" fill="#4a2c00"/>
      <rect x="9" y="0" width="3" height="4" fill="#4a2c00"/>
      <rect x="3" y="6" width="10" height="7" fill="#fff0f5"/>
      <rect x="4" y="6" width="8" height="1" fill="#ffb6c1"/>
      <rect x="1" y="7" width="2" height="6" fill="#fff0f5"/>
      <rect x="13" y="7" width="2" height="5" fill="#fff0f5"/>
      <rect x="13" y="11" width="2" height="2" fill="#F5CBA7"/>
      <rect x="1" y="13" width="14" height="6" fill="#fff0f5"/>
      <rect x="0" y="15" width="16" height="3" fill="#ffb6c1"/>
      <rect x="3" y="19" width="3" height="2" fill="#c0392b"/>
      <rect x="10" y="19" width="3" height="2" fill="#c0392b"/>
    </svg>,
  ],
  dance: [
    <svg key="b-d0" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="4" y="0" width="8" height="3" fill="#4a2c00"/>
      <rect x="9" y="0" width="3" height="4" fill="#4a2c00"/>
      <rect x="3" y="6" width="10" height="7" fill="#fff0f5"/>
      <rect x="4" y="6" width="8" height="1" fill="#ffb6c1"/>
      {/* arms up */}
      <rect x="0" y="3" width="3" height="5" fill="#fff0f5"/>
      <rect x="13" y="3" width="3" height="5" fill="#fff0f5"/>
      <rect x="1" y="13" width="14" height="7" fill="#fff0f5"/>
      <rect x="0" y="16" width="16" height="3" fill="#ffb6c1"/>
      <rect x="4" y="20" width="3" height="2" fill="#c0392b"/>
      <rect x="9" y="20" width="3" height="2" fill="#c0392b"/>
    </svg>,
    <svg key="b-d1" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="1" width="6" height="6" fill="#F5CBA7"/>
      <rect x="4" y="1" width="8" height="3" fill="#4a2c00"/>
      <rect x="9" y="1" width="3" height="4" fill="#4a2c00"/>
      <rect x="3" y="7" width="10" height="7" fill="#fff0f5"/>
      <rect x="4" y="7" width="8" height="1" fill="#ffb6c1"/>
      <rect x="0" y="5" width="3" height="4" fill="#fff0f5"/>
      <rect x="13" y="5" width="3" height="4" fill="#fff0f5"/>
      <rect x="0" y="14" width="16" height="7" fill="#fff0f5"/>
      <rect x="0" y="17" width="16" height="3" fill="#ffb6c1"/>
      <rect x="3" y="21" width="3" height="2" fill="#c0392b"/>
      <rect x="10" y="21" width="3" height="2" fill="#c0392b"/>
    </svg>,
  ],
  wave: [
    <svg key="b-wv0" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="4" y="0" width="8" height="3" fill="#4a2c00"/>
      <rect x="9" y="0" width="3" height="4" fill="#4a2c00"/>
      {/* smile */}
      <rect x="6" y="4" width="1" height="1" fill="#c0392b"/>
      <rect x="9" y="4" width="1" height="1" fill="#c0392b"/>
      <rect x="7" y="5" width="2" height="1" fill="#c0392b"/>
      <rect x="3" y="6" width="10" height="7" fill="#fff0f5"/>
      <rect x="4" y="6" width="8" height="1" fill="#ffb6c1"/>
      {/* wave arm */}
      <rect x="0" y="2" width="3" height="6" fill="#fff0f5"/>
      <rect x="0" y="1" width="2" height="3" fill="#F5CBA7"/>
      <rect x="13" y="7" width="2" height="5" fill="#fff0f5"/>
      <rect x="1" y="13" width="14" height="6" fill="#fff0f5"/>
      <rect x="0" y="15" width="16" height="3" fill="#ffb6c1"/>
      <rect x="4" y="19" width="3" height="2" fill="#c0392b"/>
      <rect x="9" y="19" width="3" height="2" fill="#c0392b"/>
    </svg>,
    <svg key="b-wv1" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="4" y="0" width="8" height="3" fill="#4a2c00"/>
      <rect x="9" y="0" width="3" height="4" fill="#4a2c00"/>
      <rect x="6" y="4" width="1" height="1" fill="#c0392b"/>
      <rect x="9" y="4" width="1" height="1" fill="#c0392b"/>
      <rect x="7" y="5" width="2" height="1" fill="#c0392b"/>
      <rect x="3" y="6" width="10" height="7" fill="#fff0f5"/>
      <rect x="4" y="6" width="8" height="1" fill="#ffb6c1"/>
      <rect x="0" y="4" width="3" height="5" fill="#fff0f5"/>
      <rect x="0" y="3" width="2" height="3" fill="#F5CBA7"/>
      <rect x="13" y="7" width="2" height="5" fill="#fff0f5"/>
      <rect x="1" y="13" width="14" height="6" fill="#fff0f5"/>
      <rect x="0" y="15" width="16" height="3" fill="#ffb6c1"/>
      <rect x="4" y="19" width="3" height="2" fill="#c0392b"/>
      <rect x="9" y="19" width="3" height="2" fill="#c0392b"/>
    </svg>,
  ],
  sleep: [
    <svg key="b-sl" width={16 * PIXEL} height={24 * PIXEL} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="4" y="0" width="8" height="3" fill="#4a2c00"/>
      <rect x="9" y="0" width="3" height="4" fill="#4a2c00"/>
      {/* closed eyes */}
      <rect x="6" y="3" width="2" height="1" fill="#4a2c00"/>
      <rect x="9" y="3" width="2" height="1" fill="#4a2c00"/>
      <rect x="3" y="6" width="10" height="7" fill="#fff0f5"/>
      <rect x="4" y="6" width="8" height="1" fill="#ffb6c1"/>
      <rect x="1" y="8" width="2" height="4" fill="#fff0f5"/>
      <rect x="13" y="8" width="2" height="4" fill="#fff0f5"/>
      <rect x="1" y="13" width="14" height="6" fill="#fff0f5"/>
      <rect x="0" y="15" width="16" height="3" fill="#ffb6c1"/>
      <rect x="4" y="19" width="3" height="2" fill="#c0392b"/>
      <rect x="9" y="19" width="3" height="2" fill="#c0392b"/>
      {/* z z z */}
      <rect x="0" y="0" width="2" height="1" fill="#aaa"/>
      <rect x="0" y="1" width="3" height="1" fill="#aaa"/>
    </svg>,
  ],
};

// Heart bubble
const HeartBubble = () => (
  <div className="absolute -top-6 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
    <svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="2" y="0" width="4" height="2" fill="#ff6b9d"/>
      <rect x="10" y="0" width="4" height="2" fill="#ff6b9d"/>
      <rect x="0" y="2" width="8" height="4" fill="#ff6b9d"/>
      <rect x="8" y="2" width="4" height="2" fill="#ff4488"/>
      <rect x="12" y="2" width="8" height="4" fill="#ff6b9d"/>
      <rect x="0" y="6" width="20" height="4" fill="#ff6b9d"/>
      <rect x="2" y="10" width="16" height="4" fill="#ff6b9d"/>
      <rect x="4" y="14" width="12" height="2" fill="#ff6b9d"/>
      <rect x="6" y="16" width="8" height="2" fill="#ff6b9d"/>
      <rect x="8" y="18" width="4" height="2" fill="#ff6b9d"/>
    </svg>
  </div>
);

// Music note bubble
const MusicNote = ({ offset = 0 }: { offset?: number }) => (
  <div
    className="absolute pointer-events-none"
    style={{ top: -20 - offset, left: "50%", transform: "translateX(-50%)", animation: `floatUp 2s ease-out ${offset * 0.3}s infinite` }}
  >
    <svg width="10" height="12" viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="4" y="0" width="1" height="6" fill="#FFD700"/>
      <rect x="5" y="0" width="4" height="2" fill="#FFD700"/>
      <rect x="2" y="6" width="3" height="3" fill="#FFD700"/>
    </svg>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
export default function CoupleSprite({ isOpen, isPlaying }: { isOpen: boolean; isPlaying: boolean }) {
  const [action, setAction] = useState<Action>("sleep");
  const [frame, setFrame] = useState(0);
  const [pos, setPos] = useState({ x: 60, y: 70 }); // percent of screen
  const [dir, setDir] = useState<1 | -1>(1); // 1=right, -1=left
  const [showHeart, setShowHeart] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [idleTime, setIdleTime] = useState(0);

  const actionRef = useRef(action);
  const posRef = useRef(pos);
  const dirRef = useRef(dir);
  actionRef.current = action;
  posRef.current = pos;
  dirRef.current = dir;

  // ── Wake up when invitation opens ──
  useEffect(() => {
    if (isOpen && action === "sleep") {
      setAction("wake");
      setTimeout(() => {
        setAction("wave");
        setTimeout(() => setAction("walk"), 3000);
      }, 1000);
    }
  }, [isOpen]);

  // ── Dance when music plays ──
  useEffect(() => {
    if (isPlaying && action === "walk") {
      setAction("dance");
    } else if (!isPlaying && action === "dance") {
      setAction("walk");
    }
  }, [isPlaying]);

  // ── Idle detection → sleep ──
  useEffect(() => {
    if (!isOpen) return;
    const t = setInterval(() => {
      setIdleTime((i) => {
        if (i > 12 && actionRef.current === "walk") {
          setAction("sleep");
          return 0;
        }
        return i + 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [isOpen]);

  // ── Scroll reaction ──
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      if (dy > 30 && actionRef.current !== "dance") {
        setIsSpinning(true);
        setIdleTime(0);
        setTimeout(() => setIsSpinning(false), 600);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Touch/click to wake ──
  const handleTap = useCallback(() => {
    setIdleTime(0);
    if (actionRef.current === "sleep") {
      setAction("wave");
      setTimeout(() => setAction(isPlaying ? "dance" : "walk"), 2500);
    } else {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1500);
    }
  }, [isPlaying]);

  // ── Walk movement ──
  useEffect(() => {
    if (action !== "walk" && action !== "dance") return;
    const move = setInterval(() => {
      setPos((p) => {
        let nx = p.x + dirRef.current * 0.4;
        let nd = dirRef.current;
        if (nx > 80) { nx = 80; nd = -1; setDir(-1); }
        if (nx < 5)  { nx = 5;  nd = 1;  setDir(1); }
        return { ...p, x: nx };
      });
    }, 50);
    return () => clearInterval(move);
  }, [action]);

  // ── Frame animation ──
  useEffect(() => {
    const speed = action === "dance" ? 200 : action === "walk" ? 300 : 500;
    const t = setInterval(() => setFrame((f) => f + 1), speed);
    return () => clearInterval(t);
  }, [action]);

  // ── Heart animation loop ──
  useEffect(() => {
    if (action !== "walk" && action !== "dance") return;
    const t = setInterval(() => {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1200);
    }, 8000);
    return () => clearInterval(t);
  }, [action]);

  if (!isOpen && action === "sleep") return null;

  // Pick sprite frames
  const getGroomFrame = () => {
    const frames = action === "dance" ? GroomFrames.dance
      : action === "wave" || action === "wake" ? GroomFrames.wave
      : action === "sleep" ? GroomFrames.sleep
      : GroomFrames.walk;
    return frames[frame % frames.length];
  };

  const getBrideFrame = () => {
    const frames = action === "dance" ? BrideFrames.dance
      : action === "wave" || action === "wake" ? BrideFrames.wave
      : action === "sleep" ? BrideFrames.sleep
      : BrideFrames.walk;
    return frames[frame % frames.length];
  };

  const flipped = dir === -1;

  return (
    <>
      {/* Inject keyframes */}
      <style>{`
        @keyframes floatUp {
          0%   { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-30px); }
        }
        @keyframes spin360 {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div
        className="fixed z-50 pointer-events-none select-none"
        style={{
          left: `${pos.x}%`,
          bottom: "2%",
          transform: flipped ? "scaleX(-1)" : "scaleX(1)",
          transition: "left 0.05s linear",
        }}
      >
        <div
          className="relative flex items-end gap-1 cursor-pointer pointer-events-auto"
          onClick={handleTap}
          style={{
            animation: isSpinning ? "spin360 0.5s ease-in-out" : "none",
          }}
        >
          {/* Heart bubble above couple */}
          {showHeart && <HeartBubble />}

          {/* Music notes when dancing */}
          {action === "dance" && (
            <>
              <MusicNote offset={0} />
              <MusicNote offset={1} />
            </>
          )}

          {/* Groom */}
          <div style={{ imageRendering: "pixelated" }}>
            {getGroomFrame()}
          </div>

          {/* Holding hands connector */}
          {(action === "walk" || action === "dance") && (
            <div style={{
              width: 4,
              height: 4,
              background: "#F5CBA7",
              alignSelf: "center",
              marginBottom: 8,
              borderRadius: 1,
            }} />
          )}

          {/* Bride */}
          <div style={{ imageRendering: "pixelated" }}>
            {getBrideFrame()}
          </div>
        </div>

        {/* Sleep ZZZ label */}
        {action === "sleep" && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-white/60 text-xs font-bold animate-bounce">
            z z z
          </div>
        )}

        {/* Tap hint on first open */}
        {action === "wave" && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 text-white text-xs px-2 py-1 rounded-full font-battambang">
            ចុចលើយើង! 👆
          </div>
        )}
      </div>
    </>
  );
}
