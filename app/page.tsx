"use client";

import { useEffect, useState } from "react";

import NoticeForm from "./components/notice-form";
import NoticeList from "./components/notice-list";
import AiSearchAssistant from "./components/ai-search-assistant";

import {
  Notice,
  fetchNotices,
  deleteNotice,
} from "@/lib/notices";

export default function Page() {
  const [notices, setNotices] =
    useState<Notice[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [editingNotice, setEditingNotice] =
    useState<Notice | null>(null);

  async function loadNotices() {
    try {
      setLoading(true);

      const data =
        await fetchNotices();

      setNotices(data ?? []);
    } catch (error) {
      console.error(error);

      setNotices([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotices();
  }, []);

  function handleEdit(
    notice: Notice
  ) {
    setEditingNotice(notice);
  }

  async function handleDelete(
    id: string
  ) {
    try {
      await deleteNotice(id);

      await loadNotices();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete notice."
      );
    }
  }

  function handleSuccess() {
    setEditingNotice(null);

    loadNotices();
  }

  function handleCancel() {
    setEditingNotice(null);
  }

  const importantCount =
    notices.filter(
      (n) => n.important
    ).length;

  return (
    <main
      className="
      min-h-screen
      overflow-x-hidden
    "
      style={{
        background:
          "linear-gradient(180deg,#050816 0%,#081122 50%,#0A1327 100%)",
      }}
    >

      {/* TOP NAVBAR */}

      <header
        className="
        sticky
        top-0
        z-50
        border-b
      "
        style={{
          background:
            "rgba(5,10,22,0.92)",

          backdropFilter:
            "blur(22px)",

          borderColor:
            "rgba(255,255,255,0.08)",
        }}
      >

        <div
          className="
          max-w-screen-2xl
          mx-auto
          h-20
          px-6
          lg:px-10
          flex
          items-center
          justify-between
        "
        >

          {/* LEFT */}

          <div
            className="
            flex
            items-center
            gap-4
          "
          >

            <div
              className="
              w-12
              h-12
              rounded-2xl
              flex
              items-center
              justify-center
              text-2xl
            "
              style={{
                background:
                  "linear-gradient(135deg,#7C3AED,#06B6D4)",

                boxShadow:
                  "0 8px 24px rgba(124,58,237,0.35)",
              }}
            >
              📖
            </div>

            <div>

              <p
                className="
                text-xs
                font-bold
                tracking-[0.28em]
              "
                style={{
                  color:
                    "#A78BFA",
                }}
              >
                SMART NOTICE SYSTEM
              </p>

              <h1
                className="
                text-2xl
                font-extrabold
              "
                style={{
                  color:
                    "#F8FAFC",

                  fontFamily:
                    "'Plus Jakarta Sans',sans-serif",
                }}
              >
                AI Digital Notice Board
              </h1>

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
            hidden
            lg:flex
            items-center
            gap-4
          "
          >

            {/* TOTAL */}

            <div
              className="
              rounded-2xl
              px-6
              py-3
              border
            "
              style={{
                background:
                  "rgba(17,24,39,0.65)",

                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >

              <p className="text-xs text-slate-400">
                Total
              </p>

              <p className="text-2xl font-bold text-violet-400">
                {notices.length}
              </p>

            </div>

            {/* IMPORTANT */}

            <div
              className="
              rounded-2xl
              px-6
              py-3
              border
            "
              style={{
                background:
                  "rgba(17,24,39,0.65)",

                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >

              <p className="text-xs text-slate-400">
                Important
              </p>

              <p className="text-2xl font-bold text-rose-400">
                {importantCount}
              </p>

            </div>

            {/* LIVE */}

            <div
              className="
              rounded-full
              px-5
              py-3
              flex
              items-center
              gap-3
              text-sm
              font-bold
            "
              style={{
                background:
                  "rgba(16,185,129,0.12)",

                border:
                  "1px solid rgba(16,185,129,0.28)",

                color:
                  "#34D399",
              }}
            >

              <div
                className="
                w-2
                h-2
                rounded-full
                bg-emerald-400
                animate-pulse
              "
              />

              Live

            </div>

          </div>

        </div>

      </header>

      {/* MAIN CONTENT */}

      <div
        className="
        max-w-screen-2xl
        mx-auto
        px-6
        lg:px-10
        py-10
      "
      >

        <div
          className="
          grid
          grid-cols-12
          gap-10
          items-start
        "
        >

          {/* LEFT PANEL */}

          <div
            className="
            col-span-12
            xl:col-span-4
          "
          >

            <div className="sticky top-28">

              <NoticeForm
                editNotice={editingNotice}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div
            className="
            col-span-12
            xl:col-span-8
            min-w-0
          "
          >

            <NoticeList
              notices={notices}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </div>

        </div>

      </div>

      <AiSearchAssistant />

    </main>
  );
}