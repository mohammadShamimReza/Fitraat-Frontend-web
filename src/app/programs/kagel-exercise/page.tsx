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
  console.log(userData);
  useEffect(() => setIsMounted(true), []);
  const router = useRouter();
  const currentDay = userData?.completedInfo?.Day?.dayNumber.toString() || "1";

  const {
    data: kagelData,
    isLoading,
    isError,
  } = useGetKagelIndividualByDayIdQuery(currentDay);

  console.log(kagelData, "Kagel data");
  const kagel = {
    morningkagel: kagelData?.data[0].morningkagel,
    afternoonKagel: kagelData?.data[0].afternoonKagel,
    nightKagel: kagelData?.data[0].nightKagel,
  };
  const dayCount = kagelData?.data[0].dayCount || 1;
  const payment = userData?.kagelPayment;
  const userId = userData?.id;
  if (!isMounted || !kagelData) return <ProgramSclaton />;
  const key = kagelData?.data[0].id || "defaultKey";
  return (
    <Suspense fallback={<ProgramSclaton />}>
      {" "}
      <KegelPage
        DayCount={dayCount}
        kegel={kagel}
        key={key}
        payment={payment}
        userId={userId}
      />
    </Suspense>
  );
};

export default KagelIndividualPage;
