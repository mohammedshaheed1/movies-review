// import React from 'react'
// import { useCreateGenreMutation, useDeleteGenreMutation, useFetchGenresQuery, useUpdateGenreMutation } from '../redux/api/genre'
// import { useState } from 'react'
// import GenreForm from './GenreForm'
// import Modal from '../../component/Modal'
// import { toast } from 'react-toastify'

// const GenreList = () => {
//     const {data:genres,refetch}=useFetchGenresQuery()
//     const [name,setName]=useState('')
//     const [selectedGenre,setSelectedGenre]=useState(null);
//     const [updatingName,setUpdatingName]=useState('')
//     const [modelVisible,setModelVisible]=useState(false)

//     const [createGenre] =useCreateGenreMutation()
//     const [updateGenre]=useUpdateGenreMutation()
//     const [deleteGenre]=useDeleteGenreMutation()

//     const handleCreateGenre = async(e)=>{
//         e.preventDefault()
//         if(!name){
//             toast.error("Genre name is required")  
//             return;
//         }

//         try {
//             const result = await createGenre({name}).unwrap()
//             if(result.error){
//                toast.error(result.error)
//             }else{
//                 setName('')
//                 toast.success(`${result.name} is created`) 
//                 refetch();
//             }

//         } catch (error) {
//             console.error(error)
//             toast.error("Creating genre failed, try again.")
//         }
//     }

//     const handleUpdateGenre=async(e)=>{
//         e.preventDefault()
//         if(!updateGenre){
//             toast.error("Genre name is required")
//             return;
//         }

//         try {
//             const result=await updateGenre({id:selectedGenre._id,updateGenre:{name:updatingName}}).unwrap()
//             if(result.error){
//               toast.error(result.error)
//             }else{
//                 toast.success(`${result.name} is updated`)
//                 refetch()
//                 setSelectedGenre(null)
//                 setUpdatingName("")
//                 setModelVisible(false)
//             }
//         } catch (error) {
//             console.error(error)
//             toast.error("Creating genre failed, try again.") 
//         } 
//     }

//     const handleDeleteGenre =async(e)=>{
//         try {
//             const result = await deleteGenre(selectedGenre._id).unwrap()
//             if(result.error){
//                  toast.error(result.error)
//             }else{
//                 toast.success(`${result.name} is deleted`)
//                 refetch()
//                 setSelectedGenre(null)
//                 setModelVisible(false)
//             }
            
//         } catch (error) {
//             console.error(error)
//             toast.error("Creating genre failed, try again.") 
//         }
//     }

//   return (
//     <div className='ml-[10rem] flex flex-col md:flex-row'>
//       <div className='md:w-3/4 p-3'>
//            <h1 className='h-12'>Manage Genres</h1>
//            <GenreForm value={name} setValue={setName} 
//            handleSubmit={handleCreateGenre}
//            />
//            <br/>
//            <div className='flex flex-wrap'>
//            { genres?.map((genre)=>(
               
//                <div key={genre._id}>
//                 <button className='bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'
//                  onClick={()=>{setModelVisible(true);setSelectedGenre(genre);setUpdatingName(genre.name)}}>{genre.name}</button>
//                </div>

//            )) }
//            </div>
//            <Modal isOpen={modelVisible} onClose={()=>setModelVisible(false)}>
//               <GenreForm value={updatingName} setValue={(value)=>setUpdatingName(value)} 
//               handleSubmit={handleUpdateGenre} 
//               buttonText='Update' 
//               handleDelete={handleDeleteGenre}
//               />
//            </Modal>
//       </div>
//     </div>
//   )
// }

// export default GenreList



import React, { useState } from 'react'
import { useCreateGenreMutation, useDeleteGenreMutation, useFetchGenresQuery, useUpdateGenreMutation } from '../redux/api/genre'
import GenreForm from './GenreForm'
import Modal from '../../component/Modal'
import { toast } from 'react-toastify'

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery()
  const [name, setName] = useState('')
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [updatingName, setUpdatingName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [createGenre] = useCreateGenreMutation()
  const [updateGenre] = useUpdateGenreMutation()
  const [deleteGenre] = useDeleteGenreMutation()

  const handleCreateGenre = async (e) => {
    e.preventDefault()
    if (!name) {
      toast.error('Genre name is required')
      return
    }

    try {
      const result = await createGenre({ name }).unwrap()
      if (result.error) {
        toast.error(result.error)
      } else {
        setName('')
        toast.success(`${result.name} is created`)
        refetch()
      }
    } catch (error) {
      console.error(error)
      toast.error('Creating genre failed, try again.')
    }
  }

  const handleUpdateGenre = async (e) => {
    e.preventDefault()
    if (!updatingName) {
      toast.error('Genre name is required')
      return
    }

    try {
      const result = await updateGenre({ id: selectedGenre._id, updateGenre: { name: updatingName } }).unwrap()
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`${result.name} is updated`)
        refetch()
        setSelectedGenre(null)
        setUpdatingName('')
        setModalVisible(false)
      }
    } catch (error) {
      console.error(error)
      toast.error('Updating genre failed, try again.')
    }
  }

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap()
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`${result.name} is deleted`)
        refetch()
        setSelectedGenre(null)
        setModalVisible(false)
      }
    } catch (error) {
      console.error(error)
      toast.error('Deleting genre failed, try again.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6 text-center md:text-left">Manage Genres</h1>

      <div className="max-w-xl mx-auto md:mx-0">
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />
      </div>

      <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3 max-w-4xl mx-auto md:mx-0">
        {genres?.map((genre) => (
          <button
            key={genre._id}
            className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition"
            onClick={() => {
              setModalVisible(true)
              setSelectedGenre(genre)
              setUpdatingName(genre.name)
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <GenreForm
          value={updatingName}
          setValue={setUpdatingName}
          handleSubmit={handleUpdateGenre}
          buttonText="Update"
          handleDelete={handleDeleteGenre}
        />
      </Modal>
    </div>
  )
}

export default GenreList
