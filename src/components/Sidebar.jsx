import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  FileText,
  Database,
  Users,
  Mail,
  CreditCard,
  BarChart,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const sections = [
  { title: "Dashboard", icon: Home, path: "/" },
  {
    title: "Application Registration",
    icon: FileText,
    subsections: [
      { name: "Create Application", path: "/create-application" },
      { name: "View Application", path: "/view-application" },
    ],
  },
  {
    title: "Data Collection",
    icon: Database,
    subsections: [
      { name: "Plan Selection", path: "/plan-selection" },
      { name: "Income Details", path: "/income-details" },
      { name: "Education Details", path: "/education-details" },
      { name: "Kids Details", path: "/kids-details" },
      { name: "Summary Screen", path: "/summary-screen" },
    ],
  },
  {
    title: "Eligibility Determination",
    icon: Users,
    subsections: [{ name: "Determine Eligibility", path: "/determine-eligibility" }],
  },
  {
    title: "Correspondence",
    icon: Mail,
    subsections: [
      { name: "Correspondence", path: "/correspondence" },
      { name: "Pending Notices", path: "/pending-notices" },
      { name: "History Notices", path: "/history-notices" },
    ],
  },
  { title: "Benefit Issuance", icon: CreditCard, path: "/benefit-issuance" },
  { title: "Reports", icon: BarChart, path: "/reports" },
  {
    title: "Admin",
    icon: Settings,
    subsections: [
      { name: "Create Account", path: "/create-account" },
      { name: "View Account", path: "/view-account" },
      { name: "Create Plan", path: "/create-plan" },
      { name: "View Plan", path: "/view-plan" },
    ],
  },
];

export default function Sidebar({ isOpen }) {
  const [openSection, setOpenSection] = useState(null);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-white text-gray-800 shadow-lg border-r border-gray-200 transform transition-transform duration-300 z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-2 bg-gray-50">
        {/* <Home className="w-5 h-5 text-indigo-600" /> */}
        <h2 className="text-lg font-semibold text-gray-700">Services</h2>
      </div>

      {/* Sidebar Menu */}
      <nav className="p-3 overflow-y-auto h-[calc(100%-60px)]">
        {sections.map((section, i) => {
          const Icon = section.icon;
          const hasSub = section.subsections?.length > 0;
          const isSectionOpen = openSection === i;

          const sectionContent = (
            <div
              className={`flex items-center justify-between w-full px-3 py-2 rounded-lg cursor-pointer transition 
              ${
                isSectionOpen
                  ? "bg-indigo-100 text-indigo-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3 text-sm font-medium">
                <Icon size={18} />
                <span>{section.title}</span>
              </div>
              {hasSub &&
                (isSectionOpen ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                ))}
            </div>
          );

          return (
            <div key={section.title}>
              {section.path ? (
                <Link to={section.path} className="block">
                  {sectionContent}
                </Link>
              ) : (
                <button
                  onClick={() => setOpenSection(isSectionOpen ? null : i)}
                  className="w-full text-left"
                >
                  {sectionContent}
                </button>
              )}

              {/* Subsections */}
              {isSectionOpen && hasSub && (
                <div className="pl-8 mt-1 space-y-1 transition-all duration-300">
                  {section.subsections.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className="block text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md px-3 py-1 transition"
                    >
                      • {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
