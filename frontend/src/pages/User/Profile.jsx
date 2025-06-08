// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useProfileMutation } from '../redux/api/user'
// import Loader from '../../component/Loader'
// import { toast } from 'react-toastify'
// import { setCredentials } from '../redux/features/auth/authSlice'

// const Profile = () => {

//    const [username,setUsername]=useState('')
//    const [email,setEmail]=useState('')
//    const [password,setPassword]=useState('')
//    const [confirmPassword,setConfirmPassword]=useState('')

//    const {userInfo}=useSelector((state)=>state.auth)
//    const [profile,{isLoading:loadingUpdateProfile}]=useProfileMutation()

//    useEffect(()=>{
//       setUsername(userInfo.username)
//       setEmail(userInfo.email)
//    },[userInfo.username,userInfo.email])

//    const dispatch=useDispatch()

//    const submitHandler =async(e)=>{
//       e.preventDefault()
//       if(password !== confirmPassword){
//           toast.error("Password do not match")
//       }else{
//           try {
            
//             const res=await profile({
//                  _id:userInfo._id,
//                 username,
//                 email,
//                 password
//             }).unwrap()
//             dispatch(setCredentials({...res}))
//             toast.success("Profile Updated Successfully")
            
//           } catch (error) {
//              toast.error(error?.data?.message || error.error)
//           }
//       }
//    }

//   return (
//     <div>
//     <div className='container mx-auto p-4 mt-[10rem] '>
//         <div className='flex justify-center align-center md:flex md:space-x-4'>
//             <div className='md:w-1/3'>
//              <h2 className='text-2xl font-semibold mb-4'>Upadate Profile</h2>
//              <form onSubmit={submitHandler} >
//                  <div className="mb-4">
//                     <label className='block text-white mb-2'>
//                     Name
//                     </label>
//                     <input type="text" placeholder='Enter Name' className='form-input p-4 rounded-full w-full' value={username} onChange={(e)=>setUsername(e.target.value)}  />
//                  </div>
//                  <div className="mb-4">
//                     <label className='block text-white mb-2'>
//                     Email Address
//                     </label>
//                     <input type="email" placeholder='Enter Email' className='form-input p-4 rounded-full w-full' value={email} onChange={(e)=>setEmail(e.target.value)}  />
//                  </div>
//                  <div className="mb-4">
//                     <label className='block text-white mb-2'>
//                     Password
//                     </label>
//                     <input type="password" placeholder='Enter Password' className='form-input p-4 rounded-full w-full' value={password} onChange={(e)=>setPassword(e.target.value)}  />
//                  </div>
//                  <div className="mb-4">
//                     <label className='block text-white mb-2'>
//                     Confirm Password
//                     </label>
//                     <input type="password" placeholder='Enter Confirm Password' className='form-input p-4 rounded-full w-full' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  />
//                  </div>

//                  <div className='flex justify-between'>
//                     <button type='submit' className='bg-teal-500 w-screen mt-[2rem] font-bold text-white py-2 px-4 rounded hover:bg-teal-600'>Update</button>
//                      {
//                         loadingUpdateProfile && <Loader/>
//                      }
//                  </div>
//              </form>
//             </div>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default Profile


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileMutation } from '../redux/api/user';
import Loader from '../../component/Loader';
import { toast } from 'react-toastify';
import { setCredentials } from '../redux/features/auth/authSlice';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const [profile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username || '');
      setEmail(userInfo.email || '');
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await profile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile Updated Successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">Update Profile</h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-300"
              disabled={loadingUpdateProfile}
            >
              {loadingUpdateProfile ? <Loader /> : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
