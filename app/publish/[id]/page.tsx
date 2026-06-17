"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import NoticeForm from "../../components/notice-form";

import {
  Notice,
  fetchNotices,
} from "@/lib/notices";

export default function PublishPage({
  params,
}: {
  params: { id: string };
}) {

  const router = useRouter();

  const [editingNotice, setEditingNotice] =
    useState<Notice | null>(null);

  useEffect(() => {

    async function loadNotice() {

      const notices =
        await fetchNotices();

      const notice =
        notices.find(
          (n) => n.id === params.id
        );

      if (notice) {

        setEditingNotice(notice);

      }

    }

    loadNotice();

  }, [params.id]);

  function handleSuccess() {

    router.push("/notices");

  }

  function handleCancel() {

    router.push("/notices");

  }

  return (

    <main className="min-h-screen flex items-center justify-center p-10">

      <div className="w-full max-w-3xl">

        <NoticeForm

          editNotice={editingNotice}

          onSuccess={handleSuccess}

          onCancel={handleCancel}

        />

      </div>

    </main>

  );

}