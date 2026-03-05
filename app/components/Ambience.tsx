"use client";

import { useEffect, useState } from "react";

let uid = 0;
const nextId = () => ++uid;

interface Particle { id: number; x: number; y: number; size: number; duration: number; delay: number; opacity: number; }
interface Petal    { id: number; x: number; size: number; duration: number; delay: number; drift: number; rotate: number; }
interface Confetti { id: number; x: number; color: string; size: number; duration: number; delay: number; rotate: number; isRect: boolean; }

const CONFETTI_COLORS = ["#FFD700","#C9A84C","#fff0f5","#ff8fab","#b5ead7","#a8d8ea","#ffdac1","#ffffff"];

export default function Ambience({ isOpen }: { isOpen: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [petals,    setPetals]    = useState<Petal[]>([]);
  const [confetti,  setConfetti]  = useState<Confetti[]>([]);
  const [confettiFired, setConfettiFired] = useState(false);

  // ── Gold dust — always on, max 10, very subtle ─────────────────────────────
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
    setParticles(Array.from({ length: 10 }, spawn));
    const t = setInterval(() => {
      setParticles((prev) => {
        const next = [...prev];
        next[Math.floor(Math.random() * next.length)] = spawn();
        return next;
      });
    }, 3000);
    return () => clearInterval(t);
  }, []);

  // ── Rose petals — max 8 on screen, slow and gentle ────────────────────────
  useEffect(() => {
    const spawn = (delay = 0): Petal => ({
      id:       nextId(),
      x:        Math.random() * 100,
      size:     8 + Math.random() * 8,
      duration: 12 + Math.random() * 10,
      delay,
      drift:    (Math.random() - 0.5) * 80,
      rotate:   Math.random() * 360,
    });
    setPetals(Array.from({ length: 5 }, (_, i) => spawn(i * 2.5)));
    const t = setInterval(() => {
      setPetals((prev) => [...prev.slice(-7), spawn()]);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  // ── Confetti — fires once on open ─────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || confettiFired) return;
    setConfettiFired(true);
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
    setTimeout(() => setConfetti([]), 4500);
  }, [isOpen, confettiFired]);

  return (
    <>
      <style>{`
        @keyframes dustFloat {
          0%   { transform:translateY(0)    scale(1);   opacity:0; }
          20%  { opacity:var(--op); }
          80%  { opacity:var(--op); }
          100% { transform:translateY(-60px) scale(0.4); opacity:0; }
        }
        @keyframes petalDrift {
          0%   { transform:translateY(-20px) translateX(0)            rotate(0deg);        opacity:0; }
          8%   { opacity:0.8; }
          92%  { opacity:0.55; }
          100% { transform:translateY(105vh) translateX(var(--drift)) rotate(var(--rot));  opacity:0; }
        }
        @keyframes confettiFall {
          0%   { transform:translateY(-20px) rotate(0deg)         scaleX(1);   opacity:1; }
          80%  { opacity:0.8; }
          100% { transform:translateY(90vh)  rotate(var(--crot))  scaleX(0.6); opacity:0; }
        }
      `}</style>

      {/* ── Gold dust particles ── */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-20 rounded-full"
          style={{
            left:      `${p.x}%`,
            top:       `${p.y}%`,
            width:     p.size,
            height:    p.size,
            background: "radial-gradient(circle, #FFD700, #C9A84C)",
            boxShadow: `0 0 ${p.size * 2}px #FFD70066`,
            "--op":    p.opacity,
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
            left:      `${p.x}%`,
            top:       0,
            width:     p.size,
            height:    p.size * 1.3,
            "--drift": `${p.drift}px`,
            "--rot":   `${p.rotate}deg`,
            animation: `petalDrift ${p.duration}s ${p.delay}s linear forwards`,
          } as React.CSSProperties}
        >
          <div style={{
            width:        "100%",
            height:       "100%",
            background:   "radial-gradient(ellipse at 40% 30%, #ffd6e8, #ff8fab77)",
            borderRadius: "60% 40% 60% 40% / 70% 30% 70% 30%",
            boxShadow:    "inset 0 1px 3px rgba(255,255,255,0.35)",
          }}/>
        </div>
      ))}

      {/* ── Confetti burst ── */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="fixed pointer-events-none z-30"
          style={{
            left:         `${c.x}%`,
            top:          "-10px",
            width:        c.isRect ? c.size * 1.6 : c.size,
            height:       c.isRect ? c.size * 0.6 : c.size,
            background:   c.color,
            borderRadius: c.isRect ? 2 : "50%",
            boxShadow:    `0 0 4px ${c.color}88`,
            "--crot":     `${c.rotate}deg`,
            animation:    `confettiFall ${c.duration}s ${c.delay}s ease-in forwards`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}
