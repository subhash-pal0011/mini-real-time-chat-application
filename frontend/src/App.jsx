import React, { useEffect } from "react";
import Home from "./home/Home"
import Navbar from "../Navbar";
import Footer from "../Footer";
import { BrowserRouter as Router, Routes, Route , useNavigate } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Logout from "./logout/Logout";
import ChatApplication from "./chatApplication/ChatApplication";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import IsLogin from "./checkedLogin/IsLogin";


const CatchAll = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.error("Route not found, please try again!.");
    navigate("/"); 
  }, [navigate]);
  return null;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="logout" element={<Logout />} />
        <Route element={<IsLogin />}>
          <Route path="/chat" element={<ChatApplication />} />
        </Route>
        <Route path="*" element={<CatchAll />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  )
}
export default App
