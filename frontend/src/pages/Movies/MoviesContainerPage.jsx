// import React, { useState } from 'react'
// import {useGetNewMoviesQuery,useGetTopMoviesQuery,useGetRandomMoviesQuery} from '../../pages/redux/api/movies'
// import {useFetchGenresQuery} from '../../pages/redux/api/genre'
// import SliderUtil from '../../component/SliderUtil'


// const MoviesContainerPage = () => {

//     const {data}=useGetNewMoviesQuery()
//     const {data:topMovies}=useGetTopMoviesQuery()
//     const {data:genres}=useFetchGenresQuery()
//     const {data:randomMovies}=useGetRandomMoviesQuery()

//     const [selectedGenre,setSelectedGenre]=useState(null)

//     const handleGenreClick=(genreId)=>{
        
//         setSelectedGenre(genreId)
//     }

//     const filteredMovies=data?.filter((movie)=>selectedGenre===null || movie.genre===selectedGenre)

//   return (
//     <div className='flex flex-col lg:flex-row lg:justify-between items-center'>
//         <nav className='ml-[4rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row'>
//           {genres?.map((g)=>(
//              <button key={g._id} className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-[1rem] text-lg ${selectedGenre===g._id?"bg-gray-200":""} `} onClick={()=>handleGenreClick(g._id)}>{g.name}</button>
//           ))}
//         </nav>


//         <section className='flex flex-col justify-center items-center w-full lg:w-auto'>
//              <div className='w-full lg:w-[100rem] mb-8'>
//                  <h1 className='mb-5'>Choose for You</h1>
//                  <SliderUtil data={randomMovies}/>
//              </div>
      

//         <div className='w-full lg:w-[100rem] mb-8'>
//            <h1 className='mb-5'>Top Movies</h1>
//            <SliderUtil data={topMovies}/>
//         </div>

//           <div className='w-full lg:w-[100rem] mb-8'>
//            <h1 className='mb-5'>Choose Movies</h1>
//            <SliderUtil data={filteredMovies}/>
//         </div>

//           </section>
//     </div>
//   )
// }

// export default MoviesContainerPage



import React, { useState } from 'react'
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from '../../pages/redux/api/movies'
import { useFetchGenresQuery } from '../../pages/redux/api/genre'
import SliderUtil from '../../component/SliderUtil'

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery()
  const { data: topMovies } = useGetTopMoviesQuery()
  const { data: genres } = useFetchGenresQuery()
  const { data: randomMovies } = useGetRandomMoviesQuery()

  const [selectedGenre, setSelectedGenre] = useState(null)

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId)
  }

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  )

  return (
    <div className="flex flex-col lg:flex-row px-4 lg:px-8 py-8 gap-8">
      {/* Genre Navigation */}
      {/* <nav className="flex flex-wrap lg:flex-col gap-2 lg:gap-4 w-full lg:w-1/5">
        {genres?.map((g) => (
          <button
            key={g._id}
            onClick={() => handleGenreClick(g._id)}
            className={`px-4 py-2 text-sm md:text-base rounded border transition-all duration-300 ${
              selectedGenre === g._id
                ? 'bg-gray-300 text-black font-medium'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {g.name}
          </button>
        ))}

      </nav> */}
     <nav className="w-full lg:w-1/5 bg-white/5 h-80 border border-white/10 rounded-lg px-3 py-2 shadow-sm">
  <h2 className="text-md font-semibold text-white mb-3">Genres</h2>
  <div className="flex flex-wrap lg:flex-col gap-2">
    {genres?.map((g) => (
      <button
        key={g._id}
        onClick={() => handleGenreClick(g._id)}
        className={`px-3 py-1.5 text-sm rounded-full font-medium transition-all duration-200 ${
          selectedGenre === g._id
            ? 'bg-teal-500 text-white hover:bg-teal-600'
            : 'bg-gray-700 text-white hover:bg-gray-600'
        }`}
      >
        {g.name}
      </button>
    ))}
  </div>
</nav>


      {/* Movie Sliders */}
      <section className="flex flex-col gap-10 w-full lg:w-4/5">
        <div className="w-full">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Choose for You</h2>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Top Movies</h2>
          <SliderUtil data={topMovies} />
        </div>

        <div className="w-full">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Choose Movies</h2>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  )
}

export default MoviesContainerPage
