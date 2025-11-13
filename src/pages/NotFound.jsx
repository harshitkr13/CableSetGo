import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mt-24 text-center fade-in">
      <h1 className="text-6xl font-extrabold text-blue-700">404</h1>
      <p className="mt-2 text-gray-600">The page you’re looking for doesn’t exist.</p>
      <Link className="gradient-button mt-6 inline-block" to="/">Go Home</Link>
    </div>
  );
}
