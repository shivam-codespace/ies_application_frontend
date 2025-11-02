
import { useState } from "react";
import { Edit2, Trash2, X } from "lucide-react";

export default function ViewAccount() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@gmail.com",
      mobile: "1234567890",
      gender: "Male",
      ssn: "12345",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      mobile: "9876543210",
      gender: "Female",
      ssn: "67890",
    },
  ]);

  const handleEdit = (id) => {
    alert(`Edit Account ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this account?")) {
      setAccounts(accounts.filter((acc) => acc.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">View Account</h2>

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
            className="border rounded p-1 text-sm"
          />
        </div>
      </div>

      <table className="min-w-full border text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">S.No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Mobile Number</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">SSN</th>
            <th className="border px-4 py-2">Edit</th>
            <th className="border px-4 py-2">Delete</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc, i) => (
            <tr key={acc.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{acc.name}</td>
              <td className="border px-4 py-2">{acc.email}</td>
              <td className="border px-4 py-2">{acc.mobile}</td>
              <td className="border px-4 py-2">{acc.gender}</td>
              <td className="border px-4 py-2">{acc.ssn}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleEdit(acc.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                >
                  <Edit2 size={16} />
                </button>
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(acc.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </td>
              <td className="border px-4 py-2 text-center">
                <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded">
                  <X size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
