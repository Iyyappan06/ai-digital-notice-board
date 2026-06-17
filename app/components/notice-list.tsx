"use client";

import { useMemo, useState } from "react";

import type { Notice } from "@/lib/notices";
import NoticeCard from "./notice-card";

interface NoticeListProps {
  notices: Notice[];
  loading: boolean;
  onEdit: (notice: Notice) => void;
  onDelete: (id: string) => void;
}

export default function NoticeList({
  notices = [],
  loading,
  onEdit,
  onDelete,
}: NoticeListProps) {
  const [activeTab, setActiveTab] = useState<
    "important" | "all"
  >("all");

  const importantCount = notices.filter(
    (n) => n.important
  ).length;

  const visibleNotices = useMemo(() => {
    if (activeTab === "important") {
      return notices.filter((n) => n.important);
    }

    return notices;
  }, [activeTab, notices]);

  /* LOADING */

  if (loading) {
    return (
      <div className="space-y-8">

        <div
          className="
          rounded-3xl
          border
          p-8
        "
          style={{
            background: "rgba(17,24,39,0.75)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >

          <div className="flex gap-4">

            <div className="h-14 w-48 rounded-2xl bg-slate-700 animate-pulse" />

            <div className="h-14 w-40 rounded-2xl bg-slate-700 animate-pulse" />

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {Array.from({ length: 4 }).map((_, i) => (

            <div
              key={i}
              className="h-80 rounded-3xl animate-pulse"
              style={{
                background: "rgba(17,24,39,0.8)",
              }}
            />

          ))}

        </div>

      </div>
    );
  }

  /* EMPTY */

  if (notices.length === 0) {
    return (

      <div
        className="
        rounded-3xl
        p-20
        text-center
        border
      "
        style={{
          background: "rgba(17,24,39,0.8)",

          borderColor: "rgba(255,255,255,0.08)",
        }}
      >

        <div className="text-7xl mb-8">
          📭
        </div>

        <h2
          className="text-4xl font-extrabold"
          style={{
            color: "#F8FAFC",
          }}
        >
          No Notices Yet
        </h2>

        <p
          className="mt-4 text-lg"
          style={{
            color: "#94A3B8",
          }}
        >
          Create your first notice.
        </p>

      </div>

    );
  }

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div
        className="
        rounded-3xl
        p-8
        border
      "
        style={{
          background: "rgba(17,24,39,0.75)",

          backdropFilter: "blur(18px)",

          borderColor: "rgba(255,255,255,0.08)",
        }}
      >

        <div className="flex flex-col items-center justify-center text-center gap-4">

          <div className="w-full text-center">

  <h2
    className="text-4xl font-extrabold"
    style={{
      color: "#F8FAFC",
      fontFamily: "'Plus Jakarta Sans',sans-serif",
    }}
  >
    All Notices
  </h2>

  <p
    className="mt-2 text-base"
    style={{
      color: "#94A3B8",
    }}
  >
    Create, manage and organize announcements
  </p>

</div>
          <div
            className="
            px-6
            py-3
            rounded-full
            font-bold
            w-fit
          "
            style={{
              color: "#A78BFA",

              border:
                "1px solid rgba(124,58,237,0.4)",

              background:
                "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.15))",
            }}
          >
            
          </div>

        </div>

        {/* TABS */}

        <div
  className="
  flex
  justify-center
  items-center
  gap-8
  mt-4
  flex-wrap
  "
>

          <button
            onClick={() =>
              setActiveTab("important")
            }
            className="
            px-6
            py-3
            rounded-2xl
            font-semibold
            transition
          "
            style={{
              background:
                activeTab === "important"
                  ? "linear-gradient(135deg,#7C3AED,#06B6D4)"
                  : "rgba(255,255,255,0.05)",

              color: "#FFFFFF",

              border:
                activeTab === "important"
                  ? "none"
                  : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            📌 Important Notices ({importantCount})
          </button>

          <button
            onClick={() =>
              setActiveTab("all")
            }
            className="
            px-6
            py-3
            rounded-2xl
            font-semibold
            transition
          "
            style={{
              background:
                activeTab === "all"
                  ? "linear-gradient(135deg,#7C3AED,#06B6D4)"
                  : "rgba(255,255,255,0.05)",

              color: "#FFFFFF",

              border:
                activeTab === "all"
                  ? "none"
                  : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            📄 All Notices ({notices.length})
          </button>

        </div>

      </div>

      {/* GRID */}

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      "
      >

        {visibleNotices.map((notice) => (

          <NoticeCard
            key={notice.id}
            notice={notice}
            onEdit={onEdit}
            onDelete={onDelete}
          />

        ))}

      </div>

    </div>

  );
}