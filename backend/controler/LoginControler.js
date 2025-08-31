import User from "../models/Signup.js";
import bcrypt from "bcryptjs";
import jwtToken from "../token/Token.js";

export const Login = async (req, res) => {
       try {
              const { email, password } = req.body;

              // 🔍 Find user by email
              const findData = await User.findOne({ email });
              if (!findData) {
                     return res.status(401).send({ success: false, message: "User does not exist" });
              }

              // 🔐 Compare password with hashed password
              const comparePassword = bcrypt.compareSync(password, findData.password);
              if (!comparePassword) {
                     return res.status(400).send({ success: false, message: "Incorrect password " });
              }

              // ✅ humko token login hone ke bad bhi chahiye is liye 
              jwtToken(findData._id, res);

              // ✅ hume login hone ke bad frontend mea kya kya dikhana hii
              res.status(200).send({
                     success: true,
                     message: "Login successful",
                     user: {
                            _id: findData._id,  // id bhejna jaruri hii kyuki jb chat kroge to currnebt user ke hisb se left right message dikhna pdta hii.
                            fullname: findData.fullname,
                            email: findData.email,
                            username: findData.username,
                            profilepic: findData.profilepic,
                     },
              });
       } catch (error) {
              console.error("Login error:", error.message);
              res.status(500).send({ success:false,message:"Server error during login " });
       }
};

