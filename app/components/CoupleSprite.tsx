"use client";

import { useEffect, useState, useRef, useCallback } from "react";

type Action = "walk" | "dance" | "wave" | "sleep" | "wake" | "idle";

const P = 2; // each pixel = 2px

// ── Groom sprites ─────────────────────────────────────────────────────────────
function GroomWalk({ f }: { f: number }) {
  return f % 2 === 0 ? (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="5" y="0" width="6" height="2" fill="#2C1810"/>
      <rect x="4" y="6" width="8" height="7" fill="#1a1a2e"/>
      <rect x="6" y="8" width="4" height="2" fill="#c0392b"/>
      <rect x="2" y="7" width="2" height="5" fill="#1a1a2e"/>
      <rect x="12" y="7" width="2" height="6" fill="#1a1a2e"/>
      <rect x="13" y="12" width="2" height="2" fill="#F5CBA7"/>
      <rect x="5" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="8" y="13" width="3" height="5" fill="#2c2c54"/>
      <rect x="4" y="19" width="4" height="2" fill="#111"/>
      <rect x="8" y="18" width="4" height="2" fill="#111"/>
    </svg>
  ) : (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="5" y="0" width="6" height="2" fill="#2C1810"/>
      <rect x="4" y="6" width="8" height="7" fill="#1a1a2e"/>
      <rect x="6" y="8" width="4" height="2" fill="#c0392b"/>
      <rect x="2" y="7" width="2" height="6" fill="#1a1a2e"/>
      <rect x="1" y="12" width="2" height="2" fill="#F5CBA7"/>
      <rect x="12" y="7" width="2" height="5" fill="#1a1a2e"/>
      <rect x="5" y="13" width="3" height="5" fill="#2c2c54"/>
      <rect x="8" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="4" y="18" width="4" height="2" fill="#111"/>
      <rect x="8" y="19" width="4" height="2" fill="#111"/>
    </svg>
  );
}

function GroomDance({ f }: { f: number }) {
  return f % 2 === 0 ? (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="1" width="6" height="6" fill="#F5CBA7"/>
      <rect x="5" y="1" width="6" height="2" fill="#2C1810"/>
      <rect x="4" y="7" width="8" height="7" fill="#1a1a2e"/>
      <rect x="6" y="9" width="4" height="2" fill="#c0392b"/>
      <rect x="0" y="4" width="4" height="5" fill="#1a1a2e"/>
      <rect x="12" y="4" width="4" height="5" fill="#1a1a2e"/>
      <rect x="5" y="14" width="3" height="5" fill="#2c2c54"/>
      <rect x="8" y="14" width="3" height="5" fill="#2c2c54"/>
      <rect x="4" y="19" width="4" height="2" fill="#111"/>
      <rect x="8" y="19" width="4" height="2" fill="#111"/>
    </svg>
  ) : (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="5" y="0" width="6" height="2" fill="#2C1810"/>
      <rect x="4" y="6" width="8" height="7" fill="#1a1a2e"/>
      <rect x="6" y="8" width="4" height="2" fill="#c0392b"/>
      <rect x="1" y="5" width="3" height="4" fill="#1a1a2e"/>
      <rect x="12" y="5" width="3" height="4" fill="#1a1a2e"/>
      <rect x="4" y="13" width="4" height="6" fill="#2c2c54"/>
      <rect x="8" y="13" width="4" height="6" fill="#2c2c54"/>
      <rect x="3" y="19" width="5" height="2" fill="#111"/>
      <rect x="8" y="19" width="5" height="2" fill="#111"/>
    </svg>
  );
}

function GroomWave({ f }: { f: number }) {
  return f % 2 === 0 ? (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="5" y="0" width="6" height="2" fill="#2C1810"/>
      <rect x="6" y="4" width="1" height="1" fill="#c0392b"/>
      <rect x="9" y="4" width="1" height="1" fill="#c0392b"/>
      <rect x="7" y="5" width="2" height="1" fill="#c0392b"/>
      <rect x="4" y="6" width="8" height="7" fill="#1a1a2e"/>
      <rect x="6" y="8" width="4" height="2" fill="#c0392b"/>
      <rect x="12" y="2" width="2" height="6" fill="#1a1a2e"/>
      <rect x="13" y="1" width="2" height="3" fill="#F5CBA7"/>
      <rect x="2" y="7" width="2" height="5" fill="#1a1a2e"/>
      <rect x="5" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="8" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="4" y="19" width="4" height="2" fill="#111"/>
      <rect x="8" y="19" width="4" height="2" fill="#111"/>
    </svg>
  ) : (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
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
      <rect x="4" y="19" width="4" height="2" fill="#111"/>
      <rect x="8" y="19" width="4" height="2" fill="#111"/>
    </svg>
  );
}

