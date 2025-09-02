import User from "../models/Signup.js";
import bcrypt from "bcryptjs";
import jwtToken from "../token/Token.js";

export const Login = async (req, res) => {
       try {
              const { email, password } = req.body;

              const findData = await User.findOne({ email });
              if (!findData) {
                     return res.status(401).send({ success: false, message: "User does not exist" });
              }

              const comparePassword = bcrypt.compareSync(password, findData.password);
              if (!comparePassword) {
                     return res.status(400).send({ success: false, message: "Incorrect password " });
              }

              jwtToken(findData._id, res);

              res.status(200).send({
                     success: true,
                     message: "Login successful",
                     user: {
                            _id: findData._id,  
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
