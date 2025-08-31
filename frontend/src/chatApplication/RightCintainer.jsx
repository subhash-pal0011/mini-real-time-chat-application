// import React, { useEffect, useRef } from "react";
// import GlobellyMessage from "../zustand/GlobellyMessage";
// import { TiMessages } from "react-icons/ti";
// import { useForm } from "react-hook-form";
// import { MdSend } from "react-icons/md";
// import axios from "axios";
// import { useUser } from "../contextApi/UserContext";
// import { useSocketContext } from "../contextApi/soketContext";

// const RightContainer = () => {
//   const { messages, setMessages, selectedConversation } = GlobellyMessage();
//   const { user } = useUser();
//   const { socket, onlineUser } = useSocketContext()
//   const messagesEndRef = useRef(null); // iska use is liye kr rhe hii jo jakr turnt input pe scrool hota hii uske liye

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { isSubmitting },
//   } = useForm();

//   const watchedText = watch("text", "");
//   const currentUserId = user?._id;



//   // ✅ Messages fetch karna jab conversation change ho
//   useEffect(() => {
//     if (!selectedConversation?._id) return;

//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`/api/getmessage/${selectedConversation._id}`);
//         if (res.data.success) {
//           setMessages(res.data.messages || []);
//         } else {
//           setMessages([]);
//         }
//       } catch (e) {
//         console.error("Message fetch error:", e.response?.data?.message || e.message);
//         setMessages([]);
//       }
//     };

//     fetchMessages();
//   }, [selectedConversation, setMessages]);

//   // ✅ Socket se realtime message sunna
//   useEffect(() => {
//     if (!socket) return;
//     const handleReceiveMessage = (newMsg) => {
//       const { selectedConversation, addMessage, incrementUnread } =
//         GlobellyMessage.getState();
//       const activeConvId = selectedConversation?.conversationId;

//       // Socket data me field ka naam "conversation" hai, na ki "conversationId"
//       const msgConvId = newMsg.conversation || newMsg.conversationId;

//       if (msgConvId === activeConvId) {
//         addMessage(newMsg);
//       } else {
//         incrementUnread(msgConvId);
//       }
//     };
//     socket.on("receiveMessage", handleReceiveMessage);
//     return () => socket.off("receiveMessage", handleReceiveMessage);
//   }, [socket]);

//   // ✅ Send message
//   const onSubmit = async (data) => {
//     if (!selectedConversation?._id || !data.text?.trim()) return;

//     try {
//       const res = await axios.post(
//         `/api/postmessage/${selectedConversation._id}`,
//         { message: data.text.trim() }
//       );

//       if (res.data.success) {
//         const newMsg = res.data.data;

//         // ✅ Yaha bhi setMessages ke jagah addMessage use karo
//         GlobellyMessage.getState().addMessage(newMsg);

//         socket.emit("sendMessage", {
//           to: selectedConversation._id,
//           from: currentUserId,
//           ...newMsg,
//         });

//         setValue("text", "");
//       }
//     } catch (e) {
//       console.error(
//         "Message send error:",
//         e.response?.data?.message || e.message
//       );
//     }
//   };

//   // ✅ ISI KI VJHA SE HUM DIRECT MESSAGE PE JA PA RHAE HII
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       const parent = messagesEndRef.current.parentNode;
//       parent.scrollTo({
//         top: parent.scrollHeight - 80, // 80px offset to not hide under input
//         behavior: "smooth",
//       });
//     }
//   }, [messages]);


//   return (
//     <div className="flex flex-col h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-xl overflow-hidden">
//       {/* Header */}
//       {selectedConversation ? (
//         <div className="flex items-center gap-3 p-2 bg-white shadow-md border-b flex-shrink-0">
//           <img
//             src={
//               selectedConversation?.profilepic?.startsWith("/")
//                 ? `https://chatify-backend-ybm4.onrender.com${selectedConversation.profilepic}`
//                 : selectedConversation?.profilepic || "/default-avatar.png"
//             }
//             alt={selectedConversation?.fullname || "User"}
//             className="w-12 h-12 rounded-full object-cover"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">
//               {selectedConversation?.fullname || "Unknown User"}
//             </h2>
//             {onlineUser.includes(selectedConversation?._id) && <p className="text-sm text-green-500 font-medium">Online</p>}
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center h-screen gap-2">
//           <TiMessages className="text-6xl text-gray-300 animate-bounce" />
//           <p className="text-center text-gray-500 text-lg">
//             Select and start conversation
//           </p>
//         </div>
//       )}

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-9 flex flex-col space-y-4 bg-gray-100">
//         {Array.isArray(messages) && messages.length > 0 ? (
//           messages.map((msg, index) => {
//             const isSender = String(msg?.sender) === String(currentUserId);
//             const createdAt = msg?.createdAt ? new Date(msg.createdAt) : new Date();

