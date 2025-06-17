// import React, { useEffect, useRef, useState } from "react"
// import axios from "axios"
// import { io } from "socket.io-client"
// import { useSelector } from "react-redux"

// /* shadcn */
// import { Card, CardContent } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// /* icons */
// import { FiCamera } from "react-icons/fi"
// import { BsImage } from "react-icons/bs"
// import { HiOutlineArrowLeft } from "react-icons/hi"
// import { SendHorizonal } from "lucide-react"
// import { motion } from "framer-motion"

// export default function ChatApp() {
//   const { userInfo } = useSelector((s) => s.auth)
//   const currentUser = userInfo
//   if (!currentUser?._id) {
//     return <div className="flex items-center justify-center h-full">Loading…</div>
//   }

//   /* ---------------- state ---------------- */
//   const [users, setUsers] = useState([])
//   const [onlineUsers, setOnlineUsers] = useState([])
//   const [selectedUser, setSelectedUser] = useState(null)
//   const [messages, setMessages] = useState([])
//   const [text, setText] = useState("")

//   /* refs */
//   const bottomRef = useRef(null)
//   const socketRef = useRef(null)
//   const baseURL = import.meta.env.VITE_API_URL || ""

//   /* ---------------- helpers ---------------- */
//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.get(`${baseURL}/api/v1/messages/users`)
//       const list = data.users.map((u) => ({
//         ...u,
//         unseenCount: data.unseenMessages?.[u._id] || 0,
//       }))
//       setUsers(list)
//     } catch (e) {
//       console.error("fetchUsers", e)
//     }
//   }

//   const fetchMessages = async (partner) => {
//     try {
//       const { data } = await axios.get(`${baseURL}/api/v1/messages/${partner._id}`)
//       setMessages(data.messages)
//     } catch (e) {
//       console.error("fetchMessages", e)
//     }
//   }

//   const connectSocket = () => {
//     if (socketRef.current || !currentUser._id) return
//     const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000", {
//       query: { userId: currentUser._id },
//     })
//     socket.on("getOnlineUsers", (ids) => setOnlineUsers(ids))
//     socket.on("newMessage", (msg) => {
//       if (msg.senderId === selectedUser?._id) {
//         setMessages((prev) => [...prev, msg])
//       } else {
//         setUsers((prev) =>
//           prev.map((u) =>
//             u._id === msg.senderId ? { ...u, unseenCount: (u.unseenCount || 0) + 1 } : u
//           )
//         )
//       }
//     })
//     socketRef.current = socket
//   }

//   /* ---------------- effects ---------------- */
//   useEffect(() => {
//     // ensure we don't return a promise from useEffect
//     fetchUsers()
//   }, [])

//   useEffect(() => {
//     connectSocket()
//     return () => {
//       if (socketRef.current && typeof socketRef.current.disconnect === "function") {
//         socketRef.current.disconnect()
//       }
//       socketRef.current = null
//     }
//   }, [currentUser])

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   /* ---------------- handlers ---------------- */
//   const openChat = async (u) => {
//     setSelectedUser(u)
//     await fetchMessages(u)
//     setUsers((prev) => prev.map((x) => (x._id === u._id ? { ...x, unseenCount: 0 } : x)))
//   }

//   const handleSend = async (e) => {
//     e.preventDefault()
//     if (!text.trim() || !selectedUser) return
//     try {
//       const { data } = await axios.post(`${baseURL}/api/v1/messages/send/${selectedUser._id}`, { text })
//       setMessages((prev) => [...prev, data.newMessage])
//       setText("")
//     } catch (err) {
//       console.error("handleSend", err)
//     }
//   }

