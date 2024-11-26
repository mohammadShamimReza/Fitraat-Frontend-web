// components/FancyLoading.js

import { Spin } from "antd";

const FancyLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" p-8 ">
        <Spin size="large" />
        <p className="text-white text-lg mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default FancyLoading;
