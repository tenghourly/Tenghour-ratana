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

const makeRef = (threshold = 0.3) =>
  useInView({ threshold, triggerOnce: true });

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

  const { ref: mainRef,   inView: isMainInView }   = makeRef(0.5);
  const { ref: main2Ref,  inView: isMain2InView }  = makeRef(0.4);
  const { ref: s1Ref,     inView: s1 }             = makeRef();
  const { ref: s2Ref,     inView: s2 }             = makeRef();
  const { ref: s3Ref,     inView: s3 }             = makeRef();
  const { ref: s4Ref,     inView: s4 }             = makeRef();
  const { ref: s5Ref,     inView: s5 }             = makeRef();
  const { ref: s6Ref,     inView: s6 }             = makeRef();
  const { ref: s7Ref,     inView: s7 }             = makeRef();
  const { ref: s8Ref,     inView: s8 }             = makeRef();
  const { ref: s9Ref,     inView: s9 }             = makeRef();
  const { ref: s10Ref,    inView: s10 }            = makeRef();
  const { ref: s11Ref,    inView: s11 }            = makeRef();
  const { ref: endRef,    inView: isEndInView }    = makeRef();

  const MAPS_LINK = config.weddingReception.googleMapsLink;
  // QR code using Google Charts API (no install needed)
  const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(MAPS_LINK)}&bgcolor=0a0a0a&color=ffffff&qzone=1`;

  return (
    <div className={`h-screen w-screen flex flex-col md:flex-row ${fadeClass} transition-opacity duration-1000`}>

      {/* ── LEFT SIDE PHOTO (desktop) ── */}
      <div
        className="md:flex hidden justify-center items-end pb-12 w-2/3 h-full"
        style={{ backgroundImage: `url(/foto_1_samping.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <p className="font-ovo text-lg text-white tracking-[6px] uppercase">{config.coupleNames}</p>
      </div>

      {/* ── RIGHT SCROLL PANEL ── */}
      <div className="md:w-1/3 w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">

        {/* ══════════════════════════════
            COVER
        ══════════════════════════════ */}
        <div id="backgroundWedding" className="snap-start w-full h-screen flex items-center justify-center">
          <div className="text-center px-6 flex flex-col h-full justify-between py-20">
            <div className="flex flex-col gap-y-3">
              <p
                ref={main2Ref}
                className={`font-battambang text-xs text-white/70 tracking-wide fadeMain2 ${isMain2InView ? "active" : ""}`}
              >
                សូមគោរពអញ្ជើញ
              </p>
              <p className={`font-legan text-xs text-white uppercase tracking-widest fadeMain2 ${isMain2InView ? "active" : ""}`}>
                The Wedding Of
              </p>
              <h1
                ref={mainRef}
                className={`text-2xl md:text-3xl font-ovo text-white uppercase fadeMain ${isMainInView ? "active" : ""}`}
              >
                {config.coupleNames}
              </h1>
              <p className={`font-battambang text-base text-white/80 fadeMain2 ${isMain2InView ? "active" : ""}`}>
                {config.coupleNamesKhmer}
              </p>
              <p className={`font-legan text-xs text-white/70 uppercase tracking-wide fadeMain2 ${isMain2InView ? "active" : ""}`}>
                {new Date(config.eventDate).toLocaleDateString("en-US", {
                  weekday: "long", year: "numeric", month: "long", day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="font-battambang text-sm text-white/80 mb-1">
                {name ? `ជូនចំពោះ ${name}` : ""}
              </p>
              <p className="font-legan text-xs uppercase tracking-widest text-white mb-4">
                {name ? `Dear ${name},` : "Welcome"}
              </p>
              {!isOpen ? (
                <button
                  className="animate-bounce px-7 py-2 uppercase text-xs border border-white rounded-full bg-white text-black hover:bg-transparent hover:text-white transition"
                  onClick={handleOpen}
                >
                  Open Invitation
                </button>
              ) : (
                <IoIosArrowUp className="mx-auto mt-16 animate-bounce text-white text-2xl" />
              )}
            </div>
          </div>
        </div>

        {isOpen && (
          <>
            {/* ══════════════════════════════
                SLIDE 1 — Khmer Proverb / Quote
            ══════════════════════════════ */}
            <div
              className="snap-start text-white h-screen flex flex-col justify-center px-10 py-16"
              style={{ backgroundImage: `url(/slide_1.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div ref={s1Ref} className={`fadeInMove ${s1 ? "active" : ""}`}>
                <p className="font-legan text-xs tracking-widest uppercase text-white/50 mb-4">— សុភាសិតខ្មែរ · Khmer Proverb —</p>
                <h1 className="font-battambang text-2xl text-white leading-relaxed mb-3">
                  {config.bibleVerseKhmer}
                </h1>
                <Divider />
                <p className="font-ovo text-base text-white/90 italic leading-relaxed">
                  "{config.bibleVerseContent}"
                </p>
                <p className="font-battambang text-sm text-white/60 mt-3 leading-relaxed">
                  {config.bibleVerseContentKhmer}
                </p>
                <p className="font-wonder text-4xl text-white/80 mt-6">{config.coupleNames}</p>
              </div>
            </div>

            {/* ══════════════════════════════
                SLIDE 2 — Groom
            ══════════════════════════════ */}
            <div
              className="snap-start text-white h-screen flex items-end pb-14 px-10"
              style={{ backgroundImage: `url(/slide_2.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div ref={s2Ref} className={`fadeInMove ${s2 ? "active" : ""} w-full`}>
                <p className="font-legan text-xs tracking-widest uppercase text-white/50 mb-2">The Groom · កូនប្រុស</p>
                <h1 className="font-ovo text-3xl text-white">{config.groom}</h1>
                <p className="font-battambang text-lg text-white/70">{config.groomKhmer}</p>
                <h3 className="font-thesignature text-3xl mt-1 text-white/90">About {config.groomNickName},</h3>
                <Divider />
                <p className="font-legan text-xs text-white/80 leading-relaxed">{config.groomBio}</p>
                <p className="font-battambang text-xs text-white/60 mt-2 leading-relaxed">{config.groomBioKhmer}</p>
                <div className="mt-4 flex flex-col gap-y-1">
                  <p className="font-legan text-xs text-white/50">
                    Father · ឪពុក: <span className="text-white/80">{config.groomFather}</span>
                  </p>
                  <p className="font-legan text-xs text-white/50">
                    Mother · ម្តាយ: <span className="text-white/80">{config.groomMother}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════
                SLIDE 3 — Bride
            ══════════════════════════════ */}
            <div
              className="snap-start text-white h-screen flex items-end pb-14 px-10"
              style={{ backgroundImage: `url(/slide_3.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div ref={s3Ref} className={`fadeInMove ${s3 ? "active" : ""} w-full`}>
                <p className="font-legan text-xs tracking-widest uppercase text-white/50 mb-2">The Bride · កូនស្រី</p>
                <h1 className="font-ovo text-3xl text-white">{config.bride}</h1>
                <p className="font-battambang text-lg text-white/70">{config.brideKhmer}</p>
                <h3 className="font-thesignature text-3xl mt-1 text-white/90">About {config.brideNickName},</h3>
                <Divider />
                <p className="font-legan text-xs text-white/80 leading-relaxed">{config.brideBio}</p>
                <p className="font-battambang text-xs text-white/60 mt-2 leading-relaxed">{config.brideBioKhmer}</p>
                <div className="mt-4 flex flex-col gap-y-1">
                  <p className="font-legan text-xs text-white/50">
                    Mother · ម្តាយ: <span className="text-white/80">{config.brideMother}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════
                SLIDE 4 — Photo (cinematic)
            ══════════════════════════════ */}
            <div
              className="snap-start text-white h-screen flex items-center justify-center"
              style={{ backgroundImage: `url(/slide_4.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div ref={s4Ref} className={`fadeInScale ${s4 ? "active" : ""} text-center px-10`}>
                <p className="font-battambang text-sm text-white/60 mb-2">ជីវិតដ៏ស្រស់ស្អាត</p>
                <p className="font-thesignature text-5xl text-white/90">{config.coupleNames}</p>
                <p className="font-legan text-xs tracking-widest uppercase text-white/50 mt-3">
                  {new Date(config.eventDate).toLocaleDateString("en-US", {
                    weekday: "long", year: "numeric", month: "long", day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* ══════════════════════════════
                SLIDE 5 — Save the Date
            ══════════════════════════════ */}
            <div
              className="snap-start text-white h-screen flex flex-col items-center justify-center px-10"
              style={{ backgroundImage: `url(/slide_5.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div ref={s5Ref} className={`fadeInMove ${s5 ? "active" : ""} flex flex-col items-center w-full`}>
                <p className="font-battambang text-xs text-white/60 mb-1 tracking-wide">រក្សាទុកកាលបរិច្ឆេទ</p>
                <p className="font-legan text-xs uppercase tracking-widest text-white/60 mb-3">Save Our Date</p>
                <h1 className="font-ovo text-2xl text-white uppercase text-center">
                  {new Date(config.eventDate).toLocaleDateString("en-US", { weekday: "long" })}
                  <br />
                  {new Date(config.eventDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </h1>
                <Divider />

                {/* Holy Matrimony */}
                {config.holyMatrimony.enabled && (
                  <div className="w-full flex flex-col items-center mb-5">
                    <p className="font-battambang text-xs text-white/60 mb-1">ពិធីអាពាហ៍ពិពាហ៍ព្រឹក</p>
                    <p className="font-ovo text-sm uppercase tracking-wide text-white">Holy Matrimony</p>
                    <p className="font-legan text-xs text-white/70 mt-1">{config.holyMatrimony.timeKhmer} · {config.holyMatrimony.time}</p>
                    <p className="font-battambang text-xs text-white/70 text-center mt-1">{config.holyMatrimony.place}</p>
                    <p className="font-legan text-xs text-white/50 text-center">{config.holyMatrimony.place_details}</p>
                  </div>
                )}

                {/* Wedding Reception */}
                {config.weddingReception.enabled && (
                  <div className="w-full flex flex-col items-center">
                    <p className="font-battambang text-xs text-white/60 mb-1">ពិធីទទួលភ្ញៀវវ</p>
                    <p className="font-ovo text-sm uppercase tracking-wide text-white">Wedding Reception</p>
                    <p className="font-legan text-xs text-white/70 mt-1">{config.weddingReception.timeKhmer} · {config.weddingReception.time}</p>
                    <p className="font-battambang text-xs text-white/70 text-center mt-1">{config.weddingReception.place}</p>
                    <p className="font-legan text-xs text-white/50 text-center">{config.weddingReception.place_details}</p>
                  </div>
                )}
              </div>
            </div>

            {/* ══════════════════════════════
                SLIDE 6 — Venue + QR Code + Map Button
            ══════════════════════════════ */}
            <div
              className="snap-start text-white h-screen flex flex-col justify-center px-10 py-12"
              style={{ backgroundImage: `url(/slide_6.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div ref={s6Ref} className={`fadeInMove ${s6 ? "active" : ""} flex flex-col items-center`}>
                <p className="font-battambang text-xs text-white/60 mb-1">ទីតាំងពិធីការ</p>
                <p className="font-legan text-xs uppercase tracking-widest text-white/60 mb-3">Venue Location</p>
                <p className="font-battambang text-base text-white text-center">{config.weddingReception.place}</p>
                <p className="font-legan text-xs text-white/60 text-center mt-1">{config.weddingReception.place_details}</p>

                <Divider />

                {/* QR Code */}
                <p className="font-battambang text-xs text-white/50 mb-3">ស្កែន QR ដើម្បីទទួល Google Maps</p>
                <div className="border border-white/20 rounded-xl p-2 bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={QR_URL}
                    alt="Google Maps QR Code"
                    width={140}
                    height={140}
                    className="rounded-lg"
                  />
                </div>
                <p className="font-legan text-xs text-white/40 mt-2">Scan to open Google Maps</p>

                <Divider />

                {/* Map buttons */}
                <div className="flex gap-3 flex-wrap justify-center">
                  <Link
                    href={MAPS_LINK}
                    target="_blank"
                    className="flex items-center gap-x-2 font-legan text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-5 py-2 text-white transition"
                  >
                    <FaMapMarkerAlt /> Open in Google Maps
                  </Link>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════
                SLIDE 7 — Photo cinematic
            ══════════════════════════════ */}
            <div
              className="snap-start text-white h-screen flex items-end pb-14 px-10"
              style={{ backgroundImage: `url(/slide_7.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div ref={s7Ref} className={`fadeInLeft ${s7 ? "active" : ""}`}>
                <p className="font-battambang text-sm text-white/60">ស្នេហ៍ពិត</p>
                <p className="font-thesignature text-5xl text-white/90 mt-1">{config.coupleNames}</p>
                <p className="font-legan text-xs tracking-widest uppercase text-white/50 mt-2">
                  Forever & Always
                </p>
              </div>
            </div>

            {/* ══════════════════════════════
                SLIDE 8 — Countdown
            ══════════════════════════════ */}
            <div
              className="snap-start text-white h-screen flex flex-col items-center justify-end pb-20 px-10"
              style={{ backgroundImage: `url(/slide_8.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div ref={s8Ref} className={`fadeInMove ${s8 ? "active" : ""} flex flex-col items-center`}>
                <p className="font-battambang text-xs text-white/60 mb-1">ពេលវេលារាប់ថ្ងៃ</p>
                <h1 className="font-ovo text-xl text-white uppercase text-center">
                  Almost Time For Our Celebration
                </h1>
                <p className="font-battambang text-xs text-white/60 mt-1">ពេលវេលាកំពុងរាប់...</p>
                <CountdownTimer />
              </div>
            </div>

            {/* ══════════════════════════════
                SLIDE 9 — Prewedding (disabled until ready)
            ══════════════════════════════ */}
            {config.prewedding.enabled && (
              <div
                className="snap-start text-white h-screen flex flex-col justify-center px-8 py-16"
                style={{ backgroundImage: `url(/slide_9.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div ref={s9Ref} className={`fadeInMove ${s9 ? "active" : ""}`}>
                  <p className="font-battambang text-xs text-white/60 mb-2 text-center">វីដេអូមុនពេលរៀបការ</p>
                  <h1 className="font-ovo text-2xl text-white uppercase text-center mb-6">Our Prewedding Story</h1>
                  <div className="w-full relative rounded-lg overflow-hidden" style={{ paddingBottom: "56.25%", height: 0 }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${config.prewedding.link}?mute=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="font-battambang text-sm text-white/70 text-center mt-4">{config.prewedding.detail}</p>
                </div>
              </div>
            )}

            {/* ══════════════════════════════
                SLIDE 10 — RSVP Form
            ══════════════════════════════ */}
            {config.rsvp.enabled && (
              <div
                className="snap-start text-white h-screen flex flex-col justify-center px-8 py-10"
                style={{ backgroundImage: `url(/foto_1_samping.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div ref={s10Ref} className={`fadeInMove ${s10 ? "active" : ""}`}>
                  <p className="font-battambang text-xs text-white/60 mb-1 text-center">ការឆ្លើយតបអញ្ជើញ</p>
                  <h1 className="font-ovo text-2xl text-white uppercase text-center">RSVP & Wishes</h1>
                  <p className="font-battambang text-xs text-white/60 text-center mt-2 leading-relaxed whitespace-pre-line">
                    {config.rsvp.detail}
                  </p>
                  <Form />
                </div>
              </div>
            )}

            {/* ══════════════════════════════
                SLIDE 11 — Wishes List
            ══════════════════════════════ */}
            <div
              className="snap-start text-white h-screen flex flex-col justify-center px-8 py-10"
              style={{ backgroundImage: `url(/slide_9.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div ref={s11Ref} className={`fadeInMove ${s11 ? "active" : ""}`}>
                <p className="font-battambang text-xs text-white/60 mb-1 text-center">ពាក្យជូនពរ</p>
                <h1 className="font-ovo text-2xl text-white uppercase text-center mb-4">Wishes</h1>
                <WishesList />
              </div>
            </div>

            {/* ══════════════════════════════
                FINAL SLIDE — Thank You
            ══════════════════════════════ */}
            <div
              className="snap-start text-white h-screen flex flex-col justify-end pb-16 px-10"
              style={{ backgroundImage: `url(/foto_1_samping.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div ref={endRef} className={`fadeInMove ${isEndInView ? "active" : ""}`}>
                <p className="font-battambang text-sm text-white/70 text-center leading-relaxed mb-4">
                  សូមអរគុណចំពោះការអញ្ជើញ និងការគាំទ្ររបស់លោកអ្នក។<br />
                  វត្តមានរបស់អ្នកគឺជាអំណោយដ៏មានតម្លៃបំផុតសម្រាប់យើងទាំងពីរ។
                </p>
                <Divider />
                <h1 className="font-ovo text-xl text-white uppercase text-center">{config.thankyou}</h1>
                <p className="font-legan text-xs text-white/60 text-center mt-3 leading-relaxed">
                  Thank you for being part of our most special day.<br />Your presence means the world to us.
                </p>
                <p className="font-thesignature text-4xl text-white/80 text-center mt-4">{config.coupleNames}</p>
                <p className="font-battambang text-sm text-white/60 text-center mt-1">{config.coupleNamesKhmer}</p>
              </div>
              <footer className="mt-8 text-center">
                <p className="font-battambang text-xs text-white/30">ជូនពរដោយស្នេហ៍ · With Love</p>
              </footer>
            </div>
          </>
        )}
      </div>

      {/* Audio — user will replace the file */}
      <audio ref={audioRef} src="/music/wedding_song.mp3" preload="auto" loop />
    </div>
  );
};

export default WeddingScreen;
