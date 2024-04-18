const Footer = () => {
  return (
    <footer className="layoutComponent mb-5 mt-24">
      <div className="container mx-auto">
        <div className="flex flex-col justify-evenly border m-2 rounded-xl p-10  sm:flex-row">
          <div className="text-center   items-center  w-full sm:w-1/2">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-justify sm:text-center">
              Overcoming addictions, especially those linked to{" "}
              <span className="font-bold text-red-600"> social media</span> and{" "}
              <span className="font-bold text-red-600">pornography</span> <br />{" "}
              Using science-backed techniques like behavioral science, Inspiring
              task, and build{" "}
              <span className="font-bold text-red-600"> daily routine.</span>
            </p>
          </div>

          <div className="text-center md:text-left flex flex-col justify-center items-center w-full sm:w-1/2">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-sm">kolopara 156/3</p>
            <p className="text-sm">Gazipur, Bangladesh</p>
            <p className="text-sm">
              Email:{" "}
              <a
                href="fitraat70@gmail.com
"
                className="text-red-500"
              >
                fitraat70@gmail.com
              </a>
            </p>
            <p className="text-sm">
              Phone:{" "}
              <a href="tel:+8801719317307" className="text-red-500">
                +8801719317307
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="  ">
        <div className="text-center ">
          <p className="text-sm my-5">
            &copy; 2024 Your Company. All rights reserved by{" "}
            <span className="text-red-600 font-bold"> Fitraat</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
