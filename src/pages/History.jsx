import React, { useEffect, useState } from "react";
import mockServer from "../mockApi/mockServer";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(mockServer.getTransactions());
  }, []);

  return (
    <div className="mt-20 p-4">
      <h2 className="text-3xl font-semibold text-center mb-4">Transaction History</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Transaction ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((txn) => (
            <tr key={txn.id}>
              <td className="border p-2">{txn.id}</td>
              <td className="border p-2">₹{txn.amount}</td>
              <td className="border p-2">{txn.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
