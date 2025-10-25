import Image from "next/image";
import image from "../../app/assets/removePorn.webp";

function Motivation() {
  return (
    <div className="py-10 ">
      <h2 className="text-4xl font-bold text-center  pb-10">
        Why need to stop
      </h2>{" "}
      <div className="flex flex-col lg:flex-row justify-between gap-8 items-center  p-6">
        {/* Image Section */}
        <div className="lg:w-1/2 w-full h-64 flex items-center justify-center">
          <Image
            className="rounded-lg object-contain"
            src={image}
            alt="Break Free from Addiction"
            layout="intrinsic"
            width={300} // Set an appropriate width
            height={200} // Set an appropriate height
          />
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 w-full text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-4">Break Free from Addiction</h2>
          <p className="text-lg text-gray-600 mb-6">
            Pornography is harmful to your mental health, relationships, and
            self-esteem. But you’re not alone—we’re here to help.
          </p>
          <ul className="list-disc list-inside text-left text-gray-600 mb-6">
            <li>Daily tasks and motivational videos</li>
            <li>Community support to stay accountable</li>
            <li>Science-backed recovery techniques</li>
          </ul>
          <p className="text-lg text-gray-600">
            Take the first step today and reclaim your life!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Motivation;
