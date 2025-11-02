import { useState } from "react";
import { Printer } from "lucide-react"; // uses lucide-react icon

export default function Correspondence() {
  const [data] = useState([
    {
      id: 1,
      caseNumber: "7567657",
      planName: "SNAP",
      planStatus: "Approved",
      startDate: "20/10/2021",
      endDate: "20/12/2022",
      benefitAmount: "$100.00",
    },
    {
      id: 2,
      caseNumber: "7567657",
      planName: "CCAP",
      planStatus: "Denied",
      startDate: "N/A",
      endDate: "N/A",
      benefitAmount: "N/A",
    },
  ]);

  const handlePrint = (item) => {
    alert(`Printing notice for Case #${item.caseNumber} (${item.planName})`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">View Notices</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Table Header */}
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
                <th className="border p-3 text-left">Print Notice</th>
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
                    <button
                      onClick={() => handlePrint(item)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md transition"
                      title="Print Notice"
                    >
                      <Printer size={18} />
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
            <button className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 bg-indigo-50 border-indigo-300">
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
