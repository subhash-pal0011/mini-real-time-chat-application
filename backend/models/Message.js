import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
       sender: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
       },
       receiver: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
       },
       message: {
              type: String,
              required: true,
       },
       conversation: { // 👉 We keep a Conversation so that we can know who the sender is and who the receiver is
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Conversation',
              default: []
       }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;




