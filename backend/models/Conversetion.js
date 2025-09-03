import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
       participants: [  // ✅  EK JYADA PARTICIPATE KRNE VALE HO SKTE HII ISLIYE USE[]
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "User",  
              },
       ],
       messages: [   
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Message", 
              },
       ],
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;