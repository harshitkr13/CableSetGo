import React from "react";
import { MdTv } from "react-icons/md";

function PlanCard({ plan }) {
  return (
    <div className="float-card p-6 bg-white rounded-xl shadow-lg cursor-pointer fade-in border">
      <div className="flex items-center gap-3 mb-3">
        <MdTv className="text-blue-600 text-3xl" />
        <h2 className="text-xl font-bold">{plan.name}</h2>
      </div>

      <p className="text-gray-600 mb-3">{plan.description}</p>

      <p className="text-2xl font-bold text-blue-600">₹{plan.price}</p>
    </div>
  );
}

export default PlanCard;
