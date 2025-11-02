import { useState } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Import Router components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/Admin/CreateAccount"; // Example route page
import ViewAccount from "./pages/Admin/ViewAccount";
import CreatePlan from "./pages/Admin/CreatePlan";
import ViewPlans from "./pages/Admin/ViewPlans";
import CreateApplication from "./pages/Application Registration/CreateApplication";
import ViewApplication from "./pages/Application Registration/ViewApplication";
import PlanSelection from "./pages/Data Collection/PlanSelection";
import IncomeDetails from "./pages/Data Collection/IncomeDetails";
import EducationDetails from "./pages/Data Collection/EducationDetails";
import KidsDetails from "./pages/Data Collection/KidsDetails";
import SummaryScreen from "./pages/Data Collection/SummaryScreen";
import DetermineEligibility from "./pages/Eligibility Determination/DetermineEligibility";
import Correspondence from "./pages/Correspondence/Correspondence";
import PendingNotices from "./pages/Correspondence/PendingNotices";
import HistoryNotices from "./pages/Correspondence/HistoryNotices";
import BenefitIssuance from "./pages/Benefit Issurance/BenefitIssurance";
import Reports from "./pages/Reports/Reports";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* ✅ Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {/* ✅ Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* ✅ Page Routes */}
        <main className="flex-1 p-4">
          <Routes>
            
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/view-account" element={<ViewAccount/>}/>
            <Route path="/create-plan" element={<CreatePlan/>}/>
            <Route path="/view-plan" element={<ViewPlans/>}/>
            <Route path="/create-application" element={<CreateApplication/>}/>
            <Route path="/view-application" element={<ViewApplication />} />
            <Route path="/plan-selection" element={<PlanSelection />} />
            <Route path="/income-details" element={<IncomeDetails />} />
            <Route path="/education-details" element={<EducationDetails />} />
            <Route path="/kids-details" element={<KidsDetails />} />
            <Route path="/summary-screen" element={<SummaryScreen />} />
            <Route path="/determine-eligibility" element={<DetermineEligibility />} />
            <Route path="/correspondence" element={<Correspondence />} />
            <Route path="/pending-notices" element={<PendingNotices />} />
            <Route path="/history-notices" element={<HistoryNotices />} />
            <Route path="/benefit-issuance" element={<BenefitIssuance />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
