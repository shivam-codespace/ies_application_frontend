import { useState, useEffect } from "react";
import { Printer } from "lucide-react";
import { getAllCitizensData } from "../../Services/Eligibility Services/eligibility-service";
import { toast } from "react-toastify";
import {
  downloadCorrespondencePdf,
  getErrorMessage,
} from "../../Services/Correspondence Services/correspondence-service";

export default function Correspondence() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      // Fetch eligibility data which contains notice information
      const citizensData = await getAllCitizensData();
      // Filter only approved or denied cases (not pending)
      const noticeData = citizensData.filter(
        (item) => item.planStatus === "AP" || item.planStatus === "DN"
      );
      setData(noticeData || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
      toast.error("Failed to load correspondence data");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async (item) => {
    try {
      await downloadCorrespondencePdf(item.caseNo);
    } catch (error) {
      console.error("Error downloading notice:", error);
      toast.error(await getErrorMessage(error, "Failed to download notice"));
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.caseNo?.toString().includes(searchTerm) ||
      item.planName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">View Notices</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Search */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            Total Notices: <strong>{filteredData.length}</strong>
          </p>
          <input
            type="text"
            placeholder="Search by case number or plan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
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
                  <th className="border p-3 text-left">Denial Reason</th>
                  <th className="border p-3 text-left">Print Notice</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-3">{index + 1}</td>
                      <td className="border p-3">{item.caseNo}</td>
                      <td className="border p-3">{item.planName}</td>
                      <td
                        className={`border p-3 font-medium ${
                          item.planStatus === "AP"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.planStatus === "AP" ? "Approved" : "Denied"}
                      </td>
                      <td className="border p-3">
                        {item.planStartDate
                          ? new Date(item.planStartDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="border p-3">
                        {item.planEndDate
                          ? new Date(item.planEndDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="border p-3">
                        {item.benefitAmt ? `$${item.benefitAmt}` : "N/A"}
                      </td>
                      <td className="border p-3">{item.denialReason || "N/A"}</td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      No notices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
