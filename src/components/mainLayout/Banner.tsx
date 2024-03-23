import Image from "next/image";
import Link from "next/link";
import bannerImage from "../../app/assets/spartan1.png";

function Banner() {
  return (
    <div className="lg:h-96 sm:h-96 md:h-96 w-full relative mt-5  border-slate-100 shadow-md rounded-xl border-2 pr-5 pl-5">
      <div className="flex justify-between align-middle">
        <div className=" font-bold text-2xl md:text-4xl lg:text-5xl">
          <div className="inline-block leading-normal mb-4 text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-100">
            Let&apos;s become <br />
            <span className="text-gray-900 animate-pulse text-3xl md:text-5xl lg:text-6xl font-extrabold">
              Unbeatable
            </span>{" "}
            <br />
            Start your <br />
            <span className="text-gray-900 animate-pulse text-3xl md:text-5xl lg:text-6xl font-extrabold">
              Spartan mode
            </span>
          </div>
          <br />
          <Link
            href={"/myTasks"}
            className=" lg:flex justify-center items-center animate-pulse"
          >
            <button className="bg-gradient-to-br from-gray-800 to-gray-700 text-white hover:text-gray-200 font-bold py-2 px-6 rounded-full shadow-lg transition duration-500 ease-in-out transform hover:scale-110 focus:outline-none   flex gap-1 mb-3">
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

        <div className="relative  ">
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
