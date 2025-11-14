// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Core layout
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ChatBot from "./components/chatBot";

// Pages
import Greeting from "./pages/greeting";
import LanguageSelect from "./pages/languageSelect";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ServiceCheck from "./pages/serviceCheck";
import Plans from "./pages/plans";
import ComparePlans from "./pages/comparePlans";
import AddOns from "./pages/addOns";
import Payments from "./pages/payments";
import Invoice from "./pages/invoice";
import History from "./pages/history";
import Complaint from "./pages/complaint";
import Profile from "./pages/profile";
import AdminPanel from "./pages/adminPanel";
import Help from "./pages/help";
import NotFound from "./pages/notFound";

function AppContent() {
  const location = useLocation();
  const showChatBot = location.pathname === "/dashboard";

  return (
    <>
      <div className="min-h-screen pt-16">
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

      {/* Floating chat widget - only on Dashboard */}
      {showChatBot && <ChatBot />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <AppContent />
    </Router>
  );
}

export default App;
