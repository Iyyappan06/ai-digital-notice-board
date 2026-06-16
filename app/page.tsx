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
    <main className="min-h-screen bg-slate-100">

      {/* TOP BAR */}

      <div className="sticky top-0 z-40 bg-white border-b border-slate-200">

        <div className="h-20 px-8 flex items-center justify-between">

          <div>

            <p className="text-sm text-indigo-600 font-semibold">

              SMART NOTICE SYSTEM

            </p>

            <h1 className="text-3xl font-bold text-slate-900">

              📖 AI Powered Digital Notice Board

            </h1>

          </div>

          <div className="hidden lg:flex items-center gap-4">

            <div className="bg-indigo-50 px-5 py-3 rounded-2xl">

              <p className="text-xs text-slate-500">

                Total Notices

              </p>

              <p className="text-2xl font-bold text-indigo-700">

                {notices.length}

              </p>

            </div>

            <div className="bg-purple-50 px-5 py-3 rounded-2xl">

              <p className="text-xs text-slate-500">

                Important

              </p>

              <p className="text-2xl font-bold text-purple-700">

                {importantCount}

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="px-8 py-8">

        <div className="grid grid-cols-12 gap-8">

          {/* LEFT */}

          <div className="col-span-12 lg:col-span-4">

            <div className="sticky top-28">

              <NoticeForm
                editNotice={editingNotice}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
              />

            </div>

          </div>

          {/* RIGHT */}

          <div className="col-span-12 lg:col-span-8 space-y-8">

            <div className="bg-white rounded-3xl shadow-sm p-6">

              <h2 className="text-2xl font-bold mb-2">

                📋 All Notices

              </h2>

              <p className="text-slate-500">

                Create, manage and organize all announcements.

              </p>

            </div>

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