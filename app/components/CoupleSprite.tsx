"use client";

import { useEffect, useState, useRef, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Mood = "walk" | "run" | "dance" | "wave" | "sleep" | "kiss" | "spin" | "shy" | "jump" | "idle" | "peek";

// ── Pixel scale ───────────────────────────────────────────────────────────────
const S = 3; // 1 pixel = 3px → bigger, cuter

// ── DREAMWORLD GROOM ──────────────────────────────────────────────────────────
// Rounder head, sparkly eyes, cute expression changes

function Groom({ mood, f, faceMod }: { mood: Mood; f: number; faceMod: number }) {
  const blink = f % 40 > 37; // blink occasionally
  const bounce = (mood === "walk" || mood === "run") ? (f % 2 === 0 ? 0 : -1) : 0;
  const jumpY  = mood === "jump" ? Math.sin((f % 12) * Math.PI / 6) * -4 : 0;
  const bobY   = mood === "dance" ? Math.sin((f % 8) * Math.PI / 4) * -2 : 0;
  const totalY = bounce + jumpY + bobY;

  // Face expressions
  const face = (() => {
    if (blink) return "blink";
    if (mood === "kiss") return "kiss";
    if (mood === "shy") return "shy";
    if (mood === "sleep") return "sleep";
    if (mood === "dance") return "happy";
    if (faceMod === 1) return "wink";
    if (faceMod === 2) return "surprised";
    return "normal";
  })();

  return (
    <svg
      width={18 * S} height={26 * S}
      viewBox="0 0 18 26"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated", transform: `translateY(${totalY}px)`, transition: "transform 0.08s" }}
    >
      {/* ── Shadow ── */}
      <ellipse cx="9" cy="25.5" rx="5" ry="1" fill="rgba(0,0,0,0.18)"/>

      {/* ── Hair ── */}
      <rect x="3" y="0" width="12" height="4" fill="#1a0a00" rx="1"/>
      <rect x="2" y="2" width="2" height="3" fill="#1a0a00"/>
      <rect x="14" y="2" width="2" height="2" fill="#1a0a00"/>
      {/* hair swoop */}
      <rect x="4" y="0" width="4" height="2" fill="#2d1200"/>

      {/* ── Head ── */}
      <rect x="3" y="3" width="12" height="10" fill="#fce4c8" rx="2"/>
      {/* cheeks */}
      <rect x="3" y="9" width="2" height="2" fill="#f4a4a4" opacity="0.6"/>
      <rect x="13" y="9" width="2" height="2" fill="#f4a4a4" opacity="0.6"/>

      {/* ── Eyes ── */}
      {face === "blink" && <>
        <rect x="5" y="6" width="3" height="1" fill="#1a0a00"/>
        <rect x="10" y="6" width="3" height="1" fill="#1a0a00"/>
      </>}
      {face === "wink" && <>
        <rect x="5" y="5" width="3" height="3" fill="#1a0a00" rx="1"/>
        <rect x="6" y="6" width="1" height="1" fill="#fff"/>
        <rect x="10" y="6" width="3" height="1" fill="#1a0a00"/>
      </>}
      {face === "surprised" && <>
        <rect x="5" y="5" width="3" height="3" fill="#1a0a00" rx="1"/>
        <rect x="6" y="6" width="1" height="1" fill="#fff"/>
        <rect x="10" y="5" width="3" height="3" fill="#1a0a00" rx="1"/>
        <rect x="11" y="6" width="1" height="1" fill="#fff"/>
      </>}
      {face === "kiss" && <>
        <rect x="5" y="6" width="3" height="1" fill="#1a0a00"/>
        <rect x="10" y="6" width="3" height="1" fill="#1a0a00"/>
      </>}
      {face === "sleep" && <>
        <rect x="5" y="7" width="3" height="1" fill="#1a0a00"/>
        <rect x="10" y="7" width="3" height="1" fill="#1a0a00"/>
      </>}
      {face === "shy" && <>
        <rect x="5" y="6" width="3" height="2" fill="#1a0a00" rx="1"/>
        <rect x="6" y="7" width="1" height="1" fill="#fff"/>
        <rect x="10" y="6" width="3" height="2" fill="#1a0a00" rx="1"/>
        <rect x="11" y="7" width="1" height="1" fill="#fff"/>
      </>}
      {(face === "normal" || face === "happy") && <>
        <rect x="5" y="5" width="3" height="3" fill="#1a0a00" rx="1"/>
        <rect x="6" y="6" width="1" height="1" fill="#4fc3f7"/>
        <rect x="10" y="5" width="3" height="3" fill="#1a0a00" rx="1"/>
        <rect x="11" y="6" width="1" height="1" fill="#4fc3f7"/>
        {/* sparkle */}
        <rect x="6" y="5" width="1" height="1" fill="#fff" opacity="0.9"/>
        <rect x="11" y="5" width="1" height="1" fill="#fff" opacity="0.9"/>
      </>}

      {/* ── Mouth ── */}
      {face === "happy" && <>
        <rect x="6" y="10" width="1" height="1" fill="#c0392b"/>
        <rect x="7" y="11" width="4" height="1" fill="#c0392b"/>
        <rect x="11" y="10" width="1" height="1" fill="#c0392b"/>
      </>}
      {face === "kiss" && <>
        <rect x="7" y="10" width="4" height="2" fill="#e91e8c" rx="1"/>
        <rect x="8" y="9" width="2" height="1" fill="#e91e8c"/>
      </>}
      {face === "shy" && <>
        <rect x="7" y="11" width="4" height="1" fill="#c0392b"/>
      </>}
      {face === "surprised" && <>
        <rect x="7" y="10" width="4" height="3" fill="#1a0a00" rx="1"/>
      </>}
      {face === "sleep" && <>
        <rect x="7" y="10" width="4" height="1" fill="#c0392b"/>
      </>}
      {(face === "normal" || face === "wink" || face === "blink") && <>
        <rect x="7" y="10" width="4" height="1" fill="#c0392b"/>
        <rect x="6" y="11" width="1" height="1" fill="#c0392b"/>
        <rect x="11" y="11" width="1" height="1" fill="#c0392b"/>
      </>}

      {/* ── Suit (body) ── */}
      <rect x="3" y="13" width="12" height="8" fill="#1a1a3e" rx="1"/>
      {/* white shirt */}
      <rect x="7" y="13" width="4" height="8" fill="#ecf0f1"/>
      {/* bow tie */}
      <rect x="7" y="14" width="2" height="2" fill="#e74c3c"/>
      <rect x="9" y="14" width="2" height="2" fill="#e74c3c"/>
      <rect x="8" y="15" width="2" height="1" fill="#c0392b"/>
      {/* lapels */}
      <rect x="3" y="13" width="4" height="5" fill="#2c2c6e"/>
      <rect x="11" y="13" width="4" height="5" fill="#2c2c6e"/>

      {/* ── Arms ── */}
      {mood === "dance" && <>
        <rect x="0" y={f%2===0?9:11} width="3" height="4" fill="#1a1a3e"/>
        <rect x="15" y={f%2===0?11:9} width="3" height="4" fill="#1a1a3e"/>
      </>}
      {mood === "wave" && <>
        <rect x="0" y="10" width="3" height="5" fill="#1a1a3e"/>
        <rect x="15" y={f%2===0?8:10} width="3" height="5" fill="#1a1a3e"/>
        <rect x={f%2===0?16:17} y={f%2===0?6:8} width="2" height="3" fill="#fce4c8"/>
      </>}
      {mood === "kiss" && <>
        <rect x="0" y="12" width="3" height="4" fill="#1a1a3e"/>
        <rect x="15" y="10" width="3" height="6" fill="#1a1a3e"/>
      </>}
      {(mood !== "dance" && mood !== "wave" && mood !== "kiss") && <>
        <rect x="0" y="14" width="3" height="5" fill="#1a1a3e"/>
        <rect x="15" y="14" width="3" height="5" fill="#1a1a3e"/>
        <rect x="0" y="18" width="2" height="2" fill="#fce4c8"/>
        <rect x="16" y="18" width="2" height="2" fill="#fce4c8"/>
      </>}

      {/* ── Pants ── */}
      <rect x="3" y="21" width="5" height="4" fill="#12124a"/>
      <rect x="10" y="21" width="5" height="4" fill="#12124a"/>
      {/* walk leg swing */}
      {(mood === "walk" || mood === "run") && f%2===0 && <>
        <rect x="3" y="21" width="5" height="4" fill="#12124a" transform="rotate(-8,5,21)"/>
        <rect x="10" y="21" width="5" height="4" fill="#12124a" transform="rotate(8,12,21)"/>
      </>}
      {/* shoes */}
      <rect x="2" y="24" width="6" height="2" fill="#111" rx="1"/>
      <rect x="10" y="24" width="6" height="2" fill="#111" rx="1"/>

      {/* ── Sleep ZZZ ── */}
      {mood === "sleep" && <>
        <rect x="14" y="0" width="2" height="1" fill="#a8d8ea" opacity="0.9"/>
        <rect x="13" y="1" width="4" height="1" fill="#a8d8ea" opacity="0.9"/>
        <rect x="15" y="-2" width="3" height="1" fill="#a8d8ea" opacity="0.7"/>
        <rect x="14" y="-3" width="5" height="1" fill="#a8d8ea" opacity="0.7"/>
      </>}
    </svg>
  );
}

// ── DREAMWORLD BRIDE ──────────────────────────────────────────────────────────
function Bride({ mood, f, faceMod }: { mood: Mood; f: number; faceMod: number }) {
  const blink = f % 44 > 41;
  const bounce = (mood === "walk" || mood === "run") ? (f % 2 === 0 ? 0 : -1) : 0;
  const jumpY  = mood === "jump" ? Math.sin((f % 12) * Math.PI / 6) * -4 : 0;
  const bobY   = mood === "dance" ? Math.sin((f % 8) * Math.PI / 4 + 0.5) * -2 : 0;
  const totalY = bounce + jumpY + bobY;

  const face = (() => {
    if (blink) return "blink";
    if (mood === "kiss") return "kiss";
    if (mood === "shy") return "shy";
    if (mood === "sleep") return "sleep";
    if (mood === "dance") return "happy";
    if (faceMod === 1) return "wink";
    if (faceMod === 2) return "excited";
    return "normal";
  })();

  const skirtW = mood === "dance" ? (f % 2 === 0 ? 16 : 18) : 16;
  const skirtX = mood === "dance" ? (f % 2 === 0 ? 1 : 0) : 1;

  return (
    <svg
      width={18 * S} height={28 * S}
      viewBox="0 0 18 28"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated", transform: `translateY(${totalY}px)`, transition: "transform 0.08s" }}
    >
      {/* ── Shadow ── */}
      <ellipse cx="9" cy="27.5" rx="6" ry="1" fill="rgba(0,0,0,0.15)"/>

      {/* ── Veil / tiara ── */}
      <rect x="4" y="0" width="10" height="2" fill="#fff9e6"/>
      <rect x="8" y="0" width="2" height="1" fill="#FFD700"/>
      <rect x="7" y="1" width="1" height="1" fill="#FFD700"/>
      <rect x="10" y="1" width="1" height="1" fill="#FFD700"/>
      {/* veil drape */}
      <rect x="14" y="1" width="2" height="8" fill="#fff9e6" opacity="0.7"/>
      <rect x="15" y="9" width="2" height="4" fill="#fff9e6" opacity="0.4"/>

      {/* ── Hair ── */}
      <rect x="3" y="1" width="12" height="4" fill="#3d1c00" rx="1"/>
      <rect x="2" y="3" width="2" height="5" fill="#3d1c00"/>
      <rect x="14" y="3" width="2" height="4" fill="#3d1c00"/>
      {/* hair bun */}
      <rect x="13" y="0" width="4" height="4" fill="#3d1c00" rx="2"/>
      <rect x="14" y="0" width="3" height="2" fill="#5a2d00"/>

      {/* ── Head ── */}
      <rect x="3" y="3" width="12" height="10" fill="#fce4c8" rx="2"/>
      {/* cheeks */}
      <rect x="3" y="9" width="3" height="2" fill="#ffb3ba" opacity="0.7"/>
      <rect x="12" y="9" width="3" height="2" fill="#ffb3ba" opacity="0.7"/>

      {/* ── Eyes ── */}
      {face === "blink" && <>
        <rect x="5" y="7" width="3" height="1" fill="#3d1c00"/>
        <rect x="10" y="7" width="3" height="1" fill="#3d1c00"/>
        {/* lashes */}
        <rect x="5" y="6" width="1" height="1" fill="#3d1c00"/>
        <rect x="7" y="6" width="1" height="1" fill="#3d1c00"/>
        <rect x="10" y="6" width="1" height="1" fill="#3d1c00"/>
        <rect x="12" y="6" width="1" height="1" fill="#3d1c00"/>
      </>}
      {face === "wink" && <>
        <rect x="5" y="6" width="3" height="3" fill="#3d1c00" rx="1"/>
        <rect x="6" y="7" width="1" height="1" fill="#e91e8c"/>
        <rect x="10" y="7" width="3" height="1" fill="#3d1c00"/>
        <rect x="10" y="6" width="1" height="1" fill="#3d1c00"/>
        <rect x="12" y="6" width="1" height="1" fill="#3d1c00"/>
      </>}
      {face === "excited" && <>
        <rect x="5" y="5" width="3" height="4" fill="#3d1c00" rx="1"/>
        <rect x="6" y="6" width="1" height="2" fill="#e91e8c"/>
        <rect x="10" y="5" width="3" height="4" fill="#3d1c00" rx="1"/>
        <rect x="11" y="6" width="1" height="2" fill="#e91e8c"/>
        <rect x="6" y="5" width="1" height="1" fill="#fff" opacity="0.9"/>
        <rect x="11" y="5" width="1" height="1" fill="#fff" opacity="0.9"/>
      </>}
      {face === "kiss" && <>
        <rect x="5" y="7" width="3" height="1" fill="#3d1c00"/>
        <rect x="10" y="7" width="3" height="1" fill="#3d1c00"/>
        <rect x="5" y="6" width="1" height="1" fill="#3d1c00"/>
        <rect x="12" y="6" width="1" height="1" fill="#3d1c00"/>
      </>}
      {face === "shy" && <>
        <rect x="5" y="6" width="3" height="3" fill="#3d1c00" rx="1"/>
        <rect x="6" y="7" width="1" height="1" fill="#e91e8c"/>
        <rect x="10" y="6" width="3" height="3" fill="#3d1c00" rx="1"/>
        <rect x="11" y="7" width="1" height="1" fill="#e91e8c"/>
      </>}
      {face === "sleep" && <>
        <rect x="5" y="8" width="3" height="1" fill="#3d1c00"/>
        <rect x="10" y="8" width="3" height="1" fill="#3d1c00"/>
      </>}
      {(face === "normal" || face === "happy") && <>
        <rect x="5" y="6" width="3" height="3" fill="#3d1c00" rx="1"/>
        <rect x="6" y="7" width="1" height="1" fill="#e91e8c"/>
        <rect x="10" y="6" width="3" height="3" fill="#3d1c00" rx="1"/>
        <rect x="11" y="7" width="1" height="1" fill="#e91e8c"/>
        {/* sparkle */}
        <rect x="6" y="6" width="1" height="1" fill="#fff" opacity="0.9"/>
        <rect x="11" y="6" width="1" height="1" fill="#fff" opacity="0.9"/>
        {/* lashes */}
        <rect x="5" y="5" width="1" height="1" fill="#3d1c00"/>
        <rect x="7" y="5" width="1" height="1" fill="#3d1c00"/>
        <rect x="10" y="5" width="1" height="1" fill="#3d1c00"/>
        <rect x="12" y="5" width="1" height="1" fill="#3d1c00"/>
      </>}

      {/* ── Mouth ── */}
      {face === "happy" && <>
        <rect x="7" y="11" width="4" height="1" fill="#e91e8c"/>
        <rect x="6" y="10" width="1" height="1" fill="#e91e8c"/>
        <rect x="11" y="10" width="1" height="1" fill="#e91e8c"/>
      </>}
      {face === "kiss" && <>
        <rect x="7" y="11" width="4" height="2" fill="#e91e8c" rx="1"/>
        <rect x="8" y="10" width="2" height="1" fill="#e91e8c"/>
      </>}
      {face === "excited" && <>
        <rect x="6" y="11" width="6" height="2" fill="#e91e8c" rx="1"/>
        <rect x="7" y="10" width="4" height="1" fill="#e91e8c"/>
      </>}
      {face === "shy" && <>
        <rect x="7" y="11" width="4" height="1" fill="#e91e8c"/>
      </>}
      {face === "sleep" && <>
        <rect x="7" y="11" width="4" height="1" fill="#e91e8c"/>
      </>}
      {(face === "normal" || face === "blink" || face === "wink") && <>
        <rect x="7" y="10" width="4" height="1" fill="#e91e8c"/>
        <rect x="6" y="11" width="1" height="1" fill="#e91e8c"/>
        <rect x="11" y="11" width="1" height="1" fill="#e91e8c"/>
      </>}

      {/* ── Dress top ── */}
      <rect x="3" y="13" width="12" height="7" fill="#fff8fb" rx="1"/>
      {/* lace trim */}
      <rect x="3" y="13" width="12" height="2" fill="#ffd6e8"/>
      {/* pearls */}
      <rect x="6" y="14" width="1" height="1" fill="#fff" rx="0.5"/>
      <rect x="9" y="14" width="1" height="1" fill="#fff" rx="0.5"/>
      <rect x="12" y="14" width="1" height="1" fill="#fff" rx="0.5"/>
      {/* bow */}
      <rect x="7" y="16" width="2" height="2" fill="#ffb6c1"/>
      <rect x="9" y="16" width="2" height="2" fill="#ffb6c1"/>
      <rect x="8" y="17" width="2" height="1" fill="#ff80ab"/>

      {/* ── Arms ── */}
      {mood === "dance" && <>
        <rect x="0" y={f%2===0?10:12} width="3" height="4" fill="#ffd6e8"/>
        <rect x="15" y={f%2===0?12:10} width="3" height="4" fill="#ffd6e8"/>
        <rect x="0" y={f%2===0?13:15} width="2" height="2" fill="#fce4c8"/>
        <rect x="16" y={f%2===0?15:13} width="2" height="2" fill="#fce4c8"/>
      </>}
      {mood === "wave" && <>
        <rect x="0" y="13" width="3" height="5" fill="#ffd6e8"/>
        <rect x="15" y={f%2===0?9:11} width="3" height="5" fill="#ffd6e8"/>
        <rect x={f%2===0?16:17} y={f%2===0?7:9} width="2" height="3" fill="#fce4c8"/>
      </>}
      {mood === "kiss" && <>
        <rect x="0" y="13" width="3" height="5" fill="#ffd6e8"/>
        <rect x="15" y="11" width="3" height="6" fill="#ffd6e8"/>
      </>}
      {(mood !== "dance" && mood !== "wave" && mood !== "kiss") && <>
        <rect x="0" y="15" width="3" height="5" fill="#ffd6e8"/>
        <rect x="15" y="15" width="3" height="5" fill="#ffd6e8"/>
        <rect x="0" y="19" width="2" height="2" fill="#fce4c8"/>
        <rect x="16" y="19" width="2" height="2" fill="#fce4c8"/>
      </>}

      {/* ── Skirt ── */}
      <rect x={skirtX} y="20" width={skirtW} height="6" fill="#fff8fb" rx="1"/>
      <rect x={skirtX} y="24" width={skirtW} height="2" fill="#ffd6e8"/>
      {/* skirt lace dots */}
      <rect x="3" y="22" width="1" height="1" fill="#ffb6c1" opacity="0.6"/>
      <rect x="7" y="21" width="1" height="1" fill="#ffb6c1" opacity="0.6"/>
      <rect x="11" y="22" width="1" height="1" fill="#ffb6c1" opacity="0.6"/>
      <rect x="14" y="21" width="1" height="1" fill="#ffb6c1" opacity="0.6"/>

      {/* ── Shoes ── */}
      <rect x="3" y="26" width="5" height="2" fill="#e91e8c" rx="1"/>
      <rect x="10" y="26" width="5" height="2" fill="#e91e8c" rx="1"/>
      {/* heel */}
      <rect x="3" y="25" width="2" height="2" fill="#c2185b"/>
      <rect x="13" y="25" width="2" height="2" fill="#c2185b"/>

      {/* ── Sleep ZZZ ── */}
      {mood === "sleep" && <>
        <rect x="0" y="2" width="2" height="1" fill="#a8d8ea" opacity="0.9"/>
        <rect x="0" y="1" width="3" height="1" fill="#a8d8ea" opacity="0.9"/>
      </>}
    </svg>
  );
}

// ── Pixel effects ─────────────────────────────────────────────────────────────
function PixelHeart({ x, y }: { x: number; y: number }) {
  return (
    <div className="fixed pointer-events-none z-50" style={{ left: x, top: y, animation: "heartFloat 1.5s ease-out forwards" }}>
      <svg width="20" height="18" viewBox="0 0 10 9" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
        <rect x="1" y="0" width="3" height="1" fill="#ff6b9d"/>
        <rect x="6" y="0" width="3" height="1" fill="#ff6b9d"/>
        <rect x="0" y="1" width="4" height="3" fill="#ff6b9d"/>
        <rect x="4" y="1" width="2" height="1" fill="#ff80ab"/>
        <rect x="6" y="1" width="4" height="3" fill="#ff6b9d"/>
        <rect x="0" y="4" width="10" height="3" fill="#ff6b9d"/>
        <rect x="1" y="7" width="8" height="1" fill="#ff6b9d"/>
        <rect x="3" y="8" width="4" height="1" fill="#ff6b9d"/>
        <rect x="1" y="1" width="1" height="1" fill="#ffb3d1"/>
      </svg>
    </div>
  );
}

function PixelStar({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <div className="fixed pointer-events-none z-50" style={{ left: x, top: y, animation: "starPop 0.8s ease-out forwards" }}>
      <svg width="14" height="14" viewBox="0 0 7 7" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
        <rect x="3" y="0" width="1" height="7" fill={color}/>
        <rect x="0" y="3" width="7" height="1" fill={color}/>
        <rect x="1" y="1" width="1" height="1" fill={color}/>
        <rect x="5" y="1" width="1" height="1" fill={color}/>
        <rect x="1" y="5" width="1" height="1" fill={color}/>
        <rect x="5" y="5" width="1" height="1" fill={color}/>
      </svg>
    </div>
  );
}

function PixelNote({ x, y }: { x: number; y: number }) {
  return (
    <div className="fixed pointer-events-none z-50" style={{ left: x, top: y, animation: "noteFloat 1.2s ease-out forwards" }}>
      <svg width="12" height="14" viewBox="0 0 6 7" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
        <rect x="3" y="0" width="1" height="4" fill="#FFD700"/>
        <rect x="4" y="0" width="2" height="2" fill="#FFD700"/>
        <rect x="1" y="4" width="3" height="3" fill="#FFD700" rx="1"/>
      </svg>
    </div>
  );
}

function SpeechBubble({ text, flip }: { text: string; flip: boolean }) {
  return (
    <div
      className="absolute pointer-events-none whitespace-nowrap"
      style={{
        bottom: "105%",
        left: "50%",
        transform: `translateX(-50%) ${flip ? "scaleX(-1)" : ""}`,
        background: "rgba(255,255,255,0.95)",
        border: "2px solid #333",
        borderRadius: 6,
        padding: "3px 7px",
        fontSize: 9,
        fontFamily: "monospace",
        color: "#333",
        boxShadow: "2px 2px 0 #333",
        zIndex: 60,
      }}
    >
      {text}
      <div style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 6, height: 6, background: "rgba(255,255,255,0.95)", borderRight: "2px solid #333", borderBottom: "2px solid #333" }} />
    </div>
  );
}

