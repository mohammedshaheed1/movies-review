//packages
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path, { dirname } from 'path'
import http from 'http'
import userRoutes from './routes/userRoutes.js'
import genreRoutes from './routes/genreRoutes.js'
import moviesRoutes from './routes/moviesRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
//files
import connectDB from './config/db.js'
import { Server } from 'socket.io'
import messageRouter from './routes/messageRoutes.js'
import { fileURLToPath } from 'url'
import fs from 'fs';

//configuration
dotenv.config()
connectDB()


const app=express()

// Get the current directory path for __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log(__dirname)

const frontendDistPath = path.resolve(__dirname, '../frontend', 'dist');
console.log('Serving static files from frontend:', frontendDistPath);


// Check if the frontend/dist folder exists and contains files
fs.readdir(frontendDistPath, (err, files) => {
  if (err) {
    console.error('Error reading frontend dist folder:', err);
  } else {
    console.log('Files in frontend/dist:', files);
  }
});




const server = http.createServer(app) // <-- WRAP EXPRESS APP
//initialize socket.io sercer
export const io = new Server(server, {
  cors: {
    origin: '*', 
  }
})

//store online users
export const userSocketMap={};//{userId:socketId}


//socket io connection handler
io.on("connection",(socket)=>{
       const userId = socket.handshake.query.userId;
       console.log("User Connected",userId)
       if(userId){
           userSocketMap[userId]=socket.id
       }
       //Emit online users to all connected client
       io.emit("getOnlineUsers",Object.keys(userSocketMap));
       socket.on("disconnect",()=>{
        console.log("User Disconnected",userId)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
       })
})

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(express.static(frontendDistPath));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});




//Routes
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/genre',genreRoutes)
app.use('/api/v1/movies',moviesRoutes)
app.use('/api/v1/upload',uploadRoutes)
app.use('/api/v1/messages',messageRouter)

// const __dirname=path.resolve()

// app.use('/uploads',express.static(path.join(__dirname+"/uploads")))
app.use('/uploads',express.static(path.resolve(__dirname, '../', 'uploads')))


//socket.io events
// io.on('connection', (socket) => {
//   console.log('A user connected: ' + socket.id)

//   socket.on('sendMessage', (data) => {
//     console.log('Message received:', data)
//     io.emit('receiveMessage', data) // Broadcast to all clients
//   })

//   socket.on('disconnect', () => {
//     console.log('User disconnected: ' + socket.id)
//   })
// })



// 2️⃣ Return index.html for any route Express doesn’t recognise
// app.get('*', (req, res) => {
//   res.sendFile(path.join(frontendDistPath, 'index.html'), (err) => {
//     if (err) {
//       console.error('Error sending index.html:', err);
//       res.status(500).send('Internal server error');
//     }
//   });
// });


const PORT =process.env.PORT || 3000
// app.listen(PORT,()=> console.log(`server is running on port ${PORT}`))
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))