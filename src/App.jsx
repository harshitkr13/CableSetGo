// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Core layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

// Pages
import Greeting from "./pages/Greeting";
import LanguageSelect from "./pages/LanguageSelect";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ServiceCheck from "./pages/ServiceCheck";
import Plans from "./pages/Plans";
import ComparePlans from "./pages/ComparePlans";
import AddOns from "./pages/AddOns";
import Payments from "./pages/Payments";
import Invoice from "./pages/Invoice";
import History from "./pages/History";
import Complaint from "./pages/Complaint";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound"; // NEW

function App() {
  return (
    <Router>
      <Navbar />

      <div className="min-h-screen mt-16 p-4">
        <Routes>
          <Route path="/" element={<Greeting />} />
          <Route path="/language" element={<LanguageSelect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/service-check" element={<ServiceCheck />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/compare" element={<ComparePlans />} />
          <Route path="/addons" element={<AddOns />} />
          <Route path="/pay" element={<Payments />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/history" element={<History />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/help" element={<Help />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />

      {/* Floating chat widget (mounted once here) */}
      <ChatBot />
    </Router>
  );
}

export default App;