//             return (
//               <div
//                 key={msg?._id || `temp-${index}`}
//                 className={`flex ${isSender ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`relative max-w-[45%] px-2 py-1 rounded-2xl text-sm 
//                   shadow-lg transform transition-all duration-200 hover:scale-[1.02]
//                    ${isSender
//                       ? "bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-br-none border border-gray-200"
//                       : "bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 rounded-bl-none border border-gray-200"
//                     }`}
//                 >
//                   <p className="whitespace-pre-wrap leading-relaxed font-medium break-words break-all">
//                     {msg?.message}
//                   </p>
//                   <span
//                     className={`text-[11px] mt-1 block text-right ${isSender ? "text-purple-100" : "text-gray-500"}`}
//                   >
//                     {createdAt.toLocaleDateString()} ,{" "}
//                     {createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                   </span>
//                 </div>
//               </div>
//             );
//           })
//         ) : selectedConversation ? (
//           <p className="text-gray-400 text-sm text-center mt-2">No messages yet</p>
//         ) : null}

//         {/*✅ ISI KI VJHA SE HUM DIRECT MESSAGE PE JA PA RHAE HII */}
//         <div ref={messagesEndRef} />  {/*HUMKO JAHA TAK SCROOL BEHEVIOR CHAHIYE THA HUMNE VAHA AKR LIKH DIYA */}

//       </div>
//       {/* Input */}
//       {selectedConversation && (
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex items-end bg-white border border-gray-300 rounded-full px-3 py-1 shadow-sm mt-2 mx-4 mb-3"
//         >
//           <textarea
//             placeholder="Enter your message..."
//             {...register("text")}
//             rows={1}
//             maxLength={100}
//             className="outline-none w-full resize-none bg-transparent text-base max-h-32 overflow-y-auto mb-1.5 cursor-pointer"
//           />
//           <button
//             type="submit"
//             className="ml-2 p-2 rounded-full text-blue-500 hover:text-blue-600 hover:bg-blue-100 transition disabled:opacity-50 cursor-pointer"
//             disabled={isSubmitting || !watchedText?.trim()}
//           >
//             {isSubmitting ? (
//               <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
//             ) : (
//               <MdSend className="text-xl" />
//             )}
//           </button>
//         </form>

//       )}
//     </div>
//   );
// };

// export default RightContainer;








import React, { useEffect, useRef } from "react";
import GlobellyMessage from "../zustand/GlobellyMessage";
import { TiMessages } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";
import axios from "axios";
import { useUser } from "../contextApi/UserContext";
import { useSocketContext } from "../contextApi/soketContext";

