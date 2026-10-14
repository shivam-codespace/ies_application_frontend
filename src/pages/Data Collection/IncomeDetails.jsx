import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CASE_KEY,
  getErrorMessage,
  getSummary,
  saveIncome,
} from "../../Services/Data Collection Service/dc-service";

export default function IncomeDetails() {
  const navigate = useNavigate();
  const caseNumber = sessionStorage.getItem(CASE_KEY) || "";
  const [formData, setFormData] = useState({
    monthlySalaryIncome: "",
    rentIncome: "",
    propertyIncome: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!caseNumber) {
      toast.error("Please select a case in Plan Selection first.");
      navigate("/plan-selection");
      return;
    }
    // Prefill previously saved income so re-saving edits instead of starting over
    getSummary(caseNumber)
      .then((data) => {
        const income = data?.income;
        if (income) {
          setFormData({
            monthlySalaryIncome: income.monthlySalaryIncome ?? "",
            rentIncome: income.rentIncome ?? "",
            propertyIncome: income.propertyIncome ?? "",
          });
        }
      })
      .catch((err) => console.error("Error loading saved income:", err));
  }, [caseNumber, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      caseNo: parseInt(caseNumber, 10),
      monthlySalaryIncome: parseFloat(formData.monthlySalaryIncome) || 0.0,
      rentIncome: parseFloat(formData.rentIncome) || 0.0,
      propertyIncome: parseFloat(formData.propertyIncome) || 0.0,
    };

    try {
      const response = await saveIncome(requestData);
      toast.success(response || "Income details saved successfully");
      navigate("/education-details");
    } catch (error) {
      console.error("Error saving income:", error);
      toast.error(getErrorMessage(error, "Failed to save income details"));
    } finally {
      setLoading(false);
    }
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
            value={caseNumber}
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
              min="0"
              step="0.01"
              name="monthlySalaryIncome"
              value={formData.monthlySalaryIncome}
              onChange={handleChange}
              placeholder="Enter monthly income"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Rent Income
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
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
            min="0"
            step="0.01"
            name="propertyIncome"
            value={formData.propertyIncome}
            onChange={handleChange}
            placeholder="Enter property income"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/plan-selection")}
            className="border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-lg"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save & Continue ➜"}
          </button>
        </div>
      </form>
    </div>
  );
}
