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




import React from 'react'

const ChatApplication = () => {
  return (
    <div>
      
    </div>
  )
}

export default ChatApplication
