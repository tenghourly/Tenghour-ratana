"use client";

type Props = { isPlaying: boolean; onToggle: () => void; };

export default function MusicButton({ isPlaying, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      className="fixed z-50 touch-manipulation"
      style={{
        bottom:  "1.5rem",
        right:   "1.2rem",
        width:   44,
        height:  44,
        borderRadius: "50%",
        background:   "rgba(0,0,0,0.55)",
        border:       "1px solid rgba(255,255,255,0.25)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        cursor:  "pointer",
        display: "flex",
        alignItems:     "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      {/* Pulse ring when playing */}
      {isPlaying && (
        <>
          <span style={{
            position:     "absolute",
            inset:        -4,
            borderRadius: "50%",
            border:       "1.5px solid rgba(255,215,0,0.5)",
            animation:    "musicPulse 1.8s ease-out infinite",
          }}/>
          <span style={{
            position:     "absolute",
            inset:        -10,
            borderRadius: "50%",
            border:       "1px solid rgba(255,215,0,0.2)",
            animation:    "musicPulse 1.8s 0.6s ease-out infinite",
          }}/>
        </>
      )}

      {/* Icon */}
      {isPlaying ? (
        // Pause — two bars
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="4" height="14" rx="1.5" fill="white"/>
          <rect x="9" y="1" width="4" height="14" rx="1.5" fill="white"/>
        </svg>
      ) : (
        // Play — triangle
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 1.5L13 8L2 14.5V1.5Z" fill="white"/>
        </svg>
      )}

      {/* Keyframes injected inline — no extra CSS file needed */}
      <style>{`
        @keyframes musicPulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </button>
  );
}
