// import React, { useEffect, useState } from 'react'
// import {setCredentials} from '../redux/features/auth/authSlice'
// import { toast } from 'react-toastify'
// import { useLoginMutation } from '../redux/api/user'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useLocation, useNavigate } from 'react-router'
// import Loader from '../../component/Loader'

// const Login = () => {

//  const [email,setEmail]=useState('')
//  const [password,setPassword]=useState('')


//  const dispatch=useDispatch()
//  const navigate =useNavigate()

//  const [login,{isLoading}]=useLoginMutation()
//  const {userInfo}=useSelector((state)=>state.auth)
//  const {search}=useLocation()
//  const sp=new URLSearchParams(search)
//  const redirect=sp.get('redirect') || '/'


//  useEffect(()=>{
//    if(userInfo){
//     navigate(redirect)
//    }
//  },[navigate,redirect,userInfo])

//   const submitHandler =async(e)=>{
//     e.preventDefault();
//     try {

//       const res= await login({email,password}).unwrap()
//       dispatch(setCredentials({...res}))
//       navigate(redirect)
//       toast.success("Login successfully")
      
//     } catch (error) {
//         toast.error(error?.data?.message || error.error)
//     }
//   }

//   return (
//     <div>
//       <section className='pl-[10rem] flex flex-wrap'>
//         <div className='mr-[4rem] mt-[5rem]'>
//           <h1 className='text-2xl font-semibold'>Sign In</h1>
//           <form onSubmit={submitHandler}  className='container w-[40rem]'>
//               <div className='my-[2rem]'>
//                 <label htmlFor="email" className='block text-sm font-medium text-white'>Email Address</label>
//                 <input type="email" id='email' className='mt-1 p-2 border rounded w-full ' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
//               </div>
//                <div className='my-[2rem]'>
//                 <label htmlFor="password" className='block text-sm font-medium text-white'>Password</label>
//                 <input type="password" id='password' className='mt-1 p-2 border rounded w-full ' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
//               </div>
//              <button disabled={isLoading} type='submit' className='bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>{isLoading?"Signing In...":"Sign In"}</button>
//              {isLoading && <Loader/>}
//           </form>

//           <div className='mt-4'>
//             <p className='text-white'>
//               New Customer? {""}
//               <Link to={redirect?`/register?redirect=${redirect}`:'/register'} className='text-teal-500 hover:underline'>Register</Link>
//             </p>
//           </div>
//         </div>
//          <img
//           src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           alt=""
//           className="h-[65rem] w-[45%] xl:block md:hidden sm:hidden rounded-lg"
//         />
//       </section>
//     </div>
//   )
// }

// export default Login

import React, { useEffect, useState } from 'react'
import { setCredentials } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useLoginMutation } from '../redux/api/user'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router'
import Loader from '../../component/Loader'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
      toast.success('Login successfully')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 py-10 bg-black text-white">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 max-w-lg">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 p-2 w-full border rounded text-black"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 p-2 w-full border rounded text-black"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded w-full"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          {isLoading && <Loader />}
        </form>

        <p className="mt-4">
          New Customer?{' '}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className="text-teal-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block lg:w-1/2 pl-10">
        <img
          src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Movie login"
          className="w-full h-auto rounded-xl"
        />
      </div>
    </div>
  )
}

export default Login
