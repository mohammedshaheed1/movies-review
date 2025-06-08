// import React, { useEffect, useState } from 'react'
// import {useParams,useNavigate} from 'react-router-dom'
// import {useDeleteMovieMutation, useGetSpecificMovieQuery, useUpdateMovieMutation, useUploadImageMutation} from '../../pages/redux/api/movies'
// import { toast } from 'react-toastify'

// const UpdateMovie = () => {

//     const {id} =useParams()
//     const navigate =useNavigate()

//     const [movieData,setMovieData]=useState({
//         name:"",
//         year:0,
//         detail:"",
//         cast:[],
//         rating:0,
//         image:null
//     })
//     const [selectedImage,setSelectedImage]=useState(null)
//     const {data:initialMovieData}=useGetSpecificMovieQuery(id)
//     useEffect(()=>{
//        if(initialMovieData){
//            setMovieData(initialMovieData)
//        }
//     },[initialMovieData])


//     const [updateMovie,{isLoading:isUpdatingMovie}]=useUpdateMovieMutation()

//     const [uploadImage,{isLoading:isUploadingImage,error:uploadImageErrorDetails}] =useUploadImageMutation()
//     const [deleteMovie]=useDeleteMovieMutation()


//     const handleChange =(e)=>{
//         const {name,value}=e.target;
//         setMovieData((prevData)=>({
//             ...prevData,
//             [name]:value
//         }))
//     }

//     const handleImageChange=e=>{
//          const file=e.target.files[0]
//          setSelectedImage(file)
//     }

//     const handleUpdateMovie=async()=>{
//         try {
//             if(!movieData.name||!movieData.year||!movieData.detail||!movieData.cast){
//                  toast.error("Please fill all the required fields")
//                  return;
//             }
//             let uploadedImagePath=movieData.image;
//             if(selectedImage){
//                 const formData=new FormData() 
//                 formData.append('image',selectedImage)

//                 const uploadImageResponse=await uploadImage(formData)
//                 if(uploadImageResponse.data){
//                     uploadedImagePath=uploadImageResponse.data.image
//                 }else{
//                     console.error("failed to upload image",uploadImageErrorDetails)
//                     toast.error("failed to upload image")
//                     return;
//                 }

//             }


//             await updateMovie({
//                 id:id,
//                 updatedMovie:{
//                     ...movieData,
//                     image:uploadedImagePath
//                 }
//             })

//             navigate('/movies')

//         } catch (error) {
//             console.error('failed to update movie:',error)
//         }
//     }

//    const handleDeleteMovie=async()=>{
//         try {
//             toast.success("Movie deleted successfully")
//             await deleteMovie(id)
//             navigate('/movies')
            
//         } catch (error) {
//              console.error("Failed to delete movie:",error);
//              toast.error(`Failed to delete movie:${error?.message}`)
//         }
//    }



//   return (
//     <div className='container flex justify-center items-center mt-4'>
//         <form>
//             <p className='text-green-200 w-[50rem] text-2xl mb-4'>Update Movie</p> 
//             <div className='mb-4'>
//               <label className='block'>
//                 Name:
//                 <input type="text" name='name' value={movieData.name} onChange={handleChange} className='border px-2 py-1 w-full'/>
//               </label>
//             </div>
//             <div className='mb-4'>
//               <label className='block'>
//                 Year:
//                 <input type="number" name='year' value={movieData.year} onChange={handleChange} className='border px-2 py-1 w-full'/>
//               </label>
//             </div>
//             <div className='mb-4'>
//               <label className='block'>
//                 Details:
//                 <textarea name="detail" value={movieData.detail} onChange={handleChange} className='border px-2 py-1 w-full'/>
//               </label>
//             </div>
//             <div className='mb-4'>
//               <label className='block'>
//                 Cast (comma-separated):
//                 <input type="text" name='cast' value={movieData.cast.join(', ')} onChange={(e)=>setMovieData({...movieData,cast:e.target.value.split(', ')})} className='border px-2 py-1 w-full'/>
//               </label>
//             </div>

