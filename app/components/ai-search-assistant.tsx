"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "When is the semester exam?",
  "Any placement training this week?",
  "When will the library be closed?",
  "Any hackathon announcements?",
];

export default function AiSearchAssistant() {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

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
      {/* Floating Button */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
        fixed

        bottom-8

        right-8

        z-50

        h-16

        w-16

        rounded-full

        bg-gradient-to-r

        from-indigo-600

        to-violet-600

        text-white

        shadow-2xl

        hover:scale-110

        duration-300

        flex

        items-center

        justify-center

        text-2xl
      "
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* Chat Window */}

      {open && (

        <div
          className="
          fixed

          bottom-28

          right-8

          z-50

          w-[430px]

          max-w-[95vw]

          h-[700px]

          bg-white

          rounded-3xl

          shadow-2xl

          border

          border-slate-200

          flex

          flex-col

          overflow-hidden
        "
        >

          {/* Header */}

          <div
            className="
            h-20

            bg-gradient-to-r

            from-indigo-600

            to-violet-600

            px-6

            flex

            items-center

            justify-between
          "
          >

            <div>

              <p className="text-white text-xl font-bold">

                🤖 AI Assistant

              </p>

              <p className="text-indigo-100 text-sm">

                Ask anything about notices

              </p>

            </div>

            <div
              className="
              h-12

              w-12

              rounded-full

              bg-white/20

              flex

              items-center

              justify-center

              text-2xl
            "
            >
              🧠
            </div>

          </div>

          {/* Messages */}

          <div
            className="
            flex-1

            overflow-y-auto

            p-6

            space-y-4

            bg-slate-50
          "
          >

            {messages.length === 0 && (

              <>

                <div className="text-center">

                  <div className="text-6xl mb-5">

                    🤖

                  </div>

                  <h2 className="text-2xl font-bold">

                    AI Search Assistant

                  </h2>

                  <p className="text-slate-500 mt-2">

                    Ask anything about notices.

                  </p>

                </div>

                <div className="space-y-3 mt-8">

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

                        hover:bg-indigo-50

                        border

                        border-slate-200

                        transition
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
                        bg-indigo-600

                        text-white

                        rounded-br-md
                      `

                        : `
                        bg-white

                        border

                        border-slate-200

                        rounded-bl-md

                        text-slate-700
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

                  px-5

                  py-4

                  rounded-3xl
                "
                >

                  Thinking...

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

            bg-white
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

                placeholder="Ask AI something..."

                className="
                flex-1

                h-14

                px-5

                rounded-2xl

                border

                border-slate-300

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
                w-14

                h-14

                rounded-2xl

                bg-indigo-600

                hover:bg-indigo-700

                text-white

                text-xl
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