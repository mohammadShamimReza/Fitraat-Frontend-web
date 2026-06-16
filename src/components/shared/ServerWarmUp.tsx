import { useGetCheckServerWarmUpQuery } from "@/redux/api/serverWarmUp";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function ServerWarmUp() {
  const [show, setShow] = useState(false);

  const { isLoading, isFetching } = useGetCheckServerWarmUpQuery(undefined);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    // If API is running, start 10s timer
    if (isLoading || isFetching) {
      timer = setTimeout(() => {
        setShow(true);
      }, 10);
    } else {
      // API finished → hide popup immediately
      setShow(false);
    }

    return () => clearTimeout(timer);
  }, [isLoading, isFetching]);

  // Don’t render anything unless needed
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 bg-white shadow-xl rounded-2xl p-5 w-80 border border-gray-200 z-50">
      <h2 className="text-lg font-semibold mb-2">Server is warming up ☕</h2>

      <p className="text-sm text-gray-600 mb-4">
        This may take a few seconds. Please wait while we prepare your data.
      </p>

      {/* Animated dots loader */}
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-3 h-3 bg-blue-500 rounded-full"
        />

        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          className="w-3 h-3 bg-blue-500 rounded-full"
        />

        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          className="w-3 h-3 bg-blue-500 rounded-full"
        />
      </div>

      {/* Spinner */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mt-4 mx-auto"
      />
    </div>
  );
}

export default ServerWarmUp;
