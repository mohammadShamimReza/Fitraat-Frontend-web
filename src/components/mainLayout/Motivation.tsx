import image from "../../app/assets/removePorn.jpg";

import Image from "next/image";

function Motivation() {
  return (
    <div className="flex justify-center md:flex-row lg:flex-row sm:flex-row flex-col align-middle  gap-5  mt-14 p-5">
      <div className="sm:w-full md:w-1/2 lg:w-1/2  ">
        <div className=" ">
          <p className="text-5xl  mb-4">Pornography</p>
          <p className="text-lg leading-relaxed mt-12">
            The Begin a New Life is a step-by-step program that helps you stop
            watching/looking at porn, break free from it, or overcome porn
            addiction. It provides tools for making choices about the behavior,
            resisting it, abstaining from it, and addressing any underlying
            issues, as you walk through a series of steps to recovery and
            discover a new life. The program can be done in the privacy of your
            home or in a group context.
          </p>
        </div>
      </div>
      <div className=" sm:w-full md:w-1/2 lg:w-1/2 relative ">
        <div className="">
          <Image className=" rounded-md " src={image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Motivation;
