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

  /* LOADING STATE */

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {Array.from({ length: 6 }).map((_, i) => (

          <div
            key={i}
            className="
            glass
            rounded-[32px]
            p-8
            animate-pulse
            shadow-soft
          "
          >

            <div className="h-5 w-24 rounded-full bg-slate-200 mb-6" />

            <div className="h-8 w-3/4 rounded-xl bg-slate-200 mb-5" />

            <div className="space-y-3">

              <div className="h-4 rounded-xl bg-slate-100" />

              <div className="h-4 rounded-xl bg-slate-100" />

              <div className="h-4 w-4/5 rounded-xl bg-slate-100" />

            </div>

            <div className="mt-8 flex justify-between">

              <div className="space-y-2">
                <div className="h-3 w-16 rounded bg-slate-100" />
                <div className="h-4 w-24 rounded bg-slate-200" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-16 rounded bg-slate-100" />
                <div className="h-4 w-24 rounded bg-slate-200" />
              </div>

            </div>

          </div>

        ))}

      </div>
    );
  }

  /* EMPTY STATE */

  if (notices.length === 0) {
    return (
      <div
        className="
        glass
        rounded-[40px]
        p-20
        text-center
        shadow-soft
      "
      >

        <div className="text-8xl mb-8 animate-float">
          📭
        </div>

        <h2 className="text-4xl font-black text-slate-900">
          No Notices Yet
        </h2>

        <p className="text-slate-500 mt-4 text-lg max-w-md mx-auto">
          Start by creating your first notice.
          It will appear here instantly.
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
    <div className="space-y-14">

      {/* IMPORTANT NOTICES */}

      {pinned.length > 0 && (

        <section>

          <div
            className="
            flex
            items-center
            justify-between
            mb-8
          "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                h-14
                w-14
                rounded-2xl
                bg-gradient-to-br
                from-indigo-600
                via-purple-600
                to-cyan-500
                text-white
                flex
                items-center
                justify-center
                text-2xl
                shadow-lg
              "
              >
                📌
              </div>

              <div>

                <p className="uppercase tracking-[3px] text-xs font-bold text-indigo-500">
                  Priority
                </p>

                <h2 className="text-3xl font-black text-slate-900">
                  Important Notices
                </h2>

              </div>

            </div>

            <span
              className="
              px-4
              py-2
              rounded-full
              bg-indigo-100
              text-indigo-700
              text-sm
              font-semibold
            "
            >
              {pinned.length} Notice
              {pinned.length > 1 ? "s" : ""}
            </span>

          </div>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
          >

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

      {/* REGULAR NOTICES */}

      {regular.length > 0 && (

        <section>

          <div
            className="
            flex
            items-center
            justify-between
            mb-8
          "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                h-14
                w-14
                rounded-2xl
                bg-white
                border
                border-slate-200
                flex
                items-center
                justify-center
                text-2xl
                shadow-soft
              "
              >
                📄
              </div>

              <div>

                <p className="uppercase tracking-[3px] text-xs font-bold text-slate-500">
                  Recent
                </p>

                <h2 className="text-3xl font-black text-slate-900">
                  All Notices
                </h2>

              </div>

            </div>

            <span
              className="
              px-4
              py-2
              rounded-full
              bg-slate-100
              text-slate-700
              text-sm
              font-semibold
            "
            >
              {regular.length} Notice
              {regular.length > 1 ? "s" : ""}
            </span>

          </div>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
          >

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