import Conversation from "../models/Conversetion.js";

export const ChatProfile = async (req, res) => {
       try {
              const loginUser = req.user?._id; // hum phle login user nikl lenge


              // HUM CONVERSATION SE FIND KR LENGE
              const conversations = await Conversation.find({
                     participants: loginUser,

                     // populate() ka kaam hai: Reference ko follow karke poora document laana, na ki sirf uska ObjectId. populate se to pura data to a jayega bt pure data me ahume email and password nhi chahiye

              }).populate("participants", "-email -password").sort({ updatedAt: -1 }); // HUMKO HR BAR LETEST USER CHAHIYE MTLB JISSE HUM BAT KRE AND JISKA KOI MESSAGE AYE O TOP PE DIKHE.

              if (!conversations || conversations.length === 0) {//KOI CONVERSATION NHI RETURN []
                     return res.status(200).json([]);
              }


              // CONVERT TO TRING FORM
              const chatProfiles = conversations.map((conv) => {

                     //filter KI  HELP SE HUM OBJ ID KO STRING KE FORM MEA CONVERT KR RHE HII.
                     const otherParticipants = conv.participants.filter(
                            (p) => p._id.toString() !== loginUser.toString()
                            // IS LINE KA MTLB HOO AGR JO USER LOGIN HII AND JO MONGODB MEA USER HII AGR METCH KRTA HII TO NA BHEJO AGR METCH NHI KRTA TO BHEJ DO.
                     )
                     return {
                            conversationId: conv._id,
                            participants: otherParticipants,
                            lastUpdated: conv.updatedAt,
                     };
              });

              // FRONTERND MEA HUME KYA KYA DIKHANA HII HUM AGR DAIRECT SEND KR DE conversations KO TO HUME OBHECT ID KE ALVA KUCCH NHI DIKHEGA IS LIYE ISKE UPR HUM CONVERT KIYE HII.
              res.status(200).send(chatProfiles);
       } catch (e) {
              console.error("Error in ChatProfile:", e);
              res.status(500).json({ message: "Server error" });
       }
};








