"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import CountdownTimer from "./Countdown";
import Form from "./Form";
import WishesList from "./WishesList";
import Ambience from "./Ambience";
import { config } from "@/lib/config";

type WeddingScreenProps = { name?: string };

// ── Starfield ─────────────────────────────────────────────────────────────────
function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 120 }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    0.3 + Math.random() * 1.2,
      speed: 0.02 + Math.random() * 0.06,
      opacity: 0.2 + Math.random() * 0.7,
      twinkleSpeed: 0.005 + Math.random() * 0.015,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.opacity += s.twinkleSpeed * s.twinkleDir;
        if (s.opacity > 0.9 || s.opacity < 0.1) s.twinkleDir *= -1;
        s.y -= s.speed;
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 220, ${s.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}

// ── Bokeh layer ───────────────────────────────────────────────────────────────
function Bokeh() {
  const circles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size:    40 + Math.random() * 80,
    x:       Math.random() * 100,
    y:       Math.random() * 100,
    duration: 8 + Math.random() * 12,
    delay:   Math.random() * 8,
    color:   i % 3 === 0 ? "255,215,0" : i % 3 === 1 ? "255,182,193" : "255,255,255",
  }));

  return (
    <>
      {circles.map((c) => (
        <div
          key={c.id}
          className="fixed pointer-events-none z-0 rounded-full"
          style={{
            width:     c.size,
            height:    c.size,
            left:      `${c.x}%`,
            top:       `${c.y}%`,
            background: `radial-gradient(circle, rgba(${c.color},0.12) 0%, transparent 70%)`,
            filter:    "blur(18px)",
            animation: `bokehFloat ${c.duration}s ${c.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </>
  );
}

// ── Gold border slide wrapper ─────────────────────────────────────────────────
function GoldSlide({ children, bg, position = "center", id }: {
  children: React.ReactNode;
  bg: string;
  position?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className="snap-start relative w-full h-[100dvh] flex overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Ken Burns background */}
      <div
        className="absolute inset-0 kenburns"
        style={{
          backgroundImage:    `url(${bg})`,
          backgroundSize:     "cover",
          backgroundPosition: position,
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/45 z-0" />
      {/* Gold border frame */}
      <div className="absolute inset-2 z-10 pointer-events-none rounded-sm" style={{
        border: "1px solid rgba(212,175,55,0.35)",
        boxShadow: "inset 0 0 30px rgba(212,175,55,0.06), 0 0 20px rgba(212,175,55,0.04)",
      }}>
        {/* Corner accents */}
        {[
          "top-0 left-0 border-t-2 border-l-2",
          "top-0 right-0 border-t-2 border-r-2",
          "bottom-0 left-0 border-b-2 border-l-2",
          "bottom-0 right-0 border-b-2 border-r-2",
        ].map((cls, i) => (
          <div key={i} className={`absolute w-5 h-5 ${cls} border-[#D4AF37]`} />
        ))}
      </div>
      {/* Content */}
      <div className="relative z-20 w-full h-full text-white">
        {children}
      </div>
    </div>
  );
}

// ── Scroll progress bar ───────────────────────────────────────────────────────
function ScrollProgress({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement> }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      setPct(max > 0 ? (scrollTop / max) * 100 : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollRef]);

  return (
    <div
      className="fixed right-0 top-0 z-50 pointer-events-none"
      style={{ width: 3, height: "100dvh", background: "rgba(212,175,55,0.15)" }}
    >
      <div
        style={{
          height:     `${pct}%`,
          background: "linear-gradient(to bottom, #D4AF37, #FFD700, #C9A84C)",
          boxShadow:  "0 0 6px rgba(212,175,55,0.8)",
          transition: "height 0.15s ease-out",
        }}
      />
      {/* Glowing dot at tip */}
      <div style={{
        position:  "absolute",
        top:       `calc(${pct}% - 4px)`,
        right:     -2,
        width:     7,
        height:    7,
        borderRadius: "50%",
        background: "#FFD700",
        boxShadow:  "0 0 8px #FFD700, 0 0 16px rgba(255,215,0,0.5)",
        transition: "top 0.15s ease-out",
      }} />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const WeddingScreen = ({ name }: WeddingScreenProps) => {
  const [fadeClass, setFadeClass]   = useState("opacity-0");
  const [isOpen, setIsOpen]         = useState(false);
  const [isPlaying, setIsPlaying]   = useState(false);
  const audioRef   = useRef<HTMLAudioElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setFadeClass("opacity-100"), 500);
    return () => clearTimeout(t);
  }, []);

  // ── Haptic feedback ──────────────────────────────────────────────────────
  const haptic = useCallback((style: "light" | "medium" | "heavy" = "medium") => {
    if ("vibrate" in navigator) {
      const patterns: Record<string, number[]> = {
        light:  [10],
        medium: [20],
        heavy:  [30, 20, 30],
      };
      navigator.vibrate(patterns[style]);
    }
  }, []);

  const handleOpen = () => {
    haptic("heavy"); // strong vibration on open
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleToggleMusic = () => {
    haptic("light");
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // ── InView hooks (all at top level) ─────────────────────────────────────
  const { ref: mainRef,   inView: isMainInView }   = useInView({ threshold: 0.5 });
  const { ref: main2Ref,  inView: isMain2InView }  = useInView({ threshold: 0.5 });
  const { ref: slide1Ref, inView: isSlide1InView } = useInView({ threshold: 0.3 });
  const { ref: slide2Ref, inView: isSlide2InView } = useInView({ threshold: 0.3 });
  const { ref: slide3Ref, inView: isSlide3InView } = useInView({ threshold: 0.3 });
  const { ref: slide4Ref, inView: isSlide4InView } = useInView({ threshold: 0.3 });
  const { ref: slide5Ref, inView: isSlide5InView } = useInView({ threshold: 0.3 });
  const { ref: slide6Ref, inView: isSlide6InView } = useInView({ threshold: 0.3 });
  const { ref: slide7Ref, inView: isSlide7InView } = useInView({ threshold: 0.3 });
  const { ref: slide8Ref, inView: isSlide8InView } = useInView({ threshold: 0.3 });
  const { ref: slide9Ref, inView: isSlide9InView } = useInView({ threshold: 0.3 });
  const { ref: slide10Ref,inView: isSlide10InView }= useInView({ threshold: 0.3 });
  const { ref: endRef,    inView: isEndInView }    = useInView({ threshold: 0.3 });

  return (
    <div className={`h-[100dvh] w-screen flex flex-col md:flex-row ${fadeClass} transition-opacity duration-1000 bg-[#0a0a0a]`}>

      {/* ── Global ambient layers ── */}
      <Starfield />
      <Bokeh />

      {/* ── Desktop left panel ── */}
      <div
        className="md:flex justify-center hidden items-end pb-12 w-2/3 h-full relative overflow-hidden"
      >
        <div
          className="absolute inset-0 kenburns"
          style={{ backgroundImage: "url(/foto_1_samping.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-black/30" />
        {/* gold border on desktop panel */}
        <div className="absolute inset-3 pointer-events-none" style={{ border:"1px solid rgba(212,175,55,0.3)", boxShadow:"inset 0 0 40px rgba(212,175,55,0.05)" }}>
          {["top-0 left-0 border-t-2 border-l-2","top-0 right-0 border-t-2 border-r-2","bottom-0 left-0 border-b-2 border-l-2","bottom-0 right-0 border-b-2 border-r-2"].map((c,i) => (
            <div key={i} className={`absolute w-5 h-5 ${c} border-[#D4AF37]`}/>
          ))}
        </div>
        <div className="relative z-10 font-ovo text-lg text-white tracking-[5px] uppercase shimmer">
          {config.coupleNames}
        </div>
      </div>

      {/* ── Scroll container ── */}
      <div
        ref={scrollRef}
        className="md:w-1/3 w-full h-full overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* ── Scroll progress bar ── */}
        <ScrollProgress scrollRef={scrollRef} />

        {/* ── Cover slide ── */}
        <div
          id="backgroundWedding"
          className="snap-start w-full h-[100dvh] flex items-center justify-center relative"
        >
          {/* Starfield visible here too since canvas is fixed */}
          <div className="absolute inset-0 bg-black/30 z-0" />
          <div className="absolute inset-2 z-10 pointer-events-none rounded-sm" style={{
            border: "1px solid rgba(212,175,55,0.3)",
            boxShadow: "inset 0 0 30px rgba(212,175,55,0.05)",
          }}>
            {["top-0 left-0 border-t-2 border-l-2","top-0 right-0 border-t-2 border-r-2","bottom-0 left-0 border-b-2 border-l-2","bottom-0 right-0 border-b-2 border-r-2"].map((c,i)=>(
              <div key={i} className={`absolute w-5 h-5 ${c} border-[#D4AF37]`}/>
            ))}
          </div>
          <div className="relative z-20 text-center p-5 flex flex-col h-full justify-between py-20">
            <div className="gap-y-2 md:gap-y-4 flex flex-col">
              <h5
                ref={main2Ref}
                className={`text-sm font-legan text-white/80 uppercase tracking-[4px] fadeMain2 ${isMain2InView ? "active" : ""}`}
              >
                The Wedding Of
              </h5>
              <h1
                ref={mainRef}
                className={`text-2xl md:text-3xl font-ovo uppercase shimmer fadeMain ${isMainInView ? "active" : ""}`}
              >
                {config.coupleNames}
              </h1>
              <h5
                className={`text-sm font-legan text-white/70 uppercase tracking-wide fadeMain2 ${isMain2InView ? "active" : ""}`}
              >
                {new Date(config.eventDate).toLocaleDateString("en-US", {
                  weekday: "long", year: "numeric", month: "long", day: "numeric",
                })}
              </h5>
            </div>
            <div>
              <p className="mt-5 text-lg uppercase font-xs tracking-widest text-white/90">
                {name ? `Dear ${name},` : "Welcome"}
              </p>
              {!isOpen ? (
                <button
                  className="animate-bounce mt-5 px-6 py-2 uppercase text-xs border border-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-full bg-white/10 backdrop-blur-sm text-white transition-all duration-500 tracking-widest"
                  onClick={handleOpen}
                >
                  Open Invitation
                </button>
              ) : (
                <IoIosArrowUp stroke="4" className="mx-auto mt-20 animate-upDown text-white/60" />
              )}
            </div>
          </div>
        </div>

        {isOpen && (
          <>
            {/* ── Slide 1 — Quote ── */}
            <GoldSlide bg="/slide_1.jpg">
              <div className="flex pt-12 p-5 px-10 h-full">
                <div ref={slide1Ref} className={`fadeInMove ${isSlide1InView ? "active" : ""}`}>
                  <h1 className="text-xl md:text-2xl font-ovo tracking-wide uppercase">{config.bibleVerse}</h1>
                  <p className="text-sm mt-5 font-legan text-white/80">{config.bibleVerseContent}</p>
                  <p className="text-5xl mt-5 font-wonder text-white/90">{config.coupleNames}</p>
                </div>
              </div>
            </GoldSlide>

            {/* ── Slide 2 — Groom ── */}
            <GoldSlide bg="/slide_2.jpg" position="top">
              <div className="flex items-end pb-16 px-10 h-full">
                <div ref={slide2Ref} className={`fadeInMove ${isSlide2InView ? "active" : ""}`}>
                  <p className="font-legan text-xs tracking-[3px] text-white/60 uppercase my-2">The Groom</p>
                  <h1 className="text-xl md:text-3xl font-ovo">{config.groom}</h1>
                  <h3 className="font-thesignature text-2xl text-white/80 mt-1">About {config.groomNickName},</h3>
                  <p className="text-sm mt-4 font-legan text-white/70">{config.groomBio}</p>
                  {/* Parents */}
                  <div className="mt-4 border-t border-white/10 pt-3 space-y-1">
                    <p className="font-legan text-xs text-white/40 uppercase tracking-[2px]">បុត្រ · Son of</p>
                    <p className="font-battambang text-sm text-white/80">{config.groomFather}</p>
                    <p className="font-battambang text-sm text-white/80">{config.groomMother}</p>
                  </div>
                  {config.groomInstagram ? (
                    <a href={`https://www.instagram.com/${config.groomInstagram}`} target="_blank" rel="noreferrer"
                      className="cursor-pointer text-sm rounded-full flex items-center gap-x-2 font-legan mt-4 bg-white/10 backdrop-blur-sm border border-white/20 w-fit px-4 py-2 text-white/80 hover:border-[#D4AF37] transition-all">
                      @{config.groomInstagram}
                    </a>
                  ) : null}
                </div>
              </div>
            </GoldSlide>

            {/* ── Slide 3 — Bride ── */}
            <GoldSlide bg="/slide_3.jpg" position="top">
              <div className="flex items-end pb-16 px-10 h-full">
                <div ref={slide3Ref} className={`fadeInMove ${isSlide3InView ? "active" : ""}`}>
                  <p className="font-legan text-xs tracking-[3px] text-white/60 uppercase my-2">The Bride</p>
                  <h1 className="text-xl md:text-3xl font-ovo">{config.bride}</h1>
                  <h3 className="font-thesignature text-2xl text-white/80 mt-1">About {config.brideNickName},</h3>
                  <p className="text-sm mt-4 font-legan text-white/70">{config.brideBio}</p>
                  {/* Parents */}
                  <div className="mt-4 border-t border-white/10 pt-3 space-y-1">
                    <p className="font-legan text-xs text-white/40 uppercase tracking-[2px]">បុត្រី · Daughter of</p>
                    {config.brideFather ? <p className="font-battambang text-sm text-white/80">{config.brideFather}</p> : null}
                    <p className="font-battambang text-sm text-white/80">{config.brideMother}</p>
                  </div>
                  {config.brideInstagram ? (
                    <a href={`https://www.instagram.com/${config.brideInstagram}`} target="_blank" rel="noreferrer"
                      className="cursor-pointer text-sm rounded-full flex items-center gap-x-2 font-legan mt-4 bg-white/10 backdrop-blur-sm border border-white/20 w-fit px-4 py-2 text-white/80 hover:border-[#D4AF37] transition-all">
                      @{config.brideInstagram}
                    </a>
                  ) : null}
                </div>
              </div>
            </GoldSlide>

            {/* ── Slide 4 — Wedding Agenda ── */}
            <GoldSlide bg="/slide_4.jpg">
              <div className="h-full overflow-y-auto px-8 pt-10 pb-8">
                <div ref={slide4Ref} className={`fadeInMove ${isSlide4InView ? "active" : ""}`}>

                  {/* Header */}
                  <div className="text-center mb-6">
                    <p className="font-legan text-[10px] tracking-[4px] text-white/40 uppercase mb-1">Program</p>
                    <h1 className="font-ovo text-xl text-white tracking-wide">កម្មវិធី · Agenda</h1>
                    <div className="mx-auto mt-2 w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  </div>

                  {/* Day 1 */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-[1px] flex-1 bg-[#D4AF37]/25" />
                      <div className="text-center">
                        <p className="font-battambang text-xs text-[#D4AF37]">{config.timeline.day1.dateKhmer}</p>
                        <p className="font-legan text-[10px] text-white/40 tracking-widest uppercase">{config.timeline.day1.date}</p>
                      </div>
                      <div className="h-[1px] flex-1 bg-[#D4AF37]/25" />
                    </div>
                    <div className="space-y-2">
                      {config.timeline.day1.events.map((e, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-[5px]">
                            <div style={{ width: 5, height: 5, background: "#D4AF37", transform: "rotate(45deg)" }} />
                          </div>
                          <div className="flex-1 flex justify-between items-start border-b border-white/5 pb-2">
                            <p className="font-battambang text-sm text-white/90">{e.title}</p>
                            <p className="font-legan text-[10px] text-white/35 text-right ml-2 whitespace-nowrap">{e.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Day 2 */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-[1px] flex-1 bg-[#D4AF37]/25" />
                      <div className="text-center">
                        <p className="font-battambang text-xs text-[#D4AF37]">{config.timeline.day2.dateKhmer}</p>
                        <p className="font-legan text-[10px] text-white/40 tracking-widest uppercase">{config.timeline.day2.date}</p>
                      </div>
                      <div className="h-[1px] flex-1 bg-[#D4AF37]/25" />
                    </div>

                    {/* Morning */}
                    <p className="font-legan text-[9px] tracking-[3px] text-white/30 uppercase mb-2 ml-2">Morning</p>
                    <div className="space-y-2 mb-4">
                      {config.timeline.day2.morning.map((e, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-[5px]">
                            <div style={{ width: 5, height: 5, background: "#D4AF37", transform: "rotate(45deg)" }} />
                          </div>
                          <div className="flex-1 flex justify-between items-start border-b border-white/5 pb-2">
                            <p className="font-battambang text-sm text-white/90">{e.title}</p>
                            <p className="font-legan text-[10px] text-white/35 text-right ml-2 whitespace-nowrap">{e.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Evening */}
                    <p className="font-legan text-[9px] tracking-[3px] text-white/30 uppercase mb-2 ml-2">Evening</p>
                    <div className="space-y-2">
                      {config.timeline.day2.evening.map((e, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-[5px]">
                            <div style={{ width: 5, height: 5, background: "#D4AF37", transform: "rotate(45deg)" }} />
                          </div>
                          <div className="flex-1 flex justify-between items-start border-b border-white/5 pb-2">
                            <p className="font-battambang text-sm text-white/90">{e.title}</p>
                            <p className="font-legan text-[10px] text-white/35 text-right ml-2 whitespace-nowrap">{e.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer signature */}
                  <div className="flex items-center justify-center mt-6 gap-3">
                    <div className="h-[1px] w-10 bg-[#D4AF37]/30" />
                    <span className="font-thesignature text-xl text-white/50">{config.coupleNames}</span>
                    <div className="h-[1px] w-10 bg-[#D4AF37]/30" />
                  </div>

                </div>
              </div>
            </GoldSlide>

            {/* ── Slide 5 — Save the Date ── */}
            <GoldSlide bg="/slide_5.jpg">
              <div className="flex flex-col items-center justify-center h-full px-8">
                <div ref={slide5Ref} className={`fadeInMove ${isSlide5InView ? "active" : ""} flex items-center flex-col w-full`}>

                  <p className="uppercase font-legan text-[10px] tracking-[5px] text-white/50 mb-4">Save Our Date</p>

                  <h1 className="text-2xl text-center font-ovo uppercase shimmer leading-snug">
                    {new Date(config.eventDate).toLocaleDateString("en-US", { weekday: "long" })}
                    <br />
                    {new Date(config.eventDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </h1>

                  {/* Divider */}
                  <div className="my-6 w-full flex items-center gap-3">
                    <div className="h-[1px] flex-1 bg-[#D4AF37]/25" />
                    <div style={{ width: 5, height: 5, background: "#D4AF37", transform: "rotate(45deg)" }} />
                    <div className="h-[1px] flex-1 bg-[#D4AF37]/25" />
                  </div>

                  {/* QR Code */}
                  <div className="p-2 bg-white rounded-sm mb-4">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(config.weddingReception.googleMapsLink)}`}
                      alt="Google Maps QR"
                      width={130}
                      height={130}
                      style={{ display: "block" }}
                    />
                  </div>

                  {/* Address */}
                  <p className="font-battambang text-xs text-white/60 text-center leading-relaxed">
                    {config.weddingReception.place_details}
                  </p>

                  {/* Tap to open maps hint */}
                  <Link
                    href={config.weddingReception.googleMapsLink}
                    target="_blank"
                    className="mt-4 font-legan text-[10px] tracking-widest uppercase text-[#D4AF37]/60 hover:text-[#D4AF37] transition-all"
                  >
                    Open in Google Maps ↗
                  </Link>

                </div>
              </div>
            </GoldSlide>

            {/* ── Slide 6 — Countdown ── */}
            <GoldSlide bg="/slide_6.jpg">
              <div className="flex flex-col items-center justify-end pb-16 px-10 h-full">
                <div ref={slide6Ref} className={`fadeInMove ${isSlide6InView ? "active" : ""} flex items-center flex-col`}>
                  <h1 className="text-2xl text-center font-ovo mb-6">ALMOST TIME FOR OUR CELEBRATION</h1>
                  <CountdownTimer />
                </div>
              </div>
            </GoldSlide>

            {/* ── Slide 7 — Livestream (optional) ── */}
            {config.livestreaming.enabled && (
              <GoldSlide bg="/foto_1_samping.jpg">
                <div className="flex flex-col justify-between pt-16 pb-24 px-10 h-full">
                  <h1 ref={slide7Ref} className={`text-2xl font-ovo fadeInMoveSlow ${isSlide7InView ? "active" : ""}`}>
                    JOIN OUR EXCLUSIVE LIVE STREAMING EVENT
                  </h1>
                  <div ref={slide7Ref} className={`flex flex-col fadeInMove ${isSlide7InView ? "active" : ""}`}>
                    <h3 className="uppercase font-ovo text-sm mt-5 mb-2">
                      {new Date(config.eventDate).toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}
                      <br/>{config.livestreaming.time}
                    </h3>
                    <p className="text-sm font-legan text-white/70">{config.livestreaming.detail}</p>
                    <Link href={config.livestreaming.link} target="_blank"
                      className="mt-5 text-sm rounded-full font-legan bg-white/10 backdrop-blur-sm border border-white/20 w-fit px-6 py-2 text-white hover:border-[#D4AF37] transition-all">
                      Join Live Streaming
                    </Link>
                  </div>
                </div>
              </GoldSlide>
            )}

            {/* ── Slide 8 — Prewedding video ── */}
            {config.prewedding.enabled && (
              <GoldSlide bg="/slide_8.jpg">
                <div className="flex flex-col justify-center pt-10 pb-10 px-8 h-full">
                  <div ref={slide8Ref} className={`${isSlide8InView ? "active" : ""} fadeInMove`}>
                    <h1 className="text-2xl font-ovo text-center uppercase mb-6">Unveiling Our Prewedding Story</h1>
                    <div className="mx-auto w-full relative" style={{ paddingBottom: "56.25%", height: 0 }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-sm"
                        src={`https://www.youtube.com/embed/${config.prewedding.link}?autoplay=1&mute=1&loop=1&playsinline=1`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <p className="text-2xl font-thesignature text-white/70 mt-4 text-center">{config.prewedding.detail}</p>
                  </div>
                </div>
              </GoldSlide>
            )}

            {/* ── Slide 9 — RSVP ── */}
            {config.rsvp.enabled && (
              <GoldSlide bg="/slide_9.jpg">
                <div className="flex flex-col justify-start pt-10 pb-10 px-8 h-full overflow-y-auto">
                  <div ref={slide9Ref} className={`${isSlide9InView ? "active" : ""} fadeInMove`}>
                    <h1 className="text-2xl font-ovo text-center uppercase mb-1">RSVP & WISHES</h1>
                    <p className="text-xs font-legan text-white/70 text-center mb-4">{config.rsvp.detail}</p>
                    <Form />
                  </div>
                </div>
              </GoldSlide>
            )}

            {/* ── Slide 10 — Wishes ── */}
            <GoldSlide bg="/slide_9.jpg">
              <div className="flex flex-col justify-start pt-10 pb-10 px-8 h-full overflow-y-auto">
                <div ref={slide10Ref} className={`${isSlide10InView ? "active" : ""} fadeInMove`}>
                  <h1 className="text-2xl font-ovo text-center uppercase mb-4">Wishes</h1>
                  <WishesList />
                </div>
              </div>
            </GoldSlide>

            {/* ── Final slide ── */}
            <GoldSlide bg="/slide_7.jpg">
              <div className="flex flex-col justify-end pt-16 pb-16 px-10 h-full">
                <div ref={endRef} className={`${isEndInView ? "active" : ""} fadeInMove`}>
                  <h1 className="text-3xl font-ovo text-center uppercase shimmer">{config.thankyou}</h1>
                  <p className="text-sm font-legan text-white/70 text-center mt-4">{config.thankyouDetail}</p>
                  <p className="text-sm font-ovo text-center mt-4 uppercase tracking-widest text-white/80">{config.coupleNames}</p>
                </div>
                <footer className="flex flex-col items-center mt-10">
                  <p className="text-[0.5rem] uppercase text-center text-white/30">Created By Peter Shaan</p>
                  <p className="text-xs text-white/20">© All rights reserved by petershaan</p>
                </footer>
              </div>
            </GoldSlide>
          </>
        )}
      </div>

      {/* ── Audio ── */}
      <audio ref={audioRef} src="/music/wedding_song.mp3" preload="auto" loop />

      {/* ── Ambience — petals, gold dust, confetti ── */}
      <Ambience isOpen={isOpen} />

      {/* ── Music toggle button ── */}
      <button
        onClick={handleToggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="fixed z-50 touch-manipulation"
        style={{
          bottom: "1.5rem", right: "1.4rem",
          width: 44, height: 44,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.6)",
          border: "1px solid rgba(212,175,55,0.4)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 0,
        }}
      >
        {isPlaying && (
          <>
            <span style={{ position:"absolute", inset:-5, borderRadius:"50%", border:"1px solid rgba(212,175,55,0.5)", animation:"musicPulse 2s ease-out infinite" }}/>
            <span style={{ position:"absolute", inset:-11, borderRadius:"50%", border:"1px solid rgba(212,175,55,0.2)", animation:"musicPulse 2s 0.7s ease-out infinite" }}/>
          </>
        )}
        {isPlaying ? (
          <svg width="13" height="15" viewBox="0 0 14 16" fill="none">
            <rect x="1" y="1" width="4" height="14" rx="1.5" fill="#D4AF37"/>
            <rect x="9" y="1" width="4" height="14" rx="1.5" fill="#D4AF37"/>
          </svg>
        ) : (
          <svg width="13" height="15" viewBox="0 0 14 16" fill="none">
            <path d="M2 1.5L13 8L2 14.5V1.5Z" fill="#D4AF37"/>
          </svg>
        )}
        <style>{`@keyframes musicPulse{0%{transform:scale(1);opacity:0.7}100%{transform:scale(1.7);opacity:0}}`}</style>
      </button>
    </div>
  );
};

export default WeddingScreen;
