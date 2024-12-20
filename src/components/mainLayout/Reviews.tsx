import { Carousel } from "antd";
import Image from "next/image";
import scholar4 from "../../app/assets/scholar.png";
import scholar1 from "../../app/assets/scholar1.png";
import scholar2 from "../../app/assets/scholar2.png";
import scholar3 from "../../app/assets/scholar3.png";

function Reviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1400,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const reviews = [
    {
      text: "Never did I imagine myself free from porn. Thanks to Wael Ibrahim and the Aware Academy. The longest time I recall myself free from porn was about 3 months. But to break the entire cycle of porn addiction in 4 months is beyond me.",
      name: "Mufti Menk",
      location: "South Africa",
      image: scholar1,
    },
    {
      text: "My marriage life was torn apart because of pornography. After more than 9 months working with the Aware Academy, the Critical Alignment Model Recovery program was my solution. A million thanks.",
      name: "Dr. Zakir Naik",
      location: " AN",
      image: scholar2,
    },
    {
      text: "No words can describe how I felt after revealing my long years of secretive and addictive cycle to my wife. She was the ONE support I needed to cope with this monster.",
      name: " Mufti Tariq Maksood",
      location: "FO",
      image: scholar3,
    },
    {
      text: "Through the effort and dcare of Wael Ibrahim and his team, hope was restored in my life. Even though I didn’t quit or recover fully yet, I have that strong conviction that this day is coming sooner than later.",
      name: "Sayak Ahmullah",
      location: "UK",
      image: scholar4,
    },
  ];

  return (
    <div className="mt-24 mb-14 px-5">
      <p className="font-bold text-center text-4xl md:text-6xl mb-12 text-gray-900">
        What Scholars Say
      </p>

      <div>
        <Carousel {...settings} className="gap-4">
          {reviews.map((review, index) => (
            <div key={index} className="p-4">
              <div className="bg-gray-100 rounded-lg shadow-lg flex flex-col items-center justify-around h-96  mx-auto">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <Image
                    src={review.image}
                    alt={`${review.name} profile`}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-800 text-lg leading-relaxed mb-4 px-4 text-center">
                  {`"${review.text}"`}
                </p>
                <p className="text-gray-700 text-lg font-semibold text-center">
                  - {review.name}, {review.location}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Reviews;