//   /* ---------------- render ---------------- */
//   return (
//     <Card className="h-[calc(100vh-5rem)] w-full md:grid md:grid-cols-[380px_1fr] bg-[#fafafa] md:border-x border-gray-300">
//       {/* sidebar */}
//       <aside className="hidden md:flex flex-col border-r border-gray-300">
//         <div className="p-4 font-semibold text-lg text-gray-800">Messages</div>
//         <ScrollArea className="flex-1">
//           {users.map((u) => (
//             <button
//               key={u._id}
//               onClick={() => openChat(u)}
//               className={`w-full flex items-center gap-6 px-4 py-3 hover:bg-gray-100 transition ${
//                 selectedUser?._id === u._id ? "bg-gray-200" : ""
//               }`}
//             >
//               <Avatar className="h-11 w-11">
//                 <AvatarImage src={u.avatar} />
//                 <AvatarFallback>{u.username[0]}</AvatarFallback>
//               </Avatar>
//               <div className=" min-w-0">
//                 <p className="truncate font-medium text-sm text-gray-900">{u.username}</p>
//                 <p className="truncate text-xs text-gray-500">{u.bio || ""}</p>
//               </div>
//               {u.unseenCount > 0 && (
//                 <span className="text-xs bg-[#ed4956] text-white px-2 py-0.5 rounded-full">
//                   {u.unseenCount}
//                 </span>
//               )}
//             </button>
//           ))}
//         </ScrollArea>
//       </aside>

//       {/* chat panel */}
//       <section className="flex flex-col h-full">
//         {/* mobile header */}
//         <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300 md:hidden">
//           {selectedUser && (
//             <HiOutlineArrowLeft onClick={() => setSelectedUser(null)} className="w-6 h-6 text-gray-700" />
//           )}
//           <span className="font-semibold text-base text-gray-800">
//             {selectedUser ? selectedUser.username : "Messages"}
//           </span>
//         </div>

//         {!selectedUser && (
//           <div className="flex-1 flex flex-col items-center justify-center text-center p-10 text-sm text-gray-400 md:hidden">
//             Select a conversation or start a new message
//           </div>
//         )}

//         {selectedUser && (
//           <>
//             <div className="hidden md:flex items-center gap-3 px-4 py-3 border-b border-gray-300">
//               <Avatar className="h-9 w-9">
//                 <AvatarImage src={selectedUser.avatar} />
//                 <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
//               </Avatar>
//               <p className="font-medium text-sm text-gray-800">{selectedUser.username}</p>
//             </div>

//             <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#fafafa]">
//               {messages.map((m) => {
//                 const isMe = m.senderId === currentUser._id
//                 return (
//                   <div key={m._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
//                     {!isMe && (
//                       <Avatar className="h-6 w-6 mr-2 self-end hidden md:block">
//                         <AvatarImage src={selectedUser.avatar} />
//                         <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
//                       </Avatar>
//                     )}

//                     <motion.div
//                       initial={{ opacity: 0, y: 8 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className={`${
//                         isMe ? "bg-[#3797ff] text-white" : "bg-white text-black border border-gray-200"
//                       } px-4 py-2 rounded-3xl text-sm max-w-[80%] break-words shadow-sm`}
//                     >
//                       {m.text}
//                     </motion.div>
//                   </div>
//                 )
//               })}
//               <div ref={bottomRef} />
//             </div>

//             <form onSubmit={handleSend} className="px-3 py-3 border-t border-gray-300 flex items-center gap-2 bg-white">
//               <FiCamera className="w-5 h-5 text-gray-500" />
//               <BsImage className="w-5 h-5 text-gray-500" />
//               <Input
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Message…"
//                 className="flex-1 border-none bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
//               />
//               <Button type="submit" size="icon" disabled={!text.trim()}>
//                 <SendHorizonal className="w-5 h-5" />
//               </Button>
//             </form>
//           </>
//         )}
//       </section>
//     </Card>
//   )
// }



// import React, { useEffect, useRef, useState } from "react"
// import axios from "axios"
// import { io } from "socket.io-client"
// import { useSelector } from "react-redux"
// import { Card } from "@/components/ui/card"

// import UserList from "./UserList"
// import MessagePanel from "./MessagePanel"

// export default function ChatApp() {
//   const { userInfo } = useSelector((s) => s.auth)
//   const currentUser = userInfo
//   const baseURL = import.meta.env.VITE_API_URL || ""

