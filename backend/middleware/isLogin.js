import jwt from 'jsonwebtoken';  // JWT KI HELP SE HUM VERIFY KR LETE HII.
import User from '../models/Signup.js';

export const isLogin = async (req, res, next) => {
       try {
              const token = req.cookies?.jwt;

              if (!token) {
                     return res.status(401).json({ success: false, message: "User not logged in❌" });
              }

              // ✅ JWT KI HELP SE HUM VERIFY KR LETE HII. [ JWT_SECRET ] ye secret .env file ka hii.
              const verifyUser = jwt.verify(token, process.env.JWT_SECRET);

              if (!verifyUser) {
                     return res.status(403).json({ success: false, message: "User not verify ❌" });
              }

              // ✅ Get user from  (userId) jo chij hume nhi select krni rhti o select ke under(-) mins ke sath likha jata hii.
              const user = await User.findById(verifyUser.userId).select('-password'); // userId is liye find kr rhe hii ki token mea userId hii

              if (!user) {
                     return res.status(404).json({ success: false, message: "User not found ❌" });
              }

              // ✅ Attach user to request
              req.user = user;
              next(); // 🔁 Pass control to next middleware or route

       } catch (error) {
              console.error("Auth middleware error:", error.message);
              return res.status(500).json({ success: false, message: "Server error in authentication ❌" });
       }
};
