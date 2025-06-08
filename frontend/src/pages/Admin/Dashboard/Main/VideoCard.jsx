// import React from 'react'

// const VideoCard = ({image,title,date,comments}) => {
//   return (
//     <>
//     <div className='flex items-center w-[90%] mt-5'>
//         <div>
//             <img src={image} alt="card Image" className='h-[3rem]' />
//         </div>

//         <div className='ml-4'>
//             <h2 className='text-lg text-white '>{title}</h2>
//             <p className='text-gray-500 mb-3'>{date}</p>
//         </div>

//         <div className='flex-grow mb-5 flex justify-end items-center'>
//              <div className='text-white text-lg'>{comments}</div>
//         </div>
//     </div>
//     </>
//   )
// }

// export default VideoCard


import React from 'react'

const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full max-w-4xl mt-5 px-4 sm:px-0">
      <div className="flex-shrink-0">
        <img src={image} alt="card Image" className="h-12 w-12 sm:h-16 sm:w-16 rounded object-cover" />
      </div>

      <div className="mt-3 sm:mt-0 sm:ml-6 flex-grow">
        <h2 className="text-base sm:text-lg text-white truncate">{title}</h2>
        <p className="text-gray-400 text-sm">{date}</p>
      </div>

      <div className="mt-3 sm:mt-0 flex items-center justify-end sm:w-24 text-white text-lg font-semibold">
        {comments}
      </div>
    </div>
  )
}

export default VideoCard
