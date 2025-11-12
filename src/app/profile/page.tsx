"use client";


import ProfilePage from "@/components/profile/ProfilePage";
import ProgramSclaton from "@/components/structure/ProgramSclaton";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<ProgramSclaton />}>
      <h2 className="text-center text-3xl font-bold mt-5">Profile</h2>
      <ProfilePage />
    </Suspense>
  );
}

export default Page;
