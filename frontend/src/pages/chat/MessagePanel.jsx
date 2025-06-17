// // components/MessagePanel.jsx
// import { useRef, useEffect } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { FiCamera } from "react-icons/fi"
// import { BsImage } from "react-icons/bs"
// import { HiOutlineArrowLeft } from "react-icons/hi"
// import { SendHorizonal } from "lucide-react"
// import { motion } from "framer-motion"

// export default function MessagePanel({
//   currentUser,
//   selectedUser,
//   messages,
//   text,
//   onChangeText,
//   onSend,
//   onBack,
// }) {
//   const bottomRef = useRef(null)

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   if (!selectedUser) {
//     return (
//       <div className="flex-1 flex flex-col items-center justify-center text-center p-10 text-sm text-gray-400 md:hidden">
//         Select a conversation or start a new message
//       </div>
//     )
//   }

//   return (
//     <>
//     <section className="flex flex-col h-full">
//       {/* Mobile header */}
//       <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300 md:hidden">
//         <HiOutlineArrowLeft onClick={onBack} className="w-6 h-6 text-gray-700" />
//         <span className="font-semibold text-base text-gray-800">{selectedUser.username}</span>
//       </div>

//       {/* Desktop header */}
//       <div className="hidden md:flex items-center gap-3 px-4 py-3 border-b border-gray-300">
//         <Avatar className="h-9 w-9">
//           <AvatarImage src={selectedUser.avatar} />
//           <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
//         </Avatar>
//         <p className="font-medium text-sm text-gray-800">{selectedUser.username}</p>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#fafafa]">
//         {messages.map((m) => {
//           const isMe = m.senderId === currentUser._id
//           return (
//             <div key={m._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
//               {!isMe && (
//                 <Avatar className="h-6 w-6 mr-2 self-end hidden md:block">
//                   <AvatarImage src={selectedUser.avatar} />
//                   <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
//                 </Avatar>
//               )}

//               <motion.div
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className={`${
//                   isMe ? "bg-[#3797ff] text-white" : "bg-white text-black border border-gray-200"
//                 } px-4 py-2 rounded-3xl text-sm max-w-[80%] break-words shadow-sm`}
//               >
//                 {m.text}
//               </motion.div>
//             </div>
//           )
//         })}
//         <div ref={bottomRef} />
//       </div>

//       {/* Input */}
//       <form
//         onSubmit={onSend}
//         className="px-3 py-3 border-t border-gray-300 flex items-center gap-2 bg-white"
//       >
//         <FiCamera className="w-5 h-5 text-gray-500" />
//         <BsImage className="w-5 h-5 text-gray-500" />
//         <Input
//           value={text}
//           onChange={(e) => onChangeText(e.target.value)}
//           placeholder="Message…"
//           className="flex-1 border-none bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
//         />
//         <Button type="submit" size="icon" disabled={!text.trim()}>
//           <SendHorizonal className="w-5 h-5" />
//         </Button>
//       </form>
//       </section>
//     </>
//   )
// }

// import { useEffect, useRef } from "react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { FiCamera } from "react-icons/fi"
// import { BsImage } from "react-icons/bs"
// import { HiOutlineArrowLeft, HiMenu } from "react-icons/hi"
// import { SendHorizonal } from "lucide-react"
// import { motion } from "framer-motion"

// export default function MessagePanel({
//   currentUser,
//   selectedUser,
//   messages,
//   text,
//   onChangeText,
//   onSend,
//   onBack,
//   openUserList,   // <<< new prop
// }) {
//   const bottomRef = useRef(null)
//   useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages])

//   /* No chat selected */
//   if (!selectedUser)
//     return (
//       <section className="flex flex-col flex-1 items-center justify-center text-center p-10 text-sm text-gray-400">
//         {/* Mobile: show a button to open drawer */}
//         <Button
//           variant="outline"
//           size="sm"
//           className="md:hidden mb-4"
//           onClick={openUserList}
//         >
//           <HiMenu className="mr-1" /> View Messages
//         </Button>
//         Select a conversation or start a new message
//       </section>
//     )

//   /* Chat selected */
//   return (
//     <section className="flex flex-col h-full">
//       {/* Mobile header */}
//       <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300 md:hidden">
//         <HiOutlineArrowLeft onClick={onBack} className="w-6 h-6 text-gray-700 cursor-pointer" />
//         <span className="font-semibold text-base text-gray-800">{selectedUser.username}</span>
//       </div>

//       {/* Desktop header */}
//       <div className="hidden md:flex items-center gap-3 px-4 py-3 border-b border-gray-300">
//         <Avatar className="h-9 w-9">
//           <AvatarImage src={selectedUser.avatar} />
//           <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
//         </Avatar>
//         <p className="font-medium text-sm text-gray-800">{selectedUser.username}</p>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#fafafa]">
//         {messages.map((m) => {
//           const isMe = m.senderId === currentUser._id
//           return (
//             <div key={m._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
//               {!isMe && (
//                 <Avatar className="h-6 w-6 mr-2 self-end hidden md:block">
//                   <AvatarImage src={selectedUser.avatar} />
//                   <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
//                 </Avatar>
//               )}
//               <motion.div
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className={`${
//                   isMe ? "bg-[#3797ff] text-white" : "bg-white text-black border border-gray-200"
//                 } px-4 py-2 rounded-3xl text-sm max-w-[80%] break-words shadow-sm`}
//               >
//                 {m.text}
//               </motion.div>
//             </div>
//           )
//         })}
//         <div ref={bottomRef} />
//       </div>

//       {/* Message input */}
//       <form
//         onSubmit={onSend}
//         className="px-3 py-3 border-t border-gray-300 flex items-center gap-2 bg-white"
//       >
//         <FiCamera className="w-5 h-5 text-gray-500" />
//         <BsImage className="w-5 h-5 text-gray-500" />
//         <Input
//           value={text}
//           onChange={(e) => onChangeText(e.target.value)}
//           placeholder="Message…"
//           className="flex-1 border-none bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
//         />
//         <Button type="submit" size="icon" disabled={!text.trim()}>
//           <SendHorizonal className="w-5 h-5" />
//         </Button>
//       </form>
//     </section>
//   )
// }


import { useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FiCamera, FiPhone } from "react-icons/fi"
import { BsImage } from "react-icons/bs"
import { HiOutlineArrowLeft, HiMenu, HiOutlineVideoCamera } from "react-icons/hi"
import { SendHorizonal } from "lucide-react"
import { motion } from "framer-motion"

export default function MessagePanel({
  currentUser,
  selectedUser,
  messages,
  text,
  onChangeText,
  onSend,
  onBack,
  openUserList,     // existing prop for mobile drawer
  onStartAudio,     // NEW – open voice‑call modal
  onStartVideo,     // NEW – open video‑call modal
}) {
  const bottomRef = useRef(null)
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages])

  /* ---------------- when no chat selected ---------------- */
  if (!selectedUser)
    return (
      <section className="flex flex-col flex-1 items-center justify-center text-center p-10 text-sm text-gray-400">
        <Button variant="outline" size="sm" className="md:hidden mb-4" onClick={openUserList}>
          <HiMenu className="mr-1" /> View Messages
        </Button>
        Select a conversation or start a new message
      </section>
    )

  /* ---------------- chat view ---------------- */
  return (
    <section className="flex flex-col h-full">
      {/* === Mobile header === */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300 md:hidden">
        <HiOutlineArrowLeft
          onClick={onBack}
          className="w-6 h-6 text-gray-700 cursor-pointer"
        />
        <span className="font-semibold text-base text-gray-800 flex-1">
          {selectedUser.username}
        </span>
        <FiPhone
          className="w-5 h-5 text-gray-700 mr-2 cursor-pointer"
          onClick={onStartAudio}
        />
        <HiOutlineVideoCamera
          className="w-6 h-6 text-gray-700 cursor-pointer"
          onClick={onStartVideo}
        />
      </div>

      {/* === Desktop header === */}
      <div className="hidden md:flex items-center gap-3 px-4 py-3 border-b border-gray-300">
        <Avatar className="h-9 w-9">
          <AvatarImage src={selectedUser.avatar} />
          <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
        </Avatar>
        <p className="font-medium text-sm text-gray-800 flex-1">
          {selectedUser.username}
        </p>
        <FiPhone
          className="w-5 h-5 text-gray-700 mr-3 cursor-pointer"
          onClick={onStartAudio}
        />
        <HiOutlineVideoCamera
          className="w-6 h-6 text-gray-700 cursor-pointer"
          onClick={onStartVideo}
        />
      </div>

      {/* === Messages list === */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#fafafa]">
        {messages.map((m) => {
          const isMe = m.senderId === currentUser._id
          return (
            <div key={m._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              {!isMe && (
                <Avatar className="h-6 w-6 mr-2 self-end hidden md:block">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
                </Avatar>
              )}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${
                  isMe
                    ? "bg-[#3797ff] text-white"
                    : "bg-white text-black border border-gray-200"
                } px-4 py-2 rounded-3xl text-sm max-w-[80%] break-words shadow-sm`}
              >
                {m.text}
              </motion.div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* === Message input === */}
      <form
        onSubmit={onSend}
        className="px-3 py-3 border-t border-gray-300 flex items-center gap-2 bg-white"
      >
        <FiCamera className="w-5 h-5 text-gray-500" />
        <BsImage className="w-5 h-5 text-gray-500" />
        <Input
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Message…"
          className="flex-1 border-none bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
        <Button type="submit" size="icon" disabled={!text.trim()}>
          <SendHorizonal className="w-5 h-5" />
        </Button>
      </form>
    </section>
  )
}

