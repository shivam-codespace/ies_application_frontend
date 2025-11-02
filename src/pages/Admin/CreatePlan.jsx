
import React, { useState } from "react";

export default function CreatePlan() {
  const [formData, setFormData] = useState({
    planName: "",
    planStartDate: "",
    planEndDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Plan Created:", formData);
    alert("Plan Created Successfully!");
    setFormData({ planName: "", planStartDate: "", planEndDate: "" });
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Plan</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Plan Name</label>
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

        <div>
          <label className="block text-gray-700 font-medium mb-2">Plan Start Date</label>
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
          <label className="block text-gray-700 font-medium mb-2">Plan End Date</label>
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
