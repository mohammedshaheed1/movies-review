// import React, { useState } from 'react'
// import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'
// import { MdOutlineLocalMovies } from 'react-icons/md'
// import { MdChat } from 'react-icons/md'
// import { Link, useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { useLogoutMutation } from '../redux/api/user'
// import { logout } from '../redux/features/auth/authSlice'
// import { toast } from 'react-toastify'

// const NavItem = ({ to, icon: Icon, label }) => (
//   <Link
//     to={to}
//     className='flex items-center gap-1 text-white hover:text-yellow-400 transition-colors'
//   >
//     <Icon size={24} />
//     <span className='hidden sm:inline'>{label}</span>
//   </Link>
// )

// const Navigation = () => {
//   const { userInfo } = useSelector((state) => state.auth)
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [logoutApiCall] = useLogoutMutation()

//   const toggleDropdownOpen = () => setDropdownOpen(!dropdownOpen)

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap()
//       dispatch(logout())
//       navigate('/login')
//       toast.success("Logged out successfully")
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   return (
//     <nav className='fixed bottom-6 inset-x-0 z-50 flex justify-center'>
//       <div className='bg-[#0f0f0f] border rounded-xl px-6 py-3 w-full max-w-md sm:max-w-2xl md:max-w-3xl mx-auto shadow-lg'>
//         <div className='flex justify-between items-center flex-wrap gap-4'>
//           {/* Left Nav Items */}
//           <div className='flex gap-6'>
//             <NavItem to='/' icon={AiOutlineHome} label='Home' />
//             <NavItem to='/movies' icon={MdOutlineLocalMovies} label='Shop' />
//               <NavItem to='/chat' icon={MdChat} label='Shop' />
//           </div>

//           {/* Right Side: User Section */}
//           <div className='relative'>
//             {userInfo ? (
//               <div className='flex items-center gap-2 cursor-pointer' onClick={toggleDropdownOpen}>
//                 <span className='text-white'>{userInfo.username}</span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="white"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                     d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
//                 </svg>
//               </div>
//             ) : (
//               <div className='flex gap-4'>
//                 <NavItem to='/login' icon={AiOutlineLogin} label='Login' />
//                 <NavItem to='/register' icon={AiOutlineUserAdd} label='Register' />
//               </div>
//             )}

//             {/* Dropdown */}
//             {/* {dropdownOpen && userInfo && (
//               <ul className='absolute right-0 mt-2 bg-white text-gray-800 shadow-md rounded w-40 z-50'>
//                 {userInfo.isAdmin && (
//                   <li>
//                     <Link to='/admin/movies/dashboard' className='block px-4 py-2 hover:bg-gray-100'>Dashboard</Link>
//                   </li>
//                 )}
//                 <li>
//                   <Link to='/profile' className='block px-4 py-2 hover:bg-gray-100'>Profile</Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={logoutHandler}
//                     className='w-full text-left px-4 py-2 hover:bg-gray-100'
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             )} */}
//             {/* Dropdown */}
// {dropdownOpen && userInfo && (
//   <ul className='absolute right-0 bottom-full mb-2 bg-white text-gray-800 shadow-md rounded w-40 z-50'>
//     {userInfo.isAdmin && (
//       <li>
//         <Link to='/admin/movies/dashboard' className='block px-4 py-2 hover:bg-gray-100'>Dashboard</Link>
//       </li>
//     )}
//     <li>
//       <Link to='/profile' className='block px-4 py-2 hover:bg-gray-100'>Profile</Link>
//     </li>
//     <li>
//       <button
//         onClick={logoutHandler}
//         className='w-full text-left px-4 py-2 hover:bg-gray-100'
//       >
//         Logout
//       </button>
//     </li>
//   </ul>
// )}

//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navigation



/* ---------------------------------------------
 * Navigation.tsx  —  Bottom nav styled like IG
 * ------------------------------------------- */
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useSelector, useDispatch } from "react-redux"
import { Link, NavLink, useNavigate } from "react-router-dom"
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai"
import { MdOutlineLocalMovies, MdChat } from "react-icons/md"
import { useLogoutMutation } from "../redux/api/user"
import { logout } from "../redux/features/auth/authSlice"
import { toast } from "react-toastify"

const navItems = [
  { to: "/", icon: AiOutlineHome, label: "Home" },
  { to: "/movies", icon: MdOutlineLocalMovies, label: "Movies" },
  { to: "/chat", icon: MdChat, label: "Chat" },
]

export default function Navigation() {
  const { userInfo } = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate("/login")
      toast.success("Logged out successfully")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-t">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2">
        {/* ——— Left nav links ——— */}
        <div className="flex flex-1 justify-evenly">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 text-xs ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            >
              <Icon size={24} />
              <span className="hidden sm:block">{label}</span>
            </NavLink>
          ))}
        </div>

        {/* ——— Right side ——— */}
        <div>
          {userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userInfo.avatar} />
                    <AvatarFallback>{userInfo.username?.[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-44">
                {userInfo.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin/movies/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-3">
              <Button asChild variant="ghost" size="icon">
                <Link to="/login">
                  <AiOutlineLogin size={22} />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link to="/register">
                  <AiOutlineUserAdd size={22} />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

