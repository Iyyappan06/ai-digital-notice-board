"use client";

import { useState } from "react";
import type { Notice } from "@/lib/notices";

interface NoticeCardProps {
  notice: Notice;
  onEdit:   (notice: Notice) => void;
  onDelete: (id: string) => void;
}

export default function NoticeCard({ notice, onEdit, onDelete }: NoticeCardProps) {
  const [confirming, setConfirming] = useState(false);

  const categoryColors: Record<string, string> = {
    General:        "bg-slate-100 text-slate-700",
    Academics:      "bg-blue-100 text-blue-700",
    Placement:      "bg-purple-100 text-purple-700",
    Events:         "bg-orange-100 text-orange-700",
    Sports:         "bg-green-100 text-green-700",
    Administration: "bg-red-100 text-red-700",
    Library:        "bg-amber-100 text-amber-700",
    Hostel:         "bg-teal-100 text-teal-700",
  };

  const colorClass =
    categoryColors[notice.category] ?? "bg-slate-100 text-slate-700";

  const formattedDate = new Date(notice.created_at).toLocaleDateString(
    "en-IN",
    { day: "numeric", month: "short", year: "numeric" }
  );

  const formattedExpiry = notice.expiry_date
    ? new Date(notice.expiry_date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div
      className={`
        relative bg-white rounded-2xl border shadow-sm hover:shadow-md
        transition-all duration-200 animate-fade-in overflow-hidden
        ${notice.important ? "border-indigo-300 ring-1 ring-indigo-200" : "border-slate-200"}
      `}
    >
      {/* Important ribbon */}
      {notice.important && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-t-2xl" />
      )}

      <div className="p-5 pt-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colorClass}`}>
              {notice.category}
            </span>
            {notice.important && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">
                📌 Important
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onEdit(notice)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              title="Edit notice"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            {confirming ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onDelete(notice.id)}
                  className="text-xs px-2 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors font-medium"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setConfirming(false)}
                  className="text-xs px-2 py-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirming(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Delete notice"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-800 text-base leading-snug mb-2">
          {notice.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
          {notice.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">Posted {formattedDate}</span>
          {formattedExpiry && (
            <span className="text-xs text-amber-600 font-medium">
              Expires {formattedExpiry}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}