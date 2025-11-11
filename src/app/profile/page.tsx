"use client";


import ProfilePage from "@/components/profile/ProfilePage";
import ProgramSclaton from "@/components/structure/ProgramSclaton";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<ProgramSclaton />}>
      <ProfilePage />
    </Suspense>
  );
}

export default Page;
