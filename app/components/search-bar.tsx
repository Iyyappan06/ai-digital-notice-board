"use client";

import { CATEGORIES } from "@/lib/notices";

interface SearchBarProps {
  query: string;
  selectedCategory: string;
  onQueryChange: (q: string) => void;
  onCategoryChange: (c: string) => void;
}

export default function SearchBar({
  query,
  selectedCategory,
  onQueryChange,
  onCategoryChange,
}: SearchBarProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">

      {/* SEARCH INPUT */}

      <div className="relative flex-1">

        <div
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
        >
          🔍
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) =>
            onQueryChange(e.target.value)
          }
          placeholder="Search notices with AI..."
          className="
          glass-input
          w-full
          h-14
          pl-12
          pr-12
          rounded-2xl
          border
          border-white/50
          shadow-soft
          text-slate-800
          placeholder:text-slate-400
          focus:ring-4
          focus:ring-indigo-200
          transition-all
        "
        />

        {query && (
          <button
            onClick={() =>
              onQueryChange("")
            }
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            h-8
            w-8
            rounded-full
            bg-slate-100
            hover:bg-red-100
            hover:text-red-600
            flex
            items-center
            justify-center
            transition
          "
          >
            ✕
          </button>
        )}

      </div>

      {/* CATEGORY FILTER */}

      <div className="relative">

        <select
          value={selectedCategory}
          onChange={(e) =>
            onCategoryChange(
              e.target.value
            )
          }
          className="
          glass-input
          h-14
          min-w-[220px]
          px-5
          rounded-2xl
          border
          border-white/50
          shadow-soft
          text-slate-700
          appearance-none
          cursor-pointer
          focus:ring-4
          focus:ring-indigo-200
        "
        >
          <option value="">
            All Categories
          </option>

          {CATEGORIES.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

        <div
          className="
          pointer-events-none
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
        >
          ▼
        </div>

      </div>

    </div>
  );
}