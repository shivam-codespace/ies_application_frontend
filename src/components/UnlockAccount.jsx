// import React, { useState } from "react";
// import { unlockAccount } from "../Services/Login+Unlock+Dashboard/auth-service";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function UnlockAccount() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     tempPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.newPassword !== formData.confirmPassword) {
//       toast.error("New Password and Confirm Password do not match!");
//       return;
//     }

//     try {
//       const response = await unlockAccount({
//         email: formData.email,
//         tempPwd: formData.tempPassword,
//         newPwd: formData.newPassword,
//       });

//       console.log("Unlock Response:", response);

//       if (response === "Account Unlocked Successfully") {
//         toast.success("Your account has been unlocked!");
//         navigate("/login");
//       } else {
//         toast.error(response || "Failed to unlock account");
//       }
//     } catch (error) {
//       toast.error("Something went wrong!");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md border border-gray-100">
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold text-purple-600">IES APP</h2>
//           <p className="text-gray-500 text-sm">Unlock Your Account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email ID"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
//             required
//           />

//           <input
//             type="password"
//             name="tempPassword"
//             placeholder="Enter Temporary Password"
//             value={formData.tempPassword}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
//             required
//           />

//           <input
//             type="password"
//             name="newPassword"
//             placeholder="Enter New Password"
//             value={formData.newPassword}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
//             required
//           />

//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm New Password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300"
//           >
//             Unlock Account
//           </button>
//         </form>

//         <div className="text-center mt-4">
//           <a href="/login" className="text-sm text-purple-600 hover:underline">
//             Back to Login
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

//RD CODED DATA

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { unlockAccount } from "../Services/Login+Unlock+Dashboard/auth-service";

export default function UnlockAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    tempPwd: "",
    newPwd: "",
    confirmPwd: "",
  });
  const [loading, setLoading] = useState(false);

  // Pre-fill email from session storage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("unlockEmail");
    if (storedEmail) {
      setFormData(prev => ({ ...prev, email: storedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.tempPwd || !formData.newPwd || !formData.confirmPwd) {
      toast.error("All fields are required!");
      return;
    }

    if (formData.newPwd !== formData.confirmPwd) {
      toast.error("New Password and Confirm Password do not match!");
      return;
    }

    if (formData.newPwd.length < 6) {
      toast.error("New password must be at least 6 characters!");
      return;
    }

    setLoading(true);

    try {
      const res = await unlockAccount(formData);
      
      if (res === "Account Unlocked" || res.includes("success")) {
        toast.success("Account unlocked successfully! Please login with your new password.");
        sessionStorage.removeItem("unlockEmail");
        navigate("/");
      } else if (res === "Invalid Temporary Password") {
        toast.error("Invalid temporary password. Please check your email.");
      } else if (res === "Account Not Found") {
        toast.error("Account not found. Please contact support.");
      } else {
        toast.error(res || "Failed to unlock account");
      }
    } catch (error) {
      console.error("Unlock error:", error);
      toast.error(error.response?.data || "Failed to unlock account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md border border-gray-100">
        {/*//// ✅ Logo / Title  */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-purple-600">IES APP</h2>
          <p className="text-gray-500 text-sm">Unlock Your Account</p>
        </div>

        {/*// ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Email ID"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="password"
            name="tempPwd"
            placeholder="Enter Temporary Password"
            value={formData.tempPwd}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="password"
            name="newPwd"
            placeholder="Enter New Password"
            value={formData.newPwd}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="password"
            name="confirmPwd"
            placeholder="Confirm New Password"
            value={formData.confirmPwd}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Unlocking..." : "Unlock Account"}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/login" className="text-sm text-purple-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
