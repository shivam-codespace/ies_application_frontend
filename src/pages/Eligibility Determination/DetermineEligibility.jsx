import React, { useState, useEffect } from "react";
import { checkEligibility, getAllCitizensData } from "../../Services/Eligibility Services/eligibility-service";
import { toast } from "react-toastify";
import { createNotice } from "../../Services/Correspondence Services/correspondence-service";
import { useSelector } from "react-redux";

export default function DetermineEligibility() {
  const { user } = useSelector((state) => state.auth);
  const [caseNumber, setCaseNumber] = useState("");
  const [eligibilityData, setEligibilityData] = useState(null);
  const [allCitizens, setAllCitizens] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("single"); // "single" or "all"

  // Load case number from sessionStorage if coming from data collection
  useEffect(() => {
    const storedCase = sessionStorage.getItem("caseNumber");
    if (storedCase) {
      setCaseNumber(storedCase);
    }
  }, []);

  // Fetch all citizens data for admin
  useEffect(() => {
    if (user?.roleId === 1 && viewMode === "all") {
      fetchAllCitizens();
    }
  }, [viewMode]);

  const fetchAllCitizens = async () => {
    try {
      setLoading(true);
      const data = await getAllCitizensData();
      setAllCitizens(data || []);
    } catch (error) {
      console.error("Error fetching citizens data:", error);
      toast.error("Failed to load citizens data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!caseNumber.trim()) {
      toast.error("Please enter a valid case number!");
      return;
    }

    setLoading(true);

    try {
      // Backend returns the stored determination for this case
      const result = await checkEligibility(caseNumber);
      setEligibilityData([result]);
      setShowTable(true);

      if (result.planStatus === "AP") {
        toast.success(`Case ${result.caseNo}: Approved for ${result.planName}`);
      } else {
        toast.warn(`Case ${result.caseNo}: Denied (${result.denialReason || "criteria not met"})`);
      }
    } catch (error) {
      console.error("Error checking eligibility:", error);
      // 400/404 carry a plain-text reason, e.g. "No plan selected for case number 12"
      const data = error.response?.data;
      toast.error((typeof data === "string" && data) || "Failed to determine eligibility");
    } finally {
      setLoading(false);
    }
  };

  const displayData = viewMode === "single" ? eligibilityData : allCitizens;

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
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Eligibility Determination
      </h1>

      {/* View Mode Toggle (Admin Only) */}
      {user?.roleId === 1 && (
        <div className="mb-4 flex gap-4">
          <button
            onClick={() => setViewMode("single")}
            className={`px-4 py-2 rounded-md ${
              viewMode === "single"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Check Single Case
          </button>
          <button
            onClick={() => setViewMode("all")}
            className={`px-4 py-2 rounded-md ${
              viewMode === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            View All Citizens
          </button>
        </div>
      )}

      {/* Case Number Form */}
      {viewMode === "single" && (
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
            disabled={loading}
            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading ? "Checking..." : "Determine Eligibility"}
          </button>
        </form>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {/* Results Table */}
      {!loading && (showTable || viewMode === "all") && displayData && displayData.length > 0 && (
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Showing <strong>{displayData.length}</strong> entries
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-gray-700">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="border p-3 text-left">S.No</th>
                  <th className="border p-3 text-left">Case Number</th>
                  <th className="border p-3 text-left">Plan Name</th>
                  <th className="border p-3 text-left">Plan Status</th>
                  <th className="border p-3 text-left">Start Date</th>
                  <th className="border p-3 text-left">End Date</th>
                  <th className="border p-3 text-left">Benefit Amount</th>
                  <th className="border p-3 text-left">Denial Reason</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-3">{index + 1}</td>
                    <td className="border p-3">{item.caseNo || "N/A"}</td>
                    <td className="border p-3">{item.planName || "N/A"}</td>
                    <td className={`border p-3 font-semibold ${
                      item.planStatus === "Approved" || item.planStatus === "AP"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}>
                      {item.planStatus === "AP" || item.planStatus === "Approved"
                        ? "Approved"
                        : item.planStatus === "DN" || item.planStatus === "Denied"
                        ? "Denied"
                        : "Pending"}
                    </td>
                    <td className="border p-3">
                      {item.planStartDate ? new Date(item.planStartDate).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="border p-3">
                      {item.planEndDate ? new Date(item.planEndDate).toLocaleDateString() : "N/A"}
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

          {/* Generate Correspondence Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => handleGenerateNotices(displayData)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Generate Correspondence
            </button>
          </div>
        </div>
      )}

      {/* No Data Message */}
      {!loading && showTable && (!displayData || displayData.length === 0) && (
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 text-center">
          <p className="text-gray-600">No eligibility data found for this case number.</p>
        </div>
      )}
    </div>
  );
}