function GroomSleep() {
  return (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="5" y="0" width="6" height="2" fill="#2C1810"/>
      <rect x="6" y="3" width="2" height="1" fill="#2C1810"/>
      <rect x="9" y="3" width="2" height="1" fill="#2C1810"/>
      <rect x="4" y="6" width="8" height="7" fill="#1a1a2e"/>
      <rect x="6" y="8" width="4" height="2" fill="#c0392b"/>
      <rect x="2" y="8" width="2" height="4" fill="#1a1a2e"/>
      <rect x="12" y="8" width="2" height="4" fill="#1a1a2e"/>
      <rect x="5" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="8" y="13" width="3" height="6" fill="#2c2c54"/>
      <rect x="4" y="19" width="4" height="2" fill="#111"/>
      <rect x="8" y="19" width="4" height="2" fill="#111"/>
    </svg>
  );
}

// ── Bride sprites ──────────────────────────────────────────────────────────────
function BrideWalk({ f }: { f: number }) {
  return f % 2 === 0 ? (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="4" y="0" width="8" height="3" fill="#4a2c00"/>
      <rect x="9" y="0" width="3" height="4" fill="#4a2c00"/>
      <rect x="3" y="6" width="10" height="7" fill="#fff0f5"/>
      <rect x="4" y="6" width="8" height="1" fill="#ffb6c1"/>
      <rect x="1" y="7" width="2" height="5" fill="#fff0f5"/>
      <rect x="0" y="11" width="2" height="2" fill="#F5CBA7"/>
      <rect x="13" y="7" width="2" height="6" fill="#fff0f5"/>
      <rect x="1" y="13" width="14" height="6" fill="#fff0f5"/>
      <rect x="0" y="15" width="16" height="3" fill="#ffb6c1"/>
      <rect x="4" y="19" width="3" height="2" fill="#c0392b"/>
      <rect x="9" y="19" width="3" height="2" fill="#c0392b"/>
    </svg>
  ) : (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
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
    </svg>
  );
}

function BrideDance({ f }: { f: number }) {
  return f % 2 === 0 ? (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="1" width="6" height="6" fill="#F5CBA7"/>
      <rect x="4" y="1" width="8" height="3" fill="#4a2c00"/>
      <rect x="9" y="1" width="3" height="4" fill="#4a2c00"/>
      <rect x="3" y="7" width="10" height="7" fill="#fff0f5"/>
      <rect x="4" y="7" width="8" height="1" fill="#ffb6c1"/>
      <rect x="0" y="3" width="3" height="6" fill="#fff0f5"/>
      <rect x="13" y="3" width="3" height="6" fill="#fff0f5"/>
      <rect x="0" y="14" width="16" height="7" fill="#fff0f5"/>
      <rect x="0" y="17" width="16" height="3" fill="#ffb6c1"/>
      <rect x="3" y="21" width="4" height="2" fill="#c0392b"/>
      <rect x="9" y="21" width="4" height="2" fill="#c0392b"/>
    </svg>
  ) : (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="4" y="0" width="8" height="3" fill="#4a2c00"/>
      <rect x="9" y="0" width="3" height="4" fill="#4a2c00"/>
      <rect x="3" y="6" width="10" height="7" fill="#fff0f5"/>
      <rect x="4" y="6" width="8" height="1" fill="#ffb6c1"/>
      <rect x="0" y="5" width="3" height="4" fill="#fff0f5"/>
      <rect x="13" y="5" width="3" height="4" fill="#fff0f5"/>
      <rect x="1" y="13" width="14" height="7" fill="#fff0f5"/>
      <rect x="0" y="16" width="16" height="3" fill="#ffb6c1"/>
      <rect x="4" y="20" width="3" height="2" fill="#c0392b"/>
      <rect x="9" y="20" width="3" height="2" fill="#c0392b"/>
    </svg>
  );
}

