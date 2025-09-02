import Conversation from "../models/Conversetion.js";
import Message from "../models/Message.js";
import { io, getReceiverSocketId } from "../Socket/socket.js"; 

export const PostMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiver = req.params.id;
    const sender = req.user._id; 

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver]
      });
    }

    const newMessage = new Message({
      sender,
      receiver,
      message,
      conversation: conversation._id
    });

    const savedMessage = await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        _id: savedMessage._id,
        conversation: savedMessage.conversation,
        sender: savedMessage.sender,
        receiver: savedMessage.receiver,
        message: savedMessage.message,
        createdAt: savedMessage.createdAt,
        updatedAt: savedMessage.updatedAt,
      });
    }

    res.status(201).json({
      success: true,
      message: "Message sent ✅",
      data: savedMessage
    });

  } catch (error) {
    console.error("PostMessage error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while sending message "
    });
  }
};



