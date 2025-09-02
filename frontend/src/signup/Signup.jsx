import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useUser } from "../contextApi/UserContext";

const Signup = () => {
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {

      //👉JSON → sirf text data handle kar sakta hai (string, number, boolean, array, object).
      //👉 FormData → binary data (file, image, video, audio) + text dono bhej sakta hai.
      const formData = new FormData();

      // ✅ Normal fields
      formData.append("fullname", data.fullname);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("password", data.password);

      // ✅ data.profilepic iska mtlb data ke inpUt field mea register mea  profilepic hii >>>> agr data.profilepic shi hii and  [0] pahal chus krna agr ye dono shi ho tabhi formdatamea data.profilepic send krna vrna bakend se difult vali pic set ho jayegi.
      if (data.profilepic && data.profilepic[0]) {
        formData.append("profilepic", data.profilepic[0]);
      }
      const res = await axios.post("/api/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // ISKA MTLB HII >> Jab hum file (jaise image, video, pdf) ke sath data send karte hain, to normal JSON body kaam nahi karti.   Uske liye browser ek special format use karta hai jiska naam hai → multipart/form-data.
      });

      const result = res.data || { success: false, message: "No response from server" };  // ✅ res se data nikala

      // Backend se aaya message
      toast.success(result.message || "Signup successful 🎉");

      // ✅ User data ko localStorage me store kar RHE HII TAKI LOCALSTORAGE MEA SAVE RHE  BARA BAR LOGIN NA KRNA PADE.
      localStorage.setItem("chatApplication", JSON.stringify(result.user));

      // ✅ HUM YAHA SE BHI CONTEXT API MEA DATA DAL RHE HII.
      setUser(result.user);
      // setUser(result.formData);


      // ✅ Navigate to home/chat
      navigate("/chat");
    } catch (e) {
      const errorMsg = e.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] px-4">
      <div className="w-full max-w-md backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 text-white relative mt-20 mb-5">

        <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Join us today, it only takes a few steps
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Full Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullname", { required: "Full name is required" })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.fullname && <p className="text-sm text-red-400 mt-1">{errors.fullname.message}</p>}
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.username && <p className="text-sm text-red-400 mt-1">{errors.username.message}</p>}
          </div>

          {/* Gender */}
          <div className="flex gap-6 items-center text-gray-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register("gender", { required: true })}
                value="male"
                className="hidden peer"
              />
              <div className="w-5 h-5 rounded-full border-2 border-gray-400 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all"></div>
              <span className="peer-checked:text-blue-400">Male</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register("gender", { required: true })}
                value="female"
                className="hidden peer"
              />
              <div className="w-5 h-5 rounded-full border-2 border-gray-400 peer-checked:border-pink-500 peer-checked:bg-pink-500 transition-all"></div>
              <span className="peer-checked:text-pink-400">Female</span>
            </label>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-gray-300 mb-2">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              {...register("profilepic")}
              className="w-full text-gray-200 file:mr-4 file:py-2 file:px-4 
                         file:rounded-full file:border-0 
                         file:text-sm file:font-semibold 
                         file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 
                         file:text-white hover:file:opacity-90 cursor-pointer"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-purple-700/50 transition-all duration-300 disabled:opacity-50 cursor-pointer "
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-500 hover:underline transition">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