//   const [users, setUsers] = useState([])
//   const [onlineUsers, setOnlineUsers] = useState([])
//   const [selectedUser, setSelectedUser] = useState(null)
//   const [messages, setMessages] = useState([])
//   const [text, setText] = useState("")

//   const socketRef = useRef(null)

//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.get(`${baseURL}/api/v1/messages/users`)
//       const list = data.users.map((u) => ({
//         ...u,
//         unseenCount: data.unseenMessages?.[u._id] || 0,
//       }))
//       setUsers(list)
//     } catch (e) {
//       console.error("fetchUsers", e)
//     }
//   }

//   const fetchMessages = async (partner) => {
//     try {
//       const { data } = await axios.get(`${baseURL}/api/v1/messages/${partner._id}`)
//       setMessages(data.messages)
//     } catch (e) {
//       console.error("fetchMessages", e)
//     }
//   }

//   const connectSocket = () => {
//     if (socketRef.current || !currentUser._id) return
//     const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000", {
//       query: { userId: currentUser._id },
//     })
//     socket.on("getOnlineUsers", (ids) => setOnlineUsers(ids))
//     socket.on("newMessage", (msg) => {
//       if (msg.senderId === selectedUser?._id) {
//         setMessages((prev) => [...prev, msg])
//       } else {
//         setUsers((prev) =>
//           prev.map((u) =>
//             u._id === msg.senderId ? { ...u, unseenCount: (u.unseenCount || 0) + 1 } : u
//           )
//         )
//       }
//     })
//     socketRef.current = socket
//   }

//   const handleSend = async (e) => {
//     e.preventDefault()
//     if (!text.trim() || !selectedUser) return
//     try {
//       const { data } = await axios.post(`${baseURL}/api/v1/messages/send/${selectedUser._id}`, {
//         text,
//       })
//       setMessages((prev) => [...prev, data.newMessage])
//       setText("")
//     } catch (err) {
//       console.error("handleSend", err)
//     }
//   }

