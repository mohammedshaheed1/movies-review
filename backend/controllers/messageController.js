//Get all users except the logged in user

import { io, userSocketMap } from "../index.js"
import Message from "../models/Message.js"
import User from "../models/User.js"

export const getUserForSidebar=async(req,res)=>{
      try {
           const userId=req.user._id
           const filteredusers=await User.find({_id:{$ne:userId}}).select("-password")

           //count number of messages not seen
           const unseenMessages={}
           const promises=filteredusers.map(async(user)=>{
              const messages=await Message.find({senderId:user._id,receiverId:userId,seen:false})
              if(messages.length>0){
                   unseenMessages[user._id]=messages.length;
              }
           })
           await Promise.all(promises);
           res.json({success:true,users:filteredusers,unseenMessages})
      } catch (error) {
           console.log(error.message)
           res.json({success:false,message:error.message})
      }
}

//get all messages selected users

export const getMessages=async(req,res)=>{
     try {
           const {id:selectedUserId}=req.params;
           const myId=req.user._id;
           const messages=await Message.find({$or:[
            {senderId:myId,receiverId:selectedUserId},
            {senderId:selectedUserId,receiverId:myId}
           ]})
           await Message.updateMany({senderId:selectedUserId,receiverId:myId},{seen:true})

           res.json({success:true,messages})
     } catch (error) {
           console.log(error.message)
           res.json({success:false,message:error.message})
     }
}


//api to mark messages as seen using messages id

export const markMessageAsseen=async(req,res)=>{
    
    try {
        const {id}=req.params;
        await Message.findByIdAndUpdate(id,{seen:true})
        res.json({success:true})
        
    } catch (error) {
           console.log(error.message)
           res.json({success:false,message:error.message})
    }
}


//send message to selected user
export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const receiverId=req.params.id;
        const senderId=req.user._id

         const newMessage=await Message.create({
            senderId,
            receiverId,
            text,
            image
         }) 
         //emit new message to the receiver socket
         const receiverSocketId=userSocketMap[receiverId]
         if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
         }
         res.json({success:true,newMessage})
    } catch (error) {
            console.log(error.message)
           res.json({success:false,message:error.message})
    }
}

