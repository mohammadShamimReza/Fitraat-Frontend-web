import Image from "next/image";
import image1 from "../../app/assets/blogimage/0_6LMazODWI5X8MFwU.png";
import image2 from "../../app/assets/blogimage/banner.jpg";

function Blog() {
  return (
    <div className="flex justify-center align-middle sm:flex-row flex-col mt-20  sm:gap-x-5 ">
      <a
        href="/blog:id"
        className=" flex border p-6 hover:shadow-xl transition duration-300 h-60"
      >
        <div className="w-2/3">
          <h2 className="font-semibold mb-3">Lorem ipsum dolor sit amet.</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit at eos
            neque dicta nam a, exercitationem ipsum praesentium ea eligendi.
          </p>
        </div>
        <div className="relative w-1/3">
          <Image src={image1} fill alt="" />
        </div>
      </a>
      <a
        href="/blog:id "
        className=" flex border p-6 hover:shadow-xl transition duration-300 h-60"
      >
        <div className="w-2/3">
          <h2 className="font-semibold mb-3">Lorem ipsum dolor sit amet.</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit at eos
            neque dicta nam a, exercitationem ipsum praesentium ea eligendi.
          </p>
        </div>
        <div className="relative w-1/3">
          <Image src={image2} fill alt="" />
        </div>
      </a>
    </div>
  );
}

export default Blog;
