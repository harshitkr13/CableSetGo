import React, { useState } from "react";
import mockServer from "../mockApi/mockServer";

function ServiceCheck() {
  const [pin, setPin] = useState("");
  const [result, setResult] = useState("");

  const checkService = async () => {
    let res = await mockServer.checkService(pin);
    setResult(res.message);
  };

  return (
    <div className="mt-20 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>

      <input
        className="border p-2 rounded w-72 mb-4"
        placeholder="Enter Pin-Code"
        onChange={(e) => setPin(e.target.value)}
      />

      <button className="gradient-button px-5 py-2" onClick={checkService}>
        Check
      </button>

      {result && (
        <p className="mt-6 text-lg font-medium text-gray-700">{result}</p>
      )}
    </div>
  );
}

export default ServiceCheck;
