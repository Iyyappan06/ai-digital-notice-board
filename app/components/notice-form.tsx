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
      | React.ChangeEvent<
          HTMLTextAreaElement
        >
      | React.ChangeEvent<
          HTMLSelectElement
        >
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
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <p className="text-indigo-600 font-semibold text-sm">

            NOTICE PANEL

          </p>

          <h2 className="text-3xl font-bold text-slate-900">

            {editNotice
              ? "Edit Notice"

              : "Create Notice"}

          </h2>

        </div>

        {editNotice && (
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200"
          >
            Cancel
          </button>
        )}

      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 text-red-600 border border-red-200">

          {error}

        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>

          <label className="block mb-2 font-medium">

            Title

          </label>

          <input
            name="title"

            value={form.title}

            onChange={handleChange}

            placeholder="Enter title"

            className="w-full h-14 px-5 rounded-2xl border border-slate-300 focus:ring-4 focus:ring-indigo-200"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">

            Description

          </label>

          <textarea
            name="description"

            value={form.description}

            onChange={handleChange}

            rows={5}

            placeholder="Enter description"

            className="w-full p-5 rounded-2xl border border-slate-300 resize-none focus:ring-4 focus:ring-indigo-200"
          />

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label className="block mb-2 font-medium">

              Category

            </label>

            <select
              name="category"

              value={form.category}

              onChange={handleChange}

              className="w-full h-14 px-4 rounded-2xl border border-slate-300 focus:ring-4 focus:ring-indigo-200"
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

            <label className="block mb-2 font-medium">

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

              className="w-full h-14 px-4 rounded-2xl border border-slate-300 focus:ring-4 focus:ring-indigo-200"
            />

          </div>

        </div>

        <label className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">

          <span className="font-medium">

            📌 Mark as Important

          </span>

          <input
            type="checkbox"

            name="important"

            checked={form.important}

            onChange={handleChange}

            className="h-5 w-5"
          />

        </label>

        <button
          type="submit"

          disabled={loading}

          className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold transition"
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