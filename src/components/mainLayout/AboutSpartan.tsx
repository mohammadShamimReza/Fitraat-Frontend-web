import Image from "next/image";
import image1 from "../../app/assets/blogimage/0_6LMazODWI5X8MFwU.png";
import image2 from "../../app/assets/blogimage/banner.jpg";

function AboutSpartan() {
  return (
    <div className="layoutComponent p-3">
      <div className="flex justify-between align-middle sm:flex-row flex-col  gap-5">
        <a
          href="/blog:id"
          className="flex border p-6 hover:shadow-md rounded-xl transition duration-300 lg:w-1/2"
        >
          <div className="w-2/3">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">
              <span className="text-gray-500"> What is </span>
              <span className="text-gray-950">Spartan Mode?</span>
            </h2>
            <p className="text-gray-800 leading-relaxed">
              &quot;Spartan mode&quot; means living simply, focusing intensely,
              and being disciplined. It&apos;s about doing more with less,
              whether in lifestyle, work, or fitness. It&apos;s like the ancient
              Spartans, who valued simplicity and toughness.
            </p>
          </div>
          <div className="relative w-1/3">
            <Image src={image1} fill alt="" />
          </div>
        </a>

        <a
          href="/blog:id "
          className=" flex border p-6 hover:shadow-md rounded-xl transition duration-300 lg:w-1/2"
        >
          <div className="w-2/3">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">
              <span className="text-gray-500"> How to become </span>
              <span className="text-gray-950">Unbetable</span>
            </h2>
            <p className="text-gray-800 leading-relaxed">
              Simplify for yourself. Focus on your goals, understand your needs,
              and take decisive action. Eliminate distractions, prioritize
              self-care, and consistently push your limits. By adopting this
              self-centric approach, you&apos;ll become unbeatable in achieving
              personal success and fulfillment.
            </p>
          </div>
          <div className="relative w-1/3">
            <Image src={image2} fill alt="" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default AboutSpartan;
