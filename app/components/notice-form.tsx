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

        category:
          editNotice.category,

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

      if (!res.ok) {
        throw new Error(
          data.error ??
            "Something went wrong."
        );
      }

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
      w-full
      overflow-hidden
      rounded-[32px]
      p-8
      border
    "
      style={{
        background:
          "rgba(17,24,39,0.9)",

        backdropFilter:
          "blur(18px)",

        border:
          "1px solid rgba(255,255,255,0.08)",

        boxShadow:
          "0 16px 40px rgba(0,0,0,0.35)",
      }}
    >
      {/* HEADER */}

      <div className="mb-10">

        <div className="flex justify-between items-start">

          <div>

            <p
              className="
              text-xs
              font-bold
              tracking-[0.28em]
              mb-10
              p1-2
            "
              style={{
                color: "#A78BFA",
                paddingLeft: "16px",
              }}
            >
                NOTICE PANEL
            </p>

            <h2
              className="
              text-4xl
              font-extrabold
            "
              style={{
                color: "#F8FAFC",

                fontFamily:
                  "'Plus Jakarta Sans',sans-serif",
              }}
            >
              {editNotice
                ? "Edit Notice"
                : "Create Notice"}
            </h2>

          </div>

          {editNotice && (

            <button
              type="button"
              onClick={onCancel}
              className="
              px-4
              py-2
              rounded-xl
              transition
            "
              style={{
                background:
                  "rgba(255,255,255,0.06)",

                color:
                  "#CBD5E1",

                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
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
          p-4
        "
          style={{
            background:
              "rgba(244,63,94,0.15)",

            border:
              "1px solid rgba(244,63,94,0.25)",

            color:
              "#FB7185",
          }}
        >
          {error}
        </div>

      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-7"
      >

        {/* TITLE */}

        <div>

          <label
            className="
            block
            mb-3
            text-sm
            font-semibold
          "
            style={{
              color:
                "#CBD5E1",
            }}
          >
            Notice Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter notice title..."
            className="
            w-full
            h-14
            px-5
            rounded-2xl
            outline-none
          "
            style={{
              background:
                "rgba(255,255,255,0.05)",

              color:
                "#F8FAFC",

              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          />

        </div>

        {/* DESCRIPTION */}

        <div>

          <label
            className="
            block
            mb-3
            text-sm
            font-semibold
          "
            style={{
              color:
                "#CBD5E1",
            }}
          >
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            placeholder="Write your notice details..."
            className="
            w-full
            p-5
            rounded-2xl
            resize-none
            outline-none
          "
            style={{
              background:
                "rgba(255,255,255,0.05)",

              color:
                "#F8FAFC",

              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          />

        </div>

        {/* CATEGORY + DATE */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>

            <label
              className="
              block
              mb-3
              text-sm
              font-semibold
            "
              style={{
                color:
                  "#CBD5E1",
              }}
            >
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="
              w-full
              h-14
              px-4
              rounded-2xl
              outline-none
            "
              style={{
                background:
                  "rgba(255,255,255,0.05)",

                color:
                  "#F8FAFC",

                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
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

            <label
              className="
              block
              mb-3
              text-sm
              font-semibold
            "
              style={{
                color:
                  "#CBD5E1",
              }}
            >
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
              w-full
              h-14
              px-4
              rounded-2xl
              outline-none
            "
              style={{
                background:
                  "rgba(255,255,255,0.05)",

                color:
                  "#F8FAFC",

                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            />

          </div>

        </div>

        {/* IMPORTANT */}

        <div
          className="
          flex
          items-center
          justify-between
          rounded-2xl
          p-5
        "
          style={{
            background:
              "rgba(124,58,237,0.12)",

            border:
              "1px solid rgba(124,58,237,0.25)",
          }}
        >

          <div>

            <p
              className="
              font-semibold
            "
              style={{
                color:
                  "#F8FAFC",
              }}
            >
              📌 Important Notice
            </p>

            <p
              className="
              text-sm
              mt-1
            "
              style={{
                color:
                  "#94A3B8",
              }}
            >
              Highlight this notice
            </p>

          </div>

          <input
            type="checkbox"
            name="important"
            checked={form.important}
            onChange={handleChange}
            className="
            h-6
            w-6
            accent-violet-600
          "
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
          text-lg
          font-bold
          text-white
          transition
          duration-300
          hover:scale-[1.02]
        "
          style={{
            background:
              "linear-gradient(135deg,#7C3AED,#06B6D4)",
          }}
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