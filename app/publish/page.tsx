"use client";

import { useRouter } from "next/navigation";

import NoticeForm from "../components/notice-form";

export default function PublishPage() {

  const router = useRouter();

  function handleSuccess() {

    router.push("/notices");

  }

  return (

    <main className="min-h-screen flex items-center justify-center p-10">

      <div className="w-full max-w-3xl">

        <NoticeForm

          onSuccess={handleSuccess}

          onCancel={() => router.push("/notices")}

        />

      </div>

    </main>

  );

}