// components/FancyLoading.js

const FancyLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-full p-8 bg-gradient-to-br from-white to-black shadow-2xl animate-pulse">
        <svg
          className="w-20 h-20 text-white animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 0C7.24 0 3 4.24 3 9s4.24 9 9 9c1.56 0 3.03-.4 4.3-1.1l-1.5-2.6C13.85 14.73 13.43 15 13 15c-2.21 0-4-1.79-4-4s1.79-4 4-4c.44 0 .85.09 1.23.23l-1.45-2.5C10.5 3.4 11.23 3 12 3c4.41 0 8 3.59 8 8s-3.59 8-8 8c-1.44 0-2.77-.39-3.91-1.06l-1.42 2.47c1.4.8 3.01 1.26 4.73 1.26 4.96 0 9-4.04 9-9s-4.04-9-9-9z"
            fill="currentColor"
          />
        </svg>
        <p className="text-white text-lg mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default FancyLoading;
