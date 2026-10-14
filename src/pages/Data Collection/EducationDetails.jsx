import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CASE_KEY,
  getErrorMessage,
  getSummary,
  saveEducation,
} from "../../Services/Data Collection Service/dc-service";

const EducationDetails = () => {
  const navigate = useNavigate();
  const caseNumber = sessionStorage.getItem(CASE_KEY) || "";
  const [formData, setFormData] = useState({
    highestDegree: "",
    graduationYear: "",
    universityName: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!caseNumber) {
      toast.error("Please select a case in Plan Selection first.");
      navigate("/plan-selection");
      return;
    }
    // Prefill previously saved education details
    getSummary(caseNumber)
      .then((data) => {
        const edu = data?.education;
        if (edu) {
          setFormData({
            highestDegree: edu.highestDegree || "",
            graduationYear: edu.graduationYear || "",
            universityName: edu.universityName || "",
          });
        }
      })
      .catch((err) => console.error("Error loading saved education:", err));
  }, [caseNumber, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{4}$/.test(formData.graduationYear)) {
      toast.error("Graduation year must be a 4-digit year");
      return;
    }

    setLoading(true);
    try {
      const response = await saveEducation({
        caseNo: parseInt(caseNumber, 10),
        ...formData,
      });
      toast.success(response || "Education details saved successfully");
      navigate("/kids-details");
    } catch (error) {
      console.error("Error saving education:", error);
      toast.error(getErrorMessage(error, "Failed to save education details"));
    } finally {
      setLoading(false);
    }
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
              value={caseNumber}
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
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              placeholder="e.g., 2020"
              maxLength="4"
              className="w-full p-2 border rounded-md"
              required
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
              className="w-full p-2 border rounded-md bg-white"
              required
            >
              <option value="">Select Degree</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              University Name
            </label>
            <input
              type="text"
              name="universityName"
              value={formData.universityName}
              onChange={handleChange}
              placeholder="Enter university name"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/income-details")}
              className="border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-md"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save & Continue ➜"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationDetails;
