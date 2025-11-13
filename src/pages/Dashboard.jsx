import React from "react";
import { Link } from "react-router-dom";
import { MdPayment, MdWifiTethering, MdCompare, MdLiveTv, MdHistory, MdReport, MdPerson } from "react-icons/md";

function Dashboard() {
  return (
    <div className="mt-20 fade-in">
      <h1 className="text-4xl font-semibold text-center mb-6 text-blue-700">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 mx-auto">
        
        <Link to="/service-check" className="float-card p-6 bg-white shadow-lg rounded-xl text-center">
          <MdWifiTethering className="text-green-600 text-4xl mx-auto" />
          <p className="mt-2 text-lg font-semibold">Service Availability</p>
        </Link>

        <Link to="/plans" className="float-card p-6 bg-white shadow-lg rounded-xl text-center">
          <MdLiveTv className="text-blue-600 text-4xl mx-auto" />
          <p className="mt-2 text-lg font-semibold">Browse Plans</p>
        </Link>

        <Link to="/compare" className="float-card p-6 bg-white shadow-lg rounded-xl text-center">
          <MdCompare className="text-purple-600 text-4xl mx-auto" />
          <p className="mt-2 text-lg font-semibold">Compare Plans</p>
        </Link>

        <Link to="/addons" className="float-card p-6 bg-white shadow-lg rounded-xl text-center">
          <MdLiveTv className="text-green-500 text-4xl mx-auto" />
          <p className="mt-2 text-lg font-semibold">Add-ons</p>
        </Link>

        <Link to="/pay" className="float-card p-6 bg-white shadow-lg rounded-xl text-center">
          <MdPayment className="text-blue-600 text-4xl mx-auto" />
          <p className="mt-2 text-lg font-semibold">Payments</p>
        </Link>

        <Link to="/history" className="float-card p-6 bg-white shadow-lg rounded-xl text-center">
          <MdHistory className="text-orange-600 text-4xl mx-auto" />
          <p className="mt-2 text-lg font-semibold">Transaction History</p>
        </Link>

        <Link to="/complaint" className="float-card p-6 bg-white shadow-lg rounded-xl text-center">
          <MdReport className="text-red-600 text-4xl mx-auto" />
          <p className="mt-2 text-lg font-semibold">Complaints</p>
        </Link>

        <Link to="/profile" className="float-card p-6 bg-white shadow-lg rounded-xl text-center">
          <MdPerson className="text-indigo-600 text-4xl mx-auto" />
          <p className="mt-2 text-lg font-semibold">Profile</p>
        </Link>

      </div>
    </div>
  );
}

export default Dashboard;
