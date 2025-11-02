import React from "react";

const SummaryScreen = () => {
  // Dummy summary data (replace later with actual data or props)
  const summaryData = {
    caseNumber: "123456",
    planName: "Medicaid",
    income: {
      monthlySalary: "30,000",
      rentIncome: "10,000",
      propertyIncome: "30,000",
    },
    education: {
      highestDegree: "Masters",
      graduationYear: "2020",
      university: "Stanford",
    },
    kids: [
      { name: "Aarav", age: "8", school: "Delhi Public School" },
      { name: "Mia", age: "5", school: "Little Scholars" },
    ],
  };

  const handleConfirm = () => {
    console.log("Final Application Submitted:", summaryData);
    alert("Application Submitted Successfully!");
  };

  return (
    <div className="p-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Summary Screen
      </h2>

      <div className="bg-white shadow-md rounded-2xl p-6">
        {/* Case Number */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Case Number
          </label>
          <input
            type="text"
            value={summaryData.caseNumber}
            disabled
            className="bg-gray-100 w-full p-2 border rounded-md"
          />
        </div>

        {/* Plan Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Plan Selection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Plan Name
              </label>
              <input
                type="text"
                value={summaryData.planName}
                disabled
                className="bg-gray-100 w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Income Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Income Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={`Monthly Salary: ₹${summaryData.income.monthlySalary}`}
              disabled
              className="bg-gray-100 p-2 border rounded-md"
            />
            <input
              type="text"
              value={`Rent Income: ₹${summaryData.income.rentIncome}`}
              disabled
              className="bg-gray-100 p-2 border rounded-md"
            />
            <input
              type="text"
              value={`Property Income: ₹${summaryData.income.propertyIncome}`}
              disabled
              className="bg-gray-100 p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Education Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Education Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={`Degree: ${summaryData.education.highestDegree}`}
              disabled
              className="bg-gray-100 p-2 border rounded-md"
            />
            <input
              type="text"
              value={`Year: ${summaryData.education.graduationYear}`}
              disabled
              className="bg-gray-100 p-2 border rounded-md"
            />
            <input
              type="text"
              value={`University: ${summaryData.education.university}`}
              disabled
              className="bg-gray-100 p-2 border rounded-md"
            />
          </div>
        </div>

        {/* Kids Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Kids Details
          </h3>
          {summaryData.kids.map((kid, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 border border-gray-200 p-3 rounded-lg bg-gray-50"
            >
              <input
                type="text"
                value={`Name: ${kid.name}`}
                disabled
                className="bg-gray-100 p-2 border rounded-md"
              />
              <input
                type="text"
                value={`Age: ${kid.age}`}
                disabled
                className="bg-gray-100 p-2 border rounded-md"
              />
              <input
                type="text"
                value={`School: ${kid.school}`}
                disabled
                className="bg-gray-100 p-2 border rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center">
          <button
            onClick={handleConfirm}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryScreen;
