import image1 from "../../app/assets/blogimage/0_6LMazODWI5X8MFwU.png";
import image2 from "../../app/assets/blogimage/banner.jpg";

import Image from "next/image";

function Motivation() {
  return (
    <div className="flex justify-center align-middle sm:flex-row flex-col mt-32 gap-5 ">
      <div className="sm:w-1/2  h-80 relative">
        <div className="">
          <Image src={image1} fill alt="" />
        </div>
      </div>
      <div className="sm:w-1/2 h-80 relative">
        <div className="">
          <Image src={image2} fill alt="" />
        </div>
      </div>
    </div>
  );
}

export default Motivation;
