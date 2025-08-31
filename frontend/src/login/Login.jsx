import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../contextApi/UserContext";

const Login = () => {
  // DEKHO JB HUME CONTEXT API MEA DATA BHEJNA RHTA HII TO SET USER IMPORT KRKE DAL DETA HII DATA. AND JUB CONTEXT API SE DATA LENA RHTA HII TB USE KRTE HII SETT KE PHLE VALA.
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/login", data);
      const result = res.data;

      if (!result.success) {
        toast.error(result.message || "Login failed!");
        return;
      }

      toast.success("Login successful!");

      // hum LOCAL STORAGE MEA IS LIYE DAL DE RHE HII TAKI HUME BAR BAR LOGIN NA KRNA PADE
      localStorage.setItem("chatApplication", JSON.stringify(result.user));

      setUser(result.user); // HUM YE SE BHI CONTEXTAPI MEA DATA DAL RHE HII.

      navigate("/chat");
    } catch (e) {
      toast.error(e.response?.data?.message || "Invalid email or password ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#0a0f1c] via-[#111827] to-[#1e293b] 
      px-4 relative overflow-hidden">

      <div className="w-full max-w-md backdrop-blur-2xl 
        bg-gradient-to-br from-white/10 to-white/5 
        border border-white/20 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] 
        p-10 text-white relative z-10 mt-17">

        <h2 className="text-4xl font-extrabold text-center mb-3 tracking-wide 
          bg-gradient-to-r from-blue-400 via-purple-400 
          bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Login to continue your journey
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:border-transparent transition"
              {...register("email", {
                required: { value: true, message: "Email is required" },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:border-transparent transition"
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-400 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 
            text-white py-3 rounded-xl font-semibold text-lg shadow-lg 
            hover:scale-105 hover:shadow-purple-700/50 transition-all duration-300 cursor-pointer"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-500 cursor-pointer transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

