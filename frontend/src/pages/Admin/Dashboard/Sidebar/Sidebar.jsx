// import React from 'react'
// import { Link } from 'react-router-dom'

// const Sidebar = () => {
//   return (
//     <div className='-translate-y-10 flex h-screen fixed mt-10 border-r-2 border-[#242424]'>
//         <aside className='text-white w-64 flex-shrink-0'>
//            <ul className='py-4'>
//             <li className='text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full'>
//                 <Link to='/admin/movies/dashboard' className='block p-2 ml-20 mb-10'>Dashboard</Link>
//             </li>
//             <li className='text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full'>
//                 <Link to='/admin/movies/create' className='block p-2 ml-20 mb-10'>Create Movie</Link>
//             </li>
//             <li className='text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full'>
//                 <Link to='/admin/movies/genre' className='block p-2 ml-20 mb-10'>Create Genre</Link>
//             </li>
//             <li className='text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full'>
//                 <Link to='/admin/movies-list' className='block p-2 ml-20 mb-10'>Update Movie</Link>
//             </li>
//             <li className='text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full'>
//                 <Link to='/admin/movies/comments' className='block p-2 ml-20 mb-10'>Comments</Link>
//             </li>
//            </ul>
//         </aside>
//     </div>
//   )
// }

// export default Sidebar

import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-[#1f1f1f] border-r-2 border-[#242424] text-white
                    flex flex-col
                    md:flex-col md:w-64
                    sm:relative sm:h-auto sm:w-full sm:flex-row sm:border-r-0 sm:border-b-2">
      <aside className="flex flex-col py-6 px-4 space-y-6
                        sm:flex-row sm:space-y-0 sm:space-x-4 sm:overflow-x-auto sm:whitespace-nowrap">
        {[
          {to: '/admin/movies/dashboard', label: 'Dashboard'},
          {to: '/admin/movies/create', label: 'Create Movie'},
          {to: '/admin/movies/genre', label: 'Create Genre'},
          {to: '/admin/movies-list', label: 'Update Movie'},
          {to: '/admin/movies/comments', label: 'Comments'}
        ].map(({to, label}) => (
          <li key={to} className="list-none">
            <Link 
              to={to}
              className="block px-4 py-2 rounded-full
                         hover:bg-gradient-to-b from-green-500 to-lime-400
                         transition-colors duration-300
                         whitespace-nowrap"
            >
              {label}
            </Link>
          </li>
        ))}
      </aside>
    </div>
  )
}

export default Sidebar
