
import React, { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";

export default function ViewPlans() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      planName: "SNAP",
      planStartDate: "2021-09-20",
      planEndDate: "2021-12-20",
      category: "Food",
      isActive: true,
    },
    {
      id: 2,
      planName: "CCAP",
      planStartDate: "2021-09-20",
      planEndDate: "2021-12-20",
      category: "Child Care",
      isActive: true,
    },
    {
      id: 3,
      planName: "NJW",
      planStartDate: "2021-09-20",
      planEndDate: "2021-12-20",
      category: "UnEmployment",
      isActive: false,
    },
    {
      id: 4,
      planName: "Medicare",
      planStartDate: "2021-09-20",
      planEndDate: "2021-12-20",
      category: "Health",
      isActive: true,
    },
  ]);

  const toggleActive = (id) => {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === id ? { ...plan, isActive: !plan.isActive } : plan
      )
    );
  };

  const deletePlan = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans((prev) => prev.filter((plan) => plan.id !== id));
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">View Plan</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-4 text-left">S.No</th>
              <th className="py-3 px-4 text-left">Plan Name</th>
              <th className="py-3 px-4 text-left">Plan Start Date</th>
              <th className="py-3 px-4 text-left">Plan End Date</th>
              <th className="py-3 px-4 text-left">Plan Category</th>
              <th className="py-3 px-4 text-center">Edit</th>
              <th className="py-3 px-4 text-center">Delete</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {plans.map((plan, index) => (
              <tr
                key={plan.id}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{plan.planName}</td>
                <td className="py-3 px-4">{plan.planStartDate}</td>
                <td className="py-3 px-4">{plan.planEndDate}</td>
                <td className="py-3 px-4">{plan.category}</td>

                <td className="py-3 px-4 text-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2">
                    <Pencil size={16} />
                  </button>
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => deletePlan(plan.id)}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => toggleActive(plan.id)}
                    className={`${
                      plan.isActive
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 hover:bg-gray-500"
                    } text-white rounded-lg p-2`}
                  >
                    {plan.isActive ? <Check size={16} /> : <X size={16} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
