// import React, { useState } from "react";
// import LeftContainer from "./LeftContainer";
// import RightContainer from "./RightCintainer";

// const ChatApplication = () => {
//   const [leftWidth, setLeftWidth] = useState(280); // default width
//   const [dragging, setDragging] = useState(false);

//   const handleMouseDown = () => setDragging(true);

//   const handleMouseMove = (e) => {
//     if (!dragging) return;
//     const newWidth = e.clientX;
//     if (newWidth > 200 && newWidth < 500) {
//       setLeftWidth(newWidth);
//     }
//   };

//   const handleMouseUp = () => setDragging(false);

//   return (
//     <div
//       className={`flex h-screen select-none ${dragging ? "cursor-col-resize" : ""} mt-17`}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//     >
//       {/* Left Sidebar */}
//       <div
//         style={{ width: leftWidth }}
//         className="border-r border-gray-200 bg-white shadow-md overflow-hidden"
//       >
//         <LeftContainer />
//       </div>

//       {/* Resize Bar */}
//       <div
//         onMouseDown={handleMouseDown}
//         className={`w-1 bg-gray-300 hover:bg-blue-100 ${dragging ? "bg-blue-500" : ""}`}
//       ></div>

//       {/* Right Container */}
//       <div className="flex-1 bg-gray-50">
//         <RightContainer />
//       </div>
//     </div>
//   );
// };

// export default ChatApplication;



import React, { useState } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";

const ChatApplication = () => {
  const [leftWidth, setLeftWidth] = useState(280); // default width
  const [dragging, setDragging] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile sidebar toggle

  const handleMouseDown = () => setDragging(true);
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const newWidth = e.clientX;
    if (newWidth > 200 && newWidth < 500) {
      setLeftWidth(newWidth);
    }
  };
  const handleMouseUp = () => setDragging(false);

  return (
    <div
      className={`flex h-screen select-none ${dragging ? "cursor-col-resize" : ""} relative`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Left Sidebar */}
      <div
        style={{ width: leftWidth }}
        className={`fixed md:relative z-30 h-full border-r border-gray-200 bg-white shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center px-4 py-3 md:hidden border-b border-gray-200">
          <h2 className="text-lg font-semibold">Chats</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <LeftContainer />
      </div>

      {/* Resize Bar (only on md+ screens) */}
      <div
        onMouseDown={handleMouseDown}
        className={`hidden md:block w-1 bg-gray-300 hover:bg-blue-100 ${dragging ? "bg-blue-500" : ""}`}
      ></div>

      {/* Right Container */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between bg-white shadow-md px-4 py-3 border-b">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="font-semibold text-lg">Chat</h1>
        </div>

        <RightContainer />
      </div>
    </div>
  );
};

export default ChatApplication;
