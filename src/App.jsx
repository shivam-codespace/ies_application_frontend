import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoutes";

import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/Admin/CreateAccount";
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
import UnlockAccount from "./components/UnlockAccount";
import ProfilePage from "./pages/Profile/ProfilePage";
import ForgetPassword from "./components/ForgetPassword";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/unlock" element={<UnlockAccount />} />
        <Route path="/recover-password" element={<ForgetPassword />} />

        {/* Protected routes with layout */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="flex min-h-screen bg-gray-50">
                <Sidebar isOpen={isSidebarOpen} />
                <div
                  className={`flex-1 flex flex-col transition-all duration-300 ${
                    isSidebarOpen ? "md:ml-64" : "ml-0"
                  }`}
                >
                  <Navbar toggleSidebar={toggleSidebar} />

                  <main className="flex-1 p-4">
                    <Routes>
                      {/* Admin Dashboard */}
                      <Route
                        path="/admin/dashboard"
                        element={
                          <ProtectedRoute adminOnly>
                            <AdminDashboard />
                          </ProtectedRoute>
                        }
                      />

                      {/* User Dashboard */}
                      <Route
                        path="/dashboard/:email"
                        element={
                          <ProtectedRoute userOnly>
                            <Dashboard />
                          </ProtectedRoute>
                        }
                      />

                      {/* Profile (Both roles) */}
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <ProfilePage />
                          </ProtectedRoute>
                        }
                      />

                      {/* Admin-only routes */}
                      <Route
                        path="/create-account"
                        element={
                          <ProtectedRoute adminOnly>
                            <CreateAccount />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/view-account"
                        element={
                          <ProtectedRoute adminOnly>
                            <ViewAccount />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/create-plan"
                        element={
                          <ProtectedRoute adminOnly>
                            <CreatePlan />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/view-plan"
                        element={
                          <ProtectedRoute adminOnly>
                            <ViewPlans />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/determine-eligibility"
                        element={
                          <ProtectedRoute adminOnly>
                            <DetermineEligibility />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/correspondence"
                        element={
                          <ProtectedRoute adminOnly>
                            <Correspondence />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/pending-notices"
                        element={
                          <ProtectedRoute adminOnly>
                            <PendingNotices />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/history-notices"
                        element={
                          <ProtectedRoute adminOnly>
                            <HistoryNotices />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/reports"
                        element={
                          <ProtectedRoute adminOnly>
                            <Reports />
                          </ProtectedRoute>
                        }
                      />

                      {/* User routes (Data Collection) */}
                      <Route
                        path="/plan-selection"
                        element={
                          <ProtectedRoute >
                            <PlanSelection />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/income-details"
                        element={
                          <ProtectedRoute >
                            <IncomeDetails />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/education-details"
                        element={
                          <ProtectedRoute >
                            <EducationDetails />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/kids-details"
                        element={
                          <ProtectedRoute >
                            <KidsDetails />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/summary-screen"
                        element={
                          <ProtectedRoute >
                            <SummaryScreen />
                          </ProtectedRoute>
                        }
                      />

                      {/* Shared routes (Both roles) */}
                      <Route
                        path="/create-application"
                        element={
                          <ProtectedRoute>
                            <CreateApplication />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/view-application"
                        element={
                          <ProtectedRoute>
                            <ViewApplication />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/benefit-issuance"
                        element={
                          <ProtectedRoute>
                            <BenefitIssuance />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

