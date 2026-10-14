 //  Soft coded data

import { useEffect, useState } from "react";
import {
  getUsers,
  updateUserStatus,
} from "../../Services/User Account Services/user-service";
import { toast } from "react-toastify";


export default function ViewAccount() {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    getUsers()
      .then((res) => {
        console.log("users", res);
        setAccounts(res || []);
      })
      .catch(() => {
        toast.error("Failed to load user accounts!");
      });
  };



  // ✅ Toggle user Active/Inactive
  const toggleUserStatus = (userId, currentActiveSw) => {
    const newActiveSw = currentActiveSw === "Y" ? "N" : "Y";

    updateUserStatus(userId, newActiveSw)
      .then(() => {
        setAccounts((prev) =>
          prev.map((acc) =>
            acc.userId === userId
              ? { ...acc, activeSw: newActiveSw }
              : acc
          )
        );

        toast.success(
          `User ${newActiveSw === "Y" ? "Activated" : "Deactivated"}!`
        );
      })
      .catch(() => toast.error("Failed to update status!"));
  };

  // ✅ Search filter
  const filteredAccounts = accounts.filter((acc) =>
    Object.values(acc).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">View Accounts</h2>

      {/* Search + Entry Controls */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="text-sm text-gray-600 mr-2">Show</label>
          <select className="border rounded p-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="ml-2 text-sm text-gray-600">entries</span>
        </div>

        <div>
          <label className="text-sm text-gray-600 mr-2">Search:</label>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-1 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">S.No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Mobile</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">SSN</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((acc, i) => (
              <tr key={acc.userId} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{i + 1}</td>
                <td className="border px-4 py-2">{acc.fullName}</td>
                <td className="border px-4 py-2">{acc.email}</td>
                <td className="border px-4 py-2">{acc.mobileNo}</td>
                <td className="border px-4 py-2">{acc.gender}</td>
                <td className="border px-4 py-2">{acc.ssn}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      acc.activeSw === "Y"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {acc.activeSw === "Y" ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() =>
                      toggleUserStatus(acc.userId, acc.activeSw)
                    }
                    className={`${
                      acc.activeSw === "Y"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white px-4 py-2 rounded-md text-sm font-medium transition-all`}
                  >
                    {acc.activeSw === "Y" ? "Lock Account" : "Unlock Account"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="10"
                className="text-center text-gray-500 py-4 border"
              >
                No accounts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
