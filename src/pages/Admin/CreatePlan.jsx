
import React  from "react";



// soft coded data
import { useState } from "react";
import { savePlan } from "../../Services/Plan Services/plan-services"; // ✅ use service for API
import { toast } from "react-toastify"; // ✅ for better notifications

export default function CreatePlan() {
  const [formData, setFormData] = useState({
    planName: "",
    planCategory: "",      // ✅ ADDED - Required by backend
    planStartDate: "",
    planEndDate: "",
    activeSw: "Y"          // ✅ ADDED - Default active status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await savePlan(formData); // ✅ delegate API call to service

      // ✅ show success notification
      toast.success(res || "Plan Created Successfully!");

      // ✅ reset form fields
      setFormData({
        planName: "",
        planCategory: "",
        planStartDate: "",
        planEndDate: "",
        activeSw: "Y"
      });
    } catch (err) {
      console.error("Error creating plan:", err);

      // ✅ show error notification
      toast.error(
        err.response?.data || "Plan creation failed! Please try again."
      );
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Plan</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Plan Name
          </label>
          <input
            type="text"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            placeholder="Enter plan name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
            required
          />
        </div>

        {/* ✅ ADDED: Plan Category Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Plan Category
          </label>
          <select
            name="planCategory"
            value={formData.planCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Medical">Medical</option>
            <option value="Cash">Cash</option>
            <option value="Housing">Housing</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Plan Start Date
          </label>
          <input
            type="date"
            name="planStartDate"
            value={formData.planStartDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Plan End Date
          </label>
          <input
            type="date"
            name="planEndDate"
            value={formData.planEndDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
            required
          />
        </div>

        <div className="col-span-2 flex justify-start mt-4">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}




//    HARD CODED DATA

// export default function CreatePlan() {
//   const [formData, setFormData] = useState({
//     planName: "",
//     planStartDate: "",
//     planEndDate: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Plan Created:", formData);
//     alert("Plan Created Successfully!");
//     setFormData({ planName: "", planStartDate: "", planEndDate: "" });
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-md max-w-4xl mx-auto mt-8">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Plan</h2>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Plan Name</label>
//           <input
//             type="text"
//             name="planName"
//             value={formData.planName}
//             onChange={handleChange}
//             placeholder="Enter plan name"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Plan Start Date</label>
//           <input
//             type="date"
//             name="planStartDate"
//             value={formData.planStartDate}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Plan End Date</label>
//           <input
//             type="date"
//             name="planEndDate"
//             value={formData.planEndDate}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
//             required
//           />
//         </div>

//         <div className="col-span-2 flex justify-start mt-4">
//           <button
//             type="submit"
//             className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-all"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
