import React from "react";

function Invoice() {
  const generateInvoice = () => {
    const text = "Invoice Generated\nCableSetGo Billing System\nThank you!";
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice.txt";
    link.click();
  };

  return (
    <div className="mt-20 fade-in flex flex-col items-center">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text mb-6">
        Invoice Center
      </h2>

      <img
        src="https://img.icons8.com/clouds/200/invoice.png"
        alt="invoice"
        className="mb-6"
      />

      <button className="gradient-button px-10 py-3" onClick={generateInvoice}>
        Download Invoice
      </button>
    </div>
  );
}

export default Invoice;
