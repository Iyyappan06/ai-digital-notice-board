"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import NoticeList from "../components/notice-list";

import AiSearchAssistant from "../components/ai-search-assistant";

import {
  Notice,
  fetchNotices,
  deleteNotice,
} from "@/lib/notices";

export default function NoticesPage() {

  const router = useRouter();

  const [notices, setNotices] =
    useState<Notice[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadNotices();

  }, []);

  async function loadNotices() {

    try {

      setLoading(true);

      const data =
        await fetchNotices();

      setNotices(data ?? []);

    } catch (error) {

      console.error(error);

      setNotices([]);

    } finally {

      setLoading(false);

    }

  }

  /* EDIT */

  function handleEdit(
    notice: Notice
  ) {

    router.push(
      `/publish?id=${notice.id}`
    );

  }

  /* DELETE */

  async function handleDelete(
    id: string
  ) {

    try {

      await deleteNotice(id);

      await loadNotices();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete notice."
      );

    }

  }

  return (

    <main className="min-h-screen p-10">

      <NoticeList

        notices={notices}

        loading={loading}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

      <AiSearchAssistant />

    </main>

  );

}