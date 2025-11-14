import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full top-0 left-0 z-50 backdrop-blur-xl bg-slate-900/80 shadow-xl border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 text-transparent bg-clip-text hover:scale-105 transition-transform drop-shadow-lg"
        >
          CableSetGo
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-base font-medium">
          <Link 
            className={`transition-all relative ${
              isActive("/plans") 
                ? "text-purple-400 font-semibold" 
                : "text-slate-300 hover:text-purple-400"
            }`}
            to="/plans"
          >
            Plans
            {isActive("/plans") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50"></span>
            )}
          </Link>
          <Link 
            className={`transition-all relative ${
              isActive("/help") 
                ? "text-purple-400 font-semibold" 
                : "text-slate-300 hover:text-purple-400"
            }`}
            to="/help"
          >
            Help
            {isActive("/help") && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50"></span>
            )}
          </Link>
          <Link 
            className={`px-4 py-2 rounded-xl transition-all ${
              isActive("/login") 
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50" 
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-lg hover:shadow-purple-500/30"
            }`}
            to="/login"
          >
            Login
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button 
          className="md:hidden text-2xl text-slate-300 hover:text-purple-400 transition-colors" 
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden animate-fade-down bg-slate-900/95 border-t border-slate-700 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-4 text-lg">
            <Link 
              onClick={() => setOpen(false)} 
              to="/plans"
              className={`transition-colors ${
                isActive("/plans") ? "text-purple-400 font-semibold" : "text-slate-300 hover:text-purple-400"
              }`}
            >
              Plans
            </Link>
            <Link 
              onClick={() => setOpen(false)} 
              to="/help"
              className={`transition-colors ${
                isActive("/help") ? "text-purple-400 font-semibold" : "text-slate-300 hover:text-purple-400"
              }`}
            >
              Help
            </Link>
            <Link 
              onClick={() => setOpen(false)} 
              to="/login"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center font-semibold shadow-md hover:shadow-lg hover:shadow-purple-500/30"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
