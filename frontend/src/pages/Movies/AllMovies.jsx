// import React, { useEffect } from 'react'
// import {useGetAllMoviesQuery,useGetNewMoviesQuery,useGetTopMoviesQuery,useGetRandomMoviesQuery} from '../../pages/redux/api/movies'
// import { useFetchGenresQuery } from '../redux/api/genre'
// import banner from '../../assets/image.png'
//  import {setMoviesFilter,setFilteredMovies,setMoviesYears,setUniqueYears}  from '../../pages/redux/features/movis/moviesSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import MovieCard from './MovieCard'

// const AllMovies = () => {

  
//     const dispatch=useDispatch();
//     const {data}=useGetAllMoviesQuery()
//     const {data:genres}=useFetchGenresQuery()
//     const {data:newMovies}=useGetNewMoviesQuery()
//     const {data:randomMovies}=useGetRandomMoviesQuery()
//     const {data:topMovies}=useGetTopMoviesQuery()

//     const {moviesFilter,filteredMovies}=useSelector((state)=>state.movies)
//     const movieYears=data?.map((movie)=>movie.year)
//     const uniqueYears=Array.from(new Set(movieYears))

//     useEffect(()=>{
//           dispatch(setFilteredMovies(data||[]))
//           dispatch(setMoviesYears(movieYears))
//           dispatch(setUniqueYears(uniqueYears))
//     },[data,dispatch])

//     const handleSearchChange=(e)=>{
//           dispatch(setMoviesFilter({searchTerm:e.target.value}))
//           const filteredMovies = data.filter((movie)=>movie.name.toLowerCase().includes(e.target.value.toLowerCase()))
//           dispatch(setFilteredMovies(filteredMovies))

//     }

//     const handleGenreClick=(genreId)=>{
//          const filterByGenre=data.filter(movie=>movie.genre===genreId)
//          dispatch(setFilteredMovies(filterByGenre))
//     }

//     const handleYearChange=(year)=>{
//        const filterByYear=data.filter(movie=>movie.year===Number(year))
//        dispatch(setFilteredMovies(filterByYear))
//     }

//     const handleSortChange=(sortOption)=>{
//         switch(sortOption){
//              case "new":
//                 dispatch(setFilteredMovies(newMovies))
//                 break;
//              case "top":
//                 dispatch(setFilteredMovies(topMovies))
//                 break;
//              case "random":
//                 dispatch(setFilteredMovies(randomMovies))
//                 break;
//             default:
//                 dispatch(setFilteredMovies([]))
//                 break;
//         }
//     }

//   return (
//     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//        <>
//        <section>
//         <div className='relative h-[50rem] w-screen mb-10 flex items-center justify-center bg-cover' style={{backgroundImage:`url(${banner})`}}>
//             <div className='absolute inset-0 bg-gradient-to-b from-gray-800 to-black'>
//             </div> 

//             <div className='relative z-10 text-center text-white mt-[10rem]'>
//                 <h1 className='text-8xl font-bold mb-4'>The Movies Hub</h1>
//                 <p className='text-2xl'>Cinematic Odyssey:Unveiling the Magic of Movies</p>
//             </div>

//             <section className='absolute -bottom-[5rem]'>
//                 <input type="text" className='w-[100%] h-[5rem] border px-10 outline-none  rounded' placeholder='Search Movie' value={moviesFilter.searchTerm} 
//                 onChange={handleSearchChange}
//                 />
//                 <section className='sorts-container mt-[2rem] ml-[10rem] w-[30rem]'>
//                      <select className='border p-2 rounded text-black ' value={moviesFilter.selectedGenre} onChange={(e)=>handleGenreClick(e.target.value)}>
//                         <option value="">Genres</option>
//                         {genres?.map((genre)=>(
//                             <option key={genre._id} value={genre._id}>
//                                  {genre.name}
//                             </option>
//                         ))}
//                      </select>
//                      <select  className='border p-2 rounded text-black' value={moviesFilter.selectedYear} onChange={(e)=>handleYearChange(e.target.value)}>
//                           <option value="">Year</option>
//                           {uniqueYears.map((year)=>(
//                             <option key={year} value={year}>{year}</option>
//                           ))}
//                      </select>

