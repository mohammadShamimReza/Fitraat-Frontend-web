"use client";

import KegelPage from "@/components/kagelIndividual/KagelPage";
import ProgramSclaton from "@/components/structure/ProgramSclaton";
import { useGetKagelIndividualByDayIdQuery } from "@/redux/api/kagelindividualApi";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const KagelIndividualPage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const userData = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => setIsMounted(true), []);
  const router = useRouter();
  const {
    data: kagelData,
    isLoading,
    isError,
  } = useGetKagelIndividualByDayIdQuery("1");

  const kagel = {
    morningkagel: kagelData?.data[0].morningkagel,
    afternoonKagel: kagelData?.data[0].afternoonKagel,
    nightKagel: kagelData?.data[0].nightKagel,
  };
  const dayCount = kagelData?.data[0].dayCount || 1;
  if (!isMounted || !kagelData) return <ProgramSclaton />;
  const key = kagelData?.data[0].id || "defaultKey";
  return (
    <Suspense fallback={<ProgramSclaton />}>
      {" "}
      <KegelPage DayCount={dayCount} kegel={kagel} key={key} />
    </Suspense>
  );
};

export default KagelIndividualPage;
