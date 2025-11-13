import React from "react";
import { Link } from "react-router-dom";

function Greeting() {
  return (
    <div className="mt-16 relative overflow-hidden rounded-xl shadow-lg">
      {/* Background video */}
      <video
        className="w-full h-[380px] object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="https://videos.pexels.com/video-files/6495661/6495661-uhd_2560_1440_25fps.mp4"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow">
          Welcome to CableSetGo
        </h1>
        <p className="text-white/90 mt-3 max-w-2xl">
          Plans, payments, support & smart tools — all in one modern portal.
        </p>
        <Link to="/language" className="gradient-button mt-6 px-10 py-3 text-lg">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Greeting;
