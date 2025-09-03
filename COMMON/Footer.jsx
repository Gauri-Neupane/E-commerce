import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 border-t">
      <div className="container grid grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-4 lg:px-0">
        <div>
          <h3 className="mb-4 text-lg text-gray-800">Newsletter</h3>
          <p className="mb-4 text-gray-500">
            Be the first to know about our latest products, exclusive events and
            offers
          </p>
          <p className="mb-6 text-sm font-medium text-gray-600">
            Sign up and get 10% off your first order
          </p>
          {/* Newsletter form */}
          <form className="flex">
            <input
              className="w-full p-3 text-sm border-t border-b border-l border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              type="email"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 text-sm text-white transition-all bg-black rounded-r-md hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="mb-4 text-lg text-gray-800">Shop</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="transition-colors hover:text-gray-500">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="transition-colors hover:text-gray-500">
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="transition-colors hover:text-gray-500">
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link to="#" className="transition-colors hover:text-gray-500">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="mb-4 text-lg text-gray-800">Support</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="#" className="transition-colors hover:text-gray-500">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="transition-colors hover:text-gray-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="transition-colors hover:text-gray-500">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="transition-colors hover:text-gray-500">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow us links */}
        <div>
          <h3 className="mb-4 text-lg text-gray-800">Follow Us</h3>
          <div className="flex items-center mb-6 space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="hover:text-gray-500"
              rel="noopener noreferrer"
            >
              <TbBrandMeta className="w-5 h-5" />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              className="hover:text-gray-500"
              rel="noopener noreferrer"
            >
              <IoLogoInstagram className="w-5 h-5" />
            </a>

            <a
              href="https://www.twitter.com"
              target="_blank"
              className="hover:text-gray-500"
              rel="noopener noreferrer"
            >
              <RiTwitterXLine className="w-5 h-5" />
            </a>
          </div>
          <p className="text-gray-500">Call Us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" />
            +61451451697
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container px-4 pt-6 mx-auto mt-12 border-t border-gray-200 lg:px-0">
        <p className="text-sm tracking-tighter text-center text-gray-500">
          &copy; 2025 Your Company. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
