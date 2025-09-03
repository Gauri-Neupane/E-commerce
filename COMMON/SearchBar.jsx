import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [serachTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(serachTerm, "serachTerm");
    setIsOpen(false);
    //will integrate this function when backend is ready
  };
  return (
    <div
      className={`flex items-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full "
        >
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 pr-12 bg-gray-100 rounded-lg focus:outline-none placeholder:text-gray-700"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute text-gray-600 transform -translate-y-1/2 right-2 top-1/2 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="w-6 h-6" />
            </button>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute text-gray-600 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-800 "
          >
            <HiMiniXMark className="w-6 h-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
