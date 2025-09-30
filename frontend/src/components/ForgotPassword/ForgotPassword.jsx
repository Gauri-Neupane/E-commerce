import { useState } from "react";
import axios from "axios";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // 👈 NEW

  const handleSendOtp = async () => {
    setLoading(true); // start loading
    setMessage("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/forgot-password`,
        { email }
      );
      setMessage(res.data.message);
      setStep(2); // move to OTP/password step
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false); // stop loading
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/reset-password`,
        { email, otp, newPassword }
      );
      setMessage(res.data.message);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-4 text-xl font-bold">Forgot Password</h2>

        {/* STEP 1: Enter email */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full p-2 text-white bg-black rounded disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2: Enter OTP + new password */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full p-2 text-white bg-black rounded disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {/* Message */}
        {message && (
          <p className="mt-4 text-sm text-center text-gray-600">{message}</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
