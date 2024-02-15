import { Carousel } from "antd";
import Image from "next/image";
import Image1 from "../../../src/app/assets/banner.jpg";
import Image3 from "../../../src/app/assets/blogimage/0_6LMazODWI5X8MFwU.png";
import Image2 from "../../../src/app/assets/blogimage/banner.jpg";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

function Reviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="mt-20 mb-14">
      <p className="font-semibold text-center text-4xl mb-14">
        What scolar say
      </p>
      <div className="">
        <Carousel autoplay {...settings}>
          <div className="">
            <Image
              src={Image1}
              alt=""
              style={{
                width: "50%",
                height: "50%",
              }}
            />
          </div>
          <div>
            <Image
              src={Image2}
              alt=""
              style={{
                width: "50%",
                height: "50%",
              }}
            />
          </div>
          <div>
            <Image
              src={Image3}
              alt=""
              style={{
                width: "50%",
                height: "50%",
              }}
            />
          </div>
          <div>
            <Image
              src={Image2}
              alt=""
              style={{
                width: "50%",
                height: "50%",
              }}
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Reviews;
