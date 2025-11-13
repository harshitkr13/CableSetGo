import React from "react";
import { useNavigate } from "react-router-dom";

function LanguageSelect() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-semibold mb-6">Choose Your Language</h1>

      <div className="flex gap-6">
        <button
          className="gradient-button px-6 py-2"
          onClick={() => navigate("/login")}
        >
          English
        </button>

        <button
          className="gradient-button px-6 py-2"
          onClick={() => navigate("/login")}
        >
          हिंदी
        </button>
      </div>
    </div>
  );
}

export default LanguageSelect;
