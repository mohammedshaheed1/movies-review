// import React from 'react'
// import { Link } from 'react-router-dom'

// const MovieTabs = ({userInfo,submitHandler,comment,setComment,movie}) => {
//   return (
//     <div>
//         <section>
//             {userInfo?(
//                <form onSubmit={submitHandler}>
//                 <div className='my-2'>
//                  <label htmlFor="comment" className='block text-xl mb-2'>Write Your Review</label>
//                  <textarea id='comment' rows='3' required value={comment} onChange={(e)=>setComment(e.target.value)} className='p-2 border rounded-lg xl:w-[40rem] text-black'></textarea>


//                  </div>
//                                   <button type='submit' className='bg-teal-600 text-white py-2 px-4 rounded-lg'>Submit</button>
//                </form> 
//             ):(
//                 <p>Please <Link to='/login'>Sign In</Link>to write a review</p>
//             )}
//         </section>

//         <section className='mt-[3rem]'>
//             <div>{movie?.reviews.length===0 && <p>No Reviews</p>}</div>
//             <div>
//                 {movie?.reviews.map((review)=>(
//                    <div key={review._id} className='bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]'>
//                       <div className='flex justify-between'>
//                           <strong className='text-[#B0B0B0]'>{review.name}</strong>
//                           <p className='text-[#B0B0B0]'>
//                               {review.createdAt.substring(0,10)}
//                           </p>
//                       </div>
//                        <p className='my-4'>{review.comment}</p>
//                    </div>
//                 ))}
//             </div>
//         </section>
//     </div>
//   )
// }

// export default MovieTabs



import React from 'react'
import { Link } from 'react-router-dom'

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      {/* Review Form */}
      <section className="mb-10">
        {userInfo ? (
          <form onSubmit={submitHandler} className="flex flex-col gap-4 max-w-3xl">
            <div>
              <label htmlFor="comment" className="block text-lg font-semibold mb-2">
                Write Your Review
              </label>
              <textarea
                id="comment"
                rows="4"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border border-gray-400 rounded-lg text-black resize-none"
                placeholder="Your thoughts..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="self-start bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded transition"
            >
              Submit
            </button>
          </form>
        ) : (
          <p className="text-sm text-gray-300">
            Please{' '}
            <Link to="/login" className="text-teal-400 underline hover:text-teal-200">
              Sign In
            </Link>{' '}
            to write a review.
          </p>
        )}
      </section>

      {/* Reviews Section */}
      <section>
        {movie?.reviews.length === 0 && (
          <p className="text-gray-400 mb-4">No Reviews</p>
        )}

        <div className="flex flex-col gap-6">
          {movie?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#1A1A1A] p-5 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2"
            >
              <div className="flex justify-between mb-2">
                <strong className="text-gray-200">{review.name}</strong>
                <span className="text-gray-400 text-sm">
                  {review.createdAt.substring(0, 10)}
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MovieTabs
