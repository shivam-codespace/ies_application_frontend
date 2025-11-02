import React, { useState } from "react";

export default function DetermineEligibility() {
  const [caseNumber, setCaseNumber] = useState("");
  const [showTable, setShowTable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (caseNumber.trim()) {
      setShowTable(true);
    } else {
      alert("Please enter a valid case number!");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Eligibility Determination
      </h1>

      {/* Case Number Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200"
      >
        <div className="mb-4">
          <label
            htmlFor="caseNumber"
            className="block text-gray-700 font-medium mb-2"
          >
            Case Number
          </label>
          <input
            id="caseNumber"
            type="text"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            placeholder="Enter Case Number"
            className="w-full md:w-1/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Determine Eligibility
        </button>
      </form>

      {/* Conditional Results Table */}
      {showTable && (
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          {/* Table Info */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Showing <strong>1 to 3</strong> of <strong>3</strong> entries
            </p>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-gray-700">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="border p-3 text-left">S.No</th>
                  <th className="border p-3 text-left">Plan Name</th>
                  <th className="border p-3 text-left">Plan Status</th>
                  <th className="border p-3 text-left">Start Date</th>
                  <th className="border p-3 text-left">End Date</th>
                  <th className="border p-3 text-left">Benefit Amount</th>
                  <th className="border p-3 text-left">Denial Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border p-3">1</td>
                  <td className="border p-3">SNAP</td>
                  <td className="border p-3 text-green-600 font-semibold">
                    Approved
                  </td>
                  <td className="border p-3">12/08/2021</td>
                  <td className="border p-3">30/12/2021</td>
                  <td className="border p-3">$350.00</td>
                  <td className="border p-3">NA</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border p-3">2</td>
                  <td className="border p-3">CCAP</td>
                  <td className="border p-3 text-green-600 font-semibold">
                    Approved
                  </td>
                  <td className="border p-3">12/08/2021</td>
                  <td className="border p-3">30/12/2021</td>
                  <td className="border p-3">$250.00</td>
                  <td className="border p-3">NA</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border p-3">3</td>
                  <td className="border p-3">Medicare</td>
                  <td className="border p-3 text-red-600 font-semibold">
                    Denied
                  </td>
                  <td className="border p-3">NA</td>
                  <td className="border p-3">NA</td>
                  <td className="border p-3">NA</td>
                  <td className="border p-3">Age Condition Failed</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Generate Correspondence Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => alert("Correspondence generated successfully!")}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Generate Correspondence
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
