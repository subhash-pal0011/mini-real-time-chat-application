import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Users, Shield,  } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen flex flex-col mt-16">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
        <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-400 mb-4">
          Welcome to ChatZone
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-8">
          Connect with friends, share your thoughts, and stay updated instantly.
          A modern, secure and blazing fast chat experience.
        </p>
        <div className="flex gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-md transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white rounded-xl font-semibold transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 container mx-auto grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-gray-900 rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition">
          <MessageCircle size={40} className="mx-auto text-emerald-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Real-Time Chat</h3>
          <p className="text-gray-400">
            Instant messaging with your friends and groups. Stay connected 24/7.
          </p>
        </div>
        <div className="p-6 bg-gray-900 rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition">
          <Shield size={40} className="mx-auto text-emerald-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
          <p className="text-gray-400">
            End-to-end encrypted chats to keep your conversations safe.
          </p>
        </div>
        <div className="p-6 bg-gray-900 rounded-2xl shadow-lg hover:shadow-emerald-500/20 transition">
          <Users size={40} className="mx-auto text-emerald-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Community</h3>
          <p className="text-gray-400">
            Build groups and communities, and chat together effortlessly.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-4">
          Ready to Start Chatting?
        </h2>
        <p className="text-gray-400 mb-6">
          Join ChatZone today and experience the future of communication.
        </p>
        <Link
          to="/signup"
          className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-md transition"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
};

export default Home;

