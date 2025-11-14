import React, { useState } from "react";
import mockServer from "../mockApi/mockServer";

function Payments() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    const res = await mockServer.makePayment(amount);
    setLoading(false);
    setMsg(res.message);
  };

  return (
    <div className="mt-20 fade-in flex flex-col items-center">
      <h2 className="text-4xl font-semibold text-blue-700 mb-6">
        Payment Portal
      </h2>

      <input
        type="number"
        className="border p-3 rounded w-72 mb-4 shadow"
        placeholder="Enter Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="gradient-button w-72 text-center" onClick={handlePayment}>
        Pay Now
      </button>

      {loading && (
        <div className="mt-6">
          <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {msg && (
        <p className="mt-6 text-green-700 text-xl font-semibold slide-up">
          {msg}
        </p>
      )}
    </div>
  );
}

export default Payments;
