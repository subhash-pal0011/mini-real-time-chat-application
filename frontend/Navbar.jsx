import React, { useState } from "react";
import { Menu, X, MessageCircle, LogIn, UserPlus, LogOut, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "./src/contextApi/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  return (
    <nav className=" fixed top-0 left-0 w-full z-50 bg-gray-900 text-gray-100 shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-18 py-4 flex justify-between items-center">

        <Link
          to="/chat"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-wide hover:text-emerald-400 transition-colors"
        >
          <MessageCircle className="w-7 h-7 text-emerald-400" />
          ChatZone
        </Link>

        <div className="hidden md:flex gap-15 text-lg font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-emerald-400 transition"
          >
            <Home size={20} /> Home
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 hover:text-emerald-400 transition"
              >
                <LogIn size={20} /> Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 hover:text-emerald-400 transition"
              >
                <UserPlus size={20} /> Signup
              </Link>
            </>
          ) : (
            <Link
              to="/logout"
              className="flex items-center gap-2 hover:text-emerald-400 transition"
            >
              <LogOut size={20} /> Logout
            </Link>
          )}
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4 text-lg font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-emerald-400 transition"
            onClick={() => setIsOpen(false)}
          >
            <Home size={20} /> Home
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 hover:text-emerald-400 transition"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={20} /> Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 hover:text-emerald-400 transition"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus size={20} /> Signup
              </Link>
            </>
          ) : (
            <Link
              to="/logout"
              className="flex items-center gap-2 hover:text-emerald-400 transition"
              onClick={() => setIsOpen(false)}
            >
              <LogOut size={20} /> Logout
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;