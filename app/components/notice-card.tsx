"use client";

import { useState } from "react";
import type { Notice } from "@/lib/notices";

interface NoticeCardProps {
  notice: Notice;
  onEdit: (notice: Notice) => void;
  onDelete: (id: string) => void;
}

const CATEGORY_CONFIG: Record<
  string,
  {
    gradient: string;
    text: string;
    dot: string;
    glow: string;
  }
> = {
  General: {
    gradient: "rgba(100,116,139,0.18)",
    text: "#94A3B8",
    dot: "#64748B",
    glow: "rgba(100,116,139,0.12)",
  },

  Academics: {
    gradient: "rgba(56,189,248,0.18)",
    text: "#38BDF8",
    dot: "#0EA5E9",
    glow: "rgba(56,189,248,0.12)",
  },

  Placement: {
    gradient: "rgba(124,58,237,0.18)",
    text: "#A78BFA",
    dot: "#7C3AED",
    glow: "rgba(124,58,237,0.12)",
  },

  Events: {
    gradient: "rgba(245,158,11,0.18)",
    text: "#FCD34D",
    dot: "#F59E0B",
    glow: "rgba(245,158,11,0.12)",
  },

  Sports: {
    gradient: "rgba(16,185,129,0.18)",
    text: "#34D399",
    dot: "#10B981",
    glow: "rgba(16,185,129,0.12)",
  },

  Administration: {
    gradient: "rgba(244,63,94,0.18)",
    text: "#FB7185",
    dot: "#F43F5E",
    glow: "rgba(244,63,94,0.12)",
  },

  Library: {
    gradient: "rgba(251,146,60,0.18)",
    text: "#FDBA74",
    dot: "#FB923C",
    glow: "rgba(251,146,60,0.12)",
  },

  Hostel: {
    gradient: "rgba(6,182,212,0.18)",
    text: "#67E8F9",
    dot: "#06B6D4",
    glow: "rgba(6,182,212,0.12)",
  },
};

const CATEGORY_ICONS: Record<string, string> = {
  General: "📋",
  Academics: "📚",
  Placement: "💼",
  Events: "🎉",
  Sports: "⚽",
  Administration: "🏛️",
  Library: "📖",
  Hostel: "🏠",
};

export default function NoticeCard({
  notice,
  onEdit,
  onDelete,
}: NoticeCardProps) {
  const [hovered, setHovered] = useState(false);

  const cfg =
    CATEGORY_CONFIG[notice.category] ??
    CATEGORY_CONFIG.General;

  const createdDate = new Date(
    notice.created_at
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  const expiryDate = notice.expiry_date
    ? new Date(
        notice.expiry_date
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : null;

  return (
    <div
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={() =>
        setHovered(false)
      }
      style={{
        position: "relative",

        overflow: "hidden",

        borderRadius: "30px",

        minHeight: "340px",

        background: hovered
          ? "rgba(22,30,51,0.96)"
          : "rgba(17,24,39,0.92)",

        border: notice.important
          ? "1px solid rgba(244,63,94,0.25)"
          : "1px solid rgba(255,255,255,0.08)",

        transform: hovered
          ? "translateY(-6px)"
          : "translateY(0)",

        transition: "0.3s ease",

        boxShadow: hovered
          ? `0 20px 50px ${cfg.glow}`
          : "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Glow */}

      <div
        style={{
          position: "absolute",

          right: "-30px",

          top: "-30px",

          width: "180px",

          height: "180px",

          borderRadius: "50%",

          background: cfg.gradient,

          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          padding: "30px",

          position: "relative",

          display: "flex",

          flexDirection: "column",

          height: "100%",
        }}
      >
        {/* TOP */}

        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems:
              "flex-start",

            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",

              flexWrap: "wrap",

              gap: "10px",
            }}
          >
            <span
              style={{
                padding:
                  "8px 14px",

                borderRadius:
                  "999px",

                background:
                  cfg.gradient,

                color: cfg.text,

                fontSize:
                  "13px",

                fontWeight:
                  700,
              }}
            >
              {
                CATEGORY_ICONS[
                  notice.category
                ]
              }{" "}
              {notice.category}
            </span>

            {notice.important && (
              <span
                style={{
                  padding:
                    "8px 14px",

                  borderRadius:
                    "999px",

                  background:
                    "rgba(244,63,94,0.15)",

                  color:
                    "#FB7185",

                  fontSize:
                    "13px",

                  fontWeight:
                    700,
                }}
              >
                📌 Important
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",

              gap: "10px",
            }}
          >
            <button
              onClick={() =>
                onEdit(notice)
              }
              style={{
                width: "42px",

                height: "42px",

                borderRadius:
                  "14px",

                border: "none",

                cursor: "pointer",

                background:
                  "rgba(99,102,241,0.15)",

                color:
                  "#818CF8",
              }}
            >
              ✏️
            </button>

            <button
              onClick={() =>
                onDelete(
                  notice.id
                )
              }
              style={{
                width: "42px",

                height: "42px",

                borderRadius:
                  "14px",

                border: "none",

                cursor: "pointer",

                background:
                  "rgba(244,63,94,0.15)",

                color:
                  "#FB7185",
              }}
            >
              🗑️
            </button>
          </div>
        </div>

        {/* TITLE */}

        <h2
          style={{
            fontSize: "24px",

            fontWeight: 800,

            color: "#F8FAFC",

            lineHeight: "1.4",

            marginBottom: "18px",

            fontFamily:
              "'Plus Jakarta Sans',sans-serif",
          }}
        >
          {notice.title}
        </h2>

        {/* DESCRIPTION */}

        <p
          style={{
            color: "#94A3B8",

            lineHeight: "1.9",

            fontSize: "15px",

            flex: 1,

            display: "-webkit-box",

            WebkitLineClamp: 3,

            WebkitBoxOrient:
              "vertical",

            overflow: "hidden",
          }}
        >
          {notice.description}
        </p>

        {/* FOOTER */}

        <div
          style={{
            marginTop: "30px",

            paddingTop: "22px",

            borderTop:
              "1px solid rgba(255,255,255,0.08)",

            display: "flex",

            justifyContent:
              "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",

                color: "#64748B",

                textTransform:
                  "uppercase",

                fontWeight: 700,
              }}
            >
              Posted
            </p>

            <p
              style={{
                color: "#CBD5E1",

                fontWeight: 700,

                marginTop: "4px",
              }}
            >
              {createdDate}
            </p>
          </div>

          {expiryDate && (
            <div
              style={{
                textAlign:
                  "right",
              }}
            >
              <p
                style={{
                  fontSize:
                    "11px",

                  color:
                    "#64748B",

                  textTransform:
                    "uppercase",

                  fontWeight:
                    700,
                }}
              >
                Expires
              </p>

              <p
                style={{
                  color:
                    "#FB923C",

                  fontWeight:
                    700,

                  marginTop:
                    "4px",
                }}
              >
                {expiryDate}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}