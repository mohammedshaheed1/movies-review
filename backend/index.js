//packages
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'path'
import http from 'http'
import userRoutes from './routes/userRoutes.js'
import genreRoutes from './routes/genreRoutes.js'
import moviesRoutes from './routes/moviesRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
//files
import connectDB from './config/db.js'
import { Server } from 'socket.io'
import messageRouter from './routes/messageRoutes.js'

//configuration
dotenv.config()
connectDB()


const app=express()


const server = http.createServer(app) // <-- WRAP EXPRESS APP
const io = new Server(server, {
  cors: {
    origin: '*', // In production, set this to your frontend URL
    methods: ['GET', 'POST']
  }
})


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())





//Routes
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/genre',genreRoutes)
app.use('/api/v1/movies',moviesRoutes)
app.use('/api/v1/upload',uploadRoutes)
app.use('/api/v1/messages',messageRouter)

const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname+"/uploads")))


//socket.io events
io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id)

  socket.on('sendMessage', (data) => {
    console.log('Message received:', data)
    io.emit('receiveMessage', data) // Broadcast to all clients
  })

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id)
  })
})



const PORT =process.env.PORT || 3000
// app.listen(PORT,()=> console.log(`server is running on port ${PORT}`))
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))