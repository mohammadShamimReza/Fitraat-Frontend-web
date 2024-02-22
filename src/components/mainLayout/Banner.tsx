import Image from "next/image";
import bannerImage from "../../app/assets/banner.jpg";

function Banner() {
  return (
    <div className="h-96 w-full relative mt-5">
      <Image
      className="rounded-md"
        alt=""
        src={bannerImage}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      ></Image>
    </div>
  );
}

export default Banner;
