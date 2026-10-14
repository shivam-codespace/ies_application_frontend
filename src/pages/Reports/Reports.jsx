import { useState } from "react";
import { getAllCitizensData } from "../../Services/Eligibility Services/eligibility-service";
import { toast } from "react-toastify";

export default function Reports() {
  const [filters, setFilters] = useState({
    caseNumber: "",
    reportType: "",
    fromDate: "",
    toDate: "",
    status: "",
  });
  const [reportData, setReportData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!filters.reportType) {
      toast.error("Please select a report type");
      return;
    }

    try {
      setLoading(true);
      const data = await getAllCitizensData();
      
      let filteredData = data;

      // Filter by case number
      if (filters.caseNumber) {
        filteredData = filteredData.filter(
          (item) => item.caseNo === parseInt(filters.caseNumber)
        );
      }

      // Filter by status
      if (filters.status) {
        filteredData = filteredData.filter(
          (item) => item.planStatus === filters.status
        );
      }

      // Filter by date range
      if (filters.fromDate && filters.toDate) {
        filteredData = filteredData.filter((item) => {
          if (!item.planStartDate) return false;
          const itemDate = new Date(item.planStartDate);
          const fromDate = new Date(filters.fromDate);
          const toDate = new Date(filters.toDate);
          return itemDate >= fromDate && itemDate <= toDate;
        });
      }

      setReportData(filteredData);
      setShowTable(true);
      
      if (filteredData.length === 0) {
        toast.info("No data found for the selected filters");
      } else {
        toast.success(`Report generated with ${filteredData.length} records`);
      }
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (reportData.length === 0) {
      toast.error("No data to download");
      return;
    }

    // Convert to CSV
    const headers = ["Case Number", "Plan Name", "Status", "Start Date", "End Date", "Benefit Amount"];
    const csvData = reportData.map((item) => [
      item.caseNo,
      item.planName,
      item.planStatus === "AP" ? "Approved" : item.planStatus === "DN" ? "Denied" : "Pending",
      item.planStartDate ? new Date(item.planStartDate).toLocaleDateString() : "N/A",
      item.planEndDate ? new Date(item.planEndDate).toLocaleDateString() : "N/A",
      item.benefitAmt || 0,
    ]);

    const csv = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filters.reportType}_report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    
    toast.success("Report downloaded successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Reports</h1>

      {/* Filter Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Report Type *
            </label>
            <select
              name="reportType"
              value={filters.reportType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Report Type</option>
              <option value="eligibility">Eligibility Report</option>
              <option value="benefit">Benefit Issuance Report</option>
              <option value="application">Application Report</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Case Number
            </label>
            <input
              type="text"
              name="caseNumber"
              value={filters.caseNumber}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Status</option>
              <option value="AP">Approved</option>
              <option value="DN">Denied</option>
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
            disabled={loading}
            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading ? "Generating..." : "Generate Report"}
          </button>
        </div>
      </form>

      {/* Reports Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : showTable && reportData.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Showing <strong>{reportData.length}</strong> record(s)
            </p>
            <button
              onClick={handleDownload}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Download Report (CSV)
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left">S.No</th>
                  <th className="border p-3 text-left">Case Number</th>
                  <th className="border p-3 text-left">Plan Name</th>
                  <th className="border p-3 text-left">Status</th>
                  <th className="border p-3 text-left">Start Date</th>
                  <th className="border p-3 text-left">End Date</th>
                  <th className="border p-3 text-left">Benefit Amount</th>
                  <th className="border p-3 text-left">Denial Reason</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-3">{index + 1}</td>
                    <td className="border p-3">{item.caseNo}</td>
                    <td className="border p-3">{item.planName}</td>
                    <td className={`border p-3 font-medium ${
                      item.planStatus === "AP" ? "text-green-600" : 
                      item.planStatus === "DN" ? "text-red-600" : "text-yellow-600"
                    }`}>
                      {item.planStatus === "AP" ? "Approved" : 
                       item.planStatus === "DN" ? "Denied" : "Pending"}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : showTable ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-600">No data found for the selected filters.</p>
        </div>
      ) : null}
    </div>
  );
}
