"use client";
import { useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import Link from "next/link";
type PaymentKey = "fitraatPayment" | "kagelPayment" | "childProtectionPayment";

const plans: {
  key: PaymentKey;
  name: string;
  tag: string;
  color: string;
  price: string;
  oldPrice: string;
  features: string[];
  payLink: string;
  completeLink: string;
}[] = [
  {
    key: "fitraatPayment",
    name: "Porn Recovery",
    tag: "Most Popular 🔥",
    color: "from-gray-700 to-black",
    price: "৳899",
    oldPrice: "৳1299",
    features: [
      "Full 40-day recovery program",
      "Daily video lessons & motivation",
      "Progress tracking dashboard",
      "Expert-led group sessions",
      "Exclusive recovery content",
    ],
    payLink: "/payment",
    completeLink: "/programs/porn-recovary",
  },
  {
    key: "kagelPayment",
    name: "Kegel Exercise",
    tag: "Be Pro 💪",
    color: "from-indigo-600 to-blue-600",
    price: "৳499",
    oldPrice: "৳799",
    features: [
      "Daily guided Kegel workouts",
      "Audio cues for squeeze & relax",
      "Morning, afternoon & night sessions",
      "6 months full access",
      "Bonus health insights",
    ],
    payLink: "/payment",
    completeLink: "/programs/kegel-exercise",
  },
  {
    key: "childProtectionPayment",
    name: "Pre marriage program",
    tag: "Best Value 🌟",
    color: "from-emerald-500 to-green-600",
    price: "৳699",
    oldPrice: "৳999",
    features: [
      "Emotional readiness lessons",
      "Couple communication exercises",
      "Self-control and purity challenges",
      "Expert relationship webinars",
      "Guided steps for marriage preparation",
    ],
    payLink: "/payment",
    completeLink: "/programs/pre-marriage",
  },
];

const MembershipCard = () => {
  const userData = useAppSelector((state) => state.auth.userInfo);

  return (
    <div className="w-full py-16 px-4 sm:px-8 lg:px-16 bg-gradient-to-b ">
      {/* Header */}
      <div className="text-center mb-14">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-800"
        >
          Choose Your <span className="text-red-600">Membership</span>
        </motion.h1>
        <p className="text-gray-500 mt-3 text-lg">
          Unlock exclusive features and accelerate your recovery journey.
        </p>
      </div>

      {/* Paid Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => {
          const isComplete = userData?.[plan.key] === "Complete";
          const buttonText = isComplete ? `Go to Program` : `Get ${plan.name}`;
          const link = isComplete ? plan.completeLink : plan.payLink;

          return (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className={`relative bg-white border-2 border-transparent shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl group`}
            >
              {/* Tag */}
              <span
                className={`absolute top-0 left-0 rounded-br-xl rounded-tl-2xl text-white text-sm font-semibold px-3 py-1 bg-gradient-to-r ${plan.color}`}
              >
                {plan.tag}
              </span>

              <div>
                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mt-3 mb-2 text-center group-hover:scale-105 transition-transform duration-300">
                  {plan.name}
                </h2>

                {/* Price */}
                {!isComplete && (
                  <div className="flex justify-center items-center mb-5">
                    <span className="text-gray-400 line-through mr-2 text-lg">
                      {plan.oldPrice}
                    </span>
                    <span className="text-3xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                  </div>
                )}

                {/* Features */}
                <ul className="space-y-3 text-gray-700">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-green-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <Link href={link}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className={`mt-8 w-full ${
                    isComplete
                      ? "bg-gradient-to-r from-green-600 to-emerald-700"
                      : `bg-gradient-to-r ${plan.color}`
                  } text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300`}
                >
                  {buttonText}
                </motion.button>
              </Link>

              {/* Completion badge */}
              {isComplete && (
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  ✅ Active
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Free Plan */}
      <div className="mt-16 max-w-3xl mx-auto">
        <motion.div
          whileHover={{ y: -10 }}
          className="relative bg-white border border-gray-200 shadow-lg rounded-2xl p-8 text-center transition-all duration-500 hover:shadow-2xl"
        >
          <span className="absolute top-0 left-0 rounded-br-xl rounded-tl-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-semibold px-3 py-1">
            Free Trial 🎁
          </span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Start Your Recovery Free
          </h2>
          <p className="text-gray-500 mb-5 text-lg">
            Get{" "}
            <span className="font-semibold text-green-600">3 days free</span>{" "}
            access to the <span className="font-semibold">Porn Recovery</span>{" "}
            program.
          </p>

          <ul className="text-gray-700 space-y-2 mb-6 max-w-sm mx-auto text-left">
            {[
              "3-day full recovery access",
              "Daily video & motivation",
              "Community group access",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <Link href="/signup">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300"
            >
              Start Free 3-Day Trial
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MembershipCard;
