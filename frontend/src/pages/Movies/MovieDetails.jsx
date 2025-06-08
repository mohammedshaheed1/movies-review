// import React, { useState } from 'react'
// import { useParams,Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { useGetSpecificMovieQuery,useAddMovieReviewMutation } from '../redux/api/movies'
// import MovieTabs from './MovieTabs'
// import { toast } from 'react-toastify'


// const MovieDetails = () => {
  
//     const {id:movieId}=useParams()
//     const [rating,setRating]=useState(0)
//     const [comment,setComment]=useState('')
//     const {data:movie,refetch}=useGetSpecificMovieQuery(movieId)
//     const {userInfo}=useSelector((state)=>state.auth)
//     const [createReview,{isLoading:loadingmovieReview}]=useAddMovieReviewMutation()

//     const submitHandler=async(e)=>{
//         e.preventDefault()  
//         try {
//             await createReview({
//                 id:movieId,
//                 rating,
//                 comment
//             }).unwrap()

//             refetch()
//             toast.success('Review created successfully')
            
//         } catch (error) {
//             toast.error(error.data || error.message)  
//         }
//     }

//   return (
//     <>
//     <div>
//         <Link to='/' className='text-white font-semibold hover:underline ml-[20rem]'>Go Back</Link>
//     </div>

//     <div className='mt-[20rem]'>
//         <div className='flex justify-center items-center'>
//             <img src={movie?.image} alt={movie?.name} className='w-[70%] rounded' />
//         </div>
//         <div className='container flex justify-between ml-[20rem] mt-[3rem]'>
//              <section>
//                 <h2 className='text-5xl my-4 font-extrabold'>{movie?.name}</h2>
//                 <p className='my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]'>{movie?.detail}</p>
//              </section>

//              <div className='mr-[5rem]'>
//                    <p className='text-2xl font-semibold'>Releasing Date: {movie?.year}</p>
//                    <div>
//                       {movie?.cast.map((c)=>(
//                           <ul key={c._id}>
//                               <li className='mt-[1rem]'>{c}</li>
//                           </ul>
//                       ))}
//                    </div>
//              </div>
//         </div>
//          <div className='container ml-[20rem] '>
//              <MovieTabs loadingMovieReview={loadingmovieReview} userInfo={userInfo} submitHandler={submitHandler} rating={rating} setRating={setRating} comment={comment} setComment={setComment} movie={movie}/>
//          </div>
//     </div>
//     </>
//   )
// }

// export default MovieDetails


import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetSpecificMovieQuery, useAddMovieReviewMutation } from '../redux/api/movies';
import MovieTabs from './MovieTabs';
import { toast } from 'react-toastify';

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingmovieReview }] = useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="text-teal-400 hover:underline mb-6 inline-block">
          &larr; Go Back
        </Link>

        <div className="flex justify-center mb-10">
          <img src={movie?.image} alt={movie?.name} className="rounded-lg w-full max-w-3xl object-cover shadow-lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Movie Info */}
          <section>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">{movie?.name}</h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              {movie?.detail}
            </p>
          </section>

          {/* Movie Meta Info */}
          <aside className="bg-gray-800 p-6 rounded-xl shadow-md">
            <p className="text-xl font-semibold mb-4">
              Releasing Date: <span className="text-gray-300">{movie?.year}</span>
            </p>
            <h3 className="text-lg font-semibold mb-2">Cast:</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {movie?.cast?.map((c, index) => (
                <li key={index}>{c}</li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <MovieTabs
            loadingMovieReview={loadingmovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
