import { Skeleton } from "antd";

export default function ProgramSclaton() {
  return (
    <div className="flex h-screen mt-10">
      <div className="w-1/4 h-[550px] bg-gray-200 p-4 rounded-md">
        <Skeleton active title={false} paragraph={{ rows: 5 }} />
      </div>
      <div className="flex-1 bg-white p-20">
        <Skeleton
          active
          title={{ width: "60%" }}
          paragraph={{
            rows: 10,
            width: ["100%", "100%", "100%", "100%", "100%"],
          }}
        />
      </div>
    </div>
  );
}
