
// import express from "express";
// import { Signup, upload } from "../controler/SignupControler.js";

// const router = express.Router();

// // "profilepic" = input field name in <input type="file" name="profilepic">
// router.post("/", upload.single("profilepic"), Signup);

// export default router;




import express from "express";
import multer from "multer";
import { Signup } from "../controler/SignupControler.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary/cloudinaryConfig.js"


const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chatify_users", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({ storage });

router.post("/", upload.single("profilepic"), Signup);

export default router;








