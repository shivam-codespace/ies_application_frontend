import React, { useState } from "react";
import { sendOtp } from "../Services/Forget Password/forget-password"; // Your API call to send OTP

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // Handle change in email input
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission to send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is provided
    if (!email) {
      setMessage("Email is required.");
      return;
    }

    setLoading(true);
    setMessage(""); // Clear previous messages
    setSent(false);

    try {
      // Backend emails a new temporary password and returns a confirmation message
      const response = await sendOtp(email);
      setSent(true);
      setMessage(response || "Temporary password sent to your email.");
      sessionStorage.setItem("unlockEmail", email);
    } catch (error) {
      console.error("Error sending temporary password:", error);
      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md border border-gray-100">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-600">IES APP</h2>
          <p className="text-gray-500 text-sm">Password Recovery</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* Message */}
          {message && (
            <p
              className={`text-sm font-medium ${
                sent ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
              {sent && (
                <>
                  {" "}
                  <a href="/unlock" className="text-indigo-600 hover:underline">
                    Set a new password
                  </a>
                </>
              )}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300 disabled:bg-gray-400"
          >
            {loading ? "Sending..." : "Send Temporary Password"}
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-4">
          <a href="/" className="text-sm text-indigo-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
