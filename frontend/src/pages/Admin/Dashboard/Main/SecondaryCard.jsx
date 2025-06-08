// import React from 'react'

// const SecondaryCard = ({pill,content,info,gradient}) => {
//   return (
//     <div className={`w-[15rem] h-[12-rem] relative mt-10 bg-gradient-to-b ${gradient} rounded-lg`}>
//         <div className={`absolute -top-4 left-[5rem] border bg-gradient-to-b ${gradient} rounded-full py-2 px-5 text-sm text-gray-800 font-semibold`}>
//             {pill}
//         </div>
//         <div className='flex items-center justify-center h-full'>
//             <h2 className='text-5xl font-bold text-white'>{content}</h2>
//         </div>

//          <div className='absolute bottom-8 left-12 text-sm text-white'>{info}</div>
//     </div>
//   )
// }

// export default SecondaryCard


import React from 'react'

const SecondaryCard = ({ pill, content, info, gradient }) => {
  return (
    <div
      className={`w-full max-w-xs sm:w-60 h-48 relative mt-10 bg-gradient-to-b ${gradient} rounded-lg shadow-md mx-auto sm:mx-0`}
    >
      <div
        className={`absolute -top-5 left-1/2 transform -translate-x-1/2 sm:left-10 sm:transform-none border bg-gradient-to-b ${gradient} rounded-full py-1.5 px-4 text-xs sm:text-sm text-gray-800 font-semibold shadow`}
      >
        {pill}
      </div>

      <div className="flex items-center justify-center h-full px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-white truncate">{content}</h2>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 sm:left-12 sm:transform-none text-xs sm:text-sm text-white whitespace-nowrap">
        {info}
      </div>
    </div>
  )
}

export default SecondaryCard
