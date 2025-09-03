import { create } from "zustand";

const GlobellyMessage = create((set, get) => ({
  messages: [], 
  selectedConversation: null,
  unreadCounts: {}, // message count

  setMessages: (msgs) => set({ messages: Array.isArray(msgs) ? msgs : [] }),
  
  addMessage: (msg) =>
    set((state) => ({
      messages: [...(Array.isArray(state.messages) ? state.messages : []), msg],
    })),

  setSelectedConversation: (conv) =>
    set({ selectedConversation: conv, messages: [] }),

  clearUnread: (conversationId) =>
    set((state) => ({
      unreadCounts: { ...state.unreadCounts, [conversationId]: 0 },
    })),

  incrementUnread: (conversationId) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [conversationId]: (state.unreadCounts[conversationId] || 0) + 1,
      },
    })),
}));

export default GlobellyMessage;