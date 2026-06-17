"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "📅 When is the semester exam?",
  "💼 Any placement drives this week?",
  "📚 Library holiday announcements?",
  "🚀 Any hackathon events?",
];

export default function AiSearchAssistant() {
  const [open, setOpen] =
    useState(false);

  const [input, setInput] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [loading, setLoading] =
    useState(false);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, loading, open]);

  async function sendMessage(
    question: string
  ) {
    const q = question.trim();

    if (!q || loading) return;

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: q,
      },
    ]);

    setLoading(true);

    try {
      const res = await fetch(
        "/api/ai/search",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            question: q,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ??
            "AI Search failed."
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent
  ) {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* Floating AI Button */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
        fixed
        bottom-8
        right-8
        z-50

        h-20
        w-20

        rounded-full

        bg-gradient-to-br
        from-indigo-600
        via-purple-600
        to-cyan-500

        text-white
        text-3xl

        shadow-[0_20px_60px_rgba(99,102,241,.45)]

        hover:scale-110
        transition-all
        duration-300

        animate-glow
      "
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* Window */}

      {open && (
        <div
          className="
          fixed
          bottom-32
          right-8
          z-50

          w-[460px]
          max-w-[95vw]

          h-[720px]

          rounded-[36px]

          bg-white/85
          backdrop-blur-2xl

          border
          border-white/60

          shadow-[0_30px_80px_rgba(0,0,0,.15)]

          overflow-hidden

          flex
          flex-col
        "
        >

          {/* Header */}

          <div
            className="
            bg-gradient-to-r
            from-indigo-600
            via-purple-600
            to-cyan-500

            p-6

            text-white
          "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs tracking-[3px] uppercase font-semibold text-indigo-100">
                  AI Assistant
                </p>

                <h2 className="text-2xl font-black">
                  Notice Copilot
                </h2>

                <p className="text-sm text-indigo-100 mt-1">
                  Ask anything about notices
                </p>

              </div>

              <div
                className="
                h-14
                w-14

                rounded-2xl

                bg-white/20

                flex
                items-center
                justify-center

                text-3xl
              "
              >
                🧠
              </div>

            </div>

          </div>

          {/* Messages */}

          <div
            className="
            flex-1
            overflow-y-auto
            p-5
            space-y-4
          "
          >

            {messages.length === 0 && (
              <>
                <div className="text-center py-6">

                  <div className="text-7xl mb-5">
                    🤖
                  </div>

                  <h2 className="text-3xl font-black text-slate-900">
                    AI Notice Assistant
                  </h2>

                  <p className="text-slate-500 mt-3">
                    Instantly search announcements,
                    events and academic notices.
                  </p>

                </div>

                <div className="space-y-3">

                  {SUGGESTED_QUESTIONS.map(
                    (q) => (
                      <button
                        key={q}
                        onClick={() =>
                          sendMessage(q)
                        }
                        className="
                        w-full
                        text-left

                        p-4

                        rounded-2xl

                        bg-white

                        border
                        border-slate-200

                        hover:border-indigo-300
                        hover:bg-indigo-50

                        transition-all
                      "
                      >
                        {q}
                      </button>
                    )
                  )}

                </div>
              </>
            )}

            {messages.map(
              (msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role ===
                    "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`
                    max-w-[80%]

                    px-5
                    py-4

                    rounded-3xl

                    text-sm
                    leading-7

                    ${
                      msg.role ===
                      "user"
                        ? `
                        bg-gradient-to-r
                        from-indigo-600
                        to-purple-600

                        text-white

                        rounded-br-md
                      `
                        : `
                        bg-white

                        border
                        border-slate-200

                        text-slate-700

                        rounded-bl-md
                      `
                    }
                  `}
                  >
                    {msg.content}
                  </div>

                </div>
              )
            )}

            {loading && (
              <div className="flex">

                <div
                  className="
                  bg-white

                  border
                  border-slate-200

                  rounded-3xl

                  px-5
                  py-4
                "
                >

                  <div className="flex gap-2">

                    <div className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce delay-100" />
                    <div className="h-2 w-2 rounded-full bg-cyan-500 animate-bounce delay-200" />

                  </div>

                </div>

              </div>
            )}

            <div ref={bottomRef} />

          </div>

          {/* Footer */}

          <div
            className="
            p-5
            border-t
            border-slate-200
            bg-white/70
          "
          >

            <div className="flex gap-3">

              <input
                type="text"
                value={input}
                disabled={loading}
                onChange={(e) =>
                  setInput(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
                placeholder="Ask AI about notices..."
                className="
                flex-1

                h-14

                px-5

                rounded-2xl

                border
                border-slate-300

                bg-white

                focus:ring-4
                focus:ring-indigo-200
              "
              />

              <button
                disabled={
                  loading ||
                  !input.trim()
                }
                onClick={() =>
                  sendMessage(input)
                }
                className="
                h-14
                w-14

                rounded-2xl

                bg-gradient-to-r
                from-indigo-600
                to-purple-600

                text-white

                text-xl

                hover:scale-105
              "
              >
                ➤
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}