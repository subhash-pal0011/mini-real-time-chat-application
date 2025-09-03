// import React, { useState } from "react";
// import LeftContainer from "./LeftContainer";
// import RightContainer from "./RightCintainer";

// const ChatApplication = () => {
//   const [leftWidth, setLeftWidth] = useState(280); // desktop default width
//   const [dragging, setDragging] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile toggle

//   // Mouse events for resizing (desktop only)
//   const handleMouseDown = () => setDragging(true);
//   const handleMouseMove = (e) => {
//     if (!dragging) return;
//     const newWidth = e.clientX;
//     if (newWidth > 200 && newWidth < 500) setLeftWidth(newWidth);
//   };
//   const handleMouseUp = () => setDragging(false);

//   return (
//     <div
//       className={`flex h-screen select-none ${dragging ? "cursor-col-resize" : ""} mt-15`}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//     >
//       {/* Left Sidebar */}
//       <div
//         style={{ width: leftWidth }}
//         className={`
//           fixed z-20 h-full bg-white shadow-md border-r border-gray-200 transition-transform duration-300
//           md:relative
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//         `}
//       >
//         <LeftContainer closeSidebar={() => setIsSidebarOpen(false)} />
//       </div>

//       {/* Resize bar for desktop */}
//       <div
//         onMouseDown={handleMouseDown}
//         className="hidden md:block w-1 bg-gray-300 hover:bg-blue-100 cursor-col-resize"
//       ></div>

//       {/* Right Container */}
//       <div
//         className="flex-1 flex flex-col bg-gray-50"
//         style={{
//           marginLeft: isSidebarOpen ? leftWidth : 0, // desktop left margin
//           transition: dragging ? "none" : "margin 0.3s ease",
//         }}
//       >
//         {/* Mobile toggle button */}
//         <div className="md:hidden flex items-center justify-between p-3 border-b border-gray-200 bg-white">
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="text-gray-600 font-semibold"
//           >
//             {isSidebarOpen ? "Close" : "Chats"}
//           </button>
//         </div>

//         {/* Right chat area */}
//         <RightContainer />
//       </div>
//     </div>
//   );
// };

// export default ChatApplication;


import React, { useState } from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer"; // ✅ fix spelling

const ChatApplication = () => {
  const [leftWidth, setLeftWidth] = useState(320); // default desktop width
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
    <div className="flex flex-col h-screen">
      {/* Main Content (Header + Body) */}
      <div
        className={`flex flex-1 select-none ${dragging ? "cursor-col-resize" : ""} mt-17`}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Left Sidebar */}
        <div
          style={{ width: leftWidth }}
          className={`
            bg-white shadow-md border-r border-gray-200 transition-transform duration-300
            md:relative md:translate-x-0 md:flex-shrink-0
            ${isSidebarOpen ? "translate-x-0 fixed z-20 inset-y-0" : "-translate-x-full fixed z-20 inset-y-0 md:translate-x-0"}
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

          {/* Right chat area */}
          <RightContainer />
        </div>
      </div>

      {/* Footer */}
      <footer className="h-12 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-700 text-sm">© 2025 Chat Application</p>
      </footer>
    </div>
  );
};

export default ChatApplication;
