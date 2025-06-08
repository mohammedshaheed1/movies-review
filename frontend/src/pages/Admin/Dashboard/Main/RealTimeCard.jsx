// import React from 'react'
// import { useGetUsersQuery } from '../../../redux/api/user'
// import PrimaryCard from './PrimaryCard'

// const RealTimeCard = () => {

//     const {data:visitors}=useGetUsersQuery()
//   return (
//     <div className='w-[30rem] mt-10 bg-[#282828] text-[#fff] rounded-lg shadow-lg p-4'>
//         <h2 className='text-2xl font-bold mb-2'>Realtime</h2>
//         <p className='text-gray-500 mb-4'>Update Live</p>
//         <div className='border-t border-[#666] my-7'></div>
//         <h2 className='text-2xl font-bold mb-2'>{visitors?.length}</h2>
//         <p className='text-gray-500 mb-2'>Subscribe</p>
//         <hr />
//         <PrimaryCard/>
//     </div>
//   )
// }

// export default RealTimeCard


import React from 'react'
import { useGetUsersQuery } from '../../../redux/api/user'
import PrimaryCard from './PrimaryCard'

const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery()

  return (
    <div className="w-full max-w-md mt-10 bg-[#282828] text-white rounded-lg shadow-lg p-6 mx-auto sm:mx-0">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Realtime</h2>
      <p className="text-gray-400 mb-4">Update Live</p>
      <div className="border-t border-[#666] my-6"></div>
      <h2 className="text-3xl sm:text-4xl font-bold mb-2">{visitors?.length ?? 0}</h2>
      <p className="text-gray-400 mb-4">Subscribe</p>
      <hr className="mb-6 border-gray-600" />
      <PrimaryCard />
    </div>
  )
}

export default RealTimeCard
