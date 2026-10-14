 

import { useState } from "react";
import { Menu, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";

export default function Navbar({ toggleSidebar }) {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-indigo-600 transition"
        >
          <Menu size={26} strokeWidth={2.5} />
        </button>

        <h1 className="text-lg md:text-xl font-semibold text-indigo-700 tracking-wide">
          INTEGRATED ELIGIBILITY SYSTEM
        </h1>
      </div>

      {/* Search */}
      <div className="hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-64 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          className="w-11 h-11 rounded-full overflow-hidden border border-gray-300 hover:border-indigo-500 transition"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <img
            src="/final-image.jpg"
            alt="User"
            className="w-full h-full object-cover"
          />
        </button>

        {openMenu && (
          <div className="absolute right-0 mt-3 w-48 bg-white shadow-md border rounded-lg py-2 z-50">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium text-gray-800">{user?.email}</p>
              <p className="text-xs text-gray-500">
                {user?.roleId === 1 ? "Administrator" : "Case Worker"}
              </p>
            </div>

            <Link
              to="/profile"
              onClick={() => setOpenMenu(false)}
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              <User size={18} /> My Profile
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
