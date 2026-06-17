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
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingNotice, setEditingNotice] =
    useState<Notice | null>(null);

  async function loadNotices() {
    try {
      setLoading(true);

      const data = await fetchNotices();

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

  function handleEdit(notice: Notice) {
    setEditingNotice(notice);
  }

  async function handleDelete(id: string) {
    try {
      await deleteNotice(id);

      await loadNotices();
    } catch (error) {
      console.error(error);

      alert("Failed to delete notice.");
    }
  }

  function handleSuccess() {
    setEditingNotice(null);

    loadNotices();
  }

  function handleCancel() {
    setEditingNotice(null);
  }

  const importantCount = notices.filter(
    (n) => n.important
  ).length;

  return (
    <main className="min-h-screen">

      {/* HEADER */}

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40">
        <div className="container-app">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div
                className="
                h-16
                w-16
                rounded-3xl
                bg-gradient-to-br
                from-indigo-600
                via-purple-600
                to-cyan-500
                text-white
                flex
                items-center
                justify-center
                text-3xl
                shadow-premium
              "
              >
                🚀
              </div>

              <div>
                <p className="uppercase tracking-[4px] text-xs font-bold text-indigo-600">
                  AI NOTICE PLATFORM
                </p>

                <h1 className="text-3xl font-black text-slate-900">
                  Digital Notice Board
                </h1>
              </div>

            </div>

          </div>

        </div>
      </header>

      <div className="container-app">

        {/* HERO SECTION */}

        <section
          className="
          hero-gradient
          rounded-[40px]
          p-10
          md:p-14
          text-white
          shadow-premium
          overflow-hidden
          relative
          mb-10
        "
        >

          <div className="absolute top-0 right-0 opacity-10 text-[250px]">
            🤖
          </div>

          <div className="max-w-3xl">

            <p className="uppercase tracking-[5px] text-sm font-semibold text-white/80 mb-4">
              Smart Management System
            </p>

            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Manage Notices
              <br />
              With AI Assistance
            </h1>

            <p className="mt-6 text-lg text-indigo-100 leading-8">
              Create, organize, manage and search institutional
              announcements with a beautiful AI-powered platform.
            </p>

          </div>

        </section>

        {/* STATS */}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="glass rounded-[30px] p-6 shadow-soft">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Total Notices
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {notices.length}
                </h2>

              </div>

              <div className="text-4xl">
                📄
              </div>

            </div>

          </div>

          <div className="glass rounded-[30px] p-6 shadow-soft">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Important Notices
                </p>

                <h2 className="text-4xl font-black text-indigo-600 mt-2">
                  {importantCount}
                </h2>

              </div>

              <div className="text-4xl">
                📌
              </div>

            </div>

          </div>

          <div className="glass rounded-[30px] p-6 shadow-soft">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  AI Search
                </p>

                <h2 className="text-4xl font-black gradient-text mt-2">
                  Active
                </h2>

              </div>

              <div className="text-4xl">
                🤖
              </div>

            </div>

          </div>

        </section>

        {/* MAIN CONTENT */}

        <section className="grid grid-cols-12 gap-8">

          {/* LEFT PANEL */}

          <div className="col-span-12 lg:col-span-4">

            <div className="sticky top-28">

              <NoticeForm
                editNotice={editingNotice}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div className="col-span-12 lg:col-span-8 space-y-8">

            <div className="glass rounded-[32px] p-8 shadow-soft">

              <p className="uppercase text-xs tracking-[3px] text-indigo-500 font-bold mb-2">
                NOTICE MANAGEMENT
              </p>

              <h2 className="text-4xl font-black text-slate-900">
                All Notices
              </h2>

              <p className="text-slate-500 mt-3 text-lg">
                Create, organize and manage all announcements.
              </p>

            </div>

            <NoticeList
              notices={notices}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          </div>

        </section>

      </div>

      <AiSearchAssistant />

    </main>
  );
}