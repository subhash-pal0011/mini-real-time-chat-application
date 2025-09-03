import React, { useState } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightCintainer";

const ChatApplication = () => {
  const [leftWidth, setLeftWidth] = useState(320); // default width
  const [dragging, setDragging] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile toggle

  // Mouse events for resizing (desktop only)
  const handleMouseDown = () => setDragging(true);
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const newWidth = e.clientX;
    if (newWidth > 200 && newWidth < 500) setLeftWidth(newWidth);
  };
  const handleMouseUp = () => setDragging(false);

  return (
    <div
      className={`flex h-screen select-none ${dragging ? "cursor-col-resize" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Left Sidebar */}
      <div
        style={{ width: leftWidth }}
        className={`
          bg-white shadow-md border-r border-gray-200 transition-transform duration-300
          fixed inset-y-0 z-20
          md:relative md:translate-x-0 md:flex-shrink-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <LeftContainer closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Resize bar for desktop */}
      <div
        onMouseDown={handleMouseDown}
        className="hidden md:block w-1 bg-gray-300 hover:bg-blue-100 cursor-col-resize"
      ></div>

      {/* Right Container */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Mobile toggle button */}
        <div className="md:hidden flex items-center justify-between p-3 border-b border-gray-200 bg-white">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 font-semibold"
          >
            {isSidebarOpen ? "Close" : "Chats"}
          </button>
        </div>

        <RightContainer />
      </div>
    </div>
  );
};

export default ChatApplication;



