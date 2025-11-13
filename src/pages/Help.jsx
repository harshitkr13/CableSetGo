import React from "react";

function Help() {
  const faqs = [
    { q: "How to recharge?", a: "Go to Payments → Enter amount → Pay." },
    { q: "How to check service?", a: "Use Service Availability Check page." },
    { q: "How to submit complaint?", a: "Go to Complaint page and fill the form." }
  ];

  return (
    <div className="mt-20 p-4">
      <h2 className="text-3xl font-semibold text-center mb-4">Help & FAQ</h2>

      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, i) => (
          <div key={i} className="mb-6 p-4 bg-white shadow rounded-lg">
            <h4 className="font-bold text-lg">{faq.q}</h4>
            <p className="text-gray-700 mt-2">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Help;
