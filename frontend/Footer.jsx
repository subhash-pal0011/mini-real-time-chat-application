import React from "react";
import { MessageCircle, Github, Twitter, Linkedin, Mail, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 ">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand Section */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-emerald-400 mb-4"
          >
            <MessageCircle size={28} />
            ChatZone
          </Link>
          <p className="text-gray-400 text-sm">
            A modern chat application where conversations flow seamlessly.
            Connect, chat, and stay updated with your friends anytime.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-400 mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-emerald-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-emerald-400 transition">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-emerald-400 transition">Signup</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-emerald-400 mb-3">Follow Us</h3>
          <div className="flex gap-5">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">
              <Github size={22} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">
              <Twitter size={22} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">
              <Linkedin size={22} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">
              <Facebook size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">
              <Instagram size={22} />
            </a>
            <a href="mailto:support@chatzone.com" className="hover:text-emerald-400 transition">
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-gray-800 py-4 mt-6">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} ChatZone. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

