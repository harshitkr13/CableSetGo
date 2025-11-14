import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mockServer from "../mockApi/mockServer";

function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    let res = await mockServer.register(email, pass);

    if (res.success) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-24">
      <div className="gradient-card w-80">
        <h2 className="text-2xl font-medium text-center mb-4">Register</h2>

        <input
          className="w-full p-2 mb-3 rounded text-black"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 rounded text-black"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <button className="gradient-button w-full py-2" onClick={handleRegister}>
          Create Account
        </button>

        <p className="text-sm mt-3 text-center">
          Already registered?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
