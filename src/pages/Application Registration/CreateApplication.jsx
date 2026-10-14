import { useState } from "react";
import { toast } from "react-toastify";
import { createApp } from "../../Services/Application Services/app-service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateApplication() {
  const navigate = useNavigate();
  
  // ✅ Get userId from Redux
  const { user } = useSelector((state) => state.auth);
  
  // ✅ Fixed field names to match backend DTO
  const [formData, setFormData] = useState({
    fullname: "",      // ✅ Changed from fullName
    email: "",
    phno: "",          // ✅ Changed from mobileNo
    gender: "Male",
    dob: "",
    ssn: "",
    userId: user?.userId || null  // ✅ Added userId
  });

  const [loading, setLoading] = useState(false);  // ✅ Added loading state

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate userId exists
    if (!formData.userId) {
      toast.error("User not logged in. Please login first.");
      navigate("/");
      return;
    }

    // ✅ Validate SSN format
    if (!/^\d{9}$/.test(formData.ssn)) {
      toast.error("SSN must be exactly 9 digits");
      return;
    }

    // ✅ Validate phone format
    if (!/^\d{10}$/.test(formData.phno)) {
      toast.error("Mobile number must be exactly 10 digits");
      return;
    }

    setLoading(true);

    try {
      const res = await createApp(formData);

      // ✅ Check for specific error messages
      if (typeof res === 'string' && res.includes("Invalid SSN")) {
        toast.error("Invalid SSN. Only Rhode Island residents are eligible.");
        return;
      }

      if (typeof res === 'string' && res.includes("User Not Found")) {
        toast.error("User not found. Please login again.");
        navigate("/");
        return;
      }

      toast.success(res || "Application created successfully!");

      setFormData({
        fullname: "",
        email: "",
        phno: "",
        gender: "Male",
        dob: "",
        ssn: "",
        userId: user?.userId
      });

      setTimeout(() => navigate("/view-application"), 1500);
    } catch (err) {
      console.error("Error creating application:", err);
      const data = err.response?.data;
      toast.error(
        (typeof data === "string" && data) ||
          data?.exDesc ||
          "Failed to create application! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Create Application
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email ID
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="text"
            name="phno"
            value={formData.phno}
            onChange={handleChange}
            placeholder="Enter mobile number"
            maxLength="10"
            pattern="\d{10}"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              <span>Male</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              <span>Female</span>
            </label>
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* SSN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SSN
          </label>
          <input
            type="text"
            name="ssn"
            value={formData.ssn}
            onChange={handleChange}
            placeholder="Enter SSN"
            maxLength="9"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg shadow disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}



// import { useState } from "react";
// import { toast } from "react-toastify";
// import { createApp } from "../../Services/Application Services/app-service";
// import { useNavigate } from "react-router-dom"; // optional: for redirecting after success

// export default function CreateApplication() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     gender: "Male",
//     dob: "",
//     ssn: "",
//   });

//   const navigate = useNavigate();

//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await createApp(formData);

//       toast.success(res?.message || "Application created successfully!");

//       {/* // ✅ Reset form */}
//       setFormData({
//         fullName: "",
//         email: "",
//         mobile: "",
//         gender: "Male",
//         dob: "",
//         ssn: "",
//       });

//       // ✅ Optional: navigate to view page
//       setTimeout(() => navigate("/view-apps"), 1500);
//     } catch (err) {
//       console.error("Error creating application:", err);
//       toast.error(
//         err.response?.data?.message ||
//           "Failed to create application! Please try again."
//       );
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-md max-w-5xl mx-auto mt-8">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//         Create Application
//       </h2>

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       >
//         // Full Name 
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Enter full name"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             required
//           />
//         </div>

//         // Email 
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email ID
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter email"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             required
//           />
//         </div>

//         // Mobile Number 
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Mobile Number
//           </label>
//           <input
//             type="text"
//             name="mobile"
//             value={formData.mobile}
//             onChange={handleChange}
//             placeholder="Enter mobile number"
//             maxLength="10"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             required
//           />
//         </div>

//         // Gender 
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Gender
//           </label>
//           <div className="flex items-center gap-4 mt-2">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="gender"
//                 value="Male"
//                 checked={formData.gender === "Male"}
//                 onChange={handleChange}
//               />
//               <span>Male</span>
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="gender"
//                 value="Female"
//                 checked={formData.gender === "Female"}
//                 onChange={handleChange}
//               />
//               <span>Female</span>
//             </label>
//           </div>
//         </div>

//         // DOB 
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Date of Birth
//           </label>
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             required
//           />
//         </div>

//         //  SSN 
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             SSN
//           </label>
//           <input
//             type="text"
//             name="ssn"
//             value={formData.ssn}
//             onChange={handleChange}
//             placeholder="Enter SSN"
//             maxLength="9"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             required
//           />
//         </div>

//         // Submit Button 
//         <div className="md:col-span-2 flex justify-center mt-4">
//           <button
//             type="submit"
//             className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg shadow"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }






// // Hard coded data 

// import React, { useState } from "react";

// export default function CreateApplication() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     gender: "Male",
//     dob: "",
//     ssn: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Application Submitted:", formData);
//     alert("Application submitted successfully!");
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-md max-w-5xl mx-auto mt-8">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//         Create Application
//       </h2>

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       >
//         // Full Name 
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Enter full name"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             required
//           />
//         </div>

//         // Email 
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email ID
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter email"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             required
//           />
//         </div>

//         // Mobile Number 
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Mobile Number
//           </label>
//           <input
//             type="text"
//             name="mobile"
//             value={formData.mobile}
//             onChange={handleChange}
//             placeholder="Enter mobile number"
//             maxLength="10"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             required
//           />
//         </div>

//         // Gender 
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Gender
//           </label>
//           <div className="flex items-center gap-4 mt-2">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="gender"
//                 value="Male"
//                 checked={formData.gender === "Male"}
//                 onChange={handleChange}
//               />
//               <span>Male</span>
//             </label>
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="gender"
//                 value="Female"
//                 checked={formData.gender === "Female"}
//                 onChange={handleChange}
//               />
//               <span>Female</span>
//             </label>
//           </div>
//         </div>

//         // Date of Birth 
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             DOB
//           </label>
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             required
//           />
//         </div>

//         // SSN 
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             SSN
//           </label>
//           <input
//             type="text"
//             name="ssn"
//             value={formData.ssn}
//             onChange={handleChange}
//             placeholder="Enter SSN"
//             maxLength="9"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             required
//           />
//         </div>

//         // Submit 
//         <div className="md:col-span-2 flex justify-center mt-4">
//           <button
//             type="submit"
//             className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg shadow"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

 