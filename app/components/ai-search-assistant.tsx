"use client";

import { useEffect, useRef, useState } from "react";

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
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

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
      {/* FLOATING BUTTON */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
        fixed

        bottom-6
        right-6

        z-50

        h-16
        w-16

        rounded-full

        bg-gradient-to-br

        from-violet-600
        via-purple-600
        to-cyan-500

        text-2xl

        text-white

        shadow-[0_15px_45px_rgba(124,58,237,.45)]

        hover:scale-105

        transition-all

        duration-300
      "
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* WINDOW */}

      {open && (

        <div
          className="
          fixed

          bottom-28
          right-6

          z-50

          w-[360px]

          max-w-[92vw]

          h-[580px]

          rounded-[10px]

          overflow-hidden

          flex

          flex-col

          border

          border-white/10

          shadow-[0_25px_70px_rgba(0,0,0,.6)]
        "
          style={{
            background:
              "rgba(17,24,39,.96)",

            backdropFilter:
              "blur(20px)",
          }}
        >

          {/* HEADER */}

          <div
            className="
            px-6

            py-5

            border-b

            border-white/10
          "
          >

            <div className="flex items-center justify-between">

              <div>

                <p
                  className="
                  text-xs

                  tracking-[3px]

                  font-bold

                  uppercase
                "
                  style={{
                    color:
                      "#A78BFA",
                  }}
                >
                  AI ASSISTANT
                </p>

                <h2
                  className="
                  text-2xl

                  font-black

                  text-slate-100
                "
                >
                  Notice Copilot
                </h2>

                <p
                  className="
                  text-sm

                  text-slate-400

                  mt-1
                "
                >
                  Search notices instantly
                </p>

              </div>

              <div
                className="
                h-12

                w-12

                rounded-2xl

                flex

                items-center

                justify-center

                text-2xl
              "
                style={{
                  background:
                    "linear-gradient(135deg,#7C3AED,#06B6D4)",
                }}
              >
                🤖
              </div>

            </div>

          </div>

          {/* BODY */}

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

                <div className="text-center py-4">

                  <div className="text-5xl mb-3">
                    🤖
                  </div>

                  <h3
                    className="
                    text-2xl

                    font-bold

                    text-slate-100
                  "
                  >
                    AI Notice Assistant
                  </h3>

                  <p
                    className="
                    text-sm

                    text-slate-400

                    mt-2
                  "
                  >
                    Instantly search announcements,
                    exams and events.
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

                        p-3

                        rounded-2xl

                        text-left

                        text-sm

                        text-slate-300

                        border

                        border-white/10

                        bg-slate-900/70

                        hover:bg-slate-800

                        hover:border-violet-500

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
                    msg.role === "user"

                      ? "justify-end"

                      : "justify-start"
                  }`}
                >

                  <div
                    className={`
                    max-w-[85%]

                    px-4

                    py-3

                    text-sm

                    leading-7

                    rounded-lg

                    ${
                      msg.role === "user"

                        ? `
                        text-white

                        rounded-lg
                      `

                        : `
                        bg-slate-900

                        border

                        border-white/10

                        text-slate-300

                        rounded-bl-md
                      `
                    }
                  `}
                    style={
                      msg.role === "user"

                        ? {
                            background:
                              "linear-gradient(135deg,#7C3AED,#06B6D4)",
                          }

                        : {}
                    }
                  >

                    {msg.content}

                  </div>

                </div>

              )
            )}

            {loading && (

              <div
                className="
                flex

                gap-2

                px-4
              "
              >

                <div className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" />

                <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce delay-100" />

                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce delay-200" />

              </div>

            )}

            <div ref={bottomRef} />

          </div>

          {/* FOOTER */}

          <div
            className="
            p-4

            border-t

            border-white/10
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

                h-12

                px-4

                rounded-2xl

                border

                border-white/10

                bg-slate-900

                text-slate-100

                placeholder:text-slate-500

                focus:ring-2

                focus:ring-violet-500
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
                h-12

                w-12

                rounded-2xl

                text-white

                font-bold

                hover:scale-105

                transition-all
              "
                style={{
                  background:
                    "linear-gradient(135deg,#7C3AED,#06B6D4)",
                }}
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