//                      <select className='border p-2 rounded ml-4 text-black' value={moviesFilter.selectedSort} onChange={(e)=>handleSortChange(e.target.value)}>
//                          <option value="">Sort By</option>
//                           <option value="new">New Movies</option>
//                            <option value="top">Top Movies</option>
//                             <option value="random">Random Movies</option>
//                      </select>
//                 </section>
//             </section>
//         </div>

//         <section className='mt-[10rem] w-screen flex justify-center items-center flex-wrap'>
//             {filteredMovies?.map((movie)=>(
//                 <MovieCard key={movie._id} movie={movie}/>
//             ))}
//         </section>
//        </section>
//        </>
//     </div>
//   )
// }

// export default AllMovies




import React, { useEffect } from 'react'
import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from '../../pages/redux/api/movies'
import { useFetchGenresQuery } from '../redux/api/genre'
import banner from '../../assets/image.png'
import {
  setMoviesFilter,
  setFilteredMovies,
  setMoviesYears,
  setUniqueYears,
} from '../../pages/redux/features/movis/moviesSlice'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from './MovieCard'

const AllMovies = () => {
  const dispatch = useDispatch()
  const { data } = useGetAllMoviesQuery()
  const { data: genres } = useFetchGenresQuery()
  const { data: newMovies } = useGetNewMoviesQuery()
  const { data: randomMovies } = useGetRandomMoviesQuery()
  const { data: topMovies } = useGetTopMoviesQuery()

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies)

  const movieYears = data?.map((movie) => movie.year)
  const uniqueYears = Array.from(new Set(movieYears))

  useEffect(() => {
    dispatch(setFilteredMovies(data || []))
    dispatch(setMoviesYears(movieYears))
    dispatch(setUniqueYears(uniqueYears))
  }, [data, dispatch])

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }))
    const filtered = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    dispatch(setFilteredMovies(filtered))
  }

  const handleGenreClick = (genreId) => {
    const filtered = data.filter((movie) => movie.genre === genreId)
    dispatch(setFilteredMovies(filtered))
  }

  const handleYearChange = (year) => {
    const filtered = data.filter((movie) => movie.year === Number(year))
    dispatch(setFilteredMovies(filtered))
  }

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case 'new':
        dispatch(setFilteredMovies(newMovies))
        break
      case 'top':
        dispatch(setFilteredMovies(topMovies))
        break
      case 'random':
        dispatch(setFilteredMovies(randomMovies))
        break
      default:
        dispatch(setFilteredMovies(data || []))
        break
    }
  }

  return (
    <div className='flex flex-col items-center'>
      {/* Banner Section */}
      <div
        className='relative w-full h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center'
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className='absolute inset-0 bg-gradient-to-b from-gray-900/70 to-black'></div>

        <div className='relative z-10 text-center text-white px-4'>
          <h1 className='text-4xl md:text-6xl font-bold mb-2'>The Movies Hub</h1>
          <p className='text-md md:text-2xl'>Cinematic Odyssey: Unveiling the Magic of Movies</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className='w-full max-w-6xl px-4 mt-6'>
        <input
          type='text'
          className='w-full md:w-[50%] border p-3 rounded mb-4'
          placeholder='Search Movie'
          value={moviesFilter.searchTerm}
          onChange={handleSearchChange}
        />

        <div className='flex flex-col md:flex-row gap-4 mb-8'>
          <select
            className='border p-2 rounded text-black'
            value={moviesFilter.selectedGenre}
            onChange={(e) => handleGenreClick(e.target.value)}
          >
            <option value=''>Genres</option>
            {genres?.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>

          <select
            className='border p-2 rounded text-black'
            value={moviesFilter.selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
          >
            <option value=''>Year</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            className='border p-2 rounded text-black'
            value={moviesFilter.selectedSort}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value=''>Sort By</option>
            <option value='new'>New Movies</option>
            <option value='top'>Top Movies</option>
            <option value='random'>Random Movies</option>
          </select>
        </div>
      </div>

      {/* Movies Grid */}
      <div className='w-full max-w-6xl px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10'>
        {filteredMovies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default AllMovies
