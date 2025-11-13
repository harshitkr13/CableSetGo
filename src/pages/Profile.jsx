import React, { useState } from "react";
import { MdPerson } from "react-icons/md";

function Profile() {
  return (
    <div className="mt-20 fade-in flex flex-col items-center">
      <MdPerson className="text-blue-600 text-6xl mb-4" />

      <h2 className="text-4xl font-semibold text-blue-700 mb-6">
        Profile Settings
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-md w-80 float-card">
        <input className="border w-full p-2 rounded mb-3" placeholder="Full Name" />
        <input className="border w-full p-2 rounded mb-3" placeholder="Address" />
        <input className="border w-full p-2 rounded mb-3" placeholder="Region" />

        <button className="gradient-button w-full">Save Changes</button>
      </div>
    </div>
  );
}

export default Profile;
