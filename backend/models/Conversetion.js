import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
       participants: [  // ✅  EK JYADA PARTICIPATE KRNE VALE HO SKTE HII ISLIYE USE[]
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "User",  // ✅ Reference to User schema
              },
       ],
       messages: [      // ✅ Typo fix: message → messages
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Message",  // ✅ Reference to Message schema
              },
       ],
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;

