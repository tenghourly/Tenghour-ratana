"use client";

import { useState, useEffect } from "react";
import { config } from "@/lib/config";

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date(config.eventDate);
    const now = new Date();
    const difference = Number(targetDate) - Number(now);

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 mt-6 text-center">
      {[
        { value: timeLeft.days,    label: "Days",    labelKh: "ថ្ងៃ" },
        { value: timeLeft.hours,   label: "Hours",   labelKh: "ម៉ោង" },
        { value: timeLeft.minutes, label: "Minutes", labelKh: "នាទី" },
        { value: timeLeft.seconds, label: "Seconds", labelKh: "វិនាទី" },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="bg-white/10 border border-white/20 rounded-xl w-16 h-16 flex items-center justify-center">
            <span className="text-3xl font-bold font-legan text-white">
              {String(item.value).padStart(2, "0")}
            </span>
          </div>
          <span className="font-battambang text-xs text-white/70 mt-1">{item.labelKh}</span>
          <span className="font-legan text-xs uppercase text-white/40">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