// ── Mood config ───────────────────────────────────────────────────────────────
const BUBBLES: Record<string, string[]> = {
  shy:   ["(♡ω♡)", "( ˘̴͈́ ꒳ ˘̴͈̀)", ">///<"],
  kiss:  ["♡", "mwah~", "💋"],
  dance: ["♪(´▽`)", "♫♬♫", "Yay!"],
  wave:  ["Hello!", "👋 Hi!", "Sawasdee!"],
  jump:  ["Wheee!", "✨!", "yay!"],
  peek:  ["Peek!", "Found u!", "Boo!"],
  spin:  ["Dizzy~", "★Spin★", "weeee"],
  sleep: ["z z z", "💤", "zzZZ"],
};

// ── Main Component ────────────────────────────────────────────────────────────
export default function CoupleSprite({ isOpen, isPlaying }: { isOpen: boolean; isPlaying: boolean }) {
  const [mood, setMood] = useState<Mood>("sleep");
  const [frame, setFrame] = useState(0);
  const [faceMod, setFaceMod] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 85 }); // percent of viewport
  const [dir, setDir] = useState<1 | -1>(1);
  const [speed, setSpeed] = useState(0.25);
  const [effects, setEffects] = useState<{ id: number; type: "heart" | "star" | "note"; x: number; y: number; color?: string }[]>([]);
  const [bubble, setBubble] = useState<string | null>(null);
  const [showBubble, setShowBubble] = useState(false);

  const moodRef      = useRef(mood);
  const dirRef       = useRef(dir);
  const posRef       = useRef(pos);
  const speedRef     = useRef(speed);
  const isPlayingRef = useRef(isPlaying);
  const idleRef      = useRef(0);
  const effectIdRef  = useRef(0);

  moodRef.current      = mood;
  dirRef.current       = dir;
  posRef.current       = pos;
  speedRef.current     = speed;
  isPlayingRef.current = isPlaying;

  const spawnEffect = useCallback((type: "heart" | "star" | "note", x: number, y: number, color?: string) => {
    const id = effectIdRef.current++;
    setEffects((e) => [...e, { id, type, x, y, color }]);
    setTimeout(() => setEffects((e) => e.filter((ef) => ef.id !== id)), 1600);
  }, []);

  const showSpeechBubble = useCallback((text: string) => {
    setBubble(text);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 2200);
  }, []);

  const triggerMood = useCallback((m: Mood) => {
    setMood(m);
    moodRef.current = m;
    idleRef.current = 0;
    // speech bubble
    const opts = BUBBLES[m];
    if (opts) showSpeechBubble(opts[Math.floor(Math.random() * opts.length)]);
  }, [showSpeechBubble]);

  // ── Random personality scheduler ──────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    // initial wave
    triggerMood("wave");
    setTimeout(() => {
      setMood("walk");
      setSpeed(0.2);
    }, 3000);

    // random mood changes every 4–10s
    const personality = setInterval(() => {
      idleRef.current += 1;

      // fall asleep if idle too long
      if (idleRef.current > 18 && moodRef.current === "walk") {
        triggerMood("sleep");
        return;
      }
      if (moodRef.current === "sleep") return;
      if (isPlayingRef.current && moodRef.current === "dance") return;

      const roll = Math.random();
      if (roll < 0.12)      { triggerMood("run");  setSpeed(0.6 + Math.random() * 0.4); setTimeout(() => { setMood("walk"); setSpeed(0.2); }, 2000 + Math.random() * 1000); }
      else if (roll < 0.20) { triggerMood("shy");  setTimeout(() => setMood("walk"), 2500); }
      else if (roll < 0.27) { triggerMood("kiss"); setTimeout(() => setMood("walk"), 2000); }
      else if (roll < 0.34) { triggerMood("jump"); setTimeout(() => setMood("walk"), 1800); }
      else if (roll < 0.40) { triggerMood("wave"); setTimeout(() => setMood("walk"), 2500); }
      else if (roll < 0.45) { triggerMood("spin"); setTimeout(() => setMood("walk"), 1500); }
      else if (roll < 0.50) { triggerMood("peek"); setTimeout(() => setMood("walk"), 2000); }
      // random speed change
      else if (roll < 0.60) { setSpeed(0.1 + Math.random() * 0.15); }
      // random face
      else if (roll < 0.70) { setFaceMod(Math.floor(Math.random() * 3)); }
      // random direction flip
      else if (roll < 0.75) { setDir((d) => d === 1 ? -1 : 1); }
    }, 1000);

    return () => clearInterval(personality);
  }, [isOpen, triggerMood]);

  // ── Music → dance ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    if (isPlaying && (moodRef.current === "walk" || moodRef.current === "run")) {
      triggerMood("dance");
    }
    if (!isPlaying && moodRef.current === "dance") {
      setMood("walk");
    }
  }, [isPlaying, isOpen, triggerMood]);

  // ── Movement engine — random direction changes, variable speed ─────────────
  useEffect(() => {
    if (!isOpen) return;
    const move = setInterval(() => {
      const m = moodRef.current;
      if (m === "sleep" || m === "shy" || m === "kiss" || m === "wave" || m === "peek") return;

      const spd = speedRef.current * (m === "run" ? 1.0 : m === "dance" ? 0.15 : m === "jump" ? 0.3 : 1.0);

      setPos((p) => {
        let nx = p.x + dirRef.current * spd;
        let ny = p.y;

        // bounce off edges with random vertical drift
        if (nx > 82) {
          setDir(-1);
          nx = 82;
          ny = Math.max(70, Math.min(90, p.y + (Math.random() - 0.5) * 6));
        }
        if (nx < 2) {
          setDir(1);
          nx = 2;
          ny = Math.max(70, Math.min(90, p.y + (Math.random() - 0.5) * 6));
        }
        return { x: nx, y: ny };
      });
    }, 40);
    return () => clearInterval(move);
  }, [isOpen]);

  // ── Particle effects on events ─────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    if (mood === "kiss") {
      const px = (posRef.current.x / 100) * window.innerWidth + 30;
      const py = (posRef.current.y / 100) * window.innerHeight - 80;
      spawnEffect("heart", px - 10, py - 10);
      setTimeout(() => spawnEffect("heart", px + 10, py - 20), 300);
    }
    if (mood === "dance") {
      const px = (posRef.current.x / 100) * window.innerWidth;
      const py = (posRef.current.y / 100) * window.innerHeight;
      spawnEffect("note", px, py - 60);
      setTimeout(() => spawnEffect("note", px + 20, py - 80), 400);
    }
    if (mood === "spin") {
      const px = (posRef.current.x / 100) * window.innerWidth;
      const py = (posRef.current.y / 100) * window.innerHeight;
      ["#FFD700", "#ff6b9d", "#a8d8ea", "#b5ead7"].forEach((c, i) => {
        setTimeout(() => spawnEffect("star", px + (i % 2 === 0 ? -15 : 15), py - 30 - i * 10, c), i * 150);
      });
    }
    if (mood === "jump") {
      const px = (posRef.current.x / 100) * window.innerWidth;
      const py = (posRef.current.y / 100) * window.innerHeight;
      spawnEffect("star", px, py - 50, "#FFD700");
    }
  }, [mood, isOpen, spawnEffect]);

  // ── Periodic hearts while walking ─────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const t = setInterval(() => {
      if (moodRef.current !== "sleep") {
        const px = (posRef.current.x / 100) * window.innerWidth + 30;
        const py = (posRef.current.y / 100) * window.innerHeight - 60;
        spawnEffect("heart", px, py);
      }
    }, 6000);
    return () => clearInterval(t);
  }, [isOpen, spawnEffect]);

  // ── Frame ticker ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fps = mood === "run" ? 80 : mood === "dance" ? 160 : mood === "spin" ? 60 : 260;
    const t = setInterval(() => setFrame((f) => f + 1), fps);
    return () => clearInterval(t);
  }, [mood]);

  // ── Tap / click ───────────────────────────────────────────────────────────
  const handleTap = useCallback(() => {
    idleRef.current = 0;
    const m = moodRef.current;
    if (m === "sleep") {
      triggerMood("wave");
      setTimeout(() => setMood(isPlayingRef.current ? "dance" : "walk"), 2800);
    } else if (m === "walk" || m === "run") {
      const roll = Math.random();
      if (roll < 0.4) triggerMood("shy");
      else if (roll < 0.7) triggerMood("kiss");
      else triggerMood("jump");
      setTimeout(() => setMood("walk"), 2200);
    } else {
      const px = (posRef.current.x / 100) * window.innerWidth + 30;
      const py = (posRef.current.y / 100) * window.innerHeight - 60;
      spawnEffect("heart", px, py);
    }
  }, [triggerMood, spawnEffect]);

  if (!isOpen) return null;

  const spriteFlipped = dir === -1;
  const px = `${pos.x}%`;
  const py = `${pos.y}%`;

  const isMoving = mood === "walk" || mood === "run" || mood === "dance" || mood === "jump";
  const spinStyle = mood === "spin"
    ? { animation: `coupleSpin ${frame % 2 === 0 ? "0.4s" : "0.4s"} linear infinite` }
    : {};

  return (
    <>
      <style>{`
        @keyframes heartFloat  { 0%{opacity:1;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-40px) scale(1.3)} }
        @keyframes starPop     { 0%{opacity:1;transform:scale(0.5) rotate(0deg)} 60%{opacity:1;transform:scale(1.3) rotate(180deg)} 100%{opacity:0;transform:scale(1) rotate(360deg)} }
        @keyframes noteFloat   { 0%{opacity:1;transform:translateY(0) rotate(-10deg)} 100%{opacity:0;transform:translateY(-35px) rotate(20deg)} }
        @keyframes coupleSpin  { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes peekBounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>

      {/* ── Particle effects ── */}
      {effects.map((ef) => {
        if (ef.type === "heart") return <PixelHeart key={ef.id} x={ef.x} y={ef.y} />;
        if (ef.type === "star")  return <PixelStar  key={ef.id} x={ef.x} y={ef.y} color={ef.color ?? "#FFD700"} />;
        if (ef.type === "note")  return <PixelNote  key={ef.id} x={ef.x} y={ef.y} />;
        return null;
      })}

      {/* ── Couple sprite ── */}
      <div
        className="fixed z-50 pointer-events-none select-none"
        style={{ left: px, top: py, transform: "translate(-50%, -100%)", transition: "left 0.04s linear, top 0.4s ease" }}
      >
        <div
          className="relative flex items-end gap-0 pointer-events-auto cursor-pointer touch-manipulation"
          onClick={handleTap}
          style={{ transform: `scaleX(${spriteFlipped ? -1 : 1})`, ...spinStyle }}
        >
          {/* Speech bubble */}
          {showBubble && bubble && <SpeechBubble text={bubble} flip={spriteFlipped} />}

          {/* Groom */}
          <Groom mood={mood} f={frame} faceMod={faceMod} />

          {/* Holding hands when moving together */}
          {isMoving && (
            <div style={{ width: 4, height: 4, background: "#fce4c8", borderRadius: 2, marginBottom: S * 3, flexShrink: 0 }} />
          )}

          {/* Bride */}
          <Bride mood={mood} f={frame} faceMod={faceMod} />
        </div>

        {/* Peek label */}
        {mood === "peek" && (
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 border-2 border-gray-800 text-gray-800 text-xs px-2 py-0.5 rounded-lg font-mono"
            style={{ boxShadow: "2px 2px 0 #333", animation: "peekBounce 0.5s infinite" }}
          >
            Boo! 👀
          </div>
        )}
      </div>
    </>
  );
}
