// import React from 'react'
// import { useGetTopMoviesQuery,useGetAllMoviesQuery } from '../../../redux/api/movies'
// import { useGetUsersQuery } from '../../../redux/api/user'
// import SecondaryCard from './SecondaryCard'
// import AllMovies from '../../../Movies/AllMovies'
// import VideoCard from './VideoCard'
// import RealTimeCard from './RealTimeCard'

// const Main = () => {

//   const {data:topMovies}=useGetTopMoviesQuery()
//   const {data:visitors}=useGetUsersQuery()
//   const {data:allMovies}=useGetAllMoviesQuery()

//   const totalCommentsLength=allMovies?.map((m)=>m.numReviews)
//   const sumofCommentsLength=totalCommentsLength?.reduce((acc,length)=>acc+length,0)

//   return (
//     <div>
//         <section className='flex justify-around'>
//             <div className='ml-[14rem] mt-10'>
//                <div className='-translate-x-4 flex'>
//                 <SecondaryCard pill="Users" content={visitors?.length} info="20.2k more than usual" gradient="from-teal-500 to-lime-400"/>
//                            <SecondaryCard pill="Comments" content={sumofCommentsLength} info="742.8 more than usual" gradient="from-[#CCC514] to-[#CDCB8E]"/>
//                                       <SecondaryCard pill="Movies" content={AllMovies?.length} info="372+ more than usual" gradient="from-green-500 to-lime-400"/>
                                               
//                </div>
//                 <div className='flex justify-between w-[90%] text-white mt-10 font-bold'>
//               <p>Top Content</p>
//               <p>Comments</p>
//           </div>

//           {topMovies?.map((movie)=>(
//               <VideoCard key={movie._id} image={movie.image} title={movie.name} date={movie.year} comments={movie.numReviews}/>
//           ))}
//             </div>


//             <div>
//                 <RealTimeCard/>
//             </div>

         

//         </section>
//     </div>
//   )
// }

// export default Main


import React from 'react'
import { useGetTopMoviesQuery, useGetAllMoviesQuery } from '../../../redux/api/movies'
import { useGetUsersQuery } from '../../../redux/api/user'
import SecondaryCard from './SecondaryCard'
import VideoCard from './VideoCard'
import RealTimeCard from './RealTimeCard'

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery()
  const { data: visitors } = useGetUsersQuery()
  const { data: allMovies } = useGetAllMoviesQuery()

  const totalCommentsLength = allMovies?.map((m) => m.numReviews)
  const sumofCommentsLength = totalCommentsLength?.reduce((acc, length) => acc + length, 0)

  return (
    <div className="px-4 sm:px-8 lg:px-20 py-10">
      <section className="flex flex-wrap justify-center lg:justify-around gap-10">
        {/* Left Side - Stats and Top Movies */}
        <div className="flex flex-col max-w-xl w-full lg:w-[60%]">
          {/* Stats cards */}
          <div className="-translate-x-2 flex flex-wrap gap-4 justify-center lg:justify-start">
            <SecondaryCard
              pill="Users"
              content={visitors?.length ?? 0}
              info="20.2k more than usual"
              gradient="from-teal-500 to-lime-400"
            />
            <SecondaryCard
              pill="Comments"
              content={sumofCommentsLength ?? 0}
              info="742.8 more than usual"
              gradient="from-[#CCC514] to-[#CDCB8E]"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length ?? 0}
              info="372+ more than usual"
              gradient="from-green-500 to-lime-400"
            />
          </div>

          {/* Top Content Header */}
          <div className="flex justify-between w-full text-white mt-10 font-bold text-lg px-2">
            <p>Top Content</p>
            <p>Comments</p>
          </div>

          {/* Top Movies List */}
          <div className="mt-4 space-y-6">
            {topMovies?.map((movie) => (
              <VideoCard
                key={movie._id}
                image={movie.image}
                title={movie.name}
                date={movie.year}
                comments={movie.numReviews}
              />
            ))}
          </div>
        </div>

        {/* Right Side - RealTime Card */}
        <div className="max-w-sm w-full lg:w-[35%] mt-10 lg:mt-0">
          <RealTimeCard />
        </div>
      </section>
    </div>
  )
}

export default Main
