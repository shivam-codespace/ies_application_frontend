import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  CASE_KEY,
  getErrorMessage,
  getPlanNames,
  getSummary,
  saveSelectedPlan,
} from "../../Services/Data Collection Service/dc-service";
import { getAppsByUser } from "../../Services/Application Services/app-service";

export default function PlanSelection() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [caseNumber, setCaseNumber] = useState(
    () => sessionStorage.getItem(CASE_KEY) || ""
  );
  const [cases, setCases] = useState([]);
  const [planName, setPlanName] = useState("");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cases come from AR: admins get every application, caseworkers their own
  useEffect(() => {
    if (!user?.userId) return;
    getAppsByUser(user.userId)
      .then((data) => setCases(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error loading cases:", err);
        toast.error("Failed to load applications");
      });
  }, [user?.userId]);

  useEffect(() => {
    getPlanNames()
      .then((data) => setPlans(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Error loading plans:", err);
        toast.error(getErrorMessage(err, "Failed to load plans"));
      });
  }, []);

  // Show the plan already chosen for this case, if any
  useEffect(() => {
    if (!caseNumber) {
      setPlanName("");
      return;
    }
    getSummary(caseNumber)
      .then((data) => setPlanName(data?.planSelection?.planName || ""))
      .catch(() => setPlanName(""));
  }, [caseNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caseNumber || !planName) {
      toast.error("Please select a case and a plan");
      return;
    }

    setLoading(true);
    try {
      const response = await saveSelectedPlan({
        caseNo: parseInt(caseNumber, 10),
        planName,
      });
      sessionStorage.setItem(CASE_KEY, caseNumber);
      toast.success(response || "Plan selected successfully");
      navigate("/income-details");
    } catch (error) {
      console.error("Error saving plan:", error);
      toast.error(getErrorMessage(error, "Failed to save plan"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Plan Selection
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Case Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Case Number
          </label>
          <select
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Case</option>
            {cases.map((app) => (
              <option key={app.caseNum} value={String(app.caseNum)}>
                {app.caseNum} — {app.fullname}
              </option>
            ))}
          </select>
        </div>

        {/* Plan Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Plan Name
          </label>
          <select
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Select Plan</option>
            {plans.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save & Continue ➜"}
        </button>
      </form>
    </div>
  );
}
