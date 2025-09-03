import User from "../models/Signup.js";
import bcrypt from "bcryptjs"; 
import jwtToken from "../token/Token.js";

import multer from "multer";
import path from "path";
import fs from "fs";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
export const upload = multer({ storage });

export const Signup = async (req, res) => {
  try {

    const { fullname, username, email, password, gender } = req.body;

    const profilepic = req.file ? `/uploads/${req.file.filename}` : "";
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({
        success: false, message: existingUser.email === email
          ? "Email already exists!"
          : "Username already exists!"
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);


    const name = encodeURIComponent(fullname || "guest");
    const defaultProfilePic = `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=128`;

    const pic = (typeof profilepic === "string" && profilepic.trim() !== "")
      ? profilepic.trim()
      : defaultProfilePic;


    const newUser = new User({
      fullname,
      username,
      email,
      password: hashPassword,
      gender,
      profilepic: pic,
    });

    await newUser.save(); 

    jwtToken(newUser?._id, res) /

    res.status(201).json({
      success: true,
      message: `welcome ${username} 🎉`,
      user: {
        _id: newUser._id,  
        fullname: newUser.fullname,
        email: newUser.email,
        username: newUser.username,
        profilepic: newUser.profilepic,
      },
    });
  }
  catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ success: false, message: "Server error during signup ❌" });
  }
};
