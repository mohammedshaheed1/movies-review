// import React from 'react'
// import {useDeleteCommentMutation,useGetAllMoviesQuery} from '../../pages/redux/api/movies'
// import { toast } from 'react-toastify'

// const AllComments = () => {

//     const {data:movie,refetch}=useGetAllMoviesQuery()
//     const [deleteComment]=useDeleteCommentMutation()

//     const handleDeleteComment=async(movieId,reviewId)=>{
//          try {

//             await deleteComment({movieId,reviewId})
//             toast.success("Comment Deleted")
//             refetch()
            
//          } catch (error) {
//              console.error("Error deleting comment:",error)
//          }
//     }
//   return (
//     <div>
//         {movie?.map((m)=>(
//             <section key={m._id} className='flex flex-col justify-center items-center'>
//                 {m?.reviews.map((review)=>(
//                     <div key={review._id} className='bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]'>
//                         <div className='flex justify-between'>
//                             <strong className='text-[#B0B0B0]'>{review.name}</strong>
//                             <p className='text-[#B0B0B0]'>{review.createdAt.substring(0,10)}</p>
//                         </div>

//                         <p className='my-4'>{review.comment}</p>
//                         <button className='text-red-500' onClick={()=>handleDeleteComment(m._id,review._id)}>Delete</button>
//                     </div>
//                 ))}
//             </section>  
//         ))}
//     </div>
//   )
// }

// export default AllComments



import React from 'react'
import { useDeleteCommentMutation, useGetAllMoviesQuery } from '../../pages/redux/api/movies'
import { toast } from 'react-toastify'

const AllComments = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery()
  const [deleteComment] = useDeleteCommentMutation()

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId }).unwrap()
      toast.success('Comment Deleted')
      refetch()
    } catch (error) {
      console.error('Error deleting comment:', error)
      toast.error('Failed to delete comment')
    }
  }

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      {movies?.map((movie) => (
        <section key={movie._id} className="mb-10">
          <h3 className="text-xl font-semibold text-green-400 mb-6">{movie.name}</h3>
          <div className="flex flex-col space-y-6">
            {movie?.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1A1A1A] p-6 rounded-lg shadow-md w-full sm:w-3/4 md:w-1/2 mx-auto"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <strong className="text-[#B0B0B0] text-lg">{review.name}</strong>
                  <p className="text-[#B0B0B0] text-sm mt-1 sm:mt-0">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <p className="my-4 text-white whitespace-pre-wrap">{review.comment}</p>

                <button
                  className="text-red-500 hover:underline focus:outline-none"
                  onClick={() => handleDeleteComment(movie._id, review._id)}
                >
                  Delete
                </button>
              </div>
            ))}
            {movie?.reviews.length === 0 && (
              <p className="text-gray-400 text-center">No comments for this movie.</p>
            )}
          </div>
        </section>
      ))}
      {!movies?.length && <p className="text-gray-400 text-center">No movies found.</p>}
    </div>
  )
}

export default AllComments
