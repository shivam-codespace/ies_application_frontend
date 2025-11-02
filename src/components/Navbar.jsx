// src/components/Navbar.jsx
import { Menu } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* ✅ Menu Button (always visible, can hide conditionally if you want later) */}
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <Menu size={28} strokeWidth={2.5} />
        </button>

        {/* ✅ Logo */}
        <h1 className="text-xl font-bold text-red-600">INTEGRATED ELIGIBILITY SYSTEM </h1>
      </div>

      {/* ✅ Search bar (visible only on md+ screens) */}
      <div className="hidden md:block">
        <input
          type="text"
          placeholder="Search Dashboard"
          className="border rounded-md px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* ✅ Profile icon */}
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>
    </nav>
  );
}
