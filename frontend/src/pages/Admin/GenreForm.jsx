// import React from 'react'

// const GenreForm = ({value,setValue,handleSubmit,buttonText='Submit',handleDelete}) => {
//   return (
//     <div className='p-3' >
//         <form onSubmit={handleSubmit} className='space-y-3'>
//             <input type="text" className='py-3 px-4 border rounded-lg w-[60rem]' placeholder='write genre name' value={value} onChange={(e)=>setValue(e.target.value)}/> 
//             <div className='flex justify-between'>
//                <button className='bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'>{buttonText}</button>
//                {
//                 handleDelete&& (
//                     <button onClick={handleDelete} className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 '>Delete</button>
//                 )
//                }
//             </div>

//         </form>
//     </div>
//   )
// }

// export default GenreForm


import React from 'react'

const GenreForm = ({ value, setValue, handleSubmit, buttonText = 'Submit', handleDelete }) => {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full max-w-full text-gray-900 placeholder-gray-400"
          placeholder="Write genre name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Genre Name"
        />

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <button
            type="submit"
            className="flex-1 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default GenreForm
