import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contextApi/UserContext";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser, user } = useUser(); // context se user aur setter

  const handleLogout = async () => {
    try {
      const { data } = await axios.post("https://chatify-backend-ybm4.onrender.com/api/logout");
      console.log(`logout : ${data}`)
      if (!data.success) {
        toast.error(data.message || "Logout failed");
        return;
      }

      //✅ localstorage mea jo iske chatApplication under save ho rha tha to remove krenge .
      localStorage.removeItem("chatApplication");
      setUser(null);  // ✅ SETUSER JO HUM LOGIN KR RHE THE TO CONTEXT API MEA BHEJ RHE THE DATA TO USKE BHI NULL KRENGE .

      toast.success(`${user?.fullname || "User"} successfully logged out`);
      navigate("/login");
    } catch (e) {
      toast.error(`Logout Error - ${e.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-700">
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;



