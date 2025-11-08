"use client";

import KegelPage from "@/components/kagelIndividual/KagelPage";
import ProgramSclaton from "@/components/structure/ProgramSclaton";
import { useGetKagelIndividualByDayIdQuery } from "@/redux/api/kagelindividualApi";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const KagelIndividualPage: React.FC = () => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [day, setDay] = useState("1");

  const userData = useAppSelector((state) => state.auth.userInfo);
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (userData) {
      setDay(userData.kagelIndividualDayNumber.toString());
    }
  }, [userData]);

  const {
    data: kagelData,
    isLoading,
    isError,
  } = useGetKagelIndividualByDayIdQuery(day);

  if (!isMounted || !kagelData || isLoading) return <ProgramSclaton />;

  const kagel = {
    morningkagel: kagelData?.data[0].morningkagel,
    afternoonKagel: kagelData?.data[0].afternoonKagel,
    nightKagel: kagelData?.data[0].nightKagel,
  };
  const dayCount = kagelData?.data[0].dayCount || 1;
  const payment = userData?.kagelPayment;
  const userId = userData?.id;
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
        setDay={setDay}
      />
    </Suspense>
  );
};

export default KagelIndividualPage;
