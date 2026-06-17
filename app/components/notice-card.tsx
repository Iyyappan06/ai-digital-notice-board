"use client";

import { useState } from "react";
import type { Notice } from "@/lib/notices";

interface NoticeCardProps {
  notice: Notice;
  onEdit: (notice: Notice) => void;
  onDelete: (id: string) => void;
}

export default function NoticeCard({
  notice,
  onEdit,
  onDelete,
}: NoticeCardProps) {
  const [confirming, setConfirming] =
    useState(false);

  const categoryColors: Record<
    string,
    string
  > = {
    General:
      "bg-slate-100 text-slate-700",

    Academics:
      "bg-blue-100 text-blue-700",

    Placement:
      "bg-purple-100 text-purple-700",

    Events:
      "bg-orange-100 text-orange-700",

    Sports:
      "bg-green-100 text-green-700",

    Administration:
      "bg-red-100 text-red-700",

    Library:
      "bg-amber-100 text-amber-700",

    Hostel:
      "bg-cyan-100 text-cyan-700",
  };

  const colorClass =
    categoryColors[
      notice.category
    ] ??
    "bg-slate-100 text-slate-700";

  const createdDate =
    new Date(
      notice.created_at
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  const expiryDate =
    notice.expiry_date
      ? new Date(
          notice.expiry_date
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      : null;

  return (
    <div
      className={`
      group
      relative
      overflow-hidden
      rounded-[32px]
      border
      backdrop-blur-xl
      bg-white/85
      p-8
      shadow-soft
      transition-all
      duration-500
      hover:-translate-y-2
      hover:shadow-premium

      ${
        notice.important
          ? "border-indigo-300"
          : "border-white"
      }
    `}
    >
      {/* Glow Layer */}

      <div
        className="
        absolute
        inset-0
        opacity-0
        group-hover:opacity-100
        transition
        duration-500
        bg-gradient-to-br
        from-indigo-500/5
        via-purple-500/5
        to-cyan-500/5
      "
      />

      {/* Important Border */}

      {notice.important && (
        <div
          className="
          absolute
          top-0
          left-0
          right-0
          h-1.5
          bg-gradient-to-r
          from-indigo-600
          via-purple-600
          to-cyan-500
        "
        />
      )}

      {/* HEADER */}

      <div className="relative flex justify-between items-start gap-4 mb-6">

        <div className="flex flex-wrap gap-3">

          <span
            className={`
            px-4
            py-1.5
            rounded-full
            text-xs
            font-semibold
            ${colorClass}
          `}
          >
            {notice.category}
          </span>

          {notice.important && (
            <span
              className="
              px-4
              py-1.5
              rounded-full
              text-xs
              font-semibold
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              text-white
            "
            >
              📌 Important
            </span>
          )}

        </div>

        {/* ACTIONS */}

        <div className="flex gap-2">

          <button
            onClick={() =>
              onEdit(notice)
            }
            title="Edit"
            className="
            h-10
            w-10
            rounded-xl
            bg-slate-100
            hover:bg-indigo-100
            hover:text-indigo-700
          "
          >
            ✏️
          </button>

          {confirming ? (
            <div className="flex gap-2">

              <button
                onClick={() =>
                  onDelete(
                    notice.id
                  )
                }
                className="
                px-3
                py-2
                rounded-xl
                bg-red-500
                text-white
                text-sm
                font-medium
                hover:bg-red-600
              "
              >
                Delete
              </button>

              <button
                onClick={() =>
                  setConfirming(
                    false
                  )
                }
                className="
                px-3
                py-2
                rounded-xl
                bg-slate-200
                hover:bg-slate-300
                text-sm
              "
              >
                Cancel
              </button>

            </div>
          ) : (
            <button
              onClick={() =>
                setConfirming(
                  true
                )
              }
              title="Delete"
              className="
              h-10
              w-10
              rounded-xl
              bg-slate-100
              hover:bg-red-100
              hover:text-red-600
            "
            >
              🗑️
            </button>
          )}

        </div>

      </div>

      {/* TITLE */}

      <h2
        className="
        relative
        text-2xl
        font-black
        text-slate-900
        mb-4
        leading-tight
      "
      >
        {notice.title}
      </h2>

      {/* DESCRIPTION */}

      <p
        className="
        relative
        text-slate-600
        leading-8
        text-base
        line-clamp-4
      "
      >
        {notice.description}
      </p>

      {/* FOOTER */}

      <div
        className="
        relative
        mt-8
        pt-6
        border-t
        border-slate-200
        flex
        justify-between
        items-center
      "
      >

        <div>

          <p className="text-xs text-slate-400">
            Posted On
          </p>

          <p className="font-semibold text-slate-700">
            {createdDate}
          </p>

        </div>

        {expiryDate && (
          <div className="text-right">

            <p className="text-xs text-slate-400">
              Expires
            </p>

            <p className="font-semibold text-orange-500">
              {expiryDate}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}