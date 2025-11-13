import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 backdrop-blur-md bg-white/60 shadow-md">
      <div className="flex justify-between items-center px-6 py-3">
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text"
        >
          CableSetGo
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 text-lg">
          <Link className="hover:text-blue-600 transition" to="/plans">Plans</Link>
          <Link className="hover:text-blue-600 transition" to="/help">Help</Link>
          <Link className="hover:text-green-600 transition" to="/login">Login</Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden animate-fade-down bg-white/90 border-t">
          <div className="px-6 py-3 flex flex-col gap-3 text-lg">
            <Link onClick={() => setOpen(false)} to="/plans">Plans</Link>
            <Link onClick={() => setOpen(false)} to="/help">Help</Link>
            <Link onClick={() => setOpen(false)} to="/login">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
