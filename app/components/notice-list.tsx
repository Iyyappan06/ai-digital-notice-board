"use client";

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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">

        {Array.from({ length: 6 }).map((_, i) => (

          <div
            key={i}
            className="bg-white rounded-3xl p-8 shadow-sm animate-pulse h-80"
          >

            <div className="h-5 w-28 bg-slate-200 rounded-full mb-6" />

            <div className="h-8 w-3/4 bg-slate-200 rounded-xl mb-5" />

            <div className="space-y-4">

              <div className="h-4 bg-slate-100 rounded-xl" />

              <div className="h-4 bg-slate-100 rounded-xl" />

              <div className="h-4 w-4/5 bg-slate-100 rounded-xl" />

            </div>

          </div>

        ))}

      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-20 text-center">

        <div className="text-7xl mb-6">

          📋

        </div>

        <h2 className="text-3xl font-bold text-slate-900">

          No Notices Found

        </h2>

        <p className="text-slate-500 mt-3 text-lg">

          Create your first notice.

        </p>

      </div>
    );
  }

  const pinned =
    notices.filter(
      (n) => n.important
    );

  const regular =
    notices.filter(
      (n) => !n.important
    );

  return (
    <div className="space-y-12">

      {pinned.length > 0 && (

        <section>

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">

              📌

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-900">

                Important Notices

              </h2>

              <p className="text-slate-500">

                High priority announcements

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {pinned.map((notice) => (

              <NoticeCard
                key={notice.id}

                notice={notice}

                onEdit={onEdit}

                onDelete={onDelete}
              />

            ))}

          </div>

        </section>

      )}

      {regular.length > 0 && (

        <section>

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">

              📄

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-900">

                All Notices

              </h2>

              <p className="text-slate-500">

                Recent announcements

              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {regular.map((notice) => (

              <NoticeCard
                key={notice.id}

                notice={notice}

                onEdit={onEdit}

                onDelete={onDelete}
              />

            ))}

          </div>

        </section>

      )}

    </div>
  );
}