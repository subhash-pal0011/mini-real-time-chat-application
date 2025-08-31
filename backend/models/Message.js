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
       conversation :{ // converstion is liye rkhe ki pata chal ske koon sender hii koon resiver.
              type : mongoose.Schema.Types.ObjectId,
              ref : 'Conversation',
              default : []
       }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;




