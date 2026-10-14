import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CASE_KEY,
  getErrorMessage,
  getSummary,
} from "../../Services/Data Collection Service/dc-service";

const Field = ({ label, value }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input
      type="text"
      value={value ?? "N/A"}
      disabled
      className="bg-gray-100 w-full p-2 border rounded-md"
    />
  </div>
);

const Section = ({ title, editPath, navigate, children }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <button
        onClick={() => navigate(editPath)}
        className="text-indigo-600 text-sm hover:underline"
      >
        Edit
      </button>
    </div>
    {children}
  </div>
);

const Missing = ({ text }) => (
  <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
    {text}
  </p>
);

const money = (value) => `$${value ?? 0}`;

const SummaryScreen = () => {
  const navigate = useNavigate();
  const caseNumber = sessionStorage.getItem(CASE_KEY) || "";
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!caseNumber) {
      toast.error("No case number found. Please start from Plan Selection.");
      navigate("/plan-selection");
      return;
    }

    getSummary(caseNumber)
      .then((data) => setSummaryData(data))
      .catch((error) => {
        console.error("Error fetching summary:", error);
        toast.error(getErrorMessage(error, "Failed to load summary data"));
      })
      .finally(() => setLoading(false));
  }, [caseNumber, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 font-semibold">No summary data found.</p>
        <button
          onClick={() => navigate("/plan-selection")}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Start Data Collection
        </button>
      </div>
    );
  }

  const { planSelection, income, education, childs = [] } = summaryData;
  // Plan, income and education are required before eligibility can be determined
  const isComplete = Boolean(planSelection && income && education);

  const handleConfirm = () => {
    toast.success("Data Collection Completed! Proceed to Eligibility Determination.");
    navigate("/determine-eligibility");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Summary Screen
      </h2>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <div className="mb-6">
          <Field label="Case Number" value={summaryData.caseNo ?? caseNumber} />
        </div>

        <Section title="Plan Selection" editPath="/plan-selection" navigate={navigate}>
          {planSelection ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Plan Name" value={planSelection.planName} />
            </div>
          ) : (
            <Missing text="No plan selected yet." />
          )}
        </Section>

        <Section title="Income Details" editPath="/income-details" navigate={navigate}>
          {income ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Monthly Salary" value={money(income.monthlySalaryIncome)} />
              <Field label="Rent Income" value={money(income.rentIncome)} />
              <Field label="Property Income" value={money(income.propertyIncome)} />
            </div>
          ) : (
            <Missing text="Income details not entered yet." />
          )}
        </Section>

        <Section title="Education Details" editPath="/education-details" navigate={navigate}>
          {education ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Highest Degree" value={education.highestDegree} />
              <Field label="Graduation Year" value={education.graduationYear} />
              <Field label="University" value={education.universityName} />
            </div>
          ) : (
            <Missing text="Education details not entered yet." />
          )}
        </Section>

        <Section title="Kids Details" editPath="/kids-details" navigate={navigate}>
          {childs.length > 0 ? (
            childs.map((kid, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 border border-gray-200 p-3 rounded-lg bg-gray-50"
              >
                <Field label="Name" value={kid.kidName} />
                <Field label="Age" value={kid.kidAge} />
                <Field label="SSN" value={kid.kidSSN} />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No kids recorded.</p>
          )}
        </Section>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleConfirm}
            disabled={!isComplete}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Confirm & Submit
          </button>
          {!isComplete && (
            <p className="text-sm text-gray-500">
              Complete plan, income and education details to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryScreen;
