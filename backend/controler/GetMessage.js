import Message from "../models/Message.js";
import Conversation from "../models/Conversetion.js";

export const GetMessage = async (req, res) => {
       try {

              // dekho recever mea _id kyu nhi lagi kyuki o frontend se ayega. id
              const receiver = req.params.id; // jese SQL MEA REQ.PARAMS HOTA HIII VESE MONGODB MEA ID KO SELECT KRNE KE LIYE ID OBJECT FORM ME RHATI HII TO USE ID SMJHNE KE LIYE REQ.PARAMS.ID USE KRTE HII.


              // ye jo user likha hii signup ke under user:{} crete nhi kiya gya hii o hii
              const sender = req.user._id;  // SENDER KOON REGA JO SIGNUP RHEGA TO USER NIKLNE KE LIYE ID USE KIYE HII JB LOGIN USER CHAHIYE TO USE _ID


              const conversation = await Conversation.findOne({
                     participants: { $all: [sender, receiver] },
              });

              if (!conversation) { // AGR KOI BATCHIT NHI MILA TO RETURN KAR DO SIMPLE []
                     return res.status(200).json([]);
              }

              const messages = await Message.find({ conversation: conversation._id })
                     .select("message sender receiver senderId createdAt")  // SELCT MEA HUME KEVL MESSAGE CHAHIYE TO MESSAGE AND ID BY DEFULT A RHA HII TO - KARKE JO LIKH DOGE TO O NHI AYEGA.

                     // 1 MTLB >> 1 = ascending order
                     .sort({ createdAt: 1 }); // MTLB MESSAGE DIKHO DATE AND TIME KE HISB SE


              res.status(200).json({
                     success: true,
                     messages,
              });
       } catch (error) {
              console.error(error);
              res.status(500).json({ success: false, message: "Server error" });
       }
};



