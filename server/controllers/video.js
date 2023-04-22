import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body }); // when we upload any video we are gonna edit here
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));
        if (req.user.id === video.userId) {
          const updatedVideo = await Video.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedVideo);
        } else {
            return next(createError(403, "You can update only your video!"));
        }
      } catch (err) {
        next(err);
      }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id); // we are gonna compare this user id with our user id
        if (!video) return next(createError(404, "Video not found!"));
        if (req.user.id === video.userId) {  // compare user id
          await Video.findByIdAndDelete(req.params.id,);
          res.status(200).json("The video has been deleted.");
        } else {
          return next(createError(403, "You can delete only your video!"));
        }
      } catch (err) {
        next(err);
      }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id); // gonna find the video and return
        res.status(200).json(video);
      } catch (err) {
        next(err);
      }
}

export const addView = async (req, res, next) => {
    try {
      await Video.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
      });
      res.status(200).json("The view has been increased.");
    } catch (err) {
      next(err);
    }
  };
  
export const random = async (req, res, next) => {
    try {
      const videos = await Video.aggregate([{ $sample: { size: 40 } }]); // return us a random sample
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };
  
  export const trend = async (req, res, next) => {
    try {
      const videos = await Video.find().sort({ views: -1 }); // bring the most viewed videos, 1 for less viewed
      res.status(200).json(videos); 
    } catch (err) {
      next(err);
    }
  };
  
  export const sub = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const subscribedChannels = user.subscribedUsers;
  
      const list = await Promise.all(   // create a list with promise loop, find every videos of those channel
        subscribedChannels.map(async (channelId) => {
          return await Video.find({ userId: channelId });
        })
      );
   
      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt)); // to see the newest videos first
    } catch (err) {
      next(err);
    }
  };
  
  export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",")     // query to take all the strings
  console.log(tags)
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20); // it look inside arrays amd checks whether a specific element inside this array or not
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
}
  
  export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },  // return the title, UC/LC is not imp 
      // if you search for 1st it will return the title that has 1st in it
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
    }
  };