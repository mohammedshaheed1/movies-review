// import React from 'react'
// import { useGetUsersQuery } from '../../../redux/api/user'

// const PrimaryCard = () => {
//     const {data:visitors}=useGetUsersQuery()
//   return (
//     <div className='w-[100%] h-[10%] bg-[#282828] text-white rounded-lg p-6'>
//         <h2 className='text-2xl font-bold mb-4'>Congratulations!</h2>
//         <p>You Have {visitors?.length} new users,watching your content</p>
//     </div>
//   )
// }

// export default PrimaryCard


import React from 'react'
import { useGetUsersQuery } from '../../../redux/api/user'

const PrimaryCard = () => {
  const { data: visitors } = useGetUsersQuery()
  
  return (
    <div className="w-full max-w-md bg-[#282828] text-white rounded-lg p-6 mx-auto sm:mx-0">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Congratulations!</h2>
      <p className="text-base sm:text-lg">
        You have <span className="font-semibold">{visitors?.length ?? 0}</span> new users watching your content
      </p>
    </div>
  )
}

export default PrimaryCard
