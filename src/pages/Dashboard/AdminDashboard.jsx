import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authService } from "../../Services/authService";
import { ShoppingCart, DollarSign, Users, Heart, CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await authService.getDashboard(user.email);
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const cards = [
    {
      title: "No. of Plans Available",
      value: dashboardData?.plansCnt || 0,
      color: "from-indigo-500 to-purple-500",
      icon: <ShoppingCart size={32} />,
    },
    {
      title: "Citizens Approved",
      value: dashboardData?.approvedCnt || 0,
      color: "from-green-500 to-emerald-500",
      icon: <CheckCircle size={32} />,
    },
    {
      title: "Citizens Denied",
      value: dashboardData?.deniedCnt || 0,
      color: "from-red-500 to-pink-500",
      icon: <XCircle size={32} />,
    },
    {
      title: "Benefits Given",
      value: `$${dashboardData?.benefitAmtGiven || 0}`,
      color: "from-blue-500 to-indigo-600",
      icon: <DollarSign size={32} />,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back, {user?.email}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`p-6 rounded-xl text-white shadow-md bg-gradient-to-r ${card.color}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
              <div className="opacity-70">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
