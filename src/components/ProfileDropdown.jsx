import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none hover:bg-gray-100 p-1 rounded-lg"
      >
        <img
          src="/user-avatar.png"
          alt="User"
          className="w-9 h-9 rounded-full border"
        />
        <span className="font-medium text-gray-700 hidden md:block">John</span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border z-50 p-4">
          <div className="flex items-center space-x-3 border-b pb-3 mb-3">
            <img
              src="/user-avatar.png"
              alt="Profile"
              className="w-12 h-12 rounded-full border"
            />
            <div>
              <p className="font-semibold text-gray-800">John Doe</p>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
            </div>
          </div>

          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <User size={18} className="mr-2" /> Profile
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <LogOut size={18} className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
