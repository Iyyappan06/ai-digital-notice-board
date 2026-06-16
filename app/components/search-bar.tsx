"use client";

import { CATEGORIES } from "@/lib/notices";

interface SearchBarProps {
  query:            string;
  selectedCategory: string;
  onQueryChange:    (q: string) => void;
  onCategoryChange: (c: string) => void;
}

export default function SearchBar({
  query,
  selectedCategory,
  onQueryChange,
  onCategoryChange,
}: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Text search */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search notices…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white
                     text-slate-800 placeholder-slate-400 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     transition-shadow shadow-sm"
        />
        {query && (
          <button
            onClick={() => onQueryChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category filter */}
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="sm:w-44 px-4 py-2.5 rounded-xl border border-slate-200 bg-white
                   text-slate-700 text-sm shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                   transition-shadow"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}