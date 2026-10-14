import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllCitizensData } from "../../Services/Eligibility Services/eligibility-service";
import { toast } from "react-toastify";
import { createNotice } from "../../Services/Correspondence Services/correspondence-service";

export default function BenefitIssuance() {
  const { user } = useSelector((state) => state.auth);
  const [caseNumber, setCaseNumber] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [allBenefits, setAllBenefits] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("single"); // "single" or "all"

  const isAdmin = user?.roleId === 1;

  useEffect(() => {
    if (isAdmin && viewMode === "all") {
      fetchAllBenefits();
    }
  }, [viewMode]);

  const fetchAllBenefits = async () => {
    try {
      setLoading(true);
      const data = await getAllCitizensData();
      // Filter only approved cases with benefits
      const benefitData = data.filter(
        (item) => item.planStatus === "AP" && item.benefitAmt
      );
      setAllBenefits(benefitData || []);
      setShowTable(true);
    } catch (error) {
      console.error("Error fetching benefits:", error);
      toast.error("Failed to load benefits data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!caseNumber.trim()) {
      toast.error("Please enter a case number");
      return;
    }

    try {
      setLoading(true);
      const data = await getAllCitizensData();
      const caseData = data.filter(
        (item) => item.caseNo === parseInt(caseNumber)
      );
      
      if (caseData.length > 0) {
        setBenefits(caseData);
        setShowTable(true);
      } else {
        toast.info("No benefits found for this case number");
        setBenefits([]);
      }
    } catch (error) {
      console.error("Error fetching benefits:", error);
      toast.error("Failed to load benefit details");
    } finally {
      setLoading(false);
    }
  };

  const displayData = viewMode === "single" ? benefits : allBenefits;

  // Queue a pending notice for each case shown; they're sent from Pending Notices
  const handleGenerateNotices = async (rows) => {
    const caseNos = [...new Set(rows.map((item) => item.caseNo).filter(Boolean))];
    const results = await Promise.allSettled(caseNos.map((caseNo) => createNotice(caseNo)));
    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length === 0) {
      toast.success(`${caseNos.length} notice(s) queued. Send them from Pending Notices.`);
    } else {
      const reason = failed[0].reason?.response?.data;
      toast.error(`${failed.length} of ${caseNos.length} failed${typeof reason === "string" ? `: ${reason}` : ""}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">
        {isAdmin ? "Benefit Issuance Management" : "My Benefits"}
      </h1>

      {/* View Mode Toggle (Admin Only) */}
      {isAdmin && (
        <div className="mb-4 flex gap-4">
          <button
            onClick={() => setViewMode("single")}
            className={`px-4 py-2 rounded-md ${
              viewMode === "single"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Search by Case Number
          </button>
          <button
            onClick={() => setViewMode("all")}
            className={`px-4 py-2 rounded-md ${
              viewMode === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            View All Benefits
          </button>
        </div>
      )}

      {/* Case Number Form */}
      {viewMode === "single" && (
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
            disabled={loading}
            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading ? "Loading..." : "View Benefit Details"}
          </button>
        </form>
      )}

      {/* Results Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : showTable && displayData.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Showing <strong>{displayData.length}</strong> benefit(s)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left">S.No</th>
                  <th className="border p-3 text-left">Case Number</th>
                  <th className="border p-3 text-left">Plan Name</th>
                  <th className="border p-3 text-left">Start Date</th>
                  <th className="border p-3 text-left">End Date</th>
                  <th className="border p-3 text-left">Benefit Amount</th>
                  <th className="border p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-3">{index + 1}</td>
                    <td className="border p-3">{item.caseNo}</td>
                    <td className="border p-3">{item.planName}</td>
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
                    <td className="border p-3 font-medium text-green-600">
                      ${item.benefitAmt || 0}
                    </td>
                    <td className="border p-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Approved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <button
              onClick={() => handleGenerateNotices(displayData)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Generate Notice
            </button>
          </div>
        </div>
      ) : showTable ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-600">No benefits found.</p>
        </div>
      ) : null}
    </div>
  );
}
