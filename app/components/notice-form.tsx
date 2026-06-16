"use client";

import { useState, useEffect } from "react";
import type { Notice } from "@/lib/notices";
import { CATEGORIES } from "@/lib/notices";

interface NoticeFormProps {
  editNotice?: Notice | null;
  onSuccess:   () => void;
  onCancel:    () => void;
}

interface FormState {
  title:       string;
  description: string;
  category:    string;
  important:   boolean;
  expiry_date: string;
}

const EMPTY_FORM: FormState = {
  title:       "",
  description: "",
  category:    "General",
  important:   false,
  expiry_date: "",
};

export default function NoticeForm({ editNotice, onSuccess, onCancel }: NoticeFormProps) {
  const [form, setForm]       = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  // Pre-fill form when editing
  useEffect(() => {
    if (editNotice) {
      setForm({
        title:       editNotice.title,
        description: editNotice.description,
        category:    editNotice.category,
        important:   editNotice.important,
        expiry_date: editNotice.expiry_date ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError(null);
  }, [editNotice]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const value =
      target.type === "checkbox" ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      return;
    }

    setLoading(true);

    try {
      const url    = editNotice ? `/api/notices/${editNotice.id}` : "/api/notices";
      const method = editNotice ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          expiry_date: form.expiry_date || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setForm(EMPTY_FORM);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-slate-800 font-display">
          {editNotice ? "Edit Notice" : "Create Notice"}
        </h2>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter notice title"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50
                       text-slate-800 placeholder-slate-400 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       transition-shadow"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter full notice description"
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50
                       text-slate-800 placeholder-slate-400 text-sm resize-none
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       transition-shadow"
            required
          />
        </div>

        {/* Category + Expiry */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50
                         text-slate-800 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                         transition-shadow"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiry_date"
              value={form.expiry_date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50
                         text-slate-800 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                         transition-shadow"
            />
          </div>
        </div>

        {/* Important toggle */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input
              type="checkbox"
              name="important"
              checked={form.important}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-slate-200 peer-checked:bg-indigo-500 rounded-full
                            transition-colors after:content-[''] after:absolute after:top-1 after:left-1
                            after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-transform
                            peer-checked:after:translate-x-4" />
          </div>
          <span className="text-sm font-medium text-slate-700">
            📌 Mark as Important
          </span>
        </label>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700
                       disabled:bg-indigo-300 text-white font-medium text-sm
                       transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading
              ? editNotice ? "Saving…" : "Publishing…"
              : editNotice ? "Save Changes" : "Publish Notice"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200
                       text-slate-700 font-medium text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}