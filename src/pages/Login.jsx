import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) return navigate("/dashboard");
  
    }, [navigate]);
  

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://verdict-backend-t2nv.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Login failed");
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-500" />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-500" />
          <button type="submit"
            className="w-full py-3 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
