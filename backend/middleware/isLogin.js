import jwt from 'jsonwebtoken'; 
import User from '../models/Signup.js';

export const isLogin = async (req, res, next) => {
       try {
              const token = req.cookies?.jwt;

              if (!token) {
                     return res.status(401).json({ success: false, message: "User not logged in❌" });
              }

              const verifyUser = jwt.verify(token, process.env.JWT_SECRET);

              if (!verifyUser) {
                     return res.status(403).json({ success: false, message: "User not verify ❌" });
              }
              const user = await User.findById(verifyUser.userId).select('-password'); 
              if (!user) {
                     return res.status(404).json({ success: false, message: "User not found ❌" });
              }

              req.user = user;
              next(); 

       } catch (error) {
              console.error("Auth middleware error:", error.message);
              return res.status(500).json({ success: false, message: "Server error in authentication ❌" });
       }
};
