
import React from "react";

export default function LoginForm() {
    
  return (
    <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center border border-gray-100">
      {/* ✅ Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="https://ashokit.in/assets/images/logo.png"
          alt="Ashok IT Logo"
          className="h-12"
        />
      </div>

      {/* ✅ Input fields */}
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Enter Email Id"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        {/* ✅ Sign In button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-semibold rounded-lg py-2 hover:bg-indigo-600 transition-all"
        >
          Sign In
        </button>
      </form>

      {/* ✅ Forgot password */}
      <div className="mt-4">
        <a
          href="#"
          className="text-sm text-indigo-500 hover:underline"
        >
          Forgot Password?
        </a>
      </div>
    </div>
  );
}
