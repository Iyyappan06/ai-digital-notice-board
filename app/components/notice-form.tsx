"use client";

import { useState, useEffect } from "react";
import type { Notice } from "@/lib/notices";
import { CATEGORIES } from "@/lib/notices";

interface NoticeFormProps {
  editNotice?: Notice | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormState {
  title: string;
  description: string;
  category: string;
  important: boolean;
  expiry_date: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  category: "General",
  important: false,
  expiry_date: "",
};

export default function NoticeForm({
  editNotice,
  onSuccess,
  onCancel,
}: NoticeFormProps) {
  const [form, setForm] =
    useState<FormState>(EMPTY_FORM);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    if (editNotice) {
      setForm({
        title: editNotice.title,
        description:
          editNotice.description,
        category: editNotice.category,
        important:
          editNotice.important,
        expiry_date:
          editNotice.expiry_date ?? "",
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setError(null);
  }, [editNotice]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target =
      e.target as HTMLInputElement;

    const value =
      target.type === "checkbox"
        ? target.checked
        : target.value;

    setForm((prev) => ({
      ...prev,
      [target.name]: value,
    }));
  };

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError(null);

    if (
      !form.title.trim() ||
      !form.description.trim()
    ) {
      setError(
        "Title and description are required."
      );
      return;
    }

    setLoading(true);

    try {
      const url = editNotice
        ? `/api/notices/${editNotice.id}`
        : "/api/notices";

      const method = editNotice
        ? "PATCH"
        : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ...form,
          expiry_date:
            form.expiry_date || null,
        }),
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(
          data.error ??
            "Something went wrong."
        );

      setForm(EMPTY_FORM);

      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
      glass
      rounded-[32px]
      p-8
      shadow-premium
      border
      border-white/60
    "
    >
      {/* HEADER */}

      <div className="mb-8">

        <div className="flex justify-between items-start">

          <div>

            <p className="uppercase tracking-[4px] text-xs font-bold text-indigo-500 mb-2">
              NOTICE PANEL
            </p>

            <h2
              className="
              text-4xl
              font-black
              bg-gradient-to-r
              from-indigo-600
              via-purple-600
              to-cyan-500
              bg-clip-text
              text-transparent
            "
            >
              {editNotice
                ? "Edit Notice"
                : "Create Notice"}
            </h2>

          </div>

          {editNotice && (
            <button
              onClick={onCancel}
              className="
              px-4
              py-2
              rounded-xl
              bg-slate-100
              hover:bg-slate-200
              font-medium
            "
            >
              Cancel
            </button>
          )}

        </div>

      </div>

      {/* ERROR */}

      {error && (
        <div
          className="
          mb-6
          rounded-2xl
          border
          border-red-200
          bg-red-50
          p-4
          text-red-600
        "
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* TITLE */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Notice Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter notice title..."
            className="
            glass-input
            w-full
            h-14
            px-5
            rounded-2xl
            border
            border-slate-200
          "
          />

        </div>

        {/* DESCRIPTION */}

        <div>

          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            placeholder="Write your notice details..."
            className="
            glass-input
            w-full
            p-5
            rounded-2xl
            border
            border-slate-200
            resize-none
          "
          />

        </div>

        {/* CATEGORY + DATE */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="
              glass-input
              w-full
              h-14
              px-4
              rounded-2xl
              border
              border-slate-200
            "
            >
              {CATEGORIES.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>

          </div>

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Expiry Date
            </label>

            <input
              type="date"
              name="expiry_date"
              value={form.expiry_date}
              onChange={handleChange}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              className="
              glass-input
              w-full
              h-14
              px-4
              rounded-2xl
              border
              border-slate-200
            "
            />

          </div>

        </div>

        {/* IMPORTANT TOGGLE */}

        <div
          className="
          flex
          items-center
          justify-between
          rounded-2xl
          bg-gradient-to-r
          from-indigo-50
          to-purple-50
          border
          border-indigo-100
          p-5
        "
        >

          <div>

            <p className="font-semibold text-slate-800">
              📌 Important Notice
            </p>

            <p className="text-sm text-slate-500">
              Highlight this notice at the top
            </p>

          </div>

          <input
            type="checkbox"
            name="important"
            checked={form.important}
            onChange={handleChange}
            className="h-6 w-6 accent-indigo-600"
          />

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          h-14
          rounded-2xl
          bg-gradient-to-r
          from-indigo-600
          via-purple-600
          to-cyan-500
          text-white
          text-lg
          font-bold
          shadow-lg
          hover:scale-[1.02]
          transition-all
          duration-300
        "
        >
          {loading
            ? "Saving..."
            : editNotice
            ? "Save Changes"
            : "Publish Notice"}
        </button>

      </form>
    </div>
  );
}