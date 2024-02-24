// // components/Footer.js

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-4 mt-20">
//       <div className="container mx-auto flex justify-between items-center">
//         <p className="text-sm">
//           &copy; 2024 Your Company. All rights reserved.
//         </p>
//         <ul className="flex space-x-4">
//           <li>
//             <a href="#" className="hover:text-gray-300">
//               About
//             </a>
//           </li>
//           <li>
//             <a href="#" className="hover:text-gray-300">
//               Services
//             </a>
//           </li>
//           <li>
//             <a href="#" className="hover:text-gray-300">
//               Contact
//             </a>
//           </li>
//         </ul>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// components/Footer.js

const Footer = () => {
  return (
    <footer className="bg-gray-200 rounded-xl shadow-xl shadow-gray-500  py-8 mt-10 mb-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
          <div className="text-center md:text-left flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              eget enim quis purus tempor vestibulum.
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
      <div className="mt-8 border-t border-gray-700 ">
        <div className="container mx-auto flex justify-evenly items-center mt-5 ">
          <p className="text-sm ">
            &copy; 2024 Your Company. All rights reserved.
          </p>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
