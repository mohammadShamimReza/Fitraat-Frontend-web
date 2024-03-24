import { Carousel } from "antd";

function Reviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-24 mb-14">
      <p className="font-bold text-center text-6xl mb-8 text-gray-900">
        What Scholars Say
      </p>

      <div className="">
        <Carousel autoplay {...settings}>
          <div className="p-5">
            <div className="bg-gray-800  rounded-lg p-5 sm:h-80 h-96">
              <p className="text-white text-lg leading-relaxed mb-4">
                Never did I imagine myself free from porn. Thanks to Wael
                Ibrahim and the Aware Academy. The longest time I recall myself
                free from porn was about 3 months. But to break the entire cycle
                of porn addiction in 4 months! is beyond me.
              </p>
              <p className="text-white text-lg font-semibold text-right">
                - JD. South Africa
              </p>
            </div>
          </div>
          <div className="p-5">
            <div className="bg-gray-800 rounded-lg p-5 sm:h-80 h-96">
              <p className="text-white text-lg leading-relaxed mb-4">
                My marriage life was torn apart because of pornography.After
                more than 9 months working with the Aware Academy, the Critical
                Alignment Model Recovery program was my solution. A million
                thanks.
              </p>
              <p className="text-white text-lg font-semibold text-right">
                - AN. Australia
              </p>
            </div>
          </div>
          <div className="p-5">
            <div className="bg-gray-800 rounded-lg p-5 sm:h-80 h-96">
              <p className="text-white text-lg leading-relaxed mb-4">
                No words can describe how I felt after revealing my long years
                of secretive and addictive cycle to my wife. She was the ONE
                support I needed to cope with this monster.
              </p>
              <p className="text-white text-lg font-semibold text-right">
                - FO. Canada
              </p>
            </div>
          </div>
          <div className="p-5">
            <div className="bg-gray-800 rounded-lg p-5 sm:h-80 h-96">
              <p className="text-white text-lg leading-relaxed mb-4">
                hrough the effort and care of Wael Ibrahim and his team, hope
                was restored in my life. Even though I didn&apos;t quit or
                recover fully yet, but I have that strong conviction that this
                day is coming sooner than later.
              </p>
              <p className="text-white text-lg font-semibold text-right">
                - H.L. UK
              </p>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Reviews;
