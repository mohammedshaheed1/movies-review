// // components/UserList.jsx
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// export default function UserList({ users, selectedUserId, onSelectUser }) {
//   return (
//     <aside className="hidden md:flex flex-col border-r border-gray-300">
//       <div className="p-4 font-semibold text-lg text-gray-800">Messages</div>
//       <ScrollArea className="flex-1">
//         {users.map((user) => (
//           <button
//             key={user._id}
//             onClick={() => onSelectUser(user)}
//             className={`w-full flex items-center gap-6 px-4 py-3 hover:bg-gray-100 transition ${
//               selectedUserId === user._id ? "bg-gray-200" : ""
//             }`}
//           >
//             <Avatar className="h-11 w-11">
//               <AvatarImage src={user.avatar} />
//               <AvatarFallback>{user.username[0]}</AvatarFallback>
//             </Avatar>
//             <div className="min-w-0">
//               <p className="truncate font-medium text-sm text-gray-900">{user.username}</p>
//               <p className="truncate text-xs text-gray-500">{user.bio || ""}</p>
//             </div>
//             {user.unseenCount > 0 && (
//               <span className="text-xs bg-[#ed4956] text-white px-2 py-0.5 rounded-full">
//                 {user.unseenCount}
//               </span>
//             )}
//           </button>
//         ))}
//       </ScrollArea>
//     </aside>
//   )
// }
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import clsx from "clsx"

export default function UserList({
  users,
  selectedUserId,
  onSelectUser,
  showUserListMobile,
  setShowUserListMobile,
}) {
  return (
    <aside
      className={clsx(
        "fixed inset-0 z-40 bg-white w-full h-full overflow-y-auto transition-transform duration-300 md:relative md:translate-x-0 md:flex md:flex-col md:w-[380px] border-r border-gray-300",
        showUserListMobile ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Header */}
      <div className="p-4 font-semibold text-lg text-gray-800 flex items-center justify-between border-b md:border-none">
        <span>Messages</span>
        {/* Close button only on mobile */}
        <button
          className="md:hidden text-2xl leading-none"
          onClick={() => setShowUserListMobile(false)}
        >
          &times;
        </button>
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        {users.map((u) => (
          <button
            key={u._id}
            onClick={() => onSelectUser(u)}
            className={`w-full flex items-center gap-6 px-4 py-3 hover:bg-gray-100 transition ${
              selectedUserId === u._id ? "bg-gray-200" : ""
            }`}
          >
            <Avatar className="h-11 w-11">
              <AvatarImage src={u.avatar} />
              <AvatarFallback>{u.username[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate font-medium text-sm text-gray-900">{u.username}</p>
              <p className="truncate text-xs text-gray-500">{u.bio || ""}</p>
            </div>
            {u.unseenCount > 0 && (
              <span className="text-xs bg-[#ed4956] text-white px-2 py-0.5 rounded-full">
                {u.unseenCount}
              </span>
            )}
          </button>
        ))}
      </ScrollArea>
    </aside>
  )
}
