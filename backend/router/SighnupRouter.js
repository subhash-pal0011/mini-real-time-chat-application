
import express from "express";
import { Signup, upload } from "../controler/SignupControler.js";

const router = express.Router();

// "profilepic" = input field name in <input type="file" name="profilepic">
router.post("/", upload.single("profilepic"), Signup);

export default router;





// import express from "express";
// import { Signup } from "../controler/SignupControler.js";
// import multer from "multer";

// const router = express.Router();

// // Multer for temporary file handling
// const storage = multer.diskStorage({});
// const upload = multer({ storage });

// router.post("/", upload.single("profilepic"), Signup);

// export default router;








