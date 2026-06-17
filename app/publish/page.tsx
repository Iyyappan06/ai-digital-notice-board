"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import NoticeForm from "../components/notice-form";

import {
  Notice,
  fetchNotices,
} from "@/lib/notices";

export default function PublishPage() {

  const router = useRouter();

  const searchParams =
    useSearchParams();

  const id =
    searchParams.get("id");

  const [
    editingNotice,

    setEditingNotice,

  ] =
    useState<Notice | null>(
      null
    );

  useEffect(() => {

    async function loadNotice() {

      if (!id) return;

      const notices =
        await fetchNotices();

      const notice =
        notices.find(

          (n) => n.id === id

        );

      if (notice) {

        setEditingNotice(
          notice
        );

      }

    }

    loadNotice();

  }, [id]);

  function handleSuccess() {

    setEditingNotice(null);

    router.push(
      "/notices"
    );

  }

  function handleCancel() {

    setEditingNotice(null);

    router.push(
      "/notices"
    );

  }

  return (

    <main className="min-h-screen flex items-center justify-center px-6">

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