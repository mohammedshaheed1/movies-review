import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import asyncHandler from './asyncHandler.js'


const  authenticate = asyncHandler(async(req,res,next)=>{
      let token;

      //read JWT from jwt cookie
      token=req.cookies.jwt
      if(token){
        try {
             const decoded =jwt.verify(token,process.env.JWT_SECRET)
             req.user =await User.findById(decoded.userId).select('-password')
             next()
        } catch (error) {
             res.status(401)
             throw new Error("not authorized token failed")
        }
      }else{
          res.status(401)
          throw new Error("Not authorized no token")
      }
})

//check if the user is admin or not
const authorizeAdmin=(req,res,next)=>{
      if(req.user && req.user.isAdmin){
        next()
      }
      else{
        res.status(401).send("not authorized as an admin")
      }
}


export {authenticate,authorizeAdmin}