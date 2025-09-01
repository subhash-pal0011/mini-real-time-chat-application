// import { create } from "zustand";
// const GlobellyMessage = create((set) => ({
//   messages: [],
//   selectedConversation: null,
//   unreadCounts: {},   // 👈 unread message ginne ke liye
//   setMessages: (msgs) =>
//     set(() => ({
//       messages: Array.isArray(msgs) ? msgs : [],
//     })),

//   addMessage: (msg) =>
//     set((state) => ({
//       messages: [...(state.messages || []), msg],
//     })),

//   incrementUnread: (conversationId) =>
//     set((state) => ({
//       unreadCounts: {
//         ...state.unreadCounts,
//         [conversationId]: (state.unreadCounts[conversationId] || 0) + 1,
//       },
//     })),

//   clearUnread: (conversationId) =>
//     set((state) => {
//       const updated = { ...state.unreadCounts };
//       delete updated[conversationId];
//       return { unreadCounts: updated };
//     }),

//   setSelectedConversation: (conv) => set({ selectedConversation: conv }),
// }));


// export default GlobellyMessage;






import { create } from "zustand";

const GlobellyMessage = create((set) => ({
  messages: [],
  selectedConversation: null,
  unreadCounts: {},

  setMessages: (msgs) =>
    set(() => ({
      messages: Array.isArray(msgs) ? msgs : [],
    })),

  addMessage: (msg) =>
    set((state) => ({
      messages: [...(state.messages || []), msg],
    })),

  incrementUnread: (conversationId) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [conversationId]: (state.unreadCounts[conversationId] || 0) + 1,
      },
    })),

  clearUnread: (conversationId) =>
    set((state) => {
      const updated = { ...state.unreadCounts };
      delete updated[conversationId];
      return { unreadCounts: updated };
    }),

  setSelectedConversation: (conv) => set({ selectedConversation: conv }),
}));

export default GlobellyMessage;
