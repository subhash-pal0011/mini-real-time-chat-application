import Message from "../models/Message.js";
import Conversation from "../models/Conversetion.js";

export const GetMessage = async (req, res) => {
       try {

 
              const receiver = req.params.id; 

              const sender = req.user._id;  

              const conversation = await Conversation.findOne({
                     participants: { $all: [sender, receiver] },
              });

              if (!conversation) { 
                     return res.status(200).json([]);
              }

              const messages = await Message.find({ conversation: conversation._id })
                     .select("message sender receiver senderId createdAt")  

                     .sort({ createdAt: 1 });


              res.status(200).json({
                     success: true,
                     messages,
              });
       } catch (error) {
              console.error(error);
              res.status(500).json({ success: false, message: "Server error" });
       }
};