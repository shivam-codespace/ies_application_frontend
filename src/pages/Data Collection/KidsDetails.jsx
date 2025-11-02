import React, { useState } from "react";

const KidsDetails = () => {
  const [kids, setKids] = useState([
    { name: "", age: "", school: "" },
  ]);

  const handleChange = (index, e) => {
    const updatedKids = [...kids];
    updatedKids[index][e.target.name] = e.target.value;
    setKids(updatedKids);
  };

  const addKid = () => {
    setKids([...kids, { name: "", age: "", school: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Kids Details Submitted:", kids);
  };

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Kids Details
      </h2>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Case Number
              </label>
              <input
                type="text"
                value="123456"
                disabled
                className="bg-gray-100 w-full p-2 border rounded-md"
              />
            </div>

            {/* Dynamic Kid Inputs */}
            {kids.map((kid, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <h3 className="font-semibold text-gray-700 mb-4">
                  Kid {index + 1} Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={kid.name}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter child name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={kid.age}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter age"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      School Name
                    </label>
                    <input
                      type="text"
                      name="school"
                      value={kid.school}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter school name"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add Kid Button */}
            <div className="flex justify-start mt-4">
              <button
                type="button"
                onClick={addKid}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition"
              >
                + Add Another Kid
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KidsDetails;
