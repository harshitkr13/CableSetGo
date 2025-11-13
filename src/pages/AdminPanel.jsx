import React from "react";
import mockServer from "../mockApi/mockServer";
import { MdGroup, MdReport, MdPayment } from "react-icons/md";

function AdminPanel() {
  const users = mockServer.getUsers();
  const complaints = mockServer.getComplaints();
  const transactions = mockServer.getTransactions();

  return (
    <div className="mt-20 fade-in p-4">
      <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text mb-10">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="float-card bg-white p-6 rounded-xl text-center shadow-md">
          <MdGroup className="text-blue-600 text-5xl mx-auto mb-3" />
          <h3 className="text-xl font-bold">{users.length} Users</h3>
        </div>

        <div className="float-card bg-white p-6 rounded-xl text-center shadow-md">
          <MdReport className="text-red-600 text-5xl mx-auto mb-3" />
          <h3 className="text-xl font-bold">{complaints.length} Complaints</h3>
        </div>

        <div className="float-card bg-white p-6 rounded-xl text-center shadow-md">
          <MdPayment className="text-green-600 text-5xl mx-auto mb-3" />
          <h3 className="text-xl font-bold">{transactions.length} Transactions</h3>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-3">User List</h3>
      <table className="w-full border rounded-lg shadow">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.email}>
              <td className="border p-3">{u.email}</td>
              <td className="border p-3">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
