import Image from "next/image";
import Link from "next/link";
import bannerImage from "../../app/assets/spartan1.png";

function Banner() {
  return (
    <div className="lg:h-96 sm:h-96 md:h-96 layoutComponent mt-14 ">
      <div className="flex justify-between align-middle  gap-3">
        <div className=" font-bold text-2xl sm:text-4xl md:text-5xl pl-5">
          <div className="inline-block leading-normal mb-4 text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-gray-100">
            Let&apos;s become <br />
            <span className="text-gray-900  text-2xl sm:text-5xl md:text-6xl font-extrabold ">
              Unbeatable
            </span>{" "}
            <br />
            Open your <br />
            <span className="text-gray-900  text-2xl sm:text-5xl md:text-6xl font-extrabold">
              Spartan mode
            </span>
          </div>
          <br />
          <Link
            href={"/myTasks"}
            className=" lg:flex justify-center items-center animate-pulse"
          >
            <button className="bg-gradient-to-br from-gray-800 to-gray-700 text-white hover:text-gray-200 font-bold py-1 px-6 rounded-full shadow-lg transition duration-500 ease-in-out transform hover:scale-110 focus:outline-none   flex gap-1 mb-3">
              <p>now</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 mt-1 lg:mt-3 md:mt-2 sm:mt-1 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </Link>
        </div>

        <div className="relative  p-2">
          <Image
            className=" rounded-md "
            alt=""
            src={bannerImage}
            height={380}
            width={380}
            // fill
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default Banner;
