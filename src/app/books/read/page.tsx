"use client";

import { useSearchParams } from "next/navigation";
import { FC } from "react";

const ReadPage: FC = () => {
  const searchParams = useSearchParams();
  const pdf = searchParams.get("pdf");

  if (!pdf) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <p className="text-xl">No PDF selected to read.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <h1 className="text-2xl font-bold text-center py-4">Read Your Book</h1>
      <div className="h-[80vh] mx-auto">
        <iframe
          src={pdf}
          className="w-full h-full border-none"
          title="PDF Viewer"
        ></iframe>
      </div>
    </div>
  );
};

export default ReadPage;
