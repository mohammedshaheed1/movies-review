import express from 'express'
import { authenticate } from '../middlewares/authMiddleware.js';
import { getMessages, getUserForSidebar, markMessageAsseen, sendMessage } from '../controllers/messageController.js';


const messageRouter=express.Router();

messageRouter.get("/users",authenticate,getUserForSidebar);
messageRouter.get("/:id",authenticate,getMessages)
messageRouter.put("mark/:id",authenticate,markMessageAsseen)
messageRouter.post("/send/:id",authenticate,sendMessage)



export default messageRouter