function BrideWave({ f }: { f: number }) {
  return f % 2 === 0 ? (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="4" y="0" width="8" height="3" fill="#4a2c00"/>
      <rect x="9" y="0" width="3" height="4" fill="#4a2c00"/>
      <rect x="6" y="4" width="1" height="1" fill="#c0392b"/>
      <rect x="9" y="4" width="1" height="1" fill="#c0392b"/>
      <rect x="7" y="5" width="2" height="1" fill="#c0392b"/>
      <rect x="3" y="6" width="10" height="7" fill="#fff0f5"/>
      <rect x="4" y="6" width="8" height="1" fill="#ffb6c1"/>
      <rect x="0" y="2" width="3" height="6" fill="#fff0f5"/>
      <rect x="0" y="1" width="2" height="3" fill="#F5CBA7"/>
      <rect x="13" y="7" width="2" height="5" fill="#fff0f5"/>
      <rect x="1" y="13" width="14" height="6" fill="#fff0f5"/>
      <rect x="0" y="15" width="16" height="3" fill="#ffb6c1"/>
      <rect x="4" y="19" width="3" height="2" fill="#c0392b"/>
      <rect x="9" y="19" width="3" height="2" fill="#c0392b"/>
    </svg>
  ) : (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
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
    </svg>
  );
}

function BrideSleep() {
  return (
    <svg width={16 * P} height={24 * P} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="5" y="0" width="6" height="6" fill="#F5CBA7"/>
      <rect x="4" y="0" width="8" height="3" fill="#4a2c00"/>
      <rect x="9" y="0" width="3" height="4" fill="#4a2c00"/>
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
    </svg>
  );
}

// ── Pixel Heart ───────────────────────────────────────────────────────────────
function PixelHeart() {
  return (
    <div className="absolute -top-7 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
      <svg width="16" height="14" viewBox="0 0 8 7" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
        <rect x="1" y="0" width="2" height="1" fill="#ff6b9d"/>
        <rect x="5" y="0" width="2" height="1" fill="#ff6b9d"/>
        <rect x="0" y="1" width="4" height="2" fill="#ff6b9d"/>
        <rect x="4" y="1" width="4" height="2" fill="#ff6b9d"/>
        <rect x="0" y="3" width="8" height="2" fill="#ff6b9d"/>
        <rect x="1" y="5" width="6" height="1" fill="#ff6b9d"/>
        <rect x="2" y="6" width="4" height="1" fill="#ff6b9d"/>
      </svg>
    </div>
  );
}

