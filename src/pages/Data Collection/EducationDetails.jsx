import React, { useState } from "react";

const EducationDetails = () => {
  const [formData, setFormData] = useState({
    caseNumber: "123456",
    highestDegree: "Masters",
    gradYear: "2020",
    university: "StanFord",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Education Details
      </h2>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Case Number
            </label>
            <input
              type="text"
              name="caseNumber"
              value={formData.caseNumber}
              disabled
              className="bg-gray-100 w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Graduation Year
            </label>
            <input
              type="text"
              name="gradYear"
              value={formData.gradYear}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Highest Degree
            </label>
            <select
              name="highestDegree"
              value={formData.highestDegree}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              University
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationDetails;
