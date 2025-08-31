import User from "../models/Signup.js";

export const Search = async (req, res) => {
       try {
              const serchbarString = req.query.search || ""; // ✅ISKE THROUGH HUM STRING KO GET KRTE HII JAHA SURCH VALA OPTION BANA RHTA HII.

              const currentUser = req.user?._id; //ISKE THRUGH HUM LOGIN USER KO NIKL LENGE.

              const findUser = await User.find({
                     $and: [ //JB HUME MONGODB MEA DO OPTION CHUS KRNA RHATA HII TO USE KRTE HII
                            {
                                   $or: [ //✅ JB DONO MEA SE KOI EK SELECT KRNA RHTA HII TO USE KRTE HII.
                                          { username: { $regex: ".*" + serchbarString + ".*", $options: "i" } },
                                          { fullname: { $regex: ".*" + serchbarString + ".*", $options: "i" } },
                                   ]
                            },
                            { _id: { $ne: currentUser } }  //✅ $ne ISKA MTLB FIND MT KRNA.
                     ]
              }).select("-password -email"); // ✅ correct syntax

              res.status(200).json({
                     success: true,
                     data: findUser
              });

       } catch (e) {
              console.error("Search error:", e.message);
              res.status(500).json({
                     success: false,
                     message: "Server error while searching"
              });
       }
};
