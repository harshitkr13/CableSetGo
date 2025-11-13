import React, { useState } from "react";
import { MdChat } from "react-icons/md";

const canned = [
  { q: "How to recharge?", a: "Go to Payments → Enter amount → Pay Now." },
  { q: "Service available?", a: "Use Service Availability with your PIN code." },
  { q: "Submit complaint?", a: "Open Complaints page and describe your issue." },
];

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([{ from: "bot", text: "Hi! How can I help?" }]);
  const [msg, setMsg] = useState("");

  const send = () => {
    if (!msg.trim()) return;
    const userMsg = { from: "me", text: msg.trim() };
    const found = canned.find(c => msg.toLowerCase().includes(c.q.split("?")[0].toLowerCase()));
    const botMsg = { from: "bot", text: found ? found.a : "I’ll connect you to support soon. Check Help page meanwhile." };
    setChat([...chat, userMsg, botMsg]);
    setMsg("");
  };

  return (
    <>
      {/* Toggle button */}
      <button
        className="fixed bottom-6 right-6 rounded-full p-4 shadow-lg text-white bg-gradient-to-r from-green-500 to-blue-600 hover:scale-105 transition"
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
      >
        <MdChat size={26} />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-2xl border animate-fade-down">
          <div className="px-4 py-3 border-b font-semibold bg-gradient-to-r from-blue-50 to-green-50 rounded-t-xl">
            CableSetGo Assistant
          </div>
          <div className="p-3 h-64 overflow-y-auto space-y-2">
            {chat.map((c, i) => (
              <div key={i} className={`text-sm ${c.from === "me" ? "text-right" : "text-left"}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${c.from === "me" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                  {c.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              className="flex-1 border rounded px-3 py-2"
              placeholder="Type your question…"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button className="gradient-button px-4 py-2" onClick={send}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
