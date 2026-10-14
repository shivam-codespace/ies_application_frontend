import { useEffect, useState } from "react";
import { Eye } from "lucide-react"; // icon for viewing notices
import { toast } from "react-toastify";
import {
  getNotices,
  downloadNoticePdf,
  getErrorMessage,
} from "../../Services/Correspondence Services/correspondence-service";

const statusLabel = (s) => (s === "AP" ? "Approved" : s === "DN" ? "Denied" : "N/A");
const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "N/A");

export default function HistoryNotices() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        setData(await getNotices("C"));
      } catch (error) {
        console.error("Error loading notice history:", error);
        toast.error(await getErrorMessage(error, "Failed to load notice history"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleView = async (item) => {
    try {
      await downloadNoticePdf(item.noticeId, item.caseNo);
    } catch (error) {
      console.error("Error downloading notice:", error);
      toast.error(await getErrorMessage(error, "Failed to download notice"));
    }
  };

  const filtered = data.filter(
    (item) =>
      item.caseNo?.toString().includes(searchTerm) ||
      item.planName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.citizenName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const rows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">History Notices</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            Show
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            entries
          </div>

          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <table className="min-w-full border border-gray-200 text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left">S.No</th>
                  <th className="border p-3 text-left">Case Number</th>
                  <th className="border p-3 text-left">Citizen</th>
                  <th className="border p-3 text-left">Plan Name</th>
                  <th className="border p-3 text-left">Plan Status</th>
                  <th className="border p-3 text-left">Start Date</th>
                  <th className="border p-3 text-left">End Date</th>
                  <th className="border p-3 text-left">Benefit Amount</th>
                  <th className="border p-3 text-left">Sent On</th>
                  <th className="border p-3 text-left">Emailed</th>
                  <th className="border p-3 text-center">View Notice</th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows.map((item, index) => (
                    <tr key={item.noticeId} className="hover:bg-gray-50">
                      <td className="border p-3">{(currentPage - 1) * pageSize + index + 1}</td>
                      <td className="border p-3">{item.caseNo}</td>
                      <td className="border p-3">{item.citizenName || "N/A"}</td>
                      <td className="border p-3">{item.planName || "N/A"}</td>
                      <td
                        className={`border p-3 font-medium ${
                          item.planStatus === "AP" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {statusLabel(item.planStatus)}
                      </td>
                      <td className="border p-3">{formatDate(item.planStartDate)}</td>
                      <td className="border p-3">{formatDate(item.planEndDate)}</td>
                      <td className="border p-3">{item.benefitAmt ? `$${item.benefitAmt}` : "N/A"}</td>
                      <td className="border p-3">{formatDate(item.printDate)}</td>
                      <td className="border p-3">{item.emailSent ? "Yes" : "No"}</td>
                      <td className="border p-3 text-center">
                        <button
                          onClick={() => handleView(item)}
                          title="Download notice PDF"
                          className="inline-flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full p-2 hover:bg-indigo-200"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center text-gray-500 py-4 border">
                      No notices sent yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <p>
            Showing <strong>{rows.length}</strong> of <strong>{filtered.length}</strong> entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="border px-3 py-1 rounded bg-indigo-50 border-indigo-300">
              {currentPage} / {pageCount}
            </span>
            <button
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage >= pageCount}
              className="border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