//   const openChat = async (user) => {
//     setSelectedUser(user)
//     await fetchMessages(user)
//     setUsers((prev) => prev.map((x) => (x._id === user._id ? { ...x, unseenCount: 0 } : x)))
//   }

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   useEffect(() => {
//     connectSocket()
//     return () => {
//       socketRef.current?.disconnect()
//       socketRef.current = null
//     }
//   }, [currentUser])

//   if (!currentUser?._id) {
//     return <div className="flex items-center justify-center h-full">Loading…</div>
//   }

//   return (
//     <Card className="h-[calc(100vh-5rem)] w-full md:grid md:grid-cols-[380px_1fr] bg-[#fafafa] md:border-x border-gray-300">
//       <UserList
//         users={users}
//         selectedUserId={selectedUser?._id}
//         onSelectUser={openChat}
//       />

//       <MessagePanel
//         currentUser={currentUser}
//         selectedUser={selectedUser}
//         messages={messages}
//         text={text}
//         onChangeText={setText}
//         onSend={handleSend}
//         onBack={() => setSelectedUser(null)}
//       />
//     </Card>
//   )
// }

// import React, { useEffect, useRef, useState } from "react"
// import axios from "axios"
// import { io } from "socket.io-client"
// import { useSelector } from "react-redux"
// import { Card } from "@/components/ui/card"

// import UserList from "./UserList"
// import MessagePanel from "./MessagePanel"

// export default function ChatApp() {
//   const { userInfo } = useSelector((s) => s.auth)
//   const currentUser = userInfo
//   const baseURL   = import.meta.env.VITE_API_URL || ""

//   /* ---------------- state ---------------- */
//   const [users, setUsers]           = useState([])
//   const [onlineUsers, setOnlineUsers] = useState([])
//   const [selectedUser, setSelectedUser] = useState(null)
//   const [messages, setMessages]     = useState([])
//   const [text, setText]             = useState("")
//   /* NEW */  const [showUserListMobile, setShowUserListMobile] = useState(false)

//   const socketRef = useRef(null)

//   /* ---------------- helpers ---------------- */
//   const fetchUsers = async () => {
//     const { data } = await axios.get(`${baseURL}/api/v1/messages/users`)
//     setUsers(
//       data.users.map((u) => ({
//         ...u,
//         unseenCount: data.unseenMessages?.[u._id] || 0,
//       }))
//     )
//   }

//   const fetchMessages = async (u) => {
//     const { data } = await axios.get(`${baseURL}/api/v1/messages/${u._id}`)
//     setMessages(data.messages)
//   }

//   // const connectSocket = () => {
//   //   if (socketRef.current || !currentUser?._id) return
//   //   const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000", {
//   //     query: { userId: currentUser._id },
//   //   })
//   //   socket.on("getOnlineUsers", (ids) => setOnlineUsers(ids))
//   //   socket.on("newMessage", (msg) => {
//   //     if (msg.senderId === selectedUser?._id) {
//   //       setMessages((p) => [...p, msg])
//   //     } else {
//   //       setUsers((p) =>
//   //         p.map((u) =>
//   //           u._id === msg.senderId ? { ...u, unseenCount: (u.unseenCount || 0) + 1 } : u
//   //         )
//   //       )
//   //     }
//   //   })
//   //   socketRef.current = socket
//   // }
//   const connectSocket = () => {
//   if (socketRef.current instanceof WebSocket || socketRef.current?.connected) return

//   const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000", {
//     query: { userId: currentUser._id },
//   })

//   socket.on("getOnlineUsers", (ids) => setOnlineUsers(ids))
//   socket.on("newMessage", (msg) => {
//     if (msg.senderId === selectedUser?._id) {
//       setMessages((p) => [...p, msg])
//     } else {
//       setUsers((p) =>
//         p.map((u) =>
//           u._id === msg.senderId ? { ...u, unseenCount: (u.unseenCount || 0) + 1 } : u
//         )
//       )
//     }
//   })

//   socketRef.current = socket
// }


//   /* ---------------- handlers ---------------- */
//   const openChat = async (u) => {
//     setSelectedUser(u)
//     await fetchMessages(u)
//     setUsers((p) => p.map((x) => (x._id === u._id ? { ...x, unseenCount: 0 } : x)))
//     setShowUserListMobile(false)           // close drawer on mobile
//   }

//   const handleSend = async (e) => {
//     e.preventDefault()
//     if (!text.trim() || !selectedUser) return
//     const { data } = await axios.post(`${baseURL}/api/v1/messages/send/${selectedUser._id}`, {
//       text,
//     })
//     setMessages((p) => [...p, data.newMessage])
//     setText("")
//   }

//   /* ---------------- effects ---------------- */
//   useEffect(fetchUsers, [])
//   // useEffect(() => {
//   //   connectSocket()
//   //   return () => {
//   //     socketRef.current?.disconnect()
//   //     socketRef.current = null
//   //   }
//   // }, [currentUser])
//   useEffect(() => {
//   connectSocket()

//   return () => {
//     if (socketRef.current && typeof socketRef.current.disconnect === 'function') {
//       socketRef.current.disconnect()
//     }
//     socketRef.current = null
//   }
// }, [currentUser])


//   if (!currentUser?._id) return <div className="flex items-center justify-center h-full">Loading…</div>

//   return (
//     <Card className="h-[calc(100vh-5rem)] w-full bg-[#fafafa] md:grid md:grid-cols-[380px_1fr] md:border-x border-gray-300">
//       {/* ----- User list (sidebar / drawer) ----- */}
//       <UserList
//         users={users}
//         selectedUserId={selectedUser?._id}
//         onSelectUser={openChat}
//         showUserListMobile={showUserListMobile}
//         setShowUserListMobile={setShowUserListMobile}
//       />

//       {/* ----- Message panel ----- */}
//       <MessagePanel
//         currentUser={currentUser}
//         selectedUser={selectedUser}
//         messages={messages}
//         text={text}
//         onChangeText={setText}
//         onSend={handleSend}
//         onBack={() => setSelectedUser(null)}
//         /* allow panel to reopen drawer */
//         openUserList={() => setShowUserListMobile(true)}
//       />
//     </Card>
//   )
// }


import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import { io } from "socket.io-client"
import { useSelector } from "react-redux"
import { Card } from "@/components/ui/card"

import UserList from "./UserList"
import MessagePanel from "./MessagePanel"
import CallModal from "./CallModal"

export default function ChatApp() {
  const { userInfo } = useSelector((state) => state.auth)
  const currentUser = userInfo
  const baseURL = import.meta.env.VITE_API_URL || ""

  // State
  const [users, setUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const [showUserListMobile, setShowUserListMobile] = useState(false)


    // NEW — call modal state
  const [showCall, setShowCall] = useState(false)
  const [useVideo, setUseVideo] = useState(false)

  const socketRef = useRef(null)

  // Fetch user list
  const fetchUsers = async () => {
    const { data } = await axios.get(`${baseURL}/api/v1/messages/users`)
    setUsers(
      data.users.map((u) => ({
        ...u,
        unseenCount: data.unseenMessages?.[u._id] || 0,
      }))
    )
  }

  // Fetch chat messages with selected user
  const fetchMessages = async (u) => {
    const { data } = await axios.get(`${baseURL}/api/v1/messages/${u._id}`)
    setMessages(data.messages)
  }

  // Connect to socket
  const connectSocket = () => {
    if (socketRef.current?.connected) return

    const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000", {
      query: { userId: currentUser._id },
    })

    socket.on("getOnlineUsers", (ids) => setOnlineUsers(ids))

    socket.on("newMessage", (msg) => {
      if (msg.senderId === selectedUser?._id) {
        setMessages((prev) => [...prev, msg])
      } else {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === msg.senderId
              ? { ...u, unseenCount: (u.unseenCount || 0) + 1 }
              : u
          )
        )
      }
    })

    socketRef.current = socket
  }

  // Open chat with a user
  const openChat = async (u) => {
    setSelectedUser(u)
    await fetchMessages(u)
    setUsers((prev) =>
      prev.map((x) => (x._id === u._id ? { ...x, unseenCount: 0 } : x))
    )
    setShowUserListMobile(false)
  }

  // Send message
  const handleSend = async (e) => {
    e.preventDefault()
    if (!text.trim() || !selectedUser) return

    const { data } = await axios.post(
      `${baseURL}/api/v1/messages/send/${selectedUser._id}`,
      { text }
    )

    setMessages((prev) => [...prev, data.newMessage])
    setText("")
  }

  // Effects
  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (!currentUser?._id) return

    connectSocket()
    const socket = socketRef.current

    return () => {
      if (socket && typeof socket.disconnect === "function") {
        socket.disconnect()
      }
      socketRef.current = null
    }
  }, [currentUser])

  if (!currentUser?._id) {
    return <div className="flex items-center justify-center h-full">Loading…</div>
  }

  return (
    <>
    <Card className="h-[calc(100vh-5rem)] w-full bg-[#fafafa] md:grid md:grid-cols-[380px_1fr] md:border-x border-gray-300">
      {/* User List (sidebar / mobile drawer) */}
      <UserList
        users={users}
        selectedUserId={selectedUser?._id}
        onSelectUser={openChat}
        showUserListMobile={showUserListMobile}
        setShowUserListMobile={setShowUserListMobile}
      />

      {/* Message Panel */}
      <MessagePanel
        currentUser={currentUser}
        selectedUser={selectedUser}
        messages={messages}
        text={text}
        onChangeText={setText}
        onSend={handleSend}
        onBack={() => setSelectedUser(null)}
        openUserList={() => setShowUserListMobile(true)}
        onStartAudio={() => { setUseVideo(false); setShowCall(true) }}
  onStartVideo={() => { setUseVideo(true);  setShowCall(true) }}
      />
    </Card>
      {/* -- Call modal, rendered over everything -- */}
      {showCall && selectedUser && (
        <CallModal
          me={currentUser}
          peerUser={selectedUser}
          video={useVideo}
          onClose={() => setShowCall(false)}
        />
      )}

      </>
  )
}

