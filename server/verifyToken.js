import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) return next(createError(401, "You are not authenticated "))

    // we will have a token but it is not verified
    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) return next(createError(403, "Token is not valid!"))
        req.user = user; // we are assigning this jwt object to our request and user so we are able to use this in any api
        next()
    })
} // we are gonna take the access token from our cookie, when we sign in we will take the access taken