const RightContainer = () => {
  const { messages, setMessages, selectedConversation } = GlobellyMessage();
  const { user } = useUser();
  const { socket, onlineUser } = useSocketContext()
  const messagesEndRef = useRef(null); // iska use is liye kr rhe hii jo jakr turnt input pe scrool hota hii uske liye

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm();

  const watchedText = watch("text", "");
  const currentUserId = user?._id;



  // ✅ Messages fetch karna jab conversation change ho
  useEffect(() => {
    if (!selectedConversation?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/getmessage/${selectedConversation._id}`);
        if (res.data.success) {
          setMessages(res.data.messages || []);
        } else {
          setMessages([]);
        }
      } catch (e) {
        console.error("Message fetch error:", e.response?.data?.message || e.message);
        setMessages([]);
      }
    };

    fetchMessages();
  }, [selectedConversation, setMessages]);

  // ✅ Socket se realtime message sunna
  useEffect(() => {
    if (!socket) return;
    const handleReceiveMessage = (newMsg) => {
      const { selectedConversation, addMessage, incrementUnread } =
        GlobellyMessage.getState();
      const activeConvId = selectedConversation?.conversationId;

      // Socket data me field ka naam "conversation" hai, na ki "conversationId"
      const msgConvId = newMsg.conversation || newMsg.conversationId;

      if (msgConvId === activeConvId) {
        addMessage(newMsg);
      } else {
        incrementUnread(msgConvId);
      }
    };
    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [socket]);

  // ✅ Send message
  const onSubmit = async (data) => {
    if (!selectedConversation?._id || !data.text?.trim()) return;

    try {
      const res = await axios.post(
        `/api/postmessage/${selectedConversation._id}`,
        { message: data.text.trim() }
      );

      if (res.data.success) {
        const newMsg = res.data.data;

        // ✅ Yaha bhi setMessages ke jagah addMessage use karo
        GlobellyMessage.getState().addMessage(newMsg);

        socket.emit("sendMessage", {
          to: selectedConversation._id,
          from: currentUserId,
          ...newMsg,
        });

        setValue("text", "");
      }
    } catch (e) {
      console.error(
        "Message send error:",
        e.response?.data?.message || e.message
      );
    }
  };

  // ✅ ISI KI VJHA SE HUM DIRECT MESSAGE PE JA PA RHAE HII
  useEffect(() => {
    if (messagesEndRef.current) {
      const parent = messagesEndRef.current.parentNode;
      parent.scrollTo({
        top: parent.scrollHeight - 80, // 80px offset to not hide under input
        behavior: "smooth",
      });
    }
  }, [messages]);


  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg rounded-xl overflow-hidden">
      {/* Header */}
      {selectedConversation ? (
        <div className="flex items-center gap-3 p-2 bg-white shadow-md border-b flex-shrink-0">
          <img
            src={
              selectedConversation?.profilepic?.startsWith("/")
                ? `https://chatify-backend-ybm4.onrender.com${selectedConversation.profilepic}`
                : selectedConversation?.profilepic || "/default-avatar.png"
            }
            alt={selectedConversation?.fullname || "User"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedConversation?.fullname || "Unknown User"}
            </h2>
            {Array.isArray(onlineUser) && onlineUser.includes(selectedConversation?._id) && (
              <p className="text-sm text-green-500 font-medium">Online</p>
            )}

          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
          <TiMessages className="text-6xl text-gray-300 animate-bounce" />
          <p className="text-center text-gray-500 text-lg">
            Select and start conversation
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-9 flex flex-col space-y-4 bg-gray-100">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => {
            const isSender = String(msg?.sender) === String(currentUserId);
            const createdAt = msg?.createdAt ? new Date(msg.createdAt) : new Date();

            return (
              <div
                key={msg?._id || `temp-${index}`}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative max-w-[45%] px-2 py-1 rounded-2xl text-sm 
                  shadow-lg transform transition-all duration-200 hover:scale-[1.02]
                   ${isSender
                      ? "bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-br-none border border-gray-200"
                      : "bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 rounded-bl-none border border-gray-200"
                    }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed font-medium break-words break-all">
                    {msg?.message}
                  </p>
                  <span
                    className={`text-[11px] mt-1 block text-right ${isSender ? "text-purple-100" : "text-gray-500"}`}
                  >
                    {createdAt.toLocaleDateString()} ,{" "}
                    {createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            );
          })
        ) : selectedConversation ? (
          <p className="text-gray-400 text-sm text-center mt-2">No messages yet</p>
        ) : null}

        {/*✅ ISI KI VJHA SE HUM DIRECT MESSAGE PE JA PA RHAE HII */}
        <div ref={messagesEndRef} />  {/*HUMKO JAHA TAK SCROOL BEHEVIOR CHAHIYE THA HUMNE VAHA AKR LIKH DIYA */}

      </div>
      {/* Input */}
      {selectedConversation && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-end bg-white border border-gray-300 rounded-full px-3 py-1 shadow-sm mt-2 mx-4 mb-3"
        >
          <textarea
            placeholder="Enter your message..."
            {...register("text")}
            rows={1}
            maxLength={100}
            className="outline-none w-full resize-none bg-transparent text-base max-h-32 overflow-y-auto mb-1.5 cursor-pointer"
          />
          <button
            type="submit"
            className="ml-2 p-2 rounded-full text-blue-500 hover:text-blue-600 hover:bg-blue-100 transition disabled:opacity-50 cursor-pointer"
            disabled={isSubmitting || !watchedText?.trim()}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <MdSend className="text-xl" />
            )}
          </button>
        </form>

      )}
    </div>
  );
};

export default RightContainer;





