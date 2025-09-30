import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
const NewArrivals = () => {
  const scrollRef = useRef(null);
  // add scroll left which will be the initial position of the container
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRHqvaLtfCRLPWwEL5QjsSn-0d6_mgHGFuSE5h_xUOX8OnTIKaLRw9C_cCqxHplb-T6tFlq9n10B6mZI5zr__drJ_yPl9kq4EFhIgObkrTjCEdg29t1JvCYBA",
          altText: "Stylish Jacket",
        },
      ],
    },

    {
      _id: "2",
      name: "Blazer",
      price: 120,
      images: [
        {
          url: "https://i.pinimg.com/736x/c6/fc/44/c6fc4491138468d7649cbb1d08a4ee61.jpg",
          altText: "Stylish Blazer",
        },
      ],
    },

    {
      _id: "3",
      name: "Denim Jacket",
      price: 120,
      images: [
        {
          url: "https://media.powerlook.in/catalog/product/d/p/dp21172830.jpg?aio=w-640",
          altText: "Denim Jacket",
        },
      ],
    },

    {
      _id: "4",
      name: "Mandarin Collar Shirt",
      price: 120,
      images: [
        {
          url: "https://www.vudu.co.in/cdn/shop/files/DenimMandarinCollarShirt-VUDU1.jpg?v=1735887915&width=1080",
          altText: "Mandarin Collar Shirt",
        },
      ],
    },

    {
      _id: "5",
      name: "Japanese Pant",
      price: 120,
      images: [
        {
          url: "http://i.etsystatic.com/11675750/r/il/5a29ff/4966786456/il_fullxfull.4966786456_5hpu.jpg",
          altText: "Japanese Pant",
        },
      ],
    },

    {
      _id: "6",
      name: "SweatShirt",
      price: 120,
      images: [
        {
          url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRHaKA3yZktPY9OAJ_KI3JjWH30ZEyeQDAFe5jo9ZvhrA1pUOVSz3cywAPTaAG-Ys50Cq5-981Gusxh5UORmkTnsWsi42NFoCZKxBr-K8HZ",
          altText: "Sweatshirt",
        },
      ],
    },

    {
      _id: "7",
      name: "Hoodies",
      price: 120,
      images: [
        {
          url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTH7zOxmo84igvJbW8Rv1x7LI0TqpOdS1LM01sMyMeqA2_1BL1HrNvT9W2zBMDTJW46GeKjYa9VD1z54Yb-glaTzz4SbxIvbblV6B6EUMQ",
          altText: "Hoodies",
        },
      ],
    },
  ];

  //function that get called when left or right button is clicked
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behaviour: "smooth",
    });
  };

  const updateScrollButtons = () => {
    console.log("here");
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      setCanScrollLeft(leftScroll > 0);

      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollRight(rightScrollable);
    }

    console.log({
      scrollLeft: container.scrollLeft,
      clientWidth: container.clientWidth,
      containerScrollWidth: container.scrollWidth,
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }
  });

  return (
    <section>
      <div className="container relative mx-auto mb-10 text-center">
        <h2 className="mb-8 text-lg text-gray-600">Explore New Arrivals</h2>
        <p className="mb-8 text-lg text-gray-600">
          Discove the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 border rounded ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 border rounded ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Contents */}
      <div
        ref={scrollRef}
        className="container relative flex mx-auto space-x-6 overflow-x-scroll"
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-opacity-50 rounded-b-lg backdrop-blur-md">
              <Link to={`/products/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1 text-black">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
