import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  createProduct,
  deleteProduct,
} from "../../redux/slices/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  // form data
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    countInStock: "",
    category: "",
    collections: "General", // required field in schema
    description: "",
    imageUrl: "",
  });

  const productsPerPage = 5;

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // create product
  const handleCreate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("You must be logged in as admin.");
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      countInStock: Number(formData.countInStock),
      sku: formData.sku,
      category: formData.category,
      collections: formData.collections,
      sizes: ["M"], // backend expects an array
      colors: ["Black"], // backend expects an array
      images: [{ url: formData.imageUrl }], // backend expects an array of objects
    };

    dispatch(createProduct(productData)).then(() => {
      setShowForm(false);
      setFormData({
        name: "",
        sku: "",
        price: "",
        countInStock: "",
        category: "",
        collections: "General",
        description: "",
        imageUrl: "",
      });
      dispatch(fetchAdminProducts()); // refresh list
    });
  };

  // delete product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id)).then(() => dispatch(fetchAdminProducts()));
    }
  };

  // pagination
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <h2 className="mb-6 text-2xl font-bold flex justify-between items-center">
        Product Management
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          + Add Product
        </button>
      </h2>

      {/* Add Product Form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="p-4 mb-6 border rounded-md shadow-sm bg-gray-50"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={formData.sku}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="countInStock"
              placeholder="Stock Count"
              value={formData.countInStock}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="collections"
              placeholder="Collections"
              value={formData.collections}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mt-4 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Save Product
          </button>
        </form>
      )}

      {/* Products Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">{product.sku}</td>
                    <td className="p-4">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 text-center text-gray-500"
                  >
                    No Products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
