// import User from "../models/Signup.js";
// import bcrypt from "bcryptjs";  // hash password ke liye
// import jwtToken from "../token/Token.js";

// // ye tine uplod photo ke liye hii.
// import multer from "multer";
// import path from "path";
// import fs from "fs";


// // Multer setup MTLB PHOTO UPLOD KRNE KA SET UP YAHI HII.
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = "uploads/";
//         if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         cb(null, Date.now() + ext);
//     },
// });
// export const upload = multer({ storage });

// export const Signup = async (req, res) => {
//     try {
//         // console.log("Request Body:", req.body); // Debug

//         const { fullname, username, email, password, gender } = req.body;

//         const profilepic = req.file ? `/uploads/${req.file.filename}` : "";

//         // HUM FIND IS LIYE EMAIL AND USERNAME PE KR RHE HII KYUKI INHI DONO KO UNIQUE BANAYA HII SCHEMA PR
//         const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//         if (existingUser) {
//             return res.status(409).json({
//                 success: false, message: existingUser.email === email
//                     ? "Email already exists!"
//                     : "Username already exists!"
//             });
//         }

//         const hashPassword = bcrypt.hashSync(password, 10);

//         //  encodeURIComponent space ko hataata nahi hai, balki usko safe code me convert karta hai. EXP >>>  TUMNE LISKHA SUBHASH PAL TO HO JAYEGA == Subhash%20pal
//         const name = encodeURIComponent(fullname || "guest");
//         const defaultProfilePic = `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=128`;

//         const pic = (typeof profilepic === "string" && profilepic.trim() !== "")
//             ? profilepic.trim()
//             : defaultProfilePic;


//         const newUser = new User({
//             fullname,
//             username,
//             email,
//             password: hashPassword,
//             gender,
//             profilepic: pic,
//         });

//         await newUser.save(); // SAVE KR DIYE DATABASE MEA

//         jwtToken(newUser?._id, res) // ? bich mea is liye use kiye ki agr new user undefine ho to code tute na isse error nhi ayega bs undeffine ho jayega.


//         // HUMKO FRONTEND MEA KYA KYA DIKHNA HII
//         res.status(201).json({
//             success: true,
//             message: `welcome ${username} 🎉`,
//             user: {
//                 _id: newUser._id,  // ID LGBHAG BHEJ DIYA KRO KYUKI ID KE HISB SE KOI KAM LAG SAYE CURRENT SIGNUP KOON HII
//                 fullname: newUser.fullname,
//                 email: newUser.email,
//                 username: newUser.username,
//                 profilepic: newUser.profilepic,
//             },
//         });
//     }
//     catch (error) {
//         console.error("Signup error:", error.message);
//         res.status(500).json({ success: false, message: "Server error during signup ❌" });
//     }
// };





import User from "../models/Signup.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

// Multer setup
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

// JWT helper
const jwtToken = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET || "secret123", {
        expiresIn: "1d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
};

// Signup controller
export const Signup = async (req, res) => {
    try {
        const { fullname, username, email, password, gender } = req.body;

        const profilepic = req.file ? `/uploads/${req.file.filename}` : "";

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message:
                    existingUser.email === email ? "Email already exists!" : "Username already exists!",
            });
        }

        const hashPassword = bcrypt.hashSync(password, 10);

        // Default profile pic
        const name = encodeURIComponent(fullname || "guest");
        const defaultProfilePic = `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=128`;

        const pic = profilepic.trim() || defaultProfilePic;

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profilepic: pic,
        });

        await newUser.save();

        // Set JWT cookie
        jwtToken(newUser._id, res);

        // Send JSON response
        res.status(201).json({
            success: true,
            message: `Welcome ${username} 🎉`,
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                username: newUser.username,
                profilepic: newUser.profilepic,
            },
        });
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ success: false, message: "Server error during signup ❌" });
    }
};

