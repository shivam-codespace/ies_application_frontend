import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getAppsByUser,
  filterApps,
  getAppByCaseNum,
  updateAppStatus,
} from "../../Services/Application Services/app-service";
import { toast } from "react-toastify";

const STATUS_STYLES = {
  APPROVED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  DENIED: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status }) => {
  const value = status || "PENDING";
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        STATUS_STYLES[value] || "bg-gray-100 text-gray-700"
      }`}
    >
      {value}
    </span>
  );
};

const errorMessage = (error, fallback) => {
  const data = error.response?.data;
  return (typeof data === "string" && data) || data?.exDesc || fallback;
};

const formatDate = (dob) => (dob ? new Date(dob).toLocaleDateString() : "N/A");

export default function ViewApplication() {
  const { user } = useSelector((state) => state.auth);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [updatingCaseNum, setUpdatingCaseNum] = useState(null);

  const isAdmin = user?.roleId === 1;

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.userId) {
        toast.error("User not logged in!");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Admin sees all applications (filtered on the server), others only their own
        const data = isAdmin
          ? await filterApps(statusFilter)
          : await getAppsByUser(user.userId);

        // 204 No Content comes back as an empty string
        setApplications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error(errorMessage(error, "Failed to load applications"));
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isAdmin, user?.userId, statusFilter]);

  const handleViewDetails = async (caseNum) => {
    try {
      const data = await getAppByCaseNum(caseNum);
      setSelectedApp(data);
    } catch (error) {
      console.error("Error fetching application:", error);
      toast.error(
        error.response?.status === 404
          ? "Application not found"
          : errorMessage(error, "Failed to load application details")
      );
    }
  };

  const handleUpdateStatus = async (caseNum, status) => {
    try {
      setUpdatingCaseNum(caseNum);
      const msg = await updateAppStatus(caseNum, status);
      toast.success(msg || `Application ${status.toLowerCase()}`);

      setApplications((prev) =>
        prev
          .map((app) => (app.caseNum === caseNum ? { ...app, status } : app))
          // Drop rows that no longer match the active filter
          .filter((app) => !statusFilter || app.status === statusFilter)
      );
      setSelectedApp((prev) =>
        prev && prev.caseNum === caseNum ? { ...prev, status } : prev
      );
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(errorMessage(error, "Failed to update status"));
    } finally {
      setUpdatingCaseNum(null);
    }
  };

  const term = search.toLowerCase();
  const filteredData = applications.filter(
    (app) =>
      (app.fullname?.toLowerCase().includes(term) ||
        app.email?.toLowerCase().includes(term) ||
        String(app.phno ?? "").includes(search) ||
        String(app.caseNum ?? "").includes(search)) &&
      // Non-admins filter locally; admins are already filtered by the server
      (isAdmin || !statusFilter || (app.status || "PENDING") === statusFilter)
  );

  const canDecide = (app) => isAdmin && (app.status || "PENDING") === "PENDING";

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {isAdmin ? "All Applications" : "My Applications"}
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="🔍 Search by case no., name, email or mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="DENIED">Denied</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium">Case No.</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Full Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Email</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Mobile</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Gender</th>
                <th className="py-3 px-4 text-left text-sm font-medium">DOB</th>
                <th className="py-3 px-4 text-left text-sm font-medium">SSN</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((app) => (
                  <tr
                    key={app.caseNum}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 text-sm">{app.caseNum}</td>
                    <td className="py-3 px-4 text-sm">{app.fullname}</td>
                    <td className="py-3 px-4 text-sm">{app.email}</td>
                    <td className="py-3 px-4 text-sm">{app.phno ?? "N/A"}</td>
                    <td className="py-3 px-4 text-sm">{app.gender}</td>
                    <td className="py-3 px-4 text-sm">{formatDate(app.dob)}</td>
                    <td className="py-3 px-4 text-sm">{app.ssn}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="py-3 px-4 text-sm whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetails(app.caseNum)}
                        className="text-indigo-600 hover:underline mr-3"
                      >
                        View
                      </button>
                      {canDecide(app) && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(app.caseNum, "APPROVED")}
                            disabled={updatingCaseNum === app.caseNum}
                            className="text-green-600 hover:underline mr-3 disabled:text-gray-400"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(app.caseNum, "DENIED")}
                            disabled={updatingCaseNum === app.caseNum}
                            className="text-red-600 hover:underline disabled:text-gray-400"
                          >
                            Deny
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-4 text-gray-500 text-sm"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Details Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Case #{selectedApp.caseNum}
              </h3>
              <StatusBadge status={selectedApp.status} />
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <dt className="text-gray-500">Full Name</dt>
              <dd className="text-gray-800">{selectedApp.fullname}</dd>
              <dt className="text-gray-500">Email</dt>
              <dd className="text-gray-800 break-all">{selectedApp.email}</dd>
              <dt className="text-gray-500">Mobile</dt>
              <dd className="text-gray-800">{selectedApp.phno ?? "N/A"}</dd>
              <dt className="text-gray-500">Gender</dt>
              <dd className="text-gray-800">{selectedApp.gender}</dd>
              <dt className="text-gray-500">Date of Birth</dt>
              <dd className="text-gray-800">{formatDate(selectedApp.dob)}</dd>
              <dt className="text-gray-500">SSN</dt>
              <dd className="text-gray-800">{selectedApp.ssn}</dd>
            </dl>

            <div className="flex justify-end gap-3 mt-6">
              {canDecide(selectedApp) && (
                <>
                  <button
                    onClick={() => handleUpdateStatus(selectedApp.caseNum, "APPROVED")}
                    disabled={updatingCaseNum === selectedApp.caseNum}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedApp.caseNum, "DENIED")}
                    disabled={updatingCaseNum === selectedApp.caseNum}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
                  >
                    Deny
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedApp(null)}
                className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
