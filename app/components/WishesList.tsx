"use client";

import { useState, useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";

interface Wish {
  _id: string;
  name: string;
  attendance: string;
  guests: number;
  message: string;
  createdAt: string;
}

const WishesList = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchWishes = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/get?page=${pageNumber}&limit=5`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      setWishes(data.wishes);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching wishes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes(page);
  }, [page]);

  const attendanceLabel = (val: string) => {
    if (val === "Hadir") return "✅ នឹងចូលរួម";
    if (val === "Tidak Hadir") return "❌ មិនអាចចូលរួម";
    return val;
  };

  return (
    <div className="bg-black/50 border border-white/10 text-white p-4 rounded-2xl mt-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="font-battambang text-xs text-white/60">ពាក្យជូនពររបស់ភ្ញៀវ</p>
        <button
          onClick={() => fetchWishes(page)}
          disabled={loading}
          className={`text-white touch-manipulation ${loading ? "opacity-40" : "active:scale-90 transition-transform"}`}
        >
          {loading
            ? <span className="font-battambang text-xs text-white/50">កំពុងផ្ទុក...</span>
            : <IoMdRefresh className="w-5 h-5" />
          }
        </button>
      </div>

      {/* Wishes */}
      <div className="max-h-[320px] overflow-y-auto space-y-4 pr-1">
        {wishes.length === 0 ? (
          <p className="font-battambang text-sm text-white/50 text-center py-6">
            មិនទាន់មានពាក្យជូនពរទេ។
          </p>
        ) : (
          wishes.map((wish) => (
            <div key={wish._id} className="bg-white/5 rounded-xl p-3">
              {/* Name + attendance badge */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="font-ovo text-sm text-white font-bold">{wish.name}</p>
                <span className="font-battambang text-xs bg-white/10 rounded-full px-2 py-0.5 text-white/70">
                  {attendanceLabel(wish.attendance)}
                </span>
              </div>

              {/* Guest count */}
              <p className="font-battambang text-xs text-white/40 mt-1">
                ចំនួនភ្ញៀវ: {wish.guests} នាក់
              </p>

              {/* Date */}
              <p className="font-legan text-xs text-white/40 mt-0.5">
                {new Date(wish.createdAt).toLocaleString("en-US", {
                  year: "numeric", month: "short", day: "numeric",
                  hour: "numeric", minute: "numeric",
                })}
              </p>

              {/* Message */}
              <p className="font-battambang text-sm text-white/80 mt-2 leading-relaxed">
                {wish.message}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-5 border-t border-white/10 pt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`font-battambang text-sm px-4 py-2 rounded-full border border-white/20 touch-manipulation transition
            ${page === 1 ? "opacity-30 cursor-not-allowed" : "active:bg-white/10"}`}
        >
          &#8592; មុន
        </button>
        <p className="font-battambang text-xs text-white/50">
          ទំព័រ {page} / {totalPages}
        </p>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`font-battambang text-sm px-4 py-2 rounded-full border border-white/20 touch-manipulation transition
            ${page === totalPages ? "opacity-30 cursor-not-allowed" : "active:bg-white/10"}`}
        >
          បន្ទាប់ &#8594;
        </button>
      </div>
    </div>
  );
};

export default WishesList;
