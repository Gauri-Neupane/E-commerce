import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

//cart contents receives cart, user id and guest id as a props
const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();
  // Handle adding or substracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-4 border-b"
        >
          <div className="flex items-center">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-20 h-24 mr-4 rounded"
            />

            <div className="ml-4">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">
                {product.size} | {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="px-2 py-1 text-xl font-medium border rounded"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="px-2 py-1 text-xl font-medium border rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-medium">${product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
            >
              <RiDeleteBin3Line className="w-6 h-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
