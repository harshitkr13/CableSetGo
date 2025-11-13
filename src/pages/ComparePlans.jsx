import React, { useState } from "react";
import mockServer from "../mockApi/mockServer";

function ComparePlans() {
  const allPlans = mockServer.getPlans();
  const [selected, setSelected] = useState([]);

  const togglePlan = (plan) => {
    if (selected.includes(plan)) {
      setSelected(selected.filter((p) => p !== plan));
    } else {
      setSelected([...selected, plan]);
    }
  };

  return (
    <div className="mt-20 fade-in p-4">
      <h2 className="text-4xl text-center font-semibold text-blue-700 mb-6">
        Compare Plans
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allPlans.map((plan) => (
          <button
            key={plan.id}
            className="float-card p-5 bg-white rounded-xl shadow-md"
            onClick={() => togglePlan(plan)}
          >
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="text-green-600 text-lg font-semibold mt-2">
              ₹{plan.price}
            </p>
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="mt-10 p-6 bg-white rounded-xl shadow-lg slide-up">
          <h3 className="text-2xl font-semibold mb-4">Comparison Table</h3>

          <table className="w-full rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3">Plan</th>
                <th className="p-3">Price</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>

            <tbody>
              {selected.map((p) => (
                <tr key={p.id} className="border text-center">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ComparePlans;
