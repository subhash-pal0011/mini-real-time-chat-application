import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrLinkPrevious } from "react-icons/gr";
import axios from "axios";
import { useUser } from "../contextApi/UserContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import GlobellyMessage from "../zustand/GlobellyMessage";
import debounce from "lodash.debounce";
import { useSocketContext } from "../contextApi/soketContext";

const LeftContainer = () => {
  const { register, watch, setValue } = useForm();
  const searchValue = watch("text", "");
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const { user } = useUser();
  const { setSelectedConversation, clearUnread, unreadCounts } = GlobellyMessage();
  const token = localStorage.getItem("chatApplication");
  const { onlineUser } = useSocketContext();

  if (!user || !token) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Please login to see your chats
      </div>
    );
  }

  const fetchSearchUsers = async (query) => {
    if (!query) {
      setSearchUser([]);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get("/api/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: query },
      });
      if (res.data.success && res.data.data.length > 0) {
        setSearchUser(res.data.data);
      } else {
        setSearchUser([]);
        toast.info("User not found!");
      }
    } catch (e) {
      console.error("Search error:", e.response?.data?.message || e.message);
      setSearchUser([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchSearchUsers, 500), []);

  useEffect(() => {
    if (searchValue) {
      debouncedSearch(searchValue);
    } else {
      setSearchUser([]);
    }
  }, [searchValue, debouncedSearch]);

  const fetchChaters = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/chatprofile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatUser(res.data?.length > 0 ? res.data : []);
    } catch (e) {
      console.error("Chat fetch error:", e.response?.data?.message || e.message);
      setChatUser([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChaters();
  }, []);

  const handleBackClick = () => {
    setSearchUser([]);
    setValue("text", "");
  };

  const handleSelectChat = (chat) => {
    setSelectedConversation(chat);
    clearUnread(chat.conversationId);
    handleBackClick();
  };

  const chatWithMessages = chatUser
    .map((conv) => {
      const otherParticipants = conv.participants.filter((p) => p._id !== user._id);
      if (otherParticipants.length === 0) return null;
      const participant = otherParticipants[0];
      return {
        ...participant,
        conversationId: conv.conversationId,
        lastUpdated: conv.lastUpdated,
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-lg">
      {/* HEADER */}
      <div className="border-b border-gray-200 bg-white/70 backdrop-blur-md flex justify-between px-6 items-center sticky top-0 z-10 py-3">
        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">Chats</h2>
        <motion.img
          src={
            user?.profilepic?.startsWith("/")
              ? `https://chatify-z6db.onrender.com${user.profilepic}`
              : user?.profilepic || "/default-avatar.png"
          }
          alt="profile"
          className="w-11 h-11 rounded-full object-cover cursor-pointer"
          whileHover={{
            scale: 1.15,
            boxShadow: "0 0 20px rgba(236,72,153,0.10), 0 0 40px rgba(214, 219, 226,0.6)",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>

      {/* SEARCH BAR */}
      <div className="p-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search..."
            {...register("text")}
            className="w-full pl-10 pr-10 py-3 rounded-full bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-400 transition-all duration-300 cursor-pointer"
          />
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 text-lg" />
          {loading && (
            <AiOutlineLoading3Quarters className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 text-lg animate-spin" />
          )}
        </div>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {searchUser.length > 0 ? (
          <div>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
              <GrLinkPrevious
                size={25}
                className="text-gray-600 cursor-pointer hover:text-blue-500 transition-colors"
                onClick={handleBackClick}
              />
              <span className="text-sm font-medium text-gray-600">Back</span>
            </div>
            {searchUser.map((u) => {
              const isOnline = onlineUser.includes(u._id);
              return (
                <div
                  key={u._id}
                  onClick={() => handleSelectChat(u)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-all border-b border-gray-200 last:border-b-0"
                >
                  <div className="relative">
                    <img
                      src={
                        u?.profilepic?.startsWith("/")
                          ? `https://chatify-z6db.onrender.com${u.profilepic}`
                          : u?.profilepic || "/default-avatar.png"
                      }
                      alt={u.fullname}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                  </div>
                  <span className="font-medium text-gray-800">{u.fullname}</span>
                </div>
              );
            })}
          </div>
        ) : chatWithMessages.length > 0 ? (
          <div>
            <p className="px-3 py-2 text-sm font-semibold text-gray-500">Recent Chatters</p>
            {chatWithMessages.map((c) => {
              const isOnline = onlineUser.includes(c._id);
              return (
                <div
                  key={c.conversationId}
                  onClick={() => handleSelectChat(c)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-all border-b border-gray-300 last:border-b-0"
                >
                  <div className="relative">
                    <img
                      src={
                        c?.profilepic?.startsWith("/")
                          ? `https://chatify-z6db.onrender.com${c.profilepic}`
                          : c?.profilepic || "/default-avatar.png"
                      }
                      alt={c.fullname}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500"></span>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <span className="font-medium text-gray-800">{c.fullname}</span>
                    <span className="text-xs text-gray-500 truncate">
                      Last message: {new Date(c.lastUpdated).toLocaleDateString()} ,{" "}
                      {new Date(c.lastUpdated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {unreadCounts[c.conversationId] > 0 && (
                      <span className="ml-auto bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {unreadCounts[c.conversationId]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-10 text-sm">💬 No chatters yet</p>
        )}
      </div>
    </div>
  );
};

export default LeftContainer;
