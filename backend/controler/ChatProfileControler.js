import Conversation from "../models/Conversetion.js";

export const ChatProfile = async (req, res) => {
       try {
              const loginUser = req.user?._id; 

              const conversations = await Conversation.find({
                     participants: loginUser,


              }).populate("participants", "-email -password").sort({ updatedAt: -1 }); 

              if (!conversations || conversations.length === 0) {
                     return res.status(200).json([]);
              }

              const chatProfiles = conversations.map((conv) => {

                     const otherParticipants = conv.participants.filter(
                            (p) => p._id.toString() !== loginUser.toString()
                           
                     )
                     return {
                            conversationId: conv._id,
                            participants: otherParticipants,
                            lastUpdated: conv.updatedAt,
                     };
              });

              res.status(200).send(chatProfiles);
       }
       catch (e) {
              console.error("Error in ChatProfile:", e);
              res.status(500).json({ message: "Server error" });
       }
};