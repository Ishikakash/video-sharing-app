import express  from "express";
import { signup, signin, googleAuth } from "../controllers/auth.js";

const router = express.Router()  // user router

// CREATE A USER
router.post("/signup", signup);

// SIGN IN
router.post("/signin", signin);

// GOOGLE AUTHENTICATION
router.post("/google", googleAuth);
// you can see in redux under user your name, email and image

export default router;