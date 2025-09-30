import { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  // 🔹 State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default
  });

  const token = localStorage.getItem("userToken");

  // 🔹 Fetch users on load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  // 🔹 Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Add new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers([...users, data.user]);
      setFormData({ name: "", email: "", password: "", role: "customer" });
    } catch (err) {
      alert(err.response?.data?.message || "Error creating user");
    }
  };

  // 🔹 Update user role
  const handleRoleChange = async (userId, newRole) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((u) => (u._id === userId ? data.user : u)));
    } catch (err) {
      alert("Error updating role");
    }
  };

  // 🔹 Delete user
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(users.filter((u) => u._id !== userId));
      } catch (err) {
        alert("Error deleting user");
      }
    }
  };

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <h2 className="mb-6 text-2xl font-bold">User Management</h2>
      {/* Add New User Form */}
      <div className="p-6 mb-6 rounded-lg">
        <h3 className="mb-4 text-lg font-bold">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>

      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserManagement;
