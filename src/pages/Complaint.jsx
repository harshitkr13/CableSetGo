import React, { useState } from "react";
import mockServer from "../mockApi/mockServer";
import { MdReportProblem } from "react-icons/md";

function Complaint() {
  const [text, setText] = useState("");
  const [ticket, setTicket] = useState("");

  const submitComplaint = async () => {
    let res = await mockServer.submitComplaint(text);
    setTicket(res.ticketId);
  };

  return (
    <div className="mt-20 fade-in flex flex-col items-center">
      <MdReportProblem className="text-red-600 text-6xl mb-4" />

      <h2 className="text-4xl font-semibold text-blue-700 mb-6">
        Submit a Complaint
      </h2>

      <textarea
        className="border w-80 h-32 p-3 rounded shadow-md"
        placeholder="Describe your issue clearly..."
        onChange={(e) => setText(e.target.value)}
      />

      <button className="gradient-button w-80 mt-4" onClick={submitComplaint}>
        Submit
      </button>

      {ticket && (
        <div className="mt-6 text-green-700 text-lg font-bold slide-up">
          Ticket Generated: {ticket}
        </div>
      )}
    </div>
  );
}

export default Complaint;
