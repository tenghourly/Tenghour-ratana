"use client";

import { useState, useEffect, useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import CountdownTimer from "./Countdown";
import Form from "./Form";
import WishesList from "./WishesList";
import { config } from "@/lib/config";

type Props = { name?: string };

const Divider = () => (
  <div className="flex items-center gap-3 my-4 w-full">
    <hr className="flex-1 border-white/20" />
    <span className="text-white/40 text-xs">✦</span>
    <hr className="flex-1 border-white/20" />
  </div>
);

const WeddingScreen = ({ name }: Props) => {
  const [fadeClass, setFadeClass] = useState("opacity-0");
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setFadeClass("opacity-100"), 500);
    return () => clearTimeout(t);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) audioRef.current.play().catch(() => {});
  };

  // All hooks must be at top level — no loops, no helpers
  const { ref: mainRef,  inView: isMainInView }  = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: main2Ref, inView: isMain2InView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: s1Ref,    inView: s1 }            = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: s2Ref,    inView: s2 }            = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: s3Ref,    inView: s3 }            = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: s4Ref,    inView: s4 }            = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: s5Ref,    inView: s5 }            = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: s6Ref,    inView: s6 }            = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: s7Ref,    inView: s7 }            = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: s8Ref,    inView: s8 }            = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: s9Ref,    inView: s9 }            = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: s10Ref,   inView: s10 }           = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: endRef,   inView: isEndInView }   = useInView({ threshold: 0.2, triggerOnce: true });

  const MAPS_LINK = config.weddingReception.googleMapsLink;
  const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(MAPS_LINK)}&bgcolor=0a0a0a&color=ffffff&qzone=1`;

  return (
    <div className={`h-[100dvh] w-screen flex flex-col md:flex-row ${fadeClass} transition-opacity duration-1000`}>

      {/* ── LEFT PHOTO — desktop only ── */}
      <div
        className="hidden md:flex justify-center items-end pb-12 w-2/3 h-full"
        style={{
          backgroundImage: `url(/foto_1_samping.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="font-ovo text-lg text-white tracking-[6px] uppercase">{config.coupleNames}</p>
      </div>

      {/* ── RIGHT SCROLL PANEL — full screen on mobile ── */}
      <div className="w-full md:w-1/3 h-[100dvh] overflow-y-scroll snap-y snap-mandatory scroll-smooth overscroll-none">

        {/* ══════════════════════════
            COVER SLIDE
        ══════════════════════════ */}
        <div
          id="backgroundWedding"
          className="snap-start w-full h-[100dvh] flex items-center justify-center"
        >
          {/* Dark overlay for readability on mobile */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          <div className="relative text-center px-8 flex flex-col h-full justify-between py-16 safe-top safe-bottom">
            <div className="flex flex-col gap-y-3 mt-8">
              <p
                ref={main2Ref}
                className={`font-battambang text-sm text-white/80 tracking-wide fadeMain2 ${isMain2InView ? "active" : ""}`}
              >
                សូមគោរពអញ្ជើញ
              </p>
              <p className={`font-legan text-xs text-white uppercase tracking-widest fadeMain2 ${isMain2InView ? "active" : ""}`}>
                The Wedding Of
              </p>
              <h1
                ref={mainRef}
                className={`text-3xl font-ovo text-white uppercase leading-tight fadeMain ${isMainInView ? "active" : ""}`}
              >
                {config.coupleNames}
              </h1>
              <p className={`font-battambang text-lg text-white/90 fadeMain2 ${isMain2InView ? "active" : ""}`}>
                {config.coupleNamesKhmer}
              </p>
              <p className={`font-legan text-xs text-white/70 uppercase tracking-wide fadeMain2 ${isMain2InView ? "active" : ""}`}>
                {new Date(config.eventDate).toLocaleDateString("en-US", {
                  weekday: "long", year: "numeric", month: "long", day: "numeric",
                })}
              </p>
            </div>

            <div className="mb-8">
              {name && (
                <p className="font-battambang text-sm text-white/90 mb-1">ជូនចំពោះ {name}</p>
              )}
              <p className="font-legan text-xs uppercase tracking-widest text-white mb-5">
                {name ? `Dear ${name},` : "Welcome · សូមស្វាគមន៍"}
              </p>
              {!isOpen ? (
                <button
                  className="animate-bounce px-8 py-3 uppercase text-sm border border-white rounded-full bg-white text-black active:scale-95 transition-transform touch-manipulation"
                  onClick={handleOpen}
                >
                  Open Invitation
                </button>
              ) : (
                <IoIosArrowUp className="mx-auto animate-bounce text-white text-3xl" />
              )}
            </div>
          </div>
        </div>

        {isOpen && (
          <>
            {/* ══════════════════════════
                SLIDE 1 — Khmer Proverb
            ══════════════════════════ */}
            <div
              className="snap-start text-white h-[100dvh] flex flex-col justify-center px-8 py-12"
              style={{ backgroundImage: `url(/slide_1.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              <div ref={s1Ref} className={`relative fadeInMove ${s1 ? "active" : ""}`}>
                <p className="font-legan text-xs tracking-widest uppercase text-white/60 mb-4">
                  — សុភាសិតខ្មែរ · Khmer Proverb —
                </p>
                <h1 className="font-battambang text-2xl text-white leading-relaxed mb-3">
                  {config.bibleVerseKhmer}
                </h1>
                <Divider />
                <p className="font-ovo text-base text-white/90 italic leading-relaxed">
                  &ldquo;{config.bibleVerseContent}&rdquo;
                </p>
                <p className="font-battambang text-sm text-white/70 mt-3 leading-relaxed">
                  {config.bibleVerseContentKhmer}
                </p>
                <p className="font-wonder text-4xl text-white/80 mt-8">{config.coupleNames}</p>
              </div>
            </div>

            {/* ══════════════════════════
                SLIDE 2 — Groom
            ══════════════════════════ */}
            <div
              className="snap-start text-white h-[100dvh] flex items-end pb-12 px-8 relative"
              style={{ backgroundImage: `url(/slide_2.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div ref={s2Ref} className={`relative fadeInMove ${s2 ? "active" : ""} w-full`}>
                <p className="font-legan text-xs tracking-widest uppercase text-white/60 mb-2">
                  The Groom · កូនប្រុស
                </p>
                <h1 className="font-ovo text-3xl text-white">{config.groom}</h1>
                <p className="font-battambang text-xl text-white/80">{config.groomKhmer}</p>
                <h3 className="font-thesignature text-4xl mt-1 text-white/90">About {config.groomNickName},</h3>
                <Divider />
                <p className="font-legan text-xs text-white/80 leading-relaxed">{config.groomBio}</p>
                <p className="font-battambang text-xs text-white/60 mt-2 leading-relaxed">{config.groomBioKhmer}</p>
                <div className="mt-4 flex flex-col gap-y-2">
                  <p className="font-legan text-xs text-white/50">
                    Father · ឪពុក: <span className="text-white/80">{config.groomFather}</span>
                  </p>
                  <p className="font-legan text-xs text-white/50">
                    Mother · ម្តាយ: <span className="text-white/80">{config.groomMother}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* ══════════════════════════
                SLIDE 3 — Bride
            ══════════════════════════ */}
            <div
              className="snap-start text-white h-[100dvh] flex items-end pb-12 px-8 relative"
              style={{ backgroundImage: `url(/slide_3.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div ref={s3Ref} className={`relative fadeInMove ${s3 ? "active" : ""} w-full`}>
                <p className="font-legan text-xs tracking-widest uppercase text-white/60 mb-2">
                  The Bride · កូនស្រី
                </p>
                <h1 className="font-ovo text-3xl text-white">{config.bride}</h1>
                <p className="font-battambang text-xl text-white/80">{config.brideKhmer}</p>
                <h3 className="font-thesignature text-4xl mt-1 text-white/90">About {config.brideNickName},</h3>
                <Divider />
                <p className="font-legan text-xs text-white/80 leading-relaxed">{config.brideBio}</p>
                <p className="font-battambang text-xs text-white/60 mt-2 leading-relaxed">{config.brideBioKhmer}</p>
                <div className="mt-4">
                  <p className="font-legan text-xs text-white/50">
                    Mother · ម្តាយ: <span className="text-white/80">{config.brideMother}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* ══════════════════════════
                SLIDE 4 — Cinematic Quote
            ══════════════════════════ */}
            <div
              className="snap-start text-white h-[100dvh] flex items-center justify-center relative"
              style={{ backgroundImage: `url(/slide_4.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              <div ref={s4Ref} className={`relative fadeInScale ${s4 ? "active" : ""} text-center px-10`}>
                <p className="font-battambang text-sm text-white/70 mb-3">ជីវិតដ៏ស្រស់ស្អាតរបស់យើង</p>
                <p className="font-thesignature text-5xl text-white/90 leading-tight">{config.coupleNames}</p>
                <Divider />
                <p className="font-legan text-xs tracking-widest uppercase text-white/60">
                  Forever &amp; Always
                </p>
              </div>
            </div>

            {/* ══════════════════════════
                SLIDE 5 — Save the Date
            ══════════════════════════ */}
            <div
              className="snap-start text-white h-[100dvh] flex flex-col items-center justify-center px-8 relative"
              style={{ backgroundImage: `url(/slide_5.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/50 pointer-events-none" />
              <div ref={s5Ref} className={`relative fadeInMove ${s5 ? "active" : ""} flex flex-col items-center w-full`}>
                <p className="font-battambang text-sm text-white/70 mb-1">រក្សាទុកកាលបរិច្ឆេទ</p>
                <p className="font-legan text-xs uppercase tracking-widest text-white/60 mb-4">Save Our Date</p>
                <h1 className="font-ovo text-2xl text-white uppercase text-center leading-snug">
                  {new Date(config.eventDate).toLocaleDateString("en-US", { weekday: "long" })}
                  <br />
                  {new Date(config.eventDate).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </h1>
                <Divider />

                {/* Holy Matrimony */}
                {config.holyMatrimony.enabled && (
                  <div className="w-full flex flex-col items-center mb-6">
                    <p className="font-battambang text-xs text-white/60 mb-1">ពិធីអាពាហ៍ពិពាហ៍</p>
                    <p className="font-ovo text-sm uppercase tracking-wide text-white">Holy Matrimony</p>
                    <p className="font-legan text-xs text-white/70 mt-1">
                      {config.holyMatrimony.timeKhmer} · {config.holyMatrimony.time}
                    </p>
                    <p className="font-battambang text-sm text-white/80 text-center mt-1">
                      {config.holyMatrimony.place}
                    </p>
                    <p className="font-legan text-xs text-white/50 text-center">
                      {config.holyMatrimony.place_details}
                    </p>
                  </div>
                )}

                {/* Wedding Reception */}
                {config.weddingReception.enabled && (
                  <div className="w-full flex flex-col items-center border-t border-white/20 pt-5">
                    <p className="font-battambang text-xs text-white/60 mb-1">ពិធីទទួលភ្ញៀវវ</p>
                    <p className="font-ovo text-sm uppercase tracking-wide text-white">Wedding Reception</p>
                    <p className="font-legan text-xs text-white/70 mt-1">
                      {config.weddingReception.timeKhmer} · {config.weddingReception.time}
                    </p>
                    <p className="font-battambang text-sm text-white/80 text-center mt-1">
                      {config.weddingReception.place}
                    </p>
                    <p className="font-legan text-xs text-white/50 text-center">
                      {config.weddingReception.place_details}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ══════════════════════════
                SLIDE 6 — Venue + QR Code
            ══════════════════════════ */}
            <div
              className="snap-start text-white h-[100dvh] flex flex-col justify-center px-8 py-10 relative"
              style={{ backgroundImage: `url(/slide_6.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/55 pointer-events-none" />
              <div ref={s6Ref} className={`relative fadeInMove ${s6 ? "active" : ""} flex flex-col items-center`}>
                <p className="font-battambang text-sm text-white/70 mb-1">ទីតាំងពិធីការ</p>
                <p className="font-legan text-xs uppercase tracking-widest text-white/60 mb-3">Venue Location</p>
                <p className="font-battambang text-lg text-white text-center">{config.weddingReception.place}</p>
                <p className="font-legan text-xs text-white/60 text-center mt-1">
                  {config.weddingReception.place_details}
                </p>
                <Divider />

                {/* QR Code */}
                <p className="font-battambang text-xs text-white/60 mb-3 text-center">
                  ស្កែន QR ដើម្បីទទួល Google Maps
                </p>
                <div className="border border-white/20 rounded-2xl p-3 bg-black/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={QR_URL}
                    alt="Google Maps QR Code"
                    width={150}
                    height={150}
                    className="rounded-xl"
                  />
                </div>
                <p className="font-legan text-xs text-white/40 mt-2 mb-5">Scan to open Google Maps</p>

                {/* Direct map button — large tap target for mobile */}
                <Link
                  href={MAPS_LINK}
                  target="_blank"
                  className="flex items-center gap-x-2 font-legan text-sm bg-white/15 active:bg-white/30 border border-white/30 rounded-full px-6 py-3 text-white touch-manipulation transition"
                >
                  <FaMapMarkerAlt /> Open in Google Maps
                </Link>
              </div>
            </div>

            {/* ══════════════════════════
                SLIDE 7 — Countdown
            ══════════════════════════ */}
            <div
              className="snap-start text-white h-[100dvh] flex flex-col items-center justify-center px-8 relative"
              style={{ backgroundImage: `url(/slide_7.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/50 pointer-events-none" />
              <div ref={s7Ref} className={`relative fadeInMove ${s7 ? "active" : ""} flex flex-col items-center`}>
                <p className="font-battambang text-sm text-white/70 mb-2">ពេលវេលារាប់ថ្ងៃ</p>
                <h1 className="font-ovo text-xl text-white uppercase text-center leading-snug">
                  Almost Time For<br />Our Celebration
                </h1>
                <p className="font-battambang text-xs text-white/60 mt-2 mb-2">ពេលវេលាកំពុងរាប់...</p>
                <CountdownTimer />
              </div>
            </div>

            {/* ══════════════════════════
                SLIDE 8 — Prewedding Video
                (disabled until YouTube link is ready)
            ══════════════════════════ */}
            {config.prewedding.enabled && (
              <div
                className="snap-start text-white h-[100dvh] flex flex-col justify-center px-8 py-12 relative"
                style={{ backgroundImage: `url(/slide_8.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                <div ref={s8Ref} className={`relative fadeInMove ${s8 ? "active" : ""}`}>
                  <p className="font-battambang text-xs text-white/60 mb-2 text-center">វីដេអូមុនពេលរៀបការ</p>
                  <h1 className="font-ovo text-2xl text-white uppercase text-center mb-6">
                    Our Prewedding Story
                  </h1>
                  <div className="w-full relative rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%", height: 0 }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${config.prewedding.link}?mute=1&playsinline=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="font-battambang text-sm text-white/70 text-center mt-4">
                    {config.prewedding.detail}
                  </p>
                </div>
              </div>
            )}

            {/* ══════════════════════════
                SLIDE 9 — RSVP Form
            ══════════════════════════ */}
            {config.rsvp.enabled && (
              <div
                className="snap-start text-white h-[100dvh] flex flex-col justify-center px-8 py-10 relative"
                style={{ backgroundImage: `url(/slide_8.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-black/60 pointer-events-none" />
                <div ref={s9Ref} className={`relative fadeInMove ${s9 ? "active" : ""}`}>
                  <p className="font-battambang text-xs text-white/60 mb-1 text-center">ការឆ្លើយតបអញ្ជើញ</p>
                  <h1 className="font-ovo text-2xl text-white uppercase text-center">RSVP &amp; Wishes</h1>
                  <p className="font-battambang text-xs text-white/60 text-center mt-2 leading-relaxed">
                    {config.rsvp.detail}
                  </p>
                  <Form />
                </div>
              </div>
            )}

            {/* ══════════════════════════
                SLIDE 10 — Wishes List
            ══════════════════════════ */}
            <div
              className="snap-start text-white h-[100dvh] flex flex-col justify-center px-8 py-10 relative"
              style={{ backgroundImage: `url(/slide_9.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/60 pointer-events-none" />
              <div ref={s10Ref} className={`relative fadeInMove ${s10 ? "active" : ""}`}>
                <p className="font-battambang text-xs text-white/60 mb-1 text-center">ពាក្យជូនពរ</p>
                <h1 className="font-ovo text-2xl text-white uppercase text-center mb-5">Wishes</h1>
                <WishesList />
              </div>
            </div>

            {/* ══════════════════════════
                FINAL SLIDE — Thank You
            ══════════════════════════ */}
            <div
              className="snap-start text-white h-[100dvh] flex flex-col justify-end pb-16 px-8 relative"
              style={{ backgroundImage: `url(/foto_1_samping.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              <div ref={endRef} className={`relative fadeInMove ${isEndInView ? "active" : ""}`}>
                <p className="font-battambang text-sm text-white/80 text-center leading-loose mb-4">
                  សូមអរគុណចំពោះការអញ្ជើញ និងការគាំទ្ររបស់លោកអ្នក។
                  <br />
                  វត្តមានរបស់អ្នកគឺជាអំណោយដ៏មានតម្លៃបំផុតសម្រាប់យើងទាំងពីរ។
                </p>
                <Divider />
                <h1 className="font-ovo text-xl text-white uppercase text-center">{config.thankyou}</h1>
                <p className="font-legan text-xs text-white/60 text-center mt-3 leading-relaxed">
                  Thank you for being part of our most special day.
                  <br />
                  Your presence means the world to us.
                </p>
                <p className="font-thesignature text-5xl text-white/80 text-center mt-5 leading-none">
                  {config.coupleNames}
                </p>
                <p className="font-battambang text-base text-white/60 text-center mt-2">
                  {config.coupleNamesKhmer}
                </p>
              </div>
              <footer className="relative mt-8 text-center">
                <p className="font-battambang text-xs text-white/30">ជូនពរដោយស្នេហ៍ · With Love</p>
              </footer>
            </div>
          </>
        )}
      </div>

      {/* Audio — replace wedding_song.mp3 in public/music/ folder */}
      <audio ref={audioRef} src="/music/wedding_song.mp3" preload="auto" loop />
    </div>
  );
};

export default WeddingScreen;