//            <div className='mb-4'>
//               <label 
//               style={!selectedImage?{border:"1px solid #888",borderRadius:"5px",padding:"8px"}:{border:"0",borderRadius:"0",padding:"0"}}
//               >
//                {!selectedImage&&"Upload Image"}
//                <input type="file" accept='image/*' onChange={handleImageChange} style={{display:!selectedImage?"none":"block"}}/>
//               </label>
//            </div>
           
//             <button type='button' onClick={handleUpdateMovie} className='bg-teal-500 text-white px-4 py-2 rounded'disabled={isUpdatingMovie || isUploadingImage} >
//                 {isUpdatingMovie || isUploadingImage ?"Updating...":"Update Movie"}
//             </button>

//             <button type='button' onClick={handleDeleteMovie} className='bg-red-500 text-white px-4 py-2 rounded' disabled={isUpdatingMovie || isUploadingImage}>
//                 {isUpdatingMovie || isUploadingImage ?"Deleting...":"Delete Movie"}
//             </button>
//         </form>
//     </div>
//   )
// }

// export default UpdateMovie



import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDeleteMovieMutation, useGetSpecificMovieQuery, useUpdateMovieMutation, useUploadImageMutation } from '../../pages/redux/api/movies'
import { toast } from 'react-toastify'

const UpdateMovie = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movieData, setMovieData] = useState({
    name: '',
    year: 0,
    detail: '',
    cast: [],
    rating: 0,
    image: null,
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const { data: initialMovieData } = useGetSpecificMovieQuery(id)

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData)
    }
  }, [initialMovieData])

  const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation()
  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation()
  const [deleteMovie] = useDeleteMovieMutation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setSelectedImage(file)
  }

  const handleUpdateMovie = async () => {
    try {
      if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast.length) {
        toast.error('Please fill all the required fields')
        return
      }
      let uploadedImagePath = movieData.image
      if (selectedImage) {
        const formData = new FormData()
        formData.append('image', selectedImage)

        const uploadImageResponse = await uploadImage(formData)
        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image
        } else {
          console.error('failed to upload image', uploadImageErrorDetails)
          toast.error('Failed to upload image')
          return
        }
      }

      await updateMovie({
        id,
        updatedMovie: {
          ...movieData,
          image: uploadedImagePath,
        },
      })

      toast.success('Movie updated successfully')
      navigate('/movies')
    } catch (error) {
      console.error('failed to update movie:', error)
      toast.error('Failed to update movie')
    }
  }

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(id)
      toast.success('Movie deleted successfully')
      navigate('/movies')
    } catch (error) {
      console.error('Failed to delete movie:', error)
      toast.error(`Failed to delete movie: ${error?.message}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <form className="flex flex-col space-y-6">
        <h2 className="text-3xl font-semibold text-green-600 text-center">Update Movie</h2>

        <label className="flex flex-col">
          <span className="mb-1 font-medium">Name:</span>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Movie name"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-medium">Year:</span>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Year"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-medium">Details:</span>
          <textarea
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            className="border rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows={4}
            placeholder="Movie details"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-medium">Cast (comma-separated):</span>
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(', ')}
            onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(',').map((c) => c.trim()) })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Cast names"
          />
        </label>

        <label
          className={`flex flex-col items-center justify-center cursor-pointer rounded border border-gray-400 py-6 ${
            !selectedImage ? 'border-dashed' : 'border-solid'
          }`}
          style={{ minHeight: '120px' }}
        >
          {!selectedImage && <span className="text-gray-600">Upload Image</span>}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="max-h-40 object-contain mt-2"
            />
          )}
        </label>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={handleUpdateMovie}
            disabled={isUpdatingMovie || isUploadingImage}
            className="flex-1 bg-teal-500 text-white py-2 rounded hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isUpdatingMovie || isUploadingImage ? 'Updating...' : 'Update Movie'}
          </button>

          <button
            type="button"
            onClick={handleDeleteMovie}
            disabled={isUpdatingMovie || isUploadingImage}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isUpdatingMovie || isUploadingImage ? 'Deleting...' : 'Delete Movie'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateMovie
