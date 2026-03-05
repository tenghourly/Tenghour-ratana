"use client";

import { useEffect, useRef, useState, useCallback } from "react";

let uid = 0;
const nextId = () => ++uid;

interface Particle { id: number; x: number; y: number; size: number; duration: number; delay: number; opacity: number; }
interface Petal    { id: number; x: number; size: number; duration: number; delay: number; drift: number; rotate: number; }
interface Heart    { id: number; x: number; y: number; size: number; }
interface Confetti { id: number; x: number; color: string; size: number; duration: number; delay: number; rotate: number; isRect: boolean; }

const CONFETTI_COLORS = ["#FFD700","#C9A84C","#fff0f5","#ff8fab","#b5ead7","#a8d8ea","#ffdac1"];

export default function Ambience({
  isOpen,
  onMount,
}: {
  isOpen: boolean;
  onMount?: () => void;
}) {
  const [particles,      setParticles]      = useState<Particle[]>([]);
  const [petals,         setPetals]         = useState<Petal[]>([]);
  const [hearts,         setHearts]         = useState<Heart[]>([]);
  const [confetti,       setConfetti]       = useState<Confetti[]>([]);
  const [confettiFired,  setConfettiFired]  = useState(false);
  const mountedRef = useRef(false);

  // ── Gold dust particles — always visible, very subtle ──────────────────────
  useEffect(() => {
    const spawn = (): Particle => ({
      id:       nextId(),
      x:        5 + Math.random() * 90,
      y:        10 + Math.random() * 80,
      size:     1 + Math.random() * 2,
      duration: 6 + Math.random() * 8,
      delay:    Math.random() * 6,
      opacity:  0.15 + Math.random() * 0.25,
    });

    // Only 10 particles max — keeps it clean
    setParticles(Array.from({ length: 10 }, spawn));

    // Slowly refresh one at a time
    const t = setInterval(() => {
      setParticles((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = spawn();
        return next;
      });
    }, 3000);

    return () => clearInterval(t);
  }, []);

  // ── Rose petals — max 8 on screen at once, slow and gentle ────────────────
  useEffect(() => {
    const spawnPetal = (): Petal => ({
      id:       nextId(),
      x:        Math.random() * 100,
      size:     8 + Math.random() * 8,
      duration: 12 + Math.random() * 10,
      delay:    0,
      drift:    (Math.random() - 0.5) * 80,
      rotate:   Math.random() * 360,
    });

    // Start with 5 staggered
    const initial = Array.from({ length: 5 }, (_, i) => ({
      ...spawnPetal(),
      delay: i * 2.5,
    }));
    setPetals(initial);

    // Spawn one new petal every 3.5s — never crowded
    const t = setInterval(() => {
      setPetals((prev) => [...prev.slice(-7), spawnPetal()]);
    }, 3500);

    return () => clearInterval(t);
  }, []);

  // ── Confetti — fires ONCE when invitation opens ────────────────────────────
  useEffect(() => {
    if (!isOpen || confettiFired) return;
    setConfettiFired(true);

    // Only 40 pieces — short burst, then gone
    const burst: Confetti[] = Array.from({ length: 40 }, () => ({
      id:       nextId(),
      x:        10 + Math.random() * 80,
      color:    CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size:     4 + Math.random() * 6,
      duration: 2 + Math.random() * 1.5,
      delay:    Math.random() * 0.5,
      rotate:   Math.random() * 720,
      isRect:   Math.random() > 0.4,
    }));
    setConfetti(burst);
    setTimeout(() => setConfetti([]), 4000);
  }, [isOpen, confettiFired]);

  // ── Tap anywhere → 1–2 hearts float up ────────────────────────────────────
  const handleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button,a,input,textarea,select,form,label")) return;

    const src = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
    const x   = "clientX" in src ? src.clientX : 0;
    const y   = "clientY" in src ? src.clientY : 0;

    // Only 1–2 hearts per tap — not overwhelming
    const count = 1 + Math.floor(Math.random() * 2);
    Array.from({ length: count }, () => {
      const h: Heart = {
        id:   nextId(),
        x:    x + (Math.random() - 0.5) * 30,
        y:    y,
        size: 14 + Math.random() * 10,
      };
      setHearts((p) => [...p, h]);
      setTimeout(() => setHearts((p) => p.filter((hh) => hh.id !== h.id)), 1200);
    });
  }, []);

  // notify parent mounted
  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; onMount?.(); }
  }, [onMount]);

  return (
    <>
      <style>{`
        /* ── Gold dust ── */
        @keyframes dustFloat {
          0%   { transform: translateY(0px)   scale(1);   opacity: 0; }
          20%  { opacity: var(--op); }
          80%  { opacity: var(--op); }
          100% { transform: translateY(-60px) scale(0.4); opacity: 0; }
        }
        /* ── Petals ── */
        @keyframes petalDrift {
          0%   { transform: translateY(-20px) translateX(0px)           rotate(0deg);           opacity: 0; }
          8%   { opacity: 0.75; }
          92%  { opacity: 0.6; }
          100% { transform: translateY(105vh) translateX(var(--drift))  rotate(var(--rot));     opacity: 0; }
        }
        /* ── Confetti ── */
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg)          scaleX(1);  opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(90vh)  rotate(var(--crot))   scaleX(0.6); opacity: 0; }
        }
        /* ── Hearts ── */
        @keyframes heartRise {
          0%   { transform: translateY(0)     scale(0.5); opacity: 1; }
          60%  { transform: translateY(-50px) scale(1.1); opacity: 0.9; }
          100% { transform: translateY(-90px) scale(0.8); opacity: 0; }
        }
      `}</style>

      {/* ── Full-screen tap layer (behind all content) ── */}
      <div
        className="fixed inset-0 z-10 pointer-events-auto"
        onClick={handleTap}
        onTouchStart={handleTap}
        style={{ background: "transparent" }}
      />

      {/* ── Gold dust particles ── */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-20 rounded-full"
          style={{
            left:     `${p.x}%`,
            top:      `${p.y}%`,
            width:    p.size,
            height:   p.size,
            background: `radial-gradient(circle, #FFD700, #C9A84C)`,
            boxShadow: `0 0 ${p.size * 2}px #FFD70088`,
            "--op":   p.opacity,
            animation: `dustFloat ${p.duration}s ${p.delay}s ease-in-out infinite`,
          } as React.CSSProperties}
        />
      ))}

      {/* ── Rose petals ── */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-20"
          style={{
            left:     `${p.x}%`,
            top:      0,
            width:    p.size,
            height:   p.size * 1.3,
            "--drift": `${p.drift}px`,
            "--rot":   `${p.rotate}deg`,
            animation: `petalDrift ${p.duration}s ${p.delay}s linear forwards`,
          } as React.CSSProperties}
        >
          {/* Simple elegant petal shape */}
          <div style={{
            width:        "100%",
            height:       "100%",
            background:   "radial-gradient(ellipse at 40% 30%, #ffd6e8, #ff8fab88)",
            borderRadius: "60% 40% 60% 40% / 70% 30% 70% 30%",
            boxShadow:    "inset 0 1px 3px rgba(255,255,255,0.4)",
          }}/>
        </div>
      ))}

      {/* ── Confetti burst ── */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="fixed pointer-events-none z-30"
          style={{
            left:     `${c.x}%`,
            top:      "-10px",
            width:    c.isRect ? c.size * 1.6 : c.size,
            height:   c.isRect ? c.size * 0.6 : c.size,
            background: c.color,
            borderRadius: c.isRect ? 2 : "50%",
            "--crot": `${c.rotate}deg`,
            animation: `confettiFall ${c.duration}s ${c.delay}s ease-in forwards`,
            boxShadow: `0 0 4px ${c.color}88`,
          } as React.CSSProperties}
        />
      ))}

      {/* ── Tap hearts ── */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="fixed pointer-events-none z-40"
          style={{
            left:      h.x,
            top:       h.y,
            fontSize:  h.size,
            lineHeight: 1,
            animation: "heartRise 1.2s ease-out forwards",
            userSelect: "none",
          }}
        >
          ♡
        </div>
      ))}
    </>
  );
}
