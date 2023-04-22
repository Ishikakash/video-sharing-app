import express  from "express";
import { update, deleteUser, getUser, subscribe, unsubscribe, like, dislike  } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router()  // user router

// update user
router.put("/:id", verifyToken, update) // put method becoz updating an existing user
// acc to this id we can update our user
// verifytoken => it is gonna be our middleware which means whenever we make this api request its going to verify token function 
// and it will check if everything is okay it gonna assign our user id 

// delete user
router.delete("/:id", verifyToken, deleteUser)

// get a user
router.get("/find/:id", getUser)

// subscribe a user
router.put("/sub/:id",verifyToken, subscribe)

// unsubscribe a user
router.put("/unsub/:id",verifyToken, unsubscribe)

// like a video
router.put("/like/:videoId",verifyToken, like)

// dislike a video
router.put("/dislike/:videoId",verifyToken, dislike)

export default router;