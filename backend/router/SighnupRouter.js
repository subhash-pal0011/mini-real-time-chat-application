
import express from "express";
import { Signup, upload } from "../controler/SignupControler.js";

const router = express.Router();

// "profilepic" = input field name in <input type="file" name="profilepic">
router.post("/", upload.single("profilepic"), Signup);

export default router;


