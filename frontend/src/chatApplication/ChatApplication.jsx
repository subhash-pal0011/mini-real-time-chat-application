// import React, { useState } from "react";
// import LeftContainer from "./LeftContainer";
// import RightContainer from "./RightCintainer";

// const ChatApplication = () => {
//   const [leftWidth, setLeftWidth] = useState(280); // default sidebar width
//   const [dragging, setDragging] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile sidebar toggle

//   // Mouse events for resizing
//   const handleMouseDown = () => setDragging(true);
//   const handleMouseMove = (e) => {
//     if (!dragging) return;
//     const newWidth = e.clientX;
//     if (newWidth > 200 && newWidth < 500) setLeftWidth(newWidth); // limit width
//   };
//   const handleMouseUp = () => setDragging(false);

//   return (
//     <div
//       className={`flex h-screen select-none ${dragging ? "cursor-col-resize" : ""}`}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//     >
//       {/* Left Sidebar */}
//       <div
//         style={{ width: leftWidth }}
//         className={`fixed md:relative z-20 h-full bg-white shadow-md border-r border-gray-200 transition-transform duration-300
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
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
//           marginLeft: isSidebarOpen || dragging ? leftWidth : 0,
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




import React from "react";
import LeftContainer from "./LeftContainer";
import RightContainer from "./RightCintainer";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

const ChatApplication = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-800 to-gray-900 mt-15">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left Sidebar */}
          <Panel defaultSize={30} minSize={20} maxSize={40}>
            <div className="h-full overflow-y-auto bg-gray-100 border-r">
              <LeftContainer />
            </div>
          </Panel>

          {/* Thinner Blue Resize Handle */}
          <PanelResizeHandle className="w-[4px] bg-blue-500 cursor-col-resize" />

          {/* Right Chat Box */}
          <Panel>
            <div className="h-full overflow-y-auto p-4 bg-gray-50">
              <RightContainer />
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default ChatApplication;
