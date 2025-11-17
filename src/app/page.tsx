"use client";

import HowWorks from "@/components/mainLayout/HowWorks";
import MainLayout from "@/components/mainLayout/MainLayout";
import NeedStop from "@/components/mainLayout/NeedStop";
import WhatGet from "@/components/mainLayout/WhatGet";
import WhatIs from "@/components/mainLayout/WhatIs";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <>
      <WhatIs />
      <HowWorks />

      <WhatGet />
      <NeedStop />

      <MainLayout />
    </>
  );
};

export default HomePage;
