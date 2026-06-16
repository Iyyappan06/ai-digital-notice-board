"use client";

import type { Notice } from "@/lib/notices";
import NoticeCard from "./notice-card";

interface NoticeListProps {
  notices:  Notice[];
  loading:  boolean;
  onEdit:   (notice: Notice) => void;
  onDelete: (id: string) => void;
}

export default function NoticeList({ notices, loading, onEdit, onDelete }: NoticeListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse h-52"
          >
            <div className="h-3 bg-slate-200 rounded-full w-20 mb-4" />
            <div className="h-4 bg-slate-200 rounded-full w-3/4 mb-3" />
            <div className="space-y-2">
              <div className="h-3 bg-slate-100 rounded-full" />
              <div className="h-3 bg-slate-100 rounded-full w-5/6" />
              <div className="h-3 bg-slate-100 rounded-full w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">📋</div>
        <p className="text-slate-500 font-medium">No notices found</p>
        <p className="text-slate-400 text-sm mt-1">
          Try adjusting your search or create a new notice.
        </p>
      </div>
    );
  }

  // Separate pinned and regular notices
  const pinned  = notices.filter((n) => n.important);
  const regular = notices.filter((n) => !n.important);

  return (
    <div className="space-y-6">
      {pinned.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <span>📌</span> Important
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {pinned.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {regular.length > 0 && (
        <div>
          {pinned.length > 0 && (
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              All Notices
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {regular.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}