import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contextApi/UserContext";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser, user } = useUser(); 

  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/api/logout");
      if (!data.success) {
        toast.error(data.message || "Logout failed");
        return;
      }
      localStorage.removeItem("chatApplication");
      setUser(null);  
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