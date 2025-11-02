import { ShoppingCart, DollarSign, Users, Heart } from "lucide-react";

const cards = [
  {
    title: "No. of Plans Available",
    value: "23",
    date: "Jan 2022 - May 2023",
    color: "from-indigo-500 to-purple-500",
    icon: <ShoppingCart size={32} />,
  },
  {
    title: "Citizens Approved",
    value: "8,577,641",
    date: "Jan 2022 - May 2023",
    color: "from-pink-500 to-orange-400",
    icon: <DollarSign size={32} />,
  },
  {
    title: "Citizens Denied",
    value: "4,565",
    date: "Jan 2022 - May 2023",
    color: "from-orange-400 to-yellow-400",
    icon: <Users size={32} />,
  },
  {
    title: "Benefits Given",
    value: "$12,566",
    date: "Jan 2022 - May 2023",
    color: "from-blue-500 to-indigo-600",
    icon: <Heart size={32} />,
  },
];

export default function DashboardCards() {
  return (
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
              <p className="text-sm mt-1">{card.date}</p>
            </div>
            <div className="opacity-70">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
