import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../error.js";
import jwt  from "jsonwebtoken";

export const signup = async(req, res, next) => {
    //console.log(req.body);
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash}) // using spread opr to take every property, changing password
        
        // saved it to mongo db
        await newUser.save()   // async operation
        res.status(200).send("User has been created!")
    } catch(err){
        next(err);
    }
}

// we r taking req from user and sending res to user
// it was the first route and controller above next we r going for sign in

export const signin = async(req, res, next) => {
    try {
        // try to find out user using the MONGODB method
        const user = await User.findOne({name: req.body.name}) // it is gonna look into user collection try to findone which has a name(test)
        if(!user) return next(createError(404, "user not found"))
    
        // comparing password, correct or not
        const isCorrect = await bcrypt.compare(req.body.password, user.password) // what we sent req body and password and second one will be the password inside our db
        if(!isCorrect) return next(createError(400, "wrong password"))

        const token = jwt.sign({id: user._id}, process.env.JWT) // you can send here any user info like user id
        const {password, ...others} = user._doc
        // it is gonna take our id and create a hash token and we r gonna take this token and send to our user after login process
        // we can send it to user by using cookie
        res
        .cookie("access_token", token,{  // add configuration
            httpOnly: true  // its gonna make our app. more secure under third party scripts not will be able to use our cookie
        })
        .status(200)
        .json(others) // u can see the hashed access token
        // we are going to use this id(cookie) to identify our user
    } catch(err){
        next(err);
    }
}
// insomnia json body = we gonna send our user info but at the same time we gonna 
// send an access token, we r gonna use this token when we want to delete, upload, 
// make any comments and we r gonna verify our user, we are going to use JSON WEB TOKEN

export const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {  // already registered before so we are gonna send our cookie and info
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(user._doc);
      } else {  // we don't have a user
        const newUser = new User({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(savedUser._doc);
      }
    } catch (err) {
      next(err);
    }
  };