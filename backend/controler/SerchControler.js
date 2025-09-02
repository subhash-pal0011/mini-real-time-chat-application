import User from "../models/Signup.js";

export const Search = async (req, res) => {
       try {
              const serchbarString = req.query.search || ""; 
              const currentUser = req.user?._id; 
              const findUser = await User.find({
                     $and: [ 
                            {
                                   $or: [ 
                                          { username: { $regex: ".*" + serchbarString + ".*", $options: "i" } },
                                          { fullname: { $regex: ".*" + serchbarString + ".*", $options: "i" } },
                                   ]
                            },
                            { _id: { $ne: currentUser } } 
                     ]
              }).select("-password -email"); 

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
