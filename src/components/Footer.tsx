const Footer = () => {
  return (
    <footer className="layoutComponent mb-5 mt-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
          <div className="text-center md:text-left flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-justify">
              Overcoming addictions, especially those linked to{" "}
              <span className="font-bold text-red-600"> social media</span> and{" "}
              <span className="font-bold text-red-600">pornography</span>. Using
              science-backed techniques like behavioral science, Inspiring task,
              and build{" "}
              <span className="font-bold text-red-600"> daily routine.</span>
            </p>
          </div>
          <div className="text-center md:text-left  flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="text-sm">
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Web Design
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Graphic Design
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  SEO
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  Marketing
                </a>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-sm">123 Street Name</p>
            <p className="text-sm">City, Country</p>
            <p className="text-sm">Email: info@example.com</p>
            <p className="text-sm">Phone: +123 456 789</p>
          </div>
        </div>
      </div>
      <div className=" border-t border-gray-700 ">
        <div className="text-center ">
          <p className="text-sm my-5">
            &copy; 2024 Your Company. All rights{" "}
            <span className="text-red-600"> Fitraat</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
