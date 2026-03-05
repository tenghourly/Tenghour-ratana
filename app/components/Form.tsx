"use client";

import React, { useState } from "react";

const Form = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      attendance: formData.get("attendance"),
      guests: formData.get("guests"),
      message: formData.get("message"),
    };

    if (!data.name || !data.attendance || !data.guests || !data.message) {
      alert("សូមបំពេញព័ត៌មានទាំងអស់! · All fields are required!");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      form.reset();
      alert("អរគុណ! ការឆ្លើយតបរបស់អ្នកត្រូវបានទទួល។\nThank you! Your RSVP has been submitted.");
    } else {
      alert("មានបញ្ហា សូមព្យាយាមម្ដងទៀត · Submission failed, please try again.");
    }

    setLoading(false);
  };

  const inputClass = "block w-full p-3 mt-1 bg-white/10 text-white border border-white/20 rounded-xl text-sm focus:outline-none focus:border-white/50 placeholder-white/30 font-battambang";
  const labelClass = "block text-sm font-battambang text-white/80 mb-1";

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">

      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          ឈ្មោះ <span className="text-white/40 font-legan text-xs">(Name)</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="បញ្ចូលឈ្មោះរបស់អ្នក..."
          className={inputClass}
          required
        />
      </div>

      {/* Attendance */}
      <div>
        <label htmlFor="attendance" className={labelClass}>
          ការចូលរួម <span className="text-white/40 font-legan text-xs">(Attendance)</span>
        </label>
        <select
          id="attendance"
          name="attendance"
          className={`${inputClass} bg-black/50`}
          required
        >
          <option value="">— សូមជ្រើសរើស —</option>
          <option value="Hadir">✅ នឹងចូលរួម (Will Attend)</option>
          <option value="Tidak Hadir">❌ មិនអាចចូលរួម (Cannot Attend)</option>
        </select>
      </div>

      {/* Number of guests */}
      <div>
        <label htmlFor="guests" className={labelClass}>
          ចំនួនភ្ញៀវ <span className="text-white/40 font-legan text-xs">(Number of Guests)</span>
        </label>
        <select
          id="guests"
          name="guests"
          className={`${inputClass} bg-black/50`}
          required
        >
          <option value="">— សូមជ្រើសរើស —</option>
          <option value="1">១ នាក់</option>
          <option value="2">២ នាក់</option>
          <option value="3">៣ នាក់</option>
          <option value="4">៤ នាក់</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          ពាក្យជូនពរ <span className="text-white/40 font-legan text-xs">(Message / Wishes)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="សូមសរសេរពាក្យជូនពរ..."
          className={inputClass}
          required
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 font-battambang text-sm font-bold text-black bg-white rounded-full active:scale-95 transition-transform touch-manipulation disabled:opacity-50"
      >
        {loading ? "កំពុងផ្ញើ..." : "ផ្ញើការឆ្លើយតប · Submit"}
      </button>
    </form>
  );
};

export default Form;
