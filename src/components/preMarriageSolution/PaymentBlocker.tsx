export default function PreMarriagePaymentBlocker() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-white/80 backdrop-blur-sm rounded-lg">
      <p className="text-gray-800 font-semibold mb-3 text-sm sm:text-base">
        To access this{" "}
        <span className="text-blue-700 font-bold">video program</span>, please{" "}
        <span className="text-blue-700 font-bold">make payment</span>.
      </p>
      <button
        onClick={() => (window.location.href = "/payment")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition-all duration-300 shadow-md"
      >
        Go to Payment
      </button>
    </div>
  );
}
