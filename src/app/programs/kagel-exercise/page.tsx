"use client";

import KegelPage from "@/components/kagelIndividual/KagelPage";
import { useGetKagelIndividualByDayIdQuery } from "@/redux/api/kagelindividualApi";
import { useRouter } from "next/navigation";
import React from "react";

const KagelIndividualPage: React.FC = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetKagelIndividualByDayIdQuery("1");

  console.log(data?.data[0].afternoonKagel);

  const kagel = {
    morningkagel: data?.data[0].morningkagel,
    afternoonKagel: data?.data[0].afternoonKagel,
    nightKagel: data?.data[0].nightKagel,
  };
  const dayCount = data?.data[0].dayCount || 1;
  return (
    <main className=" ">
      <KegelPage
        DayCount={dayCount}
        kegel={kagel}
        key={data?.data[0].documentId}
      />
    </main>
  );
};

export default KagelIndividualPage;
