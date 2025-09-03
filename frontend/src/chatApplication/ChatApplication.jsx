import React, { useState } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightCintainer";

const ChatApplication = () => {
  const [leftWidth, setLeftWidth] = useState(300); // default width
  const [dragging, setDragging] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile toggle

  // Mouse events for resizing (desktop only)
  const handleMouseDown = () => setDragging(true);
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const newWidth = e.clientX;
    if (newWidth > 220 && newWidth < 480) setLeftWidth(newWidth); // safe range
  };
  const handleMouseUp = () => setDragging(false);

  return (
    <div
      className={`flex h-screen bg-gray-100 select-none ${
        dragging ? "cursor-col-resize" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Left Sidebar */}
      <div
        style={{ width: leftWidth }}
        className={`
          bg-white shadow-lg border-r border-gray-200 transition-transform duration-300
          fixed inset-y-0 z-20
          md:relative md:translate-x-0 md:flex-shrink-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <LeftContainer />
      </div>

      {/* Resize bar (desktop only) */}
      <div
        onMouseDown={handleMouseDown}
        className="hidden md:block w-1 bg-gray-300 hover:bg-blue-200 transition-colors cursor-col-resize"
      ></div>

      {/* Right Side (Chat Area) */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-3 border-b border-gray-200 bg-white shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Chatify</h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="px-3 py-1 text-sm font-medium rounded-md bg-blue-500 text-white shadow-md hover:bg-blue-600 transition"
          >
            {isSidebarOpen ? "Close" : "Chats"}
          </button>
        </div>

        {/* Chat Content */}
        <RightContainer />
      </div>
    </div>
  );
};

export default ChatApplication;



