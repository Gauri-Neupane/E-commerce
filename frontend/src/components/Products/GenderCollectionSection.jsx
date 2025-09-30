import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
  return (
    <section className="px-4 py-16 lg:px-0">
      <div className="container flex flex-col gap-8 mx-auto md:flex-row">
        {/* Womens Collection */}
        <div className="relative flex-1">
          <img
            src={womensCollectionImage}
            alt="Womens Collection"
            className="w-full h-[700px] object-cover"
          />

          <div className="absolute p-4 bg-white bottom-8 left-8 bg-opcaity-90">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Womens Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Mens Collection */}
        <div className="relative flex-1">
          <img
            src={mensCollectionImage}
            alt="Men's Collection"
            className="w-full h-[700px] object-cover"
          />

          <div className="absolute p-4 bg-white bottom-8 left-8 bg-opcaity-90">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
