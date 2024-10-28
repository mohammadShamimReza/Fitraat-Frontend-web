"use client";

import { useRouter } from "next/navigation";

const CompletedFreeTask = () => {
  const router = useRouter();

  const redirectToMembership = () => {
    router.push("/proMember");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  ">
      <div className="p-8 bg-white border rounded-xl shadow-md max-w-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">Congratulations!</h1>
        <p className="text-lg mb-6">
          You&apos;ve completed your free access period. We&apos;re thrilled to
          have you on this journey!
        </p>

        <button
          className={`px-4 py-2 rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
          onClick={redirectToMembership}
        >
          Upgrade to Pro Membership
        </button>
      </div>
    </div>
  );
};

export default CompletedFreeTask;
