"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role:    "user" | "ai";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "When is the semester exam?",
  "Any placement training this week?",
  "When will the library be closed?",
  "Any hackathon announcements?",
];

export default function AISearchAssistant() {
  const [open, setOpen]         = useState(false);
  const [input, setInput]       = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  const sendMessage = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/search", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ question: q }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "AI search failed.");

      setMessages((prev) => [...prev, { role: "ai", content: data.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role:    "ai",
          content: err instanceof Error
            ? `Error: ${err.message}`
            : "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
                   bg-gradient-to-br from-indigo-600 to-violet-600
                   text-white shadow-lg hover:shadow-xl
                   flex items-center justify-center
                   hover:scale-105 active:scale-95 transition-all duration-200
                   focus:outline-none focus:ring-4 focus:ring-indigo-300"
        title="Ask AI Assistant"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)]
                        bg-white rounded-2xl shadow-2xl border border-slate-200
                        flex flex-col overflow-hidden animate-slide-up"
             style={{ height: "480px" }}>

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">
              🤖
            </div>
            <div>
              <p className="text-white font-semibold text-sm">AI Notice Assistant</p>
              <p className="text-indigo-200 text-xs">Powered by Gemini AI</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center">
                <p className="text-slate-500 text-sm mb-3">
                  Ask me anything about the notices!
                </p>
                <div className="space-y-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="block w-full text-left text-xs px-3 py-2 rounded-xl
                                 bg-indigo-50 text-indigo-700 hover:bg-indigo-100
                                 border border-indigo-100 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-md"
                      : "bg-slate-100 text-slate-800 rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 bg-slate-400 rounded-full animate-pulse-dot"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-100 bg-slate-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about notices…"
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white
                           text-slate-800 placeholder-slate-400 text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                           disabled:opacity-50 transition-shadow"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-indigo-600 text-white
                           hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed
                           transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}