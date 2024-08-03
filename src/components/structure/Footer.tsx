// components/Footer.js

import { Button } from "antd";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border rounded-lg p-8">
      <div className="container mx-auto  max-w-5xl ">
        {/* First Row of Buttons */}
        <div className="flex flex-wrap justify-center mb-4">
          <Link href={"/proMember"}>
            <Button type="primary" className="mx-2 my-2" ghost>
              Pro member
            </Button>
          </Link>

          <Link href={"/about"}>
            <Button type="primary" className="mx-2 my-2" ghost>
              About us
            </Button>
          </Link>
        </div>

        {/* Second Row of Buttons */}
        <div className="flex flex-wrap justify-center mb-4">
          <Link href={"/privecy"}>
            <Button type="primary" className="mx-2 my-2" ghost>
              Privecy policy
            </Button>
          </Link>
        </div>

        {/* Bottom Section with Copyright, Email, and Social Media Links */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 ">
          <p className="text-sm text-center md:text-left">
            &copy; 2024 Fitraat. All rights reserved.
          </p>
          <div className="flex items-center justify-center md:justify-end mt-4 md:mt-0">
            <span className="mr-4">contact@Fitraat.com</span>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <FaFacebookF className="text-xl hover:text-blue-500" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 hover:text-blue-500"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <FaInstagram className="text-xl hover:text-red-400" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <FaLinkedinIn className="text-xl hover:text-blue-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
