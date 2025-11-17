import { Button } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen   px-4">
      {/* Animated 404 */}
      <h1 className="text-[10rem] font-extrabold mb-4 animate-pulse sm:text-[8rem] xs:text-[6rem]">
        404
      </h1>

      {/* Subtitle */}
      <p className="text-2xl sm:text-xl mb-8 mt-8 text-center max-w-md">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Button */}
      <Link href="/">
        <Button
          type="primary"
          className="bg-white text-black border-white hover:bg-gray-200 hover:text-black transition"
          size="large"
        >
          Go Back Home
        </Button>
      </Link>

      {/* Optional subtle background effect */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-10">
        <span className="text-[20rem] font-black select-none">404</span>
      </div>
    </div>
  );
}
