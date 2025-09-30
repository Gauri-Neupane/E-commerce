import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../redux/slices/adminProductSlice"; 
import { useDispatch } from "react-redux"; 

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/150?random=1",
      },
      {
        url: "https://picsum.photos/150?random=2",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  dispatch(updateProduct({ id, productData }))
    .unwrap()
    .then(() => {
      alert("✅ Product updated successfully");
      navigate("/admin/products");
    })
    .catch((err) => {
      alert("❌ Failed to update product: " + err);
    });
};

  return (
    <div className="max-w-5xl p-6 mx-auto rounded-md shadow-md">
      <h2 className="mb-6 text-3xl font-bold">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Count In stock */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="object-cover w-20 h-20 rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};
export default EditProductPage;
