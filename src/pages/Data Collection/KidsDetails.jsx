import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CASE_KEY,
  getErrorMessage,
  getSummary,
  saveChilds,
} from "../../Services/Data Collection Service/dc-service";

const emptyKid = () => ({ kidName: "", kidAge: "", kidSSN: "" });

const KidsDetails = () => {
  const navigate = useNavigate();
  const caseNumber = sessionStorage.getItem(CASE_KEY) || "";
  const [kids, setKids] = useState([emptyKid()]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!caseNumber) {
      toast.error("Please select a case in Plan Selection first.");
      navigate("/plan-selection");
      return;
    }
    // Prefill previously saved children
    getSummary(caseNumber)
      .then((data) => {
        const saved = data?.childs || [];
        if (saved.length > 0) {
          setKids(
            saved.map((k) => ({
              kidName: k.kidName || "",
              kidAge: k.kidAge ?? "",
              kidSSN: k.kidSSN != null ? String(k.kidSSN) : "",
            }))
          );
        }
      })
      .catch((err) => console.error("Error loading saved kids:", err));
  }, [caseNumber, navigate]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setKids((prev) =>
      prev.map((kid, i) => (i === index ? { ...kid, [name]: value } : kid))
    );
  };

  const addKid = () => setKids((prev) => [...prev, emptyKid()]);

  const removeKid = (index) =>
    setKids((prev) => prev.filter((_, i) => i !== index));

  const submit = async (kidList) => {
    setLoading(true);
    try {
      const response = await saveChilds({
        caseNo: parseInt(caseNumber, 10),
        child: kidList.map((kid) => ({
          kidName: kid.kidName.trim(),
          kidAge: parseInt(kid.kidAge, 10),
          kidSSN: parseInt(kid.kidSSN, 10),
        })),
      });
      toast.success(response || "Kids details saved successfully");
      navigate("/summary-screen");
    } catch (error) {
      console.error("Error saving kids details:", error);
      toast.error(getErrorMessage(error, "Failed to save kids details"));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const invalid = kids.some(
      (kid) =>
        !kid.kidName.trim() ||
        kid.kidAge === "" ||
        Number(kid.kidAge) < 0 ||
        !/^\d{9}$/.test(kid.kidSSN)
    );
    if (invalid) {
      toast.error("Each kid needs a name, a valid age and a 9-digit SSN");
      return;
    }
    submit(kids);
  };

  return (
    <div className="p-6">
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
                value={caseNumber}
                disabled
                className="bg-gray-100 w-full p-2 border rounded-md"
              />
            </div>

            {kids.map((kid, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">
                    Kid {index + 1} Details
                  </h3>
                  {kids.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeKid(index)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Kid Name
                    </label>
                    <input
                      type="text"
                      name="kidName"
                      value={kid.kidName}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter child name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Kid Age
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="kidAge"
                      value={kid.kidAge}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter age"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Kid SSN
                    </label>
                    <input
                      type="text"
                      name="kidSSN"
                      value={kid.kidSSN}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter SSN (9 digits)"
                      maxLength="9"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-start gap-3">
              <button
                type="button"
                onClick={addKid}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition"
              >
                + Add Another Kid
              </button>
              <button
                type="button"
                onClick={() => submit([])}
                disabled={loading}
                className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md disabled:text-gray-400"
              >
                No Kids – Skip
              </button>
            </div>

            <div className="flex justify-between mt-2">
              <button
                type="button"
                onClick={() => navigate("/education-details")}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default KidsDetails;
