import { useState } from "react";
import { Eye } from "lucide-react"; // icon for viewing notices

export default function HistoryNotices() {
  const [data] = useState([
    {
      id: 1,
      caseNumber: "7654321",
      planName: "SNAP",
      planStatus: "Approved",
      startDate: "12/08/2021",
      endDate: "30/12/2021",
      benefitAmount: "$350.00",
    },
    {
      id: 2,
      caseNumber: "7654322",
      planName: "CCAP",
      planStatus: "Denied",
      startDate: "N/A",
      endDate: "N/A",
      benefitAmount: "N/A",
    },
    {
      id: 3,
      caseNumber: "7654323",
      planName: "Medicare",
      planStatus: "Approved",
      startDate: "01/02/2022",
      endDate: "30/12/2022",
      benefitAmount: "$250.00",
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">History Notices</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            Show
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            entries
          </div>

          <div>
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">S.No</th>
                <th className="border p-3 text-left">Case Number</th>
                <th className="border p-3 text-left">Plan Name</th>
                <th className="border p-3 text-left">Plan Status</th>
                <th className="border p-3 text-left">Start Date</th>
                <th className="border p-3 text-left">End Date</th>
                <th className="border p-3 text-left">Benefit Amount</th>
                <th className="border p-3 text-center">View Notice</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{item.caseNumber}</td>
                  <td className="border p-3">{item.planName}</td>
                  <td
                    className={`border p-3 font-medium ${
                      item.planStatus === "Approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.planStatus}
                  </td>
                  <td className="border p-3">{item.startDate}</td>
                  <td className="border p-3">{item.endDate}</td>
                  <td className="border p-3">{item.benefitAmount}</td>
                  <td className="border p-3 text-center">
                    <button className="bg-indigo-100 text-indigo-700 rounded-full p-2 hover:bg-indigo-200 transition">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <p>
            Showing <strong>1 to {data.length}</strong> of{" "}
            <strong>{data.length}</strong> entries
          </p>
          <div className="flex gap-2">
            <button className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">
              Previous
            </button>
            <button className="border border-gray-300 px-3 py-1 rounded bg-indigo-50 border-indigo-300 hover:bg-indigo-100">
              1
            </button>
            <button className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
