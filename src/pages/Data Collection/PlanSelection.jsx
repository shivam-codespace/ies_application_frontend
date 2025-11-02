
import React, { useState } from "react";

export default function PlanSelection() {
  const [caseNumber, setCaseNumber] = useState("");
  const [planName, setPlanName] = useState("");

  const plans = ["SNAP", "CCAP", "Medicaid", "Medicare", "QHP", "RIW"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caseNumber || !planName) {
      alert("Please fill all required fields.");
      return;
    }
    alert(`Plan Selected:\nCase Number: ${caseNumber}\nPlan: ${planName}`);
    setCaseNumber("");
    setPlanName("");
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Plan Selection
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Case Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Case Number
          </label>
          <input
            type="text"
            placeholder="Enter case number"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Plan Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Plan Name
          </label>
          <select
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Plan</option>
            {plans.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
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
