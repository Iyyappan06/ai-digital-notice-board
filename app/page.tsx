import NoticeForm from "./components/notice-form";

import NoticeList from "./components/notice-list";

import AiSearchAssistant from "./components/ai-search-assistant";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">

      {/* Background Glow */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -top-32 left-10 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />

      </div>

      <div className="relative mx-auto max-w-5xl px-5 py-10 space-y-8">

        {/* Header */}

        <header className="rounded-2xl border border-white/40 bg-white/60 p-6 backdrop-blur-xl shadow-sm">

          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">

            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />

            Smart Notice System

          </span>

          <h1 className="text-4xl font-bold text-gray-900">

            📖 AI Powered Digital Notice Board

          </h1>

          <p className="mt-2 text-gray-600">

            Create, manage and search notices using Gemini AI.

          </p>

        </header>

        {/* AI Search */}

        <AiSearchAssistant />

        {/* Create Notice */}

        <NoticeForm />

        {/* Notice List */}

        <NoticeList />

      </div>

    </main>
  );
}