// ── Music Note ────────────────────────────────────────────────────────────────
function MusicNote({ delay }: { delay: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: -16,
        left: "50%",
        animation: `spriteFloat 1.8s ease-out ${delay}s infinite`,
      }}
    >
      <svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
        <rect x="3" y="0" width="1" height="5" fill="#FFD700"/>
        <rect x="4" y="0" width="3" height="2" fill="#FFD700"/>
        <rect x="1" y="5" width="3" height="3" fill="#FFD700"/>
      </svg>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function CoupleSprite({
  isOpen,
  isPlaying,
}: {
  isOpen: boolean;
  isPlaying: boolean;
}) {
  const [action, setAction] = useState<Action>("sleep");
  const [frame, setFrame] = useState(0);
  const [posX, setPosX] = useState(55);
  const [dir, setDir] = useState<1 | -1>(1);
  const [showHeart, setShowHeart] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const idleCountRef = useRef(0);

  const actionRef = useRef(action);
  const dirRef = useRef(dir);
  const isPlayingRef = useRef(isPlaying);
  actionRef.current = action;
  dirRef.current = dir;
  isPlayingRef.current = isPlaying;

  // Wake up on open
  useEffect(() => {
    if (!isOpen) return;
    setAction("wave");
    const t = setTimeout(() => setAction("walk"), 3000);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Dance on music
  useEffect(() => {
    if (!isOpen) return;
    if (isPlaying && actionRef.current === "walk") setAction("dance");
    if (!isPlaying && actionRef.current === "dance") setAction("walk");
  }, [isPlaying, isOpen]);

  // Idle → sleep
  useEffect(() => {
    if (!isOpen) return;
    const t = setInterval(() => {
      idleCountRef.current += 1;
      if (idleCountRef.current >= 15 && actionRef.current === "walk") {
        setAction("sleep");
        idleCountRef.current = 0;
      }
    }, 1000);
    return () => clearInterval(t);
  }, [isOpen]);

  // Scroll spin
  useEffect(() => {
    if (!isOpen) return;
    let lastY = 0;
    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      if (dy > 20 && !isSpinning) {
        setIsSpinning(true);
        idleCountRef.current = 0;
        setTimeout(() => setIsSpinning(false), 500);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Also listen to touch scroll on mobile panels
    const panels = document.querySelectorAll(".snap-y");
    panels.forEach((el) => el.addEventListener("scroll", onScroll, { passive: true }));
    return () => {
      window.removeEventListener("scroll", onScroll);
      panels.forEach((el) => el.removeEventListener("scroll", onScroll));
    };
  }, [isOpen, isSpinning]);

  // Walk movement
  useEffect(() => {
    if (action !== "walk" && action !== "dance") return;
    const t = setInterval(() => {
      setPosX((x) => {
        const nx = x + dirRef.current * 0.3;
        if (nx > 78) { setDir(-1); return 78; }
        if (nx < 4)  { setDir(1);  return 4; }
        return nx;
      });
    }, 50);
    return () => clearInterval(t);
  }, [action]);

  // Frame ticker
  useEffect(() => {
    const speed = action === "dance" ? 180 : action === "walk" ? 280 : 600;
    const t = setInterval(() => setFrame((f) => f + 1), speed);
    return () => clearInterval(t);
  }, [action]);

  // Periodic heart
  useEffect(() => {
    if (action !== "walk" && action !== "dance") return;
    const t = setInterval(() => {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1400);
    }, 7000);
    return () => clearInterval(t);
  }, [action]);

  // Tap handler
  const handleTap = useCallback(() => {
    idleCountRef.current = 0;
    if (actionRef.current === "sleep") {
      setAction("wave");
      setTimeout(() => setAction(isPlayingRef.current ? "dance" : "walk"), 2500);
    } else {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1400);
    }
  }, []);

  if (!isOpen) return null;

  const flipped = dir === -1;

  return (
    <>
      <style>{`
        @keyframes spriteFloat {
          0%   { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-24px); }
        }
        @keyframes spriteSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div
        className="fixed z-50 bottom-3 pointer-events-none select-none"
        style={{
          left: `${posX}%`,
          transform: flipped ? "scaleX(-1)" : "scaleX(1)",
          transition: "left 0.05s linear",
        }}
      >
        <div
          className="relative flex items-end gap-0.5 pointer-events-auto cursor-pointer touch-manipulation"
          onClick={handleTap}
          style={{ animation: isSpinning ? "spriteSpin 0.5s ease-in-out" : "none" }}
        >
          {/* Bubbles */}
          {showHeart && <PixelHeart />}
          {action === "dance" && (
            <>
              <MusicNote delay={0} />
              <MusicNote delay={0.6} />
            </>
          )}

          {/* Groom */}
          {action === "walk"  && <GroomWalk  f={frame} />}
          {action === "dance" && <GroomDance f={frame} />}
          {action === "wave"  && <GroomWave  f={frame} />}
          {action === "wake"  && <GroomWave  f={frame} />}
          {action === "sleep" && <GroomSleep />}
          {action === "idle"  && <GroomWalk  f={0} />}

          {/* Holding hands dot */}
          {(action === "walk" || action === "dance") && (
            <div style={{ width: 4, height: 4, background: "#F5CBA7", marginBottom: 14, borderRadius: 2, flexShrink: 0 }} />
          )}

          {/* Bride */}
          {action === "walk"  && <BrideWalk  f={frame} />}
          {action === "dance" && <BrideDance f={frame} />}
          {action === "wave"  && <BrideWave  f={frame} />}
          {action === "wake"  && <BrideWave  f={frame} />}
          {action === "sleep" && <BrideSleep />}
          {action === "idle"  && <BrideWalk  f={0} />}
        </div>

        {/* ZZZ */}
        {action === "sleep" && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white/70 text-xs font-bold animate-bounce whitespace-nowrap">
            z z z
          </div>
        )}

        {/* Tap hint on wave */}
        {action === "wave" && (
          <div
            className="absolute -top-9 left-1/2 whitespace-nowrap bg-black/70 text-white text-xs px-2 py-1 rounded-full pointer-events-none font-battambang"
            style={{ transform: flipped ? "translateX(-50%) scaleX(-1)" : "translateX(-50%)" }}
          >
            ចុចលើយើង! 👋
          </div>
        )}
      </div>
    </>
  );
}
