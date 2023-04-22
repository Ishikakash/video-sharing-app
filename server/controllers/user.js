import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

export const update = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                  $set:req.body,
                },
                { new: true } // returns the newest version of the user
                )
            res.status(200).json(updatedUser)
        } catch(err) {
            next(err)
        }
    } else {
        return next(createError(403, " You can only update your account"))
    }
}
// req -> what we are getting from user
// res -> what we are sending to user

export const deleteUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);   
            res.status(200).json("user has been deleted")
        } catch(err) {
            next(err);
        }
    } else {
        return next(createError(403, " You can only delete your account"))
    }
}

export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}

export const subscribe = async (req, res, next) => {
    try{
        await User.findByIdAndUpdate(req.user.id, { // our user
            $push: { subscribedUsers: req.params.id },  // others user channel id, add channel id to my subscribed users array
          });
          await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }, // increment subscribers number
          });
          res.status(200).json("Subscription successfull.")
    } catch (err) {
        next(err)
    }
}

export const unsubscribe = async (req, res, next) => {
    try{
        try {
            await User.findByIdAndUpdate(req.user.id, {
              $pull: { subscribedUsers: req.params.id }, // we r gonna delete this user id from this subscribed users array
            });
            await User.findByIdAndUpdate(req.params.id, {
              $inc: { subscribers: -1 },  // decrease the subscriber number
            });
            res.status(200).json("Unsubscription successfull.")
            } catch (err) {
                next(err);
            }
    } catch (err) {
        next(err)
    }
}

export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try{
        await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:id},  // it makes sure that your id is in the array only once even if you click the like button again it's not gonna add again and again
        $pull:{dislikes:id}
    })
    res.status(200).json("The video has been liked.")
    }catch (err) {
        next(err)
    }
}

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try{
        await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
    })
    res.status(200).json("The video has been disliked.")
    } catch (err) {
        next(err)
    }
}
