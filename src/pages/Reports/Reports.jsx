import { useState } from "react";

export default function Reports() {
  const [filters, setFilters] = useState({
    caseNumber: "",
    reportType: "",
    fromDate: "",
    toDate: "",
  });
  const [showTable, setShowTable] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filters.caseNumber.trim() && filters.reportType) {
      setShowTable(true);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Reports</h1>

      {/* Filter Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Case Number
            </label>
            <input
              type="text"
              name="caseNumber"
              value={filters.caseNumber}
              onChange={handleChange}
              placeholder="Enter Case Number"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Report Type
            </label>
            <select
              name="reportType"
              value={filters.reportType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Report Type</option>
              <option value="eligibility">Eligibility Report</option>
              <option value="benefit">Benefit Issuance Report</option>
              <option value="payment">Payment Report</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Generate Report
          </button>
        </div>
      </form>

      {/* Reports Table */}
      {showTable && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Showing <strong>1 to 3</strong> of <strong>3</strong> entries
            </p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              Download Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left">S.No</th>
                  <th className="border p-3 text-left">Report Type</th>
                  <th className="border p-3 text-left">Generated Date</th>
                  <th className="border p-3 text-left">Case Number</th>
                  <th className="border p-3 text-left">Plan Name</th>
                  <th className="border p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border p-3">1</td>
                  <td className="border p-3">Eligibility Report</td>
                  <td className="border p-3">05/11/2025</td>
                  <td className="border p-3">CASE12345</td>
                  <td className="border p-3">SNAP</td>
                  <td className="border p-3 text-green-600 font-medium">Approved</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border p-3">2</td>
                  <td className="border p-3">Benefit Issuance</td>
                  <td className="border p-3">05/11/2025</td>
                  <td className="border p-3">CASE67890</td>
                  <td className="border p-3">CCAP</td>
                  <td className="border p-3 text-yellow-600 font-medium">Pending</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border p-3">3</td>
                  <td className="border p-3">Payment Report</td>
                  <td className="border p-3">05/11/2025</td>
                  <td className="border p-3">CASE24680</td>
                  <td className="border p-3">Medicare</td>
                  <td className="border p-3 text-red-600 font-medium">Denied</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
