import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mockServer from "../mockApi/mockServer";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await mockServer.login(email, pass);

    if (res.success) {
      alert("Login Successful!");
      navigate("/dashboard");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-24">
      <div className="gradient-card w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

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

        <button
          className="gradient-button w-full py-2 mt-2"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-sm mt-3 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
