// import React from 'react'
// import { Link } from 'react-router-dom'

// const MovieCard = ({movie}) => {
//   return (
//     <div key={movie._id} className='relative group m-[2rem]'>
//        <Link to={`/movies/${movie._id}`}>
//          <img src={movie.image} alt={movie.name} className='w-[20rem] h-[20rem] rounded m-0 p-0 transition duration-300 ease-in-out transform group-hover:opacity-50'/>
//        </Link>
//     <p className='absolute top-[85%] left-[2rem] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 text-white'>{movie.name}</p>
//     </div>
//   )
// }

// export default MovieCard


import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  return (
    <div className="relative group m-4 sm:m-6">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className="
            w-[12rem] h-[12rem]       /* base size - phones */
            sm:w-[16rem] sm:h-[16rem] /* small+ screens */
            md:w-[18rem] md:h-[18rem] /* medium screens */
            lg:w-[20rem] lg:h-[20rem] /* large screens */
            rounded 
            object-cover
            transition duration-300 ease-in-out transform
            group-hover:opacity-50
          "
        />
      </Link>
      <p className="
        absolute
        bottom-[10%]
        left-4
        right-4
        opacity-0
        group-hover:opacity-100
        transition-opacity duration-300 ease-in-out
        text-white
        text-sm sm:text-base md:text-lg
        font-semibold
        text-center
        drop-shadow-lg
      ">
        {movie.name}
      </p>
    </div>
  )
}

export default MovieCard
