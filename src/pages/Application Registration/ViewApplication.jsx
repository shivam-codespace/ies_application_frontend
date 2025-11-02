
import React, { useState } from "react";

export default function ViewApplication() {
  const [search, setSearch] = useState("");

  // Sample Data (you can replace this with backend data later)
  const applications = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john.doe@example.com",
      mobile: "9876543210",
      gender: "Male",
      dob: "1996-05-15",
      status: "Approved",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      mobile: "9123456780",
      gender: "Female",
      dob: "1999-11-20",
      status: "Pending",
    },
    {
      id: 3,
      fullName: "Robert Lee",
      email: "robert.lee@example.com",
      mobile: "9871112222",
      gender: "Male",
      dob: "1994-02-10",
      status: "Rejected",
    },
  ];

  const filteredData = applications.filter(
    (app) =>
      app.fullName.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.mobile.includes(search)
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        View Applications
      </h2>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="🔍 Search by name, email or mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium">ID</th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Full Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">Email</th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Mobile
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Gender
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium">DOB</th>
              <th className="py-3 px-4 text-left text-sm font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((app) => (
                <tr
                  key={app.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-sm">{app.id}</td>
                  <td className="py-3 px-4 text-sm">{app.fullName}</td>
                  <td className="py-3 px-4 text-sm">{app.email}</td>
                  <td className="py-3 px-4 text-sm">{app.mobile}</td>
                  <td className="py-3 px-4 text-sm">{app.gender}</td>
                  <td className="py-3 px-4 text-sm">{app.dob}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 text-sm"
                >
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
