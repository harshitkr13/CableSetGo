import React from "react";
import { Link } from "react-router-dom";
import { MdPayment, MdWifiTethering, MdCompare, MdLiveTv, MdHistory, MdReport, MdPerson } from "react-icons/md";

function Dashboard() {
  const cards = [
    { to: "/service-check", icon: MdWifiTethering, title: "Service Availability", gradient: "from-emerald-500 to-teal-600" },
    { to: "/plans", icon: MdLiveTv, title: "Browse Plans", gradient: "from-blue-500 to-cyan-600" },
    { to: "/compare", icon: MdCompare, title: "Compare Plans", gradient: "from-purple-500 to-pink-600" },
    { to: "/addons", icon: MdLiveTv, title: "Add-ons", gradient: "from-green-500 to-emerald-600" },
    { to: "/pay", icon: MdPayment, title: "Payments", gradient: "from-indigo-500 to-blue-600" },
    { to: "/history", icon: MdHistory, title: "Transaction History", gradient: "from-orange-500 to-amber-600" },
    { to: "/complaint", icon: MdReport, title: "Complaints", gradient: "from-red-500 to-rose-600" },
    { to: "/profile", icon: MdPerson, title: "Profile", gradient: "from-violet-500 to-purple-600" },
  ];

  return (
    <div className="min-h-screen fade-in pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
            Dashboard
          </h1>
          <p className="text-slate-400 text-lg">Manage your cable services with ease</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.to}
                to={card.to}
                className="float-card p-8 text-center group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-500/30 transition-all duration-300`}>
                  <Icon className="text-white text-3xl" />
                </div>
                <p className="text-lg font-semibold text-slate-200 group-hover:text-purple-300 transition-colors">
                  {card.title}
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300 rounded-2xl"></div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
