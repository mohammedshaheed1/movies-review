// import React from 'react'
// import {useGetAllMoviesQuery} from '../../pages/redux/api/movies'
// import {Link} from 'react-router-dom'

// const AdminMoviesList = () => {

//   const {data:movies}=useGetAllMoviesQuery()

//   return (
//     <div className='container mx-[9rem]'>
//       <div className='flex flex-col md:flex-row'>
//         <div className='p-3'>
//            <div className='ml-[2rem] text-xl font-bold h-12'>
//             All Movies ({movies?.length})
//            </div>
 
//           <div className='flex flex-wrap justify-around items-center p-[2rem]'>
//             {movies?.map((movie)=>(
//                <Link key={movie._id} to={`/admin/movies/update/${movie._id}`} className='block mb-4 overfow-hidden'>
//                    <div className='flex'>
//                     <div key={movie._id} className='max-w-sm m-[2rem] rounded overflow-hidden shadow-lg'>
//                         <img src={movie.image} alt={movie.name} className='w-full h-48 object-cover' />
//                         <div className='px-6 py-4 border border-gray-400'>
//                            <div className='font-bold text-xl mb-2'>
//                               {movie.name}
//                            </div>
//                         </div>
//                         <p className='text-gray-700 text-base'>{movie.detail}</p>
//                         <div className='mt-[2rem] mb-[1rem]'>
//                             <Link to={`/admin/movies/update/${movie._id}`} className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Update Movie</Link>
//                         </div>
//                     </div>
//                    </div>
//                </Link>
//             ))}
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminMoviesList

import React from 'react'
import { useGetAllMoviesQuery } from '../../pages/redux/api/movies'
import { Link } from 'react-router-dom'

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery()

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-20 py-10">
      <h2 className="text-2xl font-bold mb-6">
        All Movies ({movies?.length || 0})
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {movies?.map((movie) => (
          <div
            key={movie._id}
            className="rounded-lg overflow-hidden shadow-lg bg-[#1a1a1a] text-white flex flex-col"
          >
            <img
              src={movie.image}
              alt={movie.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{movie.name}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {movie.detail}
                </p>
              </div>
              <div className="mt-auto">
                <Link
                  to={`/admin/movies/update/${movie._id}`}
                  className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Update Movie
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminMoviesList
