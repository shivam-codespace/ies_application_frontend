
import React, { useState } from "react";

export default function IncomeDetails() {
  const [formData, setFormData] = useState({
    caseNumber: "123456",
    monthlyIncome: "",
    rentIncome: "",
    propertyIncome: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Income Details Submitted:
    Case Number: ${formData.caseNumber}
    Monthly Salary: ${formData.monthlyIncome}
    Rent Income: ${formData.rentIncome}
    Property Income: ${formData.propertyIncome}`);
    setFormData({
      ...formData,
      monthlyIncome: "",
      rentIncome: "",
      propertyIncome: "",
    });
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Income Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Case Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Case Number
          </label>
          <input
            type="text"
            name="caseNumber"
            value={formData.caseNumber}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Monthly Salary & Rent Income */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Monthly Salary Income
            </label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              placeholder="Enter monthly income"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Rent Income
            </label>
            <input
              type="number"
              name="rentIncome"
              value={formData.rentIncome}
              onChange={handleChange}
              placeholder="Enter rent income"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Property Income */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Property Income
          </label>
          <input
            type="number"
            name="propertyIncome"
            value={formData.propertyIncome}
            onChange={handleChange}
            placeholder="Enter property income"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
