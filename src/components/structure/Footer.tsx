// components/Footer.js
"use client";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-10 text-white py-10">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Fitraat</h3>
            <p className="text-sm text-gray-400">
              FItraat is a solution for addicted adult content consumers. This
              is a 40-day marathon solution. Every day users have some tasks,
              emergency section for emergency excited section. Users can post
              their questions and get answers through comments. A lot of
              informational blogs are also available.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/payment" className="text-gray-400 hover:underline">
                  payment
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/freeBlog"
                  className="text-gray-400 hover:underline"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-gray-400 hover:underline">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/privecy" className="text-gray-400 hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>
                  152/3 kolopara, Simoltoli, Gazipur, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <span>+880 1719-357307</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>mohammadshamimrez23393@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-4">
              Follow us on social media for updates, tips, and insights.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2024 Fitraat. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:underline">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
