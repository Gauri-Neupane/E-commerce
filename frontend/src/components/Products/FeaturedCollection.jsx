import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp";

const FeaturedCollection = () => {
  return (
    <section className="px-4 py-16 lg:px-0">
      <div className="container flex flex-col-reverse items-center mx-auto lg:flex-row bg-green-50 rounded-3xl">
        {/* left content  */}
        <div className="p-8 text-center lg:w-1/2 lg:text-left">
          <h2 className="mb-2 text-lg font-semibold text-gray-700">
            Comfort and Style
          </h2>
          <h2 className="mb-6 text-4xl font-bold lg:text-5xl">
            Apparel made for your everyday life
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            Discover high quality, comfortable clothing that effortlessly blends
            fashon and function. Designed to make you look and feel great every
            day.
          </p>
          <Link
            to="/collections/all"
            className="px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>

        {/* right content */}
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="Featured Collection"
            className="object-cover w-full h-full lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
