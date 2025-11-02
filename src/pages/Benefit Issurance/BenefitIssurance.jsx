import { useState } from "react";

export default function BenefitIssuance() {
  const [caseNumber, setCaseNumber] = useState("");
  const [showTable, setShowTable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (caseNumber.trim()) {
      setShowTable(true);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Benefit Issuance</h1>

      {/* Case Number Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Case Number
          </label>
          <input
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
          View Benefit Details
        </button>
      </form>

      {/* Results Table */}
      {showTable && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Showing <strong>1 to 3</strong> of <strong>3</strong> entries
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left">S.No</th>
                  <th className="border p-3 text-left">Plan Name</th>
                  <th className="border p-3 text-left">Issued Date</th>
                  <th className="border p-3 text-left">Benefit Amount</th>
                  <th className="border p-3 text-left">Payment Mode</th>
                  <th className="border p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border p-3">1</td>
                  <td className="border p-3">SNAP</td>
                  <td className="border p-3">15/08/2021</td>
                  <td className="border p-3">$350.00</td>
                  <td className="border p-3">Direct Deposit</td>
                  <td className="border p-3 text-green-600 font-medium">Completed</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border p-3">2</td>
                  <td className="border p-3">CCAP</td>
                  <td className="border p-3">20/08/2021</td>
                  <td className="border p-3">$250.00</td>
                  <td className="border p-3">Check</td>
                  <td className="border p-3 text-yellow-600 font-medium">Pending</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border p-3">3</td>
                  <td className="border p-3">Medicare</td>
                  <td className="border p-3">NA</td>
                  <td className="border p-3">NA</td>
                  <td className="border p-3">NA</td>
                  <td className="border p-3 text-red-600 font-medium">Denied</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition">
              Generate Notice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
